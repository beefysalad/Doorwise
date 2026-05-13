import { auth } from "@clerk/nextjs/server"

import { InviteAcceptCard } from "@/components/invite/invite-accept-card"

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  await auth.protect()
  const { token } = await params
  return <InviteAcceptCard token={token} />
}
