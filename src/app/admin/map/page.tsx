"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CollectionMap } from "@/components/map/collection-map"
import { Button } from "@/components/ui/button"
import { Filter, Download, Layers } from "lucide-react"
import type { CollectionPoint } from "@/types"

// Sample collection points for the map
const sampleCollectionPoints: CollectionPoint[] = [
  {
    id: "1",
    address: "123 Main St, City",
    coordinates: { lat: 14.5995, lng: 120.9842 },
    status: "collected",
    scheduledTime: new Date("2023-05-15T09:00:00"),
    collectedTime: new Date("2023-05-15T09:15:00"),
    collectedBy: "worker-1",
  },
  {
    id: "2",
    address: "456 Elm St, City",
    coordinates: { lat: 14.6036, lng: 120.9822 },
    status: "missed",
    scheduledTime: new Date("2023-05-15T10:00:00"),
  },
  {
    id: "3",
    address: "789 Oak St, City",
    coordinates: { lat: 14.601, lng: 120.9874 },
    status: "pending",
    scheduledTime: new Date("2023-05-15T11:00:00"),
  },
  {
    id: "4",
    address: "101 Pine St, City",
    coordinates: { lat: 14.5975, lng: 120.9862 },
    status: "collected",
    scheduledTime: new Date("2023-05-15T12:00:00"),
    collectedTime: new Date("2023-05-15T12:10:00"),
    collectedBy: "worker-2",
  },
  {
    id: "5",
    address: "202 Maple St, City",
    coordinates: { lat: 14.605, lng: 120.983 },
    status: "pending",
    scheduledTime: new Date("2023-05-15T13:00:00"),
  },
]

export default function AdminMapPage() {
  return (
    <DashboardLayout role="admin" title="Map View" subtitle="View and manage collection points across all locations">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Map Layers</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Collection Points Map</CardTitle>
        </CardHeader>
        <CardContent>
          <CollectionMap collectionPoints={sampleCollectionPoints} height="600px" />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
