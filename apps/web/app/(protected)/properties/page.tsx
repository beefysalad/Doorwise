import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerProperties } from "@/components/owner/screens/owner-properties"
import { PROPERTIES } from "@/lib/mock/doorwise"
import { Button } from "@workspace/ui/components/button"
import { RiAddLine } from "@remixicon/react"

export default function PropertiesPage() {
  return (
    <OwnerPage
      title="Properties"
      sub={`${PROPERTIES.length} properties`}
      actions={
        <Button size="sm" className="rounded-md">
          <RiAddLine /> Add property
        </Button>
      }
    >
      <OwnerProperties />
    </OwnerPage>
  )
}
