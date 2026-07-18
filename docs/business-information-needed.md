# Business information needed

Phase 1 intentionally keeps unknown business facts out of live links and structured data. The values below must be supplied or confirmed by an authorized owner before the related launch work can be completed.

| Information needed | Current repository state | Why it is needed |
|---|---|---|
| Final production domain | GitHub Pages currently builds for `https://chitowntracking.github.io/Trolley`; ownership/finality is unconfirmed | Canonicals, sitemap, robots location, redirects, analytics, Search Console |
| Preferred canonical domain | Not confirmed | Prevent duplicate indexing when a branded domain is introduced |
| Public phone number | Placeholder `(000) TROLLEY` / `tel:0008765539`; now rendered as non-clickable text | Contact links, forms, LocalBusiness/ContactPoint data |
| Public email | `info@chitowntrolley.com` is rendered but still needs owner confirmation | Contact delivery, legal contact, form notifications |
| Legal business name | Missing | Legal policies, provider accounts, structured data |
| Address or service-area-business status | Street and postal code are TODO; Chicago is listed as locality | Local SEO and compliant LocalBusiness data |
| Cities and states actually served | Suburb list, “Chicagoland,” and a four-state claim currently coexist | Accurate site copy, form eligibility, local SEO |
| Official Instagram URL | Placeholder; no social link is currently rendered | Footer/top bar and `sameAs` data |
| Official Facebook URL | Placeholder; no social link is currently rendered | Footer/top bar and `sameAs` data |
| Privacy Policy URL/content | Internal draft at `/privacy-policy/`; currently `noindex,follow` and excluded from sitemap | Form launch, analytics, third-party disclosures |
| Terms and Conditions URL/content | Internal draft at `/terms-and-conditions/`; currently `noindex,follow` and excluded from sitemap | Reservation terms and public launch |
| Reservation URL/workflow | Internal `/reservation/` form exists but has no submission destination | Navigation, conversion flow, structured data |
| Form submission destination | Missing | Quote/reservation delivery |
| Notification email or CRM destination | Missing | Routing and ownership of submissions |
| Women-owned certification type | Not proven by repository contents | Accurate public claim and structured data decisions |
| Approved certification logo | `wbenc-logo.svg` exists, but the asset alone is not proof of certification or approval | Brand/legal compliance |
| Certification permission and usage rules | Missing | Determine whether wording/logo can remain and where it may appear |
| Business hours | Missing | Contact expectations and LocalBusiness data |
| Analytics identifiers/property | Missing | Privacy-reviewed analytics implementation |
| Consent requirements | Missing | Analytics, YouTube, fonts, and form privacy decisions |
| Google Search Console property/access | Missing | Indexing, sitemap, Core Web Vitals, query and canonical monitoring |
| Google Business Profile URL/access | Missing | Local SEO consistency and official profile linking |
| Verified fleet names/capacities | Current FAQ, fleet, and form limits conflict | Accurate forms, content, and customer expectations |
| Approved per-vehicle video URLs | All vehicles currently share a placeholder video ID | Accurate fleet detail content |

## Certification caution

The presence of `public/uploads/wbenc-logo.svg` and women-owned wording is not treated as evidence of an active WBENC certification. Obtain the certificate/entity name, active dates, approved logo file/version, and written usage rules before changing or expanding the claim. No certification schema should be emitted without that evidence.

## Safe update process

1. Have an authorized owner provide the facts and source documents.
2. Record who approved each fact and the approval date.
3. Update the typed configuration in `src/data/site.ts`.
4. Run `npm run check`, `npm run build`, metadata/link validation, and visual regression checks.
5. Only then enable links, structured data, legal-page indexing, analytics, or form delivery that depends on those facts.
