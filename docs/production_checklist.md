# Production Launch Checklist: OpportunityHub

This checklist verifies that the OpportunityHub application is optimized, secure, and ready for public launch.

---

## 1. Performance Optimization Audits

- [x] **Lazy Loading components**: Large components like `MobileFilterDialog` are loaded using Next.js `dynamic()` lazy imports.
- [x] **Bundle optimization**: Tree shaking configured for icons and bundle sizes verified.
- [x] **Image optimization**: Avatar images updated to use Next.js `<Image>` optimizations.
- [ ] **Next.js static site generation**: Pages are statically pre-rendered where possible to optimize LCP.

---

## 2. Accessibility (WCAG 2.1 AA)

- [ ] **Semantic Markup**: Confirm heading hierarchy: one `<h1>` per page.
- [ ] **ARIA Tags**: Include descriptive `aria-label` tags for all visual, icon-only buttons (e.g. Share, Bookmark, and Close buttons).
- [ ] **Contrast Check**: Enforce minimum 4.5:1 text-to-background contrast ratio in both Light and Dark modes.

---

## 3. SEO & Web Core Vitals

- [ ] **Page Metadata**: Standardize `generateMetadata()` configurations on all public routes.
- [ ] **JSON-LD Schema Markup**: Include Course and Scholarship structured data schemas on opportunity detail views.
- [ ] **Sitemaps**: Configure automatic `/sitemap.xml` updates.

---

## 4. Security Verification

- [x] **XSS Sanitization**: User inputs and scraped data are HTML-escaped and sanitized before DB entry or client-side rendering.
- [x] **CSRF Mitigation**: Enforce custom headers `X-CSRF-Token` checking on all non-GET requests in the Express server.
- [x] **SQL Injection Prevention**: Parameterized queries enforced across all services.
- [x] **API Rate Limiting**: Limit global requests to 100/15min, and auth requests to 5/15min via `authLimiter`.
- [x] **Secure Headers**: Security headers (CSP, HSTS, XSS protection, Frame prevention) configured via Helmet (backend) and `next.config.ts` (frontend).
- [ ] **Secure Sessions**: Authentication tokens must be stored in secure cookies (`HttpOnly`, `Secure`, `SameSite=Lax`) or secure local storage mechanisms.
