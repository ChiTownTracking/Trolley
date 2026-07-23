# Font delivery optimization report

Date: 2026-07-23

## Outcome

Step 3 is complete. Jost and Cormorant Garamond are served from four local,
official WOFF2 files emitted by Astro. The production application has no
Google Fonts stylesheet, preconnect, DNS-prefetch, or font request. All font
faces use `font-display: swap`, and the shared layout preloads only the faces
needed in each route's initial viewport.

This phase did not change typography design, content, images, layout, colors,
forms, JavaScript behavior, routes, dependencies, build tooling, or deployment
configuration.

## Lighthouse baseline

The supplied pre-change production-preview mobile baseline is:

| Measurement | Baseline |
|---|---:|
| Performance | 95 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |
| First Contentful Paint | 2.3 s |
| Largest Contentful Paint | 2.5 s |
| Speed Index | 2.3 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0.004 |
| Total transfer | approximately 364 KiB |

Lighthouse was not rerun in this phase. No score, FCP, LCP, CLS, or transfer
improvement is claimed.

## Previous implementation

`BaseLayout.astro` previously added:

- one stylesheet request to the Google Fonts CSS service;
- one preconnect to the CSS service;
- one preconnect to the Google Fonts asset service; and
- the following family request:
  `Cormorant Garamond` normal 400/500/600 and italic 400, plus `Jost`
  normal 300/400/500 and italic 300.

The supplied network baseline contained three external WOFF2 responses:

| Resource | Transferred bytes |
|---|---:|
| Jost | approximately 26,617 |
| Cormorant Garamond | approximately 23,661 |
| Cormorant Garamond | approximately 37,808 |
| **Total** | **approximately 88,086** |

Inspection of the official stylesheet showed that the Cormorant responses were
separate normal and italic variable faces, not duplicate downloads.

## Complete font-usage inventory

`body` establishes Jost through `--sans`, so declarations which set only
weight or style inherit Jost unless they also select `--serif`. The following
inventory records every direct family assignment and all style exceptions.
Selectors omitted from the direct-family column inherit the surrounding family.

| Family / face | Required weights and styles | Direct selectors and files | Routes/components and viewport use | Previous matching face / synthesis | Usage result |
|---|---|---|---|---|---|
| Jost normal | 300, 400, 500, 600 normal | `body`, `.btn-gold`, `.btn-ghost`, `.field__control` in `src/styles/global.css`; `.nav__link` in `Header.astro`; `.gtab` in `guides/index.astro`; `.gtoc-mobile__head`, `.gart__body`, `.gart__body th` in `guides/[slug].astro`; inherited by all other non-serif text | Every route: top bar, navigation, eyebrow labels, supporting/body text, buttons, fields, cards, footer, guide copy. Normal Jost is above the fold on every route. | Real 300/400/500; 600 was requested by guide active states and homepage `.hero__proudly` but absent from the old family URL, so it could be synthesized. | Used. One normal variable file covers all required weights and removes synthetic 600. |
| Jost italic | 300 italic | `.gart__body blockquote`, `.gart__body figcaption` in `src/pages/guides/[slug].astro` (style exceptions on the Jost guide body) | Guide detail routes only; article content below the initial viewport. | Real 300 italic face was in the old request. | Used, but never preloaded. A single static 300 italic file is smaller than carrying an unused italic variable range. |
| Cormorant Garamond normal | 400, 500, 600 normal | `.h-section`, `.h-page`, `.confirm__mark` in `global.css`; `.brand__name` in `Header.astro`; `.ftr__name` in `Footer.astro`; `.cta__title` in `CtaBand.astro`; `.gcard__title` in `GuideCard.astro`; serif title/text selectors in `about.astro`, `christmas-trolley.astro`, `contact.astro`, `faq.astro`, `fleet.astro`, `fleet/[slug].astro`, `guides/index.astro`, `guides/[slug].astro`, `index.astro`, `privacy-policy.astro`, `reservation.astro`, `services.astro`, `terms-and-conditions.astro`, and `weddings.astro` | Every route: header brand and page/section headings; homepage H1 and page hero headings are above the fold. | Real normal variable face covered 400-600. | Used. One normal variable file covers all required weights. |
| Cormorant Garamond italic | 400, 500 italic | `.grad` in `global.css`; `.hero__for`, `.feature__glyph`, `.quote__text` in `index.astro`; `.step__num` in `weddings.astro` | The homepage hero uses 400 italic above the fold. Page-hero accent spans on most marketing/index routes use italic above the fold. Homepage quote/features and wedding steps are below the fold. Fleet detail and guide detail initial viewports do not use it. | Real 400 italic; `.grad` uses 500 italic, which was not in the old family URL and could be synthesized. | Used. One italic variable file covers 400-500 and removes synthetic 500. Preloaded only on routes whose initial viewport uses it. |

