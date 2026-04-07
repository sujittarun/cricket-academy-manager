const SUPABASE_CONFIG = window.GEN_ALPHA_SUPABASE_CONFIG ?? {};

const kidForm = document.getElementById("kidForm");
const kidsTable = document.getElementById("kidsTable");
const kidsTableBody = document.getElementById("kidsTableBody");
const emptyState = document.getElementById("emptyState");
const alertCount = document.getElementById("alertCount");
const alertSummary = document.getElementById("alertSummary");
const feesPaidSelect = document.getElementById("feesPaid");
const amountPaidInput = document.getElementById("amountPaid");
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
const joinedCount = document.getElementById("joinedCount");
const paidCount = document.getElementById("paidCount");
const returningCount = document.getElementById("returningCount");

const hasSupabaseConfig = Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
const supabaseClient =
  hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
    : null;
const isBackendReady = Boolean(supabaseClient);

let kids = [];
let isManagerLoggedIn = false;
let editingKidId = null;

const normalizeKid = (kid) => {
  const renewals = Array.isArray(kid.renewals) ? kid.renewals.filter(Boolean) : [];

  return {
    id: kid.id,
    name: kid.name || "",
    age: Number(kid.age) || 0,
    joinDate: kid.join_date || "",
    feesPaid: kid.fees_paid ? "yes" : "no",
    amountPaid: Number(kid.amount_paid) || 0,
    renewals,
  };
};

const toDatabasePayload = ({ name, age, joinDate, feesPaid, amountPaid, renewals }) => ({
  name,
  age,
  join_date: joinDate,
  fees_paid: feesPaid === "yes",
  amount_paid: Number(amountPaid),
  renewals,
});

