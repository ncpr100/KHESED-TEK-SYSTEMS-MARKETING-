# Custom Domain Setup Guide - KHESED-TEK

## ✅ Current Status
- Build warnings resolved ✓
- Edge runtime optimized ✓  
- Static generation working ✓
- Site ready for custom domain ✓

## 🌐 Custom Domain Configuration

### **Method 1: Vercel Dashboard (Recommended)**

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Navigate to your project dashboard

2. **Add Domains**
   ```
   Settings → Domains → Add Domain
   
   Primary: khesedtek.com
   WWW: www.khesedtek.com
   Markets: latam.khesedtek.com, usa.khesedtek.com, global.khesedtek.com
   ```

3. **DNS Records (At your domain registrar)**
   ```dns
   # Apex domain
   Type: A
   Name: @
   Target: 76.76.19.61
   
   # WWW subdomain  
   Type: CNAME
   Name: www
   Target: cname.vercel-dns.com
   
   # Market subdomains (optional but recommended)
   Type: CNAME  
   Name: latam
   Target: cname.vercel-dns.com
   
   Type: CNAME
   Name: usa  
   Target: cname.vercel-dns.com
   
   Type: CNAME
   Name: global
   Target: cname.vercel-dns.com
   ```

### **Method 2: Vercel CLI**

```bash
# If you have Vercel CLI installed
vercel domains add khesedtek.com
vercel domains add www.khesedtek.com
vercel domains add latam.khesedtek.com
```

## 🚀 **Deployment Process**

### **Automatic Deployment (Current Setup)**
```bash
git add .
git commit -m "Custom domain configuration"
git push origin main
# Vercel automatically deploys from main branch
```

### **Manual Deployment**
```bash
npm run build  # Test locally first
vercel --prod   # Deploy to production
```

## ⚠️ **Important Notes**

1. **SSL Certificates**: Vercel automatically provisions SSL certificates
2. **DNS Propagation**: Can take 24-48 hours globally  
3. **HTTPS Redirect**: Automatically handled by Vercel
4. **Multi-market URLs**: Your site supports `/latam`, `/usa`, `/global` routes

## 🔧 **Domain Verification**

After DNS setup, verify with:
```bash
dig khesedtek.com
nslookup khesedtek.com
```

Expected result: Should point to Vercel's IP addresses.

## 📧 **Email Setup (If Needed)**

If you need email for your domain:
```dns
# MX Records (example with Google Workspace)
Type: MX
Priority: 1
Target: smtp.google.com

# Or use your current email provider's MX records
```

## 🔎 **Troubleshooting**

### **Domain Not Working?**
1. Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Verify DNS records match exactly
3. Clear browser cache / try incognito mode
4. Check Vercel dashboard for domain status

### **SSL Certificate Issues?**
- Vercel handles SSL automatically
- May take a few minutes after DNS propagation
- Check domain status in Vercel dashboard

## 🎯 **Your Multi-Market Setup**

Once configured, your site will be accessible at:
- **Primary**: https://khesedtek.com (redirects to market detection)
- **LATAM**: https://khesedtek.com/latam (Spanish)  
- **USA**: https://khesedtek.com/usa (English)
- **Global**: https://khesedtek.com/global (English fallback)

Or with subdomains:
- **LATAM**: https://latam.khesedtek.com
- **USA**: https://usa.khesedtek.com  
- **Global**: https://global.khesedtek.com

## 📞 **Support**

If you encounter issues:
1. Check Vercel dashboard domain status
2. Verify DNS propagation is complete  
3. Review Vercel deployment logs
4. Test with different browsers/networks

---
**Note**: Your current Vercel URL will continue to work as a backup even after custom domain setup.