"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package, DollarSign, Truck } from "lucide-react"

export function BuyerDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="available">Available Lots</TabsTrigger>
          <TabsTrigger value="purchases">My Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Lots</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+8 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Purchases</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">In the last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-muted-foreground">Year to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Arriving this week</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>Monthly purchase volume</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Purchase Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recommended Lots</CardTitle>
                <CardDescription>Based on your purchase history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-gray-200 mr-3 flex items-center justify-center">
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Plastic Type {i}</p>
                        <p className="text-xs text-muted-foreground">2.5 tons - $1,200</p>
                      </div>
                      <div className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Available</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Waste Lots</CardTitle>
              <CardDescription>Browse and purchase available waste lots</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Available lots will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="purchases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>View your past purchases and deliveries</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Purchase history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
