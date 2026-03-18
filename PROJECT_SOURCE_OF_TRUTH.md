# PROJECT SOURCE OF TRUTH

**KHESED-TEK Marketing Site - Enterprise Standard Documentation**

**Last Updated**: March 18, 2026  
**Version**: 2.2  
**Status**: Production Active + E-commerce Enabled

---

## 🎯 PROJECT IDENTITY

**Name**: KHESED-TEK SYSTEMS Marketing Website  
**Purpose**: Lead generation platform for Colombian church technology consultancy  
**Tech Stack**: Next.js 15.5.12 (App Router) + TypeScript + Tailwind CSS  
**Deployment**: Vercel (Auto-deploy from GitHub `main` branch)  
**Repository**: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`

---

## 📁 FILE STRUCTURE (CANONICAL)

```
KHESED-TEK-SYSTEMS-MARKETING-/
├── .github/
│   └── copilot-instructions.md     # AI agent instructions
│
├── app/                             # Next.js App Router
│   ├── globals.css                  # CSS variables + Tailwind base
│   ├── layout.tsx                   # Root layout with metadata
│   ├── page.tsx                     # Homepage (redirects to market)
│   ├── robots.ts                    # SEO robots.txt
│   ├── sitemap.ts                   # SEO sitemap generator
│   ├── [market]/                    # Market-specific pages
│   │   ├── latam/page.tsx          # Spanish (primary)
│   │   ├── usa/page.tsx            # English (USA)
│   │   └── global/page.tsx         # English (fallback)
│   ├── contact/page.tsx             # Contact form (multi-market)
│   ├── schedule/page.tsx            # Demo scheduling
│   ├── admin/
│   │   └── carousel/page.tsx       # Carousel image admin
│   └── api/                         # API routes
│       ├── request-demo/route.ts   # Main form handler (CRM + email)
│       ├── simple-demo/route.ts    # Test endpoint (bypasses CRM)
│       ├── health/route.ts         # Vercel healthcheck
│       ├── products/               # **NEW** Product sales endpoints
│       │   └── request/route.ts    # Product purchase requests
│       ├── webhooks/               # **NEW** External webhooks
│       │   └── paddle/route.ts     # Paddle payment confirmations
│       ├── analytics/              # Performance tracking
│       ├── admin/                  # Admin APIs
│       ├── gdpr/                   # Privacy compliance
│       └── security/               # Rate limiting
│
├── components/                      # React components (kebab-case REQUIRED)
│   ├── marketing/
│   │   ├── header.tsx              # Main navigation
│   │   └── footer.tsx              # Footer with contact info
│   ├── ui/                         # Reusable design system
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── outline-icon.tsx
│   │   ├── badge.tsx
│   │   └── image-carousel.tsx
│   ├── conversion/                  # Lead generation components
│   │   ├── demo-video-section.tsx
│   │   └── roi-calculator.tsx
│   ├── pricing/
│   │   ├── animated-pricing-card.tsx
│   │   ├── feature-comparison.tsx
│   │   └── currency-localization.tsx
│   ├── social-proof/
│   │   ├── trust-signals.tsx
│   │   └── system-features-section.tsx
│   ├── competitive-analysis/
│   │   └── competitive-advantage-table.tsx
│   ├── auth/
│   │   └── login-signup.tsx
│   ├── products/                    # **NEW** Product sales components
│   │   └── product-request-form.tsx # E-book/Journal App request form
│   ├── admin-tabs.tsx              # Admin maintenance tools
│   ├── super-admin-help-tab.tsx    # SuperAdmin dashboard
│   ├── analytics.tsx                # Google Analytics wrapper
│   ├── cookie-consent-banner.tsx    # GDPR compliance
│   └── data-rights-forms.tsx        # Privacy rights UI
│
├── lib/                             # Business logic (shared utilities)
│   ├── crm/                         # CRM integration layer
│   │   ├── manager.ts              # Factory + connection management
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── scoring.ts              # Lead scoring algorithm
│   │   ├── market-scoring.ts       # Market-aware prioritization
│   │   └── adapters/
│   │       ├── hubspot.ts
│   │       ├── salesforce.ts
│   │       └── pipedrive.ts
│   ├── products/                    # **NEW** Product management
│   │   ├── catalog.ts              # Product definitions (e-books, apps)
│   │   └── supabase-client.ts      # Supabase database operations
│   ├── payment/                     # **NEW** Payment processing
│   │   └── paddle-client.ts        # Paddle checkout & webhooks
│   ├── email/                       # Email system
│   │   ├── types.ts
│   │   ├── templates.ts            # Email templates (ES/EN)
│   │   ├── product-templates.ts    # **NEW** Product email templates
│   │   ├── campaigns.ts            # Campaign management
│   │   └── automation.ts           # Workflow engine
│   ├── gdpr/                        # GDPR compliance
│   │   ├── types.ts
│   │   ├── consent.ts
│   │   └── data-rights.ts
│   ├── security/                    # Security layer
│   │   ├── manager.ts              # Middleware + rate limiting
│   │   ├── rate-limiter.ts
│   │   ├── security-headers.ts
│   │   └── auth-manager.ts
│   ├── analytics.ts                 # GA4 + market detection
│   ├── gmail-service.ts             # Gmail SMTP email service
│   ├── global-market.tsx            # Market context provider
│   ├── global-performance.ts        # Web vitals tracking
│   ├── performance.ts               # Performance monitoring
│   ├── ab-testing.ts                # A/B testing framework
│   ├── content-management.tsx       # Multi-language content
│   ├── dynamic-carousel.ts          # Environment-driven images
│   ├── demo-videos.ts               # Cache-busting video system
│   ├── product-screenshots.ts       # Product images
│   ├── carousel-database.ts         # Carousel data management
│   ├── seo.ts                       # Schema.org structured data
│   └── utils.ts                     # Helper functions
│
├── types/                           # TypeScript type definitions
│   ├── competitive-analysis.ts
│   ├── demo-video.ts
│   ├── pricing.ts
│   ├── products.ts                 # **NEW** Product sales types
│   ├── roi-calculator.ts
│   └── testimonials.ts
│
├── public/                          # Static assets
│   ├── logo.png                     # Header logo (512×232 rectangular)
│   ├── khesed-tek-logo.png         # Backup logo
│   ├── manifest.json                # PWA manifest
│   ├── icons/                       # Favicon + PWA icons
│   └── images/
│       └── product-screenshots/     # Carousel images
│
├── scripts/                         # Utility scripts
│   ├── check-env-vars.js           # Environment validation
│   ├── test-enhancements.js        # Enhancement testing
│   └── tests/                       # Test & debug scripts
│       ├── test-email-now.js
│       ├── test-env-vars.js
│       ├── verify-deployment.js
│       └── ... (11 total)
│
├── docs/                            # Documentation
│   ├── deployment/                  # Deployment guides (12 files)
│   │   ├── DEPLOY_NOW.md
│   │   ├── DEPLOY_SIMPLE.md
│   │   ├── DEPLOYMENT_COMPLETE.md
│   │   ├── VERCEL_DEPLOYMENT_GUIDE.md
│   │   └── ...
│   ├── guides/                      # How-to guides (12 files)
│   │   ├── ADMIN_CAROUSEL_GUIDE.md
│   │   ├── EMAIL_SETUP_INSTRUCTIONS.md
│   │   ├── VIDEO_UPDATE_GUIDE.md
│   │   └── ...
│   ├── ANALYTICS_SETUP.md
│   ├── CRM_INTEGRATION_ARCHITECTURE.md
│   ├── GDPR.md
│   ├── SECURITY.md
│   ├── SUPER_ADMIN_HELP.md
│   ├── VIDEO_MANAGEMENT.md
│   └── README.md
│
├── README.md                        # Main project documentation
├── ROADMAP.md                       # Feature roadmap
├── CHANGELOG.md                     # Version history
├── PROJECT_SOURCE_OF_TRUTH.md       # This file
├── package.json                     # Dependencies
├── next.config.js                   # Next.js configuration
├── tailwind.config.js               # Tailwind CSS config
├── tsconfig.json                    # TypeScript config
└── middleware.ts                    # Edge middleware
```

---

## 🔧 NAMING CONVENTIONS (STRICTLY ENFORCED)

### **Files & Directories**

| Type | Convention | ✅ Correct | ❌ Wrong |
| ------ | ------------ | --------- | ------- |
| **Components** | kebab-case | `header.tsx`, `super-admin-help-tab.tsx` | `Header.tsx`, `SuperAdminHelpTab.tsx` |
| **Utilities/Libs** | kebab-case | `global-market.tsx`, `email-service.ts` | `GlobalMarket.tsx`, `EmailService.ts` |
| **Types** | kebab-case | `competitive-analysis.ts` | `CompetitiveAnalysis.ts` |
| **API Routes** | kebab-case folder, `route.ts` file | `request-demo/route.ts` | `RequestDemo/handler.ts` |
| **Docs** | SCREAMING_SNAKE_CASE | `README.md`, `DEPLOY_NOW.md` | `readme.md`, `deploy-now.md` |
| **Scripts** | kebab-case | `check-env-vars.js` | `checkEnvVars.js` |

### **Code Conventions**

```typescript
// React Components: PascalCase
export default function Header() { }
export function SuperAdminHelpTab() { }

