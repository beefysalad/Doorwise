import type {
  CurrentUserResponse,
  GetAllUsersResponse,
  SetIntendedRoleResponse,
  SignupRole,
} from "@workspace/shared"

import { apiClient } from "@/lib/axios"
import { authHeaders } from "@/lib/api/request"

async function syncCurrentUser(token: string): Promise<CurrentUserResponse> {
  const response = await apiClient.post<CurrentUserResponse>(
    "/users/me/sync",
    undefined,
    {
      headers: authHeaders(token),
    }
  )

  return response.data
}

async function getAllUsers(token: string): Promise<GetAllUsersResponse> {
  const response = await apiClient.get<GetAllUsersResponse>("/users/all", {
    headers: authHeaders(token),
  })

  return response.data
}

async function setIntendedRole(
  token: string,
  role: SignupRole
): Promise<SetIntendedRoleResponse> {
  const response = await apiClient.patch<SetIntendedRoleResponse>(
    "/users/me/role",
    { role },
    { headers: authHeaders(token) }
  )

  return response.data
}

export { getAllUsers, setIntendedRole, syncCurrentUser }
export type { CurrentUserResponse, GetAllUsersResponse }
