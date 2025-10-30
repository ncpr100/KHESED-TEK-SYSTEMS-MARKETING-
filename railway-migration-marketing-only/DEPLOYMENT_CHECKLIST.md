# Deployment Checklist - KHESED-TEK Marketing Site

Use this checklist to ensure a smooth deployment to Railway.

---

## Pre-Deployment

### Code Preparation
- [ ] All migration files added to project root
- [ ] `next.config.js` has `output: 'standalone'`
- [ ] Logo file exists at `public/khesed-tek-logo.png`
- [ ] All dependencies in `package.json`
- [ ] `.gitignore` includes `.env*.local` and `node_modules`

### Local Testing
- [ ] `npm install` runs without errors
- [ ] `npm run build` completes successfully
- [ ] `npm start` serves the site correctly
- [ ] Test all pages: `/`, `/contact`
- [ ] Test form submission (with valid Resend key)
- [ ] Mobile responsive design verified

### GitHub Setup
- [ ] Repository created on GitHub
- [ ] Code pushed to `main` branch
- [ ] `.github/workflows/railway-deploy.yml` present
- [ ] `RAILWAY_TOKEN` secret added to GitHub

---

## Railway Setup

### Project Configuration
- [ ] Railway CLI installed (`npm i -g @railway/cli`)
- [ ] Logged in to Railway (`railway login`)
- [ ] Project created and linked (`railway init`, `railway link`)

### Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `RESEND_API_KEY=re_...` (valid key from Resend)
- [ ] `CONTACT_EMAIL=soporte@khesed-tek.com`

### First Deployment
- [ ] Manual deploy successful (`railway up`)
- [ ] Railway URL accessible
- [ ] Healthcheck passes
- [ ] Smoke tests pass

---

## CI/CD Verification

- [ ] GitHub Actions workflow runs on push to `main`
- [ ] Workflow completes without errors
- [ ] Deployment reflects latest changes

---

## Custom Domain (Production)

- [ ] Domain added in Railway dashboard
- [ ] CNAME record created in DNS provider
- [ ] DNS propagation complete (check dnschecker.org)
- [ ] Domain shows "Active" in Railway
- [ ] HTTPS certificate provisioned
- [ ] Custom domain loads correctly

---

## Post-Deployment Testing

### Functionality
- [ ] Homepage loads (`/`)
- [ ] Hero section displays correctly
- [ ] Features section visible
- [ ] Contact page loads (`/contact`)
- [ ] Contact info cards display correctly
- [ ] Demo request form visible

### Form Testing
- [ ] Fill out form with test data
- [ ] Form submits without errors
- [ ] Success message appears
- [ ] Email received at `soporte@khesed-tek.com`
- [ ] Email contains correct information
- [ ] Reply-to address is correct

### Visual & UX
- [ ] Logo displays correctly
- [ ] Black theme applied
- [ ] Gradient text renders properly
- [ ] Buttons have hover effects
- [ ] Navigation links work
- [ ] Footer displays contact info
- [ ] WhatsApp link works
- [ ] Email link works

### Responsive Design
- [ ] Mobile view (< 640px)
- [ ] Tablet view (640px - 1024px)
- [ ] Desktop view (> 1024px)
- [ ] Navigation adapts on mobile
- [ ] Form layout responsive
- [ ] Cards stack properly on mobile

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load correctly
- [ ] No console errors
- [ ] No 404 errors for assets

---

## Monitoring Setup

- [ ] Railway logs accessible (`railway logs -f`)
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring (optional)

---

## Documentation

- [ ] Team knows how to deploy
- [ ] Rollback plan reviewed
- [ ] DNS records documented
- [ ] Environment variables documented

---

## Security

- [ ] No secrets in code
- [ ] Environment variables in Railway only
- [ ] `.env*.local` in `.gitignore`
- [ ] HTTPS enforced
- [ ] Resend API key valid and secure

---

## Final Sign-Off

- [ ] Stakeholder approval
- [ ] All tests passed
- [ ] Documentation complete
- [ ] Team trained
- [ ] Monitoring active

---

## Post-Launch

- [ ] Monitor logs for 24 hours
- [ ] Check email deliverability
- [ ] Verify analytics (if configured)
- [ ] Collect user feedback

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Railway URL:** _______________  
**Custom Domain:** _______________  
**Status:** _______________
