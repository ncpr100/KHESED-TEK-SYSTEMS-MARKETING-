# Railway Deployment Guide for KHESED-TEK Marketing Site

## 🚀 Deploy to Railway

### Prerequisites
1. ✅ Code is committed and pushed to GitHub
2. ✅ Railway account (sign up at [railway.app](https://railway.app))
3. ✅ GitHub repository connected

### Quick Deploy Options

#### Option 1: One-Click Deploy Button
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/6Fx2Q6?referralCode=KHESED)

#### Option 2: Manual Deployment Steps

1. **Create Railway Account**
   ```bash
   # Visit https://railway.app and sign up with GitHub
   ```

2. **Install Railway CLI (Optional)**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

3. **Deploy from GitHub**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `ncpr100/KHESED-TEK-SYSTEMS-MARKETING-`
   - Select the `khesed-tek-marketing-site` folder

4. **Configure Environment Variables**
   Add these in Railway Dashboard → Variables:
   ```env
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   
   # API Keys (Add your actual values)
   HUBSPOT_API_KEY=your_hubspot_api_key
   SALESFORCE_CLIENT_ID=your_salesforce_client_id
   SALESFORCE_CLIENT_SECRET=your_salesforce_client_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   SMTP_HOST=your_smtp_host
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   
   # Security (Generate secure values)
   JWT_SECRET=your_jwt_secret_here
   ENCRYPTION_KEY=your_32_char_encryption_key
   API_SECRET=your_api_secret_here
   
   # Optional: Database (if using external DB)
   DATABASE_URL=your_database_connection_string
   ```

### Deployment Configuration

Railway will automatically:
- ✅ Detect Next.js application
- ✅ Install dependencies (`npm install`)
- ✅ Build the application (`npm run build`)
- ✅ Start the server (`npm start`)
- ✅ Assign a public URL

### Health Check Endpoint
- **URL**: `https://your-app.railway.app/api/health`
- **Purpose**: Railway uses this to monitor application health
- **Response**: System status and uptime information

### Custom Domain Setup (Optional)

1. **Add Custom Domain in Railway**
   - Go to Settings → Domains
   - Add your domain (e.g., `marketing.khesed-tek.com`)

2. **Configure DNS**
   ```dns
   Type: CNAME
   Name: marketing (or www)
   Value: your-app.railway.app
   ```

### Environment-Specific Configuration

#### Production Optimizations
```json
{
  "build": {
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/health"
  }
}
```

#### Performance Settings
- **Memory**: 512MB - 1GB (Railway auto-scales)
- **CPU**: Shared (upgradeable to dedicated)
- **Region**: US West, US East, EU West available

### Post-Deployment Checklist

1. **Verify Deployment**
   ```bash
   curl https://your-app.railway.app/api/health
   ```

2. **Test Core Features**
   - ✅ Homepage loads correctly
   - ✅ Contact form submissions work
   - ✅ CRM integration functional
   - ✅ Email automation working
   - ✅ Security features active
   - ✅ GDPR compliance tools operational

3. **Configure External Services**
   - Update CRM webhook URLs to Railway domain
   - Configure SendGrid domain authentication
   - Update any hardcoded URLs in external systems

4. **Monitor Application**
   - Check Railway logs for any errors
   - Monitor health endpoint
   - Verify SSL certificate installation

### Scaling and Monitoring

#### Automatic Scaling
Railway automatically scales based on:
- CPU usage
- Memory consumption
- Request volume

#### Monitoring Tools
- **Built-in Metrics**: CPU, Memory, Network
- **Logs**: Real-time application logs
- **Health Checks**: Automated uptime monitoring

#### Custom Monitoring
```typescript
// Already implemented in /api/health
GET /api/health - System health status
GET /api/super-admin/help?action=monitoring_dashboard - Detailed metrics
```

### Troubleshooting

#### Common Issues
1. **Build Failures**
   ```bash
   # Check build logs in Railway dashboard
   # Verify all dependencies in package.json
   ```

2. **Environment Variables**
   ```bash
   # Ensure all required env vars are set
   # Check for typos in variable names
   ```

3. **Memory Issues**
   ```bash
   # Upgrade Railway plan if needed
   # Optimize application memory usage
   ```

#### Debug Commands
```bash
# View logs
railway logs

# Connect to project
railway link

# Deploy specific branch
railway up --branch main
```

### Security Considerations

#### Environment Variables
- ✅ Never commit secrets to git
- ✅ Use Railway's secure variable storage
- ✅ Rotate API keys regularly

#### Network Security
- ✅ HTTPS enabled by default
- ✅ Security headers configured
- ✅ Rate limiting implemented

### Support and Resources

#### Railway Resources
- [Railway Documentation](https://docs.railway.app)
- [Community Discord](https://discord.gg/railway)
- [Railway Status](https://status.railway.app)

#### Application Support
- Health Check: `/api/health`
- Admin Dashboard: `/api/super-admin/help`
- Documentation: `/docs/`

---

## 🎉 Deployment Complete!

Your KHESED-TEK marketing site is now live on Railway with:
- ✅ Enterprise-grade CRM integration
- ✅ Advanced email automation
- ✅ Comprehensive security features
- ✅ GDPR compliance tools
- ✅ Super Admin Help system
- ✅ Auto-scaling and monitoring

**Next Steps**: Configure your external API keys and test all integrations!