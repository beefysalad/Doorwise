import type { ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

type DwCardProps = {
  children: ReactNode
  className?: string
}

/** Lightweight Doorwise surface — 1px border, subtle shadow, calm radius. */
function DwCard({ children, className }: DwCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      {children}
    </div>
  )
}

export { DwCard }
