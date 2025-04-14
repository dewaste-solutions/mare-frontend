"use client"

import { motion } from "framer-motion"
import { Building, Phone, Mail, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ContactSectionProps {
  onLearnMore: (type: string) => void
}

export function ContactSection({ onLearnMore }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "",
    message: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-[#026853] to-[#038167] text-white relative">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-2 items-center"
        >
          <div>
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Join Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Join the MARE! Community</h2>
            <div className="w-20 h-1 bg-[#a3e0d6] rounded-full mb-6"></div>
            <p className="text-lg text-[#e6f3f1] mb-8">
              Whether you&apos;re a community leader, a potential team member, or a franchisee, we invite you to be part of
              our growing network.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                size="lg"
                className="bg-white text-[#026853] hover:bg-[#e6f3f1] shadow-lg hover:shadow-xl transition-all w-full"
                onClick={() => onLearnMore("communities")}
              >
                For Communities
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm w-full"
                onClick={() => onLearnMore("workers")}
              >
                For Workers
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/40 hover:bg-white/10 backdrop-blur-sm w-full"
                onClick={() => onLearnMore("franchisees")}
              >
                For Franchisees
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Building className="h-6 w-6 text-[#a3e0d6]" />
                </div>
                <div>
                  <p className="font-medium text-white">MARE! Headquarters</p>
                  <p className="text-[#e6f3f1]">Manila, Philippines</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="h-6 w-6 text-[#a3e0d6]" />
                </div>
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-[#e6f3f1]">+63 (2) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="h-6 w-6 text-[#a3e0d6]" />
                </div>
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-[#e6f3f1]">info@marerecovery.org</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                  <Calendar className="h-6 w-6 text-[#a3e0d6]" />
                </div>
                <div>
                  <p className="font-medium text-white">Working Hours</p>
                  <p className="text-[#e6f3f1]">Mon-Fri: 8AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a3e0d6] to-[#038167] rounded-2xl blur-md opacity-70"></div>
            <div className="relative bg-white p-8 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold text-[#026853] mb-6">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">I am interested in</label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="Community Partnership">Community Partnership</option>
                    <option value="Becoming a Franchisee">Becoming a Franchisee</option>
                    <option value="Job Opportunities">Job Opportunities</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#038167] to-[#026853] hover:from-[#026853] hover:to-[#01574a] text-white shadow-md hover:shadow-lg transition-all"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
