# 🎬 SIMPLE VIDEO UPDATE GUIDE

## ✅ How to Update Videos (TESTED & WORKING)

### Step 1: Update Railway Variables
1. **Go to**: https://railway.app → KHESED-TEK project → Variables tab
2. **Update the video URL**:
   ```
   NEXT_PUBLIC_LATAM_DEMO_VIDEO=https://www.youtube.com/embed/YOUR_NEW_VIDEO_ID
   ```
3. **Increment cache buster**:
   ```
   NEXT_PUBLIC_VIDEO_CACHE_BUST=20251104-2  (increment the number)
   ```

### Step 2: Force Railway Rebuild
**Option A (Automatic)**: Railway should auto-deploy when you change environment variables
**Option B (Manual)**: If auto-deploy doesn't work:
1. Make a small change to any file (add a comment)
2. Commit and push to trigger rebuild

### Step 3: Verify (3-5 minutes after deployment)
1. **Visit**: https://your-site.railway.app/api/video-debug?key=khesed-debug-2024
2. **Check that**:
   - `variablesLoaded: true`
   - `cacheBustActive: true`  
   - Your new video ID appears in `finalVideoUrls`

### Step 4: Test on Site
1. **Visit your site**
2. **Open browser console** (F12)
3. **Look for**: `🌍 Environment Variables Debug - Updated`
4. **Verify**: Video iframe src shows your new video ID + cache bust

---

## 🚨 Troubleshooting

### If Video Doesn't Update:
1. **Check Railway deployment logs** - ensure deployment completed
2. **Increment cache buster** - change `20251104-1` to `20251104-2`
3. **Clear browser cache** - Hard refresh (Ctrl+F5)
4. **Use debug endpoint** - Check `/api/video-debug?key=khesed-debug-2024`

### Emergency Fix:
If nothing works, make a small code change (add a comment) and push to force rebuild.

---

## 📋 Video ID Quick Reference

- **Old Default**: `V_MXGdSBbAI`
- **Current**: `1fW2zDQnUV0` ✅ WORKING
- **Future**: Update to your new video ID

---

**Last Updated**: November 4, 2025
**Status**: ✅ TESTED & WORKING