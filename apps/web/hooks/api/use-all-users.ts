"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import { getAllUsers } from "@/lib/api/users"

function useAllUsers() {
  const { getToken, isSignedIn, isLoaded } = useAuth()

  return useQuery({
    queryKey: ["users", "all"],
    enabled: isLoaded && Boolean(isSignedIn),
    queryFn: async () => {
      const token = await getToken()

      if (!token) {
        throw new Error("Missing Clerk token")
      }

      return getAllUsers(token)
    },
  })
}

export { useAllUsers }
