# Image architecture report

Date: 2026-07-23  
Scope: image inventory, file organization, deduplication, typed references, glob removal, production-output validation, and deferred optimization documentation. No image content, crop, route, page copy, breakpoint, or visible layout was intentionally changed.

## 1. Previous image structure

The current phase began with 69 image files totaling 35,810,308 bytes across three competing locations:

- `src/assets/fleet/` — vehicle galleries plus unrelated Christmas gallery/decor files.
- `public/images/` and `public/uploads/` — ordinary site photography, decor, hero alternates, and certification assets copied directly to every build.
- root `uploads/` — approved hero imports plus working files and many byte-identical copies of public/source assets.

The previous fleet detail implementation eagerly globbed every image below `src/assets/fleet/`. That coupled every vehicle build to Christmas assets, including four unrendered decorative source JPEGs totaling 12,964,988 bytes. The Christmas page used a second eager glob. Public photography bypassed imported metadata, while the approved desktop hero referenced a missing public URL even though its file existed under root `uploads/`.

The earlier audit listed 70 files. The phase baseline is 69 because four root hero variants had already been removed and three certification files had been added since that audit.

## 2. New image structure

```text
src/assets/images/
├── branding/
│   └── certifications/
│       ├── wbenc-certificate.webp
│       ├── wbenc-logo.svg
│       └── women-owned-wordmark.png
├── christmas/
│   ├── decorative/
│   │   ├── corner-wreath.webp
│   │   ├── garland-strand.webp
│   │   ├── garland-strip-alternate.webp
│   │   ├── garland-strip-bottom.webp
│   │   └── sources/
│   │       ├── corner-wreath-source.jpg
│   │       ├── garland-arch-source.jpg
│   │       ├── garland-strand-source.jpg
│   │       └── garland-strip-source.jpg
│   └── gallery/
│       ├── christmas-trolley-01.jpg
│       ├── christmas-trolley-02.jpg
│       ├── christmas-trolley-04.jpg
│       ├── christmas-trolley-05.jpg
│       └── christmas-trolley-06.jpg
├── fleet/
│   ├── coach/
│   │   ├── exterior-rear-dusk.jpg
│   │   └── interior.jpg
│   ├── party-bus/
│   │   └── exterior.jpg
│   ├── sprinter/
│   │   ├── exterior.jpg
│   │   ├── interior-front.jpg
│   │   └── interior-rear.webp
│   └── trolley/
│       ├── afternoon-exterior.png
│       ├── boarding-exterior.png
│       ├── classic-exterior.png
│       ├── front-three-quarter.png
│       ├── front-three-quarter.webp
│       ├── summer-exterior.png
│       └── winter-exterior.jpg
└── home/
    └── hero/
        ├── hero-desktop.png
        ├── hero-desktop-alternate.png
        ├── hero-desktop-alternate.webp
        ├── hero-mobile.png
        └── hero-mobile-alternate.png

public/images/guides/
├── coach-exterior-side-dusk.jpg
├── trolley-christmas-lights.png
└── trolley-interior.webp
```

No empty or generic `misc`/`uploads` folders were introduced. Ownership follows subject: fleet media stays with the vehicle, Christmas media stays with Christmas, and certification media stays with branding.

## 3. Old-to-new path map

The authoritative path-by-path record is [`data/image-migration-map.json`](data/image-migration-map.json). It contains all 69 baseline files, including canonical moves, exact duplicate removals, the manually verified SVG duplicate, and the removed watermarked image.

Canonical path groups:

| Previous location | New location | Decision |
|---|---|---|
| `uploads/heroImg2.png` | `src/assets/images/home/hero/hero-desktop.png` | Approved desktop hero; imported without changing crop |
| `uploads/heroMobileView2.png` | `src/assets/images/home/hero/hero-mobile.png` | Approved mobile hero; imported without changing crop |
| `public/uploads/heroImg.{png,webp}` | `src/assets/images/home/hero/hero-desktop-alternate.{png,webp}` | Retained, not emitted, review required |
| `public/uploads/heroMobileView.png` | `src/assets/images/home/hero/hero-mobile-alternate.png` | Retained, not emitted, review required |
| `src/assets/fleet/Trolley/*` | `src/assets/images/fleet/trolley/*` or one stable Guide URL | Renamed by subject; order preserved explicitly |
| `src/assets/fleet/CoachBus/*` | `src/assets/images/fleet/coach/*` or one stable Guide URL | Renamed by subject; order preserved explicitly |
| `src/assets/fleet/LimoVan/*` | `src/assets/images/fleet/sprinter/*` | Renamed by subject; order preserved explicitly |
| `src/assets/fleet/PartyBus/*` | `src/assets/images/fleet/party-bus/exterior.jpg` | Renamed by subject |
| `src/assets/fleet/ChristmasTrolley/{1,2,4,5,6}-*` | `src/assets/images/christmas/gallery/christmas-trolley-{01,02,04,05,06}.jpg` | Explicit approved display order |
| Christmas decor WebPs | `src/assets/images/christmas/decorative/` | Used cutouts imported; alternate retained for review |
| Christmas decor source JPEGs | `src/assets/images/christmas/decorative/sources/` | Retained outside build graph as upstream sources |
| WBENC/certification files | `src/assets/images/branding/certifications/` | Behavior and wording preserved; approval still blocked |

