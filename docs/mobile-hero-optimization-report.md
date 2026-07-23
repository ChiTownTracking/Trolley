# Mobile homepage hero optimization report

Date: 2026-07-23  
Scope: Step 1 only — optimize the mobile homepage hero and improve its discovery priority without changing its design, source artwork, desktop behavior, or any other asset class.

## Lighthouse baseline

The supplied production-preview mobile Lighthouse baseline was:

- Performance: approximately 71
- First Contentful Paint: approximately 2.6 seconds
- Largest Contentful Paint: approximately 19.4 seconds
- Mobile hero transfer: approximately 2.08 MB
- Estimated mobile hero savings: approximately 1.85 MB
- LCP element: homepage hero
- Discovery: CSS background
- Fetch priority: no high-priority hint

Lighthouse was not rerun because no browser instance was available. This report does not claim an LCP, FCP, or Lighthouse-score improvement.

## Original source

| Property | Value |
|---|---|
| Canonical source | `src/assets/images/home/hero/hero-mobile.png` |
| Format | PNG |
| Dimensions | 941 × 1455 |
| File size | 2,124,795 bytes (2.026 MiB) |
| SHA-256 before and after | `7734676d11b3b0f229da8676a6f067a90be2dba05092007efebb46aa1eb44026` |

The original remains the canonical imported source. It was not overwritten, deleted, renamed, cropped, enlarged, or edited.

## Output-width calculation

The existing mobile art-direction rule is `@media (max-width: 768px)`. A literal 2× rendition at that breakpoint would require 1536 physical pixels, but the approved source is only 941 pixels wide and must not be upscaled. The supplied visual-review range tops out at 430 CSS pixels; 430 × 2 is 860 physical pixels. The Lighthouse-sized 390 CSS pixel viewport requires 780 physical pixels at 2×.

The selected width is 900 pixels. It:

- Covers the widest requested 430px mobile viewport at slightly more than 2×.
- Stays below the 941px source width, so there is no enlargement.
- Stays inside the requested general 900–960px output range.
- Leaves the original aspect ratio intact, producing 900 × 1392.

At widths approaching the 768px breakpoint, the approved source itself cannot provide a true 2× rendition. A larger result would only upscale source pixels, which this step explicitly forbids.

## Compression trial and selected output

The required first trial was WebP quality 78 at 900px width.

| Trial/output | Dimensions | Quality | Size |
|---|---:|---:|---:|
| Local quality review trial | 900 × 1392 | 78 | 93,892 bytes |
| Astro production output | 900 × 1392 | 78 | 94,004 bytes (91.80 KiB) |

Quality 78 was already below the 350 KB maximum, so quality 74 and 70 were not tested. Side-by-side inspection of the source and trial showed no obvious color shift, stretching, or visible blockiness around the trolley, building, foliage, sky, and paving edges.

Compared with the canonical PNG, the generated production WebP saves 2,030,791 bytes, a 95.58% reduction. This is the measured hero-resource reduction, not a measured complete-page transfer or LCP improvement.

## Astro implementation

`src/pages/index.astro` calls `getImage` from `astro:assets` with the canonical imported mobile source:

```ts
const mobileHero = await getImage({
  src: siteImages.homeHero.mobile,
  width: 900,
  format: 'webp',
  quality: 78,
});
```

The resulting `mobileHero.src` is assigned to the existing `--hero-mobile` inline custom property. The hero remains a CSS background. No hero selectors, breakpoint, height, crop, `background-size`, `background-position`, overlay, typography, spacing, animation, or desktop CSS declaration changed.

The desktop hero continues to use its existing imported PNG and production URL:

`/Trolley/_astro/hero-desktop.CbIdyvXd.png`

The desktop asset still emits at 2,243,742 bytes. No desktop preload was added.

## Preload implementation

`src/layouts/BaseLayout.astro` has one small, typed, optional `mobileHeroPreload` property. Only the homepage passes it. The generated homepage contains exactly one image preload:

```html
<link
  rel="preload"
  as="image"
  href="/Trolley/_astro/hero-mobile.CgE5Bp8b_Z1FD1nh.webp"
  type="image/webp"
  media="(max-width: 768px)"
  fetchpriority="high"
>
```

The production hero style contains:

```html
--hero-mobile: url('/Trolley/_astro/hero-mobile.CgE5Bp8b_Z1FD1nh.webp')
```

The preload `href` and CSS background URL are byte-for-byte identical. The URL includes the configured `/Trolley/` base path.

## Production request and asset verification

- Optimized WebP exists in `dist/_astro/` at 94,004 bytes.
- Production homepage contains one mobile hero preload.
- Preload has `type="image/webp"`, `media="(max-width: 768px)"`, and `fetchpriority="high"`.
- Homepage contains two references to one unique optimized URL: one preload and one CSS background.
- Homepage contains zero references to a `hero-mobile` PNG.
- No separate original/optimized mobile URL pair is present.
- Local production preview returned HTTP 200 and `image/webp` for the optimized asset.
- Desktop hero PNG still emits and no desktop preload was introduced.

An actual browser Network panel was unavailable, so request coalescing could not be observed directly. The generated request graph has one unique mobile hero URL and no reference that can request the original mobile PNG.

## Visual validation

The canonical source and quality-78 derivative were visually inspected directly. Composition, aspect ratio, color, and high-contrast detail remained consistent.

Automated viewport screenshots were not available because the in-app browser reported no browser instance. Manual browser comparison remains required at:

- 320 × 800
- 375 × 812
- 390 × 844
- 412 × 915
- 430 × 932
- 768px wide
- 769px wide

The manual review should confirm apparent trolley position, crop, overlay darkness, text readability, hero/CTA placement, absence of stretching or compression artifacts, and desktop selection one pixel above the breakpoint. Static inspection confirms the relevant CSS declarations are unchanged.

## Validation results

- `npm install`: passed; dependencies were already up to date and none were upgraded. npm reported one existing high-severity audit finding, which was not changed in this scoped task.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build`: passed; all 21 pages generated.
- Astro-reported build duration: 1.62 seconds. The latest documented pre-step build was 1.71 seconds; this small single-run difference is normal build variance, not a performance claim.
- Build command wall time: 2.914 seconds.
- `npm run preview`: production output served successfully.
- Route preview: all 20 content routes, including the homepage, returned HTTP 200.
- Unknown route: returned HTTP 404.
- Optimized mobile hero: returned HTTP 200 under `/Trolley/`.
- Generated reference scan: 761 local references, 60 unique local URLs, and 0 missing targets.
- `PageHero.astro`: unchanged.
- `src/styles/global.css`: unchanged.
- Original mobile source hash: unchanged after build.

No dedicated mobile-hero issue exists in `docs/data/issues.json`, so no audit issue status was changed. The broader responsive-image issue `P1-011` remains deferred because this step intentionally did not optimize the rest of the image library.

## Remaining review and next step

Complete the manual viewport comparison above before proceeding. After visual approval, the next isolated performance task should be responsive fleet-card images. Desktop-hero, font, gallery, Christmas, branding, favicon, social-image, JavaScript, and broader CSS optimization remain outside this step.
