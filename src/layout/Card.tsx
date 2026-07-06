import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClass = {
    sm: 'p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  }[padding]

  return (
    <div
      className={`rounded-2xl border border-border bg-surface shadow-sm ${paddingClass} ${className}`}
    >
      {children}
    </div>
  )
}