Thirty byte-identical old copies point to their retained canonical path in the migration map. The root SVG differed from the retained SVG only by a trailing newline and is separately marked `duplicate-removed-manual`.

## 4. Images retained in `public`

Only three files remain in `public`:

- `public/images/guides/coach-exterior-side-dusk.jpg`
- `public/images/guides/trolley-christmas-lights.png`
- `public/images/guides/trolley-interior.webp`

They are the single canonical copies for raw `<figure>` markup inside Markdown articles. Astro does not transform a Markdown image nested inside raw HTML, so these figures require stable URLs to preserve the approved `<figure>/<figcaption>` output and existing article layout. Fleet, service, gallery, and wedding consumers reuse the same typed public-image records; there is no second physical copy.

No favicon, manifest, robots, verification, or downloadable image files existed that required another fixed public path. The existing photo favicon now references the canonical imported trolley asset.

## 5. Shared assets and owners

- Home hero variants: `src/data/site-images.ts`.
- Certification wordmark, certificate, and footer logo: `src/data/site-images.ts`.
- Vehicle card, gallery, service, wedding, general gallery, favicon, and Guide-related vehicle media: `src/data/fleet.ts`.
- Christmas gallery sequence and decorative backgrounds: `src/data/christmas-images.ts`.
- Public/imported URL normalization: `src/utils/images.ts`.

Page-only layout and crop CSS remains in its original page. The data modules own file identity and order, not presentation.

## 6. Fleet image data architecture

`src/data/fleet.ts` now owns the `FleetVehicle` type, all vehicle content previously mixed into `site.ts`, each card image, and each ordered detail gallery.

The homepage and `/fleet/` page reuse the same four vehicle records. `previewCap` preserves the homepage's approved label wording where it differed from the fleet page. No capacity, feature, URL, quote value, or marketing text was invented or changed.

The `SiteImage` union supports imported Astro metadata plus the three documented stable public Guide images. Every renderer receives width and height from the same record.

## 7. Globs removed

Two eager image globs were removed:

1. The broad `/src/assets/fleet/**/*` glob in `src/pages/fleet/[slug].astro`.
2. The Christmas gallery glob in `src/pages/christmas-trolley.astro`.

Both are replaced by explicit typed arrays. Vehicle and Christmas gallery order no longer depends on filesystem sorting, and adding an unrelated file cannot silently add it to a build or gallery.

## 8. Duplicates removed

- 30 files removed after byte-for-byte SHA-256 equality with the retained canonical file.
- 1 SVG copy removed after a text diff confirmed identical content except for a trailing newline.
- Duplicate content removed from `public/uploads/`, root `uploads/`, and the old `src/assets/fleet/` layout.
- Every hash comparison and retained path is recorded in `data/image-migration-map.json`.

The PNG and WebP versions of the trolley front-three-quarter photo remain because they are not byte-identical, are actively used, and this phase did not approve format consolidation or recompression.

## 9. Unused files removed or deferred

Removed:

- `src/assets/fleet/ChristmasTrolley/3-WAYTOGO-Xmas-Trolleys-Chicago.jpg` — a watermarked duplicate already explicitly filtered out of the rendered gallery; repository-wide search found no other use.

Retained as `review-required`:

- Three alternate home hero files.
- Four upstream Christmas decor source JPEGs.
- One alternate garland WebP.

These eight files are organized under clear ownership but are not imported and therefore are not emitted to `dist`. They were not deleted because future approval/source provenance is uncertain.

## 10. Rendering changes

- Hero backgrounds remain CSS backgrounds with the same classes, size, position, overlays, media breakpoint, and desktop/mobile art direction. Only the URL source changed to imported metadata.
- Existing `<img>` classes, loading behavior, decoding behavior, `object-fit`, `object-position`, links, carousel behavior, and gallery order were preserved.
- Intrinsic source dimensions were added to migrated markup.
- Guide covers use the Astro content collection `image()` schema helper.
- Guide body figures retain raw `<figure>`, `<img>`, and `<figcaption>` markup and now include intrinsic dimensions.
- No `<Picture>` conversion, broad format conversion, image compression, or responsive-width generation was performed.
- `PageHero.astro` is unchanged. `fleet.astro` retains its approved structure/CSS; only typed image sources and intrinsic dimensions changed.

