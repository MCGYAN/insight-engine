'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { LandingPage } from '@/components/LandingPage'
import { clearProgress, loadProgress } from '@/services/storage'
import { captureUtmFromUrl } from '@/services/utm'

const SurveyEngine = dynamic(
  () => import('@/components/SurveyEngine').then((m) => ({ default: m.SurveyEngine })),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading assessment…
      </div>
    ),
  },
)

export function HomePage() {
  const [view, setView] = useState<'landing' | 'survey'>('landing')
  const [surveyKey, setSurveyKey] = useState(0)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    captureUtmFromUrl()
    if (loadProgress()) setView('survey')
    setHydrated(true)
  }, [])

  const handleStart = useCallback(() => {
    clearProgress()
    setSurveyKey((k) => k + 1)
    setView('survey')
  }, [])

  const handleExit = useCallback(() => {
    setView('landing')
  }, [])

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        Loading…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {view === 'landing' ? (
        <LandingPage onStart={handleStart} />
      ) : (
        <SurveyEngine key={surveyKey} onExit={handleExit} />
      )}
    </div>
  )
}