// Functions: camelCase
function handleSubmit() { }
const calculateLeadScore = () => { }

// Constants: SCREAMING_SNAKE_CASE
const GA_TRACKING_ID = 'G-xxxxx';
const MAX_RETRIES = 3;

// Variables: camelCase
const userEmail = 'test@example.com';
let isLoading = false;

// CSS Classes: kebab-case
<div className="gradient-btn">
<section className="card">
```

---

## 🎨 STYLING SYSTEM

### **CSS Variables** (`app/globals.css`)

```css
:root {
  --bg: #0e0e10;          /* Dark background */
  --surface: #17171a;     /* Card backgrounds */
  --border: #232329;      /* Border color */
  --text: #e7e7ea;        /* Primary text */
  --muted: #8e8e93;       /* Muted text */
  --brand: #6ee7ff;       /* Cyan accent */
  --brand2: #8b5cf6;      /* Purple accent */
}
```

### **Reusable Classes**

```css
.card             /* Standard surface with border */
.gradient-btn     /* Brand gradient buttons */
.gradient-text    /* Animated text gradients */
```

### **Import Aliases**

```typescript
import { Button } from '@/components/ui/button';      // ✅ Use @/ prefix
import { analytics } from '@/lib/analytics';          // ✅ Always
import Header from '../../../components/header';      // ❌ Never use relative paths
```

---

## 🌍 MULTI-MARKET ARCHITECTURE

### **Markets**

| Market | Route | Language | Currency | Primary Users |
| ------ | ----- | -------- | -------- | ------------- |
| **LATAM** | `/latam` | Spanish (es) | USD/COP | Colombia, LATAM countries |
| **USA** | `/usa` | English (en) | USD | United States |
| **GLOBAL** | `/global` | English (en) | USD | International fallback |

### **Market Detection**

```typescript
// Automatic detection via:
1. IP-based geolocation (lib/analytics.ts)
2. Email domain analysis (lib/gmail-service.ts)
3. User preference cookies
4. URL path (/latam, /usa, /global)
```

### **Market Context Provider**

```typescript
// lib/global-market.tsx
<GlobalMarketProvider>
  {children}
