# Phase 1 cleanup report

Date: 2026-07-18

## 1. Summary of changes

Phase 1 consolidated GitHub Pages deployment, introduced typed centralized non-image site/business configuration, added standard Astro validation tooling, removed false form-delivery claims, and implemented safe non-visual SEO/accessibility improvements. The approved page design, routes, marketing sections, protected `PageHero.astro`/`fleet.astro` files, and all image assets/references were preserved.

No form endpoint, CRM, analytics service, business fact, canonical domain, certification fact, or image change was invented.

## 2. Files changed

### Deployment and tooling

- `.github/workflows/astro.yml` — retained as the authoritative Pages workflow; added `npm run check`; updated the Pages artifact action.
- `.github/workflows/deploy.yml` — removed as the competing deployment workflow. It remains recoverable from Git history.
- `package.json`, `package-lock.json` — added pinned `@astrojs/check` 0.9.9, TypeScript 5.9.3, and the `check` script.
- `tsconfig.json` — excludes unreferenced root tooling file `support.js` from application diagnostics.
- `astro.config.mjs` — excludes confirmed draft legal pages from the sitemap without changing the site origin/base or image handling.

### Typed configuration and global structure

- `src/data/site.ts` — added `SiteConfig`, contact/address types, nested contact/social/legal route data, typed service-area values, and structured navigation label parts. Existing image data was not changed.
- `src/layouts/BaseLayout.astro` — centralized default description/name use, added optional robots directives, text-only Twitter metadata, theme color, and the skip-link target.
- `src/styles/global.css` — added skip-link and keyboard focus-visible rules without changing palette or typography.

### Components and pages

- `src/components/Header.astro` — structured festive label instead of raw HTML, `aria-current`, dropdown focus return, mobile drawer focus containment/return, and centralized reservation/name references.
- `src/components/Footer.astro` — no fake phone/social links, `aria-current`, centralized legal/contact/name references, and build-time copyright year.
- `src/components/TopBar.astro`, `src/components/CtaBand.astro`, `src/pages/christmas-trolley.astro`, `src/pages/contact.astro`, `src/pages/reservation.astro`, `src/pages/privacy-policy.astro`, and `src/pages/terms-and-conditions.astro` — low-risk typed configuration references.
- `src/pages/index.astro`, `src/pages/contact.astro`, `src/pages/reservation.astro` — explicit focused not-sent alerts replace false success states.
- `src/pages/privacy-policy.astro`, `src/pages/terms-and-conditions.astro` — `noindex,follow` while draft.
- `src/pages/404.astro` — static noindex 404 using existing layout/components.
- `src/pages/gallery.astro`, `src/pages/guides/index.astro` — removed validation hints only; no image reference or behavior was changed.

### Documentation

- `docs/business-information-needed.md`
- `docs/form-integration-needed.md`
- `docs/phase-1-cleanup-report.md`
- `docs/data/issues.json` — historical descriptions preserved; verified statuses and notes added.

## 3. Issues fixed

### P0 resolved

- `P0-001` — all three forms now state and announce that no information was delivered. They no longer claim a request was received.

### P1 resolved

- `P1-003` — keyboard focus, skip navigation, current-page semantics, and mobile-menu/dropdown focus handling.
- `P1-004` — only one production Pages deployment workflow remains.
- `P1-010` — `npm run check` is installed and passes with zero diagnostics. A lint/test stack was intentionally not added without an existing convention.

### Additional resolved items

- `P2-009` — active navigation now exposes `aria-current="page"`.
- `P3-002` — copyright year is generated at build time.
- `P3-003` — raw navigation-label HTML was replaced with typed structured parts; controlled JSON-LD serialization remains.

## 4. Issues left unresolved or blocked

- `P0-002` — blocked on verified public phone, email, address/service-area status, and social profiles. Fake phone/social links were removed as a mitigation.
- `P0-004` — legal drafts are protected from indexing, but legal approval and certification/logo authorization are still required.
- `P1-001` — Astro security/major-version migration remains open and was explicitly outside Phase 1.
- `P1-005` — canonical domain/base confirmation is blocked on owner/deployment information.
- `P1-006` — Twitter text metadata is present; title/description approval and image-related social previews remain open/deferred.
- `P1-007` — static 404 and draft noindex behavior are fixed; robots-at-origin, redirects, and security headers depend on final domain/host capabilities.
- `P1-008` — blocked on verified per-vehicle videos.
- `P1-009` — blocked on verified capacities/fleet/service-area facts.
- `P1-012` — Core Web Vitals remain unmeasured.

