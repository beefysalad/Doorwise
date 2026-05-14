import Link from "next/link"
import { RiArrowLeftLine } from "@remixicon/react"

import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerRooms } from "@/components/owner/screens/owner-rooms"
import { PROPERTIES, ROOMS } from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"

type RoomsPageProps = {
  searchParams?: Promise<{
    property?: string
  }>
}

export default async function RoomsPage({ searchParams }: RoomsPageProps) {
  const params = await searchParams
  const propertyId = params?.property ?? PROPERTIES[0]?.id ?? "p1"
  const property = PROPERTIES.find((item) => item.id === propertyId)
  const rooms = ROOMS.filter((room) => room.property === propertyId)

  return (
    <OwnerPage
      title="Rooms"
      sub={`${property?.name ?? "Selected property"} · ${rooms.length} rooms`}
      actions={
        <Button asChild variant="outline" size="sm" className="rounded-md">
          <Link href="/properties">
            <RiArrowLeftLine /> Back to properties
          </Link>
        </Button>
      }
    >
      <OwnerRooms propertyId={propertyId} />
    </OwnerPage>
  )
}
