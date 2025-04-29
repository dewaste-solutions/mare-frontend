"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, MapPin, Edit, Trash2, MoreHorizontal } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const barangays = [
  {
    id: 1,
    name: "Barangay 1",
    city: "Manila",
    franchisee: "Manila Waste Solutions",
    collectionDays: ["Monday", "Thursday"],
    status: "active",
  },
  {
    id: 2,
    name: "Barangay 2",
    city: "Quezon City",
    franchisee: "QC Recyclers",
    collectionDays: ["Tuesday", "Friday"],
    status: "active",
  },
  {
    id: 3,
    name: "Barangay 3",
    city: "Makati",
    franchisee: "Makati Green",
    collectionDays: ["Wednesday", "Saturday"],
    status: "inactive",
  },
  {
    id: 4,
    name: "Barangay 4",
    city: "Pasig",
    franchisee: "Pasig Waste Management",
    collectionDays: ["Monday", "Thursday"],
    status: "active",
  },
  {
    id: 5,
    name: "Barangay 5",
    city: "Taguig",
    franchisee: "Taguig Recyclers",
    collectionDays: ["Tuesday", "Friday"],
    status: "active",
  },
]

// Sample franchisees
const franchisees = [
  { id: 1, name: "Manila Waste Solutions" },
  { id: 2, name: "QC Recyclers" },
  { id: 3, name: "Makati Green" },
  { id: 4, name: "Pasig Waste Management" },
  { id: 5, name: "Taguig Recyclers" },
]

export default function BarangaySettingsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddBarangayDialog, setShowAddBarangayDialog] = useState(false)

  // Filter barangays based on active tab and search query
  const filteredBarangays = barangays.filter((barangay) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && barangay.status === "active") ||
      (activeTab === "inactive" && barangay.status === "inactive")
    const matchesSearch =
      barangay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      barangay.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      barangay.franchisee.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <DashboardLayout
      role="admin"
      title="Barangay & Community Settings"
      subtitle="Manage barangays and collection schedules"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Barangay Management</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search barangays..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#038167] hover:bg-[#038167]/90" onClick={() => setShowAddBarangayDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Barangay
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Barangays</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-medium text-gray-500">
                      <th className="py-3 px-4 text-left">Barangay</th>
                      <th className="py-3 px-4 text-left">City</th>
                      <th className="py-3 px-4 text-left">Assigned Franchisee</th>
                      <th className="py-3 px-4 text-left">Collection Days</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBarangays.map((barangay) => (
                      <tr key={barangay.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#038167]" />
                            <span className="font-medium">{barangay.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{barangay.city}</td>
                        <td className="py-3 px-4">{barangay.franchisee}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {barangay.collectionDays.map((day, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-100">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              barangay.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {barangay.status.charAt(0).toUpperCase() + barangay.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MapPin className="mr-2 h-4 w-4" />
                                View on Map
                              </DropdownMenuItem>
                              {barangay.status === "active" ? (
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-green-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
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
        </CardContent>
      </Card>

      {/* Add Barangay Dialog */}
      <Dialog open={showAddBarangayDialog} onOpenChange={setShowAddBarangayDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Barangay</DialogTitle>
            <DialogDescription>Add a new barangay and assign a franchisee for waste collection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="barangay-name" className="text-right">
                Barangay Name
              </Label>
              <Input id="barangay-name" placeholder="Barangay Name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input id="city" placeholder="City" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="franchisee" className="text-right">
                Franchisee
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a franchisee" />
                </SelectTrigger>
                <SelectContent>
                  {franchisees.map((franchisee) => (
                    <SelectItem key={franchisee.id} value={franchisee.id.toString()}>
                      {franchisee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Collection Days</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <Badge key={day} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddBarangayDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-[#038167] hover:bg-[#038167]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Barangay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
