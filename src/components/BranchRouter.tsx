import { getBranchById } from '../config/branches'
import type { SurveyAnswers } from '../types/Survey'

/**
 * Resolves which branch a respondent enters based on Q3 answer.
 * Branching is fully configuration-driven via option.branchId in questions.ts.
 */
export function resolveBranchFromAnswers(
  answers: SurveyAnswers,
): string | null {
  const q3Answer = answers['u_q3']
  if (typeof q3Answer !== 'string') return null

  const branch = getBranchById(q3Answer)
  return branch?.id ?? null
}

export function getBranchLabel(branchId: string): string {
  return getBranchById(branchId)?.label ?? branchId
}
