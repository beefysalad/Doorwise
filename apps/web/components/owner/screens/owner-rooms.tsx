"use client"

import { useState } from "react"
import { RiAddLine, RiDownloadLine } from "@remixicon/react"

import { AvatarInitials } from "@/components/doorwise/avatar-initials"
import { DwCard } from "@/components/doorwise/card"
import { SegmentedFilter } from "@/components/doorwise/segmented-filter"
import { StatusBadge } from "@/components/doorwise/status-badge"
import {
  PROPERTIES,
  ROOMS,
  fmtMoney,
  fmtMoneyShort,
  tenantOf,
} from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"

function OwnerRooms({ propertyId }: { propertyId: string }) {
  const [filter, setFilter] = useState("all")

  const property = PROPERTIES.find((p) => p.id === propertyId) ?? PROPERTIES[0]!
  const rooms = ROOMS.filter((r) => r.property === propertyId)
  const filtered =
    filter === "all" ? rooms : rooms.filter((r) => r.status === filter)
  const monthlyPotential = rooms.reduce((s, r) => s + r.rent, 0)

  return (
    <div className="flex flex-col gap-4">
      {/* Filter + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <div className="text-[15px] font-semibold">{property.name}</div>
          <div className="text-xs text-muted-foreground">
            {property.address}
          </div>
        </div>
        <SegmentedFilter
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All", count: rooms.length },
            {
              value: "occupied",
              label: "Occupied",
              count: rooms.filter((r) => r.status === "occupied").length,
            },
            {
              value: "available",
              label: "Available",
              count: rooms.filter((r) => r.status === "available").length,
            },
            {
              value: "reserved",
              label: "Reserved",
              count: rooms.filter((r) => r.status === "reserved").length,
            },
            {
              value: "maintenance",
              label: "Maintenance",
              count: rooms.filter((r) => r.status === "maintenance").length,
            },
          ]}
        />
        <div className="ml-auto text-[13px] text-muted-foreground">
          Monthly potential:{" "}
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {fmtMoney(monthlyPotential)}
          </span>
        </div>
        <Button variant="outline" size="sm" className="rounded-md">
          <RiDownloadLine /> Export
        </Button>
        <Button size="sm" className="rounded-md">
          <RiAddLine /> New room
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((room) => {
          const tenant = room.tenant ? tenantOf(room.tenant) : null
          return (
            <DwCard
              key={room.id}
              className="flex min-h-32 flex-col gap-2.5 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-0.5 font-mono text-xs text-muted-foreground">
                    Floor {room.floor ?? 1}
                  </div>
                  <div className="text-[17px] font-bold tracking-tight">
                    {room.name}
                  </div>
                </div>
                <StatusBadge status={room.status} />
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-2 border-t pt-2.5">
                {tenant ? (
                  <>
                    <AvatarInitials name={tenant.name} size={24} />
                    <div className="min-w-0 flex-1 truncate text-[12.5px] font-medium">
                      {tenant.name}
                    </div>
                  </>
                ) : (
                  <span className="flex-1 text-[12.5px] text-muted-foreground">
                    {room.status === "maintenance"
                      ? "Under maintenance"
                      : room.status === "reserved"
                        ? "Reserved"
                        : "No tenant"}
                  </span>
                )}
                <span className="font-mono text-xs font-semibold tabular-nums">
                  {fmtMoneyShort(room.rent)}
                </span>
              </div>
            </DwCard>
          )
        })}
      </div>
    </div>
  )
}

export { OwnerRooms }
