"use client"

import { RiArrowRightLine, RiBuilding2Line, RiKey2Line } from "@remixicon/react"

import { cn } from "@workspace/ui/lib/utils"

type OnboardingRole = "owner" | "resident"

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
    label: "I'm a landlord or property owner",
    description:
      "I manage properties and collect rent from residents. Set up an organization, add rooms, and start billing.",
    icon: RiBuilding2Line,
  },
  {
    value: "resident",
    label: "I'm a resident or renter",
    description:
      "I rent a room or unit from a landlord. Use an invite code or request access by their email.",
    icon: RiKey2Line,
  },
]

function OnboardingRolePicker({ value, onChange }: OnboardingRolePickerProps) {
  return (
    <div className="grid gap-4.5 sm:grid-cols-2">
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
              "flex min-h-50 flex-col gap-3.5 rounded-2xl border bg-card p-7 text-left transition-colors",
              "hover:border-primary",
              isActive ? "border-primary ring-1 ring-primary" : "border-input"
            )}
          >
            <span className="flex size-14 items-center justify-center rounded-lg bg-accent text-primary">
              <Icon className="size-7" />
            </span>
            <div>
              <div className="mb-1.5 text-[17px] font-semibold">
                {option.label}
              </div>
              <div className="text-[13.5px] leading-relaxed text-muted-foreground">
                {option.description}
              </div>
            </div>
            <div className="mt-auto flex items-center gap-1.5 text-[13px] font-medium text-primary">
              Continue <RiArrowRightLine className="size-3.5" />
            </div>
          </button>
        )
      })}
    </div>
  )
}

export { OnboardingRolePicker }
export type { OnboardingRole }
