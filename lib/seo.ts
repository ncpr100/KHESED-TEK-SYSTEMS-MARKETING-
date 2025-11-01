// SEO Configuration for global markets
const baseConfig = {
  metadataBase: new URL('https://www.khesed-tek-systems.org'),
  title: 'KHESED-TEK SYSTEMS - Soluciones tecnológicas para iglesias',
  description: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones religiosas.',
  applicationName: 'KHESED-TEK SYSTEMS',
  authors: [{ name: 'KHESED-TEK SYSTEMS' }],
  creator: 'KHESED-TEK SYSTEMS',
  publisher: 'KHESED-TEK SYSTEMS',
  url: 'https://www.khesed-tek-systems.org',
};

// Market-specific configurations
const MARKET_CONFIG = {
  LATAM: {
    name: 'KHESED-TEK SYSTEMS Colombia',
    description: 'Soluciones tecnológicas para iglesias y organizaciones religiosas en Colombia',
    url: 'https://www.khesed-tek-systems.org',
    language: 'Spanish',
    locality: 'Barranquilla',
    region: 'Atlántico',
    country: 'Colombia',
    serviceArea: 'Colombia y Latinoamérica'
  },
  USA: {
    name: 'KHESED-TEK SYSTEMS USA',
    description: 'Technology solutions for churches and religious organizations in the United States',
    url: 'https://www.khesed-tek-systems.org',
    language: 'English',
    locality: 'Miami',
    region: 'Florida',
    country: 'United States',
    serviceArea: 'United States'
  },
  GLOBAL: {
    name: 'KHESED-TEK SYSTEMS International',
    description: 'Global technology solutions for churches and religious organizations worldwide',
    url: 'https://www.khesed-tek-systems.org',
    language: ['Spanish', 'English'],
    locality: 'Global',
    region: 'Worldwide',
    country: 'Multiple',
    serviceArea: 'Global'
  }
};

// Generate market-specific organization schema
export function generateOrganizationSchema(market: 'LATAM' | 'USA' | 'GLOBAL' = 'LATAM') {
  const config = MARKET_CONFIG[market];
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.name,
    "description": config.description,
    "url": config.url,
    "logo": `${config.url}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-302-123-4410",
      "contactType": "sales",
      "availableLanguage": config.language
    },
    "address": market === 'GLOBAL' ? undefined : {
      "@type": "PostalAddress",
      "addressLocality": config.locality,
      "addressRegion": config.region,
      "addressCountry": config.country
    },
    "sameAs": [
      "https://wa.me/573021234410"
    ],
    "serviceArea": {
      "@type": market === 'GLOBAL' ? "Place" : "Country",
      "name": config.serviceArea
    },
    "knowsAbout": [
      "Church Management Systems",
      "Digital Transformation", 
      "Custom Software Development",
      "Religious Organization Technology",
      market === 'LATAM' ? "Colombian Church Technology" : 
      market === 'USA' ? "American Church Technology" : "Global Church Technology"
    ]
  };
}

// Organization schema for KHESED-TEK SYSTEMS (default LATAM)
export const organizationSchema = generateOrganizationSchema('LATAM');

// Local business schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KHESED-TEK SYSTEMS",
  "description": "Especialistas en tecnología para iglesias y organizaciones religiosas",
  "image": "https://www.khesed-tek-systems.org/logo.png",
  "telephone": "+57-302-123-4410",
  "email": "contacto@khesed-tek-systems.org",
  "url": "https://www.khesed-tek-systems.org",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barranquilla",
    "addressRegion": "Atlántico",
    "postalCode": "080001",
    "addressCountry": "CO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "10.9878",
    "longitude": "-74.7889"
  },
  "openingHours": "Mo-Fr 08:00-18:00",
  "priceRange": "$$",
  "servedCuisine": "Technology Services",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer"
};

// Service schema for church technology solutions
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Church Management Technology",
  "provider": {
    "@type": "Organization",
    "name": "KHESED-TEK SYSTEMS"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Colombia"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Churches and Religious Organizations"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": "Contact for pricing"
  }
};

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "KHESED-TEK SYSTEMS",
  "description": "Soluciones tecnológicas para iglesias y organizaciones",
  "url": "https://www.khesed-tek-systems.org",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.khesed-tek-systems.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KHESED-TEK SYSTEMS",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.khesed-tek-systems.org/logo.png"
    }
  }
};

// Contact page schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto - KHESED-TEK SYSTEMS",
  "description": "Contáctanos para una demostración personalizada de nuestras soluciones tecnológicas",
  "url": "https://www.khesed-tek-systems.org/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "KHESED-TEK SYSTEMS",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+57-302-123-4410",
        "contactType": "sales",
        "availableLanguage": "Spanish"
      },
      {
        "@type": "ContactPoint", 
        "email": "contacto@khesed-tek-systems.org",
        "contactType": "customer support",
        "availableLanguage": "Spanish"
      }
    ]
  }
};

// Breadcrumb utility
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// FAQ schema utility (for future use)
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question", 
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}