"use client"
import {
  BarChart3,
  ArrowUpRight,
  Download,
  Building,
  Users,
  Map,
  Truck,
  BadgeCheck,
  FileText,
  Settings,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import { DashboardLayout } from "@/components/dashboard-layout"

// Add these imports at the top
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RecordCollectionModal, AddEventModal } from "@/components/modals/dashboard-modals"

// Sample data for admin dashboard
const adminStats = [
  {
    title: "Total Franchisees",
    value: "24",
    change: "+2",
    trend: "up",
    description: "Active franchisees",
  },
  {
    title: "Total Members",
    value: "1,248",
    change: "+12%",
    trend: "up",
    description: "Across all locations",
  },
  {
    title: "Pending Applications",
    value: "32",
    change: "+8",
    trend: "up",
    description: "Awaiting review",
  },
  {
    title: "Total Collections",
    value: "45.2t",
    change: "+18%",
    trend: "up",
    description: "Waste collected this month",
  },
]

const recentFranchisees = [
  {
    id: 1,
    name: "Manila Central",
    owner: "Juan Dela Cruz",
    location: "Manila",
    status: "Active",
    collections: "2.4t",
  },
  {
    id: 2,
    name: "Quezon City Hub",
    owner: "Maria Santos",
    location: "Quezon City",
    status: "Active",
    collections: "3.1t",
  },
  {
    id: 3,
    name: "Makati Center",
    owner: "Robert Lim",
    location: "Makati",
    status: "Pending",
    collections: "0",
  },
  {
    id: 4,
    name: "Pasig Recycling",
    owner: "Sarah Johnson",
    location: "Pasig",
    status: "Active",
    collections: "1.8t",
  },
  {
    id: 5,
    name: "Taguig Waste Solutions",
    owner: "Michael Garcia",
    location: "Taguig",
    status: "Inactive",
    collections: "0.5t",
  },
]

const locationPerformance = [
  {
    id: 1,
    location: "Manila",
    collections: "12.4t",
    growth: "+15%",
    members: 320,
  },
  {
    id: 2,
    location: "Quezon City",
    collections: "15.2t",
    growth: "+22%",
    members: 450,
  },
  {
    id: 3,
    location: "Makati",
    collections: "8.7t",
    growth: "+10%",
    members: 210,
  },
  {
    id: 4,
    location: "Pasig",
    collections: "6.5t",
    growth: "+8%",
    members: 180,
  },
  {
    id: 5,
    location: "Taguig",
    collections: "5.9t",
    growth: "+12%",
    members: 150,
  },
]

