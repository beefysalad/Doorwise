"use client"

import { type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@workspace/ui/components/spinner"

import { useCurrentOrganizationState } from "@/components/organizations/current-organization-provider"

function OrganizationGate({ children }: { children: ReactNode }) {
  const router = useRouter()
  const {
    data,
    isError,
    isLoading,
    setActiveOrganizationId,
    workspaceMode,
    memberships,
  } = useCurrentOrganizationState()

  useEffect(() => {
    if (!data) return

    if (workspaceMode === "none") {
      router.replace("/onboarding")
      return
    }

    if (workspaceMode === "select") {
      const first = memberships[0]
      if (first) setActiveOrganizationId(first.organization.id)
    }
  }, [data, memberships, router, setActiveOrganizationId, workspaceMode])

  if (data && workspaceMode === "auto") {
    return <>{children}</>
  }

  if (data && workspaceMode === "none") {
    return null
  }

  if (isError) {
    return (
      <div className="flex min-h-svh items-center justify-center px-6 text-center text-sm text-muted-foreground">
        Could not load your workspace. Please refresh the page.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6 text-muted-foreground" />
      </div>
    )
  }

  return null
}

export { OrganizationGate }
