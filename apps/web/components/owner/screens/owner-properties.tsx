import Link from "next/link"
import { RiBuilding2Line } from "@remixicon/react"

import { DwCard } from "@/components/doorwise/card"
import { PROPERTIES, fmtMoneyShort } from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"

function OwnerProperties() {
  return (
    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
      {PROPERTIES.map((p) => (
        <DwCard key={p.id} className="overflow-hidden">
          <div className="p-4.5">
            <div className="mb-3.5 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-md bg-accent text-primary">
                <RiBuilding2Line className="size-5.5" />
              </div>
              <div>
                <div className="text-[15px] font-semibold">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.type}</div>
              </div>
            </div>
            <div className="mb-3 text-xs text-muted-foreground">
              {p.address}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-muted-foreground">Occupied</div>
                <div className="mt-0.5 font-semibold">
                  {p.occupied}/{p.rooms}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Monthly</div>
                <div className="mt-0.5 font-mono font-semibold tabular-nums">
                  {fmtMoneyShort(p.monthly)}
                </div>
              </div>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-4 w-full rounded-md"
            >
              <Link href={`/rooms?property=${p.id}`}>View rooms</Link>
            </Button>
          </div>
          <div className="relative h-1.5 bg-muted">
            <div
              className="absolute inset-y-0 left-0 bg-paid-foreground/70"
              style={{ width: `${(p.occupied / p.rooms) * 100}%` }}
            />
          </div>
        </DwCard>
      ))}
    </div>
  )
}

export { OwnerProperties }
