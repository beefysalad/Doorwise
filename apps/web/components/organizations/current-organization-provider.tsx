"use client"

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react"
import type { OrganizationMembership } from "@workspace/shared"

import { useMyOrganizations } from "@/hooks/api/use-my-organizations"
import { useActiveOrg } from "@/hooks/use-active-org"

type OrganizationMode = "none" | "auto" | "select"

type CurrentOrganizationContextValue = ReturnType<typeof useMyOrganizations> & {
  activeMembership: OrganizationMembership | null
  activeOrganizationId: string | null
  memberships: OrganizationMembership[]
  organizationMode: OrganizationMode
  organizationCount: number
  setActiveOrganizationId: (organizationId: string | null) => void
}

const CurrentOrganizationContext =
  createContext<CurrentOrganizationContextValue | null>(null)

function CurrentOrganizationProvider({ children }: { children: ReactNode }) {
  const organizationsQuery = useMyOrganizations()
  const { activeOrgId, setActiveOrgId } = useActiveOrg()
  const memberships = useMemo(
    () => organizationsQuery.data?.memberships ?? [],
    [organizationsQuery.data?.memberships]
  )

  const activeMembership = useMemo(() => {
    if (memberships.length === 0) {
      return null
    }

    const selectedMembership =
      memberships.find(
        (membership) => membership.organization.id === activeOrgId
      ) ?? null

    if (selectedMembership) {
      return selectedMembership
    }

    if (memberships.length === 1) {
      return memberships[0] ?? null
    }

    return null
  }, [activeOrgId, memberships])

  const organizationMode: OrganizationMode =
    memberships.length === 0 ? "none" : activeMembership ? "auto" : "select"

  useEffect(() => {
    if (!organizationsQuery.data || activeOrgId || memberships.length !== 1) {
      return
    }

    const [membership] = memberships
    if (membership) {
      setActiveOrgId(membership.organization.id)
    }
  }, [activeOrgId, memberships, organizationsQuery.data, setActiveOrgId])

  return (
    <CurrentOrganizationContext.Provider
      value={{
        ...organizationsQuery,
        activeMembership,
        activeOrganizationId: activeMembership?.organization.id ?? null,
        memberships,
        organizationMode,
        organizationCount: memberships.length,
        setActiveOrganizationId: setActiveOrgId,
      }}
    >
      {children}
    </CurrentOrganizationContext.Provider>
  )
}

function useCurrentOrganizationState() {
  const context = useContext(CurrentOrganizationContext)

  if (!context) {
    throw new Error(
      "useCurrentOrganizationState must be used within CurrentOrganizationProvider"
    )
  }

  return context
}

export { CurrentOrganizationProvider, useCurrentOrganizationState }
