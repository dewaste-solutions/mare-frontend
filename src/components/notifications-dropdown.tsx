"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
}

interface NotificationsDropdownProps {
  notifications: Notification[]
}

export function NotificationsDropdown({ notifications }: NotificationsDropdownProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications)
  const { toast } = useToast()

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )

    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotificationsList([])

    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared.",
    })
  }

  return (
    <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-200">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#038167] text-white text-[10px] flex items-center justify-center">
            {notificationsList.filter((n) => !n.read).length}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <Button color="ghost" size="sm" onClick={clearAllNotifications} className="h-8 text-xs">
            Clear All
          </Button>
        </div>
        <DropdownMenuSeparator />
        {notificationsList.length > 0 ? (
          <div className="max-h-[300px] overflow-auto">
            {notificationsList.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 ${notification.read ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <Button
                      color="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No notifications</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}