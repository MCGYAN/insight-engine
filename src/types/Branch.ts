import type { Question } from './Question'

export interface Branch {
  id: string
  label: string
  questions: Question[]
}
