import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerPayments } from "@/components/owner/screens/owner-payments"
import { PAYMENTS } from "@/lib/mock/doorwise"

export default function PaymentsPage() {
  return (
    <OwnerPage title="Payments" sub={`${PAYMENTS.length} payments recorded`}>
      <OwnerPayments />
    </OwnerPage>
  )
}
