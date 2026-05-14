"use client"

import Link from "next/link"
import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  RiCalendarLine,
  RiInformationLine,
  RiMagicLine,
  RiMore2Line,
} from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { SegmentedFilter } from "@/components/doorwise/segmented-filter"
import { StatusBadge } from "@/components/doorwise/status-badge"
import {
  BILLS,
  PROPERTIES,
  TODAY,
  daysBetween,
  fmtDateShort,
  fmtMoney,
  tenantOf,
  type BillStatus,
} from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import { DataTableColumnHeader } from "@workspace/ui/components/data-table-column-header"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

type BillTableRow = {
  amount: number
  balance: number
  daysLate: number
  due: string
  id: string
  label: string
  paid: number
  propertyName: string
  room: string
  status: BillStatus
  tenantName: string
  tenantPhone: string
}

const currentBills = BILLS.filter((bill) => bill.period === "2026-05")

const billRows: BillTableRow[] = currentBills.map((bill) => {
  const tenant = tenantOf(bill.tenant)
  const property = PROPERTIES.find((item) => item.id === tenant?.property)

  return {
    amount: bill.amount,
    balance: bill.balance,
    daysLate: daysBetween(bill.due, TODAY),
    due: bill.due,
    id: bill.id,
    label: bill.label,
    paid: bill.paid,
    propertyName: property?.name ?? "Unknown property",
    room: tenant?.room ?? bill.room,
    status: bill.status,
    tenantName: tenant?.name ?? "Unknown tenant",
    tenantPhone: tenant?.phone ?? "No phone",
  }
})

const billColumns: ColumnDef<BillTableRow>[] = [
  {
    accessorKey: "tenantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.original.tenantName} size={30} />
        <div>
          <div className="text-[13.5px] font-medium">
            {row.original.tenantName}
          </div>
          <div className="text-muted-foreground text-[11.5px]">
            {row.original.tenantPhone}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "propertyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Property / Room" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="text-[13px]">{row.original.propertyName}</div>
        <div className="text-muted-foreground text-[11.5px]">
          {row.original.room}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period" />
    ),
  },
  {
    accessorKey: "due",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due date" />
    ),
    cell: ({ row }) => (
      <div>
        <div>{fmtDateShort(row.original.due)}</div>
        {row.original.status === "overdue" ? (
          <div className="text-overdue-foreground text-[11px]">
            {row.original.daysLate} days late
          </div>
        ) : null}
      </div>
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
      <div className="text-right font-mono tabular-nums">
        {fmtMoney(row.original.amount)}
      </div>
    ),
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Paid"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div
        className={
          row.original.paid > 0
            ? "text-paid-foreground text-right font-mono tabular-nums"
            : "text-muted-foreground text-right font-mono tabular-nums"
        }
      >
        {row.original.paid > 0 ? fmtMoney(row.original.paid) : "-"}
      </div>
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Balance"
        className="justify-end"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right font-mono font-semibold tabular-nums">
        {fmtMoney(row.original.balance)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => (
      <Button variant="ghost" size="icon-sm" className="ml-auto" asChild>
        <Link href={`/bills/${row.original.id}`}>
          <span className="sr-only">Open bill</span>
          <RiMore2Line className="size-4" />
        </Link>
      </Button>
    ),
  },
]

function OwnerBills() {
  const [filter, setFilter] = useState("all")
  const [showGen, setShowGen] = useState(false)

  const counts = {
    all: billRows.length,
    unpaid: billRows.filter((bill) => bill.status === "unpaid").length,
    overdue: billRows.filter((bill) => bill.status === "overdue").length,
    partial: billRows.filter((bill) => bill.status === "partial").length,
    paid: billRows.filter((bill) => bill.status === "paid").length,
  }

  const filtered =
    filter === "all"
      ? billRows
      : billRows.filter((bill) => bill.status === filter)

  const totalBilled = billRows.reduce((sum, bill) => sum + bill.amount, 0)
  const outstanding = billRows.reduce((sum, bill) => sum + bill.balance, 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedFilter
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All", count: counts.all },
            { value: "unpaid", label: "Unpaid", count: counts.unpaid },
            { value: "overdue", label: "Overdue", count: counts.overdue },
            { value: "partial", label: "Partial", count: counts.partial },
            { value: "paid", label: "Paid", count: counts.paid },
          ]}
        />
        <Button variant="outline" size="sm" className="ml-auto rounded-md">
          <RiCalendarLine /> May 2026
        </Button>
        <Button
          size="sm"
          className="rounded-md"
          onClick={() => setShowGen(true)}
        >
          <RiMagicLine /> Generate bills
        </Button>
      </div>

      <DataTable
        columns={billColumns}
        data={filtered}
        filterColumnId="tenantName"
        filterPlaceholder="Search tenants..."
        noResultsMessage="No bills match this view."
        pageSizeOptions={[10, 20, 50]}
      />

      <div className="text-muted-foreground flex justify-between gap-4 text-[13px]">
        <span>
          Showing {filtered.length} of {billRows.length} bills
        </span>
        <span>
          Total billed:{" "}
          <span className="text-foreground font-mono font-semibold tabular-nums">
            {fmtMoney(totalBilled)}
          </span>{" "}
          · Outstanding:{" "}
          <span className="text-overdue-foreground font-mono font-semibold tabular-nums">
            {fmtMoney(outstanding)}
          </span>
        </span>
      </div>

      <Dialog open={showGen} onOpenChange={setShowGen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate bills for June 2026</DialogTitle>
            <DialogDescription>
              This will create monthly rent bills for{" "}
              <span className="text-foreground font-medium">
                22 active leases
              </span>
              , totaling{" "}
              <span className="text-foreground font-mono font-medium">
                {fmtMoney(261500)}
              </span>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="bg-status-info text-status-info-foreground flex gap-2 rounded-md p-3 text-[12.5px]">
            <RiInformationLine className="size-4 shrink-0" />
            <span>
              Tenants with active notifications will receive a bill alert via
              email and SMS.
            </span>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => setShowGen(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-md" onClick={() => setShowGen(false)}>
              Generate 22 bills
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { OwnerBills }
