"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/use-media-query"
import { RoleBasedNavigation } from "@/components/role-based-navigation"
import { UserHeader } from "@/components/user-header"
import { WalkthroughProvider } from "@/components/walkthrough/walkthrough-context" // 🧠 Import the provider

type UserRole = "franchisee" | "community-officer" | "admin"

interface DashboardLayoutProps {
  children: ReactNode
  role?: UserRole
  title?: string
  subtitle?: string
}

export function DashboardLayout({
  children,
  role = "franchisee",
  title = "Dashboard",
  subtitle = "Welcome back! Here's what's happening with your MARE! Center.",
}: DashboardLayoutProps) {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleNavigation = () => {
    if (isMobile) {
      setShowMobileNav(!showMobileNav)
    } else {
      setShowSidebar(!showSidebar)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768
      setShowSidebar(!isMobileView)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <WalkthroughProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex flex-1">
          <aside
            className={`${
              showSidebar ? "w-64" : "w-0"
            } flex flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 overflow-hidden`}
          >
            <RoleBasedNavigation role={role} />
          </aside>

          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleNavigation}
                    className="hover:bg-gray-100"
                    title="Toggle sidebar"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>

                <div className="relative w-full max-w-md hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <UserHeader role={role} />
              </div>
            </header>

            <main className="p-6 flex-1">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
              </div>

              {children}
            </main>
          </div>
        </div>

        <Sheet open={showMobileNav} onOpenChange={setShowMobileNav}>
          <SheetContent side="left" className="w-64 p-0">
            <RoleBasedNavigation
              role={role}
              isMobile={true}
              onCloseMobile={() => setShowMobileNav(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </WalkthroughProvider>
  )
}
