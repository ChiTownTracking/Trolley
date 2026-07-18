# Astro site technical audit

Audit date: 2026-07-18  
Scope: repository inspection, production build, local development/preview smoke tests, generated-output analysis, dependency audit, and static accessibility/SEO/security review. No application code, visual design, copy, dependency, or production-configuration changes were made.

Evidence labels used in this report:

- **Measured** — produced by a command against this checkout or its `dist` output.
- **Static finding** — verified from source or generated files, without claiming browser behavior.
- **Estimate/risk** — likely impact that still requires real-browser, Lighthouse, field-data, legal, or business verification.
- **Unavailable** — the requested measurement could not be collected with the installed project/tooling.

Machine-readable detail is in [`data/routes.json`](data/routes.json), [`data/components.json`](data/components.json), [`data/images.json`](data/images.json), and [`data/issues.json`](data/issues.json).

## 1. Executive summary

The site is a small, static Astro marketing site with a sensible core: one global layout, centralized navigation/business/fleet data, a typed Guides content collection, no framework hydration, very little client JavaScript, and a successful 20-page production build. The visual implementation is complete, but the project is not launch-ready because several business-critical behaviors and facts are placeholders.

The biggest problem is functional, not cosmetic: the home quote wizard, contact form, and reservation form all display success without sending any data. The homepage desktop hero also points to an image URL that is absent from the production build. Phone/social/address values are placeholders, legal pages are drafts but indexable, all four fleet pages embed the same placeholder video, and the WBENC claim/logo needs authorization confirmation.

Performance has a strong JavaScript baseline—only 10.5 KB of unique built client JS—but poor asset discipline. The static output is 30.7 MB, primarily images. A broad eager fleet glob emits unrelated Christmas decor sources, including a 6.45 MB, 8000×2474 JPEG. Most rendered images lack intrinsic dimensions and responsive `srcset`/`sizes`.

SEO foundations are partly centralized and consistent: all 20 pages have a unique title, description, canonical, one H1, core Open Graph fields, and sitemap inclusion. Gaps are the unconfirmed GitHub Pages canonical origin, no Twitter metadata, no default social image on 17 pages, no robots policy, no custom 404, incomplete LocalBusiness facts, indexable draft legal pages, and inconsistent service-area/capacity claims.

The five highest-priority actions are:

1. Connect all forms to a real, tested submission service and stop showing false success.
2. Supply and verify the real phone, address/service-area status, social URLs, legal text, certification permissions, and fleet facts.
3. Fix the missing production desktop hero asset.
4. Replace the two competing Pages workflows with one verified pipeline, then add build/check/test gates.
5. Narrow image globs and implement responsive image optimization, starting with hero and multi-megabyte decor/gallery assets.

Major refactoring risks are accidental visual regressions in large page-scoped CSS blocks, changing the `/Trolley` base-path behavior, losing content-collection/static-path generation, breaking the mobile navigation scroll lock, and deleting an asset that is referenced indirectly. Freeze verified screenshots and deployment settings before structural work.

## 2. Project overview

| Item | Current state |
|---|---|
| Astro | **Measured:** 4.16.19 installed (`package.json` range `^4.16.18`) |
| Node | **Measured locally:** 24.14.0. No `engines` requirement. Workflows disagree: Node 20 and Node 24. |
| Package manager | npm 11.9.0; `package-lock.json` present |
| Install | `npm ci` (not needed during audit because dependencies were already installed) |
| Development | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Lint | Not configured |
| Type-check | Intended `npm run astro -- check`, but unavailable because `@astrojs/check` and `typescript` are not installed |
| Tests | None configured |
| Deployment | GitHub Pages; two conflicting workflows target pushes to `main` |
| Output/adapter | Static output; no adapter |
| Rendering | 16 route templates prerender 20 HTML pages; no SSR/API routes |
| Integrations | `@astrojs/sitemap` 3.2.1 |
| CSS | Global token/helper stylesheet plus scoped `<style>` blocks in Astro components/pages |
| JS/TS | TypeScript in Astro frontmatter and small vanilla browser scripts; no UI framework |
| Content | Three Markdown Guides in an Astro content collection; most marketing data in `src/data/site.ts` |
| Environment variables | No custom variables. `src/utils/paths.ts` uses Astro's built-in `import.meta.env.BASE_URL`. |
| Site/base | `https://chitowntracking.github.io` + `/Trolley`; final production ownership/domain is unconfirmed |

The content schema validates Guide title, excerpt, category, cover, cover alt, date, read time, and featured state. Business/fleet/service/form option data is typed TypeScript but combines many domains in one 327-line file.

### Validation command log

| Command/check | Result |
|---|---|
| `node --version`; `npm --version` | Node 24.14.0; npm 11.9.0 |
| `npm ls --depth=0` | Astro 4.16.19 and sitemap 3.2.1 installed; dependency tree resolved |
| `npm run dev -- --host 127.0.0.1 --port 4322` | Ready in 129 ms; homepage HTTP 200; server stopped after smoke test |
| `npm run build` | Passed twice; 20 pages. Initial Astro/wall 1.92/3.67 s; final Astro/wall 1.69/2.82 s |
| `npm run preview -- --host 127.0.0.1` | Ready in 7 ms; all 20 generated routes HTTP 200; server stopped after smoke test |
| `npm run astro -- check` | Unavailable: Astro requested installation of missing `@astrojs/check` and `typescript`; audit did not modify dependencies |
| Lint / tests | No scripts or test files configured |
| `npm outdated --json` | Astro latest observed 7.1.1; sitemap latest observed 3.7.3; nothing updated |
| `npm audit --json` | 3 vulnerabilities: 2 high, 1 moderate; nothing updated |
| Generated HTML/link/asset scans | 20 routes, 0 broken route links, 0 broken fragments, 0 duplicate IDs, 1 broken built asset URL |
| JSON parse + `git diff --check -- docs` | All four inventories valid; documentation diff check passed |
| In-app browser/Lighthouse | Browser instance unavailable; visual/runtime performance scores not collected |

