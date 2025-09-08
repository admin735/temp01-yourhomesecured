import { complianceConfig } from '../../config/compliance.config';
import { ComplianceData } from '../types/quiz.types';

/**
 * Jornaya Script Loader
 * Dynamically injects the Jornaya script into the page
 */
export const loadJornayaScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!complianceConfig.jornaya.enabled) {
      resolve();
      return;
    }

    // Check if script already exists
    if (document.getElementById('LeadiDscript_campaign')) {
      resolve();
      return;
    }

    // Create and inject the script directly (like your manual test)
    const script = document.createElement('script');
    script.id = 'LeadiDscript_campaign';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `//create.lidstatic.com/campaign/${complianceConfig.jornaya.campaignId}.js?snippet_version=2`;
    
    script.onload = () => {
      console.log('Jornaya script loaded successfully');
      resolve();
    };
    
    script.onerror = () => {
      console.error('Failed to load Jornaya script');
      resolve(); // Resolve anyway to not block
    };
    
    document.body.appendChild(script);

    // Also add the noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img src='//create.leadid.com/noscript.gif?lac=${complianceConfig.jornaya.accountId}&lck=${complianceConfig.jornaya.campaignId}&snippet_version=2' />`;
    document.body.appendChild(noscript);
  });
};

/**
 * TrustedForm Script Loader
 * Uses TrustedForm's official implementation with proper URL format
 */
export const loadTrustedFormScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!complianceConfig.trustedForm.enabled) {
      console.log('TrustedForm disabled in config');
      resolve();
      return;
    }

    // Check if script already exists
    if (document.getElementById('trustedform_script')) {
      console.log('TrustedForm script already loaded');
      resolve();
      return;
    }

    console.log('Starting TrustedForm script load...');
    
    // Use TrustedForm's official implementation
    const tf = document.createElement('script');
    tf.id = 'trustedform_script';
    tf.type = 'text/javascript';
    tf.async = true;
    
    // Use their exact URL format with timestamp and random number
    tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
      '://api.trustedform.com/trustedform.js?field=' + 
      (complianceConfig.trustedForm.fieldName || 'xxTrustedFormCertUrl') +
      '&use_tagged_consent=true&l=' +
      new Date().getTime() + Math.random();
    
    tf.onload = () => {
      console.log('TrustedForm script loaded successfully');
      
      // Add the noscript fallback
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.src = 'https://api.trustedform.com/ns.gif';
      noscript.appendChild(img);
      document.body.appendChild(noscript);
      
      resolve();
    };
    
    tf.onerror = () => {
      console.error('Failed to load TrustedForm script');
      resolve();
    };
    
    // Insert as per their instructions
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tf, s);
  });
};

export const loadTrustedFormScriptAlternative = (): Promise<void> => {
  return new Promise((resolve) => {
    // Create the TrustedForm script element directly
    const script = document.createElement('script');
    script.id = 'TrustedFormScript';
    script.type = 'text/javascript';
    script.async = true;
    
    const fieldName = complianceConfig.trustedForm.fieldName || 'xxTrustedFormCertUrl';
    const provideReferrer = complianceConfig.trustedForm.provideReferrer || true;
    const invertFieldSensitivity = complianceConfig.trustedForm.invertFieldSensitivity || false;
    
    script.src = `https://api.trustedform.com/trustedform.js?provide_referrer=${provideReferrer}&field=${encodeURIComponent(fieldName)}&invert_field_sensitivity=${invertFieldSensitivity}`;
    
    script.onload = () => {
      console.log('TrustedForm script loaded from CDN');
      resolve();
    };
    
    script.onerror = () => {
      console.error('Failed to load TrustedForm script');
      resolve();
    };
    
    // Add to head for better form detection
    document.head.appendChild(script);
    
    console.log('TrustedForm script added to page');
  });
};

/**
 * Capture TrustedForm Certificate URL
 */
export const captureTrustedFormCert = (): string | null => {
  if (!complianceConfig.trustedForm.enabled) {
    console.log('TrustedForm disabled, skipping cert capture');
    return null;
  }
  
  const fieldName = complianceConfig.trustedForm.fieldName || 'xxTrustedFormCertUrl';
  
  // TrustedForm creates the field by NAME, not ID
  const certField = document.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement;
  
  if (certField && certField.value) {
    console.log('TrustedForm certificate captured:', certField.value);
    return certField.value;
  }
  
  console.log('TrustedForm certificate not found in field:', fieldName);
  console.log('Field element:', certField);
  console.log('Field value:', certField?.value);
  
  return null;
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
  
  // TrustedForm Certificate
  if (complianceConfig.trustedForm.enabled) {
    const certUrl = captureTrustedFormCert();
    if (certUrl) {
      data.trusted_form_cert = certUrl;
      data.trusted_form_timestamp = new Date().toISOString();
      data.page_url = window.location.href;
    }
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
  
  let ready = true;
  
  if (complianceConfig.jornaya.enabled) {
    const leadId = captureLeadiD();
    if (!leadId) {
      ready = false;
    }
  }
  
  // Check TrustedForm readiness
  if (complianceConfig.trustedForm.enabled) {
    const certUrl = captureTrustedFormCert();
    if (!certUrl) {
      ready = false;
    }
  }
  
  return ready;
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
  
  // Remove TrustedForm script
  const trustedFormScript = document.getElementById('TrustedFormScript');
  if (trustedFormScript) trustedFormScript.remove();

  // Remove any TrustedForm hidden fields
  const trustedFormFields = document.querySelectorAll('input[name^="xxTrustedFormCertUrl"]');
  trustedFormFields.forEach(field => field.remove());
};