import React from 'react';
import { useState } from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { SolutionsSection } from './components/sections/SolutionsSection';
import AIAgentDemo from './components/ui/AIAgentDemo';
import { ProcessSection } from './components/sections/ProcessSection';
import TeamSection from './components/ui/TeamSectionNew';
import { FooterSection } from './components/sections/FooterSection';
import { ContactPage } from './components/sections/ContactPage';

function App() {
  const [showContactForm, setShowContactForm] = useState(false);

  React.useEffect(() => {
    const handleShowContact = () => setShowContactForm(true);
    const handleReturnHome = () => setShowContactForm(false);
    
    window.addEventListener('showContactForm', handleShowContact);
    window.addEventListener('returnToHome', handleReturnHome);
    
    return () => {
      window.removeEventListener('showContactForm', handleShowContact);
      window.removeEventListener('returnToHome', handleReturnHome);
    };
  }, []);

  if (showContactForm) {
    return <ContactPage />;
  }

  return (
    <>
      <HeroSection onShowContact={() => setShowContactForm(true)} />
      <BenefitsSection />
      <SolutionsSection />
      <AIAgentDemo />
      <ProcessSection />
      <TeamSection />
      <FooterSection />
    </>
  );
}

export default App;