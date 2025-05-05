"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Recycle,
  Users,
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
  BarChart3,
  Home,
  DollarSign,
  AlertCircle,
  Layers,
  LineChart,
  Route,
  Package,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type UserRole = "franchisee" | "community-officer" | "admin" | "worker" | "manager" | "buyer"

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: number
  section?: string
}

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
  const router = useRouter()
  const { logout } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLinkClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile()
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = async () => {
    setShowLogoutConfirm(false)
    await logout()
    router.push("/login")
  }

  // Get navigation items based on role
  const getNavItems = (): { section: string; items: NavItem[] }[] => {
    switch (role) {
      case "admin":
        return [
          {
            section: "Administration",
            items: [
              { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
              { name: "Analytics", href: "/admin/analytics", icon: LineChart },
              { name: "User Management", href: "/admin/user-management", icon: UserCog },
              { name: "Invitations", href: "/admin/invites", icon: Mail },
              { name: "Applications", href: "/admin/applications", icon: BadgeCheck, badge: 5 },
            ],
          },
          {
            section: "Location & Scheduling",
            items: [
              { name: "Barangay Settings", href: "/admin/barangay-settings", icon: Map },
              { name: "Schedule & Routes", href: "/admin/schedules", icon: Calendar },
              { name: "GPS Tracking", href: "/admin/gps-tracking", icon: Truck },
            ],
          },
          {
            section: "Materials & Sales",
            items: [
              { name: "Materials & Pricing", href: "/admin/materials", icon: Recycle },
              { name: "Offers & Coupons", href: "/admin/offers", icon: BadgePercent },
              { name: "Sales Matching", href: "/admin/sales", icon: ShoppingCart },
            ],
          },
          {
            section: "Support & Reporting",
            items: [
              { name: "Complaint Ticketing", href: "/admin/complaints", icon: Ticket, badge: 3 },
              { name: "Reports & Exports", href: "/admin/reports", icon: FileText },
            ],
          },
        ]
      case "franchisee":
        return [
          {
            section: "Operations",
            items: [
              { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
              { name: "My Communities", href: "/franchisee/communities", icon: Home },
              { name: "Workers", href: "/franchisee/workers", icon: Users },
              { name: "Collection Schedule", href: "/franchisee/schedule", icon: Calendar },
            ],
          },
          {
            section: "Waste Management",
            items: [
              { name: "Pre-Processing", href: "/franchisee/preprocessing", icon: Layers },
              { name: "Sales Management", href: "/franchisee/sales", icon: DollarSign, badge: 2 },
              { name: "Offers & Coupons", href: "/franchisee/offers", icon: BadgePercent },
            ],
          },
          {
            section: "Support & Reporting",
            items: [
              { name: "Complaints", href: "/franchisee/complaints", icon: AlertCircle, badge: 3 },
              { name: "Reports", href: "/franchisee/reports", icon: FileText },
            ],
          },
        ]
      case "community-officer":
        return [
          {
            section: "Community",
            items: [
              { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
              { name: "Applications", href: "/community-officer/applications", icon: BadgeCheck, badge: 3 },
              { name: "Invites", href: "/community-officer/invites", icon: Mail },
              { name: "Members", href: "/community-officer/members", icon: Users },
              { name: "Events", href: "/community-officer/events", icon: Calendar },
            ],
          },
        ]
      case "worker":
        return [
          {
            section: "Work",
            items: [
              { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
              { name: "Today's Route", href: "/worker/route", icon: Route },
              { name: "Reports", href: "/worker/reports", icon: FileText },
            ],
          },
        ]
      case "manager":
        return [
          {
            section: "Management",
            items: [
              { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
              { name: "Map", href: "/manager/map", icon: Map },
              { name: "Performance", href: "/manager/performance", icon: LineChart },
              { name: "Workers", href: "/manager/workers", icon: Users },
              { name: "Alerts", href: "/manager/alerts", icon: Bell, badge: 3 },
            ],
          },
        ]
      case "buyer":
        return [
          {
            section: "Purchasing",
            items: [
              { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
              { name: "Available Lots", href: "/buyer/lots", icon: Package },
              { name: "My Purchases", href: "/buyer/purchases", icon: ShoppingCart },
            ],
          },
        ]
      default:
        return []
    }
  }

  const navSections = getNavItems()

  return (
    <>
      <div className="p-6 border-b">
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt="MARE Logo" className="h-8" />
        </Link>
        <div className="mt-2 text-xs text-gray-500">
          Logged in as <span className="font-medium capitalize">{role.replace("-", " ")}</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.section} className="mb-6">
            <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">{section.section}</div>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                      isActive(item.href) ? "bg-[#e6f3f1] text-[#038167]" : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.badge && <Badge className="ml-auto bg-[#038167]">{item.badge}</Badge>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Settings for all roles */}
        <div className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">Account</div>
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
              <span>Profile Settings</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          onClick={() => setShowLogoutConfirm(true)}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Log out</span>
        </Button>
      </div>

      <AlertDialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to log out of your account?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-[#038167] hover:bg-[#026853]">
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
