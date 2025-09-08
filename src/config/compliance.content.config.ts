import { siteConfig } from './site.config';

export const complianceContent = {
  // Privacy Policy Content - Based on Andiamo Template
  privacy: {
    hero: {
      title: "Privacy Policy",
      subtitle: `Your privacy is important to ${siteConfig.client.legalName}`,
      lastUpdated: siteConfig.compliance.legal.lastUpdated
    },
    sections: [
      {
        title: `We Are ${siteConfig.client.legalName}`,
        type: "intro",
        content: [
          `${siteConfig.client.legalName} ("Company," "We," "Us," or "Our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.`
        ]
      },
      {
        title: "Information We Collect",
        type: "list",
        intro: "We collect information you provide directly to us, such as when you create an account, fill out a form, or contact us. We may collect the following types of information:",
        content: [
          "Personal Information: Name, email address, phone number, company information, mailing address, and other contact details you choose to provide",
          "Payment Information: Billing details necessary to process transactions for our services",
          "Usage Data: Information about your device and how you interact with our services, including your IP address, browser type, operating system, referring URLs, and pages viewed",
          "SMS Communication Data: Phone numbers and consent records for SMS messaging"
        ]
      },
      {
        title: "SMS Communications",
        type: "paragraph",
        content: [
          "Information collected for SMS consent will not be shared with third parties or affiliates for marketing purposes. Please review our Terms of Service page for complete details about our SMS practices and your rights regarding text message communications."
        ]
      },
      {
        title: "Opt-in Language",
        type: "paragraph",
        subsection: "SMS Communications",
        content: [
          `Information collected for SMS consent will not be shared with third parties or affiliates for marketing purposes. When you provide your phone number and opt-in to receive SMS messages, you explicitly consent to receive service-related and informational text messages from ${siteConfig.client.name}.`
        ]
      },
      {
        title: "How We Use Your Information",
        type: "list",
        intro: "We use the information we collect to:",
        content: [
          "Provide, maintain, operate, and improve our services",
          "Process transactions and send related information and relevant notifications",
          "Send you technical notices, updates, security alerts, and support messages",
          "Communicate with you via SMS, email, or other channels about products, services, and events",
          "Respond to your comments, questions, inquiries, and provide customer service",
          "Monitor and analyze trends, usage, and activities in connection with our services",
          "Ensure compliance with legal and regulatory requirements"
        ]
      },
      {
        title: "Sharing and Disclosure of Information",
        type: "list",
        intro: "We do not sell, rent, or trade your personal information to third parties without your consent, except as described in this policy. However, we may share your information with:",
        content: [
          "Service Providers: Vendors, consultants, and third-party companies that assist with payment processing, SMS delivery, operational support, and other services who need access to such information to carry out work on our behalf",
          "Legal Compliance: In response to a request for information if we believe disclosure is in accordance with applicable law, regulation, or legal process to protect our rights and operations",
          "Business Transfers: In the event of a merger, acquisition, reorganization, or sale of assets",
          "Safety and Rights Protection: To protect the rights, property, and safety of " + siteConfig.client.name + ", our users, or others"
        ]
      },
      {
        title: "Data Security",
        type: "paragraph",
        content: [
          "We implement appropriate technical and organizational measures and industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure. You acknowledge that you provide information at your own risk."
        ]
      },
      {
        title: "Cookies and Tracking Technologies",
        type: "paragraph",
        content: [
          "We use cookies and similar tracking technologies to collect and track information about your use of our services. You can control cookies through your browser settings, but disabling cookies may affect the functionality of our services."
        ]
      },
      {
        title: "Data Retention",
        type: "paragraph",
        content: [
          "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your personal information, we will securely delete or anonymize it."
        ]
      },
      {
        title: "Your Rights and Choices",
        type: "list",
        intro: "You have certain rights regarding your personal information, including:",
        content: [
          "The right to access, update, or delete your personal information",
          "The right to opt out of marketing communications, including SMS messages",
          "The right to request that we restrict the processing of your personal information",
          "The right to request a copy of the data we store about you"
        ],
        outro: `To exercise these rights, please contact us at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}.`
      },
      {
        title: "Children's Privacy",
        type: "paragraph",
        content: [
          "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information."
        ]
      },
      {
        title: "International Data Transfers",
        type: "paragraph",
        content: [
          "Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards."
        ]
      },
      {
        title: "Third-Party Services",
        type: "paragraph",
        content: [
          "Our website does not condone or endorse third-party links. Any external links that may appear are not under our control, and we are not responsible for their content, policies, or practices.",
          "",
          "SMS consent is not shared with third parties for marketing purposes"
        ]
      },
      {
        title: "Changes to This Privacy Policy",
        type: "paragraph",
        content: [
          "We reserve the right to update this Privacy Policy from time to time. Changes will be effective upon posting to our website and updating the \"Last Updated\" date. We will notify you of any changes by posting the new Privacy Policy on this page. Your continued use of our services after any changes constitutes acceptance of the updated policy."
        ]
      },
      {
        title: "Contact Information",
        type: "contact",
        content: [
          `Company: ${siteConfig.client.legalName}`,
          `Email: ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}`,
          `Contact Us`
        ],
        outro: "We will respond to your inquiry within a reasonable timeframe.\n\nBy using our services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.\n\nSMS consent is not shared with third parties for marketing purposes"
      }
    ]
  },
  
  // Terms of Service Content - Based on Andiamo Template
  terms: {
    hero: {
      title: "Terms of Service",
      subtitle: `Terms and conditions for using ${siteConfig.client.name} services`,
      lastUpdated: siteConfig.compliance.legal.lastUpdated
    },
    sections: [
      {
        title: "Introduction",
        type: "paragraph",
        content: [
          `Welcome to ${siteConfig.client.name}. By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.`
        ]
      },
      {
        title: "Definitions",
        type: "list",
        content: [
          `"Company," "We," "Us," or "Our" refers to ${siteConfig.client.legalName}`,
          `"User," "You," or "Your" refers to the individual or entity accessing our services`,
          `"Services" refer to our home security solutions and related services`
        ]
      },
      {
        title: "Acceptance of Terms",
        type: "paragraph",
        content: [
          `By accessing and using the services provided by ${siteConfig.client.name}, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
        ]
      },
      {
        title: "Description of Service",
        type: "paragraph",
        content: [
          `${siteConfig.client.name} provides comprehensive home security solutions and monitoring services. Our services include security system installation, 24/7 monitoring, smart home integration, and emergency response coordination.`
        ]
      },
      {
        title: "Use of Services",
        type: "paragraph",
        content: [
          "You must be at least 18 years old to use our services. You agree to provide accurate and complete information when using our services. Unauthorized use of our website or services is strictly prohibited."
        ]
      },
      {
        title: "User Obligations",
        type: "list",
        intro: "You agree to:",
        content: [
          "Provide accurate, current, and complete information during registration",
          "Maintain the security of your account credentials",
          "Use our services only for lawful purposes and in accordance with these terms",
          "Not interfere with or disrupt the integrity or performance of our services",
          "Not attempt to gain unauthorized access to our systems or networks"
        ]
      },
      {
        title: "Privacy Policy",
        type: "paragraph",
        content: [
          "Your use of our website and services is also governed by our Privacy Policy, which details how we collect, use, and protect your information."
        ]
      },
      {
        title: "Terms of Service for SMS Communications",
        type: "paragraph",
        content: [
          `Information obtained as part of the SMS consent process will not be shared with third parties or affiliates for marketing purposes. If you consent to receive marketing, customer care, and account notification SMS messages from ${siteConfig.client.name}, you will receive marketing, customer care, and account notification SMS messages from us. Reply ${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'} to opt out; Reply ${siteConfig.compliance.messaging?.replyKeywords?.help || 'HELP'} for support; Message & data rates may apply; Messaging frequency may vary. Visit our Privacy Policy for more information.`,
          "",
          "Sample message examples:",
          `• "Hello, this is ${siteConfig.client.name}. Your home security check is due. Visit ${siteConfig.client.domain} or call ${siteConfig.compliance.contact?.phone || 'us'}. Reply ${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'} to opt out of SMS messaging at any time."`,
          `• "Welcome to ${siteConfig.client.name}. Monitor your security system status at ${siteConfig.client.domain}. Questions? Contact support. Reply ${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'} to opt out of SMS messaging at any time."`,
          `• "Hello, this is ${siteConfig.client.name}. Your security service is confirmed and active. Questions? Contact us at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}. Reply ${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'} to opt out of SMS messaging at any time."`,
          "",
          `You may receive up to 50 SMS messages per week related to marketing, customer care, and account notifications. Message and data rates may apply. Please be aware that many carriers charge a fee for each message sent or received. This can vary depending on the carrier's pricing structure and whether the message is sent domestically or internationally. Message frequency may vary depending on the type of communication. You can opt out at any time by texting "${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'}". You will not receive any further messages. Reply "START" to start receiving messages again. For assistance, text "${siteConfig.compliance.messaging?.replyKeywords?.help || 'HELP'}" or contact us for assistance.`
        ]
      },
      {
        title: "Service Availability",
        type: "paragraph",
        content: [
          "We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. Our services may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time."
        ]
      },
      {
        title: "Payment Terms",
        type: "paragraph",
        content: [
          "Payment terms vary depending on the service plan selected. All payments are due according to the terms specified in your service agreement. Late payments may result in service suspension. Failure to pay may result in service suspension or termination. All payments are non-refundable unless otherwise specified."
        ]
      },
      {
        title: "Intellectual Property",
        type: "paragraph",
        content: [
          `All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, and design, are owned by ${siteConfig.client.name} and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission. You may not reproduce, distribute, or exploit our content for commercial purposes without authorization.`
        ]
      },
      {
        title: "Third-Party Links",
        type: "paragraph",
        content: [
          "Our website does not condone or endorse third-party links. Any external links that may appear are not under our control, and we are not responsible for their content, policies, or practices.",
          "",
          "SMS consent is not shared with third parties for marketing purposes"
        ]
      },
      {
        title: "Confidentiality",
        type: "paragraph",
        content: [
          "Both parties agree to maintain the confidentiality of any proprietary or confidential information shared during the course of our business relationship. This includes but is not limited to business strategies, customer data, pricing information, and technical specifications."
        ]
      },
      {
        title: "Limitation of Liability",
        type: "paragraph",
        content: [
          `To the maximum extent permitted by law, ${siteConfig.client.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our services. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services, including but not limited to lost profits, delays, or service disruptions.`,
          "",
          "Our total liability for any claims arising from or related to our services shall not exceed the amount paid by you for the services in the twelve months preceding the claim."
        ]
      },
      {
        title: "Indemnification",
        type: "paragraph",
        content: [
          `You agree to indemnify, defend, and hold harmless ${siteConfig.client.name}, its officers, directors, employees, and agents from and against any claims, damages, losses, costs, and expenses arising from your use of our services or violation of these terms.`
        ]
      },
      {
        title: "Service Modifications and Termination",
        type: "list",
        intro: "We reserve the right to modify or discontinue any part of our services at any time without notice. We may terminate or suspend your access if you violate these Terms of Service. Either party may terminate this agreement at any time with written notice. Upon termination:",
        content: [
          "Your access to our services will be discontinued",
          "All outstanding payments become immediately due",
          "Confidentiality obligations will survive termination",
          "We may retain your data as required by law or for legitimate business purposes"
        ]
      },
      {
        title: "Governing Law",
        type: "paragraph",
        content: [
          `These Terms of Service are governed by and construed in accordance with the laws of ${siteConfig.compliance.legal?.jurisdiction || 'the United States'}, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of ${siteConfig.compliance.legal?.arbitrationLocation || 'the United States'}.`
        ]
      },
      {
        title: "Dispute Resolution",
        type: "paragraph",
        content: [
          "Before pursuing formal legal action, both parties agree to attempt to resolve disputes through good faith negotiation. If negotiation fails, disputes may be resolved through binding arbitration in accordance with the rules of the American Arbitration Association."
        ]
      },
      {
        title: "Force Majeure",
        type: "paragraph",
        content: [
          "Neither party shall be liable for any failure or delay in performance due to circumstances beyond their reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, government actions, or technical failures."
        ]
      },
      {
        title: "Severability",
        type: "paragraph",
        content: [
          "If any provision of these terms is found to be unenforceable or invalid, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law."
        ]
      },
      {
        title: "Entire Agreement",
        type: "paragraph",
        content: [
          `These terms constitute the entire agreement between you and ${siteConfig.client.name} regarding the use of our services and supersede all prior agreements and understandings, whether written or oral.`
        ]
      },
      {
        title: "Changes to These Terms",
        type: "paragraph",
        content: [
          "We reserve the right to update these Terms of Service at any time. Changes will be effective upon posting to our website. Your continued use of our services constitutes acceptance of the revised terms."
        ]
      },
      {
        title: "Contact Information",
        type: "contact",
        content: [
          `Company: ${siteConfig.client.legalName}`,
          `Email: ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}`,
          `Contact Us`
        ],
        outro: "We will respond to your inquiry within a reasonable timeframe.\n\nBy using our services, you acknowledge that you have read, understood, and agreed to these Terms of Service."
      }
    ]
  },
  
  // TCPA Disclaimer Content
  tcpa: {
    hero: {
      title: "TCPA Disclaimer",
      subtitle: `SMS and communication consent information for ${siteConfig.client.name}`,
      lastUpdated: siteConfig.compliance.legal.lastUpdated
    },
    sections: [
      {
        title: "SMS Consent and TCPA Compliance",
        type: "intro",
        content: [
          `By providing your phone number and opting in to receive SMS messages from ${siteConfig.client.name}, you explicitly consent to receive automated text messages, including marketing, promotional, and service-related communications. This consent is not required as a condition of purchase.`
        ]
      },
      {
        title: "Types of Communications You Will Receive",
        type: "list",
        intro: "When you opt in to SMS communications, you may receive the following types of messages:",
        content: [
          "Marketing and promotional messages about our home security services",
          "Service notifications and account updates",
          "Appointment reminders and scheduling confirmations",
          "Security system alerts and monitoring notifications",
          "Customer care and support messages",
          "Survey requests and feedback opportunities"
        ]
      },
      {
        title: "Automated Communications",
        type: "paragraph",
        content: [
          `The messages you receive from ${siteConfig.client.name} may be sent using automated technology, including auto-dialers and pre-recorded messages. By consenting to receive SMS messages, you acknowledge and agree to receive communications sent through automated means.`
        ]
      },
      {
        title: "Message Frequency",
        type: "paragraph",
        content: [
          `Message frequency varies depending on your service plan and communication preferences. You may receive up to 50 messages per week. During peak periods or service events, message frequency may increase temporarily.`
        ]
      },
      {
        title: "Carrier Charges and Data Rates",
        type: "paragraph",
        content: [
          "Standard message and data rates may apply to all SMS communications. These charges are determined by your mobile carrier and are not controlled by " + siteConfig.client.name + ". Please contact your carrier for information about your messaging plan and any applicable charges.",
          "",
          "Message and data rates may vary depending on your carrier's pricing structure and whether messages are sent domestically or internationally."
        ]
      },
      {
        title: "How to Opt Out (STOP)",
        type: "list",
        intro: `You can opt out of receiving SMS messages from ${siteConfig.client.name} at any time using any of the following methods:`,
        content: [
          `Reply "${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'}" to any message you receive from us`,
          `Text "${siteConfig.compliance.messaging?.replyKeywords?.stop || 'STOP'}" to our SMS number`,
          `Contact our customer service team at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}`,
          `Call our support line during business hours`
        ],
        outro: `Once you opt out, you will receive a confirmation message and will not receive any further SMS communications from us. You can opt back in at any time by texting "START" or "YES" to our SMS number.`
      },
      {
        title: "Help and Support (HELP)",
        type: "paragraph",
        content: [
          `If you need assistance with SMS communications or have questions about our messaging program, reply "${siteConfig.compliance.messaging?.replyKeywords?.help || 'HELP'}" to any message or contact our customer support team directly.`,
          "",
          `For additional support, you can reach us at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'} or visit our website at ${siteConfig.client.domain}.`
        ]
      },
      {
        title: "Privacy and Third-Party Sharing",
        type: "paragraph",
        content: [
          `Your phone number and SMS consent information will not be shared with third parties or affiliates for their marketing purposes. We respect your privacy and handle your information in accordance with our Privacy Policy.`,
          "",
          "Your consent to receive SMS messages is separate from any other consents you may provide for email marketing or other communications."
        ]
      },
      {
        title: "Consent Confirmation and Record Keeping",
        type: "paragraph",
        content: [
          `When you provide consent to receive SMS messages, we will maintain records of your consent including the date, time, and method of consent. This information is kept for compliance purposes and to honor your communication preferences.`
        ]
      },
      {
        title: "Sample Messages",
        type: "list",
        intro: "Examples of messages you may receive include:",
        content: [
          `"Hello, this is ${siteConfig.client.name}. Your home security check is scheduled for tomorrow at 2 PM. Reply STOP to opt out."`,
          `"Welcome to ${siteConfig.client.name}! Your security system is now active. Monitor your home at ${siteConfig.client.domain}. Reply STOP to opt out."`,
          `"Security Alert: Motion detected at your front door. Check your app for details. Reply STOP to opt out."`,
          `"Reminder: Your monthly security service payment is due in 3 days. Reply STOP to opt out."`
        ]
      },
      {
        title: "Service Availability and Technical Issues",
        type: "paragraph",
        content: [
          "SMS delivery is subject to carrier network availability and may be delayed or fail due to technical issues beyond our control. We are not responsible for failed or delayed message delivery due to carrier issues, network congestion, or device compatibility problems.",
          "",
          `If you experience technical issues with SMS delivery, please contact our support team at ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}.`
        ]
      },
      {
        title: "Legal Compliance and TCPA Rights",
        type: "paragraph",
        content: [
          `${siteConfig.client.name} complies with the Telephone Consumer Protection Act (TCPA) and other applicable laws governing automated communications. You have the right to revoke your consent at any time without penalty.`,
          "",
          "If you believe you have received messages in violation of the TCPA or without proper consent, please contact us immediately so we can investigate and resolve the issue."
        ]
      },
      {
        title: "Updates to This Disclaimer",
        type: "paragraph",
        content: [
          "We may update this TCPA Disclaimer from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on our website with a revised \"Last Updated\" date.",
          "",
          "Your continued participation in our SMS program after any updates constitutes acceptance of the revised terms."
        ]
      },
      {
        title: "Contact Information",
        type: "contact",
        content: [
          `Company: ${siteConfig.client.legalName}`,
          `Email: ${siteConfig.compliance.contact?.email || 'admin@yourhomesecured.com'}`,
          `Website: ${siteConfig.client.domain}`,
          `Contact Us for SMS Support`
        ],
        outro: `For questions about SMS communications, TCPA compliance, or to update your communication preferences, please contact us. We will respond to your inquiry within a reasonable timeframe.\n\nBy providing your phone number and consenting to SMS communications, you acknowledge that you have read, understood, and agreed to this TCPA Disclaimer.`
      }
    ]
  }
};