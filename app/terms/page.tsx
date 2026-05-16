import type { Metadata } from 'next';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Khesed-Tek Systems',
  description: 'Terms and Conditions of Service for Khesed-Tek Systems, LLC — a Delaware Limited Liability Company providing church management software.',
};

export default function TermsPage() {
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
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Document: Terms &amp; Conditions v1.0</p>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Terms and Conditions of Service</h2>
            <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Effective Date: March 9, 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
          </div>

          <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />

          <div className="space-y-8 text-sm leading-relaxed" style={{ color: 'var(--text)' }}>

            <Section title="1. Definitions and Parties">
              <p><strong>1.1. The Parties.</strong> This agreement is entered into between Khesed-Tek Systems, LLC, a Delaware limited liability company (hereinafter &ldquo;Khesed-Tek&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), and the church, ministry, or non-profit organization (hereinafter &ldquo;the Church&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) that contracts our Services.</p>
              <p className="mt-3"><strong>1.2. Key Definitions.</strong></p>
              <DefinitionsTable />
            </Section>

            <Section title="2. Acceptance of Terms">
              <p><strong>2.1. Acceptance.</strong> By creating an account, accessing, or using any Khesed-Tek Systems Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you are entering into this agreement on behalf of a church or other entity, you represent and warrant that you have full legal authority to bind that entity.</p>
              <p className="mt-3"><strong>2.2. Modifications.</strong> We may modify these Terms at any time. Material changes will be notified through the Platform or by email at least 30 days in advance. Continued use of the Services after the effective date constitutes acceptance of the modified terms.</p>
              <p className="mt-3"><strong>2.3. Governing Law.</strong> These Terms and any disputes arising out of or related to the Services shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles. The parties acknowledge that the Delaware Limited Liability Company Act (6 Del. C. § 18-101 et seq.) shall apply to all company governance matters.</p>
              <p className="mt-3"><strong>2.4. Legal Capacity.</strong> The person creating the account on behalf of the Church declares and warrants that they have full authority to legally bind the Church and are at least 18 years of age.</p>
            </Section>

            <Section title="3. Account Creation and Administration">
              <p><strong>3.1. Registration.</strong> To use our Services, you must provide complete and accurate information, including the Church&apos;s full legal name, a valid email address, and billing information.</p>
              <p className="mt-3"><strong>3.2. Administrators.</strong></p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>The initial user who creates the account shall be designated as the Primary Administrator.</li>
                <li>Administrators have the authority to manage users, configure permissions, and control the subscription.</li>
                <li>In the event of an internal dispute between Administrators, Khesed-Tek may suspend access until the Church resolves the conflict and provides written instructions signed by its legal representative.</li>
              </ul>
              <p className="mt-3"><strong>3.3. Authorized Users.</strong></p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Each user must have unique login credentials. Shared logins are not permitted.</li>
                <li>Administrators are responsible for the actions of all Authorized Users under their account.</li>
                <li>When a user is removed, they will immediately lose all access to the Platform.</li>
              </ul>
              <p className="mt-3"><strong>3.4. Account Security.</strong> You are responsible for: maintaining the confidentiality of all access credentials; ensuring users log out when not using the Platform; and notifying us immediately of any unauthorized access or security breach.</p>
              <p className="mt-3"><strong>3.5. Minimum Age.</strong> Access to the Platform is not permitted for individuals under 13 years of age. If your Church stores information about minors, you represent and warrant that you have obtained the required parental or guardian consent under applicable law.</p>
            </Section>

            <Section title="4. Intellectual Property Rights">
              <p><strong>4.1. Ownership by Khesed-Tek.</strong> Khesed-Tek Systems, LLC retains all right, title, and interest in and to: the source code, design, interface, and functionality of the Platform; our trademarks, logos, and trade names; content provided by Khesed-Tek; and any improvements, modifications, or updates to the Services.</p>
              <p className="mt-3"><strong>4.2. License to Use.</strong> We grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Services solely for your internal ministry purposes, in accordance with these Terms and during the term of your subscription.</p>
              <p className="mt-3"><strong>4.3. Ownership of Church Data.</strong> You retain all ownership rights to the Church Data you enter into the Platform. We claim no ownership over your data.</p>
              <p className="mt-3"><strong>4.4. License to Church Data.</strong> To provide the Services, you grant us a limited license to: store, process, and backup your data; use your data in anonymized and aggregated form to improve our Services; and share your data with technical providers under strict confidentiality obligations.</p>
              <p className="mt-3"><strong>4.5. Restrictions.</strong> You may not reverse engineer, copy, modify, sell, rent, sublicense, or use the Platform to create a competing product.</p>
            </Section>

            <Section title="5. Acceptable Use and Conduct">
              <p><strong>5.1. Ministerial Purpose.</strong> Khesed-Tek CMS is designed exclusively to support the work of churches and ministries aligned with traditional Christian values. We reserve the right to determine, in our sole discretion, whether a client&apos;s use aligns with this purpose.</p>
              <p className="mt-3"><strong>5.2. Prohibited Conduct.</strong> You and your Authorized Users may NOT:</p>
              <ProhibitedTable />
              <p className="mt-3"><strong>5.3. Monitoring.</strong> We may monitor use of the Services to detect violations of this policy.</p>
              <p className="mt-3"><strong>5.4. Third-Party Privacy.</strong> When posting information about other individuals (including prayer requests), you represent that you have their consent or a valid legal basis.</p>
            </Section>

            <Section title="6. Commercial Terms and Payments">
              <p><strong>6.1. Subscriptions.</strong> Our Services are offered on a monthly or annual subscription basis. Current pricing is published on our website and may be modified with 30 days&apos; prior notice.</p>
              <p className="mt-3"><strong>6.2. Billing and Payments.</strong> Payments are processed via credit card, debit card, or ACH bank transfer. By providing payment information, you authorize automatic charges according to your chosen billing cycle. Receipts and invoices are available within the Platform.</p>
              <p className="mt-3"><strong>6.3. Taxes.</strong> Prices do not include applicable taxes. You are responsible for paying all taxes arising from your subscription in your jurisdiction.</p>
              <p className="mt-3"><strong>6.4. Late Payments and Default.</strong> If payment cannot be processed: you will be notified to update your information; an administrative fee of $30 USD may be applied per failed transaction; accounts more than 30 days past due may be suspended; and interest on overdue amounts shall accrue at 1.5% per month.</p>
              <p className="mt-3"><strong>6.5. Price Increases.</strong> Any price changes will be notified at least 30 days in advance. If you do not agree to the new price, you may cancel before the effective date.</p>
              <p className="mt-3"><strong>6.6. Mission Commitment.</strong> A portion of Khesed-Tek&apos;s earnings is allocated to fund the rehabilitation programs of Misión Khesed in Colombia and Latin America, as reflected in our operating agreement.</p>
            </Section>

            <Section title="7. Data Ownership and Security">
              <p><strong>7.1. Data Ownership.</strong> Church Data belongs exclusively to you. Khesed-Tek Systems, LLC acts as a data processor on your behalf.</p>
              <p className="mt-3"><strong>7.2. Confidentiality.</strong> We will not sell, rent, or share your data with third parties for marketing purposes. We only share data with technical providers necessary to operate the service, to comply with legal obligations, or in anonymized and aggregated form for statistical analysis.</p>
              <p className="mt-3"><strong>7.3. Security.</strong> We implement encryption in transit (HTTPS/SSL) and at rest, automated daily backups, role-based access controls, and monitoring for suspicious activity.</p>
              <p className="mt-3"><strong>7.4. Customer Responsibility.</strong> You are responsible for obtaining all necessary consents to store personal data, properly configuring user permissions, and maintaining your own backups of critical information.</p>
              <p className="mt-3"><strong>7.5. International Data Transfers.</strong> Your data may be stored and processed on servers in the United States or other countries. By using our Services, you consent to these international transfers.</p>
            </Section>

            <Section title="8. Service Availability">
              <p><strong>8.1. &ldquo;As Is&rdquo; and &ldquo;As Available&rdquo;.</strong> The Services are provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE,&rdquo; without warranties of any kind, either express or implied.</p>
              <p className="mt-3"><strong>8.2. Disclaimer of Warranties.</strong> We expressly disclaim all implied warranties of merchantability, fitness for a particular purpose, non-infringement, and accuracy or reliability of results.</p>
              <p className="mt-3"><strong>8.3. Interruptions.</strong> We do not guarantee that the service will be uninterrupted, error-free, or completely secure.</p>
              <p className="mt-3"><strong>8.4. Maintenance.</strong> We may temporarily suspend access to perform maintenance or updates. We will endeavor to perform maintenance during off-peak hours with advance notice.</p>
              <p className="mt-3"><strong>8.5. Force Majeure.</strong> We shall not be liable for failures caused by events beyond our reasonable control, including acts of God, war, terrorism, power failures, or governmental actions.</p>
            </Section>

            <Section title="9. Limitation of Liability">
              <p><strong>9.1. Exclusion of Damages.</strong> To the maximum extent permitted by Delaware law, Khesed-Tek Systems, LLC shall not be liable for indirect, incidental, special, consequential, or punitive damages; loss of data, revenue, profits, or business opportunities; or costs of procuring substitute services.</p>
              <p className="mt-3"><strong>9.2. Cap on Liability.</strong> Our total liability shall not exceed the total amount paid by you during the twelve (12) months immediately preceding the event giving rise to the claim.</p>
              <p className="mt-3"><strong>9.3. Exceptions.</strong> This limitation does not apply in cases of proven gross negligence, willful misconduct, death or personal injury caused by our negligence, or liability that cannot be limited by applicable law.</p>
              <p className="mt-3"><strong>9.4. Data Loss.</strong> You are responsible for maintaining independent backups of your data.</p>
            </Section>

            <Section title="10. Cancellation and Termination">
              <p><strong>10.1. Cancellation by You.</strong> You may cancel your subscription at any time from the Platform&apos;s administration panel or by contacting our support team. Cancellation will be effective at the end of the current billing period. No refunds will be issued for partial periods.</p>
              <p className="mt-3"><strong>10.2. Termination by Khesed-Tek.</strong> We may suspend or terminate your access immediately if you violate these Terms, fail to make timely payments, or if we receive a legal or governmental request.</p>
              <p className="mt-3"><strong>10.3. Effect of Termination.</strong> Your access will cease immediately. We may retain your data for up to 90 days to permit recovery. Payment obligations accrued prior to termination remain in effect.</p>
              <p className="mt-3"><strong>10.4. Data Export.</strong> Before cancellation, you may export your data in standard formats (CSV, Excel) from the Platform.</p>
            </Section>

            <Section title="11. Indemnification">
              <p>You agree to indemnify, defend, and hold harmless Khesed-Tek Systems, LLC, its members, managers, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from your use of the Services, your violation of these Terms, or any claim that your Church Data caused damage to a third party.</p>
            </Section>

            <Section title="12. General Provisions">
              <p><strong>12.1. Entire Agreement.</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between the parties and supersede any prior agreements.</p>
              <p className="mt-3"><strong>12.2. Waiver.</strong> Our failure to enforce a right shall not constitute a waiver of that right.</p>
              <p className="mt-3"><strong>12.3. Severability.</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
              <p className="mt-3"><strong>12.4. Assignment.</strong> You may not assign these Terms without our prior written consent. We may assign them freely in the event of a merger, acquisition, or reorganization.</p>
              <p className="mt-3"><strong>12.5. Notices.</strong> Legal notices must be sent in writing to our registered agent address or by email to <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a>.</p>
              <p className="mt-3"><strong>12.6. Relationship of Parties.</strong> We are independent contractors. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship.</p>
              <p className="mt-3"><strong>12.7. Dispute Resolution.</strong> The parties acknowledge the exclusive jurisdiction of the state and federal courts located in Delaware for any disputes arising under these Terms. The prevailing party shall be entitled to recover reasonable attorneys&apos; fees and costs.</p>
              <p className="mt-3"><strong>12.8. No Class Actions.</strong> You agree to bring any claims against Khesed-Tek only in your individual capacity, and not as a plaintiff or class member in any purported class or representative proceeding.</p>
            </Section>

            <Section title="13. Contact Information">
              <ContactBox />
            </Section>

          </div>

          <div className="mt-12 text-center text-xs py-4 px-6 rounded" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}>
            BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
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

