import React, { useState, useEffect, useRef } from 'react';
import { Users, Target, Headphones, Mic } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import crmImage from '../../CRM.png';
import leadgenImage from '../../leadgen.png';
import supportImage from '../../support.png';
import voiceImage from '../../voice-agent.png';

interface Solution {
  id: string;
  title: string;
  description: string;
 mobileDescription: string;
  icon: React.ReactNode;
  image: string;
}

const solutionsData: Solution[] = [
  {
    id: "crm",
    title: "Schließen Sie mehr Deals mit KI",
    description: "Optimieren Sie Ihre gesamte Sales-Pipeline mit intelligenter Automatisierung.\nQualifizieren Sie Prospects sofort und identifizieren Sie hochwertige Gelegenheiten.\nEleminieren Sie manuelle Aufgaben und befähigen Ihr Team, sich auf das Closing zu konzentrieren.\nErreichen Sie konsistentes Wachstum und maximieren Sie Ihre Sales-Effizienz.",
    mobileDescription: "Automatisieren Sie Sales-Pipeline.\nQualifizieren Sie Prospects sofort.\nEleminieren Sie manuelle Aufgaben.\nFokussieren Sie das Team auf Abschlüsse.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="crmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <path fill="url(#crmGradient)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    image: crmImage
  },
  {
    id: "lead-gen",
    title: "Wandeln Sie Gespräche in Kunden um",
    description: "Zielgruppe Ihrer idealen Prospects mit KI-gesteuerten Outreach-Kampagnen.\nLiefern Sie personalisierte Nachrichten im großen Maßstab und konvertieren Sie mehr Leads.\nAutomatisieren Sie Lead-Nurturing und stellen Sie warme Übergaben an den Vertrieb sicher.\nFüllen Sie Ihre Pipeline konsistent auf und generieren Sie erhebliche Einnahmen.",
    mobileDescription: "Zielgruppe Ihrer idealen Prospects.\nSenden Sie personalisierte Nachrichten.\nNutzen Sie Lead-Nurturing automatisch.\nFüllen Sie Ihren Kalender konsistent auf.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="leadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <path fill="url(#leadGradient)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    image: leadgenImage
  },
  {
    id: "support",
    title: "Sofortige Antworten. Keine Wartezeit.",
    description: "Bieten Sie sofortige, genaue Kundenantworten mit 24/7 KI-Support.\nBearbeiten Sie hohe Anfragevolumina ohne zusätzliches Personal.\nLösen Sie komplexe Probleme nahtlos mit natürlicher KI.\nVerbessern Sie die Kundenzufriedenheit und bauen Sie dauerhafte Loyalität auf.",
    mobileDescription: "Bieten Sie sofortige Antworten.\nBearbeiten Sie hohe Anfragevolumina.\nLösen Sie komplexe Probleme.\nVerbessern Sie Zufriedenheit und Loyalität.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="supportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <path fill="url(#supportGradient)" d="M12 3c5.514 0 10 3.685 10 8.23 0 4.544-4.486 8.229-10 8.229-1.691 0-3.289-.347-4.725-.974L2 21l2.725-5.256C3.347 14.519 2 12.875 2 11.23 2 6.685 6.486 3 12 3zm-3 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    ),
    image: supportImage
  },
  {
    id: "voice",
    title: "KI-Anrufe, die Ergebnisse liefern",
    description: "Automatisieren Sie eingehende Anrufe, qualifizieren Sie Leads und leiten Sie effizient weiter.\nBieten Sie natürlich klingende Interaktionen, die Ihre Marke widerspiegeln.\nBieten Sie Kundenservice in Echtzeit, ohne Ihr Team zu erweitern.\nNutzen Sie jede Gelegenheit, indem Sie schnelle, intelligente Antworten sicherstellen.",
    mobileDescription: "Beantworten Sie jeden Anruf sofort.\nQualifizieren Sie Leads automatisch.\nBieten Sie nahtlose Serviceleistungen.\nVerpassen Sie niemals Gelegenheiten.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <defs>
          <linearGradient id="voiceGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <path fill="url(#voiceGradient2)" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z M17.3 11c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
      </svg>
    ),
    image: voiceImage
  }
];

