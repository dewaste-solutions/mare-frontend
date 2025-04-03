"use client"
import Link from "next/link"
import { Recycle, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SidebarNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isMobile?: boolean
  onCloseMobile?: () => void
}

export function SidebarNavigation({
  activeTab,
  setActiveTab,
  isMobile = false,
  onCloseMobile,
}: SidebarNavigationProps) {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    if (isMobile && onCloseMobile) {
      onCloseMobile()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
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
              href="/dashboard/admin"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeTab === "overview" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("overview")}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard?tab=collections"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeTab === "collections" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("collections")}
            >
              <Recycle className="h-5 w-5" />
              <span>Collections</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard?tab=community"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeTab === "community" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("community")}
            >
              <Users className="h-5 w-5" />
              <span>Community</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/admin/invites"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeTab === "invites" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("invites")}
            >
              <Users className="h-5 w-5" />
              <span>Invites</span>
              <Badge className="ml-auto bg-[#038167] text-[#ffffff]">3</Badge>
            </Link>
          </li>
        </ul>

        <div className="mt-8 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Management</div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/dashboard?tab=reports"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeTab === "reports" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("reports")}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard?tab=settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                activeTab === "settings" ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick("settings")}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t mt-auto">
        <button className="w-full flex items-center justify-start text-gray-600 hover:text-gray-900 p-2">
          <LogOut className="h-5 w-5 mr-2" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}