"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardWalkthroughButton } from "@/components/onboarding/dashboard-walkthrough-button"
import { BarChart, LineChart, PieChart } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div id="dashboard-header" className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your waste management system and key performance indicators.
          </p>
        </div>
        <DashboardWalkthroughButton />
      </div>

      <div id="dashboard-stats" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
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
            <div className="text-2xl font-bold">12.5 tons</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱245,670</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4" id="performance-chart">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Collection efficiency over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full flex items-center justify-center border rounded-md">
              <LineChart className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3" id="recent-activities">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New worker registered</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Collection route completed</p>
                  <p className="text-sm text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Material price updated</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div id="quick-actions" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Material Distribution</CardTitle>
            <CardDescription>Breakdown of collected materials by type</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-[200px] w-[200px] flex items-center justify-center">
              <PieChart className="h-16 w-16 text-muted-foreground" />
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
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">Add New User</div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                Update Material Prices
              </div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">View Reports</div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">Manage Routes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Server Status</span>
                <span className="text-green-500 font-medium">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="text-green-500 font-medium">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <span>GPS Tracking</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Backup</span>
                <span className="text-gray-500 font-medium">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
