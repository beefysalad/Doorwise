// Doorwise — mock data (frontend-only). Filipino names, Philippine peso.
// This stands in for the backend until the real API is wired up.

export type BillStatus = "paid" | "partial" | "overdue" | "unpaid"
export type RoomStatus = "occupied" | "available" | "reserved" | "maintenance"
export type TenantStatus = "active" | "overdue"
export type PaymentMethod = "Cash" | "GCash" | "Maya" | "Bank Transfer"

export type Org = {
  name: string
  owner: string
  ownerEmail: string
  phone: string
  address: string
}

export type Property = {
  id: string
  name: string
  type: string
  address: string
  rooms: number
  occupied: number
  monthly: number
}

export type EmergencyContact = {
  name: string
  phone: string
  relation: string
}

export type Tenant = {
  id: string
  name: string
  phone: string
  email: string
  room: string
  property: string
  rent: number
  status: TenantStatus
  since: string
  emergency: EmergencyContact
}

export type Room = {
  id: string
  property: string
  name: string
  tenant: string | null
  rent: number
  status: RoomStatus
  floor?: number
}

export type Lease = {
  id: string
  tenant: string
  room: string | null
  rent: number
  deposit: number
  advance: number
  dueDay: number
  start: string
  end: string | null
  status: "active"
}

export type Bill = {
  id: string
  tenant: string
  room: string
  property: string
  period: string
  label: string
  due: string
  amount: number
  paid: number
  balance: number
  status: BillStatus
}

export type Payment = {
  id: string
  bill: string
  tenant: string
  amount: number
  method: PaymentMethod
  ref: string
  date: string
  recordedBy: string
}

export type NotificationType =
  | "payment"
  | "overdue"
  | "lease"
  | "system"
  | "maintenance"

export type AppNotification = {
  id: string
  type: NotificationType
  read: boolean
  time: string
  title: string
  body: string
  actor: string | null
}

// Today, fixed for deterministic demo
export const TODAY = "2026-05-14"

// ── Formatters ──────────────────────────────────────────────────
export function fmtMoney(n: number): string {
  const v = Number(n) || 0
  const s = v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return "₱" + s
}

export function fmtMoneyShort(n: number): string {
  const v = Number(n) || 0
  return "₱" + Math.round(v).toLocaleString("en-PH")
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function fmtDate(iso: string): string {
  if (!iso) return ""
  const [y, m, d] = iso.split("-").map(Number)
  return `${MONTHS[(m ?? 1) - 1]} ${d}, ${y}`
}

export function fmtDateShort(iso: string): string {
  if (!iso) return ""
  const [y, m, d] = iso.split("-").map(Number)
  return `${MONTHS_SHORT[(m ?? 1) - 1]} ${d}, ${y}`
}

export function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00")
  const db = new Date(b + "T00:00:00")
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

// ── Avatar palette — initials in colored circles ────────────────
export const AVATAR_COLORS = [
  { bg: "#fee2e2", fg: "#991b1b" },
  { bg: "#fef3c7", fg: "#854d0e" },
  { bg: "#dcfce7", fg: "#166534" },
  { bg: "#dbeafe", fg: "#1e40af" },
  { bg: "#ede9fe", fg: "#5b21b6" },
  { bg: "#ffe4e6", fg: "#9f1239" },
  { bg: "#ccfbf1", fg: "#115e59" },
  { bg: "#ffedd5", fg: "#9a3412" },
  { bg: "#e0e7ff", fg: "#3730a3" },
  { bg: "#fce7f3", fg: "#9d174d" },
]

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()
}

export function colorFor(key: string): { bg: string; fg: string } {
  let h = 0
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return AVATAR_COLORS[h % AVATAR_COLORS.length] ?? AVATAR_COLORS[0]!
}

// ── Organization ────────────────────────────────────────────────
export const ORG: Org = {
  name: "Cruz Residences",
  owner: "Juan Cruz",
  ownerEmail: "juan@cruzresidences.ph",
  phone: "0917 555 2841",
  address: "14 Mabini St., Brgy. Poblacion, Makati City",
}

