# ENVIRONMENT VARIABLES AUDIT - KT-MARKETING
**Date**: 2026-03-20  
**Issue**: Mixed Supabase projects causing "Invalid API key" errors

---

## PROBLEM SUMMARY
The Vercel environment has variables from TWO different Supabase projects mixed together:
- **Project A**: `qxdwpihcmgctznvdfmbv` ❌ (Wrong - appears to be from KT-CMS)
- **Project B**: `wchqfddjednbpbyofbmj` ✅ (Correct - shared project for CMS + Marketing)

---

## CURRENT STATE (From Debug Endpoint + Screenshots)

### ❌ WRONG Variables (Need to DELETE):
These are pointing to the wrong Supabase project (`qxdwpihcmgctznvdfmbv`):

```bash
SUPABASE_URL=https://qxdwpihcmgctznvdfmbv.supabase.co  # ❌ DELETE
SUPABASE_JWT_SECRET=[from qxdwpihcmgctznvdfmbv]        # ❌ DELETE (CMS-only)
SUPABASE_PUBLISHABLE_KEY=[from qxdwpihcmgctznvdfmbv]   # ❌ DELETE (duplicate)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=[wrong project]   # ❌ DELETE (duplicate)
```

### ✅ CORRECT Variables (Need to KEEP):
These should point to `wchqfddjednbpbyofbmj`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wchqfddjednbpbyofbmj.supabase.co  # ✅ KEEP
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...236 chars                 # ✅ KEEP
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...236 chars                     # ✅ KEEP
SUPABASE_ANON_KEY=[if matches NEXT_PUBLIC version]                # ⚠️ OPTIONAL (duplicate)
```

---

## SHARED WITH KT-CMS PROJECT

Both KT-CMS and KT-MARKETING use the SAME Supabase project (`wchqfddjednbpbyofbmj`):

### Variables SHARED between both projects:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://wchqfddjednbpbyofbmj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (236 chars)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (236 chars)
```

### Variables UNIQUE to KT-CMS:
```bash
POSTGRES_* variables (direct database access)
SUPABASE_JWT_SECRET (for RLS policies in CMS)
```

### Variables UNIQUE to KT-MARKETING:
```bash
PADDLE_* variables (payment processing - 9 vars)
GMAIL_* variables (email sending - 2 vars)
```

---

## COMPLETE VARIABLE LIST FOR KT-MARKETING

### **Category 1: Supabase (Database & Storage)** - 3 vars
```bash
NEXT_PUBLIC_SUPABASE_URL=https://wchqfddjednbpbyofbmj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (from dashboard API settings)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (from dashboard API settings)
```

### **Category 2: Paddle (Payment Processing)** - 9 vars
```bash
PADDLE_API_KEY=apikey_01kkezjxn7zffqb4sv284x7tk8
PADDLE_WEBHOOK_SECRET=ntfset_01km1hj8r6w1cvm74ydmp4s4gp
PADDLE_ENVIRONMENT=sandbox

# Product IDs (6 e-books)
PADDLE_PRODUCT_EBOOK_PEACE_ES=pri_01km1g35vfpkpzg38g5txy4dwf
PADDLE_PRODUCT_EBOOK_PEACE_EN=pri_01km1fz4a9z89gsjjc21sd1q0p
PADDLE_PRODUCT_EBOOK_BLOOMING_ES=pri_01km1gkqy8419kf6kbnaaqdcjz
PADDLE_PRODUCT_EBOOK_BLOOMING_EN=pri_01km1h3q0b9xjjs2byafwz12ad
PADDLE_PRODUCT_EBOOK_IMPACTFUL_ES=pri_01km1h0h6a8259zftnh99vj78h
PADDLE_PRODUCT_EBOOK_IMPACTFUL_EN=pri_01km1hajppw27fwe2xq9bg25fa
```

### **Category 3: Email (Gmail SMTP)** - 2 vars
```bash
GMAIL_USER=nc@khesed-tek-systems.org
GMAIL_APP_PASSWORD=[16-char app password]
```

### **Category 4: Email Service (Resend)** - 4 vars
```bash
RESEND_API_KEY=[your resend key]
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org
CONTACT_EMAIL_GLOBAL=global@khesed-tek-systems.org
```

### **Category 5: Analytics** - 1 var
```bash
NEXT_PUBLIC_GA_ID=[Google Analytics ID if configured]
```

### **Category 6: Marketing Site Configuration** - 4 vars
```bash
NEXT_PUBLIC_SITE_URL=https://khesed-tek-systems.org
NEXT_PUBLIC_VIDEO_CACHE_BUST=[version number]
NEXT_PUBLIC_LATAM_CAROUSEL_IMAGES=[JSON array]
# ... other carousel/marketing vars
```

---

## VARIABLES TO DELETE FROM VERCEL

Based on audit, DELETE these from KT-MARKETING project:

1. ❌ `SUPABASE_URL` (wrong format, should be NEXT_PUBLIC_SUPABASE_URL)
2. ❌ `SUPABASE_JWT_SECRET` (CMS-only, not needed in Marketing)
3. ❌ `SUPABASE_PUBLISHABLE_KEY` (duplicate/wrong name)
4. ❌ `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (duplicate/wrong project)
5. ❌ Any `POSTGRES_*` variables (direct DB access, CMS-only)
6. ❌ `SUPABASE_ANON_KEY` if it duplicates `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## FIX PROCEDURE

### Step 1: DELETE Wrong Supabase Variables
In Vercel → KT-MARKETING → Environment Variables:
- Find and DELETE: `SUPABASE_URL`
- Find and DELETE: `SUPABASE_JWT_SECRET` (if present)
- Find and DELETE: `SUPABASE_PUBLISHABLE_KEY` (if present)
- Find and DELETE: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (if present)

### Step 2: VERIFY Correct Variables Exist
Ensure these 3 exist with CORRECT values:
- `NEXT_PUBLIC_SUPABASE_URL` = `https://wchqfddjednbpbyofbmj.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [from wchqfddjednbpbyofbmj dashboard]
- `SUPABASE_SERVICE_ROLE_KEY` = [from wchqfddjednbpbyofbmj dashboard]

### Step 3: Redeploy
After cleaning up, trigger clean redeploy.

---

## VERIFICATION CHECKLIST

After cleanup:
- [ ] Debug endpoint shows `urlCorrect: true`
- [ ] Debug endpoint shows `serviceRoleKey.length: 236`
- [ ] Debug endpoint shows `anonKey.length: 236`
- [ ] Form submission works without "Invalid API key" error
- [ ] Product request created in database
- [ ] Email sent successfully
