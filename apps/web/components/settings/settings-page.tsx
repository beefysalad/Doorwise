"use client"

import { useState } from "react"
import {
  RiLockPasswordLine,
  RiMailLine,
  RiNotification3Line,
  RiShieldCheckLine,
  RiShieldUserLine,
  RiUser3Line,
  RiVerifiedBadgeLine,
} from "@remixicon/react"

import { useDashboardUser } from "@/components/dashboard/dashboard-user-provider"
import { OwnerPage } from "@/components/doorwise/page-header"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import { Switch } from "@workspace/ui/components/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

function SettingsPage() {
  const user = useDashboardUser()
  const initials = getInitials(user.name, user.email)
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(true)
  const [productUpdatesEnabled, setProductUpdatesEnabled] = useState(true)
  const [securityAlertsEnabled, setSecurityAlertsEnabled] = useState(true)
  const [sessionReviewEnabled, setSessionReviewEnabled] = useState(false)

  return (
    <OwnerPage title="Settings" sub="Modify your Doorwise account settings">
      <Tabs defaultValue="profile" className="gap-5">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto"
        >
          <TabsTrigger value="profile">
            <RiUser3Line />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <RiNotification3Line />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <RiShieldCheckLine />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="profile"
          className="grid gap-4 xl:grid-cols-[1fr_360px]"
        >
          <div className="space-y-4">
            <Card className="overflow-hidden rounded-xl shadow-sm">
              <div className="border-b bg-muted px-6 py-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Avatar
                    className="size-20 border-4 border-background shadow-sm"
                    size="lg"
                  >
                    {user.imageUrl ? (
                      <AvatarImage alt={user.name} src={user.imageUrl} />
                    ) : null}
                    <AvatarFallback className="text-2xl font-semibold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-2xl font-semibold tracking-tight">
                        {user.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        <RiVerifiedBadgeLine className="size-3.5 text-primary" />
                        Clerk synced
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle>Personal details</CardTitle>
                <CardDescription>
                  Profile data is managed through your authenticated Doorwise
                  account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="settings-name">
                      Display name
                    </FieldLabel>
                    <Input
                      id="settings-name"
                      defaultValue={user.name}
                      disabled
                      className="rounded-md"
                    />
                    <FieldDescription>
                      This comes from your Clerk profile.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="settings-email">
                      Email address
                    </FieldLabel>
                    <Input
                      id="settings-email"
                      defaultValue={user.email}
                      type="email"
                      disabled
                      className="rounded-md"
                    />
                    <FieldDescription>
                      Used for invites, login, and account notifications.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Account status</CardTitle>
                <CardDescription>
                  Identity and access state for this session.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <AccountStatusRow
                  icon={RiShieldUserLine}
                  label="Access"
                  value="Owner account"
                />
                <AccountStatusRow
                  icon={RiMailLine}
                  label="Email"
                  value="Verified by Clerk"
                />
                <AccountStatusRow
                  icon={RiShieldCheckLine}
                  label="Security"
                  value="Session active"
                />
              </CardContent>
            </Card>

            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Managed sign-in</CardTitle>
                <CardDescription>
                  Passwords, sessions, and connected login methods stay in
                  Clerk.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use the account menu in the sidebar footer to manage your
                  profile photo, password, and active sessions.
                </p>
              </CardContent>
            </Card>
          </aside>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Email preferences for Doorwise activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <SettingSwitch
                  checked={weeklyDigestEnabled}
                  description="A compact summary of organization activity and sync status."
                  icon={RiMailLine}
                  label="Weekly digest"
                  onCheckedChange={setWeeklyDigestEnabled}
                />
                <Separator />
                <SettingSwitch
                  checked={productUpdatesEnabled}
                  description="New features, UI updates, and platform changes."
                  icon={RiNotification3Line}
                  label="Product updates"
                  onCheckedChange={setProductUpdatesEnabled}
                />
                <Separator />
                <SettingSwitch
                  checked={securityAlertsEnabled}
                  description="Sign-in, session, and integration security events."
                  icon={RiShieldCheckLine}
                  label="Security alerts"
                  onCheckedChange={setSecurityAlertsEnabled}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Session controls for the authenticated account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <SettingSwitch
                  checked={sessionReviewEnabled}
                  description="Require a fresh sign-in before sensitive organization changes."
                  icon={RiLockPasswordLine}
                  label="Sensitive action review"
                  onCheckedChange={setSessionReviewEnabled}
                />
                <Separator />
                <div className="flex flex-col gap-3 rounded-lg border bg-muted p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active sessions</p>
                    <p className="text-sm text-muted-foreground">
                      Manage sessions from the account menu.
                    </p>
                  </div>
                  <Button variant="outline">Open account</Button>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </OwnerPage>
  )
}

function AccountStatusRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-muted px-3.5 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background text-primary">
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0">
        <div className="text-[12px] text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
    </div>
  )
}

function getInitials(name: string, email: string) {
  const nameInitials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  if (nameInitials) {
    return nameInitials
  }

  return email[0]?.toUpperCase() ?? "N"
}

function SettingSwitch({
  checked,
  description,
  icon: Icon,
  label,
  onCheckedChange,
}: {
  checked: boolean
  description: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <Field
      orientation="horizontal"
      className="items-start justify-between gap-4"
    >
      <FieldContent className="flex-row items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5 text-primary" />
        </span>
        <span className="space-y-1">
          <FieldTitle>{label}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </span>
      </FieldContent>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </Field>
  )
}

export { SettingsPage }
