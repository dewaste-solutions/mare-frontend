"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardWalkthroughButton } from "@/components/onboarding/dashboard-walkthrough-button"
import { BarChart, Map, FileText, Users } from "lucide-react"

export function CommunityOfficerDashboard() {
  return (
    <div className="space-y-6">
      <div id="dashboard-header" className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Officer Dashboard</h1>
          <p className="text-muted-foreground">Overview of your community's waste management activities and metrics.</p>
        </div>
        <DashboardWalkthroughButton />
      </div>

      <div id="community-stats" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Households</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+15 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <FileText className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Requires your review</p>
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
            <div className="text-2xl font-bold">3.5 tons</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Rating</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <BarChart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2/5.0</div>
            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4" id="community-map">
          <CardHeader>
            <CardTitle>Community Map</CardTitle>
            <CardDescription>Waste collection points and status</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full flex items-center justify-center border rounded-md">
              <Map className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3" id="pending-applications">
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
            <CardDescription>Recent applications requiring your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Maria Gonzales</p>
                  <p className="text-sm text-muted-foreground">Submitted 2 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Jose Rizal</p>
                  <p className="text-sm text-muted-foreground">Submitted 3 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Elena Santos</p>
                  <p className="text-sm text-muted-foreground">Submitted 4 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card id="community-engagement">
          <CardHeader>
            <CardTitle>Community Engagement</CardTitle>
            <CardDescription>Participation metrics for your community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center border rounded-md">
              <BarChart className="h-16 w-16 text-muted-foreground" />
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
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                Review Applications
              </div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                Send Community Announcement
              </div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                View Collection Schedule
              </div>
              <div className="bg-secondary p-3 rounded-md cursor-pointer hover:bg-secondary/80">
                Generate Community Report
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
