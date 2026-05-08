const SUPABASE_CONFIG = window.GEN_ALPHA_SUPABASE_CONFIG ?? {};
const PAYMENT_CONFIG = window.GEN_ALPHA_PAYMENT_CONFIG ?? {};

const kidForm = document.getElementById("kidForm");
const kidsTable = document.getElementById("kidsTable");
const kidsTableBody = document.getElementById("kidsTableBody");
const emptyState = document.getElementById("emptyState");
const alertCount = document.getElementById("alertCount");
const alertSummary = document.getElementById("alertSummary");
const criticalAlertCard = document.getElementById("criticalAlertCard");
const criticalAlertCount = document.getElementById("criticalAlertCount");
const criticalAlertSummary = document.getElementById("criticalAlertSummary");
const feesPaidSelect = document.getElementById("feesPaid");
const amountPaidInput = document.getElementById("amountPaid");
const jerseySizeSelect = document.getElementById("jerseySize");
const jerseyPairsInput = document.getElementById("jerseyPairs");
const joinDateInput = document.getElementById("joinDate");
const formMessage = document.getElementById("formMessage");
const saveButton = document.getElementById("saveButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const managerTools = document.getElementById("managerTools");
const logoutButton = document.getElementById("logoutButton");
const accessMode = document.getElementById("accessMode");
const loginHint = document.getElementById("loginHint");
const editorLock = document.getElementById("editorLock");
const authPanel = document.getElementById("authPanel");
const authToggleButton = document.getElementById("authToggleButton");
const authCloseButton = document.getElementById("authCloseButton");
const quickLogoutButton = document.getElementById("quickLogoutButton");
const editModeButton = document.getElementById("editModeButton");
const managerIdentity = document.getElementById("managerIdentity");
const lastLoginHint = document.getElementById("lastLoginHint");
const formPanel = document.getElementById("formPanel");
const recordsHelper = document.getElementById("recordsHelper");
const joinedCount = document.getElementById("joinedCount");
const activeCount = document.getElementById("activeCount");
const paidCount = document.getElementById("paidCount");
const returningCount = document.getElementById("returningCount");
const studentMovementChart = document.getElementById("studentMovementChart");
const admissionReviewPanel = document.getElementById("admissionReviewPanel");
const admissionReviewCount = document.getElementById("admissionReviewCount");
const admissionReviewList = document.getElementById("admissionReviewList");
const slotFilters = document.getElementById("slotFilters");
const globalToast = document.getElementById("globalToast");
const rosterView = document.getElementById("rosterView");
const admissionView = document.getElementById("admissionView");
const rosterTabButton = document.getElementById("rosterTabButton");
const admissionTabButton = document.getElementById("admissionTabButton");
const viewSwitcher = document.getElementById("viewSwitcher");
const mastheadBottom = document.getElementById("mastheadBottom");
const heroLabel = document.getElementById("heroLabel");
const actionHeader = document.getElementById("actionHeader");
const admissionForm = document.getElementById("admissionForm");
const admissionApplicantName = document.getElementById("admissionApplicantName");
const admissionRegNo = document.getElementById("admissionRegNo");
const admissionMessage = document.getElementById("admissionMessage");
const admissionBirthDay = document.getElementById("admissionBirthDay");
const admissionBirthMonth = document.getElementById("admissionBirthMonth");
const admissionBirthYear = document.getElementById("admissionBirthYear");
const admissionAge = document.getElementById("admissionAge");
const admissionNationality = document.getElementById("admissionNationality");
const admissionGender = document.getElementById("admissionGender");
const admissionGuardianName = document.getElementById("admissionGuardianName");
const admissionParentContact = document.getElementById("admissionParentContact");
const admissionAlternateContact = document.getElementById("admissionAlternateContact");
const admissionAadhaar = document.getElementById("admissionAadhaar");
const admissionSchoolCollege = document.getElementById("admissionSchoolCollege");
const admissionCity = document.getElementById("admissionCity");
const admissionAddress = document.getElementById("admissionAddress");
const admissionTimeSlot = document.getElementById("admissionTimeSlot");
const admissionJoinDate = document.getElementById("admissionJoinDate");
const admissionFeesPaid = document.getElementById("admissionFeesPaid");
const admissionFeePlan = document.getElementById("admissionFeePlan");
const admissionCustomAmountLabel = document.getElementById("admissionCustomAmountLabel");
const admissionCustomAmount = document.getElementById("admissionCustomAmount");
const admissionFeeSummary = document.getElementById("admissionFeeSummary");
const admissionJerseySize = document.getElementById("admissionJerseySize");
const admissionJerseyPairs = document.getElementById("admissionJerseyPairs");
const admissionPaymentAssist = document.getElementById("admissionPaymentAssist");
const paymentEntryTitle = document.getElementById("paymentEntryTitle");
const paymentAssistCopy = document.getElementById("paymentAssistCopy");
const paymentDeviceBadge = document.getElementById("paymentDeviceBadge");
const openPaymentPopupButton = document.getElementById("openPaymentPopupButton");
const paymentPopup = document.getElementById("paymentPopup");
const closePaymentPopupButton = document.getElementById("closePaymentPopupButton");
const paymentPopupCopy = document.getElementById("paymentPopupCopy");
const paymentConfigNotice = document.getElementById("paymentConfigNotice");
const paymentAppGrid = document.getElementById("paymentAppGrid");
const paymentGooglePayButton = document.getElementById("paymentGooglePayButton");
const paymentPhonePeButton = document.getElementById("paymentPhonePeButton");
const paymentUpiButton = document.getElementById("paymentUpiButton");
const paymentQrCanvas = document.getElementById("paymentQrCanvas");
const paymentQrCaption = document.getElementById("paymentQrCaption");
const paymentMerchantUpiId = document.getElementById("paymentMerchantUpiId");
const paymentMerchantMobile = document.getElementById("paymentMerchantMobile");
const paymentMerchantName = document.getElementById("paymentMerchantName");
const paymentAmountValue = document.getElementById("paymentAmountValue");
const copyPaymentUpiButton = document.getElementById("copyPaymentUpiButton");
const copyPaymentMobileButton = document.getElementById("copyPaymentMobileButton");
const paymentReturnHint = document.getElementById("paymentReturnHint");
const resetAdmissionButton = document.getElementById("resetAdmissionButton");
const submitAdmissionButton = document.getElementById("submitAdmissionButton");
const admissionReadyToStart = document.getElementById("admissionReadyToStart");
const admissionStyleOptions = document.getElementById("admissionStyleOptions");
const playerDetailPopup = document.getElementById("playerDetailPopup");
const playerDetailContent = document.getElementById("playerDetailContent");
const playerDetailTitle = document.getElementById("playerDetailTitle");
const closePlayerDetailButton = document.getElementById("closePlayerDetailButton");
const renewalPopup = document.getElementById("renewalPopup");
const renewalForm = document.getElementById("renewalForm");
const closeRenewalButton = document.getElementById("closeRenewalButton");
const renewalStudentId = document.getElementById("renewalStudentId");
const renewalPlan = document.getElementById("renewalPlan");
const renewalAmount = document.getElementById("renewalAmount");
const renewalComment = document.getElementById("renewalComment");
const renewalCycleInfo = document.getElementById("renewalCycleInfo");
const renewalMessage = document.getElementById("renewalMessage");

// Attendance
const attendanceTabButton = document.getElementById("attendanceTabButton");
const attendanceView = document.getElementById("attendanceView");
const financeTabButton = document.getElementById("financeTabButton");
const financeView = document.getElementById("financeView");
const financeLock = document.getElementById("financeLock");
const financeExportPanel = document.getElementById("financeExportPanel");
const financeExportMonth = document.getElementById("financeExportMonth");
const financeRangePanel = document.getElementById("financeRangePanel");
const financeRangeTitle = document.getElementById("financeRangeTitle");
const financeRangePeriod = document.getElementById("financeRangePeriod");
const financeRangeFilters = document.getElementById("financeRangeFilters");
const financeCustomRange = document.getElementById("financeCustomRange");
const financeCustomStart = document.getElementById("financeCustomStart");
const financeCustomEnd = document.getElementById("financeCustomEnd");
const reminderSafetyPanel = document.getElementById("reminderSafetyPanel");
const dryRunToggle = document.getElementById("dryRunToggle");
const whatsappReminderToggle = document.getElementById("whatsappReminderToggle");
const paymentLinkToggle = document.getElementById("paymentLinkToggle");
const saveReminderSettingsButton = document.getElementById("saveReminderSettingsButton");
const reminderSettingsMessage = document.getElementById("reminderSettingsMessage");
const exportCsvButton = document.getElementById("exportCsvButton");
const exportPdfButton = document.getElementById("exportPdfButton");
const financeStats = document.getElementById("financeStats");
const financeMonthFees = document.getElementById("financeMonthFees");
const financeFeesLabel = document.getElementById("financeFeesLabel");
const financeExpensesLabel = document.getElementById("financeExpensesLabel");
const financeNetLabel = document.getElementById("financeNetLabel");
const financeInsights = document.getElementById("financeInsights");
const financeMonthExpenses = document.getElementById("financeMonthExpenses");
const financeMonthNet = document.getElementById("financeMonthNet");
const financeMiniChart = document.getElementById("financeMiniChart");
const financeNetTimeline = document.getElementById("financeNetTimeline");
const expenseForm = document.getElementById("expenseForm");
const expenseMessage = document.getElementById("expenseMessage");
const openExpensePopupButton = document.getElementById("openExpensePopupButton");
const expensePopup = document.getElementById("expensePopup");
const closeExpensePopupButton = document.getElementById("closeExpensePopupButton");
const financeMonthPopup = document.getElementById("financeMonthPopup");
const financeMonthPopupTitle = document.getElementById("financeMonthPopupTitle");
const financeMonthPopupContent = document.getElementById("financeMonthPopupContent");
const closeFinanceMonthPopupButton = document.getElementById("closeFinanceMonthPopupButton");
const financeRecent = document.getElementById("financeRecent");
const expenseSearch = document.getElementById("expenseSearch");
const financeExpensesTableBody = document.getElementById("financeExpensesTableBody");
const sortExpenseType = document.getElementById("sortExpenseType");
const sortExpenseAmount = document.getElementById("sortExpenseAmount");
const sortExpenseDate = document.getElementById("sortExpenseDate");
const sortExpensePaidBy = document.getElementById("sortExpensePaidBy");

let expenseSortKey = "date";
let expenseSortOrder = "desc";
let expenseSearchQuery = "";
let rosterSortKey = "joinDate";
let rosterSortOrder = "desc";
let rosterSearchQuery = "";
let rosterStatusFilter = "all";
let rosterJerseyFilter = "all";
let rosterTypeFilter = "all";
let rosterFeePaidFilter = "all";
let rosterFeeDueFilter = "all";
let rosterMovementFilter = null;
let attendanceSearchQuery = "";
let attendanceSlotFilter = "";

const attendanceDate = document.getElementById("attendanceDate");
const attendanceEditorLock = document.getElementById("attendanceEditorLock");
const attendanceSummaryBar = document.getElementById("attendanceSummaryBar");
const attendancePresentCount = document.getElementById("attendancePresentCount");
const attendanceTotalCount = document.getElementById("attendanceTotalCount");
const attendanceFilterBar = document.getElementById("attendanceFilterBar");
const attendanceSearchInput = document.getElementById("attendanceSearchInput");
const attendanceSlotFilters = document.getElementById("attendanceSlotFilters");
const attendanceEmptyState = document.getElementById("attendanceEmptyState");
const attendanceGridContainer = document.getElementById("attendanceGridContainer");
const attendanceTableBody = document.getElementById("attendanceTableBody");
const playerSearchInput = document.getElementById("playerSearchInput");
const rosterStatusFilterInput = document.getElementById("rosterStatusFilter");
const rosterJerseyFilterInput = document.getElementById("rosterJerseyFilter");
const rosterTypeFilterInput = document.getElementById("rosterTypeFilter");
const rosterFeePaidFilterInput = document.getElementById("rosterFeePaidFilter");
const rosterFeeDueFilterInput = document.getElementById("rosterFeeDueFilter");

// Payment verify
const paymentVerifyFlow = document.getElementById("paymentVerifyFlow");
const paymentVerifyForm = document.getElementById("paymentVerifyForm");
const paymentUtrInput = document.getElementById("paymentUtrInput");
const paymentHelpCopy = document.getElementById("paymentHelpCopy");
const receiptPopup = document.getElementById("receiptPopup");
const receiptContent = document.getElementById("receiptContent");
const closeReceiptButton = document.getElementById("closeReceiptButton");
const shareReceiptButton = document.getElementById("shareReceiptButton");
const copyReceiptButton = document.getElementById("copyReceiptButton");
const printReceiptButton = document.getElementById("printReceiptButton");

const TIME_SLOTS = ["6AM", "7:30AM", "4PM", "5:30PM", "7PM"];
const ADMISSION_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const ADMISSION_ONE_TIME_FEE = 500;
const ADMISSION_FEE_PLANS = {
  monthly: { title: "Monthly", base: 3500 },
  quarterly: { title: "3 months", base: 9975 },
  halfyearly: { title: "6 months", base: 18900 },
  special: { title: "Special training", base: 10000 },
  custom: { title: "Custom amount", base: 0 },
};
const RENEWAL_PLANS = {
  monthly: { title: "Monthly", amount: 3500, months: 1 },
  quarterly: { title: "3 months", amount: 9975, months: 3 },
  halfyearly: { title: "6 months", amount: 18900, months: 6 },
  special: { title: "Special training", amount: 10000, months: 1 },
  custom: { title: "Custom amount", amount: 0, months: 1 },
};
const PLAN_DISCOUNT_LABELS = {
  quarterly: "5% discount applied",
  halfyearly: "10% discount applied",
};
const REMINDER_PLAN_OPTIONS = ["monthly", "quarterly", "halfyearly", "need_help"];
const REMINDER_PLAN_LABELS = {
  monthly: "1 Month",
  quarterly: "3 Months",
  halfyearly: "6 Months",
  need_help: "Need Help",
};
const DEFAULT_REMINDER_SETTINGS = {
  whatsappRemindersEnabled: true,
  paymentLinksEnabled: true,
  dryRunMode: false,
  managerPhone: "8143960950",
};
const ADMISSION_YEARS = Array.from({ length: 16 }, (_, index) => String(2010 + index));

const hasSupabaseConfig = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
const supabaseClient =
  hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
    : null;
const isBackendReady = Boolean(supabaseClient);
const LAST_EMAIL_STORAGE_KEY = "gen-alpha-last-manager-email";
const LAST_PASSWORD_STORAGE_KEY = "gen-alpha-last-manager-password";
const PAYMENT_RETURN_STORAGE_KEY = "gen-alpha-payment-return";
const isMobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroidBrowser = /Android/i.test(navigator.userAgent);
const academyPaymentConfig = {
  upiId: String(PAYMENT_CONFIG.upiId || "").trim(),
  mobileNumber: String(PAYMENT_CONFIG.mobileNumber || "9059962499").trim(),
  payeeName: String(PAYMENT_CONFIG.payeeName || "Gen Alpha Cricket Academy").trim(),
  notePrefix: String(PAYMENT_CONFIG.notePrefix || "Gen Alpha admission").trim(),
};

const toLocalIsoDate = (date = new Date()) => {
  const localDate = date instanceof Date ? date : new Date(date);
  return [
    localDate.getFullYear(),
    String(localDate.getMonth() + 1).padStart(2, "0"),
    String(localDate.getDate()).padStart(2, "0"),
  ].join("-");
};

let kids = [];
let pendingAdmissions = [];
let isManagerLoggedIn = false;
let editingKidId = null;
let isAuthPanelOpen = false;
let lastManagerEmail = localStorage.getItem(LAST_EMAIL_STORAGE_KEY) ?? "";
let lastManagerPassword = localStorage.getItem(LAST_PASSWORD_STORAGE_KEY) ?? "";
let activeSlotFilter = "";
let toastTimeoutId = null;
let activeView = "admission";
let hasTriggeredServiceWorkerRefresh = false;
let isEditMode = false;
let admissionPaymentIntentId = "";
let todayAttendanceIds = new Set();
let attendanceDateValue = toLocalIsoDate();
let isFeesVerified = false;
let realtimeStudentsChannel = null;
let realtimeAttendanceChannel = null;
let realtimeFinanceChannel = null;
let realtimeAdmissionsChannel = null;
let financeReloadTimer = null;
let financeLoadSeq = 0;
let financePayments = [];
let financeExpenses = [];
let financeRangeMode = "month-picker";
let latestAdmissionReceipt = null;
let reminderSettings = { ...DEFAULT_REMINDER_SETTINGS };

const getActiveManagerEmail = () => lastManagerEmail || "manager";

const normalizeKid = (kid) => {
  const renewals = Array.isArray(kid.renewals) ? kid.renewals.filter(Boolean) : [];

  return {
    id: kid.id,
    name: kid.name || "",
    age: Number(kid.age) || 0,
    timeSlot: kid.time_slot || "",
    joinDate: kid.join_date || "",
    feesPaid: kid.fees_paid ? "yes" : "no",
    amountPaid: Number(kid.amount_paid) || 0,
    jerseySize: kid.jersey_size || "",
    jerseyPairs: Number(kid.jersey_pairs) || 0,
    renewals,
    addedBy: kid.added_by || "Unknown",
    updatedBy: kid.updated_by || kid.added_by || "Unknown",
    discontinued: Boolean(kid.discontinued),
    discontinuedAt: kid.discontinued_at || "",
    paymentMethod: kid.payment_method || "",
    paymentUpiId: kid.payment_upi_id || "",
    paymentReference: kid.payment_reference || "",
    comments: kid.comments || "",
    filledBy: kid.filled_by || "",
    fatherGuardianName: kid.father_guardian_name || "",
    parentContactNo: kid.parent_contact_no || "",
    alternateContactNo: kid.alternate_contact_no || "",
    schoolCollege: kid.school_college || "",
    grade: kid.grade || "",
    address: kid.address || "",
  };
};

const normalizePendingAdmission = (admission) => ({
  id: admission.id,
  regNo: admission.reg_no,
  applicantName: admission.applicant_name || "",
  age: Number(admission.age) || 0,
  gender: admission.gender || "",
  fatherGuardianName: admission.father_guardian_name || "",
  parentContactNo: admission.parent_contact_no || "",
  alternateContactNo: admission.emergency_contact_no || "",
  schoolCollege: admission.school_college || "",
  city: admission.city || "",
  address: admission.address || "",
  timeSlot: admission.time_slot || "",
  joinDate: admission.join_date || "",
  feesPaid: Boolean(admission.fees_paid),
  amountPaid: Number(admission.amount_paid) || 0,
  jerseySize: admission.jersey_size || "",
  jerseyPairs: Number(admission.jersey_pairs) || 0,
  filledBy: admission.filled_by || "Parent / Guardian",
  comments: admission.comments || "",
  createdAt: admission.created_at || "",
});

const toDatabasePayload = ({
  name,
  age,
  timeSlot,
  joinDate,
  feesPaid,
  amountPaid,
  jerseySize,
  jerseyPairs,
  renewals,
  addedBy,
  updatedBy,
  discontinued,
  fatherGuardianName = "",
  parentContactNo = "",
  alternateContactNo = "",
  schoolCollege = "",
  grade = "",
  address = "",
}, options = {}) => {
  const databasePayload = {
    name,
    age,
    time_slot: timeSlot,
    join_date: joinDate,
    fees_paid: feesPaid === "yes",
    amount_paid: Number(amountPaid),
    jersey_size: jerseySize || null,
    jersey_pairs: Number(jerseyPairs) || 0,
    renewals,
    added_by: addedBy,
    updated_by: updatedBy,
    discontinued: Boolean(discontinued),
  };

  if (options.includeProfileFields !== false) {
    Object.assign(databasePayload, {
      father_guardian_name: fatherGuardianName,
      parent_contact_no: parentContactNo,
      alternate_contact_no: alternateContactNo,
      school_college: schoolCollege,
      grade,
      address,
    });
  }

  return databasePayload;
};

const isMissingStudentProfileColumnError = (error) => {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("schema cache") &&
    ["father_guardian_name", "parent_contact_no", "alternate_contact_no", "school_college", "grade", "address"]
      .some((column) => message.includes(column))
  );
};

const setJoinDateLimit = () => {
  joinDateInput.max = toLocalIsoDate();
  admissionJoinDate.max = toLocalIsoDate();
};

const formatDate = (value) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not renewed";

const addMonthsIso = (dateValue, months) => {
  const date = new Date(`${dateValue}T00:00:00`);
  const originalDay = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + months);
  const daysInTargetMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(originalDay, daysInTargetMonth));
  return toLocalIsoDate(date);
};

