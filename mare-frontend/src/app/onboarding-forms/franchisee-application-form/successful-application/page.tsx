"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { ButtonSubmit, ButtonLink } from "@/components/application form - components/Button";
import { FileUpload } from "@/components/application form - components/FileUpload";
import Link from "next/link";

export default function ApplicationForm() {
    return (
        <main className="bg-emerald-600 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-4xl p-8 sm:p-12 rounded-lg shadow-lg flex flex-col">

                {/* Center the image */}
                <div className="flex justify-center mt-2">
                    <Image
                        src="/mare-logo.svg"
                        alt="logo"
                        className="object-center"
                        width={150}
                        height={150}
                    />
                </div>

                <div className="flex justify-center mt-20">
                    <Image
                        src="/complete-logo.png"
                        alt="complete"
                        className="object-center"
                        width={200}
                        height={200}
                    />
                </div>

                <div className="text-center mt-8">
                    <span className="font-semibold font-roboto text-2xl">Application successfully submitted!</span>
                    <div className="flex justify-center">
                        <p className="text-md w-7/12 text-center mt-3 text-gray-500">
                            Thank you for applying to become a MARE! franchisee partner.
                            Your application is under review. You will receive an update via
                            email once a decision is made.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
