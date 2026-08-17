const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { currentFeeCycleDate, isFollowUpForCurrentCycle } = require("./reminder-cycle-rules.js");

const fixtures = JSON.parse(
  fs.readFileSync(path.join(__dirname, "reminder-cycle-fixtures.json"), "utf8"),
);

test("currentFeeCycleDate matches every shared fixture", () => {
  for (const testCase of fixtures.currentFeeCycleDate) {
    assert.equal(currentFeeCycleDate(testCase.input), testCase.expected, testCase.name);
  }
});

test("isFollowUpForCurrentCycle matches every shared fixture", () => {
  for (const testCase of fixtures.isFollowUpForCurrentCycle) {
    assert.equal(isFollowUpForCurrentCycle(testCase.input), testCase.expected, testCase.name);
  }
});

test("rejoinAwarePaidThroughDate matches every shared fixture", () => {
  const { rejoinAwarePaidThroughDate } = require("./fee-plan-rules.js");
  for (const testCase of fixtures.rejoinAwarePaidThroughDate) {
    assert.equal(rejoinAwarePaidThroughDate(testCase.input), testCase.expected, testCase.name);
  }
});

test("isLeftDuringRange matches every shared fixture", () => {
  const { isLeftDuringRange } = require("./roster-movement-rules.js");
  for (const testCase of fixtures.isLeftDuringRange) {
    assert.equal(isLeftDuringRange(testCase.input), testCase.expected, testCase.name);
  }
});

test("a missing follow-up is never treated as current", () => {
  assert.equal(isFollowUpForCurrentCycle({ cycleDueDate: "2026-08-03" }), true);
  assert.equal(
    isFollowUpForCurrentCycle({ cycleDueDate: "2026-08-03", followUpDueDate: "2026-08-03" }),
    true,
  );
});

test("the Android fixture copy has not drifted", () => {
  // The repos are siblings: GenAlpha/ and GenAlphaApp/. This used to join
  // "..", "android-app", which resolves to a directory that has never
  // existed — and the existsSync guard below turned the miss into a silent
  // return, so the byte-identity this test claims to enforce had never once
  // been asserted. A missing copy now fails, because a check that skips is
  // not a check.
  const androidCopy = path.join(
    __dirname,
    "..",
    "GenAlphaApp",
    "android-app",
    "app",
    "src",
    "test",
    "resources",
    "reminder-cycle-fixtures.json",
  );
  assert.ok(fs.existsSync(androidCopy), `missing ${androidCopy}`);
  assert.equal(
    fs.readFileSync(androidCopy, "utf8"),
    fs.readFileSync(path.join(__dirname, "reminder-cycle-fixtures.json"), "utf8"),
    "android-app/app/src/test/resources/reminder-cycle-fixtures.json must match the web copy",
  );
});
