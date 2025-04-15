"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, PieChart, LineChart, Download, Calendar } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout role="admin" title="Analytics" subtitle="View performance metrics and data insights">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="workers">Workers</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Custom Range</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Collections</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">1,248</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">+12%</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Waste Collected</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">45.2t</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">+18%</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Worker Efficiency</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">87%</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">+5%</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">₱245,800</h3>
              </div>
              <div className="flex items-center text-xs font-medium text-[#038167]">+15%</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Collections Over Time</CardTitle>
            <CardDescription>Monthly collection trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <LineChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Line chart visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Waste Composition</CardTitle>
            <CardDescription>Breakdown by material type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Pie chart visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Worker Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Worker Performance</CardTitle>
          <CardDescription>Collection efficiency by worker</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Bar chart visualization would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
