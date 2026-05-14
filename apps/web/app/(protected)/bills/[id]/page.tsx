import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerBillDetail } from "@/components/owner/screens/owner-bill-detail"
import { billOf, tenantOf } from "@/lib/mock/doorwise"

export default async function BillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bill = billOf(id)
  const tenant = bill ? tenantOf(bill.tenant) : undefined

  return (
    <OwnerPage
      title="Bill detail"
      sub={bill && tenant ? `${bill.label} · ${tenant.name}` : undefined}
    >
      <OwnerBillDetail billId={id} />
    </OwnerPage>
  )
}
