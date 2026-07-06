import { landingConfig } from '@/config/landing'
import { CTAButton } from './CTAButton'

interface FinalCTAProps {
  onStart: () => void
}

export function FinalCTA({ onStart }: FinalCTAProps) {
  const { finalCta } = landingConfig

  return (
    <section className="py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
        >
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-xl">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2rem]">
            {finalCta.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            {finalCta.subheadline}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
            <CTAButton onClick={onStart} variant="light" fullWidth className="sm:w-auto sm:min-w-[280px]">
              {finalCta.cta}
            </CTAButton>
            <p className="flex items-center justify-center gap-1.5 text-sm text-white/75">
              <svg
                className="h-4 w-4 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {landingConfig.hero.ctaHint}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
