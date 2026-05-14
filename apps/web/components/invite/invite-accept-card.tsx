"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { RiMailCheckLine } from "@remixicon/react"
import { toast } from "sonner"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { useAcceptInvite } from "@/hooks/api/use-accept-invite"
import { useActiveOrg } from "@/hooks/use-active-org"

function InviteAcceptCard({ token }: { token: string }) {
  const router = useRouter()
  const { setActiveOrgId } = useActiveOrg()
  const acceptInvite = useAcceptInvite()
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true

    acceptInvite
      .mutateAsync(token)
      .then((result) => {
        setActiveOrgId(result.organization.id)
        toast.success(`Joined ${result.organization.name}`)
        router.push("/dashboard")
      })
      .catch(() => {
        // Error message handled in render
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <RiMailCheckLine className="size-6" />
          </span>
          <CardTitle className="mt-3">Joining organization</CardTitle>
          <CardDescription>
            {acceptInvite.isPending && "Accepting your invite..."}
            {acceptInvite.isError && "We couldn't accept this invite."}
            {acceptInvite.isSuccess && "Redirecting you to the dashboard..."}
          </CardDescription>
        </CardHeader>
        {acceptInvite.isError && (
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              The invite may have expired or already been used. Ask the
              organization owner for a new one.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/onboarding")}
            >
              Start a new organization instead
            </Button>
          </CardContent>
        )}
      </Card>
    </main>
  )
}

export { InviteAcceptCard }