## 3. Repository structure

```text
.
├─ .github/workflows/
│  ├─ astro.yml                 # Pages deployment, Node 20, dynamic site/base
│  └─ deploy.yml                # Competing Pages deployment, Node 24, fixed config
├─ public/
│  ├─ images/christmas-trolley/ # deploy-as-is decor WebP assets
│  └─ uploads/                  # deploy-as-is fleet/hero/logo assets
├─ src/
│  ├─ assets/fleet/             # imported/eager-globbed gallery sources
│  ├─ components/               # seven shared Astro components
│  ├─ content/
│  │  ├─ config.ts              # Guides collection schema
│  │  └─ guides/*.md            # three Guide articles
│  ├─ data/
│  │  ├─ guides.ts              # guide categories/date formatting
│  │  └─ site.ts                # business/nav/fleet/services/FAQ/form data
│  ├─ layouts/BaseLayout.astro  # one global shell/metadata/layout
│  ├─ pages/                    # 14 static page files + 2 dynamic templates
│  ├─ styles/global.css         # tokens, reset, shared UI/form helpers
│  └─ utils/paths.ts            # `/Trolley` base-path helpers
├─ uploads/                     # root working/source images; only one is directly imported
├─ astro.config.mjs
├─ package.json / package-lock.json
├─ tsconfig.json
├─ support.js                   # unexplained, unreferenced root tooling artifact
└─ .thumbnail                   # unexplained root artifact
```

Responsibilities are generally recognizable, and no circular imports or duplicate component implementations were found in the static import review. `BaseLayout` correctly centralizes global UI and base metadata. `PageHero`, `GuideCard`, `Eyebrow`, and `CtaBand` are focused reusable components.

Structural concerns:

- `index.astro` is 881 lines; `Footer.astro` 517; `christmas-trolley.astro` 447; `guides/[slug].astro` 428; `Header.astro` 320. These mix markup, large responsive style blocks, and browser behavior.
- `Header` owns desktop navigation, dropdown, mobile drawer, scroll locking, active-route logic, and two scripts.
- `site.ts` mixes verified configuration, placeholder business identity, page content, vehicle content, FAQ copy, and form options.
- `heroImages` is exported from `site.ts` but has no consumer—a dead export after the current hero implementation.
- `uploads/` contains working/reference variants beside `public/uploads` and `src/assets`; 17 byte-identical duplicate groups exist across asset areas.
- `support.js` and `.thumbnail` are not part of the Astro import graph and need provenance confirmation before cleanup.
- No middleware, endpoint/API directory, redirects, headers file, or custom error page exists.

## 4. Route and page inventory

All rows use `src/layouts/BaseLayout.astro`, are statically prerendered, have a present absolute canonical, core Open Graph title/description/type/url, viewport metadata, and exactly one H1. All are currently indexable and included in the sitemap. No Twitter metadata exists. “OG image” below is the route-specific image status.

