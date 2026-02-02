import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 300);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Lösungen', action: () => scrollToSection('solutions') },
    { name: 'Demo', action: () => scrollToSection('demo') },
    { name: 'Team', action: () => scrollToSection('team') },
    { name: 'Kontakt', action: () => {
      // Trigger contact form by dispatching a custom event
      window.dispatchEvent(new CustomEvent('showContactForm'));
      setIsOpen(false);
    }}
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2' : 'py-4'
    } ${hasAnimated ? 'animate-in slide-in-from-top-4 fade-in duration-700' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className={`bg-white border border-gray-200 rounded-2xl transition-all duration-300 ${
          scrolled ? 'shadow-lg' : 'shadow-xl'
        }`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                  AUTOMATICLY
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="relative text-gray-900 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-800 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-900" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-900" />
                )}
              </button>
            </div>

            {isOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      className="text-left py-2 text-gray-900 hover:text-blue-600 transition-colors duration-200"
                      onClick={item.action}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};