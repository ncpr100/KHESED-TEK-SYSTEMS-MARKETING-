'use client';
import { useState } from 'react';
import OutlineIcon from '@/components/ui/outline-icon';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ES: FAQItem[] = [
  {
    question: '¿Cuánto cuesta KHESED-TEK-CMS?',
    answer: 'Cinco planes según la etapa del ministerio: Plan Semilla $49/mes (hasta 150 miembros), Plan Cosecha $149/mes (hasta 500 miembros), Plan Reino $299/mes (hasta 1,500 miembros), Plan Gloria con precio personalizado para megaiglesias y campuses múltiples, y Plan Red desde $94.90/iglesia/mes para redes y denominaciones. Todos los planes incluyen soporte en español, pagos locales y los 12 agentes de IA según el tier — sin cargos por módulos adicionales.'
  },
  {
    question: '¿Qué incluye el Programa Beta?',
    answer: 'El Programa Beta ofrece 30 días de acceso completo a la plataforma sin costo. Los participantes obtienen precios especiales de lanzamiento (hasta 40% de descuento), acceso prioritario a nuevas funciones, implementación acompañada por nuestro equipo y la oportunidad de dar retroalimentación directa que moldea el producto. Las primeras iglesias en unirse tienen precio preferencial congelado para el lanzamiento oficial.'
  },
  {
    question: '¿Funciona con WhatsApp Business?',
    answer: 'Sí — somos el único ChMS con WhatsApp Business completamente integrado. Puede enviar recordatorios de eventos, comunicados pastorales, seguimientos de oración y notificaciones administrativas directamente desde la plataforma a los grupos de WhatsApp de su iglesia. Planning Center, Breeze y otros competidores internacionales no tienen esta funcionalidad.'
  },
  {
    question: '¿Cómo migro desde mi sistema actual?',
    answer: 'Nuestro equipo en Barranquilla le acompaña en todo el proceso de migración sin costo adicional. Importamos su base de datos desde Excel, Planning Center, Breeze, ChurchTrac o cualquier sistema anterior. El proceso toma entre 3 y 10 días hábiles según el volumen de datos, con soporte dedicado durante todo el período de transición.'
  },
  {
    question: '¿Están disponibles en mi país?',
    answer: 'Sí — operamos en toda Latinoamérica con sede en Barranquilla, Colombia. Nuestro soporte está disponible en horario LATAM (lunes a viernes, 9AM–6PM COT). Aceptamos métodos de pago locales como PSE, Nequi, Efecty, Bancolombia y transferencias bancarias.'
  },
  {
    question: '¿Mis datos están seguros?',
    answer: 'Absolutamente. Toda la información de su iglesia se almacena en servidores seguros con cifrado SSL de 256 bits en tránsito y en reposo, el mismo estándar de la banca en línea. Cumplimos con el GDPR y la Ley 1581 de protección de datos de Colombia. Realizamos auditorías de seguridad regulares y usted es dueño de sus datos — puede exportarlos en cualquier momento.'
  },
  {
    question: '¿Necesito conocimientos técnicos para usarlo?',
    answer: 'No. La plataforma está diseñada para pastores y administradores de iglesia, no para técnicos. La interfaz es en español, intuitiva y funciona desde cualquier dispositivo. Ofrecemos capacitación personalizada y soporte continuo. Si su equipo sabe usar WhatsApp, puede manejar KHESED-TEK-CMS.'
  },
  {
    question: '¿Cuándo estará disponible oficialmente?',
    answer: 'Actualmente estamos en fase Beta con iglesias seleccionadas. El lanzamiento oficial está planificado para los próximos meses. Las iglesias que se unan ahora al programa Beta tendrán precio preferencial congelado y acceso prioritario a nuevas funciones. Contáctenos hoy para asegurar su lugar.'
  }
];

const FAQ_EN: FAQItem[] = [
  {
    question: 'How much does KHESED-TEK-CMS cost?',
    answer: 'Five plans based on your church\'s stage: Semilla $49/month (up to 150 members), Cosecha $149/month (up to 500 members), Reino $299/month (up to 1,500 members), Gloria with custom pricing for megachurches and multi-campus organizations, and Red from $94.90/church/month for networks and denominations. All plans include bilingual support, local payment methods, and AI agents included by tier — no extra module fees.'
  },
  {
    question: 'What does the Beta Program include?',
    answer: 'The Beta Program offers 30 days of full platform access at no cost. We work directly with your team to tailor the system to your church\'s specific needs. In exchange, we value your feedback to keep improving. Early adopters receive preferential pricing locked in for the official launch.'
  },
  {
    question: 'Does it work with WhatsApp Business?',
    answer: 'Yes — we are the only ChMS with fully integrated WhatsApp Business. You can send event reminders, pastoral communications, prayer follow-ups, and administrative notifications directly from the platform. Planning Center, Breeze, and other competitors do not have this functionality.'
  },
  {
    question: 'How do I migrate from my current system?',
    answer: 'Our team accompanies you through the entire migration process at no additional cost. We import your member list, donation history, and existing data. The typical process takes 1–3 days. We provide full training in English and Spanish for your administrative and pastoral team.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. All your church information is stored on secure servers with encryption in transit and at rest. We comply with applicable data protection regulations and never share your congregation\'s information with third parties. You own your data and can export it at any time.'
  },
  {
    question: 'Do I need technical knowledge to use it?',
    answer: 'No. The platform is designed for pastors and church administrators, not technicians. The interface is intuitive and works on any device. We offer personalized training and ongoing support. If your team knows how to use WhatsApp, they can manage KHESED-TEK-CMS.'
  },
  {
    question: 'When will it be officially available?',
    answer: 'We are currently in Beta phase with selected churches. The official launch is planned for the coming months. Churches joining the Beta program now will have their price locked in and receive priority access to new features. Contact us today to secure your spot.'
  }
];

interface FAQSectionProps {
  language?: string;
  className?: string;
}

export default function FAQSection({ language = 'es', className = '' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = language === 'es' ? FAQ_ES : FAQ_EN;

  const title = language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions';
  const subtitle = language === 'es'
    ? '¿Tiene dudas? Aquí respondemos las más comunes.'
    : 'Have questions? Here are the most common ones.';
  const ctaText = language === 'es' ? '¿Otra pregunta? Escríbanos →' : 'Another question? Contact us →';

  return (
    <section id="faq" className={`max-w-3xl mx-auto px-6 py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-[var(--muted)] text-lg">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`card border transition-all duration-200 ${
                isOpen ? 'border-[var(--brand)]/40' : 'border-[var(--border)]'
              }`}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className={`font-medium transition-colors duration-200 ${isOpen ? 'text-[var(--brand)]' : 'group-hover:text-[var(--brand)]'}`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <OutlineIcon name="chevron" className="w-5 h-5 text-[var(--brand)]" />
                </span>
              </button>

              {/* Always rendered for crawlers; visually hidden when closed */}
              <div
                className={`px-6 text-[var(--muted)] leading-relaxed border-t border-[var(--border)] transition-all duration-300 ${
                  isOpen ? 'pb-5 pt-4 max-h-96 overflow-auto' : 'max-h-0 overflow-hidden border-t-0 py-0'
                }`}
                aria-hidden={!isOpen}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-[var(--brand)] hover:underline font-medium"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
