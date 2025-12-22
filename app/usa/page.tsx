'use client';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';
import { trackCTAClick } from '@/lib/analytics';
import { useABTest, getVariantContent, trackABTestConversion, USA_VALUE_PROP_TEST, CTA_BUTTON_TEST, CTA_BUTTON_CONTENT } from '@/lib/ab-testing';
import { useGlobalMarket } from '@/lib/global-market';
import AnimatedPricingCard from '@/components/pricing/animated-pricing-card';
import FeatureComparisonTable from '@/components/pricing/feature-comparison';
import { PricingPlan } from '@/types/pricing';
import TestimonialsSection from '@/components/social-proof/testimonials-section';
import TrustSignalsSection from '@/components/social-proof/trust-signals';
import ROICalculator from '@/components/conversion/roi-calculator';
import DemoVideoSection from '@/components/conversion/demo-video-section';
import OutlineIcon from '@/components/ui/outline-icon';

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
          <div className="text-sm uppercase tracking-wide text-[var(--brand)] mb-4 flex items-center justify-center gap-2">
            <OutlineIcon name="globe" className="w-4 h-4 text-cyan-400" />
            <span>USA Market - Enterprise Church Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 gradient-text leading-tight hero-heading">
            {valuePropText}
          </h1>
          <p className="max-w-3xl mx-auto text-lg mb-6" style={{ color: 'var(--muted)' }}>
            At KHESED-TEK SYSTEMS, cutting-edge technology meets divine purpose. 
            Our flagship solution, KHESED-TEK-CMS, is born from a profound conviction: software is not 
            the end, but the strategic means to enhance the fulfillment of The Great Commission.
          </p>
          <p className="max-w-3xl mx-auto text-base mb-6 italic" style={{ color: 'var(--muted)' }}>
            Our mission is to equip your church with Ministerial Intelligence, facilitating the biblical 
            mandate of Proverbs 27:23: "Be diligent to know the state of your flocks, and attend to your herds."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="/contact?program=beta"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition"
              onClick={handleCTAClick}
            >
              Join Beta Program →
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition"
              onClick={() => trackCTAClick('usa_phone', 'Call Sales Team')}
            >
              <OutlineIcon name="phone" className="w-4 h-4 text-[var(--brand)]" /> Call Sales Team
            </a>
          </div>
          <div className="text-sm text-[var(--muted)] flex items-center justify-center gap-2">
            <OutlineIcon name="clock" className="w-4 h-4 text-cyan-400" />
            <span>EST/PST Business Hours</span>
            <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
            <OutlineIcon name="mail" className="w-4 h-4 text-cyan-400" />
            <span>English Support</span>
            <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
            <OutlineIcon name="shield" className="w-4 h-4 text-cyan-400" />
            <span>Enterprise-Ready</span>
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
      <TrustSignalsSection 
        market="USA" 
        className="bg-[var(--bg)]" 
      />

      {/* USA-Specific Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Enterprise-Grade Features</h2>
          <p className="text-[var(--muted)] text-lg mb-6">
            Advanced capabilities that set KHESED-TEK apart from Planning Center, Breeze, and other competitors
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] text-sm">
            <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
            <span>Outperforming ChurchTrac, Aplos, and TouchPoint in key areas</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { 
              pill: 'AI-Powered', 
              title: 'Smart Volunteer Matching', 
              desc: 'AI automatically matches volunteers with ministries based on spiritual gifts assessment. Planning Center offers basic scheduling; we provide intelligent recommendations.',
              icon: 'users',
              advantage: 'vs Planning Center: 75% more efficient volunteer placement'
            },
            { 
              pill: 'Enterprise', 
              title: 'Multi-Campus Intelligence', 
              desc: 'Advanced analytics across multiple locations with predictive insights. TouchPoint charges $20K+/year; we include it standard.',
              icon: 'marker',
              advantage: 'vs TouchPoint: 60% cost savings with superior analytics'
            },
            { 
              pill: 'Automation', 
              title: 'Comprehensive Workflow Engine', 
              desc: 'Complete automation system with custom triggers and AI responses. Breeze offers none; ChurchTrac has limited automation.',
              icon: 'zap',
              advantage: 'vs Breeze/ChurchTrac: Unique advanced automation'
            },
            { 
              pill: 'Integration', 
              title: 'Unified Social Media Manager', 
              desc: 'Native Facebook, Instagram, YouTube, TikTok management with AI scheduling. Competitors require separate tools.',
              icon: 'diamond',
              advantage: 'vs All: First ChMS with complete social integration'
            },
            { 
              pill: 'Intelligence', 
              title: 'Predictive Engagement Analytics', 
              desc: 'AI predicts member disengagement and suggests interventions. No competitor offers predictive member retention.',
              icon: 'circle',
              advantage: 'vs All: Unique predictive member analytics'
            },
            { 
              pill: 'Security', 
              title: 'SOX & Enterprise Compliance', 
              desc: 'Built-in SOX compliance, GDPR ready, enterprise security. Aplos focuses only on accounting compliance.',
              icon: 'shield',
              advantage: 'vs Aplos: Complete compliance beyond accounting'
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
              <OutlineIcon name="diamond" className="w-3 h-3 text-cyan-400 mr-1" />
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
              Why Churches Choose KHESED-TEK Over Competitors
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-[var(--brand)]">vs Planning Center ($100+/month):</strong>
                <p className="text-[var(--muted)]">Same features + AI automation at competitive price</p>
              </div>
              <div>
                <strong className="text-[var(--brand)]">vs TouchPoint ($20K+/year):</strong>
                <p className="text-[var(--muted)]">Enterprise features at 80% less cost</p>
              </div>
              <div>
                <strong className="text-[var(--brand)]">vs Breeze/ChurchTrac:</strong>
                <p className="text-[var(--muted)]">Advanced AI features they don't offer</p>
              </div>
            </div>
          </div>
        </div>
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
              stats: (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
                  <span>40% engagement</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="dollar-sign" className="w-4 h-4 text-cyan-400" />
                  <span>$2M+ managed</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="monitor" className="w-4 h-4 text-cyan-400" />
                  <span>99.9% uptime</span>
                </div>
              )
            },
            {
              church: "New Life Ministry",
              location: "Orlando, FL",
              members: "12,000+ members",
              campuses: "8 campuses", 
              result: "60% improvement in operational efficiency",
              quote: "The multi-campus features transformed our church operations.",
              pastor: "Pastor Sarah Johnson",
              stats: (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <OutlineIcon name="square" className="w-4 h-4 text-cyan-400" />
                  <span>60% efficiency</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
                  <span>95% member satisfaction</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="circle" className="w-4 h-4 text-cyan-400" />
                  <span>50+ integrations</span>
                </div>
              )
            },
            {
              church: "Faith Center International",
              location: "Phoenix, AZ",
              members: "15,000+ members",
              campuses: "12 campuses",
              result: "80% reduction in administrative overhead", 
              quote: "Enterprise-grade reliability with ministry-focused features.",
              pastor: "Pastor David Martinez",
              stats: (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <OutlineIcon name="clock" className="w-4 h-4 text-cyan-400" />
                  <span>80% admin reduction</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="buildings" className="w-4 h-4 text-cyan-400" />
                  <span>12 campus sync</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="phone" className="w-4 h-4 text-cyan-400" />
                  <span>Mobile-first</span>
                </div>
              )
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="card p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-lg">{testimonial.church}</h4>
                <div className="text-sm text-[var(--muted)] mb-2 flex items-center justify-center gap-2">
                  <OutlineIcon name="marker" className="w-4 h-4 text-cyan-400" />
                  <span>{testimonial.location}</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="users" className="w-4 h-4 text-cyan-400" />
                  <span>{testimonial.members}</span>
                  <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-1" />
                  <OutlineIcon name="square" className="w-4 h-4 text-cyan-400" />
                  <span>{testimonial.campuses}</span>
                </div>
                <div className="text-sm font-medium text-[var(--brand)] flex items-center justify-center gap-2">
                  <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
                  <span>{testimonial.result}</span>
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
          <div className="text-lg text-[var(--muted)] mb-4">
            Fixed pricing by church size - No additional module fees
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              id: "small",
              name: "Small Church",
              price: "$149.99",
              period: "/month",
              members: "Up to 500 members",
              features: ["Core church management", "Up to 5 user licenses", "Basic integrations", "Email support", "Training included"],
              ctaText: "Start Free Trial",
              ctaUrl: "/contact?plan=small"
            },
            {
              id: "medium",
              name: "Medium Church", 
              price: "$299.99",
              period: "/month",
              members: "Up to 2,000 members",
              features: ["Up to 10 user licenses", "Advanced integrations", "Phone + email support", "Custom training"],
              popular: true,
              ctaText: "Most Popular",
              ctaUrl: "/contact?plan=medium"
            },
            {
              id: "large",
              name: "Large Church",
              price: "Custom", 
              period: "",
              members: "Unlimited members",
              features: ["Unlimited licenses", "Multi-campus support", "Enterprise features", "Dedicated support", "Custom integrations", "SLA guarantees"],
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
            { id: "small", name: "Small Church", price: "$149.99", period: "/month", members: "500", features: [] },
            { id: "medium", name: "Medium Church", price: "$299.99", period: "/month", members: "2,000", features: [], popular: true },
            { id: "large", name: "Large Church", price: "Custom", period: "", members: "Unlimited", features: [] }
          ]}
          language="en"
          className="mt-16"
        />

        <div className="text-sm text-[var(--muted)] text-center mt-8 flex items-center justify-center gap-2">
          <OutlineIcon name="credit-card" className="w-4 h-4 text-cyan-400" />
          <span>Stripe, ACH, Wire Transfer accepted</span>
          <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-2" />
          <OutlineIcon name="user" className="w-4 h-4 text-cyan-400" />
          <span>Dedicated account manager included</span>
          <OutlineIcon name="dot" className="w-2 h-2 text-cyan-400 mx-2" />
          <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
          <span>SOX compliant</span>
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

      {/* Beta Program Launch */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="card p-8 bg-gradient-to-br from-[var(--brand)]/5 to-[var(--brand2)]/5 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--brand)]/10 text-[var(--brand)] px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 <span>Beta Program - Limited Launch</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Join Our Enterprise Beta Program</h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            Be among the first churches to experience KHESED-TEK-CMS. 
            Get full access and help us perfect the platform designed specifically for American ministry leadership.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
              <div className="text-3xl font-bold text-[var(--brand)] mb-2">30 days</div>
              <div className="text-sm text-[var(--muted)]">Completely free access</div>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
              <div className="text-3xl font-bold text-[var(--brand)] mb-2">50%</div>
              <div className="text-sm text-[var(--muted)]">First year discount<br/>(First 25 churches)</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact?program=beta" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full gradient-btn hover:scale-105 transition">
              Apply to Beta Program →
            </a>
            <a href="tel:+15551234567" className="inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-full border border-[var(--border)] hover:border-[var(--brand)] transition">
              Call: +1 (555) 123-4567
            </a>
          </div>
        </div>
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
              category: (
                <div className="flex items-center gap-2">
                  <OutlineIcon name="square" className="w-4 h-4 text-cyan-400" />
                  <span>Multi-Campus Operations</span>
                </div>
              ),
              features: [
                "Centralized management across all locations",
                "Location-specific reporting and analytics", 
                "Cross-campus member transfers",
                "Unified giving and financial reporting"
              ]
            },
            {
              category: "Enterprise Integrations",
              features: [
                "Salesforce CRM synchronization",
                "QuickBooks & accounting platforms",
                "Mailchimp & email marketing tools",
                "Zoom, Teams & video conferencing"
              ]
            },
            {
              category: (
                <div className="flex items-center gap-2">
                  <OutlineIcon name="square" className="w-4 h-4 text-cyan-400" />
                  <span>Advanced Analytics</span>
                </div>
              ),
              features: [
                "Executive dashboard with KPIs",
                "Predictive attendance modeling",
                "Giving trend analysis",
                "Member lifecycle tracking"
              ]
            },
            {
              category: (
                <div className="flex items-center gap-2">
                  <OutlineIcon name="diamond" className="w-4 h-4 text-cyan-400" />
                  <span>Security & Compliance</span>
                </div>
              ),
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
                    <OutlineIcon name="check" className="w-3 h-3 text-cyan-400 mt-1" />
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
            We are an innovative software and automation firm based in Barranquilla, dedicated exclusively to serving the Kingdom. 
            We empower faith-based organizations through the design of personalized Artificial Intelligence solutions 
            and process integration, solving their most complex operational challenges.
          </p>
          <p>
            We understand that while your mission is spiritual, execution is practical. We optimize your administrative tasks 
            and resource allocation so your team can recover the most valuable asset: time to shepherd and strengthen the community, 
            while we manage the technological complexity.
          </p>
          <p className="font-medium text-[var(--brand)]">
            Let us build the digital infrastructure that supports and amplifies your eternal impact.
          </p>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">10,000+</div>
            <div className="text-sm text-[var(--muted)]">Members supported</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">40+</div>
            <div className="text-sm text-[var(--muted)]">Years serving in ministry</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">99.9%</div>
            <div className="text-sm text-[var(--muted)]">Uptime guarantee</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--brand)] mb-2">15+</div>
            <div className="text-sm text-[var(--muted)]">Available integrations</div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Join Our Beta Program</h2>
          <p className="text-[var(--muted)] text-lg">
            Be among the first 25 churches to experience enterprise-grade ministry management
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
            <h3 className="font-semibold mb-4 flex items-center">
              <OutlineIcon name="users" className="w-4 h-4 text-cyan-400 mr-2" />
              <span>USA Sales Team</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <OutlineIcon name="mail" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>contact@khesed-tek-systems.org</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="phone" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="marker" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>Miami, FL (Expansion Office)</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="clock" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>Monday-Friday 9AM-6PM EST</span>
              </div>
              <div className="flex items-center">
                <OutlineIcon name="globe" className="w-4 h-4 text-cyan-400 mr-2" />
                <span>Nationwide support coverage</span>
              </div>
            </div>
          </div>
          <div className="card p-6 text-left">
            <h3 className="font-semibold mb-4 flex items-center">
              <OutlineIcon name="shield" className="w-4 h-4 text-cyan-400 mr-2" />
              <span>Enterprise Demo</span>
            </h3>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Customized platform demonstration
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Technical requirements assessment
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Integration planning session
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                ROI analysis and pricing
              </div>
              <div className="flex items-center gap-2">
                <OutlineIcon name="check" className="w-3 h-3 text-cyan-400" />
                Implementation timeline
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}