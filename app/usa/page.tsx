'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, USA_VALUE_PROP_TEST, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';
import AnimatedPricingCard from '@/components/pricing/animated-pricing-card';
import FeatureComparisonTable from '@/components/pricing/feature-comparison';
import LocalizedPriceDisplay from '@/components/pricing/currency-localization';
import { PricingPlan } from '@/types/pricing';
import TestimonialsSection from '@/components/social-proof/testimonials-section';
import TrustSignalsSection from '@/components/social-proof/trust-signals';
import ROICalculator from '@/components/conversion/roi-calculator';
import DemoVideoSection from '@/components/conversion/demo-video-section';

export default function USAMarketPage() {
  const { market, language } = useGlobalMarket();
  
  const valuePropsVariant = useABTest(USA_VALUE_PROP_TEST, 'USA');
  const ctaVariant = useABTest(CTA_BUTTON_TEST, 'USA');
  
  const valuePropText = getVariantContent(USA_VALUE_PROP_TEST, valuePropsVariant, 'en');
  const ctaText = getVariantContent(CTA_BUTTON_TEST, ctaVariant, 'en', CTA_BUTTON_CONTENT);

  const handleCTAClick = () => {
    trackCTAClick('usa_hero_section', ctaText);
    trackABTestConversion(CTA_BUTTON_TEST.testId, ctaVariant, 'cta_click', 'USA');
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* USA-Specific Hero Section */}
      <section
        className="relative overflow-hidden text-center px-6 py-24"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(110,231,255,.07), transparent 60%), radial-gradient(900px 300px at 90% -20%, rgba(139,92,246,.08), transparent 55%), var(--bg)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-sm uppercase tracking-wide text-[var(--brand)] mb-4">
            🇺🇸 USA Market - Enterprise Church Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {valuePropText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            Transform your ministry with enterprise-grade technology designed for growing American churches. 
            Seamless integrations, scalable architecture, and 24/7 support.
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
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition"
              onClick={() => trackCTAClick('usa_phone', 'Call Sales Team')}
            >
              📞 Call Sales Team
            </a>
          </div>
          <div className="text-sm text-[var(--muted)]">
            🕐 EST/PST Business Hours • 💬 English Support • 🏢 Enterprise-Ready
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <DemoVideoSection 
        market="USA" 
        language="en" 
        className="bg-[var(--surface)]"
      />

      {/* Trust Signals */}
      <TrustSignalsSection className="bg-[var(--bg)]" />

      {/* USA-Specific Features */}
      <section id="features" className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-12">
        {[
          { 
            pill: 'Enterprise', 
            title: 'Multi-campus management', 
            desc: 'Unified platform for mega-churches with multiple locations and complex organizational structures.',
            icon: '🏢'
          },
          { 
            pill: 'Integrations', 
            title: 'Seamless third-party apps', 
            desc: 'Connect with Salesforce, Mailchimp, Zoom, Teams, and 50+ popular ministry tools.',
            icon: '🔗'
          },
          { 
            pill: 'Compliance', 
            title: 'SOX & GDPR ready', 
            desc: 'Enterprise-grade security and compliance for financial reporting and data protection.',
            icon: '🛡️'
          },
          { 
            pill: 'Analytics', 
            title: 'Advanced reporting', 
            desc: 'Business intelligence dashboard with KPIs, trends, and predictive analytics.',
            icon: '📊'
          },
          { 
            pill: 'API', 
            title: 'Custom development', 
            desc: 'RESTful API and webhooks for custom integrations and workflow automation.',
            icon: '⚡'
          },
          { 
            pill: 'Support', 
            title: '24/7 enterprise support', 
            desc: 'Dedicated account manager with SLA guarantees and priority response times.',
            icon: '🎯'
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

      {/* USA Enterprise Case Studies */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Trusted by Leading American Churches</h2>
          <p style={{ color: 'var(--muted)' }}>
            Enterprise success stories from growing ministries across the United States
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              church: "Grace Community Church",
              location: "Houston, TX", 
              members: "8,000+ members",
              campuses: "5 campuses",
              result: "40% increase in digital engagement",
              quote: "KHESED-TEK's platform scaled with our rapid growth perfectly.",
              pastor: "Pastor John Wilson",
              stats: "↗️ 40% engagement • 💰 $2M+ managed • ⚡ 99.9% uptime"
            },
            {
              church: "New Life Ministry",
              location: "Orlando, FL",
              members: "12,000+ members",
              campuses: "8 campuses", 
              result: "60% improvement in operational efficiency",
              quote: "The multi-campus features transformed our church operations.",
              pastor: "Pastor Sarah Johnson",
              stats: "📈 60% efficiency • 🎯 95% member satisfaction • 💡 50+ integrations"
            },
            {
              church: "Faith Center International",
              location: "Phoenix, AZ",
              members: "15,000+ members",
              campuses: "12 campuses",
              result: "80% reduction in administrative overhead", 
              quote: "Enterprise-grade reliability with ministry-focused features.",
              pastor: "Pastor David Martinez",
              stats: "⚡ 80% admin reduction • 🌐 12 campus sync • 📱 Mobile-first"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{testimonial.church}</h4>
                <div className="text-sm text-[var(--muted)] mb-2">
                  📍 {testimonial.location} • 👥 {testimonial.members} • 🏢 {testimonial.campuses}
                </div>
                <div className="text-sm font-medium text-[var(--brand)]">
                  📈 {testimonial.result}
                </div>
              </div>
              <blockquote className="italic text-[var(--muted)] mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-sm mb-3">
                — {testimonial.pastor}
              </div>
              <div className="text-xs text-[var(--muted)] border-t border-[var(--border)] pt-3">
                {testimonial.stats}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USA Enterprise Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Enterprise Pricing for American Churches</h2>
          <p className="text-[var(--muted)] mb-4">
            Transparent pricing with no hidden fees. Annual discounts available.
          </p>
          <div className="text-sm text-[var(--muted)]">
            <LocalizedPriceDisplay basePrice={149.99} showEstimates={true} />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: "small",
              name: "Small Church",
              price: "$149.99",
              period: "/month",
              members: "Up to 200 members",
              features: ["Core church management", "Basic integrations", "Email support", "Training included"],
              ctaText: "Start Free Trial",
              ctaUrl: "/contact?plan=small"
            },
            {
              id: "medium",
              name: "Medium Church", 
              price: "$299.99",
              period: "/month",
              members: "Up to 1,000 members",
              features: ["Multi-campus support", "Advanced integrations", "Phone + email support", "Custom training"],
              popular: true,
              ctaText: "Most Popular",
              ctaUrl: "/contact?plan=medium"
            },
            {
              id: "large",
              name: "Large Church",
              price: "$599.99", 
              period: "/month",
              members: "Unlimited members",
              features: ["Enterprise features", "Dedicated support", "Custom integrations", "SLA guarantees"],
              ctaText: "Contact Sales",
              ctaUrl: "/contact?plan=large"
            }
          ].map((plan, idx) => (
            <AnimatedPricingCard
              key={plan.id}
              plan={plan as PricingPlan}
              index={idx}
              onSelect={(planId: string) => trackCTAClick('usa_pricing', `Plan ${planId}`)}
            />
          ))}
        </div>

        {/* Feature Comparison Table */}
        <FeatureComparisonTable 
          plans={[
            { id: "small", name: "Small Church", price: "$149.99", period: "/month", members: "200", features: [] },
            { id: "medium", name: "Medium Church", price: "$299.99", period: "/month", members: "1,000", features: [], popular: true },
            { id: "large", name: "Large Church", price: "$599.99", period: "/month", members: "Unlimited", features: [] }
          ]}
          language="en"
          className="mt-16"
        />

        <div className="text-sm text-[var(--muted)] text-center mt-8">
          💳 Stripe, ACH, Wire Transfer accepted • 📞 Dedicated account manager included • 🔒 SOX compliant
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Calculate Your ROI</h2>
          <p className="text-[var(--muted)] text-lg">
            Discover how much your church can save with KHESED-TEK
          </p>
        </div>
        <ROICalculator 
          language="en" 
          market="USA" 
          showDetailed={true}
          className="max-w-4xl mx-auto"
        />
      </section>

      {/* Enterprise Features Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Enterprise-Grade Features</h2>
          <p style={{ color: 'var(--muted)' }}>
            Built for the complexity and scale of modern American ministries
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              category: "🏢 Multi-Campus Operations",
              features: [
                "Centralized management across all locations",
                "Location-specific reporting and analytics", 
                "Cross-campus member transfers",
                "Unified giving and financial reporting"
              ]
            },
            {
              category: "🔗 Enterprise Integrations",
              features: [
                "Salesforce CRM synchronization",
                "QuickBooks & accounting platforms",
                "Mailchimp & email marketing tools",
                "Zoom, Teams & video conferencing"
              ]
            },
            {
              category: "📊 Advanced Analytics",
              features: [
                "Executive dashboard with KPIs",
                "Predictive attendance modeling",
                "Giving trend analysis",
                "Member lifecycle tracking"
              ]
            },
            {
              category: "🛡️ Security & Compliance",
              features: [
                "SOX compliance for financial reporting",
                "GDPR & data protection compliance",
                "Bank-level security encryption",
                "Regular security audits & certifications"
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="card p-6">
              <h3 className="font-semibold text-lg mb-4">{section.category}</h3>
              <ul className="space-y-2">
                {section.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-1">✓</span>
                    <span style={{ color: 'var(--muted)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About Section - Nosotros */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-6">About KHESED-TEK SYSTEMS</h2>
        <div style={{ color: 'var(--muted)' }} className="text-lg mb-8 space-y-4">
          <p>
            KHESED-TEK SYSTEMS is an innovative software and automation company dedicated to serving the Christian community. 
            Based in Barranquilla, Atlántico, we empower churches and faith-based organizations by designing customized 
            artificial intelligence and integration solutions that address their unique operational challenges.
          </p>
          <p>
            We understand that your mission is spiritual, but your operations are practical. Our goal is to streamline 
            your administrative tasks, optimize resource allocation, and enhance productivity. By handling the complexities 
            of technology, we free your team to focus on what matters most: serving your congregation and strengthening your community.
          </p>
          <p className="font-medium text-[var(--brand)]">
            Let us build the technological foundation that supports and amplifies your impact.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">50+</div>
            <div className="text-sm text-[var(--muted)]">Churches served internationally</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">5+</div>
            <div className="text-sm text-[var(--muted)]">Years of church technology expertise</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">24/7</div>
            <div className="text-sm text-[var(--muted)]">Global support coverage</div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Trusted by Churches Nationwide</h2>
          <p className="text-[var(--muted)] text-lg">
            Join hundreds of churches already transforming their ministries
          </p>
        </div>
        <TestimonialsSection 
          variant="carousel"
          autoRotate={true}
          showMetrics={true}
        />
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto text-center px-6 py-12">
        <h2 className="text-3xl font-semibold mb-2">Ready to Scale Your Ministry?</h2>
        <p style={{ color: 'var(--muted)' }} className="mb-8">
          Our USA team is ready to discuss your church's growth and technology needs
        </p>
        
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">📞 USA Sales Team</h3>
            <div className="space-y-2 text-sm">
              <div>📧 usa@khesed-tek-systems.org</div>
              <div>📞 +1 (555) 123-4567</div>
              <div>🏢 Miami, FL (Expansion Office)</div>
              <div>🕐 Monday-Friday 9AM-6PM EST</div>
              <div>🌐 Nationwide support coverage</div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4">🎯 Enterprise Demo</h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div>✓ Customized platform demonstration</div>
              <div>✓ Technical requirements assessment</div>
              <div>✓ Integration planning session</div>
              <div>✓ ROI analysis and pricing</div>
              <div>✓ Implementation timeline</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}