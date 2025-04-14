export type SectionId = "hero" | "about" | "community" | "workers" | "impact" | "contact"


// Define UserRole as a union of string literals
export type UserRole = "admin" | "franchisee" | "worker" | "manager" | "buyer"| "community-officer"

// Collection Status
export type CollectionStatus = "collected" | "missed" | "pending"

// Base User Interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

// Collection Point
export interface CollectionPoint {
  id: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  status: CollectionStatus
  scheduledTime: Date
  collectedTime?: Date
  collectedBy?: string
  notes?: string
}

// Route
export interface Route {
  id: string
  name: string
  date: Date
  assignedTo: string
  collectionPoints: CollectionPoint[]
  status: "pending" | "in-progress" | "completed"
}

// Transaction
export interface Transaction {
  id: string
  date: Date
  franchiseeId: string
  wasteType: string
  quantity: number
  unit: "kg" | "ton"
  price: number
  status: "pending" | "completed"
}

// Waste Lot
export interface WasteLot {
  id: string
  wasteType: string
  quantity: number
  unit: "kg" | "ton"
  quality: "high" | "medium" | "low"
  availableFrom: Date
  location: string
  price: number
  sellerId: string
}

// Alert
export interface Alert {
  id: string
  type: "collection" | "sale" | "system"
  message: string
  createdAt: Date
  read: boolean
  priority: "high" | "medium" | "low"
  relatedId?: string
}

// Performance Metric
export interface PerformanceMetric {
  id: string
  workerId: string
  date: Date
  collectionsCompleted: number
  collectionsTotal: number
  wasteCollected: number
  hoursWorked: number
}
