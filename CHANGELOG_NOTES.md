# Gen Alpha Web App Changelog Notes

Last updated: 2026-07-20

This file records meaningful web-app changes and cross-app decisions. It is for developer/manager memory, not a public release changelog.

Use this file when:

- The user asks what changed recently.
- A new bug appears and we need to compare with recent edits.
- The user asks to revert a recent UI/logic change.
- A future agent needs to understand why a web design or business rule exists.

For current source-of-truth rules, read `PROJECT_CONTEXT.md` first.

## 2026-07-20

### Player Profile Scroll and Desktop Simplification

- Replaced the nested player-profile content scroller with one dialog scroller and a sticky profile header.
- Prevented the timeline grid row from collapsing to its padding height on mobile browsers.
- Removed the redundant player subline from desktop roster rows and moved Special training into the Type column.
- Removed the Revenue/Expenses switch on desktop so both finance tables remain visible side by side.

### Mobile Finance Selection and Special Tag Placement

- Made the mobile Revenue/Expenses switch update one consistent active color, class, and accessibility state.
- Returned the desktop Special training pill beside the player name while keeping the redundant desktop subline hidden.

### Current Coaching Plan Classification

- Special training tags now follow the latest joining or renewal coaching plan instead of being blocked by the admission-time plan.
- Jersey transactions are excluded from coaching-plan classification, preserving quarterly players while restoring later Special renewals.

### Payment Proof Viewer Layer

- Payment proof images now open above the player-profile dialog instead of behind it.
- Closing with the button, backdrop, or Escape keeps the player profile open and restores focus to the proof thumbnail.

### Finance Reconciliation and Responsive UI Follow-up

- Unified the web finance overview with its canonical signed revenue ledger so legacy joining fees are excluded when an explicit joining-payment row exists and jersey refunds reduce revenue.
- Removed initials from roster cards, protected long names and special-training labels from overlap, and rebuilt phone/tablet cards into compact information rows without legacy cell patches.
- Made the player-profile content a bounded touch-scroll region and removed the desktop admission decoration that extended into the registration-number section.
- Added phone, tablet, and desktop-specific roster treatments and bumped browser assets to `script.js?v=84`, `ui-refresh.css?v=2`, and service-worker cache `v92`.

### Responsive UI and Player Profile Performance

- Added one scoped `ui-refresh.css` visual layer for the browser manager app so legacy mobile experiments no longer leave patchy cell backgrounds or conflicting title rules.
- Refreshed the app background, header, bottom navigation, roster identity cards, player profile, finance cards, controls, and tablet breakpoints with a consistent blue/green/gold palette.
- Player profiles now display a responsive loading sheet immediately instead of waiting for timeline requests before opening.
- Removed an unused attendance request from profile opening and parallelized the remaining timeline, reminder, and WhatsApp-flow queries.
- Added content visibility to long roster and finance lists, removed the production Tailwind CDN dependency, simplified the signed-in mobile header, and bumped the service-worker cache to `v91`.

## 2026-07-11

### Direct Pay Plan Selection

- Updated `pay.html` so WhatsApp reminders can open the payment page directly with only a reminder event id.
- The payment page now loads event-specific 1 Month, 3 Months, and 6 Months options, lets the parent choose a plan on the page, and sends the selected plan with the `payment_attempted` call before opening UPI.
- Bumped browser service-worker cache to `v83`.

### iOS UPI Payment Handoff

- Updated `pay.html` so iPhone/iPad users see an in-page UPI app selector instead of relying on the Android-style system chooser.
- Kept Android on the direct generic `upi://pay` handoff, while iOS buttons launch PhonePe, Google Pay, Paytm, BHIM, or a generic UPI URL from the user's tap.
- Payment-attempt tracking now runs in the background before app handoff instead of being awaited, which avoids losing the iOS user gesture needed to open payment apps.
- Bumped browser service-worker cache to `v82`.

## 2026-06-18

### Rejoin Renewal Correction

- Corrected the Shreyas K and Mahasvin K live rejoin/payment data with a saved Supabase SQL script in the root project.
- Browser due-date logic now treats an explicit renewal cycle on or after `rejoined_at` as the new billing anchor, so old pause days do not push the next due date past the paid renewal month.
- Training duration and tenure badges now subtract stored pause days, and also stop counting the current open pause while a player is discontinued.
- Marking a discontinued player active in the browser asks for the rejoin date before saving `rejoined_at` and `fee_pause_days`.
- Bumped browser service-worker cache to `v78`.

