export type OrgRole = "owner" | "staff" | "tenant"

export type Organization = {
  id: string
  name: string
  slug: string
  address: string | null
  phone: string | null
  logoUrl: string | null
  createdAt: string
}

export type OrganizationMembership = {
  id: string
  role: OrgRole
  joinedAt: string
  organization: Organization
}

export type CreateOrganizationRequest = {
  name: string
  slug?: string
  address?: string
  phone?: string
}

export type CreateOrganizationResponse = OrganizationMembership

export type GetMyOrganizationsResponse = {
  memberships: OrganizationMembership[]
}

export type UpdateCurrentOrganizationRequest = {
  name?: string
  address?: string | null
  phone?: string | null
  logoUrl?: string | null
}

export type UpdateCurrentOrganizationResponse = Organization