const setJoinDateLimit = () => {
  joinDateInput.max = new Date().toISOString().split("T")[0];
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

const updateStats = () => {
  joinedCount.textContent = String(kids.length);
  paidCount.textContent = String(kids.filter((kid) => kid.feesPaid === "yes").length);
  returningCount.textContent = String(kids.filter((kid) => kid.renewals.length > 0).length);
};

const syncAmountState = () => {
  const isPaid = feesPaidSelect.value === "yes" && isManagerLoggedIn && isBackendReady;
  amountPaidInput.disabled = !isPaid;

  if (!isPaid) {
    amountPaidInput.value = "0";
  }
};

const resetFormState = () => {
  editingKidId = null;
  kidForm.reset();
  saveButton.textContent = "Save kid details";
  cancelEditButton.hidden = true;
  syncAmountState();
};

const renderSummary = (alertKids) => {
  const totalAlerts = alertKids.length;

  alertCount.textContent =
    totalAlerts === 1 ? "1 kid needs attention" : `${totalAlerts} kids need attention`;

  if (!isBackendReady) {
    alertSummary.textContent = "Connect Supabase to load academy records.";
    return;
  }

  if (totalAlerts === 0) {
    alertSummary.textContent = "No active course cycles have crossed the 30-day mark.";
    return;
  }

  alertSummary.textContent = `Renewal follow-up needed for: ${alertKids
    .map((kid) => kid.name)
    .join(", ")}`;
};

const updateAccessUI = () => {
  const canEdit = isBackendReady && isManagerLoggedIn;
  const formControls = kidForm.querySelectorAll("input, select, button");

  if (!hasSupabaseConfig) {
    loginForm.hidden = true;
    managerTools.hidden = true;
    accessMode.textContent = "Setup required";
    loginHint.textContent =
      "Add your Supabase URL and anon key in supabase-config.js, then create a manager user in Supabase Auth.";
    editorLock.hidden = false;
    editorLock.textContent = "Complete Supabase setup before editing academy records.";
  } else if (!isBackendReady) {
    loginForm.hidden = true;
    managerTools.hidden = true;
    accessMode.textContent = "Connection error";
    loginHint.textContent =
      "Supabase config exists, but the browser client did not load. Check the CDN script and redeploy.";
    editorLock.hidden = false;
    editorLock.textContent = "Supabase client failed to load, so editing is unavailable.";
  } else {
    loginForm.hidden = canEdit;
    managerTools.hidden = !canEdit;
    accessMode.textContent = canEdit ? "Manager edit mode" : "View-only mode";
    loginHint.textContent = canEdit
      ? "Manager editing is active on this device."
      : "Sign in with a manager email created in Supabase Auth.";
    editorLock.hidden = canEdit;
    editorLock.textContent = "Login as manager to add or edit academy records.";
  }

  formControls.forEach((control) => {
    control.disabled = !canEdit;
  });

  formMessage.textContent = !hasSupabaseConfig
    ? "Supabase connection is required before edits can be made."
    : !isBackendReady
      ? "Supabase client failed to load."
      : canEdit
      ? "Manager access enabled. You can add and update records."
      : "Login is required before any edits can be made.";

  if (!canEdit) {
    resetFormState();
  }

  syncAmountState();
};

const renderKids = () => {
  kidsTableBody.innerHTML = "";
  updateStats();

  if (kids.length === 0) {
    emptyState.hidden = false;
    kidsTable.hidden = true;
    emptyState.textContent = isBackendReady
      ? "No Gen Alpha players added yet. Use the form above to create the first record."
      : "No data source is connected yet. Finish the Supabase setup to start storing academy records.";
    renderSummary([]);
    return;
  }

  emptyState.hidden = true;
  kidsTable.hidden = false;

  const alertKids = [];

  kids.forEach((kid) => {
    const referenceDate = getReferenceDate(kid);
    const daysSinceCycle = getDaysSinceDate(referenceDate);
    const isAlert = daysSinceCycle > 30;
    const canRenew = daysSinceCycle >= 30;
    const studentType = getStudentType(kid);
    const latestRenewal = kid.renewals.length > 0 ? kid.renewals[kid.renewals.length - 1] : "";

    if (isAlert) {
      alertKids.push(kid);
    }

    const row = document.createElement("tr");
    row.className = isAlert ? "alert-row" : "";

    row.innerHTML = `
      <td>${kid.name}</td>
      <td>${kid.age}</td>
      <td>
        <span class="type-pill ${studentType === "Returning" ? "returning" : "new"}">
          ${studentType}
        </span>
        <p class="sub-copy">${kid.renewals.length} renewal${kid.renewals.length === 1 ? "" : "s"}</p>
      </td>
      <td>${formatDate(kid.joinDate)}</td>
      <td>${formatDate(latestRenewal)}</td>
      <td>
        <span class="status-pill ${kid.feesPaid === "yes" ? "status-paid" : "status-unpaid"}">
          ${kid.feesPaid === "yes" ? "Paid" : "Not paid"}
        </span>
      </td>
      <td>Rs ${Number(kid.amountPaid).toFixed(2)}</td>
      <td>
        <span class="alert-pill ${isAlert ? "" : "safe"}">
          ${isAlert ? `${daysSinceCycle} days since last active date` : "Current cycle active"}
        </span>
        <p class="sub-copy">Tracking from ${formatDate(referenceDate)}</p>
      </td>
      <td>
        ${
          isManagerLoggedIn
            ? `
          <div class="action-group">
            <button class="secondary-btn" data-action="edit" data-id="${kid.id}" type="button">
              Edit
            </button>
            ${
              canRenew
                ? `
              <button class="renew-btn" data-action="renew" data-id="${kid.id}" type="button">
                Renew 30 days
              </button>
            `
                : `<span class="action-note">Renew in ${30 - daysSinceCycle} day${
                    30 - daysSinceCycle === 1 ? "" : "s"
                  }</span>`
            }
            <button class="danger-btn" data-action="delete" data-id="${kid.id}" type="button">
              Delete
            </button>
          </div>
        `
            : '<span class="action-note">Login to edit</span>'
        }
      </td>
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

  isManagerLoggedIn = Boolean(session);
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
      isManagerLoggedIn = Boolean(session);
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

  loginForm.reset();
  loginMessage.textContent = "";
  await refreshSession();
  await loadKids();
});

logoutButton.addEventListener("click", async () => {
  if (!isBackendReady) {
    return;
  }

  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    loginMessage.textContent = error.message;
    return;
  }

  loginMessage.textContent = "";
  await refreshSession();
  renderKids();
});

kidForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!isBackendReady || !isManagerLoggedIn) {
    formMessage.textContent = "Login as manager after connecting Supabase to edit records.";
    return;
  }

  const formData = new FormData(kidForm);
  const payload = {
    name: formData.get("name").toString().trim(),
    age: Number(formData.get("age")),
    joinDate: formData.get("joinDate").toString(),
    feesPaid: formData.get("feesPaid").toString(),
    amountPaid: Number(formData.get("amountPaid")),
    renewals: [],
  };

  if (!payload.name || !payload.joinDate) {
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

  if (!(target instanceof HTMLButtonElement) || !isBackendReady || !isManagerLoggedIn) {
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
    joinDateInput.value = kidToEdit.joinDate;
    feesPaidSelect.value = kidToEdit.feesPaid;
    amountPaidInput.value = String(kidToEdit.amountPaid);
    saveButton.textContent = "Save changes";
    cancelEditButton.hidden = false;
    syncAmountState();
    formMessage.textContent = `Editing ${kidToEdit.name}. Save changes when ready.`;
    window.scrollTo({ top: kidForm.offsetTop - 40, behavior: "smooth" });
    return;
  }

  if (action === "delete") {
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
      .update({ renewals })
      .eq("id", id);

    if (error) {
      formMessage.textContent = error.message;
      return;
    }

    formMessage.textContent = `${kidToRenew.name} renewed for another 30 days.`;
    await loadKids();
  }
});

cancelEditButton.addEventListener("click", () => {
  resetFormState();
  formMessage.textContent = "Edit cancelled.";
});

feesPaidSelect.addEventListener("change", syncAmountState);

const initializeApp = async () => {
  setJoinDateLimit();
  updateAccessUI();
  renderKids();

  if (!isBackendReady) {
    return;
  }

  initializeAuthListener();
  await refreshSession();
  await loadKids();
};

initializeApp();
