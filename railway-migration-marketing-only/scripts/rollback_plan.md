# Rollback Plan - KHESED-TEK Marketing Site

If a deployment causes issues, follow these rollback procedures.

---

## Option 1: Redeploy Previous Commit (Recommended)

### Via GitHub Actions:
1. Go to your GitHub repository
2. Click **Actions** tab
3. Find the last successful deployment
4. Click on it
5. Click **Re-run all jobs**
6. Wait for deployment to complete

### Via Git:
```bash
# Find the last good commit
git log --oneline

# Reset to that commit (replace COMMIT_HASH)
git reset --hard COMMIT_HASH

# Force push
git push -f origin main
```

---

## Option 2: Manual Railway Rollback

### Using Railway CLI:
```bash
# View recent deployments
railway status

# Redeploy from local (ensure you're on good commit)
git checkout GOOD_COMMIT_HASH
railway up
```

---

## Option 3: Revert Specific Changes

If you know which commit caused the issue:

```bash
# Revert the problematic commit
git revert BAD_COMMIT_HASH

# Push the revert
git push origin main
```

This creates a new commit that undoes the changes.

---

## Option 4: Emergency Hotfix

For critical issues:

```bash
# Create hotfix branch
git checkout -b hotfix/critical-fix

# Make your fix
# ... edit files ...

# Commit and push
git add .
git commit -m "Hotfix: description of fix"
git push origin hotfix/critical-fix

# Merge to main
git checkout main
git merge hotfix/critical-fix
git push origin main
```

---

## Verification After Rollback

Always verify the rollback worked:

```bash
# Check the site
curl -I https://your-domain.com

# Run healthcheck
./scripts/healthcheck.sh https://your-domain.com

# Run smoke tests
./scripts/smoke-tests.sh https://your-domain.com

# Check Railway logs
railway logs -f
```

---

## Prevention

To avoid needing rollbacks:

1. **Test locally first:**
   ```bash
   npm run build
   npm start
   ```

2. **Use preview deployments:**
   - Create a `preview` branch
   - Test there before merging to `main`

3. **Monitor after deployment:**
   ```bash
   railway logs -f
   ```

4. **Keep backups:**
   - Tag stable releases:
     ```bash
     git tag -a v1.0.0 -m "Stable release"
     git push origin v1.0.0
     ```
