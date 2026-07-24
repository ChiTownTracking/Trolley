# CHITOWN TROLLEY homepage crawlable-content audit

Audit date: 2026-07-24  
Audited route: `/` (deployed base-path URL: `/Trolley/`)  
Generated artifact: `dist/index.html`  
Scope: audit only; no homepage or shared source file was changed.

## Method, scope, and classification

The audit traced `src/pages/index.astro` through `src/layouts/BaseLayout.astro`, the shared top bar, header, CTA band, footer, shared data, fleet data, image data, the three guide collection entries, and every inline script that affects homepage state. It then compared those sources with the successfully generated `dist/index.html`.

The project uses npm (`package-lock.json`) and Astro's static output. The relevant existing scripts are `npm run check`, `npm run build`, `npm run dev`, and `npm run preview`.

Verification performed:

- `node --version` → `v24.14.0`
- `npm --version` → `11.9.0`
- `npm run check` → 35 files checked; 0 errors, 0 warnings, 0 hints
- `npm run build` → succeeded; 21 pages generated; sitemap created
- Local `astro preview` request to `http://127.0.0.1:4325/Trolley/` → `200 OK`, `Content-Type: text/html`
- `/robots.txt` and `/Trolley/robots.txt` on the local preview → `404`
- `/Trolley/sitemap-index.xml` on the local preview → `200`
- The in-app browser runtime reported no available browser, so a post-JavaScript browser DOM snapshot could not be captured. Rendered-state findings below are therefore based on the generated HTML plus direct inspection of the exact CSS and JavaScript that ships with it. They are labeled accordingly.

The report uses these classifications:

1. **Visible primary content:** editorial and conversion content normally visible while scrolling the main page.
2. **Visible navigation or boilerplate:** header, navigation, shared CTA, contact, legal, and footer text.
3. **Collapsed or initially hidden content:** present in initial HTML but behind an accordion, dialog, carousel viewport, `hidden`, `inert`, or off-canvas state.
4. **Form and interface text:** controls, options, placeholders, state messages, and action labels.
5. **Accessibility-only text:** alt text and accessible names not visually printed as body copy.
6. **Metadata:** title, description, canonical, social metadata, and related head elements.
7. **Structured data:** JSON-LD, which is machine-readable rather than visible body copy.
8. **Image-related text:** image alt text and CSS-background image findings.
9. **JavaScript-generated content:** nodes or strings created only by the client script.
10. **Non-indexable or unlikely-to-be-indexed content:** CSS-generated symbols, interface-only labels, placeholders, and state text that should not be treated as normal primary copy.

Presence in HTML does not guarantee indexing, ranking use, or a particular search-engine interpretation.

## 1. Page-level SEO elements

| Item | Exact rendered value | Source | Present? | Duplicated? | Obvious issue |
|---|---|---|---:|---:|---|
| Document title | `Chicago Trolley Rental for Weddings & Events \| ChiTown Trolley` | Value: `src/pages/index.astro`; element: `src/layouts/BaseLayout.astro` | Yes | One `<title>`; same wording intentionally mirrored in OG/Twitter fields | No title-tag duplication |
| Meta description | `Book a Chicago trolley rental for weddings, private events and group transportation. Explore the ChiTown Trolley fleet and request a customized quote.` | Value: `src/pages/index.astro`; element: `src/layouts/BaseLayout.astro` | Yes | One standard description; wording mirrored in OG/Twitter fields | No standard-description duplication |
| Canonical | `https://chitowntracking.github.io/Trolley/` | Computed in `src/layouts/BaseLayout.astro` from `Astro.site`, `Astro.url.pathname`, and `withBase()`; site/base in `astro.config.mjs` | Yes | No | Correctly includes configured `/Trolley/` base |
| Meta robots | — | Optional prop in `src/layouts/BaseLayout.astro`; homepage passes none | No | No | Absence means no page-level `noindex`/`nofollow`; it is not an indexing guarantee |
| Viewport | `width=device-width, initial-scale=1` | `src/layouts/BaseLayout.astro` | Yes | No | None |
| Language | `<html lang="en">` | `src/layouts/BaseLayout.astro` | Yes | No | None |
| Charset | `utf-8` | `src/layouts/BaseLayout.astro` | Yes | No | None |
| Open Graph type | `website` | Default in `src/layouts/BaseLayout.astro` | Yes | No | None |
| Open Graph URL | `https://chitowntracking.github.io/Trolley/` | `src/layouts/BaseLayout.astro` | Yes | No | Matches canonical |
| Open Graph title | `Chicago Trolley Rental for Weddings & Events \| ChiTown Trolley` | `src/layouts/BaseLayout.astro`, using homepage title prop | Yes | No duplicate OG tag | Mirrors title as expected |
| Open Graph description | `Book a Chicago trolley rental for weddings, private events and group transportation. Explore the ChiTown Trolley fleet and request a customized quote.` | `src/layouts/BaseLayout.astro`, using homepage description prop | Yes | No duplicate OG tag | Mirrors meta description as expected |
| Open Graph image | — | Optional `image` prop in `src/layouts/BaseLayout.astro`; homepage supplies none | No | No | Social shares have no explicit preview image |
| Twitter card | `summary` | `src/layouts/BaseLayout.astro` | Yes | No | No Twitter image is supplied |
| Twitter title | `Chicago Trolley Rental for Weddings & Events \| ChiTown Trolley` | `src/layouts/BaseLayout.astro` | Yes | No | Mirrors title |
| Twitter description | `Book a Chicago trolley rental for weddings, private events and group transportation. Explore the ChiTown Trolley fleet and request a customized quote.` | `src/layouts/BaseLayout.astro` | Yes | No | Mirrors description |
| Alternate/hreflang | — | No contributing source | No | No | No alternate-language or regional versions declared |
| Favicon | `/Trolley/_astro/front-three-quarter.CM3bobSt.webp`, `type="image/webp"` | `src/layouts/BaseLayout.astro`; asset from `src/data/fleet.ts` | Yes | No | Uses a hashed trolley photo rather than a dedicated icon set; not a crawl blocker |
| Theme color | `#FDFCFA` | `src/layouts/BaseLayout.astro` | Yes | No | None |
| Mobile hero preload | `/Trolley/_astro/hero-mobile.CgE5Bp8b_Z1FD1nh.webp`, media `(max-width: 768px)`, `fetchpriority="high"` | `src/pages/index.astro` and `src/layouts/BaseLayout.astro` | Yes | No | Performance hint, not primary SEO copy |
| Font preloads | Jost normal; Cormorant Garamond normal and italic, all local WOFF2 assets | `src/layouts/BaseLayout.astro` | Yes | No | Not content |
| Generator meta | — | No contributing source | No | No | Not required |

There are no duplicate title, canonical, standard description, OG, or Twitter tags. The repeated title/description strings are intentional field-level mirrors, not duplicate tags of the same type.

## 2. Heading hierarchy

| Order | Level | Exact text | Section | Source file | Visible initially? | Notes |
|---:|---|---|---|---|---|---|
| 1 | H1 | `Chicago Trolley Rental for Weddings & Events` | Hero | `src/pages/index.astro` | Yes | Single primary H1 |
| 2 | H2 | `Request a Chicago trolley rental quote` | Quote | `src/pages/index.astro` | Yes on scroll | Main form heading |
| 3 | H2 | `Online request not sent` | Quote confirmation | `src/pages/index.astro` | No | Server-rendered inside `[hidden]` confirmation state |
| 4 | H2 | `Explore our Chicago trolley and group transportation fleet` | Fleet | `src/pages/index.astro` | Yes on scroll | Section heading |
| 5 | H3 | `Classic White Trolley` | Fleet | `src/data/fleet.ts`, rendered by `src/pages/index.astro` | Yes on scroll | Linked card heading |
| 6 | H3 | `Super Coach Bus` | Fleet | `src/data/fleet.ts`, rendered by `src/pages/index.astro` | Yes on scroll | Linked card heading |
| 7 | H3 | `Party Bus` | Fleet | `src/data/fleet.ts`, rendered by `src/pages/index.astro` | Yes on scroll | Linked card heading |
| 8 | H3 | `Limo Vans` | Fleet | `src/data/fleet.ts`, rendered by `src/pages/index.astro` | Yes on scroll | Linked card heading |
| 9 | H2 | `What clients remember most` | Testimonials | `src/pages/index.astro` | Yes on scroll | Section heading |
| 10 | H2 | `Made for the moments between destinations` | Occasions | `src/pages/index.astro` | Yes on scroll | Section heading |
| 11 | H3 | `Weddings` | Occasions | `src/pages/index.astro` | Yes on scroll | Subsection |
| 12 | H3 | `Private Events` | Occasions | `src/pages/index.astro` | Yes on scroll | Subsection |
| 13 | H3 | `Group Travel` | Occasions | `src/pages/index.astro` | Yes on scroll | Subsection |
| 14 | H3 | `Local Service` | Occasions | `src/pages/index.astro` | Yes on scroll | Subsection |
| 15 | H2 | `Planning your Chicago trolley rental` | FAQ | `src/pages/index.astro` | Yes on scroll | Section heading |
| 16 | H2 | `Chicago event transportation guides` | Guides | `src/pages/index.astro` | Yes on scroll | Section heading |
| 17 | H3 | `How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide` | Guides | `src/content/guides/how-many-guests-fit-in-a-trolley.md`, rendered by `src/components/GuideCard.astro` | Yes on scroll | Linked article title |
| 18 | H3 | `Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation` | Guides | `src/content/guides/wedding-day-shuttle-logistics-timeline.md`, rendered by `src/components/GuideCard.astro` | Yes on scroll | Linked article title |
| 19 | H3 | `Chicago's Most Trolley-Friendly Wedding Venues` | Guides | `src/content/guides/chicago-trolley-friendly-wedding-venues.md`, rendered by `src/components/GuideCard.astro` | Yes on scroll | Linked article title |
| 20 | H2 | `Your date won't wait — let's hold it` | Shared final CTA | `src/components/CtaBand.astro` | Yes on scroll | Outside `<main>`, before footer |
| 21 | H2 | `Follow` | Footer | `src/components/Footer.astro` | Yes on scroll | Small utility-region heading |
| 22 | H2 | `Women-owned business` | Footer | `src/components/Footer.astro` | Yes on scroll | Small utility-region heading |