// ── Properties ─────────────────────────────────────────────────
export const PROPERTIES: Property[] = [
  {
    id: "p1",
    name: "Mabini Boarding House",
    type: "Boarding House",
    address: "14 Mabini St., Brgy. Poblacion, Makati",
    rooms: 12,
    occupied: 10,
    monthly: 78500,
  },
  {
    id: "p2",
    name: "Katipunan Apartments",
    type: "Apartment",
    address: "88 Katipunan Ave., Quezon City",
    rooms: 6,
    occupied: 5,
    monthly: 92000,
  },
  {
    id: "p3",
    name: "Taft Bedspacer Hub",
    type: "Dormitory",
    address: "2310 Taft Ave., Manila",
    rooms: 8,
    occupied: 7,
    monthly: 38500,
  },
]

// ── Tenants ────────────────────────────────────────────────────
export const TENANTS: Tenant[] = [
  {
    id: "t1",
    name: "Maria Santos",
    phone: "0917 234 1180",
    email: "maria.santos@gmail.com",
    room: "Room 101",
    property: "p1",
    rent: 6500,
    status: "active",
    since: "2024-08-01",
    emergency: {
      name: "Roberto Santos",
      phone: "0917 555 1180",
      relation: "Father",
    },
  },
  {
    id: "t2",
    name: "Jose Reyes",
    phone: "0918 442 9931",
    email: "jreyes@yahoo.com",
    room: "Room 102",
    property: "p1",
    rent: 6500,
    status: "active",
    since: "2025-02-15",
    emergency: {
      name: "Linda Reyes",
      phone: "0918 442 9930",
      relation: "Mother",
    },
  },
  {
    id: "t3",
    name: "Andrea Dela Cruz",
    phone: "0915 887 1023",
    email: "andrea.dc@gmail.com",
    room: "Room 103",
    property: "p1",
    rent: 7000,
    status: "active",
    since: "2024-11-10",
    emergency: {
      name: "Marco Dela Cruz",
      phone: "0915 887 1099",
      relation: "Brother",
    },
  },
  {
    id: "t4",
    name: "Paolo Ramirez",
    phone: "0917 339 0021",
    email: "paolo.r@outlook.com",
    room: "Room 104",
    property: "p1",
    rent: 6500,
    status: "overdue",
    since: "2025-03-01",
    emergency: {
      name: "Tess Ramirez",
      phone: "0917 339 0022",
      relation: "Mother",
    },
  },
  {
    id: "t5",
    name: "Bea Villanueva",
    phone: "0916 240 7765",
    email: "bea.v@gmail.com",
    room: "Room 105",
    property: "p1",
    rent: 7000,
    status: "active",
    since: "2025-01-20",
    emergency: {
      name: "Carlo Villanueva",
      phone: "0916 240 7700",
      relation: "Brother",
    },
  },
  {
    id: "t6",
    name: "Mike Tan",
    phone: "0917 901 2287",
    email: "mike.tan@gmail.com",
    room: "Room 201",
    property: "p1",
    rent: 7500,
    status: "active",
    since: "2024-05-12",
    emergency: { name: "Ana Tan", phone: "0917 901 2288", relation: "Sister" },
  },
  {
    id: "t7",
    name: "Ria Gonzales",
    phone: "0918 332 5510",
    email: "ria.g@gmail.com",
    room: "Room 202",
    property: "p1",
    rent: 7500,
    status: "active",
    since: "2025-04-01",
    emergency: {
      name: "Luz Gonzales",
      phone: "0918 332 5511",
      relation: "Mother",
    },
  },
  {
    id: "t8",
    name: "Carlos Bautista",
    phone: "0917 712 0099",
    email: "cbautista@yahoo.com",
    room: "Room 203",
    property: "p1",
    rent: 7500,
    status: "overdue",
    since: "2024-09-15",
    emergency: {
      name: "Mila Bautista",
      phone: "0917 712 0098",
      relation: "Wife",
    },
  },
  {
    id: "t9",
    name: "Janine Mercado",
    phone: "0915 102 9931",
    email: "janine.m@gmail.com",
    room: "Room 204",
    property: "p1",
    rent: 8000,
    status: "active",
    since: "2025-02-01",
    emergency: {
      name: "Erika Mercado",
      phone: "0915 102 9932",
      relation: "Sister",
    },
  },
  {
    id: "t10",
    name: "Elijah Aquino",
    phone: "0917 451 7821",
    email: "elijah.a@outlook.com",
    room: "Room 205",
    property: "p1",
    rent: 8000,
    status: "active",
    since: "2024-12-05",
    emergency: {
      name: "Joel Aquino",
      phone: "0917 451 7820",
      relation: "Father",
    },
  },
  {
    id: "t11",
    name: "Patricia Lim",
    phone: "0917 200 3341",
    email: "pat.lim@gmail.com",
    room: "Unit A",
    property: "p2",
    rent: 18500,
    status: "active",
    since: "2024-07-01",
    emergency: {
      name: "David Lim",
      phone: "0917 200 3340",
      relation: "Husband",
    },
  },
  {
    id: "t12",
    name: "Mark Dimaano",
    phone: "0918 661 4452",
    email: "mark.d@yahoo.com",
    room: "Unit B",
    property: "p2",
    rent: 18500,
    status: "active",
    since: "2025-01-15",
    emergency: {
      name: "Cathy Dimaano",
      phone: "0918 661 4451",
      relation: "Wife",
    },
  },
  {
    id: "t13",
    name: "Sofia Navarro",
    phone: "0917 884 2210",
    email: "sofia.n@gmail.com",
    room: "Unit C",
    property: "p2",
    rent: 19000,
    status: "overdue",
    since: "2024-10-01",
    emergency: {
      name: "Ramon Navarro",
      phone: "0917 884 2211",
      relation: "Father",
    },
  },
  {
    id: "t14",
    name: "Kevin Pascual",
    phone: "0916 559 0023",
    email: "kpascual@gmail.com",
    room: "Unit D",
    property: "p2",
    rent: 19000,
    status: "active",
    since: "2025-03-10",
    emergency: {
      name: "Nina Pascual",
      phone: "0916 559 0024",
      relation: "Wife",
    },
  },
  {
    id: "t15",
    name: "Camille Domingo",
    phone: "0917 123 7790",
    email: "camille.d@outlook.com",
    room: "Unit E",
    property: "p2",
    rent: 17000,
    status: "active",
    since: "2024-06-20",
    emergency: {
      name: "Bert Domingo",
      phone: "0917 123 7791",
      relation: "Brother",
    },
  },
  {
    id: "t16",
    name: "JR Manalo",
    phone: "0915 776 0098",
    email: "jr.manalo@gmail.com",
    room: "Bed 1",
    property: "p3",
    rent: 4500,
    status: "active",
    since: "2025-02-20",
    emergency: {
      name: "Lisa Manalo",
      phone: "0915 776 0099",
      relation: "Mother",
    },
  },
  {
    id: "t17",
    name: "Trisha Bernardo",
    phone: "0917 318 4421",
    email: "trisha.b@gmail.com",
    room: "Bed 2",
    property: "p3",
    rent: 4500,
    status: "active",
    since: "2024-12-12",
    emergency: {
      name: "Karen Bernardo",
      phone: "0917 318 4422",
      relation: "Sister",
    },
  },
  {
    id: "t18",
    name: "Nico Estrada",
    phone: "0918 102 5532",
    email: "nico.e@yahoo.com",
    room: "Bed 3",
    property: "p3",
    rent: 5000,
    status: "overdue",
    since: "2025-01-08",
    emergency: {
      name: "Ben Estrada",
      phone: "0918 102 5531",
      relation: "Father",
    },
  },
  {
    id: "t19",
    name: "Hannah Lopez",
    phone: "0917 449 2210",
    email: "hannah.l@gmail.com",
    room: "Bed 4",
    property: "p3",
    rent: 5000,
    status: "active",
    since: "2025-04-05",
    emergency: {
      name: "Marie Lopez",
      phone: "0917 449 2211",
      relation: "Mother",
    },
  },
  {
    id: "t20",
    name: "Carlo Yap",
    phone: "0916 220 1198",
    email: "carlo.y@gmail.com",
    room: "Bed 5",
    property: "p3",
    rent: 4500,
    status: "active",
    since: "2024-08-25",
    emergency: {
      name: "Daisy Yap",
      phone: "0916 220 1199",
      relation: "Sister",
    },
  },
  {
    id: "t21",
    name: "Issa Velasco",
    phone: "0917 553 9981",
    email: "issa.v@outlook.com",
    room: "Bed 6",
    property: "p3",
    rent: 4500,
    status: "active",
    since: "2025-03-22",
    emergency: {
      name: "Sam Velasco",
      phone: "0917 553 9982",
      relation: "Brother",
    },
  },
  {
    id: "t22",
    name: "Daniel Quizon",
    phone: "0915 887 4421",
    email: "daniel.q@gmail.com",
    room: "Bed 7",
    property: "p3",
    rent: 4500,
    status: "active",
    since: "2024-11-30",
    emergency: {
      name: "Faith Quizon",
      phone: "0915 887 4420",
      relation: "Wife",
    },
  },
]

