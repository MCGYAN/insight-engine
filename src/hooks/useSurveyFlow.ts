import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildAssessmentFlow } from '@/config/fieldMapping'
import { clearProgress, loadProgress, saveProgress } from '@/services/storage'
import { sanitizeUserInput, sanitizeUserInputArray } from '@/utils/inputSanitizer'
import { isValidPhoneNumber } from '@/utils/phoneValidation'
import type { Question } from '@/types/Question'
import type {
  ActiveQuestion,
  SurveyAnswers,
  SurveyPhase,
} from '@/types/Survey'

const DOWNSTREAM_KEYS = [
  'q2a',
  'q2a_other',
  'q2b',
  'q3',
  'q4',
  'q5',
  'q5_other',
  'q6',
  'q7',
  'q7_other',
  'q8',
  'q9',
  'q10_contact',
  'q10_phone',
  'q10_email',
  'q10_whatsapp',
] as const

function isInlineOtherValid(
  question: Question,
  answers: SurveyAnswers,
): boolean {
  if (!question.inlineOther) return true
  const selected = answers[question.id]
  if (selected !== 'other') return true
  const otherVal = answers[question.inlineOther.fieldId]
  return typeof otherVal === 'string' && otherVal.trim().length > 0
}

function isContactValid(answers: SurveyAnswers): boolean {
  const consent = answers.q10_contact
  const whatsapp = answers.q10_whatsapp
  if (consent !== 'yes' && consent !== 'no') return false
  if (whatsapp !== 'yes' && whatsapp !== 'no') return false

  const phone = answers.q10_phone
  if (typeof phone === 'string' && phone.trim() && !isValidPhoneNumber(phone)) {
    return false
  }

  const email = answers.q10_email
  if (
    typeof email === 'string' &&
    email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    return false
  }

  return true
}

function clearDownstreamAnswers(next: SurveyAnswers, fromQuestionId: string) {
  if (fromQuestionId !== 'q1') return

  for (const key of DOWNSTREAM_KEYS) {
    delete next[key]
  }
}

export function useSurveyFlow() {
  const [phase, setPhase] = useState<SurveyPhase>('survey')
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startedAt, setStartedAt] = useState(Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadProgress()
    if (saved) {
      setAnswers(saved.answers)
      setCurrentIndex(saved.currentIndex)
      setStartedAt(saved.startedAt)
    }
    setHydrated(true)
  }, [])

  const questionFlow = useMemo(() => buildAssessmentFlow(answers), [answers])

  useEffect(() => {
    if (currentIndex >= questionFlow.length) {
      setCurrentIndex(Math.max(0, questionFlow.length - 1))
    }
  }, [currentIndex, questionFlow.length])

  const activeQuestion: ActiveQuestion | null = useMemo(() => {
    if (phase !== 'survey' || currentIndex >= questionFlow.length) return null
    const question = questionFlow[currentIndex]
    return {
      question,
      index: currentIndex + 1,
      total: questionFlow.length,
      section: question.section,
    }
  }, [phase, currentIndex, questionFlow])

  const persist = useCallback(
    (nextAnswers: SurveyAnswers, nextIndex: number) => {
      saveProgress({
        answers: nextAnswers,
        currentIndex: nextIndex,
        branchId: null,
        startedAt,
        savedAt: Date.now(),
      })
    },
    [startedAt],
  )

  const isAnswerValid = useCallback(
    (question: Question): boolean => {
      if (!question.required) return true

      if (question.type === 'contact') {
        return isContactValid(answers)
      }

      const answer = answers[question.id]
      if (question.type === 'text' || question.type === 'number') {
        if (typeof answer !== 'string' || !answer.trim()) return false
        return isInlineOtherValid(question, answers)
      }
      if (question.type === 'multi') {
        return Array.isArray(answer) && answer.length > 0
      }
      if (typeof answer !== 'string' || !answer.length) return false
      return isInlineOtherValid(question, answers)
    },
    [answers],
  )

  const canGoNext = activeQuestion
    ? isAnswerValid(activeQuestion.question)
    : false

  const setAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      const sanitized =
        typeof value === 'string'
          ? sanitizeUserInput(value, questionId)
          : sanitizeUserInputArray(value, questionId)

      setAnswers((prev) => {
        const next = { ...prev, [questionId]: sanitized }

        if (questionId === 'q1') clearDownstreamAnswers(next, 'q1')
        if (questionId === 'q2a' && value !== 'other') delete next.q2a_other
        if (questionId === 'q5' && value !== 'other') delete next.q5_other
        if (questionId === 'q7' && value !== 'other') delete next.q7_other
        if (questionId === 'q10_contact' && value === 'no') {
          delete next.q10_phone
          delete next.q10_email
        }

        persist(next, currentIndex)
        return next
      })
    },
    [currentIndex, persist],
  )

  const goNext = useCallback(() => {
    if (!activeQuestion || !canGoNext) return
    const nextIndex = currentIndex + 1
    if (nextIndex >= questionFlow.length) return
    setCurrentIndex(nextIndex)
    persist(answers, nextIndex)
  }, [activeQuestion, canGoNext, currentIndex, answers, persist, questionFlow.length])

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return
    const nextIndex = currentIndex - 1
    setCurrentIndex(nextIndex)
    persist(answers, nextIndex)
  }, [currentIndex, answers, persist])

  const isLastQuestion = currentIndex === questionFlow.length - 1

  const finishSurvey = useCallback(() => {
    clearProgress()
    setPhase('complete')
  }, [])

  const resetToLanding = useCallback(() => {
    clearProgress()
    setPhase('survey')
    setAnswers({})
    setCurrentIndex(0)
    setSubmitError(null)
  }, [])

  return {
    phase,
    answers,
    activeQuestion,
    startedAt,
    canGoNext,
    isLastQuestion,
    isSubmitting,
    submitError,
    hydrated,
    setAnswer,
    setIsSubmitting,
    setSubmitError,
    goNext,
    goBack,
    finishSurvey,
    resetToLanding,
    isAnswerValid,
  }
}
