import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ASSESSMENT_QUESTION_COUNT,
  buildAssessmentFlow,
} from '@/config/fieldMapping'
import { clearProgress, loadProgress, saveProgress } from '@/services/storage'
import type { Question } from '@/types/Question'
import type {
  ActiveQuestion,
  SurveyAnswers,
  SurveyPhase,
} from '@/types/Survey'

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

  const activeQuestion: ActiveQuestion | null = useMemo(() => {
    if (phase !== 'survey' || currentIndex >= questionFlow.length) return null
    const question = questionFlow[currentIndex]
    return {
      question,
      index: currentIndex + 1,
      total: ASSESSMENT_QUESTION_COUNT,
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

      if (question.type === 'currency_amount') {
        const currency = answers['q8_currency']
        const amount = answers['q8_amount']
        if (!currency || typeof currency !== 'string') return false
        if (currency === 'other') {
          const other = answers['q8_currency_other']
          if (typeof other !== 'string' || !other.trim()) return false
        }
        if (typeof amount !== 'string' || !amount.trim()) return false
        return /^\d+(\.\d+)?$/.test(amount.trim())
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
      setAnswers((prev) => {
        const next = { ...prev, [questionId]: value }

        if (questionId === 'q1' && value !== 'other') delete next.q1_other
        if (questionId === 'q3' && value !== 'other') delete next.q3_other
        if (questionId === 'q8_currency' && value !== 'other') {
          delete next.q8_currency_other
        }
        if (questionId === 'q9' && value !== 'other') delete next.q9_other

        persist(next, currentIndex)
        return next
      })
    },
    [currentIndex, persist],
  )

  const goNext = useCallback(() => {
    if (!activeQuestion || !canGoNext) return
    const nextIndex = currentIndex + 1
    if (nextIndex >= ASSESSMENT_QUESTION_COUNT) return
    setCurrentIndex(nextIndex)
    persist(answers, nextIndex)
  }, [activeQuestion, canGoNext, currentIndex, answers, persist])

  const goBack = useCallback(() => {
    if (currentIndex <= 0) return
    const nextIndex = currentIndex - 1
    setCurrentIndex(nextIndex)
    persist(answers, nextIndex)
  }, [currentIndex, answers, persist])

  const isLastQuestion = currentIndex === ASSESSMENT_QUESTION_COUNT - 1

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