export function tenantOf(id: string): Tenant | undefined {
  return TENANTS.find((t) => t.id === id)
}

// ── Rooms ──────────────────────────────────────────────────────
export const ROOMS: Room[] = [
  {
    id: "r1",
    property: "p1",
    name: "Room 101",
    tenant: "t1",
    rent: 6500,
    status: "occupied",
    floor: 1,
  },
  {
    id: "r2",
    property: "p1",
    name: "Room 102",
    tenant: "t2",
    rent: 6500,
    status: "occupied",
    floor: 1,
  },
  {
    id: "r3",
    property: "p1",
    name: "Room 103",
    tenant: "t3",
    rent: 7000,
    status: "occupied",
    floor: 1,
  },
  {
    id: "r4",
    property: "p1",
    name: "Room 104",
    tenant: "t4",
    rent: 6500,
    status: "occupied",
    floor: 1,
  },
  {
    id: "r5",
    property: "p1",
    name: "Room 105",
    tenant: "t5",
    rent: 7000,
    status: "occupied",
    floor: 1,
  },
  {
    id: "r6",
    property: "p1",
    name: "Room 106",
    tenant: null,
    rent: 6500,
    status: "available",
    floor: 1,
  },
  {
    id: "r7",
    property: "p1",
    name: "Room 201",
    tenant: "t6",
    rent: 7500,
    status: "occupied",
    floor: 2,
  },
  {
    id: "r8",
    property: "p1",
    name: "Room 202",
    tenant: "t7",
    rent: 7500,
    status: "occupied",
    floor: 2,
  },
  {
    id: "r9",
    property: "p1",
    name: "Room 203",
    tenant: "t8",
    rent: 7500,
    status: "occupied",
    floor: 2,
  },
  {
    id: "r10",
    property: "p1",
    name: "Room 204",
    tenant: "t9",
    rent: 8000,
    status: "occupied",
    floor: 2,
  },
  {
    id: "r11",
    property: "p1",
    name: "Room 205",
    tenant: "t10",
    rent: 8000,
    status: "occupied",
    floor: 2,
  },
  {
    id: "r12",
    property: "p1",
    name: "Room 206",
    tenant: null,
    rent: 7500,
    status: "maintenance",
    floor: 2,
  },
  {
    id: "r13",
    property: "p2",
    name: "Unit A",
    tenant: "t11",
    rent: 18500,
    status: "occupied",
  },
  {
    id: "r14",
    property: "p2",
    name: "Unit B",
    tenant: "t12",
    rent: 18500,
    status: "occupied",
  },
  {
    id: "r15",
    property: "p2",
    name: "Unit C",
    tenant: "t13",
    rent: 19000,
    status: "occupied",
  },
  {
    id: "r16",
    property: "p2",
    name: "Unit D",
    tenant: "t14",
    rent: 19000,
    status: "occupied",
  },
  {
    id: "r17",
    property: "p2",
    name: "Unit E",
    tenant: "t15",
    rent: 17000,
    status: "occupied",
  },
  {
    id: "r18",
    property: "p2",
    name: "Unit F",
    tenant: null,
    rent: 18000,
    status: "reserved",
  },
  {
    id: "r19",
    property: "p3",
    name: "Bed 1",
    tenant: "t16",
    rent: 4500,
    status: "occupied",
  },
  {
    id: "r20",
    property: "p3",
    name: "Bed 2",
    tenant: "t17",
    rent: 4500,
    status: "occupied",
  },
  {
    id: "r21",
    property: "p3",
    name: "Bed 3",
    tenant: "t18",
    rent: 5000,
    status: "occupied",
  },
  {
    id: "r22",
    property: "p3",
    name: "Bed 4",
    tenant: "t19",
    rent: 5000,
    status: "occupied",
  },
  {
    id: "r23",
    property: "p3",
    name: "Bed 5",
    tenant: "t20",
    rent: 4500,
    status: "occupied",
  },
  {
    id: "r24",
    property: "p3",
    name: "Bed 6",
    tenant: "t21",
    rent: 4500,
    status: "occupied",
  },
  {
    id: "r25",
    property: "p3",
    name: "Bed 7",
    tenant: "t22",
    rent: 4500,
    status: "occupied",
  },
  {
    id: "r26",
    property: "p3",
    name: "Bed 8",
    tenant: null,
    rent: 4500,
    status: "available",
  },
]

