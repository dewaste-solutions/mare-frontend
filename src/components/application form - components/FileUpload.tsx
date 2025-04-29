"use client"

import type React from "react"

import { useState } from "react"
import { FileUp } from "lucide-react"

export const FileUpload = () => {
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setFileName(file.name)
        } else {
            setFileName(null)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-secondary-500 font-semibold py-2 px-4 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
                <div className="flex items-center">
                    <FileUp className="h-36 w-24" />
                </div>
            </label>
            <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
        </div>
    )
}
