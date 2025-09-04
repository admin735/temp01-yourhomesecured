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