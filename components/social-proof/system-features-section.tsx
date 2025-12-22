'use client';

import { useState, useEffect } from 'react';
import OutlineIcon from '@/components/ui/outline-icon';

// System Features Data - Real capabilities of KHESED-TEK-CMS
interface SystemFeature {
  id: string;
  title: string;
  description: string;
  benefit: string;
  icon: string;
  metrics?: string;
  language: 'es' | 'en';
}

const SYSTEM_FEATURES: SystemFeature[] = [
  // Spanish Features (LATAM Market)
  {
    id: 'feature-prayer-wall',
    title: "Muro de Oración Inteligente",
    description: "Aplicación Web Progresiva (AWP) que notifica a intercesores en tiempo real sobre peticiones urgentes, con analítica de las necesidades espirituales de su congregación.",
    benefit: "Seguimiento pastoral 24/7 automatizado con notificaciones instantáneas",
    icon: 'heart',
    metrics: "Notificaciones en tiempo real",
    language: 'es'
  },
  {
    id: 'feature-predictive-analytics',
    title: "Centro de Analíticas Predictiva",
    description: "Inteligencia Artificial que avisa cuando algún miembro se aleja, permitiendo a las personas encargadas actuar a tiempo antes de perder ovejas.",
    benefit: "Prevención proactiva de deserción ministerial",
    icon: 'trending-up',
    metrics: "Alertas tempranas de IA",
    language: 'es'
  },
  {
    id: 'feature-whatsapp-integration',
    title: "WhatsApp Empresarial Integrado",
    description: "Primer ChMS con WhatsApp Business completamente integrado. Comunicación directa, automatizada y personalizada con toda su congregación.",
    benefit: "Comunicación pastoral directa en la plataforma favorita de Colombia",
    icon: 'message-circle',
    metrics: "Primera integración completa en LATAM",
    language: 'es'
  },
  {
    id: 'feature-volunteer-matching',
    title: "Voluntariado Inteligente con IA",
    description: "Emparejamiento inteligente de voluntarios con ministerios basado en dones espirituales. Nuestro algoritmo conecta personas con el ministerio perfecto.",
    benefit: "Optimización de recursos ministeriales según dones espirituales",
    icon: 'users',
    metrics: "Matching basado en dones espirituales",
    language: 'es'
  },
  {
    id: 'feature-automation',
    title: "Automatización Administrativa",
    description: "Libere a su equipo de cientos de horas anuales en tareas administrativas. Sistema automatizado 24/7 para enfocarse en amar personas y hacer discípulos.",
    benefit: "90%+ reducción en tiempo administrativo comprobado",
    icon: 'zap',
    metrics: "Ahorro del 90% en administración",
    language: 'es'
  },
  {
    id: 'feature-security',
    title: "Seguridad Empresarial",
    description: "Todos los datos encriptados en tránsito y en reposo, múltiples auditorías de seguridad y cumplimiento con regulaciones internacionales de protección de datos.",
    benefit: "Protección total de información sensible de la iglesia",
    icon: 'shield',
    metrics: "Encriptación completa garantizada",
    language: 'es'
  },
  // English Features (USA/Global Markets)
  {
    id: 'feature-prayer-wall-en',
    title: "Smart Prayer Wall",
    description: "Progressive Web App (PWA) that notifies intercessors in real-time about urgent requests, with analytics on your congregation's spiritual needs.",
    benefit: "24/7 automated pastoral follow-up with instant notifications",
    icon: 'heart',
    metrics: "Real-time notifications",
    language: 'en'
  },
  {
    id: 'feature-predictive-analytics-en',
    title: "Predictive Analytics Center",
    description: "Artificial Intelligence that alerts when members are drifting away, allowing responsible staff to act in time before losing sheep.",
    benefit: "Proactive prevention of ministerial attrition",
    icon: 'trending-up',
    metrics: "AI early warning alerts",
    language: 'en'
  },
  {
    id: 'feature-whatsapp-integration-en',
    title: "WhatsApp Business Integration",
    description: "First ChMS with fully integrated WhatsApp Business. Direct, automated, and personalized communication with your entire congregation.",
    benefit: "Direct pastoral communication on Colombia's favorite platform",
    icon: 'message-circle',
    metrics: "First complete integration in LATAM",
    language: 'en'
  },
  {
    id: 'feature-volunteer-matching-en',
    title: "AI-Powered Volunteer Matching",
    description: "Smart pairing of volunteers with ministries based on spiritual gifts. Our algorithm connects people with the perfect ministry role.",
    benefit: "Ministry resource optimization based on spiritual gifts",
    icon: 'users',
    metrics: "Spiritual gifts-based matching",
    language: 'en'
  },
  {
    id: 'feature-automation-en',
    title: "Administrative Automation",
    description: "Free your team from hundreds of annual hours in administrative tasks. 24/7 automated system to focus on loving people and making disciples.",
    benefit: "90%+ proven reduction in administrative time",
    icon: 'zap',
    metrics: "90% administration time savings",
    language: 'en'
  },
  {
    id: 'feature-security-en',
    title: "Enterprise Security",
    description: "All data encrypted in transit and at rest, multiple security audits and compliance with international data protection regulations.",
    benefit: "Complete protection of sensitive church information",
    icon: 'shield',
    metrics: "Complete encryption guaranteed",
    language: 'en'
  }
];

