"use client"

import type React from "react"
import { useRef, useState } from "react"
import { FileText, Upload } from "lucide-react"

export function FileUpload() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"]
    const maxFileSize = 5 * 1024 * 1024 // 5MB in bytes

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click() // Trigger the file input click
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]
            if (allowedFileTypes.includes(file.type) && file.size <= maxFileSize) {
                setSelectedFile(file)
            } else {
                alert(`File "${file.name}" is either too large or of an unsupported type.`)
            }
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            if (allowedFileTypes.includes(file.type) && file.size <= maxFileSize) {
                setSelectedFile(file)
            } else {
                alert(`File "${file.name}" is either too large or of an unsupported type.`)
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div
                className="flex flex-col items-center justify-center w-full cursor-pointer"
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 mb-2 flex items-center justify-center">
                        {selectedFile ? (
                            <FileText className="w-16 h-16 text-orange-400" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-orange-400" />
                            </div>
                        )}
                    </div>

                    {selectedFile ? (
                        <div className="text-center">
                            <p className="text-sm font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Drag and drop your file here, or click to browse</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPEG, PNG (max. 10MB)</p>
                        </div>
                    )}
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
            />
        </div>
    )
}
