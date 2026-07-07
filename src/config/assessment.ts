import type { Question } from '@/types/Question'

export type SurveyBranchId =
  | 'non_converter'
  | 'cash_to_crypto'
  | 'crypto_to_cash'
  | 'both'
  | 'unknown'

export const MAX_SURVEY_QUESTIONS = 10

const Q1_OPTIONS = [
  { id: 'cash_to_crypto', label: 'Changed physical cash into cryptocurrency' },
  { id: 'crypto_to_cash', label: 'Changed cryptocurrency into physical cash' },
  { id: 'both', label: 'Both' },
  { id: 'none', label: "I haven't done either" },
]

const Q2A_OPTIONS = [
  { id: 'investment', label: 'I mainly keep crypto as an investment' },
  { id: 'digital_only', label: 'I mostly use crypto digitally' },
  { id: 'stopped', label: 'I stopped using crypto' },
  { id: 'learning', label: "I'm still learning about crypto" },
  { id: 'other', label: 'Other' },
]

const Q2B_OPTIONS = [
  { id: 'cash_to_crypto', label: 'Physical Cash → Cryptocurrency' },
  { id: 'crypto_to_cash', label: 'Cryptocurrency → Physical Cash' },
  { id: 'both', label: 'Both' },
]

const Q3_OPTIONS = [
  { id: 'under_100', label: 'Less than GHS100' },
  { id: '100_500', label: 'GHS100 to 500' },
  { id: '500_2000', label: 'GHS500 to 2,000' },
  { id: '2000_10000', label: 'GHS2,000 to 10,000' },
  { id: 'above_10000', label: 'Above GHS10,000' },
]

const Q4_OPTIONS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Every two weeks' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'few_months', label: 'Every few months' },
  { id: 'rarely', label: 'Rarely' },
]

const Q5_OPTIONS = [
  { id: 'binance_p2p', label: 'Binance P2P' },
  { id: 'mybitstore', label: 'Mybitstore' },
  { id: 'otc_trader', label: 'OTC Trader' },
  { id: 'friend_family', label: 'Friend or Family' },
  { id: 'crypto_exchange', label: 'Crypto Exchange' },
  { id: 'another_app', label: 'Another App' },
  { id: 'other', label: 'Other' },
]

const Q7_OPTIONS = [
  { id: 'high_fees', label: 'High fees' },
  { id: 'poor_rate', label: 'Poor exchange rate' },
  { id: 'too_long', label: 'Took too long' },
  { id: 'no_trust', label: "Couldn't find someone I trusted" },
  { id: 'not_safe', label: "Didn't feel safe" },
  { id: 'too_many_steps', label: 'Too many steps' },
  { id: 'limited_availability', label: 'Limited availability' },
  { id: 'other', label: 'Other' },
]

const Q9_OPTIONS = [
  { id: 'definitely', label: 'Definitely' },
  { id: 'probably', label: 'Probably' },
  { id: 'not_sure', label: 'Not sure' },
  { id: 'probably_not', label: 'Probably not' },
  { id: 'definitely_not', label: 'Definitely not' },
]

const Q10_CONTACT_OPTIONS = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
]

const Q1: Question = {
  id: 'q1',
  section: 'assessment',
  type: 'single',
  label: 'Think about the last 90 days.\nWhich of these have you personally done?',
  required: true,
  options: Q1_OPTIONS,
}

const Q2A: Question = {
  id: 'q2a',
  section: 'assessment',
  type: 'single',
  label: 'Which best describes you?',
  required: true,
  options: Q2A_OPTIONS,
  inlineOther: {
    fieldId: 'q2a_other',
    label: 'Please tell us more.',
    placeholder: 'In a few words…',
  },
}

const Q2B: Question = {
  id: 'q2b',
  section: 'assessment',
  type: 'single',
  label: 'Which best describes the LAST time you converted money?',
  required: true,
  options: Q2B_OPTIONS,
}

