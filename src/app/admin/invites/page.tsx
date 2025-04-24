"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Role = "Community Member" | "Barangay Representative" | "Franchisee" | "Worker" | "Manager" | "Buyer"

interface InviteData {
  id: number;
  name: string;
  email: string;
  dateInvited: string;
  status: string;
  role: Role;
}

const initialInvitesData: InviteData[] = [
  { id: 1, name: "Juan Dela Cruz", email: "juan.delacruz@example.com", dateInvited: "May 8, 2023", status: "Invited", role: "Franchisee" },
  { id: 2, name: "Ana Reyes", email: "ana.reyes@example.com", dateInvited: "May 7, 2023", status: "Invited", role: "Community Member" },
  { id: 3, name: "Carlos Mendoza", email: "carlos.mendoza@example.com", dateInvited: "May 5, 2023", status: "Invited", role: "Barangay Representative" },
  { id: 4, name: "Sofia Garcia", email: "sofia.garcia@example.com", dateInvited: "May 3, 2023", status: "Invited", role: "Community Member" },
  { id: 5, name: "Maria Santos", email: "maria.santos@example.com", dateInvited: "May 10, 2023", status: "Invited", role: "Worker" },
]

const availableRoles: Role[] = ["Community Member", "Barangay Representative", "Franchisee", "Worker", "Manager", "Buyer"]

export default function AdminInvitesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [showSendInviteDialog, setShowSendInviteDialog] = useState(false)
  const [newInviteEmail, setNewInviteEmail] = useState("")
  const [newInviteRole, setNewInviteRole] = useState<Role | "">("")
  const [invitesData, setInvitesData] = useState<InviteData[]>(initialInvitesData)
  const { toast } = useToast()

  const sendInviteButtonRef = useRef<HTMLButtonElement>(null)
  const emailInputRef = useRef<HTMLInputElement | null>(null)

  const itemsPerPage = 5
  const totalItems = invitesData.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedInvites = invitesData.slice(startIndex, startIndex + itemsPerPage)

  const handleSendInvite = () => {
    if (!newInviteEmail || !newInviteEmail.includes("@")) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" })
      return
    }

    if (!newInviteRole) {
      toast({ title: "Role Required", description: "Please select a role for the invitee.", variant: "destructive" })
      return
    }

    if (invitesData.some((invite) => invite.email === newInviteEmail)) {
      toast({ title: "Email Already Invited", description: "This email has already been invited.", variant: "destructive" })
      return
    }

    const namePart = newInviteEmail.split("@")[0]
    const formattedName = namePart.split(".").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")

    const newInvite: InviteData = {
      id: invitesData.length + 1,
      name: formattedName,
      email: newInviteEmail,
      dateInvited: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Invited",
      role: newInviteRole as Role,
    }

    setInvitesData([newInvite, ...invitesData])
    setNewInviteEmail("")
    setNewInviteRole("")
    setShowSendInviteDialog(false)

    toast({ title: "Invite Sent", description: `Invitation sent to ${newInviteEmail} for the role of ${newInviteRole}` })
  }

  const getRoleBadgeColor = (role: Role): string => {
    const roleColors: Record<Role, string> = {
      "Community Member": "bg-blue-100 text-blue-800",
      "Barangay Representative": "bg-purple-100 text-purple-800",
      "Franchisee": "bg-green-100 text-green-800",
      "Worker": "bg-orange-100 text-orange-800",
      "Manager": "bg-red-100 text-red-800",
      "Buyer": "bg-teal-100 text-teal-800",
    }
    return roleColors[role] || "bg-gray-100 text-gray-800"
  }

  return (
    <DashboardLayout role="admin" title="Invites" subtitle="Manage community membership invitations">
      <Toaster />

      <div className="bg-white rounded-lg shadow">
        <div id="invites-header" className="flex justify-between items-center p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invites</h1>
            <p className="text-gray-600">Manage community membership invitations</p>
          </div>
          <Button
            id="send-invite-button"
            ref={sendInviteButtonRef}
            className="bg-[#038167] hover:bg-[#038167]/90 text-white"
            onClick={() => setShowSendInviteDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Send Invite
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table id="invites-table" className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="px-6 py-3 font-medium">EMAIL</th>
                <th className="px-6 py-3 font-medium">ROLE</th>
                <th className="px-6 py-3 font-medium">STATUS</th>
                <th className="px-6 py-3 font-medium">DATE INVITED</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvites.map((invite) => (
                <tr key={invite.id} className="border-b">
                  <td className="px-6 py-4">{invite.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getRoleBadgeColor(invite.role)}`}>
                      {invite.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">{invite.status}</td>
                  <td className="px-6 py-4">{invite.dateInvited}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              variant="link"
              className="text-gray-500"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="mx-2 text-gray-700">{`Page ${currentPage} of ${Math.ceil(totalItems / itemsPerPage)}`}</span>
            <Button
              variant="link"
              className="text-gray-500"
              disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Send invite dialog */}
      <Dialog open={showSendInviteDialog} onOpenChange={setShowSendInviteDialog}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Send Invitation</DialogTitle>
            <DialogDescription>
              Invite someone to join as a member of the community.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                ref={emailInputRef}
                value={newInviteEmail}
                onChange={(e) => setNewInviteEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newInviteRole}
                onValueChange={(value: string) => {
                  if (availableRoles.includes(value as Role) || value === "") {
                    setNewInviteRole(value as "" | Role)
                  }
                }}
              >
                <SelectTrigger id="role-select-trigger">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendInviteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvite}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
