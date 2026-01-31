import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/button';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { Navbar } from './Navbar';
import CpuArchitecture from '../ui/CpuArchitecture';
import CpuArchitectureMobile from '../ui/CpuArchitectureMobile';

interface HeroSectionProps {
  title?: string;
  typewriterWords?: string[];
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onShowContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Automatisieren Sie",
  typewriterWords = ["Ihr Unternehmen"],
  subtitle = "Transformieren Sie Ihr Unternehmen mit modernsten Automations-Lösungen. Speziell entwickelt für Schweizer Standards, um Prozesse zu beschleunigen, Effizienz zu steigern und nachhaltiges Wachstum zu sichern.",
  primaryButtonText = "Jetzt Starten",
  secondaryButtonText = "Demo ansehen",
  onShowContact
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden pt-20 lg:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.6),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.7),transparent_35%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.9),transparent_30%)]"></div>

        {/* Floating orbs - Hidden on mobile */}
        <div className="hidden lg:block absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-white/80 to-gray-100/60 rounded-full blur-2xl animate-pulse shadow-2xl"></div>
        <div className="hidden lg:block absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-br from-white/90 to-gray-50/70 rounded-full blur-3xl animate-pulse delay-1000 shadow-2xl"></div>
        <div className="hidden lg:block absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-white/85 to-gray-100/50 rounded-full blur-2xl animate-pulse delay-500 shadow-xl"></div>
        <div className="hidden lg:block absolute top-1/2 left-1/5 w-28 h-28 bg-gradient-to-br from-white/75 to-gray-50/60 rounded-full blur-2xl animate-pulse delay-700 shadow-2xl"></div>
        <div className="hidden lg:block absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-white/80 to-gray-100/40 rounded-full blur-3xl animate-pulse delay-300 shadow-xl"></div>
        <div className="hidden lg:block absolute top-1/4 left-1/3 w-18 h-18 bg-gradient-to-br from-white/90 to-gray-50/80 rounded-full blur-xl animate-pulse delay-1200 shadow-lg"></div>

        {/* Floating dots - Hidden on mobile */}
        <div className="hidden lg:block absolute top-24 right-16 w-4 h-4 bg-white rounded-full opacity-80 animate-ping shadow-lg"></div>
        <div className="hidden lg:block absolute top-40 left-32 w-3 h-3 bg-gray-100 rounded-full opacity-70 animate-ping delay-1000 shadow-md"></div>
        <div className="hidden lg:block absolute bottom-32 left-24 w-5 h-5 bg-white rounded-full opacity-85 animate-ping delay-500 shadow-lg"></div>
        <div className="hidden lg:block absolute bottom-40 right-32 w-3 h-3 bg-gray-50 rounded-full opacity-75 animate-ping delay-1500 shadow-md"></div>
        <div className="hidden lg:block absolute top-60 left-1/2 w-4 h-4 bg-white rounded-full opacity-80 animate-ping delay-800 shadow-lg"></div>
        <div className="hidden lg:block absolute top-32 left-1/4 w-2 h-2 bg-gray-100 rounded-full opacity-60 animate-ping delay-600 shadow-sm"></div>
        <div className="hidden lg:block absolute bottom-1/4 left-1/2 w-3 h-3 bg-white rounded-full opacity-75 animate-ping delay-1100 shadow-md"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className={`text-6xl font-bold leading-tight text-left transition-all duration-1000 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                      {title}
                    </span>
                    <br />
                    <span className="text-foreground relative inline-block">
                      {typewriterWords[0]}
                      <span className="absolute -bottom-2 left-0 right-0 h-2 bg-blue-200 rounded-full" style={{width: '100%'}}></span>
                    </span>
                  </h1>
                  <p className={`text-xl text-muted-foreground max-w-2xl leading-relaxed text-left transition-all duration-1000 delay-300 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {subtitle}
                  </p>
                </div>

                <div className={`flex gap-4 transition-all duration-1000 delay-500 ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <Button 
                    size="lg" 
                    onClick={onShowContact}
                    className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white px-8 py-6 text-lg transform hover:scale-105 transition-transform"
                  >
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={scrollToDemo}
                    className="bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                  >
                    <Play className="mr-2 h-5 w-5 fill-current" />
                    {secondaryButtonText}
                  </Button>
                </div>

                <div className={`flex justify-start gap-16 pt-8 transition-all duration-1000 delay-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <div className={`text-center transform transition-all duration-1000 delay-1000 ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                      <AnimatedCounter end={80} suffix="%" className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent" />
                    </div>
                    <div className="text-sm text-muted-foreground">Mehr Effizienz</div>
                  </div>
                  <div className={`text-center transform transition-all duration-1000 delay-1200 ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                  }`}>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">24/7</div>
                    <div className="text-sm text-muted-foreground">Immer verfügbar</div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="w-[480px] h-80 rounded-xl backdrop-blur-sm border border-blue-300/40 flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #5BA3D0 0%, #4FA3FF 50%, #6B9FD6 100%)' }}>
                  <CpuArchitecture 
                    className="w-full h-full"
                    text="AI"
                    showCpuConnections={true}
                    animateText={true}
                    animateLines={true}
                    animateMarkers={true}
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Mobile version */}
            <div className="lg:hidden space-y-6 pb-20 pt-8">
              <div className="text-center space-y-6">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight px-4">
                  <span className="block whitespace-nowrap bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Automatisieren Sie
                  </span>
                  <span className="block whitespace-nowrap text-foreground relative inline-block mt-2">
                    Ihr Unternehmen
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-200 rounded-full" style={{width: '100%'}}></span>
                  </span>
                </h1>

                {/* AI Chip Container for Mobile */}
                <div className="relative flex items-center justify-center px-4 mt-8 mb-6">
                  <div className="w-full max-w-sm rounded-xl backdrop-blur-sm border border-blue-300/40 flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #5BA3D0 0%, #4FA3FF 50%, #6B9FD6 100%)', minHeight: '180px', overflow: 'visible' }}>
                    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '140px' }}>
                      <CpuArchitectureMobile
                        className="w-full h-full"
                        text="AI"
                        animateLines={false}
                        animateMarkers={false}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground px-4 leading-relaxed" style={{ lineHeight: '1.4' }}>
                  Transformieren Sie Ihr Unternehmen mit modernster KI-Automatisierung.
                </p>
              </div>

              <div className="flex flex-col gap-3 px-4">
                <Button 
                  size="lg" 
                  onClick={onShowContact}
                  className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white"
                >
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToDemo}
                  className="bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 font-semibold"
                >
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  {secondaryButtonText}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6 px-4">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                    <AnimatedCounter end={80} suffix="%" className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent" />
                  </div>
                  <div className="text-sm text-muted-foreground">Mehr Effizienz</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">24/7</div>
                  <div className="text-sm text-muted-foreground">Immer verfügbar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};