Additional inherited-weight declarations were checked in `TopBar.astro`,
`PageHero.astro`, `Footer.astro`, form pages, cards, legal pages, fleet pages,
guide pages, and all marketing pages. They resolve to one of the four rows
above. No family face is unused. No static normal-weight duplicates are needed,
and no italic face beyond Jost 300 or Cormorant Garamond 400-500 is used.

The family names, fallback stacks, sizes, line heights, letter spacing, text
transforms, and existing selectors were not changed.

## Character coverage

Rendered HTML for all generated routes was inventoried as UTF-8. In addition to
standard English text, it contains `©`, middle dot, multiplication sign,
`ç`, `ñ`, en dash, em dash, curly apostrophes and quotation marks, angle
quotation marks, arrows, a diamond, and an ornamental star.

The official Latin `unicode-range` copied from the CSS API is:

```text
U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD
```

Binary glyph inspection confirmed coverage for standard English, curly
punctuation, apostrophes, en/em dashes, copyright, `ç`, and the `ñ` in
“Quinceañera.” The left/right arrows, diamond, and ornamental star are not in
these Latin font subsets; they continue to render through the unchanged
`serif` or `sans-serif` fallback stacks, as they did with the former Google
Fonts Latin responses. No approved text character is missing.

No custom subsetting, conversion, recompression, or binary modification was
performed.

## Official sources, versions, and licenses

The four files are unmodified Latin WOFF2 assets returned by the official
Google Fonts CSS API for the audited ranges. Repository metadata and binary
metadata were checked:

| Family | Binary version | Verified available axes | Copyright | License |
|---|---:|---|---|---|
| Jost | 3.710 | normal variable 100-900; selected italic static 300 | Copyright 2020 The Jost Project Authors | SIL Open Font License 1.1 |
| Cormorant Garamond | 4.001 | normal and italic variable 300-700 | Copyright 2015 The Cormorant Project Authors | SIL Open Font License 1.1 |

`src/assets/fonts/SOURCES.md` records the official repository, upstream commit,
official CSS asset path, version, copyright, and SHA-256 for every file. The
two local license files were normalized for whitespace and compared with the
current official Google Fonts repository `OFL.txt` files; both comparisons
matched.

## Local files

```text
src/assets/fonts/
├── SOURCES.md
├── LICENSES/
│   ├── cormorant-garamond-OFL.txt
│   └── jost-OFL.txt
├── cormorant-garamond/
│   ├── cormorant-garamond-latin-variable-italic.woff2
│   └── cormorant-garamond-latin-variable-normal.woff2
└── jost/
    ├── jost-latin-300-italic.woff2
    └── jost-latin-variable-normal.woff2
```

