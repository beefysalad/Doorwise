"use client"

import { useAuth } from "@clerk/nextjs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CurrentUserResponse, SignupRole } from "@workspace/shared"

import { setIntendedRole } from "@/lib/api/users"

function useSetIntendedRole() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (role: SignupRole) => {
      const token = await getToken()
      if (!token) throw new Error("Missing Clerk token")
      return setIntendedRole(token, role)
    },
    onSuccess: (user: CurrentUserResponse) => {
      queryClient.setQueryData(["users", "me", "sync"], user)
    },
  })
}

export { useSetIntendedRole }
