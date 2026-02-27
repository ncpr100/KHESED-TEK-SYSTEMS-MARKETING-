# Gmail SMTP Setup for KHESED-TEK

## ✅ Step 1: Enable App Passwords in Google Workspace

### For Personal Gmail

1. **Go to Google Account Settings**: <https://myaccount.google.com/>
2. **Security** → **2-Step Verification** (enable if not already)
3. **App passwords** → **Generate new app password**
4. **Select app**: Mail
5. **Select device**: Other (Custom name)
6. **Enter**: "KHESED-TEK Website"
7. **Copy the 16-character password** (this is your GMAIL_APP_PASSWORD)

### For Google Workspace

1. **Go to Google Admin Console**: <https://admin.google.com>
2. **Security** → **Authentication** → **App Passwords**
3. **Enable** "Allow users to manage their access to less secure apps"
4. **OR** use the personal method above with your workspace email

## ✅ Step 2: Configure Environment Variables

**Add these to your Vercel environment variables:**

```bash
# Gmail SMTP Configuration
GMAIL_USER=contacto@khesed-tek-systems.org
GMAIL_APP_PASSWORD=your_16_character_app_password

# Remove these Resend variables (no longer needed)
# RESEND_API_KEY=  
# RESEND_DOMAIN=

# Keep these (email destinations)
CONTACT_EMAIL_LATAM=contacto@khesed-tek-systems.org
CONTACT_EMAIL_USA=contact@khesed-tek-systems.org  
CONTACT_EMAIL_GLOBAL=global@khesed-tek-systems.org
```

## ✅ Step 3: Test the Setup

After configuration, test with:

```bash
curl -X POST https://khesed-tek-systems.org/api/test-email \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 🎯 Benefits of Gmail SMTP

- ✅ **No domain verification needed** - uses your existing Google Workspace
- ✅ **Better deliverability** - Gmail has excellent reputation
- ✅ **No additional costs** - included with Google Workspace
- ✅ **Familiar interface** - manage emails in Gmail
- ✅ **More reliable** - Google's infrastructure

## 📧 How It Works

1. **Form submitted** → System uses Gmail SMTP
2. **Email sent FROM**: <contacto@khesed-tek-systems.org> (your actual Gmail)
3. **Email delivered TO**: <contacto@khesed-tek-systems.org> (your inbox)
4. **Reply-to**: Customer's email address

## 🚨 Security Notes

- **App passwords** are safer than regular passwords
- **Specific to this application** - can be revoked anytime
- **No access to your full Google account** - only email sending

## ✅ Migration Complete

Once working:

1. **Delete domain** from Resend dashboard
2. **Cancel Resend subscription** if not needed elsewhere
3. **Remove Resend dependencies** from package.json
