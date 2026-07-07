import type { Question } from '@/types/Question'

export type SurveyBranchId =
  | 'non_converter'
  | 'cash_to_crypto'
  | 'crypto_to_cash'
  | 'both'
  | 'unknown'

/** Max screens on the longest converter branch (Q1 = both). */
export const MAX_SURVEY_QUESTIONS = 12

const Q1_OPTIONS = [
  { id: 'cash_to_crypto', label: 'Changed physical cash into cryptocurrency' },
  { id: 'crypto_to_cash', label: 'Changed cryptocurrency into physical cash' },
  { id: 'both', label: 'Both' },
  { id: 'none', label: "I haven't done either" },
]

const Q2A_OPTIONS = [
  { id: 'investment', label: 'Mostly holding crypto as savings or investment' },
  { id: 'digital_only', label: 'Mostly using crypto online without converting to cash' },
  { id: 'stopped', label: 'Stopped using crypto' },
  { id: 'learning', label: 'Still learning about crypto' },
  { id: 'other', label: 'Other' },
]

const Q2B_OPTIONS = [
  { id: 'remote_worker', label: 'Remote worker paid in crypto' },
  { id: 'freelancer', label: 'Freelancer or contractor paid in crypto' },
  { id: 'business', label: 'Business receiving crypto payments' },
  { id: 'otc_trader', label: 'OTC trader or agent' },
  { id: 'student', label: 'Student using crypto for day-to-day expenses' },
  { id: 'cashing_out', label: 'Cashing out trading or investment gains' },
  { id: 'family_transfers', label: 'Sending or receiving money for family' },
  { id: 'other', label: 'Other' },
]

const Q3_REGION_OPTIONS = [
  { id: 'greater_accra', label: 'Greater Accra' },
  { id: 'ashanti', label: 'Ashanti' },
  { id: 'western', label: 'Western' },
  { id: 'central', label: 'Central' },
  { id: 'eastern', label: 'Eastern' },
  { id: 'northern', label: 'Northern' },
  { id: 'volta', label: 'Volta' },
  { id: 'upper_east', label: 'Upper East' },
  { id: 'upper_west', label: 'Upper West' },
  { id: 'bono', label: 'Bono' },
  { id: 'bono_east', label: 'Bono East' },
  { id: 'ahafo', label: 'Ahafo' },
  { id: 'western_north', label: 'Western North' },
  { id: 'oti', label: 'Oti' },
  { id: 'savannah', label: 'Savannah' },
  { id: 'north_east', label: 'North East' },
  { id: 'other', label: 'Other' },
]

const Q5_DIRECTION_OPTIONS = [
  { id: 'cash_to_crypto', label: 'Physical cash → Cryptocurrency' },
  { id: 'crypto_to_cash', label: 'Cryptocurrency → Physical cash' },
]

const Q6_LOCATION_OPTIONS = [
  { id: 'momo_kiosk', label: 'Mobile money agent or kiosk' },
  { id: 'home', label: 'At home' },
  { id: 'workplace', label: 'Workplace' },
  { id: 'market', label: 'Market or street' },
  { id: 'mall', label: 'Shopping mall' },
  { id: 'otc_shop', label: 'OTC shop or crypto office' },
  { id: 'friend_place', label: "Friend or family member's place" },
  { id: 'other', label: 'Other' },
]

const Q7_VALUE_OPTIONS = [
  { id: 'under_100', label: 'Less than GHS100' },
  { id: '100_500', label: 'GHS100 to 500' },
  { id: '500_2000', label: 'GHS500 to 2,000' },
  { id: '2000_10000', label: 'GHS2,000 to 10,000' },
  { id: 'above_10000', label: 'Above GHS10,000' },
]

const Q8_FREQUENCY_OPTIONS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Every two weeks' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'few_months', label: 'Every few months' },
  { id: 'rarely', label: 'Rarely' },
]

const Q9_METHOD_OPTIONS = [
  { id: 'binance_p2p', label: 'Binance P2P' },
  { id: 'mybitstore', label: 'Mybitstore' },
  { id: 'otc_trader', label: 'OTC trader in person' },
  { id: 'friend_family', label: 'Friend or family' },
  { id: 'crypto_exchange', label: 'Crypto exchange' },
  { id: 'another_app', label: 'Another app' },
  { id: 'other', label: 'Other' },
]

const Q10_FRICTION_OPTIONS = [
  { id: 'high_fees', label: 'High fees' },
  { id: 'poor_rate', label: 'Poor exchange rate' },
  { id: 'too_long', label: 'Took too long' },
  { id: 'no_trust', label: "Couldn't find someone I trusted" },
  { id: 'not_safe', label: "Didn't feel safe" },
  { id: 'too_many_steps', label: 'Too many steps' },
  { id: 'limited_availability', label: 'Limited availability' },
  { id: 'other', label: 'Other' },
]

const INERTIA_OPTIONS = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
]

