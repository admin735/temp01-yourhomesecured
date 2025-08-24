import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { MovingBanner } from './components/MovingBanner';
import { ValuePropositions } from './components/ValuePropositions';
import { HowItWorks } from './components/HowItWorks';
import { TrustTransparency } from './components/TrustTransparency';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { QuizOverlay } from './components/QuizOverlay';

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