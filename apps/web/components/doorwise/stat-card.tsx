import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { DwCard } from "./card"

type StatAccent = "default" | "paid" | "overdue"

type StatCardProps = {
  label: string
  value: ReactNode
  sub?: ReactNode
  trend?: string
  icon?: ReactNode
  accent?: StatAccent
}

const ACCENT_BOX: Record<StatAccent, string> = {
  default: "bg-muted text-muted-foreground",
  paid: "bg-paid text-paid-foreground",
  overdue: "bg-overdue text-overdue-foreground",
}

function StatCard({
  label,
  value,
  sub,
  trend,
  icon,
  accent = "default",
}: StatCardProps) {
  return (
    <DwCard className="p-4.5">
      <div className="mb-3.5 flex items-start justify-between">
        <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </div>
        {icon && (
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-md",
              ACCENT_BOX[accent]
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="font-mono text-[1.75rem] leading-tight font-semibold tracking-tight tabular-nums">
        {value}
      </div>
      {(sub || trend) && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          {trend && (
            <span className="font-medium text-paid-foreground">{trend}</span>
          )}
          {sub && <span>{sub}</span>}
        </div>
      )}
    </DwCard>
  )
}

export { StatCard }
