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
    </>
  )
}