const getInitialCoverageMonths = (kid) => {
  if (kid.feesPaid !== "yes" || Number(kid.amountPaid || 0) <= 0) return 0;
  const amount = Number(kid.amountPaid || 0);
  const withoutAdmissionFee = Math.max(amount - ADMISSION_ONE_TIME_FEE, 0);
  const roundedAmount = Math.round(amount);

  if (withoutAdmissionFee >= 18900 || [18900, 19400, 20000, 20500, 21000].includes(roundedAmount)) return 6;
  // Older records may only have total amount, not the selected plan. Treat both
  // discounted and full 3-month totals as quarterly coverage.
  if (
    [9000, 9500, 9975, 10475, 10500, 11000].includes(roundedAmount) ||
    (withoutAdmissionFee >= 9000 && withoutAdmissionFee <= 10500)
  ) {
    return 3;
  }
  return 1;
};

const maxIsoDate = (first, second) => {
  if (!first) return second;
  if (!second) return first;
  return new Date(`${second}T00:00:00`) > new Date(`${first}T00:00:00`) ? second : first;
};

const getStudentPayments = (kid) =>
  financePayments.filter((payment) => (payment.student_id || payment.studentId) === kid.id);

const getPaymentPlanLabel = (planType, monthsCovered) => {
  const plan = RENEWAL_PLANS[planType] || ADMISSION_FEE_PLANS[planType];
  if (plan?.title) return plan.title;
  const months = Number(monthsCovered || 1);
  return months > 1 ? `${months} months` : "Monthly";
};

const getPaymentMonthsCovered = (payment) => {
  const explicitMonths = Math.max(Number(payment.months_covered || payment.monthsCovered || 1), 1);
  const planMonths = RENEWAL_PLANS[payment.plan_type || payment.planType]?.months || 1;
  const amount = Math.round(Number(payment.amount || 0));
  const amountMonths = [18900, 19400, 20000, 20500, 21000].includes(amount)
    ? 6
    : [9000, 9500, 9975, 10475, 10500, 11000].includes(amount)
      ? 3
      : 1;
  return Math.max(explicitMonths, planMonths, amountMonths);
};

const getPlayerPaymentRows = (kid) => {
  const rows = [];
  if (kid.feesPaid === "yes" && Number(kid.amountPaid || 0) > 0) {
    const months = getInitialCoverageMonths(kid);
    rows.push({
      date: kid.joinDate,
      title: "Joining payment",
      plan: months > 1 ? `${months} months + admission` : "Monthly + admission",
      months,
      amount: Number(kid.amountPaid || 0),
    });
  }
  getStudentPayments(kid).forEach((payment) => {
    const months = getPaymentMonthsCovered(payment);
    rows.push({
      date: payment.paid_on || payment.paidOn,
      title: payment.payment_type === "joining" || payment.paymentType === "joining" ? "Joining payment" : "Renewal payment",
      plan: getPaymentPlanLabel(payment.plan_type || payment.planType, months),
      months,
      amount: Number(payment.amount || 0),
    });
  });
  return rows.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
};

const getPaidThroughDate = (kid) => {
  let paidThrough = kid.feesPaid === "yes"
    ? addMonthsIso(kid.joinDate, getInitialCoverageMonths(kid))
    : kid.joinDate;

  kid.renewals.forEach((renewalDate) => {
    paidThrough = maxIsoDate(paidThrough, addMonthsIso(renewalDate, 1));
  });

  getStudentPayments(kid).forEach((payment) => {
    const cycleStart = payment.cycle_start_date || payment.cycleStartDate || payment.paid_on || payment.paidOn;
    const monthsCovered = getPaymentMonthsCovered(payment);
    if (cycleStart) {
      paidThrough = maxIsoDate(paidThrough, addMonthsIso(cycleStart, monthsCovered));
    }
  });

  return paidThrough;
};

const getNextRenewalCycleDate = (kid) => {
  return getPaidThroughDate(kid);
};

const getDueCycleDate = (kid) => {
  return getPaidThroughDate(kid);
};

const getRenewalStatusLabel = (kid) => {
  if (kid.discontinued) return "Tracking paused";
  if (kid.feesPaid !== "yes") return "Join fee pending";
  const daysPastDue = getDaysSinceDate(getPaidThroughDate(kid));
  if (daysPastDue > 1) return `${daysPastDue} days overdue`;
  if (daysPastDue === 1) return "1 day overdue";
  if (daysPastDue === 0) return "Due today";
  if (daysPastDue === -1) return "1 day left";
  return `${Math.abs(daysPastDue)} days left`;
};

const getReminderState = (kid) => {
  const isJoiningFee = isFeesPending(kid);
  const dueDate = isJoiningFee ? kid.joinDate : getPaidThroughDate(kid);
  const overdueDays = Math.max(0, getDaysSinceDate(dueDate));
  return {
    isDue: isJoiningFee || isRenewalPending(kid),
    isJoiningFee,
    dueDate,
    overdueDays,
    isCritical: overdueDays > 10,
    reminderType: isJoiningFee ? "joining_fee" : "renewal",
  };
};

const parseSettingBoolean = (value, fallback) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return fallback;
};

const parseSettingText = (value, fallback) => {
  if (typeof value === "string") return value;
  return fallback;
};

const loadReminderSettings = async () => {
  reminderSettings = { ...DEFAULT_REMINDER_SETTINGS };
  if (!isBackendReady || !isManagerLoggedIn) return reminderSettings;

  const { data, error } = await supabaseClient
    .from("system_settings")
    .select("setting_key, setting_value")
    .in("setting_key", [
      "whatsapp_reminders_enabled",
      "payment_links_enabled",
      "dry_run_mode",
    ]);

  if (error) {
    return reminderSettings;
  }

  const byKey = Object.fromEntries((data || []).map((row) => [row.setting_key, row.setting_value]));
  reminderSettings = {
    whatsappRemindersEnabled: parseSettingBoolean(
      byKey.whatsapp_reminders_enabled,
      DEFAULT_REMINDER_SETTINGS.whatsappRemindersEnabled
    ),
    paymentLinksEnabled: parseSettingBoolean(
      byKey.payment_links_enabled,
      DEFAULT_REMINDER_SETTINGS.paymentLinksEnabled
    ),
    dryRunMode: parseSettingBoolean(byKey.dry_run_mode, DEFAULT_REMINDER_SETTINGS.dryRunMode),
    managerPhone: DEFAULT_REMINDER_SETTINGS.managerPhone,
  };
  return reminderSettings;
};

const buildReminderPreview = (kid, reminderState) => {
  const planChoices = REMINDER_PLAN_OPTIONS.map((option) => REMINDER_PLAN_LABELS[option]).join(" / ");
  const dueText = reminderState.isJoiningFee
    ? `joining fee from ${formatDate(reminderState.dueDate)}`
    : `renewal due ${formatDate(reminderState.dueDate)}`;
  return `Gen Alpha Cricket Academy reminder for ${kid.name}: ${dueText}. Parent can choose ${planChoices}. Help: ${reminderSettings.managerPhone}.`;
};

const syncReminderSettingsPanel = () => {
  if (reminderSafetyPanel) reminderSafetyPanel.hidden = true;
};

