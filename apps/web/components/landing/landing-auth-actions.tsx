"use client"

import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"

import { Button } from "@workspace/ui/components/button"

function LandingHeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
          <Button>Sign Up</Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Button asChild>
          <Link href="/dashboard">Open workspace</Link>
        </Button>
      </Show>
    </div>
  )
}

function LandingHeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Show when="signed-out">
        <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
          <Button size="lg" className="h-12 rounded-2xl px-6">
            Start managing rentals
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Button asChild size="lg" className="h-12 rounded-2xl px-6">
          <Link href="/dashboard">Start managing rentals</Link>
        </Button>
      </Show>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="h-12 rounded-2xl px-6"
      >
        <Link href="#workflow">See how it works</Link>
      </Button>
    </div>
  )
}

function LandingFinalAction() {
  return (
    <>
      <Show when="signed-out">
        <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
          <Button size="lg" variant="secondary" className="rounded-2xl">
            Open Doorwise
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Button asChild size="lg" variant="secondary" className="rounded-2xl">
          <Link href="/dashboard">Open Doorwise</Link>
        </Button>
      </Show>
    </>
  )
}

export { LandingFinalAction, LandingHeaderActions, LandingHeroActions }
