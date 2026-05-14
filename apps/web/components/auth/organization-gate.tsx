"use client"

import { type ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"

import { useCurrentOrganizationState } from "@/components/organizations/current-organization-provider"

function OrganizationGate({ children }: { children: ReactNode }) {
  const router = useRouter()
  const {
    data,
    isError,
    isLoading,
    organizationMode,
    setActiveOrganizationId,
    memberships,
  } = useCurrentOrganizationState()

  useEffect(() => {
    if (!data) return

    if (organizationMode === "none") {
      router.replace("/onboarding")
      return
    }

    if (organizationMode === "select") {
      const first = memberships[0]
      if (first) setActiveOrganizationId(first.organization.id)
    }
  }, [data, memberships, organizationMode, router, setActiveOrganizationId])

  if (data && organizationMode === "auto") {
    return <>{children}</>
  }

  if (data && organizationMode === "none") {
    return null
  }

  if (isError) {
    return (
      <div className="flex min-h-svh items-center justify-center px-6 text-center text-sm text-muted-foreground">
        Could not load your organization. Please refresh the page.
      </div>
    )
  }

  if (isLoading) {
    return null
  }

  return null
}

export { OrganizationGate }
