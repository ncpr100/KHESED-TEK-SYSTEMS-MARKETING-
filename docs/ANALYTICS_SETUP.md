# Analytics Setup Guide - Phase 4.2

## 🎯 Google Analytics 4 Configuration

### Environment Variables Required

```bash
# Google Analytics 4 - Replace with actual measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Google Search Console verification
NEXT_PUBLIC_GOOGLE_VERIFICATION=xxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step-by-Step Setup

#### 1. Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Create" → "Property"
3. Configure property:
   - **Property name**: `KHESED-TEK Systems Marketing`
   - **Country**: `Colombia`
   - **Currency**: `Colombian Peso (COP)` or `US Dollar (USD)`
   - **Industry**: `Technology` or `Professional Services`
4. Business information:
   - **Size**: `Small business (1-10 employees)`
   - **Objectives**: Select `Examine user behavior` and `Measure advertising effectiveness`

#### 2. Set Up Data Stream

1. Choose **Web** platform
2. Website information:
   - **Website URL**: `https://www.khesed-tek-systems.org`
   - **Stream name**: `KHESED-TEK Marketing Site`
3. **Copy the Measurement ID** (format: `G-ABC123XYZ9`)

#### 3. Configure Custom Dimensions

Set up these custom dimensions in GA4 for market segmentation:

| Custom Dimension | Scope | Description |
|------------------|--------|-------------|
| `market` | Event | LATAM/USA/GLOBAL market segment |
| `user_country` | User | User's country code |
| `user_region` | User | User's region/state |
| `session_market` | Session | Market detected for session |
| `lead_quality` | Event | Lead quality score (high/medium/low) |
| `conversion_type` | Event | Type of conversion (demo/contact/service) |

#### 4. Set Up Conversion Events

Configure these events as conversions in GA4:

- `demo_request_conversion` - Demo requests
- `conversion` - General lead conversions  
- `purchase` - E-commerce demo requests
- `contact_inquiry` - Contact form submissions

#### 5. Configure Enhanced E-commerce

Enable Enhanced E-commerce in GA4 to track:
- Demo requests as "purchases" 
- Service page views as "item views"
- Contact inquiries as "add to cart"

### Deployment Configuration

#### Local Development

```bash
# In .env.local
NEXT_PUBLIC_GA_ID=G-YOUR-MEASUREMENT-ID
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

#### Production (Railway)

1. Go to Railway dashboard
2. Select your project
3. Go to "Variables" tab
4. Add environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-YOUR-MEASUREMENT-ID
   NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
   ```

### Analytics Features Implemented

#### ✅ Market Segmentation
- Automatic market detection (LATAM/USA/GLOBAL)
- Country and region tracking
- Language preference tracking
- Currency and timezone awareness

#### ✅ Conversion Tracking
- Demo request funnel tracking
- Contact form conversion goals
- Lead quality scoring
- Market-specific conversion values

#### ✅ E-commerce Events
- Demo requests as purchase events
- Service page views as product views
- Contact inquiries as cart additions
- Lead value attribution by market

#### ✅ Performance Monitoring
- Core Web Vitals tracking
- Page load performance metrics
- User engagement milestones
- Session journey mapping

#### ✅ Enhanced User Journey
- 4-step conversion funnel:
  1. Page view
  2. Form field interaction
  3. Form submission attempt
  4. Successful conversion
- Real-time user behavior tracking
- Market-aware event parameters

### Testing Your Setup

#### 1. Real-Time Validation

1. Open Google Analytics → Reports → Realtime
2. Visit your site: `https://www.khesed-tek-systems.org`
3. Check that events appear in real-time
4. Test demo request form submission
5. Verify market segmentation data

#### 2. Debug Mode

Enable debug mode by adding `?debug_mode=1` to URLs:
```
https://www.khesed-tek-systems.org/contact?debug_mode=1
```

Check browser console for analytics events in development.

#### 3. Conversion Testing

Test the complete funnel:
1. Visit contact page
2. Interact with form fields
3. Submit demo request
4. Verify conversion in GA4

### Market-Specific Analytics

#### LATAM Market (Colombia Focus)
- Currency: USD
- Language: Spanish
- Lead Value: $300 (demo), $150 (contact)
- Timezone: America/Bogota

#### USA Market  
- Currency: USD
- Language: English
- Lead Value: $500 (demo), $200 (contact)
- Timezone: America/New_York

#### Global Market
- Currency: USD  
- Language: English
- Lead Value: $400 (demo), $175 (contact)
- Timezone: UTC

### Troubleshooting

#### Events Not Appearing
- Check measurement ID is correct
- Verify environment variables are deployed
- Test in incognito mode
- Check browser console for errors

#### Market Detection Issues
- Verify `/api/geo-detect` endpoint works
- Check Cloudflare headers (in production)
- Test with different locations/VPNs

#### Conversion Tracking Problems
- Ensure conversion events are configured in GA4
- Check that custom dimensions are set up
- Verify e-commerce tracking is enabled

### Advanced Configuration

#### Custom Audiences
Create audiences based on:
- Market segment (LATAM vs USA vs Global)
- Lead quality score
- Conversion funnel stage
- Service interest

#### Attribution Modeling
Set up attribution models for:
- Cross-market lead attribution
- Multi-session conversion paths
- Email campaign attribution
- WhatsApp interaction attribution

This analytics setup provides comprehensive tracking for KHESED-TEK's multi-market strategy and lead generation optimization.