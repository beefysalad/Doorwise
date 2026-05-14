import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerTenants } from "@/components/owner/screens/owner-tenants"
import { TENANTS } from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import { RiAddLine } from "@remixicon/react"

export default function TenantsPage() {
  return (
    <OwnerPage
      title="Tenants"
      sub={`${TENANTS.length} active tenants`}
      actions={
        <Button size="sm" className="rounded-md">
          <RiAddLine /> Add tenant
        </Button>
      }
    >
      <OwnerTenants />
    </OwnerPage>
  )
}
