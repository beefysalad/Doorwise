"use client"

import { RiArrowLeftLine, RiMailLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"

function TenantWaitingCard({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-5 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <RiMailLine className="size-6" />
      </span>
      <div className="space-y-2">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Ask your landlord for an invite
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Tenants join Doorwise through their landlord. Ask them to send you an
          invite link — open it here while signed in and you&apos;ll be added to
          their workspace automatically.
        </p>
      </div>
      <Button
        variant="outline"
        className="h-11 w-full rounded-2xl"
        onClick={onBack}
      >
        <RiArrowLeftLine className="size-4" />
        Back
      </Button>
    </div>
  )
}

export { TenantWaitingCard }
