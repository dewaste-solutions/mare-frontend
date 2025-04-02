"use client"
import Link from "next/link"
import { Menu, Recycle, Search, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { NotificationsDropdown } from "@/components/notifications-dropdown"

interface HeaderProps {
  toggleNavigation: () => void
  showMobileNav: boolean
  setShowMobileNav: (show: boolean) => void
  searchQuery?: string
  setSearchQuery?: (query: string) => void
  notifications?: any[]
  showSearch?: boolean
  showSidebar?: boolean
}

export function Header({
  toggleNavigation,
  showMobileNav,
  setShowMobileNav,
  searchQuery = "",
  setSearchQuery,
  notifications = [],
  showSearch = true,
  showSidebar = true,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNavigation}
            className="md:hidden hover:bg-gray-100"
            title="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
              <Recycle className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
              MARE!
            </span>
          </Link>
        </div>

        {showSearch && (
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <NotificationsDropdown notifications={notifications} />

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-[#038167] text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Juan Dela Cruz</p>
                  <p className="text-xs text-gray-500">Franchisee</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

