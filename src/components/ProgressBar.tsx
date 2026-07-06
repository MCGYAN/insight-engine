interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-primary">
          {current} of {total}
        </span>
        <span className="text-sm text-muted">{percent}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-border/80"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
