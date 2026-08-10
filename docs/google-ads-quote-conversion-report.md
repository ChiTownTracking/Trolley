# Google Ads quote conversion implementation report

## Status

The Google Ads base tag is installed sitewide. The `quote-request` conversion event is not yet implemented because the owner-provided conversion `send_to` identifier was not included in the supplied snippet or repository.

## Files inspected

- `src/layouts/BaseLayout.astro`
- `src/scripts/netlify-forms.ts`
- `src/pages/index.astro`
- `src/styles/global.css`
- `astro.config.mjs`
- `package.json`
- Existing repository tracking references, Netlify form names, submission handling, and environment-variable files

## Files changed

- `src/layouts/BaseLayout.astro`
- `docs/google-ads-quote-conversion-report.md`

## Google tag

- Google tag ID: `AW-18375745058`
- Installed once in the shared base layout
- Loads asynchronously from Google Tag Manager's `gtag.js` endpoint
- Initializes `window.dataLayer` and `window.gtag` before calling the Google Ads config command
- A blocked or delayed external script does not prevent the queue function from accepting initialization commands

## Request quote conversion

- Required `send_to`: not provided
- Expected format: `AW-18375745058/<CONVERSION_LABEL>`
- No placeholder, inferred label, conversion value, currency, or transaction ID was added
- No conversion event currently fires on page load, CTA click, validation failure, successful form submission, or failed form submission

After the exact `send_to` value is supplied, the conversion helper should be called once inside `src/scripts/netlify-forms.ts`, after the Netlify POST returns an HTTP-success response and only when `formName === 'quote-request'`.

## Duplicate-event prevention

The existing shared form handler uses a `WeakSet<HTMLFormElement>` to prevent duplicate concurrent submissions. The future conversion call must stay inside that existing success path, with no second submit listener.

## Failure behavior

The Netlify form remains the primary action. The future Google Ads call must fail silently when `window.gtag` is missing or blocked and must not change the existing success or failure messages.

## Privacy and form isolation

- No form fields or personally identifiable information are sent to Google Ads by this implementation
- Enhanced Conversions are not implemented
- `quote-request`, `contact-us`, and `reservation-request` remain unchanged
- Contact and reservation submissions do not fire a Request quote conversion

## Performance

- The external Google script is asynchronous
- No npm analytics package, hydration, Google Analytics, or Google Tag Manager container was added
- Existing images, fonts, layout, and form behavior were not changed

## Validation

- Node: `v24.14.0` (meets the `>=22.12.0` requirement)
- `npm ci`: attempted, but Windows returned `EPERM` because the running local Astro process had native module files open
- Dependencies restored with the existing package manifest and lockfile using `npm install --no-audit --no-fund`
- Astro check: 40 files, 0 errors, 0 warnings, 0 hints
- Production build: passed, 23 pages generated
- Dependencies added: none
- Package manifest changes: none

## Generated HTML verification

Across all 23 generated HTML pages:

- Pages with exactly one `gtag.js` loader: 23
- Pages with exactly one config call for `AW-18375745058`: 23
- Pages with an unconditional conversion event: 0
- Invalid or duplicate tag pages: 0
- `quote-request` forms: 1
- `contact-us` forms: 1
- `reservation-request` forms: 1

## Live verification status

- Local browser runtime testing: not completed because the in-app browser was unavailable
- Live Netlify quote submission testing: not completed
- Google Tag Assistant: not tested
- Google Ads conversion diagnostics: not verified

## Remaining steps

1. Supply the exact Request quote conversion `send_to` identifier from Google Ads, including its conversion label.
2. Add the conversion call to the verified `quote-request` Netlify success branch.
3. Re-run Astro and generated-output validation.
4. Deploy to Netlify.
5. Connect Google Tag Assistant to `https://chitowntrolley.com/` and confirm `AW-18375745058` is detected.
6. Confirm page load, opening `#getquote`, CTA clicks, validation failures, failed submissions, Contact submissions, and Reservation submissions do not fire the Request quote conversion.
7. Complete one successful test quote and confirm exactly one conversion event with the supplied `send_to` value.
8. Check Google Ads conversion diagnostics after its processing delay; do not treat the conversion as verified before this step.
