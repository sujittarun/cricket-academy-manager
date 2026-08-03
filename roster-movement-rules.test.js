const test = require("node:test");
const assert = require("node:assert/strict");

const { isLeftDuringRange } = require("./roster-movement-rules.js");

test("a player who rejoins in the same month is not counted as left", () => {
  assert.equal(isLeftDuringRange({
    discontinuedAt: "2026-08-03",
    rejoinedAt: "2026-08-03",
    rangeStart: "2026-08-01",
    rangeEnd: "2026-08-31",
  }), false);
});

test("an earlier historical exit remains left when rejoin happens in a later month", () => {
  assert.equal(isLeftDuringRange({
    discontinuedAt: "2026-06-20",
    rejoinedAt: "2026-08-03",
    rangeStart: "2026-06-01",
    rangeEnd: "2026-06-30",
  }), true);
});

test("a player who has not rejoined remains left", () => {
  assert.equal(isLeftDuringRange({
    discontinuedAt: "2026-08-03",
    rejoinedAt: "",
    rangeStart: "2026-08-01",
    rangeEnd: "2026-08-31",
  }), true);
});

test("an exit outside the selected month does not match the left filter", () => {
  assert.equal(isLeftDuringRange({
    discontinuedAt: "2026-07-31",
    rejoinedAt: "",
    rangeStart: "2026-08-01",
    rangeEnd: "2026-08-31",
  }), false);
});
