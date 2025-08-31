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
  
  return {
    api: {
      leadSubmit: import.meta.env.VITE_LEAD_WEBHOOK || 'https://webhook.site/unique-test-id',
      zipValidation: import.meta.env.VITE_ZIP_VALIDATOR || null,
      emailValidation: import.meta.env.VITE_EMAIL_VALIDATOR || null,
      phoneValidation: import.meta.env.VITE_PHONE_VALIDATOR || null,
      qualification: import.meta.env.VITE_QUALIFICATION_API || null,
      errorReporting: import.meta.env.VITE_ERROR_WEBHOOK || null,
    },
    features: {
      mockValidation: true,
      debugMode: true,
    }
  };
};

export const config = getConfig();