</GlobalMarketProvider>

// Usage in components:
const { market, language, geoData } = useGlobalMarket();
```

---

## 📧 EMAIL SYSTEM

### **Service**: Gmail SMTP via nodemailer

**Configuration**:
- **Account**: `nc@khesed-tek-systems.org`
- **Authentication**: App password (16 chars, 2FA enabled)
- **Aliases**: contacto@, contact@, global@, soporte@, info@, support@

### **Email Flow**

```
Contact Form Submission
  ↓
POST /api/request-demo
  ↓
1. Validate form data
2. Create CRM lead (optional, non-blocking)
3. Send internal notification (team)
4. Send customer confirmation (user)
5. Trigger email campaign automation
  ↓
Response: {ok: true, leadId, emailsSent}
```

### **Templates** (`lib/gmail-service.ts`)

- **demo_request** (ES/EN): Internal team notifications
- **customer_confirmation** (ES/EN): Customer acknowledgment emails

### **Market-Aware Routing**

| Form Email | Routed To | Market |
| ---------- | --------- | ------ |
| `*.co` | contacto@khesed-tek-systems.org | LATAM |
| `*.com`, `*.org` (non-LATAM) | contact@khesed-tek-systems.org | USA |
| Other | global@khesed-tek-systems.org | GLOBAL |

---

## 🔌 CRM INTEGRATION

### **Architecture**: Adapter Pattern (Pluggable)

**Supported Providers**:
- HubSpot (`lib/crm/adapters/hubspot.ts`)
- Salesforce (`lib/crm/adapters/salesforce.ts`)
- Pipedrive (`lib/crm/adapters/pipedrive.ts`)

### **CRM Workflow**

```typescript
// 1. Manager creates adapter instance
const crm = createCRMClient(process.env.CRM_PROVIDER);

