"use client"

import * as React from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Define form steps
const FORM_STEPS = ["Basic Information", "Community Details", "Review Information", "Verification", "Success"]

// Define types for form data
interface FormData {
    // Basic Information
    email: string
    firstName: string
    middleName: string
    lastName: string
    addressLine1: string
    addressLine2: string
    province: string
    city: string
    barangay: string
    establishmentName: string

    // Community Details
    communityType: string
    hoaName: string
    villageName: string
    villageAddress: string
    hoaOfficeAddress: string
    hoaContactNumber: string
    contactPerson: string
    position: string
    officialEmail: string
    contactPersonNumber: string
    contactPersonEmail: string
}

export default function CommunityApplicationForm() {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [formData, setFormData] = React.useState<FormData>({
        // Basic Information
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        province: "",
        city: "",
        barangay: "",
        establishmentName: "",

        // Community Details
        communityType: "hoa",
        hoaName: "",
        villageName: "",
        villageAddress: "",
        hoaOfficeAddress: "",
        hoaContactNumber: "",
        contactPerson: "",
        position: "",
        officialEmail: "",
        contactPersonNumber: "",
        contactPersonEmail: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleRadioChange = (value: string): void => {
        setFormData((prev) => ({ ...prev, communityType: value }))
    }

    const handleNextStep = (): void => {
        if (currentStep < FORM_STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePreviousStep = (): void => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleNextStep()
    }

    const renderFormStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <h2 className="font-bold text-base mb-4 font-tt-commons">Basic Information</h2>

                        <div className="space-y-2">
                            <div>
                                <Label htmlFor="email" className="text-sm font-bold font-tt-commons">
                                    Email Address<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="firstName" className="text-sm font-bold font-tt-commons">
                                        First Name<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="middleName" className="text-sm font-bold font-tt-commons">
                                        Middle Name
                                    </Label>
                                    <Input
                                        id="middleName"
                                        name="middleName"
                                        placeholder="Middle Name (Optional)"
                                        className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                        value={formData.middleName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName" className="text-sm font-bold font-tt-commons">
                                        Last Name<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="font-bold text-base my-4 font-tt-commons">Address</h2>

                                <div className="space-y-2">
                                    <div>
                                        <Label htmlFor="addressLine1" className="text-sm font-bold font-tt-commons">
                                            Address Line 1<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="addressLine1"
                                            name="addressLine1"
                                            placeholder="House/Building Number, Street Name"
                                            className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="addressLine2" className="text-sm font-bold font-tt-commons">
                                            Address Line 2 (Optional)
                                        </Label>
                                        <Input
                                            id="addressLine2"
                                            name="addressLine2"
                                            placeholder="Apartment, Suite, Unit, etc."
                                            className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="province" className="text-sm font-bold font-tt-commons">
                                                Province<span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="province"
                                                name="province"
                                                placeholder="Province"
                                                className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                                value={formData.province}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="city" className="text-sm font-bold font-tt-commons">
                                                City / Municipality<span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                placeholder="City / Municipality"
                                                className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="barangay" className="text-sm font-bold font-tt-commons">
                                                Barangay<span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="barangay"
                                                name="barangay"
                                                placeholder="Barangay"
                                                className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                                value={formData.barangay}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="establishmentName" className="text-sm font-bold font-tt-commons">
                                    Name of the Community / Establishment<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="establishmentName"
                                    name="establishmentName"
                                    placeholder="Community / Establishment Name"
                                    className="w-full mt-1 text-sm font-tt-commons border-emerald-500"
                                    value={formData.establishmentName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="font-bold text-base font-tt-commons mt-2">Community Details</h2>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm block font-bold font-tt-commons mb-4 mt-2">
                                    Community Type<span className="text-red-500">*</span>
                                </Label>
                                <RadioGroup
                                    value={formData.communityType}
                                    onValueChange={handleRadioChange}
                                    className="flex flex-col space-y-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="hoa" id="hoa" />
                                        <Label htmlFor="hoa" className="cursor-pointer text-sm font-bold font-tt-commons">
                                            Homeowners Association (HOA)
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="commercial" id="commercial" />
                                        <Label htmlFor="commercial" className="cursor-pointer text-sm font-bold font-tt-commons">
                                            Commercial Establishment
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="both" id="both" />
                                        <Label htmlFor="both" className="cursor-pointer text-sm font-bold font-tt-commons">
                                            Both
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-4 mt-6">
                                <h3 className="text-sm font-bold font-tt-commons">Homeowners Association (HOA) Details</h3>

                                <div>
                                    <Label htmlFor="hoaName" className="text-sm font-semibold font-tt-commons">
                                        Name of the HOA<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="hoaName"
                                        name="hoaName"
                                        placeholder="HOA Name"
                                        className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                        value={formData.hoaName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="villageName" className="text-sm font-bold font-tt-commons">
                                        Name of the subdivision or village<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="villageName"
                                        name="villageName"
                                        placeholder="Subdivision/Village Name"
                                        className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                        value={formData.villageName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="villageAddress" className="text-sm font-bold font-tt-commons">
                                        Address of the subdivision or village<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="villageAddress"
                                        name="villageAddress"
                                        placeholder="Subdivision/Village Address"
                                        className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                        value={formData.villageAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="hoaOfficeAddress" className="text-base font-tt-commons font-bold">
                                        HOA Office Address (if applicable)<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="hoaOfficeAddress"
                                        name="hoaOfficeAddress"
                                        placeholder="Subdivision/Village Address"
                                        className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                        value={formData.hoaOfficeAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="hoaContactNumber" className="text-base font-tt-commons font-bold">
                                            Contact number of HOA Office<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="hoaContactNumber"
                                            name="hoaContactNumber"
                                            placeholder="Contact Number"
                                            className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                            value={formData.hoaContactNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contactPerson" className="text-base font-tt-commons font-bold">
                                            Name of contact person<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="contactPerson"
                                            name="contactPerson"
                                            placeholder="Contact Person"
                                            className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                            value={formData.contactPerson}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="position" className="text-base font-tt-commons font-bold">
                                            Position<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="position"
                                            name="position"
                                            placeholder="Position"
                                            className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="officialEmail" className="text-base font-tt-commons font-bold">
                                            Official email address<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="officialEmail"
                                            name="officialEmail"
                                            placeholder="Email Address"
                                            className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                            value={formData.officialEmail}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contactPersonNumber" className="text-base font-tt-commons font-bold">
                                            Contact number of the contact person<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="contactPersonNumber"
                                            name="contactPersonNumber"
                                            placeholder="Contact Number"
                                            className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                            value={formData.contactPersonNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contactPersonEmail" className="text-base font-tt-commons font-bold">
                                            Email address of the contact person<span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="contactPersonEmail"
                                            name="contactPersonEmail"
                                            placeholder="Email Address"
                                            className="w-full mt-1 text-xs font-tt-commons border-emerald-500"
                                            value={formData.contactPersonEmail}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="font-medium text-lg mb-4">Review Your Information</h2>

                        <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">Email:</span>
                                        <p>{formData.email}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Name:</span>
                                        <p>{`${formData.firstName} ${formData.middleName ? formData.middleName + " " : ""}${formData.lastName}`}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-gray-500">Address:</span>
                                        <p>{formData.addressLine1}</p>
                                        {formData.addressLine2 && <p>{formData.addressLine2}</p>}
                                        <p>{`${formData.city}, ${formData.province}`}</p>
                                        <p>{formData.barangay}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-gray-500">Community/Establishment Name:</span>
                                        <p>{formData.establishmentName}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Homeowners Association Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">HOA Name:</span>
                                        <p>{formData.hoaName}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Subdivision/Village Name:</span>
                                        <p>{formData.villageName}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-gray-500">Subdivision/Village Address:</span>
                                        <p>{formData.villageAddress}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="text-gray-500">HOA Office Address:</span>
                                        <p>{formData.hoaOfficeAddress}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">HOA Contact Number:</span>
                                        <p>{formData.hoaContactNumber}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">HOA Email:</span>
                                        <p>{formData.officialEmail}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Contact Person:</span>
                                        <p>{formData.contactPerson}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Position:</span>
                                        <p>{formData.position}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Contact Person Number:</span>
                                        <p>{formData.contactPersonNumber}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Contact Person Email:</span>
                                        <p>{formData.contactPersonEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className="font-medium text-lg mb-4">Review Your Information</h2>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium text-base mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500">Email Address</p>
                                        <p className="text-sm font-medium">{formData.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="text-sm font-medium">{`${formData.firstName} ${formData.middleName ? formData.middleName + " " : ""}${formData.lastName}`}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="text-sm font-medium">{formData.addressLine1}</p>
                                        {formData.addressLine2 && <p className="text-sm font-medium">{formData.addressLine2}</p>}
                                        <p className="text-sm font-medium">{`${formData.city}, ${formData.province}`}</p>
                                        <p className="text-sm font-medium">{formData.barangay}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Community/Establishment Name</p>
                                        <p className="text-sm font-medium">{formData.establishmentName}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium text-base mb-4">Homeowners Association Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Name</p>
                                        <p className="text-sm font-medium">{formData.hoaName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Subdivision/Village Name</p>
                                        <p className="text-sm font-medium">{formData.villageName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Subdivision/Village Address</p>
                                        <p className="text-sm font-medium">{formData.villageAddress}</p>
                                        <p className="text-sm font-medium">{`${formData.city}, ${formData.province}`}</p>
                                        <p className="text-sm font-medium">{formData.barangay}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Office Address</p>
                                        <p className="text-sm font-medium">{formData.hoaOfficeAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Contact Number</p>
                                        <p className="text-sm font-medium">{formData.hoaContactNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Email</p>
                                        <p className="text-sm font-medium">{formData.officialEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Person</p>
                                        <p className="text-sm font-medium">{formData.contactPerson}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Position</p>
                                        <p className="text-sm font-medium">{formData.position}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Person Number</p>
                                        <p className="text-sm font-medium">{formData.contactPersonNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Person Email</p>
                                        <p className="text-sm font-medium">{formData.contactPersonEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-200 h-300 flex items-center justify-center mb-6">
                            <Image
                                src="/complete-logo.png?height=300&width=200"
                                alt="Success!"
                                width={200}
                                height={300}
                                className="mb-4"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-center mb-4">Account created successfully!</h2>
                        <p className="text-center text-gray-600 max-w-md">
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
        <div className="min-h-screen bg-[#00856F] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                    {/* Logo and Header */}
                    <div className="flex flex-col items-center mb-6">
                        <Image
                            src="/mare-logo.svg?height=100&width=200"
                            alt="MARE! Logo"
                            width={200}
                            height={100}
                            className="mb-4"
                        />
                        <h1 className="text-2xl font-bold text-center text-gray-800 -mt-2">
                            {currentStep === 4 ? "Account created successfully!" : "Community Application Form"}
                        </h1>
                        {currentStep < 4 && (
                            <p className="text-center text-gray-500 mt-1">
                                Empowering communities to engage in responsible waste management.
                            </p>
                        )}
                    </div>

                    {/* Progress Bar */}
                    {currentStep < 4 && (
                        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
                            <div
                                className="bg-[#00856F] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / (FORM_STEPS.length - 1)) * 100}%` }}
                            />
                        </div>
                    )}

                    {/* Form Content */}
                    <form onSubmit={handleSubmit}>
                        {renderFormStep()}

                        {/* Navigation Buttons */}
                        <div className={cn("flex justify-between mt-8", currentStep === 4 && "hidden")}>
                            {currentStep > 0 && currentStep < 4 ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePreviousStep}
                                    className="text-emerald-700 border-emerald-500"
                                >
                                    Previous
                                </Button>
                            ) : (
                                <div></div>
                            )}

                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="bg-[#00856F] hover:bg-[#006F5C] text-white px-9"
                                >
                                    Next
                                </Button>
                            ) : currentStep === 3 ? (
                                <Button type="submit" className="bg-[#00856F] hover:bg-[#006F5C]">
                                    Submit
                                </Button>
                            ) : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

