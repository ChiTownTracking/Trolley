# Netlify Forms integration report

Date: 2026-07-25

## Scope

The existing homepage Quote, Contact Us, and Reservation forms were connected to Netlify Forms without adding a server adapter, Netlify Function, form package, third-party form service, or runtime dependency.

The website remains a static Astro build. Form detection must still be enabled and verified in the live Netlify project.

## Files inspected

- `package.json`
- `package-lock.json`
- `.nvmrc`
- `astro.config.mjs`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/contact.astro`
- `src/pages/reservation.astro`
- `src/components/Header.astro`
- `src/pages/guides/[slug].astro`
- `support.js`
- `docs/form-integration-needed.md`
- `docs/data/issues.json`

Repository-wide searches covered form markup, form names, Netlify attributes, submit handlers, `preventDefault`, status messages, and form-related JavaScript across `.astro`, `.js`, `.ts`, `.css`, `.md`, and `.json` files. The `preventDefault` calls in the header and guide pages are unrelated navigation handlers and were not modified.

## Files changed

- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/contact.astro`
- `src/pages/reservation.astro`
- `src/scripts/netlify-forms.ts` (new)
- `docs/netlify-forms-integration-report.md` (new)

`docs/form-integration-needed.md` and `docs/data/issues.json` were deliberately not updated because live Netlify detection and live form submissions have not been confirmed.

## Forms and field inventory

### Quote request

- Form name: `quote-request`
- Route: `/`
- Location: `src/pages/index.astro`
- Presentation: existing three-step homepage quote wizard
- Business fields (12):
  - `type`
  - `hours`
  - `vehicle`
  - `passengers`
  - `date`
  - `time`
  - `pickup`
  - `dropoff`
  - `name`
  - `phone`
  - `email`
  - `message`
- Required fields preserved: `name`, `phone`, `email`

### Contact Us

- Form name: `contact-us`
- Route: `/contact`
- Location: `src/pages/contact.astro`
- Business fields (7):
  - `name`
  - `email`
  - `phone`
  - `date`
  - `type`
  - `passengers`
  - `message`
- Required fields preserved: `name`, `email`

### Reservation request

- Form name: `reservation-request`
- Route: `/reservation`
- Location: `src/pages/reservation.astro`
- Business fields (13):
  - `name`
  - `phone`
  - `email`
  - `date`
  - `time`
  - `vehicle`
  - `hours`
  - `type`
  - `passengers`
  - `alcohol`
  - `pickup`
  - `dropoff`
  - `notes`
- Required fields preserved: `name`, `phone`, `email`, `date`, `time`

Every approved business field already had a stable `name`. No field names were missing, added, or renamed. No form contains a file-upload field.

## Netlify form markup

Each visible form is statically rendered and now includes:

- A unique `name`
- `method="POST"`
- `data-netlify="true"`
- `data-netlify-form="true"`
- `data-netlify-honeypot="bot-field"`
- A hidden `form-name` input whose value exactly matches the parent form name
- A visually hidden `bot-field` honeypot
- Its existing submit button
- An inline `role="status"` region with `aria-live="polite"`

The matching hidden values are:

| Form | Hidden `form-name` value |
|---|---|
| Quote request | `quote-request` |
| Contact Us | `contact-us` |
| Reservation request | `reservation-request` |

The shared `.netlify-honeypot` rule in `src/styles/global.css` removes the honeypot from the visible layout while leaving it available to Netlify's form parser.

## Shared submission handler

`src/scripts/netlify-forms.ts` is loaded by `src/layouts/BaseLayout.astro` and selects only:

```text
form[data-netlify-form="true"]
```

For each user-initiated submission, it:

1. Prevents the default navigation.
2. Confirms the current target is an `HTMLFormElement`.
3. Calls `reportValidity()`.
4. Uses a `WeakSet` to prevent concurrent duplicate submissions.
5. Disables the submit control.
6. Adds `aria-busy="true"` to the form and submit control.
7. Announces `Sending…`.
8. Creates `FormData` from the complete form.
9. Confirms that `form-name` exists.
10. Converts every entry to `URLSearchParams`.
11. Sends an `application/x-www-form-urlencoded` POST to `/`.
12. Treats only an HTTP `ok` response as success.
13. Restores the submit state in `finally`.

No request is made before the user submits a form.

## Success behavior

On an HTTP-successful response, the handler:

- Resets the submitted form.
- Replaces any previous status with the form-specific success message.
- Restores the submit control and removes `aria-busy`.
- Dispatches a local `netlify-form:success` event.

The homepage wizard listens for that success event only to clear completed-step styling and return the wizard to Step 1. It does not attach a second submit handler.

Success messages:

