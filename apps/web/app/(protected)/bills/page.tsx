import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerBills } from "@/components/owner/screens/owner-bills"

export default function BillsPage() {
  return (
    <OwnerPage title="Bills" sub="May 2026 billing cycle">
      <OwnerBills />
    </OwnerPage>
  )
}
