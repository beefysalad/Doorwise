import { useQuery } from "@tanstack/react-query"

import { getApiHealth } from "@/lib/api/health"

function useApiHealth() {
  return useQuery({
    queryKey: ["api-health"],
    queryFn: getApiHealth,
  })
}

export { useApiHealth }
