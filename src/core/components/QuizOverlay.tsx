import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { QuizData } from '../types/quiz.types';

// Add this interface since the old QuizStep is different
interface QuizStep {
  id: number;
  title: string;
  helper?: string;
  type: 'radio' | 'input' | 'contact';
}

interface QuizOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizOverlay: React.FC<QuizOverlayProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizData>({
    homeStatus: '',
    installPreference: '',
    zipCode: '',
    urgency: '',
    existingSystem: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const steps: QuizStep[] = [
    {
      id: 1,
      title: 'Choose your property type:',
      helper: 'Helps tailor pro vs. renter-friendly options.',
      type: 'radio'
    },
    {
      id: 2,
      title: 'Choose your preferred installation method:',
      helper: 'We match you with the right setup.',
      type: 'radio'
    },
    {
      id: 3,
      title: 'What is your ZIP code?',
      helper: "We'll check local availability.",
      type: 'input'
    },
    {
      id: 4,
      title: 'When do you want this set up?',
      helper: 'This helps us prioritize your options.',
      type: 'radio'
    },
    {
      id: 5,
      title: 'Do you already have a security system?',
      helper: "We'll tailor takeover or new-system options.",
      type: 'radio'
    },
    {
      id: 6,
      title: 'Please enter your contact details:',
      type: 'contact'
    }
  ];

  const getOptions = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return ['Homeowner', 'Rental'];
      case 1:
        return ['Professional Install', 'Self Setup', 'Not sure'];
      case 3:
        return ['ASAP (48-72 hrs)', 'This week', '2-4 weeks', 'Just researching'];
      case 4:
        return ['No', 'DIY (e.g., Ring, SimpliSafe)', 'Pro-monitored (ADT, Vivint, etc.)'];
      default:
        return [];
    }
  };

  const handleOptionSelect = (value: string) => {
    const stepKeys = ['homeStatus', 'installPreference', 'zipCode', 'urgency', 'existingSystem'];
    setQuizData(prev => ({
      ...prev,
      [stepKeys[currentStep]]: value
    }));
  };

  const handleInputChange = (field: keyof QuizData, value: string) => {
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const canProceed = () => {
    const stepKeys = ['homeStatus', 'installPreference', 'zipCode', 'urgency', 'existingSystem'];
    if (currentStep < 5) {
      return quizData[stepKeys[currentStep] as keyof QuizData] !== '';
    }
    // For contact step, check all required fields
    return quizData.firstName && quizData.lastName && quizData.phone && quizData.email;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send data to your backend
    console.log('Quiz submitted:', quizData);
    setShowThankYou(true);
  };

  const getThankYouMessage = () => {
    if (quizData.homeStatus === 'Homeowner' && quizData.installPreference === 'Professional Install') {
      return "A specialist serving your area can review monitored options with you shortly—install as soon as tomorrow in many areas.";
    }
    return "We'll start with renter-friendly, no-drill options you can set up in minutes.";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {!showThankYou && (
              <button
                onClick={currentStep > 0 ? handleBack : onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {currentStep > 0 ? <ChevronLeft className="w-5 h-5" /> : <X className="w-5 h-5" />}
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {showThankYou ? 'Thank You!' : `Step ${currentStep + 1} of ${steps.length}`}
            </h2>
          </div>
          {!showThankYou && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {!showThankYou && (
          <div className="px-6 py-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {showThankYou ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-green-600 text-2xl">✓</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your Security Match is Ready!
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {getThankYouMessage()}
              </p>
              <p className="text-sm text-gray-500">
                Check your email for your personalized recommendations and next steps.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[currentStep].title}
              </h3>
              
              {steps[currentStep].helper && (
                <p className="text-gray-600 mb-6">
                  {steps[currentStep].helper}
                </p>
              )}

              {/* Step Content */}
              {steps[currentStep].type === 'radio' && (
                <div className="space-y-3">
                  {getOptions(currentStep).map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name={`step-${currentStep}`}
                        value={option}
                        onChange={(e) => handleOptionSelect(e.target.value)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {steps[currentStep].type === 'input' && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter ZIP code"
                    value={quizData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    maxLength={5}
                  />
                </div>
              )}

              {steps[currentStep].type === 'contact' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={quizData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={quizData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={quizData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={quizData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-600 leading-relaxed">
                    <p>
                      By submitting your information, you agree to be contacted by YourHomeSecured 
                      and/or our security partners regarding home protection solutions via phone, 
                      text, or email. Consent is not a condition of purchase. Message and data rates may apply.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!showThankYou && (
          <div className="p-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </div>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                canProceed()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Get My Options' : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};