# GitHub Setup Instructions

## 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `khesed-tek-marketing`
3. Description: "KHESED-TEK Marketing Website"
4. Visibility: Private (or Public if you prefer)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

---

## 2. Push Your Code

In your local marketing site folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - KHESED-TEK marketing site"

# Rename branch to main
git branch -M main

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/khesed-tek-marketing.git

# Push
git push -u origin main
```

---

## 3. Add Railway Token Secret

1. Get your Railway token:
   ```bash
   railway login
   railway whoami --token
   ```

2. In GitHub:
   - Go to your repository
   - Click **Settings** (top menu)
   - Click **Secrets and variables** → **Actions** (left sidebar)
   - Click **New repository secret**
   - Name: `RAILWAY_TOKEN`
   - Secret: paste the token
   - Click **Add secret**

---

## 4. Verify Workflow File

The file `.github/workflows/railway-deploy.yml` should be in your repo.

It will automatically deploy when you push to `main`.

---

## 5. Test the Workflow

1. Make a small change:
   ```bash
   echo "# KHESED-TEK Marketing" > README.md
   git add README.md
   git commit -m "Add README"
   git push
   ```

2. Watch the deployment:
   - Go to your GitHub repo
   - Click **Actions** tab
   - You should see "Deploy to Railway" running
   - Click on it to see logs

3. If successful, your site is deployed!

---

## Branch Strategy (Optional)

For better workflow:

- `main` → production (auto-deploys to Railway)
- `develop` → development branch
- `feature/*` → feature branches

To deploy only from `main`, the workflow is already configured correctly.
