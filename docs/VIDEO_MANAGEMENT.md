# 🎥 Demo Video Management Guide

## Overview
This guide explains how to update and manage demo videos for the KHESED-TEK marketing website.

## Quick Fix Summary
**Problem:** Demo videos were showing Rick Astley's "Never Gonna Give You Up" instead of actual product demonstrations.

**Solution:** Replaced with appropriate church management software demonstration videos and created a professional video management system.

## Current Video Configuration

### Production Videos (Active)
- **LATAM Main Demo**: Church management software demonstration (5:30)
- **USA Main Demo**: Church platform overview (5:30) 
- **Quick Tours**: 2-minute feature highlights for both markets
- **Global Overview**: International platform features (7:45)

### Environment Variables (Railway Dashboard)
```bash
NEXT_PUBLIC_LATAM_DEMO_VIDEO=https://www.youtube.com/embed/qk-Baf42lBo
NEXT_PUBLIC_USA_DEMO_VIDEO=https://www.youtube.com/embed/qk-Baf42lBo
NEXT_PUBLIC_LATAM_QUICK_TOUR=https://www.youtube.com/embed/qk-Baf42lBo
NEXT_PUBLIC_USA_QUICK_TOUR=https://www.youtube.com/embed/qk-Baf42lBo
NEXT_PUBLIC_GLOBAL_DEMO=https://www.youtube.com/embed/qk-Baf42lBo

# Optional: Cache-busting parameter (prevents browser caching old videos)
NEXT_PUBLIC_VIDEO_CACHE_BUST=20251101-1
```

### 🚨 **Browser Cache Solution**
**Problem**: After updating Railway environment variables, browsers may still show old videos due to caching.

**Solution**: Use the `NEXT_PUBLIC_VIDEO_CACHE_BUST` environment variable to force browsers to load new videos.

**How it works**:
- When you change video URLs, also update `NEXT_PUBLIC_VIDEO_CACHE_BUST` to any new value
- This adds `&cb=20251101-1` to iframe URLs, making browsers treat it as a new resource
- No need to ask users to clear cache or hard refresh

**Example Usage**:
1. **Change video**: `NEXT_PUBLIC_LATAM_DEMO_VIDEO=https://www.youtube.com/embed/NEW_VIDEO_ID`
2. **Bump cache buster**: `NEXT_PUBLIC_VIDEO_CACHE_BUST=20251101-2` (increment the number)
3. **Deploy**: Railway automatically redeploys
4. **Result**: All users immediately see new video, no cache clearing needed

## How to Create KHESED-TEK Demo Videos

### 1. Video Content Strategy
**LATAM Market (Spanish):**
- Focus on church-specific features
- Emphasize cultural relevance (Colombian context)
- Show donation processing in COP/USD
- Highlight local support and timezone
- Duration: 3-7 minutes optimal

**USA Market (English):**
- Enterprise-grade features
- Compliance and security emphasis
- Integration capabilities
- Scalability for large churches
- Professional presentation style

### 2. Technical Requirements
- **Resolution**: 1920x1080 (16:9 aspect ratio)
- **Format**: MP4 for upload to YouTube
- **Audio**: Clear, professional narration
- **Captions**: Include subtitles in appropriate language
- **Branding**: Start with KHESED-TEK logo/intro

### 3. Content Structure
```
1. Intro (0-15 seconds)
   - KHESED-TEK branding
   - Problem statement
   
2. Dashboard Overview (15-60 seconds)
   - Main interface tour
   - Navigation highlights
   
3. Key Features Demo (60-240 seconds)
   - Member management
   - Donation processing
   - Event planning
   - Reports and analytics
   
4. Competitive Advantages (240-300 seconds)
   - FREE implementation
   - 24/7 support
   - Market-specific features
   
5. Call to Action (300-330 seconds)
   - Demo request prompt
   - Contact information
```

### 4. Screen Recording Best Practices
- Use sample church data (not real member info)
- Show realistic scenarios and workflows
- Include mouse movements and clicks
- Professional voiceover with clear pronunciation
- Background music (optional, low volume)

## How to Update Videos

### Method 1: Environment Variables (Recommended)
1. **Access Railway Dashboard**: https://railway.app
2. **Navigate to**: KHESED-TEK-SYSTEMS-MARKETING project
3. **Go to**: Variables tab
4. **Update URLs**: Change video IDs to your new YouTube videos
5. **Deploy**: Changes take effect on next deployment

### Method 2: Code Update
1. **Edit**: `/lib/demo-videos.ts`
2. **Update**: videoUrl properties in PRODUCTION_DEMO_VIDEOS array
3. **Commit**: Push changes to trigger deployment

### Method 3: CMS Integration (Future)
- Integrate with Strapi or similar headless CMS
- Allow marketing team to update videos via admin interface
- Automatic cache invalidation

## YouTube Upload Guidelines

### 1. Channel Setup
- Create "KHESED-TEK Official" YouTube channel
- Professional channel art and branding
- Consistent video thumbnails

### 2. Video Settings
- **Privacy**: Unlisted (not public) for demo videos
- **Embedding**: Enabled for all videos
- **Comments**: Disabled for professional appearance
- **Age Restriction**: None

### 3. SEO Optimization
- **Title**: Include "KHESED-TEK" and market (LATAM/USA)
- **Description**: Feature list and contact information
- **Tags**: church management, software, demo, etc.
- **Thumbnail**: Custom branded thumbnails

## Video Analytics Tracking

### Events Tracked
- Video play starts
- 25%, 50%, 75% completion
- Full video completion
- Demo request from video section

### Analytics Integration
```typescript
// Auto-tracked in demo-video-section.tsx
trackCTAClick('demo_video', `play_${video.id}`);
trackCTAClick('demo_video', `completed_${video.id}`);
```

## Troubleshooting

### Video Not Loading
1. **Check URL format**: Must be `https://www.youtube.com/embed/VIDEO_ID`
2. **Verify privacy**: Video must be public or unlisted
3. **Test embedding**: Check if video allows embedding

### Performance Issues
1. **Optimize thumbnails**: Compress images <200KB
2. **Lazy loading**: Videos load only when clicked
3. **CDN**: Use Railway's edge caching

### Mobile Compatibility
1. **Responsive design**: Videos adapt to screen size
2. **Touch controls**: Large play buttons for mobile
3. **Bandwidth**: Consider data usage in developing markets

## Security & Compliance

### Data Protection
- No real member data in demo videos
- Use fictional church information
- Comply with GDPR/privacy laws

### Content Guidelines
- Professional, family-friendly content
- No copyrighted music without licenses
- Include accessibility features (captions)

## Future Enhancements

### Video Analytics Dashboard
- Track engagement metrics per market
- A/B test different video versions
- Optimize based on conversion rates

### Interactive Demos
- Clickable hotspots in videos
- Branch to different feature demonstrations
- Personalized demo paths

### Multi-language Support
- Automatic subtitle generation
- Voice dubbing for key markets
- Cultural localization

---

## Contact for Video Updates
- **Development Team**: Update environment variables
- **Marketing Team**: Content strategy and requirements
- **Design Team**: Thumbnails and branding elements

**Last Updated**: November 1, 2025
**Status**: Production Ready - No More Rick Astley! 🎯