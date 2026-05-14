"use client"

import { cn } from "@workspace/ui/lib/utils"

type SegmentOption = {
  value: string
  label: string
  count?: number
}

type SegmentedFilterProps = {
  options: SegmentOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

/** Doorwise segmented control — used for list-view status filters. */
function SegmentedFilter({
  options,
  value,
  onChange,
  className,
}: SegmentedFilterProps) {
  return (
    <div
      className={cn(
        "bg-muted inline-flex items-center gap-1 rounded-md p-1",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded px-3 text-[13px] font-medium transition-colors",
              active
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] tabular-nums",
                  active
                    ? "bg-muted text-muted-foreground"
                    : "text-muted-foreground/70",
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export { SegmentedFilter }
export type { SegmentOption }
