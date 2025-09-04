import { useEffect } from 'react';
import { loadJornayaScript } from '../utils/compliance';
import { complianceConfig } from '../../config/compliance.config';

export const ComplianceScripts: React.FC = () => {
  useEffect(() => {
    // Load scripts on component mount
    const loadScripts = async () => {
      if (complianceConfig.jornaya.enabled) {
        await loadJornayaScript();
      }
      
      // Future: Load TrustedForm script
      if (complianceConfig.trustedForm.enabled) {
        // Load TrustedForm
      }
    };

    loadScripts();
  }, []);

  // This component doesn't render anything visible
  return null;
};