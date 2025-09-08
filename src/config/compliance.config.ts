/**
 * Compliance Configuration
 * Controls third-party compliance services (Jornaya, TrustedForm, etc.)
 * Set enabled to false to completely disable compliance features for a client
 */

export interface ComplianceConfig {
  jornaya: {
    enabled: boolean;
    campaignId: string;
    accountId: string;
    scriptUrl?: string; // Optional custom script URL
    fieldName?: string; // Optional custom field name (default: universal_leadid)
  };
  trustedForm: {
    enabled: boolean;
    accountId?: string;
    pingUrl?: string;
    certificateUrl?: string;
  };
}

export const complianceConfig: ComplianceConfig = {
  jornaya: {
    enabled: true, // TOGGLE THIS TO true TO ENABLE JORNAYA
    campaignId: '01e968fa-b76f-896b-a9b7-5c3e7c989959', // Replace with client's campaign ID
    accountId: '56941368-A54E-6F88-D644-183D3C1808A1', // Replace with client's account ID
    fieldName: 'universal_leadid' // Database field name for LeadiD
  },
    trustedForm: {
    enabled: true,  // Turn this ON
    fieldName: 'xxTrustedFormCertUrl', // Standard field name
    provideReferrer: true, // Include referrer information
    invertFieldSensitivity: false // Standard sensitivity handling
  }
};