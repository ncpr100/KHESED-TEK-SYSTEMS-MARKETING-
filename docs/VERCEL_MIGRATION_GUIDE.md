# VERCEL MIGRATION GUIDE - KHESED-TEK SYSTEMS
## Enterprise-Level Migration from Railway to Vercel

### 🎯 MIGRATION OVERVIEW

**Project**: KHESED-TEK Marketing Site  
**From**: Railway (Docker-based)  
**To**: Vercel (Serverless Edge)  
**Compliance Level**: Enterprise  
**Timeline**: Estimated 2-4 hours  

---

## 📋 PRE-MIGRATION CHECKLIST

### ✅ Technical Requirements
- [ ] Vercel Pro/Team account (for enterprise features)
- [ ] Domain ownership verified (khesedtek.com)
- [ ] SSL certificates ready for migration
- [ ] Environment variables documented
- [ ] Database connections tested
- [ ] Email service (Resend) configurations validated
- [ ] Analytics tracking (Google Analytics) verified
- [ ] Security headers and CSP policies reviewed
- [ ] Performance benchmarks established
- [ ] Rollback plan documented

### ✅ Compliance Requirements
- [ ] GDPR compliance maintained
- [ ] Data privacy policies updated
- [ ] Security audit completed
- [ ] Performance SLA documented
- [ ] Monitoring and alerting configured
- [ ] Backup and disaster recovery plan
- [ ] Change management approval

---

## 🔧 VERCEL CONFIGURATION

### 1. **Create Vercel Configuration Files**

#### `vercel.json` (Root directory)
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1", "fra1"],
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/www.khesedtek.com/(.*)",
      "destination": "https://khesedtek.com/$1",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/health",
      "destination": "/api/health"
    }
  ]
}
```

#### Updated `next.config.js` for Vercel
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' output for Vercel
  // output: 'standalone', // Remove this line

  // Enhanced image optimization for Vercel CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khesed-tek-systems.org',
      },
      {
        protocol: 'https', 
        hostname: 'khesed-tek-systems.us',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
  },

  // Security headers (moved to vercel.json for better control)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com",
              "style-src 'self' 'unsafe-inline'", 
              "img-src 'self' data: blob: *.googleapis.com *.googleusercontent.com *.google-analytics.com",
              "font-src 'self' data:",
              "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ],
      },
    ];
  },

  // Vercel-optimized experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  }
};

module.exports = nextConfig;
```

### 2. **Environment Variables Migration**

#### Production Environment Variables (Vercel Dashboard)
```bash
# Core Application
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Email Service (Resend)
RESEND_API_KEY=re_****
RESEND_DOMAIN=khesed-tek-systems.org

# Market-specific Contact Emails
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org
CONTACT_EMAIL_GLOBAL=contact@khesed-tek-systems.org

# Analytics & Tracking
NEXT_PUBLIC_GA_ID=G-J8QN6G9SQN
NEXT_PUBLIC_GOOGLE_VERIFICATION=****

# Security Configuration
CSRF_SECRET=**** # Generate 32-char random string
RATE_LIMIT_SECRET=**** # Generate 32-char random string
ENCRYPTION_KEY=**** # Generate 32-char random string

# Performance & Monitoring
NEXT_PUBLIC_VIDEO_CACHE_BUST=v1.2.3
VERCEL_ENV=production
VERCEL_URL=https://khesedtek.com

# CRM Integration (if applicable)
CRM_PROVIDER=hubspot|salesforce|pipedrive
CRM_API_KEY=****
CRM_WEBHOOK_SECRET=****

# Dynamic Carousel Images
NEXT_PUBLIC_LATAM_CAROUSEL_IMAGES='[{"src":"/images/...","alt":"..."}]'
NEXT_PUBLIC_USA_CAROUSEL_IMAGES='[{"src":"/images/...","alt":"..."}]' 
NEXT_PUBLIC_GLOBAL_CAROUSEL_IMAGES='[{"src":"/images/...","alt":"..."}]'
```

---

## 🚀 DEPLOYMENT PROCESS

