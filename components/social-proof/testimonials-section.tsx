'use client';

import { useState, useEffect } from 'react';
import { Testimonial, TestimonialProps } from '@/types/testimonials';

// Sample testimonials data (in production, fetch from CMS or API)
const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "KHESED-TEK transformó completamente nuestra gestión. Los donantes ahora pueden contribuir fácilmente en línea, y nuestros reportes son increíbles.",
    author: "Pastor Carlos Mendoza",
    position: "Pastor Principal",
    organization: "Iglesia Nueva Vida",
    location: "Barranquilla, Colombia",
    metrics: "Aumentó donaciones 45%",
    impact: {
      metric: "Donaciones en línea",
      value: "45%",
      description: "incremento en 6 meses"
    },
    featured: true,
    market: 'LATAM',
    language: 'es'
  },
  {
    id: 'testimonial-2',
    quote: "The member management system is intuitive and powerful. Our church staff saved 20 hours per week on administrative tasks.",
    author: "Pastor Michael Rodriguez",
    position: "Lead Pastor",
    organization: "Grace Community Church",
    location: "Miami, FL",
    metrics: "Saved 20 hours/week",
    impact: {
      metric: "Time Savings",
      value: "20 hrs",
      description: "per week on admin tasks"
    },
    market: 'USA',
    language: 'en'
  },
  {
    id: 'testimonial-3',
    quote: "La plataforma es muy fácil de usar y el soporte técnico en español es excelente. Nuestros voluntarios aprendieron rápidamente.",
    author: "Hermana María González",
    position: "Coordinadora Administrativa",
    organization: "Iglesia San Pablo",
    location: "Medellín, Colombia",
    metrics: "100% adopción del equipo",
    impact: {
      metric: "Adopción",
      value: "100%",
      description: "del equipo en 2 semanas"
    },
    market: 'LATAM',
    language: 'es'
  },
  {
    id: 'testimonial-4',
    quote: "Outstanding multi-campus support. We can manage 5 locations seamlessly and the financial reporting is comprehensive.",
    author: "Pastor David Chen",
    position: "Executive Pastor",
    organization: "City Life Church",
    location: "Houston, TX",
    metrics: "5 campus integration",
    impact: {
      metric: "Campus Management",
      value: "5",
      description: "locations unified"
    },
    market: 'USA',
    language: 'en'
  },
  {
    id: 'testimonial-5',
    quote: "El sistema de eventos nos ayudó a organizar mejor nuestras actividades. La asistencia a eventos aumentó significativamente.",
    author: "Pastor Luis Ramírez",
    position: "Pastor de Jóvenes",
    organization: "Iglesia El Camino",
    location: "Cali, Colombia",
    metrics: "60% más asistencia",
    impact: {
      metric: "Asistencia",
      value: "60%",
      description: "más participación en eventos"
    },
    market: 'LATAM',
    language: 'es'
  }
];

export default function TestimonialsSection({ 
  testimonials = SAMPLE_TESTIMONIALS,
  autoRotate = true,
  rotationInterval = 6000,
  showMetrics = true,
  showPhotos = false,
  variant = 'carousel',
  className = ""
}: TestimonialProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);

  // Auto-rotation logic
  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [isPlaying, testimonials.length, rotationInterval]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {currentTestimonial.language === 'es' 
              ? 'Lo que dicen nuestros clientes' 
              : 'What our clients say'
            }
          </h2>
          <p className="text-[var(--muted)] text-lg">
            {currentTestimonial.language === 'es'
              ? 'Historias reales de transformación digital en iglesias'
              : 'Real stories of digital transformation in churches'
            }
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="card p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 pointer-events-none" />
            
            {/* Quote Icon */}
            <div className="relative mb-6">
              <div className="text-6xl text-[var(--brand)] opacity-20 font-serif">"</div>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 text-[var(--text)]">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Impact Metrics */}
              {showMetrics && currentTestimonial.impact && (
                <div className="mb-6 p-4 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {currentTestimonial.impact.value}
                  </div>
                  <div className="text-sm text-[var(--muted)]">
                    {currentTestimonial.impact.description}
                  </div>
                </div>
              )}

              {/* Author Information */}
              <div className="space-y-2">
                <div className="font-semibold text-lg text-[var(--text)]">
                  {currentTestimonial.author}
                </div>
                <div className="text-[var(--muted)]">
                  {currentTestimonial.position}
                </div>
                <div className="text-[var(--brand)] font-medium">
                  {currentTestimonial.organization}
                </div>
                {currentTestimonial.location && (
                  <div className="text-sm text-[var(--muted)]">
                    📍 {currentTestimonial.location}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <>
              {/* Previous/Next Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition flex items-center justify-center text-[var(--text)] hover:text-[var(--brand)] pointer-events-auto"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--brand)] transition flex items-center justify-center text-[var(--text)] hover:text-[var(--brand)] pointer-events-auto"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentIndex
                        ? 'bg-[var(--brand)]'
                        : 'bg-[var(--border)] hover:bg-[var(--brand)]/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Play/Pause Control */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-sm text-[var(--muted)] hover:text-[var(--brand)] transition"
                >
                  {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Trust Statistics */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">200+</div>
            <div className="text-sm text-[var(--muted)]">
              {currentTestimonial.language === 'es' ? 'Iglesias confían en nosotros' : 'Churches trust us'}
            </div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-sm text-[var(--muted)]">
              {currentTestimonial.language === 'es' ? 'Tiempo de actividad' : 'Uptime guarantee'}
            </div>
          </div>
          <div className="text-center p-6 card">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-sm text-[var(--muted)]">
              {currentTestimonial.language === 'es' ? 'Soporte técnico' : 'Technical support'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}