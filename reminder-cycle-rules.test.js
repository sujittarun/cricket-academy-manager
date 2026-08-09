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

test("a missing follow-up is never treated as current", () => {
  assert.equal(isFollowUpForCurrentCycle({ cycleDueDate: "2026-08-03" }), true);
  assert.equal(
    isFollowUpForCurrentCycle({ cycleDueDate: "2026-08-03", followUpDueDate: "2026-08-03" }),
    true,
  );
});

test("the Android fixture copy has not drifted", () => {
  const androidCopy = path.join(
    __dirname,
    "..",
    "android-app",
    "app",
    "src",
    "test",
    "resources",
    "reminder-cycle-fixtures.json",
  );
  if (!fs.existsSync(androidCopy)) return; // android repo not checked out beside the web repo
  assert.equal(
    fs.readFileSync(androidCopy, "utf8"),
    fs.readFileSync(path.join(__dirname, "reminder-cycle-fixtures.json"), "utf8"),
    "android-app/app/src/test/resources/reminder-cycle-fixtures.json must match the web copy",
  );
});
