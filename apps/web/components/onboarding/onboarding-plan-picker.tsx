"use client"

import { RiCheckLine } from "@remixicon/react"

import type { PlanTier } from "@workspace/shared"

import { fmtLimit, PLANS } from "@/lib/mock/plans"
import { cn } from "@workspace/ui/lib/utils"

type OnboardingPlanPickerProps = {
  value: PlanTier | null
  onChange: (planId: PlanTier) => void
}

function OnboardingPlanPicker({ value, onChange }: OnboardingPlanPickerProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PLANS.map((plan) => {
        const selected = value === plan.id
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onChange(plan.id)}
            aria-pressed={selected}
            className={cn(
              "relative flex flex-col gap-4 rounded-2xl border bg-card p-5 text-left transition-colors",
              "hover:border-primary",
              selected ? "border-primary ring-1 ring-primary" : "border-input"
            )}
          >
            {plan.highlight && (
              <span className="absolute top-4 right-4 rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-semibold tracking-wide text-primary uppercase">
                Most popular
              </span>
            )}

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{plan.name}</span>
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input"
                )}
              >
                {selected && <RiCheckLine className="size-3" />}
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-3xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.price !== "₱0" && (
                  <span className="text-[13px] text-muted-foreground">
                    / month
                  </span>
                )}
              </div>
              <div className="mt-1 text-[12.5px] text-muted-foreground">
                {plan.priceNote}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-[12.5px] text-muted-foreground">
              <span>
                <span className="font-semibold text-foreground">
                  {fmtLimit(plan.limits.properties)}
                </span>{" "}
                properties
              </span>
              <span className="h-3.5 w-px bg-border" />
              <span>
                <span className="font-semibold text-foreground">
                  {fmtLimit(plan.limits.residents)}
                </span>{" "}
                tenants
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px]">
                  <RiCheckLine className="mt-0.5 size-3.5 shrink-0 text-paid-foreground" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </button>
        )
      })}
    </div>
  )
}

export { OnboardingPlanPicker }
