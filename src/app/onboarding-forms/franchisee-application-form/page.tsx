"use client"

import * as React from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CalendarIcon, CheckIcon, Upload } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/application form - components/FileUpload"

// Define form steps
const FORM_STEPS = [
    "Basic Information",
    "Location",
    "Organizational Structure",
    "Community Profile",
    "Documents",
    "Confirmation",
]

// Define types for form data
interface FormData {
    // Basic Information
    email: string
    firstName: string
    middleName: string
    lastName: string
    birthday: Date | null
    addressLine1: string
    addressLine2: string
    province: string
    city: string
    barangay: string
    interest: string

    // Location
    ownLocation: boolean
    locationType: string
    locationSize: string
    googleMapsLink: string

    // Organizational Structure
    organizationType: string
    managerType: string
    teamMembers: string

    // Community Profile
    communitySize: string
    communityAddress: string
    nearbyBusinesses: string
    businessNames: string

    // Documents
    documents: {
        secRegistration: File | null
        byLaws: File | null
        dti: File | null
        bir: File | null
        pcicRegistration: File | null
    }
}

export default function ApplicationForm() {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [progress, setProgress] = React.useState(16.67)
    const [date, setDate] = React.useState<Date>()
    const [formData, setFormData] = React.useState<FormData>({
        // Basic Information
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        birthday: null,
        addressLine1: "",
        addressLine2: "",
        province: "",
        city: "",
        barangay: "",
        interest: "",

        // Location
        ownLocation: false,
        locationType: "",
        locationSize: "",
        googleMapsLink: "",

        // Organizational Structure
        organizationType: "",
        managerType: "",
        teamMembers: "",

        // Community Profile
        communitySize: "",
        communityAddress: "",
        nearbyBusinesses: "",
        businessNames: "",

        // Documents
        documents: {
            secRegistration: null,
            byLaws: null,
            dti: null,
            bir: null,
            pcicRegistration: null,
        },
    })

    // Calculate progress based on current step
    React.useEffect(() => {
        const newProgress = ((currentStep + 1) / FORM_STEPS.length) * 100
        setProgress(newProgress)
    }, [currentStep])

    const handleNextStep = (): void => {
        if (currentStep < FORM_STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handlePreviousStep = (): void => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (name: string, checked: boolean): void => {
        setFormData((prev) => ({
            ...prev,
            [name]: checked,
        }))
    }

    const handleRadioChange = (name: string, value: string): void => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const renderFormStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-tt-commons font-bold mb-2">Basic Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="font-tt-commons block text-sm font-medium mb-1">
                                        Email Address<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="w-full font-tt-commons"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="font-tt-commons block text-sm font-medium mb-1">
                                            First Name<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            placeholder="First Name"
                                            className="w-full font-tt-commons"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="middleName" className="font-tt-commons block text-sm font-medium mb-1">
                                            Middle Name<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="middleName"
                                            name="middleName"
                                            placeholder="Middle Name (Optional)"
                                            className="w-full font-tt-commons"
                                            value={formData.middleName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="font-tt-commons block text-sm font-medium mb-1">
                                            Last Name<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Last Name"
                                            className="w-full font-tt-commons"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="birthday" className="font-tt-commons block text-sm font-medium mb-1">
                                        Birthday<span className="text-red-500">*</span>
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                            >
                                                {date ? format(date, "PPP") : "Pick a date"}
                                                <CalendarIcon className="ml-auto h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white">
                                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-tt-commons font-bold mb-4">Address</h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="addressLine1" className="block text-sm font-medium mb-1 font-tt-commons">
                                        Address Line 1<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="addressLine1"
                                        name="addressLine1"
                                        placeholder="House/Building Number, Street Name"
                                        className="w-full font-tt-commons"
                                        value={formData.addressLine1}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="addressLine2" className="block text-sm font-medium mb-1 font-tt-commons">
                                        Address Line 2 (Optional)
                                    </label>
                                    <Input
                                        id="addressLine2"
                                        name="addressLine2"
                                        placeholder="Apartment, Suite, Unit, etc."
                                        className="w-full font-tt-commons"
                                        value={formData.addressLine2}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label htmlFor="province" className="block text-sm font-medium mb-1 font-tt-commons">
                                            Province<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="province"
                                            name="province"
                                            placeholder="Province"
                                            className="w-full font-tt-commons"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium mb-1 font-tt-commons">
                                            City / Municipality<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="city"
                                            name="city"
                                            placeholder="City / Municipality"
                                            className="w-full font-tt-commons"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="barangay" className="block text-sm font-medium mb-1 font-tt-commons">
                                            Barangay<span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="barangay"
                                            name="barangay"
                                            placeholder="Barangay"
                                            className="w-full font-tt-commons"
                                            value={formData.barangay}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="interest" className="block text-sm font-medium mb-1 font-tt-commons">
                                Interesado ako na magnegosyo ng MARE! dahil<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="interest"
                                name="interest"
                                placeholder="Ibahing ang iyong dahilan kung bakit interesado ka sa MARE! franchise"
                                className="w-full min-h-[100px] p-2 border rounded-md font-tt-commons"
                                value={formData.interest}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="font-bold font-tt-commons">Location</h2>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-2">
                                <Checkbox
                                    id="ownLocation"
                                    checked={formData.ownLocation}
                                    onCheckedChange={(checked) => handleCheckboxChange("ownLocation", checked === true)}
                                />
                                <label
                                    htmlFor="ownLocation"
                                    className="font-tt-commons text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                                >
                                    Ako ay may lugar para sa MARE!
                                </label>
                            </div>

                            <div>
                                <p className="font-tt-commons text-sm font-medium mb-2">Uri ng lugar</p>
                                <RadioGroup
                                    value={formData.locationType}
                                    onValueChange={(value) => handleRadioChange("locationType", value)}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center space-x-2 font-tt-commons">
                                        <RadioGroupItem value="sariling-pagmamay-ari" id="sariling" />
                                        <Label htmlFor="sariling">Sariling pagmamay-ari</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons">
                                        <RadioGroupItem value="nirentahan" id="nirentahan" />
                                        <Label htmlFor="nirentahan">Nirentahan o rerentahan pa lamang</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons">
                                        <RadioGroupItem value="kooperatiba" id="kooperatiba" />
                                        <Label htmlFor="kooperatiba">Sa kooperatiba</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons">
                                        <RadioGroupItem value="kasosyo" id="kasosyo" />
                                        <Label htmlFor="kasosyo">Sa kasosyo sa negosyo</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons">
                                        <RadioGroupItem value="hihiramin" id="hihiramin" />
                                        <Label htmlFor="hihiramin">Hihiramin sa kakilala</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <label htmlFor="locationSize" className="block text-sm font-medium mb-1 font-tt-commons">
                                    Ito ay may sukat na (ibigay ang dimension in meters)<span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="locationSize"
                                    name="locationSize"
                                    placeholder="e.g., 5m x 10m"
                                    className="w-full font-tt-commons text-sm"
                                    value={formData.locationSize}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="googleMapsLink" className="font-tt-commons mt block text-sm font-medium mb-1">
                                    Google Maps link<span className="text-red-500">*</span>
                                </label>
                                <p className="text-xs font-tt-commons mt text-gray-500 mb-1">
                                    Ibahagi ang lugar kung saan niyo itatayo ang inyong MARE! Facility sa pamamagitan ng Google Maps
                                </p>
                                <Input
                                    id="googleMapsLink"
                                    name="googleMapsLink"
                                    placeholder="https://maps.google.com/..."
                                    className="w-full font-tt-commons text-sm"
                                    value={formData.googleMapsLink}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="font-tt-commons mt font-bold mb-4">Organizational Structure</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium font-tt-commons mt mb-2">Patatakbuhin ang negosyong ito bilang</p>
                                <RadioGroup
                                    value={formData.organizationType}
                                    onValueChange={(value) => handleRadioChange("organizationType", value)}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="kooperatiba" id="org-kooperatiba" />
                                        <Label htmlFor="org-kooperatiba">Kooperatiba</Label>
                                    </div>
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="korporasyon" id="korporasyon" />
                                        <Label htmlFor="korporasyon">Korporasyon</Label>
                                    </div>
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="sole-proprietor" id="sole-proprietor" />
                                        <Label htmlFor="sole-proprietor">Sole Proprietor</Label>
                                    </div>
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="one-person-corporation" id="one-person" />
                                        <Label htmlFor="one-person">One Person Corporation</Label>
                                    </div>
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="non-profit" id="non-profit" />
                                        <Label htmlFor="non-profit">Non-profit organization o foundation</Label>
                                    </div>
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="local-government" id="local-government" />
                                        <Label htmlFor="local-government">Local government unit</Label>
                                    </div>
                                    <div className="flex items-center font-tt-commons mt space-x-2">
                                        <RadioGroupItem value="homeowners" id="homeowners" />
                                        <Label htmlFor="homeowners">Homeowners association</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <p className="text-sm font-medium font-tt-commons mt mb-2">Isa ako sa magiging manager ng MARE!</p>
                                <RadioGroup
                                    value={formData.managerType}
                                    onValueChange={(value) => handleRadioChange("managerType", value)}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center space-x-2 font-tt-commons mt">
                                        <RadioGroupItem value="self-manager" id="self-manager" />
                                        <Label htmlFor="self-manager">Oo, ako mismo ang manager</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons mt">
                                        <RadioGroupItem value="one-of-managers" id="one-of-managers" />
                                        <Label htmlFor="one-of-managers">Oo, ako ay isa lamang sa mga managers</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons mt">
                                        <RadioGroupItem value="will-hire" id="will-hire" />
                                        <Label htmlFor="will-hire">Hindi, may tao akong kukunin bilang manager</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 font-tt-commons mt">
                                        <RadioGroupItem value="not-decided" id="not-decided" />
                                        <Label htmlFor="not-decided">Hindi pa ako sigurado</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div>
                                <label htmlFor="teamMembers" className="block text-sm font-tt-commons mt font-medium mb-1">
                                    Ibigay ang lahat ng pangalan ng mga tauhan<span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="teamMembers"
                                    name="teamMembers"
                                    placeholder="Isulat ang mga pangalan ng mga tauhan"
                                    className="w-full min-h-[100px] p-2 border rounded-md text-sm font-tt-commons"
                                    value={formData.teamMembers}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className="font-bold mb-4 font-tt-commons mt">Community Profile</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="communitySize" className="block text-sm font-medium mb-1 font-tt-commons mt">
                                    Ilang mga kabahayan ang maseserbisyuhan ng inyong MARE! Facility
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="communitySize"
                                    name="communitySize"
                                    placeholder="e.g., 500"
                                    className="w-full text-sm font-tt-commons"
                                    value={formData.communitySize}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="communityAddress" className="block text-sm font-medium mb-1 font-tt-commons mt">
                                    Ibigay ang pangalan ng mga streets, subdibisyon, komunidad, at/o barangay
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="communityAddress"
                                    name="communityAddress"
                                    placeholder="Isulat ang mga pangalan ng mga lugar"
                                    className="w-full min-h-[100px] p-2 border rounded-md text-sm font-tt-commons"
                                    value={formData.communityAddress}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="nearbyBusinesses" className="block text-sm font-medium mb-1 font-tt-commons mt">
                                    Ilang mga kalapit na negosyo ang kliyente ng inyong MARE! Facility
                                    <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="nearbyBusinesses"
                                    name="nearbyBusinesses"
                                    placeholder="e.g., 20"
                                    className="w-full text-sm font-tt-commons"
                                    value={formData.nearbyBusinesses}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="businessNames" className="block text-sm font-medium mb-1 font-tt-commons mt">
                                    Magbigay ng mga pangalan ng mga negosyong ito at uri ng negosyo nila
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="businessNames"
                                    name="businessNames"
                                    placeholder="Isulat ang mga pangalan at uri ng mga negosyo"
                                    className="w-full min-h-[100px] p-2 border rounded-md text-sm font-tt-commons"
                                    value={formData.businessNames}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-6">
                        <h2 className="font-bold mb-4 font-tt-commons">Documents</h2>
                        <p className="text-sm mb-4 font-tt-commons font-semibold">
                            Please select the document type and upload the corresponding file:
                        </p>

                        <div className="border p-4 rounded-md mb-4 border-emerald-300">
                            <div className="mb-4">
                                <label htmlFor="documentType" className="font-tt-commons text-sm mb-2 block font-semibold">
                                    Which documents are you uploading?
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full text-gray-400 p-6 font-tt-commons text-xs">
                                        <SelectValue placeholder="Select Document type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="articles">SEC Registrations (Articles of Incorporation)</SelectItem>
                                        <SelectItem value="byLaws">SEC Registrations (By Laws)</SelectItem>
                                        <SelectItem value="dti">DTI Registration</SelectItem>
                                        <SelectItem value="bir">BIR 2303</SelectItem>
                                        <SelectItem value="pcnc">PCNC registration</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <FileUpload />

                            <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleNextStep}>
                                Submit Document
                            </Button>
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className="flex flex-col items-center justify-center py-6">
                        <Image
                            src="/complete-logo.png"
                            alt="complete-logo"
                            width={150}
                            height={60}
                        />
                        <h2 className="text-xl font-bold my-2">Application Successfully Submitted!</h2>
                        <p className="text-center text-sm text-gray-500 max-w-md">
                            Thank you for applying to become a MARE! franchise partner. Your application is under review. You will
                            receive an update via email once a decision is made.
                        </p>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <main className="bg-emerald-700 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg flex flex-col">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <div className="relative w-[200px] h-[60px]">
                        <Image
                            src="/mare-logo.svg?height=60&width=200"
                            alt="MARE! Logo"
                            width={200}
                            height={60}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Title and Subtitle */}
                <h1 className="text-center text-2xl font-tt-commons font-bold">Franchisee Application Form</h1>
                <p className="text-center text-gray-500 font-tt-commons mt-1 mb-6">
                    Onboarding businesses committed to sustainable waste management.
                </p>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-emerald-600 h-3 rounded-full transition-all duration-700 ease-in-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form Content */}
                {renderFormStep()}

                {/* Navigation Buttons */}
                {currentStep < 5 ? (
                    <div className="flex justify-between mt-8">
                        {currentStep > 0 && (
                            <Button variant="outline" onClick={handlePreviousStep}>
                                Previous
                            </Button>
                        )}
                        {currentStep !== 4 && (
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white ml-auto" onClick={handleNextStep}>
                                Next
                            </Button>
                        )}
                    </div>
                ) : null}
            </div>
        </main>
    )
}

