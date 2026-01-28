"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Card } from '../ui/card'
import { Zap, DollarSign, TrendingUp, CheckCircle, ArrowUp, ArrowDown, ChevronRight } from 'lucide-react'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  className = "" 
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * end))
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

interface Task {
  id: number;
  name: string;
  status: "processing" | "completed" | "queued";
  progress: number;
}

// Task Processing Dashboard Component
const TaskDashboard: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "E-Mail-Kampagne", status: "processing", progress: 0 },
    { id: 2, name: "Lead-Qualifizierung", status: "completed", progress: 100 },
    { id: 3, name: "Support-Ticket", status: "processing", progress: 0 }
  ])
  const [completedCount, setCompletedCount] = useState(247)
  const [todayCount, setTodayCount] = useState(23)

  // Calculate success rate based on current task states
  const emailCampaign = tasks.find(task => task.name === "E-Mail-Kampagne")
  const supportTicket = tasks.find(task => task.name === "Support-Ticket")
  const successRate = (emailCampaign?.status === "completed" && supportTicket?.status === "completed") ? 100 : 99

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setTasks(prev => {
        let newCompletedCount = completedCount
        let newTodayCount = todayCount
        const newTasks = prev.map(task => {
          if (task.status === "processing" && task.progress < 100) {
            // Increase animation speed by 50% for E-Mail-Kampagne and Support-Ticket
            const speedMultiplier = (task.name === "E-Mail-Kampagne" || task.name === "Support-Ticket") ? 1.5 : 1
            const newProgress = Math.min(task.progress + Math.random() * 15 * speedMultiplier, 100)
            const newStatus = newProgress >= 100 ? "completed" : "processing"

            if (task.status === "processing" && newStatus === "completed") {
              newCompletedCount += 1
              newTodayCount += 1
            }

            return {
              ...task,
              progress: newProgress,
              status: newStatus
            }
          }
          if (task.status === "queued" && Math.random() > 0.7) {
            return { ...task, status: "processing", progress: 5 }
          }
          return task
        })

        setCompletedCount(newCompletedCount)
        setTodayCount(newTodayCount)

        return newTasks
      })
    }, 533) // Reduced from 800ms to 533ms (33% reduction for overall smoother updates)

    return () => clearInterval(interval)
  }, [isVisible, completedCount, todayCount])

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[480px] lg:max-w-lg aspect-square bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden p-3 sm:p-4 md:p-8 lg:p-8">
      {/* Header - Mobile optimized */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-900 text-xs sm:text-sm md:text-lg lg:text-sm font-medium">Aufgabenverarbeiter</span>
        </div>
        <div className="text-xs md:text-sm lg:text-xs text-gray-400">Echtzeit</div>
      </div>

      {/* Metrics - Mobile first design */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-0.5 sm:mb-1 md:mb-2">Aufgaben abgeschlossen</div>
          <div className="text-base sm:text-lg md:text-2xl lg:text-xl font-bold text-gray-900">
            {completedCount}
          </div>
          <div className="text-xs md:text-sm lg:text-xs text-green-600 truncate">↗ +{todayCount} heute</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-0.5 sm:mb-1 md:mb-2">Erfolgsquote</div>
          <div className="text-base sm:text-lg md:text-2xl lg:text-xl font-bold text-green-600">
            <AnimatedCounter end={successRate} suffix="%" />
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 md:h-2 lg:h-1.5 mt-1">
            <div className="bg-green-500 h-1 sm:h-1.5 md:h-2 lg:h-1.5 rounded-full animate-pulse transition-all duration-1000" style={{width: `${successRate}%`}}></div>
          </div>
        </div>
      </div>

      {/* Task List - Compact for mobile */}
      <div className="space-y-1.5 sm:space-y-2 flex-grow">
        <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-1 sm:mb-2 md:mb-3">Aktive Aufgaben</div>
        {tasks.map((task, index) => (
          <div 
            key={task.id}
            className={`flex items-center gap-2 p-1.5 sm:p-2 md:p-3 lg:p-4 bg-gray-50 rounded-md sm:rounded-lg border border-gray-200 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
              task.status === 'completed' ? 'bg-green-500' : 
              task.status === 'processing' ? 'bg-blue-500 animate-pulse' : 
              'bg-gray-500'
            }`}></div>
            <div className="flex-1">
              <div className="text-xs md:text-sm lg:text-sm text-gray-900 truncate">{task.name}</div>
              {task.status === 'processing' && (
                <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 md:h-2 lg:h-2 mt-0.5 sm:mt-1">
                  <div 
                    className="bg-blue-500 h-1 sm:h-1.5 md:h-2 lg:h-2 rounded-full transition-all duration-300"
                    style={{width: `${task.progress}%`}}
                  ></div>
                </div>
              )}
            </div>
            {task.status === 'completed' && (
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Status - Hidden on mobile, visible on larger screens */}
      <div className="hidden sm:block mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600">Systemstatus</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm lg:text-xs text-green-600">Betriebsbereit</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Cost Reduction Dashboard Component
const CostDashboard: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const chartData = [
    { month: 'Jan', cost: 100 },
    { month: 'Feb', cost: 85 },
    { month: 'Mar', cost: 70 },
    { month: 'Apr', cost: 55 },
    { month: 'May', cost: 40 },
    { month: 'Jun', cost: 25 }
  ]

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[480px] lg:max-w-lg aspect-square bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden p-3 sm:p-4 md:p-8 lg:p-8">
      {/* Header - Mobile optimized */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-gray-900 text-xs sm:text-sm md:text-lg lg:text-sm font-medium">Kostenreduktion</span>
        </div>
        <div className="text-xs md:text-sm lg:text-xs text-gray-400">6 Monate</div>
      </div>

      {/* Metrics Cards - Mobile first */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-0.5 sm:mb-1 md:mb-2">Kostenreduktion</div>
          <div className="text-base sm:text-lg md:text-2xl lg:text-xl font-bold text-red-600">
            <AnimatedCounter end={30} suffix="%" />
          </div>
          <div className="text-xs md:text-sm lg:text-xs text-red-600 flex items-center gap-1 truncate">
            <ArrowDown className="w-3 h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 flex-shrink-0" />
            <span className="truncate">vs. Ausgangsposition</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-0.5 sm:mb-1 md:mb-2">Monatliche Ersparnisse</div>
          <div className="text-base sm:text-lg md:text-2xl lg:text-xl font-bold text-green-600">
            <AnimatedCounter end={28} suffix="'000 CHF" />
          </div>
          <div className="text-xs md:text-sm lg:text-xs text-green-600 truncate">pro Monat</div>
        </div>
      </div>

      {/* Visual Cost Trend - Mobile optimized */}
      <div className="flex-grow flex flex-col">
        <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-1 sm:mb-2 md:mb-3">Betriebskosten im Laufe der Zeit</div>
        <div className="relative bg-gray-50 rounded-lg border border-gray-200 p-2 sm:p-3 md:p-4 flex-grow min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[160px]">
          <svg className="w-full h-full" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="costGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.2" />
              </linearGradient>
              <pattern id="grid" width="40" height="16" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 16" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>

            {/* Subtle grid lines */}
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.2" />

            {/* Fill area - responsive */}
            <polygon
              fill="url(#costGradient)"
              points={`20,80 ${chartData.map((point, index) =>
                `${20 + (index / (chartData.length - 1)) * 240},${80 - (point.cost * 0.6)}`
              ).join(' ')} 260,80`}
              className={`transition-all duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Cost reduction line - thinner for mobile */}
            <polyline
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              points={chartData.map((point, index) =>
                `${20 + (index / (chartData.length - 1)) * 240},${80 - (point.cost * 0.6)}`
              ).join(' ')}
              className={`transition-all duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Data points - smaller for mobile */}
            {chartData.map((point, index) => (
              <circle
                key={index}
                cx={20 + (index / (chartData.length - 1)) * 240}
                cy={80 - (point.cost * 0.6)}
                r="3"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
                className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Bottom Status - Compact */}
      <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600">Verfolgungszeitraum</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-2 lg:h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm lg:text-xs text-red-600">Aktiv</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Competitor {
  name: string;
  score: number;
}

// Competition Dashboard Component
const CompetitionDashboard: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const competitors = [
    { name: "Ihr Unternehmen", score: 95 },
    { name: "Konkurrent A", score: 68 },
    { name: "Konkurrent B", score: 62 }
  ]

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[480px] lg:max-w-lg aspect-square bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-xl sm:shadow-2xl overflow-hidden p-3 sm:p-4 md:p-8 lg:p-8">
      {/* Header - Mobile optimized */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-900 text-xs sm:text-sm md:text-lg lg:text-sm font-medium truncate">Wettbewerbsanalyse</span>
        </div>
        <div className="text-xs md:text-sm lg:text-xs text-gray-400">Echtzeit</div>
      </div>

      {/* Key Metrics - Mobile first */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-0.5 sm:mb-1 md:mb-2 truncate">Leistungsvorteil</div>
          <div className="text-base sm:text-lg md:text-2xl lg:text-xl font-bold text-green-600">
            <AnimatedCounter end={27} suffix="%" />
          </div>
          <div className="text-xs md:text-sm lg:text-xs text-green-600 flex items-center gap-1 truncate">
            <ArrowUp className="w-3 h-3 md:w-4 md:h-4 lg:w-3 lg:h-3 flex-shrink-0" />
            <span className="truncate">vs. nächster</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 sm:p-3 md:p-4 border border-gray-200">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-0.5 sm:mb-1 md:mb-2">Marktposition</div>
          <div className="text-base sm:text-lg md:text-2xl lg:text-xl font-bold text-blue-600">
            #1
          </div>
          <div className="text-xs md:text-sm lg:text-xs text-blue-600 truncate">Branchenführer</div>
        </div>
      </div>

      {/* Performance Comparison Chart - Mobile optimized */}
      <div className="space-y-2 flex-grow flex flex-col">
        <div className="text-xs md:text-sm lg:text-xs text-gray-600 mb-1 sm:mb-2 md:mb-3">Leistungsvergleich</div>
        <div className="relative flex-grow bg-gray-50 rounded-lg border border-gray-200 p-2 sm:p-3 md:p-4 min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[160px]">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-4 h-full flex flex-col justify-center">
            {competitors.map((comp, index) => (
              <div key={comp.name} className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-xs sm:text-sm md:text-base lg:text-sm font-semibold truncate flex-1 mr-2 ${
                    comp.name === "Ihr Unternehmen" ? "text-green-600" : "text-gray-600"
                  }`}>
                    {comp.name}
                  </span>
                  <span className={`text-xs sm:text-sm md:text-base lg:text-sm font-bold flex-shrink-0 ${
                    comp.name === "Ihr Unternehmen" ? "text-green-600" : "text-gray-600"
                  }`}>
                    {comp.score}%
                  </span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-2 sm:h-2.5 md:h-3 lg:h-3">
                  <div
                    className={"h-2 sm:h-2.5 md:h-3 lg:h-3 rounded-full transition-all duration-1000 " + (
                      comp.name === "Ihr Unternehmen"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    )}
                    style={{
                      width: isVisible ? `${comp.score}%` : '0%',
                      transitionDelay: `${index * 300}ms`
                    }}
                  >
                    {comp.name === "Ihr Unternehmen" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/40 to-green-600/40 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {comp.name === "Ihr Unternehmen" && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 bg-green-500 rounded-full border-2 border-white">
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Status - Compact */}
      <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-xs md:text-sm lg:text-xs text-gray-600">Analysestatus</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs md:text-sm lg:text-xs text-green-600">Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const BenefitsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [headlineVisible, setHeadlineVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const benefitRefs = useRef<(HTMLDivElement | null)[]>([])

  const benefits = [
    {
      icon: Zap,
      title: "Beschleunigen Sie jeden Workflow",
      description: "Unsere Automatisierungssysteme bearbeiten Aufgaben sofort, von E-Mails über Lead-Verwaltung bis hin zum Support. Dies ermöglicht Ihrem Team, schneller zu arbeiten, konzentriert zu bleiben und ohne zusätzliche Mühe mehr zu erreichen.",
      features: [
        "Sofortige Aufgabenverarbeitung",
        "E-Mail-Automatisierung",
        "Lead-Verwaltung",
        "24/7 Support-Bearbeitung"
      ],
      dashboard: TaskDashboard
    },
    {
      icon: DollarSign,
      title: "Reduzieren Sie Betriebskosten",
      description: "Automatisierte Workflows eliminieren die Notwendigkeit manueller Eingaben und repetitiver Prozesse. Dies bedeutet weniger Fehler, niedrigere Gemeinkosten und mehr Raum, um in Ihr Geschäftswachstum zu reinvestieren.",
      features: [
        "Niedrigere Gemeinkosten",
        "Weniger menschliche Fehler",
        "Automatisierte Prozesse",
        "Bessere ROI"
      ],
      dashboard: CostDashboard
    },
    {
      icon: TrendingUp,
      title: "Bleiben Sie wettbewerbsfähig",
      description: "KI-Adoption ist nicht länger optional. Unternehmen, die Automatisierung heute nutzen, werden morgen ihre Branchen anführen, während andere Gefahr laufen, zurückzubleiben.",
      features: [
        "Branchenführerschaft",
        "Zukunftssichere Lösungen",
        "Wettbewerbsvorteil",
        "Skalierbares Wachstum"
      ],
      dashboard: CompetitionDashboard
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHeadlineVisible(true)
        }
      },
      { 
        threshold: 0.1,
        // Trigger animation earlier - 150px before section enters viewport
        rootMargin: '150px 0px -50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      benefitRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveIndex(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-8 sm:py-12 md:py-20 lg:py-20 px-4 overflow-hidden flex flex-col justify-center text-gray-900"
      style={{
        background: 'linear-gradient(to bottom, #1e3a8a 0%, #87CEEB 50%, #1e3a8a 100%)'
      }}
    >
      {/* Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px sm:50px 50px md:60px 60px'
        }}></div>
        
        {/* Responsive floating orbs */}
        <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-blue-400/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-12 left-6 sm:bottom-20 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-400/8 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-300/8 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          {/* Mobile Header (up to lg breakpoint) */}
          <div className="block lg:hidden">
            <h2 className={"text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight transition-all duration-800 ease-out " + (
              headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}>
              Erreichen Sie mehr
              <br />
              mit
              <span className="text-white">
                weniger Aufwand
              </span>
            </h2>
            <p className={"text-sm sm:text-base md:text-xl text-white/90 max-w-xs sm:max-w-sm md:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4 md:px-8 transition-all duration-800 delay-200 ease-out " + (
              headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <span className="block sm:hidden">
                Ersetzen Sie repetitive Aufgaben durch KI-Automatisierung. Erhalten Sie messbare Ergebnisse vom ersten Tag an.
              </span>
              <span className="hidden sm:block md:hidden">
                Ersetzen Sie repetitive Aufgaben durch KI und gewinnen Sie Zeit für echtes Wachstum. Unsere Automatisierungslösungen liefern messbare Ergebnisse.
              </span>
              <span className="hidden md:block">
                Ersetzen Sie repetitive Aufgaben durch KI und gewinnen Sie Zeit für echtes Wachstum. Unsere Automatisierungslösungen liefern messbare Ergebnisse vom ersten Tag an.
              </span>
            </p>
          </div>
          
          {/* Desktop Header (lg breakpoint and above) */}
          <h2 className={"hidden lg:block text-6xl font-bold mb-6 text-white leading-tight transition-all duration-800 ease-out " + (
            headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            Erreichen Sie mehr
            <br />
            mit
            <span className="text-white">
              weniger Aufwand
            </span>
          </h2>

          {/* Desktop Subtitle (lg breakpoint and above) */}
          <p className={"hidden lg:block text-xl text-white/90 max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-200 ease-out " + (
            headlineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Ersetzen Sie repetitive Aufgaben durch KI und gewinnen Sie Zeit für echtes Wachstum.
            <br className="hidden md:block" />
            Unsere Automatisierungslösungen liefern messbare Ergebnisse vom ersten Tag an.
          </p>
        </div>

        {/* Benefits Stack - Responsive spacing */}
        <div className="space-y-16 sm:space-y-24 md:space-y-40 lg:space-y-48">
          {benefits.map((benefit, index) => {
            const DashboardComponent = benefit.dashboard
            return (
              <div 
                key={index}
                ref={(el) => (benefitRefs.current[index] = el)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-12 items-center"
              >
                {/* Benefit Content - Mobile first, then desktop */}
                <div className={"relative p-3 sm:p-4 md:p-8 lg:p-8 transition-all duration-500 " + (
                  activeIndex === index 
                    ? 'text-white' 
                    : 'text-white/70'
                ) + " opacity-100 translate-x-0"} 
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isVisible ? 1 : 0
                }}>
                  <div className="flex items-start gap-3 sm:gap-4 md:gap-8">
                    {/* Responsive icon container with minimum touch target */}
                    <div className={"flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center transition-all duration-300 " + (
                      activeIndex === index 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/20'
                    )}>
                      <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-8 lg:h-8 text-blue-600" />
                    </div>
                    
                    <div className="flex-1">
                      {/* Responsive typography */}
                      <h3 className={"text-lg sm:text-xl md:text-3xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 transition-colors duration-300 " + (
                        activeIndex === index ? 'text-white' : 'text-white/70'
                      )}>
                        {benefit.title}
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base md:text-xl lg:text-lg leading-relaxed mb-3 sm:mb-4 md:mb-6">
                        {benefit.description}
                      </p>
                      
                      {/* Feature list - responsive grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                        {benefit.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex} 
                            className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-sm text-white/70"
                          >
                            <div className={"w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-2 lg:h-2 rounded-full transition-colors duration-300 " + (
                              activeIndex === index ? 'bg-white' : 'bg-white/50'
                            )}></div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {activeIndex === index && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 md:w-1.5 lg:w-1 bg-gradient-to-b from-white to-white/80 rounded-r-full"></div>
                  )}
                </div>

                {/* Dashboard - Responsive positioning and sizing */}
                <div className={"flex justify-center items-center transition-all duration-700 " + (
                  activeIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                )} 
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? (activeIndex === index ? 1 : 0.4) : 0
                }}>
                  <div className="relative w-full flex justify-center px-2 sm:px-4 lg:px-0">
                    <DashboardComponent isVisible={isVisible && activeIndex === index} />
                    
                    {/* Floating Elements - Responsive sizing */}
                    {activeIndex === index && (
                      <>
                        <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full animate-ping"></div>
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-white/40 rounded-full animate-pulse delay-300"></div>
                        <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-full blur-sm"></div>
                        <div className="absolute top-1/2 -right-1 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-white/30 rounded-full animate-ping delay-500"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}