## 2026-06-15

### Removed Experimental Player Profile V2

- Removed the browser-only V2 player profile implementation and its `player-profile-v2/` assets.
- Removed the Old/New UI switch, query/localStorage feature flags, V2 navigation bridge, render branch, and service-worker entries.
- The existing player profile popup is now the only player-detail experience, including when an old `playerProfileV2=1` URL is opened.
- Bumped browser assets and service-worker cache to `v76`.

### Contextual Wrong-Number Management

- Removed the wrong-number checkbox from the standard Edit Player form.
- Removed wrong-number actions and disabled reminder labels from player action menus.
- Only flagged players see a compact correction note in Edit Player; saving a different valid 10-digit number automatically resumes future reminders and shows a confirmation.
- Bumped browser assets and service-worker cache to `v75`.

## 2026-06-14

### Separate Fee Follow-Up And Due Labels

- The Fees paid column keeps `Manual follow-up` for players whose automatic reminders have stopped.
- The Next fee due column now continues to show the calendar status (`15 days overdue`, `Due today`, or days left) for both joining and renewal fees.
- This is presentation-only: the 15-day reminder cutoff, manual-follow-up flag, retry behavior, payment state, and due-date calculations are unchanged.
- Bumped browser assets to `v72` so the corrected roster label is not hidden by an older service-worker cache.

### Wrong WhatsApp Number Follow-Up

- Player edit mode now includes a `Wrong phone number` switch for the saved WhatsApp contact.
- Wrong-number players remain in `Manual follow-up`, with `Wrong phone number` shown beneath the fee-status pill while Next fee due continues showing its day count.
- Reminder actions are disabled until the number is corrected; the shared Edge Function and database trigger also block automatic sends and queued retries.
- Bumped browser script, styles, and service-worker cache to `v73`.

## 2026-06-11

### Non-Retryable Reminder Follow-Up

- Manual follow-up tooltips now distinguish permanent WhatsApp delivery/template failures from the existing 15+ overdue cutoff instead of always describing the player as 15+ days overdue.
- Updated reminder documentation to use the exact approved Meta heads-up template name `utlity_fee_headsup`; the previous spelling caused Meta error `132001`.
- Bumped the browser script/service-worker cache version to ensure the updated reminder status wording is loaded instead of stale code.

## 2026-06-04

### WhatsApp Utility Template Context

- Updated project context to use `utility_fee_headsup`, `utility_renewal_day`, and `utility_for_fee_reminder` for parent fee reminder templates.
- Documented that manager alert templates `manager_payment_alert` and `manager_payment_alert_with_proof` remain unchanged because they are already utility templates.
- Corrected the reminder notes to reflect the active automatic Supabase scheduler plus manual reminder actions.

### Manual Follow-Up Cutoff

- Browser roster fee chips and next-fee-due chips now show `Manual follow-up` once joining or renewal fees are 15+ days overdue.
- The player profile banner explains that automatic WhatsApp reminders are paused after that cutoff.

### WhatsApp Timeline Message Bodies

- Player timelines now show stored reminder template message text for `Fee reminder prepared` rows when available.
- This pairs with the Supabase function change that records rendered parent-facing template message bodies in `whatsapp_flow_events.message_body`.

### Early Renewal Payments

- Browser roster actions now show `Renew Payment` for any active paid player, even before the next due date.
- The renewal popup keeps the cycle anchored to the next due date, so early payment extends the correct future cycle.

## 2026-05-25

### Experimental Player Profile V2

- Added a browser-only A/B test for a full-screen player profile under `player-profile-v2/`.
- The current player popup remains the default. V2 opens only when `?playerProfileV2=1` is present or `localStorage.setItem("genAlpha.playerProfileLayout", "v2")` is set.
- V2 separates player identity, fee health, attendance, contact, kit/profile, and timeline into a whole-screen view with quieter action placement.
- Added `?playerProfileV2Mock=1` for safe visual QA without touching live player data.
- Updated the experimental V2 view into a screenshot-inspired admin workspace with a dark academy sidebar, breadcrumb/search header, player summary strip, Billing-first tabs, fee breakdown tables, pause/reminder right rail, and mobile-responsive stacking.
- Bumped V2 asset query strings and service-worker cache to `v64`, and made V2 assets network-first to avoid stale experimental UI during QA.
- Added an in-roster `Player UI` switch so managers can choose Old UI or New UI without editing URL flags. The choice is saved locally and switching back to Old UI clears V2 URL test flags.
- Moved the `Player UI` switch to the top registered-players header and made V2 sidebar navigation/back controls return to the real roster, attendance, or finance app views.
- Replaced the `Player UI` dropdown with a compact iPhone-style Old/New toggle switch.
- Added a student life-event timeline migration for status/profile/payment changes while keeping attendance out of timeline, and upgraded Player Profile V2 with a filtered history feed plus a six-month attendance calendar.