| Route | Source / parameter | Title (characters) | Description | Main component(s) | H1 | Schema / OG image | Problems |
|---|---|---|---|---|---|---|---|
| `/` | `pages/index.astro` | ChiTown Trolley — Timeless Wedding Trolley Transportation in Chicago (70) | Present (142) | Eyebrow, GuideCard | Timeless Trolley Transportation for Your Wedding Day | TaxiService / no | Title long; broken desktop hero asset; form does not submit |
| `/about/` | `pages/about.astro` | About — ChiTown Trolley (25) | Present (139) | PageHero | A small company with a personal touch | none / no | No default social image |
| `/christmas-trolley/` | `pages/christmas-trolley.astro` | Chicago Christmas Trolley Tours & Holiday Light Rentals — ChiTown Trolley (79) | Present (175) | Eyebrow, CtaBand | Chicago’s Christmas Trolley | none / no | Long title/description; image-heavy |
| `/contact/` | `pages/contact.astro` | Get a Quote — ChiTown Trolley (31) | Present (105) | PageHero | Let’s hold your date | none / no | Form does not submit |
| `/faq/` | `pages/faq.astro` | FAQ — ChiTown Trolley (23) | Present (132) | PageHero | Good questions, honest answers | none / no | Could use FAQPage only after content/business verification |
| `/fleet/` | `pages/fleet.astro` | Our Fleet — ChiTown Trolley (29) | Present (136) | PageHero | ChiTown Trolleys, hand-detailed for every event | none / no | Fleet claims inconsistent with FAQ |
| `/fleet/classic-white-trolley/` | `pages/fleet/[slug].astro`; `slug=classic-white-trolley` | Classic White Trolley — ChiTown Trolley (41) | Present (155) | Eyebrow | Classic White Trolley | none / no | Placeholder shared video; oversized gallery pipeline |
| `/fleet/limo-vans/` | same; `slug=limo-vans` | Limo Vans — ChiTown Trolley (29) | Present (157) | Eyebrow | Limo Vans | none / no | Placeholder shared video |
| `/fleet/party-bus/` | same; `slug=party-bus` | Party Bus — ChiTown Trolley (29) | Present (155) | Eyebrow | Party Bus | none / no | Placeholder shared video |
| `/fleet/super-coach-bus/` | same; `slug=super-coach-bus` | Super Coach Bus — ChiTown Trolley (35) | Present (155) | Eyebrow | Super Coach Bus | none / no | Placeholder shared video |
| `/gallery/` | `pages/gallery.astro` | Gallery — ChiTown Trolley (27) | Present (100) | PageHero | The trolleys, up close | none / no | Direct public images lack responsive delivery |
| `/guides/` | `pages/guides/index.astro` | Wedding Trolley Guides & Chicago Transportation Tips — ChiTown Trolley (78) | Present (146) | Eyebrow, GuideCard | Guides & Inspiration | none / no | Long title; no default social image |
| `/guides/chicago-trolley-friendly-wedding-venues/` | `pages/guides/[slug].astro`; content slug | Chicago's Most Trolley-Friendly Wedding Venues — ChiTown Trolley (73) | Present (159) | GuideCard, CtaBand | Article title | Article / yes | Long title |
| `/guides/how-many-guests-fit-in-a-trolley/` | same; content slug | How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide — ChiTown Trolley (98) | Present (130) | GuideCard, CtaBand | Article title | Article / yes | Very long title; capacity facts need verification |
| `/guides/wedding-day-shuttle-logistics-timeline/` | same; content slug | Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation — ChiTown Trolley (99) | Present (179) | GuideCard, CtaBand | Article title | Article / yes | Long title/description |
| `/privacy-policy/` | `pages/privacy-policy.astro` | Privacy Policy — ChiTown Trolley (34) | Present (65) | PageHero | Privacy Policy | none / no | Draft placeholder, indexable and in sitemap |
| `/reservation/` | `pages/reservation.astro` | Request a Reservation — ChiTown Trolley (37) | Present (166) | PageHero | Reserve your ride | none / no | Form does not submit; long description |
| `/services/` | `pages/services.astro` | Services — ChiTown Trolley (28) | Present (161) | PageHero, Eyebrow | Any occasion worth arriving for | none / no | Description slightly long; no dedicated service routes |
| `/terms-and-conditions/` | `pages/terms-and-conditions.astro` | Terms and Conditions — ChiTown Trolley (40) | Present (55) | PageHero | Terms and Conditions | none / no | Draft placeholder, indexable and in sitemap |
| `/weddings/` | `pages/weddings.astro` | Wedding Trolley Transportation — ChiTown Trolley (50) | Present (129) | Eyebrow | The ride between “I do” and the dance floor | none / no | No default social image |

There are no redirects, API routes, custom error pages, hidden/draft routing rules, or accidental `noindex` pages. Generated-link inspection found **0 broken internal route links**, **0 broken fragment targets**, and **0 duplicate IDs** across 723 anchor links. The separate asset-reference scan did find the broken desktop hero URL. Trailing slashes are consistent in generated routes/canonicals.

## 5. Component inventory

| Component | Used on | Props | Browser JS / hydration | Main concern / recommendation |
|---|---|---|---|---|
| `CtaBand` | Global default plus Christmas/Guide detail overrides | title, sub, ctaLabel, ctaHref | None; no `client:*` | Keep; verify placeholder phone and duplicate-band behavior |
| `Eyebrow` | Home and six section/detail templates | label, align, single, size, mb | None | Keep; variants are focused |
| `Footer` | All routes | none | None | 517 lines; placeholder phone/social fallback and certification verification |
| `GuideCard` | Home, Guides index/detail | href/image/content/date props | None | Keep; optimize image delivery/dimensions |
| `Header` | All routes | none | Two small vanilla scripts | Missing focus-visible/aria-current; too many navigation responsibilities |
| `PageHero` | Nine static page templates | eyebrow, pb, default/lead slots | None | Keep; good reuse boundary |
| `TopBar` | All routes | none | None | Use only verified contact/social data; add consistent focus style |
| `BaseLayout` | All routes | title, description, hideCta, image, ogType, schema | One IntersectionObserver script | Add typed SEO defaults, skip link, crawler/theme/social metadata |

**Measured:** no `client:load`, `client:idle`, `client:visible`, `client:media`, `client:only`, or hydrated framework components exist. All seven shared components render static Astro HTML. Browser behavior is small hoisted vanilla JavaScript, so adding a UI framework or hydration would be a regression unless a future interaction genuinely needs it.

## 6. Layout and page architecture review

Good boundaries:

- Shared title/description/canonical/Open Graph/JSON-LD logic is centralized in `BaseLayout`.
- Header, top bar, CTA band, and footer are global layout components.
- Base-path handling is centralized in `withBase`/`withoutBase`.
- Guide articles correctly use a content collection and dynamic static paths.
- Fleet content is centralized and the detail template uses dynamic static paths.

Architecture gaps:

