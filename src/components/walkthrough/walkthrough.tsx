"use client"

import { useEffect, useState } from "react"
import { useWalkthrough } from "./walkthrough-context"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function Walkthrough() {
  const { isOpen, currentStep, nextStep, prevStep, closeWalkthrough, currentStepIndex, steps } = useWalkthrough()
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const [tooltipPlacement, setTooltipPlacement] = useState<string>("bottom")

  // Find the target element and calculate tooltip position
  useEffect(() => {
    if (!isOpen || !currentStep) return

    // Find the target element
    const target = document.querySelector(currentStep.target) as HTMLElement
    setTargetElement(target)

    if (!target) return

    // Calculate tooltip position
    const targetRect = target.getBoundingClientRect()
    const placement = currentStep.placement || "bottom"
    setTooltipPlacement(placement)

    let top = 0
    let left = 0

    switch (placement) {
      case "top":
        top = targetRect.top - 10
        left = targetRect.left + targetRect.width / 2
        break
      case "bottom":
        top = targetRect.bottom + 10
        left = targetRect.left + targetRect.width / 2
        break
      case "left":
        top = targetRect.top + targetRect.height / 2
        left = targetRect.left - 10
        break
      case "right":
        top = targetRect.top + targetRect.height / 2
        left = targetRect.right + 10
        break
      default:
        top = targetRect.bottom + 10
        left = targetRect.left + targetRect.width / 2
    }

    setTooltipPosition({ top, left })

    // Add highlight to target element
    target.classList.add("walkthrough-highlight")

    return () => {
      // Remove highlight when component unmounts or step changes
      target.classList.remove("walkthrough-highlight")
    }
  }, [isOpen, currentStep, currentStepIndex])

  if (!isOpen || !currentStep || !targetElement) return null

  // Calculate tooltip class based on placement
  const getTooltipClass = () => {
    switch (tooltipPlacement) {
      case "top":
        return "transform -translate-x-1/2 -translate-y-full"
      case "bottom":
        return "transform -translate-x-1/2"
      case "left":
        return "transform -translate-y-1/2 -translate-x-full"
      case "right":
        return "transform -translate-y-1/2"
      default:
        return "transform -translate-x-1/2"
    }
  }

  // Calculate arrow class based on placement
  const getArrowClass = () => {
    switch (tooltipPlacement) {
      case "top":
        return "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-[#038167] border-l-transparent border-r-transparent"
      case "bottom":
        return "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-[#038167] border-l-transparent border-r-transparent"
      case "left":
        return "right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-[#038167] border-t-transparent border-b-transparent"
      case "right":
        return "left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-[#038167] border-t-transparent border-b-transparent"
      default:
        return "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-[#038167] border-l-transparent border-r-transparent"
    }
  }

  return (
    <>
      {/* Overlay */}
      {!currentStep.disableOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeWalkthrough} />
      )}

      {/* Tooltip */}
      <div
        className={`fixed z-[60] bg-white rounded-lg shadow-lg p-4 w-80 ${getTooltipClass()}`}
        style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
      >
        {/* Arrow */}
        <div className={`absolute w-0 h-0 border-solid border-8 ${getArrowClass()}`} />

        {/* Close button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeWalkthrough}>
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#038167] mb-2">{currentStep.title}</h3>
          <p className="text-gray-600">{currentStep.content}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <div>
            {currentStepIndex > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                Previous
              </Button>
            )}
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
          <div>
            <Button size="sm" className="bg-[#038167] hover:bg-[#038167]/90 text-white" onClick={nextStep}>
              {currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
