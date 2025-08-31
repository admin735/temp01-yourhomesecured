// Use environment variables if available, fallback to hardcoded values
const isDevelopment = import.meta.env.DEV;

export const config = {
  api: {
    // Use env vars if they exist, otherwise use direct endpoints
    leadSubmit: import.meta.env.VITE_LEAD_WEBHOOK || 'https://your-backend.com/api/leads/submit',
    zipValidation: import.meta.env.VITE_ZIP_VALIDATOR || 'https://your-backend.com/api/validate/zip',
    emailValidation: import.meta.env.VITE_EMAIL_VALIDATOR || 'https://your-backend.com/api/validate/email',
    phoneValidation: import.meta.env.VITE_PHONE_VALIDATOR || 'https://your-backend.com/api/validate/phone',
    qualification: import.meta.env.VITE_QUALIFICATION_API || 'https://your-backend.com/api/qualify',
    errorReporting: import.meta.env.VITE_ERROR_WEBHOOK || 'https://your-backend.com/api/errors'
  },
  features: {
    debugMode: import.meta.env.VITE_DEBUG_MODE === 'true' || isDevelopment,
    mockValidation: false
  }
};