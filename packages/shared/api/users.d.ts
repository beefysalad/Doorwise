export type SignupRole = "owner" | "tenant"

export type CurrentUserResponse = {
  id: string
  clerkId: string
  email: string
  name: string
  imageUrl: string | null
  intendedRole: SignupRole | null
}

export type User = {
  id: string
  clerkId: string
  name: string
  email: string
  imageUrl: string | null
}

export type GetAllUsersResponse = {
  users: User[]
}

export type SetIntendedRoleRequest = {
  role: SignupRole
}

export type SetIntendedRoleResponse = CurrentUserResponse