const saveReminderSettings = async () => {
  if (!isBackendReady || !isManagerLoggedIn) return;
  const nextSettings = {
    whatsappRemindersEnabled: Boolean(whatsappReminderToggle?.checked),
    paymentLinksEnabled: Boolean(paymentLinkToggle?.checked),
    dryRunMode: Boolean(dryRunToggle?.checked),
    managerPhone: DEFAULT_REMINDER_SETTINGS.managerPhone,
  };
  const rows = [
    ["whatsapp_reminders_enabled", nextSettings.whatsappRemindersEnabled],
    ["payment_links_enabled", nextSettings.paymentLinksEnabled],
    ["dry_run_mode", nextSettings.dryRunMode],
  ].map(([setting_key, setting_value]) => ({
    setting_key,
    setting_value,
    updated_by: getActiveManagerEmail(),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabaseClient
    .from("system_settings")
    .upsert(rows, { onConflict: "setting_key" });

  if (error) {
    if (reminderSettingsMessage) reminderSettingsMessage.textContent = error.message;
    return;
  }

  reminderSettings = {
    ...nextSettings,
    managerPhone: DEFAULT_REMINDER_SETTINGS.managerPhone,
  };
  syncReminderSettingsPanel();
  showToast("Reminder feature flags saved.");
};

const getRenewalAmountForPlan = () => {
  const plan = RENEWAL_PLANS[renewalPlan?.value] || RENEWAL_PLANS.monthly;
  return renewalPlan?.value === "custom" ? Number(renewalAmount?.value || 0) : plan.amount;
};

const rupees = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const localIsoDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const currentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const monthRange = (monthKey) => {
  const [year, month] = String(monthKey || currentMonthKey()).split("-").map(Number);
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  return {
    key: `${year}-${String(month).padStart(2, "0")}`,
    start: localIsoDate(start),
    end: localIsoDate(end),
    label: start.toLocaleString("en-IN", { month: "long", year: "numeric" }),
  };
};

const FINANCE_RANGE_OPTIONS = {
  week: { label: "This week", months: 0, type: "week" },
  month: { label: "This month", months: 1 },
  "2months": { label: "2 months", months: 2 },
  "3months": { label: "3 months", months: 3 },
  "6months": { label: "6 months", months: 6 },
  year: { label: "This year", months: 0, type: "year" },
  overall: { label: "Overall", months: null },
};

const formatRangePeriod = (start, end) =>
  start && end ? `${formatDate(localIsoDate(start))} to ${formatDate(localIsoDate(end))}` : "All recorded finance data";

const financeRangeFromMode = () => {
  if (financeRangeMode === "month-picker") {
    const range = monthRange(financeExportMonth?.value || currentMonthKey());
    return {
      ...range,
      label: range.label,
      period: formatRangePeriod(new Date(`${range.start}T00:00:00`), new Date(`${range.end}T00:00:00`)),
      startDate: new Date(`${range.start}T00:00:00`),
      endDate: new Date(`${range.end}T23:59:59`),
    };
  }

  if (financeRangeMode === "custom") {
    const month = monthRange(currentMonthKey());
    let startDate = new Date(`${financeCustomStart?.value || month.start}T00:00:00`);
    let endDate = new Date(`${financeCustomEnd?.value || month.end}T00:00:00`);
    if (endDate < startDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    return {
      key: "custom",
      label: "Date range",
      period: formatRangePeriod(startDate, endDate),
      start: localIsoDate(startDate),
      end: localIsoDate(endDate),
      startDate: new Date(`${localIsoDate(startDate)}T00:00:00`),
      endDate: new Date(`${localIsoDate(endDate)}T23:59:59`),
    };
  }

  const option = FINANCE_RANGE_OPTIONS[financeRangeMode] || FINANCE_RANGE_OPTIONS.month;
  if (option.months == null) {
    return { key: "overall", label: option.label, period: "All recorded finance data", start: "", end: "", startDate: null, endDate: null };
  }

  const today = new Date();
  let startDate;
  let endDate;
  if (option.type === "week") {
    const day = today.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + mondayOffset);
    endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
  } else if (option.type === "year") {
    startDate = new Date(today.getFullYear(), 0, 1);
    endDate = new Date(today.getFullYear(), 11, 31);
  } else {
    startDate = new Date(today.getFullYear(), today.getMonth() - (option.months - 1), 1);
    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }
  return {
    key: financeRangeMode,
    label: option.label,
    period: formatRangePeriod(startDate, endDate),
    start: localIsoDate(startDate),
    end: localIsoDate(endDate),
    startDate: new Date(`${localIsoDate(startDate)}T00:00:00`),
    endDate: new Date(`${localIsoDate(endDate)}T23:59:59`),
  };
};

const isRowInFinanceRange = (row, range) => {
  if (!range.startDate || !range.endDate) return true;
  const rawDate = String(row.paid_on || row.paidOn || row.expense_date || row.expenseDate || "");
  if (!rawDate) return false;
  const rowDate = new Date(`${rawDate.slice(0, 10)}T12:00:00`);
  return rowDate >= range.startDate && rowDate <= range.endDate;
};

const buildFinanceRevenueRows = () => {
  const initialFees = kids
    .filter((kid) => kid.feesPaid === "yes")
    .map((kid) => ({
      date: kid.joinDate,
      name: kid.name,
      type: "Joining",
      amount: Number(kid.amountPaid || 0),
    }));
  const renewalFees = financePayments.map((payment) => {
    const student = kids.find((kid) => kid.id === (payment.student_id || payment.studentId));
    return {
      date: payment.paid_on || payment.paidOn,
      name: student?.name || "Unknown player",
      type: payment.payment_type === "joining" || payment.paymentType === "joining" ? "Joining" : "Renewal",
      amount: Number(payment.amount || 0),
    };
  });
  return [...initialFees, ...renewalFees];
};

const renderFinanceMonthPopup = (monthKey) => {
  if (!financeMonthPopup || !financeMonthPopupContent || !financeMonthPopupTitle) return;
  const range = monthRange(monthKey);
  const revenueRows = buildFinanceRevenueRows().filter((row) => String(row.date || "").startsWith(monthKey));
  const expenseRows = financeExpenses.filter((row) => String(row.expense_date || "").startsWith(monthKey));
  const revenueTotal = revenueRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const joiningTotal = revenueRows
    .filter((row) => row.type === "Joining")
    .reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const renewalTotal = revenueRows
    .filter((row) => row.type === "Renewal")
    .reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const expenseTotal = expenseRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const renderRevenueRows = () => revenueRows.length
    ? revenueRows.map((row) => `
        <tr>
          <td>${row.name}</td>
          <td>${row.type}</td>
          <td>${formatDate(row.date)}</td>
          <td>${rupees(row.amount)}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="4" class="sub-copy">No revenue recorded.</td></tr>`;
  const renderExpenseRows = () => expenseRows.length
    ? expenseRows.map((row) => `
        <tr>
          <td>${row.expense_type || "-"}</td>
          <td>${row.paid_by || "-"}</td>
          <td>${formatDate(row.expense_date)}</td>
          <td>${rupees(row.amount)}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="4" class="sub-copy">No expenses recorded.</td></tr>`;

  financeMonthPopupTitle.textContent = range.label;
  financeMonthPopupContent.innerHTML = `
    <div class="finance-month-summary">
      <div class="finance-summary-card revenue-breakdown">
        <span>Revenue</span>
        <strong>${rupees(revenueTotal)}</strong>
        <div class="finance-summary-submetrics">
          <small>Joining <b>${rupees(joiningTotal)}</b></small>
          <small>Renewal <b>${rupees(renewalTotal)}</b></small>
        </div>
      </div>
      <div class="finance-summary-card">
        <span>Expenses</span>
        <strong>${rupees(expenseTotal)}</strong>
      </div>
      <div class="finance-summary-card ${revenueTotal - expenseTotal < 0 ? "negative" : "positive"}">
        <span>Net</span>
        <strong>${rupees(revenueTotal - expenseTotal)}</strong>
      </div>
    </div>
    <div class="finance-month-columns">
      <section>
        <h4>Revenue</h4>
        <table class="mini-detail-table">
          <thead><tr><th>Student</th><th>Type</th><th>Date</th><th>Amount</th></tr></thead>
          <tbody>${renderRevenueRows()}</tbody>
        </table>
      </section>
      <section>
        <h4>Expenses</h4>
        <table class="mini-detail-table">
          <thead><tr><th>Type</th><th>Paid by</th><th>Date</th><th>Amount</th></tr></thead>
          <tbody>${renderExpenseRows()}</tbody>
        </table>
      </section>
    </div>
  `;
  financeMonthPopup.hidden = false;
  document.body.classList.add("popup-open");
};

const downloadTextFile = (filename, content, type = "text/csv;charset=utf-8") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const csvEscape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const toCsv = (headers, rows) => [
  headers.map(csvEscape).join(","),
  ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(",")),
].join("\n");

const receiptTypeLabel = (receipt) => receipt.receiptType === "renewal" ? "Renewal Fee Receipt" : "Joining Fee Receipt";

const buildReceiptText = (receipt) => {
  const lines = [
    `*Gen Alpha Cricket Academy*`,
    `*${receiptTypeLabel(receipt)}*`,
    `Receipt No: ${receipt.receiptNo || receipt.regNo}`,
    `Player: ${receipt.playerName}`,
    `Reg No: ${receipt.regNo}`,
    `Amount Paid: ${rupees(receipt.amountPaid)}`,
    `Paid On: ${formatDate(receipt.paidOn || toLocalIsoDate())}`,
  ];

  if (receipt.receiptType === "renewal") {
    lines.push(
      `Plan: ${receipt.planTitle || "Renewal"}`,
      `Cycle From: ${formatDate(receipt.cycleDate)}`,
      `Covered: ${receipt.monthsCovered || 1} month${Number(receipt.monthsCovered || 1) === 1 ? "" : "s"}`,
    );
  } else {
    lines.push(
      `Parent/Guardian: ${receipt.guardianName}`,
      `Contact: ${receipt.parentContact}`,
      `Join Date: ${formatDate(receipt.joinDate)}`,
      `Time Slot: ${receipt.timeSlot}`,
      `Jersey: ${receipt.jerseySize || "Not set"}${receipt.jerseyPairs ? ` (${receipt.jerseyPairs} pair${receipt.jerseyPairs === 1 ? "" : "s"})` : ""}`,
    );
  }

  if (receipt.paymentReference) lines.push(`Payment Ref: ${receipt.paymentReference}`);
  lines.push("", "Thank you for choosing Gen Alpha Cricket Academy.");
  return lines.filter(Boolean).join("\n");
};

const normalizeWhatsAppPhone = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return digits;
};

const openReceiptWhatsApp = (receipt) => {
  if (!receipt) return;
  const phone = normalizeWhatsAppPhone(receipt.parentContact);
  const target = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  window.open(`${target}?text=${encodeURIComponent(buildReceiptText(receipt))}`, "_blank", "noopener,noreferrer");
};

const buildReceiptFromKid = (kid, overrides = {}) => ({
  receiptType: "joining",
  regNo: kid.regNo || "Saved",
  receiptNo: `GACA-${kid.regNo || "NEW"}-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`,
  playerName: kid.name,
  guardianName: kid.fatherGuardianName || "Parent",
  parentContact: kid.parentContactNo || "",
  joinDate: kid.joinDate,
  paidOn: toLocalIsoDate(),
  timeSlot: kid.timeSlot || "Not set",
  feesPaid: true,
  amountPaid: Number(overrides.amountPaid ?? kid.amountPaid ?? 0),
  paymentReference: overrides.paymentReference || kid.paymentReference || "",
  jerseySize: overrides.jerseySize ?? kid.jerseySize ?? "",
  jerseyPairs: Number(overrides.jerseyPairs ?? kid.jerseyPairs ?? 0),
});

const buildRenewalReceiptFromKid = (kid, { plan, planTitle, monthsCovered, amount, cycleDate }) => ({
  receiptType: "renewal",
  regNo: kid.regNo || "Saved",
  receiptNo: `GACA-REN-${kid.regNo || "NEW"}-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`,
  playerName: kid.name,
  guardianName: kid.fatherGuardianName || "Parent",
  parentContact: kid.parentContactNo || "",
  paidOn: toLocalIsoDate(),
  timeSlot: kid.timeSlot || "Not set",
  feesPaid: true,
  amountPaid: Number(amount || 0),
  paymentReference: "",
  receiptPlan: plan,
  planTitle,
  monthsCovered,
  cycleDate,
});

const renderReceipt = (receipt) => {
  if (!receiptContent || !receiptPopup) return;
  const isRenewal = receipt.receiptType === "renewal";
  const detailRows = isRenewal
    ? [
        ["Player", receipt.playerName],
        ["Reg No", receipt.regNo],
        ["Time Slot", receipt.timeSlot],
        ["Plan", receipt.planTitle || "Renewal"],
        ["Cycle From", formatDate(receipt.cycleDate)],
        ["Covered", `${receipt.monthsCovered || 1} month${Number(receipt.monthsCovered || 1) === 1 ? "" : "s"}`],
        ["Paid On", formatDate(receipt.paidOn)],
        ["Payment Ref", receipt.paymentReference || "Not provided"],
      ]
    : [
        ["Player", receipt.playerName],
        ["Reg No", receipt.regNo],
        ["Parent / Guardian", receipt.guardianName],
        ["Contact", receipt.parentContact],
        ["Join Date", formatDate(receipt.joinDate)],
        ["Time Slot", receipt.timeSlot],
        ["Paid On", formatDate(receipt.paidOn)],
        ["Jersey", `${receipt.jerseySize || "Not set"}${receipt.jerseyPairs ? ` · ${receipt.jerseyPairs} pair${receipt.jerseyPairs === 1 ? "" : "s"}` : ""}`],
      ];
  receiptContent.innerHTML = `
    <div class="receipt-watermark">GACA</div>
    <div class="receipt-topline"></div>
    <div class="receipt-brand">
      <div class="receipt-logo-lockup">
        <img src="./assets/gen-alpha-icon-192.png" alt="Gen Alpha Cricket Academy logo" />
        <div>
          <span>Gen Alpha Cricket Academy</span>
          <strong>${receiptTypeLabel(receipt)}</strong>
          <small>Official academy receipt</small>
        </div>
      </div>
      <div class="receipt-status">PAID</div>
    </div>
    <div class="receipt-hero">
      <div>
        <span class="data-label">Receipt No</span>
        <strong>${escapeHtml(receipt.receiptNo || receipt.regNo)}</strong>
      </div>
      <div>
        <span class="data-label">Amount Paid</span>
        <strong>${rupees(receipt.amountPaid)}</strong>
      </div>
    </div>
    <dl class="receipt-detail-grid">
      ${detailRows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "-")}</dd></div>`).join("")}
    </dl>
    <div class="receipt-footer">
      <p>Fees once paid are recorded against the player profile. Please keep this confirmation for academy reference.</p>
      <strong>Thank you</strong>
    </div>
  `;
  receiptPopup.hidden = false;
  document.body.classList.add("popup-open");
};

const closeReceiptPopup = () => {
  if (!receiptPopup) return;
  receiptPopup.hidden = true;
  document.body.classList.remove("popup-open");
};

const printReceipt = () => {
  if (!latestAdmissionReceipt) return;
  const receiptHtml = receiptContent?.innerHTML || "";
  const printWindow = window.open("", "_blank", "width=720,height=900");
  if (!printWindow) {
    showToast("Allow popups to print the receipt.");
    return;
  }
  printWindow.document.write(`
    <html>
      <head>
        <title>${escapeHtml(receiptTypeLabel(latestAdmissionReceipt))} ${escapeHtml(latestAdmissionReceipt.regNo)}</title>
        <style>
          body { min-height: 100vh; display: grid; place-items: start center; box-sizing: border-box; margin: 0; padding: 32px; background: #eef4fb; color: #10264f; font-family: Arial, sans-serif; }
          .receipt-card { position: relative; overflow: hidden; width: 680px; box-sizing: border-box; border: 1px solid #d9e3f2; border-radius: 28px; padding: 28px; background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%); box-shadow: 0 22px 60px rgba(16, 38, 79, 0.14); }
          .receipt-topline { position: absolute; inset: 0 0 auto; height: 9px; background: linear-gradient(90deg, #0d2d66, #1f5fbf, #ffc72e); }
          .receipt-watermark { position: absolute; right: -18px; bottom: 32px; font-size: 92px; font-weight: 900; color: rgba(31, 95, 191, 0.055); letter-spacing: -0.08em; }
          .receipt-brand { position: relative; display: flex; justify-content: space-between; gap: 20px; padding-bottom: 20px; border-bottom: 1px solid #e2e9f5; }
          .receipt-logo-lockup { display: flex; align-items: center; gap: 15px; }
          .receipt-logo-lockup img { width: 74px; height: 74px; object-fit: contain; border-radius: 20px; background: #edf5ff; padding: 8px; }
          .receipt-logo-lockup span { display: block; text-transform: uppercase; letter-spacing: .1em; font-size: 11px; font-weight: 800; color: #1f5fbf; }
          .receipt-logo-lockup strong { display: block; margin-top: 4px; font-size: 24px; color: #10264f; }
          .receipt-logo-lockup small { display: block; margin-top: 3px; color: #6a7890; font-weight: 700; }
          .receipt-status { align-self: start; border: 2px solid #178553; border-radius: 999px; padding: 8px 18px; color: #178553; font-weight: 900; letter-spacing: .12em; transform: rotate(-4deg); }
          .receipt-hero { position: relative; display: grid; grid-template-columns: 1.15fr .85fr; gap: 14px; margin: 20px 0; }
          .receipt-hero > div { border-radius: 20px; padding: 18px; background: linear-gradient(135deg, #edf5ff, #fff8dc); }
          .receipt-hero strong { display: block; margin-top: 5px; font-size: 24px; color: #0d2d66; }
          .data-label, dt { display: block; font-size: 10px; color: #687892; text-transform: uppercase; font-weight: 900; letter-spacing: .08em; margin-bottom: 6px; }
          dd { margin: 0; color: #10264f; font-weight: 800; }
          .receipt-detail-grid { position: relative; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 0; }
          .receipt-detail-grid > div { border: 1px solid #e1e9f5; background: #ffffff; border-radius: 16px; padding: 12px; }
          .receipt-footer { position: relative; display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-top: 18px; padding-top: 16px; border-top: 1px dashed #bdc9dc; color: #687892; font-size: 12px; }
          .receipt-footer strong { color: #0d2d66; font-size: 18px; }
          @media print { body { display: block; padding: 0; background: #fff; } .receipt-card { width: 100%; box-shadow: none; page-break-inside: avoid; } }
        </style>
      </head>
      <body><section class="receipt-card">${receiptHtml}</section></body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

const getTrainingDuration = (kid) => {
  const days = Math.max(getDaysSinceDate(kid.joinDate), 0);
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  if (months <= 0) return `${days} day${days === 1 ? "" : "s"}`;
  return `${months} month${months === 1 ? "" : "s"}, ${remainingDays} day${remainingDays === 1 ? "" : "s"}`;
};

const getTenureBadge = (kid) => {
  const days = Math.max(getDaysSinceDate(kid.joinDate), 0);
  const months = Math.floor(days / 30);
  if (months <= 0) return `${days}d`;
  return `${months}m`;
};

const getDaysSinceDate = (dateValue) => {
  const targetDate = new Date(`${dateValue}T00:00:00`);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((new Date() - targetDate) / msPerDay);
};

const parseIsoDate = (value) => (value ? new Date(`${value}T00:00:00`) : null);

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

const monthKeyFromDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const monthLabelFromDate = (date) =>
  date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });

const buildStudentMovement = (students, monthCount = 6) => {
  const now = new Date();
  return Array.from({ length: monthCount }, (_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (monthCount - 1 - index), 1);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const previousMonthEnd = new Date(monthStart.getTime() - 1);

    const joined = students.filter((kid) => {
      const joinDate = parseIsoDate(kid.joinDate);
      return joinDate && joinDate >= monthStart && joinDate <= monthEnd;
    }).length;

    const continuing = students.filter((kid) => {
      const joinDate = parseIsoDate(kid.joinDate);
      const discontinuedAt = parseIsoDate(kid.discontinuedAt);
      return joinDate && joinDate <= previousMonthEnd && (!discontinuedAt || discontinuedAt >= monthStart);
    }).length;

    const discontinued = students.filter((kid) => {
      const discontinuedAt = parseIsoDate(kid.discontinuedAt);
      return discontinuedAt && discontinuedAt >= monthStart && discontinuedAt <= monthEnd;
    }).length;

    return {
      key: monthKeyFromDate(monthDate),
      label: monthLabelFromDate(monthDate),
      joined,
      continuing,
      discontinued,
    };
  });
};

const getMovementMonthRange = (monthKey) => {
  const [year, month] = String(monthKey || "").split("-").map(Number);
  if (!year || !month) return null;
  const monthDate = new Date(year, month - 1, 1);
  return {
    start: startOfMonth(monthDate),
    end: endOfMonth(monthDate),
    previousEnd: new Date(startOfMonth(monthDate).getTime() - 1),
    label: monthLabelFromDate(monthDate),
  };
};

const matchesMovementFilter = (kid) => {
  if (!rosterMovementFilter) return true;
  const range = getMovementMonthRange(rosterMovementFilter.monthKey);
  if (!range) return true;
  const joinDate = parseIsoDate(kid.joinDate);
  const discontinuedAt = parseIsoDate(kid.discontinuedAt);
  if (rosterMovementFilter.type === "joined") {
    return joinDate && joinDate >= range.start && joinDate <= range.end;
  }
  if (rosterMovementFilter.type === "left") {
    return discontinuedAt && discontinuedAt >= range.start && discontinuedAt <= range.end;
  }
  return joinDate && joinDate <= range.previousEnd && (!discontinuedAt || discontinuedAt >= range.start);
};

const movementFilterLabel = () => {
  if (!rosterMovementFilter) return "";
  const range = getMovementMonthRange(rosterMovementFilter.monthKey);
  if (!range) return "";
  const labels = {
    continuing: "Continuing",
    joined: "Joined",
    left: "Left",
  };
  return `${labels[rosterMovementFilter.type] || "Movement"} · ${range.label}`;
};

const resetRosterDetailFilters = () => {
  activeSlotFilter = "";
  rosterSearchQuery = "";
  rosterStatusFilter = "all";
  rosterJerseyFilter = "all";
  rosterTypeFilter = "all";
  rosterFeePaidFilter = "all";
  rosterFeeDueFilter = "all";
  if (playerSearchInput) playerSearchInput.value = "";
  if (rosterStatusFilterInput) rosterStatusFilterInput.value = "all";
  if (rosterJerseyFilterInput) rosterJerseyFilterInput.value = "all";
  if (rosterTypeFilterInput) rosterTypeFilterInput.value = "all";
  if (rosterFeePaidFilterInput) rosterFeePaidFilterInput.value = "all";
  if (rosterFeeDueFilterInput) rosterFeeDueFilterInput.value = "all";
};

const applyRosterMovementFilter = (monthKey, type) => {
  rosterMovementFilter = { monthKey, type };
  resetRosterDetailFilters();
  rosterSortKey = type === "joined" ? "joinDate" : "name";
  rosterSortOrder = type === "joined" ? "desc" : "asc";
  activeView = "roster";
  updateActiveView();
  renderKids();
  document.querySelector(".records-panel")?.scrollIntoView({ block: "start", behavior: "smooth" });
};

const scrollToPlayerInRoster = (kidId) => {
  if (!kidId) return;
  activeView = "roster";
  rosterMovementFilter = null;
  rosterSearchQuery = "";
  resetRosterDetailFilters();
  updateActiveView();
  renderKids();

  window.requestAnimationFrame(() => {
    const row = kidsTableBody?.querySelector(`[data-player-row-id="${CSS.escape(kidId)}"]`);
    const scrollTarget = row || document.querySelector(".records-panel");
    scrollTarget?.scrollIntoView({ block: "center", behavior: "smooth" });
    if (row) {
      row.classList.add("row-focus-pulse");
      window.setTimeout(() => row.classList.remove("row-focus-pulse"), 2200);
    }
  });
};

const getStudentType = (kid) => (kid.renewals.length > 0 ? "Returning" : "New");
const isActiveKid = (kid) => !kid.discontinued;
const isFeesPending = (kid) => isActiveKid(kid) && kid.feesPaid !== "yes";
const isRenewalPending = (kid) =>
  isActiveKid(kid) && kid.feesPaid === "yes" && getDaysSinceDate(getPaidThroughDate(kid)) >= 0;
const isRenewalOverdue = (kid) =>
  isActiveKid(kid) && kid.feesPaid === "yes" && getDaysSinceDate(getPaidThroughDate(kid)) > 0;
const matchesRosterFilters = (kid) => {
  const jerseySize = String(kid.jerseySize || "").trim();

  if (rosterStatusFilter === "active" && !isActiveKid(kid)) return false;
  if (rosterStatusFilter === "discontinued" && isActiveKid(kid)) return false;
  if (rosterJerseyFilter === "not-set" && jerseySize) return false;
  if (rosterJerseyFilter !== "all" && rosterJerseyFilter !== "not-set" && jerseySize !== rosterJerseyFilter) return false;
  if (rosterTypeFilter !== "all" && getStudentType(kid).toLowerCase() !== rosterTypeFilter) return false;
  if (rosterFeePaidFilter === "paid" && kid.feesPaid !== "yes") return false;
  if (rosterFeePaidFilter === "not-paid" && kid.feesPaid === "yes") return false;
  if (rosterFeeDueFilter === "joining-pending" && !isFeesPending(kid)) return false;
  if (rosterFeeDueFilter === "overdue" && !isRenewalOverdue(kid)) return false;
  if (!matchesMovementFilter(kid)) return false;

  return true;
};
const hasRosterDetailFilters = () =>
  rosterStatusFilter !== "all" ||
  rosterJerseyFilter !== "all" ||
  rosterTypeFilter !== "all" ||
  rosterFeePaidFilter !== "all" ||
  rosterFeeDueFilter !== "all" ||
  Boolean(rosterMovementFilter);
const getRosterSortValue = (kid, key) => {
  const latestRenewal = kid.renewals.length > 0 ? kid.renewals[kid.renewals.length - 1] : "";
  const values = {
    name: kid.name,
    age: kid.age,
    timeSlot: kid.timeSlot || "Not set",
    jersey: formatJerseyDetails(kid),
    status: kid.discontinued ? "Discontinued" : "Active",
    studentType: getStudentType(kid),
    tenure: getDaysSinceDate(kid.joinDate),
    joinDate: kid.joinDate,
    latestRenewal,
    feesPaid: kid.feesPaid === "yes" ? 1 : 0,
    amountPaid: Number(kid.amountPaid || 0),
    nextDue: getPaidThroughDate(kid),
    updatedBy: kid.updatedBy || "",
  };
  return values[key] ?? values.name;
};

const compareRosterValues = (first, second) => {
  if (typeof first === "number" && typeof second === "number") return first - second;
  return String(first ?? "").localeCompare(String(second ?? ""), "en-IN", { numeric: true, sensitivity: "base" });
};

const updateRosterSortHeaders = () => {
  kidsTable?.querySelectorAll("[data-roster-sort]").forEach((button) => {
    const active = button.dataset.rosterSort === rosterSortKey;
    button.classList.toggle("active", active);
    button.textContent = `${button.dataset.sortLabel}${active ? (rosterSortOrder === "asc" ? " ↑" : " ↓") : ""}`;
    button.setAttribute("aria-sort", active ? (rosterSortOrder === "asc" ? "ascending" : "descending") : "none");
  });
};

const getFilteredKids = () => {
  const slotFiltered = !activeSlotFilter
    ? kids
    : activeSlotFilter === "not-set"
      ? kids.filter((kid) => isActiveKid(kid) && !kid.timeSlot)
      : kids.filter((kid) => isActiveKid(kid) && kid.timeSlot === activeSlotFilter);
  const search = rosterSearchQuery.trim().toLowerCase();
  const searchFiltered = search
    ? slotFiltered.filter((kid) => kid.name.toLowerCase().includes(search))
    : slotFiltered;
  const filtered = searchFiltered.filter(matchesRosterFilters);
  return [...filtered].sort((a, b) => {
    const result = compareRosterValues(getRosterSortValue(a, rosterSortKey), getRosterSortValue(b, rosterSortKey));
    return rosterSortOrder === "asc" ? result : -result;
  });
};

const updateStats = () => {
  const activeKids = kids.filter(isActiveKid);
  joinedCount.textContent = String(kids.length);
  activeCount.textContent = String(activeKids.length);
  paidCount.textContent = String(activeKids.filter((kid) => kid.feesPaid === "yes").length);
  returningCount.textContent = String(activeKids.filter((kid) => kid.renewals.length > 0).length);
};

const renderStudentMovement = () => {
  if (!studentMovementChart) return;
  const movement = buildStudentMovement(kids, 6);
  const maxValue = Math.max(1, ...movement.flatMap((month) => [month.joined, month.continuing, month.discontinued]));

  studentMovementChart.innerHTML = movement.map((month) => `
    <article class="movement-month">
      <div class="movement-month-head">
        <strong>${month.label}</strong>
        <span>${month.continuing + month.joined - month.discontinued} active trend</span>
      </div>
      <div class="movement-bars" aria-label="${month.label} student movement">
        <span class="movement-bar continuing" style="height:${Math.max(8, Math.round((month.continuing / maxValue) * 82))}px" title="Continuing: ${month.continuing}"></span>
        <span class="movement-bar joined" style="height:${Math.max(8, Math.round((month.joined / maxValue) * 82))}px" title="Joined: ${month.joined}"></span>
        <span class="movement-bar discontinued" style="height:${Math.max(8, Math.round((month.discontinued / maxValue) * 82))}px" title="Discontinued: ${month.discontinued}"></span>
      </div>
      <div class="movement-counts">
        <button type="button" data-movement-filter="continuing" data-movement-month="${month.key}"><i class="movement-dot continuing"></i>${month.continuing} continuing</button>
        <button type="button" data-movement-filter="joined" data-movement-month="${month.key}"><i class="movement-dot joined"></i>${month.joined} joined</button>
        <button type="button" data-movement-filter="left" data-movement-month="${month.key}"><i class="movement-dot discontinued"></i>${month.discontinued} left</button>
      </div>
    </article>
  `).join("");
};

const renderRosterHelper = () => {
  const canEdit = isBackendReady && isManagerLoggedIn && isEditMode;
  const managerReady = isBackendReady && isManagerLoggedIn;
  const movementLabel = movementFilterLabel();

  if (movementLabel) {
    recordsHelper.innerHTML = `
      <span>Roster filtered by <strong>${movementLabel}</strong>.</span>
      <button type="button" class="inline-clear-btn" data-clear-movement-filter>Clear</button>
    `;
    return;
  }

  recordsHelper.textContent = canEdit
    ? "Edit mode is on. Use the table below to update, renew, or discontinue players."
    : managerReady
      ? "Roster view is open. Click Edit when you want to add players or change records."
      : "Manager roster access is available only after login.";
};

const renderSlotFilters = () => {
  const activeKids = kids.filter(isActiveKid);
  const notSetCount = activeKids.filter((kid) => !kid.timeSlot).length;
  const filters = [
    { value: "all", label: "All", count: kids.length },
    ...TIME_SLOTS.map((slot) => ({
      value: slot,
      label: slot,
      count: activeKids.filter((kid) => kid.timeSlot === slot).length,
    })),
  ];

  if (notSetCount > 0) {
    filters.push({
      value: "not-set",
      label: "Not set",
      count: notSetCount,
    });
  } else if (activeSlotFilter === "not-set") {
    activeSlotFilter = "";
  }

  slotFilters.innerHTML = filters
    .map(
      (filter) => `
        <button
          type="button"
          class="slot-chip ${
            (filter.value === "all" && !activeSlotFilter) || filter.value === activeSlotFilter
              ? "active"
              : ""
          }"
          data-slot-filter="${filter.value}"
        >
          <span>${filter.label}</span>
          <strong>${filter.count}</strong>
        </button>
      `
    )
    .join("");
};

const renderAttendanceFilters = (activePlayers) => {
  if (!attendanceSlotFilters) return;
  const notSetCount = activePlayers.filter((kid) => !kid.timeSlot).length;
  const filters = [
    { value: "all", label: "All", count: activePlayers.length },
    ...TIME_SLOTS.map((slot) => ({
      value: slot,
      label: slot,
      count: activePlayers.filter((kid) => kid.timeSlot === slot).length,
    })),
  ];

  if (notSetCount > 0) {
    filters.push({ value: "not-set", label: "Not set", count: notSetCount });
  } else if (attendanceSlotFilter === "not-set") {
    attendanceSlotFilter = "";
  }

  attendanceSlotFilters.innerHTML = filters
    .map(
      (filter) => `
        <button
          type="button"
          class="slot-chip ${
            (filter.value === "all" && !attendanceSlotFilter) || filter.value === attendanceSlotFilter
              ? "active"
              : ""
          }"
          data-attendance-slot-filter="${filter.value}"
        >
          <span>${filter.label}</span>
          <strong>${filter.count}</strong>
        </button>
      `
    )
    .join("");
};

const getFilteredAttendancePlayers = (activePlayers) => {
  const slotFiltered = !attendanceSlotFilter
    ? activePlayers
    : attendanceSlotFilter === "not-set"
      ? activePlayers.filter((kid) => !kid.timeSlot)
      : activePlayers.filter((kid) => kid.timeSlot === attendanceSlotFilter);
  const search = attendanceSearchQuery.trim().toLowerCase();
  if (!search) return slotFiltered;
  return slotFiltered.filter((kid) =>
    kid.name.toLowerCase().includes(search) ||
    String(kid.age || "").includes(search) ||
    String(kid.timeSlot || "").toLowerCase().includes(search)
  );
};

const showToast = (message) => {
  if (!globalToast) {
    return;
  }

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  globalToast.textContent = message;
  globalToast.hidden = false;

  toastTimeoutId = window.setTimeout(() => {
    globalToast.hidden = true;
  }, 2800);
};

const syncAmountState = () => {
  const isPaid = feesPaidSelect.value === "yes" && isManagerLoggedIn && isBackendReady;
  amountPaidInput.disabled = !isPaid;

  if (!isPaid) {
    amountPaidInput.value = "0";
  }
};

const syncAdmissionAmountState = () => {
  const selectedPlan = ADMISSION_FEE_PLANS[admissionFeePlan?.value] || ADMISSION_FEE_PLANS.monthly;
  const total = admissionFeePlan?.value === "custom"
    ? Number(admissionCustomAmount?.value || 0)
    : selectedPlan.base + ADMISSION_ONE_TIME_FEE;
  if (admissionCustomAmountLabel) {
    admissionCustomAmountLabel.hidden = admissionFeePlan?.value !== "custom";
  }
  if (admissionFeeSummary) {
    const discountLabel = PLAN_DISCOUNT_LABELS[admissionFeePlan?.value];
    admissionFeeSummary.textContent = admissionFeePlan?.value === "custom"
      ? `Custom amount: Rs ${total.toLocaleString("en-IN")}.`
      : `${selectedPlan.title}: Rs ${selectedPlan.base.toLocaleString("en-IN")}${discountLabel ? ` (${discountLabel})` : ""} + Rs ${ADMISSION_ONE_TIME_FEE} admission. First payment Rs ${total.toLocaleString("en-IN")}.`;
  }
  updatePaymentAssist();
};

const formatJerseyDetails = (kid) => {
  const parts = [];
  if (kid.jerseySize) {
    parts.push(`Size ${kid.jerseySize}`);
  }
  if (kid.jerseyPairs > 0) {
    parts.push(`${kid.jerseyPairs} pair${kid.jerseyPairs === 1 ? "" : "s"}`);
  }
  return parts.length > 0 ? parts.join(" · ") : '<span class="sub-copy">—</span>';
};

const syncAdmissionStyleState = () => {
  if (!admissionReadyToStart || !admissionStyleOptions) {
    return;
  }

  const disableStyles = admissionReadyToStart.checked;
  const styleInputs = admissionStyleOptions.querySelectorAll('input[name="batsmanStyle"], input[name="bowlingStyles"]');

  styleInputs.forEach((input) => {
    input.disabled = disableStyles;
    if (disableStyles) {
      input.checked = false;
    }
  });

  admissionStyleOptions.classList.toggle("disabled", disableStyles);
};

const resetFormState = () => {
  editingKidId = null;
  kidForm.reset();
  saveButton.textContent = "Save kid details";
  cancelEditButton.hidden = true;
  syncAmountState();
};

const buildPaymentIntentId = () =>
  `GA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const getAdmissionAmount = () => {
  const selectedPlan = ADMISSION_FEE_PLANS[admissionFeePlan?.value] || ADMISSION_FEE_PLANS.monthly;
  if (admissionFeePlan?.value === "custom") {
    return Number(admissionCustomAmount?.value || 0);
  }
  return selectedPlan.base + ADMISSION_ONE_TIME_FEE;
};

const getPaymentDescriptor = () => {
  const applicantName = String(admissionApplicantName?.value || "").trim();
  return applicantName ? `${academyPaymentConfig.notePrefix} - ${applicantName}` : academyPaymentConfig.notePrefix;
};

const buildUpiQueryString = (params) =>
  new URLSearchParams(
    Object.entries(params).reduce((accumulator, [key, value]) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        accumulator[key] = String(value);
      }
      return accumulator;
    }, {})
  ).toString();

const buildBaseUpiQuery = () => {
  const amount = getAdmissionAmount();
  return buildUpiQueryString({
    pa: academyPaymentConfig.upiId,
    pn: academyPaymentConfig.payeeName,
    tr: admissionPaymentIntentId,
    tn: getPaymentDescriptor(),
    am: amount > 0 ? amount.toFixed(2) : "",
    cu: "INR",
  });
};

const getGenericUpiUri = () => {
  const query = buildBaseUpiQuery();
  return query ? `upi://pay?${query}` : "";
};

const getProviderPaymentUri = (provider) => {
  const query = buildBaseUpiQuery();

  if (!query) {
    return "";
  }

  if (provider === "Google Pay") {
    return `gpay://upi/pay?${query}`;
  }

  if (provider === "PhonePe" && isAndroidBrowser) {
    return `intent://pay?${query}#Intent;scheme=upi;package=com.phonepe.app;end`;
  }

  return `upi://pay?${query}`;
};

const setPendingPaymentReturn = (provider) => {
  sessionStorage.setItem(
    PAYMENT_RETURN_STORAGE_KEY,
    JSON.stringify({
      provider,
      timestamp: Date.now(),
      amount: getAdmissionAmount(),
    })
  );
};

const openPaymentPopup = () => {
  paymentPopup.hidden = false;
  document.body.classList.add("popup-open");
  if (!academyPaymentConfig.upiId) {
    admissionMessage.textContent = "Payment popup opened, but academy UPI ID is not configured yet.";
  }
  updatePaymentAssist();
};

const closePaymentPopup = () => {
  paymentPopup.hidden = true;
  document.body.classList.remove("popup-open");
};

const refreshPaymentReturnHint = () => {
  if (!paymentReturnHint) {
    return;
  }

  const rawValue = sessionStorage.getItem(PAYMENT_RETURN_STORAGE_KEY);

  if (!rawValue) {
    paymentReturnHint.hidden = true;
    paymentReturnHint.textContent = "";
    return;
  }

  try {
    const pending = JSON.parse(rawValue);
    const isFresh = typeof pending?.timestamp === "number" && Date.now() - pending.timestamp < 1000 * 60 * 20;

    if (!isFresh) {
      sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
      paymentReturnHint.hidden = true;
      paymentReturnHint.textContent = "";
      return;
    }

    paymentReturnHint.hidden = false;
    paymentReturnHint.textContent = `Back from ${pending.provider || "UPI payment"}? If the payment is complete, switch Fees paid to Yes and enter the UTR if your app shows one.`;
  } catch (error) {
    sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
    paymentReturnHint.hidden = true;
    paymentReturnHint.textContent = "";
  }
};

const renderPaymentQr = () => {
  if (!paymentQrCanvas) {
    return;
  }

  paymentQrCanvas.innerHTML = "";

  const upiUri = getGenericUpiUri();
  const hasConfig = Boolean(academyPaymentConfig.upiId);

  if (!hasConfig) {
    paymentQrCanvas.innerHTML = `<div class="payment-empty-qr">Add the academy UPI ID in config to enable QR payment.</div>`;
    return;
  }

  const qrServerUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    upiUri
  )}`;
  const quickChartUrl = `https://quickchart.io/qr?size=320&text=${encodeURIComponent(
    upiUri
  )}`;

  const renderQrImage = (sourceUrl, fallbackUrl = "") => {
    const image = document.createElement("img");
    image.alt = "UPI payment QR";
    image.loading = "lazy";
    image.decoding = "async";
    image.src = sourceUrl;
    image.onerror = () => {
      if (fallbackUrl && image.src !== fallbackUrl) {
        image.src = fallbackUrl;
        return;
      }

      paymentQrCanvas.innerHTML = `<div class="payment-empty-qr">Unable to load QR right now. Please use the academy UPI ID.</div>`;
    };
    paymentQrCanvas.innerHTML = "";
    paymentQrCanvas.appendChild(image);
  };

  if (window.QRCode?.toCanvas) {
    const canvas = document.createElement("canvas");
    paymentQrCanvas.appendChild(canvas);
    window.QRCode.toCanvas(
      canvas,
      upiUri,
      {
        width: 176,
        margin: 1,
        color: {
          dark: "#102547",
          light: "#ffffff",
        },
      },
      (error) => {
        if (error) {
          renderQrImage(qrServerUrl, quickChartUrl);
        }
      }
    );
    return;
  }

  renderQrImage(qrServerUrl, quickChartUrl);
};

const updatePaymentAssist = () => {
  if (!admissionPaymentAssist) {
    return;
  }

  const hasConfig = Boolean(academyPaymentConfig.upiId);
  const amount = getAdmissionAmount();

  if (paymentMerchantUpiId) paymentMerchantUpiId.textContent = hasConfig ? academyPaymentConfig.upiId : "Not configured";
  if (paymentMerchantMobile) paymentMerchantMobile.textContent = academyPaymentConfig.mobileNumber || "Not available";
  if (paymentMerchantName) paymentMerchantName.textContent = academyPaymentConfig.payeeName;
  if (paymentAmountValue) paymentAmountValue.textContent = `Rs ${amount.toFixed(2)}`;
  if (paymentDeviceBadge) paymentDeviceBadge.textContent = isMobileBrowser ? "Mobile payment" : "Desktop QR";
  if (paymentEntryTitle) paymentEntryTitle.textContent = isMobileBrowser ? "Pay from your UPI app" : "Open QR payment popup";
  if (paymentAssistCopy) {
    paymentAssistCopy.textContent = isMobileBrowser
      ? "Open the payment popup to launch Google Pay, PhonePe, or another UPI app on this phone."
      : "Open the payment popup to show a QR code and pay from your phone.";
  }
  if (paymentPopupCopy) {
    paymentPopupCopy.textContent = isMobileBrowser
      ? "Launch your UPI app, complete payment, then return here and finish the admission."
      : "Scan the QR from your phone and finish the admission form here after payment.";
  }
  if (paymentQrCaption) {
    paymentQrCaption.textContent = isMobileBrowser
      ? "If app launch is blocked by the browser, scan the QR from another device or use the academy UPI ID."
      : "Scan this QR from Google Pay, PhonePe, or any UPI app on your phone.";
  }
  if (paymentConfigNotice) paymentConfigNotice.hidden = hasConfig;
  if (paymentAppGrid) paymentAppGrid.hidden = !isMobileBrowser;

  [
    paymentGooglePayButton,
    paymentPhonePeButton,
    paymentUpiButton,
    copyPaymentUpiButton,
  ].forEach((button) => {
    if (!button) {
      return;
    }

    button.disabled = !hasConfig;
  });

  renderPaymentQr();
  refreshPaymentReturnHint();
};

const copyPaymentText = async (value, successMessage) => {
  if (!value) {
    admissionMessage.textContent = "Payment details are not ready yet.";
    return;
  }

  try {
    await navigator.clipboard.writeText(value);
    showToast(successMessage);
  } catch (error) {
    admissionMessage.textContent = "Unable to copy payment details from this browser.";
  }
};

const launchPaymentApp = (provider) => {
  if (!academyPaymentConfig.upiId) {
    admissionMessage.textContent = "Academy UPI payment is not configured yet.";
    return;
  }

  setPendingPaymentReturn(provider);
  refreshPaymentReturnHint();

  const providerUri = getProviderPaymentUri(provider);

  if (!providerUri) {
    admissionMessage.textContent = "Unable to prepare the payment request.";
    return;
  }

  if (!isMobileBrowser) {
    admissionMessage.textContent = "Desktop browsers use the QR payment popup. Scan and pay from your phone.";
    openPaymentPopup();
    return;
  }

  window.location.href = providerUri;
};

const buildDobIso = () => {
  if (!admissionBirthDay.value || !admissionBirthMonth.value || !admissionBirthYear.value) {
    return "";
  }

  const monthIndex = ADMISSION_MONTHS.indexOf(admissionBirthMonth.value) + 1;
  if (monthIndex <= 0) {
    return "";
  }

  return `${admissionBirthYear.value}-${String(monthIndex).padStart(2, "0")}-${String(
    admissionBirthDay.value
  ).padStart(2, "0")}`;
};

const calculateAge = (dateValue) => {
  if (!dateValue) {
    return null;
  }

  const today = new Date();
  const birthDate = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age >= 0 ? age : null;
};

const updateAdmissionAge = () => {
  const age = calculateAge(buildDobIso());
  admissionAge.textContent = age === null ? "Auto" : String(age);
};

const populateAdmissionSelectors = () => {
  admissionBirthDay.innerHTML += Array.from({ length: 31 }, (_, index) => {
    const day = String(index + 1);
    return `<option value="${day}">${day}</option>`;
  }).join("");

  admissionBirthMonth.innerHTML += ADMISSION_MONTHS.map(
    (month) => `<option value="${month}">${month}</option>`
  ).join("");

  admissionBirthYear.innerHTML += ADMISSION_YEARS.map(
    (year) => `<option value="${year}">${year}</option>`
  ).join("");
};

const loadAdmissionRegNo = async () => {
  if (!isBackendReady) {
    admissionRegNo.textContent = "Setup required";
    return;
  }

  const { data, error } = await supabaseClient.rpc("peek_next_admission_reg_no");

  if (error) {
    admissionRegNo.textContent = "Unavailable";
    admissionMessage.textContent = error.message;
    return;
  }

  const value = Array.isArray(data) ? data[0]?.next_reg_no : data?.next_reg_no;
  admissionRegNo.textContent = value ? String(value) : "Unavailable";
};

const resetAdmissionForm = async () => {
  admissionForm.reset();
  admissionJoinDate.value = toLocalIsoDate();
  admissionMessage.textContent = "";
  admissionAge.textContent = "Auto";
  admissionPaymentIntentId = buildPaymentIntentId();
  sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
  
  // Clear hidden payment fields
  const methodInput = document.getElementById("admissionPaymentMethod");
  const upiInput = document.getElementById("admissionPaymentUpiId");
  const refInput = document.getElementById("admissionPaymentReference");
  if (methodInput) methodInput.value = "UPI";
  if (upiInput) upiInput.value = "";
  if (refInput) refInput.value = "";
  
  syncAdmissionAmountState();
  syncAdmissionStyleState();
  refreshPaymentReturnHint();
  await loadAdmissionRegNo();
};

const updateAuthPanel = () => {
  authPanel.hidden = !isAuthPanelOpen;
  authToggleButton.textContent = isManagerLoggedIn ? "Manager Access" : "Manager Login";
  quickLogoutButton.hidden = !isManagerLoggedIn;
  editModeButton.hidden = !isManagerLoggedIn;
  editModeButton.textContent = isEditMode ? "Done" : "Edit";
  editModeButton.classList.toggle("active", isEditMode);
  managerIdentity.hidden = !isManagerLoggedIn || !lastManagerEmail;
  managerIdentity.textContent = isManagerLoggedIn ? `Logged in: ${lastManagerEmail}` : "";
  lastLoginHint.hidden = !isManagerLoggedIn || !lastManagerEmail;
  lastLoginHint.textContent = isManagerLoggedIn
    ? `Last used manager email: ${lastManagerEmail}`
    : "";
};

const renderSummary = (alertKids) => {
  if (!isManagerLoggedIn) {
    mastheadBottom.hidden = true;
    if (criticalAlertCard) criticalAlertCard.hidden = true;
    return;
  }

  mastheadBottom.hidden = false;
  heroLabel.textContent = "Alert";
  const criticalKids = alertKids.filter((kid) => getReminderState(kid).isCritical);
  const standardAlertKids = alertKids.filter((kid) => !getReminderState(kid).isCritical);
  const totalAlerts = standardAlertKids.length;

  alertCount.textContent = totalAlerts === 0
    ? "No regular alerts"
    : totalAlerts === 1
      ? "1 regular alert"
      : `${totalAlerts} regular alerts`;

  if (!isBackendReady) {
    alertSummary.textContent = "Connect Supabase to load academy records.";
    if (criticalAlertCard) criticalAlertCard.hidden = true;
    return;
  }

  if (totalAlerts === 0) {
    alertSummary.textContent = criticalKids.length
      ? "Regular alerts are clear. Immediate follow-up is shown separately."
      : "All current join fees and renewals are up to date.";
  } else {
    const feesPendingKids = standardAlertKids.filter(isFeesPending);
    const renewalPendingKids = standardAlertKids.filter(isRenewalPending);
    const renderAlertGroup = (title, students) => students.length
      ? `<span class="alert-name-group"><strong>${title}</strong>${students
          .map((kid) => `<button class="player-link alert-player-link" type="button" data-alert-player-id="${kid.id}">${kid.name}</button>`)
          .join("")}</span>`
      : "";

    alertSummary.innerHTML = [
      renderAlertGroup("Fees to collect", feesPendingKids),
      renderAlertGroup("Renewal follow-up", renewalPendingKids),
    ].filter(Boolean).join("");
  }

  if (!criticalAlertCard || !criticalAlertCount || !criticalAlertSummary) return;
  criticalAlertCard.hidden = criticalKids.length === 0;
  criticalAlertCount.textContent =
    criticalKids.length === 1 ? "1 overdue player" : `${criticalKids.length} overdue players`;
  criticalAlertSummary.innerHTML = criticalKids
    .map((kid) => `<button class="player-link alert-player-link" type="button" data-alert-player-id="${kid.id}">${kid.name}</button>`)
    .join("");
};

const updateActiveView = () => {
  const isRoster = activeView === "roster";
  const isAttendance = activeView === "attendance";
  const isFinance = activeView === "finance";
  const isAdmission = !isRoster && !isAttendance && !isFinance;
  rosterView.hidden = !isRoster;
  admissionView.hidden = !isAdmission;
  if (attendanceView) attendanceView.hidden = !isAttendance;
  if (financeView) financeView.hidden = !isFinance;
  rosterTabButton.classList.toggle("active", isRoster);
  rosterTabButton.setAttribute("aria-selected", String(isRoster));
  admissionTabButton.classList.toggle("active", isAdmission);
  admissionTabButton.setAttribute("aria-selected", String(isAdmission));
  if (attendanceTabButton) {
    attendanceTabButton.classList.toggle("active", isAttendance);
    attendanceTabButton.setAttribute("aria-selected", String(isAttendance));
  }
  if (financeTabButton) {
    financeTabButton.classList.toggle("active", isFinance);
    financeTabButton.setAttribute("aria-selected", String(isFinance));
  }
};

const updateAccessUI = () => {
  const managerReady = isBackendReady && isManagerLoggedIn;
  const canEdit = managerReady && isEditMode;
  const formControls = kidForm.querySelectorAll("input, select, textarea, button");
  viewSwitcher.hidden = false;

  if (!hasSupabaseConfig) {
    loginForm.hidden = true;
    managerTools.hidden = true;
    accessMode.textContent = "Admission mode";
    loginHint.textContent =
      "Add your Supabase URL and anon key in supabase-config.js, then create a manager user in Supabase Auth.";
    editorLock.hidden = false;
    editorLock.textContent = "Complete Supabase setup before editing academy records.";
  } else if (!isBackendReady) {
    loginForm.hidden = true;
    managerTools.hidden = true;
    accessMode.textContent = "Admission mode";
    loginHint.textContent =
      "Supabase config exists, but the browser client did not load. Check the CDN script and redeploy.";
    editorLock.hidden = false;
    editorLock.textContent = "Supabase client failed to load, so editing is unavailable.";
  } else {
    loginForm.hidden = managerReady;
    managerTools.hidden = !managerReady;
    accessMode.textContent = canEdit
      ? "Manager edit mode"
      : managerReady
        ? "Manager roster mode"
        : "Admission mode";
    loginHint.textContent = managerReady
      ? "Manager access is active. Use Edit to unlock entry and player actions."
      : "Sign in with a manager email created in Supabase Auth.";
    editorLock.hidden = canEdit;
    editorLock.textContent = managerReady
      ? "Click Edit to unlock New Gen Alpha Entry and the registered-player actions."
      : "Login as manager to add or edit academy records.";
  }

  formControls.forEach((control) => {
    control.disabled = !canEdit;
  });

  if (!managerReady && activeView !== "admission" && activeView !== "attendance") {
    activeView = "admission";
  }

  if (rosterTabButton) {
    rosterTabButton.hidden = !managerReady;
  }
  if (financeTabButton) {
    financeTabButton.hidden = !managerReady;
  }

  if (managerReady && activeView === "admission") {
    // Keep admission if user was on it
  }

  if (lastManagerEmail) {
    document.getElementById("email").value = lastManagerEmail;
  }

  if (lastManagerPassword) {
    document.getElementById("password").value = lastManagerPassword;
  }

  formPanel.hidden = !canEdit;
  renderRosterHelper();
  actionHeader.hidden = !canEdit;

  formMessage.textContent = !hasSupabaseConfig
    ? "Supabase connection is required before edits can be made."
    : !isBackendReady
      ? "Supabase client failed to load."
      : canEdit
        ? "Edit mode enabled. You can add and update records."
        : managerReady
          ? "Roster access is enabled. Click Edit to make changes."
          : "Login is required before any edits can be made.";

  if (!canEdit) {
    resetFormState();
  }

  syncAmountState();
  updateActiveView();
  updateAuthPanel();
  renderAdmissionReviewQueue();
};

const renderKids = () => {
  kidsTableBody.innerHTML = "";
  updateRosterSortHeaders();
  updateStats();
  renderStudentMovement();
  renderSlotFilters();
  renderRosterHelper();

  const canEdit = isBackendReady && isManagerLoggedIn && isEditMode;
  const visibleKids = getFilteredKids();

  if (kids.length === 0) {
    emptyState.hidden = false;
    kidsTable.hidden = true;
    emptyState.textContent = isBackendReady
      ? isManagerLoggedIn
        ? isEditMode
          ? "No Gen Alpha players added yet. Use the form above to create the first record."
          : "No Gen Alpha players added yet. Click Edit to add the first player."
        : "No Gen Alpha players added yet. Login as manager to create the first record."
      : "No data source is connected yet. Finish the Supabase setup to start storing academy records.";
    renderSummary([]);
    return;
  }

  if (visibleKids.length === 0) {
    emptyState.hidden = false;
    kidsTable.hidden = true;
    emptyState.textContent =
      hasRosterDetailFilters() || rosterSearchQuery.trim()
        ? "No registered players match the current filters."
        : !activeSlotFilter
        ? "No registered players match the current view."
        : activeSlotFilter === "not-set"
          ? "No active kids are currently missing a time slot."
          : `No active kids are currently assigned to the ${activeSlotFilter} slot.`;
    renderSummary(kids.filter((kid) => isFeesPending(kid) || isRenewalPending(kid)));
    return;
  }

  emptyState.hidden = true;
  kidsTable.hidden = false;

  const alertKids = [];

  kids.forEach((kid) => {
    if (isFeesPending(kid) || isRenewalPending(kid)) {
      alertKids.push(kid);
    }
  });

  visibleKids.forEach((kid) => {
    const renewalPending = isRenewalPending(kid);
    const feesPending = isFeesPending(kid);
    const needsAttention = feesPending || renewalPending;
    const canRenew = renewalPending && isActiveKid(kid);
    const studentType = getStudentType(kid);
    const latestRenewal = kid.renewals.length > 0 ? kid.renewals[kid.renewals.length - 1] : "";
    const renewalStatus = getRenewalStatusLabel(kid);
    const dueDate = getPaidThroughDate(kid);
    const daysUntilDue = -getDaysSinceDate(dueDate);
    const reminderState = getReminderState(kid);

    const row = document.createElement("tr");
    row.dataset.playerRowId = kid.id;
    row.className = reminderState.isCritical ? "critical-row" : needsAttention ? "alert-row" : "";
    row.innerHTML = `
      <td data-label="Player"><button class="player-link" data-action="details" data-id="${kid.id}" type="button">${kid.name}</button></td>
      <td data-label="Age">${kid.age}</td>
      <td data-label="Time slot"><span class="slot-pill">${kid.timeSlot || "Not set"}</span></td>
      <td data-label="Jersey"><span class="meta-text">${formatJerseyDetails(kid)}</span></td>
      <td data-label="Status">
        <span class="state-pill ${kid.discontinued ? "discontinued" : "active"}">
          ${kid.discontinued ? "Discontinued" : "Active"}
        </span>
      </td>
      <td data-label="Student type">
        <span class="type-pill ${studentType === "Returning" ? "returning" : "new"}">
          ${studentType}
        </span>
      </td>
      <td data-label="Tenure"><span class="tenure-pill">${getTenureBadge(kid)}</span></td>
      <td data-label="Join date">${formatDate(kid.joinDate)}</td>
      <td data-label="Latest renewal">${latestRenewal ? formatDate(latestRenewal) : "<span class=\"sub-copy\">Not renewed</span>"}</td>
      <td data-label="Fees paid">
        <span class="status-pill ${feesPending ? "status-unpaid" : "status-paid"}">
          ${feesPending ? "Not paid" : "Paid"}
        </span>
      </td>
      <td data-label="Amount paid">Rs ${Number(kid.amountPaid).toFixed(2)}</td>
      <td data-label="Next fee due"><span class="alert-pill ${renewalPending ? "" : "safe"}">${renewalStatus}</span></td>
      <td data-label="Last Updated"><span class="meta-text">${kid.updatedBy}</span></td>
      ${
        canEdit
          ? `<td data-label="Actions">
            <div class="action-group">
              <button class="secondary-btn" data-action="edit" data-id="${kid.id}" type="button">Edit</button>
              <button class="secondary-btn" data-action="toggle-status" data-id="${kid.id}" type="button">
                ${kid.discontinued ? "Mark active" : "Discontinue"}
              </button>
              ${
                canRenew
                  ? `<button class="renew-btn" data-action="renew-open" data-id="${kid.id}" type="button">Mark fee paid</button>`
                  : ""
              }
              ${
                reminderState.isDue
                  ? `<button class="secondary-btn reminder-btn" data-action="send-reminder" data-id="${kid.id}" type="button">Send reminder</button>`
                  : ""
              }
              <button class="danger-btn" data-action="delete" data-id="${kid.id}" type="button">Delete</button>
            </div>
          </td>`
          : ""
      }
    `;
    kidsTableBody.appendChild(row);
  });

  renderSummary(alertKids);
};

const refreshSession = async () => {
  if (!isBackendReady) {
    isManagerLoggedIn = false;
    updateAccessUI();
    return;
  }

  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();

  if (error) {
    loginMessage.textContent = error.message;
  }

  if (session?.user?.email) {
    lastManagerEmail = session.user.email;
    localStorage.setItem(LAST_EMAIL_STORAGE_KEY, lastManagerEmail);
  }

  isManagerLoggedIn = Boolean(session);
  if (!isManagerLoggedIn) {
    isEditMode = false;
  }
  updateAccessUI();
};

const loadKids = async () => {
  if (!isBackendReady) {
    kids = [];
    renderKids();
    return;
  }

  const { data, error } = await supabaseClient
    .from("students")
    .select("*")
    .order("join_date", { ascending: false });

  if (error) {
    kids = [];
    emptyState.hidden = false;
    kidsTable.hidden = true;
    emptyState.textContent = `Supabase error: ${error.message}`;
    alertCount.textContent = "0 kids need attention";
    alertSummary.textContent = "Fix the Supabase setup to load academy records.";
    return;
  }

  kids = data.map(normalizeKid);
  renderKids();
  if (isManagerLoggedIn) {
    queueFinanceRefresh();
  }
};

const renderAdmissionReviewQueue = () => {
  if (!admissionReviewPanel || !admissionReviewCount || !admissionReviewList) return;

  const managerReady = isBackendReady && isManagerLoggedIn;
  admissionReviewPanel.hidden = !managerReady || pendingAdmissions.length === 0;
  admissionReviewCount.textContent =
    pendingAdmissions.length === 1 ? "1 pending" : `${pendingAdmissions.length} pending`;

  if (!managerReady || pendingAdmissions.length === 0) {
    admissionReviewList.innerHTML = "";
    return;
  }

  admissionReviewList.innerHTML = pendingAdmissions
    .map((admission) => {
      const contact = admission.parentContactNo || admission.alternateContactNo || "No phone saved";
      const payLabel = admission.feesPaid
        ? `Paid Rs ${admission.amountPaid.toLocaleString("en-IN")}`
        : "Fees not paid";
      return `
        <article class="admission-review-card">
          <div class="review-main">
            <div>
              <p class="review-reg">Reg ${escapeHtml(admission.regNo || "-")} · ${escapeHtml(admission.filledBy)}</p>
              <h3>${escapeHtml(admission.applicantName)}</h3>
              <p class="review-meta">${escapeHtml(admission.age)} yrs · ${escapeHtml(admission.timeSlot || "Slot not set")} · Joining ${escapeHtml(formatDate(admission.joinDate))}</p>
            </div>
            <span class="status-pill ${admission.feesPaid ? "status-paid" : "status-unpaid"}">${escapeHtml(payLabel)}</span>
          </div>
          <div class="review-details">
            <span>Parent: ${escapeHtml(admission.fatherGuardianName || "-")}</span>
            <span>Phone: ${escapeHtml(contact)}</span>
            <span>School: ${escapeHtml(admission.schoolCollege || "-")}</span>
            <span>Jersey: ${escapeHtml(admission.jerseySize || "Not set")} · ${admission.jerseyPairs || 0} pair${admission.jerseyPairs === 1 ? "" : "s"}</span>
          </div>
          ${admission.comments ? `<p class="review-comment">${escapeHtml(admission.comments)}</p>` : ""}
          <div class="review-actions">
            <button class="primary-btn" type="button" data-approve-admission="${escapeHtml(admission.id)}">Approve to roster</button>
            <button class="danger-btn" type="button" data-reject-admission="${escapeHtml(admission.id)}">Reject</button>
          </div>
        </article>
      `;
    })
    .join("");
};

const loadPendingAdmissions = async () => {
  if (!isBackendReady || !isManagerLoggedIn) {
    pendingAdmissions = [];
    renderAdmissionReviewQueue();
    return;
  }

  const { data, error } = await supabaseClient
    .from("admissions")
    .select("*")
    .eq("review_status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    pendingAdmissions = [];
    renderAdmissionReviewQueue();
    showToast(`Unable to load admission review queue: ${error.message}`);
    return;
  }

  pendingAdmissions = (data || []).map(normalizePendingAdmission);
  renderAdmissionReviewQueue();
};

const loadPlayerTimeline = async (studentId) => {
  if (!isBackendReady || !isManagerLoggedIn) return [];

  const { data, error } = await supabaseClient
    .from("student_timeline")
    .select("*")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return [];
  }

  return data || [];
};

const getFreshManagerAccessToken = async () => {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session?.access_token) return "";

  const expiresAtMs = Number(session.expires_at || 0) * 1000;
  if (expiresAtMs && expiresAtMs - Date.now() > 60000) {
    return session.access_token;
  }

  const {
    data: { session: refreshedSession },
  } = await supabaseClient.auth.refreshSession();

  return refreshedSession?.access_token || session.access_token;
};

const callReminderFunction = async (kid, reminderState, accessToken) => {
  const functionResponse = await fetch(`${SUPABASE_CONFIG.url}/functions/v1/whatsapp-reminder`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: SUPABASE_CONFIG.anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "send_reminder",
      studentId: kid.id,
      dueDate: reminderState.dueDate,
      reminderType: reminderState.reminderType,
    }),
  });
  const functionBody = await functionResponse.json();
  return { functionResponse, functionBody };
};

const isReminderAuthError = (message = "") =>
  /auth|session|jwt|bearer|authorization/i.test(String(message));

const sendReminderDryRun = async (kid) => {
  if (!kid) {
    return { success: false, message: "Player record not found." };
  }
  if (!isBackendReady || !isManagerLoggedIn) {
    return { success: false, message: "Login as manager before logging reminders." };
  }
  const reminderState = getReminderState(kid);
  if (!reminderState.isDue) {
    return { success: false, message: `${kid.name} is not due for a fee reminder.` };
  }

  await loadReminderSettings();
  let accessToken = await getFreshManagerAccessToken();
  if (accessToken) {
    try {
      let { functionResponse, functionBody } = await callReminderFunction(kid, reminderState, accessToken);
      if (
        !functionResponse.ok &&
        functionResponse.status !== 404 &&
        isReminderAuthError(functionBody?.error)
      ) {
        const {
          data: { session: refreshedSession },
        } = await supabaseClient.auth.refreshSession();
        accessToken = refreshedSession?.access_token || "";
        if (accessToken) {
          ({ functionResponse, functionBody } = await callReminderFunction(kid, reminderState, accessToken));
        }
      }
      if (functionResponse.ok && functionBody?.success) {
        return {
          success: true,
          message: functionBody.message || `Dry-run WhatsApp reminder logged for ${kid.name}.`,
        };
      }
      if (functionResponse.status !== 404) {
        const isExpiredSession = [401, 403].includes(functionResponse.status) &&
          isReminderAuthError(functionBody?.error);
        return {
          success: false,
          message: isExpiredSession
            ? "Manager session expired. Please logout, login again, then send the reminder."
            : functionBody?.error || "WhatsApp reminder function failed.",
        };
      }
    } catch (_) {
      // If the function is not deployed yet, keep the local dry-run path usable.
    }
  }

  const dryRun = reminderSettings.dryRunMode || !reminderSettings.whatsappRemindersEnabled;
  const status = dryRun ? "dry_run" : "queued";
  const messagePreview = buildReminderPreview(kid, reminderState);
  const { data: reminderEvent, error } = await supabaseClient
    .from("reminder_events")
    .insert({
      student_id: kid.id,
      reminder_type: reminderState.reminderType,
      channel: "whatsapp",
      status,
      dry_run: dryRun,
      due_date: reminderState.dueDate,
      overdue_days: reminderState.overdueDays,
      plan_options: REMINDER_PLAN_OPTIONS,
      parent_phone: kid.parentContactNo || "",
      manager_phone: reminderSettings.managerPhone,
      message_preview: messagePreview,
      created_by: getActiveManagerEmail(),
    })
    .select("*")
    .single();

  if (error) {
    return { success: false, message: `Reminder could not be logged: ${error.message}` };
  }

  const { error: linkError } = await supabaseClient.from("payment_link_requests").insert({
    reminder_event_id: reminderEvent.id,
    student_id: kid.id,
    payment_type: reminderState.reminderType === "joining_fee" ? "joining" : "renewal",
    plan_type: "awaiting_parent_choice",
    months_covered: 0,
    amount: 0,
    cycle_start_date: reminderState.dueDate,
    provider: "upi",
    status: reminderSettings.paymentLinksEnabled && !dryRun ? "awaiting_parent_choice" : "dry_run",
    dry_run: dryRun || !reminderSettings.paymentLinksEnabled,
    created_by: getActiveManagerEmail(),
  });

  if (linkError) {
    return {
      success: false,
      message: `Reminder logged, but payment-link dry-run failed: ${linkError.message}`,
    };
  }

  return {
    success: true,
    message: dryRun
      ? `Dry-run WhatsApp reminder logged for ${kid.name}.`
      : `WhatsApp reminder queued for ${kid.name}.`,
  };
};

const renderPlayerDetails = async (kid) => {
  if (!kid || !playerDetailPopup || !playerDetailContent) return;
  const timeline = await loadPlayerTimeline(kid.id);
  const paymentRows = getPlayerPaymentRows(kid);
  const totalPaid = paymentRows.reduce((total, payment) => total + Number(payment.amount || 0), 0);
  const totalMonths = paymentRows.reduce((total, payment) => total + Number(payment.months || 0), 0);
  const reminderState = getReminderState(kid);

  playerDetailTitle.textContent = kid.name;
  playerDetailContent.innerHTML = `
    ${
      reminderState.isCritical
        ? `<div class="critical-reminder-banner">Overdue for ${reminderState.overdueDays} days. Follow up with parent today.</div>`
        : ""
    }
    <div class="player-profile-grid">
      <div class="profile-stat"><span>Training duration</span><strong>${getTrainingDuration(kid)}</strong></div>
      <div class="profile-stat"><span>Joined</span><strong>${formatDate(kid.joinDate)}</strong></div>
      <div class="profile-stat"><span>Next fee due</span><strong>${kid.discontinued ? "Paused" : formatDate(getPaidThroughDate(kid))}</strong></div>
      <div class="profile-stat"><span>Amount paid</span><strong>Rs ${Number(kid.amountPaid).toFixed(2)}</strong></div>
    </div>
    <div class="player-detail-section">
      <h4>Parent details</h4>
      <p><strong>${kid.fatherGuardianName || "Parent name not saved"}</strong></p>
      <p>
        ${
          kid.parentContactNo
            ? `<a class="call-link" href="tel:${kid.parentContactNo}">${kid.parentContactNo}</a>`
            : "Parent contact not saved"
        }
      </p>
      ${kid.alternateContactNo ? `<p>Alternate: <a class="call-link" href="tel:${kid.alternateContactNo}">${kid.alternateContactNo}</a></p>` : ""}
      ${kid.filledBy ? `<p class="meta-text">Form filled by: ${kid.filledBy}</p>` : ""}
      ${
        kid.schoolCollege || kid.grade || kid.address
          ? `<p class="meta-text">${[kid.schoolCollege, kid.grade ? `Grade ${kid.grade}` : "", kid.address]
              .filter(Boolean)
              .join(" • ")}</p>`
          : ""
      }
    </div>
    <div class="player-detail-section payment-history-section">
      <div class="payment-history-summary">
        <div>
          <span>Total paid</span>
          <strong>${rupees(totalPaid)}</strong>
        </div>
        <div>
          <span>Months paid</span>
          <strong>${totalMonths}</strong>
        </div>
      </div>
      <h4>Payment details</h4>
      ${
        paymentRows.length > 0
          ? `<div class="payment-history-list">${paymentRows.map((payment) => `
              <div class="payment-history-row">
                <div>
                  <strong>${payment.title}</strong>
                  <span>${formatDate(payment.date)} · ${payment.plan} · ${payment.months} month${payment.months === 1 ? "" : "s"}</span>
                </div>
                <b>${rupees(payment.amount)}</b>
              </div>
            `).join("")}</div>`
          : `<p class="sub-copy">No paid fee records yet.</p>`
      }
    </div>
    ${
      isManagerLoggedIn && reminderState.isDue
        ? `<div class="player-detail-section reminder-action-panel">
            <h4>WhatsApp reminder</h4>
            <p class="meta-text">Manual reminder only. Parent receives WhatsApp with payment options.</p>
            <button class="primary-btn" type="button" data-profile-reminder-id="${kid.id}">Send WhatsApp reminder</button>
          </div>`
        : ""
    }
    <div class="player-detail-section">
      <h4>Timeline</h4>
      ${
        timeline.length > 0
          ? `<ol class="timeline-list">${timeline.map((item) => `
              <li>
                <strong>${item.title || item.event_type}</strong>
                <span>${formatDate(item.event_date)} · ${item.changed_by || "System"}</span>
                ${item.details ? `<p>${item.details}</p>` : ""}
              </li>
            `).join("")}</ol>`
          : `<p class="sub-copy">No timeline records yet. Run the player profile timeline SQL migration to start capturing changes.</p>`
      }
    </div>
  `;
  playerDetailPopup.hidden = false;
  document.body.classList.add("popup-open");
};

const openRenewalPopup = (kid) => {
  if (!kid || !renewalPopup) return;
  const cycleDate = getDueCycleDate(kid);
  renewalStudentId.value = kid.id;
  renewalPlan.value = "monthly";
  renewalAmount.value = String(RENEWAL_PLANS.monthly.amount);
  renewalComment.value = "";
  renewalCycleInfo.textContent = `This records payment for cycle starting ${formatDate(cycleDate)}. Paid late does not change the student's usual fee date.`;
  renewalMessage.textContent = "";
  renewalPopup.hidden = false;
  document.body.classList.add("popup-open");
};

const closeRenewalPopup = () => {
  if (!renewalPopup) return;
  renewalPopup.hidden = true;
  document.body.classList.remove("popup-open");
};

const loadFinance = async () => {
  const managerReady = isBackendReady && isManagerLoggedIn;
  if (financeLock) financeLock.hidden = managerReady;
  if (financeStats) financeStats.hidden = !managerReady;
  if (financeInsights) financeInsights.hidden = !managerReady;
  if (financeExportPanel) financeExportPanel.hidden = true; // Export panel hidden for now
  if (financeRangePanel) financeRangePanel.hidden = !managerReady;
  if (managerReady) {
    await loadReminderSettings();
  }
  syncReminderSettingsPanel();
  const expenseDateInput = document.getElementById("expenseDate");
  if (expenseDateInput && !expenseDateInput.value) {
    expenseDateInput.value = toLocalIsoDate();
  }
  if (financeRecent) financeRecent.hidden = !managerReady;
  if (!managerReady) return;

  const requestSeq = ++financeLoadSeq;
  const [paymentsResult, expensesResult] = await Promise.all([
    supabaseClient.from("student_payments").select("*").order("paid_on", { ascending: false }),
    supabaseClient.from("academy_expenses").select("*").order("expense_date", { ascending: false }),
  ]);
  if (requestSeq !== financeLoadSeq) return;

  financePayments = paymentsResult.data || [];
  financeExpenses = expensesResult.data || [];
  if (activeView === "roster") renderKids();

  const now = new Date();
  const localMonthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  const selectedRange = financeRangeFromMode();
  const initialFees = kids
    .filter((kid) => kid.feesPaid === "yes")
    .map((kid) => ({ amount: kid.amountPaid, paid_on: kid.joinDate }));
  const allFees = [...initialFees, ...financePayments];
  const sum = (rows, dateKey = "") =>
    rows
      .filter((row) => !dateKey || String(row.paid_on || row.expense_date || "").startsWith(dateKey))
      .reduce((total, row) => total + Number(row.amount || 0), 0);

  const rangeFees = allFees.filter((row) => isRowInFinanceRange(row, selectedRange)).reduce((total, row) => total + Number(row.amount || 0), 0);
  const rangeExpenses = financeExpenses.filter((row) => isRowInFinanceRange(row, selectedRange)).reduce((total, row) => total + Number(row.amount || 0), 0);
  const rangeNet = rangeFees - rangeExpenses;

  if (financeRangeTitle) financeRangeTitle.textContent = selectedRange.label;
  if (financeRangePeriod) financeRangePeriod.textContent = selectedRange.period || "";
  if (financeFeesLabel) financeFeesLabel.textContent = `${selectedRange.label} Fees`;
  if (financeExpensesLabel) financeExpensesLabel.textContent = `${selectedRange.label} Expense`;
  if (financeNetLabel) financeNetLabel.textContent = `${selectedRange.label} Net`;
  if (financeMonthFees) financeMonthFees.textContent = rupees(rangeFees);
  if (financeMonthExpenses) financeMonthExpenses.textContent = rupees(rangeExpenses);
  if (financeMonthNet) {
    financeMonthNet.textContent = rupees(rangeNet);
    financeMonthNet.parentElement?.classList.toggle("negative", rangeNet < 0);
    financeMonthNet.parentElement?.classList.toggle("positive", rangeNet >= 0);
  }
  if (financeRangeFilters) {
    financeRangeFilters.querySelectorAll("[data-finance-range]").forEach((button) => {
      button.classList.toggle("active", button.dataset.financeRange === financeRangeMode);
    });
  }

  if (financeMiniChart) {
    const monthBuckets = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const key = localMonthKey(date);
      return {
        key,
        label: date.toLocaleString("en-IN", { month: "short" }),
        fullLabel: date.toLocaleString("en-IN", { month: "long", year: "numeric" }),
        fees: sum(allFees, key),
        expenses: sum(financeExpenses, key),
      };
    });
    const maxChartValue = Math.max(1, ...monthBuckets.flatMap((month) => [month.fees, month.expenses]));
    financeMiniChart.innerHTML = monthBuckets.map((month) => {
      const feeHeight = Math.max(6, Math.round((month.fees / maxChartValue) * 76));
      const expenseHeight = Math.max(6, Math.round((month.expenses / maxChartValue) * 76));
      return `
        <button class="finance-chart-month" type="button" data-finance-month="${month.key}" data-tooltip="${month.fullLabel}: Fees ${rupees(month.fees)} | Expenses ${rupees(month.expenses)} | Net ${rupees(month.fees - month.expenses)}">
          <div class="finance-bars">
            <span class="fee-bar" style="height:${feeHeight}px"></span>
            <span class="expense-bar" style="height:${expenseHeight}px"></span>
          </div>
          <strong>${month.label}</strong>
        </button>
      `;
    }).join("");
    if (financeNetTimeline) {
      financeNetTimeline.innerHTML = monthBuckets.map((month) => {
        const net = month.fees - month.expenses;
        return `
          <div class="finance-net-chip ${net < 0 ? "negative" : "positive"}">
            <span>${month.label}</span>
            <strong>${rupees(net)}</strong>
          </div>
        `;
      }).join("");
    }
  }
  
  const renderExpensesTable = () => {
    let filtered = financeExpenses;
    if (expenseSearchQuery) {
      const q = expenseSearchQuery.toLowerCase();
      filtered = financeExpenses.filter((item) =>
        (item.expense_type || "").toLowerCase().includes(q) ||
        (item.paid_by || "").toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) => {
      let valA, valB;
      if (expenseSortKey === "type") {
        valA = a.expense_type || "";
        valB = b.expense_type || "";
      } else if (expenseSortKey === "amount") {
        valA = Number(a.amount || 0);
        valB = Number(b.amount || 0);
      } else if (expenseSortKey === "paid_by") {
        valA = a.paid_by || "";
        valB = b.paid_by || "";
      } else {
        valA = a.expense_date || "";
        valB = b.expense_date || "";
      }
      
      if (valA < valB) return expenseSortOrder === "asc" ? -1 : 1;
      if (valA > valB) return expenseSortOrder === "asc" ? 1 : -1;
      return 0;
    });

    if (financeExpensesTableBody) {
      financeExpensesTableBody.innerHTML = filtered.length
        ? filtered.map((item) => `
            <tr>
              <td data-label="Type"><span class="type-pill">${item.expense_type}</span></td>
              <td data-label="Amount"><strong>${rupees(item.amount)}</strong></td>
              <td data-label="Date">${formatDate(item.expense_date)}</td>
              <td data-label="Paid by">${item.paid_by}</td>
              <td data-label="Comment" class="meta-text finance-comment">${item.comment || "-"}</td>
              <td data-label="Action">
                <button class="danger-btn expense-delete-btn" data-expense-delete="${item.id}" type="button">Delete</button>
              </td>
            </tr>
          `).join("")
        : `<tr><td colspan="6" class="sub-copy" style="text-align: center; padding: 20px;">No expenses found.</td></tr>`;
    }
    
    // Update header visual state
    [sortExpenseType, sortExpenseAmount, sortExpenseDate, sortExpensePaidBy].forEach(th => {
      if (!th) return;
      const keyMap = { sortExpenseType: "type", sortExpenseAmount: "amount", sortExpenseDate: "date", sortExpensePaidBy: "paid_by" };
      const baseText = th.textContent.replace(" ↑", "").replace(" ↓", "").replace(" ↕", "");
      if (keyMap[th.id] === expenseSortKey) {
        th.textContent = `${baseText} ${expenseSortOrder === "asc" ? "↑" : "↓"}`;
      } else {
        th.textContent = `${baseText} ↕`;
      }
    });
  };

  renderExpensesTable();

  // Attach events if not already attached
  if (expenseSearch && !expenseSearch.hasAttribute("data-bound")) {
    expenseSearch.setAttribute("data-bound", "true");
    expenseSearch.addEventListener("input", (e) => {
      expenseSearchQuery = e.target.value;
      renderExpensesTable();
    });
    
    const handleSort = (key) => {
      if (expenseSortKey === key) {
        expenseSortOrder = expenseSortOrder === "asc" ? "desc" : "asc";
      } else {
        expenseSortKey = key;
        expenseSortOrder = "asc";
      }
      renderExpensesTable();
    };

    if (sortExpenseType) sortExpenseType.addEventListener("click", () => handleSort("type"));
    if (sortExpenseAmount) sortExpenseAmount.addEventListener("click", () => handleSort("amount"));
    if (sortExpenseDate) sortExpenseDate.addEventListener("click", () => handleSort("date"));
    if (sortExpensePaidBy) sortExpensePaidBy.addEventListener("click", () => handleSort("paid_by"));
  }
};

const queueFinanceRefresh = () => {
  if (!isBackendReady || !isManagerLoggedIn) return;
  if (financeReloadTimer) window.clearTimeout(financeReloadTimer);
  financeReloadTimer = window.setTimeout(() => {
    financeReloadTimer = null;
    loadFinance();
  }, 120);
};

financeRangeFilters?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-finance-range]");
  if (!button) return;
  financeRangeMode = button.dataset.financeRange || "month";
  loadFinance();
});

financeExportMonth?.addEventListener("change", () => {
  financeRangeMode = "month-picker";
  loadFinance();
});
financeCustomStart?.addEventListener("change", () => {
  financeRangeMode = "custom";
  loadFinance();
});
financeCustomEnd?.addEventListener("change", () => {
  financeRangeMode = "custom";
  loadFinance();
});
saveReminderSettingsButton?.addEventListener("click", saveReminderSettings);

financeMiniChart?.addEventListener("click", (event) => {
  const target = event.target.closest("[data-finance-month]");
  if (!target) return;
  renderFinanceMonthPopup(target.dataset.financeMonth);
});

openExpensePopupButton?.addEventListener("click", () => {
  const expenseDateInput = document.getElementById("expenseDate");
  if (expenseDateInput && !expenseDateInput.value) expenseDateInput.value = toLocalIsoDate();
  if (expenseMessage) expenseMessage.textContent = "";
  expensePopup.hidden = false;
  document.body.classList.add("popup-open");
});

const closeExpensePopup = () => {
  if (!expensePopup) return;
  expensePopup.hidden = true;
  document.body.classList.remove("popup-open");
};

const closeFinanceMonthPopup = () => {
  if (!financeMonthPopup) return;
  financeMonthPopup.hidden = true;
  document.body.classList.remove("popup-open");
};

closeExpensePopupButton?.addEventListener("click", closeExpensePopup);
expensePopup?.addEventListener("click", (event) => {
  if (event.target === expensePopup) closeExpensePopup();
});
closeFinanceMonthPopupButton?.addEventListener("click", closeFinanceMonthPopup);
financeMonthPopup?.addEventListener("click", (event) => {
  if (event.target === financeMonthPopup) closeFinanceMonthPopup();
});

const loadMonthlyAttendanceRows = async (range) => {
  const { data, error } = await supabaseClient
    .from("attendance")
    .select("student_id, attendance_date")
    .gte("attendance_date", range.start)
    .lte("attendance_date", range.end)
    .order("attendance_date", { ascending: true });
  if (error) throw error;
  return data || [];
};

const buildMonthlyExportData = async () => {
  if (!isBackendReady || !isManagerLoggedIn) {
    throw new Error("Login as manager to export records.");
  }
  const range = monthRange(financeExportMonth?.value || currentMonthKey());
  if (kids.length === 0) await loadKids();
  await loadFinance();
  const attendanceRows = await loadMonthlyAttendanceRows(range);
  const studentLookup = new Map(kids.map((kid) => [kid.id, kid]));
  const initialFees = kids
    .filter((kid) => kid.feesPaid === "yes" && String(kid.joinDate || "").startsWith(range.key))
    .map((kid) => ({
      type: "Admission",
      player: kid.name,
      date: kid.joinDate,
      amount: kid.amountPaid,
      reference: kid.paymentReference || "",
    }));
  const renewalFees = financePayments
    .filter((payment) => String(payment.paid_on || payment.paidOn || "").startsWith(range.key))
    .map((payment) => ({
      type: "Renewal",
      player: studentLookup.get(payment.student_id || payment.studentId)?.name || payment.student_id || payment.studentId || "",
      date: payment.paid_on || payment.paidOn || "",
      amount: Number(payment.amount || 0),
      reference: payment.id || "",
    }));
  const expenses = financeExpenses.filter((expense) => String(expense.expense_date || "").startsWith(range.key));
  const attendanceByStudent = attendanceRows.reduce((map, row) => {
    map.set(row.student_id, (map.get(row.student_id) || 0) + 1);
    return map;
  }, new Map());
  return {
    range,
    attendanceRows,
    studentRows: kids.map((kid) => ({
      "Reg No": kid.regNo || "",
      Name: kid.name,
      Age: kid.age,
      Slot: kid.timeSlot || "Not set",
      Status: kid.discontinued ? "Discontinued" : "Active",
      "Join Date": kid.joinDate,
      "Fees Paid": kid.feesPaid === "yes" ? "Yes" : "No",
      "Amount Paid": kid.amountPaid,
      "Jersey Size": kid.jerseySize || "",
      "Jersey Pairs": kid.jerseyPairs || 0,
      "Parent": kid.fatherGuardianName || "",
      "Parent Contact": kid.parentContactNo || "",
      "Attendance Days": attendanceByStudent.get(kid.id) || 0,
    })),
    attendanceExportRows: attendanceRows.map((row) => {
      const kid = studentLookup.get(row.student_id);
      return {
        Date: row.attendance_date,
        Player: kid?.name || row.student_id,
        Slot: kid?.timeSlot || "",
        Status: "Present",
      };
    }),
    paymentRows: [...initialFees, ...renewalFees].map((payment) => ({
      Date: payment.date,
      Type: payment.type,
      Player: payment.player,
      Amount: payment.amount,
      Reference: payment.reference,
    })),
    expenseRows: expenses.map((expense) => ({
      Date: expense.expense_date,
      Type: expense.expense_type,
      Amount: expense.amount,
      "Paid By": expense.paid_by,
      Comment: expense.comment || "",
    })),
  };
};

const exportMonthlyCsv = async () => {
  try {
    const data = await buildMonthlyExportData();
    const prefix = `gen-alpha-${data.range.key}`;
    downloadTextFile(`${prefix}-students.csv`, toCsv(Object.keys(data.studentRows[0] || { Name: "" }), data.studentRows));
    downloadTextFile(`${prefix}-attendance.csv`, toCsv(["Date", "Player", "Slot", "Status"], data.attendanceExportRows));
    downloadTextFile(`${prefix}-payments.csv`, toCsv(["Date", "Type", "Player", "Amount", "Reference"], data.paymentRows));
    downloadTextFile(`${prefix}-expenses.csv`, toCsv(["Date", "Type", "Amount", "Paid By", "Comment"], data.expenseRows));
    showToast(`Exported ${data.range.label} CSV files.`);
  } catch (error) {
    showToast(error.message || "Unable to export CSV.");
  }
};

const printMonthlyReport = async () => {
  try {
    const data = await buildMonthlyExportData();
    const feeTotal = data.paymentRows.reduce((sum, row) => sum + Number(row.Amount || 0), 0);
    const expenseTotal = data.expenseRows.reduce((sum, row) => sum + Number(row.Amount || 0), 0);
    const activeCount = kids.filter((kid) => !kid.discontinued).length;
    const reportWindow = window.open("", "_blank", "width=980,height=900");
    if (!reportWindow) {
      showToast("Allow popups to print the monthly report.");
      return;
    }
    const tableRows = (rows, columns) => rows.length
      ? rows.map((row) => `<tr>${columns.map((col) => `<td>${escapeHtml(row[col])}</td>`).join("")}</tr>`).join("")
      : `<tr><td colspan="${columns.length}">No records for this month.</td></tr>`;
    reportWindow.document.write(`
      <html>
        <head>
          <title>Gen Alpha Monthly Report ${escapeHtml(data.range.label)}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 28px; color: #10264f; }
            h1, h2 { margin: 0 0 10px; }
            .muted { color: #66748c; }
            .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
            .metric { border: 1px solid #dce3ef; border-radius: 14px; padding: 14px; background: #f7f9fd; }
            .metric span { display: block; font-size: 11px; text-transform: uppercase; color: #66748c; font-weight: 700; }
            .metric strong { font-size: 22px; }
            table { width: 100%; border-collapse: collapse; margin: 12px 0 24px; font-size: 12px; }
            th, td { border: 1px solid #dce3ef; padding: 8px; text-align: left; }
            th { background: #102f66; color: white; }
            @media print { body { margin: 14mm; } }
          </style>
        </head>
        <body>
          <h1>Gen Alpha Cricket Academy</h1>
          <p class="muted">Monthly report for ${escapeHtml(data.range.label)}</p>
          <section class="metrics">
            <div class="metric"><span>Active players</span><strong>${activeCount}</strong></div>
            <div class="metric"><span>Fees collected</span><strong>${rupees(feeTotal)}</strong></div>
            <div class="metric"><span>Expenses</span><strong>${rupees(expenseTotal)}</strong></div>
            <div class="metric"><span>Net</span><strong>${rupees(feeTotal - expenseTotal)}</strong></div>
          </section>
          <h2>Payments</h2>
          <table><thead><tr>${["Date", "Type", "Player", "Amount", "Reference"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${tableRows(data.paymentRows, ["Date", "Type", "Player", "Amount", "Reference"])}</tbody></table>
          <h2>Expenses</h2>
          <table><thead><tr>${["Date", "Type", "Amount", "Paid By", "Comment"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${tableRows(data.expenseRows, ["Date", "Type", "Amount", "Paid By", "Comment"])}</tbody></table>
          <h2>Attendance</h2>
          <table><thead><tr>${["Date", "Player", "Slot", "Status"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${tableRows(data.attendanceExportRows, ["Date", "Player", "Slot", "Status"])}</tbody></table>
        </body>
      </html>
    `);
    reportWindow.document.close();
    reportWindow.focus();
    reportWindow.print();
  } catch (error) {
    showToast(error.message || "Unable to print report.");
  }
};

const initializeAuthListener = () => {
  if (!isBackendReady) {
    return;
  }

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => {
      if (session?.user?.email) {
        lastManagerEmail = session.user.email;
        localStorage.setItem(LAST_EMAIL_STORAGE_KEY, lastManagerEmail);
      }

      isManagerLoggedIn = Boolean(session);
      if (!isManagerLoggedIn) {
        isEditMode = false;
      }
      updateAccessUI();
      renderKids();
      if (isManagerLoggedIn) {
        loadPendingAdmissions();
      } else {
        pendingAdmissions = [];
        renderAdmissionReviewQueue();
      }
      restartRealtimeSync();
    }, 0);
  });
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isBackendReady) {
    loginMessage.textContent = "Supabase is not configured yet.";
    return;
  }

  const formData = new FormData(loginForm);
  const email = formData.get("email").toString().trim();
  const password = formData.get("password").toString();

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    loginMessage.textContent = error.message;
    return;
  }

  lastManagerEmail = email;
  lastManagerPassword = password;
  localStorage.setItem(LAST_EMAIL_STORAGE_KEY, lastManagerEmail);
  localStorage.setItem(LAST_PASSWORD_STORAGE_KEY, lastManagerPassword);
  loginForm.reset();
  loginMessage.textContent = "";
  isAuthPanelOpen = false;
  isEditMode = false;
  activeView = "roster";
  await refreshSession();
  await loadKids();
  await loadPendingAdmissions();
  await loadFinance();
});

const handleLogout = async () => {
  if (!isBackendReady) {
    return;
  }

  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    loginMessage.textContent = error.message;
    return;
  }

  loginMessage.textContent = "";
  isAuthPanelOpen = false;
  isEditMode = false;
  activeView = "admission";
  pendingAdmissions = [];
  await refreshSession();
  renderAdmissionReviewQueue();
  renderKids();
};

logoutButton.addEventListener("click", handleLogout);
quickLogoutButton.addEventListener("click", handleLogout);

admissionReviewList?.addEventListener("click", async (event) => {
  const approveButton = event.target.closest("[data-approve-admission]");
  const rejectButton = event.target.closest("[data-reject-admission]");
  const admissionId = approveButton?.dataset.approveAdmission || rejectButton?.dataset.rejectAdmission;

  if (!admissionId || !isBackendReady || !isManagerLoggedIn) return;

  const actionButton = approveButton || rejectButton;
  actionButton.disabled = true;
  actionButton.textContent = approveButton ? "Approving..." : "Rejecting...";

  const rpcName = approveButton ? "approve_admission" : "reject_admission";
  const { error } = await supabaseClient.rpc(rpcName, {
    p_admission_id: admissionId,
    p_reviewed_by: getActiveManagerEmail(),
    p_review_notes: "",
  });

  if (error) {
    showToast(error.message || "Unable to update admission review.");
    actionButton.disabled = false;
    actionButton.textContent = approveButton ? "Approve to roster" : "Reject";
    return;
  }

  pendingAdmissions = pendingAdmissions.filter((admission) => admission.id !== admissionId);
  renderAdmissionReviewQueue();
  await loadKids();
  showToast(approveButton ? "Admission approved and added to roster." : "Admission rejected.");
});

kidForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isBackendReady || !isManagerLoggedIn || !isEditMode) {
    formMessage.textContent = isManagerLoggedIn
      ? "Click Edit to unlock academy record changes."
      : "Login as manager after connecting Supabase to edit records.";
    return;
  }

  const formData = new FormData(kidForm);
  const payload = {
    name: formData.get("name").toString().trim(),
    age: Number(formData.get("age")),
    timeSlot: formData.get("timeSlot").toString(),
    joinDate: formData.get("joinDate").toString(),
    feesPaid: formData.get("feesPaid").toString(),
    amountPaid: Number(formData.get("amountPaid")),
    jerseySize: formData.get("jerseySize").toString(),
    jerseyPairs: Number(formData.get("jerseyPairs") || 0),
    renewals: [],
    addedBy: getActiveManagerEmail(),
    updatedBy: getActiveManagerEmail(),
    discontinued: false,
    fatherGuardianName: String(formData.get("fatherGuardianName") || "").trim(),
    parentContactNo: String(formData.get("parentContactNo") || "").replace(/\D/g, "").slice(0, 10),
    alternateContactNo: "",
    schoolCollege: String(formData.get("schoolCollege") || "").trim(),
    grade: String(formData.get("grade") || "").trim(),
    address: String(formData.get("address") || "").trim(),
  };

  if (!payload.name || !payload.joinDate || !payload.timeSlot) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  if (new Date(payload.joinDate) > new Date()) {
    formMessage.textContent = "Join date cannot be in the future.";
    return;
  }

  if (payload.parentContactNo && payload.parentContactNo.length !== 10) {
    formMessage.textContent = "Mobile number should be 10 digits.";
    return;
  }

  const wasEditing = Boolean(editingKidId);
  const currentKid = wasEditing ? kids.find((kid) => kid.id === editingKidId) : null;
  let error = null;
  let savedWithoutProfileFields = false;
  const databasePayload = toDatabasePayload({
    ...payload,
    renewals: currentKid ? currentKid.renewals : [],
    addedBy: currentKid ? currentKid.addedBy : getActiveManagerEmail(),
    updatedBy: getActiveManagerEmail(),
    discontinued: currentKid ? currentKid.discontinued : false,
    alternateContactNo: currentKid ? currentKid.alternateContactNo : "",
  });

  if (wasEditing) {
    ({ error } = await supabaseClient
      .from("students")
      .update(databasePayload)
      .eq("id", editingKidId));
  } else {
    ({ error } = await supabaseClient.from("students").insert(databasePayload));
  }

  if (error && isMissingStudentProfileColumnError(error)) {
    savedWithoutProfileFields = true;
    const fallbackPayload = toDatabasePayload(
      {
        ...payload,
        renewals: currentKid ? currentKid.renewals : [],
        addedBy: currentKid ? currentKid.addedBy : getActiveManagerEmail(),
        updatedBy: getActiveManagerEmail(),
        discontinued: currentKid ? currentKid.discontinued : false,
      },
      { includeProfileFields: false }
    );

    if (wasEditing) {
      ({ error } = await supabaseClient.from("students").update(fallbackPayload).eq("id", editingKidId));
    } else {
      ({ error } = await supabaseClient.from("students").insert(fallbackPayload));
    }
  }

  if (error) {
    formMessage.textContent = error.message;
    return;
  }

  resetFormState();
  formMessage.textContent = wasEditing
    ? savedWithoutProfileFields
      ? "Player updated, but parent/school fields need the latest Supabase SQL migration."
      : "Gen Alpha player record updated successfully."
    : savedWithoutProfileFields
      ? "Player saved, but parent/school fields need the latest Supabase SQL migration."
      : "Gen Alpha player record saved successfully.";
  if (wasEditing && currentKid && currentKid.feesPaid !== "yes" && payload.feesPaid === "yes") {
    latestAdmissionReceipt = buildReceiptFromKid(currentKid, {
      amountPaid: payload.amountPaid,
      jerseySize: payload.jerseySize,
      jerseyPairs: payload.jerseyPairs,
    });
    formMessage.textContent = `${currentKid.name} marked paid. Receipt is ready for WhatsApp.`;
    renderReceipt(latestAdmissionReceipt);
  }
  await loadKids();
});

