'use client';

import { useState } from 'react';
import Header from '@/components/marketing/header';
import Footer from '@/components/marketing/footer';

type Lang = 'es' | 'en' | 'pt';

const LANG_TABS: { lang: Lang; label: string }[] = [
  { lang: 'es', label: '🇪🇸 Español' },
  { lang: 'en', label: '🇺🇸 English' },
  { lang: 'pt', label: '🇧🇷 Português' },
];

export default function TermsPage() {
  const [lang, setLang] = useState<Lang>('es');
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-6 mb-6" style={{ borderBottom: '3px solid var(--gold)' }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Kḥesed-tek Systems</h1>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Khesed-Tek Systems, LLC · Delaware Limited Liability Company</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>soporte@khesed-tek-systems.org · +57 302 123 4410</p>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Última actualización: 9 de marzo de 2026</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Documento: Términos y Condiciones v1.0</p>
            </div>
          </div>
          {/* Language Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {LANG_TABS.map(({ lang: l, label }) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-4 py-2 rounded text-sm font-medium transition"
                style={{
                  background: lang === l ? 'var(--gold)' : 'var(--surface)',
                  color: lang === l ? '#0D1B2E' : 'var(--muted)',
                  border: `1px solid ${lang === l ? 'var(--gold)' : 'var(--border)'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {lang === 'es' && <TermsES />}
          {lang === 'en' && <TermsEN />}
          {lang === 'pt' && <TermsPT />}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ─── ESPAÑOL ────────────────────────────────────────────────────────────────
function TermsES() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Términos y Condiciones de Servicio</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Fecha Efectiva: 9 de marzo de 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
      </div>
      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />
      <div className="space-y-8 text-sm leading-relaxed">
        <Section title="1. Definiciones y Partes">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>1.1. Las Partes.</strong> Este acuerdo se celebra entre Khesed-Tek Systems, LLC, una sociedad de responsabilidad limitada constituida bajo las leyes del Estado de Delaware (en adelante &ldquo;Khesed-Tek&rdquo;, &ldquo;nosotros&rdquo; o &ldquo;nuestro&rdquo;), y la iglesia, ministerio u organización sin fines de lucro (en adelante &ldquo;la Iglesia&rdquo;, &ldquo;usted&rdquo; o &ldquo;su&rdquo;) que contrata nuestros Servicios.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>1.2. Definiciones Clave.</strong></p>
          <DataTable headers={['Término', 'Definición']} rows={[
            ['Servicios', 'La plataforma Khesed-Tek CMS, aplicaciones móviles, soporte técnico y cualquier otro producto ofrecido por Khesed-Tek Systems.'],
            ['Plataforma', 'El software de gestión ministerial Khesed-Tek CMS, accesible vía web y dispositivos móviles.'],
            ['Datos de la Iglesia', 'Toda información, registros y contenido que la Iglesia ingresa, importa o almacena en la Plataforma.'],
            ['Administrador', 'La persona designada por la Iglesia para gestionar la cuenta y otorgar permisos a otros usuarios.'],
            ['Usuarios Autorizados', 'Pastores, líderes, voluntarios y miembros que la Iglesia autoriza a acceder a la Plataforma.'],
          ]} />
        </Section>
        <Section title="2. Aceptación de Términos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.1.</strong> Al crear una cuenta o usar los Servicios, usted acepta estos Términos y nuestra Política de Privacidad. Si actúa en nombre de una iglesia, declara tener autoridad legal plena para vincularla.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.2. Modificaciones.</strong> Podemos modificar estos Términos en cualquier momento. Los cambios materiales serán notificados con al menos 30 días de anticipación. El uso continuado constituye aceptación.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.3. Ley Aplicable.</strong> Estos Términos se rigen por las leyes del Estado de Delaware, EE.UU.</p>
        </Section>
        <Section title="3. Creación y Administración de Cuentas">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.1.</strong> Debe proporcionar información completa y precisa al registrarse, incluyendo nombre legal de la iglesia, correo electrónico válido e información de facturación.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.2.</strong> Cada usuario debe tener credenciales únicas. El inicio de sesión compartido no está permitido. Los Administradores son responsables de las acciones de todos los Usuarios Autorizados.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.3.</strong> Usted es responsable de mantener la confidencialidad de sus credenciales y notificarnos de inmediato ante cualquier acceso no autorizado.</p>
        </Section>
        <Section title="4. Propiedad Intelectual">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.1.</strong> Khesed-Tek Systems, LLC retiene todos los derechos sobre el código fuente, diseño, interfaz, marcas y contenido de la Plataforma.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.2.</strong> Le otorgamos una licencia limitada, no exclusiva e intransferible para usar los Servicios únicamente para sus fines ministeriales internos.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.3.</strong> Usted retiene la propiedad de los Datos de la Iglesia. Nos otorga una licencia limitada para almacenar y procesar dichos datos a fin de prestar los Servicios.</p>
        </Section>
        <Section title="5. Uso Aceptable">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>5.1.</strong> Khesed-Tek CMS está diseñado exclusivamente para apoyar el trabajo de iglesias y ministerios alineados con valores cristianos tradicionales.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>5.2. Conductas Prohibidas:</strong> almacenar o transmitir contenido ilegal, obsceno o difamatorio; enviar spam; introducir malware; suplantar identidades; acceder sin autorización a otros sistemas.</p>
        </Section>
        <Section title="6. Términos Comerciales y Pagos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.1.</strong> Los Servicios se ofrecen mediante suscripción mensual o anual. Los precios pueden modificarse con 30 días de aviso previo.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.2.</strong> Las cuentas con más de 30 días de mora podrán ser suspendidas. Se podrá aplicar un cargo administrativo de $30 USD por transacción fallida.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.3. Compromiso Misional.</strong> Una parte de los ingresos de Khesed-Tek se destina a financiar los programas de rehabilitación de Misión Khesed en Colombia y América Latina.</p>
        </Section>
        <Section title="7. Datos y Seguridad">
          <p style={{ color: 'var(--muted)' }}>Los Datos de la Iglesia le pertenecen exclusivamente. Implementamos cifrado en tránsito (HTTPS) y en reposo, copias de seguridad diarias automatizadas y controles de acceso basados en roles. No vendemos ni compartimos sus datos con terceros para fines de marketing.</p>
        </Section>
        <Section title="8. Disponibilidad del Servicio">
          <p style={{ color: 'var(--muted)' }}>Los Servicios se ofrecen &ldquo;TAL COMO ESTÁN&rdquo; y &ldquo;SEGÚN DISPONIBILIDAD&rdquo;. No garantizamos disponibilidad ininterrumpida. No somos responsables de fallos causados por eventos fuera de nuestro control razonable.</p>
        </Section>
        <Section title="9. Limitación de Responsabilidad">
          <p style={{ color: 'var(--muted)' }}>En la medida máxima permitida por la ley de Delaware, nuestra responsabilidad total no excederá el monto total pagado por usted durante los doce (12) meses anteriores al evento que dio origen al reclamo.</p>
        </Section>
        <Section title="10. Cancelación y Terminación">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.1.</strong> Puede cancelar su suscripción en cualquier momento desde el panel de administración. La cancelación será efectiva al final del período de facturación en curso.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.2.</strong> Podemos suspender o terminar su acceso de forma inmediata si viola estos Términos o no realiza pagos a tiempo.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.3.</strong> Sus datos permanecerán disponibles hasta 90 días después de la cancelación para permitir la exportación y recuperación.</p>
        </Section>
        <Section title="11. Indemnización">
          <p style={{ color: 'var(--muted)' }}>Usted acepta indemnizar y eximir de responsabilidad a Khesed-Tek Systems, LLC, sus miembros, directivos, empleados y agentes frente a cualquier reclamo que surja de su uso de los Servicios o de la violación de estos Términos.</p>
        </Section>
        <Section title="12. Disposiciones Generales">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.1.</strong> Estos Términos, junto con la Política de Privacidad, constituyen el acuerdo completo entre las partes.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.2.</strong> No puede ceder estos Términos sin nuestro consentimiento previo por escrito.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.3.</strong> Los tribunales estatales y federales de Delaware tienen jurisdicción exclusiva para cualquier disputa.</p>
        </Section>
        <Section title="13. Información de Contacto"><ContactBox /></Section>
      </div>
      <FinalNotice text="AL USAR NUESTROS SERVICIOS, USTED RECONOCE QUE HA LEÍDO, COMPRENDIDO Y ACEPTA QUEDAR VINCULADO POR ESTOS TÉRMINOS Y CONDICIONES." />
      <FooterNote />
    </div>
  );
}

// ─── ENGLISH ────────────────────────────────────────────────────────────────
function TermsEN() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Terms and Conditions of Service</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Effective Date: March 9, 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
      </div>
      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />
      <div className="space-y-8 text-sm leading-relaxed">
        <Section title="1. Definitions and Parties">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>1.1. The Parties.</strong> This agreement is entered into between Khesed-Tek Systems, LLC, a Delaware limited liability company (hereinafter &ldquo;Khesed-Tek&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), and the church, ministry, or non-profit organization (hereinafter &ldquo;the Church&rdquo;, &ldquo;you&rdquo;, or &ldquo;your&rdquo;) that contracts our Services.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>1.2. Key Definitions.</strong></p>
          <DataTable headers={['Term', 'Definition']} rows={[
            ['Services', 'The Khesed-Tek CMS platform, mobile applications, technical support, and any other products or services offered by Khesed-Tek Systems.'],
            ['Platform', 'The Khesed-Tek CMS church management software, accessible via web and mobile devices.'],
            ['Church Data', 'All information, records, and content that the Church enters, imports, or stores on the Platform.'],
            ['Administrator', 'The person(s) designated by the Church to manage the account and grant permissions to other users.'],
            ['Authorized Users', 'Pastors, leaders, volunteers, and members whom the Church authorizes to access the Platform.'],
            ['Content', 'Text, graphics, images, videos, and other materials provided by Khesed-Tek within the Platform.'],
            ['LLC Act', 'The Delaware Limited Liability Company Act (6 Del. C. § 18-101 et seq.), as amended from time to time.'],
          ]} />
        </Section>
        <Section title="2. Acceptance of Terms">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.1. Acceptance.</strong> By creating an account, accessing, or using any Khesed-Tek Systems Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you are entering into this agreement on behalf of a church or other entity, you represent and warrant that you have full legal authority to bind that entity.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.2. Modifications.</strong> We may modify these Terms at any time. Material changes will be notified through the Platform or by email at least 30 days in advance. Continued use of the Services after the effective date constitutes acceptance of the modified terms.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.3. Governing Law.</strong> These Terms shall be governed by and construed in accordance with the laws of the State of Delaware. The Delaware Limited Liability Company Act (6 Del. C. § 18-101 et seq.) shall apply to all company governance matters.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.4. Legal Capacity.</strong> The person creating the account on behalf of the Church declares and warrants that they have full authority to legally bind the Church and are at least 18 years of age.</p>
        </Section>
        <Section title="3. Account Creation and Administration">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.1. Registration.</strong> To use our Services, you must provide complete and accurate information, including the Church&apos;s full legal name, a valid email address, and billing information.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.2. Administrators.</strong></p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>The initial user who creates the account shall be designated as the Primary Administrator.</li>
            <li>Administrators have the authority to manage users, configure permissions, and control the subscription.</li>
            <li>In the event of an internal dispute between Administrators, Khesed-Tek may suspend access until the Church provides written instructions signed by its legal representative.</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.3. Authorized Users.</strong></p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Each user must have unique login credentials. Shared logins are not permitted.</li>
            <li>Administrators are responsible for the actions of all Authorized Users under their account.</li>
            <li>When a user is removed, they will immediately lose all access to the Platform.</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.4. Account Security.</strong> You are responsible for maintaining the confidentiality of all access credentials and notifying us immediately of any unauthorized access or security breach.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.5. Minimum Age.</strong> Access to the Platform is not permitted for individuals under 13 years of age.</p>
        </Section>
        <Section title="4. Intellectual Property Rights">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.1. Ownership by Khesed-Tek.</strong> Khesed-Tek Systems, LLC retains all right, title, and interest in and to the source code, design, interface, and functionality of the Platform; our trademarks, logos, and trade names; content provided by Khesed-Tek; and any improvements or updates to the Services.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.2. License to Use.</strong> We grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the Services solely for your internal ministry purposes.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.3. Ownership of Church Data.</strong> You retain all ownership rights to the Church Data you enter into the Platform. We claim no ownership over your data.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.4. License to Church Data.</strong> To provide the Services, you grant us a limited license to store, process, and backup your data; use your data in anonymized form to improve our Services; and share your data with technical providers under strict confidentiality obligations.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.5. Restrictions.</strong> You may not reverse engineer, copy, modify, sell, rent, sublicense, or use the Platform to create a competing product.</p>
        </Section>
        <Section title="5. Acceptable Use and Conduct">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>5.1. Ministerial Purpose.</strong> Khesed-Tek CMS is designed exclusively to support the work of churches and ministries aligned with traditional Christian values.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>5.2. Prohibited Conduct.</strong> You and your Authorized Users may NOT:</p>
          <DataTable headers={['Category', 'Prohibited Conduct']} rows={[
            ['Illegal Content', 'Store, transmit, or share illegal, fraudulent, terrorist, or criminally-oriented content.'],
            ['Offensive Content', 'Post obscene, pornographic, blasphemous, defamatory, hateful, racist, or discriminatory material.'],
            ['Third-Party Data', 'Store personal information without valid consent from the data subject.'],
            ['Spam', 'Send unsolicited communications, mass mailings, or chain messages.'],
            ['Malware', 'Introduce viruses, worms, trojans, or any malicious code.'],
            ['Impersonation', 'Impersonate another person or entity.'],
            ['Unauthorized Access', "Attempt to access other clients' accounts or Khesed-Tek's systems without authorization."],
            ['Automation', 'Use robots, spiders, or automated scripts to extract data from the Platform.'],
          ]} />
        </Section>
        <Section title="6. Commercial Terms and Payments">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.1. Subscriptions.</strong> Our Services are offered on a monthly or annual subscription basis. Current pricing is published on our website and may be modified with 30 days&apos; prior notice.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.2. Billing and Payments.</strong> By providing payment information, you authorize automatic charges according to your chosen billing cycle. Receipts and invoices are available within the Platform.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.3. Late Payments.</strong> Accounts more than 30 days past due may be suspended. An administrative fee of $30 USD may be applied per failed transaction. Interest on overdue amounts shall accrue at 1.5% per month.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.4. Mission Commitment.</strong> A portion of Khesed-Tek&apos;s earnings is allocated to fund the rehabilitation programs of Misión Khesed in Colombia and Latin America.</p>
        </Section>
        <Section title="7. Data Ownership and Security">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>7.1.</strong> Church Data belongs exclusively to you. Khesed-Tek Systems, LLC acts as a data processor on your behalf.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>7.2.</strong> We will not sell, rent, or share your data with third parties for marketing purposes.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>7.3.</strong> We implement encryption in transit (HTTPS/SSL) and at rest, automated daily backups, role-based access controls, and monitoring for suspicious activity.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>7.4.</strong> Your data may be stored and processed on servers in the United States or other countries. By using our Services, you consent to these international transfers.</p>
        </Section>
        <Section title="8. Service Availability">
          <p style={{ color: 'var(--muted)' }}>The Services are provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE,&rdquo; without warranties of any kind. We do not guarantee uninterrupted, error-free, or completely secure service. We shall not be liable for failures caused by events beyond our reasonable control, including acts of God, war, terrorism, power failures, or governmental actions.</p>
        </Section>
        <Section title="9. Limitation of Liability">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>9.1.</strong> To the maximum extent permitted by Delaware law, Khesed-Tek Systems, LLC shall not be liable for indirect, incidental, special, consequential, or punitive damages; loss of data, revenue, profits, or business opportunities.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>9.2.</strong> Our total liability shall not exceed the total amount paid by you during the twelve (12) months immediately preceding the event giving rise to the claim.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>9.3.</strong> This limitation does not apply in cases of proven gross negligence, willful misconduct, or death or personal injury caused by our negligence.</p>
        </Section>
        <Section title="10. Cancellation and Termination">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.1.</strong> You may cancel your subscription at any time from the Platform&apos;s administration panel. Cancellation will be effective at the end of the current billing period. No refunds will be issued for partial periods.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.2.</strong> We may suspend or terminate your access immediately if you violate these Terms, fail to make timely payments, or if we receive a legal or governmental request.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.3.</strong> Your data remains accessible for up to 90 days after cancellation. Before cancellation, you may export your data in standard formats (CSV, Excel).</p>
        </Section>
        <Section title="11. Indemnification">
          <p style={{ color: 'var(--muted)' }}>You agree to indemnify, defend, and hold harmless Khesed-Tek Systems, LLC, its members, managers, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from your use of the Services or your violation of these Terms.</p>
        </Section>
        <Section title="12. General Provisions">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.1.</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between the parties.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.2.</strong> You may not assign these Terms without our prior written consent.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.3.</strong> The parties acknowledge the exclusive jurisdiction of the state and federal courts located in Delaware for any disputes. The prevailing party shall be entitled to recover reasonable attorneys&apos; fees and costs.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.4. No Class Actions.</strong> You agree to bring any claims against Khesed-Tek only in your individual capacity, and not as a plaintiff or class member in any purported class or representative proceeding.</p>
        </Section>
        <Section title="13. Contact Information"><ContactBox /></Section>
      </div>
      <FinalNotice text="BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS." />
      <FooterNote />
    </div>
  );
}

// ─── PORTUGUÊS ──────────────────────────────────────────────────────────────
function TermsPT() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Termos e Condições de Serviço</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Data Efetiva: 9 de março de 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
      </div>
      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />
      <div className="space-y-8 text-sm leading-relaxed">
        <Section title="1. Definições e Partes">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>1.1. As Partes.</strong> Este acordo é celebrado entre a Khesed-Tek Systems, LLC, uma sociedade de responsabilidade limitada constituída sob as leis do Estado de Delaware (&ldquo;Khesed-Tek&rdquo;, &ldquo;nós&rdquo; ou &ldquo;nosso&rdquo;), e a igreja, ministério ou organização sem fins lucrativos (&ldquo;a Igreja&rdquo;, &ldquo;você&rdquo; ou &ldquo;seu&rdquo;) que contrata nossos Serviços.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>1.2. Definições Principais.</strong></p>
          <DataTable headers={['Termo', 'Definição']} rows={[
            ['Serviços', 'A plataforma Khesed-Tek CMS, aplicativos móveis, suporte técnico e quaisquer outros produtos oferecidos pela Khesed-Tek Systems.'],
            ['Plataforma', 'O software de gestão ministerial Khesed-Tek CMS, acessível via web e dispositivos móveis.'],
            ['Dados da Igreja', 'Todas as informações, registros e conteúdos que a Igreja insere, importa ou armazena na Plataforma.'],
            ['Administrador', 'A pessoa designada pela Igreja para gerenciar a conta e conceder permissões a outros usuários.'],
            ['Usuários Autorizados', 'Pastores, líderes, voluntários e membros que a Igreja autoriza a acessar a Plataforma.'],
          ]} />
        </Section>
        <Section title="2. Aceitação dos Termos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.1.</strong> Ao criar uma conta ou usar os Serviços, você reconhece que leu, compreendeu e concorda em estar vinculado a estes Termos e à nossa Política de Privacidade. Se agir em nome de uma igreja, declara ter autoridade legal plena para vinculá-la.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.2. Modificações.</strong> Podemos modificar estes Termos a qualquer momento. Alterações materiais serão notificadas com pelo menos 30 dias de antecedência. O uso continuado constitui aceitação.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.3. Lei Aplicável.</strong> Estes Termos são regidos pelas leis do Estado de Delaware, EUA.</p>
        </Section>
        <Section title="3. Criação e Administração de Contas">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.1.</strong> Você deve fornecer informações completas e precisas ao se registrar, incluindo o nome legal completo da igreja, endereço de e-mail válido e informações de faturamento.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.2.</strong> Cada usuário deve ter credenciais únicas. Logins compartilhados não são permitidos. Os Administradores são responsáveis pelas ações de todos os Usuários Autorizados.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>3.3.</strong> Você é responsável por manter a confidencialidade de suas credenciais e nos notificar imediatamente sobre qualquer acesso não autorizado.</p>
        </Section>
        <Section title="4. Propriedade Intelectual">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.1.</strong> A Khesed-Tek Systems, LLC retém todos os direitos sobre o código-fonte, design, interface, marcas registradas e conteúdo da Plataforma.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.2.</strong> Concedemos a você uma licença limitada, não exclusiva e intransferível para usar os Serviços exclusivamente para seus fins ministeriais internos.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.3.</strong> Você retém a propriedade dos Dados da Igreja. Você nos concede uma licença limitada para armazená-los e processá-los a fim de prestação dos Serviços.</p>
        </Section>
        <Section title="5. Uso Aceitável">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>5.1.</strong> O Khesed-Tek CMS é projetado exclusivamente para apoiar igrejas e ministérios alinhados com valores cristãos tradicionais.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>5.2. Condutas Proibidas:</strong> armazenar ou transmitir conteúdo ilegal, obsceno ou difamatório; enviar spam; introduzir malware; se fazer passar por outros; acessar sem autorização outros sistemas.</p>
        </Section>
        <Section title="6. Termos Comerciais e Pagamentos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.1.</strong> Os Serviços são oferecidos por assinatura mensal ou anual. Os preços podem ser modificados com 30 dias de aviso prévio.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.2.</strong> Contas com mais de 30 dias de atraso poderão ser suspensas. Uma taxa administrativa de $30 USD poderá ser aplicada por transação falhada.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>6.3. Compromisso Missionário.</strong> Uma parte dos ganhos da Khesed-Tek é destinada ao financiamento dos programas de reabilitação da Misión Khesed na Colômbia e na América Latina.</p>
        </Section>
        <Section title="7. Dados e Segurança">
          <p style={{ color: 'var(--muted)' }}>Os Dados da Igreja pertencem exclusivamente a você. Implementamos criptografia em trânsito (HTTPS) e em repouso, backups diários automatizados e controles de acesso baseados em funções. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>
        </Section>
        <Section title="8. Disponibilidade do Serviço">
          <p style={{ color: 'var(--muted)' }}>Os Serviços são fornecidos &ldquo;NO ESTADO EM QUE SE ENCONTRAM&rdquo; e &ldquo;CONFORME DISPONÍVEIS.&rdquo; Não garantimos disponibilidade ininterrupta. Não somos responsáveis por falhas causadas por eventos fora do nosso controle razoável.</p>
        </Section>
        <Section title="9. Limitação de Responsabilidade">
          <p style={{ color: 'var(--muted)' }}>Na extensão máxima permitida pela lei de Delaware, nossa responsabilidade total não excederá o valor total pago por você durante os doze (12) meses anteriores ao evento que originou a reclamação.</p>
        </Section>
        <Section title="10. Cancelamento e Rescisão">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.1.</strong> Você pode cancelar sua assinatura a qualquer momento pelo painel de administração. O cancelamento entra em vigor no final do período de faturamento atual.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.2.</strong> Podemos suspender ou encerrar seu acesso imediatamente se você violar estes Termos ou não realizar pagamentos em dia.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>10.3.</strong> Seus dados ficarão disponíveis por até 90 dias após o cancelamento para permitir exportação e recuperação.</p>
        </Section>
        <Section title="11. Indenização">
          <p style={{ color: 'var(--muted)' }}>Você concorda em indenizar e isentar de responsabilidade a Khesed-Tek Systems, LLC, seus membros, gestores, funcionários e agentes de quaisquer reclamações decorrentes do seu uso dos Serviços ou da violação destes Termos.</p>
        </Section>
        <Section title="12. Disposições Gerais">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.1.</strong> Estes Termos, juntamente com a Política de Privacidade, constituem o acordo completo entre as partes.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.2.</strong> Você não pode ceder estes Termos sem nosso consentimento prévio por escrito.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>12.3.</strong> Os tribunais estaduais e federais de Delaware têm jurisdição exclusiva para quaisquer disputas.</p>
        </Section>
        <Section title="13. Informações de Contato"><ContactBox /></Section>
      </div>
      <FinalNotice text="AO USAR NOSSOS SERVIÇOS, VOCÊ RECONHECE QUE LEU, COMPREENDEU E CONCORDA EM ESTAR VINCULADO A ESTES TERMOS E CONDIÇÕES." />
      <FooterNote />
    </div>
  );
}

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest mb-3 pl-3 py-0.5" style={{ color: 'var(--text)', borderLeft: '3px solid var(--gold)' }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function DataTable({ rows, headers }: { rows: string[][]; headers: [string, string] }) {
  return (
    <div className="mt-3 rounded overflow-hidden" style={{ border: '1px solid var(--border)' }}>
      <table className="w-full text-xs">
        <thead>
          <tr style={{ background: 'var(--surface)' }}>
            <th className="text-left px-3 py-2 w-36 font-semibold" style={{ color: 'var(--gold-hi)', borderBottom: '1px solid var(--border)' }}>{headers[0]}</th>
            <th className="text-left px-3 py-2 font-semibold" style={{ color: 'var(--gold-hi)', borderBottom: '1px solid var(--border)' }}>{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([col1, col2], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
              <td className="px-3 py-2 font-semibold align-top" style={{ color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>{col1}</td>
              <td className="px-3 py-2 align-top" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{col2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactBox() {
  return (
    <div className="rounded p-5 mt-2" style={{ border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)', background: 'var(--surface)' }}>
      <p className="font-bold" style={{ color: 'var(--text)' }}>Khesed-Tek Systems, LLC</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>(Delaware Limited Liability Company)</p>
      <p className="mt-2" style={{ color: 'var(--muted)' }}>Email: <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a></p>
      <p style={{ color: 'var(--muted)' }}>Teléfono / Phone / Telefone: <a href="tel:+573011234410" className="underline" style={{ color: 'var(--gold-hi)' }}>+57 301 123 4410</a></p>
      <p style={{ color: 'var(--muted)' }}>Web: <a href="https://www.khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>www.khesed-tek-systems.org</a></p>
    </div>
  );
}

function FinalNotice({ text }: { text: string }) {
  return (
    <div className="mt-12 text-center text-xs py-4 px-6 rounded font-semibold" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}>
      {text}
    </div>
  );
}

function FooterNote() {
  return (
    <div className="mt-8 pt-4 text-center text-xs" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
      © 2026 Khesed-Tek Systems, LLC. All rights reserved. · A Delaware Limited Liability Company
    </div>
  );
}
