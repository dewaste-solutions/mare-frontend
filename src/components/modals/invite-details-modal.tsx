"use client"

import type React from "react"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" 
import { Button } from "@/components/ui/button"

interface InviteDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  invite: any
  onAccept?: () => void
  onDecline?: () => void
  onCancel: () => void
  getStatusBadge?: (status: string) => React.ReactNode
  getStatusIcon?: (status: string) => React.ReactNode
}

export function InviteDetailsModal({
  open,
  onOpenChange,
  invite,
  onAccept,
  onDecline,
  onCancel,
  getStatusBadge,
  getStatusIcon,
}: InviteDetailsModalProps) {
  const isPending = invite.status === "Submitted" || invite.status === "pending"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{invite.name}</h3>
              <p className="text-sm text-gray-500">{invite.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium">{invite.role}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{invite.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium">{invite.date || invite.dateInvited}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusBadge ? (
                    getStatusBadge(invite.status)
                  ) : (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        invite.status === "Approved" || invite.status === "accepted"
                          ? "text-[#038167] bg-[#e6f3f1]"
                          : invite.status === "Submitted" || invite.status === "pending"
                            ? "text-[#FFC539] bg-[#FFC539]/10"
                            : invite.status === "Rejected" || invite.status === "declined"
                              ? "text-[#F69C91] bg-[#F69C91]/10"
                              : "text-gray-500 bg-gray-100"
                      }`}
                    >
                      {invite.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Close
          </Button>
          {isPending && onDecline && onAccept && (
            <>
              <Button
                variant="outline"
                className="border-[#F69C91] text-[#F69C91] hover:bg-[#F69C91]/10"
                onClick={onDecline}
              >
                Decline
              </Button>
              <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white" onClick={onAccept}>
                Accept
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
