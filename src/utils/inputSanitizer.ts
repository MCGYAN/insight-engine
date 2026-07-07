/** Per-field input limits (characters). Enforced client-side and server-side. */
export const INPUT_MAX_LENGTH: Record<string, number> = {
  q2a_other: 200,
  q5_other: 200,
  q6: 500,
  q7_other: 200,
  q8: 2000,
  q10_phone: 20,
  q10_email: 120,
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
