'use client';
import { useState } from 'react';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick, trackServiceView } from '@/lib/analytics';
import AnimatedPricingCard from '@/components/pricing/animated-pricing-card';
import FeatureComparisonTable from '@/components/pricing/feature-comparison';
import { PricingPlan } from '@/types/pricing';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';
import SystemFeaturesSection from '@/components/social-proof/system-features-section';
import TrustSignalsSection, { TrustBadges } from '@/components/social-proof/trust-signals';
import ROICalculator from '@/components/conversion/roi-calculator';
import DemoVideoSection from '@/components/conversion/demo-video-section';
import OutlineIcon from '@/components/ui/outline-icon';

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
          <div className="text-sm uppercase tracking-wide text-[var(--brand)] mb-4 flex items-center justify-center gap-2">
            <OutlineIcon name="globe" className="w-4 h-4 text-cyan-400" />
            <span>Mercado LATAM - Especialistas en mercado hispano</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {heroText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            En KHESED-TEK SYSTEMS, convergen la vanguardia tecnológica y el propósito divino. 
            Nuestra solución insignia, KHESED-TEK-CMS, nace de una convicción profunda: el software 
            no es el fin, sino el medio estratégico para potenciar el cumplimiento de La Gran Comisión.
          </p>
          <p className="max-w-3xl mx-auto text-base mb-6 italic" style={{ color: 'var(--muted)' }}>
            Nuestra misión es dotar a su iglesia de Inteligencia Ministerial, facilitando el mandato 
            bíblico de Proverbios 27:23: "Sé diligente en conocer el estado de tus ovejas, y mira con 
            cuidado por tus rebaños".
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
              <OutlineIcon name="phone" className="w-4 h-4 text-[var(--brand)]" /> WhatsApp directo
            </a>
          </div>
          <div className="text-sm text-[var(--muted)] flex items-center gap-1">
            <OutlineIcon name="clock" className="w-4 h-4 text-[var(--brand)]" /> Soporte en horario LATAM <OutlineIcon name="dot" className="w-2 h-2 text-[var(--brand)] mx-1" /> <OutlineIcon name="mail" className="w-4 h-4 text-[var(--brand)]" /> Atención en español <OutlineIcon name="dot" className="w-2 h-2 text-[var(--brand)] mx-1" /> <OutlineIcon name="users" className="w-4 h-4 text-[var(--brand)]" /> Especialistas en iglesias
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <DemoVideoSection 
        market="LATAM" 
        language="es" 
        className="bg-[var(--surface)]"
      />

      {/* Trust Signals */}
      <TrustSignalsSection 
        market="LATAM" 
        className="bg-[var(--bg)]" 
      />

      {/* LATAM-Specific Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Características Únicas para Latinoamérica</h2>
          <p className="text-[var(--muted)] text-lg mb-6">
            Capacidades culturalmente adaptadas que ningún competidor internacional ofrece
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] text-sm">
            <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
            <span>Superando a Planning Center, Breeze y ChurchTrac en el mercado latino</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { 
              pill: 'Exclusivo', 
              title: 'WhatsApp Business Nativo', 
              desc: 'Primer ChMS con WhatsApp Business completamente integrado. Planning Center, Breeze y otros no tienen esta funcionalidad esencial para Latinoamérica.',
              icon: 'marker',
              advantage: 'vs Todos: Único con WhatsApp Business nativo'
            },
            { 
              pill: 'Cultural', 
              title: 'Métodos de Pago LATAM', 
              desc: 'Nequi, PSE, transferencias bancarias locales incluidas. Competidores internacionales solo ofrecen Stripe/PayPal.',
              icon: 'diamond',
              advantage: 'vs Internacionales: Pagos locales 100% integrados'
            },
            { 
              pill: 'IA Avanzada', 
              title: 'Emparejamiento Inteligente', 
              desc: 'IA empareja voluntarios con ministerios basado en dones espirituales. ChurchTrac y Breeze solo tienen programación básica.',
              icon: 'users',
              advantage: 'vs ChurchTrac/Breeze: IA única para voluntarios'
            },
            { 
              pill: 'Automatización', 
              title: 'Motor de Oración Automatizado', 
              desc: 'Sistema único de seguimiento pastoral con IA para análisis emocional. Ningún competidor tiene automatización pastoral.',
              icon: 'zap',
              advantage: 'vs Todos: Automatización pastoral exclusiva'
            },
            { 
              pill: 'Cultural', 
              title: 'Adaptación Cultural IA', 
              desc: 'Sistema que adapta automáticamente la interfaz al contexto cultural latino. Competidores usan traducciones básicas.',
              icon: 'shield',
              advantage: 'vs Todos: Adaptación cultural inteligente'
            },
            { 
              pill: 'Predictivo', 
              title: 'Análisis de Participación', 
              desc: 'IA predice deserción de miembros y sugiere intervenciones. Planning Center solo tiene reportes básicos.',
              icon: 'circle',
              advantage: 'vs Planning Center: Predicción avanzada única'
            },
        ].map((f) => (
          <div className="card p-6 hover:-translate-y-1 transition group" key={f.title}>
            <div className="flex items-center gap-3 mb-3">
              <OutlineIcon name={f.icon} className="w-6 h-6 text-[var(--brand)]" />
              <span
                className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border inline-block"
                style={{ background: '#1f1f23', borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                {f.pill}
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-3 mb-2">{f.title}</h3>
            <p style={{ color: 'var(--muted)' }} className="mb-3">{f.desc}</p>
            <div className="text-xs text-[var(--brand)] font-medium opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
              <OutlineIcon name="circle" className="w-3 h-3 text-[var(--brand)]" /> {f.advantage}
            </div>
          </div>
        ))}
        </div>

        {/* Competitive Advantage Callout */}
        <div className="card p-6 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--brand2)]/5 border-[var(--brand)]/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <OutlineIcon name="diamond" className="w-5 h-5 text-[var(--brand)]" /> Por Qué las Iglesias Eligen KHESED-TEK Sobre Competidores
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-[var(--brand)]">vs Planning Center (Inglés):</strong>
                <p className="text-[var(--muted)]">Culturalmente adaptado + métodos de pago locales</p>
              </div>
              <div>
                <strong className="text-[var(--brand)]">vs Breeze/ChurchTrac:</strong>
                <p className="text-[var(--muted)]">IA avanzada + WhatsApp nativo incluido</p>
              </div>
              <div>
                <strong className="text-[var(--brand)]">vs Aplos:</strong>
                <p className="text-[var(--muted)]">ChMS completo vs solo contabilidad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programa Beta Launch */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="card p-8 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand)]/10 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <OutlineIcon name="rocket" className="w-4 h-4" />
            <span>Programa Beta - Lanzamiento Especial</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Únete a Nuestro Programa Beta</h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            Sé parte de las primeras iglesias en experimentar KHESED-TEK-CMS. 
            Obtén acceso completo y ayúdanos a perfeccionar la plataforma diseñada específicamente para iglesias hispanas.
          </p>
          <div className="flex justify-center mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)] max-w-sm">
              <div className="text-3xl font-bold text-[var(--brand)] mb-2">30 días</div>
              <div className="text-sm text-[var(--muted)]">Acceso completamente gratis</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?program=beta" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition">
              Aplicar al Programa Beta →
            </a>
            <a href="https://wa.me/573021234410" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition">
              WhatsApp: +57 302 123 4410
            </a>
          </div>
        </div>
      </section>

      {/* Potencial de Impacto - Estudios de la Industria */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Potencial de Impacto Comprobado</h2>
          <p style={{ color: 'var(--muted)' }}>
            Basado en estudios de la industria y benchmarks de iglesias similares
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Eficiencia Administrativa",
              metric: "30-50% reducción",
              description: "en tiempo administrativo",
              source: "Iglesias que digitalizan procesos",
              benefit: "Más tiempo para ministerio pastoral"
            },
            {
              title: "Participación Digital", 
              metric: "25-40% aumento",
              description: "en engagement de miembros",
              source: "Estudios de transformación digital",
              benefit: "Mayor conexión con la congregación"
            },
            {
              title: "Gestión Financiera",
              metric: "60% mejora",
              description: "en transparencia de donaciones",
              source: "Plataformas de donaciones digitales",
              benefit: "Incremento en contribuciones regulares"
            }
          ].map((study, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{study.title}</h4>
                <div className="text-2xl font-bold text-[var(--brand)] mb-2">{study.metric}</div>
                <div className="text-sm text-[var(--muted)] mb-3">{study.description}</div>
                <div className="text-sm font-medium text-[var(--brand)] flex items-center gap-1 mb-4">
                  <OutlineIcon name="chart" className="w-3 h-3 text-[var(--brand)]" /> 
                  <span className="italic">Fuente: {study.source}</span>
                </div>
              </div>
              <div className="p-4 bg-[var(--brand)]/5 rounded-lg">
                <div className="text-sm font-medium text-[var(--text)] flex items-center gap-2">
                  <OutlineIcon name="lightbulb" className="w-4 h-4 text-[var(--brand)]" />
                  <strong className="text-[var(--brand)]">Beneficio:</strong> {study.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="card p-6 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">¿Listo para estos resultados?</h3>
            <p className="text-[var(--muted)] mb-4">
              Únete a nuestro programa beta y sé parte de las primeras iglesias en experimentar estos beneficios
            </p>
            <a href="/contact?program=beta" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition">
              Comenzar Prueba Beta →
            </a>
          </div>
        </div>
      </section>

      {/* LATAM Pricing Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Planes adaptados al mercado hispano</h2>
          <p className="text-[var(--muted)] mb-4">
            Precios justos con métodos de pago locales y soporte en español
          </p>
          <div className="text-lg text-[var(--muted)] mb-4">
            Precio fijo por tamaño de iglesia - Sin cargos adicionales por módulos
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: "small",
              name: "Iglesia Pequeña",
              price: "$149.99 USD",
              period: "/mes",
              members: "Hasta 500 miembros",
              features: ["Gestión básica de miembros", "WhatsApp integrado", "Hasta 5 licencias", "Soporte en español", "Pagos PSE"],
              ctaText: "Comenzar gratis",
              ctaUrl: "/contact?plan=small"
            },
            {
              id: "medium",
              name: "Iglesia Mediana", 
              price: "$299.99 USD",
              period: "/mes",
              members: "Hasta 2,000 miembros",
              features: ["Todo lo anterior", "Hasta 10 licencias", "Eventos y actividades", "Reportes avanzados", "Transmisiones en vivo"],
              popular: true,
              ctaText: "Más popular",
              ctaUrl: "/contact?plan=medium"
            },
            {
              id: "large",
              name: "Iglesia Grande",
              price: "Personalizado", 
              period: "",
              members: "Miembros ilimitados",
              features: ["Todo lo anterior", "Licencias ilimitadas", "Multi-campus", "API personalizada", "Soporte prioritario"],
              ctaText: "Solicitar demo",
              ctaUrl: "/contact?plan=large"
            }
          ].map((plan, idx) => (
            <AnimatedPricingCard
              key={plan.id}
              plan={plan as PricingPlan}
              index={idx}
              onSelect={(planId) => trackCTAClick('latam_pricing', `Plan ${planId}`)}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable 
          plans={[
            { id: "small", name: "Iglesia Pequeña", price: "$149.99", period: "/mes", members: "500", features: [] },
            { id: "medium", name: "Iglesia Mediana", price: "$299.99", period: "/mes", members: "2,000", features: [], popular: true },
            { id: "large", name: "Iglesia Grande", price: "Personalizado", period: "", members: "Ilimitado", features: [] }
          ]}
          language="es"
          className="mt-16"
        />

        <div className="text-sm text-[var(--muted)] text-center mt-8 flex items-center justify-center gap-2">
          <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
          <span>Acepta PSE, Bancolombia, Efecty y transferencias</span>
          <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-2" />
          <OutlineIcon name="phone" className="w-4 h-4 text-cyan-400" />
          <span>Soporte telefónico incluido</span>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Calcule su Retorno de Inversión</h2>
          <p className="text-[var(--muted)] text-lg">
            Descubra cuánto puede ahorrar su iglesia con KHESED-TEK
          </p>
        </div>
        <ROICalculator 
          language="es" 
          market="LATAM" 
          showDetailed={true}
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* Programa Beta Launch */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="card p-8 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand)]/10 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <OutlineIcon name="rocket" className="w-4 h-4" />
            <span>Programa Beta - Lanzamiento Especial</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Únete a Nuestro Programa Beta</h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            Sé parte de las primeras iglesias en experimentar KHESED-TEK-CMS. 
            Obtén acceso completo y ayúdanos a perfeccionar la plataforma diseñada específicamente para iglesias hispanas.
          </p>
          <div className="flex justify-center mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)] max-w-sm">
              <div className="text-3xl font-bold text-[var(--brand)] mb-2">30 días</div>
              <div className="text-sm text-[var(--muted)]">Acceso completamente gratis</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?program=beta" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition">
              Aplicar al Programa Beta →
            </a>
            <a href="https://wa.me/573021234410" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition">
              WhatsApp: +57 302 123 4410
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Nosotros */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">Nuestra Misión</h2>
        
        {/* Core Mission Statement */}
        <div className="card p-8 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 mb-12">
          <div style={{ color: 'var(--muted)' }} className="text-lg mb-6 space-y-4">
            <p className="font-medium text-[var(--text)] leading-relaxed">
              Nuestra misión es desplegar la tecnología como una expresión práctica del Khesed de Dios 
              (Su amor de pacto y misericordia) para servir a Su Iglesia.
            </p>
            <p className="leading-relaxed">
              Fieles a este llamado, transformamos nuestro trabajo en una ofrenda tangible:{' '}
              <span className="font-semibold text-[var(--brand)]">el 33% de todas las ganancias de nuestras suscripciones</span>{' '}
              se asignan directamente para financiar las obras comunitarias de Misión Khesed.
            </p>
            <p className="leading-relaxed">
              Este compromiso asegura que cada solución tecnológica que creamos se convierta en un acto de amor práctico y generacional.
            </p>
            <p className="font-medium text-[var(--brand)] italic leading-relaxed">
              Porque creemos que servir a la Iglesia es también servir al mundo al cual Ella es enviada.
            </p>
          </div>
          
          {/* Biblical Foundation */}
          <div className="border-t border-[var(--border)] pt-6 mt-6">
            <p className="text-sm font-medium text-[var(--brand)] mb-2">Fundamento Bíblico</p>
            <p className="text-sm italic text-[var(--muted)]">
              "Sé diligente en conocer el estado de tus ovejas, y mira con cuidado por tus rebaños" 
              <span className="font-medium">— Proverbios 27:23</span>
            </p>
          </div>
        </div>
        
        {/* Supporting Context */}
        <div style={{ color: 'var(--muted)' }} className="text-base mb-8 space-y-4">
          <p>
            Somos una firma innovadora de software con sede en Barranquilla, dedicada exclusivamente a servir al Reino. 
            Empoderamos a organizaciones basadas en la fe mediante soluciones de Inteligencia Artificial 
            e integración de procesos, resolviendo sus desafíos operativos más complejos.
          </p>
          <p>
            Optimizamos sus tareas administrativas para que su equipo recupere el activo más valioso: 
            tiempo para pastorear y fortalecer a la comunidad, mientras nosotros gestionamos la complejidad tecnológica.
          </p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">10,000+</div>
            <div className="text-sm text-[var(--muted)]">Miembros soportados</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">40+</div>
            <div className="text-sm text-[var(--muted)]">Años sirviendo en ministerios</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">99.9%</div>
            <div className="text-sm text-[var(--muted)]">Uptime garantizado</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">15+</div>
            <div className="text-sm text-[var(--muted)]">Integraciones disponibles</div>
          </div>
        </div>
      </section>

      {/* System Features Section */}
      <SystemFeaturesSection 
        autoRotate={true}
        showMetrics={true}
        variant="carousel"
        className="bg-[var(--surface)]"
      />

      {/* Local Contact Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-2">Conversemos sobre tu iglesia</h2>
        <p style={{ color: 'var(--muted)' }} className="mb-8">
          Nuestro equipo en Barranquilla está listo para ayudarte a transformar tu ministerio
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4 flex items-center">
              <OutlineIcon name="mail" className="w-4 h-4 text-cyan-400 mr-2" />
              <span>Contacto directo</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <OutlineIcon name="mail" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>contacto@khesed-tek-systems.org</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="phone" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>+57 302 123 4410 (WhatsApp)</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="marker" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>Barranquilla, Atlántico, Colombia</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="clock" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>Lunes a Viernes 9AM - 6PM (COT)</span>
              </div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4 flex items-center">
              <OutlineIcon name="users" className="w-4 h-4 text-cyan-400 mr-2" />
              <span>Demo personalizada</span>
            </h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Demostración adaptada a tu iglesia
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Análisis de necesidades sin costo
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Plan de implementación personalizado
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Acompañamiento en tu zona horaria
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}