import { useEffect } from 'react';
import { loadJornayaScript, loadTrustedFormScript } from '../utils/compliance';
import { complianceConfig } from '../../config/compliance.config';

export const ComplianceScripts: React.FC = () => {
  useEffect(() => {
    // Load scripts on component mount
    const loadScripts = async () => {
      if (complianceConfig.jornaya.enabled) {
        await loadJornayaScript();
      }
      
      // Load TrustedForm script
      if (complianceConfig.trustedForm.enabled) {
        await loadTrustedFormScript();
      }
    };

    loadScripts();
  }, []);

  // This component doesn't render anything visible
  return null;
};