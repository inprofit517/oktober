'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Bot, Sparkles, Brain, Rocket, Users } from 'lucide-react';

// Bubble Component
const Bubble = ({ index }: { index: number }) => {
  const size = Math.random() * 8 + 2; // Random size between 2-10px
  const left = Math.random() * 100; // Random horizontal position
  const top = Math.random() * 100; // Random vertical position
  const animationDuration = Math.random() * 10 + 15; // Random duration between 15-25s
  const delay = Math.random() * 20; // Random delay up to 20s
  const floatDistance = Math.random() * 50 + 25; // Random float distance

  return (
    <motion.div
      className="absolute bg-white/20 rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
      }}
      animate={{
        y: [0, -floatDistance, 0],
        x: [0, Math.random() * 30 - 15, 0], // Gentle horizontal drift
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: animationDuration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Bubbles Container
const SparklingBubbles = () => {
  const bubbles = Array.from({ length: 400 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((index) => (
        <Bubble key={index} index={index} />
      ))}
    </div>
  );
};

// Animated Text Component
const AnimatedText = () => {
  const words = ["Erfolg", "Zukunft", "Innovation"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-white"
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
};

// Team Section Component
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Elia",
      role: "Projektleitung",
      description: "Analysiert Ihre Unternehmensprozesse, um die passenden Lösungen zu identifizieren. Elia stellt sicher, dass unsere Technologie exakt auf Ihre strategischen Ziele einzahlt.",
      icon: Users,
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Lis",
      role: "Automation Engineer",
      description: "Verantwortlich für die technische Architektur und System-Integration. Lis übersetzt Ihre geschäftlichen Anforderungen in effizienten, fehlerfreien Code und automatisierte Workflows.",
      icon: Sparkles,
      color: "from-blue-500 to-indigo-500"
    }
  ];

  const handleContactTeam = () => {
    // Trigger contact form
    window.dispatchEvent(new CustomEvent('showContactForm'));
  };

  return (
    <section id="team" className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-300 to-blue-900">
      {/* Sparkling Bubbles */}
      <SparklingBubbles />
      
      {/* Background Gradients/Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }} />

      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Das Team<br />hinter Ihrem<br />Erfolg
          </h2>
        </motion.div>

        {/* Team Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group h-full"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] h-full flex flex-col overflow-hidden border border-white/50">

                {/* Profile Picture Placeholder */}
                <div className="p-8 text-center bg-gradient-to-br from-white to-blue-50/50">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 border-4 border-white shadow-lg mb-5 flex items-center justify-center overflow-hidden">
                    <div className="text-gray-400 text-xs">Photo</div>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {member.role}
                  </span>
                </div>

                {/* Description */}
                <div className="p-8 flex-1 flex items-center">
                  <p className="text-gray-700 leading-loose text-center text-base">{member.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Button 
            onClick={handleContactTeam}
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto overflow-hidden group"
          >
            {/* Glass button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl blur-xl -z-10" />
            
            <span className="relative z-10">Kontaktieren Sie unser Team</span>
            <Users className="mr-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;