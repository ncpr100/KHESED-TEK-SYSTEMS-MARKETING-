# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-03-13

### Added
- **PROJECT_SOURCE_OF_TRUTH.md** (597 lines) - Comprehensive authoritative documentation covering:
  - Complete file structure with canonical paths
  - Naming conventions (kebab-case strictly enforced)
  - Multi-market architecture (LATAM/USA/Global)
  - Email system (Gmail SMTP configuration and flow)
  - CRM integration (adapter pattern)
  - Security & GDPR compliance
  - Analytics & monitoring
  - Deployment workflows (Vercel)
  - Testing procedures
  - 8-step Protocol Check for all code changes
  - Version history and current status

### Changed
- **Logo Update** - Updated from icon+text to rectangular brand logo
  - New file: `public/logo.png` (512×232 PNG, 44KB with transparency)
  - Responsive sizing: 90px desktop, 70px mobile, auto-width (maintains aspect ratio)
  - Removed "KHESED-TEK SYSTEMS" text from header
  - Updated `components/marketing/header.tsx` to use Image component
  
- **File Organization** - Systematic restructuring for better maintainability
  - Created `docs/deployment/` directory (12 deployment guides)
  - Created `docs/guides/` directory (12 how-to guides)
  - Created `scripts/tests/` directory (11 test/debug scripts)
  - Moved 35 total files from root to organized locations
  - Root directory now contains only essential configuration files
  
- **Component Naming Convention** - Enforced kebab-case standard across all components
  - `components/SuperAdminHelpTab.tsx` → `components/super-admin-help-tab.tsx`
  - `components/AdminTabs.tsx` → `components/admin-tabs.tsx`
  - `components/DataRightsForms.tsx` → `components/data-rights-forms.tsx`
  - `components/CookieConsentBanner.tsx` → `components/cookie-consent-banner.tsx`
  - Updated 1 import reference in `components/super-admin-help-tab.tsx`
  - All changes built and tested individually before committing

### Removed
- 4 orphaned temporary logo files from `public/images/product-screenshots/`
  - `latam-carousel-*.png` (uploaded via carousel admin by mistake)

### Quality Assurance
- ✅ Build validated after each change (zero errors introduced)
- ✅ Git history preserved (renames tracked, not deletions)
- ✅ 8 logical commits with detailed messages
- ✅ Zero functionality loss
- ✅ All 36 Next.js routes compile successfully
- ✅ TypeScript type checking passing
- ✅ Production-ready at every commit

### Testing
Each phase was tested independently:
- **Phase 1 (File Organization)**: No code changes, zero risk
- **Phase 2 (Component Renaming)**: Each of 4 components renamed, built, and committed separately
  - SuperAdminHelpTab: 0 imports found, renamed, built successfully (commit edc458b)
  - AdminTabs: 1 import updated, renamed, built successfully (commit 57e1ecf)
  - DataRightsForms: 0 imports found, renamed, built successfully (commit 5afc2cf)
  - CookieConsentBanner: 0 imports found, renamed, built successfully (commit 5954dbb)

### Deployment
- Commits: 8 total (5d1c4b3, 19ff192, 159da4b, a7641b2, edc458b, 57e1ecf, 5afc2cf, 5954dbb)
- Platform: Vercel (auto-deploy from GitHub main branch)
- Build time: ~15-20 seconds
- Status: Ready for production deployment

---

## [2.0.0] - 2025-03-01 (Baseline)

### Initial Production Release
- Next.js 14 App Router with TypeScript
- Multi-market support (LATAM/USA/Global)
- Gmail SMTP email integration
- Optional CRM adapters (HubSpot/Salesforce/Pipedrive)
- GDPR compliance suite
- Performance monitoring
- Security middleware
- Responsive design with Tailwind CSS

---

[2.1.0]: https://github.com/khesed-tek/marketing-site/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/khesed-tek/marketing-site/releases/tag/v2.0.0
