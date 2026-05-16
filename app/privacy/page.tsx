import type { Metadata } from 'next';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Khesed-Tek Systems',
  description: 'Privacy Policy for Khesed-Tek Systems, LLC — a Delaware Limited Liability Company providing church management software.',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 mb-8" style={{ borderBottom: '3px solid var(--gold)' }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Kḥesed-tek Systems</h1>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Khesed-Tek Systems, LLC · Delaware Limited Liability Company</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>soporte@khesed-tek-systems.org · +57 302 123 4410</p>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Last Updated: March 9, 2026</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Document: Privacy Policy v1.0</p>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Privacy Policy</h2>
            <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Effective Date: March 9, 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
          </div>

          <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />

          <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>

            <Section title="1. Introduction">
              <p>Khesed-Tek Systems, LLC (&ldquo;Khesed-Tek&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a Delaware limited liability company, is committed to protecting the privacy of the churches, ministries, and organizations (&ldquo;you&rdquo; or &ldquo;your&rdquo;) that use our church management platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.</p>
            </Section>

            <Section title="2. Information We Collect">
              <p><strong>2.1. Account Information.</strong> When you register, we collect: the church or organization name, administrator name, email address, phone number, and billing information.</p>
              <p className="mt-3"><strong>2.2. Church Data.</strong> Data you enter into the platform including member records, attendance, donations, prayer requests, event information, and communications. You retain full ownership of this data.</p>
              <p className="mt-3"><strong>2.3. Usage Data.</strong> We automatically collect information about how you interact with the platform, including log data, IP addresses, browser type, pages visited, and actions taken.</p>
              <p className="mt-3"><strong>2.4. Payment Information.</strong> Payment details are processed by our payment processor (Paddle). We do not store full credit card numbers on our servers.</p>
              <p className="mt-3"><strong>2.5. Communications.</strong> If you contact our support team, we retain records of those communications.</p>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Provide, operate, and maintain the Khesed-Tek CMS platform</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send transactional emails (receipts, invoices, service notifications)</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve and develop new features for the platform</li>
                <li>Monitor and analyze usage patterns to enhance user experience</li>
                <li>Detect, prevent, and address technical issues or security breaches</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-3 font-semibold" style={{ color: 'var(--gold-hi)' }}>We do not sell your data or use it for advertising purposes.</p>
            </Section>

            <Section title="4. Data Sharing and Disclosure">
              <p>We may share your information only in the following circumstances:</p>
              <p className="mt-3"><strong>4.1. Service Providers.</strong> We share data with trusted third-party providers who assist us in operating the platform (cloud hosting, payment processing, email delivery). These providers are bound by strict confidentiality agreements.</p>
              <p className="mt-3"><strong>4.2. Legal Requirements.</strong> We may disclose data if required by law, court order, or governmental authority.</p>
              <p className="mt-3"><strong>4.3. Business Transfers.</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred. We will notify you before this occurs.</p>
              <p className="mt-3"><strong>4.4. Aggregated Data.</strong> We may share anonymized, aggregated statistics that cannot identify any individual church or person.</p>
              <p className="mt-3 font-semibold" style={{ color: 'var(--gold-hi)' }}>We never sell, rent, or trade your personal data to third parties for marketing purposes.</p>
            </Section>

            <Section title="5. Data Security">
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Encryption in transit (HTTPS/TLS) and at rest (AES-256)</li>
                <li>Automated daily backups with offsite storage</li>
                <li>Role-based access controls limiting data access to authorized personnel only</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Monitoring systems for suspicious activity and unauthorized access</li>
              </ul>
            </Section>

            <Section title="6. Data Retention">
              <p>We retain your data for as long as your account is active or as needed to provide services. Upon cancellation:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Your data remains accessible for up to 90 days to allow for export and recovery</li>
                <li>After 90 days, your data is permanently deleted from our systems</li>
                <li>Billing and transaction records may be retained for up to 7 years as required by law</li>
              </ul>
            </Section>

            <Section title="7. Your Rights">
              <p>As a user of our platform, you have the right to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li><strong>Access:</strong> Request a copy of the data we hold about your organization</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                <li><strong>Portability:</strong> Export your Church Data in standard formats (CSV, Excel)</li>
                <li><strong>Objection:</strong> Object to processing of your data in certain circumstances</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a>.</p>
            </Section>

            <Section title="8. Children's Privacy">
              <p>Our platform is not directed at individuals under 13 years of age. If your church stores information about minors, you are responsible for ensuring you have obtained the necessary parental or guardian consent as required by applicable law, including COPPA (Children&apos;s Online Privacy Protection Act) if applicable.</p>
            </Section>

            <Section title="9. International Data Transfers">
              <p>Khesed-Tek Systems, LLC is based in the United States. Your data may be stored and processed in the United States or other countries where our service providers operate. By using our Services, you consent to the transfer of your data to countries that may have different data protection laws than your country of residence. We ensure appropriate safeguards are in place for all international transfers.</p>
            </Section>

            <Section title="10. Cookies and Tracking">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze platform usage patterns</li>
                <li>Improve platform functionality</li>
              </ul>
              <p className="mt-3">You can control cookie settings through your browser. Disabling cookies may affect certain platform features.</p>
            </Section>

            <Section title="11. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or through the platform at least 30 days before the changes take effect. Your continued use of the Services after the effective date constitutes acceptance of the updated policy.</p>
            </Section>

            <Section title="12. Contact Us">
              <ContactBox />
            </Section>

          </div>

          <div className="mt-12 text-center text-xs py-4 px-6 rounded" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}>
            BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY.
          </div>

          <div className="mt-8 pt-4 text-center text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
            © 2026 Khesed-Tek Systems, LLC. All rights reserved. · A Delaware Limited Liability Company
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3
        className="text-xs font-bold uppercase tracking-widest mb-3 pl-3 py-0.5"
        style={{ color: 'var(--text)', borderLeft: '3px solid var(--gold)' }}
      >
        {title}
      </h3>
      <div style={{ color: 'var(--muted)' }}>{children}</div>
    </section>
  );
}

function ContactBox() {
  return (
    <div className="rounded p-5 mt-2" style={{ border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)', background: 'var(--surface)' }}>
      <p className="font-bold" style={{ color: 'var(--text)' }}>Khesed-Tek Systems, LLC</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>(Delaware Limited Liability Company)</p>
      <p className="mt-2">Email: <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a></p>
      <p>Phone: <a href="tel:+573011234410" className="underline" style={{ color: 'var(--gold-hi)' }}>+57 301 123 4410</a></p>
      <p>Website: <a href="https://www.khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>www.khesed-tek-systems.org</a></p>
    </div>
  );
}
