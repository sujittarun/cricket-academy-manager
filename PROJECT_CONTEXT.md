# Gen Alpha Web App Context

Last updated: 2026-05-09

This file is the web repo briefing for Codex/future agents. Read this first before changing the browser app, then verify the relevant implementation files. The Android/native repo has the fuller cross-app context in `/Users/jiths/Documents/New project/PROJECT_CONTEXT.md`.

## Project Identity

- Academy name: Gen Alpha Cricket Academy.
- Public domain: `https://genalphaacademy.in`.
- Web repo path: `/Users/jiths/Documents/New project/web-app-repo`.
- Web remote: `git@github.com:sujittarun/cricket-academy-manager.git`.
- Android/native repo path: `/Users/jiths/Documents/New project`.
- Android remote: `git@github.com:sujittarun/genAlpha-Manager-AndroidApp.git`.
- Keep web and Android feature behavior in sync unless the user says web-only or Android-only.

## Product Rule

- Public landing page must show only the admission form before manager login.
- Parents should not see roster, manager stats, finance, or internal manager text before login.
- After manager login, show dashboard/roster/attendance/finance as appropriate.
- After logout, return to admission-only landing page.
- If a shared feature changes in web, check Android too.
- If a field is added, check Supabase schema/RPC, web form/render/edit flows, Android models/repository/UI, receipts/finance/timeline if relevant.
- Update `CHANGELOG_NOTES.md` automatically for meaningful feature work, bug fixes, database changes, UI redesigns, payment/reminder changes, and anything pushed to GitHub.
- Update this context only when stable project truth changes.

## Key Web Files

- `/Users/jiths/Documents/New project/web-app-repo/index.html`
- `/Users/jiths/Documents/New project/web-app-repo/script.js`
- `/Users/jiths/Documents/New project/web-app-repo/styles.css`
- `/Users/jiths/Documents/New project/web-app-repo/supabase-config.js`
- `/Users/jiths/Documents/New project/web-app-repo/pay.html`
- `/Users/jiths/Documents/New project/web-app-repo/manifest.webmanifest`
- `/Users/jiths/Documents/New project/web-app-repo/assets/...`

## Admission Form

- Admission form is public and parent-friendly.
- It creates an admission record and should go through manager review before roster approval.
- Fields include:
  - applicant name and initial for jersey naming.
  - filled by: Parent / Guardian, Coach, Manager.
  - DOB, age, gender, nationality.
  - father/guardian, parent contact, alternate contact.
  - city, address, school/college, grade where supported.
  - parent Aadhaar optional; do not use "NIDA" wording.
  - time slot.
  - join date defaults to today but can be picked.
  - fee paid yes/no, payment plan, amount/custom amount.
  - jersey size and jersey pairs.
  - comments/special requests optional.
  - skills and playing style; "Kick start the journey now" disables detailed style choices.
  - consent and terms mandatory.
- Mobile number validation: parent and alternate contact should be 10 digits when provided/required.
- Payment is not mandatory. If fees paid is "No", no receipt should be generated at submit time.
- Parent UPI payments are not automatically verified. If a parent marks payment made or enters UTR/reference, show/store it as `Payment pending verification`: keep `fees_paid=false`, keep the submitted amount/reference for manager review, do not count it in finance, and do not generate receipt until manager verifies/marks paid.

## Fees and Renewal Logic

Current fee constants:

- Monthly base: Rs 3,500.
- One-time admission fee: Rs 500.
- 3 months base before discount: Rs 10,500.
- 3 months payable after 5% discount: Rs 9,975.
- 6 months base before discount: Rs 21,000.
- 6 months payable after 10% discount: Rs 18,900.
- Special training: Rs 10,000 per month.
- Admission first payment adds Rs 500 one-time fee to selected plan.
- Renewal amounts do not include admission fee.
- Use selected plan/month count for due-date calculation, not manually typed amount.
- 3-month and 6-month payments must extend due date by 3 or 6 months.
- Renewal day should follow the join/cycle day, not the late payment date.
- Example: joined March 3, paid renewal April 10; next cycle starts April 3, not April 10.

## Roster and Player Profile

- Desktop roster should remain table-like and centered. Do not unexpectedly convert desktop roster into mobile cards.
- Avoid ugly horizontal scroll where possible, but do not hide important manager data.
- Player names in alerts should be clickable and scroll/open player details.
- Edit player should include parent/contact/school/grade/address plus player, slot, fee/status, jersey fields.
- Do not show payment method, UTR/reference, and comments in basic edit panel unless explicitly requested.
- Discontinued players should not count as active or paid for active-player stats.
- Player profile should show parent details, training duration, total paid, paid months/plans, attendance days/calendar, and timeline in small informational style.

