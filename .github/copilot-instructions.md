# KHESED-TEK Marketing Site - AI Coding Agent Instructions

## Project Overview
**KHESED-TEK** is a Colombian technology consultancy for churches and religious organizations. This Next.js marketing site serves as the primary lead generation platform with multi-market support (LATAM/USA/GLOBAL).

**Tech Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Resend email integration

## Architecture Overview

### Multi-Market System
The site supports three markets with automatic detection and routing:
- **LATAM** (`/latam`, Spanish, primary market)
- **USA** (`/usa`, English) 
- **GLOBAL** (`/global`, English fallback)

Key files: `lib/global-market.tsx`, `lib/email-service.ts`, `app/[latam|usa|global]/`

### CRM Integration Layer
Pluggable CRM system supporting HubSpot, Salesforce, Pipedrive via adapter pattern:
- **Manager**: `lib/crm/manager.ts` - Factory + connection management
- **Adapters**: `lib/crm/adapters/` - Provider-specific implementations
- **Scoring**: `lib/crm/market-scoring.ts` - Market-aware lead prioritization

### Email System Architecture
Multi-language, market-aware email delivery:
- **Templates**: `lib/email/templates.ts` - Variable replacement system
- **Campaigns**: `lib/email/campaigns.ts` - Campaign management 
- **Automation**: `lib/email/automation.ts` - Workflow engine
- **Service**: `lib/email-service.ts` - Market routing + Resend integration

## Key Entry Points & Data Flow

**Contact Form Pipeline**: `app/contact/page.tsx` → `app/api/request-demo/route.ts` → `lib/crm/manager.ts` + `lib/email-service.ts`

**Core API Routes**:
- `/api/request-demo` - Main lead capture (supports FormData + JSON)
- `/api/health` - Railway deployment healthcheck
- `/api/analytics/*` - Performance tracking
- `/api/admin/*` - Admin interface APIs

**UI Components**:
- `components/marketing/` - Header, footer, shared marketing components
- `components/ui/` - Reusable design system components
- `components/analytics.tsx` - Google Analytics integration

## Development Patterns

### File Organization
```
app/                 # Next.js App Router pages
├── [market]/        # Market-specific routes (/latam, /usa, /global)
├── api/             # API endpoints (REST)
├── admin/           # Admin interface
└── globals.css      # CSS variables + Tailwind

lib/                 # Business logic libraries
├── crm/             # CRM adapter pattern
├── email/           # Email templates + automation
├── *.ts             # Utility functions

components/          # React components (kebab-case files)
```

### Coding Conventions
- **Import aliases**: Use `@/` for root imports (`@/lib/utils`, `@/components/ui/button`)
- **File naming**: kebab-case for components (`header.tsx`, not `Header.tsx`)
- **CSS approach**: CSS variables in `globals.css` + Tailwind utilities
- **Common classes**: `.card`, `.gradient-btn`, `.gradient-text`
- **Progressive enhancement**: Forms work without JS, enhanced with React

### Environment Variables
```bash
# Required
RESEND_API_KEY=re_xxxxx           # Email delivery
CONTACT_EMAIL_LATAM=contacto@...  # LATAM lead destination
CONTACT_EMAIL_USA=contact@...     # USA lead destination
CONTACT_EMAIL_GLOBAL=global@...   # Global fallback

# Optional
NEXT_PUBLIC_GA_ID=G-xxxxx         # Google Analytics
CRM_PROVIDER=hubspot|salesforce|pipedrive
CRM_API_KEY=xxxxx                 # CRM integration
```

## Common Tasks & Debugging

### Email Delivery Issues
1. Check `app/api/request-demo/route.ts` for error handling
2. Verify `RESEND_API_KEY` is set and valid
3. Ensure sender domain is verified in Resend (`from` field in `lib/email-service.ts`)
4. Test with: `curl -X POST localhost:3000/api/request-demo -d '{"name":"Test","email":"test@example.com"}'`

