const SUPABASE_CONFIG = window.GEN_ALPHA_SUPABASE_CONFIG ?? {};
const PAYMENT_CONFIG = window.GEN_ALPHA_PAYMENT_CONFIG ?? {};

const kidForm = document.getElementById("kidForm");
const kidsTable = document.getElementById("kidsTable");
const kidsTableBody = document.getElementById("kidsTableBody");
const emptyState = document.getElementById("emptyState");
const alertCount = document.getElementById("alertCount");
const alertSummary = document.getElementById("alertSummary");
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
const admissionJoinDate = document.getElementById("admissionJoinDate");
const admissionFeesPaid = document.getElementById("admissionFeesPaid");
const admissionAmountPaid = document.getElementById("admissionAmountPaid");
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

// Attendance
const attendanceTabButton = document.getElementById("attendanceTabButton");
const attendanceView = document.getElementById("attendanceView");
const attendanceDate = document.getElementById("attendanceDate");
const attendanceEditorLock = document.getElementById("attendanceEditorLock");
const attendanceSummaryBar = document.getElementById("attendanceSummaryBar");
const attendancePresentCount = document.getElementById("attendancePresentCount");
const attendanceTotalCount = document.getElementById("attendanceTotalCount");
const attendanceEmptyState = document.getElementById("attendanceEmptyState");
const attendanceGridContainer = document.getElementById("attendanceGridContainer");
const attendanceTableBody = document.getElementById("attendanceTableBody");

// Payment verify
const paymentVerifyFlow = document.getElementById("paymentVerifyFlow");
const paymentVerifyForm = document.getElementById("paymentVerifyForm");
const paymentUtrInput = document.getElementById("paymentUtrInput");
const paymentHelpCopy = document.getElementById("paymentHelpCopy");

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

let kids = [];
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
let attendanceDateValue = new Date().toISOString().split("T")[0];
let isFeesVerified = false;
let realtimeStudentsChannel = null;
let realtimeAttendanceChannel = null;

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
    paymentMethod: kid.payment_method || "",
    paymentUpiId: kid.payment_upi_id || "",
    paymentReference: kid.payment_reference || "",
    comments: kid.comments || "",
  };
};

const toDatabasePayload = ({
  name,
  age,
  timeSlot,
  joinDate,
  feesPaid,
  amountPaid,
  jerseySize,
  jerseyPairs,
  addedBy,
  updatedBy,
  discontinued,
  paymentMethod,
  paymentUpiId,
  paymentReference,
  comments,
}) => ({
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
  payment_method: paymentMethod || "",
  payment_upi_id: paymentUpiId || "",
  payment_reference: paymentReference || "",
  comments: comments || "",
});

const setJoinDateLimit = () => {
  joinDateInput.max = new Date().toISOString().split("T")[0];
  admissionJoinDate.max = new Date().toISOString().split("T")[0];
};

const formatDate = (value) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not renewed";

const getReferenceDate = (kid) =>
  kid.renewals.length > 0 ? kid.renewals[kid.renewals.length - 1] : kid.joinDate;

const getDaysSinceDate = (dateValue) => {
  const targetDate = new Date(`${dateValue}T00:00:00`);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((new Date() - targetDate) / msPerDay);
};

const getStudentType = (kid) => (kid.renewals.length > 0 ? "Returning" : "New");
const isActiveKid = (kid) => !kid.discontinued;
const isFeesPending = (kid) => isActiveKid(kid) && kid.feesPaid !== "yes";
const isRenewalPending = (kid) =>
  isActiveKid(kid) && getDaysSinceDate(getReferenceDate(kid)) >= 30;
const getFilteredKids = () =>
  !activeSlotFilter
    ? kids
    : activeSlotFilter === "not-set"
      ? kids.filter((kid) => isActiveKid(kid) && !kid.timeSlot)
      : kids.filter((kid) => isActiveKid(kid) && kid.timeSlot === activeSlotFilter);

