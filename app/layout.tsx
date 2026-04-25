import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@/components/analytics';
import { GA_TRACKING_ID } from '@/lib/analytics';
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/seo';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta KHESED-TEK-CMS?',
      acceptedAnswer: { '@type': 'Answer', text: 'El plan Básico (hasta 500 miembros) comienza en $149.99 USD/mes. El plan Profesional (hasta 2,000 miembros) es $299.99 USD/mes. Las iglesias grandes reciben un precio personalizado. Todos los planes incluyen soporte en español y métodos de pago locales. Paddle, nuestro procesador de pagos, convierte automáticamente a su moneda local.' },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye el Programa Beta?',
      acceptedAnswer: { '@type': 'Answer', text: 'El Programa Beta ofrece 30 días de acceso completo a la plataforma sin costo. Trabajamos directamente con su equipo para adaptar el sistema a las necesidades específicas de su iglesia. A cambio, valoramos su retroalimentación para seguir mejorando la plataforma. Las primeras iglesias en unirse tienen ventajas de precio preferencial para cuando lancemos oficialmente.' },
    },
    {
      '@type': 'Question',
      name: '¿Funciona con WhatsApp Business?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí — somos el único ChMS con WhatsApp Business completamente integrado. Puede enviar recordatorios de eventos, comunicados pastorales, seguimientos de oración y notificaciones administrativas directamente desde la plataforma a los grupos de WhatsApp de su iglesia. Planning Center, Breeze y otros competidores internacionales no tienen esta funcionalidad.' },
    },
    {
      '@type': 'Question',
      name: '¿Cómo migro desde mi sistema actual?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nuestro equipo en Barranquilla le acompaña en todo el proceso de migración sin costo adicional. Importamos su listado de miembros, historial de donaciones y datos existentes. El proceso típico toma entre 1 y 3 días. Ofrecemos capacitación completa en español para su equipo administrativo y pastoral.' },
    },
    {
      '@type': 'Question',
      name: '¿Están disponibles en mi país?',
      acceptedAnswer: { '@type': 'Answer', text: 'Sí — operamos en toda Latinoamérica con sede en Barranquilla, Colombia. Nuestro soporte está disponible en horario LATAM (lunes a viernes, 9AM–6PM COT). Aceptamos métodos de pago locales como PSE, Nequi, Efecty, Bancolombia y transferencias bancarias.' },
    },
    {
      '@type': 'Question',
      name: '¿Mis datos están seguros?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutamente. Toda la información de su iglesia se almacena en servidores seguros con cifrado en tránsito y en reposo. Cumplimos con las regulaciones de protección de datos aplicables. Nunca compartimos información de su congregación con terceros. Usted es el dueño de sus datos y puede exportarlos en cualquier momento.' },
    },
    {
      '@type': 'Question',
      name: '¿Necesito conocimientos técnicos para usarlo?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. La plataforma está diseñada para pastores y administradores de iglesia, no para técnicos. La interfaz es en español, intuitiva y funciona desde cualquier dispositivo. Ofrecemos capacitación personalizada y soporte continuo. Si su equipo sabe usar WhatsApp, puede manejar KHESED-TEK-CMS.' },
    },
    {
      '@type': 'Question',
      name: '¿Cuándo estará disponible oficialmente?',
      acceptedAnswer: { '@type': 'Answer', text: 'Actualmente estamos en fase Beta con iglesias seleccionadas. El lanzamiento oficial está planificado para los próximos meses. Las iglesias que se unan ahora al programa Beta tendrán precio preferencial congelado y acceso prioritario a nuevas funciones. Contáctenos hoy para asegurar su lugar.' },
    },
  ],
};
import { GlobalMarketProvider } from '@/lib/global-market';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://khesed-tek-systems.org'),
  title: 'KHESED-TEK SYSTEMS - Soluciones Tecnológicas para Iglesias',
  description: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones. Innovación que impulsa tu misión con excelencia, integridad e innovación.',
  authors: [{ name: 'KHESED-TEK SYSTEMS' }],
  creator: 'KHESED-TEK SYSTEMS',
  publisher: 'KHESED-TEK SYSTEMS',
  openGraph: {
    title: 'KHESED-TEK SYSTEMS - Soluciones Tecnológicas para Iglesias',
    description: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones.',
    type: 'website',
    locale: 'es_CO',
    siteName: 'KHESED-TEK SYSTEMS',
    images: [
      {
        url: 'https://www.khesed-tek-systems.org/logo.png',
        width: 1200,
        height: 630,
        alt: 'KHESED-TEK SYSTEMS Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KHESED-TEK SYSTEMS - Soluciones Tecnológicas para Iglesias',
    description: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones.',
    images: ['https://www.khesed-tek-systems.org/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.khesed-tek-systems.org",
    languages: {
      "es-419":    "https://www.khesed-tek-systems.org",
      "es":        "https://www.khesed-tek-systems.org",
      // BUG-04 FIX: English pages get proper hreflang entries
      "en-US":     "https://www.khesed-tek-systems.org/usa",
      "en":        "https://www.khesed-tek-systems.org/global",
      "x-default": "https://www.khesed-tek-systems.org",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  category: 'Technology',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect for critical third parties */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="CO-ATL" />
        <meta name="geo.placename" content="Barranquilla" />
        <meta name="geo.position" content="10.9878;-74.7889" />
        <meta name="ICBM" content="10.9878, -74.7889" />
        
        {/* Google Analytics */}
        {GA_TRACKING_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <GlobalMarketProvider>
          {children}
          <Analytics />
        </GlobalMarketProvider>
      </body>
    </html>
  );
}
