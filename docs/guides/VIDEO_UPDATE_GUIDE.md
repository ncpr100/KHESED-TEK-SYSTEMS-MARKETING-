# 🎬 SIMPLE VIDEO UPDATE GUIDE

## ✅ How to Update Videos (TESTED & WORKING)

### Step 1: Update Vercel Environment Variables

1. **Go to**: <https://vercel.com> → Your Project → Settings → Environment Variables
2. **Update the video URL**:

   ```bash
   NEXT_PUBLIC_LATAM_DEMO_VIDEO=https://www.youtube.com/embed/YOUR_NEW_VIDEO_ID
   ```

3. **Increment cache buster**:

   ```bash
   NEXT_PUBLIC_VIDEO_CACHE_BUST=v2.0.1  (increment the version)
   ```

4. **Click Save** - Vercel will automatically trigger a redeployment

### Step 2: Verify Deployment

**Automatic**: Vercel automatically redeploys when you change environment variables

1. Go to **Deployments** tab in Vercel Dashboard
2. Wait for deployment to complete (usually 1-2 minutes)
3. Status should show "Ready"

### Step 3: Verify on Site (2-3 minutes after deployment)

1. **Visit**: <https://your-site.vercel.app/api/video-debug?key=khesed-debug-2024>
2. **Check that**:
   - `variablesLoaded: true`
   - `cacheBustActive: true`  
   - Your new video ID appears in `finalVideoUrls`

### Step 4: Test on Live Site

1. **Visit your site**
2. **Open browser console** (F12)
3. **Look for**: `🌍 Environment Variables Debug - Updated`
4. **Verify**: Video iframe src shows your new video ID + cache bust

---

## 🚨 Troubleshooting

### If Video Doesn't Update

1. **Check Vercel deployment status** - ensure deployment completed successfully
2. **Increment cache buster** - change `v2.0.1` to `v2.0.2`
3. **Clear browser cache** - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
4. **Use debug endpoint** - Check `/api/video-debug?key=khesed-debug-2024`
5. **Verify environment variables** - Check they're set for "Production" environment

### Emergency Fix

If nothing works:

1. Update the cache bust value to a completely new version (e.g., `v3.0.0`)
2. Or make a small code change (add a comment) and push to GitHub to force rebuild

---

## 📋 Video ID Quick Reference

- **YouTube Video ID**: Extract from URL `youtube.com/watch?v=VIDEO_ID_HERE`
- **Embed Format**: `https://www.youtube.com/embed/VIDEO_ID_HERE`
- **Current Default**: `1fW2zDQnUV0` ✅ WORKING

---

**Deployment Platform**: Vercel
**Status**: ✅ TESTED & WORKING