kidsTableBody.addEventListener("click", async (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const target = event.target.closest("[data-action]");

  if (!(target instanceof HTMLButtonElement)) return;

  const { id, action } = target.dataset;

  if (action === "details") {
    const kid = kids.find((item) => item.id === id);
    await renderPlayerDetails(kid);
    return;
  }

  if (action === "send-reminder") {
    const kid = kids.find((item) => item.id === id);
    target.disabled = true;
    const originalText = target.textContent;
    target.textContent = "Logging...";
    const result = await sendReminderDryRun(kid);
    target.disabled = false;
    target.textContent = originalText;
    showToast(result.message);
    return;
  }

  if (!isBackendReady || !isManagerLoggedIn || !isEditMode) {
    return;
  }

  if (action === "edit") {
    const kidToEdit = kids.find((kid) => kid.id === id);

    if (!kidToEdit) {
      return;
    }

    editingKidId = kidToEdit.id;
    document.getElementById("name").value = kidToEdit.name;
    document.getElementById("age").value = String(kidToEdit.age);
    document.getElementById("fatherGuardianName").value = kidToEdit.fatherGuardianName || "";
    document.getElementById("parentContactNo").value = kidToEdit.parentContactNo || "";
    document.getElementById("schoolCollege").value = kidToEdit.schoolCollege || "";
    document.getElementById("grade").value = kidToEdit.grade || "";
    document.getElementById("address").value = kidToEdit.address || "";
    document.getElementById("timeSlot").value = kidToEdit.timeSlot;
    joinDateInput.value = kidToEdit.joinDate;
    feesPaidSelect.value = kidToEdit.feesPaid;
    amountPaidInput.value = String(kidToEdit.amountPaid);
    jerseySizeSelect.value = kidToEdit.jerseySize || "";
    jerseyPairsInput.value = String(kidToEdit.jerseyPairs || 0);
    saveButton.textContent = "Save changes";
    cancelEditButton.hidden = false;
    syncAmountState();
    formMessage.textContent = `Editing ${kidToEdit.name}. Save changes when ready.`;
    window.scrollTo({ top: kidForm.offsetTop - 40, behavior: "smooth" });
    return;
  }

  if (action === "delete") {
    const kidToDelete = kids.find((kid) => kid.id === id);
    const { error } = await supabaseClient.from("students").delete().eq("id", id);

    if (error) {
      formMessage.textContent = error.message;
      return;
    }

    if (editingKidId === id) {
      resetFormState();
      formMessage.textContent = "Editing record was deleted.";
    }

    await loadKids();
    if (kidToDelete) {
      showToast(`Player ${kidToDelete.name} deleted`);
    }
    return;
  }

  if (action === "renew-open") {
    const kidToRenew = kids.find((kid) => kid.id === id);

    if (!kidToRenew) {
      return;
    }

    if (!isRenewalPending(kidToRenew)) {
      formMessage.textContent = "This student is not due for renewal yet.";
      return;
    }

    openRenewalPopup(kidToRenew);
    return;
  }

  if (action === "toggle-status") {
    const kidToUpdate = kids.find((kid) => kid.id === id);

    if (!kidToUpdate) {
      return;
    }

    const { error } = await supabaseClient
      .from("students")
      .update({
        discontinued: !kidToUpdate.discontinued,
        updated_by: getActiveManagerEmail(),
      })
      .eq("id", id);

    if (error) {
      formMessage.textContent = error.message;
      return;
    }

    formMessage.textContent = kidToUpdate.discontinued
      ? `${kidToUpdate.name} marked as active again.`
      : `${kidToUpdate.name} marked as discontinued.`;
    await loadKids();
  }
});