### Market Detection Problems
1. Check `lib/analytics.ts` `detectUserMarket()` function
2. Verify `lib/email-service.ts` `detectMarketFromEmail()` logic
3. Test different email domains (.co, .com, .org) to verify routing

### CRM Integration Issues
1. Review `lib/crm/manager.ts` adapter initialization
2. Check specific adapter in `lib/crm/adapters/[provider].ts`
3. Verify `CRM_PROVIDER` and `CRM_API_KEY` environment variables

### Performance Monitoring
- Web vitals tracked in `lib/performance.ts`
- Global performance monitoring in `lib/global-performance.ts`
- Analytics integration via `lib/analytics.ts`

## Development Workflow

### Local Setup
```bash
npm install
cp .env.example .env.local  # Add your API keys
npm run dev                 # Start on port 3000
```

### Deployment (Railway)
```bash
npm run build              # Validate build
git push origin main       # Triggers Railway deployment
```

**Railway Config**: `railway.json` with Docker build, healthcheck at `/api/health`

### Testing Lead Flow
```bash
# Test form submission
curl -X POST http://localhost:3000/api/request-demo \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","org":"Test Church","message":"Testing"}'

# Expected: {"ok": true} + email sent to appropriate market contact
```

## Styling & Theme

**Color System** (`app/globals.css`):
```css
--bg: #0e0e10        # Dark background
--surface: #17171a   # Card backgrounds  
--border: #232329    # Border color
--text: #e7e7ea      # Primary text
--brand: #6ee7ff     # Cyan accent
--brand2: #8b5cf6    # Purple accent
```

**Common Components**:
- `.card` - Standard surface with border
- `.gradient-btn` - Brand gradient buttons
- `.gradient-text` - Animated text gradients

## PROTOCOL CHECK IMPLEMENTATION - NON-NEGOTIABLE

**ALWAYS ASK YOURSELF BEFORE IMPLEMENTING OR DELETING ANY CODE:**

1. **IS THIS STEP THAT I AM ABOUT TO TAKE THE RIGHT APPROACH?**
   - Consider alternative solutions and their trade-offs
   - Verify this aligns with project architecture and patterns

2. **WHAT ARE THE REPERCUSSIONS OF THIS STEP THAT I AM ABOUT TO TAKE?**
   - Analyze impact on other components, APIs, and user flows
   - Consider backwards compatibility and breaking changes

3. **DO WE HAVE WHAT I AM ABOUT TO IMPLEMENT ALREADY IN THE SYSTEM?**
   - Search existing codebase for similar functionality
   - Check `lib/`, `components/`, and `app/api/` directories thoroughly

4. **DOUBLE CHECK MY WORK BEFORE ASSUMING IT'S CORRECT**
   - Review code syntax, logic, and edge cases
   - Validate against TypeScript types and ESLint rules

5. **DID I CREATE NEW ERRORS? I NEED TO AVOID THEM NOT CREATE THEM**
   - Run build and lint checks after each change
   - Test critical paths like contact form and email delivery

6. **MAY WE NEED THIS FILE LATER IN THE APP WORKFLOW APPLICATION?**
   - Consider future features and scaling requirements
   - Preserve files that support multi-market expansion or CRM integration

7. **WHAT ARE NEXT STEPS AND ENHANCEMENT OPPORTUNITIES?**
   - Document any follow-up tasks or optimization opportunities
   - Consider how changes affect performance monitoring and analytics

8. **LEARN FROM YOUR MISTAKES TO AVOID REPEATING THEM**
   - Review failed attempts and understand root causes
   - Update approach based on project-specific learnings

## Quality Gates

**Before Committing**:
```bash
npm run build        # Check TypeScript + build errors
npm run lint         # ESLint validation
```

**Spanish Content**: All user-facing text should remain in Spanish for LATAM market unless explicitly building USA/GLOBAL variants.

**Railway Deployment**: Requires `output: 'standalone'` in `next.config.js` for containerization.

---

*For questions or clarifications on any section, ask for specific examples or deeper explanation.*