import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      ref={sectionRef}
      className="relative w-full bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.08),transparent_40%)]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-blue-500/30 rounded-full animate-ping delay-1000" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-300/50 rounded-full animate-ping delay-500" style={{animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-blue-600/20 rounded-full animate-ping delay-2000" style={{animationDuration: '7s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className={`flex flex-col md:flex-row justify-between items-start mb-12 gap-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Left: Company Info */}
          <div className="max-w-xl">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                AITOMATICLY
              </span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Wir transformieren Unternehmen mit modernsten KI-Automatisierungslösungen. Wir helfen Firmen, ihre Abläufe zu optimieren, die Effizienz zu steigern und grenzenlos zu skalieren.
            </p>
          </div>

          {/* Right: Contact Info */}
          <div className="space-y-3 md:text-right">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-sm">info@aitomaticly.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-sm">Bern, Schweiz</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={`pt-8 border-t border-gray-700 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © 2026 AITOMATICLY. Alle Rechte vorbehalten.
            </div>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Datenschutz
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Nutzungsbedingungen
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Cookie-Richtlinie
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};