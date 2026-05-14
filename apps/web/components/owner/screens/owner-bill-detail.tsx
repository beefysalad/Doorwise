"use client"

import { useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiMailLine,
  RiMoneyDollarCircleLine,
  RiPhoneLine,
  RiReceiptLine,
} from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { DwCard } from "@/components/doorwise/card"
import { StatusBadge } from "@/components/doorwise/status-badge"
import { MethodPill, TD, TH } from "@/components/owner/screens/owner-dashboard"
import {
  BILLS,
  PAYMENTS,
  PROPERTIES,
  fmtDate,
  fmtDateShort,
  fmtMoney,
  tenantOf,
} from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

function OwnerBillDetail({ billId }: { billId: string }) {
  const [showVoid, setShowVoid] = useState(false)
  const bill = BILLS.find((b) => b.id === billId)
  if (!bill) notFound()
  const tenant = tenantOf(bill.tenant)!
  const property = PROPERTIES.find((p) => p.id === tenant.property)!
  const payments = PAYMENTS.filter((p) => p.bill === bill.id)
  const otherBills = BILLS.filter(
    (b) => b.tenant === tenant.id && b.id !== bill.id,
  ).slice(0, 4)

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <div className="text-muted-foreground flex items-center gap-2 text-[13px]">
        <Link href="/bills" className="inline-flex items-center gap-1">
          <RiArrowLeftLine className="size-3.5" /> Bills
        </Link>
        <RiArrowRightSLine className="size-3" />
        <span className="text-foreground">
          {bill.label} · {tenant.name}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-3">
        {/* Left */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <DwCard className="p-6">
            <div className="mb-4.5 flex items-start justify-between">
              <div>
                <div className="text-muted-foreground mb-1 text-xs tracking-wide uppercase">
                  {bill.label}
                </div>
                <h1 className="font-mono text-3xl font-bold tracking-tight tabular-nums">
                  {fmtMoney(bill.balance > 0 ? bill.balance : bill.amount)}
                </h1>
                <div className="text-muted-foreground mt-1.5 text-[13px]">
                  Due {fmtDate(bill.due)} · invoice #{bill.id.toUpperCase()}
                </div>
              </div>
              <StatusBadge status={bill.status} dot />
            </div>
            <div className="grid grid-cols-3 gap-3.5 border-y py-3.5">
              <BillStat label="Amount billed" value={fmtMoney(bill.amount)} />
              <BillStat
                label="Paid"
                value={fmtMoney(bill.paid)}
                className={bill.paid > 0 ? "text-paid-foreground" : "text-muted-foreground"}
              />
              <BillStat
                label="Balance"
                value={fmtMoney(bill.balance)}
                className={bill.balance > 0 ? "text-overdue-foreground" : "text-paid-foreground"}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Button size="sm" className="rounded-md">
                <RiMoneyDollarCircleLine /> Record payment
              </Button>
              <Button variant="outline" size="sm" className="rounded-md">
                <RiMailLine /> Send reminder
              </Button>
              <Button variant="outline" size="sm" className="rounded-md">
                <RiDownloadLine /> Download receipt
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-overdue-foreground ml-auto rounded-md"
                onClick={() => setShowVoid(true)}
              >
                Void bill
              </Button>
            </div>
          </DwCard>

          {/* Payment history */}
          <DwCard className="overflow-hidden">
            <div className="px-4.5 pt-3.5 pb-3">
              <div className="text-sm font-semibold">Payment history</div>
              <div className="text-muted-foreground mt-0.5 text-xs">
                {payments.length} payment{payments.length === 1 ? "" : "s"} on
                this bill
              </div>
            </div>
            {payments.length === 0 ? (
              <div className="text-muted-foreground border-t p-10 text-center text-sm">
                No payments yet — record the first payment to start the history.
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-subtle">
                    <th className={TH}>Date</th>
                    <th className={TH}>Method</th>
                    <th className={TH}>Reference</th>
                    <th className={TH}>Recorded by</th>
                    <th className={`${TH} text-right`}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className={TD}>{fmtDateShort(p.date)}</td>
                      <td className={TD}>
                        <MethodPill method={p.method} />
                      </td>
                      <td className={`${TD} text-muted-foreground font-mono text-xs`}>
                        {p.ref || "—"}
                      </td>
                      <td className={TD}>{p.recordedBy}</td>
                      <td className={`${TD} text-right`}>
                        <span className="font-mono font-medium tabular-nums">
                          {fmtMoney(p.amount)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </DwCard>

          {/* Activity */}
          <DwCard className="p-4.5">
            <div className="mb-3.5 text-sm font-semibold">Activity</div>
            <div className="flex flex-col gap-3.5">
              <ActivityItem
                icon={<RiErrorWarningLine className="size-4" />}
                tone="bg-overdue text-overdue-foreground"
                title="Bill marked overdue"
                time="9 days ago — system"
              />
              <ActivityItem
                icon={<RiMailLine className="size-4" />}
                tone="bg-status-info text-status-info-foreground"
                title="Reminder SMS sent to tenant"
                time="9 days ago — Juan Cruz"
              />
              <ActivityItem
                icon={<RiReceiptLine className="size-4" />}
                tone="bg-accent text-primary"
                title="Bill generated"
                time={`${fmtDateShort("2026-05-01")} — Auto-generated for May 2026 cycle`}
              />
            </div>
          </DwCard>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3.5">
          <DwCard className="p-4.5">
            <div className="text-muted-foreground mb-2.5 text-xs tracking-wide uppercase">
              Billed to
            </div>
            <div className="mb-3.5 flex items-center gap-3">
              <AvatarInitials name={tenant.name} size={44} />
              <div>
                <div className="text-[15px] font-semibold">{tenant.name}</div>
                <div className="text-muted-foreground text-xs">
                  {tenant.email}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[13px]">
              <KVRow k="Phone" v={tenant.phone} />
              <KVRow
                k="Room"
                v={`${tenant.room} · ${property.name.split(" ")[0]}`}
              />
              <KVRow k="Move-in" v={fmtDateShort(tenant.since)} />
            </div>
            <div className="mt-3.5 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 rounded-md">
                <RiPhoneLine /> Call
              </Button>
              <Button variant="outline" size="sm" className="flex-1 rounded-md">
                <RiMailLine /> Email
              </Button>
            </div>
          </DwCard>

          <DwCard className="p-4.5">
            <div className="text-muted-foreground mb-2.5 text-xs tracking-wide uppercase">
              Other bills
            </div>
            <div className="flex flex-col gap-2">
              {otherBills.map((b) => (
                <Link
                  key={b.id}
                  href={`/bills/${b.id}`}
                  className="bg-surface-subtle hover:bg-accent flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[12.5px] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{b.label}</div>
                    <div className="text-muted-foreground text-[11px]">
                      Due {fmtDateShort(b.due)}
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </Link>
              ))}
            </div>
          </DwCard>
        </div>
      </div>

      <Dialog open={showVoid} onOpenChange={setShowVoid}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Void this bill?</DialogTitle>
            <DialogDescription>
              Voiding will mark this bill as cancelled and remove it from
              collections totals. Existing payments stay in history for audit.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => setShowVoid(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-md"
              onClick={() => setShowVoid(false)}
            >
              Void bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BillStat({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div>
      <div className="text-muted-foreground mb-1 text-[11.5px] tracking-wide uppercase">
        {label}
      </div>
      <div className={`font-mono text-[15px] font-semibold tabular-nums ${className ?? ""}`}>
        {value}
      </div>
    </div>
  )
}

function KVRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-muted-foreground text-[12.5px]">{k}</span>
      <span className="text-right font-medium">{v}</span>
    </div>
  )
}

function ActivityItem({
  icon,
  tone,
  title,
  time,
}: {
  icon: React.ReactNode
  tone: string
  title: string
  time: string
}) {
  return (
    <div className="flex gap-3">
      <div className={`flex size-7.5 shrink-0 items-center justify-center rounded ${tone}`}>
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-medium">{title}</div>
        <div className="text-muted-foreground mt-0.5 text-[11.5px]">{time}</div>
      </div>
    </div>
  )
}

export { OwnerBillDetail, KVRow }
