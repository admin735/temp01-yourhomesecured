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
  
  // Capture standard UTM parameters
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  
  // Capture click IDs
  ['fbclid', 'gclid'].forEach(key => {
    const value = params.get(key);
    if (value) {
      utm.click_id = value;
      utm.click_id_type = key;
    }
  });
  
  // Store UTMs immediately in session
  try {
    const sessionData = getSessionData();
    sessionData.tracking = { ...sessionData.tracking, ...utm };
    sessionStorage.setItem('session_data', JSON.stringify(sessionData));
  } catch (e) {
    console.log('Session storage unavailable for UTM capture');
  }
  
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
  
  try {
    const sessionData = getSessionData();
    
    if (!sessionData.validations) {
      sessionData.validations = {};
    }
    
    // Get the existing data for this type, or an empty object if none exists
    const existingData = sessionData.validations[type] || {};
    
    // Merge the existing data with the new response data
    // New properties from 'response' will be added.
    // If a property exists in both, the one from 'response' will overwrite the existing one.
    sessionData.validations[type] = { ...existingData, ...response };
    
    console.log('About to save to sessionStorage:', sessionData);
    
    try {
      sessionStorage.setItem('session_data', JSON.stringify(sessionData));
      
      // Verify it was saved
      const saved = JSON.parse(sessionStorage.getItem('session_data') || '{}');
      console.log('Actually saved:', saved);
    } catch (storageError) {
      console.log(`Session storage unavailable for ${type} validation`);
    }
  } catch (error) {
    console.error('Error storing validation:', error);
  }
};

// Store quiz answer
export const storeQuizAnswer = (question: string, answer: any) => {
  try {
    const sessionData = getSessionData();
    sessionData.quiz_answers[question] = answer;
    
    try {
      sessionStorage.setItem('session_data', JSON.stringify(sessionData));
    } catch (storageError) {
      console.log(`Session storage unavailable for quiz answer: ${question}`);
    }
  } catch (error) {
    console.error('Error storing quiz answer:', error);
  }
};

// Store form field
export const storeFormField = (field: string, value: any) => {
  try {
    const sessionData = getSessionData();
    sessionData.form_data[field] = value;
    
    try {
      sessionStorage.setItem('session_data', JSON.stringify(sessionData));
    } catch (storageError) {
      console.log(`Session storage unavailable for form field: ${field}`);
    }
  } catch (error) {
    console.error('Error storing form field:', error);
  }
};

export const getSessionData = (): SessionData => {
  try {
    const stored = sessionStorage.getItem('session_data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.log('Session storage unavailable, creating new session');
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
  
  try {
    sessionStorage.setItem('session_data', JSON.stringify(newSession));
  } catch (error) {
    console.log('Session storage unavailable for new session');
  }
  
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
  
  // Capture UTM parameters on initialization
  const utmParams = captureUTMParams();
  
  // Also store in separate utm_params for backward compatibility
  if (Object.keys(utmParams).length > 0) {
    try {
      sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
    } catch (error) {
      console.log('Session storage unavailable for UTM params');
    }
  }
};