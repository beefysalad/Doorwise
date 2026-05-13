"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Spinner } from "@workspace/ui/components/spinner"

import { useMyOrganizations } from "@/hooks/api/use-my-organizations"
import { useActiveOrg } from "@/hooks/use-active-org"

function OrganizationGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { activeOrgId, setActiveOrgId } = useActiveOrg()
  const { data, isLoading, isError } = useMyOrganizations()

  useEffect(() => {
    if (!data) return

    if (data.memberships.length === 0) {
      router.replace("/onboarding")
      return
    }

    const stillMember =
      activeOrgId &&
      data.memberships.some((m) => m.organization.id === activeOrgId)

    if (!stillMember) {
      const first = data.memberships[0]
      if (first) setActiveOrgId(first.organization.id)
    }
  }, [data, activeOrgId, setActiveOrgId, router])

  if (data && data.memberships.length > 0) {
    return <>{children}</>
  }

  if (data && data.memberships.length === 0) {
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
        <Spinner className="text-muted-foreground size-6" />
      </div>
    )
  }

  return null
}

export { OrganizationGate }
