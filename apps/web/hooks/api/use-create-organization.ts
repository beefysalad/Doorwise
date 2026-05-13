"use client"

import { useAuth } from "@clerk/nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type {
  CreateOrganizationRequest,
  GetMyOrganizationsResponse,
  OrganizationMembership,
} from "@workspace/shared"

import { createOrganization } from "@/lib/api/organizations"

function useCreateOrganization() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateOrganizationRequest) => {
      const token = await getToken()
      if (!token) throw new Error("Missing Clerk token")
      return createOrganization(token, payload)
    },
    onSuccess: (membership: OrganizationMembership) => {
      queryClient.setQueryData<GetMyOrganizationsResponse>(
        ["organizations", "me"],
        (prev) => ({
          memberships: [...(prev?.memberships ?? []), membership],
        })
      )
    },
  })
}

export { useCreateOrganization }