Heading totals:

- H1: **1**
- H2: **10**
- H3: **11**
- H4: **0**
- H5: **0**
- H6: **0**

Findings:

- There is one clear main H1.
- No heading level is skipped in the rendered hierarchy; H3s follow relevant H2 sections.
- There are no empty or exact duplicate headings.
- The hidden confirmation H2 is legitimate state content, not hidden SEO copy.
- `Follow` and `Women-owned business` are semantically valid footer section labels, but their H2 level makes the document outline look flatter than their small visual/utility role.
- The main content hierarchy generally matches the visual structure.
- The H1 plus the quote and FAQ H2s repeat the exact phrase `Chicago trolley rental`; this is coherent, but the heading set is visibly SEO-forward.

## 3. All visible body copy

### Header and navigation

Classification: visible navigation/boilerplate, except the More submenu and mobile drawer states described in section 8.

- Top bar: `+1 630-624-3448`; `info@chitowntrolley.com`
- Brand: `CHITOWN TROLLEY`
- Primary navigation: `Home`; `Fleet`; `Weddings`; `Christmas Trolley`; `Services`; `Guides`
- Menu control: `More`
- More submenu: `About`; `Gallery`; `FAQ`; `Contact`
- Header CTA: `Reservation`
- Keyboard skip link: `Skip to main content` (visually off-screen until focused)

Sources: `src/components/TopBar.astro`, `src/components/Header.astro`, and `src/data/site.ts`.

### Hero

- H1: `Chicago Trolley Rental for Weddings & Events`
- Paragraph: `Private trolley transportation for celebrations and coordinated group travel throughout Chicago and Chicagoland.`
- Ownership label: `Proudly`
- CTA: `View Trolley`
- Wordmark alt: `WBENC-certified Women Owned business` (accessibility/image text, not visible printed copy)

Source: `src/pages/index.astro`; phone/business image data ultimately comes from `src/data/site.ts` and `src/data/site-images.ts`.

### Quote

- H2: `Request a Chicago trolley rental quote`
- Step headers: `1`; `Step 1 of 3`; `Trip Information`; `2`; `Step 2 of 3`; `Itinerary`; `3`; `Step 3 of 3`; `Personal Info`
- Visible initial action: `Next`
- Pricing paragraph: `Chicago trolley rental prices vary by date, vehicle, rental duration, itinerary and pickup details. Share your plans for a customized estimate.`
- The complete control, option, placeholder, accessibility, and hidden-status inventory is in section 7.

Source: `src/pages/index.astro`, with event, vehicle, and duration options imported from `src/data/site.ts`.

### Fleet

- Eyebrow: `The Fleet`
- H2: `Explore our Chicago trolley and group transportation fleet`
- Paragraph: `Choose the classic white trolley for a wedding or celebration, or compare our additional vehicles for larger group transportation needs.`
- Featured card: `30–36 Passengers`; `Classic White Trolley`; `View Details →`
- Other cards: `Up to 57 guests`; `Super Coach Bus`; `Up to 40 Passengers`; `Party Bus`; `Up to 14 passengers`; `Limo Vans`
- CTA: `Explore the Full Fleet`

Sources: `src/pages/index.astro`, `src/components/Eyebrow.astro`, and `src/data/fleet.ts`.

### Testimonials

- Eyebrow: `Client Reviews`
- H2: `What clients remember most`

| Order | Exact quote | Exact person | Exact role/location | Initial state |
|---:|---|---|---|---|
| 1 | `The trolley was the part of the day our guests wouldn’t stop talking about. Our chauffeur felt like family by the last stop.` | `Maria & James` | `Naperville` | Visible first slide |
| 2 | `Spotless, on time, and the balcony photos between the ceremony and reception are our favorites from the whole album.` | `Priya & Daniel` | `Evanston` | In overflow carousel; rotates into view |
| 3 | `I plan events for a living and I’m picky. This was the easiest vendor I’ve ever worked with, start to finish.` | `Caroline R.` | `Event Planner, Oak Brook` | In overflow carousel; rotates into view |
| 4 | `From the first email to the last stop, everything felt effortless. Our guests are still asking where we found such a beautiful trolley.` | `Sofia & Marcus` | `Hinsdale` | In overflow carousel; rotates into view |
| 5 | `Our chauffeur went out of his way to keep us on schedule between the church and the reception. Truly above and beyond.` | `Emily & Nathan` | `Arlington Heights` | In overflow carousel; rotates into view |
| 6 | `We booked the coach for our out-of-town guests and the trolley for the wedding party — two vehicles, one seamless day.` | `The Delgado Family` | `Oak Park` | In overflow carousel; rotates into view |

The source strings contain a middle-dot separator between person and role/location; `src/pages/index.astro` splits each string and renders the two pieces separately. The quote text and names come from `testimonials` in `src/data/site.ts`.

### Occasions and service uses

- Eyebrow: `Private Trolley Transportation`
- H2: `Made for the moments between destinations`
- Paragraph: `From wedding parties and milestone celebrations to coordinated group outings, ChiTown Trolley keeps everyone together between stops. Share your route, timing and group size, and we will help match your plans with the right vehicle for private transportation throughout Chicago and Chicagoland.`
- H3: `Weddings`
- Paragraph: `Keep the wedding party together between hotels, photo locations, the ceremony and the reception.`
- H3: `Private Events`
- Paragraph: `Plan transportation for birthdays, anniversaries, family celebrations and other private occasions.`
- H3: `Group Travel`
- Paragraph: `Coordinate hotel pickups, venue transfers and multiple destinations with one transportation plan.`
- H3: `Local Service`
- Paragraph: `Work with an owner-operated, licensed and insured, WBENC-certified Women Owned company.`
- CTA: `Plan Your Transportation`

Source: `src/pages/index.astro`; eyebrow markup comes from `src/components/Eyebrow.astro`.

### FAQ

- Eyebrow: `Common Questions`
- H2: `Planning your Chicago trolley rental`

| Order | Exact question | Exact answer | Initial state |
|---:|---|---|---|
| 1 | `How far in advance should I book my trolley?` | `We recommend booking as early as you can — popular Saturdays in wedding season (May through October) and December holiday dates often fill six to twelve months out. That said, it never hurts to ask about a last-minute date; we’ll always check availability for you.` | Question visible; answer collapsed/inert |
| 2 | `What areas do you service?` | `We serve Chicago and the surrounding suburbs, including Naperville, Evanston, Oak Brook, Schaumburg, Orland Park, Arlington Heights, Hinsdale, Lake Forest, and Wheaton. Out-of-state trips are available for our coach charters — just tell us where you’re headed.` | Question visible; answer collapsed/inert |
| 3 | `Is alcohol allowed on board?` | `Yes — guests 21 and over are welcome to bring beverages aboard for private charters, provided everyone drinking is of legal age. We just ask that you let us know in advance so your chauffeur can have the cabin ready.` | Question visible; answer collapsed/inert |
| 4 | `How many passengers can each vehicle hold?` | `Our Classic White Trolley seats 30–36 passengers, the Limo Vans seat up to 14, and the Super Coach Bus holds up to 57. For larger parties, ask about pairing a trolley for the wedding party with a coach for the rest of your guests.` | Question visible; answer collapsed/inert |
| 5 | `Do you require a deposit?` | `A deposit is required to hold your date, with the balance due before the event. Requesting a quote or reservation online places no charge and carries no obligation — we confirm availability first, then walk you through every detail.` | Question visible; answer collapsed/inert |
| 6 | `What happens if our event runs longer than expected?` | `It happens, and we plan for it. If the day’s schedule allows, additional time can often be added on the spot at an hourly rate. We’ll always confirm with you before extending, so there are never any surprises.` | Question visible; answer collapsed/inert |

Questions and answers come from `homeFaqs` in `src/data/site.ts`; markup is in `src/pages/index.astro`.

### Guides

- Eyebrow: `The Journal`
- H2: `Chicago event transportation guides`
- Paragraph: `Practical planning resources for routes, timing, vehicles and group transportation in Chicago.`

| Order | Tag | Exact title | Exact excerpt | Exact rendered date/read time |
|---:|---|---|---|---|
| 1 | `Guides` | `How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide` | `Capacity breakdowns for trolleys, coach buses, and limo vans — plus how to estimate your real guest count needs before you book.` | `June 17, 2026 · 6 min read` |
| 2 | `Guides` | `Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation` | `How to build a transportation timeline that actually holds up on the day — hotel pickups, ceremony-to-reception shuttles, and return trips guests won't stand around waiting for.` | `May 26, 2026 · 7 min read` |
| 3 | `Guides` | `Chicago's Most Trolley-Friendly Wedding Venues` | `What actually makes a venue easy to arrive at by trolley — driveway clearance, drop-off zones, and photo backdrops — plus where around Chicagoland to look.` | `May 4, 2026 · 5 min read` |

- CTA: `View All Guides`

Sources: the three files in `src/content/guides/`, collection definition in `src/content.config.ts`, formatting in `src/data/guides.ts`, and rendering in `src/components/GuideCard.astro`.

The frontmatter dates are respectively June 18, May 27, and May 5, 2026, but the generated homepage displays the preceding dates. `formatGuideDate()` calls `toLocaleDateString()` without fixing a time zone, so date-only values shift to the prior day in the build environment's America/Toronto time zone.

### Shared final CTA and footer

- H2: `Your date won't wait — let's hold it`
- Paragraph: `Call +1 630-624-3448 or request a quote in under two minutes.`
- CTA: `Get a Free Quote`
- Footer brand: `CHITOWN TROLLEY`
- Footer navigation: `Home`; `Fleet`; `Weddings`; `Christmas Trolley`; `Services`; `Guides`; `About`; `Gallery`; `FAQ`; `Contact`
- Contact: `+1 630-624-3448`; `info@chitowntrolley.com`; `1265 Oakton St, Elk Grove Village, IL 60007`
- Social heading and labels: `Follow`; `Instagram`; `Facebook`
- Credential heading: `Women-owned business`
- Service-area paragraph: `Serving Chicago and the surrounding suburbs.`
- Legal: `Privacy Policy`; `Terms and Conditions`
- Copyright: `© 2026 ChiTown Trolley`
- Credential/service phrase: `Licensed & insured · Chicagoland's wedding trolley`

