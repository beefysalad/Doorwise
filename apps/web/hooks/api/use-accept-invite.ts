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
    onSuccess: (newMembership: AcceptInviteResponse) => {
      queryClient.setQueryData<GetMyOrganizationsResponse>(
        ["organizations", "me"],
        (prev) => {
          const memberships = prev?.memberships ?? []
          if (memberships.some((m) => m.id === newMembership.id)) {
            return { memberships }
          }
          return {
            memberships: [...memberships, newMembership],
          }
        }
      )
      void queryClient.invalidateQueries({ queryKey: ["organizations", "me"] })
    },
  })
}

export { useAcceptInvite }