export const SolutionsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const [highlightProgress, setHighlightProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isEntering = entry.isIntersecting;
        setIsInViewport(isEntering);
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add small delay to prevent flickering on quick scrolls
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            if (isInViewport) {
              setAnimationEnabled(true);
              // Reset to first slide when entering
              setActiveIndex(0);
            }
          }, 150);
        } else {
          // Stop animation when leaving viewport
          setAnimationEnabled(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '50px 0px -50px 0px' // Add margin to prevent flickering
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInViewport]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            
            let progress = 0;
            const triggerPoint = windowHeight * 0.8;
            const endPoint = windowHeight * 0.2;
            
            if (sectionTop <= triggerPoint && sectionTop >= endPoint) {
              progress = (triggerPoint - sectionTop) / (triggerPoint - endPoint);
              progress = Math.max(0, Math.min(1, progress));
              
              const easeOutCubic = (t: number) => {
                return 1 - Math.pow(1 - t, 3);
              };
              progress = easeOutCubic(progress);
            } else if (sectionTop < endPoint) {
              progress = 1;
            }
            
            setHighlightProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start animation if in viewport and animation is enabled
    if (animationEnabled && isInViewport) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % solutionsData.length);
      }, 4000); // 4 second intervals
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [animationEnabled, isInViewport, solutionsData.length]);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    // Temporarily disable auto-animation when user interacts
    setAnimationEnabled(false);
    
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Re-enable animation after 8 seconds of no interaction
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (isInViewport) {
        setAnimationEnabled(true);
      }
    }, 8000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="solutions" ref={sectionRef} className="relative w-full min-h-screen py-20 px-4 bg-white overflow-hidden flex flex-col justify-center">
      {/* Enhanced Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-50/50 to-blue-100/25 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-blue-150/35 to-blue-200/20 rounded-full blur-xl"></div>
        
        {/* Flowing lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"></div>
        
        {/* Vertical accent lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-200/30 to-transparent"></div>
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-150/40 to-transparent"></div>
        
        {/* Decorative dots */}
        <div className="absolute top-32 left-1/3 w-2 h-2 bg-blue-300/60 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-200/50 rounded-full"></div>
        <div className="absolute bottom-40 left-1/5 w-2 h-2 bg-blue-400/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-blue-250/45 rounded-full"></div>
        
        {/* Subtle hexagonal elements */}
        <div className="absolute top-1/5 right-1/6 w-12 h-12 border border-blue-200/30 transform rotate-12 opacity-60"
             style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}>
        </div>
        <div className="absolute bottom-1/5 left-1/8 w-8 h-8 border border-blue-300/40 transform -rotate-30 opacity-50"
             style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute top-16 right-16 w-1 h-1 bg-blue-400/70 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-2/3 left-16 w-1 h-1 bg-blue-300/60 rounded-full animate-ping delay-1000" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-24 right-1/3 w-1 h-1 bg-blue-500/50 rounded-full animate-ping delay-500" style={{animationDuration: '5s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
            <span className="hidden md:block">
              <span className={`inline-block transition-all duration-700 delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}>
                Transformieren Sie Ihr Geschäft mit
              </span><br />
              <span className={`relative inline-block transition-all duration-700 delay-500 leading-tight ${
                isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 opacity-0 scale-95'
              }`}>
                <span
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 transform origin-left"
                  style={{
                    transform: `scaleX(${highlightProgress})`,
                    opacity: highlightProgress > 0.01 ? 0.9 : 0,
                    transition: 'opacity 0.2s ease-out'
                  }}
                ></span>
                <span className="relative z-10 text-white font-bold px-4 py-2">
                  Intelligenter Automatisierung
                </span>
              </span>
            </span>
            <span className="md:hidden">
              <span className="text-5xl">Transformieren mit</span>
              <br />
              <span className={`relative inline-block text-3xl leading-tight mt-2 ${
                isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-8 opacity-0 scale-95'
              }`}>
                <span
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 transform origin-left"
                  style={{
                    transform: `scaleX(${highlightProgress})`,
                    opacity: highlightProgress > 0.01 ? 0.9 : 0,
                    transition: 'opacity 0.2s ease-out'
                  }}
                ></span>
                <span className="relative z-10 text-white font-bold px-2 py-1">
                  Intelligenter Automatisierung
                </span>
              </span>
            </span>
          </h2>
          <p className={`text-lg md:text-lg text-gray-600 max-w-xl md:max-w-4xl mx-auto leading-relaxed px-4 md:px-0 transition-all duration-700 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ lineHeight: '1.4' }}>
            <span className="block md:hidden">
              Optimieren Sie Ihre Betriebsabläufe
              <br />
              und steigern Sie die Effizienz mit KI-gestützten Lösungen.
            </span>
            <span className="hidden md:block">
              Optimieren Sie Ihre Betriebsabläufe und steigern Sie die Effizienz mit unseren KI-gestützten Lösungen.
            </span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-4 md:px-0">
          {solutionsData.map((solution, index) => (
            <Button
              key={solution.id}
              onClick={() => handleButtonClick(index)}
              className={`px-4 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl font-medium transition-all duration-700 flex items-center gap-2 transform hover:scale-105 ${
                activeIndex === index
                  ? 'bg-black text-white border-2 border-black scale-105'
                  : 'bg-transparent text-black border-2 border-black hover:bg-gray-100'
              } ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : index % 2 === 0 
                    ? 'opacity-0 -translate-x-8' 
                    : 'opacity-0 translate-x-8'
              }`}
              style={{ 
                transitionDelay: `${300 + index * 150}ms`,
                transitionProperty: 'all'
              }}
            >
              {solution.id === 'crm' && (
                <>
                  <Users className="w-4 h-4" />
                  CRM-System
                </>
              )}
              {solution.id === 'lead-gen' && (
                <>
                  <Target className="w-4 h-4" />
                  Lead-Generierung
                </>
              )}
              {solution.id === 'support' && (
                <>
                  <Headphones className="w-4 h-4" />
                  Kundensupport
                </>
              )}
              {solution.id === 'voice' && (
                <>
                  <Mic className="w-4 h-4" />
                  Sprach-Agent
                </>
              )}
            </Button>
          ))}
        </div>

        <div className={`max-w-6xl mx-auto transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Card className="relative bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl overflow-hidden">
            <div className="relative">
              {solutionsData.map((solution, index) => (
                <div 
                  key={solution.id}
                  className={`flex flex-col lg:flex-row items-center transition-all duration-700 ease-in-out ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex 
                        ? 'opacity-0 -translate-x-full absolute inset-0'
                        : 'opacity-0 translate-x-full absolute inset-0'
                  }`}
                >
                  <div className="lg:w-2/3 p-6 md:p-8 lg:p-10">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                      {solution.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      <span className="block md:hidden">
                        {solution.mobileDescription}
                      </span>
                      <span className="hidden md:block">
                        {solution.description}
                      </span>
                    </p>
                  </div>
                  
                  <div className="lg:w-1/3 p-4 md:p-8 flex items-center justify-center">
                    <div className="w-full h-auto bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                      <img 
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-auto object-contain rounded-lg"
                        onLoad={() => console.log(`Image loaded successfully: ${solution.image}`)}
                        onError={() => console.error(`Image failed to load: ${solution.image}`)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};