const updateStats = () => {
  const activeKids = kids.filter(isActiveKid);
  joinedCount.textContent = String(kids.length);
  activeCount.textContent = String(activeKids.length);
  paidCount.textContent = String(activeKids.filter((kid) => kid.feesPaid === "yes").length);
  returningCount.textContent = String(activeKids.filter((kid) => kid.renewals.length > 0).length);
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
  admissionAmountPaid.disabled = false;
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
  const value = Number(admissionAmountPaid.value || 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
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
  } else if (getAdmissionAmount() <= 0) {
    admissionMessage.textContent = "Payment popup opened. Amount is optional here, but adding it helps parents pay faster.";
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

  paymentMerchantUpiId.textContent = hasConfig ? academyPaymentConfig.upiId : "Not configured";
  paymentMerchantMobile.textContent = academyPaymentConfig.mobileNumber || "Not available";
  paymentMerchantName.textContent = academyPaymentConfig.payeeName;
  paymentAmountValue.textContent = amount > 0 ? `Rs ${amount.toFixed(2)}` : "Enter in app";
  paymentDeviceBadge.textContent = isMobileBrowser ? "Mobile payment" : "Desktop QR";
  paymentEntryTitle.textContent = isMobileBrowser ? "Pay from your UPI app" : "Open QR payment popup";
  paymentAssistCopy.textContent = isMobileBrowser
    ? "Open the payment popup to launch Google Pay, PhonePe, or another UPI app on this phone."
    : "Open the payment popup to show a QR code and pay from your phone.";
  paymentPopupCopy.textContent = isMobileBrowser
    ? "Launch your UPI app, complete payment, then return here and finish the admission."
    : "Scan the QR from your phone and finish the admission form here after payment.";
  paymentQrCaption.textContent = isMobileBrowser
    ? amount > 0
      ? "If app launch is blocked by the browser, scan the QR from another device or use the academy UPI ID."
      : "Amount is optional. Parents can enter it inside their UPI app after opening payment."
    : amount > 0
      ? "Scan this QR from Google Pay, PhonePe, or any UPI app on your phone."
      : "QR is ready. If amount is blank, parents can enter it inside their UPI app.";
  paymentConfigNotice.hidden = hasConfig;
  paymentAppGrid.hidden = !isMobileBrowser;

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
  admissionJoinDate.value = new Date().toISOString().split("T")[0];
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
    return;
  }

  mastheadBottom.hidden = false;
  heroLabel.textContent = "30-Day Alerts";
  const totalAlerts = alertKids.length;

  alertCount.textContent =
    totalAlerts === 1 ? "1 kid needs attention" : `${totalAlerts} kids need attention`;

  if (!isBackendReady) {
    alertSummary.textContent = "Connect Supabase to load academy records.";
    return;
  }

  if (totalAlerts === 0) {
    alertSummary.textContent = "All current join fees and renewals are up to date.";
    return;
  }

  alertSummary.textContent = `Need fees or renewal action for: ${alertKids
    .map((kid) => kid.name)
    .join(", ")}`;
};

const updateActiveView = () => {
  const isRoster = activeView === "roster";
  const isAttendance = activeView === "attendance";
  const isAdmission = !isRoster && !isAttendance;
  rosterView.hidden = !isRoster;
  admissionView.hidden = !isAdmission;
  if (attendanceView) attendanceView.hidden = !isAttendance;
  rosterTabButton.classList.toggle("active", isRoster);
  rosterTabButton.setAttribute("aria-selected", String(isRoster));
  admissionTabButton.classList.toggle("active", isAdmission);
  admissionTabButton.setAttribute("aria-selected", String(isAdmission));
  if (attendanceTabButton) {
    attendanceTabButton.classList.toggle("active", isAttendance);
    attendanceTabButton.setAttribute("aria-selected", String(isAttendance));
  }
};

