import React, { useState } from 'react';
import { useEffect } from 'react';
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

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

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
}

export default App;