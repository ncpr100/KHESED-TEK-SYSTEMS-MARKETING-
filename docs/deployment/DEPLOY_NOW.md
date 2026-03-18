# 🚀 VERCEL DEPLOYMENT

## **Deploy to Vercel in 2 Minutes:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ncpr100/KHESED-TEK-SYSTEMS-MARKETING-)

## **Manual Deployment Steps:**

### **1. Quick Deploy**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
5. Framework Preset: **Next.js** (auto-detected)
6. Root Directory: **Leave as default** (repository root)
7. Build Command: `npm run build` (auto-detected)
8. Output Directory: `.next` (auto-detected)
9. Click **Deploy**

### **2. Add Environment Variables (After Deploy)**

Go to **Vercel Dashboard → Project Settings → Environment Variables** and add:

```env
# Required
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org
CONTACT_EMAIL_GLOBAL=global@khesed-tek-systems.org

# Optional
NEXT_PUBLIC_GA_ID=G-xxxxx
CRM_PROVIDER=hubspot
CRM_API_KEY=xxxxx
```

After adding variables, Vercel will **automatically redeploy**.

### **3. Verify Deployment**

After deployment, test:

- Main site: `https://your-project.vercel.app`
- Health check: `https://your-project.vercel.app/api/health`
- Contact form: Test submission at `/contact`

## **Troubleshooting**

**Build fails?**

- Check Vercel deployment logs in the dashboard
- Verify all dependencies are in `package.json`
- Run `npm run build` locally first

**Environment variables not working?**

- Ensure they're set for **Production** environment
- Vercel requires redeployment after adding variables

**Site loads but APIs fail?**

- Add `RESEND_API_KEY` environment variable
- Verify email addresses in Resend dashboard

## **Configure Custom Domain**

1. Go to **Vercel Dashboard → Domains**
2. Add your domain: `khesed-tek-systems.org`
3. Add DNS records as shown by Vercel
4. Wait for SSL certificate (automatic)

---

## **What You Get After Deployment:**

- ✅ Complete marketing website
- ✅ Working contact forms with email integration
- ✅ Multi-market support (LATAM/USA/GLOBAL)
- ✅ Admin dashboard with system monitoring
- ✅ Automatic SSL certificates
- ✅ Global CDN with edge caching
- ✅ Security features and rate limiting
- ✅ GDPR compliance tools
- ✅ Health monitoring endpoints

**No external API keys needed for core functionality!**
