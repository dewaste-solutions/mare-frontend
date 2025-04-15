"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, AlertTriangle, MessageCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define types for complaints data
interface Complaint {
  id: number;
  subject: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  submittedBy: string;
  barangay: string;
  dateSubmitted: string;
  assignedTo: string | null;
}

// Sample complaints data
const complaints: Complaint[] = [
  {
    id: 1,
    subject: "Missed Collection",
    description: "The waste collector didn't come on the scheduled day",
    category: "Collection",
    priority: "high",
    status: "open",
    submittedBy: "Juan Dela Cruz",
    barangay: "Barangay 1",
    dateSubmitted: "2023-05-15",
    assignedTo: null,
  },
  {
    id: 2,
    subject: "App Not Working",
    description: "Cannot log in to the mobile app",
    category: "Technical",
    priority: "medium",
    status: "in_progress",
    submittedBy: "Maria Santos",
    barangay: "Barangay 2",
    dateSubmitted: "2023-05-14",
    assignedTo: "Tech Support",
  },
  {
    id: 3,
    subject: "Wrong Pricing",
    description: "I was charged incorrectly for my recyclables",
    category: "Billing",
    priority: "low",
    status: "resolved",
    submittedBy: "Carlos Reyes",
    barangay: "Barangay 3",
    dateSubmitted: "2023-05-10",
    assignedTo: "Finance Team",
  },
  {
    id: 4,
    subject: "Rude Collector",
    description: "The waste collector was rude and unprofessional",
    category: "Personnel",
    priority: "high",
    status: "open",
    submittedBy: "Sofia Garcia",
    barangay: "Barangay 1",
    dateSubmitted: "2023-05-15",
    assignedTo: null,
  },
  {
    id: 5,
    subject: "Incorrect Sorting",
    description: "The collector mixed different types of recyclables",
    category: "Collection",
    priority: "medium",
    status: "in_progress",
    submittedBy: "Miguel Lopez",
    barangay: "Barangay 4",
    dateSubmitted: "2023-05-13",
    assignedTo: "Operations Team",
  },
]

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)
  const [showComplaintDetailsDialog, setShowComplaintDetailsDialog] = useState<boolean>(false)

  // Filter complaints based on active tab and search query
  const filteredComplaints = complaints.filter((complaint) => {
    let matchesTab = true
    if (activeTab !== "all") {
      matchesTab = complaint.status === activeTab
    }

    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.barangay.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const getPriorityColor = (priority: Complaint['priority']): string => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      case "urgent":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: Complaint['status']): string => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatStatus = (status: string): string => {
    return status
      .split("_")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleViewComplaint = (complaint: Complaint): void => {
    setSelectedComplaint(complaint)
    setShowComplaintDetailsDialog(true)
  }

  return (
    <DashboardLayout role="admin" title="Complaint Ticketing" subtitle="Manage and resolve user complaints">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Complaint Tickets</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search complaints..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tickets</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-medium text-gray-500">
                      <th className="py-3 px-4 text-left">Ticket</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Priority</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Submitted By</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-[#038167]" />
                            <div>
                              <div className="font-medium">{complaint.subject}</div>
                              <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                {complaint.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{complaint.category}</td>
                        <td className="py-3 px-4">
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(complaint.status)}>{formatStatus(complaint.status)}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{complaint.submittedBy.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{complaint.submittedBy}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{complaint.dateSubmitted}</td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewComplaint(complaint)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Assign Ticket</DropdownMenuItem>
                              <DropdownMenuItem>Change Status</DropdownMenuItem>
                              <DropdownMenuItem>Change Priority</DropdownMenuItem>
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
        </CardContent>
      </Card>

      {/* Complaint Details Dialog */}
      {selectedComplaint && (
        <Dialog open={showComplaintDetailsDialog} onOpenChange={setShowComplaintDetailsDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Complaint Details</DialogTitle>
              <DialogDescription>Ticket #{selectedComplaint.id}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedComplaint.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getPriorityColor(selectedComplaint.priority)}>
                      {selectedComplaint.priority.charAt(0).toUpperCase() + selectedComplaint.priority.slice(1)}{" "}
                      Priority
                    </Badge>
                    <Badge className={getStatusColor(selectedComplaint.status)}>
                      {formatStatus(selectedComplaint.status)}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Submitted on</div>
                  <div className="font-medium">{selectedComplaint.dateSubmitted}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Description</div>
                <p className="text-gray-700">{selectedComplaint.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Submitted By</div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>{selectedComplaint.submittedBy.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedComplaint.submittedBy}</div>
                      <div className="text-sm text-gray-500">{selectedComplaint.barangay}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Assigned To</div>
                  {selectedComplaint.assignedTo ? (
                    <div className="font-medium">{selectedComplaint.assignedTo}</div>
                  ) : (
                    <div className="text-gray-500">Not assigned</div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Assign Ticket</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech-support">Tech Support</SelectItem>
                    <SelectItem value="operations">Operations Team</SelectItem>
                    <SelectItem value="finance">Finance Team</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Update Status</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Open
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    In Progress
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Resolved
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Closed
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowComplaintDetailsDialog(false)}>
                Close
              </Button>
              <Button className="bg-[#038167] hover:bg-[#038167]/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  )
}