import { useEffect } from 'react';
import { loadJornayaScript, loadTrustedFormScript } from '../utils/compliance';
import { complianceConfig } from '../../config/compliance.config';

export const ComplianceScripts: React.FC = () => {
  useEffect(() => {
    const loadScripts = async () => {
      console.log('Initializing compliance scripts...');
      
      // Only load Jornaya here if you want it on page load
      // Otherwise, remove this too and load both at contact form step
      if (complianceConfig.jornaya.enabled) {
        console.log('Loading Jornaya script...');
        await loadJornayaScript();
      }
      
      // TrustedForm will be loaded at contact form step instead
      console.log('Compliance scripts initialization complete');
    };

    loadScripts();
  }, []);

  // This component doesn't render anything visible
  return null;
};