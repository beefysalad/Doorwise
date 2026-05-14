import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerLeases } from "@/components/owner/screens/owner-leases"
import { LEASES } from "@/lib/mock/doorwise"

export default function LeasesPage() {
  return (
    <OwnerPage title="Leases" sub={`${LEASES.length} active leases`}>
      <OwnerLeases />
    </OwnerPage>
  )
}
