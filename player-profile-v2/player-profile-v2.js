(function () {
  const JERSEY_PRICE = 750;
  const MONTHLY_FEE = 3500;
  const PLAN_LABELS = {
    monthly: "Monthly",
    quarterly: "3 months",
    halfyearly: "6 months",
    special: "Special training",
    custom: "Custom",
  };

  const money = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
  const safe = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const dateFromIso = (value) => {
    if (!value) return null;
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const toIsoDate = (date) => {
    if (!date || Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
  };

  const formatDate = (value) => {
    const date = dateFromIso(value);
    if (!date) return value ? String(value) : "-";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const addMonthsIso = (value, months = 1) => {
    const date = dateFromIso(value);
    if (!date) return "";
    const day = date.getDate();
    date.setMonth(date.getMonth() + Number(months || 1));
    if (date.getDate() !== day) date.setDate(0);
    return toIsoDate(date);
  };

  const daysUntil = (value) => {
    const date = dateFromIso(value);
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.ceil((date.getTime() - today.getTime()) / 86400000);
  };

  const initials = (name = "") =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "GA";

  const percent = (value, total) => {
    const numerator = Number(value || 0);
    const denominator = Math.max(Number(total || 0), 1);
    return Math.max(0, Math.min(100, Math.round((numerator / denominator) * 100)));
  };

  const statusTone = (text) => {
    const normalized = String(text || "").toLowerCase();
    if (normalized.includes("fail") || normalized.includes("due") || normalized.includes("not paid")) return "danger";
    if (normalized.includes("pending") || normalized.includes("sent") || normalized.includes("pause")) return "warning";
    if (normalized.includes("paid") || normalized.includes("active") || normalized.includes("deliver")) return "success";
    return "neutral";
  };

  const badge = (label, tone = statusTone(label)) =>
    `<span class="player-v2-badge ${safe(tone)}">${safe(label || "-")}</span>`;

  const actionButton = (action, label, variant = "secondary") =>
    `<button class="player-v2-action ${variant}" type="button" data-player-v2-action="${safe(action)}">${safe(label)}</button>`;

  const runAction = (payload, action) => {
    payload.actions?.run?.(action);
    if (["edit", "renew-open", "joining-payment-open", "toggle-status", "delete"].includes(action)) close();
  };

  const navigateToAppView = (payload, view = "roster") => {
    close();
    if (payload.actions?.navigate) {
      payload.actions.navigate(view);
    } else {
      window.GenAlphaAppNavigation?.switchView?.(view);
    }
  };

  const getPaidThrough = (payload) => {
    const label = payload.labels?.paidThrough || "";
    return /^\d{2}\s/.test(label) ? label : formatDate(payload.pendingPayment?.cycleDate || payload.kid.joinDate);
  };

  const buildAttendanceBars = (dates = []) => {
    const uniqueDates = [...new Set(dates)].sort();
    const weeks = Array.from({ length: 8 }, (_, index) => {
      const end = new Date();
      end.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 7 * (7 - index));
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      return uniqueDates.filter((dateValue) => {
        const date = dateFromIso(dateValue);
        return date && date >= start && date <= end;
      }).length;
    });
    const max = Math.max(...weeks, 1);
    return weeks
      .map((count, index) => `<span title="Week ${index + 1}: ${count} day${count === 1 ? "" : "s"}" style="--bar:${Math.max(8, percent(count, max))}%"></span>`)
      .join("");
  };

  const monthLabel = (year, month) =>
    new Date(year, month, 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });

  const monthKey = (year, month) => `${year}-${String(month + 1).padStart(2, "0")}`;

  const buildAttendanceMonths = () => {
    const month = new Date();
    month.setDate(1);
    return Array.from({ length: 6 }, (_, index) => {
      const current = new Date(month.getFullYear(), month.getMonth() - index, 1);
      return { year: current.getFullYear(), month: current.getMonth() };
    });
  };

  const buildAttendanceCalendar = (dates = []) => {
    const present = new Set(dates.filter(Boolean));
    return buildAttendanceMonths().map(({ year, month }) => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstOffset = new Date(year, month, 1).getDay();
      const totalCells = Math.ceil((firstOffset + daysInMonth) / 7) * 7;
      const key = monthKey(year, month);
      const count = dates.filter((date) => String(date || "").startsWith(key)).length;
      const cells = Array.from({ length: totalCells }, (_, index) => {
        const day = index - firstOffset + 1;
        const validDay = day >= 1 && day <= daysInMonth;
        const iso = validDay ? `${key}-${String(day).padStart(2, "0")}` : "";
        const attended = validDay && present.has(iso);
        return `<span class="${attended ? "present" : ""} ${validDay ? "" : "empty"}">${validDay ? day : ""}</span>`;
      }).join("");
      return `
        <article class="player-v2-month-card">
          <div>
            <strong>${monthLabel(year, month)}</strong>
            <small>${count} day${count === 1 ? "" : "s"}</small>
          </div>
          <div class="player-v2-weekdays"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
          <div class="player-v2-month-grid">${cells}</div>
        </article>
      `;
    }).join("");
  };

  const timelineCategory = (item) => {
    const text = `${item.event_type || ""} ${item.title || ""} ${item.details || ""}`.toLowerCase();
    if (text.includes("whatsapp") || text.includes("reminder") || text.includes("message")) return "whatsapp";
    if (text.includes("payment") || text.includes("fee") || text.includes("renewal") || text.includes("paid") || text.includes("refund")) return "payments";
    if (text.includes("discontinued") || text.includes("active") || text.includes("pause") || text.includes("rejoin") || text.includes("status")) return "status";
    return "profile";
  };

  const timelineTitleForCategory = (category) => ({
    all: "All activity",
    payments: "Payments",
    status: "Status",
    profile: "Profile",
    whatsapp: "WhatsApp",
  }[category] || "Activity");

  const getFeeSplit = (kid) => {
    const plan = PLAN_LABELS[kid.feePlan] || PLAN_LABELS.monthly;
    const jerseyPairs = Math.max(Number(kid.jerseyPairs || 0), 0);
    const jerseyAmount = Number(kid.jerseyAmount || 0) || (kid.jerseySize ? jerseyPairs * JERSEY_PRICE : 0);
    const admissionFee = Number(kid.admissionFee || 0);
    const coachingFee = Number(kid.coachingFee || 0) || (kid.feePlan === "special" ? 10000 : MONTHLY_FEE);
    const total = Number(kid.totalFeeAmount || 0) || coachingFee + admissionFee + jerseyAmount || Number(kid.amountPaid || 0);
    return { plan, coachingFee, admissionFee, jerseyAmount, jerseyPairs, total };
  };

  const buildAdmissionCard = (payload) => {
    const { kid } = payload;
    const split = getFeeSplit(kid);
    const isPaid = kid.feesPaid === "yes" || Number(payload.totalPaid || 0) >= split.admissionFee;
    const amount = split.admissionFee || 0;
    return `
      <section class="player-v2-card">
        <div class="player-v2-card-head">
          <h3>1. Admission Fee (One-Time)</h3>
        </div>
        <div class="player-v2-table-wrap">
          <table class="player-v2-table">
            <thead><tr><th>Amount</th><th>Paid</th><th>Paid Date</th><th>Balance</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td>${money(amount)}</td>
                <td>${money(isPaid ? amount : 0)}</td>
                <td>${isPaid ? formatDate(kid.joinDate) : "-"}</td>
                <td>${money(isPaid ? 0 : amount)}</td>
                <td>${badge(isPaid ? "Paid" : "Due")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `;
  };

  const buildJerseyCard = (payload) => {
    const { kid } = payload;
    const split = getFeeSplit(kid);
    const hasJersey = Boolean(kid.jerseySize && split.jerseyPairs);
    const isPaid = kid.feesPaid === "yes" && split.jerseyAmount > 0;
    return `
      <section class="player-v2-card">
        <div class="player-v2-card-head">
          <h3>2. Jersey Details</h3>
          ${payload.isManagerLoggedIn && payload.isEditMode ? actionButton("edit", "Update jersey") : ""}
        </div>
        <div class="player-v2-table-wrap">
          <table class="player-v2-table">
            <thead><tr><th>Type</th><th>Size</th><th>Qty</th><th>Amount</th><th>Paid</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td>${hasJersey ? "Player kit" : "Jersey not selected"}</td>
                <td>${kid.jerseySize ? `<span class="player-v2-size-chip">${safe(kid.jerseySize)}</span>` : "-"}</td>
                <td>${hasJersey ? split.jerseyPairs : "-"}</td>
                <td>${money(split.jerseyAmount)}</td>
                <td>${money(isPaid ? split.jerseyAmount : 0)}</td>
                <td>${badge(hasJersey ? (isPaid ? "Delivered" : "Needed") : "Not requested", isPaid ? "success" : "warning")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `;
  };

  const paymentStatusForRow = (payment) => {
    const title = `${payment.title || ""} ${payment.plan || ""}`.toLowerCase();
    if (title.includes("jersey")) return "Paid";
    return Number(payment.amount || 0) >= 0 ? "Paid" : "Adjusted";
  };

  const buildPaymentRows = (payload) => {
    const rows = (payload.paymentRows || []).map((payment) => {
      const months = Math.max(Number(payment.months || 0), 0);
      return {
        period: payment.plan || payment.title || "Payment",
        due: Number(payment.amount || 0),
        paid: Number(payment.amount || 0),
        paidDate: payment.date || "",
        balance: 0,
        renewalDate: months > 0 ? addMonthsIso(payment.date, months) : "",
        status: paymentStatusForRow(payment),
        action: "View",
      };
    });

    if (payload.isActive && (payload.isFeesPending || payload.isRenewalPending)) {
      const split = getFeeSplit(payload.kid);
      const dueAmount = Number(payload.pendingPayment?.amount || 0) || (payload.isFeesPending ? split.total : MONTHLY_FEE);
      rows.unshift({
        period: payload.isFeesPending ? "Joining fee due" : "Current renewal",
        due: dueAmount,
        paid: 0,
        paidDate: "",
        balance: dueAmount,
        renewalDate: payload.pendingPayment?.cycleDate || "",
        status: payload.labels?.feeStatus || "Due",
        action: payload.isFeesPending ? "Collect joining" : "Collect renewal",
      });
    }

    return rows;
  };

  const buildAcademyFeeCard = (payload) => {
    const rows = buildPaymentRows(payload);
    const split = getFeeSplit(payload.kid);
    const totalDue = rows.reduce((sum, row) => sum + Math.max(Number(row.balance || 0), 0), 0);
    const totalPaid = Number(payload.totalPaid || 0);
    const balance = Math.max(totalDue, 0);
    return `
      <section class="player-v2-card player-v2-wide-card">
        <div class="player-v2-card-head">
          <h3>3. Academy Fee (${safe(split.plan)})</h3>
        </div>
        <div class="player-v2-pause-strip">
          <span>Training</span><strong>${safe(payload.labels?.trainingDuration || "-")}</strong>
          <span>Paid through</span><strong>${safe(getPaidThrough(payload))}</strong>
          <span>Fee status</span>${badge(payload.labels?.feeStatus || "-")}
        </div>
        <div class="player-v2-table-wrap">
          <table class="player-v2-table player-v2-billing-table">
            <thead>
              <tr><th>Billing Period</th><th>Due Amount</th><th>Paid Amount</th><th>Paid Date</th><th>Balance</th><th>Renewal Date</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              ${
                rows.length
                  ? rows.map((row) => {
                      const action = row.action.includes("joining")
                        ? "joining-payment-open"
                        : row.action.includes("renewal")
                          ? "renew-open"
                          : "";
                      return `
                        <tr>
                          <td>${safe(row.period)}</td>
                          <td>${money(row.due)}</td>
                          <td>${money(row.paid)}</td>
                          <td>${row.paidDate ? formatDate(row.paidDate) : "-"}</td>
                          <td>${money(row.balance)}</td>
                          <td>${row.renewalDate ? formatDate(row.renewalDate) : "-"}</td>
                          <td>${badge(row.status)}</td>
                          <td>${action && payload.isManagerLoggedIn ? `<button class="player-v2-link-action" type="button" data-player-v2-action="${action}">${safe(row.action)}</button>` : "-"}</td>
                        </tr>
                      `;
                    }).join("")
                  : `<tr><td colspan="8" class="player-v2-empty-cell">No payment records yet.</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="player-v2-billing-actions">
          ${
            payload.isManagerLoggedIn && payload.isEditMode
              ? [
                  payload.isFeesPending ? actionButton("joining-payment-open", "Collect Payment", "primary") : "",
                  !payload.isFeesPending && payload.isRenewalPending ? actionButton("renew-open", "Collect Payment", "primary") : "",
                  payload.isActive && (payload.isFeesPending || payload.isRenewalPending) ? actionButton("send-reminder", "Send Reminder") : "",
                ].filter(Boolean).join("")
              : ""
          }
        </div>
        <div class="player-v2-totals">
          <div><span>Total Due</span><strong>${money(balance)}</strong></div>
          <div><span>Total Paid</span><strong>${money(totalPaid)}</strong></div>
          <div><span>Joining Total</span><strong>${money(split.total)}</strong></div>
        </div>
      </section>
    `;
  };

  const compactTimeline = (timeline = []) =>
    timeline.slice(0, 8).map((item) => {
      const text = `${item.title || item.event_type || ""} ${item.details || ""}`;
      const category = timelineCategory(item);
      return `
        <li data-player-v2-timeline-category="${safe(category)}">
          <span class="player-v2-timeline-dot ${safe(statusTone(text))}"></span>
          <div>
            <strong>${safe(item.title || item.event_type || "Timeline event")}</strong>
            <small>${formatDate(item.event_date)}${item.changed_by ? ` - ${safe(item.changed_by)}` : ""}</small>
            ${item.details ? `<p>${safe(item.details)}</p>` : ""}
          </div>
        </li>
      `;
    }).join("");

  const buildTimelineFilters = (active = "all") => `
    <div class="player-v2-timeline-filters" aria-label="Timeline filters">
      ${["all", "payments", "status", "profile", "whatsapp"].map((category) =>
        `<button type="button" class="${category === active ? "active" : ""}" data-player-v2-timeline-filter="${safe(category)}">${safe(timelineTitleForCategory(category))}</button>`
      ).join("")}
    </div>
  `;

  const buildOverviewPanel = (payload) => {
    const { kid } = payload;
    const split = getFeeSplit(kid);
    return `
      <section class="player-v2-tab-panel" data-player-v2-panel="overview">
        <div class="player-v2-overview-grid">
          <article class="player-v2-card">
            <div class="player-v2-card-head"><h3>Player Information</h3></div>
            <dl class="player-v2-facts">
              <div><dt>Guardian</dt><dd>${safe(kid.fatherGuardianName || "Not saved")}</dd></div>
              <div><dt>Phone</dt><dd>${kid.parentContactNo ? `<a href="tel:${safe(kid.parentContactNo)}">${safe(kid.parentContactNo)}</a>` : "Not saved"}</dd></div>
              <div><dt>School</dt><dd>${safe([kid.schoolCollege, kid.grade ? `Grade ${kid.grade}` : ""].filter(Boolean).join(" - ") || "Not saved")}</dd></div>
              <div><dt>Address</dt><dd>${safe(kid.address || "Not saved")}</dd></div>
            </dl>
          </article>
          <article class="player-v2-card">
            <div class="player-v2-card-head"><h3>Joining Breakdown</h3></div>
            <dl class="player-v2-facts">
              <div><dt>Coaching fee</dt><dd>${money(split.coachingFee)}</dd></div>
              <div><dt>Admission fee</dt><dd>${money(split.admissionFee)}</dd></div>
              <div><dt>Jersey amount</dt><dd>${money(split.jerseyAmount)}</dd></div>
              <div><dt>Total</dt><dd>${money(split.total)}</dd></div>
            </dl>
          </article>
        </div>
      </section>
    `;
  };

  const buildAttendancePanel = (payload) => `
    <section class="player-v2-tab-panel" data-player-v2-panel="attendance">
      <article class="player-v2-card player-v2-attendance-card">
        <div class="player-v2-card-head">
          <h3>Attendance</h3>
          <strong>${Number(payload.attendanceSummary?.total || 0)} days</strong>
        </div>
        <div class="player-v2-totals">
          <div><span>Last 30 days</span><strong>${Number(payload.attendanceSummary?.last30 || 0)}</strong></div>
          <div><span>This month</span><strong>${Number(payload.attendanceSummary?.currentMonth || 0)}</strong></div>
          <div><span>Last attended</span><strong>${payload.attendanceSummary?.lastAttended ? formatDate(payload.attendanceSummary.lastAttended) : "-"}</strong></div>
        </div>
        <div class="player-v2-attendance-calendar">
          ${buildAttendanceCalendar(payload.attendanceSummary?.recent || [])}
        </div>
        <div class="player-v2-attendance-bars">${buildAttendanceBars(payload.attendanceSummary?.recent || [])}</div>
        <div class="player-v2-totals compact">
          <div><span>Calendar range</span><strong>6 months</strong></div>
          <div><span>Tracked days</span><strong>${Number(payload.attendanceSummary?.total || 0)}</strong></div>
          <div><span>Today</span><strong>${payload.attendanceSummary?.recent?.includes(new Date().toISOString().slice(0, 10)) ? "Present" : "Not marked"}</strong></div>
        </div>
      </article>
    </section>
  `;

  const buildTimelinePanel = (payload, panel, title) => `
    <section class="player-v2-tab-panel" data-player-v2-panel="${safe(panel)}" data-player-v2-timeline-active="${panel === "communication" ? "whatsapp" : "all"}">
      <article class="player-v2-card">
        <div class="player-v2-card-head"><h3>${safe(title)}</h3></div>
        ${buildTimelineFilters(panel === "communication" ? "whatsapp" : "all")}
        ${
          payload.timeline?.length
            ? `<ol class="player-v2-timeline">${compactTimeline(payload.timeline)}</ol>`
            : `<p class="player-v2-empty">No timeline records yet.</p>`
        }
      </article>
    </section>
  `;

  const buildBillingPanel = (payload, { panel = "billing", active = false } = {}) => `
    <section class="player-v2-tab-panel ${active ? "active" : ""}" data-player-v2-panel="${safe(panel)}">
      <div class="player-v2-billing-grid">
        ${buildAdmissionCard(payload)}
        ${buildJerseyCard(payload)}
        ${buildAcademyFeeCard(payload)}
      </div>
    </section>
  `;

  const buildRail = (payload) => {
    const { kid } = payload;
    const pauseStatus = kid.discontinued ? "Paused" : "Active";
    const dueDate = payload.pendingPayment?.cycleDate || "";
    const dueDays = daysUntil(dueDate);
    return `
      <aside class="player-v2-rail">
        <section class="player-v2-card player-v2-rail-card">
          <div class="player-v2-card-head">
            <h3>Pause / Break Management</h3>
          </div>
          <dl class="player-v2-facts compact">
            <div><dt>Status</dt><dd>${badge(pauseStatus)}</dd></div>
            <div><dt>Paused from</dt><dd>${kid.discontinuedAt ? formatDate(kid.discontinuedAt) : "-"}</dd></div>
            <div><dt>Paused till</dt><dd>-</dd></div>
            <div><dt>Rejoined on</dt><dd>${kid.rejoinedAt ? formatDate(kid.rejoinedAt) : "-"}</dd></div>
          </dl>
          ${
            payload.isManagerLoggedIn && payload.isEditMode
              ? actionButton("toggle-status", kid.discontinued ? "Rejoin Student" : "Pause Student", kid.discontinued ? "primary" : "secondary")
              : ""
          }
        </section>
        <section class="player-v2-note-card">
          <h3>About Pause</h3>
          <ul>
            <li>No academy fee is charged during a paused period.</li>
            <li>Billing should resume from the rejoin date.</li>
            <li>Next due dates should be checked after rejoining.</li>
          </ul>
        </section>
        <section class="player-v2-card player-v2-rail-card">
          <div class="player-v2-card-head"><h3>Pause History</h3></div>
          <div class="player-v2-mini-row">
            <span>${kid.discontinuedAt ? formatDate(kid.discontinuedAt) : "No pause history yet"}</span>
            <strong>${kid.discontinued ? "Paused" : "-"}</strong>
          </div>
        </section>
        <section class="player-v2-reminder-card">
          <h3>Quick Reminder</h3>
          <p>${dueDays === null ? "Send payment reminder to guardian." : dueDays < 0 ? `Overdue by ${Math.abs(dueDays)} days.` : `Due in ${dueDays} days.`}</p>
          ${payload.isManagerLoggedIn && payload.isActive ? actionButton("send-reminder", "Send Reminder", "primary") : ""}
        </section>
      </aside>
    `;
  };

  const renderActions = (payload) => {
    if (!payload.isManagerLoggedIn || !payload.isEditMode) return "";
    return `
      <div class="player-v2-actions">
        ${actionButton("edit", "Edit Student")}
        ${payload.isActive && payload.isFeesPending ? actionButton("joining-payment-open", "Record Joining Fee", "primary") : ""}
        ${payload.isActive && !payload.isFeesPending && payload.isRenewalPending ? actionButton("renew-open", "Renew", "primary") : ""}
        ${actionButton("delete", "Delete", "danger")}
      </div>
    `;
  };

  const applyTimelineFilter = (panel, category) => {
    if (!panel) return;
    const activeCategory = category || panel.dataset.playerV2TimelineActive || "all";
    panel.dataset.playerV2TimelineActive = activeCategory;
    panel.querySelectorAll("[data-player-v2-timeline-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.playerV2TimelineFilter === activeCategory);
    });
    panel.querySelectorAll("[data-player-v2-timeline-category]").forEach((item) => {
      item.hidden = activeCategory !== "all" && item.dataset.playerV2TimelineCategory !== activeCategory;
    });
  };

  const close = () => {
    const shell = document.querySelector(".player-v2-shell");
    if (!shell) return;
    shell.remove();
    document.body.classList.remove("player-v2-open");
  };

  const open = (payload) => {
    if (!payload?.kid) return false;
    close();

    const { kid } = payload;
    const split = getFeeSplit(kid);
    const nextDue = payload.pendingPayment?.cycleDate || "";
    const dueDays = daysUntil(nextDue);
    const status = kid.discontinued ? "Paused" : payload.labels?.renewalStatus || "Active";
    const shell = document.createElement("section");
    shell.className = "player-v2-shell";
    shell.setAttribute("role", "dialog");
    shell.setAttribute("aria-modal", "true");
    shell.setAttribute("aria-label", `${kid.name} player profile`);
    shell.innerHTML = `
      <aside class="player-v2-sidebar">
        <div class="player-v2-brand">
          <span>GA</span>
          <div><strong>GEN ALPHA</strong><small>Cricket Academy</small></div>
        </div>
        <nav class="player-v2-nav" aria-label="Player profile navigation">
          <button type="button" data-player-v2-view="roster">Dashboard</button>
          <button class="active" type="button" data-player-v2-view="roster">Students</button>
          <button type="button" data-player-v2-view="attendance">Attendance</button>
          <span>Batch Management</span>
          <span>Communication</span>
          <button type="button" data-player-v2-view="finance">Fees</button>
          <button type="button" data-player-v2-view="finance">Finance</button>
          <span>Reports</span>
          <span>Settings</span>
        </nav>
        <button class="player-v2-back" type="button" data-player-v2-close>Back to roster</button>
      </aside>

      <main class="player-v2-main">
        <div class="player-v2-topbar">
          <div class="player-v2-breadcrumb">
            <span>Students</span><span>${safe(kid.name || "Student")}</span><strong>Billing</strong>
          </div>
          <div class="player-v2-top-actions">
            <label class="player-v2-search">
              <span>Search</span>
              <input type="search" placeholder="Search students..." aria-label="Search students" />
            </label>
            ${renderActions(payload)}
          </div>
        </div>

        <header class="player-v2-summary">
          <div class="player-v2-photo" aria-hidden="true">${safe(initials(kid.name))}</div>
          <div class="player-v2-identity">
            <div class="player-v2-name-line">
              <h2>${safe(kid.name || "Unnamed player")}</h2>
              ${badge(status)}
            </div>
            <p><strong>Student ID:</strong> ${safe(kid.id || "-")} <strong>Phone:</strong> ${safe(kid.parentContactNo || "-")}</p>
            <p><strong>Guardian:</strong> ${safe(kid.fatherGuardianName || "Not saved")}</p>
          </div>
          <div class="player-v2-metrics">
            <div><span>Membership Dates</span><strong>Joined ${formatDate(kid.joinDate)}${kid.rejoinedAt ? ` • Rejoined ${formatDate(kid.rejoinedAt)}` : ""}</strong></div>
            <div><span>Plan</span><strong>${safe(split.plan)}</strong></div>
            <div><span>Renewal Date</span><strong>${safe(getPaidThrough(payload))}</strong></div>
            <div><span>Next Due</span><strong class="${dueDays !== null && dueDays <= 0 ? "danger-text" : ""}">${nextDue ? formatDate(nextDue) : "-"}</strong>${dueDays !== null ? `<small>${dueDays < 0 ? `${Math.abs(dueDays)} days overdue` : `${dueDays} days`}</small>` : ""}</div>
            <div><span>Status</span><strong>${safe(status)}</strong></div>
          </div>
        </header>

        <div class="player-v2-tabs" role="tablist" aria-label="Player profile sections">
          ${["Overview", "Billing", "Attendance", "Payments", "Documents", "Communication", "Jersey Requests", "History"].map((tab) => {
            const key = tab.toLowerCase().replace(/\s+/g, "-");
            return `<button type="button" class="${key === "billing" ? "active" : ""}" data-player-v2-tab="${key}">${safe(tab)}</button>`;
          }).join("")}
        </div>

        <div class="player-v2-content">
          <div class="player-v2-primary">
            ${buildOverviewPanel(payload)}
            ${buildBillingPanel(payload, { active: true })}
            ${buildAttendancePanel(payload)}
            ${buildBillingPanel({ ...payload, paymentRows: payload.paymentRows || [] }, { panel: "payments" })}
            <section class="player-v2-tab-panel" data-player-v2-panel="documents">
              <article class="player-v2-card"><div class="player-v2-card-head"><h3>Documents</h3></div><p class="player-v2-empty">No documents are attached yet.</p></article>
            </section>
            ${buildTimelinePanel(payload, "communication", "Communication")}
            ${buildJerseyCard(payload).replace("<section class=\"player-v2-card\">", "<section class=\"player-v2-tab-panel\" data-player-v2-panel=\"jersey-requests\"><div class=\"player-v2-single-card\">").replace("</section>", "</div></section>")}
            ${buildTimelinePanel(payload, "history", "History")}
          </div>
          ${buildRail(payload)}
        </div>
      </main>
    `;

    shell.addEventListener("click", (event) => {
      const closeButton = event.target.closest("[data-player-v2-close]");
      if (closeButton) {
        navigateToAppView(payload, "roster");
        return;
      }
      const viewButton = event.target.closest("[data-player-v2-view]");
      if (viewButton) {
        navigateToAppView(payload, viewButton.dataset.playerV2View || "roster");
        return;
      }
      const tabButton = event.target.closest("[data-player-v2-tab]");
      if (tabButton) {
        const key = tabButton.dataset.playerV2Tab;
        shell.querySelectorAll("[data-player-v2-tab]").forEach((button) => button.classList.toggle("active", button === tabButton));
        shell.querySelectorAll("[data-player-v2-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.playerV2Panel === key));
        return;
      }
      const timelineFilterButton = event.target.closest("[data-player-v2-timeline-filter]");
      if (timelineFilterButton) {
        applyTimelineFilter(timelineFilterButton.closest("[data-player-v2-panel]"), timelineFilterButton.dataset.playerV2TimelineFilter || "all");
        return;
      }
      const actionButtonEl = event.target.closest("[data-player-v2-action]");
      if (actionButtonEl) runAction(payload, actionButtonEl.dataset.playerV2Action);
    });

    document.body.appendChild(shell);
    document.body.classList.add("player-v2-open");
    shell.querySelectorAll("[data-player-v2-timeline-active]").forEach((panel) => applyTimelineFilter(panel));
    return true;
  };

  window.GenAlphaPlayerProfileV2 = { open, close };

  if (new URLSearchParams(window.location.search).get("playerProfileV2Mock") === "1") {
    window.addEventListener("DOMContentLoaded", () => {
      open({
        kid: {
          id: "GAC1001",
          name: "Rahul Sharma",
          age: 12,
          timeSlot: "5:30PM",
          joinDate: "2026-03-05",
          rejoinedAt: "2026-05-31",
          fatherGuardianName: "Rajesh Sharma",
          parentContactNo: "9876543210",
          schoolCollege: "Gen Alpha School",
          grade: "7",
          address: "Hyderabad",
          jerseySize: "M",
          jerseyPairs: 2,
          jerseyAmount: 1500,
          admissionFee: 500,
          coachingFee: 3500,
          totalFeeAmount: 5500,
          amountPaid: 5500,
          feePlan: "monthly",
          feesPaid: "yes",
          discontinued: false,
        },
        labels: {
          studentType: "Regular",
          renewalStatus: "Active",
          trainingDuration: "3 months",
          paidThrough: "15 Jun 2026",
          feeStatus: "Paid",
          jersey: "Jersey M - 2 pairs",
        },
        timeline: [
          { event_type: "student_created", title: "Player record created", event_date: "2026-03-05", changed_by: "Admin", details: "Joined 5:30PM. Fee plan: monthly." },
          { event_type: "renewal_paid", title: "Renewal fee paid", event_date: "2026-05-15", changed_by: "Admin", details: "Rs 3,500 - monthly - 1 month - cycle from 2026-05-15" },
          { event_type: "student_rejoined", title: "Player marked active", event_date: "2026-05-14", changed_by: "Admin", details: "Student is active again." },
          { title: "WhatsApp reminder prepared", event_date: "2026-05-24", changed_by: "System" },
          { title: "Reminder delivered", event_date: "2026-05-24", changed_by: "Meta" },
        ],
        paymentRows: [
          { date: "2026-05-15", title: "Renewal payment", plan: "Monthly", months: 1, amount: 3500 },
          { date: "2026-04-15", title: "Renewal payment", plan: "Monthly", months: 1, amount: 3500 },
          { date: "2026-03-05", title: "Joining payment", plan: "Monthly + admission + jersey", months: 1, amount: 5500 },
        ],
        attendanceSummary: {
          total: 18,
          last30: 8,
          currentMonth: 4,
          lastAttended: "2026-05-24",
          recent: [
            "2026-05-24", "2026-05-22", "2026-05-21", "2026-05-20",
            "2026-04-29", "2026-04-25", "2026-04-20", "2026-04-18",
            "2026-03-29", "2026-03-22", "2026-03-15", "2026-03-08",
            "2026-02-23", "2026-02-16", "2026-02-09",
            "2026-01-20", "2025-12-21", "2025-12-14",
          ],
        },
        totalPaid: 12500,
        totalMonths: 3,
        isManagerLoggedIn: true,
        isEditMode: true,
        isActive: true,
        isFeesPending: false,
        isRenewalPending: false,
        actions: { run: () => {} },
      });
    }, { once: true });
  }
})();
