"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { ButtonSubmit, ButtonLink } from "@/components/application form - components/Button";
import { FileUpload } from "@/components/application form - components/FileUpload";
import Link from "next/link";

export default function ApplicationForm() {
    return (
        <main className="bg-emerald-600 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 sm:p-4 rounded-lg shadow-lg flex flex-col">
                <Link href="./application-form-2">
                    <ButtonLink />
                </Link>

                {/* Center the image */}
                <div className="flex justify-center">
                    <Image
                        src="/mare-logo.svg"
                        alt="logo"
                        className="object-center"
                        width={150}
                        height={150}
                    />
                </div>

                {/* Pagination Section */}
                <div className="flex justify-center space-x-1 text-gray-300 mt-1    ">
                    <span>3</span>
                    <span>/</span>
                    <span>3</span>
                </div>

                {/* Title and Subtitle */}
                <div className="text-black text-lg sm:text-xl font-roboto font-semibold text-center mt-1">
                    Franchisee Application Form
                </div>
                <div className="text-gray-500 text-xs sm:text-sm font-roboto text-center mt-1">
                    Onboarding businesses committed to sustainable waste management.
                </div>

                {/* Form Section */}
                <div className="space-y-6 px-4 sm:px-8">
                    <span className="text-black text-sm sm:text-base font-roboto font-semibold block mt-4">
                        File Upload
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm font-roboto block">
                        Required documents to verify business legitimacy and operational capability
                    </span>
                    <ul className="list-disc text-gray-500 text-xs sm:text-sm font-roboto pl-6 sm:pl-8">
                        <li>Business Permit</li>
                        <li>Environmental compliance Certificate</li>
                        <li>Company Profile</li>
                        <li>Proof of Operational Capability</li>
                    </ul>
                    <FileUpload />

                    <div className="flex justify-end">
                        <Link href="./successful-application">
                            <ButtonSubmit />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
