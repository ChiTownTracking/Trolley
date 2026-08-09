# Fleet Filter Implementation Report

## 1. Files inspected

- `src/pages/fleet.astro`
- `src/data/fleet.ts`
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/pages/fleet/[slug].astro`
- `src/pages/guides/index.astro`
- `src/components/Header.astro`
- `src/scripts/netlify-forms.ts`
- `src/utils/paths.ts`
- `package.json`
- `package-lock.json`

Repository searches covered fleet card selectors, fleet fields and slugs, existing filtering, `aria-pressed`, tab/button-group patterns, hidden-state styling, and query-parameter handling.

## 2. Files changed

- `src/data/fleet.ts`
- `src/pages/fleet.astro`
- `src/scripts/fleet-filter.ts` (new)
- `docs/fleet-filter-report.md` (new)

Pre-existing uncommitted changes in `src/pages/fleet.astro` were preserved. A later content update added the White Limo Trolley record and its generated detail route; no package, lockfile, form, or deployment change was required.

## 3. Canonical category type

```ts
export type FleetCategory =
  | 'trolley'
  | 'coach-bus'
  | 'party-bus'
  | 'limo-van';
```

`FleetVehicle` required a new typed `category: FleetCategory` field. `src/data/fleet.ts` remains the canonical fleet source.

## 4. Category assigned to each fleet record

| Existing record | Existing slug | Category |
| --- | --- | --- |
| Classic White Trolley | `classic-white-trolley` | `trolley` |
| White Limo Trolley | `white-limo-trolley` | `trolley` |
| Super Coach Bus | `super-coach-bus` | `coach-bus` |
| Party Bus | `party-bus` | `party-bus` |
| Limo Vans | `limo-vans` | `limo-van` |

All records were unambiguous. The trolley category contains two records; each other category contains one.

## 5. Filter markup

The filter sits immediately below the existing fleet hero and above the existing fleet grid. It contains real `button type="button"` controls in this order: All, Trolley, Coach Bus, Party Bus, Limo Van.

The controls use `role="group"` with a direct `aria-label`, so no visible “Filter fleet” label is rendered. `Trolley` renders with `aria-pressed="true"`; the other four render with `aria-pressed="false"`. The text-only controls have no checkmarks, pill backgrounds, enclosing borders, or rounded cylinder shapes. The active control uses stronger type and a simple underline. Each existing static fleet-card anchor has `data-fleet-card` and one `data-fleet-category` value.

Every fleet card now occupies one row. On wider screens each row uses a bounded, responsive image frame on the left and the existing vehicle details on the right, with a subtle divider and compact outlined CTA. The desktop image frame is capped at 380px tall and uses `object-fit: cover`, preventing portrait sources from expanding the row. At 820px and below, rows stack image-over-content in a bounded 16:10 frame. The concept follows the supplied reference without copying its branding, background pattern, colors, or exact component styling.

## 6. Filtering implementation

`src/scripts/fleet-filter.ts` is imported only by the fleet page and exits safely if its expected elements are missing. It attaches one click listener to each authored button, preserves the original DOM and card order, and toggles the native `hidden` property on non-matching cards. It does not use `innerHTML`, duplicate or rebuild cards, make network requests, or add a client framework.

The Trolley filter is applied when the script loads. All cards are restored when All is selected. A zero-result selection uses the same inline status region to display: “No vehicles are currently listed in this category.”

## 7. Accessibility implementation

- Native buttons provide normal Tab, Enter, and Space behavior.
- `aria-pressed` is updated on every selection.
- The active button uses stronger type plus a persistent underline, so state is not communicated by color alone.
- Existing global `:focus-visible` styling remains in effect.
- Targets have a 44px minimum height, labels do not truncate, and the flex row wraps.
- Native `hidden` removes filtered cards and their links from layout, focus order, and the accessibility tree.
- Before cards are hidden, the script checks whether focus is inside a card that will be hidden and moves focus to the activated filter button when needed.
- The visually hidden status uses `role="status"` and `aria-live="polite"`, preserving announcements without displaying result-count copy in the layout.
- The status is updated once when the default Trolley filter is applied.

## 8. Result-count wording

- All: `Showing all 5 vehicles.`
- Trolley: `Showing 2 trolley vehicles.`
- Coach Bus: `Showing 1 coach bus.`
- Party Bus: `Showing 1 party bus.`
- Limo Van: `Showing 1 limo van.`

The implementation also contains category-specific plural wording for future additional records.

## 9. URL-state decision

URL state was intentionally omitted. It is optional in the brief, while the core interaction does not need route/history changes. This keeps filtering page-local, avoids introducing Back/Forward semantics, and removes any GitHub Pages base-path risk.

## 10. Progressive-enhancement behavior

All five fleet cards are statically rendered without `hidden` in the generated HTML. When JavaScript loads, the default Trolley filter is applied without a reload. With JavaScript disabled, the complete fleet remains visible and all card links work.

## 11. Generated HTML verification

Automated assertions against `dist/fleet/index.html` passed:

- Five filter buttons exist in the required order.
- Every filter control is `type="button"`.
- Initial `aria-pressed` values identify Trolley as the default.
- The labeled button group and polite live status region exist.
- Five static fleet cards exist in canonical fleet order.
- The existing routes remain unchanged and `/fleet/white-limo-trolley/` is added.
- Each card has exactly one valid category.
- No card begins hidden.
- No fleet-card route is duplicated.
- The fleet script is emitted inside the page’s main content.

A DOM-level script harness also exercised All and all four categories. It confirmed correct visible-card sets, `aria-pressed` updates, result wording, focus retention, focus safety, and the unchanged initial fallback.

## 12. Astro check result

`npm run check` passed for 40 files with 0 errors, 0 warnings, and 0 hints.

## 13. Build result

- Node: `v24.14.0` (meets the `>=22.12.0` requirement)
- `npm ci`: passed after the project’s existing dev server was stopped because it held Astro’s native compiler file open
- `npm run build`: passed
- Static pages generated: 22
- `package.json` and `package-lock.json`: unchanged
- Dependencies: not upgraded or changed

## 14. Manual testing status

Code-level, generated-HTML, and DOM-level behavior checks passed. The in-app browser target was unavailable in this session, so screenshots and hands-on responsive review at 320×800, 375×812, 390×844, 430×932, 768×1024, 1024×768, 1440×900, and 1920×1080 remain to be completed in a browser.

The CSS is constrained to the fleet page, uses wrapping flex controls, 44px minimum target height, non-truncating labels, and no fixed group width or horizontal scrolling requirement.

## 15. Remaining blockers

The only remaining blocker is the unavailable in-app browser for manual visual, pointer, and screenshot verification. There are no ambiguous fleet records, build blockers, Astro diagnostics, dependency changes, lockfile changes, route changes, or known implementation blockers.
