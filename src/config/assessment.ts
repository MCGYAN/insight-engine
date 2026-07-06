import type { Question } from '@/types/Question'
import {
  ASSESSMENT_QUESTION_COUNT,
  getBranchWording,
  resolveBranchId,
  type BranchId,
} from './branchWording'

export const CURRENCY_OPTIONS = [
  { id: 'ghs', label: 'GHS' },
  { id: 'usd', label: 'USD' },
  { id: 'usdt', label: 'USDT' },
  { id: 'btc', label: 'BTC' },
  { id: 'other', label: 'Other' },
] as const

const Q1_OPTIONS = [
  { id: 'buy_crypto', label: 'Buy Cryptocurrency' },
  { id: 'sell_crypto', label: 'Sell Cryptocurrency' },
  { id: 'send_money', label: 'Send Money' },
  { id: 'receive_money', label: 'Receive Money' },
  { id: 'convert_cash', label: 'Convert Crypto to Cash' },
  { id: 'convert_momo', label: 'Convert Crypto to Mobile Money' },
  { id: 'convert_to_crypto', label: 'Convert Cash to Crypto' },
  { id: 'other', label: 'Other' },
]

const Q3_OPTIONS = [
  { id: 'binance', label: 'Binance' },
  { id: 'bybit', label: 'Bybit' },
  { id: 'noones', label: 'Noones' },
  { id: 'yellow_card', label: 'Yellow Card' },
  { id: 'mybitstore', label: 'Mybitstore' },
  { id: 'friend', label: 'Friend' },
  { id: 'otc_agent', label: 'OTC Agent' },
  { id: 'exchange_shop', label: 'Exchange Shop' },
  { id: 'other', label: 'Other' },
]

const Q7_OPTIONS = [
  { id: 'daily', label: 'Daily' },
  { id: 'several_times_week', label: 'Several times a week' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'every_few_months', label: 'Every few months' },
  { id: 'rarely', label: 'Rarely' },
]

const Q9_SEGMENT_OPTIONS = [
  { id: 'student', label: 'Student' },
  { id: 'salaried', label: 'Salaried Employee' },
  { id: 'freelancer', label: 'Freelancer' },
  { id: 'business_owner', label: 'Business Owner' },
  { id: 'crypto_trader', label: 'Crypto Trader' },
  { id: 'investor', label: 'Investor' },
  { id: 'remote_worker', label: 'Remote Worker' },
  { id: 'other', label: 'Other' },
]

/**
 * Returns exactly 10 questions with branch-aware wording.
 * "Other" follow-ups appear inline on the same screen — never as extra steps.
 */
export function getAssessmentQuestions(
  answers: Record<string, string | string[] | undefined>,
): Question[] {
  const branchId = resolveBranchId(answers.q1 as string | undefined)
  const w = getBranchWording(branchId)

  return [
    {
      id: 'q1',
      section: 'assessment',
      type: 'single',
      label:
        'Which of these best describes the last thing you used cryptocurrency for?',
      required: true,
      options: Q1_OPTIONS,
      inlineOther: {
        fieldId: 'q1_other',
        label: 'What did you use it for?',
        placeholder: 'Tell us in a few words…',
      },
    },
    {
      id: 'q2',
      section: 'assessment',
      type: 'text',
      variant: 'short',
      label: `Think about the last time you ${w.activityPast}.\nWhat happened that made you need to do it?`,
      required: true,
      placeholder: 'What was going on at the time?',
    },
    {
      id: 'q3',
      section: 'assessment',
      type: 'single',
      label: 'How did you get it done?',
      required: true,
      options: Q3_OPTIONS,
      inlineOther: {
        fieldId: 'q3_other',
        label: 'What did you use instead?',
        placeholder: 'Tell us what you used…',
      },
    },
    {
      id: 'q4',
      section: 'assessment',
      type: 'text',
      variant: 'short',
      label: 'Why did you choose that option?',
      required: true,
      placeholder: 'e.g. Faster, someone you trust, better rate…',
    },
    {
      id: 'q5',
      section: 'assessment',
      type: 'text',
      variant: 'paragraph',
      label:
        'What was the most frustrating or difficult part of the experience?',
      required: true,
      placeholder: 'What made it hard or annoying for you?',
    },
    {
      id: 'q6',
      section: 'assessment',
      type: 'text',
      variant: 'paragraph',
      label:
        'If you could improve just ONE thing about that experience, what would it be?',
      required: true,
      placeholder: 'What would have made it better for you?',
    },
    {
      id: 'q7',
      section: 'assessment',
      type: 'single',
      label: `How often do you usually ${w.activityBase}?`,
      required: true,
      options: Q7_OPTIONS,
    },
    {
      id: 'q8',
      section: 'assessment',
      type: 'currency_amount',
      label: `About how much money do you usually move each time you ${w.activityBase}?`,
      required: true,
    },
    {
      id: 'q9',
      section: 'assessment',
      type: 'single',
      label: 'Which best describes you?',
      required: true,
      options: Q9_SEGMENT_OPTIONS,
      inlineOther: {
        fieldId: 'q9_other',
        label: 'Please describe yourself.',
        placeholder: 'In a few words…',
      },
    },
    {
      id: 'q10',
      section: 'assessment',
      type: 'text',
      variant: 'short',
      label: "What's the best WhatsApp number to reach you on?",
      description:
        "We'll only use this number if we need clarification about your responses or would like to invite you to an optional follow-up interview.",
      footerNote:
        'We will never add you to any WhatsApp group without your permission.',
      required: true,
      placeholder: 'e.g. +233 XX XXX XXXX',
      inputMode: 'tel',
    },
  ]
}

export { ASSESSMENT_QUESTION_COUNT, resolveBranchId, type BranchId }
