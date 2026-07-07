import { buildQuestionIdToCanonicalMap } from '@/config/fieldMapping'
import { resolveSurveyBranch } from '@/config/assessment'
import { sanitizeSheetValue } from '@/services/submissionValidator'
import { UTM_PARAM_KEYS, type UtmParams } from '@/services/utm'
import type { SurveyAnswers, SurveySubmission } from '@/types/Survey'

export interface SheetsPayload {
  surveyId: string
  branchId: string | null
  submittedAt: string
  durationMs: number
  userAgent: string
  fields: Record<string, string>
}

function formatAnswerValue(value: string | string[] | undefined): string {
  if (value === undefined) return ''
  if (Array.isArray(value)) {
    return value.map((v) => sanitizeSheetValue(String(v))).join(', ')
  }
  return sanitizeSheetValue(String(value))
}

function formatRawValue(value: string | string[] | undefined): string {
  if (value === undefined) return ''
  return String(value).trim()
}

function resolveOptionWithOther(
  answer: string | string[] | undefined,
  otherAnswer: string | string[] | undefined,
): string {
  if (answer === 'other' && otherAnswer) {
    return formatAnswerValue(otherAnswer)
  }
  return formatAnswerValue(answer)
}

let canonicalMapCache: Map<string, string> | null = null

function getCanonicalMap(): Map<string, string> {
  if (!canonicalMapCache) {
    canonicalMapCache = buildQuestionIdToCanonicalMap()
  }
  return canonicalMapCache
}

function resolveContactFields(answers: SurveyAnswers): Record<string, string> {
  const isConverter = answers.q1 !== 'none'
  const prefix = isConverter ? 'q12' : 'q10'

  return {
    [`${prefix}_contact`]: formatAnswerValue(answers[`${prefix}_contact`]),
    [`${prefix}_phone`]: formatRawValue(answers[`${prefix}_phone`]),
    [`${prefix}_email`]: formatRawValue(answers[`${prefix}_email`]),
  }
}

export function mapAnswersToCanonicalFields(
  answers: SurveyAnswers,
): Record<string, string> {
  const canonicalMap = getCanonicalMap()
  const fields: Record<string, string> = {}

  const branchId = resolveSurveyBranch(answers.q1 as string | undefined)
  fields.branchId = branchId

  const resolved: Record<string, string> = {
    q1: formatAnswerValue(answers.q1),
    q2a: resolveOptionWithOther(answers.q2a, answers.q2a_other),
    q2b: resolveOptionWithOther(answers.q2b, answers.q2b_other),
    q3: resolveOptionWithOther(answers.q3, answers.q3_other),
    q4: formatAnswerValue(answers.q4),
    q5: formatAnswerValue(answers.q5),
    q6: resolveOptionWithOther(answers.q6, answers.q6_other),
    q7: formatAnswerValue(answers.q7),
    q8: formatAnswerValue(answers.q8),
    q9: resolveOptionWithOther(answers.q9, answers.q9_other),
    q10: resolveOptionWithOther(answers.q10, answers.q10_other),
    q11: formatAnswerValue(answers.q11),
    ...resolveContactFields(answers),
  }

  for (const [questionId, value] of Object.entries(resolved)) {
    const fieldName = canonicalMap.get(questionId)
    if (fieldName && value) {
      fields[fieldName] = value
    }
  }

  return fields
}

function appendUtmFields(
  fields: Record<string, string>,
  utm: UtmParams,
): void {
  for (const key of UTM_PARAM_KEYS) {
    fields[key] = sanitizeSheetValue(utm[key] ?? '')
  }
}

export function buildSheetsPayload(
  submission: SurveySubmission,
): SheetsPayload {
  const branchId = resolveSurveyBranch(submission.answers.q1 as string | undefined)
  const fields = mapAnswersToCanonicalFields(submission.answers)
  appendUtmFields(fields, submission.utm)

  return {
    surveyId: submission.surveyId,
    branchId: branchId === 'unknown' ? null : branchId,
    submittedAt: submission.metadata.submittedAt,
    durationMs: submission.metadata.durationMs,
    userAgent: submission.metadata.userAgent,
    fields,
  }
}
