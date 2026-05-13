"use client"

import { RiBuilding2Line, RiUserSmileLine } from "@remixicon/react"

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
    <div className="grid gap-3">
      {options.map((option) => {
        const Icon = option.icon
        const isActive = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              "flex w-full items-start gap-4 rounded-2xl border bg-card p-5 text-left transition-colors",
              "hover:border-primary/60 hover:bg-accent/40",
              isActive
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border"
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block font-medium">{option.label}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {option.description}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { OnboardingRolePicker }
export type { OnboardingRole }
