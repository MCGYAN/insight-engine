export type QuestionType =
  | 'single'
  | 'multi'
  | 'text'
  | 'number'
  | 'currency_amount'

export type ForceType =
  | 'push'
  | 'job'
  | 'current_solution'
  | 'pull'
  | 'friction'
  | 'inertia'
  | 'frequency'
  | 'value'

export interface QuestionOption {
  id: string
  label: string
  branchId?: string
  endSurvey?: boolean
}

export interface InlineOtherField {
  fieldId: string
  label: string
  placeholder?: string
}

export interface QuestionCondition {
  questionId: string
  answerIds: string[]
}

export interface Question {
  id: string
  section: 'universal' | 'branch' | 'common' | 'assessment'
  type: QuestionType
  label: string
  description?: string
  options?: QuestionOption[]
  forceType?: ForceType
  maxSelections?: number
  condition?: QuestionCondition
  required: boolean
  placeholder?: string
  bullets?: string[]
  footerNote?: string
  inputMode?: 'text' | 'tel'
  variant?: 'short' | 'paragraph'
  /** Shown on the same screen when "other" is selected */
  inlineOther?: InlineOtherField
}
