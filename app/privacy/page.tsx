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

export default function PrivacyPage() {
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
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Documento: Política de Privacidad v1.0</p>
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
          {lang === 'es' && <PrivacyES />}
          {lang === 'en' && <PrivacyEN />}
          {lang === 'pt' && <PrivacyPT />}
        </div>
      </main>
      <Footer />
    </>
  );
}

// ─── ESPAÑOL ────────────────────────────────────────────────────────────────
function PrivacyES() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Política de Privacidad</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Fecha Efectiva: 9 de marzo de 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
      </div>
      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />
      <div className="space-y-8 text-sm leading-relaxed">
        <Section title="1. Introducción">
          <p style={{ color: 'var(--muted)' }}>Khesed-Tek Systems, LLC (&ldquo;Khesed-Tek&rdquo;, &ldquo;nosotros&rdquo;, &ldquo;nos&rdquo; o &ldquo;nuestro&rdquo;), una sociedad de responsabilidad limitada de Delaware, está comprometida con la protección de la privacidad de las iglesias, ministerios y organizaciones (&ldquo;usted&rdquo; o &ldquo;su&rdquo;) que utilizan nuestra plataforma de gestión ministerial. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando usa nuestros Servicios.</p>
        </Section>
        <Section title="2. Información que Recopilamos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.1. Información de Cuenta.</strong> Al registrarse, recopilamos: nombre de la iglesia u organización, nombre del administrador, dirección de correo electrónico, número de teléfono e información de facturación.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.2. Datos de la Iglesia.</strong> Datos que usted ingresa en la plataforma, incluyendo registros de miembros, asistencia, donaciones, solicitudes de oración, información de eventos y comunicaciones. Usted retiene la plena propiedad de estos datos.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.3. Datos de Uso.</strong> Recopilamos automáticamente información sobre cómo interactúa con la plataforma, incluyendo datos de registro, direcciones IP, tipo de navegador, páginas visitadas y acciones realizadas.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.4. Información de Pago.</strong> Los detalles de pago son procesados por nuestro procesador de pagos (Paddle). No almacenamos números completos de tarjetas de crédito en nuestros servidores.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.5. Comunicaciones.</strong> Si contacta a nuestro equipo de soporte, mantenemos registros de esas comunicaciones.</p>
        </Section>
        <Section title="3. Cómo Usamos su Información">
          <p style={{ color: 'var(--muted)' }}>Usamos la información recopilada para:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Proporcionar, operar y mantener la plataforma Khesed-Tek CMS</li>
            <li>Procesar pagos y gestionar suscripciones</li>
            <li>Enviar correos transaccionales (recibos, facturas, notificaciones de servicio)</li>
            <li>Proporcionar atención al cliente y responder consultas</li>
            <li>Mejorar y desarrollar nuevas funciones para la plataforma</li>
            <li>Monitorear y analizar patrones de uso para mejorar la experiencia del usuario</li>
            <li>Detectar, prevenir y resolver problemas técnicos o violaciones de seguridad</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>No vendemos sus datos ni los utilizamos con fines publicitarios.</p>
        </Section>
        <Section title="4. Compartición y Divulgación de Datos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.1. Proveedores de Servicios.</strong> Compartimos datos con proveedores terceros de confianza que nos ayudan a operar la plataforma (alojamiento en la nube, procesamiento de pagos, entrega de correos). Estos proveedores están vinculados por estrictos acuerdos de confidencialidad.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.2. Requisitos Legales.</strong> Podemos divulgar datos si así lo exige la ley, una orden judicial o una autoridad gubernamental.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.3. Transferencias Comerciales.</strong> En caso de fusión, adquisición o venta de activos, sus datos pueden ser transferidos. Le notificaremos antes de que esto ocurra.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.4. Datos Agregados.</strong> Podemos compartir estadísticas anónimas y agregadas que no identifiquen a ninguna iglesia o persona en particular.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Nunca vendemos, alquilamos ni negociamos sus datos personales a terceros con fines de marketing.</p>
        </Section>
        <Section title="5. Seguridad de los Datos">
          <p style={{ color: 'var(--muted)' }}>Implementamos medidas de seguridad estándar de la industria para proteger sus datos:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Cifrado en tránsito (HTTPS/TLS) y en reposo (AES-256)</li>
            <li>Copias de seguridad diarias automáticas con almacenamiento externo</li>
            <li>Controles de acceso basados en roles que limitan el acceso a datos al personal autorizado</li>
            <li>Auditorías de seguridad periódicas y evaluaciones de vulnerabilidades</li>
            <li>Sistemas de monitoreo de actividades sospechosas y accesos no autorizados</li>
          </ul>
        </Section>
        <Section title="6. Retención de Datos">
          <p style={{ color: 'var(--muted)' }}>Retenemos sus datos mientras su cuenta esté activa o según sea necesario para prestar los Servicios. Tras la cancelación:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Sus datos permanecen accesibles hasta 90 días para permitir la exportación y recuperación</li>
            <li>Después de 90 días, sus datos son eliminados permanentemente de nuestros sistemas</li>
            <li>Los registros de facturación y transacciones pueden conservarse hasta 7 años según lo exija la ley</li>
          </ul>
        </Section>
        <Section title="7. Sus Derechos">
          <p style={{ color: 'var(--muted)' }}>Como usuario de nuestra plataforma, tiene derecho a:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li><strong style={{ color: 'var(--text)' }}>Acceso:</strong> Solicitar una copia de los datos que mantenemos sobre su organización</li>
            <li><strong style={{ color: 'var(--text)' }}>Corrección:</strong> Actualizar o corregir información inexacta</li>
            <li><strong style={{ color: 'var(--text)' }}>Eliminación:</strong> Solicitar la eliminación de sus datos (sujeto a requisitos de retención legal)</li>
            <li><strong style={{ color: 'var(--text)' }}>Portabilidad:</strong> Exportar sus Datos de la Iglesia en formatos estándar (CSV, Excel)</li>
            <li><strong style={{ color: 'var(--text)' }}>Objeción:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Para ejercer cualquiera de estos derechos, contáctenos en <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a>.</p>
        </Section>
        <Section title="8. Privacidad de Menores">
          <p style={{ color: 'var(--muted)' }}>Nuestra plataforma no está dirigida a menores de 13 años. Si su iglesia almacena información sobre menores, usted es responsable de asegurarse de haber obtenido el consentimiento parental o de tutores necesario conforme a la ley aplicable, incluyendo la Ley COPPA si corresponde.</p>
        </Section>
        <Section title="9. Transferencias Internacionales de Datos">
          <p style={{ color: 'var(--muted)' }}>Khesed-Tek Systems, LLC tiene su sede en los Estados Unidos. Sus datos pueden almacenarse y procesarse en los Estados Unidos u otros países donde operan nuestros proveedores de servicios. Al usar nuestros Servicios, usted consiente la transferencia de sus datos a países que pueden tener diferentes leyes de protección de datos. Garantizamos que existen las salvaguardas adecuadas para todas las transferencias internacionales.</p>
        </Section>
        <Section title="10. Cookies y Rastreo">
          <p style={{ color: 'var(--muted)' }}>Usamos cookies y tecnologías similares para:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Mantener su sesión de inicio de sesión</li>
            <li>Recordar sus preferencias</li>
            <li>Analizar patrones de uso de la plataforma</li>
            <li>Mejorar la funcionalidad de la plataforma</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Puede controlar la configuración de cookies a través de su navegador. Desactivar las cookies puede afectar ciertas funcionalidades de la plataforma.</p>
        </Section>
        <Section title="11. Cambios en esta Política">
          <p style={{ color: 'var(--muted)' }}>Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos sobre cambios importantes por correo electrónico o a través de la plataforma con al menos 30 días de anticipación. El uso continuado de los Servicios tras la fecha efectiva constituye aceptación de la política actualizada.</p>
        </Section>
        <Section title="12. Contáctenos"><ContactBox /></Section>
      </div>
      <FinalNotice text="AL USAR NUESTROS SERVICIOS, USTED RECONOCE QUE HA LEÍDO Y COMPRENDIDO ESTA POLÍTICA DE PRIVACIDAD." />
      <FooterNote />
    </div>
  );
}

