"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Recycle, X, User, LogOut, LayoutDashboard, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HeaderProps = {
  activeSection?: string
  scrollToSection?: (sectionId: string) => void
}

export default function Header({ activeSection, scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  // Check if user is on dashboard or admin pages
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")

  // Simulate checking if user is logged in
  useEffect(() => {
    // This would typically check for a token or session
    setIsLoggedIn(isAdminPage)
  }, [isAdminPage])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Change header background on scroll
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { id: "about", label: "About" },
    { id: "community", label: "Community" },
    { id: "workers", label: "Our Team" },
    { id: "impact", label: "Impact" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md" : "bg-white/80"} backdrop-blur-md`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
            <Recycle className="h-5 w-5" />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#038167] to-[#026853] opacity-30 blur-sm"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
            MARE!
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {isAdminPage ? (
            // Admin navigation
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors ${pathname === "/dashboard" ? "text-[#038167]" : "text-gray-600 hover:text-[#038167]"}`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/invites"
                className={`text-sm font-medium transition-colors ${pathname === "/admin/invites" ? "text-[#038167]" : "text-gray-600 hover:text-[#038167]"}`}
              >
                Manage Invites
              </Link>
            </>
          ) : (
            // Main site navigation
            navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection && scrollToSection(item.id)}
                className={`group text-sm font-medium transition-colors ${activeSection === item.id ? "text-[#038167]" : "text-gray-600 hover:text-[#038167]"}`}
              >
                {item.label}
                <span
                  className={`block h-0.5 bg-[#038167] transition-all duration-300 ${activeSection === item.id ? "max-w-full" : "max-w-0 group-hover:max-w-full"}`}
                ></span>
              </button>
            ))
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  color="outline"
                  size="lg"
                  className="h-10 w-10 rounded-full border-[#038167]/20 hover:bg-[#038167]/5 hover:text-[#038167] transition-all"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
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
          ) : (
            <>
              <Link href="/login">
                <Button
                  color="outline"
                  className="mr-2 border-[#038167]/20 hover:bg-[#038167]/5 hover:text-[#038167] transition-all"
                >
                  Login
                </Button>
              </Link>
              <Link href="/application-forms" className="hidden md:block">
                <Button className="bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white shadow-md hover:shadow-lg transition-all">
                  Join Our Community
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button className="p-2 text-gray-600 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {isAdminPage ? (
                // Admin mobile navigation
                <>
                  <Link
                    href="/dashboard"
                    className={`text-left py-2 px-4 rounded-md ${pathname === "/dashboard" ? "bg-[#038167]/10 text-[#038167]" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/invites"
                    className={`text-left py-2 px-4 rounded-md ${pathname === "/admin/invites" ? "bg-[#038167]/10 text-[#038167]" : "text-gray-600"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Manage Invites
                  </Link>
                </>
              ) : (
                // Main site mobile navigation
                <>
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (scrollToSection) {
                          scrollToSection(item.id)
                          setIsMenuOpen(false)
                        }
                      }}
                      className={`text-left py-2 px-4 rounded-md ${activeSection === item.id ? "bg-[#038167]/10 text-[#038167]" : "text-gray-600"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <Link href="/join" className="w-full">
                    <Button className="bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white shadow-md hover:shadow-lg transition-all mt-2 w-full">
                      Join Our Community
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

