import { useEffect } from 'react';
import { complianceConfig } from '../../config/compliance.config';

export const ComplianceScripts: React.FC = () => {
  useEffect(() => {
    // Compliance scripts now load at contact form step instead of page load
    // This provides better compliance focus and performance
    console.log('Page-level compliance: Scripts will load at contact form step');
  }, []);

  // This component doesn't render anything visible
  return null;
};