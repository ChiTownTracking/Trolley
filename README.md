# ChiTown Trolley — Astro

Marketing site for ChiTown Trolley, a Chicago wedding & event trolley company.
Converted from a single-file DivMagic export (`ChiTown Trolley Website.dc.html` +
`support.js`) into a structured, static **Astro** multi-page app.

## Commands

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start the dev server at `http://localhost:4321` |
| `npm run build`   | Build the static site to `dist/`              |
| `npm run preview` | Preview the production build locally          |

## Project structure

```
public/
  favicon_io/         Favicons and web app manifest
  images/guides/      Guide-body images served at stable public URLs
  robots.txt          Production crawler policy and sitemap location
  _headers            Netlify security and immutable-asset headers
  _redirects          Netlify canonical-host redirects
netlify/
  functions/          Server-side form notification function
src/
  assets/             Astro-managed images and local WOFF2 fonts
  data/
    site.ts           Shared configuration, navigation, FAQs, gallery, and form options
  styles/
    global.css        Design tokens (colors, type) + shared component classes
  components/
    TopBar.astro      Black contact bar (socials, phone, email)
    Header.astro      Sticky nav + "More" dropdown + Reservation CTA
    Footer.astro      Footer nav + contact + socials
    CtaBand.astro     Gold "hold your date" call-to-action band
    Eyebrow.astro     The "— LABEL —" divider used above section headings
    PageHero.astro    Centered page intro (eyebrow + heading + optional lead)
  layouts/
    BaseLayout.astro  <head>, fonts, TopBar/Header/CtaBand/Footer, reveal script
  pages/              One file per route:
    index.astro       /            Home
    fleet.astro       /fleet
    weddings.astro    /weddings
    services.astro    /services
    about.astro       /about
    gallery.astro     /gallery     (image lightbox)
    faq.astro         /faq         (native <details> accordion)
    contact.astro     /contact     (contact form)
    reservation.astro /reservation (reservation form)
    guides/           Guide index and generated article routes
    fleet/            Generated vehicle-detail routes
```

## Notes on the conversion

- The original SPA (client-side `state.page` routing) is now real, SEO-friendly
  **routes** — each page has its own URL and pre-rendered HTML.
- All `{{ … }}`, `<sc-for>`, `<sc-if>` template constructs were replaced with
  Astro's native templating; content lives in `src/data/site.ts`.
- `style-hover` / `style-focus` runtime attributes became real CSS `:hover` /
  `:focus` rules in component `<style>` blocks and `global.css`.
- Interactivity is small vanilla scripts: nav dropdown, gallery lightbox,
  reveal-on-scroll, and form confirmations. The FAQ uses
  native `<details name="faq">`, so it works even without JavaScript.
- Quote, wedding, contact, and reservation forms are stored by Netlify Forms.
  The server-side `netlify/functions/quote-notification.mjs` function sends
  notifications through Resend; its credentials must remain in Netlify
  environment variables and must never be exposed to browser code.
- Netlify is the authoritative production host. The GitHub Actions workflow
  validates checks/builds only and does not deploy GitHub Pages.

### Original source files

The legacy `support.js` and `.thumbnail` DivMagic artifacts are kept for
provenance and are not used by the Astro build. Confirm they are no longer
needed before deleting them.