- Metadata props are useful but incomplete; pages repeat title/description literals and cannot set robots, Twitter, breadcrumbs, or article dates through one typed object.
- The distinction between business configuration, page content, form options, and vehicle data is blurred inside `site.ts`.
- Form markup/behavior is duplicated across three routes, yet none has a submission service.
- Carousel/gallery/menu scripts are embedded in large Astro files rather than small testable modules.
- The broad fleet `import.meta.glob` couples every vehicle route to every fleet asset and unrelated decor.
- Page section components are underused on the two largest bespoke pages. Extraction should follow stable visual sections, not create generic wrapper components.

Proposed structure—recommendation only, do not move files until screenshot/build baselines exist:

```text
src/
├─ components/
│  ├─ global/          # TopBar, Header, Footer, CtaBand
│  ├─ navigation/      # DesktopNav, MoreMenu, MobileDrawer if extraction pays off
│  ├─ sections/        # PageHero, fleet/gallery/testimonial/quote sections
│  ├─ forms/           # QuoteForm, ReservationForm, shared fields/status
│  ├─ content/         # GuideCard, article TOC/related guides
│  └─ ui/              # Eyebrow, buttons/links only where markup is shared
├─ content/guides/
├─ data/
│  ├─ business.ts      # verified NAP, service areas, social, certification
│  ├─ navigation.ts
│  ├─ fleet.ts
│  ├─ services.ts
│  └─ forms.ts
├─ layouts/BaseLayout.astro
├─ lib/
│  ├─ paths.ts
│  ├─ seo.ts
│  ├─ schema.ts
│  └─ forms/           # provider client, validation, typed result
├─ pages/
├─ scripts/            # small menu/carousel/gallery modules if extracted
├─ styles/
│  ├─ tokens.css
│  ├─ global.css
│  └─ utilities.css
└─ assets/             # canonical imported/optimizable sources
```

## 7. Dependency audit

| Package | Installed | Purpose / usage | Runtime/client cost | Decision |
|---|---:|---|---|---|
| `astro` | 4.16.19 | Compiler, dev/build/preview, content collections, routing | Build dependency; generated client JS only comes from authored scripts | **Update via planned migration.** Direct dependency is multiple majors behind and included in security advisories. Do not remove/replace. |
| `@astrojs/sitemap` | 3.2.1 | `astro.config.mjs`; generates sitemap | Build-only; no client JS | **Update with Astro migration.** Used and appropriate; latest observed 3.7.3. |

There are no declared `devDependencies`, duplicate UI libraries, analytics packages, form SDKs, or client frameworks. `npm audit` reports vulnerable transitive Vite/esbuild through Astro. Native Astro/browser features are already used effectively for static components, IntersectionObserver, and small interactions.

## 8. Performance audit

### Build and runtime evidence

- **Measured:** production build succeeded; 20 pages generated. Astro reported 1.92 s; audit wall-clock measurement was 3.67 s.
- **Measured:** `dist` contains 84 files totaling **30,702,516 bytes**.
- **Measured:** local preview returned HTTP 200 for all 20 routes. Loopback response times were 10–75 ms; these are smoke-test timings, **not production TTFB**.
- **Measured:** development server became ready in 129 ms and served `/Trolley/` with HTTP 200.
- **Unavailable:** Lighthouse, browser performance traces, viewport screenshots, computed DOM/layout, and Core Web Vitals. The in-app browser had no available browser instance. No standalone browser suite is installed by the project.

### JavaScript

- **Measured unique build output:** 8 JS files, **10,482 bytes uncompressed** total.
- **Measured per page:** 378–3,435 bytes referenced JS; home is highest at 3,435 bytes. Guide articles reference 1,991 bytes; common simple pages 1,690 bytes; fleet details/Christmas 746 bytes; contact/reservation under 400 bytes.
- No hydrated components, framework runtime, analytics, maps, social widgets, or form SDK exists.
- Scripts are scoped by route chunks, not one large global bundle. `BaseLayout` and `Header` behavior appears on every route because the UI is global and is small.
- Opportunity is maintainability/testing, not meaningful byte removal. Preserve this low-JS baseline.

### Images

- **Measured source inventory:** 70 files across `src/assets`, `public`, and root `uploads`, totaling **44,140,764 bytes**; 15 exceed 1 MB; 17 byte-identical duplicate groups.
- **Measured built formats:** JPG 20.83 MB, PNG 7.77 MB, WebP 1.58 MB, SVG 5.6 KB.
- Largest emitted image is `228Z_Christmas_tree22_22.jpg`: 6,453,853 bytes, 8000×2474 (19.79 MP). It is unrelated decor pulled into the fleet build by an eager glob.
- `public/uploads/heroImg.png` is 2.29 MB; mobile hero source is 2.12 MB. The desktop hero points to a missing `heroImg2.png` public URL.
- Generated HTML has 111 `<img>` elements: all have an `alt` attribute; 19 empty alts are primarily gallery thumbnails/decorative duplicates; 70 use lazy loading; **91 lack width and/or height**.
- No generated responsive `srcset`/`sizes` was found. Public images bypass Astro processing. Eager first gallery images are reasonable in principle, but LCP priority/displayed dimensions require browser measurement.
- Optimization order: fix missing hero; choose approved hero crops; resize/compress hero to responsive AVIF/WebP/JPEG variants; narrow globs; add typed image metadata/width/height; then deduplicate/archive sources.

### Fonts

