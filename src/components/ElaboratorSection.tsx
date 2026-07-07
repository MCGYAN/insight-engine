import { landingConfig } from '@/config/landing'

const icons: Record<string, React.ReactNode> = {
  fees: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
    </svg>
  ),
  shield: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  ),
  chart: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
    </svg>
  ),
  check: (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
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
    <section className="py-12 sm:py-20">
      <div className="rounded-[2.5rem] border border-border bg-surface p-8 shadow-sm sm:p-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">{outcomes.title}</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {outcomes.subtitle}
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-2">
          {highlightOutcomes.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-border bg-background p-5 sm:p-8"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light text-primary sm:h-12 sm:w-12 sm:rounded-2xl">
                {icons[item.icon]}
              </div>
              <h3 className="text-base font-semibold text-text sm:text-lg">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-4xl border-t border-border pt-12">
          <p className="section-label text-center">{steps.title}</p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
            {steps.items.map((item) => (
              <div
                key={item.step}
                className="text-left last:col-span-2 last:mx-auto last:max-w-[280px] sm:last:col-span-1 sm:last:mx-0 sm:last:max-w-none"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-md shadow-primary/20 sm:mb-4 sm:h-12 sm:w-12 sm:text-lg">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-text sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-3xl bg-primary-light/60 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            {guidePreview.title}
          </p>
          <p className="mt-2 text-lg font-bold leading-snug text-text sm:text-xl">
            {guide.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            {guidePreview.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {trust.items.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-4"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs font-semibold leading-snug text-text sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
