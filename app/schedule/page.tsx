import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agendar Videollamada Personal | KHESED-TEK SYSTEMS',
  description: 'Agenda una videollamada personal con el fundador de KHESED-TEK para conocer cómo nuestra solución puede transformar la gestión de su iglesia.',
  keywords: 'agendar, videollamada, reunión, demo personalizada, KHESED-TEK, gestión iglesias',
  openGraph: {
    title: 'Agendar Videollamada Personal | KHESED-TEK',
    description: 'Hable directamente con el fundador sobre las necesidades específicas de su iglesia',
    type: 'website',
  }
};

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
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
              {/* Calendar Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">
                  ¿Qué incluye la videollamada?
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[var(--brand)] text-xl">🎬</span>
                    <div>
                      <h3 className="font-semibold">Historia Personal</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Conozca el por qué detrás de KHESED-TEK y nuestra misión
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-[var(--brand)] text-xl">🏛️</span>
                    <div>
                      <h3 className="font-semibold">Análisis de Necesidades</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Evaluamos las necesidades específicas de su iglesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-[var(--brand)] text-xl">💡</span>
                    <div>
                      <h3 className="font-semibold">Demo Personalizada</h3>
                      <p className="text-[var(--muted)] text-sm">
                        Vea cómo KHESED-TEK se adapta a su congregación
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-[var(--brand)] text-xl">🤝</span>
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
                      <span>⏱️</span>
                      <span>Duración: 30-45 minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🌍</span>
                      <span>Timezone: Colombia (COT)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💻</span>
                      <span>Platform: Google Meet / Zoom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🗣️</span>
                      <span>Idioma: Español / English</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Calendar Embed - Clean Public View */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Seleccione Fecha y Hora
                </h2>
                
                {/* Professional Calendar Interface */}
                <div className="relative bg-[var(--surface)] rounded-lg overflow-hidden shadow-lg border border-[var(--border)] p-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl text-[var(--brand)]">📅</div>
                    <h3 className="text-lg font-semibold">Reserva Directa</h3>
                    <p className="text-[var(--muted)] text-sm">
                      Acceso directo al calendario personal • Sin intermediarios
                    </p>
                    
                    <a
                      href="https://calendar.app.google/g9RAUNXxSW6ii6476"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full gradient-btn text-black font-semibold py-4 px-6 rounded-lg hover:scale-105 transition"
                    >
                      🎯 ABRIR CALENDARIO DE RESERVAS
                    </a>
                    
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]">
                        <div className="text-[var(--brand)] mb-1">✅</div>
                        <div>Confirmación<br/>Automática</div>
                      </div>
                      <div className="bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]">
                        <div className="text-[var(--brand)] mb-1">📧</div>
                        <div>Email<br/>Recordatorios</div>
                      </div>
                      <div className="bg-[var(--bg)] rounded-lg p-3 border border-[var(--border)]">
                        <div className="text-[var(--brand)] mb-1">📱</div>
                        <div>Google Meet<br/>Incluido</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Availability Information */}
                <div className="bg-[var(--bg)] rounded-lg border border-[var(--border)] p-4 mt-4">
                  <h4 className="font-semibold mb-3 text-center text-[var(--brand)]">📍 Información de Disponibilidad</h4>
                  <div className="text-center text-[var(--muted)] text-sm space-y-1">
                    <div><span className="text-[var(--brand)]">🕐</span> <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (COT)</div>
                    <div><span className="text-[var(--brand)]">⏱️</span> <strong>Duración:</strong> 30-45 minutos</div>
                    <div><span className="text-[var(--brand)]">🗣️</span> <strong>Idiomas:</strong> Español • English</div>
                    <div><span className="text-[var(--brand)]">⚡</span> <strong>Confirmación:</strong> Menos de 5 minutos</div>
                  </div>
                </div>
                
                {/* Alternative Access Method */}
                <p className="text-xs text-[var(--muted)] text-center">
                  <span className="text-[var(--brand)]">✅</span> Reserva directa sin intermediarios • <span className="text-[var(--brand)]">📧</span> Recordatorios automáticos • <span className="text-[var(--brand)]">💻</span> Enlace Google Meet incluido
                </p>
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
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <span>📱</span>
              WhatsApp Directo
            </a>
            
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--brand)] px-6 py-3 rounded-lg transition font-medium"
            >
              <span>📧</span>
              Formulario de Contacto
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}