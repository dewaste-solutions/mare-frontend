"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2, MoreHorizontal, BadgePercent, Calendar } from "lucide-react"
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Sample offers data
const offers = [
  {
    id: 1,
    title: "Early Bird Discount",
    description: "10% discount for collections before 9 AM",
    discountPercentage: 10,
    discountAmount: null,
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    applicableRole: "worker",
    barangay: "All Barangays",
    status: "active",
  },
  {
    id: 2,
    title: "Bulk Collection Bonus",
    description: "₱50 bonus for collections over 20kg",
    discountPercentage: null,
    discountAmount: 50,
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    applicableRole: "franchisee",
    barangay: "Barangay 1",
    status: "active",
  },
  {
    id: 3,
    title: "Weekend Special",
    description: "15% discount for weekend collections",
    discountPercentage: 15,
    discountAmount: null,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    applicableRole: "community-officer",
    barangay: "Barangay 2",
    status: "inactive",
  },
  {
    id: 4,
    title: "New User Bonus",
    description: "₱100 bonus for new users' first collection",
    discountPercentage: null,
    discountAmount: 100,
    startDate: "2023-04-01",
    endDate: "2023-12-31",
    applicableRole: "buyer",
    barangay: "All Barangays",
    status: "active",
  },
]

// Sample barangays
const barangays = [
  { id: 0, name: "All Barangays" },
  { id: 1, name: "Barangay 1" },
  { id: 2, name: "Barangay 2" },
  { id: 3, name: "Barangay 3" },
  { id: 4, name: "Barangay 4" },
  { id: 5, name: "Barangay 5" },
]

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddOfferDialog, setShowAddOfferDialog] = useState(false)

  // Filter offers based on active tab and search query
  const filteredOffers = offers.filter((offer) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && offer.status === "active") ||
      (activeTab === "inactive" && offer.status === "inactive")
    const matchesSearch =
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.applicableRole.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getRoleColor = (role:string) => {
    switch (role) {
      case "franchisee":
        return "bg-blue-100 text-blue-800"
      case "worker":
        return "bg-green-100 text-green-800"
      case "buyer":
        return "bg-yellow-100 text-yellow-800"
      case "community-officer":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status:string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <DashboardLayout role="admin" title="Offers & Coupons" subtitle="Create and manage special offers and discounts">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Offers & Coupons</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search offers..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#038167] hover:bg-[#038167]/90" onClick={() => setShowAddOfferDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Offer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Offers</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-medium text-gray-500">
                      <th className="py-3 px-4 text-left">Offer</th>
                      <th className="py-3 px-4 text-left">Discount</th>
                      <th className="py-3 px-4 text-left">Validity</th>
                      <th className="py-3 px-4 text-left">Applicable To</th>
                      <th className="py-3 px-4 text-left">Barangay</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOffers.map((offer) => (
                      <tr key={offer.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <BadgePercent className="h-4 w-4 text-[#038167]" />
                            <div>
                              <div className="font-medium">{offer.title}</div>
                              <div className="text-xs text-gray-500">{offer.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {offer.discountPercentage ? (
                            <span className="font-medium">{offer.discountPercentage}%</span>
                          ) : (
                            <span className="font-medium">₱{offer.discountAmount}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div className="text-sm">
                              {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getRoleColor(offer.applicableRole)}>
                            {offer.applicableRole.charAt(0).toUpperCase() +
                              offer.applicableRole.slice(1).replace("-", " ")}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{offer.barangay}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(offer.status)}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
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
                              {offer.status === "active" ? (
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

      {/* Add Offer Dialog */}
      <Dialog open={showAddOfferDialog} onOpenChange={setShowAddOfferDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Offer</DialogTitle>
            <DialogDescription>Create a new special offer or discount for users.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="offer-title" className="text-right">
                Offer Title
              </Label>
              <Input id="offer-title" placeholder="Offer Title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" placeholder="Description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Discount Type</Label>
              <div className="col-span-3 flex gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="percentage" />
                  <Label htmlFor="percentage">Percentage</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="fixed-amount" />
                  <Label htmlFor="fixed-amount">Fixed Amount</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount-value" className="text-right">
                Discount Value
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input id="discount-value" type="number" placeholder="0" className="w-24" />
                <span>% or ₱</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="validity" className="text-right">
                Validity Period
              </Label>
              <div className="col-span-3 grid grid-cols-2 gap-2">
                <Input id="start-date" type="date" />
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="applicable-role" className="text-right">
                Applicable To
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="franchisee">Franchisee</SelectItem>
                  <SelectItem value="worker">Worker</SelectItem>
                  <SelectItem value="buyer">Buyer</SelectItem>
                  <SelectItem value="community-officer">Community Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="barangay" className="text-right">
                Barangay
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a barangay" />
                </SelectTrigger>
                <SelectContent>
                  {barangays.map((barangay) => (
                    <SelectItem key={barangay.id} value={barangay.id.toString()}>
                      {barangay.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddOfferDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-[#038167] hover:bg-[#038167]/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
