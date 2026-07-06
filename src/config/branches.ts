import type { Branch } from '../types/Branch'
import type { Question } from '../types/Question'
import {
  CURRENT_SOLUTION_OPTIONS,
  FRICTION_OPTIONS,
  FREQUENCY_OPTIONS,
  INERTIA_OPTIONS,
  JOB_OPTIONS,
  PULL_OPTIONS,
  PUSH_OPTIONS,
  PUSH_QUESTION_LABELS,
  VALUE_OPTIONS,
} from './sharedOptions'

function createBranchQuestions(branchId: string): Question[] {
  return [
    {
      id: `${branchId}_push`,
      section: 'branch',
      type: 'single',
      label: PUSH_QUESTION_LABELS[branchId],
      description: 'Real event. Choose the closest answer.',
      required: true,
      forceType: 'push',
      options: PUSH_OPTIONS[branchId],
    },
    {
      id: `${branchId}_job`,
      section: 'branch',
      type: 'single',
      label: 'What were you trying to achieve?',
      description:
        'Examples: Pay bills, Emergency, Business, Family support, Investment, Shopping, Salary, Other.',
      required: true,
      forceType: 'job',
      options: JOB_OPTIONS,
    },
    {
      id: `${branchId}_current_solution`,
      section: 'branch',
      type: 'single',
      label: 'How did you complete it?',
      required: true,
      forceType: 'current_solution',
      options: CURRENT_SOLUTION_OPTIONS,
    },
    {
      id: `${branchId}_pull`,
      section: 'branch',
      type: 'single',
      label: 'Why did you choose that option instead of another one?',
      required: true,
      forceType: 'pull',
      options: PULL_OPTIONS,
    },
    {
      id: `${branchId}_friction`,
      section: 'branch',
      type: 'single',
      label: 'What nearly stopped you from completing the transaction?',
      required: true,
      forceType: 'friction',
      options: FRICTION_OPTIONS,
    },
    {
      id: `${branchId}_inertia`,
      section: 'branch',
      type: 'single',
      label:
        'If a new service could help you do the same thing, what would make you hesitate before trying it?',
      required: true,
      forceType: 'inertia',
      options: INERTIA_OPTIONS,
    },
    {
      id: `${branchId}_frequency`,
      section: 'branch',
      type: 'single',
      label: 'How often do you need to do this?',
      required: true,
      forceType: 'frequency',
      options: FREQUENCY_OPTIONS,
    },
    {
      id: `${branchId}_value`,
      section: 'branch',
      type: 'single',
      label: 'What is the typical amount involved?',
      required: true,
      forceType: 'value',
      options: VALUE_OPTIONS,
    },
  ]
}

export const branches: Branch[] = [
  {
    id: 'get_physical_cash',
    label: 'Get Physical Cash',
    questions: createBranchQuestions('get_physical_cash'),
  },
  {
    id: 'receive_mobile_money',
    label: 'Receive Mobile Money',
    questions: createBranchQuestions('receive_mobile_money'),
  },
  {
    id: 'buy_cryptocurrency',
    label: 'Buy Cryptocurrency',
    questions: createBranchQuestions('buy_cryptocurrency'),
  },
  {
    id: 'sell_cryptocurrency',
    label: 'Sell Cryptocurrency',
    questions: createBranchQuestions('sell_cryptocurrency'),
  },
  {
    id: 'send_money',
    label: 'Send Money',
    questions: createBranchQuestions('send_money'),
  },
  {
    id: 'receive_money',
    label: 'Receive Money',
    questions: createBranchQuestions('receive_money'),
  },
  {
    id: 'pay_goods_services',
    label: 'Pay for Goods or Services',
    questions: createBranchQuestions('pay_goods_services'),
  },
]

export function getBranchById(branchId: string): Branch | undefined {
  return branches.find((b) => b.id === branchId)
}
