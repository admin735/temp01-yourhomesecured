export interface QuizStep {
  id: string;
  type: 'input' | 'button-group' | 'select' | 'radio';
  question: string;
  placeholder?: string;
  helper?: string;
  options?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  validation?: {
    pattern?: RegExp;
    message?: string;
    apiEndpoint?: string | null;
    mockDelay?: number;
  };
  required?: boolean;
  sidebar?: {
    title: string;
    content: string;
  };
}

export interface ValidationState {
  loading: boolean;
  valid: boolean | null;
  error: string | null;
  data?: any;
}

export interface QuizData {
  answers: Record<string, any>;
  lead: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  utm: Record<string, string>;
  session: {
    landing_page: string;
    referrer: string;
    timestamp: string;
    session_id: string;
  };
  enrichment?: Record<string, any>;
}