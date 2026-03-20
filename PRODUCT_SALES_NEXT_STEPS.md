# 🚀 PRODUCT SALES - NEXT STEPS (Option B Selected)

**Decision**: Using **ONE Supabase project** for both CMS and Product Sales systems.

---

## ✅ COMPLETED

- [x] Created `.env.local` with all 13 variables
- [x] Set `PADDLE_ENVIRONMENT=sandbox`
- [x] Verified 13/14 variables (92.9% success)
- [x] Identified variable conflict with CMS app

---

## 📋 ACTION ITEMS (In Order)

### **STEP 1: Add Product Tables to Existing Supabase Project**

1. Go to https://supabase.com/dashboard
2. Sign in and select project: **wchqfddjednbpbyofbmj**
3. Go to **SQL Editor** → Click "New Query"
4. Paste this SQL:

```sql
-- Create products table
CREATE TABLE product_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type TEXT NOT NULL,
  language TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  country TEXT,
  paddle_transaction_id TEXT UNIQUE,
  paddle_checkout_id TEXT,
  status TEXT DEFAULT 'pending',
  payment_link TEXT,
  download_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_product_requests_email ON product_requests(customer_email);
CREATE INDEX idx_product_requests_status ON product_requests(status);
CREATE INDEX idx_product_requests_transaction ON product_requests(paddle_transaction_id);

-- Create trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_requests_updated_at
  BEFORE UPDATE ON product_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

5. Click "Run" → Should see "Success. No rows returned"

---

### **STEP 2: Create Storage Bucket for E-books**

1. In same Supabase project, go to **Storage**
2. Click "New bucket"
3. Settings:
   - **Name**: `ebooks`
   - **Public bucket**: `OFF` (keep private)
4. Click "Create bucket"
5. Click on `ebooks` bucket → "Upload files"
6. Upload your PDF files:
   - `paz-en-la-tormenta.pdf`
   - `floreciendo-en-el-fuego.pdf`
   - `vida-de-impacto.pdf`

---

### **STEP 3: Update Gmail App Password** ⚠️ **REQUIRED**

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already)
3. Search "App Passwords" → Click
4. Select app: **Mail**, device: **Other (Custom name)**
5. Name it: "KHESED-TEK Product Sales"
6. Click "Generate"
7. **Copy the 16-character password** (e.g., "abcd efgh ijkl mnop")
8. Update `.env.local` line 20:
   ```bash
   GMAIL_APP_PASSWORD=abcdefghijklmnop  # Remove all spaces!
   ```

---

### **STEP 4: Add ONLY PADDLE Variables to Vercel** ⚠️ **NO SUPABASE VARIABLES**

**DO NOT add Supabase variables** - they already exist from your CMS app!

1. Go to https://vercel.com/dashboard
2. Select project: `khesed-tek-systems-marketing`
3. Go to **Settings** → **Environment Variables**
4. Add these **9 PADDLE variables only**:

**Core Paddle Variables:**
```
PADDLE_API_KEY = apikey_01kkezjxn7zffqb4sv284x7tk8
PADDLE_WEBHOOK_SECRET = ntfset_01km1hj8r6w1cvm74ydmp4s4gp
PADDLE_ENVIRONMENT = sandbox
```

**Paddle Product IDs:**
```
PADDLE_PRODUCT_EBOOK_PEACE_ES = pri_01km1g35vfpkpzg38g5txy4dwf
PADDLE_PRODUCT_EBOOK_PEACE_EN = pri_01km1fz4a9z89gsjjc21sd1q0p
PADDLE_PRODUCT_EBOOK_BLOOMING_ES = pri_01km1gkqy8419kf6kbnaaqdcjz
PADDLE_PRODUCT_EBOOK_BLOOMING_EN = pri_01km1h3q0b9xjjs2byafwz12ad
PADDLE_PRODUCT_EBOOK_IMPACTFUL_ES = pri_01km1h0h6a8259zftnh99vj78h
PADDLE_PRODUCT_EBOOK_IMPACTFUL_EN = pri_01km1hajppw27fwe2xq9bg25fa
```

For each variable:
- Click "Add"
- Paste name
- Paste value
- Select: ☑ Production ☑ Preview ☑ Development
- Click "Save"

**Optional: Add Gmail password to Vercel** (if not already there):
```
GMAIL_USER = nc@khesed-tek-systems.org
GMAIL_APP_PASSWORD = [from Step 3]
```

5. After adding all variables, **Redeploy**:
   - Go to **Deployments** tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

### **STEP 5: Test Locally**

```bash
# 1. Start dev server
npm run dev

# 2. Run environment test
node /tmp/test-env.js

# Expected: 14/14 passed (100%)
```

---

### **STEP 6: Test Product Request Flow**

1. Visit: http://localhost:3000/products
2. Fill form:
   - Product: "Paz en la Tormenta - Spanish"
   - Name: "Test User"
   - Email: your-real-email@domain.com
   - Country: "Colombia"
   - Processing fees: ☑ Check
3. Submit
4. Check terminal for success logs
5. Check your email for payment link

---

### **STEP 7: Test Paddle Sandbox Payment**

1. Click payment link from email
2. Paddle checkout opens
3. Use test card:
   - **Card**: 4242 4242 4242 4242
   - **Expiry**: 12/25
   - **CVV**: 123
4. Complete payment
5. Check email for download link
6. Click download link → PDF should download

---

### **STEP 8: Verify Database**

1. Go to Supabase dashboard → **Table Editor**
2. Click `product_requests` table
3. Find your test record
4. Verify:
   - `status = 'delivered'`
   - `paddle_transaction_id` populated
   - `download_link` populated

---

## 🎯 SUMMARY

**What Changed:**
- Using **ONE Supabase project** for both CMS and Product Sales
- **Only adding 9 PADDLE variables** to Vercel (not Supabase)
- No more "variable already exists" error!

**Why This Works:**
- Your CMS and Marketing site share the same Supabase database
- Product sales tables live alongside CMS tables (separate tables, no conflicts)
- One database = easier management, lower costs
- Supabase variables already in Vercel from CMS setup

**Ready to Test:**
- Local environment: ✅ 92.9% ready (just Gmail password needed)
- Tables to add: product_requests + ebooks bucket
- Vercel variables: Only 9 Paddle variables to add
- Estimated time: 30 minutes total

---

## 🆘 TROUBLESHOOTING

**If you still get "variable already exists" error:**
- Make sure you're adding variables to the **Marketing** project, not CMS project
- Or delete the duplicate Supabase variables from Marketing project first

**If tables fail to create:**
- Check you're in the correct Supabase project (wchqfddjednbpbyofbmj)
- Ensure SQL editor has admin permissions

**If Gmail password doesn't work:**
- Verify 2FA is enabled
- Remove all spaces from the password
- Try generating a new App Password

---

**Next Command**: Start with Step 1 (add tables to Supabase) → [PROCEED]
