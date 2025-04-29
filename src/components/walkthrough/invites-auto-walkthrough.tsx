"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useWalkthrough } from "./walkthrough-context"
import { invitesWalkthroughSteps } from "./invites-walkthrough-steps"

export function InvitesAutoWalkthrough() {
  const pathname = usePathname()
  const { startWalkthrough, hasSeenWalkthrough } = useWalkthrough()
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    // Only run once
    if (hasInitialized) return
    setHasInitialized(true)

    // Check if we're on the invites page
    if (pathname === "/admin/invites") {
      console.log("On invites page, checking if walkthrough should start")

      // Check if user has seen the walkthrough before
      if (!hasSeenWalkthrough) {
        console.log("User has not seen walkthrough, starting automatically")

        // Start the walkthrough after a short delay to ensure page is fully loaded
        const timer = setTimeout(() => {
          if (invitesWalkthroughSteps && invitesWalkthroughSteps.length > 0) {
            startWalkthrough(invitesWalkthroughSteps)
          }
        }, 1000)

        return () => clearTimeout(timer)
      }
    }
  }, [pathname, startWalkthrough, hasSeenWalkthrough, hasInitialized])

  // This component doesn't render anything
  return null
}
