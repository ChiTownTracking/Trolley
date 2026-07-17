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
  uploads/            Images (served at the site root as /uploads/…)
src/
  data/
    site.ts           All content: nav, fleet, services, FAQs, gallery, copy…
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
    contact.astro     /contact     (quote form)
    reservation.astro /reservation (reservation form)
```

## Notes on the conversion

- The original SPA (client-side `state.page` routing) is now real, SEO-friendly
  **routes** — each page has its own URL and pre-rendered HTML.
- All `{{ … }}`, `<sc-for>`, `<sc-if>` template constructs were replaced with
  Astro's native templating; content lives in `src/data/site.ts`.
- `style-hover` / `style-focus` runtime attributes became real CSS `:hover` /
  `:focus` rules in component `<style>` blocks and `global.css`.
- Interactivity is small vanilla scripts: nav dropdown, gallery lightbox,
  reveal-on-scroll, and the contact/reservation form confirmations. The FAQ uses
  native `<details name="faq">`, so it works even without JavaScript.
- Forms currently show an in-page confirmation (as the original did). Wire the
  `submit` handlers in `contact.astro` / `reservation.astro` to a real endpoint
  (Formspree, an API route, etc.) when you're ready to receive submissions.

### Original source files

The original export is kept for reference and is no longer used by the build:
`ChiTown Trolley Website.dc.html`, `support.js`, `.thumbnail`, and the top-level
`uploads/` folder (its images were copied into `public/uploads/`). These can be
deleted once you're confident in the new site.
