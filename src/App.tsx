import React, { lazy, Suspense } from 'react';
import { useState } from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { ContactPage } from './components/sections/ContactPage';
import { VoiceflowChatButton } from './components/ui/VoiceflowChatButton';

const BenefitsSection = lazy(() => import('./components/sections/BenefitsSection').then(m => ({ default: m.BenefitsSection })));
const SolutionsSection = lazy(() => import('./components/sections/SolutionsSection').then(m => ({ default: m.SolutionsSection })));
const AIAgentDemo = lazy(() => import('./components/ui/AIAgentDemo'));
const ProcessSection = lazy(() => import('./components/sections/ProcessSection').then(m => ({ default: m.ProcessSection })));
const TeamSection = lazy(() => import('./components/ui/TeamSectionNew'));
const FooterSection = lazy(() => import('./components/sections/FooterSection').then(m => ({ default: m.FooterSection })));

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
      <Suspense fallback={<div className="min-h-screen" />}>
        <BenefitsSection />
        <SolutionsSection />
        <AIAgentDemo />
        <ProcessSection />
        <TeamSection />
        <FooterSection />
      </Suspense>
      <VoiceflowChatButton variant="desktop" className="hidden lg:block" />
    </>
  );
}

export default App;