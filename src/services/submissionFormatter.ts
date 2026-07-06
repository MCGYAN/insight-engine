import { buildQuestionIdToCanonicalMap } from '@/config/fieldMapping'
import { resolveBranchId } from '@/config/branchWording'
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
  if (Array.isArray(value)) return value.join(', ')
  return String(value)
}

let canonicalMapCache: Map<string, string> | null = null

function getCanonicalMap(): Map<string, string> {
  if (!canonicalMapCache) {
    canonicalMapCache = buildQuestionIdToCanonicalMap()
  }
  return canonicalMapCache
}

/**
 * Maps answers to the canonical sheet schema.
 * When "Other" is selected, the free-text value replaces the option id.
 */
export function mapAnswersToCanonicalFields(
  answers: SurveyAnswers,
): Record<string, string> {
  const canonicalMap = getCanonicalMap()
  const fields: Record<string, string> = {}

  const resolved: Record<string, string> = {
    q1: formatAnswerValue(answers.q1),
    q2: formatAnswerValue(answers.q2),
    q3:
      answers.q3 === 'other'
        ? formatAnswerValue(answers.q3_other)
        : formatAnswerValue(answers.q3),
    q4: formatAnswerValue(answers.q4),
    q5: formatAnswerValue(answers.q5),
    q6: formatAnswerValue(answers.q6),
    q7: formatAnswerValue(answers.q7),
    q8_currency:
      answers.q8_currency === 'other'
        ? formatAnswerValue(answers.q8_currency_other)
        : formatAnswerValue(answers.q8_currency),
    q8_amount: formatAnswerValue(answers.q8_amount),
    q9:
      answers.q9 === 'other'
        ? formatAnswerValue(answers.q9_other)
        : formatAnswerValue(answers.q9),
    q10: formatAnswerValue(answers.q10),
  }

  // branchId: use q1 selection; if other, append detail
  const branchId = resolveBranchId(answers.q1 as string | undefined)
  fields.branchId =
    branchId === 'other' && answers.q1_other
      ? `other: ${formatAnswerValue(answers.q1_other)}`
      : branchId

  for (const [questionId, value] of Object.entries(resolved)) {
    if (questionId === 'q1') continue
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
  const branchId = resolveBranchId(submission.answers.q1 as string | undefined)

  return {
    surveyId: submission.surveyId,
    branchId,
    submittedAt: submission.metadata.submittedAt,
    durationMs: submission.metadata.durationMs,
    userAgent: submission.metadata.userAgent,
    fields: mapAnswersToCanonicalFields(submission.answers),
  }
}
