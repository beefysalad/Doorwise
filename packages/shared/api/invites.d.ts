import type { OrganizationMembership, OrgRole } from "./organizations"

export type CreateInviteRequest = {
  email: string
  role: Exclude<OrgRole, "owner">
}

export type CreateInviteResponse = {
  id: string
  email: string
  role: OrgRole
  expiresAt: string
  inviteUrl: string
}

export type AcceptInviteResponse = OrganizationMembership
