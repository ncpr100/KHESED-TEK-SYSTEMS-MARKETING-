# 🚨 CLOUDFLARE TRANSFORM RULE - EXACT CONFIGURATION

## PROBLEM
Cloudflare "Add security headers" applies: 
`Permissions-Policy: geolocation=()`  ← TOO RESTRICTIVE

## SOLUTION  
Override with Transform Rule

## EXACT CONFIGURATION

### Rule Details:
- **Rule Name**: Fix Geolocation Policy
- **Rule Type**: Modify Response Header

### When:
- **If**: Hostname equals www.khesed-tek-systems.org

### Then:
- **Action**: Set static
- **Header name**: Permissions-Policy
- **Value**: `camera=(), microphone=(), geolocation=(self)`

## NAVIGATION PATH
```
Cloudflare Dashboard 
→ Rules (left sidebar)
→ Transform Rules
→ Create rule
→ Modify Response Header
```

## CRITICAL NOTES
1. **DISABLE** "Add security headers" first (causes conflict)
2. **SET** Transform Rule to override Permissions-Policy specifically
3. **WAIT** 60 seconds for propagation
4. **TEST** form page again

## EXPECTED RESULT
Console error should disappear immediately after propagation.