### Phase 1: Preparation (15 minutes)

1. **Create Vercel Account & Team**
   ```bash
   # Install Vercel CLI
   npm i -g vercel@latest
   vercel login
   ```

2. **Backup Current Production**
   ```bash
   # Document current Railway URLs
   echo "Current Production: https://khesedtek-production.up.railway.app" > migration-log.txt
   echo "Backup created: $(date)" >> migration-log.txt
   ```

3. **Prepare Repository**
   ```bash
   # Create migration branch
   git checkout -b vercel-migration
   
   # Add Vercel configuration files
   # (Created above)
   
   git add vercel.json next.config.js
   git commit -m "feat: Add Vercel configuration for enterprise migration"
   git push origin vercel-migration
   ```

### Phase 2: Initial Deployment (30 minutes)

1. **Import Project to Vercel**
   ```bash
   # Via CLI
   vercel --prod
   
   # Or use Vercel Dashboard
   # 1. Go to https://vercel.com/dashboard
   # 2. Click "Add New" → "Project"
   # 3. Import from GitHub: ncpr100/KHESED-TEK-SYSTEMS-MARKETING-
   # 4. Configure root directory if needed
   ```

2. **Configure Environment Variables**
   - Copy all environment variables from Railway to Vercel
   - Use Vercel Dashboard → Project Settings → Environment Variables
   - Ensure all secrets are properly encrypted

3. **Test Initial Deployment**
   ```bash
   # Test the auto-generated preview URL
   curl -I https://khesed-tek-systems-marketing-****-vercel.app/api/health
   # Should return 200 OK
   ```

### Phase 3: Domain Configuration (45 minutes)

1. **Add Custom Domain**
   - Vercel Dashboard → Project → Domains
   - Add: `khesedtek.com`
   - Add: `www.khesedtek.com` (redirect to apex)
   - Add: `latam.khesedtek.com` (if using subdomains)

2. **DNS Configuration**
   ```dns
   # A Record
   khesedtek.com → 76.76.19.19 (Vercel)
   
   # CNAME Record  
   www.khesedtek.com → cname.vercel-dns.com
   
   # CNAME for subdomains (if applicable)
   latam.khesedtek.com → cname.vercel-dns.com
   usa.khesedtek.com → cname.vercel-dns.com
   ```

