const ACTIVE_ORG_HEADER = "X-Active-Org"

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  }
}

function tenantHeaders(
  token: string,
  organizationId: string
): Record<string, string> {
  return {
    ...authHeaders(token),
    [ACTIVE_ORG_HEADER]: organizationId,
  }
}

export { ACTIVE_ORG_HEADER, authHeaders, tenantHeaders }
