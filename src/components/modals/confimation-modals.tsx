"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" 
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email?: string
  onConfirm: () => void
}

export function AcceptConfirmationModal({ open, onOpenChange, email, onConfirm }: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Accept Application</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to accept this application from {email}? This will grant them access to the platform.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DeclineConfirmationModal({ open, onOpenChange, email, onConfirm }: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Decline Application</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">
            Are you sure you want to decline this application from {email}? They will be notified that their application
            was rejected.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-[#F69C91] hover:bg-[#F69C91]/90 text-white" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
