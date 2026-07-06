import { landingConfig } from '@/config/landing'

function GuidePage({
  title,
  index,
  children,
}: {
  title: string
  index: number
  children?: React.ReactNode
}) {
  const rotations = [-6, 0, 4]
  const offsets = [0, 24, 48]
  const zIndexes = [10, 20, 30]

  return (
    <div
      className="absolute w-[200px] rounded-xl border border-border bg-surface p-5 shadow-lg transition-transform duration-500 hover:scale-[1.02] sm:w-[220px]"
      style={{
        transform: `rotate(${rotations[index]}deg) translateX(${offsets[index]}px)`,
        zIndex: zIndexes[index],
        left: `${index * 80}px`,
        top: `${index * 8}px`,
      }}
    >
      <div className="mb-3 h-1.5 w-8 rounded-full bg-primary/20" />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
        Chapter {index + 1}
      </p>
      <h4 className="mt-1 text-sm font-semibold leading-snug text-text">
        {title}
      </h4>
      {children ?? (
        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full rounded bg-border" />
          <div className="h-1.5 w-[80%] rounded bg-border" />
          <div className="h-1.5 w-full rounded bg-border" />
          <div className="h-1.5 w-[60%] rounded bg-border" />
        </div>
      )}
    </div>
  )
}

export function GuidePreview() {
  const { guidePreview, guide } = landingConfig
  const previewChapters = guidePreview.chapters.slice(0, 3)

  return (
    <section className="py-16 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="section-label">{guidePreview.title}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-text sm:text-3xl">
            {guide.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {guidePreview.subtitle}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-2 sm:mt-8 lg:grid-cols-1 lg:gap-3">
            {guidePreview.chapters.map((chapter, i) => (
              <li
                key={chapter}
                className="flex items-start gap-2 text-xs text-text sm:gap-3 sm:text-sm"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accent-light text-[10px] font-semibold text-accent-dark sm:text-xs">
                  {i + 1}
                </span>
                <span className="leading-snug">{chapter}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex h-[320px] w-full max-w-md items-center justify-center sm:h-[340px]">
          <div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5"
            aria-hidden="true"
          />
          <div className="relative h-[260px] w-[320px] sm:w-[360px]">
            {previewChapters.map((chapter, i) => (
              <GuidePage key={chapter} title={chapter} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
