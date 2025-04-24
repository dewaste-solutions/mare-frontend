"use client"
import { CheckCircle, XCircle, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { JSX } from "react"

// Types
interface Invite {
  id: number
  name: string
  email: string
  role: string
  status: string
  date: string
  location: string
}

interface InviteModalsProps {
  showInviteDialog: boolean
  setShowInviteDialog: (show: boolean) => void
  showDetailsDialog: boolean
  setShowDetailsDialog: (show: boolean) => void
  showAcceptModal: boolean
  setShowAcceptModal: (show: boolean) => void
  showDeclineModal: boolean
  setShowDeclineModal: (show: boolean) => void
  selectedInvite: Invite | null
  handleInviteAction: (action: string, invite: Invite) => void
  getStatusBadge: (status: string) => JSX.Element | null
  getStatusIcon: (status: string) => JSX.Element | null
}

export function InviteModals({
  showInviteDialog,
  setShowInviteDialog,
  showDetailsDialog,
  setShowDetailsDialog,
  showAcceptModal,
  setShowAcceptModal,
  showDeclineModal,
  setShowDeclineModal,
  selectedInvite,
  handleInviteAction,
  getStatusBadge,
  getStatusIcon,
}: InviteModalsProps) {
  return (
    <>
      {/* New Invite Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle>Add User Request</DialogTitle>
            <DialogDescription>Add a user to the pending requests list</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="email@example.com" className="bg-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger id="role" className="bg-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Community Member">Community Member</SelectItem>
                  <SelectItem value="Barangay Representative">Barangay Representative</SelectItem>
                  <SelectItem value="Franchisee">Franchisee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Invite Details</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowDetailsDialog(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </DialogHeader>

          {selectedInvite && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary-100 text-primary-600">
                    {selectedInvite.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{selectedInvite.name}</h3>
                  <p className="text-gray-500 text-sm">{selectedInvite.email}</p>
                </div>
                {getStatusBadge(selectedInvite.status)}
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{selectedInvite.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Requested</p>
                  <p className="font-medium">{selectedInvite.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{selectedInvite.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedInvite.status)}
                    <p className="font-medium">{selectedInvite.status}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            {selectedInvite && selectedInvite.status === "Pending" && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDetailsDialog(false)
                    setShowDeclineModal(true)
                  }}
                  className="text-gray-700"
                >
                  Decline
                </Button>
                <Button 
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                  onClick={() => {
                    setShowDetailsDialog(false)
                    setShowAcceptModal(true)
                  }}
                >
                  Accept
                </Button>
              </>
            )}
            {selectedInvite && selectedInvite.status !== "Pending" && (
              <Button 
                variant="outline" 
                onClick={() => setShowDetailsDialog(false)}
                className="text-gray-700"
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accept Confirmation Modal */}
      <Dialog open={showAcceptModal} onOpenChange={setShowAcceptModal}>
        <DialogContent className="sm:max-w-[400px] bg-white">
          <DialogHeader>
            <DialogTitle>Accept Invite</DialogTitle>
            <DialogDescription>
              Are you sure you want to accept this invite request?
            </DialogDescription>
          </DialogHeader>

          {selectedInvite && (
            <div className="flex items-center gap-4 my-4">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{selectedInvite.name}</p>
                <p className="text-sm text-gray-500">{selectedInvite.email}</p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setShowAcceptModal(false)}
              className="text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                if (selectedInvite) {
                  handleInviteAction("accept", selectedInvite)
                  setShowAcceptModal(false)
                }
              }}
            >
              Confirm Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Confirmation Modal */}
      <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
        <DialogContent className="sm:max-w-[400px] bg-white">
          <DialogHeader>
            <DialogTitle>Decline Invite</DialogTitle>
            <DialogDescription>
              Are you sure you want to decline this invite request?
            </DialogDescription>
          </DialogHeader>

          {selectedInvite && (
            <div className="flex items-center gap-4 my-4">
              <div className="bg-red-100 p-2 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium">{selectedInvite.name}</p>
                <p className="text-sm text-gray-500">{selectedInvite.email}</p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setShowDeclineModal(false)}
              className="text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (selectedInvite) {
                  handleInviteAction("decline", selectedInvite)
                  setShowDeclineModal(false)
                }
              }}
            >
              Confirm Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}