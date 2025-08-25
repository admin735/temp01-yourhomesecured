import { config } from './environment.config';

export const quizConfig = {
  steps: [
    {
      id: 'zip',
      type: 'input' as const,
      question: 'What is your ZIP code?',
      placeholder: 'ZIP code',
      helper: "We'll check local availability.",
      validation: {
        pattern: /^\d{5}$/,
        message: 'Please enter a valid 5-digit ZIP.',
        apiEndpoint: config.api.zipValidation,
        mockDelay: 1500,
      },
      required: true,
      sidebar: {
        title: 'Why we need your ZIP',
        content: 'We use your location to match you with local providers and check service availability in your area.'
      }
    },
    {
      id: 'home_status',
      type: 'button-group' as const,
      question: 'Choose your property type:',
      helper: 'Helps tailor pro vs. renter-friendly options.',
      options: [
        { value: 'owner', label: 'Homeowner' },
        { value: 'rental', label: 'Rental' }
      ],
      required: true,
      sidebar: {
        title: 'Property Type Matters',
        content: 'Homeowners have more installation options, while renters need drill-free solutions.'
      }
    },
    {
      id: 'install_pref',
      type: 'button-group' as const,
      question: 'Choose your preferred installation method:',
      helper: 'We match you with the right setup.',
      options: [
        { value: 'pro', label: 'Professional Install' },
        { value: 'diy', label: 'Self Setup' },
        { value: 'unsure', label: 'Not sure' }
      ],
      required: true,
      sidebar: {
        title: 'Installation Options',
        content: 'Professional installation ensures proper setup, while DIY saves money and gives you control.'
      }
    },
    {
      id: 'intent_timing',
      type: 'button-group' as const,
      question: 'When do you want this set up?',
      helper: 'This helps us prioritize your options.',
      options: [
        { value: 'asap', label: 'ASAP (48-72 hrs)' },
        { value: 'week', label: 'This week' },
        { value: '2_4w', label: '2-4 weeks' },
        { value: 'research', label: 'Just researching' }
      ],
      required: true,
      sidebar: {
        title: 'Timing Matters',
        content: 'Faster installation may have different pricing and availability options.'
      }
    },
    {
      id: 'existing_system',
      type: 'button-group' as const,
      question: 'Do you already have a security system?',
      helper: "We'll tailor takeover or new-system options.",
      options: [
        { value: 'none', label: 'No' },
        { value: 'diy', label: 'DIY (e.g., Ring, SimpliSafe)' },
        { value: 'pro_monitored', label: 'Pro-monitored (ADT, Vivint, etc.)' }
      ],
      required: true,
      sidebar: {
        title: 'Current System',
        content: 'Existing equipment might be compatible with new services, potentially saving you money.'
      }
    }
  ],
  
  loadingStep: {
    duration: 3000,
    apiEndpoint: config.api.qualification,
    stages: [
      { progress: 25, message: 'Loading your data...' },
      { progress: 50, message: 'Validating information...' },
      { progress: 75, message: 'Finding best matches...' },
      { progress: 100, message: 'Matches found!' }
    ]
  },
  
  submission: {
    fields: [
      { id: 'first_name', type: 'text', label: 'First Name', placeholder: 'First Name', required: true },
      { id: 'last_name', type: 'text', label: 'Last Name', placeholder: 'Last Name', required: true },
      { id: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com', required: true },
      { id: 'phone', type: 'tel', label: 'Phone', placeholder: '(___) ___-____', required: true }
    ],
    consent: {
      text: 'By clicking "Get My Options", you agree to be contacted by YourHomeSecured and our security partners at the number/email provided (including autodialed, prerecorded, and text messages). Consent not required to buy. Msg & data rates may apply. See our Privacy Policy and Terms.',
      required: true
    },
    webhook: config.api.leadSubmit
  }
};