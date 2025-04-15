"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample routes data
const routesData = [
  {
    id: "1",
    name: "North District Route",
    worker: "John Doe",
    progress: 75,
    status: "in-progress",
    collectionsCompleted: 15,
    collectionsTotal: 20,
    date: "Today",
  },
  {
    id: "2",
    name: "Central District Route",
    worker: "Jane Smith",
    progress: 100,
    status: "completed",
    collectionsCompleted: 18,
    collectionsTotal: 18,
    date: "Today",
  },
  {
    id: "3",
    name: "South District Route",
    worker: "Mike Johnson",
    progress: 40,
    status: "in-progress",
    collectionsCompleted: 8,
    collectionsTotal: 20,
    date: "Today",
  },
  {
    id: "4",
    name: "East District Route",
    worker: "Sarah Williams",
    progress: 0,
    status: "scheduled",
    collectionsCompleted: 0,
    collectionsTotal: 15,
    date: "Tomorrow",
  },
  {
    id: "5",
    name: "West District Route",
    worker: "David Brown",
    progress: 0,
    status: "scheduled",
    collectionsCompleted: 0,
    collectionsTotal: 12,
    date: "Tomorrow",
  },
]

export default function AdminRoutesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500"
      case "in-progress":
        return "text-blue-500"
      case "scheduled":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
      case "in-progress":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In Progress</span>
      case "scheduled":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Scheduled</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>
    }
  }

  return (
    <DashboardLayout role="admin" title="Routes" subtitle="Manage and monitor collection routes">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search routes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Route
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Routes</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Collection Routes</CardTitle>
          <CardDescription>View and manage waste collection routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="pb-2 font-medium text-left">Route Name</th>
                  <th className="pb-2 font-medium text-left">Assigned To</th>
                  <th className="pb-2 font-medium text-left">Date</th>
                  <th className="pb-2 font-medium text-left">Progress</th>
                  <th className="pb-2 font-medium text-left">Status</th>
                  <th className="pb-2 font-medium text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routesData.map((route) => (
                  <tr key={route.id} className="border-b last:border-0">
                    <td className="py-3 text-sm font-medium">{route.name}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt={route.worker} />
                          <AvatarFallback>{route.worker.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{route.worker}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600">{route.date}</td>
                    <td className="py-3">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{route.progress}%</span>
                          <span>
                            {route.collectionsCompleted}/{route.collectionsTotal}
                          </span>
                        </div>
                        <Progress value={route.progress} className="h-1.5" />
                      </div>
                    </td>
                    <td className="py-3">{getStatusBadge(route.status)}</td>
                    <td className="py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Route</DropdownMenuItem>
                          <DropdownMenuItem>Reassign Worker</DropdownMenuItem>
                          <DropdownMenuItem>Cancel Route</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