### Reminder Status and Joining Fee Simplification

- Fee-status pills now show `Reminder failed` for failed WhatsApp/Meta reminders instead of treating every attempted reminder as `Reminder sent`.
- Player profile timeline loading now includes failed reminder fallback entries with provider reason details from `reminder_events` when the DB timeline trigger has not captured the update yet.
- Player timelines now collapse reminder attempts to one `WhatsApp reminder prepared` item plus one final `Reminder failed`/`Reminder delivered` item, hiding accepted/legacy duplicates and long phone/template message bodies.
- Simplified `Record joining fee`: joining mode hides the separate `Amount paid` field, preloads jersey size/pairs, derives jersey amount from pair count at Rs 750 each, and saves jersey size/pairs with the joining payment row.
- Fixed admission banner spacing under the admission heading.
- Verification done:
  - `node --check web-app-repo/script.js`
  - `git diff --check`
  - Browser DOM check on a fresh local static server confirmed the edited fields, readonly jersey amount, and positive admission heading/banner gap.

### Joining Fee Split Payment Wiring

- Updated the `Record joining fee` popup to show coaching fee, admission fee, jersey amount, and total due split fields.
- Joining payments now attempt to save the split on `student_payments` and update the same split on the player record while keeping `amount_paid` as the actual received amount.
- Added schema-cache fallbacks so payment save still works before the new Supabase payment split migration is applied.
- Bumped web cache assets to `v62`.

### Desktop Roster Action Menu Stability

- Fixed the desktop roster three-dot action menu so the body portal is the only visible dropdown.
- Hardened close/open handling to remove stale duplicate portals, reset trigger state, and keep inline row dropdowns as hidden templates while the portal is open.
- Verified repeated open, switch-row, same-row close, outside click, and single-visible-menu assertions at desktop browser size.
- Bumped web cache assets to `v61`.

### Simplified Admission Amount Paid Wiring

- Removed the visible manual "Amount paid" override from public admission and manager player create/edit forms.
- Kept the database/RPC `amount_paid` wiring stable: paid/pending admissions now submit the calculated total, unpaid submissions submit Rs 0, and existing paid player edits preserve the stored paid amount.
- Custom or partial collections should use the manager joining-fee or renewal payment action, where the payment amount remains editable.
- Bumped web cache assets to `v60`.
- Verification done:
  - `node --check web-app-repo/script.js`
  - `git diff --check`
  - Small-screen browser check at 390 px confirmed admission has no `Amount paid now`, manager edit form has no manual amount field, and edit-card player names are visible without overlapping status.

## 2026-05-24

### Cross-App Implementation Rule

- Strengthened the project instruction that this workspace has separate Android and web app projects.
- Future shared logic, business-rule, validation, payment/reminder, schema/RPC, and bug-fix work must be checked and implemented in both apps unless the user says one app only.
- Added explicit guidance to fit changes into each app's own architecture, design, navigation, and flow instead of copying UI/code blindly.

### Project Verification and Push Rule

- Added a standing project instruction to audit code/UI changes before finishing, including edge cases and rough rendered UI states.
- Added a standing project instruction to commit and push completed code changes to GitHub after verification unless the user says to keep them local or pause before publishing.

### Mobile Edit Card Player Names

- Made phone-sized roster edit cards keep the player name visible as a full-width title on the front face.
- Added the player name to the flipped mobile action face so Edit/Discontinue/Reminder/Delete actions still show which player is being managed.
- Bumped web cache assets to `v59`.

### Editable Fee Split and Roster Action Cleanup

- Changed admission and manager player-entry fee breakdown tiles into editable amount fields for coaching fee, admission fee, jersey amount, and total.
- Wired fee split values into the admission submit payload and manager `kidForm` student payload with safe fallback when the Supabase fee-split migration has not been applied yet.
- Consolidated roster action-menu click handling so only one menu can stay open, menus close on scroll, and stale floating dropdowns do not follow the page.
- Added cache bump to `v58`.