- Cormorant Garamond: upright 400/500/600 and italic 400.
- Jost: upright 300/400/500 and italic 300.
- Loaded through one render-blocking Google Fonts stylesheet with `display=swap` and two preconnects.
- No local font files or preloads. Actual returned font file count/bytes and unused glyph/weight coverage were **not measured**.
- Reduce styles/weights based on computed usage; evaluate self-hosted subsets for privacy/cache control. Do not preload until the actual critical files are known.

### CSS

- **Measured source global CSS:** 8,305 bytes / 317 lines.
- **Measured unique built CSS:** five files, 59,565 bytes uncompressed.
- **Measured per-page CSS references:** about 20.2–38.0 KB; home is highest.
- Palette/type tokens are centralized. Spacing/breakpoints are largely raw values repeated in scoped blocks; no spacing/breakpoint scale exists.
- Astro scopes/coalesces page styles. No automated unused-selector coverage was available, so unused CSS is not claimed.
- Inline style attributes are used for intentional dynamic hero URLs, Eyebrow variants, PageHero padding, scroll lock, and SVG details. The broken hero URL demonstrates why asset URLs should remain typed imports.

### HTML

- **Measured:** 20 HTML files total 441,172 bytes; per page 15.7–40.5 KB, with home largest.
- Exactly one H1 on each route; no heading-level jumps, duplicate IDs, broken internal links, or broken same-page fragments were found.
- Semantic `header`, `nav`, `main`, `footer`, `article`, `section`, `address`, lists, buttons, and forms are present.
- DOM node count/depth and validity were not browser/validator measured. Large nested homepage/Christmas/article templates are maintainability risks more than proven DOM performance failures.
- `overflow-x: hidden` on `html` and `body` can mask rather than solve responsive overflow; verify at required viewport widths.

### Network and third parties

- External runtime origins: Google Fonts and YouTube embeds on fleet detail routes. Footer social links navigate externally but load no social SDK.
- No analytics, pixels, maps, form provider, external image CDN, cookies, localStorage, or sessionStorage usage was found.
- YouTube iframes are lazy, use strict-origin-when-cross-origin, but are not privacy-enhanced/click-to-load.

### Core Web Vitals risks (estimates, not scores)

| Metric | Affected pages | Likely risk | Recommended fix | Expected impact |
|---|---|---|---|---|
| LCP | Home, Christmas, fleet, gallery | Multi-megabyte hero/gallery assets, missing desktop hero, external fonts | Responsive hero sources, correct priority, compressed dimensions, reduce font variants | High |
| CLS | Image-heavy routes | 91 images lack intrinsic dimensions; font swaps | Width/height or aspect-ratio, responsive image metadata, tune font fallback | High |
| INP | Home/navigation/galleries | JS is tiny; risk is interaction/focus logic rather than CPU | Keep no-hydration approach; test menu/carousel/form event paths | Low–medium |
| FCP | All routes | Render-blocking Google Fonts CSS and route CSS | Reduce/self-host font files; keep critical CSS lean | Medium |
| TTFB | All routes | Static hosting should be favorable, but caching/CDN headers are unknown | Verify Pages/CDN cache headers and field data | Low/unknown |

## 9. SEO audit

### Metadata and crawlability

- **Pass:** unique titles/descriptions, canonical URLs, HTTPS absolute OG/canonical URLs, viewport, `<html lang="en">`, sitemap, and one H1 per page.
- **Needs work:** six titles over 60 characters; four descriptions over 160; no Twitter cards; 17 routes lack OG images; no theme color/app icon set; final canonical origin/base unconfirmed.
- No `robots.txt`, custom 404, redirects, or explicit robots meta. All pages are indexable; draft legal pages are therefore accidental index candidates.
- Sitemap contains all 20 pages and two XML files are generated. Confirm whether privacy/terms and any future thank-you/utility routes belong in it.
- Generated-route links and fragments are valid. The desktop hero is an asset URL failure rather than an anchor failure.
- No orphan-route conclusion is claimed solely from generated anchor counts; every main content route appears in global navigation, cards, or contextual links.

### Headings/content

- **Measured:** all pages have one H1; heading levels do not skip upward in generated HTML.
- Service content is concentrated on `/services/`; important high-intent offerings may warrant dedicated pages only if they are real, differentiated services with sufficient original content.
- Fleet/service-area/capacity copy conflicts should be resolved before expanding location/service SEO, or inconsistency will scale.
- Guide content has contextual links to fleet/reservation and related Guides. Add breadcrumbs and stronger service-to-guide links where they help users, not as keyword decoration.
- Image alts are present, but fleet gallery strings such as “photo 1” are generic. Filenames are often vendor/source names rather than descriptive asset identifiers.

### Structured data

Current output is one `TaxiService` object on home and one `Article` object per Guide. Do not add claims until facts are verified.

Recommended eventual graph:

- `LocalBusiness` using the most accurate Schema.org subtype, plus verified `ContactPoint`, logo/image, service area, hours, address or service-area-business handling, and official `sameAs`.
- `WebSite`/`WebPage` and `BreadcrumbList` where they accurately describe the hierarchy.
- `Service` for real service pages. Avoid `Product`, `Offer`, `AggregateOffer`, ratings, and prices unless accurate public facts exist.
- `FAQPage` only for the visible FAQ page and only if current search-engine eligibility/policy and content ownership are confirmed.

