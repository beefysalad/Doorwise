import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is required. Set it in apps/web/.env.local (dev) or in your deployment environment (prod)."
  )
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export { apiClient, API_BASE_URL }
