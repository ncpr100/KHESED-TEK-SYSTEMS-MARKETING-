import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@/components/analytics';
import { GA_TRACKING_ID } from '@/lib/analytics';
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/seo';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta KHESED-TEK-CMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ofrecemos tres planes: Básico a $149.99 USD/mes (hasta 500 miembros), Profesional a $299.99 USD/mes (hasta 2,000 miembros), y Empresarial con precio personalizado para iglesias grandes. Todos incluyen soporte en español y métodos de pago locales como PSE y Nequi.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué incluye el Programa Beta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El Programa Beta incluye acceso anticipado a todas las funcionalidades, soporte prioritario, precio especial de lanzamiento, y la oportunidad de influir directamente en el desarrollo del producto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Funciona con WhatsApp Business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. KHESED-TEK-CMS es el primer ChMS con WhatsApp Business completamente integrado de forma nativa. Puede enviar notificaciones, recordatorios y comunicados directamente desde la plataforma.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo migro desde mi sistema actual?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestro equipo le acompaña en todo el proceso de migración sin costo adicional. Soportamos importación desde Excel, CSV, Planning Center, Breeze, ChurchTrac y otros sistemas populares.",
      },
    },
    {
      "@type": "Question",
      name: "¿Están disponibles en mi país?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Atendemos a toda Latinoamérica y el mercado hispano. Tenemos sede en Barranquilla, Colombia, con soporte en horario LATAM (Lunes a Viernes, 9AM–6PM COT).",
      },
    },
    {
      "@type": "Question",
      name: "¿Mis datos están seguros?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Utilizamos encriptación SSL de 256-bit (nivel bancario), cumplimos con GDPR, y garantizamos 99.9% de disponibilidad. Todos los datos están encriptados en tránsito y en reposo.",
      },
    },
  ],
};
import { GlobalMarketProvider } from '@/lib/global-market';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://khesed-tek-systems.org'),
  title: 'KHESED-TEK SYSTEMS - Soluciones Tecnológicas para Iglesias',
  description: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones. Innovación que impulsa tu misión con excelencia, integridad e innovación.',
  keywords: 'tecnología para iglesias, software religioso, gestión de iglesias, Colombia, Barranquilla, sistemas para iglesias, transformación digital religiosa',
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
