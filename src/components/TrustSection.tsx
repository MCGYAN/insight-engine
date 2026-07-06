import { landingConfig } from '@/config/landing'

export function TrustSection() {
  const { trust } = landingConfig

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-label">{trust.title}</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {trust.subtitle}
        </h2>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:mt-12 sm:gap-4">
        {trust.items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:flex-row sm:gap-4 sm:p-6"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent sm:h-8 sm:w-8">
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text sm:text-base">{item.label}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
