// app/api/form-schema/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const formSchema = {
        steps: [
            {
                id: 1,
                name: "Basic Information",
                icon: "User",
                sections: [
                    {
                        title: "Personal Information",
                        icon: "User",
                        fields: [
                            {
                                id: "firstName",
                                label: "First Name",
                                type: "input",
                                placeholder: "First Name",
                                required: true
                            },
                            {
                                id: "middleName",
                                label: "Middle Name",
                                type: "input",
                                placeholder: "Middle Name",
                                required: false
                            },
                            {
                                id: "lastName",
                                label: "Last Name",
                                type: "input",
                                placeholder: "Last Name",
                                required: true
                            },
                            {
                                id: "birthday",
                                label: "Birthday",
                                type: "date",
                                placeholder: "MM/DD/YYYY",
                                required: true
                            }
                        ]
                    },
                    {
                        title: "Contact Information",
                        icon: "Contact",
                        fields: [
                            {
                                id: "email",
                                label: "Email Address",
                                type: "email",
                                placeholder: "your.email@example.com",
                                required: true
                            }
                        ]
                    },
                    {
                        title: "Address",
                        icon: "MapPin",
                        fields: [
                            {
                                id: "addressLine1",
                                label: "Address Line 1",
                                type: "input",
                                placeholder: "Street address, P.O box, company name",
                                required: true
                            },
                            {
                                id: "addressLine2",
                                label: "Address Line 2",
                                type: "input",
                                placeholder: "Apartment, suite, unit, building, floor, etc.",
                                required: false
                            },
                            {
                                id: "province",
                                label: "Province",
                                type: "input",
                                placeholder: "Province",
                                required: true
                            },
                            {
                                id: "city",
                                label: "City / Municipality",
                                type: "input",
                                placeholder: "City / Municipality",
                                required: true
                            },
                            {
                                id: "barangay",
                                label: "Barangay",
                                type: "input",
                                placeholder: "Barangay",
                                required: true
                            }
                        ]
                    },
                    {
                        title: "Interest in MARE!",
                        icon: "Building2",
                        fields: [
                            {
                                id: "interest",
                                label: "Interesado ako na magnegosyo ng MARE! dahil",
                                type: "textarea",
                                placeholder: "Ibahagi ang iyong dahilan...",
                                description: "Tell us why you're interested in becoming a MARE! franchisee",
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "Location",
                icon: "MapPin",
                sections: [
                    {
                        title: "Property Ownership",
                        icon: "Briefcase",
                        fields: [
                            {
                                id: "propertyOwnership",
                                label: "Ako ay may lugar para sa MARE!",
                                type: "radio",
                                options: [
                                    { value: "sariling-pagmamay-ari", label: "Sariling pagmamay-ari" },
                                    { value: "nirerentahan", label: "Nirerentahan o nirerentahan pa lamang" },
                                    { value: "sa-kooperatiba", label: "Sa Kooperatiba" },
                                    { value: "sa-barangay", label: "Sa kasosyo sa negosyo" },
                                    { value: "hinahati", label: "Hihiramin sa kakilala" }
                                ],
                                required: true
                            }
                        ]
                    },
                    {
                        title: "Location Details",
                        icon: "MapPin",
                        fields: [
                            {
                                id: "dimensions",
                                label: "Ito ay may sukat na (ibigay ang dimension in meters)",
                                type: "input",
                                placeholder: "e.g. 5m x 10m",
                                required: true
                            },
                            {
                                id: "googleMaps",
                                label: "Ibahagi ang lugar kung saan niyo itatayo ang inyong MARE! Facility sa pamamagitan ng Google Maps",
                                type: "input",
                                placeholder: "Google Maps link",
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: "Organizational Structure",
                icon: "BuildingIcon",
                sections: [
                    {
                        title: "Business Structure",
                        icon: "Building2",
                        fields: [
                            {
                                id: "businessStructure",
                                label: "Patatakbuhin ang negosyong ito bilang",
                                type: "radio",
                                options: [
                                    { value: "kooperatiba", label: "Kooperatiba" },
                                    { value: "korporasyon", label: "Korporasyon" },
                                    { value: "sole-proprietor", label: "Sole Proprietor" },
                                    { value: "one-person-corporation", label: "One Person Corporation" },
                                    { value: "non-profit", label: "Non-profit organization o foundation" },
                                    { value: "local-government", label: "Local government unit" },
                                    { value: "homeowners", label: "Homeowners association" }
                                ],
                                required: true
                            }
                        ]
                    },
                    {
                        title: "Management",
                        icon: "Users",
                        fields: [
                            {
                                id: "management",
                                label: "Patatakbuhin ang negosyong ito bilang",
                                type: "radio",
                                options: [
                                    { value: "ako-mismo", label: "Oo, ako mismo ang manager" },
                                    { value: "iba-managers", label: "Oo, ako ay isa lamang sa mga managers" },
                                    { value: "hindi-ako", label: "Hindi, may tao akong kukunin bilang manager" },
                                    { value: "hindi-pa-alam", label: "Hindi pa ako sigurado" }
                                ],
                                required: true
                            },
                            {
                                id: "teamMembers",
                                label: "Ibigay ang lahat ng pangalan ng mga tauhan",
                                type: "textarea",
                                placeholder: "Listahan ng mga pangalan...",
                                description: "List all staff members who will be involved in the operation",
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                id: 4,
                name: "Community Profile",
                icon: "House",
                sections: [
                    {
                        title: "Service Area",
                        icon: "HouseIcon",
                        fields: [
                            {
                                id: "serviceRadius",
                                label: "Ilang mga kabahayan ang maseserbisyuhan ng inyong MARE! Facility",
                                type: "input",
                                placeholder: "e.g. 500",
                                description: "Estimate the number of households in your service area",
                                required: true
                            },
                            {
                                id: "serviceAreas",
                                label: "Ibigay ang pangalan ng mga streets, subdibisyon, komunidad, at/o barangay",
                                type: "textarea",
                                placeholder: "Listahan ng mga lugar...",
                                description: "List all areas that will served by your facility",
                                required: true
                            }
                        ]
                    },
                    {
                        title: "Business Clients",
                        icon: "Briefcase",
                        fields: [
                            {
                                id: "clientCount",
                                label: "Ilang mga kalapit na negosyo ang magiging kliyente ng inyong MARE! Facility",
                                type: "input",
                                placeholder: "e.g. 10",
                                description: "Estimate the number of businesses in your service area",
                                required: true
                            },
                            {
                                id: "clientTypes",
                                label: "Magbigay ng mga pangalan ng mga negosyong ito at uri ng negosyo nila",
                                type: "textarea",
                                placeholder: "Listahan ng mga negosyo...",
                                description: "List the types and names of businesses in your service area",
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                id: 5,
                name: "Documents",
                icon: "FileText",
                sections: [
                    {
                        title: "Documents",
                        icon: "FileText",
                        fields: [
                            {
                                id: "documentType",
                                label: "Which documents are you uploading?",
                                type: "select",
                                options: [
                                    { value: "sec", label: "SEC Registration (Articles of Incorporation)" },
                                    { value: "articles", label: "SEC Registration (By Laws)" },
                                    { value: "dti", label: "DTI Registration" },
                                    { value: "bir", label: "BIR 2303" },
                                    { value: "pcnc", label: "PCNC Registration (whenever applicable)" }
                                ],
                                required: true
                            },
                            {
                                id: "documentUpload",
                                label: "Upload Document",
                                type: "file",
                                required: true
                            }
                        ]
                    }
                ]
            },
            {
                id: 6,
                name: "Success",
                icon: "Check",
                sections: [
                    {
                        title: "Application Successfully Submitted!",
                        description: "Thank you for applying to become a MARE! franchise partner. Your application is under review. You will receive an update via email once a decision is made."
                    }
                ]
            }
        ]
    };

    return NextResponse.json(formSchema);
}