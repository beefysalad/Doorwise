import {
  RiBuilding2Line,
  RiFileList3Line,
  RiHome5Line,
  RiGroupLine,
  type RemixiconComponentType,
} from "@remixicon/react"

type OwnerNavItem = {
  activeHrefs?: string[]
  href: string
  label: string
  icon: RemixiconComponentType
}

const ownerNavItems: OwnerNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: RiHome5Line },
  {
    href: "/properties",
    label: "Properties",
    icon: RiBuilding2Line,
    activeHrefs: ["/properties", "/rooms"],
  },
  { href: "/tenants", label: "Tenants", icon: RiGroupLine },
  {
    href: "/finance",
    label: "Finance",
    icon: RiFileList3Line,
    activeHrefs: ["/finance", "/leases", "/bills", "/payments"],
  },
]

export { ownerNavItems }
export type { OwnerNavItem }