export default function AdminDashboardPage() {
  // Add these state variables inside the component
  const router = useRouter()
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)

  const getStatusColor = (status:string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-[#038167] bg-[#e6f3f1]"
      case "pending":
        return "text-[#FFC539] bg-[#FFC539]/10"
      case "inactive":
        return "text-[#F69C91] bg-[#F69C91]/10"
      default:
        return "text-gray-500 bg-gray-100"
    }
  }

  return (
    <ToastProvider>
      <DashboardLayout
        role="admin"
        title="Admin Dashboard"
        subtitle="Welcome back, Admin! Here's an overview of the MARE! center."
      >
        <Toaster />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                  </div>
                  <div
                    className={`flex items-center text-xs font-medium ${stat.trend === "up" ? "text-[#038167]" : "text-[#F69C91]"}`}
                  >
                    {stat.change}
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 ml-1 transform rotate-180" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Network Performance */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Network Performance</CardTitle>
                    <CardDescription>Overall waste collection across all locations</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Top Performing Locations</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-gray-500 border-b">
                          <th className="pb-2 font-medium text-left">Location</th>
                          <th className="pb-2 font-medium text-left">Collections</th>
                          <th className="pb-2 font-medium text-left">Growth</th>
                          <th className="pb-2 font-medium text-left">Members</th>
                        </tr>
                      </thead>
                      <tbody>
                        {locationPerformance.map((location) => (
                          <tr key={location.id} className="border-b last:border-0">
                            <td className="py-3 text-sm font-medium">{location.location}</td>
                            <td className="py-3 text-sm text-gray-600">{location.collections}</td>
                            <td className="py-3 text-sm text-[#038167]">{location.growth}</td>
                            <td className="py-3 text-sm text-gray-600">{location.members}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Franchisees */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Franchisees</CardTitle>
                    <CardDescription>Latest franchisee activity</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => (window.location.href = "/admin/franchisees")}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b">
                        <th className="pb-2 font-medium text-left">Name</th>
                        <th className="pb-2 font-medium text-left">Owner</th>
                        <th className="pb-2 font-medium text-left">Location</th>
                        <th className="pb-2 font-medium text-left">Status</th>
                        <th className="pb-2 font-medium text-left">Collections</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentFranchisees.map((franchisee) => (
                        <tr key={franchisee.id} className="border-b last:border-0">
                          <td className="py-3 text-sm font-medium">{franchisee.name}</td>
                          <td className="py-3 text-sm text-gray-600">{franchisee.owner}</td>
                          <td className="py-3 text-sm text-gray-600">{franchisee.location}</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(franchisee.status)}`}>
                              {franchisee.status}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-600">{franchisee.collections}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    className="bg-[#038167] hover:bg-[#038167]/90 text-white justify-start"
                    onClick={() => router.push("/admin/franchisees/new")}
                  >
                    <Building className="h-4 w-4 mr-2" />
                    Add Franchisee
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#F69C91] text-[#F69C91] hover:bg-[#F69C91]/10 justify-start"
                    onClick={() => router.push("/admin/applications")}
                  >
                    <BadgeCheck className="h-4 w-4 mr-2" />
                    Review Applications
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#FFC539] text-[#FFC539] hover:bg-[#FFC539]/10 justify-start"
                    onClick={() => router.push("/admin/locations/new")}
                  >
                    <Map className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#038167] text-[#038167] hover:bg-[#038167]/10 justify-start"
                    onClick={() => router.push("/admin/reports")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#038167] text-[#038167] hover:bg-[#038167]/10 justify-start"
                    onClick={() => setShowRecordModal(true)}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Record Collection
                  </Button>

                  <Button
                    variant="outline"
                    className="border-[#038167] text-[#038167] hover:bg-[#038167]/10 justify-start"
                    onClick={() => setShowEventModal(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>System Status</CardTitle>
                <CardDescription>All systems operational</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-[#038167] mr-2"></div>
                      <span className="text-sm">API Services</span>
                    </div>
                    <span className="text-xs text-[#038167]">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-[#038167] mr-2"></div>
                      <span className="text-sm">Database</span>
                    </div>
                    <span className="text-xs text-[#038167]">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-[#038167] mr-2"></div>
                      <span className="text-sm">Authentication</span>
                    </div>
                    <span className="text-xs text-[#038167]">Operational</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-[#038167] mr-2"></div>
                      <span className="text-sm">Storage</span>
                    </div>
                    <span className="text-xs text-[#038167]">Operational</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Updated</span>
                    <span className="text-xs text-gray-500">10 minutes ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1]">
                      <Users className="h-4 w-4 text-[#038167]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New franchisee application</p>
                      <p className="text-xs text-gray-500">Makati Center by Robert Lim</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC539]/20">
                      <Truck className="h-4 w-4 text-[#FFC539]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Large collection reported</p>
                      <p className="text-xs text-gray-500">Quezon City Hub - 1.2 tons</p>
                      <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F69C91]/20">
                      <Settings className="h-4 w-4 text-[#F69C91]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">System maintenance completed</p>
                      <p className="text-xs text-gray-500">Database optimization</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Modals */}
        <RecordCollectionModal open={showRecordModal} onOpenChange={setShowRecordModal} />
        <AddEventModal open={showEventModal} onOpenChange={setShowEventModal} />
      </DashboardLayout>
    </ToastProvider>
  )
}
