# Gen Alpha Web App Changelog Notes

Last updated: 2026-05-15

This file records meaningful web-app changes and cross-app decisions. It is for developer/manager memory, not a public release changelog.

Use this file when:

- The user asks what changed recently.
- A new bug appears and we need to compare with recent edits.
- The user asks to revert a recent UI/logic change.
- A future agent needs to understand why a web design or business rule exists.

For current source-of-truth rules, read `PROJECT_CONTEXT.md` first.

## 2026-05-15

### WhatsApp Flow Timeline Polish

- Player profile timeline tone detection now reads title/details as well as event type, so new WhatsApp flow audit events render as reminder, payment, admission, or danger/error cards instead of plain log rows.
- Added subtle danger styling for failed/error WhatsApp timeline events while keeping payment and reminder events color-coded.
- Verification done:
  - `node --check web-app-repo/script.js`

## 2026-05-14

### Responsive Annotation Fixes

- Added the latest Instagram reel `DYAT0h-TlIL` after the feature video in Academy Moments.
- Kept the Academy Moments helper copy on one line on phone-sized screens.
- Restored desktop Student Movement to the zoomable monthly tile grid by rendering desktop markup without the mobile scroll wrapper.
- Tightened phone Student Movement cards so the bars have less empty horizontal space.
- Improved phone roster card readability by making player names plain, high-contrast text and normalizing the pill heights.
- Hid compact finance chart fee/expense amount labels on desktop while keeping them available on phone screens.
- Reworked desktop month-detail revenue/expense rows into compact two-column cards without changing the phone layout.
- Replaced overlapping mobile roster-card overrides with one cleaner card treatment so the title and status chips stop fighting each other.
- Tightened desktop roster header/filter spacing and refined desktop movement/finance tile sizing so labels no longer feel oversized or clipped.
- Bumped web cache assets to `v28` so the newest roster/finance CSS is picked up without stale PWA styles.
- Rebuilt the phone roster cards again as a final grid-based mobile treatment: player name, slot, status, fee state, and due state now occupy fixed card areas instead of inherited table cells.
- Moved desktop Student Movement labels into the monthly tile footer beside each dot/count and hid the old top-right legend on that panel.
- Made desktop Student Movement hover values visible by allowing the movement bar tooltip layer to escape the bar container.
- Bumped web cache assets to `v29`.
- Replaced the phone roster cards with a flex-card layout so player names and fee/status pills no longer inherit table-column widths or clip off screen.
- Bumped web cache assets to `v30`.
- Softened the phone roster card background treatment and removed the input-like strip behind player names.
- Bumped web cache assets to `v31`.
- Restored mobile fee-due pulse behavior and corrected joining-fee-pending pills so they use the overdue state instead of the safe state.
- Bumped web cache assets to `v32`.
- Added mobile edit-mode action strips to roster cards, restored amber-vs-red overdue threshold styling, and tightened desktop roster table spacing around the action column.
- Bumped web cache assets to `v33`.
- Reworked phone roster edit actions into a reserved card tray so edit/delete/reminder buttons no longer overlay player details.
- Gave roster slot filter counts a separate mini-badge treatment and made active filter chips clearer on small screens.
- Strengthened the phone overdue/joining-fee pulse with a subtle halo while keeping amber for early overdue and red for 7+ days.
- Tightened desktop roster table widths again so the action trigger is visible without making the core columns feel oversized.
- Refined finance mobile pills, expense search/add controls, and expense cards so recent expenses use less vertical whitespace.
- Added a light visual refresh to the admission form panels and fields without changing the form flow.
- Bumped web cache assets to `v34`.
- Combined the separate roster fee-paid and fee-due filters into one Fee filter.
- Fixed phone roster cards so the player name is not duplicated and edit mode uses a flip-style back panel for edit/discontinue/reminder/delete.
- Kept Renew Payment as the only phone edit-mode footer action.
- Removed the duplicate WhatsApp reminder panel from player profile because reminders already exist on roster cards.
- Redesigned player profile/timeline styling into modern event cards with color-coded timeline dots.
- Tightened normal desktop roster table widths separately from edit mode to avoid amount/status overlap.
- Refined mobile finance revenue and expense rows into compact summary cards.
- Bumped web cache assets to `v35`.
- Replaced the faux mobile edit-card reveal with a faster true front/back card flip while keeping Renew Payment outside the flip footer.
- Restored desktop roster table auto sizing after the combined filter/table-width pass caused edit-mode and normal-mode column overlap.
- Softened the player timeline rail on phones so the vertical line is lighter and event dots feel more polished.
- Bumped web cache assets to `v36`.
- Stopped desktop roster action-button clicks from opening player profile behind the action menu.
- Rebuilt the phone edit-card back face so actions sit on the flipped card itself instead of appearing as an extra overlay panel.
- Tightened phone recent-expense cards to match the compact recent-revenue pattern and removed the ghost white field backgrounds from expense and revenue labels.
- Bumped web cache assets to `v37`.
- Made the phone roster edit actions use the card surface itself as the flipped back face so buttons stay inside the same card.
- Removed the forced service-worker controller-change reload that caused a second page refresh a few seconds after opening.
- Bumped web cache assets to `v38`.
- Split phone edit cards into a front Renew Payment footer and a full-size flipped action face so management buttons align inside the same player card.
- Tuned the phone roster flip animation with a stronger 3D rotation, card depth, and back-face button styling.
- Bumped web cache assets to `v39`.
- Replaced the accumulated phone roster flip patches with a dedicated two-sided mobile edit card component.
- Restored the Renew Payment button as a front-card footer independent of the flipped management actions.
- Bumped web cache assets to `v40`.
- Fixed the phone roster flip back face by keeping the player cell visible after flip, so the management buttons can render.
- Bumped web cache assets to `v41`.
- Reworked the phone roster edit flip so the front and back faces animate independently, narrowed the legacy flipped-row fade rule so it cannot dim the phone player card, and forced a new `v44` asset load.
- Bumped web cache assets to `v44`.
- Removed the legacy phone `Actions` table-cell overlay from flipped roster cards so it cannot paint a glass layer above the new back-face buttons.
- Bumped web cache assets to `v45`.
- Verification done:
  - `node --check web-app-repo/script.js`
  - `git diff --check` in `web-app-repo`

## 2026-05-13

### Mobile Manager UI Annotation Fixes

- Refined the mobile manager header with a compact badge/title/action layout and switched the dashboard logo to the cleaner favicon asset.
- Simplified mobile roster rows into compact tap-to-profile summaries so large player lists need much less scrolling.
- Fixed roster row/profile click behavior so tapping a mobile row reliably opens the player profile popup.
- Aligned student movement colors across legend dots, trend lines, and monthly bars; added concise labels under the bars.
- Improved the finance 6-month chart on phones by keeping the current-month border visible and showing compact revenue/expense values near the bars with net below.
- Bumped the service-worker cache and CSS/JS asset versions to reduce stale mobile browser/PWA assets.
- Verification done:
  - `node --check web-app-repo/script.js`
  - `git diff --check` in `web-app-repo`
  - local mobile browser preview checks for roster row popup and finance chart.

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
