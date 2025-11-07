'use client';

import type { Metadata } from 'next';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 gradient-text">
            Agendar Videollamada Personal
          </h1>
          <p className="text-xl text-[var(--muted)] mb-4">
            Hable directamente con el fundador de KHESED-TEK
          </p>
          <p className="text-[var(--muted)] max-w-2xl mx-auto mb-12">
            Conozca la historia detrás de nuestra solución y descubra cómo podemos transformar 
            la gestión de su iglesia. Una conversación genuina, sin presión comercial.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendar Section - Mobile First */}
              <div className="space-y-4 md:order-2">
                <h2 className="text-2xl font-semibold">
                  Seleccione Fecha y Hora
                </h2>
                
                {/* Universal Calendar Interface */}
                <div className="relative bg-[var(--surface)] rounded-lg overflow-hidden shadow-lg border border-[var(--border)] p-6">
                  <div className="text-center space-y-4">
                    {/* Outline Calendar Icon */}
                    <div className="text-[var(--brand)] mx-auto w-12 h-12 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Agendar Ahora</h3>
                    <p className="text-[var(--muted)] text-sm">
                      Selecciona tu horario preferido y comencemos
                    </p>
                    
                    {/* Direct Calendar Access Button */}
                    <a
                      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2TjLq6iSHtShs9pUTLbHpoXfiYW4AqVB-RKl-y7Dy7trEKil4eDtG3SIuM7P6q6eLrAtmB8PPc?gv=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full gradient-btn text-black font-semibold py-4 px-6 rounded-lg hover:scale-105 transition text-center flex items-center justify-center gap-2"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      Programar una cita
                    </a>
                    
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]">
                        {/* Outline Check Icon */}
                        <div className="text-[var(--brand)] mb-1 w-5 h-5 mx-auto">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        </div>
                        <div>Confirmación<br/>Automática</div>
                      </div>
                      <div className="bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]">
                        {/* Outline Mail Icon */}
                        <div className="text-[var(--brand)] mb-1 w-5 h-5 mx-auto">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"></path>
                          </svg>
                        </div>
                        <div>Email<br/>Recordatorios</div>
                      </div>
                      <div className="bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]">
                        {/* Outline Video Icon */}
                        <div className="text-[var(--brand)] mb-1 w-5 h-5 mx-auto">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                          </svg>
                        </div>
                        <div>Google Meet<br/>Incluido</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Availability Information */}
                <div className="bg-[var(--bg)] rounded-lg border border-[var(--border)] p-4 mt-4">
                  <h4 className="font-semibold mb-3 text-center text-[var(--brand)] flex items-center justify-center gap-2">
                    {/* Outline Map Pin Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    Información de Disponibilidad
                  </h4>
                  <div className="text-center text-[var(--muted)] text-sm space-y-1">
                    <div className="flex items-center justify-center gap-2">
                      {/* Outline Clock Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                      </svg>
                      <span><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (COT)</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {/* Outline Timer Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 15,15"></polyline>
                      </svg>
                      <span><strong>Duración:</strong> 30-45 minutos</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {/* Outline Languages Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <path d="m5 8 6 6"></path>
                        <path d="m4 14 6-6 2-3"></path>
                        <path d="M2 5h12"></path>
                        <path d="M7 2h1"></path>
                        <path d="m22 22-5-10-5 10"></path>
                        <path d="M14 18h6"></path>
                      </svg>
                      <span><strong>Idiomas:</strong> Español • English</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      {/* Outline Zap Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
                      </svg>
                      <span><strong>Confirmación:</strong> Menos de 5 minutos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meeting Details - Desktop Second, Mobile Second */}
              <div className="space-y-6 md:order-1">
                <h2 className="text-2xl font-semibold mb-4">
                  ¿Qué incluye la videollamada?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {/* Outline Film Icon */}
                    <div className="text-[var(--brand)] text-xl mt-1 w-6 h-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Historia Personal</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Conozca el por qué detrás de KHESED-TEK y nuestra misión
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    {/* Outline Building Icon */}
                    <div className="text-[var(--brand)] text-xl mt-1 w-6 h-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 21 18 0"></path>
                        <path d="m5 21 0-16"></path>
                        <path d="m19 21 0-16"></path>
                        <path d="m9 21 0-16"></path>
                        <path d="M5 5l14 0"></path>
                        <path d="M5 9l14 0"></path>
                        <path d="M5 13l14 0"></path>
                        <path d="M5 17l14 0"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Análisis de Necesidades</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Evaluamos las necesidades específicas de su iglesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    {/* Outline Lightbulb Icon */}
                    <div className="text-[var(--brand)] text-xl mt-1 w-6 h-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                        <path d="M9 18h6"></path>
                        <path d="M10 22h4"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Demo Personalizada</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Vea cómo KHESED-TEK se adapta a su congregación
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    {/* Outline Handshake Icon */}
                    <div className="text-[var(--brand)] text-xl mt-1 w-6 h-6">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"></path>
                        <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path>
                        <path d="m2 13 6 6 3-3"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Próximos Pasos</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Definimos juntos el plan de implementación
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meeting Details */}
                <div className="border-t border-[var(--border)] pt-6 mt-6">
                  <h3 className="font-semibold mb-3">Detalles de la Reunión</h3>
                  <div className="space-y-2 text-sm text-[var(--muted)]">
                    <div className="flex items-center gap-2">
                      {/* Outline Timer Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 15,15"></polyline>
                      </svg>
                      <span>Duración: 30-45 minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Outline Globe Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                      <span>Timezone: Colombia (COT)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Outline Monitor Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      <span>Platform: Google Meet / Zoom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Outline Languages Icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                        <path d="m5 8 6 6"></path>
                        <path d="m4 14 6-6 2-3"></path>
                        <path d="M2 5h12"></path>
                        <path d="M7 2h1"></path>
                        <path d="m22 22-5-10-5 10"></path>
                        <path d="M14 18h6"></path>
                      </svg>
                      <span>Idioma: Español / English</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Alternative */}
      <section className="py-16 px-6 border-t border-[var(--border)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            ¿Prefiere Coordinar por WhatsApp?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Si prefiere coordinar la reunión de manera más personal, 
            puede contactarnos directamente por WhatsApp.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573021234410?text=Hola,%20me%20gustaría%20agendar%20una%20videollamada%20para%20conocer%20KHESED-TEK"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              {/* Outline Phone Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              WhatsApp Directo
            </a>
            
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--brand)] px-6 py-3 rounded-lg transition font-medium"
            >
              {/* Outline Mail Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4 4 7.07 17 2.51-7.39L21 11.07z"></path>
              </svg>
              Formulario de Contacto
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}