Missing business data: legal name, real phone, complete address or service-area status, exact service areas/states, hours, official social URLs, verified logo URL, certification status/logo permission, reservation endpoint, price range if public, coordinates if a public location exists, and approved business descriptions/testimonials.

### Local SEO

Name/email are mostly consistent; phone/address/social are not ready. “Chicagoland,” a list of suburbs, and a four-state hero claim coexist without a verified service-area model. Confirm actual licensed/operational coverage before city/state pages. After verification, align the site, Google Business Profile, directories, footer, structured data, and Search Console property. Do not create thin location pages.

## 10. Accessibility audit

This is a static audit; no screen reader, keyboard browser walkthrough, zoom/reflow test, or automated browser scanner was available.

| Severity | Finding | Evidence / action |
|---|---|---|
| Critical | False form success | Users are told requests were received when no submission occurs; implement real endpoint and accessible outcomes |
| High | Incomplete focus visibility | Header resets controls with `all: unset`; global focus-visible system is absent |
| High | No skip link | Add a visible-on-focus skip link and main target |
| High | Drawer/dropdown focus management incomplete | Escape works, but focus is not trapped/contained or restored to trigger; test tab order and background reachability |
| High | Contrast risks | On paper: faint 2.56:1, gold-dark 3.17:1, gold 2.02:1; audit each semantic text/icon use |
| Medium | Dynamic results not announced | Confirmation panels lack status/live semantics and explicit focus movement |
| Medium | Auto-advancing testimonials | Reduced motion is considered; add/test pause control and assistive status behavior |
| Medium | Missing intrinsic image dimensions | Creates layout-shift/reflow risk; 91/111 generated images affected |
| Medium | Active page is visual only | Add `aria-current="page"` to matching navigation links |
| Medium | Labels/validation need end-to-end review | Contact/reservation use implicit visible labels; home uses aria-labels. Native validation has no custom error summary/focus plan |
| Low | Generic fleet gallery alt text | “Vehicle — photo N” does not convey image-specific content; thumbnails correctly use empty alt as duplicate controls |

Positive findings: semantic landmarks and buttons/links are mostly appropriate; icon-only buttons have accessible labels; menu expanded state and controls are wired; gallery accepts arrow keys; reduced-motion CSS exists; mobile navigation trigger is 44×44; form controls use 16 px text to avoid iOS zoom; all generated images have `alt` attributes; external new-tab links include `noopener noreferrer`.

## 11. Forms audit

| Area | Finding |
|---|---|
| Architecture | Three separate client-enhanced forms: home three-step accordion, contact quote, reservation request |
| Endpoint | None; no `action`, API route, provider, or fetch |
| Client validation | Native required/type/min/max plus `reportValidity`; home trip fields are mostly optional |
| Server validation | None |
| Spam/duplicates | None; duplicate prevention is absent |
| Submission | JavaScript is required and only swaps visibility |
| Loading/error | No loading, network error, retry, or provider error state |
| Success | Immediate false success message; not tied to delivery |
| Accessibility | Contact/reservation have implicit visible labels; home has aria-labels. Results are not live-announced/focused |
| Analytics | None |
| Privacy | Forms collect name, phone, email, date/time, pickup/drop-off, passenger/event details, and notes; draft policy does not name a processor, retention, lawful purpose, or contact process |
| Secrets/env | No form secrets or environment variables exist; none are exposed |
| No-JS behavior | Does not submit |

Required design-preserving architecture: real serverless/third-party endpoint; typed shared payload; server/provider validation; honeypot/rate limiting or equivalent; idempotency/disabled submit during request; privacy notice; accessible loading/error/success status; delivery monitoring; and non-JS fallback if the chosen static-host solution supports it. Do not test with real customer data.

## 12. Security and privacy review

- No secrets, API keys, custom environment values, cookie code, storage use, or PII logging were found.
- `set:html` occurs for a controlled local festive nav label and JSON-stringified local schema. Current input is not user-controlled, but the boundary must stay trusted.
- All 40 generated `target="_blank"` links include `noopener noreferrer`.
- No CSP, Referrer-Policy, Permissions-Policy, frame policy, or explicit `X-Content-Type-Options` configuration exists. GitHub Pages header capabilities must be confirmed.
- Form abuse and privacy are unresolved because there is no backend/provider, consent/retention model, or delivery monitoring.
- Google Fonts and YouTube are third parties that may require disclosure/consent decisions. Consider privacy-enhanced click-to-load YouTube.
- `npm audit`: 2 high and 1 moderate vulnerability. Upgrade requires an Astro major migration, not a blind update.
- `support.js` includes dynamic code/DOM operations but is unreferenced and not emitted. Confirm provenance and keep it outside deployment/import paths.

## 13. Broken items and inconsistencies

| Item | Location | Status |
|---|---|---|
| Desktop hero `/Trolley/uploads/heroImg2.png` | `src/pages/index.astro` | Broken in `dist` |
| Three forms | home/contact/reservation | False success; no delivery |
| `(000) TROLLEY` / fake tel URI | `src/data/site.ts`, Footer | Placeholder and clickable in Footer |
| Social URLs `#` / generic fallbacks | data/Footer | Not official business profiles |
| Street/postal TODO | `src/data/site.ts` | Structured data omitted |
| Four identical placeholder video IDs | fleet data/detail | Misleading until replaced/removed |
| Draft Privacy/Terms | legal pages | Indexable and in sitemap |
| WBENC logo/claim | Footer/public upload | Permission/certification must be verified |
| Capacity/service area claims | data, FAQ, home, contact | Inconsistent |
| Two deployment workflows | `.github/workflows` | Competing builds/deploys |
| Unused `heroImages` export | `src/data/site.ts` | Dead code candidate |
| Root `support.js`, `.thumbnail`, asset variants | repository root | Temporary/provenance unknown |
| Copyright `2026` | Footer | Manual maintenance |

