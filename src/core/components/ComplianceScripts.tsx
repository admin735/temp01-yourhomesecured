import { useEffect } from 'react';
import { loadJornayaScript, loadTrustedFormScript } from '../utils/compliance';
import { complianceConfig } from '../../config/compliance.config';

export const ComplianceScripts: React.FC = () => {
  useEffect(() => {
    // Load scripts on component mount
    const loadScripts = async () => {
      console.log('Initializing compliance scripts...');
      
      // Load Jornaya if enabled
      if (complianceConfig.jornaya.enabled) {
        console.log('Loading Jornaya script...');
        await loadJornayaScript();
      }
      
      // Load TrustedForm if enabled
      if (complianceConfig.trustedForm.enabled) {
        console.log('Loading TrustedForm script...');
        await loadTrustedFormScript();
      }
      
      console.log('Compliance scripts initialization complete');
    };

    loadScripts();
  }, []);

  // This component doesn't render anything visible
  return null;
};