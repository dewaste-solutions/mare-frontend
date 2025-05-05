"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardWalkthroughButton } from "@/components/onboarding/dashboard-walkthrough-button"
import { BarChart, Calendar, Users, TrendingUp } from "lucide-react"

export function FranchiseeDashboard() {
  return (
    <div className="space-y-6">
      <div id="dashboard-header" className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Franchisee Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your franchisee operations and key performance indicators.
          </p>
        </div>
        <DashboardWalkthroughButton />
      </div>

      <div id="franchisee-stats" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Collections</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">All workers on duty</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Material Collected</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 tons</div>
            <p className="text-xs text-muted-foreground">+15% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱12,450</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4" id="revenue-chart">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Your revenue trends over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full flex items-center justify-center border rounded-md">
              <TrendingUp className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3" id="worker-status">
          <CardHeader>
            <CardTitle>Worker Status</CardTitle>
            <CardDescription>Current status of your collection team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">Juan Dela Cruz</p>
                  <p className="text-sm text-muted-foreground">Route 3 - On schedule</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">Maria Santos</p>
                  <p className="text-sm text-muted-foreground">Route 5 - On schedule</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">Pedro Reyes</p>
                  <p className="text-sm text-muted-foreground">Route 2 - Slight delay</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card id="collection-schedule">
          <CardHeader>
            <CardTitle>Collection Schedule</CardTitle>
            <CardDescription>Upcoming collection schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Barangay San Antonio</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 8:00 AM - 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Barangay Poblacion</p>
                  <p className="text-sm text-muted-foreground">Wednesday, 9:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Barangay Sta. Cruz</p>
                  <p className="text-sm text-muted-foreground">Thursday, 1:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">Assign New Route</div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                View Worker Details
              </div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                Update Collection Schedule
              </div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">Generate Reports</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
