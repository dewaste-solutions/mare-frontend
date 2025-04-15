"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Recycle,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Mail,
  FileText,
  Calendar,
  Map,
  Truck,
  UserCog,
  BadgeCheck,
  BadgePercent,
  ShoppingCart,
  Ticket,
  Cog,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type UserRole = "franchisee" | "community-officer" | "admin"

interface RoleBasedNavigationProps {
  role: UserRole
  isMobile?: boolean
  onCloseMobile?: () => void
}

export function RoleBasedNavigation({
  role = "franchisee",
  isMobile = false,
  onCloseMobile,
}: RoleBasedNavigationProps) {
  const pathname = usePathname()

  const handleLinkClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile()
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
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

      <nav className="flex-1 p-4 overflow-y-auto">
        

        {/* Franchisee specific navigation */}
        {role === "franchisee" && (
          <>
            <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Management</div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/franchisee/collections"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/franchisee/collections")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Recycle className="h-5 w-5" />
                  <span>Collections</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/franchisee/community"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/franchisee/community")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/franchisee/reports"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/franchisee/reports") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <FileText className="h-5 w-5" />
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/franchisee/events"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/franchisee/events") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Events</span>
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* Community Officer specific navigation */}
        {role === "community-officer" && (
          <>
            <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Community</div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/community-officer/applications"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/community-officer/applications")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <BadgeCheck className="h-5 w-5" />
                  <span>Applications</span>
                  <Badge className="ml-auto bg-[#038167]">3</Badge>
                </Link>
              </li>
              <li>
                <Link
                  href="/community-officer/invites"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/community-officer/invites")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Mail className="h-5 w-5" />
                  <span>Invites</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/community-officer/members"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/community-officer/members")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Users className="h-5 w-5" />
                  <span>Members</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/community-officer/events"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/community-officer/events")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Events</span>
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* Admin specific navigation - UPDATED with unified navigation */}
        {role === "admin" && (
          <>
            <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Administration</div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin/analytics"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/analytics") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>

              {/* User Management Section */}
              <li>
                <Link
                  href="/admin/user-management"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/user-management") || pathname.includes("/admin/user-management")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <UserCog className="h-5 w-5" />
                  <span>User Management</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/invites"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/invites") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Mail className="h-5 w-5" />
                  <span>Invitations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/applications"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/applications") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <BadgeCheck className="h-5 w-5" />
                  <span>Applications</span>
                  <Badge className="ml-auto bg-[#038167]">5</Badge>
                </Link>
              </li>

              {/* Location & Scheduling Section */}
              <li>
                <Link
                  href="/admin/barangay-settings"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/barangay-settings") || pathname.includes("/admin/barangay")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Map className="h-5 w-5" />
                  <span>Barangay Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/schedules"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/schedules") || pathname.includes("/admin/routes")
                      ? "bg-[#e6f3f1] text-[#038167]"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Schedule & Routes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/gps-tracking"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/gps-tracking") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Truck className="h-5 w-5" />
                  <span>GPS Tracking</span>
                </Link>
              </li>

              {/* Materials & Sales Section */}
              <li>
                <Link
                  href="/admin/materials"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/materials") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Recycle className="h-5 w-5" />
                  <span>Materials & Pricing</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/offers"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/offers") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <BadgePercent className="h-5 w-5" />
                  <span>Offers & Coupons</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/sales"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/sales") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Sales Matching</span>
                </Link>
              </li>

              {/* Support & Reporting Section */}
              <li>
                <Link
                  href="/admin/complaints"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/complaints") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <Ticket className="h-5 w-5" />
                  <span>Complaint Ticketing</span>
                  <Badge className="ml-auto bg-[#038167]">3</Badge>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/reports"
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive("/admin/reports") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={handleLinkClick}
                >
                  <FileText className="h-5 w-5" />
                  <span>Reports & Exports</span>
                </Link>
              </li>
            </ul>
          </>
        )}

        {/* Settings for all roles */}
        <div className="mt-6 mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Settings</div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/settings") ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={handleLinkClick}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900">
          <LogOut className="h-5 w-5 mr-2" />
          <span>Log out</span>
        </Button>
      </div>
    </>
  )
}
