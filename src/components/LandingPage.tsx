import { landingConfig } from '@/config/landing'
import { AboutSection } from './AboutSection'
import { ElaboratorSection } from './ElaboratorSection'
import { FinalCTA } from './FinalCTA'
import { Hero } from './Hero'
import { CTAButton } from './CTAButton'
import { Container } from '@/layout/Container'

interface LandingPageProps {
  onStart: () => void
}

export function LandingPage({ onStart }: LandingPageProps) {
  const { brand } = landingConfig

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-surface/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <span className="text-base font-semibold tracking-tight text-primary">
            {brand}
          </span>
          <CTAButton onClick={onStart} size="md">
            Get Checklist
          </CTAButton>
        </Container>
      </header>

      <main>
        <Container>
          <Hero onStart={onStart} />
          <ElaboratorSection />
          <AboutSection />
          <FinalCTA onStart={onStart} />
        </Container>
      </main>

      <footer className="border-t border-border py-10">
        <Container>
          <p className="text-center text-xs text-muted">
            © {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
        </Container>
      </footer>
    </>
  )
}
