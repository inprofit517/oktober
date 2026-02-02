"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Zap, Cpu, Network, Calendar, Home } from "lucide-react";

const StaticGradientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(125% 125% at 50% 20%, #0F172A 15%, #1E3A8A 30%, #3B82F6 45%, #60A5FA 60%, #93C5FD 75%, #DBEAFE 90%, #1E3A8A 100%)'
        }}
      />
    </div>
  );
};

const FloatingElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating AI Icons */}
      <motion.div
        className="absolute top-20 left-10 text-blue-400/30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Bot size={40} />
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-20 text-blue-300/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Zap size={32} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-20 text-blue-500/25"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <Cpu size={36} />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 text-blue-400/20"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <Network size={28} />
      </motion.div>

      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

interface ContactFormProps {
  onReturnHome?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onReturnHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Load Cal.eu embed script
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.eu/embed/embed.js", "init");

    // Initialize Cal.eu
    (window as any).Cal("init", "erstgesprach", { origin: "https://app.cal.eu" });

    // Setup inline embed
    (window as any).Cal.ns.erstgesprach("inline", {
      elementOrSelector: "#my-cal-inline-erstgesprach",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" },
      calLink: "automaticly/erstgesprach",
    });

    // UI settings
    (window as any).Cal.ns.erstgesprach("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view"
    });
  }, []);

  const handleReturnHome = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.dispatchEvent(new CustomEvent('returnToHome'));
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Static Background - Fixed Position */}
      <StaticGradientBackground />

      {/* Floating Elements - Fixed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingElements />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 overflow-x-hidden">
        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="fixed top-8 left-8 z-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReturnHome}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-800/60 backdrop-blur-xl border border-blue-500/30 rounded-xl text-blue-100 hover:text-white hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Startseite</span>
          </motion.button>
        </motion.div>

        <div className="container mx-auto px-4 py-32 md:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-6 hidden md:block"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium backdrop-blur-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Termin vereinbaren
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Buchen Sie
                <br />
                Ihr kostenloses
                <br />
                <span className="bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent">
                  Erstgespräch
                </span>
              </h1>
              <div className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto space-y-2">
                <p>Bereit, Ihr Unternehmen mit KI-Automatisierung zu transformieren?</p>
                <p>Wählen Sie einen passenden Termin und lassen Sie uns gemeinsam Ihre individuellen Anforderungen besprechen.</p>
              </div>
            </motion.div>

            {/* Cal.eu Inline Embed */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center mb-12 w-full"
            >
              <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: "600px" }}>
                <div
                  id="my-cal-inline-erstgesprach"
                  style={{ width: "100%", height: "100%", overflow: "scroll" }}
                />
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="bg-slate-800/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Was Sie im Erstgespräch erwartet
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-blue-100/80">
                  <div className="space-y-2">
                    <div className="text-3xl mb-2">📊</div>
                    <h4 className="font-semibold text-white">Analyse</h4>
                    <p className="text-sm">Wir analysieren Ihre aktuellen Arbeitsabläufe und identifizieren Optimierungspotenziale.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl mb-2">💡</div>
                    <h4 className="font-semibold text-white">Lösungen</h4>
                    <p className="text-sm">Wir zeigen Ihnen maßgeschneiderte KI-Lösungen für Ihr Unternehmen.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl mb-2">🚀</div>
                    <h4 className="font-semibold text-white">Roadmap</h4>
                    <p className="text-sm">Sie erhalten eine klare Roadmap für die Implementierung.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;