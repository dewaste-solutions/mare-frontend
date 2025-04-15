"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Sample data
const scheduleData = [
  {
    id: 1,
    barangay: "Barangay 1",
    material: "Plastic",
    day: "Monday",
    time: "8:00 AM - 10:00 AM",
    franchisee: "Manila Waste Solutions",
    status: "active",
  },
  {
    id: 2,
    barangay: "Barangay 2",
    material: "Paper",
    day: "Tuesday",
    time: "9:00 AM - 11:00 AM",
    franchisee: "QC Recyclers",
    status: "active",
  },
  {
    id: 3,
    barangay: "Barangay 3",
    material: "Metal",
    day: "Wednesday",
    time: "10:00 AM - 12:00 PM",
    franchisee: "Makati Green",
    status: "inactive",
  },
  {
    id: 4,
    barangay: "Barangay 1",
    material: "Glass",
    day: "Thursday",
    time: "1:00 PM - 3:00 PM",
    franchisee: "Manila Waste Solutions",
    status: "active",
  },
  {
    id: 5,
    barangay: "Barangay 2",
    material: "Organic",
    day: "Friday",
    time: "8:00 AM - 10:00 AM",
    franchisee: "QC Recyclers",
    status: "active",
  },
]

// Sample materials
const materials = ["Plastic", "Paper", "Metal", "Glass", "Organic", "E-waste", "Hazardous"]

// Sample barangays
const barangays = ["Barangay 1", "Barangay 2", "Barangay 3", "Barangay 4", "Barangay 5"]

export default function SchedulesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [showAddScheduleDialog, setShowAddScheduleDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Filter schedules based on active tab
  const filteredSchedules = scheduleData.filter((schedule) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return schedule.status === "active"
    if (activeTab === "inactive") return schedule.status === "inactive"
    return true
  })

  const getMaterialColor = (material: any) => {
    switch (material) {
      case "Plastic":
        return "bg-blue-100 text-blue-800"
      case "Paper":
        return "bg-yellow-100 text-yellow-800"
      case "Metal":
        return "bg-gray-100 text-gray-800"
      case "Glass":
        return "bg-purple-100 text-purple-800"
      case "Organic":
        return "bg-green-100 text-green-800"
      case "E-waste":
        return "bg-red-100 text-red-800"
      case "Hazardous":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout role="admin" title="Schedule & Routes" subtitle="Manage collection schedules per material">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Collection Schedules</h2>
        <p className="text-gray-500 mb-6">
          Configure and manage waste collection schedules by material type and location.
        </p>

        <div className="border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Plastic</h3>
              <p className="text-sm text-gray-500">Monday, Wednesday</p>
              <p className="text-sm text-gray-500">8:00 AM - 11:00 AM</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Paper</h3>
              <p className="text-sm text-gray-500">Tuesday, Thursday</p>
              <p className="text-sm text-gray-500">1:00 PM - 4:00 PM</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Metal</h3>
              <p className="text-sm text-gray-500">Friday</p>
              <p className="text-sm text-gray-500">9:00 AM - 12:00 PM</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-[#038167] text-white px-4 py-2 rounded-md hover:bg-[#026853] transition-colors">
            Edit Schedules
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
