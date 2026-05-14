import { auth } from "@clerk/nextjs/server"
import type { ReactNode } from "react"

import { OrganizationGate } from "@/components/auth/organization-gate"
import { DashboardUserProvider } from "@/components/dashboard/dashboard-user-provider"
import { OwnerShell } from "@/components/owner/owner-shell"
import { CurrentOrganizationProvider } from "@/components/organizations/current-organization-provider"
import { getCurrentDashboardUser } from "@/lib/auth/current-dashboard-user"

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode
}) {
  await auth.protect()

  const user = await getCurrentDashboardUser()

  return (
    <DashboardUserProvider user={user}>
      <CurrentOrganizationProvider>
        <OrganizationGate>
          <OwnerShell>{children}</OwnerShell>
        </OrganizationGate>
      </CurrentOrganizationProvider>
    </DashboardUserProvider>
  )
}
