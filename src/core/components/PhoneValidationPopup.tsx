import React from 'react';
import { Shield, Phone, X } from 'lucide-react';

interface PhoneValidationPopupProps {
  isOpen: boolean;
  phoneNumber: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const PhoneValidationPopup: React.FC<PhoneValidationPopupProps> = ({
  isOpen,
  phoneNumber,
  onConfirm,
  onCancel,
  loading = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-bold">Phone Verification Required</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            We've detected that <strong>{phoneNumber}</strong> is a mobile number.
          </p>
          <p className="text-gray-600 text-sm mb-3">
            To ensure the security of your account and prevent fraud, we need to verify 
            this phone number by sending a one-time verification code via SMS.
          </p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <Phone className="inline w-4 h-4 mr-1" />
              Standard SMS rates may apply
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </div>
      </div>
    </div>
  );
};