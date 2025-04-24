"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CollectionPoint, CollectionStatus } from "@/types"
import { MapPin, Layers, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"

interface CollectionMapProps {
  collectionPoints: CollectionPoint[]
  onPointClick?: (point: CollectionPoint) => void
  interactive?: boolean
  height?: string
}

// Define a type for tab values
type TabValue = "all" | CollectionStatus;

export function CollectionMap({
  collectionPoints,
  onPointClick,
  interactive = true,
  height = "600px",
}: CollectionMapProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("all")
  const [filteredPoints, setFilteredPoints] = useState<CollectionPoint[]>(collectionPoints)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // Filter points based on active tab
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredPoints(collectionPoints)
    } else {
      setFilteredPoints(collectionPoints.filter((point) => point.status === activeTab))
    }
  }, [activeTab, collectionPoints])

  // In a real implementation, you would use a mapping library like Mapbox, Google Maps, or Leaflet
  // For this example, we'll create a placeholder that shows how the map would work

  const getStatusColor = (status: CollectionStatus) => {
    switch (status) {
      case "collected":
        return "bg-green-500"
      case "missed":
        return "bg-red-500"
      case "pending":
      default:
        return "bg-gray-400"
    }
  }

  const getStatusLabel = (status: CollectionStatus) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Collection Map</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="mb-4" onValueChange={(value) => setActiveTab(value as TabValue)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="collected">Collected</TabsTrigger>
            <TabsTrigger value="missed">Missed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative" style={{ height }}>
          {/* Map Container */}
          <div ref={mapContainerRef} className="w-full h-full bg-gray-100 rounded-md overflow-hidden relative">
            {/* Map Placeholder - In a real implementation, this would be replaced with an actual map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Map would render here with real mapping library</p>
            </div>

            {/* Map Controls */}
            {interactive && (
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md">
                  <Layers className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Collection Points */}
            <div className="absolute inset-0">
              {/* This is a placeholder for the map markers */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPoints.map((point) => (
                  <div
                    key={point.id}
                    className="bg-white p-3 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onPointClick && onPointClick(point)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 p-2 rounded-full ${getStatusColor(point.status)}`}>
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{point.address}</p>
                        <div className="flex items-center mt-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${getStatusColor(point.status)} mr-1`}
                          ></span>
                          <span className="text-xs text-gray-500">{getStatusLabel(point.status)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {point.scheduledTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md">
            <p className="text-xs font-medium mb-2">Status Legend</p>
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs">Collected</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span className="text-xs">Missed</span>
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
                <span className="text-xs">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}