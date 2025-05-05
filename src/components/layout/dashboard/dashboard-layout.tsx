"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RoleBasedNavigation } from "@/components/shared/navigation/role-based-navigation"
import { UserHeader } from "@/components/shared/user-header"
import { DashboardWalkthroughButton } from "@/components/onboarding/dashboard-walkthrough-button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user } = useAuth()

  // Close sidebar when screen size changes to avoid sidebar being open on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle clicks outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isSidebarOpen])

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isSidebarOpen])

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div id="sidebar-nav" className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r">
        <RoleBasedNavigation role={user.role as any} />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div id="mobile-sidebar" className="lg:hidden fixed inset-0 z-40 flex" onClick={(e) => e.stopPropagation()}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <RoleBasedNavigation
              role={user.role as any}
              isMobile={true}
              onCloseMobile={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 bg-white border-b" id="dashboard-header">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                id="sidebar-toggle"
                type="button"
                className="lg:hidden px-4 text-gray-500 focus:outline-none"
                onClick={() => setIsSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <DashboardWalkthroughButton variant="outline" size="sm" />
              <UserHeader user={user} />
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
