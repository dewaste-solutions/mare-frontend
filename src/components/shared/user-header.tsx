"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Settings, LogOut, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
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
import { useWalkthrough } from "@/components/onboarding/walkthrough-context"
import { dashboardWalkthroughSteps } from "@/components/onboarding/dashboard-walkthrough-steps"

interface UserHeaderProps {
  user: {
    name: string
    email: string
    role: string
  }
}

export function UserHeader({ user }: UserHeaderProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()
  const { startWalkthrough } = useWalkthrough()

  const handleLogout = async () => {
    setShowLogoutConfirm(false)
    await logout()
    router.push("/login")
  }

  const handleStartWalkthrough = () => {
    // Get common steps for all roles
    const commonSteps = dashboardWalkthroughSteps.common || []

    // Get role-specific steps
    const roleSteps = dashboardWalkthroughSteps[user.role as keyof typeof dashboardWalkthroughSteps] || []

    // Combine steps
    const combinedSteps = [...commonSteps, ...roleSteps]

    if (combinedSteps.length > 0) {
      startWalkthrough(combinedSteps)
    }
  }

  return (
    <div className="flex items-center ml-auto">
      <Button variant="outline" size="sm" className="mr-2 flex items-center gap-1" onClick={handleStartWalkthrough}>
        <HelpCircle className="h-4 w-4" />
        <span>Help</span>
      </Button>

      <Button variant="ghost" size="icon" className="mr-2 relative" aria-label="Notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full user-profile-dropdown">
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-[#038167] flex items-center justify-center text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
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
          <DropdownMenuItem onClick={() => setShowLogoutConfirm(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
    </div>
  )
}
