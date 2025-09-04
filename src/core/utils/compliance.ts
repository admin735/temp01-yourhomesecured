// This will handle all compliance-related functionality
// - Dynamic script loading
// - LeadiD capture
// - Certificate management
// - Compliance data injection into forms

import { complianceConfig } from '../../config/compliance.config';

export interface LeadiDData {
  token: string;
  timestamp: string;
  captured: boolean;
}

export interface ComplianceData {
  jornaya?: {
    leadid_token: string;
    certificate_url?: string;
    timestamp: string;
  };
  trustedForm?: {
    cert_id: string;
    cert_url: string;
    timestamp: string;
  };
}

/**
 * Dynamically loads the Jornaya script if enabled
 */
export const loadJornayaScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!complianceConfig.jornaya.enabled || !complianceConfig.jornaya.campaignId) {
      resolve(false);
      return;
    }

    // Check if script already exists
    if (document.getElementById('LeadiDscript_campaign')) {
      resolve(true);
      return;
    }

    try {
      // Create the main script container
      const mainScript = document.createElement('script');
      mainScript.id = 'LeadiDscript';
      mainScript.type = 'text/javascript';
      mainScript.innerHTML = `
        (function() {
          var s = document.createElement('script');
          s.id = 'LeadiDscript_campaign';
          s.type = 'text/javascript';
          s.async = true;
          s.src = '${complianceConfig.jornaya.scriptUrl.replace('[CAMPAIGN_ID]', complianceConfig.jornaya.campaignId)}';
          var LeadiDscript = document.getElementById('LeadiDscript');
          LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
        })();
      `;

      // Create noscript fallback
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.src = complianceConfig.jornaya.noscriptUrl
        .replace('[ACCOUNT_ID]', complianceConfig.jornaya.accountId)
        .replace('[CAMPAIGN_ID]', complianceConfig.jornaya.campaignId);
      noscript.appendChild(img);

      // Append to body
      document.body.appendChild(mainScript);
      document.body.appendChild(noscript);

      // Give script time to load
      setTimeout(() => resolve(true), 1000);
    } catch (error) {
      console.error('Failed to load Jornaya script:', error);
      resolve(false);
    }
  });
};

/**
 * Captures LeadiD token from the hidden input field
 */
export const captureLeadiD = (maxAttempts: number = 30, interval: number = 500): Promise<LeadiDData | null> => {
  return new Promise((resolve) => {
    let attempts = 0;

    const checkForLeadiD = () => {
      const leadidInput = document.getElementById('leadid_token') as HTMLInputElement;
      
      if (leadidInput && leadidInput.value && leadidInput.value.length > 0) {
        const leadidData: LeadiDData = {
          token: leadidInput.value,
          timestamp: new Date().toISOString(),
          captured: true
        };
        
        console.log('LeadiD captured:', leadidData.token);
        resolve(leadidData);
        return;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(checkForLeadiD, interval);
      } else {
        console.warn('LeadiD not found after maximum attempts');
        resolve(null);
      }
    };

    checkForLeadiD();
  });
};

/**
 * Initializes compliance tracking for the current session
 */
export const initializeCompliance = async (): Promise<void> => {
  if (complianceConfig.jornaya.enabled) {
    await loadJornayaScript();
  }
  
  // Future: Initialize TrustedForm if enabled
  // if (complianceConfig.trustedForm.enabled) {
  //   await loadTrustedFormScript();
  // }
};

/**
 * Gets all compliance data for final submission
 */
export const getComplianceData = (): ComplianceData => {
  const data: ComplianceData = {};

  // Get Jornaya data if available
  if (complianceConfig.jornaya.enabled) {
    const leadidInput = document.getElementById('leadid_token') as HTMLInputElement;
    if (leadidInput && leadidInput.value) {
      data.jornaya = {
        leadid_token: leadidInput.value,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Future: Get TrustedForm data
  // if (complianceConfig.trustedForm.enabled) {
  //   data.trustedForm = getTrustedFormData();
  // }

  return data;
};

/**
 * Injects compliance-related hidden fields into forms
 */
export const injectComplianceFields = (formElement: HTMLElement): void => {
  if (!formElement) return;

  // Inject Jornaya hidden field if enabled
  if (complianceConfig.jornaya.enabled) {
    const existingField = formElement.querySelector('#leadid_token');
    if (!existingField) {
      const hiddenInput = document.createElement('input');
      hiddenInput.id = 'leadid_token';
      hiddenInput.name = 'universal_leadid';
      hiddenInput.type = 'hidden';
      hiddenInput.value = '';
      formElement.appendChild(hiddenInput);
    }
  }

  // Future: Inject TrustedForm fields
  // if (complianceConfig.trustedForm.enabled) {
  //   injectTrustedFormFields(formElement);
  // }
};

/**
 * Updates TCPA checkbox with compliance attributes
 */
export const updateTCPACheckbox = (checkboxElement: HTMLInputElement): void => {
  if (!checkboxElement) return;

  if (complianceConfig.jornaya.enabled) {
    checkboxElement.id = 'leadid_tcpa_disclosure';
  }

  // Future: Add TrustedForm attributes
  // if (complianceConfig.trustedForm.enabled) {
  //   checkboxElement.setAttribute('data-trusted-form', 'true');
  // }
};