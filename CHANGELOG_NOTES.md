# Gen Alpha Web App Changelog Notes

Last updated: 2026-05-13

This file records meaningful web-app changes and cross-app decisions. It is for developer/manager memory, not a public release changelog.

Use this file when:

- The user asks what changed recently.
- A new bug appears and we need to compare with recent edits.
- The user asks to revert a recent UI/logic change.
- A future agent needs to understand why a web design or business rule exists.

For current source-of-truth rules, read `PROJECT_CONTEXT.md` first.

## 2026-05-13

### Mobile Roster And Finance Layout Polish

- Browser-only mobile UI pass; desktop roster/table layout intentionally preserved.
- Roster student movement now uses the same compact horizontal swipe-card rhythm as the finance mini chart on small screens.
- Roster tools/search/filters now use a cleaner mobile control panel instead of cramped wrapped pills.
- Finance stats stay as side-by-side compact tiles on phones, including very small screens, without horizontal scrolling.
- Roster stat tiles now stay side by side on phones with a more compact metric treatment, and roster panel spacing was tightened to remove the oversized gap between stacked sections.
- Student movement cards now use shorter structured labels so the trend chip, count text, and bars do not bleed outside the cards on narrow screens.
- Verification done:
  - `node --check web-app-repo/script.js`

## 2026-05-09

### Payment Verification UI

- Roster/profile fee status now uses latest WhatsApp reminder/payment-link state to show `Reminder sent`, `Pending verification`, or `Paid`.
- Player profile now shows `Confirm payment received` when a parent has replied `Paid` or sent a screenshot and the payment is awaiting manager verification.
- Confirming payment records the renewal payment with the selected WhatsApp plan amount/months, updates renewal dates, and triggers the renewal confirmation WhatsApp.
- Timeline payment-proof entries can show stored screenshot thumbnails and open them in a viewer when the proof exists in private Supabase Storage.

### Renewal Verification WhatsApp and Proof Logging

- Changed parent payment-proof reply to: `Once the academy confirms the payment, we’ll update your renewal. Thank You!`
- When staff records a renewal payment, the WhatsApp function now sends a renewal confirmation with player name, selected plan, and renewal date range.
- Parent `Paid` text or screenshot/document replies are stored in reminder debug metadata; raw webhook payloads remain in `whatsapp_webhook_events`.
- Screenshot/document payment proof media is downloaded from Meta and stored in private Supabase Storage bucket `payment-proofs` when possible.
- Added explicit timeline/debug events for parent payment proof received and renewal confirmation sent.

### Renewal Payment WhatsApp Follow-Up

- Updated `pay.html` so tapping `Pay Now` calls the Supabase WhatsApp function with `payment_attempted` when the link includes a reminder event id.
- The live function sends the parent: `After payment, just reply here with "Paid" or send the payment screenshot.`
- If parent replies `Paid` or sends a screenshot/image/document, the function marks the reminder/payment-link as `payment_pending_verification` and replies: `Once the academy confirms the payment, we’ll update your renewal. Thank You!`
- This does not auto-renew, count finance revenue, or send receipt. Manager verification is still required.
- Verification done:
  - `node --check web-app-repo/script.js`
  - safe deployed endpoint smoke test returned `eventId is required`.

### Payment Pending Verification Status

- Added `Payment pending verification` behavior in the web admission and roster/review UI.
- Parent UPI payment claims no longer auto-mark fees paid.
- Submitted UPI amount/reference is kept for manager review, while finance/paid stats/receipts stay unconfirmed until manager verifies payment.
- Admission payment copy now explains that receipts are sent only after academy confirmation.
- Verification done:
  - `node --check web-app-repo/script.js`

### Web Context and Changelog Files

- Added `PROJECT_CONTEXT.md` and this `CHANGELOG_NOTES.md` to the web repo.
- Reason: future Codex sessions need reliable web-specific context without rereading long chat history.
- Decision: web context is web-focused but still includes shared Supabase, fee, reminder, admission, roster, attendance, finance, and Android-sync rules.
- The Android/root repo has the fuller cross-app context.

## Recent Stable Decisions To Preserve

- Web public landing page should show only the admission form before manager login.
- After manager login, show dashboard/roster/attendance/finance as appropriate.
- After logout, return to admission-only landing page.
- Shared feature changes should be checked in Android too unless user says web-only.
- WhatsApp reminders are manual only for now.
- Razorpay is paused; UPI payment page/link is used.
- AI/OCR upload/import for handwritten forms is removed/paused.
- Current UPI ID is `9059962499@ybl`.
- Current WhatsApp reminder template uses two variables and language `en`.

## How To Add Future Entries

Add the newest entry at the top under a date heading. Keep each entry short but include:

- What changed.
- Why it changed.
- Files or features affected.
- Verification done.
- Commit hash if pushed.
