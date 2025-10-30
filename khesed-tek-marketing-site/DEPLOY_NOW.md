# 🚀 ONE-CLICK RAILWAY DEPLOYMENT

## **Click This Button to Deploy Instantly:**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nextjs)

## **Manual Deployment Steps:**

### **1. Quick Deploy (2 minutes)**
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
6. **IMPORTANT**: Select the `khesed-tek-marketing-site` folder
7. Add environment variable: `NODE_ENV=production`
8. Click Deploy

### **2. If Subfolder Detection Fails**

**Option A: Use Railway CLI**
```bash
npm install -g @railway/cli
railway login
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-/khesed-tek-marketing-site
railway deploy
```

**Option B: Move to Repository Root**
```bash
cd /workspaces/KHESED-TEK-SYSTEMS-MARKETING-/
mv khesed-tek-marketing-site/* .
mv khesed-tek-marketing-site/.[^.]* . 2>/dev/null || true
rmdir khesed-tek-marketing-site
git add .
git commit -m "Move to root for Railway deployment"
git push origin main
# Then deploy from Railway dashboard
```

### **3. Verify Deployment**
After deployment, test:
- Main site: `https://your-app.railway.app`
- Health check: `https://your-app.railway.app/api/health`
- Config status: `https://your-app.railway.app/api/config`

## **Troubleshooting**

**Build fails?** Check the detailed troubleshooting guide in `RAILWAY_TROUBLESHOOTING.md`

**Can't find package.json?** Railway needs to deploy from the `khesed-tek-marketing-site` subfolder

**Site loads but APIs fail?** That's normal without API keys - basic functionality works fine

---

## **What You Get After Deployment:**
- ✅ Complete marketing website
- ✅ Working contact forms (logged in Railway)
- ✅ Admin dashboard with system monitoring
- ✅ Security features and rate limiting
- ✅ GDPR compliance tools
- ✅ Health monitoring endpoints

**No external API keys needed for core functionality!**