## 5. Image issues deferred

No image file, path, import, glob, source selection, loading rule, dimensions, responsive behavior, metadata, alt text, format, compression, or favicon was changed.

Deferred issue IDs:

- `P0-003` — missing desktop hero asset.
- `P1-002` — broad eager image glob.
- `P1-011` — intrinsic dimensions/responsive image delivery.
- `P2-001` — image duplicates/unreferenced image candidates.
- `P3-001` — favicon/app-icon portion; only non-image `theme-color` was added.
- Image-related portion of `P1-006` — default/social preview images.

These remain for a dedicated image-performance phase and are not part of Phase 1 success criteria.

## 6. Business information still needed

See `docs/business-information-needed.md`. The immediate blockers are the production/canonical domain, public phone/email, legal name, address or service-area status, actual cities/states served, social URLs, legal approvals, form destination, certification proof/logo permission, business hours, analytics identifiers, Search Console, verified fleet capacities, and real vehicle videos.

## 7. Form integration decisions still needed

See `docs/form-integration-needed.md`. Required decisions include the endpoint/provider, email or CRM destination, server-side validation, spam protection, privacy/consent/retention, secret management, loading/error/retry/success behavior, duplicate prevention, delivery monitoring, and no-JavaScript requirements.

## 8. Build and preview results

- `npm run build`: passed.
- Final Astro build time: 1.33 seconds; measured wall time: 2.87 seconds.
- Output: 21 HTML pages/files—20 existing content routes plus the new `404.html`.
- Local preview: ready in 7 ms.
- All 20 content routes returned HTTP 200.
- Unknown route returned HTTP 404 using the custom 404 output.
- Generated checks: zero broken internal links, zero broken fragments, zero duplicate IDs, and exactly one H1 per generated page.
- Draft legal pages contain `noindex,follow` and are absent from the sitemap.
- Browser interaction automation was unavailable because no in-app browser instance was exposed; focus behavior was type-checked and statically reviewed, but still needs a manual keyboard pass.

## 9. Check results

- Installed: `@astrojs/check` 0.9.9 and TypeScript 5.9.3 as exact development dependencies.
- `npm install`: passed and restored the dependency tree after tooling was added.
- Local `npm ci`: could not complete because an already-running user Astro development server held `node_modules/@esbuild/win32-x64/esbuild.exe` open on Windows. That user process was not stopped. The authoritative Linux deployment workflow still uses `npm ci`; lockfile resolution was independently verified by `npm install`, `npm run check`, and `npm run build`.
- `npm run check`: passed with **0 errors, 0 warnings, and 0 hints** across 31 checked files.
- No lint framework or test framework was added.
- `npm audit` still reports 2 high and 1 moderate vulnerabilities in the existing Astro dependency tree; resolution requires the later Astro migration.

## 10. Deployment workflow decision

Retained `.github/workflows/astro.yml` because it already used the official GitHub Pages origin/base outputs, Node 20, `npm ci`, and the current `dist` artifact. It now runs `npm run check` before the production build and uses `actions/upload-pages-artifact@v4`.

Removed `.github/workflows/deploy.yml` because it independently deployed the same `main` branch using different Node/action versions and fixed config behavior. Exactly one workflow now has `pages: write` and `actions/deploy-pages` authority.

## 11. Structural cleanup completed

- Site/contact/address/social/legal-route/service-area data now has a typed central shape.
- Navigation remains centralized and no longer stores raw HTML.
- Placeholder link safety is centralized through existing verification flags.
- Base metadata supports draft robots directives and consistent Twitter text metadata.
- Unreferenced root `support.js` is outside application checking but was not deleted without owner confirmation.
- Larger component/page extraction was documented rather than implemented.

## 12. Risks and recommended follow-up

1. Obtain the owner/legal/form facts listed in the two requirements documents.
2. Manually keyboard-test the desktop More menu, mobile drawer, skip link, and all three form status panels in Safari, Chrome, and Firefox.
3. Plan the Astro major migration with screenshots, route tests, and a dependency-audit baseline.
4. Configure form delivery only after endpoint, privacy, spam, and monitoring decisions are approved.
5. Run the dedicated image phase separately; include the known hero failure but do not mix it with structural refactoring.
6. Confirm final domain/Pages behavior before adding root robots rules, redirects, security headers, Search Console, or analytics.
