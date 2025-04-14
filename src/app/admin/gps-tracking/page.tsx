"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Download, Layers, MapPin, User, Clock } from "lucide-react"

// Define types for worker data
type WorkerStatus = 'active' | 'inactive';

interface Worker {
  id: number;
  name: string;
  status: WorkerStatus;
  route: string;
  lastUpdate: string;
  batteryLevel: number;
  collectionsCompleted: number;
  collectionsTotal: number;
}

// Sample worker data
const workers: Worker[] = [
  {
    id: 1,
    name: "John Doe",
    status: "active",
    route: "North District Route",
    lastUpdate: "2 minutes ago",
    batteryLevel: 85,
    collectionsCompleted: 12,
    collectionsTotal: 20,
  },
  {
    id: 2,
    name: "Jane Smith",
    status: "active",
    route: "Central District Route",
    lastUpdate: "5 minutes ago",
    batteryLevel: 72,
    collectionsCompleted: 18,
    collectionsTotal: 18,
  },
  {
    id: 3,
    name: "Mike Johnson",
    status: "inactive",
    route: "South District Route",
    lastUpdate: "1 hour ago",
    batteryLevel: 15,
    collectionsCompleted: 8,
    collectionsTotal: 20,
  },
  {
    id: 4,
    name: "Sarah Williams",
    status: "active",
    route: "East District Route",
    lastUpdate: "10 minutes ago",
    batteryLevel: 65,
    collectionsCompleted: 5,
    collectionsTotal: 15,
  },
]

export default function GPSTrackingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedWorker, setSelectedWorker] = useState<number | null>(null)

  // Filter workers based on active tab
  const filteredWorkers = workers.filter((worker) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return worker.status === "active"
    if (activeTab === "inactive") return worker.status === "inactive"
    return true
  })

  const getStatusColor = (status: WorkerStatus): string => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getBatteryColor = (level: number): string => {
    if (level > 70) return "text-green-500"
    if (level > 30) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <DashboardLayout role="admin" title="Pushcart GPS & Coverage Tracker" subtitle="Track waste workers in real-time">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Live Tracking Map</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Layers className="h-4 w-4 mr-2" />
                  Map Layers
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-gray-100 rounded-md flex items-center justify-center relative">
                <div className="text-gray-500">Map visualization will be displayed here</div>

                {/* Sample map markers */}
                <div className="absolute top-1/4 left-1/3 text-green-500 animate-pulse">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="absolute top-1/3 left-1/2 text-green-500 animate-pulse">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="absolute top-2/3 left-1/4 text-red-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="absolute top-1/2 left-2/3 text-green-500 animate-pulse">
                  <MapPin className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coverage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-gray-500">Active Workers</h3>
                  <p className="text-3xl font-bold text-[#038167] mt-2">
                    {workers.filter((w) => w.status === "active").length}/{workers.length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-gray-500">Coverage Today</h3>
                  <p className="text-3xl font-bold text-[#038167] mt-2">68%</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-medium text-gray-500">Collection Points</h3>
                  <p className="text-3xl font-bold text-[#038167] mt-2">87</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Workers List */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Workers</CardTitle>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px] h-8">
                  <SelectValue placeholder="Filter by route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Routes</SelectItem>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="central">Central District</SelectItem>
                  <SelectItem value="south">South District</SelectItem>
                  <SelectItem value="east">East District</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="flex-1">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="inactive" className="flex-1">
                    Inactive
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab}>
                  <div className="space-y-3">
                    {filteredWorkers.map((worker) => (
                      <div
                        key={worker.id}
                        className={`p-3 rounded-lg border ${
                          selectedWorker === worker.id ? "border-[#038167] bg-[#e6f3f1]" : "border-gray-200"
                        } cursor-pointer`}
                        onClick={() => setSelectedWorker(worker.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{worker.name}</p>
                              <p className="text-xs text-gray-500">{worker.route}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(worker.status)}>
                            {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-gray-600">{worker.lastUpdate}</span>
                          </div>
                          <div className="flex items-center justify-end">
                            <span className={`font-medium ${getBatteryColor(worker.batteryLevel)}`}>
                              {worker.batteryLevel}% Battery
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-600">
                              {worker.collectionsCompleted}/{worker.collectionsTotal} Collections
                            </span>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button variant="ghost" size="sm" className="h-6 p-0 text-xs text-[#038167]">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Export Data */}
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Tracking Data
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}