"use client"

import type { ComponentProps, ReactNode } from "react"
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

type ButtonProps = ComponentProps<typeof Button>

/** Clerk-wired CTA: opens sign-up when signed out, links to /dashboard when in. */
function LandingSignUpAction({
  children,
  ...buttonProps
}: { children: ReactNode } & ButtonProps) {
  return (
    <>
      <Show when="signed-out">
        <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding">
          <Button {...buttonProps}>{children}</Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Button {...buttonProps} asChild>
          <Link href="/dashboard">{children}</Link>
        </Button>
      </Show>
    </>
  )
}

/** Nav header — Sign in (ghost) + Get started (primary). */
function LandingHeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <Show when="signed-out">
        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-md sm:inline-flex"
          >
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal" fallbackRedirectUrl="/onboarding">
          <Button size="sm" className="rounded-md">
            Get started
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Button asChild size="sm" className="rounded-md">
          <Link href="/dashboard">Open Doorwise</Link>
        </Button>
      </Show>
    </div>
  )
}

export { LandingHeaderActions, LandingSignUpAction }