// ─── ENGLISH ────────────────────────────────────────────────────────────────
function PrivacyEN() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Privacy Policy</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Effective Date: March 9, 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
      </div>
      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />
      <div className="space-y-8 text-sm leading-relaxed">
        <Section title="1. Introduction">
          <p style={{ color: 'var(--muted)' }}>Khesed-Tek Systems, LLC (&ldquo;Khesed-Tek&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a Delaware limited liability company, is committed to protecting the privacy of the churches, ministries, and organizations (&ldquo;you&rdquo; or &ldquo;your&rdquo;) that use our ministerial management platform. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our Services.</p>
        </Section>
        <Section title="2. Information We Collect">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.1. Account Information.</strong> When registering, we collect: church or organization name, administrator name, email address, phone number, and billing information.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.2. Church Data.</strong> Data you enter into the platform, including member records, attendance, donations, prayer requests, event information, and communications. You retain full ownership of this data.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.3. Usage Data.</strong> We automatically collect information about how you interact with the platform, including log data, IP addresses, browser type, pages visited, and actions taken.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.4. Payment Information.</strong> Payment details are processed by our payment processor (Paddle). We do not store complete credit card numbers on our servers.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.5. Communications.</strong> If you contact our support team, we maintain records of those communications.</p>
        </Section>
        <Section title="3. How We Use Your Information">
          <p style={{ color: 'var(--muted)' }}>We use the information collected to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Provide, operate, and maintain the Khesed-Tek CMS platform</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send transactional emails (receipts, invoices, service notifications)</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Improve and develop new features for the platform</li>
            <li>Monitor and analyze usage patterns to improve the user experience</li>
            <li>Detect, prevent, and resolve technical issues or security breaches</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>We do not sell your data or use it for advertising purposes.</p>
        </Section>
        <Section title="4. Data Sharing and Disclosure">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.1. Service Providers.</strong> We share data with trusted third-party vendors that assist us in operating the platform (cloud hosting, payment processing, email delivery). These vendors are bound by strict confidentiality agreements.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.2. Legal Requirements.</strong> We may disclose data if required by law, court order, or government authority.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.3. Business Transfers.</strong> In the event of a merger, acquisition, or asset sale, your data may be transferred. We will notify you before this occurs.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.4. Aggregated Data.</strong> We may share anonymous, aggregated statistics that do not identify any particular church or individual.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>We never sell, rent, or trade your personal data to third parties for marketing purposes.</p>
        </Section>
        <Section title="5. Data Security">
          <p style={{ color: 'var(--muted)' }}>We implement industry-standard security measures to protect your data:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Encryption in transit (HTTPS/TLS) and at rest (AES-256)</li>
            <li>Automatic daily backups with off-site storage</li>
            <li>Role-based access controls limiting data access to authorized personnel</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Monitoring systems for suspicious activity and unauthorized access</li>
          </ul>
        </Section>
        <Section title="6. Data Retention">
          <p style={{ color: 'var(--muted)' }}>We retain your data while your account is active or as necessary to provide the Services. After cancellation:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Your data remains accessible for up to 90 days to allow export and recovery</li>
            <li>After 90 days, your data is permanently deleted from our systems</li>
            <li>Billing and transaction records may be retained for up to 7 years as required by law</li>
          </ul>
        </Section>
        <Section title="7. Your Rights">
          <p style={{ color: 'var(--muted)' }}>As a user of our platform, you have the right to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li><strong style={{ color: 'var(--text)' }}>Access:</strong> Request a copy of the data we hold about your organization</li>
            <li><strong style={{ color: 'var(--text)' }}>Correction:</strong> Update or correct inaccurate information</li>
            <li><strong style={{ color: 'var(--text)' }}>Deletion:</strong> Request the deletion of your data (subject to legal retention requirements)</li>
            <li><strong style={{ color: 'var(--text)' }}>Portability:</strong> Export your Church Data in standard formats (CSV, Excel)</li>
            <li><strong style={{ color: 'var(--text)' }}>Objection:</strong> Object to the processing of your data in certain circumstances</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>To exercise any of these rights, contact us at <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a>.</p>
        </Section>
        <Section title="8. Children's Privacy">
          <p style={{ color: 'var(--muted)' }}>Our platform is not directed at children under 13 years of age. If your church stores information about minors, you are responsible for ensuring you have obtained the necessary parental or guardian consent as required by applicable law, including the Children&apos;s Online Privacy Protection Act (COPPA) where applicable.</p>
        </Section>
        <Section title="9. International Data Transfers">
          <p style={{ color: 'var(--muted)' }}>Khesed-Tek Systems, LLC is headquartered in the United States. Your data may be stored and processed in the United States or other countries where our service providers operate. By using our Services, you consent to the transfer of your data to countries that may have different data protection laws. We ensure that appropriate safeguards are in place for all international transfers.</p>
        </Section>
        <Section title="10. Cookies and Tracking">
          <p style={{ color: 'var(--muted)' }}>We use cookies and similar technologies to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Maintain your login session</li>
            <li>Remember your preferences</li>
            <li>Analyze platform usage patterns</li>
            <li>Improve platform functionality</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>You can control cookie settings through your browser. Disabling cookies may affect certain platform functionality.</p>
        </Section>
        <Section title="11. Changes to This Policy">
          <p style={{ color: 'var(--muted)' }}>We may update this Privacy Policy periodically. We will notify you of significant changes by email or through the platform at least 30 days in advance. Continued use of the Services after the effective date constitutes acceptance of the updated policy.</p>
        </Section>
        <Section title="12. Contact Us"><ContactBox /></Section>
      </div>
      <FinalNotice text="BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTOOD THIS PRIVACY POLICY." />
      <FooterNote />
    </div>
  );
}