| Local WOFF2 | Bytes | SHA-256 |
|---|---:|---|
| `jost-latin-variable-normal.woff2` | 26,576 | `7726a5cd6f3c0e876c028ea2a643d45f7aad4b0f164b70966c669f4a4668f4b9` |
| `jost-latin-300-italic.woff2` | 11,536 | `0bb33af605057337c79e1d8ca6f401e9f9160dea48f5aac81e45ccec81528940` |
| `cormorant-garamond-latin-variable-normal.woff2` | 37,640 | `d80df8ff5aecd299a61549f9e29ab1ed0b9b05f4ea71d50fe978e07d5240b235` |
| `cormorant-garamond-latin-variable-italic.woff2` | 39,260 | `6f2f5c3b1abc3d0bb035a927f66a90ca873f94fc31c4966c8d024142c2036e55` |
| **Four source files** | **115,012** | |

Intentionally excluded: Jost weights below 300 or above 600; Jost italic
weights other than 300; Cormorant Garamond weights below 400 or above 600;
Cormorant italic outside 400-500; static duplicates of variable-covered
weights; non-Latin subsets; and TTF, OTF, EOT, or WOFF formats.

## Local `@font-face` configuration

`src/styles/global.css` defines exactly four non-overlapping faces:

| Family | Style | Declared weight | Display | File |
|---|---|---|---|---|
| Jost | normal | `300 600` | `swap` | normal variable WOFF2 |
| Jost | italic | `300` | `swap` | static italic WOFF2 |
| Cormorant Garamond | normal | `400 600` | `swap` | normal variable WOFF2 |
| Cormorant Garamond | italic | `400 500` | `swap` | italic variable WOFF2 |

All use `format("woff2")` and the verified Latin `unicode-range`. The existing
`--sans` and `--serif` family variables and fallback stacks are unchanged.

No font metric override was added. These are the same official family binaries
formerly selected by the CSS API, and there was no measured evidence supporting
a `size-adjust`, ascent, descent, or line-gap override. Guessing one would risk
changing wrapping and CLS.

## Preload decisions

`BaseLayout.astro` imports font files with Astro's `?url` handling so preload
and CSS resolve to the same hashed production assets.

| Route class | Preloaded faces | Reason |
|---|---|---|
| Homepage and marketing/index routes | Jost normal; Cormorant Garamond normal; Cormorant Garamond italic | Jost is used by the top bar/navigation/supporting copy/buttons, normal Cormorant by branding and the hero heading, and italic Cormorant by the homepage/page-hero accent in the initial viewport. |
| Fleet detail routes | Jost normal; Cormorant Garamond normal | Initial navigation/body and vehicle heading use these faces; no initial italic serif text is present. |
| Guide detail routes | Jost normal; Cormorant Garamond normal | Initial navigation/article title and metadata use these faces; Jost italic article content is below the fold and Cormorant italic is not used in the initial viewport. |

Jost italic is deliberately never preloaded. There are no duplicate preloads
and no separate weight preloads because the normal variable files cover their
required ranges.

Homepage production HTML has three font preloads totaling 103,476 source bytes:
26,576 bytes Jost normal, 37,640 bytes Cormorant normal, and 39,260 bytes
Cormorant italic. Fleet and guide detail HTML each have two font preloads.
Every link has `as="font"`, `type="font/woff2"`, and
`crossorigin="anonymous"`.

The three homepage preload URLs exactly equal three `@font-face` `src` URLs.
All four CSS font URLs resolve to one emitted file each, and every emitted file
exists. No font is emitted twice under different URLs.

## Removed external runtime dependencies

Removed from `BaseLayout.astro`:

- the external Google Fonts stylesheet;
- both Google Fonts preconnects; and
- the external stylesheet's implicit font-request chain.

There was no Google Fonts `@import`, DNS-prefetch, page-specific duplicate
loader, font JavaScript, or runtime injection to retain.

Scan results:

| Scope | CSS service matches | asset service matches |
|---|---:|---:|
| Application runtime source (`src`) | 0 | 0 |
| Built production output (`dist`) | 0 | 0 |

Historical audit evidence in `docs/astro-site-audit.md` and the preserved
original P2-003 issue evidence still names the former services. Those
documentation-only references cannot create runtime requests.

## Before and after measurements

