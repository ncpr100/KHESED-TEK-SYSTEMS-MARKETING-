# PRODUCT SALES SYSTEM SETUP GUIDE

**Complete setup instructions for E-book and Journal App sales**

---

## 📋 OVERVIEW

This system allows KHESED-TEK to sell:
- **E-books** (3 titles, Spanish + English versions)
- **Journal App** (future product, interest registration)

**Technology Stack:**
- **Database**: Supabase (PostgreSQL + Storage)
- **Payments**: Paddle (payment processing + checkout)
- **Email**: Gmail SMTP (existing system)
- **Hosting**: Vercel (existing)

---

## 🗄️ STEP 1: SUPABASE SETUP

### 1.1 Create Supabase Account

1. Go to https://supabase.com
2. Sign up with GitHub or email
3. Click "New Project"
4. Fill in:
   - **Project name**: `khesed-tek-products` (or your choice)
   - **Database password**: Generate strong password (save it!)
   - **Region**: Choose closest to Colombia (e.g., `South America (São Paulo)`)
5. Wait 2-3 minutes for project to provision

### 1.2 Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste this SQL:

\`\`\`sql
-- Create products table
CREATE TABLE product_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type TEXT NOT NULL, -- 'ebook_peace', 'ebook_blooming', 'ebook_impactful', 'journal_app'
  language TEXT, -- 'es' or 'en'
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  country TEXT,
  paddle_transaction_id TEXT UNIQUE,
  paddle_checkout_id TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'payment_sent', 'paid', 'delivered', 'failed'
  payment_link TEXT,
  download_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_product_requests_email ON product_requests(customer_email);
CREATE INDEX idx_product_requests_status ON product_requests(status);
CREATE INDEX idx_product_requests_transaction ON product_requests(paddle_transaction_id);

-- Create updated_at trigger
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
\`\`\`

4. Click "Run" (bottom right)
5. Verify success: "Success. No rows returned"

### 1.3 Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click "New bucket"
3. Settings:
   - **Name**: `ebooks`
   - **Public bucket**: `OFF` (private for security)
4. Click "Create bucket"

### 1.4 Upload E-book Files

1. Click on `ebooks` bucket
2. Click "Upload files"
3. Upload your PDF files with these exact names:
   - `ebooks/paz-en-la-tormenta.pdf`
   - `ebooks/floreciendo-en-el-fuego.pdf`
   - `ebooks/vida-de-impacto.pdf`
4. Each file should be a complete, formatted PDF

### 1.5 Get API Credentials

1. Go to **Project Settings** (gear icon, bottom left)
2. Go to **API** section
3. Copy these values (you'll need them for .env):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)
   - **service_role key**: `eyJhbGc...` (different long string - KEEP SECRET!)

---

## 💳 STEP 2: PADDLE SETUP

### 2.1 Create Paddle Account

1. Go to https://www.paddle.com
2. Click "Get started" or "Sign up"
3. Fill in business details:
   - **Business name**: KHESED-TEK Systems
   - **Country**: Colombia
   - **Business type**: Individual/Company (as applicable)
4. Complete verification process (may take 1-2 business days)

### 2.2 Start in Sandbox Mode

While waiting for approval, use **Sandbox** environment:

1. In Paddle dashboard, toggle to "Sandbox" (top right)
2. This allows testing without real money

### 2.3 Create Products in Paddle

Create 6 products (3 e-books × 2 languages):

**Product 1: Paz en la Tormenta (ES)**
- Name: `Paz en la Tormenta (Spanish)`
- Price: `9.99 USD`
- Description: `E-book digital - Encuentra paz interior`
- Copy **Price ID**: `pri_xxx...` → Save as `PADDLE_PRODUCT_EBOOK_PEACE_ES`

**Product 2: Peace in the Storm (EN)**
- Name: `Peace in the Storm (English)`
- Price: `9.99 USD`
- Description: `Digital e-book - Find inner peace`
- Copy **Price ID**: `pri_xxx...` → Save as `PADDLE_PRODUCT_EBOOK_PEACE_EN`

**Product 3: Floreciendo en el Fuego (ES)**
- Name: `Floreciendo en el Fuego (Spanish)`
- Price: `9.99 USD`
- Copy **Price ID** → Save as `PADDLE_PRODUCT_EBOOK_BLOOMING_ES`

**Product 4: Blooming in the Fire (EN)**
- Name: `Blooming in the Fire (English)`
- Price: `9.99 USD`
- Copy **Price ID** → Save as `PADDLE_PRODUCT_EBOOK_BLOOMING_EN`

**Product 5: Vida de Impacto (ES)**
- Name: `Vida de Impacto (Spanish)`
- Price: `9.99 USD`
- Copy **Price ID** → Save as `PADDLE_PRODUCT_EBOOK_IMPACTFUL_ES`

**Product 6: Impactful Living (EN)**
- Name: `Impactful Living (English)`
- Price: `9.99 USD`
- Copy **Price ID** → Save as `PADDLE_PRODUCT_EBOOK_IMPACTFUL_EN`

### 2.4 Configure Webhook

**CRITICAL:** Paddle needs to notify your site when payments succeed.

1. In Paddle dashboard, go to **Developer Tools** → **Notifications**
2. Click "Add notification destination"
3. Settings:
   - **Webhook URL**: `https://khesed-tek-systems.org/api/webhooks/paddle`
   - **Description**: `Production payment webhooks`
   - **Events to subscribe**:
     - `transaction.completed`
     - `transaction.payment_failed`
