"use client"

import { DashboardLayout } from "@/components/dashboard-layout"

// Material type definition
type MaterialType = "Plastic" | "Paper" | "Metal" | "Glass" | "Organic" | "E-waste" | "Hazardous";

// Schedule type definition
type Schedule = {
  id: number;
  barangay: string;
  material: MaterialType;
  day: string;
  time: string;
  franchisee: string;
  status: "active" | "inactive";
}

// Sample data
const scheduleData: Schedule[] = [
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

export default function SchedulesPage() {
  // Function to get color based on material type
  const getMaterialColor = (material: MaterialType): string => {
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

  // Group schedules by material type for summary display
  const schedulesByMaterial: Record<string, { days: string[], times: string[] }> = {}
  
  scheduleData.forEach(schedule => {
    if (schedule.status === "active") {
      if (!schedulesByMaterial[schedule.material]) {
        schedulesByMaterial[schedule.material] = { days: [], times: [] }
      }
      
      if (!schedulesByMaterial[schedule.material].days.includes(schedule.day)) {
        schedulesByMaterial[schedule.material].days.push(schedule.day)
      }
      
      if (!schedulesByMaterial[schedule.material].times.includes(schedule.time)) {
        schedulesByMaterial[schedule.material].times.push(schedule.time)
      }
    }
  })

  return (
    <DashboardLayout role="admin" title="Schedule & Routes" subtitle="Manage collection schedules per material">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Collection Schedules</h2>
        <p className="text-gray-500 mb-6">
          Configure and manage waste collection schedules by material type and location.
        </p>

        {/* Material summary cards */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(schedulesByMaterial).map(([material, info]) => (
              <div key={material} className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">{material}</h3>
                <p className="text-sm text-gray-500">{info.days.join(", ")}</p>
                <p className="text-sm text-gray-500">{info.times.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Barangay</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Material</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Day</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Time</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Franchisee</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scheduleData.map((schedule) => (
                <tr key={schedule.id}>
                  <td className="py-2 px-4 text-sm">{schedule.barangay}</td>
                  <td className="py-2 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getMaterialColor(schedule.material)}`}>
                      {schedule.material}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-sm">{schedule.day}</td>
                  <td className="py-2 px-4 text-sm">{schedule.time}</td>
                  <td className="py-2 px-4 text-sm">{schedule.franchisee}</td>
                  <td className="py-2 px-4 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${schedule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {schedule.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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