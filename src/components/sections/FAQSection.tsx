"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Bot, DollarSign, Plug, User, Lightbulb } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

interface FAQSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  items?: FAQItem[];
  contactInfo?: {
    title: string;
    description: string;
    buttonText: string;
    onContact?: () => void;
  };
}

const defaultFAQItems: FAQItem[] = [
  {
    id: "ai-vs-traditional",
    question: "How is AI automation different from traditional automation?",
    answer: "Traditional automation follows fixed rules. AI automation adapts to input, learns from data, and handles more complex and dynamic tasks.",
    icon: <Bot className="h-5 w-5" />
  },
  {
    id: "cost",
    question: "How much does it cost?",
    answer: "The consultation is free. After we understand your needs, we provide a custom quote based on the workload. Free demo builds are available.",
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    id: "integration",
    question: "Can you integrate with the tools I already use?",
    answer: "Yes. We can connect with most CRMs, websites, email platforms, and other tools you are already using.",
    icon: <Plug className="h-5 w-5" />
  },
  {
    id: "technical-skills",
    question: "Do I need any technical skills?",
    answer: "No. We handle everything from planning to deployment so you can focus on running your business.",
    icon: <User className="h-5 w-5" />
  },
  {
    id: "what-to-automate",
    question: "What if I'm not sure what to automate?",
    answer: "That is exactly what we help with. During the consultation we identify time-consuming tasks in your business and show you what automation can handle.",
    icon: <Lightbulb className="h-5 w-5" />
  }
];

const FAQItem = React.forwardRef<
  HTMLDivElement,
  {
    item: FAQItem;
    index: number;
  }