function DefinitionsTable() {
  const rows = [
    ['Services', 'The Khesed-Tek CMS platform, mobile applications, technical support, and any other products or services offered by Khesed-Tek Systems.'],
    ['Platform', 'The Khesed-Tek CMS church management software, accessible via web and mobile devices.'],
    ['Church Data', 'All information, records, and content that the Church enters, imports, or stores on the Platform.'],
    ['Administrator', 'The person(s) designated by the Church to manage the account and grant permissions to other users.'],
    ['Authorized Users', 'Pastors, leaders, volunteers, and members whom the Church authorizes to access the Platform.'],
    ['Content', 'Text, graphics, images, videos, and other materials provided by Khesed-Tek within the Platform.'],
    ['LLC Act', 'The Delaware Limited Liability Company Act (6 Del. C. § 18-101 et seq.), as amended from time to time.'],
  ];
  return (
    <div className="mt-3 rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'var(--surface)' }}>
            <th className="text-left px-3 py-2 w-36 font-semibold" style={{ color: 'var(--gold-hi)', borderBottom: '1px solid var(--border)' }}>Term</th>
            <th className="text-left px-3 py-2 font-semibold" style={{ color: 'var(--gold-hi)', borderBottom: '1px solid var(--border)' }}>Definition</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([term, def], i) => (
            <tr key={term} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
              <td className="px-3 py-2 font-semibold align-top" style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{term}</td>
              <td className="px-3 py-2 align-top" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{def}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProhibitedTable() {
  const rows = [
    ['Illegal Content', 'Store, transmit, or share illegal, fraudulent, terrorist, or criminally-oriented content.'],
    ['Offensive Content', 'Post obscene, pornographic, blasphemous, defamatory, hateful, racist, or discriminatory material.'],
    ['Third-Party Data', 'Store personal information without valid consent from the data subject.'],
    ['Spam', 'Send unsolicited communications, mass mailings, or chain messages.'],
    ['Malware', 'Introduce viruses, worms, trojans, or any malicious code.'],
    ['Impersonation', 'Impersonate another person or entity.'],
    ['Unauthorized Access', "Attempt to access other clients' accounts or Khesed-Tek's systems without authorization."],
    ['Automation', 'Use robots, spiders, or automated scripts to extract data from the Platform.'],
  ];
  return (
    <div className="mt-3 rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'var(--surface)' }}>
            <th className="text-left px-3 py-2 w-36 font-semibold" style={{ color: 'var(--gold-hi)', borderBottom: '1px solid var(--border)' }}>Category</th>
            <th className="text-left px-3 py-2 font-semibold" style={{ color: 'var(--gold-hi)', borderBottom: '1px solid var(--border)' }}>Prohibited Conduct</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([cat, conduct], i) => (
            <tr key={cat} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
              <td className="px-3 py-2 font-semibold align-top" style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{cat}</td>
              <td className="px-3 py-2 align-top" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{conduct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
