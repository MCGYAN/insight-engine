import type { ReactNode } from 'react'

interface CTAButtonProps {
  children: ReactNode
  onClick: () => void
  size?: 'md' | 'lg'
  fullWidth?: boolean
  variant?: 'primary' | 'light'
  className?: string
}

export function CTAButton({
  children,
  onClick,
  size = 'lg',
  fullWidth = false,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const variants = {
    primary:
      'bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-primary',
    light:
      'bg-white text-primary shadow-lg hover:bg-white/95 focus-visible:ring-white',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        size === 'lg' ? 'px-8 py-4 text-base' : 'px-6 py-3 text-sm'
      } ${fullWidth ? 'w-full' : ''} ${variants[variant]} ${className}`}
    >
      {children}
      <svg
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  )
}

export function CTABadge({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center justify-center gap-1.5 text-sm text-muted">
      <svg
        className="h-4 w-4 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {children}
    </p>
  )
}