Sources: `src/components/CtaBand.astro`, `src/components/Footer.astro`, and `src/data/site.ts`.

## 4. Paragraph inventory

Word counts use Unicode letter/number tokens; internal apostrophes, hyphens, and en dashes remain within one token. Sentence counts use terminal punctuation; the four capacity `<p>` elements are fragments and therefore have zero full sentences.

| # | Section | Exact text | Words | Sentences | Visible initially? | Imported/shared? | Source | Duplicate? |
|---:|---|---|---:|---:|---|---|---|---|
| 1 | Hero | `Private trolley transportation for celebrations and coordinated group travel throughout Chicago and Chicagoland.` | 13 | 1 | Yes | No | `src/pages/index.astro` | No |
| 2 | Quote | `Chicago trolley rental prices vary by date, vehicle, rental duration, itinerary and pickup details. Share your plans for a customized estimate.` | 21 | 2 | Yes on scroll | No | `src/pages/index.astro` | No |
| 3 | Quote confirmation | `No information was delivered. Online form integration is not configured yet; please use the contact information in the site header or footer.` | 22 | 2 | No; `[hidden]` | No | `src/pages/index.astro` | No |
| 4 | Fleet | `Choose the classic white trolley for a wedding or celebration, or compare our additional vehicles for larger group transportation needs.` | 20 | 1 | Yes on scroll | No | `src/pages/index.astro` | No |
| 5 | Fleet | `30–36 Passengers` | 3 | 0 | Yes on scroll | Yes, fleet data | `src/data/fleet.ts` via `src/pages/index.astro` | No |
| 6 | Fleet | `Up to 57 guests` | 4 | 0 | Yes on scroll | Yes, fleet data | `src/data/fleet.ts` via `src/pages/index.astro` | No |
| 7 | Fleet | `Up to 40 Passengers` | 4 | 0 | Yes on scroll | Yes, fleet data | `src/data/fleet.ts` via `src/pages/index.astro` | No |
| 8 | Fleet | `Up to 14 passengers` | 4 | 0 | Yes on scroll | Yes, fleet data | `src/data/fleet.ts` via `src/pages/index.astro` | No |
| 9 | Occasions | `From wedding parties and milestone celebrations to coordinated group outings, ChiTown Trolley keeps everyone together between stops. Share your route, timing and group size, and we will help match your plans with the right vehicle for private transportation throughout Chicago and Chicagoland.` | 42 | 2 | Yes on scroll | No | `src/pages/index.astro` | No |
| 10 | Occasions | `Keep the wedding party together between hotels, photo locations, the ceremony and the reception.` | 14 | 1 | Yes on scroll | No | `src/pages/index.astro` | No |
| 11 | Occasions | `Plan transportation for birthdays, anniversaries, family celebrations and other private occasions.` | 11 | 1 | Yes on scroll | No | `src/pages/index.astro` | No |
| 12 | Occasions | `Coordinate hotel pickups, venue transfers and multiple destinations with one transportation plan.` | 12 | 1 | Yes on scroll | No | `src/pages/index.astro` | No |
| 13 | Occasions | `Work with an owner-operated, licensed and insured, WBENC-certified Women Owned company.` | 11 | 1 | Yes on scroll | No | `src/pages/index.astro` | No |
| 14 | FAQ | `We recommend booking as early as you can — popular Saturdays in wedding season (May through October) and December holiday dates often fill six to twelve months out. That said, it never hurts to ask about a last-minute date; we’ll always check availability for you.` | 45 | 2 | No; collapsed/inert | Yes, `homeFaqs` | `src/data/site.ts` via `src/pages/index.astro` | No |
| 15 | FAQ | `We serve Chicago and the surrounding suburbs, including Naperville, Evanston, Oak Brook, Schaumburg, Orland Park, Arlington Heights, Hinsdale, Lake Forest, and Wheaton. Out-of-state trips are available for our coach charters — just tell us where you’re headed.` | 37 | 2 | No; collapsed/inert | Yes, `homeFaqs` | `src/data/site.ts` via `src/pages/index.astro` | No |
| 16 | FAQ | `Yes — guests 21 and over are welcome to bring beverages aboard for private charters, provided everyone drinking is of legal age. We just ask that you let us know in advance so your chauffeur can have the cabin ready.` | 39 | 2 | No; collapsed/inert | Yes, `homeFaqs` | `src/data/site.ts` via `src/pages/index.astro` | No |
| 17 | FAQ | `Our Classic White Trolley seats 30–36 passengers, the Limo Vans seat up to 14, and the Super Coach Bus holds up to 57. For larger parties, ask about pairing a trolley for the wedding party with a coach for the rest of your guests.` | 45 | 2 | No; collapsed/inert | Yes, `homeFaqs` | `src/data/site.ts` via `src/pages/index.astro` | No |
| 18 | FAQ | `A deposit is required to hold your date, with the balance due before the event. Requesting a quote or reservation online places no charge and carries no obligation — we confirm availability first, then walk you through every detail.` | 38 | 2 | No; collapsed/inert | Yes, `homeFaqs` | `src/data/site.ts` via `src/pages/index.astro` | No |
| 19 | FAQ | `It happens, and we plan for it. If the day’s schedule allows, additional time can often be added on the spot at an hourly rate. We’ll always confirm with you before extending, so there are never any surprises.` | 40 | 3 | No; collapsed/inert | Yes, `homeFaqs` | `src/data/site.ts` via `src/pages/index.astro` | No |
| 20 | Guides | `Practical planning resources for routes, timing, vehicles and group transportation in Chicago.` | 12 | 1 | Yes on scroll | No | `src/pages/index.astro` | No |
| 21 | Guides | `Capacity breakdowns for trolleys, coach buses, and limo vans — plus how to estimate your real guest count needs before you book.` | 21 | 1 | Yes; visually line-clamped | Yes, frontmatter | `src/content/guides/how-many-guests-fit-in-a-trolley.md` via `src/components/GuideCard.astro` | No |
| 22 | Guides | `How to build a transportation timeline that actually holds up on the day — hotel pickups, ceremony-to-reception shuttles, and return trips guests won't stand around waiting for.` | 26 | 1 | Yes; visually line-clamped | Yes, frontmatter | `src/content/guides/wedding-day-shuttle-logistics-timeline.md` via `src/components/GuideCard.astro` | No |
| 23 | Guides | `What actually makes a venue easy to arrive at by trolley — driveway clearance, drop-off zones, and photo backdrops — plus where around Chicagoland to look.` | 24 | 1 | Yes; visually line-clamped | Yes, frontmatter | `src/content/guides/chicago-trolley-friendly-wedding-venues.md` via `src/components/GuideCard.astro` | No |
| 24 | Shared CTA | `Call +1 630-624-3448 or request a quote in under two minutes.` | 11 | 1 | Yes on scroll | Shared default plus site phone | `src/components/CtaBand.astro`; `src/data/site.ts` | No |
| 25 | Footer | `Serving Chicago and the surrounding suburbs.` | 6 | 1 | Yes on scroll | No | `src/components/Footer.astro` | No |

Paragraph summary:

- Total paragraphs: **25**
- Total paragraph words: **525**
- Average: **21.0 words**
- Shortest: `30–36 Passengers` (**3 words**)
- Longest: a tie between FAQ paragraphs 14 and 17 (**45 words** each)
- One-sentence paragraphs: **12**
- Sentence fragments: **4** (the capacity paragraphs)
- Paragraphs under 15 words: **12**
- Paragraphs over 100 words: **0**
- Exact duplicate paragraphs: **0**

## 5. Links and anchor text

All 46 links below are server-rendered `<a href>` elements.