cancelEditButton.addEventListener("click", () => {
  resetFormState();
  formMessage.textContent = "Edit cancelled.";
});

authToggleButton.addEventListener("click", () => {
  isAuthPanelOpen = !isAuthPanelOpen;
  updateAuthPanel();
});

authCloseButton.addEventListener("click", () => {
  isAuthPanelOpen = false;
  updateAuthPanel();
});

editModeButton.addEventListener("click", () => {
  if (!isManagerLoggedIn || !isBackendReady) {
    return;
  }

  isEditMode = !isEditMode;

  if (!isEditMode) {
    resetFormState();
  }

  updateAccessUI();
  renderKids();
});

feesPaidSelect.addEventListener("change", syncAmountState);
admissionFeesPaid.addEventListener("change", syncAdmissionAmountState);
admissionReadyToStart.addEventListener("change", syncAdmissionStyleState);
admissionBirthDay.addEventListener("change", updateAdmissionAge);
admissionBirthMonth.addEventListener("change", updateAdmissionAge);
admissionBirthYear.addEventListener("change", updateAdmissionAge);
admissionFeePlan?.addEventListener("change", syncAdmissionAmountState);
admissionCustomAmount?.addEventListener("input", syncAdmissionAmountState);
admissionApplicantName.addEventListener("input", updatePaymentAssist);
renewalPlan?.addEventListener("change", () => {
  const plan = RENEWAL_PLANS[renewalPlan.value] || RENEWAL_PLANS.monthly;
  renewalAmount.value = renewalPlan.value === "custom" ? "" : String(plan.amount);
});
closeRenewalButton?.addEventListener("click", closeRenewalPopup);
renewalPopup?.addEventListener("click", (event) => {
  if (event.target === renewalPopup) closeRenewalPopup();
});
renewalForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const kid = kids.find((item) => item.id === renewalStudentId.value);
  if (!kid) return;
  const plan = RENEWAL_PLANS[renewalPlan.value] || RENEWAL_PLANS.monthly;
  const amount = getRenewalAmountForPlan();
  if (amount <= 0) {
    renewalMessage.textContent = "Enter a valid renewal amount.";
    return;
  }
  const cycleDate = getDueCycleDate(kid);
  const renewals = [...kid.renewals, cycleDate];
  const { data: paymentRow, error: paymentError } = await supabaseClient.from("student_payments").insert({
    student_id: kid.id,
    payment_type: "renewal",
    plan_type: renewalPlan.value,
    cycle_start_date: cycleDate,
    months_covered: plan.months,
    amount,
    paid_on: toLocalIsoDate(),
    comment: renewalComment.value.trim(),
    recorded_by: getActiveManagerEmail(),
  }).select("*").single();
  if (paymentError) {
    renewalMessage.textContent = paymentError.message;
    return;
  }
  const { error: updateError } = await supabaseClient
    .from("students")
    .update({ renewals, updated_by: getActiveManagerEmail() })
    .eq("id", kid.id);
  if (updateError) {
    renewalMessage.textContent = `Payment saved, but player renewal status failed: ${updateError.message}`;
    return;
  }
  if (paymentRow) {
    financePayments = [paymentRow, ...financePayments.filter((payment) => payment.id !== paymentRow.id)];
  }
  closeRenewalPopup();
  formMessage.textContent = `${kid.name} renewal payment saved for ${formatDate(cycleDate)}.`;
  latestAdmissionReceipt = buildRenewalReceiptFromKid(kid, {
    plan: renewalPlan.value,
    planTitle: plan.title,
    monthsCovered: plan.months,
    amount,
    cycleDate,
  });
  renderReceipt(latestAdmissionReceipt);
  await loadKids();
  await loadFinance();
});
openPaymentPopupButton.addEventListener("click", openPaymentPopup);
closePaymentPopupButton.addEventListener("click", closePaymentPopup);
paymentPopup.addEventListener("click", (event) => {
  if (event.target === paymentPopup) {
    closePaymentPopup();
  }
});
paymentGooglePayButton.addEventListener("click", () => launchPaymentApp("Google Pay"));
paymentPhonePeButton.addEventListener("click", () => launchPaymentApp("PhonePe"));
paymentUpiButton.addEventListener("click", () => launchPaymentApp("UPI"));
copyPaymentUpiButton.addEventListener("click", () =>
  copyPaymentText(academyPaymentConfig.upiId, "Academy UPI ID copied")
);
copyPaymentMobileButton.addEventListener("click", () =>
  copyPaymentText(academyPaymentConfig.mobileNumber, "Academy mobile number copied")
);
closePlayerDetailButton?.addEventListener("click", () => {
  playerDetailPopup.hidden = true;
  document.body.classList.remove("popup-open");
});
playerDetailContent?.addEventListener("click", async (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-profile-reminder-id]");
  if (!(target instanceof HTMLButtonElement)) return;
  const kid = kids.find((item) => item.id === target.dataset.profileReminderId);
  target.disabled = true;
  const originalText = target.textContent;
  target.textContent = "Logging...";
  const result = await sendReminderDryRun(kid);
  showToast(result.message);
  target.disabled = false;
  target.textContent = originalText;
  if (kid && result.success) await renderPlayerDetails(kid);
});
closeReceiptButton?.addEventListener("click", closeReceiptPopup);
receiptPopup?.addEventListener("click", (event) => {
  if (event.target === receiptPopup) closeReceiptPopup();
});
copyReceiptButton?.addEventListener("click", async () => {
  if (!latestAdmissionReceipt) return;
  await navigator.clipboard?.writeText(buildReceiptText(latestAdmissionReceipt));
  showToast("Receipt copied.");
});
shareReceiptButton?.addEventListener("click", () => {
  openReceiptWhatsApp(latestAdmissionReceipt);
});
printReceiptButton?.addEventListener("click", printReceipt);
playerDetailPopup?.addEventListener("click", (event) => {
  if (event.target === playerDetailPopup) {
    playerDetailPopup.hidden = true;
    document.body.classList.remove("popup-open");
  }
});
window.addEventListener("focus", refreshPaymentReturnHint);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && paymentPopup && !paymentPopup.hidden) {
    closePaymentPopup();
  }
  if (event.key === "Escape" && playerDetailPopup && !playerDetailPopup.hidden) {
    playerDetailPopup.hidden = true;
    document.body.classList.remove("popup-open");
  }
  if (event.key === "Escape" && renewalPopup && !renewalPopup.hidden) {
    closeRenewalPopup();
  }
  if (event.key === "Escape" && receiptPopup && !receiptPopup.hidden) {
    closeReceiptPopup();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshPaymentReturnHint();
  }
});
rosterTabButton.addEventListener("click", () => {
  activeView = "roster";
  updateActiveView();
  renderKids();
});
playerSearchInput?.addEventListener("input", (event) => {
  rosterSearchQuery = event.target.value || "";
  renderKids();
});
recordsHelper?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest("[data-clear-movement-filter]")) return;
  rosterMovementFilter = null;
  renderKids();
});
studentMovementChart?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-movement-filter]");
  if (!(target instanceof HTMLButtonElement)) return;
  if (!target.dataset.movementMonth || !target.dataset.movementFilter) return;
  applyRosterMovementFilter(target.dataset.movementMonth, target.dataset.movementFilter);
});
alertSummary?.addEventListener("click", async (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-alert-player-id]");
  if (!(target instanceof HTMLButtonElement)) return;
  const kid = kids.find((item) => item.id === target.dataset.alertPlayerId);
  scrollToPlayerInRoster(kid?.id);
});