## 11. Accessibility findings

- Existing approved alt text was preserved.
- Decorative Christmas backgrounds remain CSS backgrounds on `aria-hidden` elements.
- Duplicate carousel thumbnails retain `alt=""` because the adjacent button provides the accessible control name.
- Informative images retain non-empty alt text.
- The lightbox image is populated dynamically and is the only generated `<img>` without fixed width/height because its source dimensions vary by selected item.
- Certification wording was not revised or expanded.

## 12. Social and certification assets blocked on approval

- No new social image was generated.
- No default Open Graph image was invented; issue `P1-006` remains open.
- WBENC/certification files are organized and behavior is preserved, but authorization, certified entity wording, active dates, and approved logo/version remain blocked on owner documentation under `P0-004`.
- The existing photo favicon is preserved. A dedicated icon set, Apple touch icon, and manifest remain deferred under `P3-001`.

## 13. Validation results

- `npm install`: passed; no dependency was upgraded by this phase.
- `npm run check`: passed with 0 errors, 0 warnings, and 0 hints.
- `npm run build`: passed; all 21 pages generated.
- Local preview: all 20 content routes returned HTTP 200; an unknown route returned the custom 404.
- Generated asset scan: all real local `src`, stylesheet/icon `href`, CSS `url()`, and `srcset` references resolve to files in `dist`.
- Generated output contains 114 `<img>` elements; 113 have intrinsic dimensions. The exception is the dynamically populated lightbox.
- Repository source contains zero `import.meta.glob()` calls and zero legacy `/uploads/` references.
- `PageHero.astro` has no diff. `fleet.astro` retained its approved classes, layout CSS, card order, and link behavior.

Responsive screenshot comparison at 390×844, 768×1024, 1440×900, and 1920×1080 could not be captured because the in-app browser reported no available browser instance. This is reported as unavailable, not treated as a passed visual comparison. Static source preservation, production builds, route preview checks, image dimensions/hashes, and generated-reference checks were used instead.

## 14. Before-and-after measurements

| Measurement | Before | After | Change |
|---|---:|---:|---:|
| Source/public/root image files | 69 | 37 | -32 |
| Total source image bytes | 35,810,308 | 28,621,903 | -7,188,405 |
| Generated `dist` image files | 51 | 29 | -22 |
| Generated `dist` image bytes | 30,229,768 | 10,870,883 | -19,358,885 |
| Total `dist` files | 79 | 57 | -22 |
| Total `dist` bytes | 30,789,276 | 11,432,809 | -19,356,467 |
| Exact duplicate files removed | 0 | 30 | +30 removed |
| Manually verified duplicate files removed | 0 | 1 | +1 removed |
| Conclusively unused files removed | 0 | 1 | +1 removed |
| Canonical image files moved | 0 | 37 | +37 |
| Canonical filenames changed | 0 | 34 | +34 |
| Legacy image reference lines updated | 0 | 60 | +60 |
| Eager image globs | 2 | 0 | -2 |
| Files moved from `public` to imported assets | 0 | 10 | +10 |
| Files intentionally retained in `public` | 25 images | 3 images | -22 |
| Astro-reported build duration | 2.68 s | 1.71 s | -0.97 s |

The `dist` reduction is measured and is primarily the result of removing public duplicates and preventing unrendered decor sources from entering the build. It is not a claim about network transfer, LCP, or field performance.

## 15. Issue status updates

- `P0-003`: resolved — desktop and mobile hero imports build successfully.
- `P1-002`: resolved — eager image globs removed and unrelated decor excluded.
- `P1-011`: deferred — intrinsic dimensions improved; responsive `srcset`/`sizes` optimization remains a separate phase.
- `P2-001`: resolved — canonical architecture and duplicate cleanup completed; uncertain sources retained as review-required.
- `P3-001`: deferred — current favicon preserved; dedicated icon/manifest work needs approved assets.

Original issue descriptions remain intact in `docs/data/issues.json`.

## 16. Remaining image-performance recommendations

1. Capture and approve browser screenshots at all requested viewports when a browser runner is available.
2. After screenshot approval, evaluate Astro `<Image>`/`<Picture>` with explicit `widths` and `sizes` for hero, cards, service rows, galleries, and Guide covers.
3. Measure output quality before consolidating the trolley front-three-quarter PNG/WebP format variants.
4. Decide whether the eight `review-required` alternates/upstream sources should be archived outside the repository or retained.
5. Create a dedicated approved favicon/social-image set only after branding and certification approval.
6. Run Lighthouse and field monitoring before making performance claims.

This phase stops at architecture, deduplication, safe rendering updates, and measured build validation. No redesign, generated imagery, broad compression, full-library format conversion, dependency upgrade, form integration, structured-data expansion, or marketing copy work was started.
