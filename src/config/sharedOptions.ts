import type { QuestionOption } from '../types/Question'

/** Shared option sets used across branch questions (from PDF) */
export const JOB_OPTIONS: QuestionOption[] = [
  { id: 'pay_bills', label: 'Pay bills' },
  { id: 'emergency', label: 'Emergency' },
  { id: 'business', label: 'Business' },
  { id: 'family_support', label: 'Family support' },
  { id: 'investment', label: 'Investment' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'salary', label: 'Salary' },
  { id: 'other', label: 'Other' },
]

export const CURRENT_SOLUTION_OPTIONS: QuestionOption[] = [
  { id: 'binance_p2p', label: 'Binance P2P' },
  { id: 'otc_trader', label: 'OTC Trader' },
  { id: 'exchange', label: 'Exchange' },
  { id: 'friend', label: 'Friend' },
  { id: 'another_app', label: 'Another App' },
  { id: 'other', label: 'Other' },
]

export const PULL_OPTIONS: QuestionOption[] = [
  { id: 'speed', label: 'Speed' },
  { id: 'better_rates', label: 'Better rates' },
  { id: 'trusted_person', label: 'Trusted person' },
  { id: 'convenience', label: 'Convenience' },
  { id: 'only_option', label: 'Only option available' },
  { id: 'recommended', label: 'Recommended' },
  { id: 'other', label: 'Other' },
]

export const FRICTION_OPTIONS: QuestionOption[] = [
  { id: 'fees', label: 'Fees' },
  { id: 'scam_concerns', label: 'Scam concerns' },
  { id: 'no_trader', label: "Couldn't find trader" },
  { id: 'delay', label: 'Delay' },
  { id: 'verification', label: 'Verification' },
  { id: 'payment_issue', label: 'Payment issue' },
  { id: 'confusing_process', label: 'Confusing process' },
  { id: 'other', label: 'Other' },
]

export const INERTIA_OPTIONS: QuestionOption[] = [
  { id: 'trust_current', label: 'I trust my current method' },
  { id: 'need_proof', label: 'Need proof' },
  { id: 'friends_first', label: 'Friends must use it first' },
  { id: 'security_concerns', label: 'Security concerns' },
  { id: 'dont_like_changing', label: "Don't like changing" },
  { id: 'other', label: 'Other' },
]

export const FREQUENCY_OPTIONS: QuestionOption[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'every_few_months', label: 'Every few months' },
  { id: 'rarely', label: 'Rarely' },
]

export const VALUE_OPTIONS: QuestionOption[] = [
  { id: 'under_500', label: '<GHS500' },
  { id: '500_2000', label: 'GHS500 to 2,000' },
  { id: '2001_5000', label: 'GHS2,001 to 5,000' },
  { id: '5001_10000', label: 'GHS5,001 to 10,000' },
  { id: 'over_10000', label: '>GHS10,000' },
]

export const TRUST_DRIVER_OPTIONS: QuestionOption[] = [
  { id: 'fast_transactions', label: 'Fast transactions' },
  { id: 'transparent_fees', label: 'Transparent fees' },
  { id: 'strong_security', label: 'Strong security' },
  { id: 'physical_location', label: 'Physical location' },
  { id: 'customer_support', label: 'Customer support' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'regulation', label: 'Regulation' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'other', label: 'Other' },
]

/** Real-event push options per branch (PDF: choose closest answer + Other) */
export const PUSH_OPTIONS: Record<string, QuestionOption[]> = {
  get_physical_cash: [
    { id: 'merchant_cash_only', label: 'Merchant only accepted cash' },
    { id: 'bills_due', label: 'Bills or rent were due' },
    { id: 'emergency_cash', label: 'Unexpected emergency expense' },
    { id: 'business_cash', label: 'Business needed physical cash' },
    { id: 'momo_limit', label: 'Mobile money limit reached' },
    { id: 'family_needed', label: 'Family member needed cash' },
    { id: 'other', label: 'Other' },
  ],
  receive_mobile_money: [
    { id: 'client_payment', label: 'Client or customer paid me' },
    { id: 'family_sent', label: 'Family sent support' },
    { id: 'salary_crypto', label: 'Salary or freelance payment in crypto' },
    { id: 'sold_goods', label: 'Sold goods or services' },
    { id: 'investment_return', label: 'Investment return' },
    { id: 'friend_owed', label: 'Friend owed me money' },
    { id: 'other', label: 'Other' },
  ],
  buy_cryptocurrency: [
    { id: 'investment_opportunity', label: 'Saw an investment opportunity' },
    { id: 'protect_savings', label: 'Wanted to protect savings from inflation' },
    { id: 'pay_crypto', label: 'Needed crypto to pay someone' },
    { id: 'friend_recommended', label: 'Friend recommended buying' },
    { id: 'business_needs', label: 'Business required crypto' },
    { id: 'remittance', label: 'Planning to send money abroad' },
    { id: 'other', label: 'Other' },
  ],
  sell_cryptocurrency: [
    { id: 'need_cash_urgent', label: 'Urgently needed cash' },
    { id: 'take_profit', label: 'Wanted to take profit' },
    { id: 'bills_due', label: 'Bills or expenses were due' },
    { id: 'lost_confidence', label: 'Lost confidence in the market' },
    { id: 'business_expense', label: 'Business expense came up' },
    { id: 'convert_savings', label: 'Converting savings to local currency' },
    { id: 'other', label: 'Other' },
  ],
  send_money: [
    { id: 'family_support', label: 'Supporting family abroad' },
    { id: 'business_payment', label: 'Paying a business partner' },
    { id: 'friend_owed', label: 'Paying back a friend' },
    { id: 'school_fees', label: 'School fees or tuition' },
    { id: 'emergency_abroad', label: 'Emergency for someone abroad' },
    { id: 'freelance_payment', label: 'Paying a freelancer or vendor' },
    { id: 'other', label: 'Other' },
  ],
  receive_money: [
    { id: 'client_payment', label: 'Client paid for work' },
    { id: 'family_abroad', label: 'Family sent money from abroad' },
    { id: 'business_income', label: 'Business income received' },
    { id: 'freelance_income', label: 'Freelance payment received' },
    { id: 'gift', label: 'Received a gift or donation' },
    { id: 'investment_return', label: 'Investment return' },
    { id: 'other', label: 'Other' },
  ],
  pay_goods_services: [
    { id: 'online_purchase', label: 'Online purchase' },
    { id: 'subscription', label: 'Subscription or service fee' },
    { id: 'merchant_accepted', label: 'Merchant accepted crypto' },
    { id: 'travel', label: 'Travel or booking' },
    { id: 'education', label: 'Education or course payment' },
    { id: 'business_supplies', label: 'Business supplies or inventory' },
    { id: 'other', label: 'Other' },
  ],
}

export const PUSH_QUESTION_LABELS: Record<string, string> = {
  get_physical_cash: 'What happened that made you need to get physical cash?',
  receive_mobile_money: 'What happened that made you need to receive mobile money?',
  buy_cryptocurrency: 'What happened that made you need to buy cryptocurrency?',
  sell_cryptocurrency: 'What happened that made you need to sell cryptocurrency?',
  send_money: 'What happened that made you need to send money?',
  receive_money: 'What happened that made you need to receive money?',
  pay_goods_services: 'What happened that made you need to pay for goods or services?',
}
