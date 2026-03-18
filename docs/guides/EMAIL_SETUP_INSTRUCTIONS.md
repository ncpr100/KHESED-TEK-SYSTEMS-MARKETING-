# EMAIL SETUP INSTRUCTIONS - KHESED-TEK SYSTEMS

## 🚨 CURRENT ISSUE
Email notifications are not working because the RESEND_API_KEY is invalid.

## ✅ SOLUTION - Get Real Resend API Key

### Step 1: Create Resend Account
1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email

### Step 2: Get API Key
1. Login to Resend dashboard
2. Go to "API Keys" section
3. Click "Create API Key"
4. Name it "KHESED-TEK-DEV" or similar
5. Copy the API key (starts with "re_")

### Step 3: Update Environment File
Replace the placeholder in `.env.local`:

```bash
# Change this line:
RESEND_API_KEY=re_test_key_for_build

# To your real API key:
RESEND_API_KEY=re_your_actual_api_key_here
```

### Step 4: Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## 📧 EMAIL CONFIGURATION

### Current Setup:
- **From:** KHESED-TEK SYSTEMS Demo <onboarding@resend.dev>
- **To:** soporte@khesed-tek.com
- **Reply-To:** Customer's email

### For Production (Recommended):
1. Add your domain to Resend
2. Verify domain ownership
3. Update sender to: demo@khesed-tek.com

## 🧪 TESTING

After setting up the real API key:
1. Go to http://localhost:3000/contact
2. Fill out the form with your email
3. Submit the form
4. Check soporte@khesed-tek.com for notification
5. Check terminal logs for success confirmation

## 💰 RESEND PRICING
- **Free tier:** 3,000 emails/month
- **Perfect for:** Development and initial testing
- **Upgrade:** When you need more volume

## 🔍 TROUBLESHOOTING

If emails still don't work after API key setup:
1. Check Resend dashboard for delivery logs
2. Verify soporte@khesed-tek.com is a real email
3. Check spam folder
4. Review terminal logs for detailed errors

## ✅ SUCCESS INDICATORS

You'll know it's working when you see in terminal:
```
Email sent successfully: 01234567-89ab-cdef-0123-456789abcdef
✓ Demo request processed: { emailId: "01234567...", ... }
```

And you receive an email at soporte@khesed-tek.com with subject:
"Nueva solicitud de demo - [Customer Name]"