"use client"

import { useState } from "react"
import {
  RiErrorWarningLine,
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiMore2Line,
  RiSettings3Line,
  RiToolsLine,
} from "@remixicon/react"

import { DwCard } from "@/components/doorwise/card"
import { SegmentedFilter } from "@/components/doorwise/segmented-filter"
import { NOTIFICATIONS, type NotificationType } from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"

const TYPE_META: Record<
  NotificationType,
  { icon: typeof RiMoneyDollarCircleLine; tone: string }
> = {
  payment: { icon: RiMoneyDollarCircleLine, tone: "bg-paid text-paid-foreground" },
  overdue: { icon: RiErrorWarningLine, tone: "bg-overdue text-overdue-foreground" },
  lease: { icon: RiFileList3Line, tone: "bg-status-info text-status-info-foreground" },
  system: { icon: RiSettings3Line, tone: "bg-muted text-muted-foreground" },
  maintenance: { icon: RiToolsLine, tone: "bg-maintenance text-maintenance-foreground" },
}

const SETTINGS = [
  { label: "Payment received", on: true },
  { label: "Overdue bill", on: true },
  { label: "Lease renewal", on: true },
  { label: "New tenant request", on: true },
  { label: "Weekly digest", on: false },
]

function OwnerNotifications() {
  const [filter, setFilter] = useState("all")

  const notes =
    filter === "all"
      ? NOTIFICATIONS
      : filter === "unread"
        ? NOTIFICATIONS.filter((n) => !n.read)
        : NOTIFICATIONS.filter((n) => n.type === filter)

  return (
    <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-4">
      <div className="flex flex-col gap-3 lg:col-span-3">
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedFilter
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "All", count: NOTIFICATIONS.length },
              { value: "unread", label: "Unread", count: NOTIFICATIONS.filter((n) => !n.read).length },
              { value: "payment", label: "Payments", count: NOTIFICATIONS.filter((n) => n.type === "payment").length },
              { value: "overdue", label: "Overdue", count: NOTIFICATIONS.filter((n) => n.type === "overdue").length },
              { value: "system", label: "System", count: NOTIFICATIONS.filter((n) => n.type === "system").length },
            ]}
          />
          <Button variant="outline" size="sm" className="ml-auto rounded-md">
            Mark all read
          </Button>
        </div>

        <DwCard className="overflow-hidden">
          {notes.map((n, i) => {
            const meta = TYPE_META[n.type]
            const Icon = meta.icon
            return (
              <div
                key={n.id}
                className={`flex gap-3.5 px-4.5 py-4 ${i > 0 ? "border-t" : ""} ${
                  n.read ? "" : "bg-accent/50"
                }`}
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-md ${meta.tone}`}
                >
                  <Icon className="size-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{n.title}</span>
                    {!n.read && (
                      <span className="bg-primary size-1.5 rounded-full" />
                    )}
                  </div>
                  <div className="text-muted-foreground mt-0.5 text-[13px]">
                    {n.body}
                  </div>
                  <div className="text-muted-foreground/70 mt-1.5 text-[11.5px]">
                    {n.time}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="text-muted-foreground rounded-sm"
                >
                  <RiMore2Line />
                </Button>
              </div>
            )
          })}
          {notes.length === 0 && (
            <div className="text-muted-foreground p-10 text-center text-sm">
              Nothing here — you&apos;re all caught up.
            </div>
          )}
        </DwCard>
      </div>

      {/* Settings rail */}
      <DwCard className="h-fit p-4.5">
        <div className="mb-3 text-[13px] font-semibold">
          Notification settings
        </div>
        <div className="flex flex-col gap-3.5">
          {SETTINGS.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between text-[13px]"
            >
              <span>{s.label}</span>
              <Switch defaultChecked={s.on} />
            </div>
          ))}
        </div>
        <div className="text-muted-foreground mt-4.5 border-t pt-4 text-xs leading-relaxed">
          SMS reminders go out at 7:00 AM Manila time on the day a bill is due.
          Adjust in <span className="text-primary">Settings</span>.
        </div>
      </DwCard>
    </div>
  )
}

export { OwnerNotifications }
