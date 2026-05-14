// Doorwise — subscription plans (frontend-only for now).
// Single source of truth shared by the landing page pricing section and the
// onboarding plan-picker step. Not yet persisted to the backend.

export type PlanLimits = {
  /** Max properties; null = unlimited. */
  properties: number | null
  /** Max tenants; null = unlimited. */
  tenants: number | null
}

export type Plan = {
  id: "free" | "starter" | "medium"
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
    limits: { properties: 2, tenants: 5 },
    features: [
      "Up to 2 properties",
      "Up to 5 tenants",
      "Unlimited bills + payments",
      "Tenant portal",
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
    limits: { properties: 10, tenants: 50 },
    features: [
      "Up to 10 properties",
      "Up to 50 tenants",
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
    limits: { properties: null, tenants: null },
    features: [
      "Unlimited properties",
      "Unlimited tenants",
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
