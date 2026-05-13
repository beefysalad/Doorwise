"use client"

import { useAuth } from "@clerk/nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type {
  AcceptInviteResponse,
  GetMyOrganizationsResponse,
} from "@workspace/shared"

import { acceptInvite } from "@/lib/api/invites"

function useAcceptInvite() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (inviteToken: string) => {
      const token = await getToken()
      if (!token) throw new Error("Missing Clerk token")
      return acceptInvite(token, inviteToken)
    },
    onSuccess: (result: AcceptInviteResponse) => {
      queryClient.setQueryData<GetMyOrganizationsResponse>(
        ["organizations", "me"],
        (prev) => {
          const next = prev?.memberships ?? []
          if (next.some((m) => m.organization.id === result.organization.id)) {
            return { memberships: next }
          }
          return {
            memberships: [
              ...next,
              {
                id: result.organization.id,
                role: result.role,
                joinedAt: new Date().toISOString(),
                organization: result.organization,
              },
            ],
          }
        }
      )
      void queryClient.invalidateQueries({ queryKey: ["organizations", "me"] })
    },
  })
}

export { useAcceptInvite }