// 2. Create lead with all form data
const lead = await crm.createContact({
  email, name, org, whatsapp, message,
  customFields: { churchSize, currentSoftware, timeline, budget, features }
});

// 3. Log activities
await crm.logActivity(leadId, 'FORM_SUBMITTED', metadata);
await crm.logActivity(leadId, 'DEMO_REQUESTED', metadata);
await crm.logActivity(leadId, 'EMAIL_SENT', metadata);

// 4. Calculate lead score
const score = calculateMarketAwareLeadScore(formData, market);
await crm.updateContact(leadId, { leadScore: score });
```

### **Lead Scoring** (`lib/crm/market-scoring.ts`)

**Factors**:
- Organization size (churchSize)
- Current software (indicates migration intent)
- Implementation timeline (urgency)
- Budget range (qualification)
- Feature priorities (product fit)
- Market weight (LATAM gets higher priority)

---

## � PRODUCT SALES SYSTEM

### **Architecture**: Supabase + Paddle Integration

**Products Available**:
1. **E-books** (3 titles, Spanish + English):
   - "Paz en la Tormenta" / "Peace in the Storm" ($9.99)
   - "Floreciendo en el Fuego" / "Blooming in the Fire" ($9.99)
   - "Vida de Impacto" / "Impactful Living" ($9.99)
2. **Journal App**: "Mi Identidad Real" / "Real ID" (Coming Soon - Interest registration)

### **Purchase Flow**

```
Customer Submits Form (productrequest-form.tsx)
  ↓
POST /api/products/request
  ↓
1. Validate form data (name, email, product, language)
2. Create record in Supabase (product_requests table)
3. Generate Paddle checkout link (payment processing)
4. Send email with payment link (product-templates.ts)
  ↓
Customer Completes Payment on Paddle
  ↓
Paddle Webhook → POST /api/webhooks/paddle
  ↓
