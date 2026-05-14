"use client"

import { RiArrowRightLine, RiBuilding2Line, RiKey2Line } from "@remixicon/react"

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
    label: "I'm a landlord or property owner",
    description:
      "I manage properties and collect rent from tenants. Set up an organization, add rooms, and start billing.",
    icon: RiBuilding2Line,
  },
  {
    value: "tenant",
    label: "I'm a tenant or renter",
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
              "bg-card flex min-h-50 flex-col gap-3.5 rounded-2xl border p-7 text-left transition-colors",
              "hover:border-primary",
              isActive ? "border-primary ring-primary ring-1" : "border-input",
            )}
          >
            <span className="bg-accent text-primary flex size-14 items-center justify-center rounded-lg">
              <Icon className="size-7" />
            </span>
            <div>
              <div className="mb-1.5 text-[17px] font-semibold">
                {option.label}
              </div>
              <div className="text-muted-foreground text-[13.5px] leading-relaxed">
                {option.description}
              </div>
            </div>
            <div className="text-primary mt-auto flex items-center gap-1.5 text-[13px] font-medium">
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
