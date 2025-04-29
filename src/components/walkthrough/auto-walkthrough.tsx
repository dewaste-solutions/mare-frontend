"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useWalkthrough } from "./walkthrough-context"
import { walkthroughSteps } from "./walkthrough-steps"

export function AutoWalkthrough() {
  const pathname = usePathname()
  const { startWalkthrough, hasSeenWalkthrough, setHasSeenWalkthrough } = useWalkthrough()

  useEffect(() => {
    // Only run on admin pages
    if (!pathname?.startsWith("/admin")) {
      return
    }

    // Check if user has already seen the walkthrough
    const hasSeenWalkthroughBefore = localStorage.getItem("adminWalkthroughSeen") === "true"

    if (hasSeenWalkthroughBefore || hasSeenWalkthrough) {
      return
    }

    // Normalize the path to match our walkthrough steps keys
    const normalizedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname

    // Find the matching walkthrough steps for the current path
    const steps = walkthroughSteps[normalizedPath as keyof typeof walkthroughSteps]

    if (steps) {
      // Start the walkthrough with a slight delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        startWalkthrough(steps)
        // Mark as seen
        localStorage.setItem("adminWalkthroughSeen", "true")
        setHasSeenWalkthrough(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [pathname, startWalkthrough, hasSeenWalkthrough, setHasSeenWalkthrough])

  return null
}
