import { auth } from "@clerk/nextjs/server"

import { OnboardingShell } from "@/components/onboarding/onboarding-shell"

export default async function OnboardingPage() {
  await auth.protect()
  return <OnboardingShell />
}
