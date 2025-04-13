"use client"

import type React from "react"

import { useState } from "react"
import {
    Briefcase,
    Building2,
    BuildingIcon,
    ChevronLeft,
    ChevronRight,
    Contact,
    FileText,
    House,
    HomeIcon as HouseIcon,
    LuggageIcon,
    MapPin,
    User,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { FileUpload } from "@/components/application form - components/FileUpload"

export default function FranchiseeApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 6

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleSubmit = () => {
        // temporary function to simulate form submission
        setCurrentStep(6)
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="flex flex-col items-center mb-8">
                <Image src="/mare-logo.svg?height=300&width=200" alt="Success!" width={200} height={300} className="mb-2" />
                <h1 className="text-2xl font-bold text-center font-tt-commons">Franchisee Application Form</h1>
                <p className="text-gray-500 text-center font-tt-commons font-bold">
                    Onboarding businesses committed to sustainable waste management.
                </p>
            </div>

            {/* Progress Bar */}
            {currentStep < 6 && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold font-tt-commons">
                            Step {currentStep} of {totalSteps - 1}: {getStepName(currentStep)}
                        </span>
                    </div>
                    <div className="relative">
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-red-300 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between absolute -top-2 w-full text-white bg-yellow">
                            {Array.from({ length: totalSteps - 1 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${index + 1 <= currentStep ? "bg-yellow-300" : "bg-gray-200"}`}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Form Content */}
            <div className="bg-white rounded-lg border p-6">
                {renderFormStep(currentStep)}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {currentStep !== 6 && (
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                    )}
                    {currentStep === 5 ? (
                        <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Submit Application
                        </Button>
                    ) : currentStep < 5 ? (
                        <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}


function getStepName(step: number): string {
    switch (step) {
        case 1:
            return "Basic Information"
        case 2:
            return "Location"
        case 3:
            return "Organizational Structure"
        case 4:
            return "Community Profile"
        case 5:
            return "Documents"
        case 6:
            return "Success"
        default:
            return ""
    }
}

function renderFormStep(step: number) {
    switch (step) {
        case 1:
            return <BasicInformationStep />
        case 2:
            return <LocationStep />
        case 3:
            return <OrganizationalStructureStep />
        case 4:
            return <CommunityProfileStep />
        case 5:
            return <DocumentsStep />
        case 6:
            return <SuccessStep />
        default:
            return null
    }
}

function StepHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
    return (
        <div className="bg-formPrimary p-4 rounded-lg mb-6 flex items-center gap-2 text-teal-800">
            {icon}
            <h2 className="font-semibold text-emerald-700">{title}</h2>
        </div>
    )
}

function SectionCard({
    title,
    icon,
    children,
}: {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <div className="mb-6 bg-[#e3f2ef] rounded-lg p-4">
            <div className="pb-2">
                <h3 className="text-base flex items-center gap-2 font-semibold text-teal-800">
                    {icon}
                    {title}
                </h3>
            </div>
            <div className="bg-[#f2f9f7] p-4 rounded-lg">{children}</div>
        </div>
    )
}

function BasicInformationStep() {
    return (
        <div>
            <StepHeader title="Basic Information" icon={<User className="h-5 w-5" />} />

            <SectionCard title="Personal Information" icon={<User className="h-4 w-4 text-emerald-600" />}>
                <div className="space-y-4">
                    {/* Name fields - stacked on mobile, side by side on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="font-tt-commons font-semibold">First Name</Label>
                            <Input id="firstName" placeholder="First Name" className="text-sm font-normal shadow-lg w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="middleName" className="font-tt-commons font-semibold">Middle Name</Label>
                            <Input id="middleName" placeholder="Middle Name" className="text-sm font-normal shadow-lg w-full" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="font-tt-commons font-semibold">Last Name</Label>
                            <Input id="lastName" placeholder="Last Name" className="text-sm font-normal shadow-lg w-full" />
                        </div>
                    </div>

                    {/* Birthday field */}
                    <div className="space-y-2">
                        <Label htmlFor="birthday" className="font-tt-commons font-semibold">Birthday</Label>
                        <Input
                            id="birthday"
                            type="date"
                            placeholder="MM/DD/YYYY"
                            className="text-xs font-normal font-tt-commons shadow-lg w-full"
                        />
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Contact Information" icon={<Contact className="h-4 w-4 text-teal-600" />}>
                <div className=" font-tt-commons font-semibold">
                    <Label htmlFor="email">Email Address</Label>
                </div>
                <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-2 text-sm font-normal w-full shadow-lg"
                />
            </SectionCard>

            <SectionCard title="Address" icon={<MapPin className="h-4 w-4 text-teal-600" />}>
                <div className="space-y-2 font-tt-commons font-semibold">
                    <div>
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                    </div>
                    <Input
                        id="addressLine1"
                        placeholder="Street address, P.O box, company name"
                        className=" text-sm font-normal w-full shadow-lg"
                    />
                    <div className="mt-2">
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                    </div>
                    <Input
                        id="addressLine2"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        className="text-sm font-normal w-full shadow-lg"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="my-2">
                            <Label htmlFor="province">Province</Label>
                            <Input id="province" placeholder="Province" className="text-sm font-normal w-full shadow-lg" />
                        </div>
                        <div className="my-2">
                            <Label htmlFor="city">City / Municipality</Label>
                            <Input id="city" placeholder="City / Municipality" className="text-sm font-normal w-full shadow-lg" />
                        </div>
                        <div className="my-2">
                            <Label htmlFor="barangay">Barangay</Label>
                            <Input id="barangay" placeholder="Barangay" className="text-sm font-normal w-full shadow-lg" />
                        </div>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Interest in MARE!" icon={<Building2 className="h-4 w-4 text-teal-600" />}>
                <div>
                    <p className="text-sm mb-2 font-tt-commons font-semibold">Interesado ako na magnegosyo ng MARE! dahil</p>
                    <Textarea placeholder="Ibahagi ang iyong dahilan..." className="min-h-[350px] shadow-lg text-xs bg-white" />
                    <p className="text-xs text-gray-500 mt-2 font-tt-commons font-semibold">
                        Tell us why you're interested in becoming a MARE! franchisee
                    </p>
                </div>
            </SectionCard>
        </div>
    )
}

function LocationStep() {
    return (
        <div>
            <StepHeader title="Location" icon={<MapPin className="h-5 w-5" />} />

            <SectionCard title="Property Ownership" icon={<Briefcase className="h-4 w-4 text-teal-600" />}>
                <p className="text-sm mb-3 font-tt-commons font-semibold">Ako ay may lugar para sa MARE!</p>
                <RadioGroup defaultValue="sariling-pagmamay-ari">
                    <div className="space-y-2 w-1/2 font-tt-commons">
                        <div className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white">
                            <RadioGroupItem value="sariling-pagmamay-ari" id="sariling-pagmamay-ari" className="text-emerald-700" />
                            <Label htmlFor="sariling-pagmamay-ari">Sariling pagmamay-ari</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white">
                            <RadioGroupItem value="nirerentahan" id="nirerentahan" className="text-emerald-700" />
                            <Label htmlFor="nirerentahan">Nirerentahan o nirerentahan pa lamang</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white">
                            <RadioGroupItem value="sa-kooperatiba" id="sa-kooperatiba" className="text-emerald-700" />
                            <Label htmlFor="sa-kooperatiba">Sa Kooperatiba</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white">
                            <RadioGroupItem value="sa-barangay" id="sa-barangay" className="text-emerald-700" />
                            <Label htmlFor="sa-barangay">Sa kasosyo sa negosyo</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white">
                            <RadioGroupItem value="hinahati" id="hinahati" className="text-emerald-700" />
                            <Label htmlFor="hinahati">Hihiramin sa kakilala</Label>
                        </div>
                    </div>
                </RadioGroup>
            </SectionCard>

            <SectionCard title="Location Details" icon={<MapPin className="h-4 w-4 text-teal-600 font-tt-commons" />}>
                <div className="space-y-2 font-tt-commons font-semibold">
                    <div>
                        <Label htmlFor="dimensions">Ito ay may sukat na (ibigay ang dimension in meters)</Label>
                    </div>
                    <Input id="dimensions" placeholder="e.g. 5m x 10m" className="text-xs font-tt-commons w-full" />
                    <div>
                        <Label htmlFor="googleMaps">
                            Ibahagi ang lugar kung saan niyo itatayo ang inyong MARE! Facility sa pamamagitan ng Google Maps
                        </Label>
                    </div>
                    <Input id="googleMaps" placeholder="Google Maps link" className="text-xs font-tt-commons w-full" />
                </div>
            </SectionCard>
        </div>
    )
}

function OrganizationalStructureStep() {
    return (
        <div>
            <StepHeader title="Organizational Structure" icon={<BuildingIcon className="h-5 w-5" />} />

            <SectionCard title="Business Structure" icon={<Building2 className="h-4 w-4 text-teal-600" />}>
                <p className="text-sm mb-3 font-tt-commons font-semibold">Patatakbuhin ang negosyong ito bilang</p>
                <RadioGroup>
                    <div className="space-y-2 font-tt-commons w-1/3 ">
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="kooperatiba" id="kooperatiba" className="text-emerald-700 " />
                            <Label htmlFor="kooperatiba">Kooperatiba</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="korporasyon" id="korporasyon" className="text-emerald-700" />
                            <Label htmlFor="korporasyon">Korporasyon</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="sole-proprietor" id="sole-proprietor" className="text-emerald-700" />
                            <Label htmlFor="sole-proprietor">Sole Proprietor</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="one-person-corporation" id="one-person-corporation" className="text-emerald-700" />
                            <Label htmlFor="one-person-corporation">One Person Corporation</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="non-profit" id="non-profit" className="text-emerald-700" />
                            <Label htmlFor="non-profit">Non-profit organization o foundation</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="local-government" id="local-government" className="text-emerald-700" />
                            <Label htmlFor="local-government">Local government unit</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="homeowners" id="homeowners" className="text-emerald-700" />
                            <Label htmlFor="homeowners">Homeowners association</Label>
                        </div>
                    </div>
                </RadioGroup>
            </SectionCard>

            <SectionCard title="Management" icon={<Users className="h-4 w-4 text-teal-600" />}>
                <p className="text-sm mb-3 font-tt-commons font-semibold">Patatakbuhin ang negosyong ito bilang</p>
                <RadioGroup className="font-tt-commons w-1/3">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="ako-mismo" id="ako-mismo" className="text-emerald-700" />
                            <Label htmlFor="ako-mismo">Oo, ako mismo ang manager</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="iba-managers" id="iba-managers" className="text-emerald-700" />
                            <Label htmlFor="iba-managers">Oo, ako ay isa lamang sa mga managers</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="hindi-ako" id="hindi-ako" className="text-emerald-700" />
                            <Label htmlFor="hindi-ako">Hindi, may tao akong kukunin bilang manager</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 bg-white shadow-lg border-emerald-600">
                            <RadioGroupItem value="hindi-pa-alam" id="hindi-pa-alam" className="text-emerald-700" />
                            <Label htmlFor="hindi-pa-alam">Hindi pa ako sigurado</Label>
                        </div>
                    </div>
                </RadioGroup>
                <div className="mt-4 font-tt-commons">
                    <Label htmlFor="teamMembers" className="mt-2">
                        Ibigay ang lahat ng pangalan ng mga tauhan
                    </Label>
                    <Textarea id="teamMembers" placeholder="Listahan ng mga pangalan..." className="min-h-[110px] text-xs bg-white" />
                    <p className="text-xs text-gray-500 mt-2 font-tt-commons ml-6">
                        List all staff members who will be involved in the operation
                    </p>
                </div>
            </SectionCard>
        </div>
    )
}

function CommunityProfileStep() {
    return (
        <div>
            <StepHeader title="Community Profile" icon={<House className="h-5 w-5" />} />

            <SectionCard title="Service Area" icon={<HouseIcon className="h-4 w-4 text-teal-600" />}>
                <div className="space-y-2 font-tt-commons">
                    <div>
                        <Label htmlFor="serviceRadius">Ilang mga kabahayan ang maseserbisyuhan ng inyong MARE! Facility</Label>
                    </div>
                    <Input id="serviceRadius" placeholder="e.g. 500" className="text-sm w-full shadow-lg bg-white" />
                    <p className="text-xs text-gray-500 mt-2 ml-2">Estimate the number of households in your service area</p>
                    <div>
                        <Label htmlFor="serviceAreas">
                            Ibigay ang pangalan ng mga streets, subdibisyon, komunidad, at/o barangay
                        </Label>
                        <Textarea id="serviceAreas" placeholder="Listahan ng mga lugar..." className="min-h-[110px] bg-white" />
                        <p className="text-xs text-gray-500 mt-2 ml-2">List all areas that will served by your facility</p>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Business Clients" icon={<Briefcase className="h-4 w-4 text-teal-600" />}>
                <div className="space-y-2 font-tt-commons">
                    <div>
                        <Label htmlFor="clientCount">
                            Ilang mga kalapit na negosyo ang magiging kliyente ng inyong MARE! Facility
                        </Label>
                    </div>
                    <Input id="clientCount" placeholder="e.g. 5m x 10m" className="text-sm bg-white" />
                    <p className="text-xs text-gray-500 ml-2">Estimate the number of businesses in your service area</p>
                    <div>
                        <Label htmlFor="clientTypes">Magbigay ng mga pangalan ng mga negosyong ito at uri ng negosyo nila</Label>
                        <Textarea id="clientTypes" placeholder="Listahan ng mga negosyo..." className="min-h-[110px] bg-white" />
                        <p className="text-xs text-gray-500 ml-2">List the types and names of businesses in your service area</p>
                    </div>
                </div>
            </SectionCard>
        </div>
    )
}

function DocumentsStep() {
    return (
        <div>
            <StepHeader title="Documents" icon={<FileText className="h-5 w-5" />} />

            <div className="bg-white p-6 rounded-lg border mb-6">
                <h3 className="font-semibold mb-4">Documents</h3>
                <p className="mb-4 font-semibold">Please select the document type and upload the corresponding file:</p>

                <div className="bg-gray-50 p-6 rounded-lg border font-tt-commons">
                    <div className="mb-4">
                        <Label htmlFor="documentType">Which documents are you uploading?</Label>
                        <Select>
                            <SelectTrigger id="documentType" className="w-full">
                                <SelectValue placeholder="Select Document Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="sec">SEC Registration (Articles of Incorporation)</SelectItem>
                                <SelectItem value="articles">SEC Registration (By Laws)</SelectItem>
                                <SelectItem value="dti">DTI Registration</SelectItem>
                                <SelectItem value="bir">BIR 2303</SelectItem>
                                <SelectItem value="pcnc">PCNC Registration (whenever applicable)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <FileUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SuccessStep() {
    return (
        <div className="flex flex-col items-center justify-center font-tt-commons py-10">
            <div className="mb-6">
                <Image src="/complete-logo.png" alt="Success!" width={150} height={150} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Application Successfully Submitted!</h2>
            <p className="text-gray-600 text-center max-w-md">
                Thank you for applying to become a MARE! franchise partner. Your application is under review. You will receive
                an update via email once a decision is made.
            </p>
        </div>
    )
}