No `FIXME`, console logging, disabled lint rules, duplicate IDs, missing internal routes, missing image alt attributes, or unsafe new-tab rel usage was found. `href="#"` exists only as placeholder data and is guarded in most rendering paths; Footer substitutes generic external platform URLs instead.

## 14. Proposed technical architecture

Keep static Astro and content collections. The site does not need a framework runtime. Introduce stronger typed boundaries before moving UI files:

```ts
interface BusinessConfig {
  legalName: string;
  brandName: string;
  siteUrl: URL;
  email: string;
  phone?: { display: string; href: `tel:${string}` };
  serviceAreas: { name: string; region: string }[];
  social: { instagram?: URL; facebook?: URL };
  certification?: { name: string; logo: ImageMetadata; usageApproved: boolean };
}

interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  image?: ImageMetadata | string;
  robots?: 'index,follow' | 'noindex,follow';
  type?: 'website' | 'article';
}

interface FormResult {
  ok: boolean;
  submissionId?: string;
  fieldErrors?: Record<string, string>;
  message: string;
}
```

Recommended responsibilities:

- `business.ts`: only verified name/contact/service/social/certification facts.
- `navigation.ts`: route labels and active matching; no raw HTML label strings.
- `fleet.ts`: typed vehicle facts and explicit image collections rather than a repository-wide eager glob.
- `seo.ts`/`schema.ts`: canonical construction, default social image, article/business/breadcrumb schemas, validation tests.
- `BaseLayout`: consumes one `seo` object and global config; remains the only document shell.
- `forms/`: shared fields/payload validation and one provider boundary; provider secrets exist only in host/server environment, never `PUBLIC_*`.
- Content collections: retain Guides; consider collections for fleet/services only if editors need Markdown/content validation—not merely to move TypeScript arrays.
- Images: canonical imported sources in `src/assets`; `public` only for files that truly require stable, unprocessed URLs.
- Analytics: load once, consent-aware, only after property/privacy decisions; define conversion events for confirmed provider success, not button clicks.

## 15. Prioritized implementation plan

### Phase 0 — safety and baseline

| Task | Priority | Impact | Effort | Risk/dependencies | Likely files | Visual regression? |
|---|---|---:|---:|---|---|---|
| Confirm production domain/base and choose one deployment workflow | P0 | High | S | Needs repo/Pages ownership | config, workflows | No; URL smoke test |
| Capture approved desktop/mobile screenshots and route metadata baseline | P1 | High | S | Browser availability | all routes/docs | Yes |
| Record Lighthouse lab baseline and enable field monitoring plan | P1 | High | M | Production-like URL/analytics decision | docs/deployment | Yes |
| Confirm business/legal/certification facts before code changes | P0 | Critical | M | Owner/legal input | data/legal/Footer | Content/legal review |

### Phase 1 — critical fixes

| Task | Priority | Impact | Effort | Risk/dependencies | Likely files | Visual regression? |
|---|---|---:|---:|---|---|---|
| Connect forms to verified endpoint with validation/status/spam/privacy controls | P0 | Critical | M–L | Provider, legal, secrets, email delivery | three form pages, new form lib/API/provider config | Yes; preserve design |
| Fix desktop hero asset through imported optimized source | P0 | Critical | S–M | Approved crop | home/assets | Yes |
| Replace placeholder contact/social/address values and generic links | P0 | Critical | S | Verified facts | business data, TopBar, Footer | Yes |
| Approve or withhold legal pages and WBENC claim/logo | P0 | Critical | M | Legal/certification evidence | legal pages/Footer/robots/sitemap | Yes |
| Add global focus-visible, skip link, aria-current, and drawer focus behavior | P1 | High | M | Browser/keyboard tests | global CSS/Layout/Header/Footer | Yes |

### Phase 2 — project structure and quality

| Task | Priority | Impact | Effort | Risk/dependencies | Likely files | Visual regression? |
|---|---|---:|---:|---|---|---|
| Add Astro check, TypeScript, lint/format, unit and browser test commands | P1 | High | M | Astro upgrade plan | package/workflow/tests | No/automated |
| Separate verified business/navigation/fleet/form data domains | P2 | Medium | M | Facts confirmed | `src/data`, imports | Yes |
| Extract stable form/carousel/gallery/navigation scripts/components | P2 | Medium | L | Baseline tests | large pages/components | Yes |
| Confirm then archive/remove root artifacts, dead export, and duplicates | P2 | Medium | M | Asset ownership/reference proof | root/assets/data | Yes for assets |

### Phase 3 — performance

