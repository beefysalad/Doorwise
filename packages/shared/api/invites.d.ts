import type { OrgRole, Organization } from "./organizations"

export type CreateInviteRequest = {
  email: string
  role: Exclude<OrgRole, "owner">
  tenantProfileId?: string
}

export type CreateInviteResponse = {
  id: string
  email: string
  role: OrgRole
  expiresAt: string
  inviteUrl: string
}

export type AcceptInviteResponse = {
  organization: Organization
  role: OrgRole
}