export interface SystemFeatureProps {
  autoRotate?: boolean;
  rotationInterval?: number;
  showMetrics?: boolean;
  variant?: 'carousel' | 'grid';
  className?: string;
}

export default function SystemFeaturesSection({
  autoRotate = true,
  rotationInterval = 6000,
  showMetrics = true,
  variant = 'carousel',
  className = ""
}: SystemFeatureProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);
  
  // Detect language from URL
  const isEnglish = typeof window !== 'undefined' && (
    window.location.pathname.includes('/usa') || 
    window.location.pathname.includes('/global')
  );
  
  // Filter features based on language
  const languageFeatures = SYSTEM_FEATURES.filter(feature => 
    feature.language === (isEnglish ? 'en' : 'es')
  );
  
  const currentFeature = languageFeatures[currentIndex];

  // Auto-rotation effect
  useEffect(() => {
    if (!isPlaying || languageFeatures.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % languageFeatures.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [isPlaying, rotationInterval, languageFeatures.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? languageFeatures.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % languageFeatures.length);
  };

  if (!currentFeature) return null;

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {isEnglish 
              ? 'System Features' 
              : 'Características del Sistema'
            }
          </h2>
          <p className="text-[var(--muted)] text-lg">
            {isEnglish 
              ? 'Real KHESED-TEK-CMS features designed for ministries'
              : 'Funcionalidades reales de KHESED-TEK-CMS diseñadas para ministerios'
            }
          </p>
        </div>

        {/* Feature Carousel */}
        <div className="relative">
          <div className="card p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 pointer-events-none" />
            
            {/* Feature Icon */}
            <div className="relative mb-6">
              <div className="w-16 h-16 mx-auto bg-[var(--brand)]/10 rounded-full flex items-center justify-center">
                <OutlineIcon name={currentFeature.icon} className="w-8 h-8 text-[var(--brand)]" />
              </div>
            </div>

            {/* Feature Content */}
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 gradient-text">
                {currentFeature.title}
              </h3>
              
              <p className="text-lg leading-relaxed mb-6 text-[var(--muted)] max-w-2xl mx-auto">
                {currentFeature.description}
              </p>

              {/* Feature Metrics */}
              {showMetrics && currentFeature.metrics && (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-[var(--brand)]/10 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-medium">
                    <OutlineIcon name="zap" className="w-4 h-4" />
                    <span>{currentFeature.metrics}</span>
                  </div>
                </div>
              )}

              {/* Key Benefit */}
              <div className="p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)] max-w-xl mx-auto">
                <div className="text-sm font-medium text-[var(--text)] flex items-center gap-2">
                  <OutlineIcon name="lightbulb" className="w-4 h-4 text-[var(--brand)]" />
                  <strong className="text-[var(--brand)]">{isEnglish ? 'Key benefit:' : 'Beneficio clave:'}</strong> {currentFeature.benefit}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {languageFeatures.length > 1 && (
            <>
              {/* Previous/Next Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition flex items-center justify-center text-[var(--text)] hover:text-[var(--brand)]"
                aria-label="Previous feature"
              >
                <OutlineIcon name="chevron-left" className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition flex items-center justify-center text-[var(--text)] hover:text-[var(--brand)]"
                aria-label="Next feature"
              >
                <OutlineIcon name="chevron-right" className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {languageFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentIndex
                        ? 'bg-[var(--brand)]'
                        : 'bg-[var(--border)] hover:bg-[var(--brand)]/50'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>

              {/* Play/Pause Control */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--brand)] transition"
                >
                  <OutlineIcon 
                    name={isPlaying ? "pause" : "play"} 
                    className="w-4 h-4"
                  />
                  <span>{isPlaying 
                    ? (isEnglish ? 'Pause' : 'Pausar')
                    : (isEnglish ? 'Play' : 'Reproducir')
                  }</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Trust Statistics */}
        <div className="grid sm:grid-cols-4 gap-4 mt-12">
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-sm text-[var(--muted)]">
              {isEnglish ? 'Members supported' : 'Miembros soportados'}
            </div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">40+</div>
            <div className="text-sm text-[var(--muted)]">
              {isEnglish ? 'Years in ministry' : 'Años en ministerios'}
            </div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-sm text-[var(--muted)]">
              {isEnglish ? 'Uptime guarantee' : 'Uptime garantizado'}
            </div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">15+</div>
            <div className="text-sm text-[var(--muted)]">
              {isEnglish ? 'Integrations' : 'Integraciones'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}