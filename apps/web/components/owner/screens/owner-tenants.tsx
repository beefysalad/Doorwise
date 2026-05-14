"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { RiMore2Line } from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { StatusBadge } from "@/components/doorwise/status-badge"
import {
  PROPERTIES,
  TENANTS,
  fmtDateShort,
  fmtMoney,
} from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import { DataTable } from "@workspace/ui/components/data-table"
import { DataTableColumnHeader } from "@workspace/ui/components/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

type TenantTableRow = {
  email: string
  id: string
  moveIn: string
  name: string
  phone: string
  propertyName: string
  rent: number
  room: string
  status: "active" | "overdue"
}

const tenantRows: TenantTableRow[] = TENANTS.map((tenant) => {
  const property = PROPERTIES.find((item) => item.id === tenant.property)

  return {
    email: tenant.email,
    id: tenant.id,
    moveIn: tenant.since,
    name: tenant.name,
    phone: tenant.phone,
    propertyName: property?.name ?? "Unknown property",
    rent: tenant.rent,
    room: tenant.room,
    status: tenant.status,
  }
})

const tenantColumns: ColumnDef<TenantTableRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tenant" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2.5">
        <AvatarInitials name={row.original.name} size={32} />
        <div>
          <div className="text-[13.5px] font-medium">{row.original.name}</div>
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
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-[12.5px]">
        {row.original.phone}
      </span>
    ),
  },
  {
    accessorKey: "moveIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Move-in" />
    ),
    cell: ({ row }) => fmtDateShort(row.original.moveIn),
  },
  {
    accessorKey: "rent",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Monthly"
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
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.status === "overdue" ? "overdue" : "active"}
      />
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
            <span className="sr-only">Open tenant actions</span>
            <RiMore2Line className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{row.original.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View tenant</DropdownMenuItem>
          <DropdownMenuItem>View room</DropdownMenuItem>
          <DropdownMenuItem>Record payment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function OwnerTenants() {
  return (
    <DataTable
      columns={tenantColumns}
      data={tenantRows}
      filterColumnId="name"
      filterPlaceholder="Search tenants..."
      noResultsMessage="No tenants found."
      pageSizeOptions={[10, 20, 50]}
    />
  )
}

export { OwnerTenants }
