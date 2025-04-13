"use client"

import type React from "react"

import { useState } from "react"
import { Building2, ChevronLeft, ChevronRight, Contact, HomeIcon as HouseIcon, MapPin, User, Check, Mail, Building2Icon, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function FranchiseeApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 3
    const [formType, setFormType] = useState("homeowners")

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleSubmit = () => {
        // temporary function to simulate form submission
        setCurrentStep(3)
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="flex flex-col items-center mb-8">
                <Image src="/mare-logo.svg?height=300&width=200" alt="MARE!" width={200} height={80} className="mb-2" />
                <h1 className="text-2xl font-bold text-center font-tt-commons">Franchisee Community Form</h1>
                <p className="text-gray-500 text-center font-tt-commons">
                    Empowering communities to engage in responsible waste management.
                </p>
            </div>

            {/* Progress Bar */}
            {currentStep < 3 && (
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
                        <div className="flex justify-between absolute -top-2 w-full">
                            {Array.from({ length: totalSteps - 1 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs bg-yellow-400 text-white
                  ${index + 1 <= currentStep ? "bg-red-300" : "bg-gray-200"}`}
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
                {renderFormStep(currentStep, formType, setFormType)}

                {/* Navigation Buttons */}
                {currentStep !== 3 && (
                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4 shaadow-lg" /> Previous
                        </Button>

                        {currentStep === 2 ? (
                            <Button onClick={handleSubmit} className="bg-red-300 hover:bg-red-400 text-white flex items-center gap-2 shadow-lg">
                                Submit Application
                            </Button>
                        ) : (
                            <Button onClick={handleNext} className="bg-red-300 hover:bg-red-400 text-white flex items-center gap-2 shadow-lg">
                                Next <ChevronRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function getStepName(step: number): string {
    switch (step) {
        case 1:
            return "Basic Information"
        case 2:
            return "Community Details"
        case 3:
            return "Success"
        default:
            return ""
    }
}

function renderFormStep(step: number, formType: string, setFormType: (type: string) => void) {
    switch (step) {
        case 1:
            return <BasicInformationStep />
        case 2:
            return <CommunityDetailsStep formType={formType} setFormType={setFormType} />
        case 3:
            return <SuccessStep />
        default:
            return null
    }
}

function StepHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
    return (
        <div className="bg-red-100 p-4 rounded-lg mb-6 flex items-center gap-2 text-teal-600">
            {icon}
            <h2 className="font-semibold text-teal-600">{title}</h2>
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
        <div className="mb-6 bg-red-50 rounded-lg p-4">
            <div className="pb-2">
                <h3 className="text-base flex items-center gap-2 font-semibold text-teal-600">
                    {icon}
                    {title}
                </h3>
            </div>
            <div className="p-4 rounded-lg">{children}</div> {/* Removed bg-white */}
        </div>
    )
}

function BasicInformationStep() {
    return (
        <div>
            <StepHeader title="Basic Information" icon={<User className="h-5 w-5" />} />

            <SectionCard
                title="Personal Information"
                icon={<User className="h-4 w-4 text-teal-600" />}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-tt-commons">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="First Name" className="text-sm font-normal mt-1 shadow-lg w-full" />
                    </div>
                    <div>
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input id="middleName" placeholder="Middle Name" className="text-sm font-normal mt-1 shadow-lg w-full" />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Last Name" className="text-sm font-normal mt-1 shadow-lg w-full" />
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Contact Information" icon={<Mail className="h-4 w-4 text-teal-600" />}>
                <div className="font-tt-commons">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="mt-1 text-sm font-normal shadow-lg w-full"
                    />
                </div>
            </SectionCard>

            <SectionCard title="Address" icon={<MapPin className="h-4 w-4 text-teal-600" />}>
                <div className="space-y-2 font-tt-commons">
                    <div>
                        <Label htmlFor="addressLine1">Address Line 1</Label>
                        <Input
                            id="addressLine1"
                            placeholder="Street address, P.O box, company name"
                            className="mt-1 text-sm font-normal shadow-lg w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input
                            id="addressLine2"
                            placeholder="Apartment, suite, unit, building, floor, etc."
                            className="mt-1 text-sm font-normal shadow-lg w-full"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <Label htmlFor="province">Province</Label>
                            <Input id="province" placeholder="Province" className="mt-1 text-sm font-normal shadow-lg w-full" />
                        </div>
                        <div>
                            <Label htmlFor="city">City / Municipality</Label>
                            <Input id="city" placeholder="City / Municipality" className="mt-1 text-sm font-normal shadow-lg w-full" />
                        </div>
                        <div>
                            <Label htmlFor="barangay">Barangay</Label>
                            <Input id="barangay" placeholder="Barangay" className="mt-1 text-sm font-normal shadow-lg w-full" />
                        </div>
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Community Information" icon={<Building2 className="h-4 w-4 text-teal-600" />}>
                <div>
                    <Label htmlFor="communityName">Name of the Community / Establishment</Label>
                    <Input id="communityName" placeholder="Community Name" className="mt-1 text-sm font-normal shadow-lg w-full" />
                    <p className="text-xs text-gray-500 mt-1">Enter the name of your community or establishment</p>
                </div>
            </SectionCard>
        </div>
    )
}

function CommunityDetailsStep({ formType, setFormType }: { formType: string; setFormType: (type: string) => void }) {
    return (
        <div>
            <StepHeader title="Community Details" icon={<Building className="h-5 w-5" />} />

            <div className="mb-6">
                <Tabs defaultValue={formType} onValueChange={setFormType} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="homeowners" className={`${formType === "homeowners" ? "bg-emerald-700 text-white" : ""}`}>
                            Homeowners Association
                        </TabsTrigger>
                        <TabsTrigger value="commercial" className={`${formType === "commercial" ? "bg-emerald-700 text-white" : ""}`}>
                            Commercial Establishment
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="homeowners">
                        <SectionCard title="HOA Information" icon={<Building2Icon className="h-4 w-4 text-teal-600" />}>
                            <div className="space-y-4 font-tt-commons">
                                <div>
                                    <Label htmlFor="hoaName">Name of the HOA</Label>
                                    <Input id="hoaName" placeholder="HOA Name" className="mt-1 text-sm font-normal w-full" />
                                </div>
                                <div>
                                    <Label htmlFor="subdivisionName">Name of the subdivision or village</Label>
                                    <Input
                                        id="subdivisionName"
                                        placeholder="Subdivision Name"
                                        className="mt-1 text-sm font-normal w-full"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="subdivisionAddress">Address of the subdivision or village</Label>
                                    <Input
                                        id="subdivisionAddress"
                                        placeholder="Subdivision Address"
                                        className="mt-1 text-sm font-normal w-full"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="hoaOfficeAddress">HOA Office Address (if applicable)</Label>
                                    <Input
                                        id="hoaOfficeAddress"
                                        placeholder="HOA Office Address"
                                        className="mt-1 text-sm font-normal w-full"
                                    />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard title="HOA Contact Information" icon={<Contact className="h-4 w-4 text-teal-600" />}>
                            <div className="space-y-4 font-tt-commons">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="hoaContactNumber">Contact number of HOA Office</Label>
                                        <Input
                                            id="hoaContactNumber"
                                            placeholder="Contact Number"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="hoaEmail">Official email address</Label>
                                        <Input id="hoaEmail" placeholder="Email Address" className="mt-1 text-sm font-normal w-full" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="contactPerson">Name of contact person</Label>
                                    <Input id="contactPerson" placeholder="Contact Person" className="mt-1 text-sm font-normal w-full" />
                                </div>
                                <div>
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" placeholder="Position" className="mt-1 text-sm font-normal w-full" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contactPersonNumber">Contact number of the contact person</Label>
                                        <Input
                                            id="contactPersonNumber"
                                            placeholder="Contact Number"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contactPersonEmail">Email address of the contact person</Label>
                                        <Input
                                            id="contactPersonEmail"
                                            placeholder="Email Address"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </TabsContent>
                    <TabsContent value="commercial">
                        <SectionCard title="Establishment Information" icon={<Building2 className="h-4 w-4 text-teal-600" />}>
                            <div className="space-y-4 font-tt-commons">
                                <div>
                                    <Label htmlFor="establishmentName">Name of the commercial establishment</Label>
                                    <Input
                                        id="establishmentName"
                                        placeholder="Establishment Name"
                                        className="mt-1 text-sm font-normal w-full"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="establishmentAddress">Address of the commercial establishment</Label>
                                    <Input
                                        id="establishmentAddress"
                                        placeholder="Establishment Address"
                                        className="mt-1 text-sm font-normal w-full"
                                    />
                                </div>
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Establishment Contact Information"
                            icon={<Contact className="h-4 w-4 text-teal-600" />}
                        >
                            <div className="space-y-4 font-tt-commons">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="establishmentContactNumber">Contact number of the commercial establishment</Label>
                                        <Input
                                            id="establishmentContactNumber"
                                            placeholder="Contact Number"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="establishmentEmail">Official email address</Label>
                                        <Input
                                            id="establishmentEmail"
                                            placeholder="Email Address"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="contactPerson">Name of contact person</Label>
                                    <Input id="contactPerson" placeholder="Contact Person" className="mt-1 text-sm font-normal w-full" />
                                </div>
                                <div>
                                    <Label htmlFor="position">Position</Label>
                                    <Input id="position" placeholder="Position" className="mt-1 text-sm font-normal w-full" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="contactPersonNumber">Contact number of the contact person</Label>
                                        <Input
                                            id="contactPersonNumber"
                                            placeholder="Contact Number"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="contactPersonEmail">Email address of the contact person</Label>
                                        <Input
                                            id="contactPersonEmail"
                                            placeholder="Email Address"
                                            className="mt-1 text-sm font-normal w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SectionCard>
                    </TabsContent>
                </Tabs>
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
