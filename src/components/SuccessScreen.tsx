import { appConfig } from '@/config/survey'
import { landingConfig } from '@/config/landing'
import { Button } from '@/layout/Button'
import { Container } from '@/layout/Container'

interface SuccessScreenProps {
  onReset?: () => void
}

function downloadGuide() {
  const { guide } = landingConfig
  const link = document.createElement('a')
  link.href = appConfig.playbookUrl
  link.download = guide.fileName
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function SuccessScreen({ onReset }: SuccessScreenProps) {
  const { success, guide } = landingConfig

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24">
      <Container narrow>
        <div className="mx-auto max-w-lg animate-scale-in">
          {/* Success indicator */}
          <div className="mb-10 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <div className="absolute inset-0 animate-ping rounded-full bg-accent/10 opacity-40" />
              <svg
                className="relative h-10 w-10 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  className="animate-[checkmark_0.6s_ease-out_forwards]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="100"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              <span className="mr-2" aria-hidden="true">
                {success.headlineEmoji}
              </span>
              {success.headline}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {success.thankYou}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {success.body}
            </p>
            <p className="mt-3 text-base font-medium text-text">
              {success.guideReady}
            </p>
          </div>

          {/* Guide preview */}
          <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-5 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Your free guide
            </p>
            <p className="mt-2 text-sm font-medium leading-snug text-text">
              {guide.title}
            </p>
          </div>

          {/* Primary CTA — download */}
          <div className="mt-8">
            <Button variant="primary" size="lg" fullWidth onClick={downloadGuide}>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              {success.download}
            </Button>
          </div>

          {/* Optional WhatsApp community */}
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text">
              {success.community.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {success.community.description}
            </p>
            <Button
              variant="secondary"
              size="md"
              fullWidth
              className="mt-5"
              onClick={() =>
                window.open(appConfig.whatsappCommunityUrl, '_blank')
              }
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {success.community.cta}
            </Button>
          </div>

          {/* Privacy note */}
          <p className="mt-6 text-center text-xs leading-relaxed text-muted">
            <span className="font-medium text-text/70">
              {success.privacy.title}
            </span>{' '}
            {success.privacy.body}
          </p>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="mt-10 block w-full text-center text-sm text-muted transition-colors hover:text-text"
            >
              Return to home
            </button>
          )}
        </div>
      </Container>
    </div>
  )
}