1. Verify webhook signature
2. Find product request by transaction ID
3. Generate signed download URL (Supabase Storage, 24h expiry)
4. Update request status to 'delivered'
5. Send email with download link
```

### **Database** (`lib/products/supabase-client.ts`)

**Table**: `product_requests`
- Tracks all purchase requests and fulfillment
- Stores customer info, product selection, payment status
- Maps Paddle transactions to download links

**Storage**: `ebooks` bucket (Supabase Storage)
- Stores PDF files securely
- Generates signed URLs (time-limited access)
- Prevents unauthorized downloads

### **Payment Processing** (`lib/payment/paddle-client.ts`)

**Provider**: Paddle (https://paddle.com)
- Handles checkout, payment processing, tax compliance
- Sends webhooks on transaction complete/failed
- Supports sandbox + production environments

**API Routes**:
- `/api/products/request` - Form submission, creates checkout
- `/api/webhooks/paddle` - Payment confirmation handler

### **Email Templates** (`lib/email/product-templates.ts`)

1. **Payment Link Email** (sent after form submission):
   - Includes product details and secure Paddle checkout URL
   - Bilingual (Spanish/English based on selection)
   
2. **Download Link Email** (sent after successful payment):
   - Includes signed download URL (24-hour expiry)
   - Download instructions and tips
   
3. **Journal App Interest Email** (for unavailable products):
   - Confirms interest registration
   - Promises future notification when available

### **Product Catalog** (`lib/products/catalog.ts`)

Central source of truth for:
- Product metadata (titles, descriptions, prices)
- Paddle product IDs (per language)
- Availability status
- Download file paths

---

## �🔒 SECURITY & COMPLIANCE

### **Security Headers** (`lib/security/security-headers.ts`)

- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options (clickjacking protection)
- X-Content-Type-Options (MIME sniffing prevention)
- Permissions-Policy (feature restrictions)

### **Rate Limiting** (`lib/security/rate-limiter.ts`)

- Form submissions: 5 requests/hour per IP
- API endpoints: Configurable per route
- Emergency block list support

### **GDPR Compliance** (`lib/gdpr/`)

**Features**:
- Cookie consent banner (`components/cookie-consent-banner.tsx`)
- Data rights management (`components/data-rights-forms.tsx`)
- Right to access, rectify, delete, export
- Consent tracking and audit logs

---

## 📊 ANALYTICS & MONITORING

### **Google Analytics 4**

- **ID**: `G-J8QN6G9SQN` (configured)
- **Events**: `demo_request`, `contact_submission`, page views
- **Custom Dimensions**: Market, lead score, organization size

### **Performance Monitoring**

```typescript
// lib/global-performance.ts
- Web Vitals: LCP, FID, CLS, TTFB, INP
- Page load times
- API response times
- Error tracking
```

### **A/B Testing** (`lib/ab-testing.ts`)

- Market-specific variant testing
- Feature flag system
- Conversion optimization

---

## 🚀 DEPLOYMENT

### **Platform**: Vercel

**Configuration**:
- **Auto-deploy**: Enabled on `main` branch push
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node Version**: 20.x
- **Environment**: Production

### **Environment Variables** (Required)

```bash
# Email (REQUIRED)
GMAIL_USER=nc@khesed-tek-systems.org
GMAIL_APP_PASSWORD=xxxxx  # 16 chars, no spaces
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org
CONTACT_EMAIL_GLOBAL=global@khesed-tek-systems.org

# Analytics (Optional but recommended)
NEXT_PUBLIC_GA_ID=G-J8QN6G9SQN

# CRM (Optional - for lead automation)
CRM_PROVIDER=hubspot|salesforce|pipedrive
CRM_API_KEY=xxxxx

# Video Cache Busting (Optional - for updates)
NEXT_PUBLIC_VIDEO_CACHE_BUST=v1.2.3

# Dynamic Carousel (Optional - JSON arrays)
NEXT_PUBLIC_LATAM_CAROUSEL_IMAGES='[{"src":"/images/...","alt":"..."}]'
NEXT_PUBLIC_USA_CAROUSEL_IMAGES='[{"src":"/images/...","alt":"..."}]'
NEXT_PUBLIC_GLOBAL_CAROUSEL_IMAGES='[{"src":"/images/...","alt":"..."}]'
```

### **Deployment Workflow**

```bash
# Local development
npm install
npm run dev  # http://localhost:3000

# Production build test
npm run build  # Validates TypeScript + Next.js

# Deploy to production
git add -A
git commit -m "feat: description"
git push origin main  # Triggers Vercel auto-deploy

# Verify
https://khesed-tek-systems.org  # Production URL
```

### **Healthcheck**: `/api/health` (returns 200 OK + system status)

---

## 🧪 TESTING

### **Test Scripts** (`scripts/tests/`)

```bash
# Email delivery
node scripts/tests/test-email-now.js

# Environment variables
node scripts/tests/test-env-vars.js

# Form submission
node scripts/tests/test-production-form.js

