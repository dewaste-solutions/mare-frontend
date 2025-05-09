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

type BasicInfo = {
    firstName: string
    middleName: string
    lastName: string
    birthday: string
    email: string
    addressline1: string
    addressline2: string
    province: string
    city: string
    barangay: string
    interest: string
}

type Location = {
    lugarSaMare: string
    size: string
    googleMaps: string
}

type OrganizationStructure = {
    businessStructure: string
    management: string
    listahanTauhan: string
}

type CommunityProfile = {
    serviceSize: string
    streetName: string
    mareClients: string
    typeofClients: string
}

type UploadedDocument = {
    name: string
    filename: string
}

type FormDataType = {
    basicInfo: {
        firstName: string
        middleName: string
        lastName: string
        birthday: string
        email: string
        addressline1: string
        addressline2: string
        province: string
        city: string
        barangay: string
        interest: string
    }
    location: {
        lugarSaMare: string
        size: string
        googleMaps: string
    }
    organizationStructure: {
        businessStructure: string
        management: string
        listahanTauhan: string
    }
    communityProfile: {
        serviceSize: string
        streetName: string
        mareClients: string
        typeofClients: string
    }
    uploadedDocuments: UploadedDocument[]
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
    const [showVerificationPage, setShowVerificationPage] = useState(false)
    const [formData, setFormData] = useState<FormDataType>({
        basicInfo: {
            firstName: "",
            middleName: "",
            lastName: "",
            birthday: "",
            email: "",
            addressline1: "",
            addressline2: "",
            province: "",
            city: "",
            barangay: "",
            interest: "",
        },
        location: {
            lugarSaMare: "",
            size: "",
            googleMaps: "",
        },
        organizationStructure: {
            businessStructure: "",
            management: "",
            listahanTauhan: "",
        },
        communityProfile: {
            serviceSize: "",
            streetName: "",
            mareClients: "",
            typeofClients: "",
        },
        uploadedDocuments: [

        ],
    })

    // Function for handling document upload
    const handleDocumentUpload = (documentName: string, file: File) => {
        setFormData((prev) => ({
            ...prev,
            uploadedDocuments: [
                ...prev.uploadedDocuments,
                {
                    name: documentName,
                    filename: file.name,
                },
            ],
        }))
    }

    // Add a debugging function to log current form state
    const logFormState = () => {
        console.log("Current form state:", formData)
    }

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
                const nextUrl = new URL(questionData.data.next, backendUrl)
                const nextPage = nextUrl.searchParams.get("page")
                const nextLimit = nextUrl.searchParams.get("limit")

                if (nextPage) {
                    setCurrentPage(Number.parseInt(nextPage))
                }
                if (nextLimit) {
                    setPageLimit(Number.parseInt(nextLimit))
                }

                await queryClient.invalidateQueries({ queryKey: ["applicationQuestions"] })
            } catch (error) {
                console.error("Error fetching next page:", error)
            }
        }
    }

    // Function to handle fetching the previous page
    const fetchPreviousPage = async () => {
        if (questionData?.data?.previous) {
            try {
                // Extract page and limit from previous URL
                const prevUrl = new URL(questionData.data.previous, backendUrl)
                const prevPage = prevUrl.searchParams.get("page")
                const prevLimit = prevUrl.searchParams.get("limit")

                if (prevPage) {
                    setCurrentPage(Number.parseInt(prevPage))
                }
                if (prevLimit) {
                    setPageLimit(Number.parseInt(prevLimit))
                }

                await queryClient.invalidateQueries({ queryKey: ["applicationQuestions"] })
            } catch (error) {
                console.error("Error fetching previous page:", error)
            }
        }
    }

    // Function to determine if a question is related to property ownership
    const isPropertyOwnershipQuestion = (questionText: string): boolean => {
        const text = questionText.toLowerCase().trim()
        return (
            text.includes("property ownership") ||
            text.includes("lugar sa mare") ||
            text.includes("ako ay may lugar") ||
            text.includes("inuupahan") ||
            text.includes("kooperatiba") ||
            text.includes("bahay") ||
            text.includes("kakilala")
        )
    }

    // Function to determine if a question is related to location details
    const isLocationDetailsQuestion = (questionText: string): boolean => {
        const text = questionText.toLowerCase().trim()
        return (
            (text.includes("location details") && !text.includes("google maps")) ||
            text.includes("ito ay may sukat") ||
            text.includes("ibigay ang demonsion") ||
            text.includes("ibahagi ang lugar") ||
            text.includes("size")
        )
    }

    // Function to determine if a question is related to Google Maps
    const isGoogleMapsQuestion = (questionText: string): boolean => {
        const text = questionText.toLowerCase().trim()
        return text.includes("google maps") || text.includes("maps url") || text.includes("maps link")
    }

    // Consolidate location-related handlers into a single function
    const handleLocationFieldChange = (field: keyof Location, value: string) => {
        console.log(`Updating location.${field} to: ${value}`)
        setFormData((prev) => {
            const newState = JSON.parse(JSON.stringify(prev))
            newState.location[field] = value
            console.log("Updated location data:", newState.location)
            return newState
        })
    }

    // Update the field mapping function to be more precise
    const getFieldMapping = (questionText: string, fieldId?: string, sectionTitle?: string) => {
        const text = questionText.toLowerCase().trim();
        const id = fieldId ? fieldId.toLowerCase() : "";
        const section = sectionTitle ? sectionTitle.trim().toLowerCase() : "";
        const normalizedSection = section.replace(/\s+/g, '');

        if (
            text.includes("ibigay ang pangalan ng mga streets") ||
            (
                text.includes("ibigay ang pangalan") && (
                    text.includes("street") ||
                    text.includes("subdibisyon") ||
                    text.includes("komunidad") ||
                    text.includes("barangay")
                )
            )
        ) {
            return { section: "communityProfile", field: "streetName" };
        }

        // Filipino/English mapping for property ownership
        if (
            text.includes("lugar para sa mare") ||
            text.includes("property ownership") ||
            text.includes("ako ay may lugar")
        ) {
            return { section: "location", field: "lugarSaMare" };
        }

        // Filipino/English mapping for size
        if (
            text.includes("sukat") ||
            text.includes("dimension") ||
            text.includes("demonsion") ||
            text.includes("size")
        ) {
            return { section: "location", field: "size" };
        }

        // Filipino/English mapping for Google Maps
        if (
            text.includes("google maps") ||
            text.includes("maps url") ||
            text.includes("maps link") ||
            text.includes("ibahagi ang lugar")
        ) {
            return { section: "location", field: "googleMaps" };
        }

        // Business Structure radio group
        if (normalizedSection === "businessstructure") {
            return { section: "organizationStructure", field: "businessStructure" };
        }

        // Management radio group
        if (normalizedSection === "management") {
            return { section: "organizationStructure", field: "management" };
        }

        if (
            id === "listahanTauhan" ||
            text.includes("ibigay ang lahat ng pangalan ng mga tauhan") ||
            text.includes("listahan ng mga pangalan")
        ) {
            return { section: "organizationStructure", field: "listahanTauhan" };
        }


        if (text.includes("ibigay ang lahat ng pangalan ng mga tauhan")) {
            return { section: "organizationStructure", field: "listahanTauhan" };
        }
        if (text.includes("first name")) return { section: "basicInfo", field: "firstName" };
        if (text.includes("middle name")) return { section: "basicInfo", field: "middleName" };
        if (text.includes("last name")) return { section: "basicInfo", field: "lastName" };
        if (text.includes("birthday") || text.includes("birth date")) return { section: "basicInfo", field: "birthday" };
        if (text.includes("email")) return { section: "basicInfo", field: "email" };
        if (text.includes("address line 1") || text.includes("addressline1") || text.includes("address line1"))
            return { section: "basicInfo", field: "addressline1" };
        if (text.includes("address line 2") || text.includes("addressline2") || text.includes("address line2"))
            return { section: "basicInfo", field: "addressline2" };
        if (text.includes("province")) return { section: "basicInfo", field: "province" };
        if (text.includes("city")) return { section: "basicInfo", field: "city" };
        if (text.includes("barangay")) return { section: "basicInfo", field: "barangay" };
        if (text.includes("interest") && !text.includes("tauhan") && !text.includes("pangalan"))
            return { section: "basicInfo", field: "interest" };
        if (text.includes("service size") || text.includes("service area"))
            return { section: "communityProfile", field: "serviceSize" };
        if (text.includes("street name")) return { section: "communityProfile", field: "streetName" };
        if (text.includes("mare clients") || text.includes("business clients"))
            return { section: "communityProfile", field: "mareClients" };
        if (text.includes("type of clients")) return { section: "communityProfile", field: "typeofClients" };
        if (text.includes("name")) return { section: "basicInfo", field: "lastName" };
        if (text.includes("address")) return { section: "basicInfo", field: "addressline1" };
        if (text.includes("client")) return { section: "communityProfile", field: "mareClients" };
        if (text.includes("service")) return { section: "communityProfile", field: "serviceSize" };
        if (text.includes("location") || text.includes("place")) return { section: "location", field: "lugarSaMare" };
        // Community Profile: Service Area
        if (
            normalizedSection === "servicearea" ||
            text.includes("service area") ||
            text.includes("ilang mga kabahayan") ||
            text.includes("maseserbisyuhan")
        ) {
            return { section: "communityProfile", field: "serviceSize" };
        }

        // Community Profile: Mare Clients (business clients)
        if (
            normalizedSection === "businessclients" ||
            text.includes("business clients") ||
            text.includes("kalapit ng negosyo") ||
            text.includes("magiging kliyente")
        ) {
            return { section: "communityProfile", field: "mareClients" };
        }

        // Community Profile: Type of Clients
        if (
            text.includes("type of clients") ||
            text.includes("uri ng negosyo") ||
            text.includes("uri ng kliyente")
        ) {
            return { section: "communityProfile", field: "typeofClients" };
        }

        if (
            normalizedSection !== "servicearea" &&
            (text.includes("barangay") || id === "barangay")
        ) {
            return { section: "basicInfo", field: "barangay" };
        }
        // Default fallback
        console.warn(`Defaulting to basicInfo.interest for: "${text}"`);
        return { section: "basicInfo", field: "interest" };
    };

    // Add a specific handler for management fields
    const handleManagementChange = (value: string) => {
        console.log(`Setting management to: ${value}`)
        setFormData((prev) => {
            const newState = JSON.parse(JSON.stringify(prev))
            newState.organizationStructure.management = value
            console.log("Updated organizationStructure data:", newState.organizationStructure)
            return newState
        })
    }

    // Direct handler for property ownership fields
    const handlePropertyOwnershipChange = (value: string) => {
        console.log(`Setting property ownership to: ${value}`)
        setFormData((prev) => {
            const newState = JSON.parse(JSON.stringify(prev))
            newState.location.lugarSaMare = value
            console.log("Updated location data:", newState.location)
            return newState
        })
    }

    // Direct handler for location details fields
    const handleLocationDetailsChange = (value: string) => {
        console.log(`Setting location details to: ${value}`)
        setFormData((prev) => {
            const newState = JSON.parse(JSON.stringify(prev))
            newState.location.size = value
            console.log("Updated location data:", newState.location)
            return newState
        })
    }

    const handleURLchange = (value: string) => {
        console.log(`Setting URL to: ${value}`)
        setFormData((prev) => {
            const newState = JSON.parse(JSON.stringify(prev))
            newState.location.googleMaps = value
            console.log("Updated location data:", newState.location)
            return newState
        })
    }

    // Update the handleFormChange function to properly preserve all existing data
    const handleFormChange = (section: string, field: string, value: string) => {
        console.log(`Updating ${section}.${field} to: ${value}`)

        // handling for location fields
        if (section === "location") {
            if (field === "lugarSaMare" || field === "propertyOwnership") {
                handlePropertyOwnershipChange(value)
                return
            }
            if (field === "size" || field === "locationDetails") {
                handleLocationDetailsChange(value)
                return
            }
            if (field === "googleMaps" || field === "locationDetails") {
                handleURLchange(value)
                return
            }
        }

        // Special handling for management fields
        if (section === "organizationStructure" && field === "management") {
            handleManagementChange(value)
            return
        }

        setFormData((prev) => {
            // Create a deep copy of the previous state
            const newState = JSON.parse(JSON.stringify(prev))

            // Make sure the section exists
            if (!newState[section as keyof FormDataType]) {
                console.error(`Section ${section} does not exist in form data`)
                return prev
            }
            // Update the field in the section
            ; (newState[section as keyof FormDataType] as any)[field] = value

            // Log for debugging
            console.log(`Updated ${section}.${field} to: ${value}`)
            console.log("Updated section data:", newState[section as keyof FormDataType])
            console.log("Complete form data:", newState)

            return newState
        })
    }

    // Add a function to show the verification page with current form data
    const showVerificationWithCurrentData = () => {
        console.log("Showing verification page with current data:", formData)
        setShowVerificationPage(true)
        setCurrentStep(5) // Move to step 5 (verification)
    }

    // Update the handleDocumentSubmit function to use the new function
    const handleDocumentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        showVerificationWithCurrentData()
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
            const submitData = {
                userInvitedId,
                formData,
            }

            // Submit the form data
            const response = await fetch(`${backendUrl}/api/application/submit-application`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData),
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

    // Function to render the form step content
    const renderFormStepContent = () => {
        if (currentStep === 5 && showVerificationPage) {
            return (
                <VerificationPage formData={formData} onSubmit={handleSubmit} />
            )
        }

        let currentStepData: any

        if (formSchema && formSchema.steps && currentStep <= formSchema.steps.length) {
            currentStepData = formSchema.steps[currentStep - 1]
        }

        if (!currentStepData) {
            if (questionData && questionData.data && questionData.data.result && currentStep <= 5) {
                return renderQuestionsFromData(questionData, currentStep)
            }
            return null
        }

        if (currentStep === 6) {
            // Success step
            return <SuccessStep description={currentStepData.sections[0]?.description} />
        }

        return (
            <div>
                <StepHeader title={currentStepData.name} icon={getIconComponent(currentStepData.icon)} />

                {currentStepData.sections.map((section: Section, index: number) => (
                    <SectionCard key={index} title={section.title} icon={getIconComponent(section.icon)}>
                        {renderSectionFields(section)}
                    </SectionCard>
                ))}
            </div>
        )
    }

    // Function to render questions from data
    const renderQuestionsFromData = (questionData: QuestionResponse, currentStep: number) => {
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
                                            {renderQuestionByType(question, section.sectionName)}
                                        </div>
                                    ))}
                            </div>
                        </SectionCard>
                    ))}
            </div>
        )
    }

    // Function to render question by type
    const renderQuestionByType = (question: any, sectionTitle?: string) => {
        const { component, question: questionText, isRequired, placeholder, choices } = question
        if (sectionTitle) {
            console.log('Section Title:', sectionTitle);
        }
        // Determine if this is a location-related question
        const isLocationQuestion = questionText.toLowerCase().includes("location") ||
            questionText.toLowerCase().includes("lugar") ||
            questionText.toLowerCase().includes("size") ||
            questionText.toLowerCase().includes("maps")

        // Get the field mapping
        const mapping = getFieldMapping(questionText, question.questionId, sectionTitle)

        switch (component) {
            case "radiogroup":
                return (
                    <>
                        <p className="text-sm mb-3 font-tt-commons font-semibold">
                            {questionText} {isRequired && <span className="text-red-500">*</span>}
                        </p>
                        <RadioGroup
                            defaultValue={choices?.[0]?.id}
                            onValueChange={(value) => {
                                // Find the label for the selected value
                                const selectedChoice = choices.find((choice: any) => choice.id === value);
                                const selectedLabel = selectedChoice ? selectedChoice.name : value;
                                const mapping = getFieldMapping(questionText, question.questionId, sectionTitle);
                                handleFormChange(mapping.section, mapping.field, selectedLabel);
                            }}
                        >
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
                            onChange={(e) => {
                                if (isLocationQuestion && mapping.section === "location") {
                                    handleLocationFieldChange(mapping.field as keyof Location, e.target.value)
                                } else {
                                    handleFormChange(mapping.section, mapping.field, e.target.value)
                                }
                            }}
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
                                onChange={(e) => {
                                    const mapping = getFieldMapping(questionText, question.questionId)
                                    handleFormChange(mapping.section, mapping.field, e.target.value)
                                }}
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
                            onChange={(e) => {
                                const mapping = getFieldMapping(questionText, question.questionId)
                                handleFormChange(mapping.section, mapping.field, e.target.value)
                            }}
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
                            className={question.questionId === "interest" ? "min-h-[350px]" : "min-h-[110px]"}
                            required={isRequired}
                            value={(() => {
                                const mapping = getFieldMapping(questionText, question.questionId);
                                if (mapping.section === "organizationStructure" && mapping.field === "listahanTauhan") {
                                    return formData.organizationStructure.listahanTauhan;
                                }
                                return undefined;
                            })()}
                            onChange={(e) => {
                                const mapping = getFieldMapping(questionText, question.questionId);
                                handleFormChange(mapping.section, mapping.field, e.target.value);
                            }}
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
                        <Select
                            onValueChange={(value) => {
                                if (isLocationQuestion && mapping.section === "location") {
                                    handleLocationFieldChange(mapping.field as keyof Location, value)
                                } else {
                                    handleFormChange(mapping.section, mapping.field, value)
                                }
                            }}
                        >
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
                            <Select
                                onValueChange={(value) => {
                                    const mapping = getFieldMapping(questionText, question.questionId)
                                    handleFormChange(mapping.section, mapping.field, value)
                                }}
                            >
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
                                <p className="text-sm text-secondary-500 mt-4">
                                    Drag & drop here to upload,
                                    <br />
                                    or click the button above.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={handleDocumentSubmit}>
                                Submit Application
                            </Button>
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

    // Function to render section fields
    const renderSectionFields = (section: Section) => {
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

    // Function to render field
    const renderField = (field: Field) => {
        const mapping = getFieldMapping(field.label)
        const isLocationField = mapping.section === "location"

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
                            onChange={(e) => {
                                if (isLocationField) {
                                    handleLocationFieldChange(mapping.field as keyof Location, e.target.value)
                                } else {
                                    handleFormChange(mapping.section, mapping.field, e.target.value)
                                }
                            }}
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
                            onChange={(e) => {
                                handleFormChange("basicInfo", "email", e.target.value)
                            }}
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
                            onChange={(e) => {
                                const mapping = getFieldMapping(field.label)
                                handleFormChange(mapping.section, mapping.field, e.target.value)
                            }}
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
                            onChange={(e) => {
                                if (isLocationField) {
                                    handleLocationFieldChange(mapping.field as keyof Location, e.target.value)
                                } else {
                                    handleFormChange(mapping.section, mapping.field, e.target.value)
                                }
                            }}
                        />
                        {field.description && <p className="text-xs text-gray-500 mt-1 ml-2">{field.description}</p>}
                    </>
                )
            case "radio":
                return (
                    <>
                        <p className="text-sm mb-3 font-tt-commons font-semibold">{field.label}</p>
                        <RadioGroup
                            defaultValue={field.options?.[0].value}
                            onValueChange={(value) => {
                                if (isLocationField) {
                                    handleLocationFieldChange(mapping.field as keyof Location, value)
                                } else {
                                    handleFormChange(mapping.section, mapping.field, value)
                                }
                            }}
                        >
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
                        <Select
                            onValueChange={(value) => {
                                if (isLocationField) {
                                    handleLocationFieldChange(mapping.field as keyof Location, value)
                                } else {
                                    handleFormChange(mapping.section, mapping.field, value)
                                }
                            }}
                        >
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

    const debugLocationData = () => {
        console.log("Current location data:", formData.location)
        console.log("lugarSaMare:", formData.location.lugarSaMare)
        console.log("size:", formData.location.size)
        console.log("googleMaps:", formData.location.googleMaps)
    }

    // Add a more comprehensive debug function
    const debugFullFormData = () => {
        console.log("=== FULL FORM DATA DEBUG ===")
        console.log("Basic Info:", formData.basicInfo)
        console.log("Location:", formData.location)
        console.log("Organization Structure:", formData.organizationStructure)
        console.log("Community Profile:", formData.communityProfile)
        console.log("Uploaded Documents:", formData.uploadedDocuments)
        console.log("=== END FORM DATA DEBUG ===")

        // Also show an alert for immediate feedback
        alert("Form data logged to console. Check browser developer tools.")
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
                            <button onClick={fetchPreviousPage} className="text-teal-600 hover:underline mr-4">
                                Previous Page
                            </button>
                        )}
                        {questionData?.data?.next && (
                            <button onClick={fetchNextPage} className="text-teal-600 hover:underline">
                                Next Page
                            </button>
                        )}
                    </span>
                </div>
            ) : null}

            {/* Form Content */}
            <div className="bg-white rounded-lg border p-6">
                {renderFormStepContent()}

                {/* Add a button to manually trigger verification page for testing */}
                {/*{currentStep === 5 && (
                    <div className="mt-6">
                        <Button
                            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                            onClick={showVerificationWithCurrentData}
                        >
                            Review Application
                        </Button>
                    </div>
                )}*/}

                {/* Debug Buttons */}
                <div className="mt-4 text-right flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={debugLocationData} className="text-xs">
                        Debug Location
                    </Button>
                    <Button variant="outline" size="sm" onClick={logFormState} className="text-xs">
                        Debug Form State
                    </Button>
                    <Button variant="outline" size="sm" onClick={debugFullFormData} className="text-xs bg-yellow-50">
                        Debug Full Data
                    </Button>
                </div>

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
                    {currentStep <= 4 ? (
                        <Button onClick={handleNext} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : null}
                    {currentStep === 5 ? (
                        <Button onClick={handleDocumentSubmit} className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
                            Review Application
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

// Update the VerificationPage component to ensure it displays all form data correctly
function VerificationPage({ formData, onSubmit }: VerificationPageProps) {
    // Format the full name from the separate name fields
    const fullName = [formData.basicInfo.firstName, formData.basicInfo.middleName, formData.basicInfo.lastName]
        .filter(Boolean)
        .join(" ")

    // Format the complete address
    const fullAddress = [
        formData.basicInfo.addressline1,
        formData.basicInfo.addressline2,
        formData.basicInfo.barangay,
        formData.basicInfo.city,
        formData.basicInfo.province,
    ]
        .filter(Boolean)
        .join(", ")

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Verification</h2>
            <p>Please verify the information below before submitting.</p>

            {/* Basic Information */}
            <div>
                <h3 className="text-xl font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Full Name:</p>
                        <p>{fullName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Birthday:</p>
                        <p>{formData.basicInfo.birthday}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email:</p>
                        <p>{formData.basicInfo.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Address:</p>
                        <p>{fullAddress}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Interest:</p>
                        <p>{formData.basicInfo.interest}</p>
                    </div>
                </div>
            </div>

            {/* Location Information */}
            <div>
                <h3 className="text-xl font-semibold">Location Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Property Ownership:</p>
                        <p>{formData.location.lugarSaMare}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Size:</p>
                        <p>{formData.location.size}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Google Maps:</p>
                        <p>{formData.location.googleMaps}</p>
                    </div>
                </div>
            </div>

            {/* Organization Structure */}
            <div>
                <h3 className="text-xl font-semibold">Organization Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Business Structure:</p>
                        <p>{formData.organizationStructure.businessStructure}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Management:</p>
                        <p>{formData.organizationStructure.management}</p>
                    </div>
                </div>
            </div>

            {/* Community Profile */}
            <div>
                <h3 className="text-xl font-semibold">Community Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold">Service Size:</p>
                        <p>{formData.communityProfile.serviceSize}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Street Name:</p>
                        <p>{formData.communityProfile.streetName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Mare Clients:</p>
                        <p>{formData.communityProfile.mareClients}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Type of Clients:</p>
                        <p>{formData.communityProfile.typeofClients}</p>
                    </div>
                </div>
            </div>

            {/* Uploaded Documents */}
            <div>
                <h3 className="text-xl font-semibold">Uploaded Documents</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Filename
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {formData.uploadedDocuments.map((doc, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{doc.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{doc.filename}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function SuccessStep({ description }: { description?: string }) {
    return (
        <div className="text-center">
            <Check className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-3xl font-bold mt-4">Application Submitted!</h2>
            <p className="text-gray-600 mt-2">
                {description || "Thank you for submitting your application. We will review it shortly."}
            </p>
        </div>
    )
}

function StepHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            {icon}
            <h2 className="text-xl font-bold">{title}</h2>
        </div>
    )
}

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="bg-gray-50 rounded-md p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                {icon}
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {children}
        </div>
    )
}

interface VerificationPageProps {
    formData: FormDataType
    onSubmit: () => void
}

export default FormWithQueryClientProvider
