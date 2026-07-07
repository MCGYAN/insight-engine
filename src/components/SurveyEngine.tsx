'use client'

import { lazy, Suspense, useCallback, useState } from 'react'
import { resolveSurveyBranch } from '@/config/assessment'
import { landingConfig } from '@/config/landing'
import { surveyConfig } from '@/config/survey'
import { useSurveyFlow } from '@/hooks/useSurveyFlow'
import { submitSurveyResponses } from '@/services/googleSheets'
import { getStoredUtm } from '@/services/utm'
import type { SurveySubmission } from '@/types/Survey'
import { ProgressBar } from './ProgressBar'
import { QuestionCard } from './QuestionCard'
import { SubmittingOverlay } from './SubmittingOverlay'

const SuccessScreen = lazy(() =>
  import('./SuccessScreen').then((m) => ({ default: m.SuccessScreen })),
)

interface SurveyEngineProps {
  onExit?: () => void
}

export function SurveyEngine({ onExit }: SurveyEngineProps) {
  const {
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
  } = useSurveyFlow()

  const [transitionKey, setTransitionKey] = useState(0)

  const submitAssessment = useCallback(async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    const submission: SurveySubmission = {
      surveyId: surveyConfig.id,
      branchId: resolveSurveyBranch(answers.q1 as string | undefined),
      answers,
      utm: getStoredUtm(),
      metadata: {
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        durationMs: Date.now() - startedAt,
      },
    }

    const result = await submitSurveyResponses(submission)
    setIsSubmitting(false)

    if (result.success) {
      finishSurvey()
    } else {
      setSubmitError(result.error ?? 'Something went wrong. Please try again.')
    }
  }, [answers, startedAt, finishSurvey, setIsSubmitting, setSubmitError])

  const handleNext = useCallback(async () => {
    if (!activeQuestion) return
    if (isLastQuestion) {
      await submitAssessment()
      return
    }
    setTransitionKey((k) => k + 1)
    goNext()
  }, [activeQuestion, isLastQuestion, submitAssessment, goNext])

  const handleBack = useCallback(() => {
    setSubmitError(null)
    setTransitionKey((k) => k + 1)
    goBack()
  }, [goBack, setSubmitError])

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading…
      </div>
    )
  }

  if (phase === 'complete') {
    return (
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-muted">
            Loading…
          </div>
        }
      >
        <SuccessScreen
          onReset={() => {
            resetToLanding()
            onExit?.()
          }}
        />
      </Suspense>
    )
  }

  if (!activeQuestion) return null

  const { question, index, total } = activeQuestion

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {isSubmitting && <SubmittingOverlay />}

      {/* Top bar */}
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-surface/90 px-4 backdrop-blur-md sm:px-5">
        <button
          type="button"
          onClick={index > 1 ? handleBack : (onExit ?? resetToLanding)}
          className="inline-flex min-h-11 min-w-11 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-semibold text-text shadow-sm transition-colors hover:border-primary/30 hover:bg-background active:scale-[0.98] disabled:opacity-40"
          disabled={isSubmitting}
          aria-label={index > 1 ? 'Go back to previous question' : 'Leave survey'}
        >
          <svg
            className="h-5 w-5 shrink-0 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>{index > 1 ? 'Back' : 'Exit'}</span>
        </button>
        <span className="text-sm font-semibold text-primary">
          {landingConfig.guide.shortTitle}
        </span>
        <div className="w-[4.75rem] sm:w-20" aria-hidden="true" />
      </header>

      {/* Question area */}
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 pb-36 pt-6">
        <ProgressBar current={index} total={total} />

        <div key={transitionKey} className="animate-fade-in flex-1">
          <h2 className="whitespace-pre-line text-2xl font-bold leading-tight tracking-tight text-text sm:text-3xl">
            {question.label}
          </h2>

          {(question.description || question.footerNote) && (
            <div className="mt-5 space-y-2">
              {question.description && (
                <p className="text-base text-muted">{question.description}</p>
              )}
              {question.footerNote && (
                <p className="text-sm font-medium text-text/60">
                  {question.footerNote}
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            <QuestionCard
              question={question}
              answers={answers}
              onChange={setAnswer}
            />
          </div>

          {submitError && (
            <div
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4"
              role="alert"
            >
              <p className="text-sm font-medium text-red-800">
                Something went wrong
              </p>
              <p className="mt-1 text-sm text-red-700">{submitError}</p>
              <button
                type="button"
                onClick={submitAssessment}
                disabled={isSubmitting}
                className="mt-3 text-sm font-semibold text-red-800 underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Sticky bottom CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-surface/90 px-5 py-4 pb-safe backdrop-blur-md">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext || isSubmitting}
            className="w-full rounded-2xl bg-primary py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLastQuestion
              ? landingConfig.assessment.finish
              : landingConfig.assessment.continue}
          </button>
          <p className="mt-3 text-center text-xs font-medium text-muted">
            Your answers stay private · No wallet access needed
          </p>
        </div>
      </div>
    </div>
  )
}
