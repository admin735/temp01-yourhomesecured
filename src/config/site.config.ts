export const siteConfig = {
  // Client Identity
  client: {
    name: "YourHomeSecured",
    legalName: "YourHomeSecured", // For legal documents
    domain: "yourhomesecured.co",
    established: "2024"
  },
  
  // Compliance Configuration (Easily changeable per client)
  compliance: {
    contact: {
      email: "admin@yourhomesecured.co", // Single point of contact
    },
    messaging: {
      companyName: "YourHomeSecured",
      replyKeywords: {
        stop: "STOP",
        help: "HELP"
      }
    },
    legal: {
      lastUpdated: "January 2024",
      jurisdiction: "Texas, United States",
      arbitrationLocation: "Dallas, Texas"
    }
  },
  
  // Feature Flags for Compliance
  features: {
    requiresGDPR: false, // Enable for EU clients
    requiresCCPA: true,  // Enable for California
    requiresTCPA: true,  // SMS consent
    cookieConsent: true, // Cookie banner
    ageVerification: false // If needed
  }
}