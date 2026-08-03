(function initRosterMovementRules(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.GEN_ALPHA_ROSTER_MOVEMENT_RULES = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function buildRosterMovementRules() {
  const isoDate = (value) => String(value || "").slice(0, 10);

  const isLeftDuringRange = ({ discontinuedAt, rejoinedAt, rangeStart, rangeEnd }) => {
    const leftDate = isoDate(discontinuedAt);
    const startDate = isoDate(rangeStart);
    const endDate = isoDate(rangeEnd);
    if (!leftDate || !startDate || !endDate || leftDate < startDate || leftDate > endDate) return false;

    const returnDate = isoDate(rejoinedAt);
    return !returnDate || returnDate > endDate;
  };

  return { isLeftDuringRange };
});
