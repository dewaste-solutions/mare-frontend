"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useWalkthrough } from "./walkthrough-context"
import Image from "next/image"

const welcomeSteps = [
  {
    target: "#dashboard-stats",
    title: "Welcome to MARE!",
    content: "Let's take a quick tour of the admin dashboard to help you get started.",
    placement: "bottom",
  },
  {
    target: "#sidebar-nav",
    title: "Navigation Menu",
    content: "Use this menu to navigate between different sections of the admin panel.",
    placement: "right",
  },
  {
    target: "#user-profile",
    title: "Your Profile",
    content: "Access your profile settings and logout from here.",
    placement: "bottom",
  },
  {
    target: "#notifications",
    title: "Notifications",
    content: "View system notifications and alerts here.",
    placement: "bottom",
  },
  {
    target: "#dashboard-stats",
    title: "Dashboard Overview",
    content: "This section shows key metrics and statistics about waste collection activities.",
    placement: "bottom",
  },
]

export function WelcomeWalkthrough() {
  const [isOpen, setIsOpen] = useState(false)
  const { startWalkthrough } = useWalkthrough()

  // Check if this is the first visit (in a real app, this would check user preferences in a database)
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      setIsOpen(true)
    }
  }, [])

  const handleStartTour = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenWelcome", "true")
    startWalkthrough(welcomeSteps)
  }

  const handleSkip = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenWelcome", "true")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#038167]">Welcome to MARE!</DialogTitle>
          <DialogDescription>Your waste management solution for a cleaner community</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-4">
          <div className="relative h-[200px] w-[300px] overflow-hidden rounded-lg">
            <Image src="/waste-management-overview.png" alt="MARE Dashboard" fill className="object-cover" />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <p>
            Thank you for choosing MARE for your waste management needs. Would you like to take a quick tour to learn
            how to use the system?
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button onClick={handleStartTour}>Start the tour</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
