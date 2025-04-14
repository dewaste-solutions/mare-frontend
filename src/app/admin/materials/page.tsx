"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Recycle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample materials data
const materials = [
  {
    id: 1,
    name: "PET Bottles",
    category: "Plastic",
    description: "Clear plastic bottles used for beverages",
    pricePerKg: 15.0,
    lastUpdated: "2023-04-15",
  },
  {
    id: 2,
    name: "Cardboard",
    category: "Paper",
    description: "Corrugated cardboard boxes and packaging",
    pricePerKg: 8.5,
    lastUpdated: "2023-04-10",
  },
  {
    id: 3,
    name: "Aluminum Cans",
    category: "Metal",
    description: "Beverage cans made of aluminum",
    pricePerKg: 25.0,
    lastUpdated: "2023-04-12",
  },
  {
    id: 4,
    name: "Glass Bottles",
    category: "Glass",
    description: "Clear or colored glass bottles",
    pricePerKg: 5.0,
    lastUpdated: "2023-04-08",
  },
  {
    id: 5,
    name: "HDPE Plastic",
    category: "Plastic",
    description: "High-density polyethylene plastic containers",
    pricePerKg: 12.0,
    lastUpdated: "2023-04-14",
  },
]

// Material categories
const categories = ["Plastic", "Paper", "Metal", "Glass", "E-waste", "Organic", "Hazardous"]

export default function MaterialsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddMaterialDialog, setShowAddMaterialDialog] = useState(false)

  // Filter materials based on active tab and search query
  const filteredMaterials = materials.filter((material) => {
    const matchesTab = activeTab === "all" || material.category.toLowerCase() === activeTab.toLowerCase()
    const matchesSearch =
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getCategoryColor = (category:string) => {
    switch (category) {
      case "Plastic":
        return "bg-blue-100 text-blue-800"
      case "Paper":
        return "bg-yellow-100 text-yellow-800"
      case "Metal":
        return "bg-gray-100 text-gray-800"
      case "Glass":
        return "bg-purple-100 text-purple-800"
      case "E-waste":
        return "bg-red-100 text-red-800"
      case "Organic":
        return "bg-green-100 text-green-800"
      case "Hazardous":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout
      role="admin"
      title="Materials & Pricing Management"
      subtitle="Set and update prices for waste materials"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Material Pricing</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search materials..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-[#038167] hover:bg-[#038167]/90" onClick={() => setShowAddMaterialDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="plastic">Plastic</TabsTrigger>
              <TabsTrigger value="paper">Paper</TabsTrigger>
              <TabsTrigger value="metal">Metal</TabsTrigger>
              <TabsTrigger value="glass">Glass</TabsTrigger>
              <TabsTrigger value="e-waste">E-waste</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-sm font-medium text-gray-500">
                      <th className="py-3 px-4 text-left">Material</th>
                      <th className="py-3 px-4 text-left">Category</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-left">Price per KG</th>
                      <th className="py-3 px-4 text-left">Last Updated</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMaterials.map((material) => (
                      <tr key={material.id} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Recycle className="h-4 w-4 text-[#038167]" />
                            <span className="font-medium">{material.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getCategoryColor(material.category)}>{material.category}</Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{material.description}</td>
                        <td className="py-3 px-4 font-medium">₱{material.pricePerKg.toFixed(2)}</td>
                        <td className="py-3 px-4 text-gray-600">{material.lastUpdated}</td>
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
                                Edit Price
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
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

      {/* Add Material Dialog */}
      <Dialog open={showAddMaterialDialog} onOpenChange={setShowAddMaterialDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
            <DialogDescription>Add a new recyclable material and set its price.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="material-name" className="text-right">
                Material Name
              </Label>
              <Input id="material-name" placeholder="Material Name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" placeholder="Description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price per KG
              </Label>
              <div className="col-span-3 flex items-center">
                <span className="mr-2">₱</span>
                <Input id="price" type="number" placeholder="0.00" step="0.01" min="0" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMaterialDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-[#038167] hover:bg-[#038167]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
