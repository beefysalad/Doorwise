import { auth } from "@clerk/nextjs/server"

import { OrganizationGate } from "@/components/auth/organization-gate"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardUserProvider } from "@/components/dashboard/dashboard-user-provider"
import { getCurrentDashboardUser } from "@/lib/auth/current-dashboard-user"

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await auth.protect()

  const user = await getCurrentDashboardUser()

  return (
    <DashboardUserProvider user={user}>
      <OrganizationGate>
        <DashboardShell>{children}</DashboardShell>
      </OrganizationGate>
    </DashboardUserProvider>
  )
}
