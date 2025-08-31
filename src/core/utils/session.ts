interface SessionData {
  session_id: string;
  timestamp: string;
  landing_page: string;
  referrer: string;
  utm_params: Record<string, string>;
  validationData: {
    zip?: any;
    email?: any;
    phone?: any;
  };
  quizAnswers: Record<string, any>;
}

export const captureUTMParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'].forEach(key => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  
  return utm;
};

export const extractUTMParams = (): Record<string, string> => {
  return captureUTMParams();
};

export const generateSessionId = (): string => {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const storeValidationData = (type: 'zip' | 'email' | 'phone', data: any) => {
  const sessionData = getSessionData();
  
  if (!sessionData.validationData) {
    sessionData.validationData = {};
  }
  
  sessionData.validationData[type] = {
    ...data,
    validated_at: new Date().toISOString()
  };
  
  sessionStorage.setItem('session_data', JSON.stringify(sessionData));
};

export const getSessionData = (): SessionData => {
  const stored = sessionStorage.getItem('session_data');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize if not exists
  const newSession: SessionData = {
    session_id: generateSessionId(),
    timestamp: new Date().toISOString(),
    landing_page: window.location.pathname,
    referrer: document.referrer || 'direct',
    utm_params: extractUTMParams(),
    validationData: {},
    quizAnswers: {}
  };
  
  sessionStorage.setItem('session_data', JSON.stringify(newSession));
  return newSession;
};

export const getAllSessionData = () => {
  return getSessionData();
};

export const initializeSession = (): void => {
  // This will create session data if it doesn't exist
  getSessionData();
  
  const utmParams = captureUTMParams();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
};