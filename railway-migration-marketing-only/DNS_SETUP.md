# DNS Setup for Custom Domain

Follow these steps to point your custom domain to Railway.

---

## Step 1: Add Domain in Railway

1. Go to Railway dashboard: https://railway.app/dashboard
2. Select your `khesed-tek-marketing` project
3. Click on your service
4. Go to **Settings** → **Domains**
5. Click **Add Domain**
6. Enter your domain (e.g., `www.khesed-tek.com`)
7. Railway will show you a CNAME target (e.g., `khesed-tek-marketing.up.railway.app`)

**Copy this CNAME target** - you'll need it in the next step.

---

## Step 2: Update DNS Records

Go to your DNS provider (examples below).

### For www subdomain:

**Record Type:** CNAME  
**Name/Host:** www  
**Value/Target:** [the CNAME Railway gave you]  
**TTL:** Auto or 3600

### For apex domain (optional):

If you want `khesed-tek.com` (without www) to work:

**Option A - CNAME Flattening (Cloudflare, Cloudflare):**
- Add CNAME for `@` pointing to Railway CNAME
- Enable "Proxy" if using Cloudflare

**Option B - Redirect:**
- Keep apex as A record pointing to a redirect service
- Redirect `khesed-tek.com` → `www.khesed-tek.com`

---

## Step 3: DNS Provider Examples

### Cloudflare:
1. Log in to Cloudflare
2. Select your domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Type: `CNAME`
6. Name: `www`
7. Target: [Railway CNAME]
8. Proxy status: **DNS only** (gray cloud) initially
9. Click **Save**

### GoDaddy:
1. Log in to GoDaddy
2. Go to **My Products** → **DNS**
3. Click **Add** under Records
4. Type: `CNAME`
5. Name: `www`
6. Value: [Railway CNAME]
7. TTL: 1 hour
8. Click **Save**

### Namecheap:
1. Log in to Namecheap
2. Go to **Domain List** → **Manage**
3. **Advanced DNS** tab
4. Click **Add New Record**
5. Type: `CNAME Record`
6. Host: `www`
7. Value: [Railway CNAME]
8. TTL: Automatic
9. Click **Save**

---

## Step 4: Wait for Propagation

DNS changes take time to propagate:
- Minimum: 5 minutes
- Average: 30 minutes
- Maximum: 48 hours (rare)

**Check propagation:**
- https://dnschecker.org
- Enter your domain: `www.khesed-tek.com`
- Select CNAME
- Check if it shows the Railway target

---

## Step 5: Verify SSL Certificate

Railway automatically provisions SSL certificates.

1. In Railway dashboard, check that domain shows **Active** status
2. Test your domain:
   ```bash
   curl -I https://www.khesed-tek.com
   ```
3. You should see `HTTP/2 200` and valid SSL

---

## Step 6: Update Links (if needed)

If you have hardcoded URLs in your code:
- Update any absolute URLs to use your custom domain
- Update `NEXT_PUBLIC_SITE_URL` if you have one
- Redeploy if needed

---

## Troubleshooting

### Domain shows "Pending":
- Wait longer for DNS propagation
- Verify CNAME record is correct
- Check for typos in the CNAME target

### SSL certificate error:
- Railway needs to verify domain ownership first
- Can take up to 1 hour after DNS propagates
- Check Railway logs for errors

### Site not loading:
- Verify DNS with `dig www.khesed-tek.com`
- Check Railway service is running
- View Railway logs: `railway logs -f`

### Mixed content warnings:
- Ensure all assets use HTTPS
- Check for hardcoded HTTP URLs in code

---

## Final Checklist

- [ ] Domain added in Railway
- [ ] CNAME record created in DNS provider
- [ ] DNS propagation complete (check dnschecker.org)
- [ ] Domain shows "Active" in Railway
- [ ] HTTPS works (no certificate errors)
- [ ] Site loads correctly on custom domain
- [ ] All pages accessible (/, /contact)
- [ ] Form submissions work
- [ ] Mobile responsive