# Deployment status
node scripts/tests/verify-deployment.js
```

### **Manual Testing Checklist**

1. ✅ Contact form submission (all fields)
2. ✅ Customer email received
3. ✅ Internal notification received
4. ✅ CRM lead created (if configured)
5. ✅ Analytics event tracked
6. ✅ Mobile responsive design
7. ✅ Logo displays correctly
8. ✅ Navigation works (features, about, contact)
9. ✅ Market detection (LATAM/USA/GLOBAL)
10. ✅ Performance (Lighthouse score >90)

---

## 🚨 PROTOCOL CHECK (BEFORE ANY CODE CHANGE)

**ALWAYS ASK YOURSELF:**

1. **IS THIS THE RIGHT APPROACH?**
   - Consider alternatives and trade-offs
   - Verify alignment with project architecture

2. **WHAT ARE THE REPERCUSSIONS?**
   - Analyze impact on other components, APIs, user flows
   - Consider backwards compatibility and breaking changes

3. **DO WE HAVE THIS ALREADY?**
   - Search existing codebase for similar functionality
   - Check `lib/`, `components/`, `app/api/` thoroughly

4. **DOUBLE CHECK BEFORE ASSUMING CORRECT**
   - Review code syntax, logic, edge cases
   - Validate against TypeScript types and ESLint rules

5. **DID I CREATE NEW ERRORS?**
   - Run build and lint checks after each change
   - Test critical paths (contact form, email delivery)

6. **MAY WE NEED THIS FILE LATER?**
   - Consider future features and scaling requirements
   - Preserve files supporting multi-market expansion or CRM integration

7. **WHAT ARE NEXT STEPS?**
   - Document follow-up tasks or optimization opportunities
   - Consider how changes affect performance monitoring and analytics

8. **LEARN FROM MISTAKES**
   - Review failed attempts and understand root causes
   - Update approach based on project-specific learnings

---

## 📚 ESSENTIAL REFERENCES

**Primary Documentation**:
- `.github/copilot-instructions.md` - AI agent instructions
- `docs/deployment/DEPLOY_NOW.md` - Vercel deployment guide
- `docs/guides/EMAIL_SETUP_INSTRUCTIONS.md` - Email configuration
- `docs/CRM_INTEGRATION_ARCHITECTURE.md` - CRM system docs
- `docs/GDPR.md` - Privacy compliance guide
- `docs/SECURITY.md` - Security best practices

**External Resources**:
- Next.js Docs: https://nextjs.org/docs
- Vercel Deployment: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

## 🔄 VERSION HISTORY

| Version | Date | Changes |
| ------- | ---- | ------- |
| 2.2 | 2026-03-18 | **Product Sales System** - E-books + Journal App pre-orders |
| 2.1 | 2026-03-13 | Component naming refactoring, CHANGELOG created |
| 2.0 | 2026-03-13 | Created SOURCE OF TRUTH, Phase 1 refactoring |
| 1.5 | 2026-03-13 | Logo update (rectangular 512×232) |
| 1.4 | 2026-03-01 | Complete form data capture added |
| 1.3 | 2026-03-01 | Customer confirmation emails |
| 1.2 | 2026-03-01 | Gmail SMTP integration |
| 1.1 | 2026-02-28 | Vercel migration complete |
| 1.0 | 2025-10-30 | Initial production release |

---

## ✅ CURRENT STATUS

**Production**: ✅ LIVE  
**Deployment**: ✅ Vercel auto-deploy active  
**Email System**: ✅ Gmail SMTP operational  
**CRM Integration**: ✅ Optional adapters ready  
**E-commerce**: ⚙️ READY (requires Supabase + Paddle setup)  
**Form Flow**: ✅ Complete data capture  
**Documentation**: ✅ Organized (Phase 1 complete)  
**Logo**: ✅ Rectangular brand logo (512×232)  
**Build**: ✅ No errors  
**Tests**: ✅ All passing  

**Last Verified**: 2026-03-13 21:30 UTC

---

*This document is the authoritative reference for all development decisions. When in doubt, consult this SOURCE OF TRUTH first.*
