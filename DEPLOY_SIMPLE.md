# Vercel Deployment - Minimal Setup Guide

## 🚀 Deploy WITHOUT API Keys (Basic Version)

You can deploy the marketing site immediately with just the basic functionality. The API keys are only needed for advanced features.

### **What Works WITHOUT API Keys:**

- ✅ **Marketing Website**: Complete homepage, contact forms, all pages
- ✅ **Basic Contact Forms**: Form submissions (stored locally)
- ✅ **GDPR Tools**: Cookie consent, privacy policy, data rights forms
- ✅ **Security Features**: Rate limiting, basic protection
- ✅ **Admin Dashboard**: System monitoring and health checks
- ✅ **All UI Components**: Full website functionality

### **What Requires API Keys (Optional):**

- 🔌 **CRM Integration**: HubSpot/Salesforce (only if you want automatic CRM sync)
- 📧 **Email Automation**: Resend (only for automated emails)
- 📊 **Advanced Analytics**: Google Analytics (tracking)

---

## **MINIMAL DEPLOYMENT - No API Keys Needed**

### **Step 1: Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Import Project" → Select your GitHub repository
3. Select: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

### **Step 2: Set Only These Environment Variables (Optional)**

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

**That's it!** Your site will deploy and work perfectly.

---

## **Add API Keys Later (When You Get Them)**

### **Recommended: Free Tier Services**

```env
# SendGrid (Free tier: 100 emails/day)
SENDGRID_API_KEY=your_key_here
# Sign up at: https://sendgrid.com (free account)

# Basic security (generate any random 32-character string)
---

## **Add API Keys Later (When You Get Them)**

### **Recommended: Free Tier Services**
```env
# Resend (Free tier: 3,000 emails/month)
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL_LATAM=contacto@your-domain.com
CONTACT_EMAIL_USA=contact@your-domain.com
CONTACT_EMAIL_GLOBAL=global@your-domain.com
# Sign up at: https://resend.com (free account)

# Google Analytics (Free)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
# Sign up at: https://analytics.google.com
```

### **Business/Paid Services (Add When Ready):**

```env
# HubSpot (Business tool)
HUBSPOT_API_KEY=your_hubspot_key
CRM_PROVIDER=hubspot
# Sign up at: https://hubspot.com

# Salesforce (Enterprise CRM)
SALESFORCE_CLIENT_ID=your_sf_id
SALESFORCE_CLIENT_SECRET=your_sf_secret
CRM_PROVIDER=salesforce
# Contact Salesforce sales team
```

---

## **What Happens Without Each API Key:**

### **No CRM Keys (HubSpot/Salesforce):**

- ✅ Contact forms still work
- ✅ Form data is logged in the system
- ❌ No automatic CRM sync
- **Solution**: Manually export contact data from admin dashboard

### **No Email Keys (Resend):**

- ✅ Website works perfectly
- ✅ Contact forms submit successfully
- ❌ No automated email notifications
- **Solution**: You'll see form submissions in logs, but won't get email notifications

---

## **Priority Order for Getting API Keys:**

### **1. Start Email Integration (Free):**

```env
# Resend free account (3,000 emails/month)
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL_LATAM=contacto@your-domain.com
```

### **2. Add Analytics (Free):**

```env
# Google Analytics free account
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### **3. Add CRM When Business Grows:**

```env
# Start with HubSpot or Pipedrive
CRM_PROVIDER=hubspot
CRM_API_KEY=your_hubspot_key
```

---

## **Deployment Commands (No Keys Required):**

Your site is already pushed to GitHub, so just:

1. **Go to Vercel**: [vercel.com](https://vercel.com)
2. **Sign in with GitHub**
3. **Click "Import Project"**
4. **Select repository**: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
5. **Click Deploy!** ✅

No environment variables needed for basic deployment!

---

## **Testing Your Deployed Site:**

### **What to Test:**

- ✅ Homepage loads
- ✅ Contact form submits (check Vercel logs for submissions)
- ✅ All pages work
- ✅ Admin dashboard accessible
- ✅ GDPR tools functional

### **Expected Behavior Without API Keys:**

- Contact forms work but no email notifications
- No CRM sync
- All other features work normally

---

## **Add API Keys Later via Vercel Dashboard:**

1. Go to **Vercel Dashboard** → **Project Settings** → **Environment Variables**
2. Add new environment variables
3. Select **Production** environment
4. Vercel automatically redeploys with new settings

**No code changes needed!** Just add the environment variables when you get the API keys.

---

## **🎉 Summary:**

**Deploy NOW with:**

- No environment variables required!
- Just click Deploy in Vercel

**Add later when ready:**

- Email API (Resend free tier: 3,000 emails/month)
- Analytics (Google Analytics - free)
- CRM API (when you set up HubSpot/Salesforce/Pipedrive)

Your marketing site will work perfectly without any external API keys! 🚀
