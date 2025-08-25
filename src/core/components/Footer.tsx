import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-white transition-colors">TCPA Disclaimer</a>
          <span className="text-gray-600">|</span>
          <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
        </div>
        
        {/* Compliance Text */}
        <div className="text-center text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto">
          <p className="mb-4">
            By submitting your information, you agree to be contacted by YourHomeSecured 
            and/or our security partners regarding home protection solutions via phone, 
            text, or email. Consent is not a condition of purchase. Message and data rates may apply.
          </p>
          
          <p>
            © 2025 YourHomeSecured. All rights reserved. 
            We are not affiliated with any specific security company or manufacturer.
          </p>
        </div>
      </div>
    </footer>
  );
};