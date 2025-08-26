import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { QuizOverlay } from '../core/components/QuizOverlay';
import { Footer } from '../core/components/Footer';

export const PrivacyPolicy: React.FC = () => {
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
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Effective Date:</strong> January 1, 2025<br />
              <strong>Last Updated:</strong> January 1, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-600 mb-4">
                When you use our home security assessment service, we collect the following personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Name (first and last)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>ZIP code and general location information</li>
                <li>Home ownership status</li>
                <li>Security preferences and requirements</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral source and UTM parameters</li>
                <li>Session data and user interactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Provide personalized home security recommendations</li>
                <li>Connect you with qualified security providers in your area</li>
                <li>Communicate about your security assessment and options</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Send relevant security tips and educational content (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">With Your Consent</h3>
              <p className="text-gray-600 mb-4">
                We only share your personal information with security providers and partners when you explicitly 
                request to be connected with them. You control when and how this sharing occurs.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Providers</h3>
              <p className="text-gray-600 mb-4">
                We may share information with trusted service providers who help us operate our platform, 
                including hosting, analytics, and communication services. These providers are bound by 
                confidentiality agreements.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Legal Requirements</h3>
              <p className="text-gray-600 mb-4">
                We may disclose information when required by law, court order, or to protect our rights 
                and the safety of our users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure data storage with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights and Choices</h2>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent for information sharing</li>
              </ul>
              <p className="text-gray-600 mb-4">
                To exercise these rights, contact us at <a href="mailto:privacy@yourhomesecured.com" className="text-blue-600 hover:underline">privacy@yourhomesecured.com</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to improve your experience, analyze usage, 
                and provide personalized content. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-600 mb-4">
                Our site may contain links to third-party websites. We are not responsible for the 
                privacy practices of these external sites. Please review their privacy policies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our services are not intended for children under 18. We do not knowingly collect 
                personal information from minors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this privacy policy periodically. We will notify you of significant 
                changes by email or through our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about this privacy policy or our data practices, contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>YourHomeSecured</strong><br />
                  Email: <a href="mailto:privacy@yourhomesecured.com" className="text-blue-600 hover:underline">privacy@yourhomesecured.com</a><br />
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