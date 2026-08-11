# GenAlpha — the manager web app

Tenant `genalpha` on the Academy Manager platform since 2026-08-10.
Deployed to genalphaacademy.in.

**This folder sits outside `Academy Manager Business/`, so it does NOT
inherit the platform `CLAUDE.md`.** Read
`/Users/jiths/Documents/Academy Manager Business/CLAUDE.md` before
changing anything that touches the database. Moving this repo under that
folder is planned and would make this file unnecessary.

## The rules that apply here

- **A commit message is one line, at most 100 characters.** Every repo,
  no exceptions. The reasoning goes in a comment above the code it
  explains — somewhere it gets read again.
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
- Prefer `paidThrough` from the database over recomputing a date from
  the renewals array.
