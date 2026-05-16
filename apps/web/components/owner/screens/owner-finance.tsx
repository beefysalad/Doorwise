"use client"

import {
  RiBankCardLine,
  RiFileList3Line,
  RiReceiptLine,
} from "@remixicon/react"

import { DwCard } from "@/components/doorwise/card"
import { OwnerBills } from "@/components/owner/screens/owner-bills"
import { OwnerLeases } from "@/components/owner/screens/owner-leases"
import { OwnerPayments } from "@/components/owner/screens/owner-payments"
import { BILLS, LEASES, PAYMENTS, fmtMoneyShort } from "@/lib/mock/doorwise"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

const financeStats = [
  {
    icon: RiReceiptLine,
    label: "Outstanding",
    value: fmtMoneyShort(BILLS.reduce((sum, bill) => sum + bill.balance, 0)),
  },
  {
    icon: RiBankCardLine,
    label: "Collected",
    value: fmtMoneyShort(
      PAYMENTS.reduce((sum, payment) => sum + payment.amount, 0)
    ),
  },
  {
    icon: RiFileList3Line,
    label: "Active leases",
    value: LEASES.length.toString(),
  },
]

function OwnerFinance() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3.5 md:grid-cols-3">
        {financeStats.map((stat) => {
          const Icon = stat.icon

          return (
            <DwCard key={stat.label} className="p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="font-mono text-xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </div>
                </div>
              </div>
            </DwCard>
          )
        })}
      </div>

      <Tabs defaultValue="bills" className="gap-4">
        <TabsList variant="line" className="w-full justify-start">
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="leases">Leases</TabsTrigger>
        </TabsList>
        <TabsContent value="bills">
          <OwnerBills />
        </TabsContent>
        <TabsContent value="payments">
          <OwnerPayments />
        </TabsContent>
        <TabsContent value="leases">
          <OwnerLeases />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { OwnerFinance }
