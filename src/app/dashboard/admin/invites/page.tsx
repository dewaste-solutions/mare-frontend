"use client"

import { useState, useEffect, SetStateAction} from "react"
import {
  Users,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { ToastProvider } from "@/components/ui/toast"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMediaQuery } from "@/hooks/use-media-query"

// Import components
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { AddUserModal } from "@/components/modals/add-user-modal"
import { InviteDetailsModal } from "@/components/modals/invite-details-modal"
import { AcceptConfirmationModal, DeclineConfirmationModal } from "@/components/modals/confirmation-modals"
import { Header } from "@/components/layout/header"

// Import data
import { invites, notifications } from "@/data/invites-data"

// Filter options
const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "Community Member", label: "Community Member" },
  { value: "Franchisee", label: "Franchisee" },
  { value: "Barangay Representative", label: "Barangay Representative" },
]

const dateOptions = [
  { value: "all", label: "All Dates" },
  { value: "recent", label: "Recent (Last 7 days)" },
  { value: "older", label: "Older" },
]

interface Invite {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  date: string;
  location: string;
}

export default function InvitesPage() {
  // State variables
  const [activeTab, setActiveTab] = useState("all")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  // Fix: Set the correct type for selectedInvite
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [filterConfig, setFilterConfig] = useState({ role: "all", date: "all" })
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Confirmation modals state
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  // Add toast state
  const { toast } = useToast()

  // Set initial sidebar state based on screen size
  useEffect(() => {
    setShowSidebar(!isMobile)
  }, [isMobile])

  // Navigation toggle function
  const toggleNavigation = () => {
    if (isMobile) {
      setShowMobileNav(!showMobileNav)
    } else {
      setShowSidebar((prev) => !prev)
    }
  }

  // Sorting function
  const requestSort = (key: string) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Apply filters
  const applyFilters = (filters: { role: string; date: string }) => {
    setFilterConfig(filters)
    setShowFilterMenu(false)
  }

  // Filter and sort invites
  const filteredInvites = invites
    .filter((invite) => {
      // Status filter
      if (activeTab === "all") return true
      if (activeTab === "pending") return invite.status === "pending"
      if (activeTab === "accepted") return invite.status === "accepted"
      if (activeTab === "declined") return invite.status === "declined"
      return true
    })
    .filter((invite) => {
      // Role filter
      if (filterConfig.role === "all") return true
      return invite.role === filterConfig.role
    })
    .filter((invite) => {
      // Date filter
      if (filterConfig.date === "all") return true

      const inviteDate = new Date(invite.date)
      const today = new Date()
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(today.getDate() - 7)

      if (filterConfig.date === "recent") {
        return inviteDate >= sevenDaysAgo
      } else if (filterConfig.date === "older") {
        return inviteDate < sevenDaysAgo
      }

      return true
    })
    .filter((invite) => {
      // Search query filter
      if (!searchQuery) return true
      return (
        invite.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invite.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      if (sortConfig.key === "role") {
        return sortConfig.direction === "asc" ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role)
      }
      if (sortConfig.key === "date") {
        // Simple date comparison (would be better with actual Date objects)
        return sortConfig.direction === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
      }
      if (sortConfig.key === "status") {
        return sortConfig.direction === "asc" ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status)
      }
      return 0
    })

  // Handle view details
  const handleViewDetails = (invite: Invite) => {
    setSelectedInvite(invite)
    setShowDetailsDialog(true)
  }

  // Handle invite actions
  const handleInviteAction = (action: string, invite: Invite | null) => {
    switch (action) {
      case "accept":
        toast({
          title: "Request Accepted",
          description: `An invitation has been automatically sent to ${invite?.email}.`,
          // Fix: Update toast variant to match the allowed types
          variant: "default",
        })
        break
      case "decline":
        toast({
          title: "Request Declined",
          description: `The request for ${invite?.name} has been declined.`,
          variant: "default",
        })
        break
      case "cancel":
        toast({
          title: "Request Cancelled",
          description: `The request for ${invite?.name} has been cancelled.`,
          variant: "default",
        })
        break
      default:
        break
    }

    setShowAcceptModal(false)
    setShowDeclineModal(false)
    setShowDetailsDialog(false)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-[rgba(255,197,57,0.25)] text-[#FFC539] hover:bg-[#FFD26D]">
            Pending
          </Badge>
        );
      case "accepted":
        return (
          <Badge className="bg-[rgba(3,129,103,0.25)] text-[#038167] hover:bg-[#026c57]">
            Accepted
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-[rgba(246,156,145,0.25)] text-[#F69C91] hover:bg-[#F08A7E]">
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-[#FFC539]" />; // Pending - #FFC539
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-[#038167]" />; // Accepted - #038167
      case "declined":
        return <XCircle className="h-4 w-4 text-[#F69C91]" />; // Declined - #F69C91
      default:
        return null;
    }
  };
  
  // Get sort icons - properly aligned
  const getSortIcons = (key: string) => {
    return (
      <div className="inline-flex items-center ml-1">
        <div className="flex flex-col">
          <ChevronUp
            className={`h-3 w-3 ${
              sortConfig.key === key && sortConfig.direction === "asc" ? "text-primary-500" : "text-gray-300"
            }`}
          />
          <ChevronDown
            className={`h-3 w-3 ${
              sortConfig.key === key && sortConfig.direction === "desc" ? "text-primary-500" : "text-gray-300"
            }`}
          />
        </div>
      </div>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Dashboard Layout */}
        <div className="flex flex-1">
          {/* Sidebar - Desktop */}
          <aside
            className={`${
              showSidebar ? "flex" : "hidden"
            } md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300`}
          >
            <SidebarNavigation activeTab="invites" setActiveTab={() => {}} />
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <Header
              toggleNavigation={toggleNavigation}
              showMobileNav={showMobileNav}
              setShowMobileNav={setShowMobileNav}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              notifications={notifications}
              showSidebar={showSidebar}
            />

            {/* Invites Content */}
            <main className="p-6 flex-1">
              <div className="flex flex-col md:flex-row md:itemsems-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">User Requests</h1>
                  <p className="text-gray-600">Manage community membership requests</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative md:hidden w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search invites..."
                      className="pl-10 bg-gray-50 border-gray-200 focus:bg-white w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <DropdownMenu open={showFilterMenu} onOpenChange={setShowFilterMenu}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white shadow-md border border-gray-200 rounded-md">
                      <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <div className="p-2">
                        <p className="text-xs font-medium mb-1">Role</p>
                        <Select
                          value={filterConfig.role}
                          onValueChange={(value) => setFilterConfig({ ...filterConfig, role: value })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
                            {roleOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-2">
                        <p className="text-xs font-medium mb-1">Date</p>
                        <Select
                          value={filterConfig.date}
                          onValueChange={(value) => setFilterConfig({ ...filterConfig, date: value })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                          <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
                            {dateOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-1/2"
                          onClick={() => setFilterConfig({ role: "all", date: "all" })}
                        >
                          Reset
                        </Button>
                        <Button
                          size="sm"
                          className="w-1/2"
                          style={{ backgroundColor: '#038167', color: 'white' }}
                          onClick={() => setShowFilterMenu(false)}
                        >
                          Apply
                        </Button>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    className="text-white"
                    style={{
                      backgroundColor: '#038167', // Custom green color
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#026c57'} // Darker green on hover
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#038167'} // Original green color
                    onClick={() => setShowInviteDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    <span>Add User</span>
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab} value={activeTab}>
                <TabsList className="bg-white border border-gray-200">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary-500"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary-500"
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger
                    value="accepted"
                    className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary-500"
                  >
                    Accepted
                  </TabsTrigger>
                  <TabsTrigger
                    value="declined"
                    className="data-[state=active]:bg-primary-50 data-[state=active]:text-primary-500"
                  >
                    Declined
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Invites Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50">
                          <th
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 cursor-pointer"
                            onClick={() => requestSort("name")}
                          >
                            <div className="flex items-center">
                              <span>Name</span>
                              {getSortIcons("name")}
                            </div>
                          </th>
                          <th
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 hidden md:table-cell cursor-pointer"
                            onClick={() => requestSort("role")}
                          >
                            <div className="flex items-center">
                              <span>Role</span>
                              {getSortIcons("role")}
                            </div>
                          </th>
                          <th
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 hidden lg:table-cell cursor-pointer"
                            onClick={() => requestSort("date")}
                          >
                            <div className="flex items-center">
                              <span>Date</span>
                              {getSortIcons("date")}
                            </div>
                          </th>
                          <th
                            className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4 cursor-pointer"
                            onClick={() => requestSort("status")}
                          >
                            <div className="flex items-center">
                              <span>Status</span>
                              {getSortIcons("status")}
                            </div>
                          </th>
                          <th className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right py-3 px-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredInvites.length > 0 ? (
                          filteredInvites.map((invite) => (
                            <tr key={invite.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-[#e6f3f1] text-[#038167]">
                                      {invite.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium text-gray-800">{invite.name}</p>
                                    <p className="text-xs text-gray-500">{invite.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 hidden md:table-cell">
                                <span className="text-sm text-gray-600">{invite.role}</span>
                              </td>
                              <td className="py-3 px-4 hidden lg:table-cell">
                                <span className="text-sm text-gray-600">{invite.date}</span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(invite.status)}
                                  <span className="hidden md:inline">{getStatusBadge(invite.status)}</span>
                                  <span className="text-xs md:hidden capitalize text-gray-600">{invite.status}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                                      <DropdownMenuItem 
                                        onClick={() => handleViewDetails(invite)} 
                                        className="bg-white"
                                      >
                                        View Details
                                      </DropdownMenuItem>

                                      {invite.status === "pending" && (
                                        <>
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setSelectedInvite(invite)
                                              setShowAcceptModal(true)
                                            }}
                                          >
                                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                            <span>Accept</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setSelectedInvite(invite)
                                              setShowDeclineModal(true)
                                            }}
                                          >
                                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                            <span>Decline</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => handleInviteAction("cancel", invite)}>
                                            <X className="h-4 w-4 mr-2 text-gray-500" />
                                            <span>Cancel</span>
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500">
                              <div className="flex flex-col items-center">
                                <Users className="h-10 w-10 text-gray-300 mb-2" />
                                <p>No user requests found</p>
                                {searchQuery && (
                                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                                )}
                                <Button
                                  className="mt-4 bg-primary-500 hover:bg-primary-600 text-white"
                                  onClick={() => setShowInviteDialog(true)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  <span>Add User Request</span>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination */}
              {filteredInvites.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">{filteredInvites.length}</span> of{" "}
                    <span className="font-medium">{filteredInvites.length}</span> results
                  </p>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Modals */}
        <AddUserModal open={showInviteDialog} onOpenChange={setShowInviteDialog} />

        <InviteDetailsModal
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
          invite={selectedInvite}
          onAccept={() => setShowAcceptModal(true)}
          onDecline={() => setShowDeclineModal(true)}
          onCancel={() => handleInviteAction("cancel", selectedInvite)}
          getStatusBadge={getStatusBadge}
          getStatusIcon={getStatusIcon}
        />

        <AcceptConfirmationModal
          open={showAcceptModal}
          onOpenChange={setShowAcceptModal}
          email={selectedInvite?.email}
          onConfirm={() => handleInviteAction("accept", selectedInvite)}
        />

        <DeclineConfirmationModal
          open={showDeclineModal}
          onOpenChange={setShowDeclineModal}
          email={selectedInvite?.email}
          onConfirm={() => handleInviteAction("decline", selectedInvite)}
        />

        {/* Mobile Navigation Sheet */}
        <Sheet open={showMobileNav} onOpenChange={setShowMobileNav}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarNavigation
              activeTab="invites"
              setActiveTab={() => {}}
              isMobile={true}
              onCloseMobile={() => setShowMobileNav(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </ToastProvider>
  )
}