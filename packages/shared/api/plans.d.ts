export type PlanTier = "free" | "starter" | "medium"

export type PlanLimits = {
  /** Max properties for the org; null = unlimited. */
  properties: number | null
  /** Max residents for the org; null = unlimited. */
  residents: number | null
}

export const PLAN_TIERS: readonly PlanTier[]

/** Authoritative quota table. Backend enforces these; frontend displays them. */
export const PLAN_LIMITS: Record<PlanTier, PlanLimits>