// ── Leases ─────────────────────────────────────────────────────
export const LEASES: Lease[] = TENANTS.map((t) => {
  const room = ROOMS.find((r) => r.tenant === t.id)
  return {
    id: "l-" + t.id,
    tenant: t.id,
    room: room ? room.id : null,
    rent: t.rent,
    deposit: t.rent * 2,
    advance: t.rent,
    dueDay: 5,
    start: t.since,
    end: null,
    status: "active" as const,
  }
})

// ── Bills ──────────────────────────────────────────────────────
export const BILLS: Bill[] = (() => {
  const bills: Bill[] = []
  const months = [
    { label: "March 2026", due: "2026-03-05", period: "2026-03" },
    { label: "April 2026", due: "2026-04-05", period: "2026-04" },
    { label: "May 2026", due: "2026-05-05", period: "2026-05" },
  ]
  const overdueIds = new Set(["t4", "t8", "t13", "t18"])
  const partialIds = new Set(["t3", "t11"])

  TENANTS.forEach((t) => {
    months.forEach((m, idx) => {
      let paid = 0
      let status: BillStatus = "paid"
      if (idx < 2) {
        if (t.id === "t4" && idx === 1) {
          paid = 0
          status = "overdue"
        } else if (t.id === "t8" && idx === 1) {
          paid = t.rent / 2
          status = "partial"
        } else {
          paid = t.rent
          status = "paid"
        }
      } else {
        if (overdueIds.has(t.id)) {
          paid = 0
          status = "overdue"
        } else if (partialIds.has(t.id)) {
          paid = Math.round(t.rent / 2)
          status = "partial"
        } else if (
          ["t1", "t2", "t6", "t11", "t12", "t16", "t17", "t20"].includes(t.id)
        ) {
          paid = t.rent
          status = "paid"
        } else {
          paid = 0
          status = "unpaid"
        }
      }
      bills.push({
        id: `b-${t.id}-${idx}`,
        tenant: t.id,
        room: t.room,
        property: t.property,
        period: m.period,
        label: m.label,
        due: m.due,
        amount: t.rent,
        paid,
        balance: t.rent - paid,
        status,
      })
    })
  })
  return bills
})()

