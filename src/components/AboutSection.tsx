import Image from 'next/image'
import { appConfig } from '@/config/survey'
import { landingConfig } from '@/config/landing'

export function AboutSection() {
  const { researcher } = appConfig
  const { about } = landingConfig

  return (
    <section className="py-16 sm:py-24">
      <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10 shadow-sm">
        <p className="section-label">{about.title}</p>

        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-2 ring-border ring-offset-2">
            <Image
              src={researcher.profileImage}
              alt={researcher.name}
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-text">
              {researcher.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{researcher.title}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text/80">
              {about.bio}
            </p>
            {researcher.profileUrl && (
              <a
                href={researcher.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary-light px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/30 hover:bg-primary/10"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {researcher.profileLabel ?? 'Follow me'}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
