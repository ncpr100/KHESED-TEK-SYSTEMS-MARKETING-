# Railway Migration Guide - KHESED-TEK Marketing Site

This guide helps you deploy the **KHESED-TEK Marketing Website** (Next.js 14 + Tailwind + Resend) to Railway.

## What this is for
✅ Marketing website ONLY (khesed_tek_marketing_site.zip)
❌ NOT for the church systems app (khesed_tek_church_systems.zip)

---

## Prerequisites
- GitHub account
- Railway account: https://railway.app
- Resend API key for demo request emails
- Your marketing site code (the one with homepage, features, contact form)

---

## Step 1: Prepare Your GitHub Repository

1. **Create a new GitHub repository** (e.g., `khesed-tek-marketing`)

2. **Extract your marketing site** (khesed-tek-marketing-site.zip) to a local folder

3. **Add the migration files from this pack** to the root of your marketing site:
   - Copy `Dockerfile` to root
   - Copy `.dockerignore` to root
   - Copy `.github/` folder to root
   - Copy `scripts/` folder to root
   - Copy `next.config.js` (updated version) to root (replace existing)

4. **Verify your structure looks like this:**
   ```
   khesed-tek-marketing/
   ├── .github/
   │   └── workflows/
   │       └── railway-deploy.yml
   ├── app/
   │   ├── layout.tsx
   │   ├── page.tsx
   │   ├── globals.css
   │   ├── contact/
   │   └── api/
   ├── components/
   │   └── marketing/
   ├── public/
   │   ├── khesed-tek-logo.png
   │   └── manifest.json
   ├── scripts/
   │   ├── healthcheck.sh
   │   ├── smoke-tests.sh
   │   └── rollback_plan.md
   ├── Dockerfile
   ├── .dockerignore
   ├── .gitignore
   ├── next.config.js
   ├── package.json
   ├── tailwind.config.js
   └── tsconfig.json
   ```

5. **Commit and push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - KHESED-TEK marketing site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/khesed-tek-marketing.git
   git push -u origin main
   ```

---

## Step 2: Install Railway CLI

```bash
npm install -g @railway/cli
```

Verify installation:
```bash
railway --version
```

---

## Step 3: Create Railway Project

1. **Login to Railway:**
   ```bash
   railway login
   ```
   This opens a browser for authentication.

2. **Navigate to your project folder:**
   ```bash
   cd /path/to/khesed-tek-marketing
   ```

3. **Initialize Railway project:**
   ```bash
   railway init
   ```
   - Choose "Create new project"
   - Name it: `khesed-tek-marketing`

4. **Link the project:**
   ```bash
   railway link
   ```
   Select the project you just created.

---

## Step 4: Configure Environment Variables in Railway

1. **Go to Railway dashboard:** https://railway.app/dashboard

2. **Select your project** → Click on the service → **Variables** tab

3. **Add these variables:**
   ```
   NODE_ENV=production
   RESEND_API_KEY=re_your_actual_resend_api_key_here
   CONTACT_EMAIL=soporte@khesed-tek.com
   ```

4. **Save** (Railway will auto-redeploy when you add variables)

**Note:** Railway automatically provides `PORT` - you don't need to set it.

---

## Step 5: First Deployment (Manual)

Deploy directly from your local machine:

```bash
railway up
```

This will:
- Build the Docker image
- Push to Railway
- Deploy the service
- Give you a URL (e.g., `https://khesed-tek-marketing-production.up.railway.app`)

**Test the deployment:**
```bash
./scripts/healthcheck.sh https://your-railway-url.up.railway.app
./scripts/smoke-tests.sh https://your-railway-url.up.railway.app
```

---

## Step 6: Set Up GitHub Actions (CI/CD)

1. **Get your Railway token:**
   ```bash
   railway login
   railway whoami --token
   ```
   Copy the token that appears.

2. **Add token to GitHub:**
   - Go to your GitHub repo
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `RAILWAY_TOKEN`
   - Value: paste the token from step 1
   - Click "Add secret"

3. **Update the workflow file** (if needed):
   - The file `.github/workflows/railway-deploy.yml` is already configured
   - It deploys on every push to `main` branch

4. **Test the workflow:**
   - Make a small change (e.g., edit README.md)
   - Commit and push:
     ```bash
     git add .
     git commit -m "Test CI/CD"
     git push
     ```
   - Go to GitHub → Actions tab
   - Watch the deployment run

---

## Step 7: Add Custom Domain (Production)

1. **In Railway dashboard:**
   - Select your service
   - Go to **Settings** → **Domains**
   - Click "Add Domain"
   - Enter your domain: `www.khesed-tek.com` (or your actual domain)

2. **Railway will show you a CNAME target** (e.g., `khesed-tek-marketing.up.railway.app`)

3. **Update your DNS:**
   - Go to your DNS provider (GoDaddy, Cloudflare, Namecheap, etc.)
   - Add a CNAME record:
     ```
     Type: CNAME
     Name: www
     Target: [the CNAME Railway gave you]
     TTL: Auto or 3600
     ```
   - If using Cloudflare, set Proxy status to "DNS only" initially

4. **Wait for DNS propagation** (5-30 minutes)

5. **Verify in Railway:**
   - Railway will automatically provision SSL certificate
   - Check that your domain shows "Active" status

6. **Test your domain:**
   ```bash
   curl -I https://www.khesed-tek.com
   ```

---

## Step 8: Monitor and Maintain

### View logs:
```bash
railway logs -f
```

### Check deployment status:
```bash
railway status
```

### Redeploy manually:
```bash
railway up
```

### Rollback (if needed):
See `scripts/rollback_plan.md` for detailed rollback procedures.

---

## Step 9: Testing Checklist

- [ ] Homepage loads (`/`)
- [ ] Features section visible
- [ ] Contact page loads (`/contact`)
- [ ] Demo request form submits successfully
- [ ] Email arrives at `soporte@khesed-tek.com`
- [ ] Logo displays correctly
- [ ] Mobile responsive design works
- [ ] HTTPS is active on custom domain
- [ ] All links work (WhatsApp, email)

---

## Troubleshooting

### Build fails:
- Check Railway logs: `railway logs`
- Verify `next.config.js` has `output: 'standalone'`
- Ensure all dependencies are in `package.json`

### Form doesn't send emails:
- Verify `RESEND_API_KEY` is set correctly in Railway Variables
- Check Resend dashboard for delivery status
- In production, update the `from` address in `app/api/request-demo/route.ts` to use your verified domain

### Domain not working:
- Verify CNAME record is correct
- Check DNS propagation: https://dnschecker.org
- Ensure Railway shows domain as "Active"

---

## Quick Reference Commands

```bash
# Login
railway login

# Deploy
railway up

# View logs
railway logs -f

# Check status
railway status

# Open in browser
railway open

# Environment variables
railway variables

# Link to different project
railway link
```

---

## Support

- Railway Docs: https://docs.railway.app
- Resend Docs: https://resend.com/docs
- GitHub Actions: https://docs.github.com/actions

For KHESED-TEK specific issues:
- Email: soporte@khesed-tek.com
- WhatsApp: +57 302 123 4410