| Measurement | Before | After |
|---|---:|---:|
| External font stylesheets | 1 | 0 |
| External font files on supplied homepage trace | 3 | 0 |
| External WOFF2 transferred bytes | approximately 88,086 | 0 |
| Homepage local font preload candidates | 0 | 3 |
| Homepage local WOFF2 response bytes | 0 | 103,476 |
| Local WOFF2 files in source | 0 | 4 |
| WOFF2 files emitted to `dist` | 0 | 4 |
| Total bytes for all local WOFF2 files | 0 | 115,012 |
| Homepage font preloads | 0 | 3 |
| Fleet/guide detail font preloads | 0 | 2 |

The new browser transfer size was not measured because the automated browser
connection was unavailable. The after byte counts above are exact file/HTTP
response sizes, not a claim of a smaller browser transfer. The benefit verified
in this phase is removal of the external DNS, connection, stylesheet, and font
request chain.

The build emitted these four files:

```text
_astro/cormorant-garamond-latin-variable-italic.C-nL33vl.woff2  39,260
_astro/cormorant-garamond-latin-variable-normal.CUoBjw-S.woff2  37,640
_astro/jost-latin-300-italic.D89ryfiO.woff2                      11,536
_astro/jost-latin-variable-normal.ObQm3Zd1.woff2                26,576
```

## Production validation

- `npm install`: passed and reported packages up to date; no dependency upgrade
  was performed. The existing audit report still notes one high-severity
  finding, which is outside this phase.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build`: passed; 21 HTML pages generated (20 content routes plus
  `404.html`).
- Astro-reported build duration: 1.54 s.
- Total `dist` size: 10,136,976 bytes.
- Preview base path: `/Trolley/`.
- Preview routes: all 20 expected content routes returned HTTP 200.
- Fonts: all four emitted WOFF2 URLs returned HTTP 200 with
  `Content-Type: font/woff2`; response bytes totaled 115,012.
- References: 724 built internal references, 61 unique URLs, 0 broken.
- Production HTML contains no external stylesheet.
- Production CSS contains exactly four `@font-face` declarations.

The mobile hero remains 94,004 bytes. Its production preload is unchanged:

```html
<link rel="preload" as="image"
  href="/Trolley/_astro/hero-mobile.CgE5Bp8b_Z1FD1nh.webp"
  type="image/webp" media="(max-width: 768px)" fetchpriority="high">
```

The homepage still has four fleet-card images; all four retain `srcset`,
`sizes`, WebP output, and lazy loading. `PageHero.astro` and `fleet.astro`
were not modified during this phase.

## Visual validation and remaining manual testing

The connected in-app browser was unavailable, so automated Network-panel
capture and responsive screenshot comparison could not be performed. This
means transfer priority/initiator, cache-disabled network transfer size, actual
font rendering with external traffic blocked, line-by-line wrap comparison, and
visual CLS remain manual checks.

Manual review remains required at:

```text
320x800, 375x812, 390x844, 412x915, 430x932,
768x1024, 1024x768, 1440x900, 1920x1080
```

Review the logo and “TROLLEY” branding, desktop/mobile navigation, hero
eyebrow/H1/supporting text/buttons, form labels and controls, section and fleet
card headings, body copy, italics, footer columns, copyright line, text
wrapping, clipping, button width, hero height, and accented characters.

Static and HTTP verification is conclusive for delivery: the face names and
typography selectors are unchanged, every local font URL resolves, matching
weights/styles are present, key text glyphs exist, fallback-only symbols retain
their former stacks, and the built application contains no external font
dependency. It cannot replace the outstanding manual visual sign-off.

## Issue status

`docs/data/issues.json` P2-003 is resolved. Its original title, description,
and evidence are preserved; only its status and font-delivery status note were
updated.

## Next recommended performance step

Rerun mobile Lighthouse against the production preview and complete the manual
responsive/font Network-panel review before approving another performance
phase. Do not attribute a score or metric change to self-hosting until that
measurement exists.
