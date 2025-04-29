"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
    Briefcase,
    Building2,
    BuildingIcon,
    ChevronLeft,
    ChevronRight,
    Contact,
    FileText,
    HomeIcon as House,
    MapPin,
    User,
    Users,
    Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { FileUpload } from "@/components/application form - components/FileUpload"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"

const queryClient = new QueryClient()

function FormWithQueryClientProvider() {
    return (
        <QueryClientProvider client={queryClient}>
            <FranchiseeApplicationForm />
        </QueryClientProvider>
    )
}

type FieldOption = {
    value: string
    label: string
}

type Field = {
    id: string
    label: string
    type: string
    placeholder?: string
    description?: string
    required: boolean
    options?: FieldOption[]
}

type Section = {
    title: string
    icon: string
    description?: string
    fields?: Field[]
}

type Step = {
    id: number
    name: string
    icon: string
    sections: Section[]
}

type FormSchema = {
    steps: Step[]
}

type QuestionResponse = {
    messages: string
    data: {
        count: string
        items: any[]
        next?: string
        previous?: string
        result?: any[]
    }
}

function FranchiseeApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formSchema, setFormSchema] = useState<FormSchema | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageLimit, setPageLimit] = useState(5)
    const searchParams = useSearchParams()
    const router = useRouter()

    const userInvitedId = searchParams.get("userInvitedId")

    const [backendUrl, setBackendUrl] = useState("")

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
        setBackendUrl(url)
        console.log("Backend URL set to:", url)
    }, [])

    const {
        data: questionData,
        isLoading: questionsLoading,
        error: questionsError,
        refetch: refetchQuestions,
    } = useQuery({
        queryKey: ["applicationQuestions", userInvitedId, backendUrl, currentPage, pageLimit],
        queryFn: async () => {
            if (!userInvitedId || !backendUrl) {
                throw new Error("Missing required parameters")
            }

            const url = `${backendUrl}/api/application/get-application-question?userInvitedId=${userInvitedId}&page=${currentPage}&limit=${pageLimit}`
            console.log(`Fetching questions from: ${url}`)

            const response = await fetch(url)
            if (!response.ok) {
                console.error("Questions API error:", response.status, response.statusText)
                throw new Error(`Failed to fetch application questions: ${response.status} ${response.statusText}`)
            }
            return response.json() as Promise<QuestionResponse>
        },
        enabled: !!backendUrl && !!userInvitedId,
    })

    // Function to handle fetching the next page
    const fetchNextPage = async () => {
        if (questionData?.data?.next) {
            try {
                // Extract page and limit from next URL 
                const nextUrl = new URL(questionData.data.next, backendUrl);
                const nextPage = nextUrl.searchParams.get("page");
                const nextLimit = nextUrl.searchParams.get("limit");

                if (nextPage) {
                    setCurrentPage(parseInt(nextPage));
                }
                if (nextLimit) {
                    setPageLimit(parseInt(nextLimit));
                }

                await queryClient.invalidateQueries({ queryKey: ["applicationQuestions"] });
            } catch (error) {
                console.error("Error fetching next page:", error);
            }
        }
    }

    // Function to handle fetching the previous page
    const fetchPreviousPage = async () => {
        if (questionData?.data?.previous) {
            try {
                // Extract page and limit from previous URL
                const prevUrl = new URL(questionData.data.previous, backendUrl);
                const prevPage = prevUrl.searchParams.get("page");
                const prevLimit = prevUrl.searchParams.get("limit");

                if (prevPage) {
                    setCurrentPage(parseInt(prevPage));
                }
                if (prevLimit) {
                    setPageLimit(parseInt(prevLimit));
                }

                await queryClient.invalidateQueries({ queryKey: ["applicationQuestions"] });
            } catch (error) {
                console.error("Error fetching previous page:", error);
            }
        }
    }

    // Fetch form schema
    const {
        data: schemaData,
        isLoading: schemaLoading,
        error: schemaError,
    } = useQuery({
        queryKey: ["formSchema", backendUrl, userInvitedId],
        queryFn: async () => {
            if (!backendUrl || !userInvitedId) {
                throw new Error("Backend URL or userInvitedId not set")
            }

            const url = `${backendUrl}/api/application/get-application-question?userInvitedId=${userInvitedId}&page=2&limit=1`
            console.log(`Fetching schema from: ${url}`)

            const response = await fetch(url)
            if (!response.ok) {
                console.error("Schema API error:", response.status, response.statusText)
                throw new Error(`Failed to fetch form schema: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            console.log("Raw schema API response:", data)

            if (!data || typeof data !== "object") {
                console.error("Invalid schema data format:", data)
                return { steps: [] } as FormSchema
            }

            if (data.data && typeof data.data === "object") {
                return data.data as FormSchema
            }

            return data as FormSchema
        },
        enabled: !!backendUrl && !!userInvitedId,
    })


    useEffect(() => {
        try {
            console.log("Schema data received:", schemaData)
            console.log("Question data received:", questionData)

            if (schemaData) {
                const validSchema = schemaData.steps ? schemaData : { steps: [] }

                if (questionData) {
                    const updatedSchema = transformSchemaWithQuestions(validSchema, questionData)
                    setFormSchema(updatedSchema)
                    console.log("Form schema and questions loaded successfully", updatedSchema)
                } else {
                    setFormSchema(validSchema)
                    console.log("Form schema loaded, no questions data", validSchema)
                }
            } else {
                setFormSchema({ steps: [] })
            }
        } catch (error) {
            console.error("Error processing form schema:", error)
        }
    }, [schemaData, questionData])

    // Function to transform schema with question data
    const transformSchemaWithQuestions = (schema: FormSchema, questions: QuestionResponse): FormSchema => {
        // Clone the schema to avoid direct mutation
        const updatedSchema = JSON.parse(JSON.stringify(schema)) as FormSchema
        console.log("Original schema structure:", schema)
        console.log("Transforming schema with questions data:", questions)

        // Check if schema has the expected structure
        if (!updatedSchema || !Array.isArray(updatedSchema.steps)) {
            console.error("Invalid schema format:", updatedSchema)
            updatedSchema.steps = updatedSchema.steps || []
            return updatedSchema
        }

        if (questions.data && questions.data.result && questions.data.result.length > 0) {
            console.log("Found question data to transform schema:", questions.data.result)

            // For each category in the result
            questions.data.result.forEach((category) => {
                const step = updatedSchema.steps.find((s) => s.id === category.requirementStep)

                if (!step) {
                    // If no matching step exists, we could create one
                    console.log(`Creating new step for category ${category.categoryName}`)
                }
            })
        }

        return updatedSchema
    }

    const totalSteps = formSchema?.steps.length || 6

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
            fetchNextPage()
        }
    }

    const handleSubmit = async () => {
        try {
            const formData = {
                userInvitedId,
            }

            // Submit the form data
            const response = await fetch(`${backendUrl}/api/application/submit-application`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error("Failed to submit application")
            }

            // Move to success step
            setCurrentStep(6)
        } catch (error) {
            console.error("Error submitting application:", error)
            // Handle submission error
            alert("There was an error submitting your application. Please try again.")
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
            fetchPreviousPage()
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
            FileText: <FileText className="h-5 w-5" />,
            Check: <Check className="h-5 w-5" />,
        }
        return iconMap[iconName] || <div className="h-5 w-5"></div>
    }

    const isLoading = schemaLoading || questionsLoading
    const error = schemaError || questionsError

    if (isLoading) {
        return (
            <div className="container mx-auto py-20 flex justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                    <p className="mt-4 text-gray-600">Loading form...</p>
                </div>
            </div>
        )
    }

    if (error && !formSchema) {
        return (
            <div className="container mx-auto py-20 flex justify-center">
                <div className="flex flex-col items-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p>{error instanceof Error ? error.message : "Error loading form data. Please try again later."}</p>
                        <p className="text-sm mt-2">
                            Check that your backend server is running on {backendUrl} and the API endpoints are configured correctly.
                        </p>
                        <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white" onClick={() => window.location.reload()}>
                            Retry
                        </Button>
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
                <Image src="/mare-logo.svg?height=300&width=200" alt="MARE Logo" width={200} height={300} className="mb-2" />
                <h1 className="text-2xl font-bold text-center font-tt-commons">Franchisee Application Form</h1>
                <p className="text-gray-500 text-center font-tt-commons font-bold">
                    Onboarding businesses committed to sustainable waste management.
                </p>
            </div>

            {/* Display user ID for debugging */}
            <div className="mb-4 text-sm text-gray-500">Application ID: {userInvitedId}</div>

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

            {/* Display pagination information */}
            {questionData?.data?.next || questionData?.data?.previous ? (
                <div className="mb-4 text-xs text-gray-500 flex justify-between">
                    <span>Page {currentPage}</span>
                    <span>
                        {questionData?.data?.previous && (
                            <button
                                onClick={fetchPreviousPage}
                                className="text-teal-600 hover:underline mr-4"
                            >
                                Previous Page
                            </button>
                        )}
                        {questionData?.data?.next && (
                            <button
                                onClick={fetchNextPage}
                                className="text-teal-600 hover:underline"
                            >
                                Next Page
                            </button>
                        )}
                    </span>
                </div>
            ) : null}

            {/* Form Content */}
            <div className="bg-white rounded-lg border p-6">
                {renderFormStep(currentStep, formSchema, getIconComponent, questionData)}

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
                    {currentStep < 5 ? (
                        <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

function renderFormStep(
    step: number,
    formSchema: FormSchema,
    getIconComponent: (iconName: string) => React.ReactNode,
    questionData?: QuestionResponse,
) {
    const currentStep = formSchema.steps.find((s) => s.id === step)

    if (!currentStep) {
        if (questionData && questionData.data && questionData.data.result && step <= 5) {
            return renderQuestionsFromData(questionData, step)
        }
        return null
    }

    if (step === 6) {
        // Success step
        return <SuccessStep description={currentStep.sections[0]?.description} />
    }

    return (
        <div>
            <StepHeader title={currentStep.name} icon={getIconComponent(currentStep.icon)} />

            {currentStep.sections.map((section, index) => (
                <SectionCard key={index} title={section.title} icon={getIconComponent(section.icon)}>
                    {renderSectionFields(section, questionData)}
                </SectionCard>
            ))}
        </div>
    )
}

function renderQuestionsFromData(questionData: QuestionResponse, currentStep: number) {
    if (!questionData.data.result || questionData.data.result.length === 0) {
        return (
            <div className="p-4 text-center">
                <p>No questions available for this step.</p>
            </div>
        )
    }

    // Get the category data for the current step
    const categoryData = questionData.data.result.find((cat) => cat.requirementStep === currentStep)

    if (!categoryData) {
        return (
            <div className="p-4 text-center">
                <p>No questions available for step {currentStep}.</p>
            </div>
        )
    }

    return (
        <div>
            <StepHeader
                title={categoryData.categoryName || `Step ${currentStep}`}
                icon={<MapPin className="h-4 w-4 text-emerald-600" />}
            />

            {categoryData.sections &&
                categoryData.sections.map((section: { sectionName: string; questions: any[] }, sectionIndex: number) => (
                    <SectionCard
                        key={sectionIndex}
                        title={section.sectionName}
                        icon={<Building2 className="h-4 w-4 text-emerald-600" />}
                    >
                        <div className="space-y-4">
                            {section.questions &&
                                section.questions.map((question, questionIndex) => (
                                    <div key={questionIndex} className="space-y-2">
                                        {renderQuestionByType(question)}
                                    </div>
                                ))}
                        </div>
                    </SectionCard>
                ))}
        </div>
    )
}

function renderQuestionByType(question: any) {
    const { component, question: questionText, isRequired, placeholder, choices } = question

    switch (component) {
        case "radiogroup":
            return (
                <>
                    <p className="text-sm mb-3 font-tt-commons font-semibold">
                        {questionText} {isRequired && <span className="text-red-500">*</span>}
                    </p>
                    <RadioGroup defaultValue={choices?.[0]?.id}>
                        <div className="space-y-2 font-tt-commons">
                            {choices?.map((choice: any) => (
                                <div
                                    key={choice.id}
                                    className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white"
                                >
                                    <RadioGroupItem value={choice.id} id={choice.id} className="text-emerald-700" />
                                    <Label htmlFor={choice.id}>{choice.name}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </>
            )
        case "input_text":
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={question.questionId}>
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                    </div>
                    <Input
                        id={question.questionId}
                        placeholder={placeholder || ""}
                        className="text-sm font-normal shadow-lg w-full"
                        required={isRequired}
                    />
                    {question.description && <p className="text-xs text-gray-500 mt-1 ml-2">{question.description}</p>}
                </>
            )
        case "date":
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={question.questionId}>
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                    </div>
                    <div className="relative w-full">
                        <Input
                            id={question.questionId}
                            type="date"
                            placeholder={placeholder || "Select a date"}
                            className="text-sm font-normal shadow-lg w-full pr-10"
                            required={isRequired}
                        />
                    </div>
                    {question.description && <p className="text-xs text-gray-500 mt-1 ml-2">{question.description}</p>}
                </>
            )

        case "input_email":
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={question.questionId}>
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                    </div>
                    <Input
                        id={question.questionId}
                        type="email"
                        placeholder={placeholder || ""}
                        className="text-sm font-normal shadow-lg w-full"
                        required={isRequired}
                    />
                    {question.description && <p className="text-xs text-gray-500 mt-1 ml-2">{question.description}</p>}
                </>
            )
        case "textarea":
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={question.questionId}>
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                    </div>
                    <Textarea
                        id={question.questionId}
                        placeholder={placeholder || ""}
                        className="min-h-[110px]"
                        required={isRequired}
                    />
                    {question.description && <p className="text-xs text-gray-500 mt-1 ml-2">{question.description}</p>}
                </>
            )
        case "select":
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={question.questionId}>
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                    </div>
                    <Select>
                        <SelectTrigger id={question.questionId} className="w-full">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {choices?.map((choice: any) => (
                                <SelectItem key={choice.id} value={choice.id}>
                                    {choice.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {question.description && <p className="text-xs text-gray-500 mt-1 ml-2">{question.description}</p>}
                </>
            )
        case "select_upload":
            return (
                <>
                    <div className="font-tt-commons font-semibold mb-2">
                        <Label htmlFor={question.questionId}>
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </Label>
                    </div>
                    <div className="mb-4">
                        <Select>
                            <SelectTrigger id={question.questionId} className="w-full py-6 shadow-md">
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                {choices?.map((choice: any) => (
                                    <SelectItem key={choice.id} value={choice.id}>
                                        {choice.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Required Documents:</h4>
                        <ol className="list-decimal pl-5 space-y-1 text-sm">
                            <li>IPC Registration (whenever applicable)</li>
                            <li>Articles of Incorporation</li>
                            <li>By Laws</li>
                            <li>DTI Registration</li>
                            <li>PCAB registration (whenever applicable)</li>
                        </ol>
                    </div>
                    <div className="border-2 border-solid rounded-lg p-4 text-center bg-white">
                        <div className="flex flex-col items-center my-4">
                            <FileUpload />
                            <p className="text-sm text-secondary-500 mt-4">Drag & drop here to upload,<br />or click the button above.</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Submit Document</Button>
                    </div>
                </>
            )

        default:
            return (
                <div className="p-4 border rounded-md bg-gray-50">
                    <p className="font-semibold">{questionText}</p>
                    <p className="text-sm text-gray-500">Unsupported question type: {component}</p>
                </div>
            )
    }
}

function renderSectionFields(section: Section, questionData?: QuestionResponse) {
    if (!section.fields) {
        return null
    }

    return (
        <div className="space-y-4">
            {section.fields.map((field, index) => (
                <div key={index} className="space-y-2">
                    {renderField(field, questionData)}
                </div>
            ))}
        </div>
    )
}

function renderField(field: Field, questionData?: QuestionResponse) {
    switch (field.type) {
        case "input":
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
                    {field.description && <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>}
                </>
            )
        case "email":
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
                    {field.description && <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>}
                </>
            )
        case "date":
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
                    {field.description && <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>}
                </>
            )
        case "textarea":
            return (
                <>
                    <div className="font-tt-commons font-semibold">
                        <Label htmlFor={field.id}>{field.label}</Label>
                    </div>
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        className={field.id === "interest" ? "min-h-[350px]" : "min-h-[110px]"}
                        required={field.required}
                    />
                    {field.description && <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>}
                </>
            )
        case "radio":
            return (
                <>
                    <p className="text-sm mb-3 font-tt-commons font-semibold">{field.label}</p>
                    <RadioGroup defaultValue={field.options?.[0].value}>
                        <div className={`space-y-2 ${field.id === "businessStructure" ? "w-1/3" : "w-1/2"} font-tt-commons`}>
                            {field.options?.map((option) => (
                                <div
                                    key={option.value}
                                    className="flex items-center space-x-2 border rounded-md p-3 border-gray-300 bg-white"
                                >
                                    <RadioGroupItem value={option.value} id={option.value} className="text-emerald-700" />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </>
            )
        case "select":
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
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {field.description && <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>}
                </>
            )
        case "file":
            return <FileUploadField field={field} />
        default:
            return null
    }
}

function FileUploadField({ field }: { field: Field }) {
    return (
        <>
            <div className="font-tt-commons font-semibold mb-2">
                <Label htmlFor={field.id}>{field.label}</Label>
            </div>
            <div className="border-2 border-solid rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                    <FileUpload />
                </div>
                {field.description && <p className="text-xs text-gray-500 mt-1">{field.description}</p>}
            </div>
        </>
    )
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
                {description ||
                    "Thank you for applying to become a MARE! franchise partner. Your application is under review. You will receive an update via email once a decision is made."}
            </p>
        </div>
    )
}

export default FormWithQueryClientProvider