export function billOf(id: string): Bill | undefined {
  return BILLS.find((b) => b.id === id)
}

// ── Payments ───────────────────────────────────────────────────
export const PAYMENTS: Payment[] = [
  {
    id: "pay1",
    bill: "b-t1-2",
    tenant: "t1",
    amount: 6500,
    method: "GCash",
    ref: "GC-2026050412987",
    date: "2026-05-04",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay2",
    bill: "b-t2-2",
    tenant: "t2",
    amount: 6500,
    method: "Cash",
    ref: "",
    date: "2026-05-05",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay3",
    bill: "b-t6-2",
    tenant: "t6",
    amount: 7500,
    method: "Maya",
    ref: "MY-2026050518224",
    date: "2026-05-05",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay4",
    bill: "b-t11-2",
    tenant: "t11",
    amount: 9250,
    method: "Bank Transfer",
    ref: "BPI-771029",
    date: "2026-05-06",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay5",
    bill: "b-t12-2",
    tenant: "t12",
    amount: 18500,
    method: "GCash",
    ref: "GC-2026050620114",
    date: "2026-05-06",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay6",
    bill: "b-t16-2",
    tenant: "t16",
    amount: 4500,
    method: "GCash",
    ref: "GC-2026050722901",
    date: "2026-05-07",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay7",
    bill: "b-t17-2",
    tenant: "t17",
    amount: 4500,
    method: "Cash",
    ref: "",
    date: "2026-05-08",
    recordedBy: "Lia Cruz",
  },
  {
    id: "pay8",
    bill: "b-t20-2",
    tenant: "t20",
    amount: 4500,
    method: "GCash",
    ref: "GC-2026050911432",
    date: "2026-05-09",
    recordedBy: "Lia Cruz",
  },
  {
    id: "pay9",
    bill: "b-t3-2",
    tenant: "t3",
    amount: 3500,
    method: "Maya",
    ref: "MY-2026051014876",
    date: "2026-05-10",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay10",
    bill: "b-t1-1",
    tenant: "t1",
    amount: 6500,
    method: "GCash",
    ref: "GC-2026040312411",
    date: "2026-04-03",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay11",
    bill: "b-t2-1",
    tenant: "t2",
    amount: 6500,
    method: "GCash",
    ref: "GC-2026040412889",
    date: "2026-04-04",
    recordedBy: "Juan Cruz",
  },
  {
    id: "pay12",
    bill: "b-t6-1",
    tenant: "t6",
    amount: 7500,
    method: "Maya",
    ref: "MY-2026040518733",
    date: "2026-04-05",
    recordedBy: "Juan Cruz",
  },
]

