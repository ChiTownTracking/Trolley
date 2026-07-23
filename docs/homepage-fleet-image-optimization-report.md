# Homepage fleet image optimization report

Date: 2026-07-23  
Scope: Step 2 only — responsive Astro image delivery for the four cards in the homepage fleet grid. The hero, fleet detail/list pages, other homepage images, fonts, logos, certification assets, content, CSS, and application behavior were not changed.

## Lighthouse baseline

The supplied production-preview mobile Lighthouse baseline was:

- Performance: 76
- First Contentful Paint: 1.4 seconds
- Largest Contentful Paint: 6.8 seconds
- Speed Index: 1.4 seconds
- Total Blocking Time: 0 milliseconds
- Cumulative Layout Shift: 0.006
- Total transfer: approximately 2,061 KiB
- Image transfer: approximately 1,893 KiB
- Estimated responsive-image savings: approximately 1,673 KiB
- Estimated LCP savings from image delivery: approximately 3.6 seconds

Lighthouse was not rerun because the in-app browser had no available browser session. No Lighthouse, LCP, FCP, or total-page transfer improvement is claimed in this report.

## Files changed

- `src/pages/index.astro`
- `docs/homepage-fleet-image-optimization-report.md`

`src/data/fleet.ts` remains the canonical source of vehicle records and image imports. It was not changed. `src/components/PageHero.astro`, `src/pages/fleet.astro`, `src/layouts/BaseLayout.astro`, and all CSS were not edited in this step.

## Canonical sources

| Card | Canonical source | Format | Dimensions | Original size |
|---|---|---:|---:|---:|
| Classic White Trolley | `src/assets/images/fleet/trolley/classic-exterior.png` | PNG | 555 × 327 | 112,238 bytes |
| Super Coach Bus | `src/assets/images/fleet/coach/exterior-rear-dusk.jpg` | JPEG | 1100 × 733 | 410,400 bytes |
| Party Bus | `src/assets/images/fleet/party-bus/exterior.jpg` | JPEG | 1000 × 800 | 261,194 bytes |
| Limo Vans | `src/assets/images/fleet/sprinter/exterior.jpg` | JPEG | 1200 × 800 | 1,017,719 bytes |

All four SHA-256 hashes matched their pre-change values after the final build. No source was overwritten, renamed, deleted, cropped, resized, or otherwise edited.

## Grid and responsive-width calculation

The existing homepage geometry is:

- `.wrap`: 1100px maximum border-box width.
- Desktop: three equal columns with two 32px gaps.
- Tablet at 900px and below: two equal columns with one 32px gap.
- Mobile at 640px and below: one column.
- Global horizontal wrapper padding: 10px through 768px and 28px above 768px.
- Featured trolley above 640px: a full-row card with a 2.2fr/1fr image/content split.
- Standard card image height: 260px.
- Featured mobile media minimum height: 240px.

The standard cards need no more than about 327 CSS pixels on a wide desktop, 406 CSS pixels near the two-column 900px boundary, and 410 CSS pixels at the requested 430px mobile viewport. A 900px maximum derivative covers the widest useful slot at approximately 2× without retaining the full 1000–1200px sources.

The trolley source is only 555px wide. Its variants are capped at the source width to prevent enlargement, even though the featured desktop slot can be wider.

Generated widths:

- Classic White Trolley: 384, 512, 555
- Super Coach Bus: 384, 512, 768, 900
- Party Bus: 384, 512, 768, 900
- Limo Vans: 384, 512, 768, 900

An initial build revealed that leaving the fallback width implicit made Astro create an additional full-source fallback for the three large images. Explicit 555px and 900px fallback widths removed those unnecessary 1000–1200px derivatives.

## `sizes` expressions

Featured trolley:

```text
(max-width: 640px) calc(100vw - 20px),
(max-width: 768px) calc(68.75vw - 13.75px),
(max-width: 1100px) calc(68.75vw - 38.5px),
718px
```

Standard cards:

```text
(max-width: 640px) calc(100vw - 20px),
(max-width: 768px) calc(50vw - 26px),
(max-width: 900px) calc(50vw - 44px),
(max-width: 1100px) calc(33.333vw - 40px),
327px
```

These values are algebraic representations of the existing wrapper padding, grid gaps, column counts, maximum wrapper width, and featured 2.2fr/1fr split. No CSS was changed to accommodate the generated images.

## Astro implementation

The existing fleet records continue to provide `src`, alt text, slug, name, capacity label, and ordering. Only the two existing homepage `<img>` templates were replaced with Astro `<Image>`:

- `format="webp"`
- `quality={78}`
- `loading="lazy"`
- `decoding="async"`
- Existing `fleetp__img` class
- Existing vehicle name alt text
- Explicit responsive widths and accurate `sizes`

No AVIF, preload, eager loading, high-priority hint, JavaScript lazy loader, duplicate fleet database, or third-party image dependency was added.

## Generated variants

All sizes below are exact production `dist` file sizes.

| Card | 384w | 512w | 555w | 768w | 900w |
|---|---:|---:|---:|---:|---:|
| Classic White Trolley | 21,306 B | 33,870 B | 39,468 B | — | — |
| Super Coach Bus | 9,004 B | 13,382 B | — | 25,532 B | 33,090 B |
| Party Bus | 12,832 B | 20,930 B | — | 44,352 B | 58,516 B |
| Limo Vans | 22,412 B | 41,782 B | — | 98,668 B | 140,216 B |

All variants use WebP quality 78. Direct source/derivative inspection showed no obvious color shift, stretching, squashing, or visible compression artifacts, so no quality exception or lower setting was needed.

