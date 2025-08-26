import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './core/components/ErrorBoundary';
import { initializeSession } from './core/utils/session';
import { Hero } from './core/components/Hero';
import { MovingBanner } from './core/components/MovingBanner';
import { ValuePropositions } from './core/components/ValuePropositions';
import { HowItWorks } from './core/components/HowItWorks';
import { TrustTransparency } from './core/components/TrustTransparency';
import { FAQ } from './core/components/FAQ';
import { FinalCTA } from './core/components/FinalCTA';
import { Footer } from './core/components/Footer';
import { QuizOverlay } from './core/components/QuizOverlay';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { TCPADisclaimer } from './pages/TCPADisclaimer';

const HomePage: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    initializeSession();
  }, []);

  const handleQuizStart = () => {
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero onQuizStart={handleQuizStart} />
      <MovingBanner />
      <ValuePropositions />
      <HowItWorks onQuizStart={handleQuizStart} />
      <TrustTransparency />
      <FAQ />
      <FinalCTA onQuizStart={handleQuizStart} />
      <Footer />
      <QuizOverlay isOpen={isQuizOpen} onClose={handleQuizClose} />
    </div>
  );
};

function App() {
  useEffect(() => {
    initializeSession();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/tcpa-disclaimer" element={<TCPADisclaimer />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;