"use client"

import { useState, useEffect } from "react"
import {
  BarChart3,
  Users,
  Recycle,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Download,
  Plus,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { ToastProvider } from "@/components/ui/toast"
import { useMediaQuery } from "@/hooks/use-media-query"

// Import components
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { RecordCollectionModal, AddEventModal } from "@/components/modals/dashboard-modals"
import { Header } from "@/components/layout/header"

// Import data
import { stats, recentActivities, upcomingEvents, notifications, materialTypes } from "@/app/data/dashboard-data"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [showRecordCollectionModal, setShowRecordCollectionModal] = useState(false)
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Set initial sidebar state based on screen size
  useEffect(() => {
    setShowSidebar(!isMobile)
  }, [isMobile])

  // Navigation toggle function
  const toggleNavigation = () => {
    if (isMobile) {
      setShowMobileNav(!showMobileNav)
    } else {
      setShowSidebar((prev) => !prev)
    }
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "collection":
        return <Recycle className="h-4 w-4 text-[#038167]" />
      case "member":
        return <Users className="h-4 w-4 text-[#F69C91]" />
      case "revenue":
        return <TrendingUp className="h-4 w-4 text-[#FFC539]" />
      case "event":
        return <Calendar className="h-4 w-4 text-[#F69C91]" />
      default:
        return null
    }
  }

  return (
    <ToastProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Dashboard Layout */}
          <div className="flex flex-1">
            {/* Sidebar - Desktop */}
            <aside
              className={`${
                showSidebar ? "flex" : "hidden"
              } md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300`}
            >
              <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <Header
                toggleNavigation={toggleNavigation}
                showMobileNav={showMobileNav}
                setShowMobileNav={setShowMobileNav}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                notifications={notifications}
                showSidebar={showSidebar}
              />

              {/* Dashboard Content */}
              <main className="p-6 flex-1">
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
                          <Button variant="outline" size="sm" className="text-xs">
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
                          <Button variant="ghost" size="sm" className="text-[#038167]">
                            View All
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                {getActivityIcon(activity.type)}
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => setShowAddEventModal(true)}
                          >
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

                        <Button variant="ghost" size="sm" className="w-full mt-4 text-[#038167]">
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
                            <Progress value={95} className="h-2 bg-gray-300">
                              <div className="h-full bg-[#038167]" style={{ width: '95%' }}></div>
                            </Progress>
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
                              <Button
                                className="bg-[#038167] hover:bg-[#038167]/90 text-white"
                                onClick={() => setShowRecordCollectionModal(true)}
                              >
                                Record Collection
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add a new waste collection record</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="border-[#F69C91] text-[#F69C91] hover:bg-[#F69C91]/10"
                              >
                                Generate Report
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Create a new collection report</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="border-[#FFC539] text-[#FFC539] hover:bg-[#FFC539]/10"
                              >
                                Add Member
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add a new community member</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                className="border-[#038167] text-[#038167] hover:bg-[#038167]/10"
                                onClick={() => setShowAddEventModal(true)}
                              >
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

          {/* Modals */}
          <RecordCollectionModal open={showRecordCollectionModal} onOpenChange={setShowRecordCollectionModal} />

          <AddEventModal open={showAddEventModal} onOpenChange={setShowAddEventModal} />

          {/* Mobile Navigation Sheet */}
          <Sheet open={showMobileNav} onOpenChange={setShowMobileNav}>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobile={true}
                onCloseMobile={() => setShowMobileNav(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </TooltipProvider>
    </ToastProvider>
  )
}

