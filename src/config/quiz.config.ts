export interface QuizQuestion {
  id: string;
  type: 'radio' | 'checkbox' | 'input' | 'select';
  title: string;
  subtitle?: string;
  required: boolean;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

export const quizConfig = {
  title: "Home Security Assessment",
  subtitle: "Help us find the perfect security solution for your home",
  questions: [
    {
      id: 'propertyType',
      type: 'radio' as const,
      title: 'What type of property do you live in?',
      subtitle: 'This helps us recommend the right installation options',
      required: true,
      options: [
        { value: 'house', label: 'Single-family house', description: 'Own or rent a standalone home' },
        { value: 'apartment', label: 'Apartment', description: 'Live in an apartment complex' },
        { value: 'condo', label: 'Condominium', description: 'Own or rent a condo unit' },
        { value: 'townhouse', label: 'Townhouse', description: 'Multi-level attached home' }
      ]
    },
    {
      id: 'homeOwnership',
      type: 'radio' as const,
      title: 'Do you own or rent your home?',
      subtitle: 'This affects installation options and permissions needed',
      required: true,
      options: [
        { value: 'own', label: 'I own my home', description: 'Full installation flexibility' },
        { value: 'rent', label: 'I rent my home', description: 'May need landlord approval' }
      ]
    },
    {
      id: 'currentSecurity',
      type: 'radio' as const,
      title: 'Do you currently have a security system?',
      required: true,
      options: [
        { value: 'none', label: 'No security system' },
        { value: 'basic', label: 'Basic alarm system' },
        { value: 'monitored', label: 'Professionally monitored system' },
        { value: 'diy', label: 'DIY smart security (Ring, SimpliSafe, etc.)' }
      ]
    },
    {
      id: 'securityConcerns',
      type: 'checkbox' as const,
      title: 'What are your main security concerns?',
      subtitle: 'Select all that apply',
      required: true,
      options: [
        { value: 'burglary', label: 'Break-ins and burglary' },
        { value: 'packages', label: 'Package theft' },
        { value: 'vandalism', label: 'Property damage/vandalism' },
        { value: 'monitoring', label: 'Monitoring when away' },
        { value: 'family', label: 'Family safety' },
        { value: 'fire', label: 'Fire detection' },
        { value: 'medical', label: 'Medical emergencies' }
      ]
    },
    {
      id: 'budget',
      type: 'radio' as const,
      title: 'What\'s your preferred monthly budget?',
      subtitle: 'Including monitoring fees if applicable',
      required: true,
      options: [
        { value: 'under25', label: 'Under $25/month' },
        { value: '25-50', label: '$25 - $50/month' },
        { value: '50-75', label: '$50 - $75/month' },
        { value: '75-100', label: '$75 - $100/month' },
        { value: 'over100', label: 'Over $100/month' }
      ]
    },
    {
      id: 'installPreference',
      type: 'radio' as const,
      title: 'How would you prefer to install your system?',
      required: true,
      options: [
        { value: 'professional', label: 'Professional installation', description: 'Technician handles everything' },
        { value: 'diy', label: 'DIY installation', description: 'I\'ll set it up myself' },
        { value: 'either', label: 'Either option works', description: 'Flexible on installation method' }
      ]
    },
    {
      id: 'timeline',
      type: 'radio' as const,
      title: 'When would you like to have your system installed?',
      required: true,
      options: [
        { value: 'asap', label: 'As soon as possible' },
        { value: 'week', label: 'Within a week' },
        { value: 'month', label: 'Within a month' },
        { value: 'research', label: 'Just researching for now' }
      ]
    },
    {
      id: 'zipCode',
      type: 'input' as const,
      title: 'What\'s your ZIP code?',
      subtitle: 'We\'ll find providers in your area',
      required: true,
      validation: {
        pattern: '^[0-9]{5}$',
        minLength: 5,
        maxLength: 5
      }
    },
    {
      id: 'contactInfo',
      type: 'input' as const,
      title: 'Contact Information',
      subtitle: 'How can providers reach you with quotes?',
      required: true
    }
  ],
  completion: {
    title: 'Assessment Complete!',
    subtitle: 'We\'re finding the best security providers for your needs',
    message: 'Based on your responses, we\'ll connect you with up to 3 pre-vetted security providers who can offer personalized quotes and recommendations.',
    nextSteps: [
      'Review your personalized recommendations',
      'Compare quotes from multiple providers',
      'Schedule consultations with your preferred options',
      'Get your security system installed'
    ]
  }
};