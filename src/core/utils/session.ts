interface SessionData {
  // Core session info
  session_id: string;
  timestamp: string;
  landing_page: string;
  referrer: string;
  utm_params: Record<string, string>;
  
  // Store ALL data from validations/enrichments
  validations: {
    zip?: any;      // Full ZIP validation response
    phone?: any;    // Full phone validation response
    email?: any;    // Full email validation response
    qualification?: any; // Qualification API response
  };
  
  // Quiz answers (raw user input)
  quiz_answers: {
    zip?: string;
    property_type?: string;
    ownership_status?: string;
    timeline?: string;
    [key: string]: any; // Allow any quiz question
  };
  
  // Form data
  form_data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
  };
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

// Store validation responses as-is
export const storeValidation = (type: string, response: any) => {
  const sessionData = getSessionData();
  sessionData.validations[type] = response;
  sessionStorage.setItem('session_data', JSON.stringify(sessionData));
};

// Store quiz answer
export const storeQuizAnswer = (question: string, answer: any) => {
  const sessionData = getSessionData();
  sessionData.quiz_answers[question] = answer;
  sessionStorage.setItem('session_data', JSON.stringify(sessionData));
};

// Store form field
export const storeFormField = (field: string, value: any) => {
  const sessionData = getSessionData();
  sessionData.form_data[field] = value;
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
    form_data: {}
  };
  
  sessionStorage.setItem('session_data', JSON.stringify(newSession));
  return newSession;
};

// Get complete payload for submission
export const getFinalSubmissionPayload = () => {
  const sessionData = getSessionData();
  
  return {
    // Session metadata
    session: {
      id: sessionData.session_id,
      timestamp: sessionData.timestamp,
      landing_page: sessionData.landing_page,
      referrer: sessionData.referrer,
      utm_params: sessionData.utm_params
    },
    
    // User inputs
    user_data: {
      ...sessionData.form_data,
      quiz_answers: sessionData.quiz_answers
    },
    
    // All enrichment data from APIs
    enrichment_data: sessionData.validations,
    
    // Submission metadata
    submitted_at: new Date().toISOString(),
    user_agent: navigator.userAgent
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