/** Per-field input limits (characters). Enforced client-side and server-side. */
export const INPUT_MAX_LENGTH: Record<string, number> = {
  q2a_other: 200,
  q2b_other: 200,
  q3_other: 120,
  q4: 120,
  q6_other: 200,
  q9_other: 200,
  q10_other: 200,
  q10_phone: 20,
  q10_email: 120,
  q12_phone: 20,
  q12_email: 120,
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
