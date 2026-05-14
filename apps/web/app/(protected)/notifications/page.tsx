import { OwnerPage } from "@/components/doorwise/page-header"
import { OwnerNotifications } from "@/components/owner/screens/owner-notifications"
import { NOTIFICATIONS } from "@/lib/mock/doorwise"

export default function NotificationsPage() {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length
  return (
    <OwnerPage title="Notifications" sub={`${unread} unread`}>
      <OwnerNotifications />
    </OwnerPage>
  )
}
