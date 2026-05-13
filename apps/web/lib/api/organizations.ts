import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetMyOrganizationsResponse,
  UpdateCurrentOrganizationRequest,
  UpdateCurrentOrganizationResponse,
} from "@workspace/shared"

import { apiClient } from "@/lib/axios"
import { authHeaders, tenantHeaders } from "@/lib/api/request"

async function createOrganization(
  token: string,
  payload: CreateOrganizationRequest
): Promise<CreateOrganizationResponse> {
  const response = await apiClient.post<CreateOrganizationResponse>(
    "/organizations",
    payload,
    { headers: authHeaders(token) }
  )
  return response.data
}

async function getMyOrganizations(
  token: string
): Promise<GetMyOrganizationsResponse> {
  const response = await apiClient.get<GetMyOrganizationsResponse>(
    "/organizations/me",
    { headers: authHeaders(token) }
  )
  return response.data
}

async function updateCurrentOrganization(
  token: string,
  organizationId: string,
  payload: UpdateCurrentOrganizationRequest
): Promise<UpdateCurrentOrganizationResponse> {
  const response = await apiClient.patch<UpdateCurrentOrganizationResponse>(
    "/organizations/current",
    payload,
    { headers: tenantHeaders(token, organizationId) }
  )
  return response.data
}

export { createOrganization, getMyOrganizations, updateCurrentOrganization }