const updateAccessUI = () => {
  const managerReady = isBackendReady && isManagerLoggedIn;
  const canEdit = managerReady && isEditMode;
  const formControls = kidForm.querySelectorAll("input, select, button");
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
  recordsHelper.textContent = canEdit
    ? "Edit mode is on. Use the table below to update, renew, or discontinue players."
    : managerReady
      ? "Roster view is open. Click Edit when you want to add players or change records."
      : "Manager roster access is available only after login.";
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
};

const renderKids = () => {
  kidsTableBody.innerHTML = "";
  updateStats();
  renderSlotFilters();

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
      !activeSlotFilter
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
    const referenceDate = getReferenceDate(kid);
    const daysSinceCycle = getDaysSinceDate(referenceDate);
    const renewalPending = isRenewalPending(kid);
    const feesPending = isFeesPending(kid);
    const needsAttention = feesPending || renewalPending;
    const canRenew = renewalPending && isActiveKid(kid);
    const studentType = getStudentType(kid);
    const latestRenewal = kid.renewals.length > 0 ? kid.renewals[kid.renewals.length - 1] : "";
    const renewalStatus = kid.discontinued
      ? "Tracking paused"
      : renewalPending
        ? `${daysSinceCycle} days passed, renewal pending`
        : kid.renewals.length > 0
          ? `${30 - daysSinceCycle} days left`
          : `${30 - daysSinceCycle} days left`;

    const row = document.createElement("tr");
    row.className = needsAttention ? "alert-row" : "";
    row.innerHTML = `
      <td><strong>${kid.name}</strong></td>
      <td>${kid.age}</td>
      <td><span class="slot-pill">${kid.timeSlot || "Not set"}</span></td>
      <td><span class="meta-text">${formatJerseyDetails(kid)}</span></td>
      <td>
        <span class="state-pill ${kid.discontinued ? "discontinued" : "active"}">
          ${kid.discontinued ? "Discontinued" : "Active"}
        </span>
      </td>
      <td>
        <span class="type-pill ${studentType === "Returning" ? "returning" : "new"}">
          ${studentType}
        </span>
      </td>
      <td>${formatDate(kid.joinDate)}</td>
      <td>${latestRenewal ? formatDate(latestRenewal) : "<span class=\"sub-copy\">Not renewed</span>"}</td>
      <td>
        <span class="status-pill ${feesPending ? "status-unpaid" : "status-paid"}">
          ${feesPending ? "Not paid" : "Paid"}
        </span>
      </td>
      <td>Rs ${Number(kid.amountPaid).toFixed(2)}</td>
      <td><span class="alert-pill ${renewalPending ? "" : "safe"}">${renewalStatus}</span></td>
      <td><span class="meta-text">Last updated by ${kid.updatedBy}</span></td>
      ${
        canEdit
          ? `<td>
            <div class="action-group">
              <button class="secondary-btn" data-action="edit" data-id="${kid.id}" type="button">Edit</button>
              <button class="secondary-btn" data-action="toggle-status" data-id="${kid.id}" type="button">
                ${kid.discontinued ? "Mark active" : "Discontinue"}
              </button>
              ${
                canRenew
                  ? `<button class="renew-btn" data-action="renew" data-id="${kid.id}" type="button">Mark renewal paid</button>`
                  : `<span class="action-note">${
                      kid.discontinued
                        ? "Renewal paused"
                        : `${30 - daysSinceCycle} day${30 - daysSinceCycle === 1 ? "" : "s"} left`
                    }</span>`
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
  await refreshSession();
  renderKids();
};

logoutButton.addEventListener("click", handleLogout);
quickLogoutButton.addEventListener("click", handleLogout);

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
    paymentMethod: formData.get("paymentMethod")?.toString() || "",
    paymentUpiId: formData.get("paymentUpiId")?.toString() || "",
    paymentReference: formData.get("paymentReference")?.toString() || "",
    comments: formData.get("comments")?.toString() || "",
  };

  if (!payload.name || !payload.joinDate || !payload.timeSlot) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  if (new Date(payload.joinDate) > new Date()) {
    formMessage.textContent = "Join date cannot be in the future.";
    return;
  }

  const wasEditing = Boolean(editingKidId);
  let error = null;

  if (wasEditing) {
    const currentKid = kids.find((kid) => kid.id === editingKidId);

    ({ error } = await supabaseClient
      .from("students")
      .update(
        toDatabasePayload({
          ...payload,
          renewals: currentKid ? currentKid.renewals : [],
          addedBy: currentKid ? currentKid.addedBy : getActiveManagerEmail(),
          updatedBy: getActiveManagerEmail(),
          discontinued: currentKid ? currentKid.discontinued : false,
        })
      )
      .eq("id", editingKidId));
  } else {
    ({ error } = await supabaseClient.from("students").insert(toDatabasePayload(payload)));
  }

  if (error) {
    formMessage.textContent = error.message;
    return;
  }

  resetFormState();
  formMessage.textContent = wasEditing
    ? "Gen Alpha player record updated successfully."
    : "Gen Alpha player record saved successfully.";
  await loadKids();
});

