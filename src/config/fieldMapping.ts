import type { Question } from '@/types/Question'
import {
  ASSESSMENT_QUESTION_COUNT,
  getAssessmentQuestions,
} from './assessment'

/**
 * Canonical Google Sheets fields — one clean schema for all branches.
 * branchId identifies which journey the respondent followed.
 */
export const CANONICAL_FIELDS = {
  branchId: 'branchId',
  trigger: 'trigger',
  currentSolution: 'currentSolution',
  reasonForChoice: 'reasonForChoice',
  biggestFriction: 'biggestFriction',
  desiredImprovement: 'desiredImprovement',
  frequency: 'frequency',
  currency: 'currency',
  transactionAmount: 'transactionAmount',
  customerSegment: 'customerSegment',
  whatsappNumber: 'whatsappNumber',
} as const

/** Maps raw answer keys → canonical sheet columns */
const FIELD_MAP: Record<string, string> = {
  q1: CANONICAL_FIELDS.branchId,
  q2: CANONICAL_FIELDS.trigger,
  q3: CANONICAL_FIELDS.currentSolution,
  q4: CANONICAL_FIELDS.reasonForChoice,
  q5: CANONICAL_FIELDS.biggestFriction,
  q6: CANONICAL_FIELDS.desiredImprovement,
  q7: CANONICAL_FIELDS.frequency,
  q8_currency: CANONICAL_FIELDS.currency,
  q8_amount: CANONICAL_FIELDS.transactionAmount,
  q9: CANONICAL_FIELDS.customerSegment,
  q10: CANONICAL_FIELDS.whatsappNumber,
}

export function buildQuestionIdToCanonicalMap(): Map<string, string> {
  const map = new Map<string, string>()
  for (const [key, value] of Object.entries(FIELD_MAP)) {
    map.set(key, value)
  }
  return map
}

export const SHEET_COLUMN_ORDER: string[] = [
  'submittedAt',
  'surveyId',
  'durationMs',
  CANONICAL_FIELDS.branchId,
  CANONICAL_FIELDS.trigger,
  CANONICAL_FIELDS.currentSolution,
  CANONICAL_FIELDS.reasonForChoice,
  CANONICAL_FIELDS.biggestFriction,
  CANONICAL_FIELDS.desiredImprovement,
  CANONICAL_FIELDS.frequency,
  CANONICAL_FIELDS.currency,
  CANONICAL_FIELDS.transactionAmount,
  CANONICAL_FIELDS.customerSegment,
  CANONICAL_FIELDS.whatsappNumber,
  'userAgent',
]

export function buildAssessmentFlow(
  answers: Record<string, string | string[]>,
): Question[] {
  return getAssessmentQuestions(answers)
}

export { ASSESSMENT_QUESTION_COUNT }
