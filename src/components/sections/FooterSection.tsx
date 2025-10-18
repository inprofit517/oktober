import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Button } from '../ui/button';

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

  const services = [
    "AI Chatbots",
    "Lead Generation",
    "Voice Agents",
    "CRM Automation",
    "Email Marketing",
    "Process Automation"
  ];

  const company = [
    "About Us",
    "Our Team",
    "Careers",
    "Blog",
    "Case Studies",
    "Partners"
  ];

  const resources = [
    "Documentation",
    "API Reference",
    "Tutorials",
    "Support Center",
    "Community",
    "Webinars"
  ];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className={`lg:col-span-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                  AITOMATICLY
                </span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Transforming businesses with cutting-edge AI automation solutions. We help companies streamline operations, boost efficiency, and scale without limits.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">hello@aitomaticly.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm text-left">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <button className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-3 mb-8">
              {resources.map((resource, index) => (
                <li key={index}>
                  <button className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm text-left">
                    {resource}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold mb-4 text-white">Follow Us</h5>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, link: "#" },
                  { Icon: Twitter, link: "#" },
                  { Icon: Linkedin, link: "#" },
                  { Icon: Instagram, link: "#" },
                  { Icon: Youtube, link: "#" }
                ].map(({ Icon, link }, index) => (
                  <button
                    key={index}
                    className="w-8 h-8 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-4 h-4 text-gray-300 hover:text-white transition-colors duration-200" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={`bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-xl p-8 mb-12 border border-blue-400/20 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Get the latest AI automation insights and updates delivered to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-200"
              />
              <Button className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={`pt-8 border-t border-gray-700 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 AITOMATICLY. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};