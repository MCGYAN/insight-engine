import type { Question } from '@/types/Question'
import { getSurveyQuestions, MAX_SURVEY_QUESTIONS } from './assessment'

/**
 * Canonical Google Sheets fields for Customer Discovery Survey V2.
 */
export const CANONICAL_FIELDS = {
  branchId: 'branchId',
  recentActivity: 'recentActivity',
  icpProfile: 'icpProfile',
  homeRegion: 'homeRegion',
  homeTown: 'homeTown',
  lastConversionDirection: 'lastConversionDirection',
  transactionLocation: 'transactionLocation',
  transactionValue: 'transactionValue',
  frequency: 'frequency',
  currentSolution: 'currentSolution',
  friction: 'friction',
  inertia: 'inertia',
  contactConsent: 'contactConsent',
  phoneNumber: 'phoneNumber',
  email: 'email',
  whatsappCommunity: 'whatsappCommunity',
} as const

const FIELD_MAP: Record<string, string> = {
  q1: CANONICAL_FIELDS.recentActivity,
  q2a: CANONICAL_FIELDS.icpProfile,
  q2b: CANONICAL_FIELDS.icpProfile,
  q3: CANONICAL_FIELDS.homeRegion,
  q4: CANONICAL_FIELDS.homeTown,
  q5: CANONICAL_FIELDS.lastConversionDirection,
  q6: CANONICAL_FIELDS.transactionLocation,
  q7: CANONICAL_FIELDS.transactionValue,
  q8: CANONICAL_FIELDS.frequency,
  q9: CANONICAL_FIELDS.currentSolution,
  q10: CANONICAL_FIELDS.friction,
  q11: CANONICAL_FIELDS.inertia,
  q10_contact: CANONICAL_FIELDS.contactConsent,
  q10_phone: CANONICAL_FIELDS.phoneNumber,
  q10_email: CANONICAL_FIELDS.email,
  q12_contact: CANONICAL_FIELDS.contactConsent,
  q12_phone: CANONICAL_FIELDS.phoneNumber,
  q12_email: CANONICAL_FIELDS.email,
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
  CANONICAL_FIELDS.icpProfile,
  CANONICAL_FIELDS.homeRegion,
  CANONICAL_FIELDS.homeTown,
  CANONICAL_FIELDS.lastConversionDirection,
  CANONICAL_FIELDS.transactionLocation,
  CANONICAL_FIELDS.transactionValue,
  CANONICAL_FIELDS.frequency,
  CANONICAL_FIELDS.currentSolution,
  CANONICAL_FIELDS.friction,
  CANONICAL_FIELDS.inertia,
  CANONICAL_FIELDS.contactConsent,
  CANONICAL_FIELDS.phoneNumber,
  CANONICAL_FIELDS.email,
  CANONICAL_FIELDS.whatsappCommunity,
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'userAgent',
]

export function buildAssessmentFlow(
  answers: Record<string, string | string[]>,
): Question[] {
  return getSurveyQuestions(answers)
}

export { MAX_SURVEY_QUESTIONS as ASSESSMENT_QUESTION_COUNT }
