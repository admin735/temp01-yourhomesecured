export const captureUTMParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'].forEach(key => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  
  return utm;
};

export const generateSessionId = (): string => {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const initializeSession = (): void => {
  if (!sessionStorage.getItem('session_id')) {
    sessionStorage.setItem('session_id', generateSessionId());
  }
  
  const utmParams = captureUTMParams();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
};

export const getSessionData = () => {
  return {
    landing_page: window.location.pathname,
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    session_id: sessionStorage.getItem('session_id') || generateSessionId(),
    utm_params: JSON.parse(sessionStorage.getItem('utm_params') || '{}')
  };
};