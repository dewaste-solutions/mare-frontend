"use client"

import { useEffect, useState } from "react"
import {
    Briefcase,
    Building2,
    BuildingIcon,
    ChevronLeft,
    ChevronRight,
    Contact,
    FileText,
    House,
    HomeIcon as HouseIcon,
    LuggageIcon,
    MapPin,
    User,
    Users,
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { FileUpload } from "@/components/application form - components/FileUpload"

// Types for our form schema
type FieldOption = {
    value: string;
    label: string;
}

type Field = {
    id: string;
    label: string;
    type: string;
    placeholder?: string;
    description?: string;
    required: boolean;
    options?: FieldOption[];
}

type Section = {
    title: string;
    icon: string;
    description?: string;
    fields?: Field[];
}

type Step = {
    id: number;
    name: string;
    icon: string;
    sections: Section[];
}

type FormSchema = {
    steps: Step[];
}

export default function FranchiseeApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formSchema, setFormSchema] = useState<FormSchema | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFormSchema = async () => {
            try {
                const response = await fetch('/api/franchisee_formSchema')
                if (!response.ok) {
                    throw new Error('Failed to fetch form schema')
                }
                const data = await response.json()
                setFormSchema(data)
                setLoading(false)
            } catch (err) {
                setError('Error loading form data. Please try again later.')
                setLoading(false)
                console.error('Error fetching form schema:', err)
            }
        }

        fetchFormSchema()
    }, [])

    const totalSteps = formSchema?.steps.length || 6

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleSubmit = () => {
        // temporary function to simulate form submission
        setCurrentStep(6)
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    // Helper function to get the icon component
    const getIconComponent = (iconName: string) => {
        const iconMap: Record<string, React.ReactNode> = {
            User: <User className="h-5 w-5" />,
            Contact: <Contact className="h-4 w-4 text-emerald-600" />,
            MapPin: <MapPin className="h-5 w-5" />,
            Building2: <Building2 className="h-4 w-4 text-emerald-600" />,
            Briefcase: <Briefcase className="h-4 w-4 text-emerald-600" />,
            BuildingIcon: <BuildingIcon className="h-5 w-5" />,
            Users: <Users className="h-4 w-4 text-emerald-600" />,
            House: <House className="h-5 w-5" />,
            HouseIcon: <HouseIcon className="h-4 w-4 text-emerald-600" />,
            FileText: <FileText className="h-5 w-5" />,
            Check: <Check className="h-5 w-5" />,
        }
        return iconMap[iconName] || <div className="h-5 w-5"></div>
    }

    if (loading) {
        return (
            <div className="container mx-auto py-20 flex justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    <p className="mt-4 text-gray-600">Loading form...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-20 flex justify-center">
                <div className="flex flex-col items-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!formSchema) {
        return null
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="flex flex-col items-center mb-8">
                <Image src="/mare-logo.svg?height=300&width=200" alt="Success!" width={200} height={300} className="mb-2" />
                <h1 className="text-2xl font-bold text-center font-tt-commons">Franchisee Application Form</h1>
                <p className="text-gray-500 text-center font-tt-commons font-bold">
                    Onboarding businesses committed to sustainable waste management.
                </p>
            </div>

            {/* Progress Bar */}
            {currentStep < 6 && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold font-tt-commons">
                            Step {currentStep} of {totalSteps - 1}: {formSchema.steps[currentStep - 1]?.name || ""}
                        </span>
                    </div>
                    <div className="relative">
                        <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className="h-2 bg-red-300 rounded-full transition-all duration-300"
                                style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between absolute -top-2 w-full text-white bg-yellow">
                            {Array.from({ length: totalSteps - 1 }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${index + 1 <= currentStep ? "bg-yellow-300" : "bg-gray-200"}`}
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
                {renderFormStep(currentStep, formSchema, getIconComponent)}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    {currentStep !== 6 && (
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                    )}
                    {currentStep === 5 ? (
                        <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Submit Application
                        </Button>
                    ) : currentStep < 5 ? (
                        <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

function renderFormStep(step: number, formSchema: FormSchema, getIconComponent: (iconName: string) => React.ReactNode) {
    const currentStep = formSchema.steps.find(s => s.id === step)

    if (!currentStep) {
        return null
    }

    if (step === 6) {
        // Success step
        return <SuccessStep description={currentStep.sections[0]?.description} />
    }

    return (
        <div>
            <StepHeader
                title={currentStep.name}
                icon={getIconComponent(currentStep.icon)}
            />

            {currentStep.sections.map((section, index) => (
                <SectionCard
                    key={index}
                    title={section.title}
                    icon={getIconComponent(section.icon)}
                >
                    {renderSectionFields(section)}
                </SectionCard>
            ))}
        </div>
    )
}

function renderSectionFields(section: Section) {
    if (!section.fields) {
        return null
    }

    return (
        <div className="space-y-4">
            {section.fields.map((field, index) => (
                <div key={index} className="space-y-2">
                    {renderField(field)}
                </div>
            ))}
        </div>
    )
}

function renderField(field: Field) {
    switch (field.type) {
        case 'input':
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                    <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        className="text-sm font-normal shadow-lg w-full"
                        required={field.required}
                    />
                    {field.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>
                    )}
                </>
            )
        case 'email':
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                    <Input
                        id={field.id}
                        type="email"
                        placeholder={field.placeholder}
                        className="text-sm font-normal shadow-lg w-full"
                        required={field.required}
                    />
                    {field.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>
                    )}
                </>
            )
        case 'date':
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                    <Input
                        id={field.id}
                        type="date"
                        placeholder={field.placeholder}
                        className="text-sm font-normal shadow-lg w-full"
                        required={field.required}
                    />
                    {field.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>
                    )}
                </>
            )
        case 'textarea':
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        className={field.id === 'interest' ? "min-h-[350px]" : "min-h-[110px]"}
                        required={field.required}
                    />
                    {field.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>
                    )}
                </>
            )
        case 'radio':
            return (
                <>
                    <p className="text-sm mb-3 font-tt-commons font-semibold">{field.label}</p>
                    <RadioGroup defaultValue={field.options?.[0].value}>
                        <div className={`space-y-2 ${field.id === 'businessStructure' ? 'w-1/3' : 'w-1/2'} font-tt-commons`}>
                            {field.options?.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white">
                                    <RadioGroupItem value={option.value} id={option.value} className="text-emerald-700" />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </>
            )
        case 'select':
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                    <Select>
                        <SelectTrigger id={field.id} className="w-full">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {field.description && (
                        <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>
                    )}
                </>
            )
        case 'file':
            return (
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <FileUpload />
                    </div>
                </div>
            )
        default:
            return null
    }
}

function StepHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
    return (
        <div className="bg-formPrimary p-4 rounded-lg mb-6 flex items-center gap-2 text-teal-800">
            {icon}
            <h2 className="font-semibold text-emerald-700">{title}</h2>
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
        <div className="mb-6 bg-[#e3f2ef] rounded-lg p-4">
            <div className="pb-2">
                <h3 className="text-base flex items-center gap-2 font-semibold text-teal-800">
                    {icon}
                    {title}
                </h3>
            </div>
            <div className="bg-[#f2f9f7] p-4 rounded-lg">{children}</div>
        </div>
    )
}

function SuccessStep({ description }: { description?: string }) {
    return (
        <div className="flex flex-col items-center justify-center font-tt-commons py-10">
            <div className="mb-6">
                <Image src="/complete-logo.png" alt="Success!" width={150} height={150} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Application Successfully Submitted!</h2>
            <p className="text-gray-600 text-center max-w-md">
                {description || "Thank you for applying to become a MARE! franchise partner. Your application is under review. You will receive an update via email once a decision is made."}
            </p>
        </div>
    )
}