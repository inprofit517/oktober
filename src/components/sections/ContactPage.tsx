import React, { useEffect } from 'react';
import ContactFormNew from '../ui/ContactFormNew';

export const ContactPage: React.FC = () => {
  // Ensure page loads at top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return <ContactFormNew onReturnHome={() => window.dispatchEvent(new CustomEvent('returnToHome'))} />;
};