criticalAlertSummary?.addEventListener("click", async (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-alert-player-id]");
  if (!(target instanceof HTMLButtonElement)) return;
  const kid = kids.find((item) => item.id === target.dataset.alertPlayerId);
  scrollToPlayerInRoster(kid?.id);
});

rosterStatusFilterInput?.addEventListener("change", (event) => {
  rosterStatusFilter = event.target.value || "all";
  renderKids();
});
rosterJerseyFilterInput?.addEventListener("change", (event) => {
  rosterJerseyFilter = event.target.value || "all";
  renderKids();
});
rosterTypeFilterInput?.addEventListener("change", (event) => {
  rosterTypeFilter = event.target.value || "all";
  renderKids();
});
rosterFeePaidFilterInput?.addEventListener("change", (event) => {
  rosterFeePaidFilter = event.target.value || "all";
  renderKids();
});
rosterFeeDueFilterInput?.addEventListener("change", (event) => {
  rosterFeeDueFilter = event.target.value || "all";
  renderKids();
});
kidsTable?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("[data-roster-sort]");
  if (!button) return;
  const nextSort = button.dataset.rosterSort || "name";
  if (rosterSortKey === nextSort) {
    rosterSortOrder = rosterSortOrder === "asc" ? "desc" : "asc";
  } else {
    rosterSortKey = nextSort;
    rosterSortOrder = ["name", "timeSlot", "status", "studentType", "updatedBy"].includes(nextSort) ? "asc" : "desc";
  }
  renderKids();
});
financeTabButton?.addEventListener("click", () => {
  activeView = "finance";
  updateActiveView();
  loadFinance();
});
exportCsvButton?.addEventListener("click", exportMonthlyCsv);
exportPdfButton?.addEventListener("click", printMonthlyReport);
admissionTabButton.addEventListener("click", () => {
  activeView = "admission";
  updateActiveView();
  renderKids();
});
slotFilters.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const target = event.target.closest("[data-slot-filter]");

  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const nextFilter = target.dataset.slotFilter || "";
  rosterMovementFilter = null;
  activeSlotFilter =
    nextFilter === "all" || nextFilter === activeSlotFilter ? "" : nextFilter;
  renderKids();
});

attendanceSearchInput?.addEventListener("input", (event) => {
  attendanceSearchQuery = event.target.value || "";
  renderAttendance(todayAttendanceIds);
});

attendanceSlotFilters?.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest("[data-attendance-slot-filter]");
  if (!(target instanceof HTMLButtonElement)) return;
  const nextFilter = target.dataset.attendanceSlotFilter || "";
  attendanceSlotFilter =
    nextFilter === "all" || nextFilter === attendanceSlotFilter ? "" : nextFilter;
  renderAttendance(todayAttendanceIds);
});

admissionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isBackendReady) {
    admissionMessage.textContent = "Supabase setup is required before admission forms can be submitted.";
    return;
  }

  const formData = new FormData(admissionForm);
  const dateOfBirth = buildDobIso();
  const age = calculateAge(dateOfBirth);
  const parentContact = String(formData.get("parentContact") || "").replace(/\D/g, "");
  const alternateContact = String(formData.get("alternateContact") || "").replace(/\D/g, "");

  if (!dateOfBirth || age === null) {
    admissionMessage.textContent = "Please complete the date of birth properly.";
    return;
  }

  if (parentContact.length !== 10 || alternateContact.length !== 10) {
    admissionMessage.textContent = "Parent and alternate contact numbers must be exactly 10 digits.";
    return;
  }

  submitAdmissionButton.disabled = true;
  admissionMessage.textContent = "Submitting admission form...";

  const baseAdmissionPayload = {
    p_applicant_name: String(formData.get("applicantName") || "").trim(),
    p_nationality: String(formData.get("nationality") || "").trim(),
    p_date_of_birth: dateOfBirth,
    p_age: age,
    p_gender: String(formData.get("gender") || "").trim(),
    p_father_guardian_name: String(formData.get("guardianName") || "").trim(),
    p_alternate_contact_no: alternateContact,
    p_parent_contact_no: parentContact,
    p_city: String(formData.get("city") || "").trim(),
    p_address: String(formData.get("address") || "").trim(),
    p_school_college: String(formData.get("schoolCollege") || "").trim(),
    p_parent_aadhaar_no: String(formData.get("aadhaar") || "").trim(),
    p_time_slot: String(formData.get("timeSlot") || "").trim(),
    p_join_date: String(formData.get("joinDate") || "").trim(),
    p_fees_paid: String(formData.get("feesPaid") || "no") === "yes",
    p_amount_paid:
      String(formData.get("feesPaid") || "no") === "yes"
        ? getAdmissionAmount()
        : 0,
    p_jersey_size: String(formData.get("jerseySize") || "").trim(),
    p_jersey_pairs: Number(formData.get("jerseyPairs") || 0),
    p_payment_method: String(formData.get("paymentMethod") || "UPI").trim(),
    p_payment_upi_id:
      String(formData.get("paymentUpiId") || academyPaymentConfig.upiId || "").trim(),
    p_payment_reference: String(formData.get("paymentReference") || "").trim(),
    p_filled_by: String(formData.get("filledBy") || "Parent / Guardian").trim(),
    p_comments: String(formData.get("comments") || "").trim(),
    p_batsman_style: String(formData.get("batsmanStyle") || "").trim(),
    p_bowling_styles: formData.getAll("bowlingStyles").map((value) => String(value)),
    p_ready_to_start: formData.get("readyToStart") === "on",
    p_consent_accepted: formData.get("consentAccepted") === "on",
    p_terms_accepted: formData.get("termsAccepted") === "on",
  };

  let { data, error } = await supabaseClient.rpc("submit_admission_form", baseAdmissionPayload);

  // Backward compatibility: some DBs still expose an older RPC signature.
  if (error && /Could not find the function public\.submit_admission_form/i.test(error.message || "")) {
    const noFilledByPayload = { ...baseAdmissionPayload };
    delete noFilledByPayload.p_filled_by;
    ({ data, error } = await supabaseClient.rpc("submit_admission_form", noFilledByPayload));
  }

  if (error && /Could not find the function public\.submit_admission_form/i.test(error.message || "")) {
    const legacyPayload = { ...baseAdmissionPayload };
    delete legacyPayload.p_filled_by;
    delete legacyPayload.p_payment_method;
    delete legacyPayload.p_payment_upi_id;
    delete legacyPayload.p_payment_reference;
    ({ data, error } = await supabaseClient.rpc("submit_admission_form", legacyPayload));
  }

  // Final fallback: direct insert into admissions table when RPC signature/cache is inconsistent.
  if (error && /Could not find the function public\.submit_admission_form/i.test(error.message || "")) {
    const { data: insertedRow, error: insertError } = await supabaseClient
      .from("admissions")
      .insert({
        applicant_name: baseAdmissionPayload.p_applicant_name,
        nationality: baseAdmissionPayload.p_nationality,
        date_of_birth: baseAdmissionPayload.p_date_of_birth,
        age: baseAdmissionPayload.p_age,
        gender: baseAdmissionPayload.p_gender,
        father_guardian_name: baseAdmissionPayload.p_father_guardian_name,
        emergency_contact_no: baseAdmissionPayload.p_alternate_contact_no,
        parent_contact_no: baseAdmissionPayload.p_parent_contact_no,
        city: baseAdmissionPayload.p_city,
        address: baseAdmissionPayload.p_address,
        school_college: baseAdmissionPayload.p_school_college,
        parent_aadhaar_no: baseAdmissionPayload.p_parent_aadhaar_no,
        time_slot: baseAdmissionPayload.p_time_slot,
        join_date: baseAdmissionPayload.p_join_date,
        fees_paid: baseAdmissionPayload.p_fees_paid,
        amount_paid: baseAdmissionPayload.p_amount_paid,
        jersey_size: baseAdmissionPayload.p_jersey_size,
        jersey_pairs: baseAdmissionPayload.p_jersey_pairs,
        payment_method: baseAdmissionPayload.p_payment_method || "UPI",
        payment_upi_id: baseAdmissionPayload.p_payment_upi_id || "",
        payment_reference: baseAdmissionPayload.p_payment_reference || "",
        filled_by: baseAdmissionPayload.p_filled_by || "Parent / Guardian",
        comments: baseAdmissionPayload.p_comments || "",
        batsman_style: baseAdmissionPayload.p_batsman_style || "",
        bowling_styles: baseAdmissionPayload.p_bowling_styles || [],
        ready_to_start: baseAdmissionPayload.p_ready_to_start,
        consent_accepted: baseAdmissionPayload.p_consent_accepted,
        terms_accepted: baseAdmissionPayload.p_terms_accepted,
        review_status: "pending",
      })
      .select("id, reg_no")
      .single();

    data = insertedRow;
    error = insertError;
  }

  submitAdmissionButton.disabled = false;

  if (error) {
    admissionMessage.textContent = error.message;
    return;
  }

  const row = Array.isArray(data) ? data[0] : data;
  const regNo = row?.reg_no ?? admissionRegNo.textContent;
  admissionMessage.textContent = `Admission submitted for manager review. Reg No ${regNo}.`;
  sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
  closePaymentPopup();
  showToast(`Admission submitted for ${String(formData.get("applicantName") || "").trim()}`);
  if (baseAdmissionPayload.p_fees_paid) {
    latestAdmissionReceipt = {
      receiptType: "joining",
      regNo,
      receiptNo: `GACA-${regNo || "NEW"}-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`,
      playerName: baseAdmissionPayload.p_applicant_name,
      guardianName: baseAdmissionPayload.p_father_guardian_name,
      parentContact: baseAdmissionPayload.p_parent_contact_no,
      joinDate: baseAdmissionPayload.p_join_date,
      paidOn: toLocalIsoDate(),
      timeSlot: baseAdmissionPayload.p_time_slot,
      feesPaid: true,
      amountPaid: baseAdmissionPayload.p_amount_paid,
      paymentReference: baseAdmissionPayload.p_payment_reference,
      jerseySize: baseAdmissionPayload.p_jersey_size,
      jerseyPairs: baseAdmissionPayload.p_jersey_pairs,
    };
    renderReceipt(latestAdmissionReceipt);
  } else {
    latestAdmissionReceipt = null;
  }
  await resetAdmissionForm();
  if (isManagerLoggedIn) {
    await loadPendingAdmissions();
  }
});

