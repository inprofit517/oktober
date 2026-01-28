import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

export const DemoSection: React.FC = () => {
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

  const demos = [
    {
      title: "Support Chatbot",
      description: "Intelligenter KI-Assistent, der 24/7 Kundensupport mit natürlicher Sprachverarbeitung und kontextabhängigen Antworten bereitstellt.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <defs>
            <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <path fill="url(#chatGradient)" d="M12 3c5.514 0 10 3.685 10 8.23 0 4.544-4.486 8.229-10 8.229-1.691 0-3.289-.347-4.725-.974L2 21l2.725-5.256C3.347 14.519 2 12.875 2 11.23 2 6.685 6.486 3 12 3zm-3 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm3 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
        </svg>
      ),
      features: [
        "Natürliche Sprachverarbeitung",
        "Mehrsprachige Unterstützung",
        "Sentimentanalyse",
        "Eskalation an menschliche Mitarbeiter",
        "Integration der Wissensdatenbank"
      ]
    },
    {
      title: "Voice Agent",
      description: "Fortgeschrittene Voice-KI, die Telefonanrufe mit menschenähnlichen Gesprächsfähigkeiten und Echtzeit-Antwortgenerierung verarbeitet.",
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <defs>
            <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <path fill="url(#voiceGradient)" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z M17.3 11c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
        </svg>
      ),
      features: [
        "Natürliche Sprachsynthese",
        "Echtzeit-Gespräch",
        "Anrufweiterleitung und -übertragung",
        "Sprachanalysen",
        "Mehrsprachige Akzentunerkennung"
      ]
    }
  ];

  return (
    <section 
      id="demo"
      ref={sectionRef}
      className="relative w-full py-20 px-4 bg-gradient-to-br from-blue-200 via-blue-500 to-blue-900 overflow-hidden"
    >
      {/* Enhanced Background for Demo Section */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-blue-600/10 to-blue-900/30"></div>
        
        {/* Bubble Rise Animation */}
        <div className="absolute left-10 bottom-0 w-12 h-12 bg-white/8 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute left-1/4 bottom-0 w-8 h-8 bg-white/6 rounded-full animate-ping delay-1000" style={{animationDuration: '6s'}}></div>
        <div className="absolute right-1/3 bottom-0 w-10 h-10 bg-white/10 rounded-full animate-ping delay-500" style={{animationDuration: '5s'}}></div>
        <div className="absolute right-20 bottom-0 w-6 h-6 bg-white/12 rounded-full animate-ping delay-2000" style={{animationDuration: '7s'}}></div>
        
        {/* Tech Circuit Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/5 left-1/5 w-32 h-0.5 bg-white/30 transform rotate-45"></div>
          <div className="absolute top-2/5 right-1/4 w-24 h-0.5 bg-white/25 transform -rotate-12"></div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-0.5 bg-white/20 transform rotate-30"></div>
          <div className="absolute top-1/6 right-1/5 w-28 h-0.5 bg-white/35 transform -rotate-45"></div>
        </div>
        
        {/* Hexagonal Tech Elements */}
        <div className="absolute top-1/4 left-1/6 w-16 h-16 border border-white/15 transform rotate-12 opacity-60"
             style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}>
        </div>
        <div className="absolute bottom-1/4 right-1/8 w-12 h-12 border border-white/20 transform -rotate-30 opacity-40"
             style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}>
        </div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 border border-white/10 transform rotate-45 opacity-50"
             style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'}}>
        </div>
        
        {/* Starfield Effect */}
        <div className="absolute top-16 left-16 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-32 right-24 w-1 h-1 bg-white/70 rounded-full animate-ping delay-1000" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-40 left-32 w-1 h-1 bg-white/50 rounded-full animate-ping delay-500" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-24 right-40 w-1 h-1 bg-white/80 rounded-full animate-ping delay-1500" style={{animationDuration: '5s'}}></div>
        <div className="absolute top-40 left-2/3 w-1 h-1 bg-white/65 rounded-full animate-ping delay-2000" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white/75 rounded-full animate-ping delay-750" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/55 rounded-full animate-ping delay-1250" style={{animationDuration: '6s'}}></div>
        
        {/* Flowing Energy Lines */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Unsere KI-Lösungen
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Entdecken Sie, wie unsere intelligenten Agenten Ihr Geschäft transformieren können
          </p>
        </div>

        {/* Demo Cards - Centered */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {demos.map((demo, index) => (
            <Card
              key={index}
              className={`p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-6">
                {demo.icon}
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                {demo.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 leading-loose mb-6 text-center text-base">
                {demo.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {demo.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

    </section>
  );
};