import type { SurveyAnswers } from '../types/Survey'

const STORAGE_KEY = 'afrimoney-survey-progress'

export interface SavedProgress {
  answers: SurveyAnswers
  currentIndex: number
  branchId: string | null
  startedAt: number
  savedAt: number
}

export function loadProgress(): SavedProgress | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedProgress
  } catch {
    return null
  }
}

export function saveProgress(progress: SavedProgress): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...progress, savedAt: Date.now() }),
    )
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
