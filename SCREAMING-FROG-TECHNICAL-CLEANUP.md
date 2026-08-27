# Screaming Frog Technical Cleanup

## Baseline

- 148 internal URLs in the supplied crawl: 24 indexable HTML pages, 8 canonicalized vehicle-query HTML variants, 104 images, 11 CSS files, and the expected HTTP-to-HTTPS redirect.
- Healthy signals preserved: no broken internal URLs, duplicate indexable titles/descriptions/H1s, duplicate HTML hashes, conflicting canonicals, or blocked rendering resources.

## Problems fixed

### Vehicle-query crawl variants

- Three source patterns produced 12 generated CTA anchors representing 8 unique `?vehicle=` values: fleet-detail CTAs, Wedding page CTAs, and Christmas Trolley CTAs.
- All now use `/#vehicle=<encoded option>` rather than a query string.
- The homepage script reads the decoded fragment with `URLSearchParams`, accepts only an existing vehicle `<option>`, ignores invalid values, scrolls a valid selection to the quote form, and reapplies valid values on `hashchange` for back/forward navigation.
- Old external query links remain functional as a compatibility fallback and retain the clean homepage canonical.
- Generated result: 8 unique vehicle-query crawl URLs before, 0 after; all 8 fragment values match real select options.

### Title elements

| Route | Before | After |
| --- | --- | --- |
| `/guides/how-many-guests-fit-in-a-trolley/` | How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide — ChiTown Trolley Guides | Trolley Capacity Guide for Weddings \| ChiTown Trolley |
| `/guides/wedding-day-shuttle-logistics-timeline/` | Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation — ChiTown Trolley Guides | Wedding Shuttle Timeline Guide \| ChiTown Trolley |
| `/guides/` | Guides & Inspiration — Wedding & Event Transportation Tips \| ChiTown Trolley | Wedding Transportation Guides \| ChiTown Trolley |
| `/guides/chicago-trolley-friendly-wedding-venues/` | Chicago's Most Trolley-Friendly Wedding Venues — ChiTown Trolley Guides | Chicago Trolley-Friendly Wedding Venues \| ChiTown Trolley |
| `/lake-geneva-wisconsin-trolley-rental/` | Lake Geneva, WI Trolley Rental \| Weddings & Events \| ChiTown Trolley | Lake Geneva Trolley Rental \| Weddings & Events \| ChiTown Trolley |
| `/about/` | About ChiTown Trolley \| Women-Owned Chicago Trolley Company | Women-Owned Chicago Trolley Company \| ChiTown Trolley |

Guide display titles and H1s were not changed. Optional SEO-only title fields were added to the guide schema.

### Meta descriptions

| Route | Before | After |
| --- | --- | --- |
| `/guides/wedding-day-shuttle-logistics-timeline/` | How to build a transportation timeline that actually holds up on the day — hotel pickups, ceremony-to-reception shuttles, and return trips guests won't stand around waiting for. | Plan wedding transportation with a practical shuttle timeline for hotel pickup, ceremony and reception transfers, and guest return trips. |
| `/guides/chicago-trolley-friendly-wedding-venues/` | What actually makes a venue easy to arrive at by trolley — driveway clearance, drop-off zones, and photo backdrops — plus where around Chicagoland to look. | Find Chicago wedding venues that work well for trolley arrivals, with tips for driveway clearance, drop-off zones and photo backdrops. |
| `/reservation/` | Request a reservation for your Chicago wedding or event. Share your contact, trip and vehicle details so ChiTown Trolley can confirm availability and pricing. | Request a Chicago wedding or event reservation. Share your trip and vehicle details so ChiTown Trolley can confirm availability and pricing. |

Guide cards continue to use their original excerpts; only search-result metadata changed.

### Internal crawl depth

- Added four contextual links in the existing Services fleet comparison to the Super Coach Bus, Party Bus, Limo Vans, and Executive Van detail pages.
- Every fleet detail page remains directly reachable from `/fleet/`; no footer link block or sitewide link expansion was added.

### Image delivery

Three above-fold CSS heroes were downloading full source PNGs without a responsive choice. They now use the existing Astro image pipeline, desktop/mobile WebP outputs, media-specific preloads, and fixed-height hero containers:

| Page | Before | Desktop WebP | Mobile WebP |
| --- | ---: | ---: | ---: |
| Services | 1,548.2 KB PNG | 35.4 KB | 13.8 KB |
| Weddings | 2,431.5 KB PNG | 232.7 KB | 79.6 KB |
| Christmas Trolley | 2,160.3 KB PNG | 175.5 KB | 58.7 KB |

The generated hero images were visually inspected and retained their source composition and detail.

No other fleet, Lake Geneva, gallery, or homepage image code was changed. Their `sizes`, width candidates, WebP formats, lazy-loading behavior, and explicit image dimensions fit the rendered layouts. The larger remaining files are high-DPR candidates or fullscreen/lightbox assets; shrinking them would reduce intended photography quality without evidence of routine over-delivery.

## Things intentionally not changed

- No image or CSS `noindex` headers; `/_astro/` remains crawlable.
- No robots parameter rule, `nofollow` workaround, or per-vehicle redirect set.
- No route rename, new city/service-area page, Lake Geneva body rewrite, legal-page `noindex`, canonical change, or manual sitemap edit.
- The production `http://chitowntrolley.com/` → `https://chitowntrolley.com/` 301 remains in place and was rechecked against production.
- The crawl export containing the single externally blocked URL was not supplied. The only tracking host in generated HTML is `www.googletagmanager.com`; downstream Google Ads/DoubleClick requests are third-party and were intentionally left unchanged.

## Validation results

- Astro check: 0 errors, 0 warnings; 1 pre-existing TypeScript hint in `src/pages/reservation.astro`.
- Production build: successful; 25 HTML files generated (24 indexable routes plus the noindex 404) and 395 optimized image outputs.
- Generated crawl/preview: 447 unique page/resource requests, 0 unexpected non-200 responses, 0 broken internal HTML links, 0 broken assets, and 0 broken fragments.
- Duplicate checks: 0 duplicate indexable titles, 0 duplicate descriptions, and 0 duplicate H1s.
- Canonicals: exactly one self-referencing clean HTTPS canonical on all 24 indexable pages; no canonical on the 404.
- Sitemap: 24 clean indexable URLs; Lake Geneva present; no query URLs, fragments, redirects, 404, or noindex pages.
- Robots: 200 in production and preview; `/` and rendering resources allowed; production sitemap listed.
- Unknown preview URL: actual HTTP 404, custom 404 content, `noindex,follow`, and no canonical.
- External legacy `?vehicle=` preview request: HTTP 200 with the clean homepage canonical.
- Production verification: HTTPS homepage 200; HTTP homepage 301 to the exact HTTPS homepage.

## Remaining crawl checks

- Run a fresh Screaming Frog crawl after deployment to confirm the production crawler discovers 0 internal vehicle-query variants and to record rendered title/description widths.
- Inspect the external blocked URL column in that crawl to identify its exact third-party domain; it is not present in the supplied text baseline.
- Interactive in-app browser testing was unavailable in this session. The production preview was validated over HTTP, all fragment values were checked against live form options, and the three new image outputs were visually inspected.
