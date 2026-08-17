/**
 * What a player timeline row SAYS. Not how it is painted.
 *
 * The problem this exists to solve, measured on 2026-08-17 across 84 students:
 * a median of 34 rendered rows per player, p90 64, worst 124 — against a
 * render cap of 30, so for most players the cap was doing the editing, by
 * recency, and useful rows fell off the end while noise survived.
 *
 * The cause is that one real-world fact is recorded by three subsystems and
 * the timeline printed all three. One reminder produced five rows
 * (reminder_created, payment_link_sent, delivered, read, and a third copy
 * from student_timeline that also duplicated itself). One payment produced
 * six. A fee cycle that went perfectly generated about fifteen rows saying
 * so — the happy path was the loudest thing on screen.
 *
 * Two rules do almost all of the reduction:
 *   1. a non-failed delivery transition is never a row, it is a badge;
 *   2. a chase sequence collapses to one row carrying every rung's date.
 *
 * Two rules protect what matters, and are asserted mechanically over every
 * fixture rather than case by case:
 *   PROTECTED-SURVIVAL — money, delivery failures, wrong-number facts, roster
 *     moves and payment proof always reach the output.
 *   INDEPENDENT CHANNELS — nothing on the payment side may suppress anything
 *     on the delivery side. A cycle paid in cash after two bounced reminders
 *     renders the payment AND both failures.
 *
 * Mirrored byte-for-byte in behaviour by TimelineRules.kt and pinned by
 * timeline-fixtures.json, which both test suites load. Keep the two in step:
 * a change here without the same change there is how the web app and the
 * phone start telling the owner different stories about the same student.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GEN_ALPHA_TIMELINE_RULES = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  /**
   * The Asia/Kolkata calendar day.
   *
   * Never String(ts).slice(0, 10) — that is the UTC date, and it is why a row
   * at 19:41 IST printed yesterday's date beside today's time: the date came
   * from the string and the time came from toLocaleTimeString with a
   * timeZone. Everything that buckets, sorts or displays a day reads this.
   */
  function istDay(value) {
    if (!value) return "";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10);
    const shifted = new Date(parsed.getTime() + 5.5 * 60 * 60 * 1000);
    return shifted.toISOString().slice(0, 10);
  }

  const DELIVERY_ORDER = ["none", "queued", "sent", "delivered", "read"];

  /**
   * Delivery is derived from the *_at timestamps, never from the status
   * column: the webhook patches status unconditionally, so a late `delivered`
   * callback arriving after a `failed` one overwrites it and the row claims
   * success. A timestamp, once written, is not taken back.
   *
   * Failure is sticky and reported separately, because a failure is its own
   * row — it must never be reduced to "the best thing that happened".
   */
  function deliveryState(row = {}) {
    if (row.failedAt) return "failed";
    if (row.readAt) return "read";
    if (row.deliveredAt) return "delivered";
    if (row.sentAt) return "sent";
    if (row.acceptedAt) return "queued";
    return "none";
  }

  function bestDelivery(a, b) {
    if (a === "failed" || b === "failed") return "failed";
    return DELIVERY_ORDER.indexOf(a) >= DELIVERY_ORDER.indexOf(b) ? a : b;
  }

  /**
   * "Changed: join date, parent phone." — our own trigger's wording, with a
   * fixed shape. This is the ONE place a stored sentence is read, and it is
   * read as a token list, not searched for adjectives.
   */
  function profileChangeTokens(details) {
    const text = String(details || "");
    const match = text.match(/changed:\s*([^.]*)/i);
    if (!match) return [];
    return match[1]
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
  }

  const CONTACT_TOKENS = ["parent phone", "phone", "alternate phone", "whatsapp"];
  const MONEY_TOKENS = ["fee", "fees", "plan", "amount", "discount"];

  const has = (tokens, needles) =>
    tokens.some((token) => needles.some((needle) => token.includes(needle)));

  /**
   * DROP means the fact is recorded better elsewhere and nothing is lost.
   * ATTACH (keep:false with a factKey) means the row feeds a badge onto the
   * row that wins its factKey, and is promoted to a row of its own if nothing
   * else claims that key — so a pre-instrumentation student whose only record
   * is the weaker source still sees something.
   */
  function classifyTimelineRow(row = {}) {
    const source = row.source || "timeline";
    const type = row.eventType || "";
    const status = row.status || "";
    const kind = String(row.messageKind || "");
    const day = istDay(row.occurredAt);
    const drop = { kind: "drop", rank: 999, factKey: "", runGroup: "", keep: false, protected: false };

    if (source === "payment") {
      // Money is rendered from the typed payment row, never from a timeline
      // sentence about it. 122 of 143 payments had no same-day timeline echo,
      // so matching echoes to payments is not possible — and does not need to
      // be, once the payment itself is the row.
      return { kind: "payment", rank: 0, factKey: `pay:${row.id}`, runGroup: "", keep: true, protected: true };
    }

    if (source === "reminder") {
      // reminder_events rows, already filtered to failures/retries upstream.
      return { kind: "failure", rank: 40, factKey: `fail:reminder:${day}`, runGroup: "", keep: true, protected: true };
    }

    if (source === "flow") {
      if (type === "reminder_created") {
        return { kind: "reminder", rank: 10, factKey: `rem:${day}`, runGroup: "reminder", keep: true, protected: false };
      }
      if (type === "payment_link_sent") {
        // Not a second message — it travels inside the reminder.
        return { kind: "reminder", rank: 20, factKey: `rem:${day}`, runGroup: "reminder", keep: false, protected: false };
      }
      if (type === "reminder_send_failed") {
        return { kind: "failure", rank: 15, factKey: `fail:reminder:${day}`, runGroup: "", keep: true, protected: true };
      }
      if (type === "reminder_message_status") {
        if (status === "failed") {
          return { kind: "failure", rank: 10, factKey: `fail:reminder:${day}`, runGroup: "", keep: true, protected: true };
        }
        return { kind: "delivery", rank: 50, factKey: `rem:${day}`, runGroup: "", keep: false, protected: false };
      }
      if (type === "whatsapp_message_status") {
        // Whether a message to the OWNER reached the owner, on the phone he is
        // reading this on. Nothing about a parent, a payment or a number.
        if (kind.includes("manager_alert")) return drop;
        if (status === "failed") {
          const key = kind === "payment_link" ? `fail:reminder:${day}` : `fail:${kind || "whatsapp"}:${day}`;
          return { kind: "failure", rank: 12, factKey: key, runGroup: "", keep: true, protected: true };
        }
        if (kind === "payment_link") {
          return { kind: "delivery", rank: 50, factKey: `rem:${day}`, runGroup: "", keep: false, protected: false };
        }
        return drop;
      }
      if (type === "confirmation_message_status") {
        // A receipt that did NOT arrive is the parent not knowing they are
        // paid up, which is a call the owner has to make. A receipt that did
        // is not news.
        if (status === "failed") {
          return { kind: "failure", rank: 12, factKey: `fail:receipt:${day}`, runGroup: "", keep: true, protected: true };
        }
        return drop;
      }
      if (type === "payment_pending_verification") {
        return { kind: "proof", rank: 5, factKey: `proof:${row.id}`, runGroup: "", keep: true, protected: true };
      }
      if (type === "parent_help_requested") {
        return { kind: "help", rank: 5, factKey: `help:${day}`, runGroup: "", keep: true, protected: false };
      }
      // The parent got as far as the payment page and stopped. One row for the
      // whole stall, whichever signals fired.
      if (type === "upi_app_not_opened") {
        return { kind: "stall", rank: 20, factKey: `stall:${day}`, runGroup: "", keep: true, protected: false };
      }
      if (type === "payment_attempted") {
        return { kind: "stall", rank: 25, factKey: `stall:${day}`, runGroup: "", keep: true, protected: false };
      }
      if (type === "parent_plan_selected") {
        return { kind: "stall", rank: 30, factKey: `stall:${day}`, runGroup: "", keep: true, protected: false };
      }
      return drop;
    }

    // ---- source === "timeline" (genalpha.student_timeline) ----
    switch (type) {
      case "whatsapp_reminder":
        // A third copy of the reminder, and one that duplicates itself. It
        // renders only for students who predate the flow instrumentation.
        return { kind: "reminder", rank: 90, factKey: `rem:${day}`, runGroup: "reminder", keep: false, protected: false };
      case "whatsapp_reminder_failed":
        return { kind: "failure", rank: 40, factKey: `fail:reminder:${day}`, runGroup: "", keep: true, protected: true };
      case "renewal_paid":
      case "joining_fee_paid":
      case "jersey_payment":
      case "payment":
      case "payment_updated":
      case "renewal_updated":
      case "renewal_whatsapp_confirmation":
      case "whatsapp_reminder_retry_scheduled":
      case "payment_pending_verification":
        // Every one of these is an echo of a payment or a message that is
        // already rendered from typed data. Safe to drop precisely BECAUSE
        // the payment row is built from student_payments and cannot go
        // missing when an echo does.
        return drop;
      case "payment_deleted":
        return { kind: "life", rank: 10, factKey: `life:${row.id}`, runGroup: "", keep: true, protected: true };
      case "student_discontinued":
      case "discontinued":
      case "student_rejoined":
      case "whatsapp_contact_blocked":
      case "note":
      case "data_correction":
      case "status_correction":
      case "admission_payment_corrected":
        return { kind: "life", rank: 10, factKey: `life:${row.id}`, runGroup: "", keep: true, protected: true };
      case "admission":
      case "admission_review":
      case "student_created":
      case "created":
      case "creation":
        return { kind: "life", rank: 10, factKey: `life:${row.id}`, runGroup: "", keep: true, protected: false };
      case "fees_updated":
      case "fee_status_updated":
      case "jersey_updated":
        return { kind: "fee_change", rank: 20, factKey: `fee:${row.id}`, runGroup: "", keep: true, protected: false };
      case "profile_updated": {
        const tokens = profileChangeTokens(row.details);
        // A changed phone number is why reminders stop arriving, so it is a
        // record row, not a profile edit. A changed fee is money.
        if (has(tokens, CONTACT_TOKENS)) {
          return { kind: "life", rank: 10, factKey: `life:${row.id}`, runGroup: "", keep: true, protected: true };
        }
        if (has(tokens, MONEY_TOKENS)) {
          return { kind: "fee_change", rank: 20, factKey: `fee:${row.id}`, runGroup: "", keep: true, protected: false };
        }
        return { kind: "profile", rank: 60, factKey: `prof:${row.id}`, runGroup: "profile", keep: true, protected: false };
      }
      default:
        return { kind: "life", rank: 30, factKey: `life:${row.id}`, runGroup: "", keep: true, protected: false };
    }
  }

  function compareRows(a, b) {
    const at = String(a.occurredAt || "");
    const bt = String(b.occurredAt || "");
    if (at !== bt) return at < bt ? 1 : -1;
    if (a.rank !== b.rank) return a.rank - b.rank;
    return String(a.id) < String(b.id) ? -1 : 1;
  }

  /**
   * foldTimeline(rows) -> rows
   *
   * Pure and idempotent: fold(fold(x)) equals fold(x), asserted over every
   * fixture. Callers pass already-normalized rows; this decides what survives
   * and what each survivor says.
   */
  function foldTimeline(rows = []) {
    const classified = rows
      .map((row) => ({ row, cls: classifyTimelineRow(row) }))
      .filter((entry) => entry.cls.kind !== "drop");

    // --- attach and promote, by factKey ---
    const byKey = new Map();
    classified.forEach((entry) => {
      const key = entry.cls.factKey || `solo:${entry.row.id}`;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(entry);
    });

    const folded = [];
    byKey.forEach((entries) => {
      const sorted = entries.slice().sort((a, b) => a.cls.rank - b.cls.rank);
      const keepable = sorted.filter((entry) => entry.cls.keep);
      // Nothing eligible to render claimed this key, so the strongest
      // attacher is promoted rather than lost.
      const winner = keepable.length ? keepable[0] : sorted[0];
      // A promoted `delivery` row means Meta reported on a reminder whose
      // own reminder_created row we never stored — 26 real cases. It is
      // still a reminder as far as the owner is concerned, and calling it
      // "delivery" would render a row with no sentence.
      const kind = winner.cls.kind === "delivery" ? "reminder" : winner.cls.kind;

      let delivery = "none";
      let linkIncluded = false;
      let proofPath = winner.row.proofPath || "";
      let proofBucket = winner.row.proofBucket || "";
      sorted.forEach((entry) => {
        if (entry.cls.kind === "delivery" || entry.cls.kind === "reminder") {
          delivery = bestDelivery(delivery, deliveryState(entry.row));
        }
        if (entry.row.eventType === "payment_link_sent") linkIncluded = true;
        if (!proofPath && entry.row.proofPath) {
          proofPath = entry.row.proofPath;
          proofBucket = entry.row.proofBucket || "";
        }
      });

      folded.push({
        ...winner.row,
        kind,
        rank: winner.cls.rank,
        runGroup: kind === "reminder" ? "reminder" : winner.cls.runGroup,
        protected: sorted.some((entry) => entry.cls.protected),
        deliveryState: kind === "reminder" ? delivery : deliveryState(winner.row),
        linkIncluded,
        proofPath,
        proofBucket,
        // Carried through rather than reset, so folding an already-folded
        // list is a no-op. Without this a re-render silently un-counts every
        // run — which is precisely what the idempotence invariant caught.
        runCount: winner.row.runCount || 1,
        runDates: (winner.row.runDates && winner.row.runDates.length
          ? winner.row.runDates.slice()
          : [istDay(winner.row.occurredAt)]).filter(Boolean),
      });
    });

    folded.sort(compareRows);

    // --- run-collapse adjacent rows of the same runGroup ---
    // Only `reminder` and `profile` have a runGroup, so a failure, a payment
    // or a life event standing between two chase rungs breaks the run by
    // construction. That is deliberate: a run may never swallow one.
    const out = [];
    folded.forEach((row) => {
      const previous = out[out.length - 1];
      if (row.runGroup && previous && previous.runGroup === row.runGroup) {
        previous.runCount += row.runCount;
        row.runDates.forEach((date) => {
          if (date && !previous.runDates.includes(date)) previous.runDates.push(date);
        });
        previous.deliveryState = bestDelivery(previous.deliveryState, row.deliveryState);
        previous.linkIncluded = previous.linkIncluded || row.linkIncluded;
        // The run is titled by its newest member, but keeps the oldest
        // member's timestamp out of the sort by leaving occurredAt alone.
        return;
      }
      out.push(row);
    });

    out.forEach((row) => {
      row.runDates.sort();
    });
    return out;
  }

  return {
    istDay,
    deliveryState,
    bestDelivery,
    profileChangeTokens,
    classifyTimelineRow,
    foldTimeline,
  };
});
