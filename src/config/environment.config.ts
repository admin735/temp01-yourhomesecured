interface EnvironmentConfig {
  api: {
    leadSubmit: string | null;
    zipValidation: string | null;
    emailValidation: string | null;
    phoneValidation: string | null;
    sendOTP: string | null;
    verifyOTP: string | null;
    qualification: string | null;
  };
  features: {
    mockValidation: boolean;
    debugMode: boolean;
  };
}

const getConfig = (): EnvironmentConfig => {
  const env = import.meta.env.VITE_ENV || 'development';
  const isDevelopment = env === 'development';
  const N8N_BASE = import.meta.env.VITE_N8N_WEBHOOK_BASE || 'https://n8n-s08bs-u37698.vm.elestio.app/webhook';
  
  return {
    api: {
      leadSubmit: import.meta.env.VITE_LEAD_WEBHOOK || 'https://n8n-s08bs-u37698.vm.elestio.app/webhook/df2c3efc-22b6-4062-973b-f7719067cdd9',
      zipValidation: import.meta.env.VITE_ZIP_VALIDATOR || 'https://n8n-s08bs-u37698.vm.elestio.app/webhook/8ab1e253-7d13-4307-958a-b27ede0aa0cb',
      emailValidation: import.meta.env.VITE_EMAIL_VALIDATOR || 'https://n8n-s08bs-u37698.vm.elestio.app/webhook/6b653c03-3862-40da-b899-6041353c4fd0',
      phoneValidation: import.meta.env.VITE_PHONE_VALIDATOR || 'https://n8n-s08bs-u37698.vm.elestio.app/webhook/87b9497a-68b1-43b1-9640-4820e1f02881',
      sendOTP: import.meta.env.VITE_SEND_OTP_ENDPOINT ? `${N8N_BASE}${import.meta.env.VITE_SEND_OTP_ENDPOINT}` : `${N8N_BASE}/send-otp`,
      verifyOTP: import.meta.env.VITE_VERIFY_OTP_ENDPOINT ? `${N8N_BASE}${import.meta.env.VITE_VERIFY_OTP_ENDPOINT}` : `${N8N_BASE}/verify-otp`,
      qualification: import.meta.env.VITE_QUALIFICATION_API || 'https://n8n-s08bs-u37698.vm.elestio.app/webhook/7415d839-ddf2-4708-a848-a565efeefbbe'
    },
    features: {
      mockValidation: false, // Set to false since you have real endpoints
      debugMode: import.meta.env.VITE_DEBUG_MODE === 'true' || isDevelopment,
    }
  };
};

export const config = getConfig();