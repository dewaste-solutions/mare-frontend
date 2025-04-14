"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden" 
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, MapPin, Calendar, Linkedin, Twitter } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TeamMember } from "@/data/landing-page-data"

interface ModalsProps {
  selectedMember: TeamMember | null
  isProfileOpen: boolean
  setIsProfileOpen: (open: boolean) => void
  showCommunityModal: boolean
  setShowCommunityModal: (open: boolean) => void
  showJoinModal: boolean
  setShowJoinModal: (open: boolean) => void
  showPositionsModal: boolean
  setShowPositionsModal: (open: boolean) => void
  activeInfoType: string | null
  setShowThankYouToast: (show: boolean) => void
}

export function Modals({
  selectedMember,
  isProfileOpen,
  setIsProfileOpen,
  showCommunityModal,
  setShowCommunityModal,
  showJoinModal,
  setShowJoinModal,
  showPositionsModal,
  setShowPositionsModal,
  activeInfoType,
  setShowThankYouToast,
}: ModalsProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Community Resident",
    message: "",
    agreeTerms: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
  
    const fieldValue =
      type === 'checkbox' && 'checked' in target
        ? (target as HTMLInputElement).checked
        : value;
  
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };
  
  

  const handleJoinSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setShowJoinModal(false)
    setShowThankYouToast(true)
    setTimeout(() => setShowThankYouToast(false), 3000)
  }


  return (
    <>
      {/* Team Member Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMember && (
            <>
              <DialogHeader className="bg-[#038167] text-white p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt={selectedMember.name} />
                    <AvatarFallback className="bg-[#026853] text-white text-xl">
                      {selectedMember.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl font-bold">{selectedMember.name}</DialogTitle>
                    <DialogDescription className="text-[#e6f3f1] opacity-90">{selectedMember.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#026853] mb-2">About</h3>
                  <p className="text-gray-700">{selectedMember.bio || selectedMember.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedMember.email && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-[#038167]">{selectedMember.email}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.phone && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-[#038167]">{selectedMember.phone}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.location && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-[#038167]">{selectedMember.location}</p>
                      </div>
                    </div>
                  )}

                  {selectedMember.startDate && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f3f1] text-[#038167]">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Joined</p>
                        <p className="text-[#038167]">{selectedMember.startDate}</p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedMember.skills && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#026853] mb-2">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map((skill, index) => (
                        <span key={index} className="bg-[#e6f3f1] text-[#038167] px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMember.education && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#026853] mb-2">Education</h3>
                    <p className="text-gray-700">{selectedMember.education}</p>
                  </div>
                )}

                {selectedMember.socialLinks && (
                  <div className="border-t pt-4">
                    <div className="flex gap-4">
                      {selectedMember.socialLinks.linkedin && (
                        <a
                          href={selectedMember.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#038167] transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <Linkedin className="h-5 w-5" />
                            <span>LinkedIn</span>
                          </div>
                        </a>
                      )}
                      {selectedMember.socialLinks.twitter && (
                        <a
                          href={selectedMember.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#038167] transition-colors"
                        >
                          <div className="flex items-center gap-1">
                            <Twitter className="h-5 w-5" />
                            <span>Twitter</span>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-4 flex justify-between">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button className="bg-[#038167] hover:bg-[#026853]">Contact {selectedMember.name.split(" ")[0]}</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Community Info Modal */}
      <Dialog open={showCommunityModal} onOpenChange={setShowCommunityModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#026853]">
              {activeInfoType === "about" && "About MARE!"}
              {activeInfoType === "residents" && "Residents"}
              {activeInfoType === "barangay" && "Barangay Leaders"}
              {activeInfoType === "franchisees" && "Franchisees"}
              {activeInfoType === "communities" && "For Communities"}
              {activeInfoType === "workers" && "For Workers"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {activeInfoType === "about" && (
              <div className="space-y-4">
                <p>
                  MARE! is a community-driven solution that addresses waste management challenges in the Philippines
                  through a circular economy approach.
                </p>
                <p>
                  Our innovative model brings together residents, local government units, and entrepreneurs to create a
                  sustainable ecosystem that diverts waste from landfills while creating economic opportunities.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Our Vision</h3>
                <p>
                  A Philippines where landfills are obsolete and communities thrive through sustainable waste management
                  practices.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Our Mission</h3>
                <p>
                  To empower communities to take control of their waste management through education, infrastructure,
                  and economic incentives.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-[#e6f3f1] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#038167]">85%</h4>
                    <p className="text-sm">Waste diverted from landfills</p>
                  </div>
                  <div className="bg-[#e6f3f1] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#038167]">50+</h4>
                    <p className="text-sm">Local jobs created</p>
                  </div>
                </div>
              </div>
            )}

            {activeInfoType === "residents" && (
              <div className="space-y-4">
                <p>
                  Residents are the foundation of the MARE! ecosystem. By properly segregating waste at home and
                  participating in collection events, they contribute to a cleaner community and a healthier
                  environment.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Benefits for Residents</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Cleaner neighborhoods and reduced waste-related health hazards</li>
                  <li>Potential income from recyclable materials</li>
                  <li>Educational opportunities about sustainable living</li>
                  <li>Pride in contributing to environmental conservation</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">How to Participate</h3>
                <p>
                  Residents can join MARE! by attending community orientation sessions, implementing proper waste
                  segregation at home, and participating in scheduled collection events.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Join as a Resident
                </Button>
              </div>
            )}

            {activeInfoType === "barangay" && (
              <div className="space-y-4">
                <p>
                  Barangay leaders play a crucial role in implementing MARE! in their communities. They provide the
                  necessary support, resources, and policy framework to ensure the program&apos;s success.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Role of Barangay Leaders</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Champion waste management initiatives in the community</li>
                  <li>Allocate resources for MARE! implementation</li>
                  <li>Enforce waste management policies</li>
                  <li>Coordinate with MARE! team for program implementation</li>
                  <li>Monitor and evaluate program impact</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Success Stories</h3>
                <p>
                  Barangay San Isidro in Manila reduced their landfill contribution by 75% within six months of
                  implementing MARE!, while creating 5 new jobs for local residents.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Partner with MARE!
                </Button>
              </div>
            )}

            {activeInfoType === "franchisees" && (
              <div className="space-y-4">
                <p>
                  MARE! franchisees are local entrepreneurs who operate MARE! Centers in their communities. They play a
                  vital role in the collection, segregation, and processing of recyclable materials.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Benefits for Franchisees</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Profitable business opportunity with social and environmental impact</li>
                  <li>Comprehensive training and ongoing support</li>
                  <li>Access to MARE!&apos;s network of recyclers and processors</li>
                  <li>Marketing and community engagement support</li>
                  <li>Opportunity to be a community leader in sustainability</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Investment and Returns</h3>
                <p>
                  MARE! franchisees typically recover their initial investment within 12-18 months, with ongoing revenue
                  streams from material sales, service fees, and community partnerships.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Become a Franchisee
                </Button>
              </div>
            )}

            {activeInfoType === "communities" && (
              <div className="space-y-4">
                <p>
                  MARE! partners with communities to implement sustainable waste management solutions that benefit
                  residents, local government units, and the environment.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Our Approach</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Community assessment and needs analysis</li>
                  <li>Customized implementation plan</li>
                  <li>Community education and engagement</li>
                  <li>Infrastructure development</li>
                  <li>Ongoing support and monitoring</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Impact</h3>
                <p>
                  Communities implementing MARE! typically see an 85% reduction in waste sent to landfills, cleaner
                  public spaces, and new economic opportunities for residents.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowJoinModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  Partner with MARE!
                </Button>
              </div>
            )}

            {activeInfoType === "workers" && (
              <div className="space-y-4">
                <p>
                  MARE! creates meaningful employment opportunities for individuals passionate about environmental
                  sustainability and community development.
                </p>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Career Opportunities</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Community Coordinators</li>
                  <li>Waste Management Specialists</li>
                  <li>Education and Outreach Officers</li>
                  <li>Franchisee Support Managers</li>
                  <li>Operations Staff</li>
                </ul>
                <h3 className="text-lg font-semibold text-[#038167] mt-4">Why Work with MARE!</h3>
                <p>
                  MARE! offers competitive compensation, professional development opportunities, and the chance to make
                  a tangible impact on communities and the environment.
                </p>
                <Button
                  onClick={() => {
                    setShowCommunityModal(false)
                    setShowPositionsModal(true)
                  }}
                  className="mt-4 bg-[#038167] hover:bg-[#026853] text-white"
                >
                  View Open Positions
                </Button>
              </div>
            )}
          </div>

          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Join Community Modal */}
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Join the MARE! Community</DialogTitle>
            <DialogDescription>Fill out this form to get started with MARE!</DialogDescription>
          </DialogHeader>

          <form className="space-y-4 py-4" onSubmit={handleJoinSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am interested in joining as a</Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#038167] focus:border-transparent"
              >
                <option value="Community Resident">Community Resident</option>
                <option value="Barangay Representative">Barangay Representative</option>
                <option value="School Representative">School Representative</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Environmental Advocate">Environmental Advocate</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={3} />
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                required
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agreeTerms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to MARE!&apos;s Terms of Service and Privacy Policy
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#038167] hover:bg-[#026853] text-white mt-6"
              disabled={!formData.agreeTerms}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Open Positions Modal */}
      <Dialog open={showPositionsModal} onOpenChange={setShowPositionsModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Open Positions at MARE!</DialogTitle>
            <DialogDescription>
              Join our team and make a difference in communities across the Philippines
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            <div className="border rounded-lg p-4 hover:border-[#038167] transition-colors">
              <h3 className="text-lg font-semibold text-[#038167]">Community Coordinator</h3>
              <p className="text-sm text-gray-500 mb-2">Manila, Philippines | Full-time</p>
              <p className="mb-4">
                Work directly with barangays to implement MARE! programs and train community members on proper waste
                segregation and collection.
              </p>
              <Button variant="outline" className="text-[#038167] border-[#038167]">
                View Details
              </Button>
            </div>

            <div className="border rounded-lg p-4 hover:border-[#038167] transition-colors">
              <h3 className="text-lg font-semibold text-[#038167]">Education & Outreach Officer</h3>
              <p className="text-sm text-gray-500 mb-2">Davao, Philippines | Full-time</p>
              <p className="mb-4">
                Develop educational materials and conduct workshops on waste management and environmental awareness in
                communities and schools.
              </p>
              <Button variant="outline" className="text-[#038167] border-[#038167]">
                View Details
              </Button>
            </div>

            <div className="mt-6">
              <p className="text-center text-gray-600">Don&apos;t see a position that fits your skills?</p>
              <div className="flex justify-center mt-2">
                <Button
                  variant="outline"
                  className="text-[#038167] border-[#038167]"
                  onClick={() => {
                    setShowPositionsModal(false)
                    setShowJoinModal(true)
                  }}
                >
                  Submit General Application
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
