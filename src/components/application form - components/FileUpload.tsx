import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

export function FileUpload() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const allowedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/png"];
    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const validatedFiles: File[] = [];
            Array.from(files).forEach((file) => {
                if (allowedFileTypes.includes(file.type) && file.size <= maxFileSize) {
                    validatedFiles.push(file);
                } else {
                    console.error(`File "${file.name}" is either too large or of an unsupported type.`);
                }
            });

            const newFiles = [...selectedFiles, ...validatedFiles].slice(0, 1); // Limit to 1 file
            setSelectedFiles(newFiles); // Store valid selected files
            console.log("Valid files selected:", newFiles); // Log selected files
        }
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center justify-center my-2 rounded-lg bg-gray-100 p-4 md:p-6 lg:p-8">
            {/* Clickable Upload Area */}
            <div
                className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-teal-500 transition w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
                onClick={handleClick}
            >
                <Upload className="w-12 h-12 text-teal-500" />
                <p className="mt-2 text-teal-500 text-xs font-tt-commons text-center">
                    Click to upload PDF, DOC, DOCX, JPG, or PNG (max 10MB)
                </p>
                {selectedFiles.length === 0 && (
                    <p className="text-gray-600 text-sm mt-1">(0/1 file selected)</p>
                )}
            </div>
            {/* Display Selected Files Information */}
            {selectedFiles.length > 0 && (
                <div className="mt-4 text-gray-600 text-sm justify-start w-full">
                    <p>Selected File:</p>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index} className="mb-2">
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <div>
                                        <p>
                                            <strong>File Name:</strong> {file.name}
                                        </p>
                                        <p>
                                            <strong>File Size:</strong> {file.size} bytes
                                        </p>
                                    </div>
                                    <button
                                        className="text-red-600 hover:text-red-800 transition ml-4"
                                        onClick={() => handleRemoveFile(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Hidden File Input */}
            <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}