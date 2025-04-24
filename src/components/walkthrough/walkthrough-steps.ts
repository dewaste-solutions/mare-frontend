// Define walkthrough steps for different pages
export const walkthroughSteps = {
    // Admin dashboard walkthrough steps
    "/admin/dashboard": [
      {
        target: "#dashboard-header",
        title: "Admin Dashboard",
        content: "Welcome to the Admin Dashboard. Here you can manage all aspects of the waste management system.",
        placement: "bottom",
      },
      {
        target: "#dashboard-stats",
        title: "Key Metrics",
        content: "These cards show the key performance metrics for your waste management operations.",
        placement: "top",
      },
      {
        target: "#recent-activities",
        title: "Recent Activities",
        content: "Track the latest activities and updates in the system.",
        placement: "left",
      },
    ],
  
    // User management walkthrough
    "/admin/user-management": [
      {
        target: "#user-management-header",
        title: "User Management",
        content:
          "This page allows you to manage all users in the system. You can add, edit, and delete users, as well as change their roles and permissions.",
        placement: "bottom",
      },
      {
        target: "#add-user-button",
        title: "Add New Users",
        content:
          "Click here to add new users to the system. You'll be able to set their name, email, role, and initial status.",
        placement: "bottom",
        disableOverlay: true,
      },
      {
        target: "#search-users",
        title: "Search Users",
        content:
          "Quickly find users by typing their name, email, or role here. The table will filter in real-time as you type.",
        placement: "bottom",
        disableOverlay: true,
      },
      {
        target: "#user-table",
        title: "User List",
        content:
          "This table shows all users in the system. You can see their status, role, and when they were last active. Use the actions menu to edit or delete users.",
        placement: "top",
        disableOverlay: true,
      },
    ],
  
    // Materials management walkthrough
    "/admin/materials": [
      {
        target: "#materials-header",
        title: "Materials Management",
        content:
          "This page allows you to manage all recyclable materials and their pricing. You can add new materials, update prices, and change availability status.",
        placement: "bottom",
      },
      {
        target: "#add-material-button",
        title: "Add New Materials",
        content:
          "Click here to add new material types to the system. You'll need to specify the name, category, price per unit, and status.",
        placement: "bottom",
        disableOverlay: true,
      },
      {
        target: "#materials-table",
        title: "Materials List",
        content:
          "This table shows all materials in the system. You can see their current price, category, and status. Use the actions menu to edit or delete materials.",
        placement: "top",
        disableOverlay: true,
      },
    ],
  
    // GPS tracking walkthrough
    "/admin/gps-tracking": [
      {
        target: "#gps-header",
        title: "GPS Tracking",
        content:
          "This page allows you to track all collection vehicles and workers in real-time. You can monitor their location, status, and battery level.",
        placement: "bottom",
      },
      {
        target: "#map-container",
        title: "Live Map",
        content:
          "This map shows the current location of all active collection vehicles. You can click on a vehicle marker to see more details.",
        placement: "top",
        disableOverlay: true,
      },
      {
        target: "#vehicle-list",
        title: "Vehicle List",
        content:
          "This list shows all vehicles in the system. Click on a vehicle to focus on it in the map. You can see their status, driver, and battery level.",
        placement: "left",
        disableOverlay: true,
      },
    ],
  
    // Barangay settings walkthrough
    "/admin/barangay-settings": [
      {
        target: "#barangay-header",
        title: "Barangay Settings",
        content:
          "This page allows you to manage all barangay (neighborhood) settings. You can add new barangays, update collection schedules, and change status.",
        placement: "bottom",
      },
      {
        target: "#add-barangay-button",
        title: "Add New Barangay",
        content:
          "Click here to add a new barangay to the system. You'll need to specify the name, district, population, and collection days.",
        placement: "bottom",
        disableOverlay: true,
      },
      {
        target: "#barangay-table",
        title: "Barangay List",
        content:
          "This table shows all barangays in the system. You can see their district, population, collection days, and status. Use the actions menu to edit or delete barangays.",
        placement: "top",
        disableOverlay: true,
      },
    ],
  
    // Admin invites walkthrough steps
    "/admin/invites": [
      {
        target: "#invites-header",
        title: "Invitation Management",
        content:
          "Welcome to the Invites page. Here you can send and manage invitations to join your waste management community.",
        placement: "bottom",
      },
      {
        target: "#send-invite-button",
        title: "Step 1: Send New Invitation",
        content: "To invite someone, click the 'Send Invite' button to open the invitation form.",
        placement: "left",
      },
      {
        target: ".dialog-content",
        title: "Step 2: Enter Email Address",
        content: "Enter the email address of the person you want to invite to join the community.",
        placement: "right",
        disableOverlay: true,
      },
      {
        target: ".dialog-submit-button",
        title: "Step 3: Send the Invitation",
        content: "Click the 'Send Invite' button to send the invitation email to the recipient.",
        placement: "bottom",
        disableOverlay: true,
      },
      {
        target: "#invites-table",
        title: "Step 4: Track Invitations",
        content: "After sending, the invitation will appear in this table. You can track its status here.",
        placement: "top",
      },
      {
        target: "#invites-status-filter",
        title: "Invitation Status",
        content: "The status shows whether an invitation is pending, accepted, or expired.",
        placement: "bottom",
      },
    ],
  
    // Add more page walkthroughs as needed
  }
  