## Attendance

- Attendance page should have search and batch/time-slot filters.
- Attendance changes must sync quickly between browser and Android without manual refresh.
- Check Supabase realtime publication/subscriptions if instant sync breaks.

## Finance

- Finance appears only after manager login.
- Tracks revenue via `student_payments` and expenses via `academy_expenses`.
- Finance range filters should be compact and clean.
- "Last month" means previous calendar month. Do not re-add "1 week" unless requested.
- Metrics should reflect selected date range.
- Month details popup should show revenue and expenses side by side.
- Revenue detail should show joining and renewal totals as submetrics, not large independent pills.
- Add expense should be popup/dialog.
- Expenses need filter/sort/delete.

## WhatsApp Reminders and UPI

- Provider: Meta WhatsApp Cloud API direct.
- Template: `gen_alpha_fee_reminder`.
- Language: `en`.
- Template has exactly 2 body variables:
  - `{{1}}`: parent/player display name.
  - `{{2}}`: due date only, e.g. `5th May`.
- Manual reminders only for now. Do not enable automatic reminder schedule until user asks.
- Reminder options: 1 Month, 3 Months, 6 Months, Need Help.
- Razorpay is paused/not used.
- Current non-gateway UPI flow must not auto-mark paid. Treat parent payment claims as pending verification until a manager confirms.
- Renewal WhatsApp payment flow:
  - Parent selects a renewal plan in WhatsApp.
  - Function sends payment page link with reminder event id.
  - When parent taps `Pay Now` on `pay.html`, call the WhatsApp function with `payment_attempted`, update reminder/payment-link status, and send: `After payment, just reply here with "Paid" or send the payment screenshot.`
  - If parent replies `Paid` or sends a screenshot/image/document in WhatsApp, mark reminder/payment-link as `payment_pending_verification` and reply: `Once the academy confirms the payment, we’ll update your renewal. Thank You!`
  - Store parent payment proof details in `reminder_events.meta_response.payment_confirmation`; raw inbound webhook payloads go to `whatsapp_webhook_events`; screenshot/document media should be stored in private Supabase Storage bucket `payment-proofs` when Meta media download succeeds.
  - Still do not mark renewal paid, extend due date, count finance revenue, or send receipt until manager verifies payment.
  - When manager records/verifies a renewal payment in roster, send a WhatsApp confirmation with player name and renewal period from cycle start date to selected plan end date.
  - Manager verification should update reminder/payment-link status to `payment_confirmed` and add timeline/debug metadata where possible.
- Current UPI ID in web config/code: `9059962499@ybl`.
- Payment phone: `9059962499`.
- Account name: Srinivas.
- Bank: Kotak Mahindra Bank.
- Payment page: `https://genalphaacademy.in/pay.html`.

## Supabase

- Database is Supabase Postgres.
- Important tables: `students`, `admissions`, `registration_counters`, `attendance`, `student_timeline`, `student_payments`, `academy_expenses`, `system_settings`, `reminder_events`, `payment_link_requests`, `whatsapp_webhook_events`.
- Important RPCs/functions: `submit_admission_form`, `peek_next_admission_reg_no`, `approve_admission`, `reject_admission`, `mark_player_attendance`, `unmark_player_attendance`.
- Do not rerun full `schema.sql` on existing DB unless user confirms reset/fresh DB.
- Prefer incremental SQL migrations.
- If RPC signature changes, update both web and Android payloads.
- If Supabase SQL editor injects RLS SQL into a dollar-quoted function and breaks syntax, split/run clean SQL instead.

## Removed or Paused

- AI/OCR upload/import for old handwritten admission forms is removed/paused.
- Do not bring back raw OCR text UI.
- Razorpay is paused.
- Automatic WhatsApp reminders are paused.
- Do not show parent-facing manager/internal helper text like "Manager tools stay locked" on the public admission page.

## Branding and Web UX

- Use academy logo/badge without stretching.
- Browser favicon/PWA icon should use the clean current favicon/logo asset.
- Header should use the logo once and remain simple.
- Academy colors are blue/navy and gold/yellow, with red only for immediate attention.
- Cache/versioning matters: browser should not keep stale old versions after updates.
- Academy Moments/reels are mainly for browser. Instagram playback has platform limitations; avoid designs that slow or clutter admission form.

## Git and Verification

- Web commit/push from `/Users/jiths/Documents/New project/web-app-repo` to `origin main`.
- Do not commit Android changes in this repo.
- Before pushing, run `git status`.
- For layout changes, verify desktop and mobile browser behavior where possible.
- For Supabase/RPC changes, confirm signatures match web and Android.
- For fee changes, test monthly/3-month/6-month/custom/special and due dates.
