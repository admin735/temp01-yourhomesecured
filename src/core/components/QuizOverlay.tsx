import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2, CheckCircle, XCircle, AlertCircle, Shield } from 'lucide-react';
import { quizConfig } from '../../config/quiz.config';
import { validateField } from '../utils/validation';
import { getSessionData, storeQuizAnswer, storeValidation, storeFormField, getFinalSubmissionPayload } from '../utils/session';
import { config } from '../../config/environment.config';
import { withErrorBoundary, reportError } from '../utils/errorHandler';
import { OTPModal } from './OTPModal';
import { PhoneValidationPopup } from './PhoneValidationPopup';

interface EmailValidationState {
  loading: boolean;
  valid: boolean | null;
  error: string | null;
  suggestion?: string;
}

interface PhoneValidationState {
  loading: boolean;
  status: 'valid' | 'invalid' | null;
  error: string | null;
}

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
  const [emailValidationState, setEmailValidationState] = useState<EmailValidationState>({
    loading: false,
    valid: null,
    error: null,
    suggestion: undefined
  });
  const [phoneValidationState, setPhoneValidationState] = useState<PhoneValidationState>({
    loading: false,
    status: null,
    error: null
  });
  const [showExitModal, setShowExitModal] = useState(false);
  const [lastValidatedValues, setLastValidatedValues] = useState<{
    email?: string;
    phone?: string;
    zipCode?: string;
  }>({});
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  
  const checkQualification = async () => {
    // Toggle to skip qualification logic - set to false to always qualify
    const ENABLE_QUALIFICATION_CHECK = false;
    
    if (!ENABLE_QUALIFICATION_CHECK) {
      return true; // Always qualified when toggle is OFF
    }
    
    const sessionData = getSessionData();
    
    try {
      // Send all quiz answers for qualification
      const response = await fetch(config.api.qualification, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionData.session_id,
          answers: sessionData.quiz_answers,
          zip_data: sessionData.validations.zip // Include enrichment
        })
      });
      
      const result = await response.json();
      
      // Store qualification result
      storeValidation('qualification', result);
      
      return result.status === 'qualified';
    } catch (error) {
      console.error('Qualification check error:', error);
      // Default to qualified on error to not block user
      return true;
    }
  };

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
      const answerValue = selectedOption?.value || value;
      
      // Update local state
      setQuizData(prev => ({
        ...prev,
        [configStep.id]: answerValue
      }));
      
      // Store quiz answer
      storeQuizAnswer(configStep.id, answerValue);
      
      // Auto-advance for qualifying questions (radio button questions)
      if (configStep.type === 'button-group') {
        setTimeout(() => {
          handleNext();
        }, 300); // Small delay for better UX
      }
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
    
    // Update local state
    setQuizData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Store form field data
    if (['first_name', 'last_name', 'phone', 'email'].includes(field)) {
      storeFormField(field, value);
    }

    // Handle ZIP validation when 5 digits entered
    if (field === 'zip' && value.length === 5) {
      // Store user's ZIP answer first
      storeQuizAnswer('zip', value);
      
      // Set loading immediately
      setValidationState({ loading: true, valid: null, error: null });
      
      // Get the config and session data
      const configStep = quizConfig.steps[0];
      const sessionData = getSessionData();
      
      // Execute validation and handle response
      try {
        const result = await validateField(configStep, value, sessionData);
        console.log('QuizOverlay received:', result);
        
        // Update state when response arrives
        setValidationState({
          loading: false,
          valid: result.valid,
          error: result.error
        });
        
        // Store entire validation response if valid
        if (result.valid) {
          console.log('About to store validation with:', result);
          storeValidation('zip', result);
          // Check immediately after storing
          const stored = JSON.parse(sessionStorage.getItem('session_data'));
          console.log('Session storage after store:', stored);
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

  const handleEmailValidation = async (email: string) => {
    if (!email) return;
    
    // Skip if unchanged
    if (email === lastValidatedValues.email) {
      console.log('Email unchanged, skipping validation');
      return;
    }
    
    const emailLower = email.toLowerCase();
    
    // Check for @ symbol
    if (!email.includes('@')) {
      setEmailValidationState({
        loading: false,
        valid: false,
        error: 'Email must include @ symbol',
        suggestion: undefined
      });
      return;
    }
    
    // Split email to check domain
    const [localPart, domain] = emailLower.split('@');
    
    // Common domain typos
    const domainTypos: Record<string, string> = {
      'gmial.com': 'gmail.com',
      'gmai.com': 'gmail.com',
      'gmil.com': 'gmail.com',
      'hotmial.com': 'hotmail.com',
      'hotmal.com': 'hotmail.com',
      'hotmil.com': 'hotmail.com',
      'hotmsl.com': 'hotmail.com',
      'hotms.com': 'hotmail.com',
      'yahooo.com': 'yahoo.com',
      'yaho.com': 'yahoo.com',
      'outlok.com': 'outlook.com',
      'outloo.com': 'outlook.com'
    };
    
    // Check if domain is a known typo
    if (domainTypos[domain]) {
      const suggestedEmail = `${localPart}@${domainTypos[domain]}`;
      setEmailValidationState({
        loading: false,
        valid: false,
        error: `Did you mean ${suggestedEmail}?`,
        suggestion: suggestedEmail
      });
      return;
    }
    
    // Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailValidationState({
        loading: false,
        valid: false,
        error: 'Please enter a valid email format',
        suggestion: undefined
      });
      return;
    }
    
    // Check for spaces
    if (email.includes(' ')) {
      setEmailValidationState({
        loading: false,
        valid: false,
        error: 'Email cannot contain spaces',
        suggestion: undefined
      });
      return;
    }
    
    // All client-side checks passed, now call API
    setEmailValidationState({ loading: true, valid: null, error: null });
    
    const emailConfig = {
      id: 'email',
      validation: {
        apiEndpoint: config.api.emailValidation,
        mockDelay: 1500,
        message: 'Please enter a valid email address'
      }
    };
    
    const sessionData = getSessionData();
    
    try {
      const result = await validateField(emailConfig, email, sessionData);
      
      // Track this as the last validated value
      setLastValidatedValues(prev => ({
        ...prev,
        email: email
      }));
      
      setEmailValidationState({
        loading: false,
        valid: result.valid,
        error: result.error
      });
      
      if (result.valid) {
        storeValidation('email', result);
      }
    } catch (error) {
      setEmailValidationState({
        loading: false,
        valid: false,
        error: 'Validation failed'
      });
    }
  };

  // Add this handler for applying suggestion
  const applySuggestion = (suggestedEmail: string) => {
    handleInputChange('email', suggestedEmail);
    setEmailValidationState({
      loading: false,
      valid: null,
      error: null,
      suggestion: undefined
    });
    // Trigger validation with corrected email
    handleEmailValidation(suggestedEmail);
  };

  // Phone Validation Handler
  const handlePhoneValidation = async (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length !== 10) return;
    if (phone === lastValidatedValues.phone) return;
    
   setPhoneValidationState({ loading: true, status: null, error: null });
    
    try {
      const sessionData = getSessionData();
      
      // Create a step object compatible with validateField
      const phoneStep = {
        id: 'phone',
        validation: {
          apiEndpoint: config.api.phoneValidation,
          mockDelay: 1500,
          message: 'Please enter a valid phone number'
        }
      };
      
      // Use validateField instead of direct fetch
      const result = await validateField(phoneStep, cleaned, sessionData);
      
      setLastValidatedValues(prev => ({ ...prev, phone }));
      
      if (result.valid && result.data) {
        const data = result.data;
        
        if (data.otp_required) {
          setPhoneValidationState({ 
            loading: false, 
            status: 'needs_otp',
           error: null,
            message: result.message || `Verification required`,
            phoneType: data.phone_type
          });
          setShowValidationPopup(true);
        } else {
          setPhoneValidationState({ 
            loading: false, 
            status: 'valid',
           error: null,
            message: 'Phone number verified',
            phoneType: data.phone_type
          });
          storeValidation('phone', data);
        }
      } else {
        setPhoneValidationState({ 
          loading: false, 
          status: 'invalid',
         error: null,
          message: result.error || 'Please enter a valid phone number'
        });
      }
    } catch (error) {
      console.error('Phone validation error:', error);
      setPhoneValidationState({ 
        loading: false, 
        status: 'invalid', 
       error: null,
        message: 'Unable to validate phone number. Please try again.' 
      });
    }
  };

  // Send OTP Handler
  const handleSendOTP = async () => {
    const cleaned = quizData.phone.replace(/\D/g, '');
    setSendingOTP(true);
    
    try {
      const sessionData = getSessionData();
      
      // Use config.api.sendOTP (which pulls from VITE_SEND_OTP)
      const response = await fetch(config.api.sendOTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: cleaned,
          session_id: sessionData.session_id
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setShowValidationPopup(false);
        setShowOTPModal(true);
        setPhoneValidationState(prev => ({
          ...prev,
          status: 'otp_sent',
          error: null,
          message: 'Verification code sent'
        }));
      } else {
        alert('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      alert('Failed to send verification code. Please try again.');
    } finally {
      setSendingOTP(false);
    }
  };

  // Cancel Validation Handler
  const handleCancelValidation = () => {
    setShowValidationPopup(false);
   setPhoneValidationState({ loading: false, status: null, error: null });
   handleInputChange('phone', '');
  };

  // Verify OTP Handler
  const handleVerifyOTP = async (code: string): Promise<{ success: boolean; message?: string }> => {
    const cleaned = quizData.phone.replace(/\D/g, '');
    
    try {
      const sessionData = getSessionData();
      
      // Use config.api.verifyOTP (which pulls from VITE_VERIFY_OTP)
      const response = await fetch(config.api.verifyOTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: cleaned,
          otp: code,
          session_id: sessionData.session_id
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Check for "approved" status as you mentioned
      if (result.success || result.status === 'approved' || result.status === 'valid') {
        setPhoneValidationState({ 
          loading: false, 
          status: 'valid',
          message: 'Phone verified successfully'
        });
        setShowOTPModal(false);
        storeValidation('phone', { status: 'valid', verified: true, ...result });
        return { success: true };
      }
      
      return { success: false, message: result.message || 'Invalid code' };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false, message: 'Verification failed' };
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
    
    // Contact step - require BOTH email and phone to be valid
    return quizData.first_name && 
           quizData.last_name && 
           quizData.phone && 
           quizData.email && 
           emailValidationState.valid === true && // Email must be validated
           phoneValidationState.status === 'valid' && // Phone must be validated
           tcpaConsent;
  };

  const runLoadingAnimation = async () => {
    setIsLoadingStep(true);
    const stages = quizConfig.loadingStep.stages;
    
    // Run qualification check during loading
    let isQualified = true;
    
    for (let stage of stages) {
      setLoadingProgress(stage.progress);
      setLoadingMessage(stage.message);
      
      // Run qualification check at 50% progress
      if (stage.progress === 50 && config.api.qualification) {
        isQualified = await checkQualification();
      }
      
      await new Promise(resolve => setTimeout(resolve, 750));
    }
    
    setIsLoadingStep(false);
    
    // Only proceed to contact form if qualified
    if (isQualified) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle disqualification - could show different message or redirect
      setShowThankYou(true);
    }
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
      handleFinalSubmission();
    });
    
    submitWithErrorHandling();
  };

  const handleFinalSubmission = async () => {
    try {
      // Get EVERYTHING
      const payload = {
        ...getFinalSubmissionPayload(),
        consent: {
          tcpa_agreed: tcpaConsent,
          tcpa_timestamp: consentTimestamp,
          tcpa_text: quizConfig.submission.consent.text,
          tcpa_version: '2025_v1'
        }
      };
      
      const response = await fetch(config.api.leadSubmit, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      
      // Log for debugging only
      if (config.features.debugMode) {
        console.log('Submission result:', result);
      }
      
      // Always show thank you regardless of response
      setShowThankYou(true);
      
      return result;
    } catch (error) {
      reportError(error as Error, { context: 'final_submission' });
      
      // Log errors only in debug mode
      if (config.features.debugMode) {
        console.error('Submission error:', error);
      }
      
      // Still show thank you - don't block user experience
      setShowThankYou(true);
    }
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
    <>
      {/* Main quiz modal */}
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
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={quizData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      onBlur={(e) => {
                        // Fire validation when leaving the field
                        const cleaned = e.target.value.replace(/\D/g, '');
                        if (cleaned.length === 10) {
                          handlePhoneValidation(e.target.value);
                        }
                      }}
                      className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    {/* Loading indicator */}
                    {phoneValidationState.loading && (
                      <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-blue-500" />
                    )}
                    
                    {/* Valid checkmark */}
                    {phoneValidationState.status === 'valid' && (
                      <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-500" />
                    )}
                    
                    {/* Invalid X */}
                    {phoneValidationState.status === 'invalid' && (
                      <XCircle className="absolute right-4 top-4 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  
                  {/* Error message */}
                  {phoneValidationState.status === 'invalid' && phoneValidationState.message && (
                    <p className="mt-1 text-sm text-red-600">{phoneValidationState.message}</p>
                  )}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={quizData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={(e) => {
                        // Fire validation when leaving the field for any reason
                        if (e.target.value) {
                          handleEmailValidation(e.target.value);
                        }
                      }}
                      className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {emailValidationState.loading && (
                      <Loader2 className="absolute right-4 top-4 w-5 h-5 animate-spin text-blue-500" />
                    )}
                    {emailValidationState.valid === true && (
                      <CheckCircle className="absolute right-4 top-4 w-5 h-5 text-green-500" />
                    )}
                    {emailValidationState.valid === false && (
                      <XCircle className="absolute right-4 top-4 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {quizData.email && emailValidationState.valid === false && (
                    <p className="mt-1 text-sm text-red-600">Valid email required</p>
                  )}
                  {emailValidationState.error && (
                    <p className="mt-1 text-sm text-red-600">
                      {emailValidationState.suggestion ? (
                        <span>
                          Did you mean{' '}
                          <button
                            type="button"
                            onClick={() => applySuggestion(emailValidationState.suggestion!)}
                            className="underline font-semibold hover:text-red-700 cursor-pointer"
                          >
                            {emailValidationState.suggestion}
                          </button>
                          ?
                        </span>
                      ) : (
                        emailValidationState.error
                      )}
                    </p>
                  )}
                  
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
        {!showThankYou && (currentStep === 0 || currentStep === steps.length - 1) && (
          <div className="p-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {steps.length}
            </div>
            <button
              onClick={(e) => {
                if (!canProceed()) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                handleNext();
              }}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                canProceed()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50 pointer-events-none'
              }`}
              title={!canProceed() ? 'Please complete and validate all fields' : ''}
              style={{ pointerEvents: !canProceed() ? 'none' : 'auto' }}
            >
              {currentStep === steps.length - 1 ? 'Get My Options' : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        )}
        </div>
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

      {/* Phone Validation Popup - Outside main modal */}
      <PhoneValidationPopup
        isOpen={showValidationPopup}
        phoneNumber="(555) 123-4567"
        onConfirm={handleSendOTP}
        onCancel={handleCancelValidation}
        loading={sendingOTP}
      />

      {/* OTP Modal - Outside main modal */}
      <OTPModal
        isOpen={showOTPModal}
        phoneNumber="(555) 123-4567"
        onVerify={handleVerifyOTP}
        onResend={handleSendOTP}
        onClose={() => setShowOTPModal(false)}
      />
    </>
  );
};