import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@/components/analytics';
import { GA_TRACKING_ID } from '@/lib/analytics';
import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
        url: '/logo.png',
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
    images: ['/logo.png'],
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
    canonical: 'https://www.khesed-tek.com',
  },
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
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
