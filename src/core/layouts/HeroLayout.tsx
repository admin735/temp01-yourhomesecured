import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { QuizOverlay } from '../components/QuizOverlay';
import { ComplianceScripts } from '../components/ComplianceScripts';

export const HeroLayout: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ComplianceScripts />
      <Hero onQuizStart={() => setIsQuizOpen(true)} />
      <div className="flex-grow" />
      <Footer />
      <QuizOverlay 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
      />
    </div>
  );
};