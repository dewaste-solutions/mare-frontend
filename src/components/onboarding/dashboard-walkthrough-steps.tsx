// Define walkthrough steps for different user roles
export const dashboardWalkthroughSteps = {
    // Common steps for all roles
    common: [
      {
        target: "body", // Start with something that definitely exists
        content: "Welcome to your MARE dashboard! This is where you can manage all your waste management activities.",
        title: "Welcome to MARE",
        placement: "bottom",
      },
      {
        target: ".user-profile-dropdown", // This should be a class we add to the user profile section
        content: "Access your profile settings and notifications here.",
        title: "User Profile",
        placement: "bottom",
      },
      {
        target: "#sidebar-nav", // This should be the ID of the sidebar navigation
        content: "Use this navigation menu to access different sections of the platform.",
        title: "Main Navigation",
        placement: "right",
      },
    ],
  
    // Role-specific steps
    admin: [
      {
        target: "main", // Target the main content area if specific elements don't exist yet
        content: "View key performance metrics and statistics for the entire system.",
        title: "Statistics Overview",
        placement: "top",
      },
    ],
  
    franchisee: [
      {
        target: "main",
        content: "Track your collection performance and recycling metrics.",
        title: "Performance Metrics",
        placement: "top",
      },
    ],
  
    "community-officer": [
      {
        target: "main",
        content: "Monitor waste collection statistics for your community.",
        title: "Community Statistics",
        placement: "top",
      },
    ],
  
    worker: [
      {
        target: "main",
        content: "View your daily collection assignments and routes.",
        title: "Today's Assignments",
        placement: "top",
      },
    ],
  
    manager: [
      {
        target: "main",
        content: "Monitor your team's performance and collection metrics.",
        title: "Team Overview",
        placement: "top",
      },
    ],
  
    buyer: [
      {
        target: "main",
        content: "Browse available recycled materials for purchase.",
        title: "Available Materials",
        placement: "top",
      },
    ],
  }
  