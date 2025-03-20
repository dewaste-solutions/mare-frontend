import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

export function FileUpload() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            // Limit to 4 files
            const newFiles = [...selectedFiles, ...files].slice(0, 4);
            setSelectedFiles(newFiles); // Store the selected files
            console.log("Files selected:", newFiles); // Log selected files
        }
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(selectedFiles.filter((file, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center justify-center my-2   rounded-lg bg-gray-100 p-4 md:p-6 lg:p-8">
            {/* Clickable Upload Area */}
            <div
                className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-teal-500 transition w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
                onClick={handleClick}
            >
                <Upload className="w-12 h-12 text-teal-500" />
                <p className="mt-2 text-teal-500 text-sm font-medium">
                    Upload your documents here
                </p>
                {selectedFiles.length < 4 && (
                    <p className="text-gray-600 text-sm mt-1">
                        ({selectedFiles.length}/4 files selected)
                    </p>
                )}
            </div>
            {/* Display Selected Files Information */}
            {selectedFiles.length > 0 && (
                <div className="mt-4 text-gray-600 text-sm justify-start w-full">
                    <p>Selected Files:</p>
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