>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { item, index } = props;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group rounded-xl border border-border/50 overflow-hidden",
        "transition-all duration-300 ease-in-out",
        isOpen
          ? "bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 text-white shadow-lg"
          : "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-md hover:shadow-lg"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 h-auto justify-between hover:bg-transparent group"
      >
        <div className="flex items-center gap-4">
          {item.icon && (
            <motion.div
              animate={{
                scale: isOpen ? 1.1 : 1,
                rotate: isOpen ? 5 : 0,
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                "p-2 rounded-lg transition-colors duration-200",
                isOpen 
                  ? "bg-white/20 text-white" 
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}
            >
              {item.icon}
            </motion.div>
          )}
          <h3
            className={cn(
              "text-left font-semibold transition-colors duration-200",
              isOpen ? "text-white" : "text-foreground/80 group-hover:text-foreground"
            )}
          >
            {item.question}
          </h3>
        </div>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "flex-shrink-0 transition-colors duration-200",
            isOpen ? "text-white" : "text-muted-foreground group-hover:text-primary"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="px-6 pb-6"
            >
              <div className="ml-14 max-w-2xl">
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent rounded-full" />
                  <p className={cn("leading-relaxed pl-6", isOpen ? "text-white/90" : "text-muted-foreground")}>
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FAQItem.displayName = "FAQItem";

export const FAQSection = React.forwardRef<HTMLElement, FAQSectionProps>(
  ({ 
    className, 
    title = "Frequently Asked Questions",
    subtitle,
    description = "Get answers to common questions about our AI automation",
    items = defaultFAQItems,
    contactInfo,
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative py-20 w-full overflow-hidden",
          "bg-white",
          className
        )}
        {...props}
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative Bubbles - Light to Dark Blue Gradient */}
          {/* Large Bubbles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-blue-300/30 rounded-full blur-sm animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-br from-blue-200/50 to-blue-400/40 rounded-full blur-sm animate-pulse delay-1000" style={{animationDuration: '6s'}}></div>
          <div className="absolute bottom-16 left-20 w-40 h-40 bg-gradient-to-br from-blue-50/60 to-blue-200/50 rounded-full blur-md animate-pulse delay-500" style={{animationDuration: '5s'}}></div>
          <div className="absolute bottom-32 right-12 w-28 h-28 bg-gradient-to-br from-blue-300/35 to-blue-500/25 rounded-full blur-sm animate-pulse delay-2000" style={{animationDuration: '7s'}}></div>
          
          {/* Medium Bubbles */}
          <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-100/45 to-blue-400/35 rounded-full blur-sm animate-pulse delay-300" style={{animationDuration: '8s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-200/40 to-blue-600/30 rounded-full blur-sm animate-pulse delay-1500" style={{animationDuration: '4s'}}></div>
          <div className="absolute bottom-1/3 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-50/55 to-blue-300/45 rounded-full blur-sm animate-pulse delay-800" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-2/3 right-1/3 w-18 h-18 bg-gradient-to-br from-blue-400/30 to-blue-700/20 rounded-full blur-sm animate-pulse delay-1200" style={{animationDuration: '9s'}}></div>
          
          {/* Small Bubbles */}
          <div className="absolute top-16 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-100/50 to-blue-300/40 rounded-full blur-xs animate-pulse delay-600" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-1/3 w-8 h-8 bg-gradient-to-br from-blue-200/45 to-blue-500/35 rounded-full blur-xs animate-pulse delay-900" style={{animationDuration: '5s'}}></div>
          <div className="absolute bottom-20 left-1/5 w-14 h-14 bg-gradient-to-br from-blue-50/60 to-blue-200/50 rounded-full blur-xs animate-pulse delay-400" style={{animationDuration: '7s'}}></div>
          <div className="absolute bottom-1/4 right-1/5 w-10 h-10 bg-gradient-to-br from-blue-300/40 to-blue-600/30 rounded-full blur-xs animate-pulse delay-1800" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/3 left-1/6 w-6 h-6 bg-gradient-to-br from-blue-100/55 to-blue-400/45 rounded-full blur-xs animate-pulse delay-700" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-3/4 right-1/6 w-16 h-16 bg-gradient-to-br from-blue-200/50 to-blue-500/40 rounded-full blur-xs animate-pulse delay-1100" style={{animationDuration: '8s'}}></div>
          
          {/* Extra Small Decorative Bubbles */}
          <div className="absolute top-24 left-2/3 w-4 h-4 bg-gradient-to-br from-blue-100/60 to-blue-300/50 rounded-full animate-pulse delay-200" style={{animationDuration: '4s'}}></div>
          <div className="absolute top-1/2 left-1/8 w-5 h-5 bg-gradient-to-br from-blue-200/55 to-blue-400/45 rounded-full animate-pulse delay-1300" style={{animationDuration: '5s'}}></div>
          <div className="absolute bottom-40 right-2/3 w-3 h-3 bg-gradient-to-br from-blue-50/65 to-blue-200/55 rounded-full animate-pulse delay-1600" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-1/5 left-3/4 w-7 h-7 bg-gradient-to-br from-blue-300/45 to-blue-500/35 rounded-full animate-pulse delay-1900" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-1/5 right-1/8 w-4 h-4 bg-gradient-to-br from-blue-100/50 to-blue-400/40 rounded-full animate-pulse delay-500" style={{animationDuration: '7s'}}></div>
          <div className="absolute bottom-2/3 left-1/12 w-6 h-6 bg-gradient-to-br from-blue-200/60 to-blue-600/50 rounded-full animate-pulse delay-1400" style={{animationDuration: '4s'}}></div>
          
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
            <DollarSign size={32} />
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
            <Plug size={36} />
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
            <User size={28} />
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            {subtitle && (
              <Badge 
                variant="outline" 
                className="mb-4 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
              >
                {subtitle}
              </Badge>
            )}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {/* Mobile: Two lines */}
              <span className="block md:hidden">
                Get answers to common questions
                <br />
                about our AI automation
              </span>
              {/* Desktop: Single line */}
              <span className="hidden md:block">
                Get answers to common questions about our AI automation
              </span>
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4 mb-16">
            {items.map((item, index) => (
              <FAQItem
                key={item.id}
                item={item}
                index={index}
              />
            ))}
          </div>

          {/* Contact Section */}
          {contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card via-background to-card backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
                    <Bot className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {contactInfo.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {contactInfo.description}
                  </p>
                  <Button 
                    onClick={contactInfo.onContact}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    {contactInfo.buttonText}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);
FAQSection.displayName = "FAQSection";