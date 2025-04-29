export const invitesWalkthroughSteps = [
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
      target: ".dialog-email-input",
      title: "Step 2: Enter Email Address",
      content: "Enter the email address of the person you want to invite to join the community.",
      placement: "right",
      disableOverlay: true,
    },
    {
      target: ".dialog-role-select",
      title: "Step 3: Select Role",
      content:
        "Choose the appropriate role for the invitee. This determines their access level and permissions in the system.",
      placement: "right",
      disableOverlay: true,
    },
    {
      target: ".dialog-submit-button",
      title: "Step 4: Send the Invitation",
      content: "Click the 'Send Invite' button to send the invitation email to the recipient.",
      placement: "bottom",
      disableOverlay: true,
    },
    {
      target: "#invites-table",
      title: "Step 5: Track Invitations",
      content: "After sending, the invitation will appear in this table. You can track its status here.",
      placement: "top",
    },
    {
      target: "#invites-status-filter",
      title: "Invitation Status",
      content: "The status shows whether an invitation is pending, accepted, or expired.",
      placement: "bottom",
    },
  ]
  