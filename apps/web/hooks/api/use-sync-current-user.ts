"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import { syncCurrentUser } from "@/lib/api/users"

function useSyncCurrentUser() {
  const { getToken, isSignedIn, isLoaded } = useAuth()

  return useQuery({
    queryKey: ["users", "me", "sync"],
    enabled: isLoaded && Boolean(isSignedIn),
    queryFn: async () => {
      const token = await getToken()

      if (!token) {
        throw new Error("Missing Clerk token")
      }

      return syncCurrentUser(token)
    },
  })
}

export { useSyncCurrentUser }
