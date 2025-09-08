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
    fieldName?: string;
    provideReferrer?: boolean;
    invertFieldSensitivity?: boolean;
    accountId?: string;
    pingUrl?: string;
    certificateUrl?: string;
  };
}

export const complianceConfig: ComplianceConfig = {
  jornaya: {
    enabled: true,
    campaignId: '', // Empty for framework - will be filled by client
    accountId: '',  // Empty for framework - will be filled by client
    fieldName: 'universal_leadid' // Database field name for LeadiD
  },
  trustedForm: {
    enabled: true,
    fieldName: 'xxTrustedFormCertUrl', // Standard field name
    invertFieldSensitivity: false // Standard sensitivity handling
  }
};