// ── Notifications ──────────────────────────────────────────────
export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "payment",
    read: false,
    time: "2 hours ago",
    title: "Payment received",
    body: "Maria Santos paid ₱6,500.00 via GCash for May 2026.",
    actor: "t1",
  },
  {
    id: "n2",
    type: "overdue",
    read: false,
    time: "5 hours ago",
    title: "Bill is now overdue",
    body: "Paolo Ramirez · Room 104 · May 2026 — ₱6,500.00 unpaid.",
    actor: "t4",
  },
  {
    id: "n3",
    type: "overdue",
    read: false,
    time: "5 hours ago",
    title: "Bill is now overdue",
    body: "Carlos Bautista · Room 203 · May 2026 — ₱7,500.00 unpaid.",
    actor: "t8",
  },
  {
    id: "n4",
    type: "payment",
    read: true,
    time: "Yesterday",
    title: "Partial payment recorded",
    body: "Andrea Dela Cruz paid ₱3,500.00 via Maya. ₱3,500.00 remaining.",
    actor: "t3",
  },
  {
    id: "n5",
    type: "lease",
    read: true,
    time: "Yesterday",
    title: "Lease renewal due soon",
    body: "Mike Tan · Room 201 lease ends in 14 days.",
    actor: "t6",
  },
  {
    id: "n6",
    type: "system",
    read: true,
    time: "2 days ago",
    title: "Bills generated for May 2026",
    body: "22 bills generated. ₱261,500.00 total expected.",
    actor: null,
  },
  {
    id: "n7",
    type: "payment",
    read: true,
    time: "3 days ago",
    title: "Payment received",
    body: "Trisha Bernardo paid ₱4,500.00 in Cash for May 2026.",
    actor: "t17",
  },
  {
    id: "n8",
    type: "maintenance",
    read: true,
    time: "5 days ago",
    title: "Room marked as maintenance",
    body: "Room 206 at Mabini Boarding House.",
    actor: null,
  },
]

// ── Derived: dashboard stats ───────────────────────────────────
export type DashboardStats = {
  expected: number
  collected: number
  overdue: number
  occupancy: number
  occupiedRooms: number
  totalRooms: number
}

export function getDashboardStats(): DashboardStats {
  const currentBills = BILLS.filter((b) => b.period === "2026-05")
  const expected = currentBills.reduce((s, b) => s + b.amount, 0)
  const collected = currentBills.reduce((s, b) => s + b.paid, 0)
  const overdue = currentBills
    .filter((b) => b.status === "overdue")
    .reduce((s, b) => s + b.balance, 0)
  const occupied = ROOMS.filter((r) => r.status === "occupied").length
  const total = ROOMS.length
  return {
    expected,
    collected,
    overdue,
    occupancy: Math.round((occupied / total) * 100),
    occupiedRooms: occupied,
    totalRooms: total,
  }
}

// ── Derived: tenant portal context ─────────────────────────────
export type TenantContext = {
  tenant: Tenant
  property: Property
  bills: Bill[]
  current: Bill
  past: Bill[]
  payments: Payment[]
}

export function getTenantContext(tenantId: string): TenantContext {
  const tenant = tenantOf(tenantId)!
  const property = PROPERTIES.find((p) => p.id === tenant.property)!
  const bills = BILLS.filter((b) => b.tenant === tenantId)
  const current =
    bills.find((b) => b.period === "2026-05") ?? bills[bills.length - 1]!
  const past = bills.filter((b) => b.id !== current.id)
  const payments = PAYMENTS.filter((p) => p.tenant === tenantId).sort((a, b) =>
    b.date.localeCompare(a.date)
  )
  return { tenant, property, bills, current, past, payments }
}
