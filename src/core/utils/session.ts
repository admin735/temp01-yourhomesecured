// Session Management Utilities
import { SessionData } from '../types/quiz.types';

// Generate unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initialize session data structure
const initializeSession = (): SessionData => {
  // Capture URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmData: Record<string, string> = {};
  
  // Capture all query parameters
  urlParams.forEach((value, key) => {
    utmData[key] = value;
  });
  
  return {
    session_id: generateSessionId(),
    landing_page: window.location.href,
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    quiz_answers: {},
    form_fields: {},
    validations: {},
    compliance: {},
    utm: utmData,
    ip_address: null,
    user_agent: navigator.userAgent
  };
};

// Get session data from storage
export const getSessionData = (): SessionData => {
  try {
    const stored = sessionStorage.getItem('quiz_session');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse session data:', error);
  }
  
  // Initialize new session if none exists or parsing failed
  const newSession = initializeSession();
  sessionStorage.setItem('quiz_session', JSON.stringify(newSession));
  return newSession;
};

// Store quiz answer
export const storeQuizAnswer = (questionId: string, answer: any): void => {
  try {
    const session = getSessionData();
    session.quiz_answers[questionId] = answer;
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store quiz answer:', error);
  }
};

// Store validation result
export const storeValidation = (field: string, validationResult: any): void => {
  try {
    const session = getSessionData();
    session.validations[field] = validationResult;
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store validation:', error);
  }
};

// Store form field data
export const storeFormField = (field: string, value: any): void => {
  try {
    const session = getSessionData();
    session.form_fields[field] = value;
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store form field:', error);
  }
};

// Store compliance data
export const storeComplianceData = (data: Record<string, any>): void => {
  try {
    const session = getSessionData();
    session.compliance = {
      ...session.compliance,
      ...data
    };
    sessionStorage.setItem('quiz_session', JSON.stringify(session));
  } catch (error) {
    console.error('Failed to store compliance data:', error);
  }
};

// Get final submission payload
export const getFinalSubmissionPayload = () => {
  const session = getSessionData();
  
  const payload = {
    session_id: session.session_id,
    quiz_answers: session.quiz_answers,
    lead: session.form_fields,
    validations: session.validations,
    utm: session.utm,  // Include UTM parameters
    metadata: {
      landing_page: session.landing_page,
      referrer: session.referrer,
      timestamp: session.timestamp,
      user_agent: session.user_agent,
      ip_address: session.ip_address
    },
    
    // Add ALL compliance data if present
    ...(session.compliance && {
      // Jornaya data
      ...(session.compliance.leadid_token && {
        leadid_token: session.compliance.leadid_token,
        leadid_timestamp: session.compliance.leadid_timestamp,
      }),
      // TrustedForm data
      ...(session.compliance.trusted_form_cert && {
        xxTrustedFormCertUrl: session.compliance.trusted_form_cert,
      }),
      // Page URL (common to both)
      ...(session.compliance.page_url && {
        page_url: session.compliance.page_url,
      })
    })
  };
  
  return payload;
};

// Clear session data
export const clearSessionData = (): void => {
  try {
    sessionStorage.removeItem('quiz_session');
  } catch (error) {
    console.error('Failed to clear session data:', error);
  }
};