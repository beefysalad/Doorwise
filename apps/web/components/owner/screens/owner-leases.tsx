"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  RiAddLine,
  RiCloseLine,
  RiEditLine,
  RiErrorWarningLine,
  RiFilterLine,
} from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { SegmentedFilter } from "@/components/doorwise/segmented-filter"
import { StatusBadge } from "@/components/doorwise/status-badge"
import {
  LEASES,
  PROPERTIES,
  fmtDateShort,
  fmtMoney,
  tenantOf,
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

type LeaseTableRow = {
  deposit: number
  dueDay: number
  email: string
  id: string
  propertyName: string
  rent: number
  room: string
  start: string
  status: "active"
  tenantName: string
}

const leaseRows: LeaseTableRow[] = LEASES.map((lease) => {
  const tenant = tenantOf(lease.tenant)
  const property = PROPERTIES.find((item) => item.id === tenant?.property)

  return {
    deposit: lease.deposit,
    dueDay: lease.dueDay,
    email: tenant?.email ?? "No email",
    id: lease.id,
    propertyName: property?.name ?? "Unknown property",
    rent: lease.rent,
    room: tenant?.room ?? "Unassigned",
    start: lease.start,
    status: lease.status,
    tenantName: tenant?.name ?? "Unknown tenant",
  }
})

function createLeaseColumns(
  onEndLease: (leaseId: string) => void,
): ColumnDef<LeaseTableRow>[] {
  return [
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
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "room",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Room" />
      ),
      cell: ({ row }) => (
        <div>
          <div className="text-[13px]">{row.original.room}</div>
          <div className="text-muted-foreground text-[11.5px]">
            {row.original.propertyName}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "start",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start date" />
      ),
      cell: ({ row }) => fmtDateShort(row.original.start),
    },
    {
      accessorKey: "dueDay",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due day" />
      ),
      cell: ({ row }) => (
        <span className="font-mono tabular-nums">
          Every {row.original.dueDay}th
        </span>
      ),
    },
    {
      accessorKey: "rent",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Monthly rent"
          className="justify-end"
        />
      ),
      cell: ({ row }) => (
        <div className="text-right font-mono tabular-nums">
          {fmtMoney(row.original.rent)}
        </div>
      ),
    },
    {
      accessorKey: "deposit",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Deposit"
          className="justify-end"
        />
      ),
      cell: ({ row }) => (
        <div className="text-muted-foreground text-right font-mono tabular-nums">
          {fmtMoney(row.original.deposit)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: () => <StatusBadge status="active" />,
    },
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div className="ml-auto inline-flex gap-1">
          <Button variant="outline" size="icon-sm" className="rounded-sm">
            <span className="sr-only">Edit lease</span>
            <RiEditLine className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="text-overdue-foreground rounded-sm"
            onClick={() => onEndLease(row.original.id)}
          >
            <span className="sr-only">End lease</span>
            <RiCloseLine className="size-4" />
          </Button>
        </div>
      ),
    },
  ]
}

function OwnerLeases() {
  const [tab, setTab] = useState("active")
  const [confirmEnd, setConfirmEnd] = useState<string | null>(null)
  const showList = tab === "active"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedFilter
          value={tab}
          onChange={setTab}
          options={[
            { value: "active", label: "Active", count: LEASES.length },
            { value: "ending", label: "Ending soon", count: 1 },
            { value: "ended", label: "Ended", count: 0 },
          ]}
        />
        <Button variant="outline" size="sm" className="ml-auto rounded-md">
          <RiFilterLine /> All properties
        </Button>
        <Button size="sm" className="rounded-md">
          <RiAddLine /> New lease
        </Button>
      </div>

      {showList ? (
        <DataTable
          columns={createLeaseColumns(setConfirmEnd)}
          data={leaseRows}
          filterColumnId="tenantName"
          filterPlaceholder="Search tenants..."
          noResultsMessage="No leases found."
          pageSizeOptions={[10, 20, 50]}
        />
      ) : (
        <div className="text-muted-foreground rounded-md border p-10 text-center text-sm">
          {tab === "ending"
            ? "Leases ending soon will surface here as renewal dates approach."
            : "No ended leases yet."}
        </div>
      )}

      <Dialog
        open={confirmEnd !== null}
        onOpenChange={(open) => !open && setConfirmEnd(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End this lease?</DialogTitle>
            <DialogDescription>
              Ending the lease marks the room as available starting next billing
              cycle. Any outstanding bills will remain on the tenant&apos;s
              record.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-overdue text-overdue-foreground flex gap-2 rounded-md p-3 text-[12.5px]">
            <RiErrorWarningLine className="size-4 shrink-0" />
            <span>
              This can&apos;t be undone. Make sure deposits and final dues are
              settled first.
            </span>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => setConfirmEnd(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-md"
              onClick={() => setConfirmEnd(null)}
            >
              End lease
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { OwnerLeases }