const Q3: Question = {
  id: 'q3',
  section: 'assessment',
  type: 'single',
  label: 'Approximately how much money was involved?',
  required: true,
  options: Q3_OPTIONS,
}

const Q4: Question = {
  id: 'q4',
  section: 'assessment',
  type: 'single',
  label:
    'How often do you normally convert between physical cash and cryptocurrency?',
  required: true,
  options: Q4_OPTIONS,
}

const Q5: Question = {
  id: 'q5',
  section: 'assessment',
  type: 'single',
  label: 'How did you complete your MOST RECENT transaction?',
  required: true,
  options: Q5_OPTIONS,
  inlineOther: {
    fieldId: 'q5_other',
    label: 'What did you use instead?',
    placeholder: 'Tell us what you used…',
  },
}

const Q6: Question = {
  id: 'q6',
  section: 'assessment',
  type: 'text',
  variant: 'short',
  label: 'Why did you choose that option instead of another one?',
  required: true,
  placeholder: 'What made that option the right one for you?',
}

const Q7: Question = {
  id: 'q7',
  section: 'assessment',
  type: 'single',
  label: 'What was the MOST frustrating part of that experience?',
  required: true,
  options: Q7_OPTIONS,
  inlineOther: {
    fieldId: 'q7_other',
    label: 'What frustrated you most?',
    placeholder: 'Tell us in a few words…',
  },
}

const Q8: Question = {
  id: 'q8',
  section: 'assessment',
  type: 'text',
  variant: 'paragraph',
  label: 'If you could improve ONE thing about that experience, what would it be?',
  required: true,
  placeholder: 'What would have made it better for you?',
}

const Q9: Question = {
  id: 'q9',
  section: 'assessment',
  type: 'single',
  label:
    'If you needed to convert between physical cash and cryptocurrency again tomorrow, would you use the same method?',
  required: true,
  options: Q9_OPTIONS,
}

const Q10: Question = {
  id: 'q10',
  section: 'assessment',
  type: 'contact',
  label: 'May we contact you if we would like to better understand your experience?',
  required: true,
  description:
    'If yes, you can optionally leave a phone number or email. We will only use these to follow up about your responses.',
  footerNote:
    'Joining the WhatsApp community is completely optional and separate from your answers.',
  options: Q10_CONTACT_OPTIONS,
}

export function resolveSurveyBranch(q1?: string): SurveyBranchId {
  if (!q1) return 'unknown'
  if (q1 === 'none') return 'non_converter'
  if (q1 === 'cash_to_crypto') return 'cash_to_crypto'
  if (q1 === 'crypto_to_cash') return 'crypto_to_cash'
  if (q1 === 'both') return 'both'
  return 'unknown'
}

export function isConverterPath(q1?: string): boolean {
  return !!q1 && q1 !== 'none'
}

/**
 * Builds the question flow based on Q1 branching.
 * Non-converters: Q1 → Q2A → Q10 (3 screens).
 * Converters: Q1 → Q2B → Q3–Q10 (10 screens).
 */
export function getSurveyQuestions(
  answers: Record<string, string | string[] | undefined>,
): Question[] {
  const q1 = answers.q1 as string | undefined

  if (!q1) {
    return [Q1]
  }

  if (q1 === 'none') {
    return [Q1, Q2A, Q10]
  }

  return [Q1, Q2B, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10]
}

/** @deprecated Use getSurveyQuestions */
export function getAssessmentQuestions(
  answers: Record<string, string | string[] | undefined>,
): Question[] {
  return getSurveyQuestions(answers)
}

export const ASSESSMENT_QUESTION_COUNT = MAX_SURVEY_QUESTIONS

/** @deprecated Use resolveSurveyBranch */
export function resolveBranchId(q1?: string): SurveyBranchId {
  return resolveSurveyBranch(q1)
}

export type BranchId = SurveyBranchId
