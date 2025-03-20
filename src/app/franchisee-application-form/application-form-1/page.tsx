"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ButtonLink, ButtonPrimary, ButtonSecondary } from "@/components/application form - components/Button"; // Importing Button component
import Link from "next/link";

export default function ApplicationForm() {
    return (
        <main className="bg-emerald-600 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg flex flex-col">
                {/* Center the image */}
                <div className="flex justify-center mt-8">
                    <Image
                        src="/mare-logo.svg"
                        alt="logo"
                        className="object-center"
                        width={200}
                        height={200}
                    />
                </div>

                {/* Pagination Section */}
                <div className="flex justify-center space-x-1 text-gray-300 mt-2">
                    <span>1</span>
                    <span>/</span>
                    <span>3</span>
                </div>

                {/* Title and Subtitle */}
                <div className="text-black text-xl font-roboto font-semibold text-center mt-3">
                    Franchisee Application Form
                </div>
                <div className="text-gray-500 text-xs font-roboto text-center mt-1">
                    Onboarding businesses committed to sustainable waste management.
                </div>

                {/* Form Section */}
                <div className="mt-8 space-y-6 px-4 sm:px-16">
                    {/* Franchisee Name */}
                    <div>
                        <label
                            htmlFor="franchiseeName"
                            className="text-black text-sm font-roboto font-semibold block"
                        >
                            Franchisee Name
                        </label>
                        <Input
                            id="franchiseeName"
                            className="w-full border border-gray-300 mt-2 p-2 rounded-lg"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Franchisee Type */}
                    <div>
                        <label
                            htmlFor="franchiseeType"
                            className="text-black text-sm font-roboto font-semibold block mb-2"
                        >
                            Franchisee Type
                        </label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Franchisee Type" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="wasteCol">Waste Collection</SelectItem>
                                <SelectItem value="recFal">Recycling Facility</SelectItem>
                                <SelectItem value="compServ">Composting Service</SelectItem>
                                <SelectItem value="eManagement">E-Waste Management</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Franchisee Address */}
                    <div>
                        <label
                            htmlFor="franchiseeAddress"
                            className="text-black text-sm font-roboto font-semibold block"
                        >
                            Franchisee Address
                        </label>
                        <Input
                            id="franchiseeAddress"
                            className="w-full border border-gray-300 mt-2 p-2 rounded-lg"
                            placeholder="Enter your address"
                        />
                    </div>

                    {/* Years in Operation */}
                    <div>
                        <label
                            htmlFor="yearOperation"
                            className="text-black text-sm font-roboto font-semibold block mb-2"
                        >
                            Years in Operation
                        </label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Years in Operation" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                <SelectItem value="year1-4">1-4 years</SelectItem>
                                <SelectItem value="year5-7">5-7 years</SelectItem>
                                <SelectItem value="year8-10">8-10 years</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end">
                        <div className="mr-2">
                            <ButtonSecondary />
                        </div>

                        <Link href="/franchisee-application-form/application-form-2">
                            <ButtonPrimary />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
