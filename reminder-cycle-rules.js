(function initReminderCycleRules(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.GEN_ALPHA_REMINDER_CYCLE_RULES = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function buildReminderCycleRules() {
  const iso10 = (value) => String(value || "").slice(0, 10);

  const maxIso = (first, second) => {
    const a = iso10(first);
    const b = iso10(second);
    if (!a) return b;
    if (!b) return a;
    return b > a ? b : a;
  };

  /**
   * The date the student's current fee cycle became due.
   *
   * Joining fee: a rejoined student restarts from the return date, otherwise the
   * original join date. Renewals: the rejoin-aware paid-through date the caller
   * already computed. Both apps must derive every overdue count from this one value.
   */
  const currentFeeCycleDate = ({ feesPending, joinDate, rejoinedAt, paidThroughDate }) =>
    feesPending ? maxIso(joinDate, rejoinedAt) : iso10(paidThroughDate);

  /**
   * Whether a reminder_events row still describes the student's current fee cycle.
   *
   * Anything persisted on a reminder row (manual_followup_required, delivery status,
   * selected plan, amount) is a fact about ONE billing cycle and expires with it. A row
   * raised for an earlier cycle must never drive today's badge — that is what made a
   * rejoined player read "Manual follow-up" four days into a fresh cycle.
   *
   * Live properties of the student (15+ days overdue, wrong_number, opted_out) are NOT
   * cycle-scoped and must be evaluated outside this gate.
   */
  const isFollowUpForCurrentCycle = ({
    cycleDueDate,
    followUpDueDate,
    followUpCreatedAt,
    rejoinedAt,
  } = {}) => {
    const cycle = iso10(cycleDueDate);
    // Without a cycle date there is nothing to compare against; never suppress on a guess.
    if (!cycle) return true;

    const created = iso10(followUpCreatedAt);
    const rejoin = iso10(rejoinedAt);
    // A row raised before the player returned can never govern the post-rejoin cycle,
    // even if the dates happen to line up.
    if (rejoin && created && created < rejoin) return false;

    const due = iso10(followUpDueDate);
    // A later due date means the row belongs to this cycle or a future one; only an
    // older due date proves the row was raised for a cycle that has since been replaced.
    if (due) return due >= cycle;

    // Legacy rows written before due_date was recorded: fall back to when it was raised.
    return !created || created >= cycle;
  };

  return { currentFeeCycleDate, isFollowUpForCurrentCycle, iso10, maxIso };
});
