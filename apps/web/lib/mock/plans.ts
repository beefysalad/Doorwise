// Doorwise — subscription plan display metadata.
// Quota limits live in @workspace/shared (PLAN_LIMITS) and are the source of
// truth for backend enforcement. This file is display copy only.

import { PLAN_LIMITS, type PlanLimits, type PlanTier } from "@workspace/shared"

export type Plan = {
  id: PlanTier
  name: string
  /** Display price, e.g. "Free" or "₱200". */
  price: string
  /** Secondary line under the price. */
  priceNote: string
  tagline: string
  limits: PlanLimits
  features: string[]
  highlight: boolean
  /** CTA label used on the landing page. */
  cta: string
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "₱0",
    priceNote: "Free trial · no card needed",
    tagline: "Try Doorwise with a small place",
    limits: PLAN_LIMITS.free,
    features: [
      "Up to 2 properties",
      "Up to 5 residents",
      "Unlimited bills + payments",
      "Resident portal",
      "Email support",
    ],
    highlight: false,
    cta: "Start free",
  },
  {
    id: "starter",
    name: "Starter",
    price: "₱200",
    priceNote: "per month · best for boarding houses",
    tagline: "For a growing boarding house",
    limits: PLAN_LIMITS.starter,
    features: [
      "Up to 10 properties",
      "Up to 50 residents",
      "Bulk SMS reminders",
      "CSV / Excel export",
      "Priority chat support",
      "Custom payment instructions",
    ],
    highlight: true,
    cta: "Start 14-day trial",
  },
  {
    id: "medium",
    name: "Medium",
    price: "₱500",
    priceNote: "per month · for serious operators",
    tagline: "For multi-property operators",
    limits: PLAN_LIMITS.medium,
    features: [
      "Unlimited properties",
      "Unlimited residents",
      "Detailed financial reports",
      "API access",
      "Dedicated success manager",
    ],
    highlight: false,
    cta: "Talk to sales",
  },
]

export function getPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

/** Human-readable limit, e.g. "2" or "Unlimited". */
export function fmtLimit(value: number | null): string {
  return value === null ? "Unlimited" : String(value)
}
