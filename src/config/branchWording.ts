export type BranchId =
  | 'buy_crypto'
  | 'sell_crypto'
  | 'send_money'
  | 'receive_money'
  | 'convert_cash'
  | 'convert_momo'
  | 'convert_to_crypto'
  | 'other'

export interface BranchWording {
  /** e.g. "bought cryptocurrency" */
  activityPast: string
  /** e.g. "buy cryptocurrency" */
  activityBase: string
}

export const BRANCH_WORDING: Record<BranchId, BranchWording> = {
  buy_crypto: {
    activityPast: 'bought cryptocurrency',
    activityBase: 'buy cryptocurrency',
  },
  sell_crypto: {
    activityPast: 'sold cryptocurrency',
    activityBase: 'sell cryptocurrency',
  },
  send_money: {
    activityPast: 'sent money',
    activityBase: 'send money',
  },
  receive_money: {
    activityPast: 'received money',
    activityBase: 'receive money',
  },
  convert_cash: {
    activityPast: 'converted crypto to cash',
    activityBase: 'convert crypto to cash',
  },
  convert_momo: {
    activityPast: 'converted crypto to mobile money',
    activityBase: 'convert crypto to mobile money',
  },
  convert_to_crypto: {
    activityPast: 'converted cash to crypto',
    activityBase: 'convert cash to crypto',
  },
  other: {
    activityPast: 'used cryptocurrency',
    activityBase: 'use cryptocurrency',
  },
}

export function resolveBranchId(
  q1Answer: string | undefined,
): BranchId {
  if (q1Answer && q1Answer in BRANCH_WORDING) {
    return q1Answer as BranchId
  }
  return 'other'
}

export function getBranchWording(branchId: BranchId): BranchWording {
  return BRANCH_WORDING[branchId]
}

/** Exactly 10 assessment screens — never more */
export const ASSESSMENT_QUESTION_COUNT = 10
