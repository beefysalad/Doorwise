import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  GetMyOrganizationsResponse,
  UpdateCurrentOrganizationRequest,
  UpdateCurrentOrganizationResponse,
} from "@workspace/shared"

import { apiClient } from "@/lib/axios"

function authHeader(token: string, organizationId?: string | null) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  }
  if (organizationId) {
    headers["X-Active-Org"] = organizationId
  }
  return headers
}

async function createOrganization(
  token: string,
  payload: CreateOrganizationRequest
): Promise<CreateOrganizationResponse> {
  const response = await apiClient.post<CreateOrganizationResponse>(
    "/organizations",
    payload,
    { headers: authHeader(token) }
  )
  return response.data
}

async function getMyOrganizations(
  token: string
): Promise<GetMyOrganizationsResponse> {
  const response = await apiClient.get<GetMyOrganizationsResponse>(
    "/organizations/me",
    { headers: authHeader(token) }
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
    { headers: authHeader(token, organizationId) }
  )
  return response.data
}

export { createOrganization, getMyOrganizations, updateCurrentOrganization }
