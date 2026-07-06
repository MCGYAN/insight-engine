import type { Branch } from './Branch'
import type { Question } from './Question'

export interface SurveyConfig {
  id: string
  title: string
  universalQuestions: Question[]
  branches: Branch[]
  commonQuestions: Question[]
}

export type SurveyPhase = 'landing' | 'survey' | 'complete' | 'disqualified'

export interface SurveyAnswers {
  [questionId: string]: string | string[]
}

export interface SurveySubmission {
  surveyId: string
  branchId: string | null
  answers: SurveyAnswers
  metadata: {
    submittedAt: string
    userAgent: string
    durationMs: number
  }
}

export interface ActiveQuestion {
  question: Question
  index: number
  total: number
  section: 'universal' | 'branch' | 'common' | 'assessment'
}
