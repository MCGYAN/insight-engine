import { BRANCH_WORDING } from '@/config/branchWording'
import { CANONICAL_FIELDS } from '@/config/fieldMapping'
import { surveyConfig } from '@/config/survey'
import type { SheetsPayload } from './submissionFormatter'

const ALLOWED_FIELD_KEYS = new Set<string>(Object.values(CANONICAL_FIELDS))

const ALLOWED_BRANCH_IDS = new Set<string>(Object.keys(BRANCH_WORDING))

const FIELD_MAX_LENGTH: Record<string, number> = {
  [CANONICAL_FIELDS.trigger]: 500,
  [CANONICAL_FIELDS.currentSolution]: 200,
  [CANONICAL_FIELDS.reasonForChoice]: 500,
  [CANONICAL_FIELDS.biggestFriction]: 2000,
  [CANONICAL_FIELDS.desiredImprovement]: 2000,
  [CANONICAL_FIELDS.frequency]: 50,
  [CANONICAL_FIELDS.currency]: 50,
  [CANONICAL_FIELDS.transactionAmount]: 30,
  [CANONICAL_FIELDS.customerSegment]: 200,
  [CANONICAL_FIELDS.whatsappNumber]: 20,
}

const MAX_USER_AGENT_LENGTH = 500
const MAX_SURVEY_ID_LENGTH = 100
const MAX_DURATION_MS = 86_400_000 // 24 hours
const WHATSAPP_PATTERN = /^\+?[\d\s\-()]{7,20}$/

export type ValidationResult =
  | { ok: true; payload: SheetsPayload }
  | { ok: false; error: string }

/** Strip control chars and block Google Sheets formula injection. */
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
  const time = Date.parse(value)
  return Number.isFinite(time)
}

function isValidBranchId(value: string): boolean {
  if (ALLOWED_BRANCH_IDS.has(value)) return true
  if (value.startsWith('other: ')) {
    return value.length <= 220
  }
  return false
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
    const branchId = asTrimmedString(branchIdRaw, 220)
    if (!branchId || !isValidBranchId(branchId)) {
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

    if (typeof value !== 'string' && typeof value !== 'number') {
      return { ok: false, error: `Invalid value for ${key}.` }
    }

    const maxLength = FIELD_MAX_LENGTH[key] ?? 500
    const sanitized = asTrimmedString(value, maxLength)
    if (sanitized === null) {
      return { ok: false, error: `Value for ${key} is invalid or too long.` }
    }

    if (key === CANONICAL_FIELDS.whatsappNumber && !WHATSAPP_PATTERN.test(sanitized)) {
      return { ok: false, error: 'Invalid WhatsApp number format.' }
    }

    if (key === CANONICAL_FIELDS.transactionAmount && !/^[\d.]+$/.test(sanitized)) {
      return { ok: false, error: 'Invalid transaction amount.' }
    }

    if (sanitized.length > 0) {
      fields[key] = sanitized
    }
  }

  const branchId =
    body.branchId === null || body.branchId === undefined
      ? null
      : asTrimmedString(body.branchId, 220)!

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
