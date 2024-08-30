// isValid.ts
export const isValidEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
  return emailPattern.test(email) && allowedDomains.includes(email.split('@')[1]);
};

