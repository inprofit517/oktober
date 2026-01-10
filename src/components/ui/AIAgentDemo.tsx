import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Bot, ArrowRight } from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  demoUrl: string;
  color: string;
}

const AIAgentDemo: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const agentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const agents: AIAgent[] = [
    {
      id: "support",
      name: "Support Chatbot",
      description: "Intelligenter KI-Assistent, der 24/7 Kundensupport mit natürlicher Sprachverarbeitung und kontextabhängigen Antworten bereitstellt.",
      icon: MessageCircle,
      features: [
        "Natürliche Sprachverarbeitung",
        "Mehrsprachige Unterstützung",
        "Sentimentanalyse",
        "Eskalation an menschliche Mitarbeiter"
      ],
      demoUrl: "#demo-support",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "voice",
      name: "Voice Agent",
      description: "Fortgeschrittene Voice-KI, die Telefonanrufe mit menschenähnlichen Gesprächsfähigkeiten und Echtzeit-Antwortgenerierung verarbeitet.",
      icon: Bot,
      features: [
        "Natürliche Sprachsynthese",
        "Echtzeit-Gespräch",
        "Anrufweiterleitung und -übertragung",
        "Sprachanalysen"
      ],
      demoUrl: "#demo-voice",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint
      if (!isMobile) {
        // On desktop, maintain hover effect
        return;
      }

      let newActiveAgent: string | null = null;
      let minDistance = Infinity;

      agentRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            newActiveAgent = agents[index].id;
          }
        }
      });
      setActiveAgent(newActiveAgent);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to set initial active agent
    return () => window.removeEventListener("scroll", handleScroll);
  }, [agents]);

  const handleDemoClick = (demoUrl: string) => {
    // Trigger contact form
    window.dispatchEvent(new CustomEvent('showContactForm'));
  };

  const scrollToDemo = () => {
    // Trigger contact form
    window.dispatchEvent(new CustomEvent('showContactForm'));
  };

  return (
    <section id="demo" className="relative w-full py-20 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl"
        />

        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i * 8) % 60}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-5xl font-bold text-white mb-6">
              <span className="block md:inline">Erleben Sie die Kraft der</span>{' '}
              <span className="block md:inline">KI-Automatisierung</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto">
              <span className="block md:inline">Sehen Sie unsere KI-Agenten in Aktion</span>{' '}
              <span className="block md:inline">mit Echtzeit-Fähigkeiten<span className="md:hidden">.</span></span>
              <span className="hidden md:block">die die Art und Weise verändern, wie Unternehmen tätig sind, kommunizieren und wachsen.</span>
            </p>
          </motion.div>

          {/* Agent cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                ref={el => agentRefs.current[index] = el}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }} // Trigger when 50% of the card is in view
                className="group relative"
                onMouseEnter={() => window.innerWidth >= 768 && setActiveAgent(agent.id)} // Only for desktop
                onMouseLeave={() => window.innerWidth >= 768 && setActiveAgent(null)} // Only for desktop
              >
                <div className={`relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 h-full overflow-hidden shadow-2xl
                              ${activeAgent === agent.id ? 'bg-white/15 border-white/30 shadow-blue-500/20 shadow-2xl transform scale-105 -translate-y-2' : ''}
                              transition-all duration-500 ease-out`}>
                  
                  {/* Card glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${agent.color} ${activeAgent === agent.id ? 'opacity-20' : 'opacity-0'} transition-opacity duration-500 rounded-2xl blur-sm`} />
                  <div className={`absolute -inset-1 bg-gradient-to-r ${agent.color} ${activeAgent === agent.id ? 'opacity-30' : 'opacity-0'} transition-opacity duration-500 rounded-2xl blur-xl -z-10`} />

                  {/* Animated background pattern */}
                  <div className={`absolute inset-0 ${activeAgent === agent.id ? 'opacity-10' : 'opacity-0'} transition-opacity duration-300`}>
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
                          radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                          radial-gradient(circle at 50% 20%, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px, 40px 40px, 25px 25px',
                      }}
                    />
                  </div>

                  <div className="relative z-10">
                    {/* Agent icon */}
                    <motion.div
                      animate={activeAgent === agent.id ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${agent.color} mb-6 shadow-lg`}
                    >
                      <agent.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Agent info */}
                    <h3 className={`text-2xl font-bold text-white mb-4 ${activeAgent === agent.id ? 'text-cyan-200' : ''} transition-colors`}>
                      {agent.name}
                    </h3>

                    <p className="text-blue-200 mb-6 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-3 mb-8">
                      {agent.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${agent.color}`} />
                          <span className="text-blue-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Demo button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDemoClick(agent.demoUrl)}
                      className={`w-full bg-gradient-to-r ${agent.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
                    >
                      Jetzt Ausprobieren
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>

                  {/* Floating particles effect */}
                  <AnimatePresence>
                    {activeAgent === agent.id && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0],
                              x: [0, (Math.random() - 0.5) * 100],
                              y: [0, (Math.random() - 0.5) * 100]
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${agent.color} blur-sm`}
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-blue-200 mb-6">
              <span className="block md:inline">Bereit, Ihr Unternehmen zu transformieren</span>{' '}
              <span className="block md:inline">mit KI-Automatisierung?</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToDemo}
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto overflow-hidden group"
            >
              {/* Glass button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl blur-xl -z-10" />

              <span className="relative z-10">Holen Sie sich Ihre kostenlose Demo</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentDemo;