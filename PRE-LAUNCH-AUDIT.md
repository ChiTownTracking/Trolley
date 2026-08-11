# ChiTown Trolley Pre-Launch Audit

Audit date: August 11, 2026  
Production domain: `https://chitowntrolley.com/`  
Framework: Astro 7.1.3, static output  
Authoritative host: Netlify

## Executive Summary

**Launch status: NOT READY**

The post-cleanup source, production build, sitemap, and local production-preview crawl pass their technical checks. The site generated 23 HTML routes, 22 indexable pages, and 22 sitemap URLs. The final crawl found zero broken internal links, fragments, referenced assets, metadata errors, indexable canonical errors, invalid JSON-LD blocks, important orphans, or noncanonical internal route links.

Launch is still blocked by three owner/platform matters that source code alone cannot resolve:

1. A complete old GitHub Pages copy remains public and indexable at `https://chitowntracking.github.io/Trolley/`. Its 20 pages and sitemap self-canonicalize to the GitHub hostname. The repository workflow no longer deploys Pages, but a repository administrator must disable/unpublish the existing site.
2. At the owner's direction, the reservation form currently collects raw card number, expiration, and CVV and the notification function includes those fields in email output. This remains a current launch blocker without a PCI-compliant payment flow. Historical Netlify Form submissions, Resend messages, logs, exports, and backups may also contain card data and require controlled review.
3. The publicly displayed WBENC certificate says it expired on August 31, 2025. Replace it with a current certificate or verify the current certification claim before launch.

Do not submit the site to Google Search Console until those blockers are resolved, the changes are deployed, and the post-deploy checklist at the end of this report passes. Passing these checks does not guarantee Google indexing or ranking.

## Final Validation Snapshot

| Check | Result |
|---|---:|
| `npm run check` | PASS — 40 files, 0 errors, 0 warnings, 1 TypeScript hint from the restored inline expiration-date formatter |
| Production `npm run build` | PASS — 23 pages |
| Generated HTML routes | 23 |
| Indexable pages | 22 |
| Sitemap URLs | 22 unique |
| Indexable orphan pages | 0 |
| Maximum crawl depth | 2 |
| Internal anchor occurrences | 778 |
| Broken internal links | 0 |
| Redirecting internal page links | 0 |
| Broken fragments | 0 of 125 references |
| Referenced assets smoke-tested | 366 unique; 0 failures |
| Missing titles / descriptions | 0 / 0 |
| Duplicate indexable titles / descriptions / H1s | 0 / 0 / 0 |
| Bad indexable H1 counts | 0 |
| Bad indexable canonicals | 0 |
| Invalid JSON-LD | 0 of 4 blocks |
| Missing image alt / width / height | 0 / 0 / 0 across 153 image instances |
| Nonexistent preview route | Correct HTTP 404 |

The in-app graphical browser was unavailable during this audit. Browser-independent generated-HTML analysis, a local Astro production preview, direct HTTP crawling, and live-domain HTTP probes were used. No claim of manual visual/browser UI testing is made.

## Repository Inventory

The pre-cleanup inventory was generated before edits. The compact tree below omits `node_modules/`, `.git/`, `.astro/`, and individual generated `dist/` files.

```text
.
├── .github/
│   └── workflows/astro.yml
├── docs/
│   ├── data/{components,images,image-migration-map,issues,routes}.json
│   └── *.md audit, migration, form, image, and optimization records
├── netlify/
│   └── functions/quote-notification.mjs
├── public/
│   ├── favicon_io/{icons,site.webmanifest}
│   ├── images/guides/{3 public guide images}
│   ├── _headers                         [added]
│   ├── _redirects                       [added]
│   └── robots.txt                       [added]
├── src/
│   ├── assets/
│   │   ├── fonts/{cormorant-garamond,jost,LICENSES,SOURCES.md}
│   │   └── images/{about,branding,christmas,fleet,guides,home,services,wedding}
│   ├── components/{8 active Astro components}
│   │   └── ServiceCard.astro            [removed]
│   ├── content/guides/{3 Markdown guides}
│   ├── data/{christmas-images,fleet,guides,site,site-images}.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/{core pages,fleet routes,guide routes}
│   ├── scripts/{fleet-filter,netlify-forms}.ts
│   ├── styles/global.css
│   └── utils/{images,paths}.ts
├── .gitignore
├── .nvmrc
├── .thumbnail
├── astro.config.mjs
├── homepage-crawlable-content-audit.md
├── package.json
├── package-lock.json
├── README.md
├── support.js
└── tsconfig.json
```

No `.env*` file was present or tracked, no common literal API-key pattern was found, and no source map was generated. `node_modules/`, `dist/`, and `.astro/` are ignored and untracked.

No repository `CNAME` exists; Netlify manages the production domain outside the static artifact, so a GitHub Pages CNAME is neither required nor desirable. The final `public/` tree contains only deploy controls, favicons/manifest, and three stable guide-body images—no backup, mockup, test HTML, source map, or secret file.

## Repository Cleanup

### Deletion log

| Path | Type | Why safe to remove | How verified |
|---|---|---|---|
| `performance-audit/` | Untracked generated directory | Local Lighthouse output from the prior audit; not deployable source | Six JSON reports totaling 5,138,609 bytes; no repository references; now ignored |
| `src/components/ServiceCard.astro` | Source file | Component had no consumers | Repository-wide static/dynamic import and string-reference search; check/build pass after removal |
| `src/assets/images/christmas/decorative/corner-wreath.webp` | Image, 231,920 bytes | Obsolete generated decorative export | Zero runtime references after unused import/export removal; upstream `corner-wreath-source.jpg` preserved; no longer emitted |
| `src/assets/images/christmas/decorative/garland-strand.webp` | Image, 341,688 bytes | Obsolete generated decorative export | Zero runtime references after unused import/export removal; upstream `garland-strand-source.jpg` preserved; no longer emitted |
| `public/images/christmas-trolley/decor/` | Empty directory | No framework/deploy convention or `.gitkeep` | Recursive empty-directory audit |
| `public/images/christmas-trolley/` | Empty parent directory | Became empty after verified child removal | Recursive empty-directory audit |
| `src/assets/fleet/ChristmasTrolley/` | Empty directory | Obsolete pre-migration location | Recursive empty-directory audit |
| `src/assets/fleet/CoachBus/` | Empty directory | Obsolete pre-migration location | Recursive empty-directory audit |
| `src/assets/fleet/LimoVan/` | Empty directory | Obsolete pre-migration location | Recursive empty-directory audit |
| `src/assets/fleet/PartyBus/` | Empty directory | Obsolete pre-migration location | Recursive empty-directory audit |
| `src/assets/fleet/Trolley/` | Empty directory | Obsolete pre-migration location | Recursive empty-directory audit |
| `src/assets/fleet/` | Empty parent directory | Became empty after verified child removal | Recursive empty-directory audit |

Final unnecessary empty-directory count: **0**.

### Unused code removed

- Removed the unused `services` data export.
- Removed unused `publicImage` and `imageSrc` utilities while retaining the used `SiteImage` type.
- Removed unused Christmas decor imports/exports, which stopped the two deleted WebPs from entering the build.
- Removed the invalid trolley-photo `publisher.logo` from guide schema rather than representing a vehicle photo as an organization logo.

### `.gitignore` changes

Added coverage for:

- `performance-audit/`, `coverage/`, `.cache/`
- local `lighthouse-*.json` and `lighthouse-*.html`
- all log files and package-manager debug logs
- `.env*`, while explicitly allowing a future safe `.env.example`
- swap, temporary, backup, and editor files
- `.DS_Store` and `Thumbs.db`

## Files Kept Intentionally

| Candidate | Decision and reason |
|---|---|
| `.thumbnail`, `support.js` | Kept. Legacy DivMagic provenance files are tracked and excluded from the build; owner confirmation is required before deletion. |
| `docs/` audit/migration records | Kept as intentional tracked documentation. Some image reports are historical snapshots and still name the two now-deleted decorative exports. |
| WBENC certificate/logo and Women Owned wordmark | Kept under the explicit trust-asset safety rule. The expired certificate is a manual blocker, not a silent deletion candidate. |
| All four WOFF2 files and license/source records | Kept; each font is referenced by CSS/layout and licensed. |
| Alternate home hero images, alternate garland, and four Christmas source masters | Kept; existing architecture documentation marks them as review/source assets. |
| Current trolley, coach, party-bus, and sprinter photography | Kept under the explicit current-photography safety rule. |
| `fleet/coach/exterior-rear-dusk.jpg` | Kept pending owner review even though it is byte-identical to the used guide cover and has no runtime consumer. |
| `fleet/coach/interior.jpg`, sprinter `interior-front.jpg`, `interior-rear.webp`, and `sprinter-van-exterior.png` | Kept pending owner review as plausible current/future fleet photography despite no runtime consumer. |
| `WhatsApp Video 2026-08-06 at 5.16.25 PM.mp4` (6,143,429 bytes) | Kept. It is unreferenced and not emitted, but recent provenance makes deletion uncertain; owner should decide. |

## Files Changed

Changes are intentionally uncommitted:

- Deployment/repository: `.github/workflows/astro.yml`, `.gitignore`, `README.md`, `astro.config.mjs`
- Netlify/public: `public/_headers`, `public/_redirects`, `public/robots.txt`, `public/favicon_io/site.webmanifest`
- Data/utilities: `src/data/christmas-images.ts`, `src/data/fleet.ts`, `src/data/guides.ts`, `src/data/site.ts`, `src/utils/images.ts`, `src/utils/paths.ts`
- Layout/pages/styles: `src/layouts/BaseLayout.astro`, `src/pages/404.astro`, `src/pages/christmas-trolley.astro`, `src/pages/contact.astro`, `src/pages/fleet/[slug].astro`, `src/pages/gallery.astro`, `src/pages/guides/[slug].astro`, `src/pages/index.astro`, `src/pages/privacy-policy.astro`, `src/pages/reservation.astro`, `src/pages/terms-and-conditions.astro`, `src/styles/global.css`, `src/styles/legal.css`
- Removed: `src/components/ServiceCard.astro` and the two obsolete decorative WebPs listed above
- Reports: `PRE-LAUNCH-AUDIT.md`, `site-link-map.md`

No `git add`, commit, push, reset, or destructive Git operation was run.

## Build Output

Final `dist/` inventory:

| Output type | Count |
|---|---:|
| Total files | 447 |
| Total bytes | 79,626,231 (75.94 MiB) |
| HTML | 23 |
| CSS | 10 |
| External JavaScript assets | 0 (small scripts are inlined) |
| Images/icons, including generated variants | 404 |
| Source maps | 0 |

Expected deploy controls—`robots.txt`, `_headers`, `_redirects`, sitemap index/child XML, manifest, and favicons—are present. No unexpected secret, local report, `.env`, development bundle, or source map appears in `dist/`.

## Generated Routes and Indexability

All generated routes returned HTTP 200 when addressed directly in preview. A random nonexistent route returned HTTP 404. The explicit 404 file is a noindex utility page and intentionally omits a canonical.

| Route | Title | H1 | Canonical | Robots/indexability | Sitemap |
|---|---|---|---|---|---:|
| `/` | Chicago Trolley Rental for Weddings & Events \| ChiTown Trolley | Chicago Trolley Rental for Weddings & Events | `https://chitowntrolley.com/` | Indexable | Yes |
| `/about/` | About ChiTown Trolley \| Women-Owned Chicago Trolley Company | A women-owned Chicago trolley company built on personal service | `https://chitowntrolley.com/about/` | Indexable | Yes |
| `/christmas-trolley/` | Chicago Christmas Trolley Tours \| ChiTown Trolley | Chicago Christmas Trolley Tours | `https://chitowntrolley.com/christmas-trolley/` | Indexable | Yes |
| `/contact/` | Get a Quote — ChiTown Trolley | Let's hold your date | `https://chitowntrolley.com/contact/` | Indexable | Yes |
| `/faq/` | FAQ — ChiTown Trolley | Good questions, honest answers | `https://chitowntrolley.com/faq/` | Indexable | Yes |
| `/fleet/` | Our Fleet — ChiTown Trolley | Our Fleet | `https://chitowntrolley.com/fleet/` | Indexable | Yes |
| `/fleet/classic-white-trolley/` | Classic White Trolley — ChiTown Trolley | Classic White Trolley | `https://chitowntrolley.com/fleet/classic-white-trolley/` | Indexable | Yes |
| `/fleet/white-limo-trolley/` | White Limo Trolley — ChiTown Trolley | White Limo Trolley | `https://chitowntrolley.com/fleet/white-limo-trolley/` | Indexable | Yes |
| `/fleet/executive-van/` | Executive Van — ChiTown Trolley | Executive Van | `https://chitowntrolley.com/fleet/executive-van/` | Indexable | Yes |
| `/fleet/limo-vans/` | Limo Van — ChiTown Trolley | Limo Van | `https://chitowntrolley.com/fleet/limo-vans/` | Indexable | Yes |
| `/fleet/party-bus/` | Party Bus — ChiTown Trolley | Party Bus | `https://chitowntrolley.com/fleet/party-bus/` | Indexable | Yes |
| `/fleet/super-coach-bus/` | Super Coach Bus — ChiTown Trolley | Super Coach Bus | `https://chitowntrolley.com/fleet/super-coach-bus/` | Indexable | Yes |
| `/gallery/` | Gallery — ChiTown Trolley | See every detail, inside and out | `https://chitowntrolley.com/gallery/` | Indexable | Yes |
| `/guides/` | Guides & Inspiration — Wedding & Event Transportation Tips \| ChiTown Trolley | Guides & Inspiration | `https://chitowntrolley.com/guides/` | Indexable | Yes |
| `/guides/chicago-trolley-friendly-wedding-venues/` | Chicago's Most Trolley-Friendly Wedding Venues — ChiTown Trolley Guides | Chicago's Most Trolley-Friendly Wedding Venues | exact self-canonical | Indexable | Yes |
| `/guides/how-many-guests-fit-in-a-trolley/` | How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide — ChiTown Trolley Guides | same article title | exact self-canonical | Indexable | Yes |
| `/guides/wedding-day-shuttle-logistics-timeline/` | Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation — ChiTown Trolley Guides | same article title | exact self-canonical | Indexable | Yes |
| `/reservation/` | Reserve Your Ride — ChiTown Trolley | Reserve your ride | `https://chitowntrolley.com/reservation/` | Indexable | Yes |
| `/services/` | Chicago Transportation Services \| ChiTown Trolley | Transportation for Every Occasion | `https://chitowntrolley.com/services/` | Indexable | Yes |
| `/weddings/` | Chicago Wedding Trolley Rental \| ChiTown Trolley | Chicago Wedding Trolley Rental | `https://chitowntrolley.com/weddings/` | Indexable | Yes |
| `/privacy-policy/` | Privacy Policy — ChiTown Trolley | Privacy Policy | exact self-canonical | Indexable | Yes |
| `/terms-and-conditions/` | Terms and Conditions — ChiTown Trolley | Terms and Conditions | exact self-canonical | Indexable | Yes |
| `/404.html` | Page Not Found — ChiTown Trolley | Page not found | None, intentionally | `noindex,follow` utility | No |

For the complete route tree, distinct inlink-source counts, distinct out-target counts, depths, and Mermaid graph, see `site-link-map.md`.

## Crawlability and Link Architecture

- All 22 sitemap pages are reachable from the homepage.
- Indexable orphans: 0.
- Maximum shortest depth: 2; pages deeper than three clicks: 0.
- Final generated HTML contains 974 anchors, 778 internal anchor occurrences, and no empty or `href="#"` links.
- Broken internal destinations: 0.
- Fragment references: 88; broken fragment targets: 0.
- The central `withBase()` helper now gives page routes the trailing slash used by the sitemap and canonicals while preserving assets, query strings, and fragments. The initial build had 545 non-trailing route links; the final build has 0.
- Eleven quote-preselection link occurrences all exactly match a built vehicle option. Christmas Trolley, Super Coach Bus — 57 Passengers, and Party Bus — 40 Passengers now preselect correctly.
- Navigation, mobile menu, and footer use crawlable server-rendered anchors and expose the same important destinations.
- No JavaScript-only primary navigation or meaningful JavaScript-only page content was found.

## Canonicals, Robots, and Sitemap

### Canonicals

- 22 generated pages emit canonicals; all 22 indexable pages use exact production HTTPS self-canonicals.
- Canonicals have no query strings, fragments, localhost hostnames, GitHub Pages hostname, or old `/Trolley/` base.
- Canonical and sitemap trailing-slash forms match.
- The noindex 404 now omits its former synthetic `/404/` canonical.

### `robots.txt`

The live site returned 404 for `robots.txt` during the audit. Source now generates:

```text
User-agent: *
Allow: /

Sitemap: https://chitowntrolley.com/sitemap-index.xml
```

The final build contains the file. It does not block pages, CSS, JavaScript, or images. Deployment and a live 200 response are still required.

### Sitemap

- Astro generated `sitemap-index.xml` and `sitemap-0.xml`; those are the actual filenames.
- 22 unique production HTTPS URLs; no duplicates, fragments, query strings, redirects, 404s, test pages, or noindex pages.
- Every sitemap URL returned 200 in preview, is indexable, and has an exact self-canonical.
- Every indexable generated route is in the sitemap, and no noindex route is included.

## Metadata, Headings, and Content

- Missing titles: 0; missing descriptions: 0.
- Exact duplicate indexable titles/descriptions: 0/0.
- Every indexable page has exactly one meaningful H1; duplicate H1 values, empty headings, and heading-level skips: 0.
- The closed global form-success dialog's “Thank you!” label was changed from H2 to a styled paragraph so utility state no longer pollutes every page's heading outline.
- All six fleet descriptions now truncate on a word boundary rather than mid-word.
- Guide publication dates now format explicitly in UTC. Source dates May 5, May 27, and June 18, 2026 render on those same calendar dates.
- FAQ, guide, service, fleet, and testimonial content is present in generated HTML. Accordions hide content visually but not from the DOM.
- No test, legacy, duplicate, empty, or accidental indexable route was generated.

## Guide Collection

- Three entries; three unique slugs and titles.
- Each has a description, publication date, valid featured image, generated article route, internal links, and sitemap inclusion.
- No unpublished/draft guide is deployed.
- Visible dates match BlogPosting `datePublished`; the prior one-day timezone shift is fixed.

## Structured Data

| Route group | Type | Result |
|---|---|---|
| Homepage | `TaxiService` | Valid JSON; production URL; visible phone/address/service-area data consistent with the page/footer |
| Three guide articles | `BlogPosting` | Valid JSON; canonical `mainEntityOfPage`; visible title/date/image data consistent |

Four JSON-LD blocks were parsed; invalid blocks: 0. The inaccurate vehicle-photo publisher logo was removed. No placeholder or old-host URL appears in schema. The Instagram URL contains tracking parameters and the Facebook URL is a share URL; both were retained because a verified canonical business-profile URL was not supplied. Replace them only after the owner provides stable profile URLs. Business legal name, address, phone, service-area, and certification claims still require owner confirmation.

## Open Graph and Social Metadata

- Every generated page has Open Graph type/title/description and Twitter card/title/description metadata.
- Existing Open Graph URLs and images use the production domain and resolve in the build.
- No `twitter:image` is emitted.
- Important routes without `og:image`: `/`, `/christmas-trolley/`, `/fleet/`, and `/guides/`.
- This is a launch warning, not an indexing blocker. No speculative social image was generated.

## Mobile-First and Accessibility Check

- Desktop and mobile navigation share the same DOM, destinations, metadata, structured data, headings, body copy, FAQs, links, and image alternatives.
- Primary content is server-rendered; no separate reduced mobile response exists.
- The reveal-on-scroll pattern now uses progressive enhancement: content is visible by default, hidden only when the early script marks JavaScript as available, and revealed immediately when reduced motion is preferred or IntersectionObserver is unavailable.
- Final image markup: 153 instances, 118 descriptive nonempty alternatives, 35 intentional empty alternatives for decorative/duplicated imagery, 0 missing alt attributes, and 0 missing width/height attributes.
- Two hidden-dialog images intentionally start without a `src`, preventing closed-dialog fetches. The gallery lightbox receives its dimensions, source, and descriptive alt before opening; the WBENC certificate receives its source on pointer intent, focus, or click. Both retain explicit dimensions and alt text in the markup.
- This was a static/mobile-equivalence and HTTP audit, not a manual screen-reader or cross-device visual QA session.

## Image Asset Audit

Current source/public inventory: **67 images, 74,206,345 bytes (70.77 MiB)**. “Docs only” means the file is not emitted at runtime and is retained as a documented source/review asset. Runtime imports may generate many optimized variants in `dist/`.

