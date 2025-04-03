"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ReviewPageProps {
    formData: {
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
}

export default function ReviewInformation({ formData }: ReviewPageProps) {
    const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + " " : ""}${formData.lastName}`

    return (
        <div className="min-h-screen bg-[#00856F] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                    {/* Logo and Header */}
                    <div className="flex flex-col items-center mb-6">
                        <Image
                            src="/placeholder.svg?height=60&width=150"
                            alt="MARE! Logo"
                            width={150}
                            height={60}
                            className="mb-4"
                        />
                        <h1 className="text-2xl font-bold text-center text-gray-800">Franchisee Application Form</h1>
                        <p className="text-center text-gray-500 mt-1">
                            Onboarding businesses committed to sustainable waste management.
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
                        <div className="bg-[#00856F] h-2 rounded-full transition-all duration-300" style={{ width: "75%" }} />
                    </div>

                    {/* Review Content */}
                    <div className="space-y-6">
                        <h2 className="font-medium text-lg">Review Your Information</h2>

                        {/* Basic Information Section */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="font-medium mb-4">Basic Information</h3>

                            <div className="grid grid-cols-2 gap-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="text-sm">{formData.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-sm">{fullName}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="text-sm">{formData.addressLine1}</p>
                                    {formData.addressLine2 && <p className="text-sm">{formData.addressLine2}</p>}
                                    <p className="text-sm">
                                        {formData.city}, {formData.province}
                                    </p>
                                    <p className="text-sm">{formData.barangay}, Philippines</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Community/Establishment Name</p>
                                    <p className="text-sm">{formData.establishmentName}</p>
                                </div>
                            </div>
                        </div>

                        {/* Homeowners Association Details Section */}
                        {(formData.communityType === "hoa" || formData.communityType === "both") && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium mb-4">Homeowners Association Details</h3>

                                <div className="grid grid-cols-2 gap-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Name</p>
                                        <p className="text-sm">{formData.hoaName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Subdivision/Village Name</p>
                                        <p className="text-sm">{formData.villageName}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">Subdivision/Village Address</p>
                                        <p className="text-sm">{formData.villageAddress}</p>
                                        <p className="text-sm">Pasay, Philippines</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-500">HOA Office Address</p>
                                        <p className="text-sm">{formData.hoaOfficeAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Contact Number</p>
                                        <p className="text-sm">{formData.hoaContactNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">HOA Email</p>
                                        <p className="text-sm">{formData.officialEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Person</p>
                                        <p className="text-sm">{formData.contactPerson}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Position</p>
                                        <p className="text-sm">{formData.position}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Person Number</p>
                                        <p className="text-sm">{formData.contactPersonNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Contact Person Email</p>
                                        <p className="text-sm">{formData.contactPersonEmail}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-end mt-6">
                            <Button type="button" className="bg-[#00856F] hover:bg-[#006F5C]">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

