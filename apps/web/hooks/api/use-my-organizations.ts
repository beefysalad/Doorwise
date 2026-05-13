"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import { getMyOrganizations } from "@/lib/api/organizations"

function useMyOrganizations() {
  const { getToken, isSignedIn, isLoaded } = useAuth()

  return useQuery({
    queryKey: ["organizations", "me"],
    enabled: isLoaded && Boolean(isSignedIn),
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error("Missing Clerk token")
      return getMyOrganizations(token)
    },
  })
}

export { useMyOrganizations }
