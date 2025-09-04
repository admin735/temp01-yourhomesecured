import { complianceConfig } from '../../config/compliance.config';
import { ComplianceData } from '../types/quiz.types';

/**
 * Jornaya Script Loader
 * Dynamically injects the Jornaya script into the page
 */
export const loadJornayaScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!complianceConfig.jornaya.enabled) {
      resolve();
      return;
    }

    // Check if script already exists
    if (document.getElementById('LeadiDscript_campaign')) {
      resolve();
      return;
    }

    // Create and inject the script
    const script = document.createElement('script');
    script.id = 'LeadiDscript';
    script.type = 'text/javascript';
    script.innerHTML = `
      (function() {
        var s = document.createElement('script');
        s.id = 'LeadiDscript_campaign';
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//create.lidstatic.com/campaign/${complianceConfig.jornaya.campaignId}.js?snippet_version=2';
        var LeadiDscript = document.getElementById('LeadiDscript');
        LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
      })();
    `;

    document.body.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img src='//create.leadid.com/noscript.gif?lac=${complianceConfig.jornaya.accountId}&lck=${complianceConfig.jornaya.campaignId}&snippet_version=2' />`;
    document.body.appendChild(noscript);

    // Wait for script to load and initialize
    let checkAttempts = 0;
    const checkInterval = setInterval(() => {
      checkAttempts++;
      
      // Check if Jornaya has populated the field
      const leadidField = document.getElementById('leadid_token') as HTMLInputElement;
      if (leadidField && leadidField.value) {
        clearInterval(checkInterval);
        resolve();
      }
      
      // Timeout after 10 seconds
      if (checkAttempts > 100) {
        clearInterval(checkInterval);
        console.warn('Jornaya script loaded but LeadiD not generated within timeout');
        resolve(); // Resolve anyway to not block form submission
      }
    }, 100);
  });
};

/**
 * Capture LeadiD from the hidden field
 */
export const captureLeadiD = (): string | null => {
  if (!complianceConfig.jornaya.enabled) return null;
  
  const leadidField = document.getElementById('leadid_token') as HTMLInputElement;
  return leadidField ? leadidField.value : null;
};

/**
 * Get all compliance data for submission
 */
export const getComplianceData = (): ComplianceData => {
  const data: ComplianceData = {};
  
  if (complianceConfig.jornaya.enabled) {
    const leadId = captureLeadiD();
    if (leadId) {
      data.leadid_token = leadId;
      data.leadid_timestamp = new Date().toISOString();
      data.page_url = window.location.href;
    }
  }
  
  // Future: Add TrustedForm data capture here
  if (complianceConfig.trustedForm.enabled) {
    // TrustedForm implementation
  }
  
  return data;
};

/**
 * Check if compliance services are ready
 */
export const isComplianceReady = (): boolean => {
  if (!complianceConfig.jornaya.enabled && !complianceConfig.trustedForm.enabled) {
    return true; // No compliance needed, so we're "ready"
  }
  
  if (complianceConfig.jornaya.enabled) {
    const leadId = captureLeadiD();
    if (!leadId) return false;
  }
  
  // Future: Check TrustedForm readiness
  
  return true;
};

/**
 * Clean up compliance scripts (for SPA navigation)
 */
export const cleanupComplianceScripts = (): void => {
  // Remove Jornaya scripts if they exist
  const jornayaScript = document.getElementById('LeadiDscript');
  const jornayaCampaignScript = document.getElementById('LeadiDscript_campaign');
  
  if (jornayaScript) jornayaScript.remove();
  if (jornayaCampaignScript) jornayaCampaignScript.remove();
};