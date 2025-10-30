# Railway Deployment Troubleshooting Guide

## 🚨 Railway Deployment Not Working? Here's How to Fix It

### **Step 1: Check Repository Structure**

Make sure Railway can find your project:
- ✅ Your code is in the `khesed-tek-marketing-site` folder
- ✅ The folder contains `package.json` and `next.config.js`
- ✅ Files are pushed to GitHub (check your repository)

### **Step 2: Deploy with This Exact Process**

#### **Method 1: Direct GitHub Integration (Recommended)**

1. **Go to Railway**: Visit [railway.app](https://railway.app)
2. **Sign in**: Use your GitHub account
3. **New Project**: Click the big "New Project" button
4. **Deploy from GitHub**: Select "Deploy from GitHub repo"
5. **Select Repository**: Choose `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
6. **IMPORTANT**: Select the **subfolder** `khesed-tek-marketing-site`
   - Railway needs to know to deploy from the subfolder, not the root
7. **Environment Variables**: Add only this:
   ```
   NODE_ENV=production
   ```
8. **Deploy**: Click Deploy

#### **Method 2: If Subfolder Detection Fails**

If Railway can't find the subfolder, try this:

1. **Fork or Move**: Put the `khesed-tek-marketing-site` contents in the repository root
2. **Or Use Railway CLI**:
   ```bash
   npm install -g @railway/cli
   railway login
   railway link
   railway deploy
   ```

### **Step 3: Common Railway Issues & Solutions**

#### **Issue: "No package.json found"**
**Solution**: Railway is looking in the wrong folder
- Make sure you selected the `khesed-tek-marketing-site` subfolder
- Or move the contents to repository root

#### **Issue: "Build failed"**
**Solution**: Check Railway build logs
- Go to Railway dashboard → Your project → Deployments
- Click on the failed deployment
- Check build logs for specific errors

#### **Issue: "Port binding error"**
**Solution**: Railway handles ports automatically, but if needed:
```javascript
// In next.config.js, add:
module.exports = {
  // ... existing config
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Railway-specific port handling
  server: {
    port: process.env.PORT || 3000
  }
}
```

#### **Issue: "Environment variables not working"**
**Solution**: Set them in Railway dashboard:
- Go to your project → Variables tab
- Add each variable one by one
- Railway will auto-redeploy

### **Step 4: Alternative Deployment Methods**

#### **Option A: Use Railway Template Button**
Click this button for one-click deployment:
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/0Qzh8M)

#### **Option B: Use Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to your project
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-/khesed-tek-marketing-site

# Deploy directly
railway deploy
```

#### **Option C: Move to Repository Root**
If subfolder deployment doesn't work:
```bash
# Move all contents to repository root
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-/
mv khesed-tek-marketing-site/* .
mv khesed-tek-marketing-site/.* . 2>/dev/null || true
rmdir khesed-tek-marketing-site

# Commit and push
git add .
git commit -m "Move to repository root for Railway deployment"
git push origin main

# Then deploy from Railway dashboard
```

### **Step 5: Verify Deployment**

Once deployed, test these URLs:
- `https://your-app.railway.app` - Main site
- `https://your-app.railway.app/api/health` - Health check
- `https://your-app.railway.app/api/config` - Configuration status

### **Step 6: Debug Railway Deployment**

#### **Check Railway Logs**
1. Go to Railway dashboard
2. Click your project
3. Click "Deployments" tab
4. Click on the latest deployment
5. Check "Build Logs" and "Deploy Logs"

#### **Common Log Errors & Solutions**

**Error**: `npm ERR! code ENOENT`
**Solution**: Railway can't find package.json - check folder structure

**Error**: `Module not found`
**Solution**: Dependencies issue - ensure all imports are correct

**Error**: `Port already in use`
**Solution**: Railway handles ports automatically - remove any hardcoded ports

**Error**: `Dynamic server usage`
**Solution**: This is a warning, not an error - deployment should still work

### **Step 7: Railway Environment Setup**

**Minimal working setup**:
```env
NODE_ENV=production
```

**Add these later when you get API keys**:
```env
# Email (free tier)
SENDGRID_API_KEY=your_sendgrid_key

# Security (generate random strings)
JWT_SECRET=your_32_character_secret_here
API_SECRET=another_random_string_here

# CRM (when ready)
HUBSPOT_API_KEY=your_hubspot_key
```

### **Step 8: Alternative Platforms (If Railway Fails)**

If Railway continues to fail, try these alternatives:

#### **Vercel** (Next.js optimized)
```bash
npm install -g vercel
vercel
```

#### **Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build command: `npm run build`
4. Publish directory: `.next`

#### **Heroku**
```bash
# Install Heroku CLI
# Create Procfile:
echo "web: npm start" > Procfile
git add Procfile
git commit -m "Add Procfile for Heroku"
heroku create your-app-name
git push heroku main
```

---

## 🆘 **Still Not Working?**

### **Quick Diagnosis**
Tell me which step failed and I'll help you fix it:

1. **Can't find repository?** - Check GitHub repository exists and is public
2. **Can't find package.json?** - Folder structure issue
3. **Build fails?** - Share the build logs
4. **Deploy succeeds but site doesn't load?** - Environment variable issue
5. **API errors?** - Check the /api/health endpoint

### **Get Immediate Help**
Share your Railway deployment logs and I'll diagnose the exact issue!

---

## ✅ **Expected Result**
After successful deployment:
- Your site loads at `https://your-app.railway.app`
- Contact forms work (data is logged)
- All pages are accessible
- Admin dashboard is functional

**No external API keys needed for basic functionality!**