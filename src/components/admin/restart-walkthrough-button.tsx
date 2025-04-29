"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { useWalkthrough } from "@/components/walkthrough/walkthrough-context"
import { walkthroughSteps } from "@/components/walkthrough/walkthrough-steps"
import { usePathname } from "next/navigation"

export function RestartWalkthroughButton() {
  const { startWalkthrough } = useWalkthrough()
  const pathname = usePathname()

  const handleRestartWalkthrough = () => {
    const steps = walkthroughSteps[pathname as keyof typeof walkthroughSteps]
    if (steps) {
      startWalkthrough(steps)
    }
  }

  // Only show on admin pages that have walkthrough steps
  if (!pathname || !pathname.startsWith("/admin") || !walkthroughSteps[pathname as keyof typeof walkthroughSteps]) {
    return null
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleRestartWalkthrough} className="text-gray-500 hover:text-gray-700">
      <HelpCircle className="h-5 w-5 mr-1" />
      <span className="hidden md:inline">Help</span>
    </Button>
  )
}
