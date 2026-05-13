import type { ReactNode } from "react"

export default function ProtectedTemplate({
  children,
}: {
  children: ReactNode
}) {
  return <div className="min-w-0 overflow-x-hidden">{children}</div>
}
