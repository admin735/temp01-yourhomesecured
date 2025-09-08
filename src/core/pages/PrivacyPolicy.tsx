import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QuizOverlay } from '../components/QuizOverlay';
import { Footer } from '../components/Footer';
import { complianceContent } from '../../config/compliance.content.config';
import { siteConfig } from '../../config/site.config';

// Shared component for both Privacy and Terms pages
const LegalPage: React.FC<{ pageType: 'privacy' | 'terms' }> = ({ pageType }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const content = complianceContent[pageType];
  
  const handleQuizStart = () => {
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizOpen(false);
  };
  
  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'intro':
      case 'paragraph':
        return (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {section.title}
            </h2>
            {section.subsection && (
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                {section.subsection}
              </h3>
            )}
            {section.content.map((paragraph: string, pIndex: number) => (
              <p key={pIndex} className="text-gray-600 mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
            {section.outro && (
              <p className="text-gray-600 mt-4 whitespace-pre-line">
                {section.outro}
              </p>
            )}
          </div>
        );
        
      case 'list':
        return (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {pageType === 'terms' && index > 0 ? `${index}. ` : ''}{section.title}
            </h2>
            {section.intro && (
              <p className="text-gray-600 mb-4">{section.intro}</p>
            )}
            <ul className="space-y-2">
              {section.content.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            {section.outro && (
              <p className="text-gray-600 mt-4">{section.outro}</p>
            )}
          </div>
        );
        
      case 'contact':
        return (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {section.title}
            </h2>
            <p className="text-gray-600 mb-2">
              If you have any questions about this {pageType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              {section.content.map((item: string, itemIndex: number) => (
                <p key={itemIndex} className="text-gray-600">
                  {item}
                </p>
              ))}
            </div>
            {section.outro && (
              <p className="text-gray-600 mt-4 whitespace-pre-line">
                {section.outro}
              </p>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </a>
              <div className="flex items-center gap-2">
                <img 
                  src="/yourhomesecured-330x330-website (1).svg" 
                  alt="YourHomeSecured Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-gray-900">{siteConfig?.client?.name || 'YourHomeSecured'}</span>
              </div>
            </div>
            <button
              onClick={handleQuizStart}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Take Security Quiz
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.hero.title}
          </h1>
          <p className="text-xl opacity-90">
            {content.hero.subtitle}
          </p>
          <p className="text-sm mt-4 opacity-75">
            Last Updated: {content.hero.lastUpdated}
          </p>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {content.sections.map((section: any, index: number) => 
              renderSection(section, index)
            )}
          </div>
        </div>
      </section>
      
      <QuizOverlay isOpen={isQuizOpen} onClose={handleQuizClose} />
      <Footer />
    </div>
  );
};

// Export individual components
export const PrivacyPolicy: React.FC = () => <LegalPage pageType="privacy" />;
export const TermsOfService: React.FC = () => <LegalPage pageType="terms" />;