const CONTACT_OPTIONS = [
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
  forceType: 'job',
}

const Q2A: Question = {
  id: 'q2a',
  section: 'assessment',
  type: 'single',
  label: 'You have not converted cash and crypto recently.\nHow do you mainly use crypto today?',
  required: true,
  options: Q2A_OPTIONS,
  forceType: 'job',
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
  label: 'Which best describes why you move between physical cash and crypto?',
  required: true,
  options: Q2B_OPTIONS,
  forceType: 'job',
  inlineOther: {
    fieldId: 'q2b_other',
    label: 'Please tell us more.',
    placeholder: 'In a few words…',
  },
}

const Q3: Question = {
  id: 'q3',
  section: 'assessment',
  type: 'single',
  label: 'Which region do you live in?',
  required: true,
  options: Q3_REGION_OPTIONS,
  inlineOther: {
    fieldId: 'q3_other',
    label: 'Which region?',
    placeholder: 'e.g. Outside Ghana…',
  },
}

const Q4: Question = {
  id: 'q4',
  section: 'assessment',
  type: 'text',
  variant: 'short',
  label: 'Which town or community do you live in?',
  required: true,
  placeholder: 'e.g. Osu, Kumasi, Tamale…',
}

const Q5: Question = {
  id: 'q5',
  section: 'assessment',
  type: 'single',
  label: 'The last time you converted, which direction was it?',
  required: true,
  options: Q5_DIRECTION_OPTIONS,
  forceType: 'job',
}

const Q6: Question = {
  id: 'q6',
  section: 'assessment',
  type: 'single',
  label: 'Where did your last cash ↔ crypto transaction take place?',
  required: true,
  options: Q6_LOCATION_OPTIONS,
  inlineOther: {
    fieldId: 'q6_other',
    label: 'Where was it?',
    placeholder: 'Tell us the place…',
  },
}

const Q7: Question = {
  id: 'q7',
  section: 'assessment',
  type: 'single',
  label: 'Approximately how much money was involved in that last transaction?',
  required: true,
  options: Q7_VALUE_OPTIONS,
  forceType: 'value',
}

const Q8: Question = {
  id: 'q8',
  section: 'assessment',
  type: 'single',
  label: 'How often do you normally convert between physical cash and cryptocurrency?',
  required: true,
  options: Q8_FREQUENCY_OPTIONS,
  forceType: 'frequency',
}

const Q9: Question = {
  id: 'q9',
  section: 'assessment',
  type: 'single',
  label: 'How did you complete your most recent transaction?',
  required: true,
  options: Q9_METHOD_OPTIONS,
  forceType: 'current_solution',
  inlineOther: {
    fieldId: 'q9_other',
    label: 'What did you use?',
    placeholder: 'Tell us what you used…',
  },
}

const Q10_FRICTION: Question = {
  id: 'q10',
  section: 'assessment',
  type: 'single',
  label: 'What was the hardest part of that last experience?',
  required: true,
  options: Q10_FRICTION_OPTIONS,
  forceType: 'friction',
  inlineOther: {
    fieldId: 'q10_other',
    label: 'What was hardest?',
    placeholder: 'Tell us in a few words…',
  },
}

const Q10_CONTACT: Question = {
  id: 'q10',
  section: 'assessment',
  type: 'contact',
  label: 'May we contact you to better understand your experience?',
  required: true,
  description: 'Optional phone or email below if yes.',
  options: CONTACT_OPTIONS,
}

const Q11_INERTIA: Question = {
  id: 'q11',
  section: 'assessment',
  type: 'single',
  label:
    'If you needed to convert between physical cash and cryptocurrency again tomorrow, would you use the same method?',
  required: true,
  options: INERTIA_OPTIONS,
  forceType: 'inertia',
}

const Q12_CONTACT: Question = {
  id: 'q12',
  section: 'assessment',
  type: 'contact',
  label: 'May we contact you to better understand your experience?',
  required: true,
  description: 'Optional phone or email below if yes.',
  options: CONTACT_OPTIONS,
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
 * Non-converters: Q1 → Q2A → Q3 → Q4 → Q10 contact (5 screens).
 * Converters (single direction): Q1 → Q2B → Q3 → Q4 → Q6–Q11 → Q12 contact (11 screens).
 * Converters (both): adds Q5 direction (12 screens).
 */
export function getSurveyQuestions(
  answers: Record<string, string | string[] | undefined>,
): Question[] {
  const q1 = answers.q1 as string | undefined

  if (!q1) {
    return [Q1]
  }

  if (q1 === 'none') {
    return [Q1, Q2A, Q3, Q4, Q10_CONTACT]
  }

  const flow: Question[] = [Q1, Q2B, Q3, Q4]

  if (q1 === 'both') {
    flow.push(Q5)
  }

  flow.push(Q6, Q7, Q8, Q9, Q10_FRICTION, Q11_INERTIA, Q12_CONTACT)

  return flow
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