| File | Size | Dimensions | Format | Referenced by | Decision |
|---|---:|---:|---|---|---|
| `public/favicon_io/android-chrome-192x192.png` | 7.0 KiB | 192x192 | PNG | webmanifest | Keep |
| `public/favicon_io/android-chrome-512x512.png` | 15.2 KiB | 512x512 | PNG | webmanifest | Keep |
| `public/favicon_io/apple-touch-icon.png` | 6.2 KiB | 180x180 | PNG | BaseLayout | Keep |
| `public/favicon_io/favicon-16x16.png` | 0.5 KiB | 16x16 | PNG | BaseLayout | Keep |
| `public/favicon_io/favicon-32x32.png` | 0.9 KiB | 32x32 | PNG | BaseLayout | Keep |
| `public/favicon_io/favicon.ico` | 15.0 KiB | multi-size | ICO | BaseLayout | Keep |
| `public/images/guides/coach-exterior-side-dusk.jpg` | 350.1 KiB | 1100x733 | JPEG | wedding shuttle guide body | Keep |
| `public/images/guides/trolley-christmas-lights.png` | 88.0 KiB | 555x327 | PNG | venue guide body | Keep |
| `public/images/guides/trolley-interior.webp` | 40.5 KiB | 555x327 | WebP | sizing guide body | Keep |
| `src/assets/images/about/banner.png` | 1.50 MiB | 1915x821 | PNG | About page | Keep |
| `src/assets/images/branding/certifications/wbenc-certificate.webp` | 18.1 KiB | 500x365 | WebP | site image data/home | Keep; replace expired copy |
| `src/assets/images/branding/certifications/wbenc-logo.svg` | 5.5 KiB | 142x30 | SVG | site image data/About | Keep |
| `src/assets/images/branding/certifications/women-owned-wordmark.png` | 21.6 KiB | 546x351 | PNG | site image data/About | Keep |
| `src/assets/images/christmas/decorative/garland-strip-alternate.webp` | 212.2 KiB | 2400x742 | WebP | docs only | Keep |
| `src/assets/images/christmas/decorative/garland-strip-bottom.webp` | 376.1 KiB | 2000x1172 | WebP | Christmas data/page | Keep |
| `src/assets/images/christmas/decorative/sources/corner-wreath-source.jpg` | 2.11 MiB | 2500x2500 | JPEG | source/provenance docs | Keep |
| `src/assets/images/christmas/decorative/sources/garland-arch-source.jpg` | 2.20 MiB | 2500x2500 | JPEG | source/provenance docs | Keep |
| `src/assets/images/christmas/decorative/sources/garland-strand-source.jpg` | 1.90 MiB | 2500x2500 | JPEG | source/provenance docs | Keep |
| `src/assets/images/christmas/decorative/sources/garland-strip-source.jpg` | 6.15 MiB | 8000x2474 | JPEG | source/provenance docs | Keep |
| `src/assets/images/christmas/gallery/christmas-header-bg.png` | 2.11 MiB | 1913x822 | PNG | Christmas hero | Keep |
| `src/assets/images/christmas/gallery/christmas-interior.png` | 2.47 MiB | 1086x1448 | PNG | fleet data/pages | Keep |
| `src/assets/images/christmas/gallery/christmas-trolley.png` | 2.11 MiB | 1448x1086 | PNG | fleet data/Christmas | Keep |
| `src/assets/images/fleet/coach/coach-bus-exterior-1.jpeg` | 235.0 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/coach-bus-exterior-2.jpeg` | 212.6 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/coach-bus-exterior-3.jpeg` | 176.3 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/coach-bus-washroom-1.jpeg` | 98.4 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/coach-bus-washroom-2.jpeg` | 224.9 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/exterior-rear-dusk.jpg` | 400.8 KiB | 1100x733 | JPEG | docs only; exact duplicate of used guide cover | Keep pending owner review |
| `src/assets/images/fleet/coach/interior.jpg` | 452.3 KiB | 1000x648 | JPEG | docs only | Keep pending owner review |
| `src/assets/images/fleet/coach/interior1.jpeg` | 243.8 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/interior2.jpeg` | 122.1 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/coach/interior3.jpeg` | 126.7 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/party-bus/exterior.jpg` | 255.1 KiB | 1000x800 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/party-bus/party-bus-interior-1.jpeg` | 268.6 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/party-bus/party-bus-interior-2.jpeg` | 192.9 KiB | 1200x1600 | JPEG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/interior-front.jpg` | 190.0 KiB | 1002x665 | JPEG | docs only | Keep pending owner review |
| `src/assets/images/fleet/sprinter/interior-rear.webp` | 54.6 KiB | 800x531 | WebP | docs only | Keep pending owner review |
| `src/assets/images/fleet/sprinter/limo van excutive/excutive-van-front.png` | 2.94 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/limo van excutive/excutive-van-interior-1.png` | 2.29 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/limo van excutive/excutive-van-interior.png` | 2.17 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/limo van excutive/excutive-van-side.png` | 2.67 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/limo van/limo-van-back.png` | 2.70 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/limo van/limo-van-front.png` | 2.94 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/limo van/limo-van-interior.png` | 2.27 MiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/sprinter/sprinter-van-exterior.png` | 682.4 KiB | 1448x1086 | PNG | no runtime reference | Keep pending owner review |
| `src/assets/images/fleet/trolley/T4-Trolley-Exterior-front.png` | 625.7 KiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/T4-Trolley-Exterior-side.png` | 2.86 MiB | 1870x841 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/T4-Trolley-Exterior.png` | 705.5 KiB | 1448x1086 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/T4-Trolley-Interior-1.png` | 785.8 KiB | 1086x1448 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/T4-Trolley-Interior-2.png` | 808.1 KiB | 1086x1448 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/T4-Trolley-Interior-Lighting.png` | 823.7 KiB | 1086x1448 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/classic-Trolley-interior-frontfacing.png` | 2.63 MiB | 871x1806 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/classic-Trolley-interior-frontfacing2.png` | 2.41 MiB | 941x1671 | PNG | fleet data/pages | Keep |
| `src/assets/images/fleet/trolley/classic-exterior.png` | 118.7 KiB | 555x327 | PNG | fleet data/pages | Keep |
| `src/assets/images/guides/coach-shuttle-guide-cover.jpg` | 400.8 KiB | 1100x733 | JPEG | guide frontmatter/articles | Keep |
| `src/assets/images/guides/trolley-guide-cover.png` | 109.6 KiB | 555x327 | PNG | guide frontmatter/articles | Keep |
| `src/assets/images/home/hero/hero-desktop-alternate.png` | 2.18 MiB | 1536x1024 | PNG | docs only | Keep |
| `src/assets/images/home/hero/hero-desktop-alternate.webp` | 145.7 KiB | 1536x1024 | WebP | docs only | Keep |
| `src/assets/images/home/hero/hero-desktop.png` | 2.14 MiB | 1774x887 | PNG | site image data/home | Keep |
| `src/assets/images/home/hero/hero-mobile-alternate.png` | 2.04 MiB | 941x1672 | PNG | docs only | Keep |
| `src/assets/images/home/hero/hero-mobile.png` | 2.03 MiB | 941x1455 | PNG | site image data/home | Keep |
| `src/assets/images/home/occasion/occasion-mobile.png` | 917.9 KiB | 1024x825 | PNG | home page | Keep |
| `src/assets/images/home/occasion/occasion.png` | 566.9 KiB | 1024x1536 | PNG | home page | Keep |
| `src/assets/images/services/services-banner-bg.png` | 1.51 MiB | 1717x916 | PNG | Services hero | Keep |
| `src/assets/images/wedding/trolley-coach.png` | 667.4 KiB | 1672x941 | PNG | Weddings page | Keep |
| `src/assets/images/wedding/trolley-interior-exterior.png` | 593.2 KiB | 1672x941 | PNG | Weddings page | Keep |
| `src/assets/images/wedding/wedding-banner-bg.png` | 2.37 MiB | 1909x824 | PNG | Weddings hero | Keep |

## Font Audit

| File | Family | Weight/style | Format | Size | CSS/layout use |
|---|---|---|---|---:|---|
| `jost-latin-variable-normal.woff2` | Jost | variable normal | WOFF2 | 26,576 B | global sans; preloaded |
| `jost-latin-300-italic.woff2` | Jost | 300 italic | WOFF2 | 11,536 B | global italic face |
| `cormorant-garamond-latin-variable-normal.woff2` | Cormorant Garamond | variable normal | WOFF2 | 37,640 B | global serif; preloaded |
| `cormorant-garamond-latin-variable-italic.woff2` | Cormorant Garamond | variable italic | WOFF2 | 39,260 B | serif emphasis; selectively preloaded |

All four are used, locally served, licensed, and configured with `font-display: swap`. None was removed.

## Production Domain and Redirects

Live behavior observed before deployment of these changes:

| Start URL | Observed chain/final |
|---|---|
| `https://chitowntrolley.com/` | 200, no redirect |
| `http://chitowntrolley.com/` | one 301 to HTTPS apex |
| `https://www.chitowntrolley.com/` | one 301 to HTTPS apex |
| `http://www.chitowntrolley.com/` | two 301s: HTTPS www, then HTTPS apex |
| `https://chitowntrolley.netlify.app/` | 200 instead of redirect; canonical points to production |
| `https://chitowntracking.github.io/Trolley/` | 200 complete duplicate site; critical blocker |

