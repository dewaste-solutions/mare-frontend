"use client"

<<<<<<< Updated upstream
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, X } from "lucide-react"
import { JSX } from "react"

interface Invite {
  id: number
  name: string
  email: string
  role: string
  status: string
  date: string
  location: string
}
=======
import type React from "react"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
>>>>>>> Stashed changes

interface InviteDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
<<<<<<< Updated upstream
  invite: Invite | null
  onAccept: () => void
  onDecline: () => void
  onCancel: () => void
  getStatusBadge: (status: string) => JSX.Element | null
  getStatusIcon: (status: string) => JSX.Element | null
=======
  invite: any
  onAccept?: () => void
  onDecline?: () => void
  onCancel: () => void
  getStatusBadge?: (status: string) => React.ReactNode
  getStatusIcon?: (status: string) => React.ReactNode
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  if (!invite) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white text-gray-800 p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Invite Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-[#e6f3f1] text-[#038167] text-xl">{invite.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{invite.name}</h3>
              <p className="text-sm text-gray-500">{invite.email}</p>
              <div className="mt-1">{getStatusBadge(invite.status)}</div>
            </div>
          </div>

          <div className="space-y-4">
=======
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

>>>>>>> Stashed changes
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium">{invite.role}</p>
              </div>
              <div>
<<<<<<< Updated upstream
                <p className="text-xs text-gray-500">Date Invited</p>
                <p className="text-sm font-medium">{invite.date}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium">{invite.location}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-xs text-gray-500">Invite Status</p>
              <div className="flex items-center gap-2">
                {getStatusIcon(invite.status)}
                <p className="text-sm font-medium capitalize">{invite.status}</p>
              </div>

              {invite.status === "pending" && (
                <p className="text-xs text-gray-500 mt-1">This invite was sent but has not been responded to yet.</p>
              )}

              {invite.status === "accepted" && (
                <p className="text-xs text-gray-500 mt-1">This invite was accepted on May 8, 2023.</p>
              )}

              {invite.status === "declined" && (
                <p className="text-xs text-gray-500 mt-1">This invite was declined on May 5, 2023.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          {invite.status === "pending" && (
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white" onClick={onAccept}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button
                  variant="outline"
                  className="border-[#F69C91] text-[#F69C91] hover:bg-[#F69C91]/10"
                  onClick={onDecline}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </div>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={onCancel}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}

          {invite.status !== "pending" && (
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
=======
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
>>>>>>> Stashed changes
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
