"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Truck, BarChart3, AlertCircle } from "lucide-react"

export function ManagerDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Manager Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">12 currently on route</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">3 completed today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+4% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">1 high priority</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Worker Performance</CardTitle>
                <CardDescription>Efficiency metrics for the current month</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Performance Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Active Workers</CardTitle>
                <CardDescription>Currently on route</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Worker {i}</p>
                        <p className="text-xs text-muted-foreground">Route #{i + 10} - 65% complete</p>
                      </div>
                      <div className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">On Route</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="workers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Worker Management</CardTitle>
              <CardDescription>Manage your collection workers</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Worker management interface will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and analytics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Performance analytics will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
