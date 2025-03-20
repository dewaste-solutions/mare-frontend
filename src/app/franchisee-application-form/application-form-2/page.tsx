"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ButtonPrimary, ButtonSecondary, ButtonLink } from "@/components/application form - components/Button"; // Importing Button component
import Link from "next/link";

export default function ApplicationForm() {
    return (
        <main className="bg-emerald-600 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg flex flex-col">
                <Link href="./application-form-1">
                    <ButtonLink />
                </Link>
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
                    <span>2</span>
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
                            htmlFor="contactpersonName"
                            className="text-black text-sm font-roboto font-semibold block"
                        >
                            Contact Person Name
                        </label>
                        <Input
                            id="contactpersonName"
                            className="w-full border border-gray-300 mt-2 p-2 rounded-lg"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Franchisee Type */}
                    <div>
                        <label
                            htmlFor="contactEmail"
                            className="text-black text-sm font-roboto font-semibold block"
                        >
                            Contact Email
                        </label>
                        <Input
                            id="contactEmail"
                            className="w-full border border-gray-300 mt-2 p-2 rounded-lg"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Franchisee Address */}
                    <div>
                        <label
                            htmlFor="contactNum"
                            className="text-black text-sm font-roboto font-semibold block"
                        >
                            Contact Phone Number
                        </label>
                        <Input
                            id="contactNum"
                            className="w-full border border-gray-300 mt-2 p-2 rounded-lg"
                            placeholder="Enter number"
                        />
                    </div>

                    {/* Franchise Interest Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="text-black text-sm font-roboto font-semibold block"
                        >
                            Franchise Interest Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full border field-sizing-fixed h-32 border-gray-300 mt-2 p-2 rounded-lg text-sm"
                            placeholder=""
                        />
                    </div>

                    <div className="flex justify-end">
                        <div className="mr-2">
                            <ButtonSecondary />
                        </div>

                        <Link href="./application-form-3">
                            <ButtonPrimary />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