// ─── PORTUGUÊS ──────────────────────────────────────────────────────────────
function PrivacyPT() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text)' }}>Política de Privacidade</h2>
        <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Data Efetiva: 9 de março de 2026 · Khesed-Tek Systems, LLC (Delaware)</p>
      </div>
      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />
      <div className="space-y-8 text-sm leading-relaxed">
        <Section title="1. Introdução">
          <p style={{ color: 'var(--muted)' }}>A Khesed-Tek Systems, LLC (&ldquo;Khesed-Tek&rdquo;, &ldquo;nós&rdquo;, &ldquo;nos&rdquo; ou &ldquo;nosso&rdquo;), uma sociedade de responsabilidade limitada de Delaware, está comprometida com a proteção da privacidade das igrejas, ministérios e organizações (&ldquo;você&rdquo; ou &ldquo;seu&rdquo;) que utilizam nossa plataforma de gestão ministerial. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa nossos Serviços.</p>
        </Section>
        <Section title="2. Informações que Coletamos">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.1. Informações de Conta.</strong> Ao se registrar, coletamos: nome da igreja ou organização, nome do administrador, endereço de e-mail, número de telefone e informações de faturamento.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.2. Dados da Igreja.</strong> Dados que você insere na plataforma, incluindo registros de membros, presença, doações, pedidos de oração, informações de eventos e comunicações. Você retém a plena propriedade desses dados.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.3. Dados de Uso.</strong> Coletamos automaticamente informações sobre como você interage com a plataforma, incluindo dados de registro, endereços IP, tipo de navegador, páginas visitadas e ações realizadas.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.4. Informações de Pagamento.</strong> Os detalhes de pagamento são processados pelo nosso processador de pagamentos (Paddle). Não armazenamos números completos de cartões de crédito em nossos servidores.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>2.5. Comunicações.</strong> Se você contatar nossa equipe de suporte, mantemos registros dessas comunicações.</p>
        </Section>
        <Section title="3. Como Usamos suas Informações">
          <p style={{ color: 'var(--muted)' }}>Usamos as informações coletadas para:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Fornecer, operar e manter a plataforma Khesed-Tek CMS</li>
            <li>Processar pagamentos e gerenciar assinaturas</li>
            <li>Enviar e-mails transacionais (recibos, faturas, notificações de serviço)</li>
            <li>Fornecer suporte ao cliente e responder a consultas</li>
            <li>Melhorar e desenvolver novos recursos para a plataforma</li>
            <li>Monitorar e analisar padrões de uso para melhorar a experiência do usuário</li>
            <li>Detectar, prevenir e resolver problemas técnicos ou violações de segurança</li>
            <li>Cumprir obrigações legais</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Não vendemos seus dados nem os utilizamos para fins publicitários.</p>
        </Section>
        <Section title="4. Compartilhamento e Divulgação de Dados">
          <p style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.1. Prestadores de Serviços.</strong> Compartilhamos dados com fornecedores terceiros de confiança que nos auxiliam na operação da plataforma (hospedagem em nuvem, processamento de pagamentos, entrega de e-mails). Esses fornecedores estão vinculados a rigorosos acordos de confidencialidade.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.2. Requisitos Legais.</strong> Podemos divulgar dados se exigido por lei, ordem judicial ou autoridade governamental.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.3. Transferências Comerciais.</strong> Em caso de fusão, aquisição ou venda de ativos, seus dados podem ser transferidos. Notificaremos você antes que isso ocorra.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--text)' }}>4.4. Dados Agregados.</strong> Podemos compartilhar estatísticas anônimas e agregadas que não identifiquem nenhuma igreja ou pessoa em particular.</p>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Nunca vendemos, alugamos ou negociamos seus dados pessoais a terceiros para fins de marketing.</p>
        </Section>
        <Section title="5. Segurança dos Dados">
          <p style={{ color: 'var(--muted)' }}>Implementamos medidas de segurança padrão do setor para proteger seus dados:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Criptografia em trânsito (HTTPS/TLS) e em repouso (AES-256)</li>
            <li>Backups diários automáticos com armazenamento externo</li>
            <li>Controles de acesso baseados em funções que limitam o acesso aos dados ao pessoal autorizado</li>
            <li>Auditorias de segurança periódicas e avaliações de vulnerabilidades</li>
            <li>Sistemas de monitoramento de atividades suspeitas e acessos não autorizados</li>
          </ul>
        </Section>
        <Section title="6. Retenção de Dados">
          <p style={{ color: 'var(--muted)' }}>Retemos seus dados enquanto sua conta estiver ativa ou conforme necessário para prestar os Serviços. Após o cancelamento:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Seus dados permanecem acessíveis por até 90 dias para permitir exportação e recuperação</li>
            <li>Após 90 dias, seus dados são permanentemente excluídos de nossos sistemas</li>
            <li>Registros de faturamento e transações podem ser mantidos por até 7 anos conforme exigido por lei</li>
          </ul>
        </Section>
        <Section title="7. Seus Direitos">
          <p style={{ color: 'var(--muted)' }}>Como usuário de nossa plataforma, você tem direito a:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li><strong style={{ color: 'var(--text)' }}>Acesso:</strong> Solicitar uma cópia dos dados que mantemos sobre sua organização</li>
            <li><strong style={{ color: 'var(--text)' }}>Correção:</strong> Atualizar ou corrigir informações imprecisas</li>
            <li><strong style={{ color: 'var(--text)' }}>Exclusão:</strong> Solicitar a exclusão de seus dados (sujeito a requisitos de retenção legal)</li>
            <li><strong style={{ color: 'var(--text)' }}>Portabilidade:</strong> Exportar seus Dados da Igreja em formatos padrão (CSV, Excel)</li>
            <li><strong style={{ color: 'var(--text)' }}>Objeção:</strong> Opor-se ao processamento de seus dados em determinadas circunstâncias</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Para exercer qualquer um desses direitos, entre em contato conosco em <a href="mailto:legal@khesed-tek-systems.org" className="underline" style={{ color: 'var(--gold-hi)' }}>legal@khesed-tek-systems.org</a>.</p>
        </Section>
        <Section title="8. Privacidade de Menores">
          <p style={{ color: 'var(--muted)' }}>Nossa plataforma não é direcionada a menores de 13 anos. Se sua igreja armazenar informações sobre menores, você é responsável por garantir que obteve o consentimento parental necessário conforme a lei aplicável, incluindo a Lei COPPA, se aplicável.</p>
        </Section>
        <Section title="9. Transferências Internacionais de Dados">
          <p style={{ color: 'var(--muted)' }}>A Khesed-Tek Systems, LLC está sediada nos Estados Unidos. Seus dados podem ser armazenados e processados nos Estados Unidos ou em outros países onde nossos prestadores de serviços operam. Ao usar nossos Serviços, você consente com a transferência de seus dados para países que podem ter leis de proteção de dados diferentes. Garantimos que salvaguardas adequadas estão em vigor para todas as transferências internacionais.</p>
        </Section>
        <Section title="10. Cookies e Rastreamento">
          <p style={{ color: 'var(--muted)' }}>Usamos cookies e tecnologias similares para:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1" style={{ color: 'var(--muted)' }}>
            <li>Manter sua sessão de login</li>
            <li>Lembrar suas preferências</li>
            <li>Analisar padrões de uso da plataforma</li>
            <li>Melhorar a funcionalidade da plataforma</li>
          </ul>
          <p className="mt-3" style={{ color: 'var(--muted)' }}>Você pode controlar as configurações de cookies através do seu navegador. Desativar cookies pode afetar certas funcionalidades da plataforma.</p>
        </Section>
        <Section title="11. Alterações nesta Política">
          <p style={{ color: 'var(--muted)' }}>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças importantes por e-mail ou através da plataforma com pelo menos 30 dias de antecedência. O uso continuado dos Serviços após a data de vigência constitui aceitação da política atualizada.</p>
        </Section>
        <Section title="12. Fale Conosco"><ContactBox /></Section>
      </div>
      <FinalNotice text="AO USAR NOSSOS SERVIÇOS, VOCÊ RECONHECE QUE LEU E COMPREENDEU ESTA POLÍTICA DE PRIVACIDADE." />
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
