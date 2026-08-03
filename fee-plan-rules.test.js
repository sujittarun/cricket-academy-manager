const assert = require("node:assert/strict");
const test = require("node:test");
const {
  buildSyntheticJoiningFee,
  currentFeeStatus,
  fixedMonthsForPlan,
  isCoachingFeePayment,
  latestCoachingPaymentPlans,
  rejoinAwarePaidThroughDate,
  shouldTreatAsSpecialTraining,
} = require("./fee-plan-rules.js");

test("paid admission becomes renewal due on the coaching due date", () => {
  assert.deepEqual(currentFeeStatus({ feesPaid: "yes", daysFromDue: 0 }), {
    key: "renewal_due",
    label: "Renewal due",
    paymentDue: true,
  });
  assert.equal(currentFeeStatus({ feesPaid: true, daysFromDue: 2 }).key, "renewal_overdue");
  assert.equal(currentFeeStatus({ feesPaid: true, daysFromDue: -1 }).key, "paid");
  assert.equal(currentFeeStatus({ feesPaid: false, daysFromDue: 0 }).key, "not_paid");
});

test("only joining and renewal payments extend coaching coverage", () => {
  assert.equal(isCoachingFeePayment({ payment_type: "joining" }), true);
  assert.equal(isCoachingFeePayment({ paymentType: " Renewal " }), true);
  assert.equal(isCoachingFeePayment({ payment_type: "jersey" }), false);
  assert.equal(isCoachingFeePayment({ payment_type: "jersey_refund" }), false);
  assert.equal(isCoachingFeePayment({}), false);
});

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

test("rejoin date becomes the next cycle when the paused cycle ended earlier", () => {
  assert.equal(rejoinAwarePaidThroughDate({
    paidThrough: "2026-07-11",
    feePauseDays: 18,
    rejoinedAt: "2026-08-03",
    hasRenewalAfterRejoin: false,
  }), "2026-08-03");
});

test("pause-adjusted date remains when it is later than the rejoin date", () => {
  assert.equal(rejoinAwarePaidThroughDate({
    paidThrough: "2026-07-20",
    feePauseDays: 20,
    rejoinedAt: "2026-08-03",
    hasRenewalAfterRejoin: false,
  }), "2026-08-09");
});

test("a renewal on or after rejoin uses its paid-through date without pause days", () => {
  assert.equal(rejoinAwarePaidThroughDate({
    paidThrough: "2026-09-03",
    feePauseDays: 18,
    rejoinedAt: "2026-08-03",
    hasRenewalAfterRejoin: true,
  }), "2026-09-03");
});
