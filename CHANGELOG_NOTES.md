# Gen Alpha Web App Changelog Notes

Last updated: 2026-05-09

This file records meaningful web-app changes and cross-app decisions. It is for developer/manager memory, not a public release changelog.

Use this file when:

- The user asks what changed recently.
- A new bug appears and we need to compare with recent edits.
- The user asks to revert a recent UI/logic change.
- A future agent needs to understand why a web design or business rule exists.

For current source-of-truth rules, read `PROJECT_CONTEXT.md` first.

## 2026-05-09

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

