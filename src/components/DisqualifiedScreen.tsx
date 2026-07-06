import { Button } from '@/layout/Button'

interface DisqualifiedScreenProps {
  onReset: () => void
}

export function DisqualifiedScreen({ onReset }: DisqualifiedScreenProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-16 animate-fade-in">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-semibold text-text sm:text-3xl">
          This assessment is for crypto users
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          The guide and assessment are designed for people who have used
          cryptocurrency. Thank you for stopping by.
        </p>
        <Button variant="secondary" className="mt-8" onClick={onReset}>
          Return to home
        </Button>
      </div>
    </div>
  )
}
