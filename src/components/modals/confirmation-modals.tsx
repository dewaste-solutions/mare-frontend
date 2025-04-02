"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
  confirmColor?: string
  cancelColor?: string
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  confirmVariant = "default",
  confirmColor = "bg-[#038167] hover:bg-[#026B55] text-white",
  cancelColor = "bg-[#F69C91] hover:bg-[#E68A80] text-white",
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-gray-700">
          <p>{description}</p>
        </div>
        <DialogFooter>
          <Button className={cancelColor} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            className={confirmVariant === "default" ? confirmColor : ""}
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AcceptConfirmationModal({
  open,
  onOpenChange,
  email,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  email?: string
  onConfirm: () => void
}) {
  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title="Accept Request"
      description={`Are you sure you want to accept the request for ${email}? An application invite will be sent automatically.`}
      onConfirm={onConfirm}
      confirmText="Confirm"
      confirmColor="bg-[#038167] hover:bg-[#026B55] text-white"
      cancelColor="bg-[#F69C91] hover:bg-[#E68A80] text-white"
    />
  )
}

export function DeclineConfirmationModal({
  open,
  onOpenChange,
  email,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  email?: string
  onConfirm: () => void
}) {
  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title="Decline Request"
      description={`Are you sure you want to decline this request for ${email}? They will not receive an invitation to join.`}
      onConfirm={onConfirm}
      confirmText="Confirm"
      confirmColor="bg-[#038167] hover:bg-[#026B55] text-white"
      cancelColor="bg-[#F69C91] hover:bg-[#E68A80] text-white"
    />
  )
}
