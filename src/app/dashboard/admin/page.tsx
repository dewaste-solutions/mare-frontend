"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Users,
  Recycle,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Download,
  Plus,
  CheckCircle,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showMobileNav, setShowMobileNav] = useState(false)

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Collections",
      value: "2,845 kg",
      change: "+12.5%",
      trend: "up",
      description: "from last month",
    },
    {
      title: "Diversion Rate",
      value: "85%",
      change: "+3.2%",
      trend: "up",
      description: "from last month",
    },
    {
      title: "Revenue Generated",
      value: "₱45,320",
      change: "+8.1%",
      trend: "up",
      description: "from last month",
    },
    {
      title: "Community Members",
      value: "1,245",
      change: "+24",
      trend: "up",
      description: "new this month",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "collection",
      title: "Waste Collection Completed",
      description: "Barangay San Isidro - 320kg collected",
      time: "2 hours ago",
      icon: <Recycle className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      type: "member",
      title: "New Community Member",
      description: "Juan Dela Cruz joined your community",
      time: "Yesterday",
      icon: <Users className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      type: "revenue",
      title: "Revenue Received",
      description: "₱12,450 from recyclable materials",
      time: "2 days ago",
      icon: <TrendingUp className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      type: "event",
      title: "Community Workshop",
      description: "Waste Segregation Training scheduled",
      time: "3 days ago",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Waste Collection Day",
      date: "Tomorrow, 8:00 AM",
      location: "Barangay San Isidro",
    },
    {
      id: 2,
      title: "Community Meeting",
      date: "May 15, 2:00 PM",
      location: "MARE! Center",
    },
    {
      id: 3,
      title: "Recycling Workshop",
      date: "May 20, 9:00 AM",
      location: "Community Hall",
    },
  ]

  // Update the material types colors to match our new color scheme
  const materialTypes = [
    { name: "Plastic", percentage: 35, color: "bg-primary-500" },
    { name: "Paper", percentage: 25, color: "bg-secondary-500" },
    { name: "Metal", percentage: 15, color: "bg-tertiary-500" },
    { name: "Glass", percentage: 10, color: "bg-primary-700" },
    { name: "Organic", percentage: 15, color: "bg-secondary-700" },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Layout */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
            <div className="p-6 border-b">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
                  <Recycle className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
                  MARE!
                </span>
              </Link>
            </div>

            <nav className="flex-1 p-4">
              <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Main</div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "overview" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Overview</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard?tab=collections"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "collections" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveTab("collections")}
                  >
                    <Recycle className="h-5 w-5" />
                    <span>Collections</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard?tab=community"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "community" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveTab("community")}
                  >
                    <Users className="h-5 w-5" />
                    <span>Community</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/invites"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <Users className="h-5 w-5" />
                    <span>Invites</span>
                    <Badge className="ml-auto bg-[#038167]">3</Badge>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Management</div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard?tab=reports"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "reports" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveTab("reports")}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Reports</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard?tab=settings"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "settings" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-[#038167] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">Juan Dela Cruz</p>
                  <p className="text-xs text-gray-500 truncate">Franchisee</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button color="ghost" size="large" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex items-center justify-between p-4">
                <div className="md:hidden flex items-center gap-2">
                  <Button color="ghost" size="large" onClick={() => setShowMobileNav(true)}>
                    <Menu className="h-5 w-5" />
                  </Button>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
                      <Recycle className="h-4 w-4" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
                      MARE!
                    </span>
                  </Link>
                </div>

                <div className="relative w-full max-w-md hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200 focus:bg-white" />
                </div>

                <div className="flex items-center gap-3">
                  <Button color="outline" size="large" className="relative">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#038167] text-white text-[10px] flex items-center justify-center">
                      3
                    </span>
                  </Button>

                  <Avatar className="h-8 w-8 md:hidden">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-[#038167] text-white">JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <main className="p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600">Welcome back, Juan! Here's what's happening with your MARE! Center.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                          <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                        </div>
                        <div
                          className={`flex items-center text-xs font-medium ${stat.trend === "up" ? "text-[#038167]" : "text-[#F69C91]"}`}
                        >
                          {stat.change}
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="h-3 w-3 ml-1" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3 ml-1 transform rotate-180" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Collection Performance */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Collection Performance</CardTitle>
                          <CardDescription>Monthly waste collection by material type</CardDescription>
                        </div>
                        <Button color="outline" size="small" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Chart visualization would appear here</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                        {materialTypes.map((material, index) => (
                          <div key={index} className="text-center">
                            <div className="flex justify-center mb-2">
                              <div className={`h-3 w-3 rounded-full ${material.color}`}></div>
                            </div>
                            <p className="text-xs font-medium text-gray-700">{material.name}</p>
                            <p className="text-sm font-bold">{material.percentage}%</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activities */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Activities</CardTitle>
                        <Button color="ghost" size="small" className="text-[#038167]">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                              {activity.type === "collection" && <Recycle className="h-4 w-4 text-[#038167]" />}
                              {activity.type === "member" && <Users className="h-4 w-4 text-[#F69C91]" />}
                              {activity.type === "revenue" && <TrendingUp className="h-4 w-4 text-[#FFC539]" />}
                              {activity.type === "event" && <Calendar className="h-4 w-4 text-[#F69C91]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                              <p className="text-xs text-gray-500">{activity.description}</p>
                            </div>
                            <div className="text-xs text-gray-400">{activity.time}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Upcoming Events */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Upcoming Events</CardTitle>
                        <Button color ="outline" size="small" className="text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Event
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC539]/20">
                                <Calendar className="h-5 w-5 text-[#FFC539]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-800">{event.title}</p>
                                <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                                <p className="text-xs text-gray-500">{event.location}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button color="ghost" size="small" className="w-full mt-4 text-[#038167]">
                        View Calendar
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Diversion Goal */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Diversion Goal</CardTitle>
                      <CardDescription>Monthly target: 3,000 kg</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Progress</span>
                            <span>2,845 / 3,000 kg</span>
                          </div>
                          <Progress value={95} className="h-2 bg-[#038167]" />
                        </div>

                        <div className="p-4 bg-[#038167]/10 rounded-lg">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-[#038167] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#038167]">On Track!</p>
                              <p className="text-xs text-gray-600 mt-1">
                                You're 95% toward your monthly goal with 5 days remaining.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button className="bg-[#038167] hover:bg-[#038167]/90 text-white">Record Collection</Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add a new waste collection record</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button color ="outline" className="border-[#F69C91] text-[#F69C91] hover:bg-[#F69C91]/10">
                              Generate Report
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Create a new collection report</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button color ="outline" className="border-[#FFC539] text-[#FFC539] hover:bg-[#FFC539]/10">
                              Add Member
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add a new community member</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button color ="outline" className="border-[#038167] text-[#038167] hover:bg-[#038167]/10">
                              Schedule Event
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Create a new community event</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </div>
        {/* Mobile Navigation Sheet */}
        <Sheet open={showMobileNav} onOpenChange={setShowMobileNav}>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 border-b">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
                  <Recycle className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
                  MARE!
                </span>
              </Link>
            </div>

            <nav className="flex-1 p-4">
              <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Main</div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "overview" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => {
                      setActiveTab("overview")
                      setShowMobileNav(false)
                    }}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Overview</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard?tab=collections"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "collections" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => {
                      setActiveTab("collections")
                      setShowMobileNav(false)
                    }}
                  >
                    <Recycle className="h-5 w-5" />
                    <span>Collections</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard?tab=community"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "community" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => {
                      setActiveTab("community")
                      setShowMobileNav(false)
                    }}
                  >
                    <Users className="h-5 w-5" />
                    <span>Community</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/invites"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                    onClick={() => setShowMobileNav(false)}
                  >
                    <Users className="h-5 w-5" />
                    <span>Invites</span>
                    <Badge className="ml-auto bg-[#038167]">3</Badge>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Management</div>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard?tab=reports"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "reports" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => {
                      setActiveTab("reports")
                      setShowMobileNav(false)
                    }}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Reports</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard?tab=settings"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${activeTab === "settings" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"}`}
                    onClick={() => {
                      setActiveTab("settings")
                      setShowMobileNav(false)
                    }}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="p-4 border-t">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-[#038167] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">Juan Dela Cruz</p>
                  <p className="text-xs text-gray-500 truncate">Franchisee</p>
                </div>
                <Button color ="ghost" size="small" className="h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  )
}

