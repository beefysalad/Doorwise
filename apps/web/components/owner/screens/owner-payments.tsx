"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { RiAddLine, RiDownloadLine, RiMore2Line } from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { DwCard } from "@/components/doorwise/card"
import { SegmentedFilter } from "@/components/doorwise/segmented-filter"
import { MethodPill } from "@/components/owner/screens/owner-dashboard"
import {
  BILLS,
  PAYMENTS,
  fmtDateShort,
  fmtMoney,
  fmtMoneyShort,
  tenantOf,
  type PaymentMethod,
} from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import { DataTableColumnHeader } from "@workspace/ui/components/data-table-column-header"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"

const METHODS: { name: PaymentMethod; logo: string; color: string }[] = [
  { name: "GCash", logo: "GC", color: "#0072FF" },
  { name: "Maya", logo: "MA", color: "#00DC65" },
  { name: "Bank Transfer", logo: "₱", color: "#b45309" },
  { name: "Cash", logo: "₱", color: "#78716c" },
]

type PaymentTableRow = {
  amount: number
  billLabel: string
  date: string
  id: string
  method: PaymentMethod
  recordedBy: string
  reference: string
  tenantName: string
}

const paymentRows: PaymentTableRow[] = PAYMENTS.map((payment) => {
  const tenant = tenantOf(payment.tenant)
  const bill = BILLS.find((item) => item.id === payment.bill)

  return {
    amount: payment.amount,
    billLabel: bill?.label ?? "-",
    date: payment.date,
    id: payment.id,
    method: payment.method,
    recordedBy: payment.recordedBy,
    reference: payment.ref || "-",
    tenantName: tenant?.name ?? "Unknown tenant",
  }
})

const paymentColumns: ColumnDef<PaymentTableRow>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => fmtDateShort(row.original.date),
  },
  {
    accessorKey: "tenantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.original.tenantName} size={28} />
        <span className="text-[13.5px] font-medium">
          {row.original.tenantName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "billLabel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bill" />
    ),
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Method" />
    ),
    cell: ({ row }) => <MethodPill method={row.original.method} />,
  },
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.original.reference}
      </span>
    ),
  },
  {
    accessorKey: "recordedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recorded by" />
    ),
    cell: ({ row }) => (
      <span className="text-[12.5px] text-muted-foreground">
        {row.original.recordedBy}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono font-medium tabular-nums">
        {fmtMoney(row.original.amount)}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="ml-auto">
            <span className="sr-only">Open payment actions</span>
            <RiMore2Line className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{row.original.tenantName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View payment</DropdownMenuItem>
          <DropdownMenuItem>View bill</DropdownMenuItem>
          <DropdownMenuItem>Send receipt</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function OwnerPayments() {
  const [methodFilter, setMethodFilter] = useState("all")
  const [showRecord, setShowRecord] = useState(false)

  const filtered =
    methodFilter === "all"
      ? paymentRows
      : paymentRows.filter((payment) => payment.method === methodFilter)

  const totalFor = (name: PaymentMethod) =>
    PAYMENTS.filter((payment) => payment.method === name).reduce(
      (sum, payment) => sum + payment.amount,
      0
    )
  const countFor = (name: PaymentMethod) =>
    PAYMENTS.filter((payment) => payment.method === name).length

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {METHODS.map((method) => (
          <DwCard key={method.name} className="flex items-center gap-3 p-4">
            <div
              className="flex size-10 items-center justify-center rounded-md text-sm font-bold text-white"
              style={{ background: method.color }}
            >
              {method.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">{method.name}</div>
              <div className="font-mono text-lg font-semibold tracking-tight tabular-nums">
                {fmtMoneyShort(totalFor(method.name))}
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {countFor(method.name)} pmts
            </div>
          </DwCard>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SegmentedFilter
          value={methodFilter}
          onChange={setMethodFilter}
          options={[
            { value: "all", label: "All", count: PAYMENTS.length },
            { value: "GCash", label: "GCash", count: countFor("GCash") },
            { value: "Maya", label: "Maya", count: countFor("Maya") },
            {
              value: "Bank Transfer",
              label: "Bank",
              count: countFor("Bank Transfer"),
            },
            { value: "Cash", label: "Cash", count: countFor("Cash") },
          ]}
        />
        <Button variant="outline" size="sm" className="ml-auto rounded-md">
          <RiDownloadLine /> Export
        </Button>
        <Button
          size="sm"
          className="rounded-md"
          onClick={() => setShowRecord(true)}
        >
          <RiAddLine /> Record payment
        </Button>
      </div>

      <DataTable
        columns={paymentColumns}
        data={filtered}
        filterColumnId="tenantName"
        filterPlaceholder="Search tenants..."
        noResultsMessage="No payments match this view."
        pageSizeOptions={[10, 20, 50]}
      />

      <Dialog open={showRecord} onOpenChange={setShowRecord}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Record a payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Tenant &amp; bill</Label>
              <Select>
                <SelectTrigger className="w-full rounded-md">
                  <SelectValue placeholder="Choose a bill..." />
                </SelectTrigger>
                <SelectContent>
                  {BILLS.filter((bill) => bill.balance > 0)
                    .slice(0, 6)
                    .map((bill) => (
                      <SelectItem key={bill.id} value={bill.id}>
                        {tenantOf(bill.tenant)?.name ?? "Unknown tenant"} ·{" "}
                        {bill.label} · {fmtMoneyShort(bill.balance)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1.5">
                <Label>Amount</Label>
                <Input placeholder="₱0.00" className="rounded-md" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Date</Label>
                <Input placeholder="May 14, 2026" className="rounded-md" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Method</Label>
              <Select defaultValue="Cash">
                <SelectTrigger className="w-full rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {METHODS.map((method) => (
                    <SelectItem key={method.name} value={method.name}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Reference number</Label>
              <Input placeholder="GC-2026051412987" className="rounded-md" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Notes (optional)</Label>
              <Textarea rows={2} placeholder="Anything to remember?" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => setShowRecord(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-md" onClick={() => setShowRecord(false)}>
              Record payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { OwnerPayments }
