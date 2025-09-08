import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './core/components/ErrorBoundary';
import { getSessionData } from './core/utils/session';
import { HomeLayout } from './core/layouts/HomeLayout';
import { HeroLayout } from './core/layouts/HeroLayout';
import { PrivacyPolicy } from './core/pages/PrivacyPolicy';
import { TermsOfService } from './core/pages/TermsOfService';
import { TCPADisclaimer } from './core/pages/TCPADisclaimer';

function App() {
  // Temporary debugging code for environment variables
  console.log('Environment Variables Check:', {
    emailValidator: import.meta.env.VITE_EMAIL_VALIDATOR,
    zipValidator: import.meta.env.VITE_ZIP_VALIDATOR,
    phoneValidator: import.meta.env.VITE_PHONE_VALIDATOR,
    leadWebhook: import.meta.env.VITE_LEAD_WEBHOOK,
    env: import.meta.env.VITE_ENV
  });

  useEffect(() => {
    getSessionData();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Layout-based routes */}
          <Route path="/" element={<HomeLayout />} />
          <Route path="/get-quote" element={<HeroLayout />} />
          <Route path="/quiz" element={<HeroLayout />} />
          
          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/tcpa-disclaimer" element={<TCPADisclaimer />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;