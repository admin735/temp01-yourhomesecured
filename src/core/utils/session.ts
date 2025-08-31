interface SessionData {
  // Core session info
  session_id: string;
  timestamp: string;
  landing_page: string;
  referrer: string;
  
  // UTM parameters at root level
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  
  // Validations and answers
  validations: {
    zip?: any;      // Full ZIP validation response
    phone?: any;    // Full phone validation response
    email?: any;    // Full email validation response
    qualification?: any; // Qualification API response
  };
  
  quiz_answers: Record<string, any>;
  form_data: Record<string, any>;
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
  console.log('storeValidation called with:', type, response);
  const sessionData = getSessionData();
  
  if (!sessionData.validations) {
    sessionData.validations = {};
  }
  
  sessionData.validations[type] = response;
  console.log('About to save to sessionStorage:', sessionData);
  
  sessionStorage.setItem('session_data', JSON.stringify(sessionData));
  
  // Verify it was saved
  const saved = JSON.parse(sessionStorage.getItem('session_data'));
  console.log('Actually saved:', saved);
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
    const data = JSON.parse(stored);
    
    // If old format with utm_params object, migrate to flat structure
    if (data.utm_params && !data.utm_source) {
      data.utm_source = data.utm_params.utm_source || '';
      data.utm_medium = data.utm_params.utm_medium || '';
      data.utm_campaign = data.utm_params.utm_campaign || '';
      data.utm_term = data.utm_params.utm_term || '';
      data.utm_content = data.utm_params.utm_content || '';
      delete data.utm_params; // Remove the nested object
      sessionStorage.setItem('session_data', JSON.stringify(data));
    }
    
    return data;
  }
  
  // Extract UTM parameters
  const params = new URLSearchParams(window.location.search);
  
  // Initialize with UTMs at root level
  const newSession: SessionData = {
    session_id: generateSessionId(),
    timestamp: new Date().toISOString(),
    landing_page: window.location.pathname,
    referrer: document.referrer || 'direct',
    
    // UTM parameters at root level
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    
    validations: {},
    quiz_answers: {},
    form_data: {}
  };
  
  sessionStorage.setItem('session_data', JSON.stringify(newSession));
  return newSession;
};

export const getFinalSubmissionPayload = () => {
  const sessionData = getSessionData();
  
  // Everything is already at root level, just spread it
  return {
    ...sessionData,
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