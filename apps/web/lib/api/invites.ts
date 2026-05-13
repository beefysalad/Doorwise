import type {
  AcceptInviteResponse,
  CreateInviteRequest,
  CreateInviteResponse,
} from "@workspace/shared"

import { apiClient } from "@/lib/axios"
import { authHeaders, tenantHeaders } from "@/lib/api/request"

async function createInvite(
  token: string,
  organizationId: string,
  payload: CreateInviteRequest
): Promise<CreateInviteResponse> {
  const response = await apiClient.post<CreateInviteResponse>(
    "/organizations/current/invites",
    payload,
    {
      headers: tenantHeaders(token, organizationId),
    }
  )
  return response.data
}

async function acceptInvite(
  token: string,
  inviteToken: string
): Promise<AcceptInviteResponse> {
  const response = await apiClient.post<AcceptInviteResponse>(
    `/invites/${encodeURIComponent(inviteToken)}/accept`,
    undefined,
    { headers: authHeaders(token) }
  )
  return response.data
}

export { acceptInvite, createInvite }
