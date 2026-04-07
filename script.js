const STORAGE_KEY = "cricket-academy-kids";

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

const loadKids = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
};

let kids = loadKids();

const saveKids = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kids));
};

const setJoinDateLimit = () => {
  const today = new Date().toISOString().split("T")[0];
  joinDateInput.max = today;
};

const syncAmountState = () => {
  const isPaid = feesPaidSelect.value === "yes";
  amountPaidInput.disabled = !isPaid;

  if (!isPaid) {
    amountPaidInput.value = "0";
  }
};

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getDaysSinceJoin = (joinDate) => {
  const joined = new Date(`${joinDate}T00:00:00`);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((now - joined) / msPerDay);
};

const renderSummary = (alertKids) => {
  const totalAlerts = alertKids.length;

  alertCount.textContent =
    totalAlerts === 1 ? "1 kid needs attention" : `${totalAlerts} kids need attention`;

  if (totalAlerts === 0) {
    alertSummary.textContent = "No records have crossed the 30-day follow-up mark.";
    return;
  }

  const names = alertKids.map((kid) => kid.name).join(", ");
  alertSummary.textContent = `Follow up with: ${names}`;
};

const renderKids = () => {
  kidsTableBody.innerHTML = "";

  if (kids.length === 0) {
    emptyState.hidden = false;
    kidsTable.hidden = true;
    renderSummary([]);
    return;
  }

  emptyState.hidden = true;
  kidsTable.hidden = false;

  const alertKids = [];

  kids.forEach((kid) => {
    const daysSinceJoin = getDaysSinceJoin(kid.joinDate);
    const isAlert = daysSinceJoin > 30;

    if (isAlert) {
      alertKids.push(kid);
    }

    const row = document.createElement("tr");
    row.className = isAlert ? "alert-row" : "";

    row.innerHTML = `
      <td>${kid.name}</td>
      <td>${kid.age}</td>
      <td>${formatDate(kid.joinDate)}</td>
      <td>
        <span class="status-pill ${kid.feesPaid === "yes" ? "status-paid" : "status-unpaid"}">
          ${kid.feesPaid === "yes" ? "Paid" : "Not paid"}
        </span>
      </td>
      <td>Rs ${Number(kid.amountPaid).toFixed(2)}</td>
      <td>
        <span class="alert-pill ${isAlert ? "" : "safe"}">
          ${isAlert ? `${daysSinceJoin} days since joining` : "Within 30 days"}
        </span>
      </td>
      <td>
        <button class="danger-btn" data-id="${kid.id}" type="button">Delete</button>
      </td>
    `;

    kidsTableBody.appendChild(row);
  });

  renderSummary(alertKids);
};

kidForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(kidForm);
  const name = formData.get("name").toString().trim();
  const age = Number(formData.get("age"));
  const joinDate = formData.get("joinDate").toString();
  const feesPaid = formData.get("feesPaid").toString();
  const amountPaid = Number(formData.get("amountPaid"));

  if (!name || !joinDate) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }

  if (new Date(joinDate) > new Date()) {
    formMessage.textContent = "Join date cannot be in the future.";
    return;
  }

  kids.unshift({
    id: crypto.randomUUID(),
    name,
    age,
    joinDate,
    feesPaid,
    amountPaid,
  });

  saveKids();
  kidForm.reset();
  syncAmountState();
  formMessage.textContent = "Kid record saved successfully.";
  renderKids();
});

kidsTableBody.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const { id } = target.dataset;

  kids = kids.filter((kid) => kid.id !== id);
  saveKids();
  renderKids();
});

feesPaidSelect.addEventListener("change", syncAmountState);

setJoinDateLimit();
syncAmountState();
renderKids();
