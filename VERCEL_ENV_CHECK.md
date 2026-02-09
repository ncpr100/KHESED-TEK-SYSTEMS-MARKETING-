# VERCEL ENVIRONMENT VARIABLES CHECK

## 🚨 CRITICAL FOR BUILD SUCCESS

**Go to your Vercel Dashboard → Project → Settings → Environment Variables**

### ✅ REQUIRED Environment Variables

**The following MUST be set in Vercel for builds to succeed:**

```bash
# 1. CRITICAL - Site URL (prevents metadataBase errors)
NEXT_PUBLIC_SITE_URL=https://your-actual-vercel-url.vercel.app

# 2. VIDEO URLs (referenced during build)
NEXT_PUBLIC_LATAM_DEMO_VIDEO=https://player.vimeo.com/video/1040636612?h=9b5e4dd3e7
NEXT_PUBLIC_USA_DEMO_VIDEO=https://player.vimeo.com/video/1040636612?h=9b5e4dd3e7
NEXT_PUBLIC_LATAM_QUICK_TOUR=https://player.vimeo.com/video/1040636612?h=9b5e4dd3e7
NEXT_PUBLIC_USA_QUICK_TOUR=https://player.vimeo.com/video/1040636612?h=9b5e4dd3e7
NEXT_PUBLIC_GLOBAL_DEMO=https://player.vimeo.com/video/1040636612?h=9b5e4dd3e7
NEXT_PUBLIC_VIDEO_CACHE_BUST=v1.5.0

# 3. Email Service (has fallbacks but needed)
RESEND_API_KEY=re_your_actual_key_here
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org
CONTACT_EMAIL_GLOBAL=global@khesed-tek-systems.org
```

## 🔧 HOW TO SET IN VERCEL

1. Go to **Vercel Dashboard**
2. Select your **KHESED-TEK project**
3. Go to **Settings** tab
4. Click **Environment Variables**
5. Add each variable above with **"Production", "Preview", "Development"** checked
6. Click **Save**
7. **Redeploy** (Settings → Deployments → Redeploy latest)

## 🚨 COMMON VERCEL BUILD ISSUES

### Issue 1: NEXT_PUBLIC_SITE_URL missing/wrong
```bash
# ❌ THIS CAUSES BUILD FAILURE:
NEXT_PUBLIC_SITE_URL=https://your-vercel-app.vercel.app

# ✅ SET TO YOUR ACTUAL VERCEL URL:  
NEXT_PUBLIC_SITE_URL=https://khesed-tek-systems-git-main-ncpr100.vercel.app
```

### Issue 2: Video URLs missing
If any `NEXT_PUBLIC_*_VIDEO` variables are missing, build fails during static generation.

### Issue 3: Node.js Version  
Vercel might use different Node.js version. Check **Settings → General → Node.js Version** should be **18.x or 20.x**

## 📋 QUICK CHECKLIST

- [ ] All NEXT_PUBLIC_ variables set in Vercel
- [ ] NEXT_PUBLIC_SITE_URL matches your actual Vercel URL
- [ ] All environment variables have "Production" scope enabled
- [ ] Node.js version is 18.x or 20.x
- [ ] Redeploy after setting variables

## 🆘 IF STILL FAILING

Check Build Logs in Vercel:
1. Go to **Deployments** tab
2. Click the **failed deployment**  
3. Check **Build Logs** for specific error
4. Look for missing environment variable errors