export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const validateZIP = (zip: string): boolean => {
  return /^\d{5}$/.test(zip);
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const validateField = async (step: any, value: any, sessionData: any) => {
  if (step.validation?.apiEndpoint) {
    try {
      const response = await fetch(step.validation.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          [step.id]: value,
          ...sessionData 
        })
      });
      
      const data = await response.json();
      
      if (data.response === 'success') {
        return { valid: true, data: data.additionalData };
      } else {
        return { valid: false, error: data.message || 'Validation failed' };
      }
    } catch (error) {
      await sleep(step.validation?.mockDelay || 1500);
      return validateLocally(step, value);
    }
  } else {
    await sleep(step.validation?.mockDelay || 1500);
    return validateLocally(step, value);
  }
};

const validateLocally = (step: any, value: any) => {
  if (step.id === 'zip') {
    const valid = validateZIP(value);
    return {
      valid,
      error: valid ? null : step.validation?.message
    };
  }
  
  if (step.validation?.pattern) {
    const valid = step.validation.pattern.test(value);
    return {
      valid,
      error: valid ? null : step.validation.message
    };
  }
  
  return { valid: true };
};