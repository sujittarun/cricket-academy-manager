const assert = require("node:assert/strict");
const test = require("node:test");
const {
  buildSyntheticJoiningFee,
  fixedMonthsForPlan,
  latestCoachingPaymentPlans,
  shouldTreatAsSpecialTraining,
} = require("./fee-plan-rules.js");

test("explicit quarterly plan keeps three months for a 10000 payment", () => {
  const joining = buildSyntheticJoiningFee({
    feePlan: "quarterly",
    amountPaid: 10000,
    joinDate: "2026-07-16",
  });
  assert.deepEqual(joining, {
    selectedPlan: "quarterly",
    monthsCovered: 3,
    amount: 10000,
    cycleStartDate: "2026-07-16",
    isSyntheticJoiningFee: true,
  });
  assert.equal(fixedMonthsForPlan("quarterly"), 3);
});

test("10000 does not imply special training when a quarterly plan exists", () => {
  assert.equal(shouldTreatAsSpecialTraining({
    feePlan: "quarterly",
    paymentPlans: ["quarterly"],
    feesPaid: true,
    firstPaymentAmount: 10000,
  }), false);
});

test("legacy amount-only special-training records remain supported", () => {
  assert.equal(shouldTreatAsSpecialTraining({
    feePlan: "",
    paymentPlans: [],
    feesPaid: true,
    firstPaymentAmount: 10000,
  }), true);
});

test("explicit special training remains special", () => {
  assert.equal(shouldTreatAsSpecialTraining({
    feePlan: "special",
    paymentPlans: [],
    feesPaid: true,
    firstPaymentAmount: 10000,
  }), true);
});

test("latest special renewal overrides an older monthly admission plan", () => {
  assert.equal(shouldTreatAsSpecialTraining({
    feePlan: "monthly",
    paymentPlans: ["special", "monthly"],
    feesPaid: true,
    firstPaymentAmount: 4750,
  }), true);
});

test("latest quarterly coaching payment keeps a 10000 admission non-special", () => {
  assert.equal(shouldTreatAsSpecialTraining({
    feePlan: "quarterly",
    paymentPlans: ["quarterly"],
    feesPaid: true,
    firstPaymentAmount: 10000,
  }), false);
});

test("latest regular renewal removes an older special classification", () => {
  assert.equal(shouldTreatAsSpecialTraining({
    feePlan: "special",
    paymentPlans: ["monthly", "special"],
    feesPaid: true,
    firstPaymentAmount: 10000,
  }), false);
});

test("coaching history ignores jersey transactions and sorts latest first", () => {
  assert.deepEqual(latestCoachingPaymentPlans([
    { payment_type: "renewal", plan_type: "special", paid_on: "2026-06-18" },
    { payment_type: "jersey", plan_type: "monthly", paid_on: "2026-07-19" },
    { payment_type: "joining", plan_type: "monthly", paid_on: "2026-05-18" },
  ]), ["special", "monthly"]);
});
