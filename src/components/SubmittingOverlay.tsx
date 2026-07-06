import { landingConfig } from '@/config/landing'

export function SubmittingOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm animate-fade-in"
      role="status"
      aria-live="polite"
      aria-label="Submitting assessment"
    >
      <div className="mx-auto max-w-xs px-6 text-center">
        <div className="relative mx-auto h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
        <p className="mt-6 text-base font-semibold text-text">
          {landingConfig.assessment.submitting}
        </p>
        <p className="mt-2 text-sm text-muted">
          Saving your responses securely…
        </p>
        <div className="mt-6 flex justify-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}
