"use client"

import { RiMagicLine } from "@remixicon/react"

import { useCurrentOrganizationState } from "@/components/organizations/current-organization-provider"
import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerDashboard } from "@/components/owner/screens/owner-dashboard"
import { fmtDate, TODAY } from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"

export default function DashboardPage() {
  const { activeMembership } = useCurrentOrganizationState()
  const organizationName = activeMembership?.organization.name ?? "Doorwise"

  return (
    <OwnerPage
      title="Dashboard"
      sub={`${fmtDate(TODAY)} · ${organizationName}`}
      actions={
        <Button size="sm" className="rounded-md">
          <RiMagicLine /> Generate June bills
        </Button>
      }
    >
      <OwnerDashboard />
    </OwnerPage>
  )
}
