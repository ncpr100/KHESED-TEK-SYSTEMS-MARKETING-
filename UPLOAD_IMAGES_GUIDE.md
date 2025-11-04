# 🖼️ HOW TO UPLOAD NEW CAROUSEL IMAGES

## 🎯 **QUICK START GUIDE**

### **METHOD 1: Admin Interface (5 minutes)**

1. **Visit**: http://localhost:3000/admin/carousel
2. **Select Market**: LATAM/USA/GLOBAL
3. **Upload Image**: Click "Choose File"
4. **Fill Details**: Title, description, alt text
5. **Copy Code**: Generated automatically
6. **Paste Code**: Into `/lib/product-screenshots.ts`

### **METHOD 2: Manual Upload**

#### **Step 1: Upload Image File**
```bash
# Copy your image to:
/public/images/product-screenshots/
```

#### **Step 2: Add Configuration**
Edit `/lib/product-screenshots.ts`:

```typescript
// For LATAM market (Spanish):
{
  src: '/images/product-screenshots/dashboard-real.jpg',
  alt: 'Dashboard KHESED-TEK Real',
  title: 'Panel de Control Real',
  description: 'Captura real del sistema en funcionamiento'
},

// For USA market (English):
{
  src: '/images/product-screenshots/dashboard-usa.jpg', 
  alt: 'KHESED-TEK Dashboard Screenshot',
  title: 'Live Dashboard View',
  description: 'Real screenshot of our church management system'
},
```

#### **Step 3: Deploy**
```bash
git add .
git commit -m "feat: add real product screenshots"
git push origin main
```

## 📁 **IMAGE REQUIREMENTS**

- **Format**: JPG, PNG, WebP
- **Size**: 1920x1080 (recommended)
- **Quality**: High resolution
- **File Size**: Under 2MB

## 🔄 **TESTING**

1. **Local**: Visit `/latam` and click "🖼️ Screenshots"
2. **Check**: New images appear in carousel
3. **Deploy**: Push to production

## ✅ **DONE!**

Your new images will appear in the carousel with auto-play, navigation, and professional styling!