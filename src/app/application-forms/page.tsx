"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function JoinCommunityPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally handle the form submission to your backend
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
        <Header />

        <main className="flex-1 container py-16 flex flex-col items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 mx-auto w-16 h-16 bg-[#038167] rounded-full flex items-center justify-center text-white">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#026853] mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700 mb-8">
              Your application to join the MARE! community has been received. We&apos;ll be in touch with you shortly.
            </p>

            <Link href="/">
              <Button className="bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
      <Header />

      <main className="flex-1 container py-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#026853] mb-4">Join the MARE! Community</h1>
            <p className="text-lg text-gray-700">
              Fill out this form to get started with MARE! and be part of our growing network of communities and workers
              transforming waste management.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border border-[#e6f3f1]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">I am interested in joining as a</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="resident">Community Resident</option>
                  <option value="barangay">Barangay Representative</option>
                  <option value="franchisee">Potential Franchisee</option>
                  <option value="worker">Team Member</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message (Optional)</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  placeholder="Tell us more about your interest in MARE! or any specific questions you have."
                ></textarea>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms" className="text-sm text-gray-600 leading-tight">
                  I agree to MARE!&apos;s Terms of Service and Privacy Policy
                </label>

                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

