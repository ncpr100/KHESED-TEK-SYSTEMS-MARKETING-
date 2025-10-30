// SEO and structured data utilities for KHESED-TEK

// Organization schema for KHESED-TEK
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KHESED-TEK",
  "description": "Soluciones tecnológicas confiables, seguras y elegantes para iglesias y organizaciones en Colombia",
  "url": "https://www.khesed-tek.com",
  "logo": "https://www.khesed-tek.com/khesed-tek-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57-302-123-4410",
    "contactType": "sales",
    "availableLanguage": "Spanish"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Barranquilla",
    "addressRegion": "Atlántico", 
    "addressCountry": "CO"
  },
  "sameAs": [
    "https://wa.me/573021234410"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Colombia"
  },
  "knowsAbout": [
    "Church Management Systems",
    "Digital Transformation",
    "Custom Software Development",
    "Religious Organization Technology",
    "Colombian Church Technology"
  ]
};

// Local business schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "KHESED-TEK",
  "description": "Especialistas en tecnología para iglesias y organizaciones religiosas",
  "image": "https://www.khesed-tek.com/khesed-tek-logo.png",
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
    "name": "KHESED-TEK"
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
  "name": "KHESED-TEK",
  "description": "Soluciones tecnológicas para iglesias y organizaciones",
  "url": "https://www.khesed-tek.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.khesed-tek.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "KHESED-TEK",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.khesed-tek.com/khesed-tek-logo.png"
    }
  }
};

// Contact page schema
export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contacto - KHESED-TEK",
  "description": "Contáctanos para una demostración personalizada de nuestras soluciones tecnológicas",
  "url": "https://www.khesed-tek.com/contact",
  "mainEntity": {
    "@type": "Organization",
    "name": "KHESED-TEK",
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