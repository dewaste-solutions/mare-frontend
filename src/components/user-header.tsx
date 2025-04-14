"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Users, ArrowRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

type UserRole = "franchisee" | "community-officer" | "admin"

interface UserHeaderProps {
  role: UserRole
}

export function UserHeader({ role }: UserHeaderProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>(role)
  const router = useRouter()
  const { toast } = useToast()

  // Update the handleRoleSwitch function to use the new folder structure
  const handleRoleSwitch = (newRole: UserRole) => {
    if (newRole === currentRole) return

    setCurrentRole(newRole)

    // Store the role in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("mare-user-role", newRole)
    }

    // Show toast notification
    toast({
      title: "Role Switched",
      description: `You are now viewing as ${newRole.replace("-", " ")}.`,
      duration: 3000,
    })

    // Redirect to the appropriate dashboard
    switch (newRole) {
      case "franchisee":
        router.push("/franchisee/dashboard")
        break
      case "community-officer":
        router.push("/community-officer/dashboard")
        break
      case "admin":
        router.push("/admin/dashboard")
        break
      default:
        router.push("/dashboard")
    }
  }

  const getUserInitials = () => {
    switch (role) {
      case "franchisee":
        return "JD" // Juan Dela Cruz
      case "community-officer":
        return "MS" // Maria Santos
      case "admin":
        return "AD" // Admin
      default:
        return "U" // Unknown
    }
  }

  const getUserName = () => {
    switch (role) {
      case "franchisee":
        return "Juan Dela Cruz"
      case "community-officer":
        return "Maria Santos"
      case "admin":
        return "Admin User"
      default:
        return "User"
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#038167] text-white text-[10px] flex items-center justify-center">
          3
        </span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#038167] text-white">{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{getUserName()}</p>
              <p className="text-xs text-gray-500 capitalize">{role.replace("-", " ")}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push(`/${role}/profile`)}>
            <Users className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/login")}>
            <ArrowRight className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