// Reset is handled in the payment verify section below to also unlock fees field.

const initializeApp = async () => {
  populateAdmissionSelectors();
  setJoinDateLimit();
  admissionJoinDate.value = toLocalIsoDate();
  if (financeExportMonth) financeExportMonth.value = currentMonthKey();
  admissionPaymentIntentId = buildPaymentIntentId();
  updateActiveView();
  updateAccessUI();
  renderKids();
  syncAdmissionAmountState();
  syncAdmissionStyleState();
  updatePaymentAssist();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./sw.js", { updateViaCache: "none" })
        .then((registration) => {
          const activateWaitingWorker = (worker) => {
            if (!worker) {
              return;
            }

            worker.postMessage({ type: "SKIP_WAITING" });
          };

          if (registration.waiting) {
            activateWaitingWorker(registration.waiting);
          }

          registration.addEventListener("updatefound", () => {
            const nextWorker = registration.installing;

            if (!nextWorker) {
              return;
            }

            nextWorker.addEventListener("statechange", () => {
              if (nextWorker.state === "installed" && navigator.serviceWorker.controller) {
                activateWaitingWorker(registration.waiting || nextWorker);
              }
            });
          });

          navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (hasTriggeredServiceWorkerRefresh) {
              return;
            }

            hasTriggeredServiceWorkerRefresh = true;
            window.location.reload();
          });

          registration.update().catch(() => {});
        })
        .catch(() => {});
    });
  }

  if (!isBackendReady) {
    await loadAdmissionRegNo();
    return;
  }

  initializeAuthListener();
  // Fetch next reg no before session/roster — those calls can be slow or stall; reg no must not wait on them.
  await loadAdmissionRegNo();
  await refreshSession();
  if (isManagerLoggedIn) {
    await loadReminderSettings();
  }
  await loadKids();
  if (isManagerLoggedIn) {
    await loadFinance();
  }
  initRealtimeSync();
};

initializeApp();

// ── Attendance Tracker ───────────────────────────────────────────────────────

const getTodayIso = () => toLocalIsoDate();

const loadAttendance = async (date = attendanceDateValue) => {
  if (!isBackendReady || !isManagerLoggedIn) {
    renderAttendance(new Set());
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from("attendance")
      .select("student_id")
      .eq("attendance_date", date);

    if (error) {
      renderAttendance(new Set());
      return;
    }

    const ids = new Set((data || []).map((r) => r.student_id));
    todayAttendanceIds = ids;
    renderAttendance(ids);
  } catch (_) {
    renderAttendance(new Set());
  }
};

const renderAttendance = (attendedIds) => {
  const managerReady = isBackendReady && isManagerLoggedIn;

  if (attendanceEditorLock) {
    attendanceEditorLock.hidden = managerReady;
  }

  if (!managerReady) {
    if (attendanceSummaryBar) attendanceSummaryBar.hidden = true;
    if (attendanceFilterBar) attendanceFilterBar.hidden = true;
    if (attendanceEmptyState) attendanceEmptyState.hidden = true;
    if (attendanceGridContainer) attendanceGridContainer.hidden = true;
    return;
  }

  const activePlayers = kids.filter((k) => !k.discontinued);
  renderAttendanceFilters(activePlayers);
  const visiblePlayers = getFilteredAttendancePlayers(activePlayers);

  if (attendanceTotalCount) attendanceTotalCount.textContent = String(visiblePlayers.length);
  if (attendancePresentCount)
    attendancePresentCount.textContent = String(
      visiblePlayers.filter((k) => attendedIds.has(k.id)).length
    );

  if (activePlayers.length === 0) {
    if (attendanceSummaryBar) attendanceSummaryBar.hidden = true;
    if (attendanceFilterBar) attendanceFilterBar.hidden = true;
    if (attendanceEmptyState) attendanceEmptyState.hidden = false;
    if (attendanceGridContainer) attendanceGridContainer.hidden = true;
    return;
  }

  if (attendanceSummaryBar) attendanceSummaryBar.hidden = false;
  if (attendanceFilterBar) attendanceFilterBar.hidden = false;
  if (attendanceEmptyState) {
    attendanceEmptyState.hidden = visiblePlayers.length > 0;
    attendanceEmptyState.textContent = visiblePlayers.length > 0
      ? "No active players found to mark attendance."
      : "No players match the current attendance filters.";
  }
  if (attendanceGridContainer) attendanceGridContainer.hidden = visiblePlayers.length === 0;

  const isToday = attendanceDateValue === getTodayIso();
  const canMark = managerReady && isToday;

  attendanceTableBody.innerHTML = visiblePlayers
    .map((kid) => {
      const isPresent = attendedIds.has(kid.id);
      const rowClass = isPresent ? "active-row" : "";
      return `
        <tr class="${rowClass}">
          <td data-label="Player"><strong>${kid.name}</strong></td>
          <td data-label="Age">${kid.age}</td>
          <td data-label="Time slot"><span class="slot-pill">${kid.timeSlot || "Not set"}</span></td>
          <td data-label="Status" class="attendance-toggle-cell">
            <label class="attendance-toggle">
              <span class="toggle-switch">
                <input
                  type="checkbox"
                  ${isPresent ? "checked" : ""}
                  ${!canMark ? "disabled" : ""}
                  data-attendance-id="${kid.id}"
                  aria-label="Mark ${kid.name} ${isPresent ? "absent" : "present"}"
                />
                <span class="toggle-track"></span>
              </span>
              <span class="toggle-label ${isPresent ? "present" : ""}">${isPresent ? "Present" : "Absent"}</span>
            </label>
          </td>
        </tr>
      `;
    })
    .join("");
};

// Attendance toggle handler
attendanceTableBody?.addEventListener("change", async (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !input.dataset.attendanceId) return;
  if (!isBackendReady || !isManagerLoggedIn) return;

  const studentId = input.dataset.attendanceId;
  const isNowPresent = input.checked;
  const rpcName = isNowPresent ? "mark_player_attendance" : "unmark_player_attendance";

  // Optimistic UI update
  const labelEl = input.closest(".attendance-toggle")?.querySelector(".toggle-label");
  if (labelEl) {
    labelEl.textContent = isNowPresent ? "Present" : "Absent";
    labelEl.classList.toggle("present", isNowPresent);
  }

  if (isNowPresent) {
    todayAttendanceIds.add(studentId);
  } else {
    todayAttendanceIds.delete(studentId);
  }

  // Update summary counts
  const activePlayers = getFilteredAttendancePlayers(kids.filter((k) => !k.discontinued));
  if (attendancePresentCount)
    attendancePresentCount.textContent = String(
      activePlayers.filter((k) => todayAttendanceIds.has(k.id)).length
    );

  try {
    const { error } = await supabaseClient.rpc(rpcName, {
      p_student_id: studentId,
      p_attendance_date: attendanceDateValue,
    });

    if (error) {
      showToast(`⚠ Failed to update attendance: ${error.message}`);
      // Revert optimistic update
      input.checked = !isNowPresent;
      if (labelEl) {
        labelEl.textContent = !isNowPresent ? "Present" : "Absent";
        labelEl.classList.toggle("present", !isNowPresent);
      }
      if (isNowPresent) {
        todayAttendanceIds.delete(studentId);
      } else {
        todayAttendanceIds.add(studentId);
      }
    }
  } catch (err) {
    showToast("⚠ Attendance update failed.");
    input.checked = !isNowPresent;
  }
});

// Attendance date change
attendanceDate?.addEventListener("change", () => {
  attendanceDateValue = attendanceDate.value || getTodayIso();
  loadAttendance(attendanceDateValue);
});

// Third tab — Attendance
attendanceTabButton?.addEventListener("click", () => {
  activeView = "attendance";
  updateActiveView();
  attendanceDate.value = attendanceDateValue;
  loadAttendance(attendanceDateValue);
});

expenseForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(expenseForm);
  const expenseDateValue = String(formData.get("expenseDate") || "").trim();
  const payload = {
    expense_type: String(formData.get("expenseType") || ""),
    amount: Number(formData.get("expenseAmount") || 0),
    comment: String(formData.get("expenseComment") || "").trim(),
    paid_by: String(formData.get("expensePaidBy") || ""),
    created_by: getActiveManagerEmail(),
  };
  if (expenseDateValue) {
    payload.expense_date = expenseDateValue;
  }
  const { error } = await supabaseClient.from("academy_expenses").insert(payload);
  if (error) {
    expenseMessage.textContent = error.message;
    return;
  }
  expenseForm.reset();
  // Reset expense date to today after successful save
  const expenseDateInput = document.getElementById("expenseDate");
  if (expenseDateInput) expenseDateInput.value = toLocalIsoDate();
  expenseMessage.textContent = "Expense added.";
  await loadFinance();
  closeExpensePopup();
});

financeExpensesTableBody?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-expense-delete]");
  if (!button) return;

  const expenseId = button.dataset.expenseDelete;
  if (!expenseId || !isManagerLoggedIn) return;

  button.disabled = true;
  button.textContent = "Deleting...";
  const { error } = await supabaseClient.from("academy_expenses").delete().eq("id", expenseId);

  if (error) {
    expenseMessage.textContent = error.message;
    button.disabled = false;
    button.textContent = "Delete";
    return;
  }

  financeExpenses = financeExpenses.filter((expense) => expense.id !== expenseId);
  expenseMessage.textContent = "Expense deleted.";
  loadFinance();
});

// ── Realtime Sync ────────────────────────────────────────────────────────────

const showRealtimeToast = (message) => {
  if (!globalToast) return;
  if (toastTimeoutId) window.clearTimeout(toastTimeoutId);
  globalToast.textContent = message;
  globalToast.className = "global-toast realtime-toast";
  globalToast.hidden = false;
  toastTimeoutId = window.setTimeout(() => {
    globalToast.hidden = true;
    globalToast.className = "global-toast";
  }, 2800);
};

const stopRealtimeSync = () => {
  [realtimeStudentsChannel, realtimeAttendanceChannel, realtimeFinanceChannel, realtimeAdmissionsChannel].forEach((channel) => {
    if (channel) supabaseClient.removeChannel(channel);
  });
  realtimeStudentsChannel = null;
  realtimeAttendanceChannel = null;
  realtimeFinanceChannel = null;
  realtimeAdmissionsChannel = null;
};

const restartRealtimeSync = () => {
  if (!isBackendReady) return;
  stopRealtimeSync();
  initRealtimeSync();
};

const initRealtimeSync = () => {
  if (!isBackendReady) return;
  if (realtimeStudentsChannel || realtimeAttendanceChannel || realtimeFinanceChannel || realtimeAdmissionsChannel) return;

  // Students table — fast sync for roster edits/adds/deletes
  realtimeStudentsChannel = supabaseClient
    .channel("public:students")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "students" },
      async (payload) => {
        const event = payload.eventType;
        if (event === "INSERT") {
          const newKid = normalizeKid(payload.new);
          kids.unshift(newKid);
          showRealtimeToast(`New player added: ${newKid.name}`);
        } else if (event === "UPDATE") {
          const updated = normalizeKid(payload.new);
          kids = kids.map((k) => (k.id === updated.id ? updated : k));
          showRealtimeToast(`Player updated: ${updated.name}`);
        } else if (event === "DELETE") {
          const deletedId = payload.old?.id;
          if (deletedId) {
            kids = kids.filter((k) => k.id !== deletedId);
          }
        }
        renderKids();
        if (activeView === "attendance") renderAttendance(todayAttendanceIds);
      }
    )
    .subscribe();

  // Attendance table — instant reflect when mobile app marks/unmarks
  realtimeAttendanceChannel = supabaseClient
    .channel("public:attendance")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "attendance" },
      async (payload) => {
        const event = payload.eventType;
        if (event === "INSERT") {
          const sid = payload.new?.student_id;
          const adate = payload.new?.attendance_date;
          if (sid && adate === attendanceDateValue) {
            todayAttendanceIds.add(sid);
            const playerName = kids.find((k) => k.id === sid)?.name;
            if (playerName) showRealtimeToast(`✓ ${playerName} marked present`);
            if (activeView === "attendance") renderAttendance(todayAttendanceIds);
          }
        } else if (event === "UPDATE") {
          const sid = payload.new?.student_id;
          const adate = payload.new?.attendance_date;
          if (sid && adate === attendanceDateValue) {
            todayAttendanceIds.add(sid);
            if (activeView === "attendance") renderAttendance(todayAttendanceIds);
          }
        } else if (event === "DELETE") {
          const sid = payload.old?.student_id;
          const adate = payload.old?.attendance_date;
          if (sid && adate === attendanceDateValue) {
            todayAttendanceIds.delete(sid);
            const playerName = kids.find((k) => k.id === sid)?.name;
            if (playerName) showRealtimeToast(`${playerName} marked absent`);
            if (activeView === "attendance") renderAttendance(todayAttendanceIds);
          }
        }
      }
    )
    .subscribe();

  // Finance tables — keeps browser and Android app finance screens in sync without manual refresh.
  realtimeFinanceChannel = supabaseClient
    .channel("public:finance")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "academy_expenses" },
      () => {
        queueFinanceRefresh();
        if (activeView === "finance") showRealtimeToast("Finance expenses updated");
      }
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "student_payments" },
      () => {
        queueFinanceRefresh();
        if (activeView === "finance") showRealtimeToast("Fee payment timeline updated");
      }
    )
    .subscribe();

  realtimeAdmissionsChannel = supabaseClient
    .channel("public:admissions")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "admissions" },
      async () => {
        if (isManagerLoggedIn) {
          await loadPendingAdmissions();
        }
      }
    )
    .subscribe();
  updatePaymentAssist();
};

window.setInterval(() => {
  if (!isBackendReady) return;
  if (document.visibilityState !== "visible") return;
  loadKids();
}, 30000);

window.setInterval(() => {
  if (!isBackendReady) return;
  if (document.visibilityState !== "visible") return;
  if (!isManagerLoggedIn) return;
  loadAttendance(attendanceDateValue);
}, 30000);

const showVerificationFlow = () => {
  if (paymentVerifyFlow) paymentVerifyFlow.hidden = false;
  if (paymentHelpCopy) paymentHelpCopy.hidden = true;
  if (paymentReturnHint) paymentReturnHint.hidden = true;
  const trigger = document.getElementById("alreadyPaidTrigger");
  if (trigger) trigger.hidden = true;
};

// ── Payment Verification Flow ────────────────────────────────────────────────

// When user returns to the page after launching a UPI app, show the verify flow
const maybeShowPaymentVerify = () => {
  const rawValue = sessionStorage.getItem(PAYMENT_RETURN_STORAGE_KEY);
  if (!rawValue) return;

  try {
    const pending = JSON.parse(rawValue);
    const isFresh =
      typeof pending?.timestamp === "number" &&
      Date.now() - pending.timestamp < 1000 * 60 * 20;

    if (!isFresh) {
      sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
      return;
    }

    // Show UTR verify panel inside the popup
    if (paymentVerifyFlow) paymentVerifyFlow.hidden = false;
    if (paymentHelpCopy) paymentHelpCopy.hidden = true;
    if (paymentReturnHint) paymentReturnHint.hidden = true;

    // Reopen popup so user can confirm
    if (paymentPopup && paymentPopup.hidden) {
      paymentPopup.hidden = false;
      document.body.classList.add("popup-open");
    }
  } catch (_) {
    sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
  }
};

// UTR confirm submission — lock fees to "yes" and close
paymentVerifyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const utr = paymentUtrInput?.value?.trim();
  if (!utr || utr.length < 4) {
    showToast("Please enter a valid Transaction/UTR reference.");
    return;
  }

  // Mark fees as paid and lock the field
  if (admissionFeesPaid) {
    admissionFeesPaid.value = "yes";
    admissionFeesPaid.disabled = true;
  }
  // Populate hidden parity fields
  const methodInput = document.getElementById("admissionPaymentMethod");
  const refInput = document.getElementById("admissionPaymentReference");
  if (methodInput) methodInput.value = sessionStorage.getItem(PAYMENT_RETURN_STORAGE_KEY) ? JSON.parse(sessionStorage.getItem(PAYMENT_RETURN_STORAGE_KEY)).provider : "UPI";
  if (refInput) refInput.value = utr;

  isFeesVerified = true;
  sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);

  // Close popup and show confirmation
  closePaymentPopup();
  showToast(`✓ Payment confirmed (Ref: ${utr}). Fees marked as paid.`);

  // Reset verify UI for next time
  if (paymentVerifyForm) paymentVerifyForm.reset();
  if (paymentVerifyFlow) paymentVerifyFlow.hidden = true;
  if (paymentHelpCopy) paymentHelpCopy.hidden = false;
  if (paymentReturnHint) paymentReturnHint.hidden = true;

  // Focus the submit button
  submitAdmissionButton?.focus();
});

// Override the visibilitychange and window focus handlers to trigger verify flow
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    refreshPaymentReturnHint();
    maybeShowPaymentVerify();
  }
});

window.removeEventListener("focus", refreshPaymentReturnHint);
window.addEventListener("focus", () => {
  refreshPaymentReturnHint();
  maybeShowPaymentVerify();
});

// Reset fees lock when the form is reset
const _origReset = admissionForm?.addEventListener;
resetAdmissionButton?.addEventListener("click", async () => {
  if (admissionFeesPaid) admissionFeesPaid.disabled = false;
  isFeesVerified = false;
  if (paymentVerifyFlow) paymentVerifyFlow.hidden = true;
  if (paymentHelpCopy) paymentHelpCopy.hidden = false;
  await resetAdmissionForm();
});

// Init attendance date input default
if (attendanceDate) {
  attendanceDate.max = getTodayIso();
  attendanceDate.value = attendanceDateValue;
}
