/** Per-field input limits (characters). Enforced client-side and server-side. */
export const INPUT_MAX_LENGTH: Record<string, number> = {
  q1_other: 200,
  q2: 500,
  q3_other: 200,
  q4: 500,
  q5: 2000,
  q6: 2000,
  q8_currency_other: 50,
  q8_amount: 30,
  q9_other: 200,
  q10: 20,
}

export function sanitizeUserInput(value: string, fieldId?: string): string {
  let clean = value
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')

  if (fieldId && INPUT_MAX_LENGTH[fieldId] !== undefined) {
    clean = clean.slice(0, INPUT_MAX_LENGTH[fieldId])
  }

  return clean
}

export function sanitizeUserInputArray(values: string[], fieldId?: string): string[] {
  return values.map((v) => sanitizeUserInput(v, fieldId))
}
