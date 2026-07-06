import type { SurveySubmission } from '@/types/Survey'
import { buildSheetsPayload } from './submissionFormatter'

export interface SubmitResult {
  success: boolean
  error?: string
}

interface ApiResponse {
  success?: boolean
  error?: string
}

/**
 * Submit via Next.js API route (server-side proxy).
 * Avoids browser CORS issues when calling Google Apps Script from localhost.
 */
export async function submitSurveyResponses(
  submission: SurveySubmission,
): Promise<SubmitResult> {
  const payload = buildSheetsPayload(submission)

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = (await response.json()) as ApiResponse

    if (response.ok && data.success === true) {
      return { success: true }
    }

    return {
      success: false,
      error: data.error ?? 'Submission failed. Please try again.',
    }
  } catch {
    return {
      success: false,
      error: 'Network error. Check your connection and try again.',
    }
  }
}
