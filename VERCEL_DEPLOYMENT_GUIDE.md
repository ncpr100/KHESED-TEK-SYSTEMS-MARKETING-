# 🚀 KHESED-TEK Systems - Gmail SMTP Deployment Guide

## 📧 **Email Service Migration Complete**

✅ **Resend** → **Gmail SMTP** migration successful  
✅ **Build** passes without errors  
✅ **Vercel** configuration ready  

## 🔧 **Step 1: Setup Gmail App Password**

### 1.1 Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required for App Passwords)

### 1.2 Generate App Password

1. Visit [App passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as device
4. Enter: `KHESED-TEK Marketing Site`
5. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

## 🌐 **Step 2: Deploy to Vercel**

### 2.1 Connect to Vercel

```bash
# Login to Vercel
vercel login

# Deploy with environment variables setup
vercel --prod
```

### 2.2 Required Environment Variables

Add these in **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

```bash
# Gmail SMTP Configuration
GMAIL_USER=your-email@khesed-tek-systems.org
GMAIL_APP_PASSWORD=your_16_character_app_password

# Contact Email Routing
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org  
CONTACT_EMAIL_GLOBAL=global@khesed-tek-systems.org

# Analytics
NEXT_PUBLIC_GA_ID=G-J8QN6G9SQN

# Security (generate random 32-char strings)
CSRF_SECRET=your_32_character_random_string
RATE_LIMIT_SECRET=your_32_character_random_string
ENCRYPTION_KEY=your_32_character_random_string

# Site Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_VIDEO_CACHE_BUST=v1.2.3
```

### 2.3 Domain Configuration

1. **Vercel Dashboard** → **Domains** → **Add Domain**
2. Add: `khesed-tek-systems.org` and `www.khesed-tek-systems.org`
3. Update DNS at your domain provider:

   ```dns
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A  
   Name: @
   Value: 76.76.19.61
   ```

## 📧 **Step 3: Test Email Flow**

### 3.1 Test API Endpoint

```bash
# Test basic email functionality
curl -X POST https://www.khesed-tek-systems.org/api/test-email \\
  -H "Content-Type: application/json" \\
  -d '{"to":"your-test@email.com","message":"Gmail SMTP test"}'
```

### 3.2 Test Demo Request Form

```bash
# Test full form submission
curl -X POST https://www.khesed-tek-systems.org/api/request-demo \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Test User",
    "email": "test@example.co",  
    "org": "Test Church",
    "whatsapp": "+57 123 456 7890",
    "message": "Testing Gmail SMTP integration"
  }'
```

### 3.3 Expected Response

```json
{
  "ok": true,
  "market": "LATAM",
  "emailSent": true,
  "emailId": "gmail-message-id"
}
```

## 🎯 **Step 4: Verify Email Delivery**

### 4.1 Check Market Routing

- **LATAM emails** (.co, +57 WhatsApp) → `contacto@khesed-tek-systems.org`
- **USA emails** (.us, +1 WhatsApp) → `contact@khesed-tek-systems.org`  
- **Global emails** (others) → `global@khesed-tek-systems.org`

### 4.2 Debug if Issues

```bash
# Check email service configuration
curl https://www.khesed-tek-systems.org/api/debug-email
```

## ⚡ **Quick Deployment Commands**

```bash
# 1. Deploy to Vercel
vercel --prod

# 2. Test email after deployment
curl -X POST https://your-vercel-url/api/test-email \\
  -H "Content-Type: application/json" \\
  -d '{"to":"your@email.com","message":"Test"}'

# 3. Test form submission  
curl -X POST https://your-vercel-url/api/request-demo \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test","email":"test@example.co","org":"Test Church"}'
```

## 🛡️ **Security Notes**

- ✅ **Gmail App Password** is more secure than regular password
- ✅ **Environment variables** are encrypted in Vercel
- ✅ **No Resend conflicts** with Google Workspace
- ✅ **Rate limiting** and security headers configured

## 📞 **Need Help?**

If email delivery fails:

1. **Verify Gmail App Password** is correct (16 characters, no spaces)
2. **Check Vercel logs** in dashboard for error details
3. **Test with different email** to rule out spam filters
4. **Verify environment variables** are set in Vercel dashboard
