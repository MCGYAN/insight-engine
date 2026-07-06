import type { Question } from '../types/Question'

export const universalQuestions: Question[] = [
  {
    id: 'u_q1',
    section: 'universal',
    type: 'single',
    label: 'Have you ever used cryptocurrency?',
    required: true,
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No', endSurvey: true },
    ],
  },
  {
    id: 'u_q2',
    section: 'universal',
    type: 'multi',
    label: 'Which of these have you personally done with cryptocurrency?',
    description: 'Select all that apply',
    required: true,
    options: [
      { id: 'buy_crypto', label: 'Buy crypto' },
      { id: 'sell_crypto', label: 'Sell crypto' },
      { id: 'convert_cash', label: 'Convert to cash' },
      { id: 'convert_momo', label: 'Convert to Mobile Money' },
      { id: 'send_money', label: 'Send money' },
      { id: 'receive_money', label: 'Receive money' },
      { id: 'pay_goods', label: 'Pay for goods/services' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    id: 'u_q3',
    section: 'universal',
    type: 'single',
    label: 'Think about the LAST time you used cryptocurrency. What were you trying to do?',
    required: true,
    options: [
      {
        id: 'get_physical_cash',
        label: 'Get physical cash',
        branchId: 'get_physical_cash',
      },
      {
        id: 'receive_mobile_money',
        label: 'Receive mobile money',
        branchId: 'receive_mobile_money',
      },
      {
        id: 'buy_cryptocurrency',
        label: 'Buy cryptocurrency',
        branchId: 'buy_cryptocurrency',
      },
      {
        id: 'sell_cryptocurrency',
        label: 'Sell cryptocurrency',
        branchId: 'sell_cryptocurrency',
      },
      { id: 'send_money', label: 'Send money', branchId: 'send_money' },
      {
        id: 'receive_money',
        label: 'Receive money',
        branchId: 'receive_money',
      },
      {
        id: 'pay_goods_services',
        label: 'Pay for goods or services',
        branchId: 'pay_goods_services',
      },
    ],
  },
]

export const commonQuestions: Question[] = [
  {
    id: 'c_q1',
    section: 'common',
    type: 'text',
    label: 'If you could change ONE thing about that experience, what would it be?',
    required: true,
    placeholder: 'Share your thoughts…',
  },
  {
    id: 'c_q2',
    section: 'common',
    type: 'multi',
    label: 'What would make you trust a new crypto money service?',
    description: 'Choose up to 3',
    required: true,
    maxSelections: 3,
    options: [
      { id: 'fast_transactions', label: 'Fast transactions' },
      { id: 'transparent_fees', label: 'Transparent fees' },
      { id: 'strong_security', label: 'Strong security' },
      { id: 'physical_location', label: 'Physical location' },
      { id: 'customer_support', label: 'Customer support' },
      { id: 'reviews', label: 'Reviews' },
      { id: 'regulation', label: 'Regulation' },
      { id: 'recommendation', label: 'Recommendation' },
      { id: 'other', label: 'Other' },
    ],
  },
  {
    id: 'c_q3',
    section: 'common',
    type: 'text',
    label: "What's the best WhatsApp number to reach you on?",
    description: "We'll only use this number to:",
    bullets: [
      'contact you if we need clarification about your responses,',
      'invite a small number of participants for a short follow-up interview,',
      'and share important updates about this study if needed.',
    ],
    footerNote:
      'We will never add you to any WhatsApp group without your permission.',
    required: true,
    placeholder: 'e.g. +233 XX XXX XXXX',
    inputMode: 'tel',
  },
]
