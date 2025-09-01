import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

interface OTPModalProps {
  isOpen: boolean;
  phoneNumber: string;
  onVerify: (code: string) => Promise<{ success: boolean; message?: string }>;
  onResend: () => Promise<void>;
  onClose: () => void;
  maxAttempts?: number;
}

export const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  phoneNumber,
  onVerify,
  onResend,
  onClose,
  maxAttempts = 3
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtpCode('');
      setAttempts(0);
      setError('');
      // Focus first input when modal opens
      setTimeout(() => {
        document.getElementById('otp-input-0')?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newCode = otpCode.split('');
    newCode[index] = value;
    setOtpCode(newCode.join(''));
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    if (otpCode.length !== 6) return;
    
    setLoading(true);
    setError('');
    
    try {
      const result = await onVerify(otpCode);
      
      if (!result.success) {
        setAttempts(prev => prev + 1);
        if (attempts >= maxAttempts - 1) {
          setError('Too many failed attempts');
          setTimeout(onClose, 2000);
        } else {
          setError(result.message || `Invalid code. ${maxAttempts - attempts - 1} attempts remaining.`);
          setOtpCode('');
          document.getElementById('otp-input-0')?.focus();
        }
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setOtpCode('');
    setAttempts(0);
    
    try {
      await onResend();
      setTimeout(() => {
        document.getElementById('otp-input-0')?.focus();
      }, 100);
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Phone className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-bold">Phone Verification</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          We've sent a 6-digit code to {phoneNumber}. Please enter it below.
        </p>
        
        <div className="flex gap-2 mb-6 justify-center">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              id={`otp-input-${i}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={otpCode[i] || ''}
              onChange={(e) => handleOtpInput(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-12 border-2 border-gray-300 rounded text-center text-lg font-semibold focus:border-purple-600 focus:outline-none transition-colors"
              disabled={loading}
            />
          ))}
        </div>
        
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
        
        <button
          onClick={handleVerify}
          disabled={otpCode.length !== 6 || loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors mb-3"
        >
          {loading ? 'Processing...' : 'Verify Code'}
        </button>
        
        <div className="flex justify-between text-sm">
          <button 
            onClick={handleResend}
            disabled={loading}
            className="text-purple-600 hover:text-purple-700 disabled:text-gray-400"
          >
            Resend Code
          </button>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};