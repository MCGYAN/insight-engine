import { integrationConfig } from '@/config/integration'
import { validateSubmissionPayload } from '@/services/submissionValidator'
import { NextResponse } from 'next/server'

interface ScriptResponse {
  success?: boolean
  error?: string
  message?: string
}

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 15

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count += 1
  return false
}

export async function POST(request: Request) {
  const endpoint = integrationConfig.googleSheetsEndpoint

  if (!endpoint || endpoint.includes('YOUR_SCRIPT_ID')) {
    return NextResponse.json(
      { success: false, error: 'Submission endpoint is not configured.' },
      { status: 500 },
    )
  }

  const clientIp = getClientIp(request)
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please try again later.' },
      { status: 429 },
    )
  }

  let rawPayload: unknown
  try {
    rawPayload = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid submission payload.' },
      { status: 400 },
    )
  }

  const validation = validateSubmissionPayload(rawPayload)
  if (!validation.ok) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: 400 },
    )
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(validation.payload),
      redirect: 'follow',
    })

    const text = await response.text()
    const data = parseScriptResponse(text)

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            data?.error ??
            extractHtmlError(text) ??
            `Google Apps Script returned ${response.status}.`,
        },
        { status: 502 },
      )
    }

    if (data?.success === true) {
      return NextResponse.json({ success: true })
    }

    const htmlError = extractHtmlError(text)
    if (htmlError) {
      return NextResponse.json({ success: false, error: htmlError }, { status: 502 })
    }

    return NextResponse.json(
      {
        success: false,
        error:
          data?.error ??
          data?.message ??
          'Submission was not confirmed by Google Apps Script.',
      },
      { status: 502 },
    )
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Could not reach Google Apps Script. Check your deployment URL.',
      },
      { status: 502 },
    )
  }
}

function parseScriptResponse(text: string): ScriptResponse | null {
  try {
    return JSON.parse(text) as ScriptResponse
  } catch {
    if (text.toLowerCase().includes('success')) {
      return { success: true }
    }
    return null
  }
}

function extractHtmlError(text: string): string | null {
  const match = text.match(
    /<div[^>]*>(Script function not found:[^<]+)<\/div>/i,
  )
  if (match) return match[1].trim()

  if (text.includes('Script function not found')) {
    return 'Google Apps Script error: doPost function not found. Paste the script from scripts/google-apps-script.gs and redeploy.'
  }

  if (text.includes('Sign in') || text.includes('accounts.google.com')) {
    return 'Google Apps Script requires sign-in. Redeploy with access set to "Anyone".'
  }

  return null
}
