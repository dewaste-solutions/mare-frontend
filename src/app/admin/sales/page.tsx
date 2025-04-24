"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Check, X, ShoppingCart } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define Sale type for better TypeScript support
interface Sale {
  id: number;
  material: string;
  weightKg: number;
  pricePerKg: number;
  totalAmount: number;
  seller: string;
  buyer: string | null;
  saleDate: string;
  status: string;
}

// Define Buyer type
interface Buyer {
  id: number;
  name: string;
}

// Sample sales data
const sales: Sale[] = [
  {
    id: 1,
    material: "PET Bottles",
    weightKg: 120,
    pricePerKg: 15.0,
    totalAmount: 1800.0,
    seller: "Manila Waste Solutions",
    buyer: null,
    saleDate: "2023-05-15",
    status: "pending",
  },
  {
    id: 2,
    material: "Cardboard",
    weightKg: 250,
    pricePerKg: 8.5,
    totalAmount: 2125.0,
    seller: "QC Recyclers",
    buyer: "EcoPaper Inc.",
    saleDate: "2023-05-14",
    status: "approved",
  },
  {
    id: 3,
    material: "Aluminum Cans",
    weightKg: 80,
    pricePerKg: 25.0,
    totalAmount: 2000.0,
    seller: "Makati Green",
    buyer: "MetalWorks Co.",
    saleDate: "2023-05-13",
    status: "completed",
  },
  {
    id: 4,
    material: "Glass Bottles",
    weightKg: 180,
    pricePerKg: 5.0,
    totalAmount: 900.0,
    seller: "Pasig Waste Management",
    buyer: null,
    saleDate: "2023-05-15",
    status: "pending",
  },
  {
    id: 5,
    material: "HDPE Plastic",
    weightKg: 100,
    pricePerKg: 12.0,
    totalAmount: 1200.0,
    seller: "Taguig Recyclers",
    buyer: "PlastiCorp",
    saleDate: "2023-05-12",
    status: "approved",
  },
]

// Sample buyers
const buyers: Buyer[] = [
  { id: 1, name: "EcoPaper Inc." },
  { id: 2, name: "MetalWorks Co." },
  { id: 3, name: "PlastiCorp" },
  { id: 4, name: "GlassWorks Ltd." },
  { id: 5, name: "Green Recycling Inc." },
]

export default function SalesMatchingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [showMatchBuyerDialog, setShowMatchBuyerDialog] = useState(false)

  // Filter sales based on active tab and search query
  const filteredSales = sales.filter((sale) => {
    let matchesTab = true
    if (activeTab !== "all") {
      matchesTab = sale.status === activeTab
    }

    const matchesSearch =
      sale.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sale.buyer && sale.buyer.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleMatchBuyer = (sale: Sale) => {
    setSelectedSale(sale)
    setShowMatchBuyerDialog(true)
  }

  return (
    <DashboardLayout
      role="admin"
      title="Sales Matching & Approval"
      subtitle="Match sellers with buyers and approve sales"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Matching</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search sales..."
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
              <TabsTrigger value="all">All Sales</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-medium text-gray-500">
                      <th className="py-3 px-4 text-left">Material</th>
                      <th className="py-3 px-4 text-left">Weight</th>
                      <th className="py-3 px-4 text-left">Total Amount</th>
                      <th className="py-3 px-4 text-left">Seller</th>
                      <th className="py-3 px-4 text-left">Buyer</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="font-medium">{sale.material}</div>
                        </td>
                        <td className="py-3 px-4">{sale.weightKg} kg</td>
                        <td className="py-3 px-4 font-medium">₱{sale.totalAmount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-gray-600">{sale.seller}</td>
                        <td className="py-3 px-4">
                          {sale.buyer ? (
                            <div className="text-gray-600">{sale.buyer}</div>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100">
                              No Buyer
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{sale.saleDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(sale.status)}>
                            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              {!sale.buyer && (
                                <DropdownMenuItem onClick={() => handleMatchBuyer(sale)}>Match Buyer</DropdownMenuItem>
                              )}
                              {sale.status === "pending" && (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4 text-green-600" />
                                  Approve Sale
                                </DropdownMenuItem>
                              )}
                              {sale.status === "approved" && (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4 text-green-600" />
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              {(sale.status === "pending" || sale.status === "approved") && (
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel Sale
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

      {/* Match Buyer Dialog */}
      {selectedSale && (
        <Dialog open={showMatchBuyerDialog} onOpenChange={setShowMatchBuyerDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Match Buyer for Sale</DialogTitle>
              <DialogDescription>Connect a buyer to this sale of {selectedSale.material}.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Material</div>
                  <div className="font-medium">{selectedSale.material}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Weight</div>
                  <div className="font-medium">{selectedSale.weightKg} kg</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Price per KG</div>
                  <div className="font-medium">₱{selectedSale.pricePerKg.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">Total Amount</div>
                  <div className="font-medium">₱{selectedSale.totalAmount.toFixed(2)}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Seller</div>
                <div className="font-medium">{selectedSale.seller}</div>
              </div>

              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-500 mb-2">Select Buyer</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a buyer" />
                  </SelectTrigger>
                  <SelectContent>
                    {buyers.map((buyer) => (
                      <SelectItem key={buyer.id} value={buyer.id.toString()}>
                        {buyer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 border-t pt-4">
                <div className="flex-1 text-sm font-medium text-gray-500">
                  Automatically approve sale after matching?
                </div>
                <Button variant="outline" size="sm">
                  No
                </Button>
                <Button className="bg-[#038167] hover:bg-[#038167]/90" size="sm">
                  Yes
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowMatchBuyerDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-[#038167] hover:bg-[#038167]/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Match Buyer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  )
}