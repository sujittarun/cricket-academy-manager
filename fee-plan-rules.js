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

  const isCoachingFeePayment = (payment) => {
    const paymentType = normalizePlan(payment?.payment_type || payment?.paymentType);
    return paymentType === "joining" || paymentType === "renewal";
  };

  const latestCoachingPaymentPlans = (payments) =>
    (payments || [])
      .filter(isCoachingFeePayment)
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

  const confirmedJoiningPaymentAmount = ({
    amountPaid,
    totalFeeAmount,
    coachingFee,
    admissionFee,
    jerseyAmount,
    fallbackAmount,
  }) => {
    const receivedAmount = Number(amountPaid);
    if (receivedAmount > 0) return receivedAmount;
    const submittedTotal = Number(totalFeeAmount);
    if (submittedTotal > 0) return submittedTotal;
    const submittedParts = [coachingFee, admissionFee, jerseyAmount]
      .reduce((total, value) => total + Math.max(Number(value) || 0, 0), 0);
    return submittedParts > 0 ? submittedParts : Math.max(Number(fallbackAmount) || 0, 0);
  };

  const buildSyntheticJoiningFee = ({
    feePlan,
    amountPaid,
    totalFeeAmount,
    coachingFee,
    admissionFee,
    jerseyAmount,
    joinDate,
  }) => {
    const requestedPlan = normalizePlan(feePlan);
    const plan = VALID_PAID_PLANS.has(requestedPlan) ? requestedPlan : "monthly";
    const amount = confirmedJoiningPaymentAmount({
      amountPaid,
      totalFeeAmount,
      coachingFee,
      admissionFee,
      jerseyAmount,
      fallbackAmount: PLAN_AMOUNTS[plan] || 3500,
    });
    return {
      selectedPlan: plan,
      monthsCovered: fixedMonthsForPlan(plan) || 1,
      amount,
      cycleStartDate: String(joinDate || ""),
      isSyntheticJoiningFee: true,
    };
  };

  const currentFeeStatus = ({ feesPaid, daysFromDue }) => {
    const isPaid = feesPaid === true || feesPaid === "yes";
    const dueDays = Number(daysFromDue);
    if (isPaid && Number.isFinite(dueDays) && dueDays >= 0) {
      return {
        key: dueDays > 0 ? "renewal_overdue" : "renewal_due",
        label: dueDays > 0 ? "Renewal overdue" : "Renewal due",
        paymentDue: true,
      };
    }
    if (isPaid) return { key: "paid", label: "Paid", paymentDue: false };
    return { key: "not_paid", label: "Not paid", paymentDue: true };
  };

  const rejoinAwarePaidThroughDate = ({
    paidThrough,
    rejoinedAt,
    hasRenewalAfterRejoin,
  }) => {
    const paidThroughDate = String(paidThrough || "").slice(0, 10);
    if (hasRenewalAfterRejoin) return paidThroughDate;
    const rejoinDate = String(rejoinedAt || "").slice(0, 10);
    return rejoinDate || paidThroughDate;
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
    confirmedJoiningPaymentAmount,
    currentFeeStatus,
    fixedMonthsForPlan,
    isCoachingFeePayment,
    latestCoachingPaymentPlans,
    normalizePlan,
    rejoinAwarePaidThroughDate,
    shouldTreatAsSpecialTraining,
  };
});