- Quote: `Thank you. Your quote request has been submitted successfully.`
- Contact: `Thank you. Your message has been submitted successfully.`
- Reservation: `Thank you. Your reservation request has been submitted. This does not confirm availability or a booking.`

## Failure behavior

An unsuccessful HTTP response or network error:

- Does not reset or hide the form.
- Preserves all entered values.
- Restores the submit control.
- Removes `aria-busy`.
- Announces: `Your request could not be sent. Please try again or contact us directly.`
- Logs a technical error without logging submitted personal information.

This is also the expected behavior on GitHub Pages or another host without a Netlify Forms endpoint. The handler does not simulate success.

## Existing JavaScript cleanup

The three page-specific placeholder submit handlers were removed. The old panels that unconditionally displayed `Online request not sent` were also removed.

Generated JavaScript contains one form submit-listener implementation, sourced from `src/scripts/netlify-forms.ts`. The existing homepage accordion, Next/Back controls, validation attributes, vehicle query-string preselection, and non-form page scripts remain in place.

## Accessibility behavior

- Each form has an inline `role="status"` region.
- Each status region uses `aria-live="polite"`.
- Sending state is announced without a browser alert.
- The form and submit control expose `aria-busy` during the request.
- The submit control is disabled during the request.
- Existing native validation and `reportValidity()` remain active.
- Failure leaves the controls and entered values available for correction or retry.

## Generated HTML verification

The production `dist` output was inspected after the build.

| Form | Generated location | Visible form count | POST | Matching hidden name | Honeypot | Status region | Missing fields |
|---|---|---:|---|---|---|---|---|
| `quote-request` | `dist/index.html` | 1 | Yes | Yes | Yes | Yes | None |
| `contact-us` | `dist/contact/index.html` | 1 | Yes | Yes | Yes | Yes | None |
| `reservation-request` | `dist/reservation/index.html` | 1 | Yes | Yes | Yes | Yes | None |

No duplicate visible form was added. No file input was found. A generated-link audit found no broken internal links.

## Validation results

- Node: `v24.14.0` (meets the required `>=22.12.0`)
- `npm ci`: passed; 291 packages installed
- `npm run check`: passed
  - 36 files checked
  - 0 errors
  - 0 warnings
  - 0 hints
- `npm run build`: passed
- Pages generated: 21
- `package-lock.json`: unchanged
  - SHA-256 before and after: `260EF41CDE984EA477764788BABC13E7BD924D08E28872D1A1E46D5E62E1731B`
- Dependency versions: unchanged
- Image, font, SEO, metadata, deployment, and DNS implementations: unchanged

The clean install initially encountered a Windows lock held by stale Astro dev/preview processes for this project. Those non-listening project processes were stopped, after which `npm ci` passed. Unrelated Node processes were not stopped.

`npm ci` reported one high-severity dependency audit finding. It was not changed because this task explicitly excludes dependency upgrades.

## Browser interaction verification

The in-app browser was unavailable, so a real local DOM submission walkthrough could not be completed. No alternative browser-control mechanism was substituted.

Static source and generated-output verification confirms:

- Success requires `response.ok`.
- Failure does not call `form.reset()`.
- The submit state is restored in `finally`.
- Only one submit handler is present for the integrated forms.
- No network request is initiated before a submit event.

## Required Netlify dashboard actions

After these changes are committed and pushed:

1. Open the Netlify project.
2. Go to **Forms**.
3. Click **Enable form detection** if detection is not already enabled.
4. Trigger a new production deployment from `main`.
5. Confirm these forms appear as active:
   - `quote-request`
   - `contact-us`
   - `reservation-request`
6. Submit one realistic live test through each form.
7. Confirm each submission appears under the correct form name.
8. Check Netlify's spam submissions if a test does not appear.
9. Confirm success messages appear only after successful responses.
10. Confirm a failed request preserves the entered information.

Optional email alerts must be configured manually under:

```text
Project configuration
→ Notifications
→ Emails and webhooks
→ Form submission notifications
```

The notification recipient must be confirmed by the business owner. No notification recipient was configured or assumed in code.

## Live verification status

- Netlify form detection: **not yet verified**
- Live quote submission: **not tested**
- Live contact submission: **not tested**
- Live reservation submission: **not tested**
- Email notification delivery: **not configured or tested**

## Remaining blockers

The code and generated static HTML are ready for deployment. Completion still requires:

- Enabling or confirming Netlify form detection.
- Deploying the updated `main` branch.
- Confirming all three active form names in Netlify.
- Completing one live submission through each form.
- Confirming success and failure behavior against the production Netlify endpoint.
- Selecting and configuring any desired form-notification recipient in the Netlify dashboard.

The integration must not be marked fully resolved until those live checks are complete.
