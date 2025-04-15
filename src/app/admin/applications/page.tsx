"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, Filter, Check, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"

// Define application status type
type ApplicationStatus = "Accepted" | "Submitted" | "Declined";

// Define Application interface
interface Application {
  id: number;
  name: string;
  email: string;
  date: string;
  status: ApplicationStatus;
  location: string;
  type: string;
  role: string;
}

// Define tab values type
type TabValue = "all" | "submitted" | "accepted" | "declined";

// Sample data for applications
const applicationsData: Application[] = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    date: "2023-10-15",
    status: "Accepted",
    location: "Manila",
    type: "Business",
    role: "Franchisee",
  },
  {
    id: 2,
    name: "Ana Reyes",
    email: "ana.reyes@example.com",
    date: "2023-10-14",
    status: "Submitted",
    location: "Quezon City",
    type: "Household",
    role: "Community Member",
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    email: "carlos.mendoza@example.com",
    date: "2023-10-13",
    status: "Declined",
    location: "Makati",
    type: "Government",
    role: "Barangay Representative",
  },
  {
    id: 4,
    name: "Sofia Garcia",
    email: "sofia.garcia@example.com",
    date: "2023-10-12",
    status: "Submitted",
    location: "Pasig",
    type: "Household",
    role: "Community Member",
  },
  {
    id: 5,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    date: "2023-10-11",
    status: "Submitted",
    location: "Taguig",
    type: "Household",
    role: "Community Member",
  },
]

export default function AdminApplicationsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const itemsPerPage = 5

  const { toast } = useToast()
  const [viewingApplication, setViewingApplication] = useState<Application | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showDeclineModal, setShowDeclineModal] = useState(false)

  // Filter applications based on active tab
  const filteredApplications = applicationsData.filter((application) => {
    if (activeTab === "all") return true
    if (activeTab === "submitted") return application.status === "Submitted"
    if (activeTab === "accepted") return application.status === "Accepted"
    if (activeTab === "declined") return application.status === "Declined"
    return true
  })

  // Calculate pagination
  const totalItems = filteredApplications.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage)

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "Accepted":
        return <Check className="h-5 w-5 text-green-500" />
      case "Submitted":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "Declined":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Accepted":
        return "text-green-600"
      case "Submitted":
        return "text-yellow-600"
      case "Declined":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const getAvatarColor = (initial: string) => {
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

  const handleViewApplication = (application: Application) => {
    setViewingApplication(application)
    setShowViewModal(true)
  }

  const handleAcceptApplication = (application: Application) => {
    setViewingApplication(application)
    setShowAcceptModal(true)
  }

  const handleDeclineApplication = (application: Application) => {
    setViewingApplication(application)
    setShowDeclineModal(true)
  }

  const confirmAcceptApplication = () => {
    if (!viewingApplication) return

    // In a real app, you would make an API call here
    toast({
      title: "Application Approved",
      description: `${viewingApplication.name}'s application has been approved.`,
    })
    setShowAcceptModal(false)
  }

  const confirmDeclineApplication = () => {
    if (!viewingApplication) return
    
    // In a real app, you would make an API call here
    toast({
      title: "Application Declined",
      description: `${viewingApplication.name}'s application has been declined.`,
    })
    setShowDeclineModal(false)
  }

  return (
    <ToastProvider>
      <DashboardLayout role="admin" title="Membership Applications" subtitle="Manage community membership applications">
        <Toaster />

        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Membership Applications</h1>
              <p className="text-gray-600">Manage community membership applications</p>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="px-6 pt-4">
            <TabsList className="grid grid-cols-4 w-fit">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="px-6 py-3 font-medium">NAME</th>
                      <th className="px-6 py-3 font-medium">ROLE</th>
                      <th className="px-6 py-3 font-medium">STATUS</th>
                      <th className="px-6 py-3 font-medium">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.map((application) => (
                      <tr key={application.id} className="border-b">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Avatar className={`h-8 w-8 mr-3 ${getAvatarColor(getInitial(application.name))}`}>
                              <div className="flex h-full w-full items-center justify-center">
                                {getInitial(application.name)}
                              </div>
                            </Avatar>
                            <div>
                              <div className="font-medium">{application.name}</div>
                              <div className="text-sm text-gray-500">{application.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">{application.role}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getStatusIcon(application.status)}
                            <span className={`ml-2 ${getStatusColor(application.status)}`}>{application.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                                View Details
                              </DropdownMenuItem>
                              {application.status === "Submitted" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleAcceptApplication(application)}>
                                    Accept
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeclineApplication(application)}>
                                    Decline
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

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

        {/* View Application Modal */}
        {viewingApplication && (
          <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
            <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle>
                <VisuallyHidden>Application Details</VisuallyHidden>
              </DialogTitle>
            </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{viewingApplication.name}</h3>
                    <p className="text-sm text-gray-500">{viewingApplication.email}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Role</p>
                      <p className="text-sm font-medium">{viewingApplication.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{viewingApplication.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm font-medium">{viewingApplication.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium">{viewingApplication.date}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <div className="flex items-center mt-1">
                      {getStatusIcon(viewingApplication.status)}
                      <span className={`ml-2 ${getStatusColor(viewingApplication.status)}`}>
                        {viewingApplication.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
                {viewingApplication.status === "Submitted" && (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => {
                        setShowViewModal(false)
                        handleDeclineApplication(viewingApplication)
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      className="bg-[#038167] hover:bg-[#038167]/90 text-white"
                      onClick={() => {
                        setShowViewModal(false)
                        handleAcceptApplication(viewingApplication)
                      }}
                    >
                      Accept
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Accept Confirmation Modal */}
        <Dialog open={showAcceptModal} onOpenChange={setShowAcceptModal}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Accept Application</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700">
                Are you sure you want to accept this application from {viewingApplication?.name}? This will grant them
                access to the platform.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAcceptModal(false)}>
                Cancel
              </Button>
              <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white" onClick={confirmAcceptApplication}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Decline Confirmation Modal */}
        <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>Decline Application</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-700">
                Are you sure you want to decline this application from {viewingApplication?.name}? They will be notified
                that their application was rejected.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeclineModal(false)}>
                Cancel
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmDeclineApplication}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    </ToastProvider>
  )
}