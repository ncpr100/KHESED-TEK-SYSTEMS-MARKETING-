# Railway Deployment - Minimal Setup Guide

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
- 📧 **Email Automation**: SendGrid/SMTP (only for automated emails)
- 📊 **Advanced Analytics**: External analytics services

---

## **MINIMAL DEPLOYMENT - No API Keys Needed**

### **Step 1: Deploy to Railway**
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
4. Choose the `khesed-tek-marketing-site` folder

### **Step 2: Set Only These Environment Variables**
```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

**That's it!** Your site will deploy and work perfectly.

---

## **Add API Keys Later (When You Get Them)**

### **Free/Easy to Get:**
```env
# SendGrid (Free tier: 100 emails/day)
SENDGRID_API_KEY=your_key_here
# Sign up at: https://sendgrid.com (free account)

# Basic security (generate any random 32-character string)
JWT_SECRET=make_this_any_32_character_string
API_SECRET=another_random_string_here
```

### **Business/Paid Services (Add When Ready):**
```env
# HubSpot (Business tool)
HUBSPOT_API_KEY=your_hubspot_key
# Sign up at: https://hubspot.com

# Salesforce (Enterprise CRM)
SALESFORCE_CLIENT_ID=your_sf_id
SALESFORCE_CLIENT_SECRET=your_sf_secret
# Contact Salesforce sales team

# Custom SMTP (Your email provider)
SMTP_HOST=mail.your-domain.com
SMTP_USER=your_email@your-domain.com
SMTP_PASS=your_email_password
```

---

## **What Happens Without Each API Key:**

### **No CRM Keys (HubSpot/Salesforce):**
- ✅ Contact forms still work
- ✅ Form data is logged in the system
- ❌ No automatic CRM sync
- **Solution**: Manually export contact data from admin dashboard

### **No Email Keys (SendGrid/SMTP):**
- ✅ Website works perfectly
- ✅ Contact forms submit successfully
- ❌ No automated email responses
- **Solution**: You'll get notifications, but customers won't get auto-replies

### **No Security Keys:**
- ✅ Basic security still works
- ✅ Rate limiting active
- ❌ Advanced encryption features disabled
- **Solution**: Generate simple random strings when ready

---

## **Priority Order for Getting API Keys:**

### **1. Start With (Free/Easy):**
```env
# Just generate random 32-character strings
JWT_SECRET=abcdef1234567890abcdef1234567890
API_SECRET=fedcba0987654321fedcba0987654321
```

### **2. Add Email (Free Tier):**
```env
# SendGrid free account (100 emails/day)
SENDGRID_API_KEY=SG.your_key_here
```

### **3. Add CRM When Business Grows:**
```env
# Start with HubSpot free tier
HUBSPOT_API_KEY=your_hubspot_key
```

---

## **Deployment Commands (No Keys Required):**

Your site is already pushed to GitHub, so just:

1. **Go to Railway**: [railway.app](https://railway.app)
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Deploy from GitHub repo**: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
5. **Add minimal env vars**:
   ```env
   NODE_ENV=production
   ```
6. **Deploy!** ✅

---

## **Testing Your Deployed Site:**

### **What to Test:**
- ✅ Homepage loads
- ✅ Contact form submits (check Railway logs for submissions)
- ✅ All pages work
- ✅ Admin dashboard accessible
- ✅ GDPR tools functional

### **Expected Behavior Without API Keys:**
- Contact forms work but no CRM sync
- No automated emails sent
- All other features work normally

---

## **Add API Keys Later via Railway Dashboard:**

1. Go to your Railway project
2. Click "Variables" tab
3. Add new environment variables
4. Railway automatically redeploys with new settings

**No code changes needed!** Just add the environment variables when you get the API keys.

---

## **🎉 Summary:**

**Deploy NOW with just:**
```env
NODE_ENV=production
```

**Add later when ready:**
- Email API (SendGrid free tier)
- CRM API (when you set up HubSpot/Salesforce)
- Custom SMTP (when you have business email)

Your marketing site will work perfectly without any external API keys! 🚀