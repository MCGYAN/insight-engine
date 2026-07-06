import { landingConfig } from '@/config/landing'

export function HowItWorks() {
  const { steps } = landingConfig

  return (
    <section className="py-16 sm:py-24">
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:p-16 shadow-sm">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">{steps.title}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {steps.subtitle}
          </h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-5 sm:mt-14 sm:grid-cols-3 sm:gap-8">
          {steps.items.map((item) => (
            <div
              key={item.step}
              className="relative text-left last:col-span-2 last:mx-auto last:max-w-[280px] sm:last:col-span-1 sm:last:mx-0 sm:last:max-w-none"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-md shadow-primary/20 sm:mb-5 sm:h-12 sm:w-12 sm:text-lg">
                {item.step}
              </div>
              <h3 className="text-sm font-semibold text-text sm:text-lg">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