| # | Exact anchor text | URL | Type | Section | Target | Rel | Source |
|---:|---|---|---|---|---|---|---|
| 1 | `Skip to main content` | `#main-content` | Same-page | Layout | Same tab | — | `src/layouts/BaseLayout.astro` |
| 2 | `+1 630-624-3448` | `tel:+16306243448` | Telephone | Top bar | Default handler | — | `src/components/TopBar.astro`; `src/data/site.ts` |
| 3 | `info@chitowntrolley.com` | `mailto:info@chitowntrolley.com` | Email | Top bar | Default handler | — | `src/components/TopBar.astro`; `src/data/site.ts` |
| 4 | No visible text; accessible name `Visit ChiTown Trolley on Facebook` | `https://www.facebook.com/share/1GhfM5hPmT/?mibextid=wwXIfr` | External | Top bar | `_blank` | `noopener noreferrer` | `src/components/TopBar.astro`; `src/data/site.ts` |
| 5 | No visible text; accessible name `Visit ChiTown Trolley on Instagram` | `https://www.instagram.com/chitowntrolley?igsh=MXZrMnVpbGF4NG5iZg%3D%3D&utm_source=qr` | External | Top bar | `_blank` | `noopener noreferrer` | `src/components/TopBar.astro`; `src/data/site.ts` |
| 6 | `CHITOWN TROLLEY` | `/Trolley/` | Internal | Header logo | Same tab | — | `src/components/Header.astro` |
| 7 | `Home` | `/Trolley/` | Internal | Main nav | Same tab | — | `src/components/Header.astro`; `src/data/site.ts` |
| 8 | `Fleet` | `/Trolley/fleet` | Internal | Main nav | Same tab | — | Same |
| 9 | `Weddings` | `/Trolley/weddings` | Internal | Main nav | Same tab | — | Same |
| 10 | `Christmas Trolley` | `/Trolley/christmas-trolley` | Internal | Main nav | Same tab | — | Same |
| 11 | `Services` | `/Trolley/services` | Internal | Main nav | Same tab | — | Same |
| 12 | `Guides` | `/Trolley/guides` | Internal | Main nav | Same tab | — | Same |
| 13 | `About` | `/Trolley/about` | Internal | More menu | Same tab | — | Same |
| 14 | `Gallery` | `/Trolley/gallery` | Internal | More menu | Same tab | — | Same |
| 15 | `FAQ` | `/Trolley/faq` | Internal | More menu | Same tab | — | Same |
| 16 | `Contact` | `/Trolley/contact` | Internal | More menu | Same tab | — | Same |
| 17 | `Reservation` | `/Trolley/reservation` | Internal | Header CTA | Same tab | — | `src/components/Header.astro`; `src/data/site.ts` |
| 18 | `View Trolley` | `/Trolley/fleet/classic-white-trolley` | Internal | Hero CTA | Same tab | — | `src/pages/index.astro` |
| 19 | `30–36 Passengers Classic White Trolley View Details →` | `/Trolley/fleet/classic-white-trolley` | Internal | Fleet card | Same tab | — | `src/pages/index.astro`; `src/data/fleet.ts` |
| 20 | `Up to 57 guests Super Coach Bus` | `/Trolley/fleet/super-coach-bus` | Internal | Fleet card | Same tab | — | Same |
| 21 | `Up to 40 Passengers Party Bus` | `/Trolley/fleet/party-bus` | Internal | Fleet card | Same tab | — | Same |
| 22 | `Up to 14 passengers Limo Vans` | `/Trolley/fleet/limo-vans` | Internal | Fleet card | Same tab | — | Same |
| 23 | `Explore the Full Fleet` | `/Trolley/fleet` | Internal | Fleet CTA | Same tab | — | `src/pages/index.astro` |
| 24 | `Plan Your Transportation` | `#getquote` | Same-page | Occasions CTA | Same tab | — | `src/pages/index.astro` |
| 25 | `Guides How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide Capacity breakdowns for trolleys, coach buses, and limo vans — plus how to estimate your real guest count needs before you book. June 17, 2026 · 6 min read` | `/Trolley/guides/how-many-guests-fit-in-a-trolley` | Internal | Guide card | Same tab | — | `src/components/GuideCard.astro`; corresponding guide Markdown |
| 26 | `Guides Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation How to build a transportation timeline that actually holds up on the day — hotel pickups, ceremony-to-reception shuttles, and return trips guests won't stand around waiting for. May 26, 2026 · 7 min read` | `/Trolley/guides/wedding-day-shuttle-logistics-timeline` | Internal | Guide card | Same tab | — | Same |
| 27 | `Guides Chicago's Most Trolley-Friendly Wedding Venues What actually makes a venue easy to arrive at by trolley — driveway clearance, drop-off zones, and photo backdrops — plus where around Chicagoland to look. May 4, 2026 · 5 min read` | `/Trolley/guides/chicago-trolley-friendly-wedding-venues` | Internal | Guide card | Same tab | — | Same |
| 28 | `View All Guides` | `/Trolley/guides` | Internal | Guides CTA | Same tab | — | `src/pages/index.astro` |
| 29 | `Get a Free Quote` | `/Trolley/contact` | Internal | Shared CTA | Same tab | — | `src/components/CtaBand.astro` |
| 30 | `CHITOWN TROLLEY` | `/Trolley/` | Internal | Footer logo | Same tab | — | `src/components/Footer.astro` |
| 31 | `Home` | `/Trolley/` | Internal | Footer nav | Same tab | — | `src/components/Footer.astro`; `src/data/site.ts` |
| 32 | `Fleet` | `/Trolley/fleet` | Internal | Footer nav | Same tab | — | Same |
| 33 | `Weddings` | `/Trolley/weddings` | Internal | Footer nav | Same tab | — | Same |
| 34 | `Christmas Trolley` | `/Trolley/christmas-trolley` | Internal | Footer nav | Same tab | — | Same |
| 35 | `Services` | `/Trolley/services` | Internal | Footer nav | Same tab | — | Same |
| 36 | `Guides` | `/Trolley/guides` | Internal | Footer nav | Same tab | — | Same |
| 37 | `About` | `/Trolley/about` | Internal | Footer nav | Same tab | — | Same |
| 38 | `Gallery` | `/Trolley/gallery` | Internal | Footer nav | Same tab | — | Same |
| 39 | `FAQ` | `/Trolley/faq` | Internal | Footer nav | Same tab | — | Same |
| 40 | `Contact` | `/Trolley/contact` | Internal | Footer nav | Same tab | — | Same |
| 41 | `+1 630-624-3448` | `tel:+16306243448` | Telephone | Footer | Default handler | — | `src/components/Footer.astro`; `src/data/site.ts` |
| 42 | `info@chitowntrolley.com` | `mailto:info@chitowntrolley.com` | Email | Footer | Default handler | — | Same |
| 43 | `Instagram` | `https://www.instagram.com/chitowntrolley?igsh=MXZrMnVpbGF4NG5iZg%3D%3D&utm_source=qr` | External | Footer | `_blank` | `noopener noreferrer` | Same |
| 44 | `Facebook` | `https://www.facebook.com/share/1GhfM5hPmT/?mibextid=wwXIfr` | External | Footer | `_blank` | `noopener noreferrer` | Same |
| 45 | `Privacy Policy` | `/Trolley/privacy-policy` | Internal | Footer legal | Same tab | — | Same |
| 46 | `Terms and Conditions` | `/Trolley/terms-and-conditions` | Internal | Footer legal | Same tab | — | Same |

Link findings:

- Empty/missing names: **0**. The two icon-only social links have specific `aria-label` names.
- Image-only links: **0**. The hero WBENC image is a button, not a link; guide/fleet links also contain text.
- Vague link wording: `View Details →` is generic in isolation, but it is inside one anchor whose accessible text also includes capacity and `Classic White Trolley`. `View Trolley` is moderately generic but sits in the trolley hero. There is no `Click here` or `Learn more`.
- Duplicate text to different destinations: **0**. Repeated header/footer labels point to the same destinations.
- JavaScript-only links: **0**.
- External `target="_blank"` links missing protective rel: **0**.
- Broken/unresolved internal links found against `dist`: **0**. Both same-page fragments (`#main-content`, `#getquote`) resolve to existing IDs.
- Privacy and terms pages are built and linked, but intentionally excluded from the sitemap by `astro.config.mjs`.
- The social URLs work as href strings, but the Facebook share URL and Instagram query-bearing URL are less canonical entity identifiers than clean profile URLs.

## 6. Image content

The page uses **11 `<img>` elements** and **two responsive CSS hero-background resources** (13 resources total). The header/footer brand itself is text, not an image.

| # | Generated source | Alt text | Dimensions | Loading | Section | Linked? | Source |
|---:|---|---|---|---|---|---|---|
| 1D | `/Trolley/_astro/hero-desktop.CbIdyvXd.png` | N/A — CSS background | Source 1774×887; no HTML dimensions | CSS background, normal page load | Hero desktop | No | `src/assets/images/home/hero/hero-desktop.png`; `src/data/site-images.ts`; `src/pages/index.astro` |
| 1M | `/Trolley/_astro/hero-mobile.CgE5Bp8b_Z1FD1nh.webp` | N/A — CSS background | Source 941×1455; generated width 900; no HTML dimensions | CSS background; preloaded at ≤768px | Hero mobile | No | `src/assets/images/home/hero/hero-mobile.png`; `src/data/site-images.ts`; `src/pages/index.astro` |
| 2 | `/Trolley/_astro/women-owned-wordmark.T4eCtH-s.png` | `WBENC-certified Women Owned business` | 546×351 | Default/eager | Hero ownership button | No; inside button | `src/data/site-images.ts`; `src/pages/index.astro` |
| 3 | `/Trolley/_astro/wbenc-certificate.DP7EVvl5.webp` | `WBENC National Women's Business Enterprise Certification for Sumadija Trans LLC doing business as ChiTown Limobus` | 500×365 | Default/eager, but closed dialog | Certificate dialog | No | Same |
| 4 | `/Trolley/_astro/classic-exterior.ByvDvywE_Z1Td2d9.webp` plus 384/512/555w srcset | `Classic white trolley available for rental in Chicago` | 555×327 | Lazy, async | Fleet | Yes | `src/data/fleet.ts`; Astro `<Image>` in `src/pages/index.astro` |
| 5 | `/Trolley/_astro/exterior-rear-dusk.BDWfpLV5_ZCF4I.webp` plus 384/512/768/900w srcset | `Super Coach Bus` | 900×600 | Lazy, async | Fleet | Yes | Same |
| 6 | `/Trolley/_astro/exterior.BZc7qxEA_ZyWzzq.webp` plus 384/512/768/900w srcset | `Party Bus` | 900×720 | Lazy, async | Fleet | Yes | Same |
| 7 | `/Trolley/_astro/exterior.C6jEo_yc_8BwDw.webp` plus 384/512/768/900w srcset | `Limo Vans` | 900×600 | Lazy, async | Fleet | Yes | Same |
| 8 | `/Trolley/_astro/hero-desktop-alternate.DMOD0AZh_Z1KaMfB.webp` plus 480/768/1024w srcset | `Guests traveling by private trolley for a Chicago event` | 1024×683 | Lazy, async | Occasions | No | `src/assets/images/home/hero/hero-desktop-alternate.webp`; Astro `<Image>` in `src/pages/index.astro` |
| 9 | `/Trolley/_astro/classic-exterior.ByvDvywE.png` | `Classic white trolley parked outside a Chicago wedding venue` | 555×327 | Lazy, async | Guide card 1 | Yes | Guide frontmatter; plain `<img>` in `src/components/GuideCard.astro` |
| 10 | `/Trolley/_astro/exterior-rear-dusk.BDWfpLV5.jpg` | `Super coach bus for wedding guest shuttle transportation, rear view at dusk` | 1100×733 | Lazy, async | Guide card 2 | Yes | Guide frontmatter; plain `<img>` in `src/components/GuideCard.astro` |
| 11 | `/Trolley/_astro/afternoon-exterior.CSq1pLOk.png` | `White wedding trolley parked on a sunny afternoon near a venue entrance` | 555×327 | Lazy, async | Guide card 3 | Yes | Guide frontmatter; plain `<img>` in `src/components/GuideCard.astro` |
| 12 | `/Trolley/_astro/wbenc-logo.CP5lZCoL.svg` | `WBENC — Women's Business Enterprise National Council` | 142×30 | Lazy, async | Footer | No | `src/data/site-images.ts`; `src/components/Footer.astro` |

