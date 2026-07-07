/**
 * Accepts common Ghana phone formats:
 * - +233XXXXXXXXX (international)
 * - 0XXXXXXXXX (10-digit local)
 * - XXXXXXXXX (9-digit mobile without leading zero)
 */
export function isValidPhoneNumber(phone: string): boolean {
  const stripped = phone.trim().replace(/^'/, '')
  const compact = stripped.replace(/[\s\-()]/g, '')
  if (!compact) return true

  if (/^\+233\d{9}$/.test(compact)) return true
  if (/^0\d{9}$/.test(compact)) return true
  if (/^\d{9}$/.test(compact)) return true

  return false
}
