(function (root, factory) {
  const rules = factory();
  if (typeof module === "object" && module.exports) module.exports = rules;
  if (root) root.GEN_ALPHA_FEE_PLAN_RULES = rules;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const PLAN_MONTHS = Object.freeze({ monthly: 1, quarterly: 3, halfyearly: 6 });
  const PLAN_AMOUNTS = Object.freeze({ monthly: 3500, quarterly: 9975, halfyearly: 18900, special: 10000 });
  const VALID_PAID_PLANS = new Set(["monthly", "quarterly", "halfyearly", "special", "custom"]);

  const normalizePlan = (value) => String(value || "").trim().toLowerCase();

  const fixedMonthsForPlan = (value) => PLAN_MONTHS[normalizePlan(value)] || 0;

  const buildSyntheticJoiningFee = ({ feePlan, amountPaid, joinDate }) => {
    const requestedPlan = normalizePlan(feePlan);
    const plan = VALID_PAID_PLANS.has(requestedPlan) ? requestedPlan : "monthly";
    const amount = Number(amountPaid) > 0
      ? Number(amountPaid)
      : Number(PLAN_AMOUNTS[plan] || 3500);
    return {
      selectedPlan: plan,
      monthsCovered: fixedMonthsForPlan(plan) || 1,
      amount,
      cycleStartDate: String(joinDate || ""),
      isSyntheticJoiningFee: true,
    };
  };

  const shouldTreatAsSpecialTraining = ({ feePlan, paymentPlans, feesPaid, firstPaymentAmount }) => {
    const currentPlan = normalizePlan(feePlan);
    if (currentPlan === "special") return true;
    if (VALID_PAID_PLANS.has(currentPlan)) return false;

    const history = (paymentPlans || []).map(normalizePlan).filter(Boolean);
    if (history.includes("special")) return true;
    if (history.some((plan) => VALID_PAID_PLANS.has(plan))) return false;
    return Boolean(feesPaid) && Math.round(Number(firstPaymentAmount || 0)) === 10000;
  };

  return { buildSyntheticJoiningFee, fixedMonthsForPlan, normalizePlan, shouldTreatAsSpecialTraining };
});
