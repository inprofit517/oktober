import React, { useState, useEffect, useRef } from 'react';

export const ProcessSection: React.FC = () => {
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

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We analyze your current workflows to identify automation opportunities and design a comprehensive strategy tailored to your business goals.",
      features: [
        "Workflow audit & analysis",
        "Pain point identification",
        "Custom automation strategy",
        "ROI assessment & planning"
      ]
    },
    {
      step: "02", 
      title: "Development & Integration",
      description: "Build and integrate AI solutions into your existing systems with minimal disruption to your operations.",
      features: [
        "Custom AI development",
        "System integration",
        "Data migration & setup",
        "Testing & validation"
      ]
    },
    {
      step: "03",
      title: "Launch & Optimization",
      description: "Deploy your automation solutions and provide ongoing optimization to ensure maximum efficiency and ROI.",
      features: [
        "Go-live support", 
        "Performance monitoring",
        "Continuous optimization",
        "Training & documentation"
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 px-4 bg-white overflow-hidden flex flex-col justify-center"
    >
      {/* Unique Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Flowing Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/25 to-transparent"></div>
        
        {/* Vertical Lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent"></div>
        <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400/25 to-transparent"></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        
        {/* Floating Numbers */}
        <div className="absolute top-20 right-20 text-6xl font-bold text-blue-100/20">01</div>
        <div className="absolute top-40 left-16 text-4xl font-bold text-blue-100/15">02</div>
        <div className="absolute bottom-32 right-1/3 text-5xl font-bold text-blue-100/25">03</div>
        
        {/* Connection Dots */}
        <div className="absolute top-1/3 left-1/6 w-3 h-3 bg-blue-400/30 rounded-full"></div>
        <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-blue-500/40 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-300/25 rounded-full"></div>
        <div className="absolute top-1/5 right-1/4 w-2.5 h-2.5 bg-blue-600/30 rounded-full"></div>
        
        {/* Subtle Waves */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path d="M0,200 Q250,150 500,200 T1000,200 L1000,0 L0,0 Z" fill="url(#waveGradient1)" opacity="0.05"/>
            <path d="M0,800 Q250,750 500,800 T1000,800 L1000,1000 L0,1000 Z" fill="url(#waveGradient2)" opacity="0.03"/>
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            <span className="hidden md:block">
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent">Automate</span>
              <span className="text-gray-900"> your workflows</span>
              <br />
              <span className="text-gray-900">in three clear steps</span>
            </span>
            <span className="md:hidden">
              Automate<br />in three steps
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl md:max-w-4xl mx-auto leading-relaxed" style={{ lineHeight: '1.4' }}>
            <span className="hidden md:block">
              From discovery to optimization, our structured approach ensures
              <br />
              successful AI automation implementation for your business.
            </span>
            <span className="md:hidden">
              From discovery to optimization, our
              <br />
              structured approach ensures success.
            </span>
          </p>
        </div>

        {/* Compact Timeline with Picture Space */}
        <div className="flex justify-center">
          {/* Left Side - Timeline */}
          <div className="relative max-w-2xl">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-300 via-blue-500 to-blue-700"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {processSteps.map((process, index) => (
                  <div
                    key={process.step}
                    className={`relative flex items-start gap-8 transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 600}ms` }}
                  >
                    {/* Beautiful Timeline Dot */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-full shadow-lg relative overflow-hidden translate-x-2">
                        {/* Inner glow effect */}
                        <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                        {/* Outer ring */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-blue-300 to-blue-800 rounded-full opacity-20 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-blue-600 mb-1">STEP {process.step}</div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                          {process.title}
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed mb-4">
                          {process.description}
                        </p>
                      </div>
                      
                      {/* Compact Features */}
                      <div className="flex flex-wrap gap-3">
                        {process.features.map((feature, featureIndex) => (
                          <span 
                            key={featureIndex} 
                            className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-md border border-blue-100"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};