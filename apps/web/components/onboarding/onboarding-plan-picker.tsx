"use client"

import {
  RiArrowRightLine,
  RiBuilding2Line,
  RiCheckLine,
  RiHomeSmileLine,
  RiShieldCheckLine,
} from "@remixicon/react"

import type { PlanTier } from "@workspace/shared"

import { fmtLimit, type Plan, PLANS } from "@/lib/mock/plans"
import { cn } from "@workspace/ui/lib/utils"

type OnboardingPlanPickerProps = {
  value: PlanTier | null
  onChange: (planId: PlanTier) => void
}

const planDetails: Record<
  PlanTier,
  {
    icon: typeof RiHomeSmileLine
    eyebrow: string
    proof: string
  }
> = {
  free: {
    icon: RiHomeSmileLine,
    eyebrow: "Try the system",
    proof: "Best if you are still setting up your first rental flow.",
  },
  starter: {
    icon: RiShieldCheckLine,
    eyebrow: "Recommended",
    proof: "The practical starting point for active boarding houses.",
  },
  medium: {
    icon: RiBuilding2Line,
    eyebrow: "Scale up",
    proof: "For operators managing multiple locations and reporting needs.",
  },
}

function OnboardingPlanPicker({ value, onChange }: OnboardingPlanPickerProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {PLANS.map((plan) => {
        const selected = value === plan.id
        const details = planDetails[plan.id]
        const Icon = details.icon

        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onChange(plan.id)}
            aria-pressed={selected}
            className={cn(
              "group relative flex min-h-[430px] flex-col overflow-hidden rounded-3xl border bg-card p-5 text-left shadow-xs transition-[border-color,box-shadow,transform]",
              "hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md",
              selected
                ? "border-primary shadow-md ring-1 ring-primary"
                : "border-border"
            )}
          >
            <span
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-1",
                selected || plan.highlight ? "bg-primary" : "bg-border"
              )}
            />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-2xl border",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-muted text-foreground"
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {details.eyebrow}
                  </div>
                  <div className="font-heading text-xl font-bold tracking-tight">
                    {plan.name}
                  </div>
                </div>
              </div>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-transparent"
                )}
              >
                <RiCheckLine className="size-3.5" />
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-end gap-1.5">
                <span className="font-mono text-4xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.price !== "₱0" && (
                  <span className="pb-1 text-[13px] text-muted-foreground">
                    / month
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground">
                {plan.tagline}
              </div>
              <div className="mt-1 text-[12.5px] text-muted-foreground">
                {plan.priceNote}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <PlanLimit label="Properties" value={plan.limits.properties} />
              <PlanLimit label="Residents" value={plan.limits.residents} />
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              {details.proof}
            </p>

            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px]">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                    <RiCheckLine className="size-3" />
                  </span>
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <div
              className={cn(
                "mt-6 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                selected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-foreground group-hover:border-primary/50"
              )}
            >
              <span>{selected ? "Selected plan" : "Choose plan"}</span>
              {selected ? (
                <RiCheckLine className="size-4" />
              ) : (
                <RiArrowRightLine className="size-4" />
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function PlanLimit({
  label,
  value,
}: {
  label: string
  value: Plan["limits"]["properties"]
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted px-3 py-2.5">
      <div className="font-mono text-lg font-bold tracking-tight">
        {fmtLimit(value)}
      </div>
      <div className="text-[11px] font-medium text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

export { OnboardingPlanPicker }
