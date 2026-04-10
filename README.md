# KHESED-TEK Marketing Site

Modern, dark-themed marketing website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

**Production URL:** <https://www.khesed-tek-systems.org>

## Features

- ✅ Black theme with cyan/violet accents
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Demo request form with Resend email integration
- ✅ Contact information cards
- ✅ Smooth animations and transitions
- ✅ PWA-ready with manifest and icons

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` and add your Resend API key:

   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_EMAIL=soporte@khesed-tek-systems.org
   ```

   **Production Domain:** <www.khesed-tek-systems.org>

3. Add your logo to `public/khesed-tek-logo.png`

4. Run development server:

   ```bash
   npm run dev
   ```

5. Open <http://localhost:3000>

## Deployment

Deploy to Vercel:

```bash
npm run build
git push origin main
```

Remember to add environment variables in your Vercel dashboard at: **Project Settings → Environment Variables**

## Contact

- Email: <contacto@khesed-tek-systems.org>
- WhatsApp: +57 302 123 4410
- Location: Barranquilla, Atlántico, Colombia
