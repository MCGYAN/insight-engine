import { landingConfig } from '@/config/landing'
import { CTABadge, CTAButton } from './CTAButton'

interface HeroProps {
  onStart: () => void
}

export function Hero({ onStart }: HeroProps) {
  const { hero } = landingConfig

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="animate-fade-in-up stagger-1 mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {hero.badge}
        </div>

        <h1 className="animate-fade-in-up stagger-2 text-[2rem] font-bold leading-[1.12] tracking-tight text-text sm:text-5xl lg:text-[3.25rem]">
          {hero.headline}
        </h1>

        <p className="animate-fade-in-up stagger-3 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          {hero.subheadline}
        </p>

        <div className="animate-fade-in-up stagger-4 mt-10 flex flex-col items-center gap-3">
          <CTAButton onClick={onStart}>{hero.cta}</CTAButton>
          <CTABadge>{hero.ctaHint}</CTABadge>
        </div>
      </div>
    </section>
  )
}
