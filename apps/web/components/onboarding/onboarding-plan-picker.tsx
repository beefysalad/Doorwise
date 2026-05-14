"use client"

import { RiCheckLine } from "@remixicon/react"

import { fmtLimit, PLANS } from "@/lib/mock/plans"
import { cn } from "@workspace/ui/lib/utils"

type OnboardingPlanPickerProps = {
  value: string | null
  onChange: (planId: string) => void
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
              "bg-card relative flex flex-col gap-4 rounded-2xl border p-5 text-left transition-colors",
              "hover:border-primary",
              selected
                ? "border-primary ring-primary ring-1"
                : "border-input",
            )}
          >
            {plan.highlight && (
              <span className="bg-accent text-primary absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-wide uppercase">
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
                    : "border-input",
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
                  <span className="text-muted-foreground text-[13px]">
                    / month
                  </span>
                )}
              </div>
              <div className="text-muted-foreground mt-1 text-[12.5px]">
                {plan.priceNote}
              </div>
            </div>

            <div className="bg-muted text-muted-foreground flex items-center justify-between rounded-md px-3 py-2 text-[12.5px]">
              <span>
                <span className="text-foreground font-semibold">
                  {fmtLimit(plan.limits.properties)}
                </span>{" "}
                properties
              </span>
              <span className="bg-border h-3.5 w-px" />
              <span>
                <span className="text-foreground font-semibold">
                  {fmtLimit(plan.limits.tenants)}
                </span>{" "}
                tenants
              </span>
            </div>

            <ul className="flex flex-col gap-2">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[13px]"
                >
                  <RiCheckLine className="text-paid-foreground mt-0.5 size-3.5 shrink-0" />
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
