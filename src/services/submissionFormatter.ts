import { buildQuestionIdToCanonicalMap } from '@/config/fieldMapping'
import { resolveSurveyBranch } from '@/config/assessment'
import { sanitizeSheetValue } from '@/services/submissionValidator'
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
    q2b: formatAnswerValue(answers.q2b),
    q3: formatAnswerValue(answers.q3),
    q4: formatAnswerValue(answers.q4),
    q5: resolveOptionWithOther(answers.q5, answers.q5_other),
    q6: formatAnswerValue(answers.q6),
    q7: resolveOptionWithOther(answers.q7, answers.q7_other),
    q8: formatAnswerValue(answers.q8),
    q9: formatAnswerValue(answers.q9),
    q10_contact: formatAnswerValue(answers.q10_contact),
    q10_phone: formatAnswerValue(answers.q10_phone),
    q10_email: formatAnswerValue(answers.q10_email),
    q10_whatsapp: formatAnswerValue(answers.q10_whatsapp),
  }

  for (const [questionId, value] of Object.entries(resolved)) {
    const fieldName = canonicalMap.get(questionId)
    if (fieldName && value) {
      fields[fieldName] = value
    }
  }

  return fields
}

export function buildSheetsPayload(
  submission: SurveySubmission,
): SheetsPayload {
  const branchId = resolveSurveyBranch(submission.answers.q1 as string | undefined)

  return {
    surveyId: submission.surveyId,
    branchId: branchId === 'unknown' ? null : branchId,
    submittedAt: submission.metadata.submittedAt,
    durationMs: submission.metadata.durationMs,
    userAgent: submission.metadata.userAgent,
    fields: mapAnswersToCanonicalFields(submission.answers),
  }
}