## Expected Lighthouse mobile selection

The supplied audit reports card slots around 380 CSS pixels. With a Lighthouse-style mobile device pixel ratio of approximately 1.75, the requested physical width is about 665px:

- Standard cards select the next available 768w candidate.
- The trolley selects its source-capped 555w candidate.

If a future test uses DPR 1, the same `sizes`/`srcset` allows the browser to select 384w instead. Browser selection could not be observed directly because no browser session was available.

| Card | Baseline transfer | Expected candidate | Expected mobile transfer | Reduction |
|---|---:|---:|---:|---:|
| Classic White Trolley | 112,238 B | 555w | 39,468 B | 64.84% |
| Super Coach Bus | 410,400 B | 768w | 25,532 B | 93.78% |
| Party Bus | 261,194 B | 768w | 44,352 B | 83.02% |
| Limo Vans | 1,017,719 B | 768w | 98,668 B | 90.30% |
| **Total** | **1,801,551 B** |  | **208,020 B** | **88.45%** |

The expected candidate sizes meet the requested mobile guidance targets: trolley below 80 KB, coach and party bus below 100 KB, and limo van below 120 KB.

## Original-source and request verification

Each fleet-card `<img>` has a WebP `src`, a WebP-only `srcset`, and no PNG/JPEG candidate. A card therefore requests one selected derivative, not both the original and a derivative. All 15 generated variant URLs returned HTTP 200 with `image/webp`.

Two canonical source URLs remain elsewhere on the homepage:

- Classic trolley in a separate out-of-scope homepage image.
- Coach bus in a separate out-of-scope homepage image.

Those elements were intentionally not changed because this step is limited to the four fleet-card elements. Consequently, a complete-page Network panel may still show the classic and coach originals for those separate consumers; they are not duplicate requests made by the fleet cards. The party-bus and limo-van originals no longer appear in homepage output.

The static mobile image graph, if every lazy image is eventually requested, changes as follows:

| Measurement | Before | After | Change |
|---|---:|---:|---:|
| Unique homepage image resources, including hero and favicon | 10 | 12 | +2 |
| Local image bytes in that graph | 2,118,400 | 1,047,507 | -1,070,893 (-50.55%) |

The unique request count increases because responsive card derivatives are now distinct from the two out-of-scope original-image consumers. `srcset` does not cause every variant to download; the browser selects one candidate per card.

This static graph is not directly comparable to the supplied Lighthouse transfer result because lazy-loading distance, viewport, device pixel ratio, caching, and request timing affect the measured waterfall. An after-change total homepage transfer and total image transfer require the requested Lighthouse rerun.

## Production HTML verification

The production homepage contains exactly four `fleetp__img` elements. Every one has:

- A generated WebP `src`
- A valid width-descriptor `srcset`
- The calculated `sizes`
- Intrinsic `width` and `height`
- `loading="lazy"`
- `decoding="async"`
- `class="fleetp__img"`
- Its unchanged vehicle-name alt text

Additional checks:

- Fleet preloads: 0
- Card order: Classic White Trolley, Super Coach Bus, Party Bus, Limo Vans
- Mobile hero: unchanged at 94,004 bytes
- Mobile hero URL and preload: unchanged
- Desktop hero: unchanged
- `/Trolley/` base path present on all generated URLs

## Build-output measurements

| Measurement | Before Step 2 | After Step 2 | Change |
|---|---:|---:|---:|
| `dist` image files | 29 | 44 | +15 generated variants |
| `dist` image bytes | 8,840,092 | 9,455,452 | +615,360 |
| Astro-reported build duration | 1.62 s | 1.45 s | -0.17 s |

The larger deploy artifact is expected because responsive variants are additional cached files while the canonical originals remain necessary for other routes and out-of-scope consumers. Network transfer improves because each card downloads one much smaller candidate. Build-duration values are single cached runs and are not a performance claim. Final command wall time was 2.649 seconds.

## Validation results

- `npm install`: passed; packages were already current and no dependency was upgraded. npm reported one existing high-severity audit finding, which was outside this task.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build`: passed; 21 pages generated.
- `npm run preview`: passed.
- Route preview: all 20 expected content routes returned HTTP 200.
- Fleet variants: all 15 returned HTTP 200 and `image/webp`.
- Mobile hero: returned HTTP 200 at exactly 94,004 bytes.
- Generated references: 761 local references, 64 unique local URLs, 0 missing targets.
- Fleet-card preloads: 0.
- Internal links and local assets: no missing target detected.
- `PageHero.astro`: not edited.
- `fleet.astro`: not edited.
- Fleet source hashes: unchanged.

The broader audit issue `P1-011` remains deferred because it covers responsive delivery across most rendered images. This homepage-only four-card step does not conclusively resolve that broader issue, so `docs/data/issues.json` was not changed.

## Visual validation and remaining manual testing

The four original sources and expected mobile derivatives were inspected directly. Their aspect ratios and compositions match, and quality 78 showed no obvious color shift or compression damage.

Responsive viewport screenshots could not be captured because the in-app browser had no available session. Manual visual approval remains required at:

- 320 × 800
- 375 × 812
- 390 × 844
- 412 × 915
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1440 × 900
- 1920 × 1080

Review the crop, fixed media heights, card ordering, hover scale, borders, shadows, transitions, and the 640/900px layout changes. Rerun the same Lighthouse mobile test after visual approval. Based on the supplied audit, Google Fonts may be the next bottleneck, but font work must remain a separate measured task.
