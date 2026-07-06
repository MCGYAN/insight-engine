import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm',
    secondary:
      'bg-surface text-text border border-border hover:bg-background active:scale-[0.98]',
    ghost: 'text-muted hover:text-text hover:bg-background',
  }

  const sizes = {
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
