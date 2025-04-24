"use client"

import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWalkthrough } from "./walkthrough-context"
import { invitesWalkthroughSteps } from "./invites-walkthrough-steps"
import { useToast } from "@/components/ui/use-toast"
import { usePathname } from "next/navigation"

interface WalkthroughButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function WalkthroughButton({ className, variant = "outline" }: WalkthroughButtonProps) {
  const { startWalkthrough } = useWalkthrough()
  const { toast } = useToast()
  const pathname = usePathname()

  const handleStartWalkthrough = () => {
    console.log("Starting walkthrough for path:", pathname)

    // Determine which walkthrough steps to use based on the current path
    let steps = null

    if (pathname.includes("/admin/invites")) {
      steps = invitesWalkthroughSteps
      console.log("Using invites walkthrough steps")
    }
    // Add more path checks for other pages as needed

    // If steps are found, start the walkthrough
    if (steps && steps.length > 0) {
      startWalkthrough(steps)
      console.log("Walkthrough started with steps:", steps)
    } else {
      console.error("No walkthrough steps found for current page:", pathname)
      toast({
        title: "Walkthrough Not Available",
        description: "No walkthrough is available for this page yet.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant={variant} onClick={handleStartWalkthrough} className={`flex items-center gap-2 ${className || ""}`}>
      <HelpCircle className="h-4 w-4" />
      <span>Help</span>
    </Button>
  )
}
