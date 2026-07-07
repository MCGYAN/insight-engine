import type { SurveyBranchId } from '@/config/assessment'
import { CANONICAL_FIELDS } from '@/config/fieldMapping'
import { surveyConfig } from '@/config/survey'
import { UTM_PARAM_KEYS } from '@/services/utm'
import { isValidPhoneNumber } from '@/utils/phoneValidation'
import type { SheetsPayload } from './submissionFormatter'

const ALLOWED_FIELD_KEYS = new Set<string>([
  ...Object.values(CANONICAL_FIELDS),
  ...UTM_PARAM_KEYS,
])

const ALLOWED_BRANCH_IDS = new Set<SurveyBranchId>([
  'non_converter',
  'cash_to_crypto',
  'crypto_to_cash',
  'both',
])

const FIELD_MAX_LENGTH: Record<string, number> = {
  [CANONICAL_FIELDS.recentActivity]: 50,
  [CANONICAL_FIELDS.icpProfile]: 200,
  [CANONICAL_FIELDS.homeRegion]: 50,
  [CANONICAL_FIELDS.homeTown]: 120,
  [CANONICAL_FIELDS.lastConversionDirection]: 50,
  [CANONICAL_FIELDS.transactionLocation]: 200,
  [CANONICAL_FIELDS.transactionValue]: 50,
  [CANONICAL_FIELDS.frequency]: 50,
  [CANONICAL_FIELDS.currentSolution]: 200,
  [CANONICAL_FIELDS.friction]: 200,
  [CANONICAL_FIELDS.inertia]: 50,
  [CANONICAL_FIELDS.contactConsent]: 10,
  [CANONICAL_FIELDS.phoneNumber]: 20,
  [CANONICAL_FIELDS.email]: 120,
  [CANONICAL_FIELDS.whatsappCommunity]: 10,
  branchId: 50,
  utm_source: 120,
  utm_medium: 120,
  utm_campaign: 120,
  utm_content: 120,
}

const MAX_USER_AGENT_LENGTH = 500
const MAX_SURVEY_ID_LENGTH = 100
const MAX_DURATION_MS = 86_400_000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ValidationResult =
  | { ok: true; payload: SheetsPayload }
  | { ok: false; error: string }

export function sanitizeSheetValue(value: string): string {
  let clean = value
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/<[^>]*>/g, '')

  const trimmed = clean.trimStart()
  if (/^[=+\-@\t\r|]/.test(trimmed)) {
    clean = `'${clean}`
  }

  return clean
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function asTrimmedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string' && typeof value !== 'number') return null
  const str = sanitizeSheetValue(String(value).trim())
  if (str.length > maxLength) return null
  return str
}

function isValidIsoDate(value: string): boolean {
  return Number.isFinite(Date.parse(value))
}

export function validateSubmissionPayload(body: unknown): ValidationResult {
  if (!isPlainObject(body)) {
    return { ok: false, error: 'Invalid submission format.' }
  }

  const surveyId = asTrimmedString(body.surveyId, MAX_SURVEY_ID_LENGTH)
  if (!surveyId || surveyId !== surveyConfig.id) {
    return { ok: false, error: 'Invalid survey identifier.' }
  }

  const branchIdRaw = body.branchId
  if (branchIdRaw !== null && branchIdRaw !== undefined) {
    const branchId = asTrimmedString(branchIdRaw, 50)
    if (!branchId || !ALLOWED_BRANCH_IDS.has(branchId as SurveyBranchId)) {
      return { ok: false, error: 'Invalid branch identifier.' }
    }
  }

  const submittedAt = asTrimmedString(body.submittedAt, 40)
  if (!submittedAt || !isValidIsoDate(submittedAt)) {
    return { ok: false, error: 'Invalid submission timestamp.' }
  }

  if (typeof body.durationMs !== 'number' || !Number.isFinite(body.durationMs)) {
    return { ok: false, error: 'Invalid duration value.' }
  }
  if (body.durationMs < 0 || body.durationMs > MAX_DURATION_MS) {
    return { ok: false, error: 'Duration value out of range.' }
  }

  const userAgent = asTrimmedString(body.userAgent ?? '', MAX_USER_AGENT_LENGTH)
  if (userAgent === null) {
    return { ok: false, error: 'Invalid user agent value.' }
  }

  if (!isPlainObject(body.fields)) {
    return { ok: false, error: 'Invalid fields object.' }
  }

  const fields: Record<string, string> = {}
  const fieldEntries = Object.entries(body.fields)

  if (fieldEntries.length > ALLOWED_FIELD_KEYS.size) {
    return { ok: false, error: 'Too many fields submitted.' }
  }

  for (const [key, value] of fieldEntries) {
    if (!ALLOWED_FIELD_KEYS.has(key)) {
      return { ok: false, error: `Unexpected field: ${key}` }
    }

    if (UTM_PARAM_KEYS.includes(key as (typeof UTM_PARAM_KEYS)[number])) {
      const utmValue =
        value === undefined || value === null
          ? ''
          : asTrimmedString(value, FIELD_MAX_LENGTH[key] ?? 120)
      fields[key] = utmValue ?? ''
      continue
    }

    if (typeof value !== 'string' && typeof value !== 'number') {
      return { ok: false, error: `Invalid value for ${key}.` }
    }

    const rawValue = String(value).trim().replace(/^'/, '')

    if (
      key === CANONICAL_FIELDS.phoneNumber &&
      rawValue &&
      !isValidPhoneNumber(rawValue)
    ) {
      return { ok: false, error: 'Invalid phone number format.' }
    }

    const maxLength = FIELD_MAX_LENGTH[key] ?? 500
    const sanitized = asTrimmedString(value, maxLength)
    if (sanitized === null) {
      return { ok: false, error: `Value for ${key} is invalid or too long.` }
    }

    if (
      key === CANONICAL_FIELDS.email &&
      sanitized &&
      !EMAIL_PATTERN.test(sanitized)
    ) {
      return { ok: false, error: 'Invalid email format.' }
    }

    if (sanitized.length > 0) {
      fields[key] = sanitized
    }
  }

  for (const key of UTM_PARAM_KEYS) {
    if (!(key in fields)) {
      fields[key] = ''
    }
  }

  const branchId =
    body.branchId === null || body.branchId === undefined
      ? null
      : asTrimmedString(body.branchId, 50)!

  return {
    ok: true,
    payload: {
      surveyId,
      branchId,
      submittedAt,
      durationMs: Math.round(body.durationMs),
      userAgent,
      fields,
    },
  }
}
