# KHESED-TEK Marketing Site - AI Coding Agent Instructions

## Project Overview & Purpose
**KHESED-TEK** is a Colombian technology consultancy specializing in digital solutions for churches and religious organizations. This marketing site serves as the primary customer acquisition channel for their services.

### Business Context
- **Target Market**: Churches, religious organizations, nonprofits in Colombia (primarily Spanish-speaking)
- **Primary Goal**: Generate leads through demo requests and contact form submissions
- **Revenue Model**: Custom software development, church management systems, digital transformation consulting
- **Geographic Focus**: Colombia (Barranquilla, Atlántico) with potential LATAM expansion

### Current Services Portfolio (Inferred from Context)
1. **Church Management Systems** - Member databases, donation tracking, event planning
2. **Digital Transformation** - Website development, online presence, digital workflows
3. **Custom Software Solutions** - Tailored applications for religious organizations
## Copilot / AI Agent Quick Instructions — KHESED-TEK marketing site

Short version (what to know immediately): TypeScript + Next.js (App Router, v14), TailwindCSS, and a small server-side email integration (Resend). The site is marketing-focused and minimal stateful: most logic centers on the contact/demo form and delivery pipeline.

Key places to inspect
- `app/layout.tsx`, `app/page.tsx`, `app/contact/page.tsx` — UI entry points and the Spanish root layout (lang="es").
- `app/globals.css` — CSS variables (brand colors) and Tailwind overrides; change theme variables here.
- `app/api/request-demo/route.ts` (API) and `lib/email-service.ts` or `lib/*email*` — form handling and email sending logic.
- `components/marketing/*` and `components/ui/*` — reusable visual components (header, footer, cards).
- `next.config.js`, `tailwind.config.js`, `package.json`, `Dockerfile`, `railway.json` — build/deploy configuration.

Project contract (API route: `request-demo`)
- Inputs: form fields — name, email (required), organization, whatsapp, message, demo preference.
- Output: 200 on success (sends email via Resend), 4xx/5xx on validation or delivery errors.
- Error modes to handle: missing required fields, invalid email, Resend API key missing/invalid, network/timeouts.

Important conventions and patterns
- File naming: kebab-case (e.g., `header.tsx`). Use `@/` aliases for imports.
- Minimal client-side state: prefer progressive enhancement — forms work without JS and are enhanced by React.
- Styling: prefer CSS variables in `app/globals.css` + Tailwind utility classes; common classes: `.card`, `.gradient-btn`.
- Avoid heavy client libraries; the project intentionally keeps dependencies small for fast load.

Dev workflows & commands (verified from repo)
- Local dev: `npm install`, copy env (`cp .env.example .env.local`), `npm run dev`.
- Build for production: `npm run build` then `npm run start` (or use Dockerfile and Railway config for container builds).
- CI/CD: GitHub Actions triggers on `main`; production deployment uses Railway (check `railway.json`).

Env & secrets
- Required envs: `RESEND_API_KEY` (Resend.com), `CONTACT_EMAIL` (destination). Don’t commit secrets; use `.env.local` for local dev or Railway for prod.

Examples (concrete edits to make typical fixes)
- Fix email failures: inspect `app/api/request-demo/route.ts` and `lib/email-service.ts` for API key usage and sender `from` value. Update `from` to a verified sender domain (e.g., `demo@khesed-tek.com`).
- Update colors: edit `app/globals.css` variables `--brand` and `--brand2` and rebuild.
- Debug CSS/Tailwind mismatch: check `tailwind.config.js` and `postcss.config.js`, then run `npm run build` to surface build-time CSS errors.

Edge cases to watch for
- Missing or malformed env vars cause silent failures in the email path — add explicit checks and early returns with clear 500 messages.
- The contact form is server-rendered for progressive enhancement: tests should exercise both JS-enhanced and non-JS submission flows.

Quality gates to run after edits
- Local build: `npm run build` (catch TypeScript/Next compile errors).
- Lint/tests: run any configured linters or tests from `package.json` (search `scripts` for `lint`/`test`).

When unsure where to change behavior
1. Search `app/api/request-demo` and `lib/*email*` for email flow.
2. Check `app/contact/page.tsx` for how the form is rendered and what fields are expected.
3. Run the dev server and simulate form submission with valid/invalid inputs.

If you make changes, run the build to validate (the repo uses Next.js standalone output; Docker and Railway expect `next.config.js` to include `output: 'standalone'`).

Quick PR checklist for AI edits
- Keep edits small and focused; update tests (or add a tiny test) when altering behavior.
- Preserve Spanish UI and copy; changes to user-facing strings should be in Spanish unless noted.
- Update `README.md` or `DEPLOY_*` docs only when you validate deployment commands locally or via CI logs.

How to test the request-demo flow
- Local test: `curl -X POST http://localhost:3000/api/request-demo -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com","organization":"Test Org","whatsapp":"+1234567890","message":"Test message","demoPreference":"video"}'`
- Expected: 200 response with `{"success": true}` and email sent to `CONTACT_EMAIL`.
- Check failures: missing env vars return 500, invalid email returns 400, Resend errors return 500 with details.

Questions? If any section is unclear or you want this shortened/expanded, tell me which parts to iterate on.

```
