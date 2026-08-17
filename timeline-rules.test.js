const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { foldTimeline, classifyTimelineRow, istDay, deliveryState } = require("./timeline-rules.js");

const fixtures = JSON.parse(
  fs.readFileSync(path.join(__dirname, "timeline-fixtures.json"), "utf8"),
);

/**
 * The per-case expectations pin the shape of the fold. The two invariants
 * below are what actually protect the owner, because they hold over every
 * case including ones nobody thought to write: a golden row list rots the
 * moment copy changes, an invariant does not.
 */
for (const testCase of fixtures.cases) {
  test(`fold: ${testCase.name}`, () => {
    const folded = foldTimeline(testCase.rows);
    assert.equal(
      folded.length,
      testCase.expect.length,
      `${testCase.why}\ngot: ${JSON.stringify(folded.map((r) => r.kind))}`,
    );
    testCase.expect.forEach((expected, index) => {
      const actual = folded[index];
      assert.equal(actual.kind, expected.kind, `row ${index} kind — ${testCase.why}`);
      assert.equal(actual.runCount, expected.runCount, `row ${index} runCount`);
      if (expected.deliveryState !== undefined) {
        assert.equal(actual.deliveryState, expected.deliveryState, `row ${index} deliveryState`);
      }
      if (expected.linkIncluded !== undefined) {
        assert.equal(actual.linkIncluded, expected.linkIncluded, `row ${index} linkIncluded`);
      }
      if (expected.proofPath !== undefined) {
        assert.equal(actual.proofPath, expected.proofPath, `row ${index} proofPath`);
      }
      if (expected.runDates !== undefined) {
        assert.deepEqual(actual.runDates, expected.runDates, `row ${index} runDates`);
      }
    });
  });
}

test("INVARIANT protected-survival: nothing protected is ever folded away", () => {
  for (const testCase of fixtures.cases) {
    const folded = foldTimeline(testCase.rows);
    for (const row of testCase.rows) {
      const cls = classifyTimelineRow(row);
      if (!cls.protected) continue;
      const survived = folded.some(
        (out) => out.id === row.id || (out.protected && out.kind === cls.kind),
      );
      assert.ok(
        survived,
        `${testCase.name}: protected ${cls.kind} row ${row.id} vanished. ` +
          `Money, delivery failures, wrong-number facts, roster moves and proof must always reach the output.`,
      );
    }
  }
});

test("INVARIANT idempotence: folding a folded list changes nothing", () => {
  for (const testCase of fixtures.cases) {
    const once = foldTimeline(testCase.rows);
    const twice = foldTimeline(once);
    assert.equal(
      JSON.stringify(twice.map((r) => [r.kind, r.runCount])),
      JSON.stringify(once.map((r) => [r.kind, r.runCount])),
      `${testCase.name}: fold is not idempotent, so re-rendering a list would keep changing it`,
    );
  }
});

test("INVARIANT independent channels: adding a payment never removes a delivery row", () => {
  for (const testCase of fixtures.cases) {
    const withoutPayments = testCase.rows.filter((row) => row.source !== "payment");
    if (withoutPayments.length === testCase.rows.length) continue;
    const before = foldTimeline(withoutPayments).filter(
      (row) => row.kind === "failure" || row.kind === "reminder",
    );
    const after = foldTimeline(testCase.rows).filter(
      (row) => row.kind === "failure" || row.kind === "reminder",
    );
    assert.equal(
      after.length,
      before.length,
      `${testCase.name}: a payment changed the delivery side of the timeline`,
    );
  }
});

test("a non-failed delivery transition is never a row", () => {
  // The single largest rule: 911 reminder_message_status rows, 41% of the
  // whole corpus, of which only the failures are worth a line.
  for (const status of ["sent", "delivered", "read", "accepted"]) {
    const cls = classifyTimelineRow({
      source: "flow", eventType: "reminder_message_status", status, id: "x",
      occurredAt: "2026-08-16T09:30:00Z",
    });
    assert.equal(cls.keep, false, `${status} must not render as its own row`);
  }
  const failed = classifyTimelineRow({
    source: "flow", eventType: "reminder_message_status", status: "failed", id: "x",
    occurredAt: "2026-08-16T09:30:00Z",
  });
  assert.equal(failed.keep, true);
  assert.equal(failed.protected, true);
});

test("delivery is read from timestamps, never from the status column", () => {
  // The webhook patches status unconditionally, so a late `delivered`
  // callback can land on top of a `failed` one. A timestamp is not taken back.
  assert.equal(
    deliveryState({ status: "delivered", failedAt: "2026-08-16T09:31:00Z", deliveredAt: "2026-08-16T09:36:00Z" }),
    "failed",
  );
  assert.equal(deliveryState({ readAt: "x", deliveredAt: "y" }), "read");
  assert.equal(deliveryState({}), "none");
});

test("istDay is the Asia/Kolkata day, not a UTC string slice", () => {
  assert.equal(istDay("2026-08-16T19:30:00Z"), "2026-08-17");
  assert.equal(istDay("2026-08-16T18:29:00Z"), "2026-08-16");
  assert.equal(istDay("2026-08-17T02:03:00Z"), "2026-08-17");
});

test("the Android fixture copy has not drifted", () => {
  // The repos are siblings: GenAlpha/ and GenAlphaApp/. The equivalent check
  // in reminder-cycle-rules.test.js pointed one level too shallow, so it
  // silently returned instead of asserting — the parity it claimed to
  // enforce had never once run.
  const androidCopy = path.join(
    __dirname,
    "..",
    "GenAlphaApp",
    "android-app",
    "app",
    "src",
    "test",
    "resources",
    "timeline-fixtures.json",
  );
  assert.ok(
    fs.existsSync(androidCopy),
    `missing ${androidCopy} — the Kotlin mirror must load the same fixtures, and a missing copy fails rather than skips`,
  );
  assert.equal(
    fs.readFileSync(androidCopy, "utf8"),
    fs.readFileSync(path.join(__dirname, "timeline-fixtures.json"), "utf8"),
    "the Android fixture copy has drifted from the web one",
  );
});
