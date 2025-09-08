import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left side - Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/yourhomesecured-330x330-website (1).svg" 
                alt="YourHomeSecured Logo" 
                className="w-8 h-8"
              />
              <h3 className="text-2xl font-bold text-white">YourHomeSecured</h3>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md text-sm">
              Your trusted partner for comprehensive home security solutions. 
              We connect homeowners with top-rated security providers to ensure 
              your family's safety and peace of mind.
            </p>
          </div>
          
          {/* Right side - Contact info */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex gap-4 mb-6">
              <a 
                href="mailto:admin@yourhomesecured.com"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Mail className="w-4 h-4" />
                <span>admin@yourhomesecured.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 YourHomeSecured. All rights reserved.
            </p>
            
            <div className="flex gap-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
        {/* Compliance disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            By submitting your information, you agree to be contacted by YourHomeSecured 
            and/or our security partners regarding home protection solutions via phone, 
            text, or email. Consent is not a condition of purchase. Message and data rates may apply.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            This website is not part of the Facebook website or Facebook Inc. Additionally, 
            this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of 
            FACEBOOK, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};