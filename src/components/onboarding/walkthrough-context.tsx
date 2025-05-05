"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface WalkthroughStep {
  target: string
  title: string
  content: string
  placement?: "top" | "right" | "bottom" | "left" | "center"
  disableOverlay?: boolean
}

interface WalkthroughContextType {
  isOpen: boolean
  steps: WalkthroughStep[]
  currentStep: WalkthroughStep | null
  currentStepIndex: number
  startWalkthrough: (steps: WalkthroughStep[]) => void
  nextStep: () => void
  prevStep: () => void
  closeWalkthrough: () => void
  hasSeenWalkthrough: boolean
  setHasSeenWalkthrough: (value: boolean) => void
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined)

export function WalkthroughProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [steps, setSteps] = useState<WalkthroughStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(false)

  const startWalkthrough = (newSteps: WalkthroughStep[]) => {
    console.log("Starting walkthrough with steps:", newSteps)
    setSteps(newSteps)
    setCurrentStepIndex(0)
    setIsOpen(true)
  }

  const nextStep = () => {
    console.log("Moving to next step")
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      closeWalkthrough()
    }
  }

  const prevStep = () => {
    console.log("Moving to previous step")
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const closeWalkthrough = () => {
    console.log("Closing walkthrough")
    setIsOpen(false)
  }

  const currentStep = isOpen && steps.length > 0 ? steps[currentStepIndex] : null

  return (
    <WalkthroughContext.Provider
      value={{
        isOpen,
        steps,
        currentStep,
        currentStepIndex,
        startWalkthrough,
        nextStep,
        prevStep,
        closeWalkthrough,
        hasSeenWalkthrough,
        setHasSeenWalkthrough,
      }}
    >
      {children}
    </WalkthroughContext.Provider>
  )
}

export function useWalkthrough() {
  const context = useContext(WalkthroughContext)
  if (context === undefined) {
    throw new Error("useWalkthrough must be used within a WalkthroughProvider")
  }
  return context
}
