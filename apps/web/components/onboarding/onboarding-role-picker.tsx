"use client"

import { RiBuilding2Line, RiUserSmileLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type OnboardingRole = "owner" | "tenant"

type OnboardingRolePickerProps = {
  value: OnboardingRole | null
  onChange: (role: OnboardingRole) => void
}

const options: Array<{
  value: OnboardingRole
  label: string
  description: string
  icon: typeof RiBuilding2Line
}> = [
  {
    value: "owner",
    label: "I'm a property owner",
    description:
      "Set up a workspace for your rooms, tenants, bills, and payments.",
    icon: RiBuilding2Line,
  },
  {
    value: "tenant",
    label: "I'm a tenant",
    description:
      "Join your landlord's workspace to view your bills and payment history.",
    icon: RiUserSmileLine,
  },
]

function OnboardingRolePicker({ value, onChange }: OnboardingRolePickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const Icon = option.icon
        const isActive = value === option.value

        return (
          <Button
            key={option.value}
            type="button"
            variant="outline"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              "h-full min-h-44 w-full items-start justify-start gap-4 rounded-2xl bg-card p-5 text-left leading-normal whitespace-normal transition-colors sm:flex-col sm:gap-5",
              "hover:border-primary hover:bg-accent",
              isActive
                ? "border-primary bg-accent ring-1 ring-primary"
                : "border-border"
            )}
          >
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1 space-y-2">
              <span className="block text-base leading-6 font-semibold">
                {option.label}
              </span>
              <span className="block text-sm leading-6 text-muted-foreground">
                {option.description}
              </span>
            </span>
          </Button>
        )
      })}
    </div>
  )
}

export { OnboardingRolePicker }
export type { OnboardingRole }