| Task | Priority | Impact | Effort | Risk/dependencies | Likely files | Visual regression? |
|---|---|---:|---:|---|---|---|
| Narrow eager globs and exclude unrelated decor | P1 | High | M | Explicit fleet image map | fleet detail/assets | Yes |
| Convert hero/gallery/card images to responsive optimized sources with dimensions | P1 | High | L | Approved crops/quality | pages/components/assets | Yes |
| Reduce/self-host font subsets after usage measurement | P2 | Medium | M | License and visual approval | BaseLayout/assets/global CSS | Yes |
| Audit CSS repetition/unused rules after component boundaries stabilize | P2 | Medium | M | Browser coverage | global/scoped CSS | Yes |

### Phase 4 — technical SEO/security

| Task | Priority | Impact | Effort | Risk/dependencies | Likely files | Visual regression? |
|---|---|---:|---:|---|---|---|
| Add typed SEO defaults, default OG image, Twitter cards, theme/icons | P1 | High | M | Domain/logo/social image | BaseLayout/seo/assets | Social preview check |
| Add robots.txt, custom 404, redirects policy, sitemap exclusions | P1 | High | M | Domain/legal decisions | public/pages/config | Yes for 404 |
| Complete and validate LocalBusiness/Article/Breadcrumb schemas | P2 | Medium | M | Verified business facts | schema/data/layout/pages | No visual |
| Stage security headers/CSP around Fonts/YouTube/form provider | P2 | Medium | M | Host capabilities/provider origins | deployment | Runtime regression |
| Migrate Astro and sitemap, resolve audit findings | P1 | High | L | Baselines/tests first | package/lock/source/config | Yes |

### Phase 5 — content and local SEO

| Task | Priority | Impact | Effort | Risk/dependencies | Likely files | Visual regression? |
|---|---|---:|---:|---|---|---|
| Reconcile fleet capacities, service areas, videos, and form constraints | P1 | High | M | Owner/operations facts | data/pages | Content review |
| Edit overlong metadata and add useful internal links | P2 | Medium | M | Keyword/Search Console data | pages/content | Snippet review |
| Improve image filenames/alts based on actual scenes | P2 | Medium | M | Image review | assets/data/content | Yes |
| Evaluate dedicated service/location content only where real and non-thin | P2 | Medium | L | Search demand/operational coverage | content/pages | Yes |

## 16. Recommended performance and SEO targets

Targets are goals for a production-like mobile run and field data; they are not current scores.

| Metric | Measured baseline | Recommended target |
|---|---|---|
| Lighthouse Performance | Unavailable | ≥90 mobile on representative routes |
| Lighthouse Accessibility | Unavailable | ≥95, with zero critical/high manual keyboard issues |
| Lighthouse Best Practices | Unavailable | ≥95 |
| Lighthouse SEO | Unavailable | ≥95, plus manual schema/canonical review |
| LCP | Unavailable | ≤2.5 s at p75 field data |
| CLS | Unavailable | ≤0.10 at p75 |
| INP | Unavailable | ≤200 ms at p75 |
| TTFB | Local preview 10–75 ms, not comparable | ≤0.8 s at p75 production |
| Client JS | 0.38–3.44 KB/page; 10.48 KB unique uncompressed | Preserve ≤15 KB/page uncompressed unless justified |
| Hero image | Current desktop URL broken; mobile source 2.12 MB | ≤200 KB desktop and ≤120–150 KB mobile initial candidate, subject to visual QA |
| Initial page weight | Not measured per viewport | ≤1.0 MB mobile / ≤1.5 MB desktop for key landing pages |
| Fonts | Seven requested styles/weights; response files unmeasured | ≤4 font files, ideally ≤150 KB total transfer |
| Third-party requests | Google Fonts; lazy YouTube on fleet; exact count unavailable | ≤2 on primary landing pages before consent/interaction |
| Broken links/assets | 0 route links; 1 broken built asset | 0 |
| Indexable draft pages | 2 legal drafts | 0 |

## 17. Questions and missing business information

Do not guess these values:

1. What is the final production and preferred canonical domain? Will `/Trolley` remain the permanent base path?
2. Which GitHub repository/Pages workflow is authoritative, and who owns deployment recovery?
3. What are the verified public phone number, email, legal business name, and reservation URL?
4. Is there a public street address, or is this strictly a service-area business? Which cities, states, and maximum trip ranges are actually served?
5. What are the official Instagram, Facebook, Google Business Profile, and other approved profile URLs?
6. What are the approved business hours and after-hours contact expectations?
7. Are the fleet names, capacities, amenities, minimums, alcohol rules, and state-service claims correct? Is there a Grand trolley or only the Classic White Trolley?
8. What are the real per-vehicle videos, or should video sections remain unpublished?
9. Which desktop/mobile hero crops are approved, and who owns/licensed each image?
10. Is the company currently WBENC-certified, what exact entity/name is certified, and is this logo/version approved for website use?
11. Who will legally approve Privacy Policy and Terms? Which form/email/analytics/video/font vendors, retention periods, and consent rules must be disclosed?
12. Which form provider or backend should receive quotes/reservations, who receives alerts, and what is the required delivery SLA/fallback?
13. Are all published testimonials approved for public use and accurately attributed?
14. Is pricing or a price range public and accurate enough for schema/content, or should it remain absent?
15. Which analytics property, consent platform, Search Console property, and error monitoring service—if any—are approved?
16. Are redirects needed from a prior live site, and is there an existing URL/export/backlink inventory?

Audit phase ends here. Implementation should begin only after approval of the priorities and the missing business facts required by the selected phase.