kidsTableBody.addEventListener("click", async (event) => {
  const target = event.target;

  if (!(target instanceof HTMLButtonElement) || !isBackendReady || !isManagerLoggedIn || !isEditMode) {
    return;
  }

  const { id, action } = target.dataset;

  if (action === "edit") {
    const kidToEdit = kids.find((kid) => kid.id === id);

    if (!kidToEdit) {
      return;
    }

    editingKidId = kidToEdit.id;
    document.getElementById("name").value = kidToEdit.name;
    document.getElementById("age").value = String(kidToEdit.age);
    document.getElementById("timeSlot").value = kidToEdit.timeSlot;
    joinDateInput.value = kidToEdit.joinDate;
    feesPaidSelect.value = kidToEdit.feesPaid;
    amountPaidInput.value = String(kidToEdit.amountPaid);
    jerseySizeSelect.value = kidToEdit.jerseySize || "";
    jerseyPairsInput.value = String(kidToEdit.jerseyPairs || 0);
    document.getElementById("paymentMethod").value = kidToEdit.paymentMethod || "";
    document.getElementById("paymentReference").value = kidToEdit.paymentReference || "";
    document.getElementById("comments").value = kidToEdit.comments || "";
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

  if (action === "renew") {
    const kidToRenew = kids.find((kid) => kid.id === id);

    if (!kidToRenew) {
      return;
    }

    if (getDaysSinceDate(getReferenceDate(kidToRenew)) < 30) {
      formMessage.textContent = "This student is not due for renewal yet.";
      return;
    }

    const renewals = [...kidToRenew.renewals, new Date().toISOString().split("T")[0]];
    const { error } = await supabaseClient
      .from("students")
      .update({
        renewals,
        updated_by: getActiveManagerEmail(),
      })
      .eq("id", id);

    if (error) {
      formMessage.textContent = error.message;
      return;
    }

    formMessage.textContent = `${kidToRenew.name} marked as renewed for the next 30-day cycle.`;
    await loadKids();
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
admissionAmountPaid.addEventListener("input", updatePaymentAssist);
admissionApplicantName.addEventListener("input", updatePaymentAssist);
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
window.addEventListener("focus", refreshPaymentReturnHint);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && paymentPopup && !paymentPopup.hidden) {
    closePaymentPopup();
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
  activeSlotFilter =
    nextFilter === "all" || nextFilter === activeSlotFilter ? "" : nextFilter;
  renderKids();
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

  if (!dateOfBirth || age === null) {
    admissionMessage.textContent = "Please complete the date of birth properly.";
    return;
  }

  submitAdmissionButton.disabled = true;
  admissionMessage.textContent = "Submitting admission form...";

  const { data, error } = await supabaseClient.rpc("submit_admission_form", {
    p_applicant_name: String(formData.get("applicantName") || "").trim(),
    p_nationality: String(formData.get("nationality") || "").trim(),
    p_date_of_birth: dateOfBirth,
    p_age: age,
    p_gender: String(formData.get("gender") || "").trim(),
    p_father_guardian_name: String(formData.get("guardianName") || "").trim(),
    p_alternate_contact_no: String(formData.get("alternateContact") || "").trim(),
    p_parent_contact_no: String(formData.get("parentContact") || "").trim(),
    p_city: String(formData.get("city") || "").trim(),
    p_address: String(formData.get("address") || "").trim(),
    p_school_college: String(formData.get("schoolCollege") || "").trim(),
    p_parent_aadhaar_no: String(formData.get("aadhaar") || "").trim(),
    p_time_slot: String(formData.get("timeSlot") || "").trim(),
    p_join_date: String(formData.get("joinDate") || "").trim(),
    p_fees_paid: String(formData.get("feesPaid") || "no") === "yes",
    p_amount_paid: Number(formData.get("amountPaid") || 0),
    p_jersey_size: String(formData.get("jerseySize") || "").trim(),
    p_jersey_pairs: Number(formData.get("jerseyPairs") || 0),
    p_comments: String(formData.get("comments") || "").trim(),
    p_batsman_style: String(formData.get("batsmanStyle") || "").trim(),
    p_bowling_styles: formData.getAll("bowlingStyles").map((value) => String(value)),
    p_ready_to_start: formData.get("readyToStart") === "on",
    p_consent_accepted: formData.get("consentAccepted") === "on",
    p_terms_accepted: formData.get("termsAccepted") === "on",
  });

  submitAdmissionButton.disabled = false;

  if (error) {
    admissionMessage.textContent = error.message;
    return;
  }

  const row = Array.isArray(data) ? data[0] : data;
  admissionMessage.textContent = `Admission submitted successfully. Reg No ${row?.reg_no ?? admissionRegNo.textContent}.`;
  sessionStorage.removeItem(PAYMENT_RETURN_STORAGE_KEY);
  closePaymentPopup();
  showToast(`Admission saved for ${String(formData.get("applicantName") || "").trim()}`);
  await resetAdmissionForm();
  await loadKids();
});

// Reset is handled in the payment verify section below to also unlock fees field.

const initializeApp = async () => {
  populateAdmissionSelectors();
  setJoinDateLimit();
  admissionJoinDate.value = new Date().toISOString().split("T")[0];
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
  await loadKids();
  initRealtimeSync();
};

initializeApp();

// ── Attendance Tracker ───────────────────────────────────────────────────────

const getTodayIso = () => new Date().toISOString().split("T")[0];

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
    if (attendanceEmptyState) attendanceEmptyState.hidden = true;
    if (attendanceGridContainer) attendanceGridContainer.hidden = true;
    return;
  }

  const activePlayers = kids.filter((k) => !k.discontinued);

  if (attendanceTotalCount) attendanceTotalCount.textContent = String(activePlayers.length);
  if (attendancePresentCount)
    attendancePresentCount.textContent = String(
      activePlayers.filter((k) => attendedIds.has(k.id)).length
    );

  if (activePlayers.length === 0) {
    if (attendanceSummaryBar) attendanceSummaryBar.hidden = true;
    if (attendanceEmptyState) attendanceEmptyState.hidden = false;
    if (attendanceGridContainer) attendanceGridContainer.hidden = true;
    return;
  }

  if (attendanceSummaryBar) attendanceSummaryBar.hidden = false;
  if (attendanceEmptyState) attendanceEmptyState.hidden = true;
  if (attendanceGridContainer) attendanceGridContainer.hidden = false;

  const isToday = attendanceDateValue === getTodayIso();
  const canMark = managerReady && isToday;

  attendanceTableBody.innerHTML = activePlayers
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
  const activePlayers = kids.filter((k) => !k.discontinued);
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

const initRealtimeSync = () => {
  if (!isBackendReady) return;

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
  updatePaymentAssist();
};

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
  if (admissionAmountPaid) {
    admissionAmountPaid.disabled = false; // amount stays editable
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
