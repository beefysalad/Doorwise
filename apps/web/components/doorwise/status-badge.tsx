import { cn } from "@workspace/ui/lib/utils"

type StatusKey =
  | "paid"
  | "partial"
  | "overdue"
  | "unpaid"
  | "available"
  | "occupied"
  | "reserved"
  | "maintenance"
  | "active"
  | "pending"
  | "ended"

const STATUS_MAP: Record<
  StatusKey,
  { label: string; className: string; dot: string }
> = {
  paid: {
    label: "Paid",
    className: "bg-paid text-paid-foreground border-paid-border",
    dot: "bg-paid-foreground",
  },
  active: {
    label: "Active",
    className: "bg-paid text-paid-foreground border-paid-border",
    dot: "bg-paid-foreground",
  },
  partial: {
    label: "Partial",
    className: "bg-partial text-partial-foreground border-partial-border",
    dot: "bg-partial-foreground",
  },
  pending: {
    label: "Pending",
    className: "bg-partial text-partial-foreground border-partial-border",
    dot: "bg-partial-foreground",
  },
  overdue: {
    label: "Overdue",
    className: "bg-overdue text-overdue-foreground border-overdue-border",
    dot: "bg-overdue-foreground",
  },
  unpaid: {
    label: "Unpaid",
    className: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
  available: {
    label: "Available",
    className: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
  ended: {
    label: "Ended",
    className: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
  occupied: {
    label: "Occupied",
    className:
      "bg-status-info text-status-info-foreground border-status-info-border",
    dot: "bg-status-info-foreground",
  },
  reserved: {
    label: "Reserved",
    className: "bg-reserved text-reserved-foreground border-reserved-border",
    dot: "bg-reserved-foreground",
  },
  maintenance: {
    label: "Maintenance",
    className:
      "bg-maintenance text-maintenance-foreground border-maintenance-border",
    dot: "bg-maintenance-foreground",
  },
}

type StatusBadgeProps = {
  status: StatusKey | string
  dot?: boolean
  className?: string
}

function StatusBadge({ status, dot = false, className }: StatusBadgeProps) {
  const s = STATUS_MAP[status as StatusKey] ?? STATUS_MAP.available
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        s.className,
        className
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", s.dot)} />}
      {s.label}
    </span>
  )
}

export { StatusBadge }
export type { StatusKey }
