export interface QuizStep {
  id: number;
  title: string;
  helper?: string;
  type: 'radio' | 'input' | 'contact';
}

export interface QuizData {
  homeStatus: string;
  installPreference: string;
  zipCode: string;
  urgency: string;
  existingSystem: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}