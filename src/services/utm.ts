export const UTM_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
] as const

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number]

export type UtmParams = Record<UtmParamKey, string>

const UTM_STORAGE_KEY = 'insight-engine-utm'
const UTM_MAX_LENGTH = 120

const EMPTY_UTM: UtmParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
}

export function createEmptyUtmParams(): UtmParams {
  return { ...EMPTY_UTM }
}

function sanitizeUtmValue(value: string): string {
  return value
    .trim()
    .slice(0, UTM_MAX_LENGTH)
    .replace(/[^\w\-._]/g, '')
}

export function captureUtmFromUrl(): UtmParams {
  if (typeof window === 'undefined') return createEmptyUtmParams()

  const params = new URLSearchParams(window.location.search)
  const stored = getStoredUtm()
  const next: UtmParams = { ...stored }
  let changed = false

  for (const key of UTM_PARAM_KEYS) {
    const raw = params.get(key)
    if (raw !== null && raw !== '') {
      next[key] = sanitizeUtmValue(raw)
      changed = true
    }
  }

  if (changed) {
    try {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage unavailable — continue with in-memory values
    }
  }

  return next
}

export function getStoredUtm(): UtmParams {
  if (typeof window === 'undefined') return createEmptyUtmParams()

  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY)
    if (!raw) return createEmptyUtmParams()

    const parsed = JSON.parse(raw) as Partial<UtmParams>
    return {
      utm_source: parsed.utm_source ?? '',
      utm_medium: parsed.utm_medium ?? '',
      utm_campaign: parsed.utm_campaign ?? '',
      utm_content: parsed.utm_content ?? '',
    }
  } catch {
    return createEmptyUtmParams()
  }
}
