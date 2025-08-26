import React, { useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { QuizOverlay } from '../core/components/QuizOverlay';
import { Footer } from '../core/components/Footer';

export const TermsOfService: React.FC = () => {
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
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing or using YourHomeSecured's website and services, you agree to be bound by these 
                Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not 
                use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                YourHomeSecured provides a free home security assessment service that:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Evaluates your home security needs through an online questionnaire</li>
                <li>Provides personalized security recommendations</li>
                <li>Connects you with qualified security providers in your area</li>
                <li>Offers educational content about home security</li>
              </ul>
              <p className="text-gray-600 mb-4">
                We are a referral service and do not directly provide security equipment or monitoring services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility</h2>
              <p className="text-gray-600 mb-4">
                Our services are available to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Individuals 18 years of age or older</li>
                <li>Residents of the United States</li>
                <li>Homeowners and renters seeking security solutions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-600 mb-4">You agree to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Provide accurate and truthful information</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not attempt to circumvent our security measures</li>
                <li>Not interfere with other users' access to our services</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Providers</h2>
              <p className="text-gray-600 mb-4">
                We connect you with independent security providers. Please note:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>We do not control the actions or services of third-party providers</li>
                <li>Contracts and agreements are directly between you and the provider</li>
                <li>We are not responsible for provider performance or service quality</li>
                <li>Pricing, terms, and availability are determined by individual providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. No Warranties</h2>
              <p className="text-gray-600 mb-4">
                Our services are provided "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Uninterrupted or error-free service</li>
                <li>Accuracy of recommendations or provider information</li>
                <li>Availability of specific providers or services</li>
                <li>Results from using recommended security solutions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law, YourHomeSecured shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Actions or omissions of third-party providers</li>
                <li>Security breaches or system failures</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Our total liability shall not exceed $100 or the amount you paid for our services, whichever is greater.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to indemnify and hold harmless YourHomeSecured from any claims, damages, or expenses 
                arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content, trademarks, and intellectual property on our website are owned by YourHomeSecured 
                or our licensors. You may not use, copy, or distribute our content without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your access to our services at any time for violation of these 
                terms or for any other reason. You may stop using our services at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms are governed by the laws of the State of South Carolina, without regard to 
                conflict of law principles. Any disputes shall be resolved in the courts of South Carolina.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We may update these terms periodically. Continued use of our services after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these terms, contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>YourHomeSecured</strong><br />
                  Email: <a href="mailto:legal@yourhomesecured.com" className="text-blue-600 hover:underline">legal@yourhomesecured.com</a><br />
                  Phone: 1-800-HOME-SEC<br />
                  Address: 123 Security Lane, Safe City, SC 12345
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <QuizOverlay isOpen={isQuizOpen} onClose={handleQuizClose} />
      <Footer />
    </div>
  );
};