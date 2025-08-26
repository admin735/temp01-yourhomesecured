import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { quizConfig } from '../../config/quiz.config';
import { validateField } from '../utils/validation';
import { getSessionData } from '../utils/session';
import { withErrorBoundary, reportError } from '../utils/errorHandler';

interface QuizOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuizOverlay: React.FC<QuizOverlayProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [validationState, setValidationState] = useState<any>({});
  const [tcpaConsent, setTcpaConsent] = useState(false);
  const [consentTimestamp, setConsentTimestamp] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);
  
  // Store answers using config IDs
  const [quizData, setQuizData] = useState({
    zip: '',
    home_status: '',
    install_pref: '',
    intent_timing: '',
    existing_system: '',
    first_name: '',
    last_name: '',
    phone: '',
    email: ''
  });

  // Build steps from config
  const steps = [
    ...quizConfig.steps.map(step => ({
      id: step.id,
      title: step.question,
      helper: step.helper,
      type: step.type === 'button-group' ? 'radio' : step.type,
      options: step.options,
      placeholder: step.placeholder
    })),
    {
      id: 'contact',
      title: 'Please enter your contact details:',
      type: 'contact'
    }
  ];

  // After qualifying questions, before contact
  const shouldShowLoading = currentStep === quizConfig.steps.length && !showThankYou;

  const getOptions = (stepIndex: number) => {
    if (stepIndex < quizConfig.steps.length) {
      return quizConfig.steps[stepIndex].options?.map(opt => opt.label) || [];
    }
    return [];
  };

  const handleOptionSelect = (value: string) => {
    const configStep = quizConfig.steps[currentStep];
    if (configStep) {
      const selectedOption = configStep.options?.find(opt => opt.label === value);
      setQuizData(prev => ({
        ...prev,
        [configStep.id]: selectedOption?.value || value
      }));
    }
  };

  const handleInputChange = async (field: string, value: string) => {
    // Phone formatting
    if (field === 'phone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        const formatted = cleaned.length > 6 
          ? `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`
          : cleaned.length > 3
          ? `(${cleaned.slice(0,3)}) ${cleaned.slice(3)}`
          : cleaned;
        value = formatted;
      }
    }
    
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));

    // Handle ZIP validation when 5 digits entered
    if (field === 'zip' && value.length === 5) {
      // Set loading immediately
      setValidationState({ loading: true, valid: null, error: null });
      
      // Get the config and session data
      const configStep = quizConfig.steps[0];
      const sessionData = getSessionData();
      
      // Execute validation and handle response
      try {
        const result = await validateField(configStep, value, sessionData);
        
        // Update state when response arrives
        setValidationState({
          loading: false,
          valid: result.valid,
          error: result.error
        });
        
        // Store enrichment data if valid
        if (result.valid && result.data) {
          sessionStorage.setItem('enrichment_zip', JSON.stringify(result.data));
        }
      } catch (error) {
        // Handle any unexpected errors
        setValidationState({
          loading: false,
          valid: false,
          error: 'Validation failed'
        });
      }
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return validationState.valid === true;
    }
    
    if (currentStep < quizConfig.steps.length) {
      const configStep = quizConfig.steps[currentStep];
      return quizData[configStep.id as keyof typeof quizData] !== '';
    }
    
    // Contact step - now requires consent
    return quizData.first_name && quizData.last_name && 
           quizData.phone && quizData.email && tcpaConsent;
  };

  const runLoadingAnimation = async () => {
    setIsLoadingStep(true);
    const stages = quizConfig.loadingStep.stages;
    
    for (let stage of stages) {
      setLoadingProgress(stage.progress);
      setLoadingMessage(stage.message);
      await new Promise(resolve => setTimeout(resolve, 750));
    }
    
    setIsLoadingStep(false);
    setCurrentStep(currentStep + 1);
  };

  const handleNext = async () => {
    if (currentStep === quizConfig.steps.length - 1) {
      // After last qualifying question, show loading
      await runLoadingAnimation();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const submitWithErrorHandling = withErrorBoundary(() => {
    const finalData = {
      answers: {
        zip: quizData.zip,
        home_status: quizData.home_status,
        install_pref: quizData.install_pref,
        intent_timing: quizData.intent_timing,
        existing_system: quizData.existing_system
      },
      lead: {
        first_name: quizData.first_name,
        last_name: quizData.last_name,
        email: quizData.email,
        phone: quizData.phone
      },
      consent: {
        tcpa_agreed: tcpaConsent,
        tcpa_timestamp: consentTimestamp,
        tcpa_text: quizConfig.submission.consent.text,
        tcpa_version: '2025_v1'
      },
      session: {
        landing_page: window.location.pathname,
        referrer: document.referrer || 'direct',
        session_id: sessionStorage.getItem('session_id') || '',
        timestamp: new Date().toISOString()
      },
      utm_params: JSON.parse(sessionStorage.getItem('utm_params') || '{}')
    };
    
    // Fire and forget - don't wait for response
    try {
      const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK || 'https://webhook.site/unique-test-id';
      
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      }).then(response => {
        // Log for debugging only
        if (import.meta.env.VITE_DEBUG_MODE === 'true') {
          console.log('Webhook status:', response.status);
        }
      }).catch(error => {
        reportError(error, { context: 'webhook_submission', data: finalData });
        // Log errors only in debug mode
        if (import.meta.env.VITE_DEBUG_MODE === 'true') {
          console.error('Webhook error:', error);
        }
      });
    } catch (error) {
      reportError(error as Error, { context: 'webhook_submission_sync', data: finalData });
      // Silent fail - user doesn't need to know
    }
    
    // Always show thank you immediately
    setShowThankYou(true);
    });
    
    submitWithErrorHandling();
  };

  const getThankYouMessage = () => {
    if (quizData.home_status === 'owner' && quizData.install_pref === 'pro') {
      return "A specialist serving your area can review monitored options with you shortly—install as soon as tomorrow in many areas.";
    }
    return "We'll start with renter-friendly, no-drill options you can set up in minutes.";
  };

  if (!isOpen) return null;

  // Show loading screen
  if (isLoadingStep) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {loadingMessage}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl" tabIndex={-1}>
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
              onClick={() => {
                if (currentStep > 0 && !showThankYou) {
                  setShowExitModal(true);
                } else {
                  onClose();
                }
              }}
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
                <CheckCircle className="w-10 h-10 text-green-600" />
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

              {/* ZIP Input (Step 0) */}
              {currentStep === 0 && (
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={steps[0].placeholder || "Enter ZIP code"}
                      value={quizData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                      maxLength={5}
                    />
                    {validationState.loading && (
                      <Loader2 className="absolute right-4 top-5 w-5 h-5 animate-spin text-blue-500" />
                    )}
                    {validationState.valid === true && (
                      <CheckCircle className="absolute right-4 top-5 w-5 h-5 text-green-500" />
                    )}
                    {validationState.valid === false && (
                      <XCircle className="absolute right-4 top-5 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {validationState.error && (
                    <p className="mt-2 text-sm text-red-600">{validationState.error}</p>
                  )}
                </div>
              )}

              {/* Radio Options */}
              {steps[currentStep].type === 'radio' && currentStep > 0 && (
                <div className="space-y-3">
                  {getOptions(currentStep).map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                       name={`step-${currentStep}-${steps[currentStep].id}`}
                        value={option}
                       checked={quizData[quizConfig.steps[currentStep].id as keyof typeof quizData] === quizConfig.steps[currentStep].options?.find(opt => opt.label === option)?.value}
                        onChange={(e) => handleOptionSelect(e.target.value)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Contact Form */}
              {steps[currentStep].type === 'contact' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={quizData.first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={quizData.last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
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
                  
                  <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer border border-gray-200 hover:border-blue-300">
                    <input
                      type="checkbox"
                      checked={tcpaConsent}
                      onChange={(e) => {
                        setTcpaConsent(e.target.checked);
                        if (e.target.checked) {
                          setConsentTimestamp(new Date().toISOString());
                        }
                      }}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {quizConfig.submission.consent.text}
                    </span>
                  </label>
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

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-2">Wait! You're almost done</h3>
            <p className="text-gray-600 mb-4">
              You're just {steps.length - currentStep} questions away from your personalized security recommendations.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowExitModal(false)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Continue Quiz
              </button>
              <button 
                onClick={() => {
                  setShowExitModal(false);
                  onClose();
                }}
                className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};