4. Copy **Webhook Secret**: `pdl_ntfset_xxx...` → Save as `PADDLE_WEBHOOK_SECRET`

### 2.5 Get API Credentials

1. Go to **Developer Tools** → **Authentication**
2. Click "Create API key"
3. Name: `Production API`
4. **Select permissions** (CRITICAL):
   - ✅ `transaction:read` - Read transaction data
   - ✅ `transaction:write` - Create checkouts
   - ✅ `product:read` - Read product information
   - ✅ `price:read` - Read pricing information
   - ✅ `customer:read` - Read customer data
   - ✅ `customer:write` - Create/update customers
   - (Or select "Full Access" if you're the only admin)
5. Click "Create key"
6. Copy **API Key**: `xxx...` → Save as `PADDLE_API_KEY`
7. ⚠️ **IMPORTANT**: Store this key securely - it won't be shown again!

---

## 🔐 STEP 3: ENVIRONMENT VARIABLES

### 3.1 Update .env.local (for local development)

Create/update `.env.local` in project root:

\`\`\`bash
# === EXISTING VARIABLES (keep these) ===
GMAIL_USER=nc@khesed-tek-systems.org
GMAIL_APP_PASSWORD=your-app-password
# ... other existing vars ...

# === NEW SUPABASE VARIABLES ===
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # DIFFERENT from anon key!

# === NEW PADDLE VARIABLES ===
PADDLE_API_KEY=your-paddle-api-key
PADDLE_WEBHOOK_SECRET=pdl_ntfset_xxx...
PADDLE_ENVIRONMENT=sandbox  # Use 'sandbox' for testing, 'production' when live

# Paddle Product IDs (Price IDs from Step 2.3)
PADDLE_PRODUCT_EBOOK_PEACE_ES=pri_xxx...
PADDLE_PRODUCT_EBOOK_PEACE_EN=pri_xxx...
PADDLE_PRODUCT_EBOOK_BLOOMING_ES=pri_xxx...
PADDLE_PRODUCT_EBOOK_BLOOMING_EN=pri_xxx...
PADDLE_PRODUCT_EBOOK_IMPACTFUL_ES=pri_xxx...
PADDLE_PRODUCT_EBOOK_IMPACTFUL_EN=pri_xxx...
\`\`\`

### 3.2 Update Vercel Environment Variables

1. Go to https://vercel.com/dashboard
2. Select your project (`khesed-tek-systems-marketing`)
3. Go to **Settings** → **Environment Variables**
4. Add **each variable** from above:
   - Click "Add"
   - Paste name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Paste value
   - Select: `Production`, `Preview`, `Development`
   - Click "Save"
5. **IMPORTANT**: After adding all variables, redeploy:
   - Go to **Deployments** tab
   - Click three dots on latest deployment
   - Click "Redeploy"

---

## 🧪 STEP 4: TESTING

### 4.1 Local Testing

\`\`\`bash
# 1. Start dev server
npm run dev

# 2. Open browser: http://localhost:3000/products
# (You'll need to create this page - see below)

# 3. Fill form and submit
# 4. Check console for logs
# 5. Check email for payment link
\`\`\`

### 4.2 Test Payment Flow (Sandbox)

1. Submit form with test email
2. Receive payment link email
3. Click payment link → Opens Paddle checkout
4. Use Paddle test card:
   - **Card**: `4242 4242 4242 4242`
   - **Expiry**: Any future date
   - **CVV**: Any 3 digits
5. Complete payment
6. Check email for download link
7. Verify download link works (24-hour expiry)

### 4.3 Verify Database

1. Go to Supabase dashboard → **Table Editor**
2. Click `product_requests` table
3. Verify your test record appears with:
   - `status = 'delivered'`
   - `paddle_transaction_id` populated
   - `download_link` populated

---

## 📄 STEP 5: CREATE PRODUCT PAGE

Create `/app/products/page.tsx`:

\`\`\`tsx
import ProductRequestForm from '@/components/products/product-request-form';

export const metadata = {
  title: 'Productos - KHESED-TEK',
  description: 'E-books y recursos digitales para tu crecimiento espiritual',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0e0e10] pt-24 pb-16">
      <ProductRequestForm />
    </main>
  );
}
\`\`\`

---

## 🚀 STEP 6: GO LIVE

### 6.1 Switch Paddle to Production

1. Complete Paddle business verification (if pending)
2. In Paddle dashboard, switch from "Sandbox" to "Production"
3. Update environment variable:
   \`\`\`
   PADDLE_ENVIRONMENT=production
   \`\`\`
4. Redeploy on Vercel

### 6.2 Final Checklist

- ✅ Supabase database table created
- ✅ Supabase storage bucket created with PDFs
- ✅ Paddle products created (6 total)
- ✅ Paddle webhook configured
- ✅ All environment variables set in Vercel
- ✅ Test transaction completed successfully
- ✅ Download email received and link works
- ✅ `/products` page created and deployed

---

## 🔧 TROUBLESHOOTING

### "Database not configured" Error

**Cause**: Supabase environment variables missing or incorrect

**Fix**:
\`\`\`bash
# Verify in Vercel dashboard or locally:
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
# Should print URLs, not empty
\`\`\`

### "Payment system not configured" Error

**Cause**: Paddle environment variables missing

**Fix**: Check `PADDLE_API_KEY` is set in Vercel

### Email Not Received

**Causes**:
1. Gmail SMTP credentials expired
2. Email went to spam
3. Typo in customer email

**Fix**:
- Check Vercel logs for email sending errors
- Check spam folder
- Test with different email provider

### Download Link Expired

**Cause**: Supabase signed URLs expire after 24 hours

**Fix**: Customer must download within 24 hours. Consider:
- Extending expiry: Change `86400` to `604800` (7 days) in `supabase-client.ts`
- Manual resend: Send new link via support

### Webhook Not Receiving Events

**Causes**:
1. Webhook URL incorrect in Paddle
2. Webhook signature verification failing

**Fix**:
- Verify webhook URL: `https://yourdomain.com/api/webhooks/paddle` (no typos!)
- Check Paddle dashboard → Notifications → Event logs for errors
- Temporarily disable signature verification for testing (NOT for production!)

---

## 📊 MONITORING

### Check Sales

**Supabase Dashboard:**
\`\`\`sql
-- See all requests
SELECT * FROM product_requests ORDER BY created_at DESC;

-- See completed sales
SELECT * FROM product_requests WHERE status = 'delivered';

-- Revenue report
SELECT 
  product_type,
  COUNT(*) as sales,
  COUNT(*) * 9.99 as revenue
FROM product_requests 
WHERE status = 'delivered'
GROUP BY product_type;
\`\`\`

### Email Logs

Check Vercel deployment logs:
\`\`\`bash
vercel logs --follow
\`\`\`

Look for:
- "Payment link email sent to: xxx"
- "Download link email sent to: xxx"

---

## 💰 PRICING & COSTS

### Supabase (Free Tier)
- Database: 500 MB storage (sufficient for product table)
- Storage: 1 GB (sufficient for 3 PDFs)
- Bandwidth: 5 GB/month (monitor if sales spike)

**Upgrade if needed**: $25/month for Pro tier

### Paddle Fees
- **Transaction fee**: 5% + $0.50 per sale
- **Example**: $9.99 sale = $0.50 + $0.50 = $9.49 net to you

### Gmail SMTP
- Free (existing setup)

---

## 📞 SUPPORT CONTACTS

- **Supabase Support**: https://supabase.com/contact
- **Paddle Support**: https://paddle.com/support
- **This System**: Reply to nc@khesed-tek-systems.org

---

**Setup complete! 🎉 Your product sales system is ready.**
