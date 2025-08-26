import React, { useState } from 'react';
import { ArrowLeft, Phone } from 'lucide-react';
import { QuizOverlay } from '../core/components/QuizOverlay';

export const TCPADisclaimer: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleQuizStart = () => {
    setIsQuizOpen(true);
  };

  const handleQuizClose = () => {
    setIsQuizOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </a>
            </div>
            <button
              onClick={handleQuizStart}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <Phone className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">TCPA Disclaimer</h1>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Telephone Consumer Protection Act (TCPA) Compliance</h2>
              <p className="text-gray-600 mb-4">
                YourHomeSecured is committed to complying with the Telephone Consumer Protection Act (TCPA) 
                and respecting your communication preferences. This disclaimer explains how we handle 
                telephone, text, and email communications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Consent to Contact</h2>
              <p className="text-gray-600 mb-4">
                By providing your phone number and email address through our home security assessment form, 
                you expressly consent to receive communications from:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>YourHomeSecured and our authorized representatives</li>
                <li>Security providers and partners in our network</li>
                <li>Third-party service providers acting on our behalf</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Communications</h2>
              <p className="text-gray-600 mb-4">
                Your consent covers the following types of communications:
              </p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Phone Calls</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Live agent calls to discuss your security needs</li>
                <li>Automated or pre-recorded calls with security information</li>
                <li>Follow-up calls regarding your assessment results</li>
                <li>Appointment scheduling and confirmation calls</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Text Messages (SMS)</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Appointment reminders and confirmations</li>
                <li>Security tips and educational content</li>
                <li>Service updates and notifications</li>
                <li>Promotional offers from security providers</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Email Communications</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Your personalized security assessment results</li>
                <li>Provider information and quotes</li>
                <li>Educational content and security tips</li>
                <li>Service updates and account information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Consent Details</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Key Points About Your Consent:</h3>
                <ul className="list-disc pl-6 text-yellow-700">
                  <li><strong>Consent is not required to purchase:</strong> You can buy security services without agreeing to receive communications</li>
                  <li><strong>Automated communications:</strong> You may receive autodialed and/or pre-recorded calls and texts</li>
                  <li><strong>Message and data rates apply:</strong> Standard messaging rates from your carrier may apply</li>
                  <li><strong>Consent is voluntary:</strong> You can withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequency of Communications</h2>
              <p className="text-gray-600 mb-4">
                Communication frequency varies based on your preferences and needs:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li><strong>Initial Contact:</strong> Within 24-48 hours of form submission</li>
                <li><strong>Follow-up:</strong> 2-3 contacts over 30 days unless you opt out</li>
                <li><strong>Ongoing:</strong> Monthly educational content (optional)</li>
                <li><strong>Promotional:</strong> Special offers as available (optional)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Opt Out</h2>
              <p className="text-gray-600 mb-4">
                You can withdraw your consent and stop receiving communications at any time:
              </p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Text Messages</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Reply "STOP" to any text message</li>
                <li>Reply "HELP" for assistance</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Phone Calls</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Ask to be placed on our Do Not Call list during any call</li>
                <li>Call our opt-out line: 1-800-HOME-SEC</li>
                <li>Email: <a href="mailto:optout@yourhomesecured.com" className="text-blue-600 hover:underline">optout@yourhomesecured.com</a></li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Email Communications</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Click "Unsubscribe" in any email</li>
                <li>Email us directly at <a href="mailto:unsubscribe@yourhomesecured.com" className="text-blue-600 hover:underline">unsubscribe@yourhomesecured.com</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Communications</h2>
              <p className="text-gray-600 mb-4">
                When you request to be connected with security providers, your consent extends to those 
                providers. Each provider has their own communication policies and opt-out procedures. 
                You will need to opt out separately with each provider if desired.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Wireless Carrier Charges</h2>
              <p className="text-gray-600 mb-4">
                Message and data rates may apply for text messages. These charges are determined by 
                your wireless carrier and are not controlled by YourHomeSecured. Contact your carrier 
                for rate information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Supported Carriers</h2>
              <p className="text-gray-600 mb-4">
                Our text messaging service is supported by major U.S. carriers including AT&T, Verizon, 
                T-Mobile, Sprint, and most regional carriers. If you experience issues, contact us for assistance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions or Complaints</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about our communication practices or wish to file a complaint:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>YourHomeSecured TCPA Compliance</strong><br />
                  Email: <a href="mailto:tcpa@yourhomesecured.com" className="text-blue-600 hover:underline">tcpa@yourhomesecured.com</a><br />
                  Phone: 1-800-HOME-SEC<br />
                  Mail: 123 Security Lane, Safe City, SC 12345<br />
                  <br />
                  <strong>FCC Complaints:</strong> You may also file complaints with the FCC at{' '}
                  <a 
                    href="https://consumercomplaints.fcc.gov" 
                    className="text-blue-600 hover:underline"
                  >
                    consumercomplaints.fcc.gov
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                We may update this TCPA disclaimer periodically to reflect changes in our practices or 
                legal requirements. The effective date at the top of this page indicates when the 
                disclaimer was last updated.
              </p>
            </section>
          </div>
        </div>
      </main>

      <QuizOverlay isOpen={isQuizOpen} onClose={handleQuizClose} />
    </div>
  );
};