Image findings:

- Missing alt on `<img>` elements: **0**
- Empty alt on `<img>` elements: **0**
- Repeated alt strings: **0**
- Weak/generic alt: **3** — `Super Coach Bus`, `Party Bus`, and `Limo Vans` identify the vehicle but provide little visual context.
- Excessive keyword repetition in an individual alt: **0**
- Images without width/height attributes: **0** among `<img>` elements. CSS backgrounds do not have HTML dimensions by design.
- The two hero backgrounds have no alt channel. They function as decorative/atmospheric backgrounds behind a complete H1 and lead, so this is not counted as a missing-alt error.
- The desktop hero remains an original PNG CSS background; the mobile hero is transformed to WebP by `getImage()`.
- Fleet and occasions content images use Astro responsive optimization. Branding/certificate/footer images and the three `GuideCard` images use plain `<img>` markup; the guide images have no responsive srcset and retain PNG/JPEG output formats.
- Filenames such as `classic-exterior`, `exterior-rear-dusk`, and `afternoon-exterior` are descriptive. Generic `exterior` filenames for party bus/limo assets provide little image-search context, though alt and surrounding text are more important.

## 7. Form and interface text

All listed form content is present in the server-generated HTML. JavaScript changes state; it does not fetch form copy.

### A. Visible form text

- Heading: `Request a Chicago trolley rental quote`
- Step 1 header: `1`; `Step 1 of 3`; `Trip Information`
- Step 1 action: `Next`
- Step 2 header: `2`; `Step 2 of 3`; `Itinerary`
- Step 2 actions, visible when opened: `Back`; `Next`
- Step 3 header: `3`; `Step 3 of 3`; `Personal Info`
- Step 3 actions, visible when opened: `Back`; `Submit`
- Disclaimer: `Chicago trolley rental prices vary by date, vehicle, rental duration, itinerary and pickup details. Share your plans for a customized estimate.`

The three step headers remain visible. Initially, only Step 1's panel is expanded; Step 2 and Step 3 bodies are collapsed and made `inert` by the client script.

### B. Placeholder and option text

Select placeholders and options:

- Event select: `Event Type`; `Wedding`; `Corporate Event`; `Prom / Homecoming`; `Quinceañera`; `Bachelor / Bachelorette`; `Sporting Event / Concert`; `Airport Transportation`; `Coach Bus Charter`; `Out-of-State Trip`; `Night Out / Other`
- Duration select: `Number of Hours`; `3 hours (minimum)`; `4 hours`; `5 hours`; `6 hours`; `7 hours`; `8 hours`; `All-day charter (12 hours)`; `One-way transfer`; `Round trip`
- Vehicle select: `Choose Vehicle`; `Classic White Trolley · 30–36`; `Super Coach Bus · 57`; `Limo Van · 14`; `Party Bus · 40`; `Christmas Trolley · 24–36`; `Trolley + Coach Package`; `Not sure yet`
- Passenger select: `Number of Passengers`; `1–10`; `11–20`; `21–30`; `31–40`; `41–57`

Input/textarea placeholders:

- Step 2: `Pickup Location`; `Destination`
- Step 3: `Full Name`; `Phone Number`; `E-mail Address`; `How did you find us?`
- Date and time inputs have no visible placeholder strings; their accessible names are `Event date` and `Pickup time`.

The options are server-rendered. A valid `?vehicle=` query parameter can select one existing option after JavaScript runs, but it creates no new option or text.

### C. Accessibility-only form labels

Exact `aria-label` values:

`Event type`; `Number of hours`; `Choose vehicle`; `Number of passengers`; `Event date`; `Pickup time`; `Pickup location`; `Destination`; `Full name`; `Phone number`; `E-mail address`; `How did you find us?`

The accordion header buttons use their visible text as accessible names and expose exact initial `aria-expanded` values `true`, `false`, `false`.

### D. Hidden confirmation state

- H2: `Online request not sent`
- Paragraph: `No information was delivered. Online form integration is not configured yet; please use the contact information in the site header or footer.`
- Reset button: `Return to form`
- Decorative status mark: `✳`

The confirmation wrapper is in initial HTML with `role="alert"`, `aria-labelledby="home-form-status-title"`, `tabindex="-1"`, and `hidden`. On valid submission, the script prevents default submission, hides the entire form, reveals the confirmation state, and focuses it. Reset reverses those states, calls `form.reset()`, and reopens Step 1. Therefore the disclaimer is hidden with the form after submission and returns after reset.

Validation findings:

- `Full Name`, `Phone Number`, and `E-mail Address` have HTML `required`; other fields are not marked required.
- The form relies on browser-native `reportValidity()`. Exact browser validation messages are locale/browser dependent and are not strings in the source HTML.
- There is no network submission or configured endpoint. The interface explicitly reports that no information was delivered.

Sources: markup and scripts in `src/pages/index.astro`; option arrays in `src/data/site.ts`; passenger options in `src/pages/index.astro`.

## 8. Collapsed or initially hidden content

| Content | Mechanism | In initial HTML? | User-accessible? | Potential SEO relevance |
|---|---|---:|---|---|
| Quote Step 2 body | CSS grid `0fr`; JS sets body `inert`; header `aria-expanded="false"` | Yes | Yes, by step header/Next | Legitimate form UI; not primary editorial copy |
| Quote Step 3 body | Same | Yes | Yes, by step header/Next | Legitimate form UI |
| Six FAQ answers | CSS grid `0fr`; JS initializes each answer body as `inert`; buttons start `aria-expanded="false"` | Yes | Yes, one accordion item at a time | Substantive, legitimate support content; not hidden SEO text |
| Five non-active testimonials | Flex slides outside an `overflow:hidden` viewport; track is translated/auto-advanced; mobile uses horizontal scrolling | Yes | Yes, via arrows, dots, auto-rotation, or swipe | Legitimate carousel content; only one is visible at a time |
| WBENC certificate | Closed native `<dialog>` | Yes | Yes, via hero wordmark button | Image/credential detail, not primary copy |
| Quote confirmation | `hidden` attribute | Yes | Yes, only after valid submit | Transaction/state text; unlikely primary indexing value |
| More submenu | `hidden` attribute until More button opens it | Yes | Yes | Normal navigation disclosure |
| Mobile navigation panel | At ≤1024px it is off-canvas and `visibility:hidden` until burger activation; the same panel is inline on desktop | Yes | Yes | Normal responsive navigation |
| Skip link | Positioned visually off-screen until keyboard focus | Yes | Yes | Accessibility navigation, not primary copy |
| Reveal-on-scroll sections | `.rv` starts at `opacity:0` and translated; IntersectionObserver adds `.in` when intersecting; reduced-motion CSS exposes them | Yes | Yes during normal scrolling with JS | Legitimate animation. With JS disabled, most main sections remain visually concealed even though their text is server-rendered. A renderer that does not trigger intersection may observe them as visually hidden; this is a visibility risk, not evidence of hidden-keyword manipulation. |
| Guide excerpts | `-webkit-line-clamp: 2` and overflow clipping | Yes, complete text | Partially visible; full text is in the linked card's DOM | Search engines may encounter full HTML text, but users may see only two lines |
| Top-bar email on mobile | CSS hides `.topbar__link--email` at the mobile breakpoint | Yes | Visible on desktop; not mobile | Responsive boilerplate |

No inspected hidden region is a detached SEO-only text block. Every hidden/collapsed region serves navigation, form state, disclosure, carousel, responsive, or animation behavior.

## 9. Accessibility-only text

There is no generic `.sr-only`/`.visually-hidden` body-copy block on this homepage. The skip link is visually hidden until focused and is listed separately because it can become visible.

### Initial accessible names and labels

- Landmark/navigation labels: `Social media`; `Main`; `Footer navigation`; `Contact information`; `Legal navigation`
- Top-bar social links: `Visit ChiTown Trolley on Facebook`; `Visit ChiTown Trolley on Instagram`
- Brand links: `ChiTown Trolley home` (header and footer)
- Header button: `Open menu`
- Certificate controls: `Open the WBENC certificate`; dialog label `WBENC certificate`; close button `Close certificate`
- Form control labels: `Event type`; `Number of hours`; `Choose vehicle`; `Number of passengers`; `Event date`; `Pickup time`; `Pickup location`; `Destination`; `Full name`; `Phone number`; `E-mail address`; `How did you find us?`
- Carousel: `Previous testimonial`; `Next testimonial`; container label `Testimonial navigation`
- Footer social links: `ChiTown Trolley on Instagram`; `ChiTown Trolley on Facebook`
- `aria-labelledby` relationships point to visible/server-rendered headings for the form status, occasions section, social footer section, and certification footer section. The attribute values themselves are IDs, not additional copy.

### Image alt text

The 11 exact alt strings are inventoried in section 6. They are accessibility/image-related text and are excluded from the visible-body word count.

### JavaScript-only accessible names

- Header burger when open: `Close menu`
- Carousel buttons: `Go to testimonial 1`; `Go to testimonial 2`; `Go to testimonial 3`; `Go to testimonial 4`; `Go to testimonial 5`; `Go to testimonial 6`

Initial HTML accessibility attributes plus image alts contain **159 words** under this audit's tokenizer. After the seven JavaScript-only labels exist, the total is **185 words**. These counts do not imply that search engines treat ARIA or alt content as normal visible body copy.

## 10. Structured data

One valid JSON-LD block is rendered:

```json
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "ChiTown Trolley",
  "url": "https://chitowntracking.github.io/Trolley/",
  "description": "Timeless white trolley, coach bus, party bus, and limo van transportation for weddings and events across Chicagoland.",
  "areaServed": "Chicago, Illinois and surrounding suburbs",
  "telephone": "+1 630-624-3448",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1265 Oakton St",
    "addressLocality": "Elk Grove Village",
    "addressRegion": "IL",
    "postalCode": "60007",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://www.instagram.com/chitowntrolley?igsh=MXZrMnVpbGF4NG5iZg%3D%3D&utm_source=qr",
    "https://www.facebook.com/share/1GhfM5hPmT/?mibextid=wwXIfr"
  ]
}
```

