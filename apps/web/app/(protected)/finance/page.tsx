import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerFinance } from "@/components/owner/screens/owner-finance"
import { BILLS, LEASES, PAYMENTS } from "@/lib/mock/doorwise"

export default function FinancePage() {
  return (
    <OwnerPage
      title="Finance"
      sub={`${BILLS.length} bills · ${PAYMENTS.length} payments · ${LEASES.length} leases`}
    >
      <OwnerFinance />
    </OwnerPage>
  )
}