3. **SSL Certificate Validation**
   - Vercel automatically provisions SSL via Let's Encrypt
   - Verify HTTPS is working: `https://khesedtek.com`
   - Check SSL rating: [SSL Labs](https://www.ssllabs.com/ssltest/)

### Phase 4: Testing & Validation (30 minutes)

1. **Functionality Testing**
   ```bash
   # Test all critical endpoints
   curl https://khesedtek.com/api/health
   curl https://khesedtek.com/api/geo-detect
   curl -X POST https://khesedtek.com/api/analytics -d '{"test":true}'
   ```

2. **Performance Testing**
   ```bash
   # Test page load times
   curl -w "@curl-format.txt" -o /dev/null -s https://khesedtek.com/latam
   curl -w "@curl-format.txt" -o /dev/null -s https://khesedtek.com/usa
   ```

3. **Security Validation**
   - Test security headers: [Security Headers](https://securityheaders.com)
   - Verify CSP policies are working
   - Test rate limiting functionality
   - Validate CSRF protection

### Phase 5: Production Cutover (20 minutes)

1. **Final DNS Switch**
   ```bash
   # Update DNS to point to Vercel
   # Coordinate with domain registrar
   # TTL should be set to 300 (5 minutes) for quick rollback
   ```

2. **Monitor Deployment**
   ```bash
   # Watch Vercel deployment logs
   vercel logs https://khesedtek.com --follow
   
   # Monitor error rates
   # Check analytics for traffic patterns
   ```

3. **Validate Production**
   ```bash  
   # Test from multiple geographic locations
   # Test all user flows (contact forms, pricing, etc.)
   # Verify analytics are tracking properly
   ```

---

## 📊 MONITORING & ALERTING

### Vercel Analytics Integration
```javascript
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Performance Monitoring Setup
1. **Vercel Analytics**: Automatic page views and performance metrics
2. **Speed Insights**: Core Web Vitals monitoring
3. **Custom Analytics**: Existing Google Analytics integration
4. **Error Tracking**: Set up Sentry or similar if needed

### Alerting Configuration
- Set up Vercel notifications for deployment failures
- Configure uptime monitoring (UptimeRobot, Pingdom)
- Set up performance alerts for Core Web Vitals degradation
- Monitor API response times and error rates

---

## 🔒 SECURITY & COMPLIANCE

### Enterprise Security Checklist
- [ ] **SSL/TLS**: A+ rating on SSL Labs
- [ ] **Security Headers**: All headers properly configured
- [ ] **CSP**: Content Security Policy implemented
- [ ] **Rate Limiting**: API endpoints protected
- [ ] **CSRF Protection**: All forms protected
- [ ] **XSS Protection**: Input sanitization implemented
- [ ] **Data Privacy**: GDPR compliance maintained
- [ ] **Access Control**: Proper authentication for admin endpoints

### Compliance Documentation
1. **Security Audit Report**: Document all security measures
2. **Privacy Impact Assessment**: GDPR compliance validation
3. **Performance SLA**: Document expected performance metrics
4. **Disaster Recovery Plan**: Rollback and backup procedures
5. **Incident Response Plan**: Steps for handling security incidents

---

## 🔄 ROLLBACK PLAN

### Emergency Rollback Procedure
1. **Immediate DNS Rollback** (5 minutes)
   ```bash
   # Revert DNS to Railway
   # A Record: khesedtek.com → [Railway IP]
   # Wait for DNS propagation (5-10 minutes)
   ```

2. **Vercel Rollback** (2 minutes)
   ```bash
   # Rollback to previous deployment
   vercel rollback [deployment-url]
   ```

3. **Communication Plan**
   - Notify stakeholders immediately
   - Update status page if available
   - Document incident for post-mortem

### Rollback Triggers
- API response time > 5 seconds
- Error rate > 1%
- Core functionality breaking
- Security incidents
- Performance degradation > 50%

---

## 📈 POST-MIGRATION VALIDATION

### Performance Benchmarks
| Metric | Railway Baseline | Vercel Target | Acceptable Range |
|--------|------------------|---------------|-----------------|
| TTFB | 800ms | <500ms | <800ms |
| FCP | 1.8s | <1.5s | <2.0s |
| LCP | 2.5s | <2.0s | <3.0s |
| CLS | 0.1 | <0.1 | <0.15 |

### Validation Checklist
- [ ] **All pages load successfully**
- [ ] **Contact forms submit properly**
- [ ] **Analytics tracking working**  
- [ ] **Email notifications sending**
- [ ] **Market detection functioning**
- [ ] **Performance meets benchmarks**
- [ ] **Security headers present**
- [ ] **Mobile responsiveness maintained**
- [ ] **SEO meta tags preserved**
- [ ] **Search functionality working**

### 24-Hour Monitoring
- Monitor for 24 hours post-migration
- Check error logs every 2 hours
- Validate performance metrics
- Ensure all integrations working
- Monitor user feedback channels

---

## 📞 SUPPORT & ESCALATION

### Migration Team Contacts
- **Technical Lead**: [Your name/contact]
- **DevOps Engineer**: [Contact info]
- **Project Manager**: [Contact info]  
- **Security Officer**: [Contact info]

### Vercel Support
- **Enterprise Support**: Available 24/7
- **Support Portal**: https://vercel.com/support
- **Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions

### Emergency Contacts
- **Domain Registrar**: [Contact info]
- **DNS Provider**: [Contact info]  
- **SSL Certificate Provider**: Let's Encrypt (automatic)
- **Email Service**: Resend support

---

**Migration Prepared By**: AI Assistant  
**Date**: February 9, 2026  
**Version**: 1.0  
**Classification**: Enterprise Internal Use  

**Next Steps**: Review this document with your team, customize contact information, and begin Phase 1 when ready to proceed.