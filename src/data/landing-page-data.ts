// Team member type
export type TeamMember = {
    name: string
    role: string
    description: string
    bio?: string
    email?: string
    phone?: string
    location?: string
    startDate?: string
    skills?: string[]
    education?: string
    socialLinks?: {
      linkedin?: string
      twitter?: string
    }
  }
  
  // Team members data
  export const teamMembers: TeamMember[] = [
    {
      name: "Maria Santos",
      role: "Community Coordinator",
      description: "Works directly with barangays to implement MARE! programs and train community members.",
      bio: "Maria has over 8 years of experience in community development and waste management education. She has successfully implemented MARE! programs in 5 different communities, resulting in significant improvements in waste diversion rates.",
      email: "maria.santos@marerecovery.org",
      phone: "+63 912 345 6789",
      location: "Manila, Philippines",
      startDate: "January 2019",
      skills: ["Community Engagement", "Program Implementation", "Training & Development", "Stakeholder Management"],
      education: "BS Environmental Science, University of the Philippines",
      socialLinks: {
        linkedin: "https://linkedin.com/in/mariasantos",
        twitter: "https://twitter.com/mariasantos",
      },
    },
    {
      name: "Juan Reyes",
      role: "Waste Management Specialist",
      description: "Designs efficient waste segregation systems and trains local workers on proper handling techniques.",
      bio: "Juan brings 10+ years of experience in waste management systems. Before joining MARE!, he worked with several environmental NGOs and government agencies to develop sustainable waste management solutions.",
      email: "juan.reyes@marerecovery.org",
      phone: "+63 923 456 7890",
      location: "Quezon City, Philippines",
      startDate: "March 2018",
      skills: ["Waste Segregation Systems", "Technical Training", "Process Optimization", "Environmental Compliance"],
      education: "MS Environmental Engineering, Ateneo de Manila University",
      socialLinks: {
        linkedin: "https://linkedin.com/in/juanreyes",
      },
    },
    {
      name: "Ana Lim",
      role: "Franchisee Relations Manager",
      description:
        "Supports franchisees with training, resources, and ensures collected materials reach the right processing facilities.",
      bio: "Ana has a background in business development and sustainability. She has helped onboard and support over 15 franchisees, ensuring their operations align with MARE!'s standards while remaining profitable.",
      email: "ana.lim@marerecovery.org",
      phone: "+63 934 567 8901",
      location: "Cebu, Philippines",
      startDate: "June 2020",
      skills: ["Franchisee Support", "Business Development", "Supply Chain Management", "Relationship Building"],
      education: "MBA with focus on Sustainable Business, De La Salle University",
      socialLinks: {
        linkedin: "https://linkedin.com/in/analim",
        twitter: "https://twitter.com/analim",
      },
    },
    {
      name: "Carlos Mendoza",
      role: "Education & Outreach",
      description:
        "Develops educational materials and conducts workshops on waste management and environmental awareness.",
      bio: "Carlos is passionate about environmental education. He has developed comprehensive educational programs that have been implemented in schools and communities across the Philippines, reaching over 10,000 individuals.",
      email: "carlos.mendoza@marerecovery.org",
      phone: "+63 945 678 9012",
      location: "Davao, Philippines",
      startDate: "September 2019",
      skills: ["Curriculum Development", "Public Speaking", "Workshop Facilitation", "Digital Content Creation"],
      education: "BS Education, University of Santo Tomas",
      socialLinks: {
        linkedin: "https://linkedin.com/in/carlosmendoza",
      },
    },
  ]
  
  // Testimonials data
  export const testimonials = [
    {
      name: "Barangay San Isidro",
      location: "Manila",
      quote:
        "MARE! transformed how our community handles waste. We've reduced our landfill contribution by 75% and created 5 new jobs for local residents.",
    },
    {
      name: "Barangay Mabuhay",
      location: "Quezon City",
      quote:
        "Our MARE! Center has become a community hub where residents learn about sustainability while contributing to a cleaner environment.",
    },
    {
      name: "Barangay Bagong Pag-asa",
      location: "Cebu",
      quote:
        "The income from our recycled materials has funded community projects and provided additional income for participating households.",
    },
  ]
  
  // Community types data
  export const communityTypes = [
    {
      title: "Residents",
      icon: "Home",
      description:
        "Local community members learn proper waste segregation and participate in collection events. They become the foundation of our circular economy model.",
      learnMoreType: "residents",
    },
    {
      title: "Barangay Leaders",
      icon: "Users",
      description:
        "Local government officials who champion MARE! in their communities, providing support and resources to ensure program success and compliance with waste management policies.",
      learnMoreType: "barangay",
    },
    {
      title: "Franchisees",
      icon: "Building",
      description:
        "Local entrepreneurs who operate MARE! Centers in their communities, creating sustainable businesses while solving waste management challenges.",
      learnMoreType: "franchisees",
    },
  ]
  
  // Impact data
  export const impactData = {
    community: [
      "Cleaner streets and public spaces",
      "Revenue from recycled materials",
      "Reduced waste management costs",
      "Improved compliance with regulations",
    ],
    workers: [
      "Stable employment opportunities",
      "Skills development and training",
      "Safer working conditions",
      "Pride in environmental stewardship",
    ],
    environment: [
      "85% diversion of waste from landfills",
      "Reduced plastic pollution in waterways",
      "Lower greenhouse gas emissions",
      "Conservation of natural resources",
    ],
  }
  
  // Stats data 
  export const statsData = [
    { value: "85%", label: "Waste Diversion Rate" },
    { value: "12+", label: "Communities Served" },
    { value: "50+", label: "Local Jobs Created" },
    { value: "1,000+", label: "Households Participating" },
  ]
  