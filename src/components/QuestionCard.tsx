'use client'

import { CURRENCY_OPTIONS } from '@/config/assessment'
import { INPUT_MAX_LENGTH } from '@/utils/inputSanitizer'
import type { Question } from '@/types/Question'

interface QuestionCardProps {
  question: Question
  answers: Record<string, string | string[] | undefined>
  onChange: (questionId: string, value: string | string[]) => void
}

const inputBase =
  'w-full rounded-2xl border-2 border-border bg-surface px-5 py-4 text-lg text-text placeholder:text-muted/50 transition-all duration-200 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10'

export function QuestionCard({
  question,
  answers,
  onChange,
}: QuestionCardProps) {
  const value = answers[question.id]
  const maxLength = INPUT_MAX_LENGTH[question.id]

  if (question.type === 'currency_amount') {
    const currency = (answers['q8_currency'] as string) ?? ''
    const currencyOther = (answers['q8_currency_other'] as string) ?? ''
    const amount = (answers['q8_amount'] as string) ?? ''

    return (
      <div className="space-y-6">
        <div>
          <p className="mb-3 text-sm font-medium text-muted">Currency</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {CURRENCY_OPTIONS.map((opt) => {
              const selected = currency === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange('q8_currency', opt.id)}
                  className={`rounded-2xl border-2 px-3 py-4 text-center text-base font-semibold transition-all duration-200 active:scale-[0.98] ${
                    selected
                      ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
                      : 'border-border bg-surface text-text hover:border-primary/30'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {currency === 'other' && (
          <div className="animate-fade-in">
            <p className="mb-3 text-sm font-medium text-muted">
              Which currency?
            </p>
            <input
              type="text"
              value={currencyOther}
              onChange={(e) => onChange('q8_currency_other', e.target.value)}
              placeholder="e.g. ETH, SOL…"
              maxLength={INPUT_MAX_LENGTH.q8_currency_other}
              className={inputBase}
            />
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-medium text-muted">Amount</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => {
              const val = e.target.value.replace(/[^\d.]/g, '')
              onChange('q8_amount', val)
            }}
            placeholder="e.g. 500"
            maxLength={INPUT_MAX_LENGTH.q8_amount}
            className={inputBase}
          />
        </div>
      </div>
    )
  }

  if (question.type === 'text') {
    if (question.inputMode === 'tel') {
      return (
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          maxLength={INPUT_MAX_LENGTH.q10}
          className={inputBase}
          aria-label={question.label}
        />
      )
    }

    if (question.variant === 'paragraph') {
      return (
        <textarea
          value={(value as string) ?? ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          maxLength={maxLength}
          className={`${inputBase} resize-none`}
          aria-label={question.label}
        />
      )
    }

    return (
      <input
        type="text"
        value={(value as string) ?? ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder={question.placeholder}
        maxLength={maxLength}
        className={inputBase}
        aria-label={question.label}
      />
    )
  }

  if (question.type === 'multi') {
    const selected = Array.isArray(value) ? value : []
    const max = question.maxSelections

    const toggle = (optionId: string) => {
      if (selected.includes(optionId)) {
        onChange(question.id, selected.filter((id) => id !== optionId))
        return
      }
      if (max && selected.length >= max) return
      onChange(question.id, [...selected, optionId])
    }

    return (
      <div className="space-y-2.5" role="group" aria-label={question.label}>
        {question.options?.map((option) => {
          const isSelected = selected.includes(option.id)
          const isDisabled =
            !isSelected && max !== undefined && selected.length >= max

          return (
            <OptionButton
              key={option.id}
              label={option.label}
              selected={isSelected}
              disabled={isDisabled}
              onClick={() => toggle(option.id)}
            />
          )
        })}
      </div>
    )
  }

  // single select
  const showInlineOther =
    question.inlineOther && value === 'other'

  return (
    <div className="space-y-2.5">
      <div className="space-y-2.5" role="radiogroup" aria-label={question.label}>
        {question.options?.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onClick={() => onChange(question.id, option.id)}
          />
        ))}
      </div>

      {showInlineOther && question.inlineOther && (
        <div className="animate-fade-in pt-2">
          <p className="mb-3 text-base font-medium text-text">
            {question.inlineOther.label}
          </p>
          <input
            type="text"
            value={(answers[question.inlineOther.fieldId] as string) ?? ''}
            onChange={(e) =>
              onChange(question.inlineOther!.fieldId, e.target.value)
            }
            placeholder={question.inlineOther.placeholder}
            maxLength={INPUT_MAX_LENGTH[question.inlineOther.fieldId]}
            className={inputBase}
            autoFocus
          />
        </div>
      )}
    </div>
  )
}

function OptionButton({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string
  selected: boolean
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      disabled={disabled}
      className={`group w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-medium transition-all duration-200 active:scale-[0.99] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 ${
        selected
          ? 'border-primary bg-primary text-white shadow-md shadow-primary/20'
          : disabled
            ? 'cursor-not-allowed border-border bg-surface text-muted/40'
            : 'border-border bg-surface text-text hover:border-primary/30 hover:bg-background'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            selected
              ? 'border-white bg-white text-primary'
              : 'border-border bg-surface group-hover:border-primary/30'
          }`}
        >
          {selected && (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}
