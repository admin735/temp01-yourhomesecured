interface EnvironmentConfig {
  api: {
    leadSubmit: string | null;
    zipValidation: string | null;
    emailValidation: string | null;
    phoneValidation: string | null;
    qualification: string | null;
    errorReporting: string | null;
  };
  features: {
    mockValidation: boolean;
    debugMode: boolean;
  };
}

const getConfig = (): EnvironmentConfig => {
  const env = import.meta.env.VITE_ENV || 'development';
  const isDevelopment = env === 'development';
  
  return {
    api: {
      leadSubmit: import.meta.env.VITE_LEAD_WEBHOOK || 'https://your-backend.com/api/leads/submit',
      zipValidation: import.meta.env.VITE_ZIP_VALIDATOR || 'https://your-backend.com/api/validate/zip',
      emailValidation: import.meta.env.VITE_EMAIL_VALIDATOR || 'https://your-backend.com/api/validate/email',
      phoneValidation: import.meta.env.VITE_PHONE_VALIDATOR || 'https://your-backend.com/api/validate/phone',
      qualification: import.meta.env.VITE_QUALIFICATION_API || 'https://your-backend.com/api/qualify',
      errorReporting: import.meta.env.VITE_ERROR_WEBHOOK || 'https://your-backend.com/api/errors',
    },
    features: {
      mockValidation: false, // Set to false since you have real endpoints
      debugMode: import.meta.env.VITE_DEBUG_MODE === 'true' || isDevelopment,
    }
  };
};

export const config = getConfig();