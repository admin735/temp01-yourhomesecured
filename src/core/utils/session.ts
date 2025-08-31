interface SessionData {
  session_id: string;
  timestamp: string;
  landing_page: string;
  referrer: string;
  
  // Flexible tracking object
  tracking: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    click_id?: string;
    click_id_type?: string;
    [key: string]: string | undefined; // Allow any additional utm_ parameters
  };
  
  validations: Record<string, any>;
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
    return JSON.parse(stored);
  }
  
  const params = new URLSearchParams(window.location.search);
  
  // Build dynamic tracking object
  const tracking: Record<string, string> = {};
  
  // Capture ALL UTM parameters dynamically
  for (const [key, value] of params.entries()) {
    // Capture any parameter starting with utm_
    if (key.toLowerCase().startsWith('utm_')) {
      tracking[key] = value;
    }
    // Capture click IDs
    else if (key.toLowerCase().includes('clid')) {
      tracking.click_id = value;
      tracking.click_id_type = key;
    }
  }
  
  // Ensure standard UTMs exist even if empty
  tracking.utm_source = tracking.utm_source || '';
  tracking.utm_medium = tracking.utm_medium || '';
  tracking.utm_campaign = tracking.utm_campaign || '';
  tracking.utm_term = tracking.utm_term || '';
  tracking.utm_content = tracking.utm_content || '';
  
  const newSession: SessionData = {
    session_id: generateSessionId(),
    timestamp: new Date().toISOString(),
    landing_page: window.location.pathname,
    referrer: document.referrer || 'direct',
    tracking: tracking,
    validations: {},
    quiz_answers: {},
    form_data: {}
  };
  
  sessionStorage.setItem('session_data', JSON.stringify(newSession));
  return newSession;
};

export const getFinalSubmissionPayload = () => {
  const sessionData = getSessionData();
  
  return {
    session_id: sessionData.session_id,
    timestamp: sessionData.timestamp,
    landing_page: sessionData.landing_page,
    referrer: sessionData.referrer,
    
    // Include entire tracking object
    tracking: sessionData.tracking,
    
    // User data
    user_data: {
      ...sessionData.form_data,
      quiz_answers: sessionData.quiz_answers
    },
    
    // Enrichment
    enrichment_data: sessionData.validations,
    
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