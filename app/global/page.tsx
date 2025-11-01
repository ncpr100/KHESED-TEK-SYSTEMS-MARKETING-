'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';
import AnimatedPricingCard from '@/components/pricing/animated-pricing-card';
import FeatureComparisonTable from '@/components/pricing/feature-comparison';
import LocalizedPriceDisplay from '@/components/pricing/currency-localization';
import { PricingPlan } from '@/types/pricing';
import DemoVideoSection from '@/components/conversion/demo-video-section';
import TrustSignals from '@/components/social-proof/trust-signals';
import ROICalculator from '@/components/conversion/roi-calculator';
import TestimonialsSection from '@/components/social-proof/testimonials-section';

export default function GlobalMarketPage() {
  const { market, language } = useGlobalMarket();
  
  const heroVariant = useABTest(HERO_HEADLINE_TEST, 'GLOBAL');
  const ctaVariant = useABTest(CTA_BUTTON_TEST, 'GLOBAL');
  
  const heroText = getVariantContent(HERO_HEADLINE_TEST, heroVariant, language, HERO_HEADLINE_CONTENT);
  const ctaText = getVariantContent(CTA_BUTTON_TEST, ctaVariant, language, CTA_BUTTON_CONTENT);

  const handleCTAClick = () => {
    trackCTAClick('global_hero_section', ctaText);
    trackABTestConversion(CTA_BUTTON_TEST.testId, ctaVariant, 'cta_click', 'GLOBAL');
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Global-Specific Hero Section */}
      <section
        className="relative overflow-hidden text-center px-6 py-24"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(110,231,255,.07), transparent 60%), radial-gradient(900px 300px at 90% -20%, rgba(139,92,246,.08), transparent 55%), var(--bg)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-sm uppercase tracking-wide text-[var(--brand)] mb-4">
            🌍 Global Market - Worldwide Ministry Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {heroText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            {language === 'es' 
              ? 'Conectamos ministerios alrededor del mundo con tecnología confiable y soporte 24/7 en múltiples idiomas.'
              : 'Connecting ministries worldwide with reliable technology and 24/7 support in multiple languages.'
            }
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
              href="https://calendly.com/khesed-tek/global-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition"
              onClick={() => trackCTAClick('global_calendar', language === 'es' ? 'Agendar demo' : 'Schedule demo')}
            >
              📅 {language === 'es' ? 'Agendar demo' : 'Schedule demo'}
            </a>
          </div>
          <div className="text-sm text-[var(--muted)]">
            🌐 24/7 Global Support • 🗣️ Multi-language • ⏰ All Timezones • 🔒 International Compliance
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <DemoVideoSection 
          primaryVideo={{
            id: 'global-demo',
            title: language === 'es' ? 'Ve KHESED-TEK en acción' : 'See KHESED-TEK in Action',
            description: language === 'es' 
              ? 'Descubre cómo iglesias de todo el mundo están transformando sus ministerios'
              : 'Discover how churches worldwide are transforming their ministries',
            thumbnailUrl: '/images/demo-thumbnail.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=demo-video-id',
            duration: '5:30',
            type: 'youtube',
            market: 'GLOBAL',
            language: language,
            features: [
              language === 'es' ? 'Gestión multiidioma' : 'Multi-language management',
              language === 'es' ? 'Soporte global 24/7' : 'Global 24/7 support', 
              language === 'es' ? 'Cumplimiento internacional' : 'International compliance',
              language === 'es' ? 'Integración con sistemas locales' : 'Local systems integration'
            ]
          }}
          market="GLOBAL"
          language={language}
        />
      </section>

      {/* Trust Signals */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <TrustSignals 
          layout="grid"
          showDescriptions={true}
          animated={true}
        />
      </section>

      {/* Global-Specific Features */}
      {/* Global Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Características Globales Avanzadas' : 'Advanced Global Features'}
          </h2>
          <p className="text-[var(--muted)] text-lg mb-6">
            {language === 'es' 
              ? 'Capacidades únicas que superan a Planning Center, Breeze, ChurchTrac y otros líderes del mercado'
              : 'Unique capabilities that outperform Planning Center, Breeze, ChurchTrac, and other market leaders'
            }
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] text-sm">
            🏆 {language === 'es' 
              ? 'Superando a TouchPoint, Aplos y Realm en características clave'
              : 'Outperforming TouchPoint, Aplos, and Realm in key features'
            }
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { 
              pill: language === 'es' ? 'IA Global' : 'Global AI', 
              title: language === 'es' ? 'Adaptación Cultural Inteligente' : 'Intelligent Cultural Adaptation', 
              desc: language === 'es' 
                ? 'IA que adapta automáticamente la interfaz según el contexto cultural. Planning Center y Realm solo ofrecen traducciones básicas.'
                : 'AI that automatically adapts interface based on cultural context. Planning Center and Realm only offer basic translations.',
              icon: '🌍',
              advantage: language === 'es' 
                ? 'vs Planning Center/Realm: Adaptación cultural inteligente única'
                : 'vs Planning Center/Realm: Unique intelligent cultural adaptation'
            },
            { 
              pill: language === 'es' ? 'Multi-idioma' : 'Multi-Language', 
              title: language === 'es' ? 'Soporte Nativo Multiidioma' : 'Native Multi-Language Support', 
              desc: language === 'es'
                ? 'Español, inglés, portugués con IA contextual. Breeze y ChurchTrac no tienen soporte multiidioma.'
                : 'Spanish, English, Portuguese with contextual AI. Breeze and ChurchTrac lack multi-language support.',
              icon: '🗣️',
              advantage: language === 'es'
                ? 'vs Breeze/ChurchTrac: Único con multiidioma nativo'
                : 'vs Breeze/ChurchTrac: Only system with native multi-language'
            },
            { 
              pill: language === 'es' ? 'Pagos' : 'Payments', 
              title: language === 'es' ? 'Métodos de Pago Regionales' : 'Regional Payment Methods', 
              desc: language === 'es'
                ? 'Nequi, PSE, SEPA, Alipay y métodos locales integrados. Competidores solo Stripe/PayPal.'
                : 'Nequi, PSE, SEPA, Alipay and local methods integrated. Competitors only offer Stripe/PayPal.',
              icon: '💰',
              advantage: language === 'es'
                ? 'vs Todos: Métodos de pago regionales únicos'
                : 'vs All: Unique regional payment methods'
            },
            { 
              pill: language === 'es' ? 'Automatización' : 'Automation', 
              title: language === 'es' ? 'Motor de Automatización Global' : 'Global Automation Engine', 
              desc: language === 'es'
                ? 'Automatización avanzada con triggers culturales. TouchPoint cuesta $20K+; nosotros lo incluimos estándar.'
                : 'Advanced automation with cultural triggers. TouchPoint costs $20K+; we include it standard.',
              icon: '⚡',
              advantage: language === 'es'
                ? 'vs TouchPoint: 70% menos costo con características superiores'
                : 'vs TouchPoint: 70% less cost with superior features'
            },
            { 
              pill: language === 'es' ? 'Cumplimiento' : 'Compliance', 
              title: language === 'es' ? 'Cumplimiento Multi-jurisdiccional' : 'Multi-Jurisdictional Compliance', 
              desc: language === 'es'
                ? 'GDPR, LGPD, SOX automático por región. Aplos solo contabilidad; nosotros cumplimiento completo.'
                : 'GDPR, LGPD, SOX automatic by region. Aplos only accounting; we provide complete compliance.',
              icon: '🛡️',
              advantage: language === 'es'
                ? 'vs Aplos: Cumplimiento completo vs solo contabilidad'
                : 'vs Aplos: Complete compliance vs accounting only'
            },
            { 
              pill: language === 'es' ? 'Análisis' : 'Analytics', 
              title: language === 'es' ? 'Análisis Predictivo Global' : 'Global Predictive Analytics', 
              desc: language === 'es'
                ? 'IA predice tendencias por región y cultura. Ningún competidor ofrece análisis predictivo cultural.'
                : 'AI predicts trends by region and culture. No competitor offers cultural predictive analytics.',
              icon: '�',
              advantage: language === 'es'
                ? 'vs Todos: Análisis predictivo cultural único'
                : 'vs All: Unique cultural predictive analytics'
            },
        ].map((f) => (
          <div className="card p-6 hover:-translate-y-1 transition group" key={f.title}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{f.icon}</span>
              <span
                className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border inline-block"
                style={{ background: '#1f1f23', borderColor: 'var(--border)', color: 'var(--muted)' }}
              >
                {f.pill}
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-3 mb-2">{f.title}</h3>
            <p style={{ color: 'var(--muted)' }} className="mb-3">{f.desc}</p>
            <div className="text-xs text-[var(--brand)] font-medium opacity-0 group-hover:opacity-100 transition">
              ✨ {f.advantage}
            </div>
          </div>
        ))}
        </div>

        {/* Competitive Advantage Callout */}
        <div className="card p-6 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--brand2)]/5 border-[var(--brand)]/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              🏆 {language === 'es' 
                ? 'Por Qué las Iglesias Globales Eligen KHESED-TEK'
                : 'Why Global Churches Choose KHESED-TEK Over Competitors'
              }
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-[var(--brand)]">
                  vs Planning Center ({language === 'es' ? '$100+/mes' : '$100+/month'}):
                </strong>
                <p className="text-[var(--muted)]">
                  {language === 'es' 
                    ? 'Características culturales + IA a precio competitivo'
                    : 'Cultural features + AI at competitive price'
                  }
                </p>
              </div>
              <div>
                <strong className="text-[var(--brand)]">
                  vs TouchPoint ({language === 'es' ? '$20K+/año' : '$20K+/year'}):
                </strong>
                <p className="text-[var(--muted)]">
                  {language === 'es'
                    ? 'Características empresariales 70% menos costo'
                    : 'Enterprise features at 70% less cost'
                  }
                </p>
              </div>
              <div>
                <strong className="text-[var(--brand)]">vs Breeze/ChurchTrac/Realm:</strong>
                <p className="text-[var(--muted)]">
                  {language === 'es'
                    ? 'IA cultural que ellos no ofrecen'
                    : 'Cultural AI features they don\'t offer'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Success Stories */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Ministerios en todo el mundo' : 'Ministries Around the World'}
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            {language === 'es' 
              ? 'Casos de éxito internacionales con impacto global'
              : 'International success stories with global impact'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              church: "International Community Church",
              location: "London, UK", 
              members: "3,500+ members",
              languages: "8 languages",
              result: "200% increase in international outreach",
              quote: language === 'es' 
                ? "KHESED-TEK nos permitió conectar con nuestra congregación multicultural de manera efectiva."
                : "KHESED-TEK enabled us to effectively connect with our multicultural congregation.",
              pastor: "Pastor Michael Thompson",
              flag: "🇬🇧"
            },
            {
              church: "Igreja Mundial da Graça",
              location: "São Paulo, Brazil",
              members: "6,000+ members",
              languages: "3 languages", 
              result: "150% growth in digital engagement",
              quote: language === 'es'
                ? "La plataforma se adaptó perfectamente a nuestras necesidades brasileñas."
                : "The platform adapted perfectly to our Brazilian needs.",
              pastor: "Pastor Ana Silva",
              flag: "🇧🇷"
            },
            {
              church: "Christ Embassy International",
              location: "Toronto, Canada",
              members: "4,200+ members",
              languages: "5 languages",
              result: "300% improvement in multi-campus coordination", 
              quote: language === 'es'
                ? "El soporte 24/7 fue clave para nuestro crecimiento internacional."
                : "24/7 support was key to our international growth.",
              pastor: "Pastor David Kim",
              flag: "🇨🇦"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{testimonial.flag}</span>
                  <h4 className="font-semibold text-lg">{testimonial.church}</h4>
                </div>
                <div className="text-sm text-[var(--muted)] mb-2">
                  📍 {testimonial.location} • 👥 {testimonial.members} • 🗣️ {testimonial.languages}
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

      {/* Global Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Precios globales transparentes' : 'Transparent Global Pricing'}
          </h2>
          <p className="text-[var(--muted)] mb-4">
            {language === 'es' 
              ? 'Precios justos en tu moneda local con métodos de pago regionales'
              : 'Fair pricing in your local currency with regional payment methods'
            }
          </p>
          <div className="text-sm text-[var(--muted)]">
            <LocalizedPriceDisplay basePrice={149.99} showEstimates={true} />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: "small",
              name: language === 'es' ? 'Iglesia Pequeña' : 'Small Church',
              price: "$149.99 USD",
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Hasta 200 miembros' : 'Up to 200 members',
              features: language === 'es' 
                ? ["Gestión básica de miembros", "Soporte multiidioma", "Pagos locales", "Migración asistida"]
                : ["Basic member management", "Multi-language support", "Local payments", "Assisted migration"],
              ctaText: language === 'es' ? 'Solicitar demo' : 'Request demo',
              ctaUrl: "/contact?plan=small"
            },
            {
              id: "medium",
              name: language === 'es' ? 'Iglesia Mediana' : 'Medium Church', 
              price: "$299.99 USD",
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Hasta 1,000 miembros' : 'Up to 1,000 members',
              features: language === 'es'
                ? ["Todo lo anterior", "Multi-campus", "Reportes avanzados", "Soporte prioritario"]
                : ["Everything above", "Multi-campus", "Advanced reporting", "Priority support"],
              popular: true,
              ctaText: language === 'es' ? 'Más popular' : 'Most Popular',
              ctaUrl: "/contact?plan=medium"
            },
            {
              id: "large",
              name: language === 'es' ? 'Iglesia Grande' : 'Large Church',
              price: "$599.99 USD", 
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Miembros ilimitados' : 'Unlimited members',
              features: language === 'es'
                ? ["Todo lo anterior", "API personalizada", "Cumplimiento GDPR", "Soporte 24/7"]
                : ["Everything above", "Custom API", "GDPR compliance", "24/7 support"],
              ctaText: language === 'es' ? 'Contactar ventas' : 'Contact Sales',
              ctaUrl: "/contact?plan=large"
            }
          ].map((plan, idx) => (
            <AnimatedPricingCard
              key={plan.id}
              plan={plan as PricingPlan}
              index={idx}
              onSelect={(planId: string) => trackCTAClick('global_pricing', `Plan ${planId}`)}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable 
          plans={[
            { id: "small", name: language === 'es' ? 'Iglesia Pequeña' : 'Small Church', price: "$149.99", period: language === 'es' ? '/mes' : '/month', members: "200", features: [] },
            { id: "medium", name: language === 'es' ? 'Iglesia Mediana' : 'Medium Church', price: "$299.99", period: language === 'es' ? '/mes' : '/month', members: "1,000", features: [], popular: true },
            { id: "large", name: language === 'es' ? 'Iglesia Grande' : 'Large Church', price: "$599.99", period: language === 'es' ? '/mes' : '/month', members: "Unlimited", features: [] }
          ]}
          language={language}
          className="mt-16"
        />

        <div className="text-sm text-[var(--muted)] text-center mt-8">
          💳 {language === 'es' 
            ? 'Stripe, Wise, transferencias bancarias • 🌍 Cumplimiento GDPR/LGPD • 🔒 Certificaciones ISO'
            : 'Stripe, Wise, bank transfers • 🌍 GDPR/LGPD compliant • 🔒 ISO certified'
          }
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Calcula tu ROI' : 'Calculate Your ROI'}
          </h2>
          <p className="text-[var(--muted)] text-lg">
            {language === 'es' 
              ? 'Descubre cuánto puede ahorrar tu iglesia con KHESED-TEK'
              : 'Discover how much your church can save with KHESED-TEK'
            }
          </p>
        </div>
        <ROICalculator 
          language={language} 
          market="GLOBAL" 
          showDetailed={true}
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* Regional Support Centers */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Centros de soporte regionales' : 'Regional Support Centers'}
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            {language === 'es' 
              ? 'Equipos locales en tu zona horaria con comprensión cultural'
              : 'Local teams in your timezone with cultural understanding'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              region: language === 'es' ? 'América' : 'Americas',
              timezone: 'UTC-5 to UTC-8',
              languages: language === 'es' ? 'Español, Inglés, Portugués' : 'Spanish, English, Portuguese',
              hours: '24/7',
              contact: 'global@khesed-tek-systems.org',
              flag: '🌎'
            },
            {
              region: language === 'es' ? 'Europa' : 'Europe',
              timezone: 'UTC+0 to UTC+3',
              languages: language === 'es' ? 'Inglés, Francés, Alemán' : 'English, French, German',
              hours: '6AM-10PM CET',
              contact: 'europe@khesed-tek-systems.org',
              flag: '🇪🇺'
            },
            {
              region: language === 'es' ? 'Asia-Pacífico' : 'Asia-Pacific',
              timezone: 'UTC+8 to UTC+12',
              languages: language === 'es' ? 'Inglés, Mandarín' : 'English, Mandarin',
              hours: '8AM-8PM AEST',
              contact: 'apac@khesed-tek-systems.org',
              flag: '🌏'
            },
            {
              region: language === 'es' ? 'África & Medio Oriente' : 'Africa & Middle East',
              timezone: 'UTC+0 to UTC+4',
              languages: language === 'es' ? 'Inglés, Árabe, Francés' : 'English, Arabic, French',
              hours: '7AM-7PM CAT',
              contact: 'mea@khesed-tek-systems.org',
              flag: '🌍'
            }
          ].map((region, idx) => (
            <div key={idx} className="card p-6 text-center">
              <div className="text-3xl mb-3">{region.flag}</div>
              <h3 className="font-semibold mb-2">{region.region}</h3>
              <div className="space-y-1 text-sm text-[var(--muted)]">
                <div>🕐 {region.timezone}</div>
                <div>🗣️ {region.languages}</div>
                <div>📞 {region.hours}</div>
                <div>📧 {region.contact}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Iglesias satisfechas mundialmente' : 'Satisfied Churches Worldwide'}
          </h2>
          <p className="text-[var(--muted)] text-lg">
            {language === 'es' 
              ? 'Únete a cientos de iglesias ya transformando sus ministerios'
              : 'Join hundreds of churches already transforming their ministries'
            }
          </p>
        </div>
        <TestimonialsSection 
          autoRotate={true}
          showMetrics={true}
          variant="carousel"
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">
          {language === 'es' ? 'Sobre KHESED-TEK SYSTEMS' : 'About KHESED-TEK SYSTEMS'}
        </h2>
        <div style={{ color: 'var(--muted)' }} className="text-lg mb-8 space-y-4">
          <p>
            {language === 'es' 
              ? 'KHESED-TEK SYSTEMS es una empresa innovadora de software y automatización dedicada a servir a la comunidad cristiana. Con sede en Barranquilla, Atlántico, empoderamos a iglesias y organizaciones basadas en la fe mediante el diseño de soluciones personalizadas de inteligencia artificial e integración que abordan sus desafíos operacionales únicos.'
              : 'KHESED-TEK SYSTEMS is an innovative software and automation company dedicated to serving the Christian community. Based in Barranquilla, Atlántico, we empower churches and faith-based organizations by designing customized artificial intelligence and integration solutions that address their unique operational challenges.'
            }
          </p>
          <p>
            {language === 'es'
              ? 'Entendemos que su misión es espiritual, pero sus operaciones son prácticas. Nuestro objetivo es optimizar sus tareas administrativas, mejorar la asignación de recursos y potenciar la productividad. Al manejar las complejidades de la tecnología, liberamos a su equipo para enfocarse en lo que más importa: servir a su congregación y fortalecer su comunidad.'
              : 'We understand that your mission is spiritual, but your operations are practical. Our goal is to streamline your administrative tasks, optimize resource allocation, and enhance productivity. By handling the complexities of technology, we free your team to focus on what matters most: serving your congregation and strengthening your community.'
            }
          </p>
          <p className="font-medium text-[var(--brand)]">
            {language === 'es'
              ? 'Permítanos construir la base tecnológica que respalda y amplifica su impacto.'
              : 'Let us build the technological foundation that supports and amplifies your impact.'
            }
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">50+</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Iglesias atendidas globalmente' : 'Churches served globally'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">15+</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Países con presencia' : 'Countries with presence'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">24/7</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Soporte global' : 'Global support'}
            </div>
          </div>
        </div>
      </section>

      {/* Global Contact Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-2">
          {language === 'es' ? 'Conectemos tu ministerio global' : 'Connect Your Global Ministry'}
        </h2>
        <p style={{ color: 'var(--muted)' }} className="mb-8">
          {language === 'es'
            ? 'Nuestro equipo global está listo para ayudarte sin importar dónde estés'
            : 'Our global team is ready to help you no matter where you are'
          }
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">
              🌐 {language === 'es' ? 'Equipo Global' : 'Global Team'}
            </h3>
            <div className="space-y-2 text-sm">
              <div>📧 global@khesed-tek-systems.org</div>
              <div>📞 {language === 'es' ? 'Líneas regionales disponibles' : 'Regional lines available'}</div>
              <div>🌐 {language === 'es' ? 'Cobertura mundial' : 'Worldwide coverage'}</div>
              <div>⏰ {language === 'es' ? 'Soporte 24/7 disponible' : '24/7 support available'}</div>
              <div>🗣️ {language === 'es' ? 'Soporte multiidioma' : 'Multi-language support'}</div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">
              🎯 {language === 'es' ? 'Demo Internacional' : 'International Demo'}
            </h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div>✓ {language === 'es' ? 'Demostración en tu idioma' : 'Demo in your language'}</div>
              <div>✓ {language === 'es' ? 'Análisis de cumplimiento local' : 'Local compliance analysis'}</div>
              <div>✓ {language === 'es' ? 'Integración con sistemas locales' : 'Local systems integration'}</div>
              <div>✓ {language === 'es' ? 'Plan de migración personalizado' : 'Customized migration plan'}</div>
              <div>✓ {language === 'es' ? 'Soporte en tu zona horaria' : 'Support in your timezone'}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}