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

  const latestCoachingPaymentPlans = (payments) =>
    (payments || [])
      .filter((payment) => {
        const paymentType = normalizePlan(payment?.payment_type || payment?.paymentType);
        return paymentType === "joining" || paymentType === "renewal";
      })
      .slice()
      .sort((first, second) => {
        const firstPaidOn = String(first?.paid_on || first?.paidOn || "");
        const secondPaidOn = String(second?.paid_on || second?.paidOn || "");
        const paidOnOrder = secondPaidOn.localeCompare(firstPaidOn);
        if (paidOnOrder !== 0) return paidOnOrder;
        const firstCreatedAt = String(first?.created_at || first?.createdAt || "");
        const secondCreatedAt = String(second?.created_at || second?.createdAt || "");
        return secondCreatedAt.localeCompare(firstCreatedAt);
      })
      .map((payment) => normalizePlan(payment?.plan_type || payment?.planType))
      .filter(Boolean);

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
    // Payment history represents the player's current coaching plan more
    // accurately than the admission-time fee_plan. The caller provides it in
    // latest-first order and excludes non-coaching transactions such as jersey.
    const history = (paymentPlans || []).map(normalizePlan).filter(Boolean);
    const latestPaidPlan = history.find((plan) => VALID_PAID_PLANS.has(plan));
    if (latestPaidPlan) return latestPaidPlan === "special";

    const currentPlan = normalizePlan(feePlan);
    if (currentPlan === "special") return true;
    if (VALID_PAID_PLANS.has(currentPlan)) return false;
    return Boolean(feesPaid) && Math.round(Number(firstPaymentAmount || 0)) === 10000;
  };

  return {
    buildSyntheticJoiningFee,
    fixedMonthsForPlan,
    latestCoachingPaymentPlans,
    normalizePlan,
    shouldTreatAsSpecialTraining,
  };
});
