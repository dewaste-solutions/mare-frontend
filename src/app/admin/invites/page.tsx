"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" 
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

// Sample data for invites
const initialInvitesData = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    dateInvited: "May 8, 2023",
    status: "Invited",
  },
  {
    id: 2,
    name: "Ana Reyes",
    email: "ana.reyes@example.com",
    dateInvited: "May 7, 2023",
    status: "Invited",
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@example.com",
    dateInvited: "May 5, 2023",
    status: "Invited",
  },
  {
    id: 4,
    name: "Sofia Garcia",
    email: "sofia.garcia@example.com",
    dateInvited: "May 3, 2023",
    status: "Invited",
  },
  {
    id: 5,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    dateInvited: "May 10, 2023",
    status: "Invited",
  },
]

export default function AdminInvitesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showSendInviteDialog, setShowSendInviteDialog] = useState(false)
  const [newInviteEmail, setNewInviteEmail] = useState("")
  const [invitesData, setInvitesData] = useState(initialInvitesData)
  const { toast } = useToast()
  const itemsPerPage = 5

  // Calculate pagination
  const totalItems = invitesData.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvites = invitesData.slice(startIndex, startIndex + itemsPerPage)

  const handleSendInvite = () => {
    if (!newInviteEmail || !newInviteEmail.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Check if email already exists
    if (invitesData.some((invite) => invite.email === newInviteEmail)) {
      toast({
        title: "Email Already Invited",
        description: "This email has already been invited.",
        variant: "destructive",
      })
      return
    }

    // Generate a name from the email (for demo purposes)
    const namePart = newInviteEmail.split("@")[0]
    const formattedName = namePart
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

    // Add new invite
    const newInvite = {
      id: invitesData.length + 1,
      name: formattedName,
      email: newInviteEmail,
      dateInvited: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Invited",
    }

    setInvitesData([newInvite, ...invitesData])
    setNewInviteEmail("")
    setShowSendInviteDialog(false)

    toast({
      title: "Invite Sent",
      description: `Invitation has been sent to ${newInviteEmail}`,
    })
  }

  const getInitial = (name:string) => {
    return name.charAt(0).toUpperCase()
  }

  const getAvatarColor = (initial:string) => {
    const colors = [
      "bg-green-100 text-green-800",
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-yellow-100 text-yellow-800",
      "bg-red-100 text-red-800",
      "bg-indigo-100 text-indigo-800",
      "bg-pink-100 text-pink-800",
      "bg-teal-100 text-teal-800",
    ]

    // Use the character code to select a color
    const index = initial.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <ToastProvider>
      <DashboardLayout role="admin" title="Invites" subtitle="Manage community membership invitations">
        <Toaster />

        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-6 border-b">
            <div>
           
            </div>
            <Button
              className="bg-[#038167] hover:bg-[#038167]/90 text-white"
              onClick={() => setShowSendInviteDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="px-6 py-3 font-medium">EMAIL</th>
                  <th className="px-6 py-3 font-medium">STATUS</th>
                  <th className="px-6 py-3 font-medium">DATE INVITED</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvites.map((invite) => (
                  <tr key={invite.id} className="border-b">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Avatar className={`h-8 w-8 mr-3 ${getAvatarColor(getInitial(invite.name))}`}>
                          <div className="flex h-full w-full items-center justify-center">
                            {getInitial(invite.name)}
                          </div>
                        </Avatar>
                        <span>{invite.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-yellow-600 bg-yellow-100">{invite.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{invite.dateInvited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage * itemsPerPage >= totalItems}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Send Invite Dialog */}
        <Dialog open={showSendInviteDialog} onOpenChange={setShowSendInviteDialog}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Send Invitation</DialogTitle>
              <DialogDescription>
                Enter the email address of the person you want to invite to join the community.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  value={newInviteEmail}
                  onChange={(e) => setNewInviteEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSendInviteDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white" onClick={handleSendInvite}>
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ToastProvider>
  )
}
