"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface WalkthroughStep {
  target: string
  title: string
  content: string
  placement?: string
  disableOverlay?: boolean
}

interface WalkthroughContextType {
  steps: WalkthroughStep[]
  currentStepIndex: number
  isOpen: boolean
  hasSeenWalkthrough: boolean
  currentStep: WalkthroughStep | null
  startWalkthrough: (steps: WalkthroughStep[]) => void
  nextStep: () => void
  prevStep: () => void
  closeWalkthrough: () => void
  setHasSeenWalkthrough: (value: boolean) => void
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined)

export function WalkthroughProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState<WalkthroughStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [hasSeenWalkthrough, setHasSeenWalkthrough] = useState(false)

  const startWalkthrough = useCallback(
    (newSteps: WalkthroughStep[]) => {
      // Only start if not already open
      if (isOpen) return

      setSteps(newSteps)
      setCurrentStepIndex(0)
      setIsOpen(true)
    },
    [isOpen],
  )

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      setIsOpen(false)
    }
  }, [currentStepIndex, steps.length])

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }, [currentStepIndex])

  const closeWalkthrough = useCallback(() => {
    setIsOpen(false)
  }, [])

  const currentStep = steps[currentStepIndex] || null

  return (
    <WalkthroughContext.Provider
      value={{
        steps,
        currentStepIndex,
        isOpen,
        hasSeenWalkthrough,
        currentStep,
        startWalkthrough,
        nextStep,
        prevStep,
        closeWalkthrough,
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
