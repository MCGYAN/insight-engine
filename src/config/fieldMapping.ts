import type { Question } from '@/types/Question'
import { getSurveyQuestions, MAX_SURVEY_QUESTIONS } from './assessment'

/**
 * Canonical Google Sheets fields for Customer Discovery Survey V1.
 */
export const CANONICAL_FIELDS = {
  branchId: 'branchId',
  recentActivity: 'recentActivity',
  nonConverterProfile: 'nonConverterProfile',
  lastConversionDirection: 'lastConversionDirection',
  transactionValue: 'transactionValue',
  frequency: 'frequency',
  currentSolution: 'currentSolution',
  pullFactors: 'pullFactors',
  friction: 'friction',
  desiredImprovement: 'desiredImprovement',
  inertia: 'inertia',
  contactConsent: 'contactConsent',
  phoneNumber: 'phoneNumber',
  email: 'email',
  whatsappCommunity: 'whatsappCommunity',
} as const

const FIELD_MAP: Record<string, string> = {
  q1: CANONICAL_FIELDS.recentActivity,
  q2a: CANONICAL_FIELDS.nonConverterProfile,
  q2b: CANONICAL_FIELDS.lastConversionDirection,
  q3: CANONICAL_FIELDS.transactionValue,
  q4: CANONICAL_FIELDS.frequency,
  q5: CANONICAL_FIELDS.currentSolution,
  q6: CANONICAL_FIELDS.pullFactors,
  q7: CANONICAL_FIELDS.friction,
  q8: CANONICAL_FIELDS.desiredImprovement,
  q9: CANONICAL_FIELDS.inertia,
  q10_contact: CANONICAL_FIELDS.contactConsent,
  q10_phone: CANONICAL_FIELDS.phoneNumber,
  q10_email: CANONICAL_FIELDS.email,
  q10_whatsapp: CANONICAL_FIELDS.whatsappCommunity,
}

export function buildQuestionIdToCanonicalMap(): Map<string, string> {
  return new Map(Object.entries(FIELD_MAP))
}

export const SHEET_COLUMN_ORDER: string[] = [
  'submittedAt',
  'surveyId',
  'durationMs',
  CANONICAL_FIELDS.branchId,
  CANONICAL_FIELDS.recentActivity,
  CANONICAL_FIELDS.nonConverterProfile,
  CANONICAL_FIELDS.lastConversionDirection,
  CANONICAL_FIELDS.transactionValue,
  CANONICAL_FIELDS.frequency,
  CANONICAL_FIELDS.currentSolution,
  CANONICAL_FIELDS.pullFactors,
  CANONICAL_FIELDS.friction,
  CANONICAL_FIELDS.desiredImprovement,
  CANONICAL_FIELDS.inertia,
  CANONICAL_FIELDS.contactConsent,
  CANONICAL_FIELDS.phoneNumber,
  CANONICAL_FIELDS.email,
  CANONICAL_FIELDS.whatsappCommunity,
  'userAgent',
]

export function buildAssessmentFlow(
  answers: Record<string, string | string[]>,
): Question[] {
  return getSurveyQuestions(answers)
}

export { MAX_SURVEY_QUESTIONS as ASSESSMENT_QUESTION_COUNT }