### Admission Jersey Payment Layout

- Moved the admission `Pay now` button below jersey size and jersey pairs.
- Removed the optional label from admission and manager jersey pairs and made pair count active only when jersey size is selected.
- Bumped web cache assets to `v57`.

## 2026-05-23

### Player Edit Fee Split and Blank Values

- Added a compact manager/player edit fee split showing coaching fee, admission fee, jersey amount, and total due.
- Blank amount values are accepted and saved as Rs 0 instead of blocking saves.
- Hardened amount and jersey pair parsing so blank values do not write `NaN` to Supabase.
- Kept renewal pricing unchanged: monthly Rs 3,500, 3 months Rs 9,975, 6 months Rs 18,900.
- Fixed small-screen roster edit cards so the player name remains visible.
- Bumped web cache assets to `v56`.
- Verification done:
  - `node --check web-app-repo/script.js`

### Joining Fee Payment Action

- Added a roster action for joining-fee-pending players to record the first fee payment through the payment popup.
- The popup now switches between joining and renewal modes and includes plan, amount, comment, and payment date.
- In joining-fee mode, the suggested amount includes selected plan amount, admission fee, and jersey amount, but remains editable.
- Joining payments save as `student_payments.payment_type = joining`, mark the student paid, and keep the due cycle anchored to the join date while using payment date for finance reports.
- Bumped web cache assets to `v55`.

### Admission Fee Breakdown and Jersey Charging

- Updated the admission form payment area to show separate coaching fee, admission fee, jersey amount, and total boxes.
- Removed the first-pair-free jersey rule; every selected jersey pair now adds Rs 750.
- Added an optional amount-paid override so parents/managers can submit admissions even when the paid amount is lower than the calculated total.
- Updated jersey pair edit revenue messaging/ledger comments to treat every pair as chargeable.
- Bumped web cache assets to `v54`.
- Verification done:
  - `node --check web-app-repo/script.js`
  - Local preview confirmed monthly + one jersey pair shows Rs 4,750 total.

### Special Training Admission Logic

- Fixed special-training admission amount so it is Rs 10,000 for 1 month instead of adding the admission fee and being inferred as quarterly coverage.
- Added legacy detection for Rs 10,000 first payments so older special-training students show the roster tag and renew after 1 month.
- Changed the web roster tag to a compact special-training badge.
- Corrected Parvez Ali in Supabase by adding an explicit `student_payments` joining row with `plan_type = special` and `months_covered = 1`.
- Bumped web cache assets to `v53`.
- Verification done:
  - `node --check web-app-repo/script.js`

## 2026-05-22

### Jersey First Pair Included Rule

- Made jersey size and jersey pair count optional in the web admission and player-edit forms.
- Changed jersey revenue logic so the first pair is included with joining; only extra pairs above 1 record Rs 750 revenue or refund rows.
- Superseded on 2026-05-23: every selected jersey pair is now chargeable at Rs 750.
- Adjusted initial paid-through inference to subtract extra jersey charges before deciding whether a joining payment covers 1, 3, or 6 months.
- Bumped web cache assets to `v52`.
- Verification done:
  - `node --check web-app-repo/script.js`

## 2026-05-21

### Blank Jersey Size Save Fix

- Fixed player/admission save payloads so blank jersey size is stored as an empty string instead of `NULL`.
- Reason: `students.jersey_size` is `NOT NULL`, and editing a player without a jersey size was failing with a constraint error.
- Bumped web cache assets to `v51`.
- Verification done:
  - `node --check web-app-repo/script.js`

### Jersey Pair Counter and Revenue Ledger

- Added inline jersey-pair +/- controls in roster Edit mode, including a compact phone-card control.
- Each added pair records Rs 750 as `student_payments.payment_type = jersey`.
- Each removed pair records `payment_type = jersey_refund`; the app treats it as negative revenue while keeping the stored amount positive for DB constraints.
- Finance recent revenue, month details, exports, and player payment history now display jersey rows correctly.
- Renewal due-date logic ignores jersey rows so jersey edits do not affect fee renewal calculations.
- Bumped web cache assets to `v50`.
- Verification done:
  - `node --check web-app-repo/script.js`
  - Local preview loaded `script.js?v=50` and `styles.css?v=50`.

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
