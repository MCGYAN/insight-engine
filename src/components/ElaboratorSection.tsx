import { landingConfig } from '@/config/landing'

const icons: Record<string, React.ReactNode> = {
  fees: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z" clipRule="evenodd" />
    </svg>
  ),
  shield: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ),
  alert: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 00-.75.75v3.75a.75.75 0 001.5 0V9a.75.75 0 00-.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
  ),
  check: (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ),
}

export function ElaboratorSection() {
  const { outcomes, steps, guide, guidePreview, trust } = landingConfig
  const highlightOutcomes = outcomes.items.filter((item) =>
    ['compare', 'verify', 'pressure', 'checklist'].includes(item.id),
  )

  return (
    <section className="py-8 sm:py-12">
      <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="section-label">{outcomes.title}</p>
          <p className="mt-2 text-base font-semibold text-text sm:text-lg">
            {outcomes.subtitle}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
          {highlightOutcomes.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2.5 rounded-2xl border border-border bg-background px-3 py-3 sm:px-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                {icons[item.icon]}
              </div>
              <span className="text-xs font-semibold leading-snug text-text sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <p className="section-label text-center">{steps.title}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
            {steps.items.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                  {item.step}
                </div>
                <p className="mt-2 text-xs font-semibold leading-snug text-text sm:text-sm">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-primary-light/60 px-4 py-4 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
            {guidePreview.title}
          </p>
          <p className="mt-1.5 text-sm font-bold leading-snug text-text sm:text-base">
            {guide.shortTitle}
          </p>
        </div>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted sm:text-xs">
          {trust.items.map((item, i) => (
            <span key={item.label}>
              {i > 0 && <span className="mx-1.5 text-border">·</span>}
              {item.label}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
