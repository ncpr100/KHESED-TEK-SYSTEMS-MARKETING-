'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, HERO_HEADLINE_TEST, HERO_HEADLINE_CONTENT, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';

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

      {/* Global-Specific Features */}
      <section className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-12">
        {[
          { 
            pill: 'Multi-Language', 
            title: language === 'es' ? 'Soporte multiidioma' : 'Multi-language support', 
            desc: language === 'es' 
              ? 'Plataforma disponible en español, inglés, portugués, francés y más idiomas.'
              : 'Platform available in Spanish, English, Portuguese, French, and more languages.',
            icon: '🗣️'
          },
          { 
            pill: 'Timezone', 
            title: language === 'es' ? 'Cobertura global 24/7' : 'Global 24/7 coverage', 
            desc: language === 'es'
              ? 'Soporte técnico y atención al cliente en todas las zonas horarias del mundo.'
              : 'Technical support and customer service across all world timezones.',
            icon: '🌐'
          },
          { 
            pill: 'Compliance', 
            title: language === 'es' ? 'Cumplimiento internacional' : 'International compliance', 
            desc: language === 'es'
              ? 'GDPR, LGPD, y regulaciones locales de protección de datos implementadas.'
              : 'GDPR, LGPD, and local data protection regulations implemented.',
            icon: '🛡️'
          },
          { 
            pill: 'Currency', 
            title: language === 'es' ? 'Múltiples monedas' : 'Multi-currency support', 
            desc: language === 'es'
              ? 'Pagos y donaciones en USD, EUR, GBP, CAD, AUD y monedas locales.'
              : 'Payments and donations in USD, EUR, GBP, CAD, AUD and local currencies.',
            icon: '💰'
          },
          { 
            pill: 'Integration', 
            title: language === 'es' ? 'Integraciones globales' : 'Global integrations', 
            desc: language === 'es'
              ? 'Conecta con sistemas bancarios, plataformas locales y herramientas regionales.'
              : 'Connect with banking systems, local platforms and regional tools.',
            icon: '🔗'
          },
          { 
            pill: 'Migration', 
            title: language === 'es' ? 'Migración asistida' : 'Assisted migration', 
            desc: language === 'es'
              ? 'Equipo especializado para migrar desde cualquier sistema existente.'
              : 'Specialized team to migrate from any existing system.',
            icon: '📦'
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
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-4">
          {language === 'es' ? 'Precios globales transparentes' : 'Transparent Global Pricing'}
        </h2>
        <p className="text-[var(--muted)] mb-8">
          {language === 'es' 
            ? 'Precios justos en tu moneda local con métodos de pago regionales'
            : 'Fair pricing in your local currency with regional payment methods'
          }
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              name: language === 'es' ? 'Iglesia Local' : 'Local Church',
              price: "$199 USD",
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Hasta 1,000 miembros' : 'Up to 1,000 members',
              features: language === 'es' 
                ? ["Gestión básica de miembros", "Soporte multiidioma", "Pagos locales", "Migración asistida"]
                : ["Basic member management", "Multi-language support", "Local payments", "Assisted migration"]
            },
            {
              name: language === 'es' ? 'Iglesia Regional' : 'Regional Church', 
              price: "$499 USD",
              period: language === 'es' ? '/mes' : '/month',
              members: language === 'es' ? 'Hasta 5,000 miembros' : 'Up to 5,000 members',
              features: language === 'es'
                ? ["Todo lo anterior", "Multi-campus", "Reportes avanzados", "Soporte prioritario"]
                : ["Everything above", "Multi-campus", "Advanced reporting", "Priority support"],
              popular: true
            },
            {
              name: language === 'es' ? 'Red Internacional' : 'International Network',
              price: language === 'es' ? 'Personalizado' : 'Custom', 
              period: language === 'es' ? '' : '',
              members: language === 'es' ? 'Miembros ilimitados' : 'Unlimited members',
              features: language === 'es'
                ? ["Todo lo anterior", "API personalizada", "Cumplimiento GDPR", "Soporte 24/7"]
                : ["Everything above", "Custom API", "GDPR compliance", "24/7 support"]
            }
          ].map((plan, idx) => (
            <div key={idx} className={`card p-6 ${plan.popular ? 'border-[var(--brand)] shadow-lg' : ''}`}>
              {plan.popular && (
                <div className="text-center mb-4">
                  <span className="bg-[var(--brand)] text-black text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold gradient-text mb-1">
                  {plan.price}{plan.period && <span className="text-sm text-[var(--muted)]">{plan.period}</span>}
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
                onClick={() => trackCTAClick('global_pricing', `Plan ${plan.name}`)}
              >
                {plan.price === 'Custom' || plan.price === 'Personalizado'
                  ? (language === 'es' ? 'Contactar ventas' : 'Contact sales')
                  : (language === 'es' ? 'Solicitar demo' : 'Request demo')
                }
              </a>
            </div>
          ))}
        </div>

        <div className="text-sm text-[var(--muted)]">
          💳 {language === 'es' 
            ? 'Stripe, Wise, transferencias bancarias • 🌍 Cumplimiento GDPR/LGPD • 🔒 Certificaciones ISO'
            : 'Stripe, Wise, bank transfers • 🌍 GDPR/LGPD compliant • 🔒 ISO certified'
          }
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