Source: `getLocalBusinessSchema()` in `src/data/site.ts`, called by `src/pages/index.astro`, serialized by `src/layouts/BaseLayout.astro`.

Validation:

- JSON parse: **valid**
- Objects: one `TaxiService`, with nested `PostalAddress`
- Duplicate schema objects: **0**
- URL: matches canonical homepage
- Name: matches visible brand
- Telephone: matches visible top bar, CTA, and footer; not a placeholder
- Email: absent from schema even though `info@chitowntrolley.com` is visible
- Address: matches the visible footer address
- Service area: broadly supported by the FAQ and footer
- Social profiles: match visible links; clean profile URLs would be stronger entity identifiers than a Facebook share URL and query-bearing Instagram URL
- Image: absent
- Price range: absent
- Opening hours: absent
- No nested Offer, Service, WebSite, or FAQPage schema is present
- No universal schema.org requirement makes all omitted properties errors, but the object may not qualify for every Google enhancement.
- `TaxiService` is a real `LocalBusiness` subtype but is an imperfect semantic fit for a trolley/charter operator. The body and schema description do consistently describe trolley plus coach, party-bus, and limo-van transportation.
- The closed certificate image alt identifies `Sumadija Trans LLC doing business as ChiTown Limobus`, while schema and visible branding say `ChiTown Trolley`. This may be a legitimate certificate/legal-name relationship, but it is an entity-name inconsistency worth owner verification.

## 11. JavaScript-generated content

| Item/exact text | Script location | In server HTML? | When created/changed? | Likely SEO value |
|---|---|---:|---|---|
| Six empty carousel dot `<button>` elements with `Go to testimonial 1` through `Go to testimonial 6` | `src/pages/index.astro` carousel script | No | Created on script execution | Interface/accessibility only |
| Burger accessible name `Close menu` | `src/components/Header.astro` | No (`Open menu` is initial) | Set when mobile menu opens | Interface only |
| Testimonial track transform/scroll state | `src/pages/index.astro` | Slides yes; state no | Initial script run and every 7 seconds/user action | Exposes existing testimonials; creates no testimonial copy |
| Quote `inert` states and `aria-expanded` synchronization | `src/pages/index.astro` | Content yes; `inert` property state no | Initial script run and step changes | Interface only |
| FAQ `inert`, open classes, and `aria-expanded` changes | `src/pages/index.astro` | Content yes; `inert` property state no | Initial script run and accordion clicks | Exposes existing FAQ copy |
| Confirmation visibility/focus | `src/pages/index.astro` | Confirmation copy yes, hidden | After valid submit; reset reverses | State content, not new copy |
| Vehicle preselection | `src/pages/index.astro` | All options yes | When a matching `?vehicle=` value exists | No new text |
| Certificate `showModal()`/close state | `src/pages/index.astro` | Dialog/image yes | On button/dialog interaction | No new text |
| Reveal class `.in` | `src/layouts/BaseLayout.astro` | Text yes | IntersectionObserver or fallback | Visual state only |
| More/mobile navigation state | `src/components/Header.astro` | Links yes | User interaction | No new link copy |

The visible copyright year `2026` is evaluated during the Astro build and appears in static HTML; it is not client-generated.

## 12. CSS-generated content

Inspected `content:` declarations contributing to the homepage:

- `src/components/Footer.astro`: empty `content: ''` creates decorative rotated-diamond separators between contact items and legal items.
- `src/components/Footer.astro`: `content: '·'` creates a decorative separator between the two copyright spans.
- `src/pages/index.astro`: empty `content: ''` creates the hero overlay edge, fleet heading underline, and testimonial pagination bar visuals.
- Other homepage `::before`/`::after` use is decorative; no meaningful word is generated.
- No CSS counter creates homepage text.

The middle dot is a symbol, not a word, and the empty strings carry no textual meaning. CSS-generated content is excluded from primary and HTML-text word counts and should not be relied on for indexing.

## 13. Word counts

All counts use case-neutral Unicode word tokens made from letters/numbers, allowing internal apostrophes, hyphens, and en dashes. Symbols alone do not count.

| Category | Words | Exact inclusion rule |
|---|---:|---|
| 1. Main unique homepage content | **811** | Editorial/conversion text inside `<main>`, including all six user-accessible testimonials and all six user-accessible FAQ answers, guide metadata, headings and main CTAs; excludes quote-control internals, hidden confirmation, certificate dialog, header, shared final CTA, and footer |
| 1a. Main primary content initially exposed | **439** | Same editorial corpus, but only the first carousel slide and FAQ questions, not hidden answers/non-active slides; quote heading/disclaimer remain included |
| Main initially exposed including interface | **470** | Initial/exposed `<main>` text including Step 1 controls and visible step headers |
| 2. Headings | **97** | All 22 H1–H3 strings, including the hidden confirmation H2 |
| 3. Paragraphs | **525** | All 25 `<p>` strings, including hidden/collapsed paragraphs |
| 4. Testimonials | **155** | All six quotes plus person and role/location text; decorative opening marks excluded automatically as symbols |
| 5. FAQs | **284** | Six questions plus six answers |
| 6. Guide titles and excerpts | **98** | Only the three H3 titles and three excerpts; excludes tag/date/read-time |
| 7. Navigation | **13** | Header navigation labels `Home` through `Guides`, `More`, its four submenu labels, and `Reservation`; excludes logo, top-bar contact, skip link, and footer nav |
| 8. Footer | **50** | All human-readable footer text, including footer navigation, contact, social, credential, legal, and copyright text |
| 9. Form controls and options | **126** | Step button labels, every select placeholder/option, input/textarea placeholders, and action buttons; excludes heading, disclaimer, and hidden confirmation |
| 10. Accessibility-only text | **159 initial / 185 after JS** | All initial `aria-label` strings and 11 image alts; second figure adds `Close menu` and six generated carousel labels |
| 11. Metadata | **90 emitted / 30 unique** | Title and description text as emitted in standard, OG, and Twitter fields (three copies of each); unique title+description values total 30 |
| 12. Entire rendered visible page | **558** | Source/CSS/JS-based desktop count of all text normally shown while scrolling after reveal, including header, main interface, shared CTA and footer; excludes skip link until focus, closed/collapsed content, non-active carousel slides, options other than the selected placeholder, alt/ARIA, and CSS symbols |
| 13. Entire generated HTML text | **1,048** | All human-readable `<body>` text nodes in `dist/index.html`, including hidden/collapsed text and every `<option>`; excludes scripts, styles, head metadata, attributes, alt text, and CSS-generated content |

The requested **main visible-content count is 439 words** under the strict initially-exposed editorial definition. The broader 811-word figure is useful for evaluating all main content that a user can reach through normal carousel/accordion interaction. Neither figure predicts how much text a search engine will index.

## 14. Keyword occurrence report

Method:

- Matching is case-insensitive and requires non-alphanumeric boundaries; plurals do not count as singulars.
- Possessives and hyphenated compounds retain a word boundary, so `Chicago` in `Chicago's` and `trolley` in `Trolley-Friendly` count as exact word tokens.
- The matrix's role columns can overlap: a guide H3 inside an anchor is both H3, anchor text, and guide content; an FAQ answer is both a paragraph and FAQ content.
- **Total** de-duplicates such roles and counts each actual occurrence once across the final document title, standard meta description, human-readable generated body text, and image alts.
- Total excludes OG/Twitter mirrors, JSON-LD, scripts, CSS, placeholders stored only in attributes, and ARIA labels. It includes server-rendered form `<option>` text because that text is in the body HTML.
- The literal generated head contains the title/description strings again in OG and Twitter fields. Those mirrors are deliberately excluded from Total so metadata does not artificially inflate the content count.

| Keyword | Title | Meta description | H1 | H2 | H3 | Paragraphs | Alt text | Anchor text | FAQs | Testimonials | Guides | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Chicago trolley rental | 1 | 1 | 1 | 2 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **6** |
| Chicago trolley rentals | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| trolley rentals in Chicago | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| rent a trolley in Chicago | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| trolley rental | 1 | 1 | 1 | 2 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **6** |
| trolley | 2 | 2 | 1 | 3 | 3 | 7 | 4 | 9 | 3 | 3 | 3 | **37** |
| Chicago | 1 | 1 | 1 | 4 | 1 | 6 | 3 | 1 | 1 | 0 | 1 | **17** |
| Chicagoland | 0 | 0 | 0 | 0 | 0 | 3 | 0 | 1 | 0 | 0 | 1 | **4** |
| transportation | 0 | 1 | 0 | 2 | 2 | 7 | 1 | 4 | 0 | 0 | 3 | **16** |
| group transportation | 0 | 1 | 0 | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | **4** |
| private trolley transportation | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **2** |
| event transportation | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **1** |
| wedding trolley | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | **2** |
| wedding | 0 | 0 | 0 | 0 | 3 | 5 | 3 | 3 | 2 | 1 | 3 | **14** |
| weddings | 1 | 1 | 1 | 0 | 1 | 0 | 0 | 2 | 0 | 0 | 0 | **6** |
| event | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 2 | 1 | 0 | **8** |
| events | 1 | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | **5** |
| quote | 0 | 1 | 0 | 1 | 0 | 2 | 0 | 1 | 1 | 0 | 0 | **5** |
| pricing | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| prices | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **1** |
| rental | 1 | 1 | 1 | 2 | 0 | 2 | 1 | 0 | 0 | 0 | 0 | **8** |

The exact phrase `Chicago trolley rental` occurs **6 times** in the de-duplicated audit corpus. It appears 10 times as a literal string if the identical OG and Twitter title/description mirrors are also counted.

### Exact occurrence context catalog

The catalog below contains every context used by at least one requested keyword. The following keyword-to-context map identifies every occurrence without reproducing the same sentence dozens of times. `×2` means two exact occurrences occur in that one context.

