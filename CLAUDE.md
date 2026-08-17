# GenAlpha — the manager web app

Tenant `genalpha` on the Academy Manager platform since 2026-08-10.
Deployed to genalphaacademy.in.

This folder now sits under `Academy Manager Business/`, so the platform
`CLAUDE.md` one level up **is inherited automatically** — the house rule,
the migration ledger and the security facts all apply here without being
restated. What follows is only what is specific to GenAlpha.

## The rules that apply here

- **Anything that computes money lives in Postgres.** The renewal popup
  pre-fills from `genalpha.quote_fee()`, which returns what the database
  says this student owes plus their paid-through date. `script.js` used
  to hardcode 3500/9975/18900 while 52 of 81 students were on a
  different rate, and inferred the month count back from the amount —
  which credited six months for a two-month renewal. Do not put a price
  or a month count back in JavaScript.
- **Every client pins the schema.** GenAlpha's tables are views in a
  `genalpha` schema over the shared ones, so each `createClient` needs
  `db: { schema: "genalpha" }`. Without it PostgREST resolves against
  `public` and the query 404s. `intake.js` shipped without it once and
  painted a raw PGRST205 into the history panel.
- **The anon key reads nothing** except the public admission form.
- **A payment-proof object key starts with the tenant.** The
  `payment-proofs` read policy pivots on the first path segment, and the
  edge functions upload as `service_role`, which no policy applies to —
  so a key written without the prefix uploads cleanly and then cannot be
  opened by the staff who are supposed to verify it. Storage answers a
  denied read with `404 NoSuchKey`, so it looks like a lost file rather
  than a permission problem. That was true of every WhatsApp-inbound
  screenshot until 2026-08-17.
- **The timeline shows the screenshot, never its object key.** A storage
  path is not something a manager can act on. `proof_bucket`/`proof_path`
  travel as fields on the flow event and become a thumbnail; both apps
  strip any key still embedded in older `student_timeline` sentences.
- Prefer `paidThrough` from the database over recomputing a date from
  the renewals array.
