interface SessionData {
  session_id: string;
  timestamp: string;
  landing_page: string;
  referrer: string;
  utm_params: Record<string, string>;
  validations: Record<string, any>; // Store ANY validation response
  quiz_answers: Record<string, any>;
  metadata: Record<string, any>; // Any additional data
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

// Store entire validation response as-is
export const storeValidation = (key: string, response: any) => {
  const sessionData = getSessionData();
  
  if (!sessionData.validations) {
    sessionData.validations = {};
  }
  
  // Store ENTIRE response without modification
  sessionData.validations[key] = {
    ...response,
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
    validations: {},
    quiz_answers: {},
    metadata: {}
  };
  
  sessionStorage.setItem('session_data', JSON.stringify(newSession));
  return newSession;
};

// Get all data for submission
export const getCompleteSessionData = () => {
  const sessionData = getSessionData();
  
  // Return EVERYTHING as flat object for submission
  return {
    ...sessionData,
    ...sessionData.validations, // Spread all validation responses
    ...sessionData.quiz_answers, // Spread all quiz answers
    submitted_at: new Date().toISOString()
  };
};

export const initializeSession = (): void => {
  // This will create session data if it doesn't exist
  getSessionData();
  
  const utmParams = captureUTMParams();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
};