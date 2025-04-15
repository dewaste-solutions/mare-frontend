"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, AlertTriangle, ShoppingCart, Map, Calendar, ArrowUpRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin" title="Admin Dashboard" subtitle="Monitor system performance and key metrics">
      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Collections</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,248 kg</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">
                +12%
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">843</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">
                +5%
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. previous month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Workers</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">32</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">
                +2
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Tickets</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-red-500">
                +3
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">3 high priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Heatmap */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Route Heatmap</CardTitle>
            <Button variant="outline" size="sm" className="h-8">
              <Map className="h-4 w-4 mr-2" />
              View Full Map
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-gray-500">Map visualization will be displayed here</div>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">System Alerts</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-[#038167]">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm font-medium text-red-800">Worker GPS offline</p>
                </div>
                <p className="text-xs text-red-700 mt-1">Worker ID: W-2345 has been offline for 2 hours</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                  <p className="text-sm font-medium text-yellow-800">Collection delay</p>
                </div>
                <p className="text-xs text-yellow-700 mt-1">Barangay 123 collection delayed by 45 minutes</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm font-medium text-blue-800">System update</p>
                </div>
                <p className="text-xs text-blue-700 mt-1">System maintenance scheduled for tonight at 2 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Routes */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Today's Routes</CardTitle>
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="h-4 w-4 mr-2" />
            View Schedule
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">North District Route</p>
                  <p className="text-xs text-gray-500 mt-1">Assigned to: John Doe</p>
                </div>
                <span className="text-xs font-medium text-blue-500">75%</span>
              </div>
              <div className="mt-2">
                <Progress value={75} className="h-1.5" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">15/20 collections</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-[#038167] p-0">
                  Details
                </Button>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Central District Route</p>
                  <p className="text-xs text-gray-500 mt-1">Assigned to: Jane Smith</p>
                </div>
                <span className="text-xs font-medium text-green-500">100%</span>
              </div>
              <div className="mt-2">
                <Progress value={100} className="h-1.5" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">18/18 collections</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-[#038167] p-0">
                  Details
                </Button>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">South District Route</p>
                  <p className="text-xs text-gray-500 mt-1">Assigned to: Mike Johnson</p>
                </div>
                <span className="text-xs font-medium text-blue-500">40%</span>
              </div>
              <div className="mt-2">
                <Progress value={40} className="h-1.5" />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">8/20 collections</span>
                <Button variant="ghost" size="sm" className="h-6 text-xs text-[#038167] p-0">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Map className="h-8 w-8 text-[#038167] mb-2" />
              <p className="text-sm font-medium">Barangay Settings</p>
            </CardContent>
          </Card>
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Calendar className="h-8 w-8 text-[#038167] mb-2" />
              <p className="text-sm font-medium">Schedule & Routes</p>
            </CardContent>
          </Card>
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Users className="h-8 w-8 text-[#038167] mb-2" />
              <p className="text-sm font-medium">User Management</p>
            </CardContent>
          </Card>
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <ShoppingCart className="h-8 w-8 text-[#038167] mb-2" />
              <p className="text-sm font-medium">Sales Matching</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
