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
        "bg-card text-card-foreground rounded-xl border shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  )
}

export { DwCard }