| ID | Full containing sentence, heading, or interface string | Section | Element/type | Source |
|---|---|---|---|---|
| C01 | `Chicago Trolley Rental for Weddings & Events \| ChiTown Trolley` | Head | `<title>` | `src/pages/index.astro`; `src/layouts/BaseLayout.astro` |
| C02 | `Book a Chicago trolley rental for weddings, private events and group transportation. Explore the ChiTown Trolley fleet and request a customized quote.` | Head | Meta description | Same |
| C03 | `CHITOWN TROLLEY` | Header | Brand anchor | `src/components/Header.astro` |
| C04 | `Weddings` | Header | Navigation anchor | `src/data/site.ts`; `src/components/Header.astro` |
| C05 | `Christmas Trolley` | Header | Navigation anchor | Same |
| C06 | `Chicago Trolley Rental for Weddings & Events` | Hero | H1 | `src/pages/index.astro` |
| C07 | `Private trolley transportation for celebrations and coordinated group travel throughout Chicago and Chicagoland.` | Hero | Paragraph | `src/pages/index.astro` |
| C08 | `View Trolley` | Hero | Anchor | `src/pages/index.astro` |
| C09 | `Request a Chicago trolley rental quote` | Quote | H2 | `src/pages/index.astro` |
| C10 | `Event Type` | Quote form | Selected placeholder option | `src/pages/index.astro` |
| C11 | `Wedding` | Quote form | Option | `src/data/site.ts` |
| C12 | `Corporate Event` | Quote form | Option | `src/data/site.ts` |
| C13 | `Sporting Event / Concert` | Quote form | Option | `src/data/site.ts` |
| C14 | `Airport Transportation` | Quote form | Option | `src/data/site.ts` |
| C15 | `Classic White Trolley · 30–36` | Quote form | Option | `src/data/site.ts` |
| C16 | `Christmas Trolley · 24–36` | Quote form | Option | `src/data/site.ts` |
| C17 | `Trolley + Coach Package` | Quote form | Option | `src/data/site.ts` |
| C18 | `Chicago trolley rental prices vary by date, vehicle, rental duration, itinerary and pickup details. Share your plans for a customized estimate.` | Quote | Paragraph | `src/pages/index.astro` |
| C19 | `Explore our Chicago trolley and group transportation fleet` | Fleet | H2 | `src/pages/index.astro` |
| C20 | `Choose the classic white trolley for a wedding or celebration, or compare our additional vehicles for larger group transportation needs.` | Fleet | Paragraph | `src/pages/index.astro` |
| C21 | `Classic White Trolley` | Fleet | H3 inside anchor | `src/data/fleet.ts`; `src/pages/index.astro` |
| C22 | `The trolley was the part of the day our guests wouldn’t stop talking about. Our chauffeur felt like family by the last stop.` | Testimonials | Blockquote | `src/data/site.ts` |
| C23 | `I plan events for a living and I’m picky. This was the easiest vendor I’ve ever worked with, start to finish.` | Testimonials | Blockquote | `src/data/site.ts` |
| C24 | `Event Planner, Oak Brook` | Testimonials | Attribution role | `src/data/site.ts`; split/rendered by `src/pages/index.astro` |
| C25 | `From the first email to the last stop, everything felt effortless. Our guests are still asking where we found such a beautiful trolley.` | Testimonials | Blockquote | `src/data/site.ts` |
| C26 | `We booked the coach for our out-of-town guests and the trolley for the wedding party — two vehicles, one seamless day.` | Testimonials | Blockquote | `src/data/site.ts` |
| C27 | `Private Trolley Transportation` | Occasions | Eyebrow | `src/pages/index.astro`; `src/components/Eyebrow.astro` |
| C28 | `From wedding parties and milestone celebrations to coordinated group outings, ChiTown Trolley keeps everyone together between stops.` | Occasions | Paragraph sentence | `src/pages/index.astro` |
| C29 | `Share your route, timing and group size, and we will help match your plans with the right vehicle for private transportation throughout Chicago and Chicagoland.` | Occasions | Paragraph sentence | `src/pages/index.astro` |
| C30 | `Weddings` | Occasions | H3 | `src/pages/index.astro` |
| C31 | `Keep the wedding party together between hotels, photo locations, the ceremony and the reception.` | Occasions | Paragraph | `src/pages/index.astro` |
| C32 | `Private Events` | Occasions | H3 | `src/pages/index.astro` |
| C33 | `Plan transportation for birthdays, anniversaries, family celebrations and other private occasions.` | Occasions | Paragraph | `src/pages/index.astro` |
| C34 | `Coordinate hotel pickups, venue transfers and multiple destinations with one transportation plan.` | Occasions | Paragraph | `src/pages/index.astro` |
| C35 | `Plan Your Transportation` | Occasions | Anchor | `src/pages/index.astro` |
| C36 | `Planning your Chicago trolley rental` | FAQ | H2 | `src/pages/index.astro` |
| C37 | `How far in advance should I book my trolley?` | FAQ | Button/question | `src/data/site.ts` |
| C38 | `We recommend booking as early as you can — popular Saturdays in wedding season (May through October) and December holiday dates often fill six to twelve months out.` | FAQ | Answer sentence | `src/data/site.ts` |
| C39 | `We serve Chicago and the surrounding suburbs, including Naperville, Evanston, Oak Brook, Schaumburg, Orland Park, Arlington Heights, Hinsdale, Lake Forest, and Wheaton.` | FAQ | Answer sentence | `src/data/site.ts` |
| C40 | `Our Classic White Trolley seats 30–36 passengers, the Limo Vans seat up to 14, and the Super Coach Bus holds up to 57.` | FAQ | Answer sentence | `src/data/site.ts` |
| C41 | `For larger parties, ask about pairing a trolley for the wedding party with a coach for the rest of your guests.` | FAQ | Answer sentence | `src/data/site.ts` |
| C42 | `A deposit is required to hold your date, with the balance due before the event.` | FAQ | Answer sentence | `src/data/site.ts` |
| C43 | `Requesting a quote or reservation online places no charge and carries no obligation — we confirm availability first, then walk you through every detail.` | FAQ | Answer sentence | `src/data/site.ts` |
| C44 | `What happens if our event runs longer than expected?` | FAQ | Button/question | `src/data/site.ts` |
| C45 | `Chicago event transportation guides` | Guides | H2 | `src/pages/index.astro` |
| C46 | `Practical planning resources for routes, timing, vehicles and group transportation in Chicago.` | Guides | Paragraph | `src/pages/index.astro` |
| C47 | `How Many Guests Fit in a Trolley? A Wedding Transportation Sizing Guide` | Guides | H3 inside anchor | `src/content/guides/how-many-guests-fit-in-a-trolley.md` |
| C48 | `Wedding Day Shuttle Logistics: A Timeline Guide for Guest Transportation` | Guides | H3 inside anchor | `src/content/guides/wedding-day-shuttle-logistics-timeline.md` |
| C49 | `How to build a transportation timeline that actually holds up on the day — hotel pickups, ceremony-to-reception shuttles, and return trips guests won't stand around waiting for.` | Guides | Paragraph inside anchor | Same |
| C50 | `Chicago's Most Trolley-Friendly Wedding Venues` | Guides | H3 inside anchor | `src/content/guides/chicago-trolley-friendly-wedding-venues.md` |
| C51 | `What actually makes a venue easy to arrive at by trolley — driveway clearance, drop-off zones, and photo backdrops — plus where around Chicagoland to look.` | Guides | Paragraph inside anchor | Same |
| C52 | `Call +1 630-624-3448 or request a quote in under two minutes.` | Shared final CTA | Paragraph | `src/components/CtaBand.astro`; `src/data/site.ts` |
| C53 | `Get a Free Quote` | Shared final CTA | Anchor | `src/components/CtaBand.astro` |
| C54 | `CHITOWN TROLLEY` | Footer | Brand anchor | `src/components/Footer.astro` |
| C55 | `Weddings` | Footer | Navigation anchor | `src/data/site.ts`; `src/components/Footer.astro` |
| C56 | `Christmas Trolley` | Footer | Navigation anchor | Same |
| C57 | `Serving Chicago and the surrounding suburbs.` | Footer | Paragraph | `src/components/Footer.astro` |
| C58 | `© 2026 ChiTown Trolley` | Footer | Copyright span | `src/components/Footer.astro` |
| C59 | `Licensed & insured · Chicagoland's wedding trolley` | Footer | Copyright/credential span | `src/components/Footer.astro` |
| C60 | `Classic white trolley available for rental in Chicago` | Fleet | Image alt | `src/pages/index.astro`; asset in `src/data/fleet.ts` |
| C61 | `Guests traveling by private trolley for a Chicago event` | Occasions | Image alt | `src/pages/index.astro` |
| C62 | `Classic white trolley parked outside a Chicago wedding venue` | Guides | Image alt | `src/content/guides/how-many-guests-fit-in-a-trolley.md` |
| C63 | `Super coach bus for wedding guest shuttle transportation, rear view at dusk` | Guides | Image alt | `src/content/guides/wedding-day-shuttle-logistics-timeline.md` |
| C64 | `White wedding trolley parked on a sunny afternoon near a venue entrance` | Guides | Image alt | `src/content/guides/chicago-trolley-friendly-wedding-venues.md` |

### Keyword-to-context map

| Keyword | Total | Every occurrence |
|---|---:|---|
| Chicago trolley rental | 6 | C01, C02, C06, C09, C18, C36 |
| Chicago trolley rentals | 0 | None |
| trolley rentals in Chicago | 0 | None |
| rent a trolley in Chicago | 0 | None |
| trolley rental | 6 | C01, C02, C06, C09, C18, C36 |
| trolley | 37 | C01×2, C02×2, C03, C05, C06, C07, C08, C09, C15, C16, C17, C18, C19, C20, C21, C22, C25, C26, C27, C28, C36, C37, C40, C41, C47, C50, C51, C54, C56, C58, C59, C60, C61, C62, C64 |
| Chicago | 17 | C01, C02, C06, C07, C09, C18, C19, C29, C36, C39, C45, C46, C50, C57, C60, C61, C62 |
| Chicagoland | 4 | C07, C29, C51, C59 |
| transportation | 16 | C02, C07, C14, C19, C20, C27, C29, C33, C34, C35, C45, C46, C47, C48, C49, C63 |
| group transportation | 4 | C02, C19, C20, C46 |
| private trolley transportation | 2 | C07, C27 |
| event transportation | 1 | C45 |
| wedding trolley | 2 | C59, C64 |
| wedding | 14 | C11, C20, C26, C28, C31, C38, C41, C47, C48, C50, C59, C62, C63, C64 |
| weddings | 6 | C01, C02, C04, C06, C30, C55 |
| event | 8 | C10, C12, C13, C24, C42, C44, C45, C61 |
| events | 5 | C01, C02, C06, C23, C32 |
| quote | 5 | C02, C09, C43, C52, C53 |
| pricing | 0 | None |
| prices | 1 | C18 |
| rental | 8 | C01, C02, C06, C09, C18×2, C36, C60 |

