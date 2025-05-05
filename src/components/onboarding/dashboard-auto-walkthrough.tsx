"use client"

import { useEffect, useState } from "react"
import { useWalkthrough } from "./walkthrough-context"
import { useAuth } from "@/contexts/auth-context"

export function DashboardAutoWalkthrough() {
  const { startWalkthrough } = useWalkthrough()
  const { user } = useAuth()
  const [hasTriggeredWalkthrough, setHasTriggeredWalkthrough] = useState(false)

  useEffect(() => {
    if (!user || hasTriggeredWalkthrough) return

    // Define walkthrough steps with specific selectors
    const steps = [
      {
        target: "#dashboard-header",
        title: "Welcome to Your Dashboard",
        content: "This is your personalized dashboard where you can manage all your waste management activities.",
        placement: "bottom",
      },
      {
        target: "#sidebar-nav",
        title: "Navigation Menu",
        content: "Use this menu to navigate to different sections of the application.",
        placement: "right",
      },
      {
        target: ".user-profile-dropdown",
        title: "Your Profile",
        content: "Access your profile settings, preferences, and account information here.",
        placement: "bottom",
      },
    ]

    // Add role-specific steps
    if (user.role === "admin") {
      steps.push(
        {
          target: "#dashboard-stats",
          title: "Key Metrics",
          content: "These cards show the key performance metrics for your waste management operations.",
          placement: "top",
        },
        {
          target: "#recent-activities",
          title: "Recent Activities",
          content: "Track the latest activities and updates in the system.",
          placement: "left",
        },
      )
    } else if (user.role === "franchisee") {
      steps.push(
        {
          target: "#franchisee-stats",
          title: "Your Business Metrics",
          content: "These cards show key metrics for your franchisee business.",
          placement: "top",
        },
        {
          target: "#collection-schedule",
          title: "Collection Schedule",
          content: "View and manage your upcoming collection schedules here.",
          placement: "left",
        },
      )
    }

    // Start the walkthrough with a delay
    const timer = setTimeout(() => {
      console.log("Starting dashboard walkthrough")
      startWalkthrough(steps)
      setHasTriggeredWalkthrough(true)

      // Store in localStorage that user has seen the walkthrough
      localStorage.setItem(`dashboard-walkthrough-seen-${user.role}`, "true")
    }, 1000)

    return () => clearTimeout(timer)
  }, [user, hasTriggeredWalkthrough, startWalkthrough])

  return null
}