Source now includes Netlify `_redirects` rules sending both protocols of the Netlify alias and `www` host directly to `https://chitowntrolley.com/:splat` with 301 status. Query strings and paths are preserved. Actual hosting behavior must be retested after deployment; Netlify's platform HTTPS normalization may still leave HTTP-www at two hops.

The production build contains no `localhost`, loopback, GitHub Pages canonical, obsolete `/Trolley/` base, `file:///`, Windows user path, or old staging-domain remnant. `astro.config.mjs` now uses the production domain and root base. The GitHub workflow validates check/build only and no longer deploys a competing Pages artifact.

## Deployment and Header Check

- Output is static `dist/`; Node requirement is `>=22.12.0`, matched by `.nvmrc`.
- Netlify is authoritative because the site uses a Netlify event function and Netlify Forms; GitHub Pages cannot run that function.
- `public/_headers` adds `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive camera/microphone/geolocation `Permissions-Policy`.
- Fingerprinted `/_astro/*` assets receive a one-year immutable cache rule. Live assets currently revalidate with `max-age=0`; deploy and confirm the new header.
- The manifest receives `application/manifest+json`, a one-day cache, correct relative icon paths, and nonempty name/short name.
- HSTS already exists live. CSP was not added because current inline scripts and Google tag integration require a deliberate nonce/hash/refactor; adding a speculative policy could break production behavior.
- Brotli and gzip compression were verified live for text assets.

## Security and Privacy

### Current source state

- The reservation form's original billing contact, card number, expiration, CVV, billing street, city, state, and ZIP inputs have been restored at the owner's request.
- The corresponding reservation notification allowlist has also been restored, so submitted payment-card values are included in the email output.
- No payment processor or PCI-compliant hosted payment element was added.
- The Resend API key remains server-side. Logs report submitted field names, configuration booleans, response status, and safe email ID—not the API key itself.
- No obvious API key, password, token, local filesystem path, `.env`, or source map appears in deployable output. This does not make emailing raw card data appropriate or PCI-compliant.

### Manual incident response required

Current and historical raw payment fields may exist in Netlify/Resend data. Before launch, the owner must:

1. Restrict access to Netlify Forms, Resend, logs, exports, and backups.
2. Identify the affected date range and records without copying sensitive values into tickets or this repository.
3. Follow provider, payment-card, insurer, legal, and applicable notification/retention requirements.
4. Securely delete affected records where permitted/required and document completion.
5. Replace raw form/email collection with a PCI-compliant hosted payment provider before accepting production card details.

### Package audit

`npm audit` reports four transitive advisories: `fast-uri`, `js-yaml`, and `nanoid` high; `postcss` moderate; critical 0. Direct dependencies are used, and no major dependency upgrade was performed in this audit. Review and apply compatible dependency updates in a separate tested change.

The two runtime dependencies (`astro`, `@astrojs/sitemap`) and two development dependencies (`@astrojs/check`, `typescript`) are used in configuration/scripts. No duplicate or misplaced direct package and no obsolete package script was demonstrated, so none was removed.

## Form and Trust Checks

- Quote, wedding, contact, and reservation forms remain Netlify Forms with existing validation/storage and success/error behavior.
- The notification function allowlists the explicit per-form markers and safely validates required environment variables without logging values.
- Customer display-name sender, verified-domain sender address, customer `reply_to`, subjects, compact inline HTML, and HTML escaping were not changed by this audit.
- The owner-supplied Privacy Policy and Terms and Conditions are published with an August 11, 2026 effective date, exact self-canonicals, responsive legal-page styling, and sitemap inclusion. Independent legal review was not verified by this technical audit.
- Phone, email, address, social links, service-area text, licensing/insurance wording, and certification status require final owner verification.
- Desktop/mobile header and footer routes match; phone and email are real `tel:`/`mailto:` links; Privacy and Terms destinations resolve; the copyright year is generated as 2026 at build time.
- The WBENC image contains the legal entity name and classification information but no obvious payment credential. Its expiration date is the blocker.

## Performance Sanity Check

- The supplied Lighthouse 13.4.0 mobile report scored Performance 97, Accessibility 100, Best Practices 100, and SEO 100, with FCP 1.1 s, LCP 2.6 s, TBT 10 ms, and CLS 0.
- Homepage hero is responsive, optimized, and viewport-specific; one image has `fetchpriority="high"`.
- The report's largest image-delivery finding was the first fleet-card hover image: its maximum card candidate is now a display-ratio crop of 30,410 bytes instead of the reported 92,894-byte portrait (62,484 bytes / about 67% smaller), and coarse/touch pointers do not request a separate hover image.
- The closed WBENC certificate dialog no longer requests its 18,752-byte image at startup; the closed gallery lightbox also continues to avoid an initial full-size request.
- Testimonial initialization no longer calls the transform routine solely to establish the default first slide, removing that startup `clientWidth` layout read while preserving later interaction behavior.
- No external JavaScript bundle or source map is emitted; feature scripts are small and inline.
- Fingerprinted assets will use immutable browser caching after `_headers` is deployed.
- Remaining warning: Weddings, Services, and Christmas heroes still load original CSS-background PNGs of approximately 2.49 MB, 1.59 MB, and 2.21 MB respectively. The Christmas garland background is another 376 KiB. These are real optimization opportunities, but aggressive recompression/layout conversion was outside this audit.
- Google Tag is the primary initial third party and should not be removed or delayed without analytics/conversion-owner approval. The two small render-blocking stylesheets were also retained because the supplied report attributes no LCP savings to changing them; both choices preserve analytics and normal cacheable styling behavior.

## Remaining Warnings

Blocking:

- Unpublish/disable the complete GitHub Pages duplicate.
- Replace the current raw card form/email flow with a PCI-compliant hosted payment flow and complete historical payment-card data review/purge.
- Replace/verify the expired WBENC certificate and active certification claim.

Nonblocking but recommended:

- Deploy and verify `robots.txt`, `_headers`, `_redirects`, manifest MIME, and alias redirects.
- Verify all business contact/address/service-area/insurance/licensing claims.
- Provide canonical Facebook and Instagram profile URLs; current values include share/tracking forms.
- Choose a verified default social image strategy for routes missing `og:image`/`twitter:image`.
- Resolve four transitive package advisories in a separately tested update.
- Decide whether to delete the retained recent MP4, exact duplicate coach photo, and other unreferenced current/future fleet photos.
- Optimize the three multi-megabyte CSS hero PNGs in a dedicated visual-performance task.
- Consider a tested CSP design compatible with inline Astro scripts and Google Tag.

## Google Search Console Launch Checklist

Complete in order:

- [ ] Commit/review/deploy these changes to Netlify; do not deploy `dist/` manually unless the configured workflow requires it.
- [ ] Disable the old Pages workflow in GitHub Actions and unpublish GitHub Pages in repository Settings → Pages.
- [ ] Confirm both the old GitHub homepage and its sitemap no longer return 200.
- [ ] Replace raw card collection/emailing with a PCI-compliant hosted payment flow; complete and document historical card-data containment/deletion.
- [ ] Replace or verify the expired WBENC certificate and trust claims.
- [ ] Confirm `https://chitowntrolley.com/robots.txt` returns 200 and names `sitemap-index.xml`.
- [ ] Confirm `sitemap-index.xml`, `sitemap-0.xml`, and all 22 URLs return direct 200 responses and exact self-canonicals.
- [ ] Confirm HTTP, `www`, and `chitowntrolley.netlify.app` redirect permanently to the production HTTPS apex while preserving path/query.
- [ ] Confirm fingerprinted `/_astro/*` assets return immutable cache headers and the manifest has `application/manifest+json`.
- [ ] Smoke-test all four forms in deployed production; verify Netlify storage, Resend delivery, reply-to, sender display, subject, date/time formatting, and success popup without using real card data.
- [ ] Run Google's URL Inspection live test on the homepage and representative Wedding, Fleet, and Guide pages.
- [ ] Submit `https://chitowntrolley.com/sitemap-index.xml` in the correct Search Console property.
- [ ] Monitor Coverage/Page Indexing, Enhancements, Core Web Vitals, security alerts, and form delivery after launch.

Only after the four blockers and deploy checks pass should the launch status be reconsidered as ready for Search Console submission.
