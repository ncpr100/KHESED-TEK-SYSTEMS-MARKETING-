// SEO and structured data utilities for KHESED-TEK SYSTEMS - Global Markets

// Market-specific configurations
const MARKET_CONFIG = {
  LATAM: {
    name: 'KHESED-TEK SYSTEMS',
    description: 'Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones en LATAM',
    url: 'https://www.khesed-tek.com',
    language: 'Spanish',
    serviceArea: 'Latin America',
    locality: 'Barranquilla',
    region: 'Atlántico',
    country: 'CO',
    coordinates: { lat: '10.9878', lng: '-74.7889' }
  },
  USA: {
    name: 'KHESED-TEK SYSTEMS',
    description: 'Reliable, secure and elegant technology solutions for churches and organizations in the USA',
    url: 'https://www.khesed-tek.us', // Future domain
    language: 'English',
    serviceArea: 'United States',
    locality: 'United States',
    region: 'National',
    country: 'US',
    coordinates: { lat: '39.8283', lng: '-98.5795' } // Geographic center of USA
  },
  GLOBAL: {
    name: 'KHESED-TEK SYSTEMS',
    description: 'Global technology solutions for churches and religious organizations worldwide',
    url: 'https://www.khesed-tek.com',
    language: 'English',
    serviceArea: 'Worldwide',
    locality: 'Global',
    region: 'International',
    country: 'Global',
    coordinates: { lat: '0', lng: '0' }
  }
} as const;

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
  "image": "https://www.khesed-tek.com/logo.png",
  "telephone": "+57-302-123-4410",
  "email": "soporte@khesed-tek.com",
  "url": "https://www.khesed-tek.com",
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
  "url": "https://www.khesed-tek.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.khesed-tek.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KHESED-TEK SYSTEMS",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.khesed-tek.com/logo.png"
    }
  }
};

// Contact page schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto - KHESED-TEK SYSTEMS",
  "description": "Contáctanos para una demostración personalizada de nuestras soluciones tecnológicas",
  "url": "https://www.khesed-tek.com/contact",
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
        "email": "soporte@khesed-tek.com",
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