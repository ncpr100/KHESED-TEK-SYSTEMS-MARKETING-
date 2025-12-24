'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';
import AnimatedPricingCard from '@/components/pricing/animated-pricing-card';
import FeatureComparisonTable from '@/components/pricing/feature-comparison';
import { PricingPlan } from '@/types/pricing';
import DemoVideoSection from '@/components/conversion/demo-video-section';
import TrustSignals from '@/components/social-proof/trust-signals';
import ROICalculator from '@/components/conversion/roi-calculator';
import SystemFeaturesSection from '@/components/social-proof/system-features-section';
import OutlineIcon from '@/components/ui/outline-icon';

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
            <OutlineIcon name="globe" className="w-4 h-4 text-[var(--brand)] inline mr-2" />
            Global Market - Worldwide Ministry Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {heroText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            {language === 'es' 
              ? 'En KHESED-TEK SYSTEMS, convergen la vanguardia tecnológica y el propósito divino. Nuestra solución insignia, KHESED-TEK-CMS, nace de una convicción profunda: el software no es el fin, sino el medio estratégico para potenciar el cumplimiento de La Gran Comisión.'
              : 'At KHESED-TEK SYSTEMS, cutting-edge technology meets divine purpose. Our flagship solution, KHESED-TEK-CMS, is born from a profound conviction: software is not the end, but the strategic means to enhance the fulfillment of The Great Commission.'
            }
          </p>
          <p className="max-w-3xl mx-auto text-base mb-6 italic" style={{ color: 'var(--muted)' }}>
            {language === 'es'
              ? 'Nuestra misión es dotar a su iglesia de Inteligencia Ministerial, facilitando el mandato bíblico de Proverbios 27:23: "Sé diligente en conocer el estado de tus ovejas, y mira con cuidado por tus rebaños".'
              : 'Our mission is to equip your church with Ministerial Intelligence, facilitating the biblical mandate of Proverbs 27:23: "Be diligent to know the state of your flocks, and attend to your herds."'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/contact?program=beta"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition"
              onClick={handleCTAClick}
            >
              {language === 'es' ? 'Únete al Programa Beta →' : 'Join Beta Program →'}
            </a>
            <a
              href="https://calendly.com/khesed-tek/global-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition"
              onClick={() => trackCTAClick('global_calendar', language === 'es' ? 'Agendar demo' : 'Schedule demo')}
            >
              <OutlineIcon name="calendar" className="w-5 h-5 text-[var(--brand)]" />
              {language === 'es' ? 'Agendar demo' : 'Schedule demo'}
            </a>
          </div>
          <div className="text-sm text-[var(--muted)] flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <OutlineIcon name="headphones" className="w-4 h-4 text-[var(--brand)]" />
              24/7 Global Support
            </span>
            <span className="flex items-center gap-1">
              <OutlineIcon name="globe" className="w-4 h-4 text-[var(--brand)]" />
              Multi-language
            </span>
            <span className="flex items-center gap-1">
              <OutlineIcon name="clock" className="w-4 h-4 text-[var(--brand)]" />
              All Timezones
            </span>
            <span className="flex items-center gap-1">
              {/* Outline Shield Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              International Compliance
            </span>
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
          market="GLOBAL"
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
            {/* Outline Trophy Icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
            {language === 'es' 
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
              icon: '田',
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
              icon: '�',
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
              icon: '$',
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
              icon: 'circle',
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
              icon: 'circle',
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
            <div className="text-xs text-[var(--brand)] font-medium opacity-0 group-hover:opacity-100 transition flex items-center">
              <OutlineIcon name="dot" className="w-3 h-3 text-cyan-400 mr-1" />
              <span>{f.advantage}</span>
            </div>
          </div>
        ))}
        </div>

        {/* Competitive Advantage Callout */}
        <div className="card p-6 bg-gradient-to-r from-[var(--brand)]/5 to-[var(--brand2)]/5 border-[var(--brand)]/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              {/* Outline Trophy Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--brand)]">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              {language === 'es' 
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

      {/* Global Ministry Impact Studies */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            {language === 'es' ? 'Impacto Global de Ministerios' : 'Global Ministry Impact'}
          </h2>
          <p style={{ color: 'var(--muted)' }}>
            {language === 'es' 
              ? 'Estudios de la industria sobre transformación digital en ministerios internacionales'
              : 'Industry studies on digital transformation in international ministries'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              category: language === 'es' ? 'Alcance Multicultural' : 'Multicultural Outreach',
              metric: "50-80% increase",
              description: language === 'es' ? 'en participación de miembros internacionales' : 'in international member engagement',
              source: language === 'es' ? 'Estudios de iglesias multiculturales' : 'Multicultural church studies',
              benefit: language === 'es' ? 'Mayor conexión con comunidades diversas' : 'Stronger connection with diverse communities',
              flag: "🌍"
            },
            {
              category: language === 'es' ? 'Coordinación Multi-Campus' : 'Multi-Campus Coordination', 
              metric: "40-70% efficiency",
              description: language === 'es' ? 'mejora en operaciones globales' : 'improvement in global operations',
              source: language === 'es' ? 'Investigación de redes de iglesias internacionales' : 'International church network research',
              benefit: language === 'es' ? 'Unificación de operaciones entre países' : 'Unified operations across countries',
              flag: "🏢"
            },
            {
              category: language === 'es' ? 'Soporte Multi-Idioma' : 'Multi-Language Support',
              metric: "60-90% adoption",
              description: language === 'es' ? 'tasa en comunidades multilingües' : 'rate in multilingual communities',
              source: language === 'es' ? 'Datos de adopción tecnológica global' : 'Global technology adoption data',
              benefit: language === 'es' ? 'Inclusión de todas las comunidades' : 'Inclusion of all community members',
              flag: "🗣️"
            }
          ].map((study, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{study.flag}</span>
                  <h4 className="font-semibold text-lg">{study.category}</h4>
                </div>
                <div className="text-2xl font-bold text-[var(--brand)] mb-2">{study.metric}</div>
                <div className="text-sm text-[var(--muted)] mb-3">{study.description}</div>
                <div className="text-xs font-medium text-[var(--brand)] flex items-center gap-1 mb-4">
                  <OutlineIcon name="chart" className="w-3 h-3 text-[var(--brand)]" /> 
                  <span className="italic">{language === 'es' ? 'Fuente:' : 'Source:'} {study.source}</span>
                </div>
              </div>
              <div className="p-4 bg-[var(--brand)]/5 rounded-lg">
                <div className="text-sm font-medium text-[var(--text)] flex items-center gap-2">
                  <OutlineIcon name="globe" className="w-4 h-4 text-[var(--brand)]" />
                  <strong className="text-[var(--brand)]">{language === 'es' ? 'Beneficio Global:' : 'Global Benefit:'}</strong> {study.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Global Beta CTA */}
        <div className="text-center mt-12">
          <div className="card p-8 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-3">
              {language === 'es' ? '¿Listo para el Impacto Global?' : 'Ready for Global Impact?'}
            </h3>
            <p className="text-[var(--muted)] mb-6">
              {language === 'es' 
                ? 'Únete a nuestro programa beta diseñado para ministerios con alcance internacional'
                : 'Join our beta program designed for ministries with international reach'
              }
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <OutlineIcon name="check" className="w-4 h-4 text-green-500" />
                <span>{language === 'es' ? 'Prueba de 30 días completa' : '30-day full-feature trial'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <OutlineIcon name="check" className="w-4 h-4 text-green-500" />
                <span>{language === 'es' ? 'Soporte 24/7 multiidioma' : '24/7 multilingual support'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <OutlineIcon name="check" className="w-4 h-4 text-green-500" />
                <span>{language === 'es' ? 'Configuración personalizada' : 'Custom setup assistance'}</span>
              </div>
            </div>
            <a href="/contact?program=beta" className="inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-full gradient-btn hover:scale-105 transition">
              {language === 'es' ? 'Aplicar al Programa Beta →' : 'Apply for Beta Program →'}
            </a>
          </div>
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
          <div className="text-lg text-[var(--muted)] mb-4">
            {language === 'es'
              ? 'Precio fijo por tamaño de iglesia - Sin cargos adicionales por módulos'
              : 'Fixed pricing by church size - No additional module fees'
            }
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: "small",
              name: language === 'es' ? 'Iglesia Pequeña' : 'Small Church',
              price: "$149.99 USD",
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Hasta 500 miembros' : 'Up to 500 members',
              features: language === 'es' 
                ? ["Gestión básica de miembros", "Hasta 5 licencias", "Soporte multiidioma", "Pagos locales", "Migración asistida"]
                : ["Basic member management", "Up to 5 user licenses", "Multi-language support", "Local payments", "Assisted migration"],
              ctaText: language === 'es' ? 'Solicitar demo' : 'Request demo',
              ctaUrl: "/contact?plan=small"
            },
            {
              id: "medium",
              name: language === 'es' ? 'Iglesia Mediana' : 'Medium Church', 
              price: "$299.99 USD",
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Hasta 2,000 miembros' : 'Up to 2,000 members',
              features: language === 'es'
                ? ["Todo lo anterior", "Hasta 10 licencias", "Reportes avanzados", "Soporte prioritario"]
                : ["Everything above", "Up to 10 user licenses", "Advanced reporting", "Priority support"],
              popular: true,
              ctaText: language === 'es' ? 'Más popular' : 'Most Popular',
              ctaUrl: "/contact?plan=medium"
            },
            {
              id: "large",
              name: language === 'es' ? 'Iglesia Grande' : 'Large Church',
              price: language === 'es' ? 'Personalizado' : 'Custom', 
              period: '',
              members: language === 'es' ? 'Miembros ilimitados' : 'Unlimited members',
              features: language === 'es'
                ? ["Todo lo anterior", "Licencias ilimitadas", "Multi-campus", "API personalizada", "Cumplimiento GDPR", "Soporte 24/7"]
                : ["Everything above", "Unlimited licenses", "Multi-campus support", "Custom API", "GDPR compliance", "24/7 support"],
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
            { id: "small", name: language === 'es' ? 'Iglesia Pequeña' : 'Small Church', price: "$149.99", period: language === 'es' ? '/mes' : '/month', members: "500", features: [] },
            { id: "medium", name: language === 'es' ? 'Iglesia Mediana' : 'Medium Church', price: "$299.99", period: language === 'es' ? '/mes' : '/month', members: "2,000", features: [], popular: true },
            { id: "large", name: language === 'es' ? 'Iglesia Grande' : 'Large Church', price: language === 'es' ? 'Personalizado' : 'Custom', period: '', members: "Unlimited", features: [] }
          ]}
          language={language}
          className="mt-16"
        />

        <div className="text-sm text-[var(--muted)] text-center mt-8 flex items-center justify-center gap-2">
          <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
          <span>{language === 'es' 
            ? 'Stripe, Wise, transferencias bancarias'
            : 'Stripe, Wise, bank transfers'
          }</span>
          <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
          <OutlineIcon name="shield" className="w-4 h-4 text-cyan-400" />
          <span>{language === 'es' 
            ? 'Cumplimiento GDPR/LGPD'
            : 'GDPR/LGPD compliant'
          }</span>
          <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
          <OutlineIcon name="award" className="w-4 h-4 text-cyan-400" />
          <span>{language === 'es' 
            ? 'Certificaciones ISO'
            : 'ISO certified'
          }</span>
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

      {/* Global Beta Program Launch */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="card p-8 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand)]/10 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <OutlineIcon name="rocket" className="w-4 h-4" />
            <span>{language === 'es' ? 'Programa Beta - Lanzamiento Global' : 'Beta Program - Global Launch'}</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'es' ? 'Únete a Nuestro Programa Beta Global' : 'Join Our Global Beta Program'}
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Sé parte de las primeras iglesias mundialmente en experimentar KHESED-TEK-CMS. Obtén acceso completo y ayúdanos a perfeccionar la plataforma diseñada para ministerios globales.'
              : 'Be among the first churches worldwide to experience KHESED-TEK-CMS. Get full access and help us perfect the platform designed for global ministries.'
            }
          </p>
          <div className="flex justify-center mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)] max-w-sm">
              <div className="text-3xl font-bold text-[var(--brand)] mb-2">
                {language === 'es' ? '30 días' : '30 days'}
              </div>
              <div className="text-sm text-[var(--muted)]">
                {language === 'es' ? 'Acceso completamente gratis' : 'Completely free access'}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?program=beta" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition">
              {language === 'es' ? 'Aplicar al Programa Beta →' : 'Apply to Beta Program →'}
            </a>
            <a href="https://calendly.com/khesed-tek/global-demo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition">
              <OutlineIcon name="calendar" className="w-5 h-5 text-[var(--brand)]" />
              {language === 'es' ? 'Agendar Demo' : 'Schedule Demo'}
            </a>
          </div>
        </div>
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
              flag: '田'
            }
          ].map((region, idx) => (
            <div key={idx} className="card p-6 text-center">
              <div className="text-3xl mb-3">{region.flag}</div>
              <h3 className="font-semibold mb-2">{region.region}</h3>
              <div className="space-y-1 text-sm text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <OutlineIcon name="clock" className="w-3 h-3 text-cyan-400" />
                  <span>{region.timezone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <OutlineIcon name="globe" className="w-3 h-3 text-cyan-400" />
                  <span>{region.languages}</span>
                </div>
                <div className="flex items-center gap-2">
                  <OutlineIcon name="diamond" className="w-3 h-3 text-cyan-400" />
                  <span>{region.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <OutlineIcon name="square" className="w-3 h-3 text-cyan-400" />
                  <span>{region.contact}</span>
                </div>
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
        <SystemFeaturesSection 
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
              ? 'En KHESED-TEK SYSTEMS, convergen la vanguardia tecnológica y el propósito divino. Somos una firma innovadora de software y automatización con sede en Barranquilla, dedicada exclusivamente a servir al Reino. Empoderamos a organizaciones basadas en la fe mediante el diseño de soluciones personalizadas de Inteligencia Artificial e integración de procesos, resolviendo sus desafíos operativos más complejos.'
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
              ? 'Nuestra misión es dotar a su iglesia de Inteligencia Ministerial, facilitando el mandato bíblico de Proverbios 27:23: "Sé diligente en conocer el estado de tus ovejas, y mira con cuidado por tus rebaños".'
              : 'Our mission is to equip your church with Ministerial Intelligence, facilitating the biblical mandate of Proverbs 27:23: "Be diligent to know the state of your flocks, and attend to your herds."'
            }
          </p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">10,000+</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Miembros soportados' : 'Members supported'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">40+</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Años sirviendo en ministerios' : 'Years serving in ministry'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">99.9%</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Uptime garantizado' : 'Uptime guarantee'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">15+</div>
            <div className="text-sm text-[var(--muted)]">
              {language === 'es' ? 'Integraciones disponibles' : 'Available integrations'}
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
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <OutlineIcon name="users" className="w-5 h-5 text-[var(--brand)]" />
              <span>{language === 'es' ? 'Equipo Global' : 'Global Team'}</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <OutlineIcon name="mail" className="w-3 h-3 text-cyan-400" />
                <span>contact@khesed-tek-systems.org</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="phone" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Líneas regionales disponibles' : 'Regional lines available'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="diamond" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Cobertura mundial' : 'Worldwide coverage'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="square" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Soporte 24/7 disponible' : '24/7 support available'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="zap" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Soporte multiidioma' : 'Multi-language support'}</span>
              </div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <OutlineIcon name="shield" className="w-5 h-5 text-[var(--brand)]" />
              <span>{language === 'es' ? 'Demo Internacional' : 'International Demo'}</span>
            </h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Demostración en tu idioma' : 'Demo in your language'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Análisis de cumplimiento local' : 'Local compliance analysis'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Integración con sistemas locales' : 'Local systems integration'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Plan de migración personalizado' : 'Customized migration plan'}</span>
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                <span>{language === 'es' ? 'Soporte en tu zona horaria' : 'Support in your timezone'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}