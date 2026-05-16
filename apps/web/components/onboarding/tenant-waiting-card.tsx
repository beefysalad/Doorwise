"use client"

import { RiArrowLeftLine, RiNotification3Line } from "@remixicon/react"

import { StatusBadge } from "@/components/doorwise/status-badge"
import { Button } from "@workspace/ui/components/button"

function TenantWaitingCard({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="flex size-22 items-center justify-center rounded-full bg-partial text-partial-foreground">
        <RiNotification3Line className="size-9" />
      </span>
      <div className="space-y-2">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          Join your landlord 🔑
        </h2>
        <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground">
          Residents join Doorwise through their landlord. Ask them to send you
          an invite link — open it here while signed in and you&apos;ll be added
          to their organization automatically.
        </p>
      </div>
      <div className="flex w-full max-w-xs items-center gap-3 rounded-xl border bg-card p-3.5 text-left">
        <StatusBadge status="pending" dot />
        <div className="text-xs text-muted-foreground">
          Waiting for an invite link
        </div>
      </div>
      <Button
        variant="outline"
        size="lg"
        className="w-full rounded-md"
        onClick={onBack}
      >
        <RiArrowLeftLine />
        Change role
      </Button>
    </div>
  )
}

export { TenantWaitingCard }
