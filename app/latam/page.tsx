'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';

export default function LatamMarketPage() {
  const { market, language } = useGlobalMarket();
  
  const heroVariant = useABTest(HERO_HEADLINE_TEST, 'LATAM');
  const ctaVariant = useABTest(CTA_BUTTON_TEST, 'LATAM');
  
  const heroText = getVariantContent(HERO_HEADLINE_TEST, heroVariant, 'es', HERO_HEADLINE_CONTENT);
  const ctaText = getVariantContent(CTA_BUTTON_TEST, ctaVariant, 'es', CTA_BUTTON_CONTENT);

  const handleCTAClick = () => {
    trackCTAClick('latam_hero_section', ctaText);
    trackABTestConversion(CTA_BUTTON_TEST.testId, ctaVariant, 'cta_click', 'LATAM');
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* LATAM-Specific Hero Section */}
      <section
        className="relative overflow-hidden text-center px-6 py-24"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(110,231,255,.07), transparent 60%), radial-gradient(900px 300px at 90% -20%, rgba(139,92,246,.08), transparent 55%), var(--bg)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-sm uppercase tracking-wide text-[var(--brand)] mb-4">
            🇨🇴 Mercado LATAM - Especialistas en Colombia
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {heroText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            KHESED-TEK SYSTEMS presenta KHESED-TEK-CMS: nuestro sistema de gestión integral 
            diseñado específicamente para iglesias colombianas. Más de 50 congregaciones en 
            Barranquilla ya confían en nuestra solución.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition"
              onClick={handleCTAClick}
            >
              {ctaText}
            </a>
            <a
              href="https://wa.me/573021234410"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition"
              onClick={() => trackCTAClick('latam_whatsapp', 'WhatsApp directo')}
            >
              ▣ WhatsApp directo
            </a>
          </div>
          <div className="text-sm text-[var(--muted)]">
            ● Soporte en horario colombiano (COT) • ◆ Atención en español • ▣ Especialistas en iglesias
          </div>
        </div>
      </section>

      {/* LATAM-Specific Features */}
      <section id="features" className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-12">
        {[
          { 
            pill: 'WhatsApp', 
            title: 'Integración nativa con WhatsApp', 
            desc: 'Conecta directamente con tu congregación a través de la plataforma favorita en Colombia.',
            icon: '▣'
          },
          { 
            pill: 'Pagos Locales', 
            title: 'Diezmos y ofrendas en COP', 
            desc: 'PSE, Bancolombia, Efecty y transferencias locales para facilitar las donaciones.',
            icon: '◆'
          },
          { 
            pill: 'Soporte Local', 
            title: 'Equipo en Barranquilla', 
            desc: 'Atención personalizada en tu zona horaria con comprensión de la cultura local.',
            icon: '●'
          },
          { 
            pill: 'Eventos', 
            title: 'Gestión de cultos y actividades', 
            desc: 'Organiza servicios, células, retiros y eventos especiales de manera eficiente.',
            icon: '◗'
          },
          { 
            pill: 'Membresía', 
            title: 'Base de datos de miembros', 
            desc: 'Registro completo de congregación con historial de participación y crecimiento.',
            icon: '◉'
          },
          { 
            pill: 'Multimedia', 
            title: 'Transmisiones en vivo', 
            desc: 'Streaming integrado para cultos virtuales y alcance de nuevas audiencias.',
            icon: '▢'
          },
        ].map((f) => (
          <div className="card p-6 hover:-translate-y-1 transition" key={f.title}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{f.icon}</span>
              <span
                className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border inline-block"
                style={{ background: '#1f1f23', borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                {f.pill}
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-3 mb-1">{f.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Colombian Church Success Stories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Iglesias que ya confían en nosotros</h2>
          <p style={{ color: 'var(--muted)' }}>
            Casos de éxito reales en el territorio colombiano
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              church: "Iglesia Central Barranquilla",
              location: "Barranquilla, Atlántico", 
              members: "1,200+ miembros",
              result: "500% aumento en participación digital",
              quote: "KHESED-TEK transformó nuestra manera de conectar con la congregación.",
              pastor: "Pastor Miguel Rodríguez"
            },
            {
              church: "Ministerio Cristiano Vida",
              location: "Soledad, Atlántico",
              members: "800+ miembros", 
              result: "300% mejora en gestión de diezmos",
              quote: "La plataforma simplificó completamente nuestra administración.",
              pastor: "Pastora Ana Martínez"
            },
            {
              church: "Chiesa Evangelica",
              location: "Malambo, Atlántico",
              members: "500+ miembros",
              result: "200% crecimiento en nuevos miembros", 
              quote: "El sistema nos permitió expandir nuestro alcance ministerial.",
              pastor: "Pastor Carlos Ruiz"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{testimonial.church}</h4>
                <div className="text-sm text-[var(--muted)] mb-2">
                  ▪ {testimonial.location} • ◉ {testimonial.members}
                </div>
                <div className="text-sm font-medium text-[var(--brand)]">
                  📈 {testimonial.result}
                </div>
              </div>
              <blockquote className="italic text-[var(--muted)] mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm">
                — {testimonial.pastor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATAM Pricing Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-4">Planes adaptados al mercado colombiano</h2>
        <p className="text-[var(--muted)] mb-8">
          Precios justos en pesos colombianos con métodos de pago locales
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              name: "Iglesia Pequeña",
              price: "$299,000 COP",
              period: "/mes",
              members: "Hasta 200 miembros",
              features: ["Gestión básica de miembros", "WhatsApp integrado", "Soporte en español", "Pagos PSE"]
            },
            {
              name: "Iglesia Mediana", 
              price: "$599,000 COP",
              period: "/mes",
              members: "Hasta 1,000 miembros",
              features: ["Todo lo anterior", "Eventos y actividades", "Reportes avanzados", "Transmisiones en vivo"],
              popular: true
            },
            {
              name: "Iglesia Grande",
              price: "$999,000 COP", 
              period: "/mes",
              members: "Miembros ilimitados",
              features: ["Todo lo anterior", "Multi-campus", "API personalizada", "Soporte prioritario"]
            }
          ].map((plan, idx) => (
            <div key={idx} className={`card p-6 ${plan.popular ? 'border-[var(--brand)] shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-[var(--brand)] text-black text-xs font-bold px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold gradient-text mb-1">
                  {plan.price}<span className="text-sm text-[var(--muted)]">{plan.period}</span>
                </div>
                <div className="text-sm text-[var(--muted)]">{plan.members}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={`block text-center font-semibold px-4 py-2 rounded-lg transition ${
                  plan.popular 
                    ? 'gradient-btn text-black' 
                    : 'border border-[var(--border)] hover:border-[var(--brand)]'
                }`}
                onClick={() => trackCTAClick('latam_pricing', `Plan ${plan.name}`)}
              >
                Solicitar demo
              </a>
            </div>
          ))}
        </div>

        <div className="text-sm text-[var(--muted)]">
          ◆ Acepta PSE, Bancolombia, Efecty y transferencias • ● Soporte telefónico incluido
        </div>
      </section>

      {/* About Section - Nosotros */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">Sobre KHESED-TEK SYSTEMS</h2>
        <p style={{ color: 'var(--muted)' }} className="text-lg mb-8">
          Somos una empresa colombiana especializada en tecnología para iglesias. Desarrollamos 
          KHESED-TEK-CMS, nuestro sistema de gestión integral diseñado específicamente para 
          congregaciones latinoamericanas. Esta página web promociona nuestro producto principal.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">50+</div>
            <div className="text-sm text-[var(--muted)]">Iglesias atendidas en Colombia</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">5+</div>
            <div className="text-sm text-[var(--muted)]">Años especializados en iglesias</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">24/7</div>
            <div className="text-sm text-[var(--muted)]">Soporte en español</div>
          </div>
        </div>
      </section>

      {/* Local Contact Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-2">Conversemos sobre tu iglesia</h2>
        <p style={{ color: 'var(--muted)' }} className="mb-8">
          Nuestro equipo en Barranquilla está listo para ayudarte a transformar tu ministerio
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">▣ Contacto directo</h3>
            <div className="space-y-2 text-sm">
              <div>✉ soporte@khesed-tek-systems.org</div>
              <div>▣ +57 302 123 4410 (WhatsApp)</div>
              <div>◗ Barranquilla, Atlántico, Colombia</div>
              <div>● Lunes a Viernes 8AM - 6PM (COT)</div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">◆ Demo personalizada</h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div>✓ Demostración adaptada a tu iglesia</div>
              <div>✓ Análisis de necesidades sin costo</div>
              <div>✓ Plan de implementación personalizado</div>
              <div>✓ Acompañamiento en tu zona horaria</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}