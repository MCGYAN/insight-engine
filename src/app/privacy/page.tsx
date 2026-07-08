import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/layout/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Money Insights Ghana',
  description:
    'How Digital Money Insights Ghana collects and uses information submitted through Meta Instant Forms.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-10 sm:py-14">
      <Container narrow>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          ← Back to survey
        </Link>

        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Digital Money Insights Ghana
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">Last updated: July 8, 2026</p>
        </header>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-text">
          <section>
            <h2 className="text-lg font-semibold text-text">Overview</h2>
            <p className="mt-3 text-muted">
              Digital Money Insights Ghana runs research to understand how people
              move between physical cash and cryptocurrency. This page explains
              what we collect, how we use it, and what we do not collect.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text">
              Information we collect
            </h2>
            <p className="mt-3 text-muted">
              When you submit a form through Meta Instant Forms, we may receive:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number, if you choose to provide it</li>
              <li>Your survey responses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text">
              How we use your information
            </h2>
            <p className="mt-3 text-muted">We use this information only to:</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
              <li>Share the free guide with you</li>
              <li>
                Understand customer behaviour around physical cash and crypto
                conversion
              </li>
              <li>Contact you for follow-up, only if you agree</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-border bg-surface px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-text">
              What we do not collect
            </h2>
            <p className="mt-3 text-muted">
              We do not ask for, and you should never share:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>Wallet passwords</li>
              <li>Seed phrases</li>
              <li>PINs</li>
              <li>Private keys</li>
              <li>Account login details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text">
              How we protect your data
            </h2>
            <p className="mt-3 text-muted">
              Your information will not be sold. It will only be used for
              research and follow-up related to this project. Access is limited
              to people working on this research.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text">Contact</h2>
            <p className="mt-3 text-muted">
              If you have questions about this policy or how your data is used,
              contact us through the same channel you used to reach this
              research project.
            </p>
          </section>
        </div>
      </Container>
    </div>
  )
}
