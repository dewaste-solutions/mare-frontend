"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Recycle, 
  Building, 
  MapPin, 
  FileText, 
  Upload,
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

import { useToast } from "@/components/ui/use-toast"
import { ToastProvider } from "@/components/ui/toast"

// Define types for form data
interface FormData {
  // Basic Information
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  addressLine1: string;
  addressLine2: string;
  province: string;
  city: string;
  barangay: string;
  whyInterested: string;
  
  // Location
  hasLocation: string;
  locationType: string;
  locationDimensions: string;
  googleMapsLink: string;
  
  // Organizational Structure
  businessType: string;
  isManager: string;
  teamMembers: string;
  
  // Community Profile
  householdCount: string;
  communityNames: string;
  businessClientCount: string;
  businessClients: string;
  
  // Documents
  secRegistration: File | null;
  dtiRegistration: File | null;
  bir2303: File | null;
  pcncRegistration: File | null;
  
  // Terms
  agreeTerms: boolean;
}

export default function FranchiseeApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(20)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Form state with proper typing
  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    birthday: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    city: "",
    barangay: "",
    whyInterested: "",
    
    // Location
    hasLocation: "",
    locationType: "",
    locationDimensions: "",
    googleMapsLink: "",
    
    // Organizational Structure
    businessType: "",
    isManager: "",
    teamMembers: "",
    
    // Community Profile
    householdCount: "",
    communityNames: "",
    businessClientCount: "",
    businessClients: "",
    
    // Documents
    secRegistration: null,
    dtiRegistration: null,
    bir2303: null,
    pcncRegistration: null,
    
    // Terms
    agreeTerms: false,
  })

  // Add toast state
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    }
  }

  const nextStep = () => {
    const newStep = currentStep + 1
    setCurrentStep(newStep)
    setFormProgress(newStep * 20)
  }

  const prevStep = () => {
    const newStep = currentStep - 1
    setCurrentStep(newStep)
    setFormProgress(newStep * 20)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    toast({
      title: "Application Submitted",
      description: "Your franchisee application has been received.",
    })

    setShowSuccessMessage(true)
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
        {/* Decorative Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -right-[30%] h-[80%] w-[80%] rounded-full bg-[#038167]/10 blur-3xl"></div>
          <div className="absolute -bottom-[40%] -left-[30%] h-[80%] w-[80%] rounded-full bg-[#F69C91]/10 blur-3xl"></div>
        </div>

        {/* Header */}
        <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md shadow-sm">
          <div className="container flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
                <Recycle className="h-5 w-5" />
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-[#038167] to-[#026853] opacity-30 blur-sm"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
                MARE!
              </span>
            </Link>
            <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-[#038167] transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-[#e6f3f1] text-[#026853] hover:bg-[#d1ebe7]">Franchisee Application</Badge>
              <h1 className="text-3xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#026853] to-[#038167] bg-clip-text text-transparent">
                Join the MARE! Franchisee Network
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Complete this application to begin your journey as a MARE! franchisee. Together, we can create
                sustainable waste management solutions in your community.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Application Progress</span>
                <span>{formProgress}% Complete</span>
              </div>
              <Progress value={formProgress} className="h-2 bg-gray-200" />

              <div className="flex justify-between mt-2">
                <div className={`text-xs ${currentStep >= 1 ? "text-[#038167] font-medium" : "text-gray-400"}`}>
                  Basic Information
                </div>
                <div className={`text-xs ${currentStep >= 2 ? "text-[#038167] font-medium" : "text-gray-400"}`}>
                  Location
                </div>
                <div className={`text-xs ${currentStep >= 3 ? "text-[#038167] font-medium" : "text-gray-400"}`}>
                  Organizational Structure
                </div>
                <div className={`text-xs ${currentStep >= 4 ? "text-[#038167] font-medium" : "text-gray-400"}`}>
                  Community Profile
                </div>
                <div className={`text-xs ${currentStep >= 5 ? "text-[#038167] font-medium" : "text-gray-400"}`}>
                  Documents & Submit
                </div>
              </div>
            </div>

            {showSuccessMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-[#e6f3f1] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-[#038167]" />
                </div>
                <h2 className="text-2xl font-bold text-[#026853] mb-4">Application Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Salamat sa iyong interes na maging MARE! franchisee. We've received your application and will
                  review it shortly. A member of our team will contact you within 3-5 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-[#038167] text-[#038167] hover:bg-[#e6f3f1]"
                    onClick={() => (window.location.href = "/")}
                  >
                    Return to Homepage
                  </Button>
                  <Button
                    className="bg-[#038167] hover:bg-[#026853] text-white"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Card className="p-6 shadow-lg">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#038167] text-white">
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[#026853]">Basic Information</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="email">Email Address</Label>
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
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="middleName">Middle Name</Label>
                          <Input
                            id="middleName"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="birthday">Birthday</Label>
                          <div className="relative">
                            <Input
                              id="birthday"
                              name="birthday"
                              type="date"
                              value={formData.birthday}
                              onChange={handleInputChange}
                              required
                            />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-3 md:col-span-2">
                          <h3 className="font-medium text-[#026853]">Address</h3>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="addressLine1">Address Line 1</Label>
                          <Input
                            id="addressLine1"
                            name="addressLine1"
                            value={formData.addressLine1}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                          <Input
                            id="addressLine2"
                            name="addressLine2"
                            value={formData.addressLine2}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="province">Province</Label>
                          <Input
                            id="province"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="city">City / Municipality</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="barangay">Barangay</Label>
                          <Input
                            id="barangay"
                            name="barangay"
                            value={formData.barangay}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="whyInterested">Interesado ako na magnegosyo ng MARE! dahil</Label>
                          <Textarea
                            id="whyInterested"
                            name="whyInterested"
                            value={formData.whyInterested}
                            onChange={handleInputChange}
                            rows={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-8">
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#038167] hover:bg-[#026853] text-white"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Location */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#038167] text-white">
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[#026853]">Location</h2>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-base">Ako ay may lugar para sa MARE!</Label>
                          <RadioGroup
                            value={formData.hasLocation}
                            onValueChange={(value: string) => handleRadioChange("hasLocation", value)}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="location-yes" />
                              <Label htmlFor="location-yes" className="font-normal">
                                Oo
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="location-no" />
                              <Label htmlFor="location-no" className="font-normal">
                                Hindi pa
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {formData.hasLocation === "yes" && (
                          <div className="space-y-3">
                            <Label className="text-base">Uri ng lugar:</Label>
                            <RadioGroup
                              value={formData.locationType}
                              onValueChange={(value: string) => handleRadioChange("locationType", value)}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="owned" id="location-owned" />
                                <Label htmlFor="location-owned" className="font-normal">
                                  Sariling pagmamay-ari
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="rented" id="location-rented" />
                                <Label htmlFor="location-rented" className="font-normal">
                                  Nirentahan o rerentahan pa lamang
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cooperative" id="location-cooperative" />
                                <Label htmlFor="location-cooperative" className="font-normal">
                                  Sa kooperatiba
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business-partner" id="location-business-partner" />
                                <Label htmlFor="location-business-partner" className="font-normal">
                                  Sa kasosyo sa negosyo
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="borrowed" id="location-borrowed" />
                                <Label htmlFor="location-borrowed" className="font-normal">
                                  Hihiramin sa kakilala
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="locationDimensions">Ito ay may sukat na (ibigay ang dimension in meters)</Label>
                          <Input
                            id="locationDimensions"
                            name="locationDimensions"
                            value={formData.locationDimensions}
                            onChange={handleInputChange}
                            placeholder="e.g., 20m x 15m"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="googleMapsLink">
                            Ibahagi ang lugar kung saan ninyo itatayo ang inyong MARE! Facility sa pamamagitan ng Google Maps
                          </Label>
                          <Input
                            id="googleMapsLink"
                            name="googleMapsLink"
                            value={formData.googleMapsLink}
                            onChange={handleInputChange}
                            placeholder="Google Maps Link"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Halimbawa: https://maps.google.com/?q=14.5995,120.9842
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous Step
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#038167] hover:bg-[#026853] text-white"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Organizational Structure */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#038167] text-white">
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[#026853]">Organizational Structure</h2>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-base">Patatakbuhin ang negosyong ito bilang</Label>
                          <RadioGroup
                            value={formData.businessType}
                            onValueChange={(value: string) => handleRadioChange("businessType", value)}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cooperative" id="business-cooperative" />
                              <Label htmlFor="business-cooperative" className="font-normal">
                                Kooperatiba
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="corporation" id="business-corporation" />
                              <Label htmlFor="business-corporation" className="font-normal">
                                Korporasyon
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sole-proprietor" id="business-sole" />
                              <Label htmlFor="business-sole" className="font-normal">
                                Sole Proprietor
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="one-person-corp" id="business-opc" />
                              <Label htmlFor="business-opc" className="font-normal">
                                One Person Corporation
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="non-profit" id="business-nonprofit" />
                              <Label htmlFor="business-nonprofit" className="font-normal">
                                Non-profit organization o foundation
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="lgu" id="business-lgu" />
                              <Label htmlFor="business-lgu" className="font-normal">
                                Local government unit
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hoa" id="business-hoa" />
                              <Label htmlFor="business-hoa" className="font-normal">
                                Homeowners association
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-base">Isa ako sa magiging manager ng MARE!</Label>
                          <RadioGroup
                            value={formData.isManager}
                            onValueChange={(value: string) => handleRadioChange("isManager", value)}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes-sole" id="manager-yes-sole" />
                              <Label htmlFor="manager-yes-sole" className="font-normal">
                                Oo, ako mismo ang manager
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes-multiple" id="manager-yes-multiple" />
                              <Label htmlFor="manager-yes-multiple" className="font-normal">
                                Oo, ako ay isa lamang sa mga managers
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no-hire" id="manager-no-hire" />
                              <Label htmlFor="manager-no-hire" className="font-normal">
                                Hindi, may tao akong kukunin bilang manager
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="not-sure" id="manager-not-sure" />
                              <Label htmlFor="manager-not-sure" className="font-normal">
                                Hindi pa ako sigurado
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="teamMembers">Ibigay ang lahat ng pangalan ng mga tauhan</Label>
                          <Textarea
                            id="teamMembers"
                            name="teamMembers"
                            value={formData.teamMembers}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Pangalan at posisyon ng mga tauhan"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous Step
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#038167] hover:bg-[#026853] text-white"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Community Profile */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#038167] text-white">
                          <span className="text-sm font-medium">4</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[#026853]">Community Profile</h2>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="householdCount">Ilang mga kabahayan ang masesebisyuhan ng inyong MARE! Facility</Label>
                          <Input
                            id="householdCount"
                            name="householdCount"
                            type="number"
                            value={formData.householdCount}
                            onChange={handleInputChange}
                            placeholder="e.g., 500"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="communityNames">
                            Ibigay ang pangalan ng mga streets, subdibisyon, komunidad, at/o barangay
                          </Label>
                          <Textarea
                            id="communityNames"
                            name="communityNames"
                            value={formData.communityNames}
                            onChange={handleInputChange}
                            rows={3}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="businessClientCount">
                            Ilang mga kalapit na negosyo ang magiging kliyente ng inyong MARE! Facility
                          </Label>
                          <Input
                            id="businessClientCount"
                            name="businessClientCount"
                            type="number"
                            value={formData.businessClientCount}
                            onChange={handleInputChange}
                            placeholder="e.g., 20"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessClients">
                            Ibigay ang pangalan ng mga negosyo o establisyemento
                          </Label>
                          <Textarea
                            id="businessClients"
                            name="businessClients"
                            value={formData.businessClients}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="e.g., restaurants, stores, schools, etc."
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous Step
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="bg-[#038167] hover:bg-[#026853] text-white"
                        >
                          Next Step
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Documents & Submit */}
                  {currentStep === 5 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#038167] text-white">
                          <span className="text-sm font-medium">5</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[#026853]">Documents & Submit</h2>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-[#f8faf9] border border-[#e6f3f1] rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-2">
                            Please upload the following documents to complete your application.
                            Accepted file formats: PDF, JPG, PNG (max 5MB each)
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="secRegistration" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-[#038167]" />
                              SEC Registration
                            </Label>
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Upload className="h-6 w-6 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  {formData.secRegistration
                                    ? formData.secRegistration.name
                                    : "Click to upload or drag and drop"}
                                </p>
                                <Input
                                  id="secRegistration"
                                  name="secRegistration"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <Label
                                  htmlFor="secRegistration"
                                  className="bg-white text-xs text-[#038167] px-3 py-1 rounded border border-[#038167] hover:bg-[#e6f3f1] cursor-pointer"
                                >
                                  Browse Files
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dtiRegistration" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-[#038167]" />
                              DTI Registration
                            </Label>
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Upload className="h-6 w-6 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  {formData.dtiRegistration
                                    ? formData.dtiRegistration.name
                                    : "Click to upload or drag and drop"}
                                </p>
                                <Input
                                  id="dtiRegistration"
                                  name="dtiRegistration"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <Label
                                  htmlFor="dtiRegistration"
                                  className="bg-white text-xs text-[#038167] px-3 py-1 rounded border border-[#038167] hover:bg-[#e6f3f1] cursor-pointer"
                                >
                                  Browse Files
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bir2303" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-[#038167]" />
                              BIR Form 2303
                            </Label>
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Upload className="h-6 w-6 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  {formData.bir2303
                                    ? formData.bir2303.name
                                    : "Click to upload or drag and drop"}
                                </p>
                                <Input
                                  id="bir2303"
                                  name="bir2303"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <Label
                                  htmlFor="bir2303"
                                  className="bg-white text-xs text-[#038167] px-3 py-1 rounded border border-[#038167] hover:bg-[#e6f3f1] cursor-pointer"
                                >
                                  Browse Files
                                </Label>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pcncRegistration" className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-[#038167]" />
                              PCNC Registration (if applicable)
                            </Label>
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Upload className="h-6 w-6 text-gray-400" />
                                <p className="text-sm text-gray-500">
                                  {formData.pcncRegistration
                                    ? formData.pcncRegistration.name
                                    : "Click to upload or drag and drop"}
                                </p>
                                <Input
                                  id="pcncRegistration"
                                  name="pcncRegistration"
                                  type="file"
                                  onChange={handleFileChange}
                                  className="hidden"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                />
                                <Label
                                  htmlFor="pcncRegistration"
                                  className="bg-white text-xs text-[#038167] px-3 py-1 rounded border border-[#038167] hover:bg-[#e6f3f1] cursor-pointer"
                                >
                                  Browse Files
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="agreeTerms"
                              name="agreeTerms"
                              checked={formData.agreeTerms}
  
                              required
                            />
                            <div className="space-y-1">
                              <Label
                                htmlFor="agreeTerms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Terms and Conditions
                              </Label>
                              <p className="text-xs text-gray-500">
                                Ako ay nagpapatunay na ang lahat ng impormasyong ibinigay ko sa application na ito
                                ay totoo at tama. Nauunawaan ko na anumang hindi totoong impormasyon ay maaaring
                                maging dahilan ng pagtanggi sa aking aplikasyon.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous Step
                        </Button>
                        <Button
                          type="submit"
                          disabled={!formData.agreeTerms}
                          className="bg-[#038167] hover:bg-[#026853] text-white"
                        >
                          Submit Application
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </Card>
            )}

            {/* Additional Info */}
            <div className="mt-12 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-[#026853] mb-4">About MARE! Franchising</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-[#e6f3f1] flex items-center justify-center mb-4">
                      <Recycle className="h-6 w-6 text-[#038167]" />
                    </div>
                    <h4 className="font-medium mb-2">Sustainable Solution</h4>
                    <p className="text-sm text-gray-600">
                      Join our mission to create a more sustainable future through effective waste management.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-[#e6f3f1] flex items-center justify-center mb-4">
                      <Building className="h-6 w-6 text-[#038167]" />
                    </div>
                    <h4 className="font-medium mb-2">Proven Business Model</h4>
                    <p className="text-sm text-gray-600">
                      Benefit from our established systems and ongoing operational support.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="h-12 w-12 rounded-full bg-[#e6f3f1] flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-[#038167]" />
                    </div>
                    <h4 className="font-medium mb-2">Community Impact</h4>
                    <p className="text-sm text-gray-600">
                      Make a difference in your local area while building a profitable business.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500">
                <p>
                  If you have any questions, please contact us at{" "}
                  <a href="mailto:support@mare.ph" className="text-[#038167]">
                    support@mare.ph
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-6 border-t border-gray-200">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#038167] to-[#026853] text-white shadow-lg">
                  <Recycle className="h-4 w-4" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-[#038167] to-[#026853] bg-clip-text text-transparent">
                  MARE!
                </span>
              </div>
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} MARE! Inc. All rights reserved.
              </div>
              <div className="flex gap-4">
                <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-[#038167]">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-[#038167]">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}