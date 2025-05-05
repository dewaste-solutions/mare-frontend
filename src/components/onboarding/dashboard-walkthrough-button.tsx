"use client"

import { Button, ButtonProps } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { useWalkthrough } from "./walkthrough-context"
import { dashboardWalkthroughSteps } from "./dashboard-walkthrough-steps"
import { useAuth } from "@/contexts/auth-context"

// Define the correct placement type to match WalkthroughStep
type WalkthroughStepPlacement = "bottom" | "right" | "top" | "left" | "center" | undefined

// Define the proper WalkthroughStep type
export interface WalkthroughStep {
  target: string
  content: string
  title: string
  placement: WalkthroughStepPlacement
}

// Accept ButtonProps to allow overriding default button properties
export function DashboardWalkthroughButton(props: ButtonProps) {
  const { startWalkthrough } = useWalkthrough()
  const { user } = useAuth()

  if (!user) return null

  const handleStartWalkthrough = () => {
    // Get common steps for all roles
    const commonSteps = dashboardWalkthroughSteps.common || []

    // Get role-specific steps
    const roleSteps = dashboardWalkthroughSteps[user.role as keyof typeof dashboardWalkthroughSteps] || []

    // Combine steps and ensure the placement is of the correct type
    const combinedSteps = [...commonSteps, ...roleSteps].map(step => ({
      ...step,
      // Ensure placement is one of the allowed values, default to "bottom" if not
      placement: ["bottom", "right", "top", "left", "center"].includes(step.placement) 
        ? step.placement as WalkthroughStepPlacement 
        : "bottom"
    }))

    if (combinedSteps.length > 0) {
      startWalkthrough(combinedSteps)
    }
  }

  // Default props that can be overridden
  const defaultProps: ButtonProps = {
    variant: "ghost",
    size: "sm",
    className: "flex items-center gap-1 text-sm"
  }

  // Merge props, with passed props taking precedence over defaults
  const mergedProps = { ...defaultProps, ...props, onClick: handleStartWalkthrough }

  return (
    <Button {...mergedProps}>
      <HelpCircle className="h-4 w-4" />
      <span>Dashboard Tour</span>
    </Button>
  )
}