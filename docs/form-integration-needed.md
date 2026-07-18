# Form integration needed

No form endpoint, CRM, notification recipient, or provider credentials exist in the repository. Phase 1 did not connect a service or submit real information. It changed the three status panels so they explicitly say that no information was delivered.

## Forms found

### Homepage quote wizard

- Location: `src/pages/index.astro`
- Fields: event type, hours, vehicle, passengers, date, pickup time, pickup location, destination, full name, phone, email, and “How did you find us?” message.
- Required fields: full name, phone, and email. Other trip fields currently have no `required` attribute.
- Current behavior: multi-step client-side accordion; native browser validation; `preventDefault()`; no network request; hides the form and focuses a `role="alert"` panel stating that nothing was sent.
- Reset behavior: restores the form, clears values, returns to Step 1, and focuses the first field.

### Contact quote form

- Location: `src/pages/contact.astro`
- Fields: name, email, phone, event date, event type, passengers, and message.
- Required fields: name and email.
- Current behavior: native browser validation; `preventDefault()`; no network request; focuses an explicit not-sent alert.

### Reservation request form

- Location: `src/pages/reservation.astro`
- Fields: name, phone, email, event date, pickup time, vehicle, hours, event type, passengers, alcohol on board, pickup address, drop-off address, and notes.
- Required fields: name, phone, email, event date, and pickup time.
- Current behavior: native browser validation; `preventDefault()`; no network request; focuses an explicit not-sent alert.

## Current capability matrix

| Capability | Current state |
|---|---|
| Submission endpoint | Missing |
| Email/CRM destination | Missing |
| Client validation | Native HTML types, required, min/max, and `reportValidity()` |
| Server validation | None |
| Loading state | None |
| Network error/retry state | None |
| Confirmed success state | None; the UI accurately reports that delivery did not occur |
| Spam protection/rate limiting | None |
| Duplicate prevention/idempotency | None |
| Privacy consent/disclosure | None beside draft policy links |
| Analytics events | None |
| Environment variables | None |
| Sensitive values exposed in source | No credentials; user-entered PII remains only in the browser DOM and is discarded |
| JavaScript required | Yes; there is no HTML action/fallback |
| No-JavaScript submission | Does not work |

## Decisions required before integration

1. Choose the authoritative destination: monitored email inbox, CRM, dispatch/reservation system, or a combination.
2. Choose an implementation boundary:
   - a business-controlled serverless endpoint;
   - a vetted hosted form provider that supports static sites; or
   - a server-side CRM proxy. Never expose a private CRM/API key in browser code.
3. Define which form maps to which destination and whether all fields are necessary.
4. Define spam protection: honeypot, rate limit, challenge, provider filtering, or a documented combination.
5. Approve the privacy notice, purpose, retention period, deletion/access process, processors, and any consent checkbox wording.
6. Define delivery success: provider acceptance alone versus confirmed CRM/email creation.
7. Define accessible loading, field error, global error, retry, success, and duplicate-click behavior.
8. Define monitoring, alerting, and fallback when delivery fails.
9. Decide whether a non-JavaScript fallback is required.

## Environment configuration

Exact variable names must follow the selected provider. Likely server-only categories include:

- form/provider endpoint;
- private provider or CRM credential;
- destination mailbox/list or CRM pipeline identifier;
- webhook signing secret;
- spam-protection secret;
- environment/site identifier.

Secrets must be configured in the serverless/provider environment and must not use Astro's `PUBLIC_` prefix. A browser-visible form identifier is acceptable only when the provider explicitly documents it as public.

## Required success and error behavior

- Disable or lock submission while a request is in flight.
- Validate on the server/provider even when client validation passes.
- Keep entered data available after recoverable errors.
- Associate field errors with controls and provide a focused error summary when appropriate.
- Show and announce success only after a verified acceptance response.
- Give users a retry/direct-contact path on failure.
- Record a non-sensitive submission ID for support; never log full customer PII to analytics or browser console.

Integration remains blocked until the owner supplies the destination, provider/security decision, and approved privacy requirements.
