import Link from "next/link"
import {
  RiBarChartLine,
  RiCheckLine,
  RiDoorLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiGroupLine,
  RiMagicLine,
  RiMoneyDollarCircleLine,
} from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { DwCard } from "@/components/doorwise/card"
import { StatCard } from "@/components/doorwise/stat-card"
import {
  BILLS,
  PAYMENTS,
  PROPERTIES,
  daysBetween,
  fmtDateShort,
  fmtMoney,
  fmtMoneyShort,
  getDashboardStats,
  TODAY,
  tenantOf,
} from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"

const TH =
  "px-4.5 py-2.5 text-left text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
const TD = "px-4.5 py-3 text-[13px] align-middle"

function OwnerDashboard() {
  const stats = getDashboardStats()
  const overdueBills = BILLS.filter(
    (b) => b.period === "2026-05" && b.status === "overdue"
  ).map((b) => ({ bill: b, tenant: tenantOf(b.tenant)! }))
  const recentPayments = PAYMENTS.slice(0, 8)
  const collectionPct = Math.round((stats.collected / stats.expected) * 100)
  const partialPaid = BILLS.filter(
    (b) => b.period === "2026-05" && b.status === "partial"
  ).reduce((s, b) => s + b.paid, 0)
  const partialBalance = BILLS.filter(
    (b) => b.period === "2026-05" && b.status === "partial"
  ).reduce((s, b) => s + b.balance, 0)
  const unpaidAmount =
    stats.expected - stats.collected - stats.overdue - partialBalance

  return (
    <div className="flex flex-col gap-5">
      {/* Stat row */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Expected this month"
          value={fmtMoney(stats.expected)}
          sub="May 2026"
          icon={<RiBarChartLine className="size-4" />}
        />
        <StatCard
          label="Collected"
          value={fmtMoney(stats.collected)}
          sub={`${collectionPct}% of expected`}
          trend={`+${collectionPct}%`}
          accent="paid"
          icon={<RiCheckLine className="size-4" />}
        />
        <StatCard
          label="Overdue"
          value={fmtMoney(stats.overdue)}
          sub={`${overdueBills.length} tenants behind`}
          accent="overdue"
          icon={<RiErrorWarningLine className="size-4" />}
        />
        <StatCard
          label="Occupancy"
          value={`${stats.occupancy}%`}
          sub={`${stats.occupiedRooms} of ${stats.totalRooms} rooms occupied`}
          icon={<RiDoorLine className="size-4" />}
        />
      </div>

      {/* Collection + Overdue */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-5">
        {/* Collection progress */}
        <DwCard className="p-4.5 lg:col-span-2">
          <div className="mb-1">
            <div className="text-[15px] font-semibold">May 2026 collection</div>
            <div className="text-xs text-muted-foreground">
              Updated 2 hours ago
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-mono text-xl font-semibold tabular-nums">
                {fmtMoney(stats.collected)}
              </span>
              <span className="text-[13px] text-muted-foreground">
                of {fmtMoney(stats.expected)}
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 bg-paid-foreground"
                style={{ width: `${collectionPct}%` }}
              />
            </div>
            <div className="mt-3.5 flex flex-wrap gap-4 text-xs">
              <DotLegend
                color="bg-paid-foreground"
                label="Paid"
                value={fmtMoneyShort(stats.collected)}
              />
              <DotLegend
                color="bg-partial-foreground"
                label="Partial"
                value={fmtMoneyShort(partialPaid)}
              />
              <DotLegend
                color="bg-overdue-foreground"
                label="Overdue"
                value={fmtMoneyShort(stats.overdue)}
              />
              <DotLegend
                color="bg-muted-foreground/40"
                label="Unpaid"
                value={fmtMoneyShort(unpaidAmount)}
              />
            </div>
          </div>
          <div className="mt-4.5 border-t pt-4.5">
            <div className="mb-2.5 text-xs tracking-wide text-muted-foreground uppercase">
              Quick actions
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start rounded-md"
              >
                <RiMagicLine /> Generate June bills
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start rounded-md"
                asChild
              >
                <Link href="/payments">
                  <RiMoneyDollarCircleLine /> Record payment
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start rounded-md"
                asChild
              >
                <Link href="/tenants">
                  <RiGroupLine /> Add tenant
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start rounded-md"
              >
                <RiDownloadLine /> Export report
              </Button>
            </div>
          </div>
        </DwCard>

        {/* Overdue list */}
        <DwCard className="overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between px-4.5 pt-4 pb-2">
            <div>
              <div className="text-[15px] font-semibold">Overdue tenants</div>
              <div className="text-xs text-muted-foreground">
                {overdueBills.length} tenants are behind on rent
              </div>
            </div>
            <Link href="/bills" className="text-xs font-medium text-primary">
              View all bills →
            </Link>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Tenant</th>
                <th className={TH}>Room</th>
                <th className={TH}>Due</th>
                <th className={`${TH} text-right`}>Amount</th>
                <th className={TH} />
              </tr>
            </thead>
            <tbody>
              {overdueBills.map(({ bill, tenant }) => {
                const days = daysBetween(bill.due, TODAY)
                return (
                  <tr key={bill.id} className="border-t">
                    <td className={TD}>
                      <div className="flex items-center gap-2.5">
                        <AvatarInitials name={tenant.name} size={32} />
                        <div className="min-w-0">
                          <div className="text-[13.5px] font-medium">
                            {tenant.name}
                          </div>
                          <div className="text-[11.5px] text-muted-foreground">
                            {tenant.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={TD}>{tenant.room}</td>
                    <td className={TD}>
                      <div>{fmtDateShort(bill.due)}</div>
                      <div className="text-[11px] text-overdue-foreground">
                        {days} days late
                      </div>
                    </td>
                    <td className={`${TD} text-right`}>
                      <span className="font-mono font-medium tabular-nums">
                        {fmtMoney(bill.balance)}
                      </span>
                    </td>
                    <td className={`${TD} text-right`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-md"
                      >
                        Remind
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </DwCard>
      </div>

      {/* Recent payments + Properties */}
      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-5">
        <DwCard className="overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between px-4.5 pt-4 pb-2">
            <div className="text-[15px] font-semibold">Recent payments</div>
            <Link href="/payments" className="text-xs font-medium text-primary">
              View all →
            </Link>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={TH}>Tenant</th>
                <th className={TH}>Method</th>
                <th className={TH}>Reference</th>
                <th className={TH}>Date</th>
                <th className={`${TH} text-right`}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => {
                const t = tenantOf(p.tenant)!
                return (
                  <tr key={p.id} className="border-t">
                    <td className={TD}>
                      <div className="flex items-center gap-2.5">
                        <AvatarInitials name={t.name} size={28} />
                        <span className="text-[13.5px]">{t.name}</span>
                      </div>
                    </td>
                    <td className={TD}>
                      <MethodPill method={p.method} />
                    </td>
                    <td
                      className={`${TD} font-mono text-xs text-muted-foreground`}
                    >
                      {p.ref || "—"}
                    </td>
                    <td className={TD}>{fmtDateShort(p.date)}</td>
                    <td className={`${TD} text-right`}>
                      <span className="font-mono font-medium tabular-nums">
                        {fmtMoney(p.amount)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </DwCard>

        <DwCard className="p-4.5 lg:col-span-2">
          <div className="mb-1.5">
            <div className="text-[15px] font-semibold">Properties</div>
            <div className="text-xs text-muted-foreground">
              {PROPERTIES.length} active
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-3">
            {PROPERTIES.map((p) => (
              <div key={p.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold">{p.name}</div>
                    <div className="text-[11.5px] text-muted-foreground">
                      {p.type} · {p.occupied}/{p.rooms} rooms
                    </div>
                  </div>
                  <span className="font-mono text-[13px] font-medium tabular-nums">
                    {fmtMoneyShort(p.monthly)}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-paid-foreground/70"
                    style={{ width: `${(p.occupied / p.rooms) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DwCard>
      </div>
    </div>
  )
}

function DotLegend({
  color,
  label,
  value,
}: {
  color: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`size-2 shrink-0 rounded-full ${color}`} />
      <div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="font-mono text-xs font-medium tabular-nums">
          {value}
        </div>
      </div>
    </div>
  )
}

function MethodPill({ method }: { method: string }) {
  const isCash = method === "Cash"
  return (
    <span
      className={
        isCash
          ? "rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
          : "rounded-full bg-accent px-1.5 py-0.5 text-[11px] font-medium text-primary"
      }
    >
      {method}
    </span>
  )
}

export { OwnerDashboard, MethodPill, TH, TD }