## 15. Duplication and repetition

- Exact duplicate sentences: **0** in the paragraph and testimonial sentence corpus.
- Exact duplicate headings: **0**.
- Title/H1 are near duplicates: the title adds `| ChiTown Trolley` to the H1 wording. This is expected alignment rather than confusing duplication.
- The standard title/description are intentionally mirrored into OG and Twitter fields.
- Header/footer boilerplate duplicates the labels `Home`, `Fleet`, `Weddings`, `Christmas Trolley`, `Services`, `Guides`, `About`, `Gallery`, `FAQ`, and `Contact`, with matching destinations. This is normal global navigation.
- `CHITOWN TROLLEY` appears as both header and footer brand, then `ChiTown Trolley` appears in copyright.
- The phone appears three visible times (top bar, final CTA, footer); the email appears twice (top bar, footer). This is useful conversion boilerplate.
- Form action duplication is functional: `Next` occurs twice and `Back` occurs twice.
- `Guides` appears as the tag on each of three guide cards.
- Vehicle names repeat between form options, fleet cards, FAQs, and navigation where relevant. The contexts are distinct and helpful.
- Repeated alt text: **0**.
- Exact `Chicago trolley rental` appears six times in the de-duplicated corpus; three occurrences are in headings. That is coherent but noticeably search-focused.
- `trolley` (37), `Chicago` (17), `transportation` (16), and `wedding` (14) are the highest requested exact-token totals. Given the brand and offering, none is automatically excessive; there are no forced occurrences of the zero-count awkward variants.
- Near repetition occurs between the fleet H2/lead, occasions explanation, and guide/metadata language around group transportation. It reinforces the service mix but contributes to a somewhat uniform SEO vocabulary.

## 16. Content source map

| Rendered content | Source |
|---|---|
| Homepage composition, hero, quote markup/copy, fleet/occasion/FAQ/guide section framing, inline homepage scripts | `src/pages/index.astro` |
| Document shell, metadata output, canonical computation, skip link, shared regions, reveal script | `src/layouts/BaseLayout.astro` |
| Top-bar phone/email/social markup | `src/components/TopBar.astro` |
| Header brand, main nav, More menu, reservation CTA, mobile-menu script | `src/components/Header.astro` |
| Eyebrow structure; labels passed by homepage | `src/components/Eyebrow.astro` |
| Guide-card DOM, image, title, excerpt, date/read-time rendering | `src/components/GuideCard.astro` |
| Final shared CTA | `src/components/CtaBand.astro` |
| Footer brand/nav/contact/address/social/credential/legal/copyright | `src/components/Footer.astro` |
| Phone, email, address, social URLs, nav arrays, testimonials, homepage FAQs, event/vehicle/hour options, schema builder | `src/data/site.ts` |
| Fleet names, capacities, slugs, images, and image registry | `src/data/fleet.ts` |
| Hero/branding image registry | `src/data/site-images.ts` |
| Occasions image | `src/assets/images/home/hero/hero-desktop-alternate.webp`, imported directly by `src/pages/index.astro` |
| Hero desktop/mobile assets | `src/assets/images/home/hero/hero-desktop.png`; `src/assets/images/home/hero/hero-mobile.png` |
| Guide 1 title/excerpt/category/cover/alt/date/read time | `src/content/guides/how-many-guests-fit-in-a-trolley.md` |
| Guide 2 title/excerpt/category/cover/alt/date/read time | `src/content/guides/wedding-day-shuttle-logistics-timeline.md` |
| Guide 3 title/excerpt/category/cover/alt/date/read time | `src/content/guides/chicago-trolley-friendly-wedding-venues.md` |
| Guide collection loader/schema | `src/content.config.ts` |
| Guide category label and date formatter | `src/data/guides.ts` |
| Base-path URL conversion | `src/utils/paths.ts` |
| Global reveal/hidden/typography behavior | `src/styles/global.css` |
| Site origin, `/Trolley` base, static output, sitemap exclusions | `astro.config.mjs` |

All content arrays and guide entries are resolved at build time and serialized into the static homepage HTML. They are not client-fetched.

## 17. Indexability and crawlability check

| Check | Result | Assessment |
|---|---|---|
| Build | `npm run build` succeeded; 21 pages generated | No build blocker |
| Astro/TypeScript check | 35 files; 0 errors, warnings, or hints | No validation blocker |
| Homepage local status | `/Trolley/` → 200 | Crawlable in the local static preview |
| Configured output | `output: 'static'` | Primary content is server-generated HTML |
| Configured origin/base | `https://chitowntracking.github.io` + `/Trolley` | Generated assets, internal URLs, canonical, and sitemap use the base |
| Meta robots | None | No page-level noindex/nofollow |
| Robots file | No `public/robots.txt`; local `/robots.txt` and `/Trolley/robots.txt` both 404 | The project emits no robots exclusion. Because deployment is a GitHub Pages subpath, any host-root robots policy would live outside `/Trolley`; production root behavior still requires deployment-level verification. |
| Canonical | `https://chitowntracking.github.io/Trolley/` | Preferred homepage declared |
| Sitemap | Homepage is in `sitemap-0.xml`; index served at `/Trolley/sitemap-index.xml` | Positive discovery signal, not an indexing guarantee |
| Sitemap URL count | 18 URLs | 21 generated pages minus 404 and the two deliberately excluded legal pages |
| Privacy/terms | Built and linked; excluded from sitemap; each generated page has `noindex,follow` | Intentional draft/legal treatment; neither homepage link has `nofollow`, so crawlers may follow the links while the destination pages request no indexing |
| Nofollow | None | No link-level crawl blocks |
| JavaScript-only links | 0 | Navigation does not depend on JS for href discovery |
| Internal links | All homepage internal paths map to generated output; both fragment targets exist | No unresolved path found |
| External rel | All four `_blank` social links have `noopener noreferrer` | Appropriate security rel; no SEO `nofollow` |
| Root path | `/` → 404 in local preview | Expected for a project configured under `/Trolley`; deployment must publish under that base |
| Trailing/filename variants | Local preview returns 200 for `/Trolley`, `/Trolley/`, and `/Trolley/index.html`; fleet paths with/without slash also return 200 | Potential duplicate-access variants in the preview. Homepage variants emit the preferred canonical, which mitigates duplication; production GitHub Pages normalization may differ and was not tested here. |
| Reveal-on-scroll | Main `.rv` content is in initial HTML but begins visually transparent until IntersectionObserver runs | Not a source-level crawl block, but it creates a no-JS/render-without-scroll visibility risk |
| Fully rendered browser DOM | Not captured; in-app browser list was empty | Generated HTML and client logic were audited directly; browser-only layout/computed-style behavior should be rechecked when the browser surface is available |

No source-level directive currently prevents crawling or requests homepage de-indexing. The main remaining crawlability uncertainty is deployment-level host behavior (root robots and URL normalization), not the Astro HTML. Crawlability does not guarantee that Google will index the page or use every string for ranking.

## 18. Content review summary

### Strongest elements

- The title, H1, meta description, hero lead, and canonical consistently identify a Chicago trolley-rental offering.
- Fleet cards provide concrete vehicle names and capacities, and each uses a normal crawlable detail-page link.
- FAQs answer timing, service area, alcohol, capacity, deposit, and overtime questions with useful specificity.
- The occasions section broadens use cases without obscuring weddings.
- Testimonials, guide previews, phone/email/address, women-owned credential, licensing/insurance wording, and visible service area strengthen trust and topical clarity.
- The complete main content is server-rendered; core copy and links do not require hydration.

### Weakest, repetitive, or potentially confusing elements

- The quote form is not connected. It looks interactive, but after validation it only reveals `Online request not sent`; this is the most significant user-quality/conversion weakness.
- Pricing copy says prices vary but gives no starting range; the deposit FAQ does not state the deposit amount.
- Three fleet image alts are generic names only.
- Guide dates render one day earlier than their frontmatter dates because formatting is time-zone dependent.
- `Chicago trolley rental` occurs in the H1 and two H2s, while other section headings repeat Chicago/transportation language. The set reads more SEO-engineered than the otherwise natural paragraph copy.
- `Follow` and `Women-owned business` are H2s despite being small footer utilities.
- The schema subtype `TaxiService` does not perfectly describe a charter/trolley operator.
- The certificate alt's `ChiTown Limobus` DBA wording is inconsistent with the `ChiTown Trolley` entity name unless the relationship is intentional and documented.
- The social schema/links use share/query URLs rather than clean profile identifiers.
- With JavaScript disabled, `.rv` content remains visually transparent despite being present in HTML.

### Information users may still expect

- A starting rate or clearly stated reason no price range can be shown
- Deposit amount, cancellation/rescheduling terms, and payment methods
- Expected quote-response time
- Vehicle accessibility/accommodation information
- Hours of operation or phone availability
- Verification/source context for testimonials
- Clearer relationship among ChiTown Trolley, ChiTown Limobus, and Sumadija Trans LLC

### Content-placement opportunities

- Detailed policies, full service-area lists, and complete vehicle comparisons can live on dedicated FAQ, service, contact, or fleet pages, with concise homepage summaries.
- The homepage should retain the hero, quote route, fleet preview, testimonials, occasions summary, concise FAQ preview, guide previews, final CTA, contact details, and business credentials; those elements directly support discovery and conversion.
- The current title/H1 emphasize trolleys, weddings, and events, while body/schema also describe coach, party-bus, limo-van, and broader group transportation. This is not a contradiction, but the title is narrower than the full offering and the `TaxiService` type is broader/different in another direction.

This report identifies opportunities only; no content, schema, styles, scripts, routes, or configuration were changed.
