# KHESED-TEK Marketing Site - AI Coding Agent Instructions

## Project Overview & Purpose
**KHESED-TEK** is a Colombian technology consultancy specializing in digital solutions for churches and religious organizations. This marketing site serves as the primary customer acquisition channel for their services.

### Business Context
- **Target Market**: Churches, religious organizations, nonprofits in Colombia (primarily Spanish-speaking)
- **Primary Goal**: Generate leads through demo requests and contact form submissions
- **Revenue Model**: Custom software development, church management systems, digital transformation consulting
- **Geographic Focus**: Colombia (Barranquilla, Atlántico) with potential LATAM expansion

### Current Services Portfolio (Inferred from Context)
1. **Church Management Systems** - Member databases, donation tracking, event planning
2. **Digital Transformation** - Website development, online presence, digital workflows
3. **Custom Software Solutions** - Tailored applications for religious organizations
4. **Technical Consulting** - IT strategy, security implementation, performance optimization

This marketing site positions KHESED-TEK as a premium, trustworthy technology partner emphasizing **"excelencia, integridad e innovación"** (excellence, integrity, innovation).

## Architecture & Technical Foundation

### Design System Philosophy
- **Dark Theme Strategy**: Differentiates from typical bright religious websites, suggests sophistication and modernity
- **Brand Colors**: Cyan (#6ee7ff) + Violet (#8b5cf6) gradient creates tech-forward, premium aesthetic
- **Typography**: Clean, professional fonts emphasizing readability and trust
- **CSS Architecture**: Custom CSS variables in `app/globals.css` enable consistent theming
  ```css
  --bg: #0e0e10        /* Deep black background */
  --surface: #17171a   /* Card/component background */
  --border: #232329    /* Subtle borders */
  --text: #e7e7ea      /* High contrast text */
  --brand: #6ee7ff     /* Primary cyan accent */
  --brand2: #8b5cf6    /* Secondary violet accent */
  ```
- **Component Patterns**: `.card`, `.gradient-text`, `.gradient-btn` provide visual consistency

### App Structure (Next.js 14 App Router)
```
app/
├── layout.tsx          # Root layout with Spanish locale (lang="es")
├── page.tsx           # Homepage: hero section + 3-feature grid + about
├── contact/page.tsx   # Contact form with demo request functionality
├── api/request-demo/  # Resend email API integration
└── globals.css        # CSS variables + Tailwind utilities
```

### Component Architecture
- **Marketing components** in `components/marketing/`: reusable UI elements
  - `header.tsx`: Sticky navigation with logo, responsive menu, smooth scrolling links
  - `footer.tsx`: Contact information cards, copyright, consistent styling
- **Logo optimization**: Next.js `Image` component with priority loading for above-fold content
- **Responsive strategy**: Mobile-first design with `sm:` (640px+) and `lg:` (1024px+) breakpoints

### Key Page Structures

#### Homepage (`app/page.tsx`)
1. **Hero Section**: Gradient background, compelling headline, CTA button to contact
2. **Features Grid**: 3 cards highlighting performance, security, and design
3. **About Section**: Brief company mission statement
4. **Footer**: Embedded contact information for immediate access

#### Contact Page (`app/contact/page.tsx`)
1. **Contact Cards**: Email, WhatsApp, location displayed prominently
2. **Demo Request Form**: Lead capture with validation and success/error handling
3. **Progressive Enhancement**: Form works without JavaScript, enhanced with React

## Critical Business Integrations

### Lead Generation System (Resend Email)
- **Primary Purpose**: Convert website visitors to qualified leads
- **API Route**: `app/api/request-demo/route.ts` processes form submissions
- **Data Captured**: Name, email (required), organization, WhatsApp, message, demo preference
- **Email Format**: Spanish-formatted professional email to support team
- **Environment Dependencies**:
  - `RESEND_API_KEY`: Production email API key from resend.com
  - `CONTACT_EMAIL`: Destination email (soporte@khesed-tek.com)

### Production Email Configuration
```typescript
// Production recommendation: Update sender domain
from: 'KHESED-TEK Demo <demo@khesed-tek.com>', // Instead of onboarding@resend.dev
```

### Form Validation Strategy
- **Client-side**: Basic HTML5 validation for immediate feedback
- **Server-side**: Email regex, required field validation, input sanitization
- **User Experience**: Loading states, success messages, error handling in Spanish
- **Data Format**: Colombian timezone formatting, structured email template

## Deployment Architecture & DevOps

### Railway.app Production Pipeline
1. **Build Process**: Multi-stage Docker build optimized for Next.js standalone output
2. **CI/CD**: GitHub Actions workflow triggers on `main` branch pushes
3. **Environment Management**: Railway dashboard for production variables
4. **Health Monitoring**: Custom scripts in `railway-migration-marketing-only/scripts/`
   - `healthcheck.sh`: Basic availability testing
   - `smoke-tests.sh`: Multi-endpoint validation
   - `rollback_plan.md`: Emergency recovery procedures

### Essential Configuration Requirements
- **Next.js Config**: `output: 'standalone'` enables containerized deployment
- **Docker Optimization**: Multi-stage build reduces image size, non-root user for security
- **Environment Variables**: Never commit secrets, use Railway dashboard
- **Build Dependencies**: TypeScript, PostCSS, Tailwind compilation during build

### Development vs Production Differences
- **Local**: Uses `.env.local` for environment variables
- **Production**: Railway-managed environment variables
- **Deployment**: Automatic via GitHub Actions vs manual `railway up`
- **Monitoring**: Production logs via `railway logs -f`

## Content Strategy & Localization

### Spanish-First Approach
- **Language Setting**: `<html lang="es">` in root layout
- **Content Tone**: Professional, trustworthy, emphasizing innovation and reliability
- **Regional Context**: Colombian phone numbers (+57), local business culture
- **Technical Terminology**: Spanish UI labels with occasional English technical terms

### Contact Information Strategy
- **Email**: `soporte@khesed-tek.com` (suggests dedicated support team)
- **WhatsApp**: `+57 302 123 4410` (primary communication channel in Colombia)
- **Location**: Barranquilla, Atlántico (establishes local presence)
- **Business Hours**: Implied Colombian timezone (America/Bogota)

### SEO & Accessibility Considerations
- **Meta Description**: "Soluciones tecnológicas para iglesias y organizaciones"
- **Structured Data**: Consider adding organization schema for local business
- **Color Contrast**: High contrast text (#e7e7ea on #0e0e10) meets WCAG guidelines
- **Mobile Optimization**: Responsive design prioritizes mobile user experience

## Advanced Development Patterns

### State Management Philosophy
- **Minimal State**: Only contact form requires React state (loading, success, error)
- **No External Libraries**: Keeps bundle size small, reduces complexity
- **Server State**: Form submissions handled server-side, not cached client-side
- **Progressive Enhancement**: Core functionality works without JavaScript

### Styling Architecture
- **CSS Variable System**: Centralized theming enables easy brand updates
- **Tailwind Integration**: Extends base colors with brand palette
- **Animation Strategy**: Subtle hover effects (`hover:-translate-y-1`, `hover:scale-105`)
- **Component Classes**: `.card` pattern provides consistent component styling

### Performance Optimizations
- **Image Optimization**: Next.js automatic image optimization and lazy loading
- **Font Loading**: System fonts with fallbacks for instant text rendering
- **Bundle Size**: Minimal dependencies, tree-shaking enabled
- **Static Generation**: Homepage can be statically generated for faster loading

## Development Workflow & Tools

### Local Development Setup
```bash
npm install                    # Install dependencies
cp .env.example .env.local    # Configure environment
npm run dev                   # Start development server (port 3000)
```

### Quality Assurance Checklist
- **Functionality**: Form submission, email delivery, responsive design
- **Performance**: Lighthouse scores, mobile page speed
- **Accessibility**: WCAG compliance, keyboard navigation
- **Cross-browser**: Chrome, Firefox, Safari, mobile browsers

### Code Organization Best Practices
- **File Naming**: Lowercase with hyphens for components (`header.tsx`, `footer.tsx`)
- **Import Paths**: Use `@/` alias for clean imports from project root
- **Component Props**: Explicit typing with TypeScript interfaces
- **API Routes**: Follow RESTful conventions, proper error handling

## Strategic Recommendations & Future Enhancements

### Immediate Improvements
1. **Analytics Integration**: Add Google Analytics or similar for lead tracking
2. **A/B Testing**: Test different hero headlines and CTA button copy
3. **SEO Enhancement**: Add structured data for local business listings
4. **Performance Monitoring**: Implement error tracking (Sentry, LogRocket)

### Business Development Features
1. **Case Studies Section**: Showcase successful church implementations
2. **Service Portfolio**: Detailed pages for each service offering
3. **Testimonials**: Client reviews and success stories
4. **Blog/Resources**: Technical content marketing for SEO
5. **Multi-language Support**: English version for international expansion

### Technical Enhancements
1. **CRM Integration**: Connect form submissions to customer management system
2. **Email Automation**: Welcome sequences and nurture campaigns
3. **Lead Scoring**: Qualify prospects based on form responses
4. **Chat Integration**: Live chat for immediate customer support

### Security & Compliance
1. **GDPR Compliance**: Data privacy notices for international visitors
2. **Rate Limiting**: Prevent form spam and abuse
3. **Input Sanitization**: Enhanced validation and XSS prevention
4. **SSL Monitoring**: Automated certificate renewal monitoring

## Troubleshooting & Common Issues

### Form Submission Problems
- **Issue**: Emails not being sent
- **Debug**: Check Railway environment variables, Resend API dashboard
- **Solution**: Verify API key, check sending domain authentication

### Build/Deployment Failures
- **Issue**: Docker build fails on Railway
- **Debug**: Check Railway build logs, verify `next.config.js` standalone output
- **Solution**: Ensure all dependencies in `package.json`, check Node.js version compatibility

### Styling Issues
- **Issue**: Colors not displaying correctly
- **Debug**: Check CSS variable definitions in `globals.css`
- **Solution**: Ensure Tailwind config extends with custom colors, verify CSS variable syntax

### Performance Issues
- **Issue**: Slow page loads
- **Debug**: Lighthouse audit, Network tab analysis
- **Solution**: Optimize images, check bundle size, enable Next.js optimizations

## Project Context & Business Clarity

### Market Positioning
KHESED-TEK appears to be positioning itself as a **premium technology consultancy** specifically for the religious sector. The dark, modern aesthetic differentiates from typical church websites while maintaining professionalism.

### Revenue Opportunities
- **Custom Development**: Church management systems, member portals
- **Digital Transformation**: Website development, online donation systems
- **Consulting Services**: IT strategy, security audits, performance optimization
- **Maintenance Contracts**: Ongoing support and updates

### Growth Strategy
The marketing site serves as the top of the sales funnel, designed to:
1. **Establish Credibility**: Professional design and clear value propositions
2. **Generate Leads**: Demo requests and contact form submissions
3. **Qualify Prospects**: Form fields gather information about organization size and needs
4. **Enable Follow-up**: WhatsApp and email contact for direct sales conversations

This foundation provides a scalable platform for expanding KHESED-TEK's digital presence and customer acquisition capabilities.