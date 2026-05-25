(function () {
  const money = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
  const safe = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
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

  const buildAttendanceBars = (dates = []) => {
    const uniqueDates = [...new Set(dates)].sort();
    const weeks = Array.from({ length: 8 }, (_, index) => {
      const end = new Date();
      end.setDate(end.getDate() - (7 * (7 - index)));
      const start = new Date(end);
      start.setDate(start.getDate() - 6);
      const count = uniqueDates.filter((dateValue) => {
        const date = new Date(`${dateValue}T00:00:00`);
        return date >= start && date <= end;
      }).length;
      return count;
    });
    const max = Math.max(...weeks, 1);
    return weeks
      .map((count, index) => `<span title="Week ${index + 1}: ${count} day${count === 1 ? "" : "s"}" style="--bar:${Math.max(8, percent(count, max))}%"></span>`)
      .join("");
  };

  const compactTimeline = (timeline = []) =>
    timeline.slice(0, 8).map((item) => `
      <li>
        <span class="player-v2-timeline-dot"></span>
        <div>
          <strong>${safe(item.title || item.event_type || "Timeline event")}</strong>
          <small>${formatDate(item.event_date)}${item.changed_by ? ` · ${safe(item.changed_by)}` : ""}</small>
          ${item.details ? `<p>${safe(item.details)}</p>` : ""}
        </div>
      </li>
    `).join("");

  const runAction = (payload, action) => {
    payload.actions?.run?.(action);
    if (["edit", "renew-open", "joining-payment-open", "toggle-status", "delete"].includes(action)) {
      close();
    }
  };

  const actionButton = (payload, action, label, variant = "secondary") =>
    `<button class="player-v2-action ${variant}" type="button" data-player-v2-action="${safe(action)}">${safe(label)}</button>`;

  const renderActions = (payload) => {
    if (!payload.isManagerLoggedIn || !payload.isEditMode) {
      return "";
    }
    const buttons = [actionButton(payload, "edit", "Edit player", "primary")];
    if (payload.isActive && payload.isFeesPending) {
      buttons.push(actionButton(payload, "joining-payment-open", "Record joining fee", "primary"));
    } else if (payload.isActive && payload.isRenewalPending) {
      buttons.push(actionButton(payload, "renew-open", "Renew payment", "primary"));
    }
    if (payload.isActive && (payload.isFeesPending || payload.isRenewalPending)) {
      buttons.push(actionButton(payload, "send-reminder", "Send reminder"));
    }
    buttons.push(actionButton(payload, "toggle-status", payload.kid.discontinued ? "Mark active" : "Discontinue"));
    buttons.push(actionButton(payload, "delete", "Delete player", "danger"));
    return `<div class="player-v2-actions">${buttons.join("")}</div>`;
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
    const expectedTotal = Math.max(
      Number(kid.totalFeeAmount || 0),
      Number(kid.amountPaid || 0),
      Number(payload.totalPaid || 0),
      1
    );
    const feePaidPercent = percent(payload.totalPaid || kid.amountPaid, expectedTotal);
    const attendanceTarget = Math.max(12, Math.ceil((payload.attendanceSummary?.recent?.length || 0) / 4) * 4);
    const attendancePercent = percent(payload.attendanceSummary?.last30 || 0, attendanceTarget);
    const statusClass = kid.discontinued ? "muted" : payload.isRenewalPending || payload.isFeesPending ? "attention" : "good";
    const pending = payload.pendingPayment;

    const shell = document.createElement("section");
    shell.className = "player-v2-shell";
    shell.setAttribute("role", "dialog");
    shell.setAttribute("aria-modal", "true");
    shell.setAttribute("aria-label", `${kid.name} player profile`);
    shell.innerHTML = `
      <div class="player-v2-topbar">
        <button class="player-v2-back" type="button" data-player-v2-close>Back to roster</button>
        <div class="player-v2-topbar-status">
          <span>${safe(payload.labels?.studentType || "Player")}</span>
          <span class="${statusClass}">${safe(kid.discontinued ? "Discontinued" : payload.labels?.renewalStatus || "Active")}</span>
        </div>
      </div>

      <header class="player-v2-hero">
        <div class="player-v2-photo" aria-hidden="true">${safe(initials(kid.name))}</div>
        <div class="player-v2-identity">
          <p>${safe(kid.timeSlot || "Slot not set")} · Joined ${formatDate(kid.joinDate)}</p>
          <h2>${safe(kid.name || "Unnamed player")}</h2>
          <div class="player-v2-badges">
            <span>${safe(payload.labels?.feeStatus || "Fee status")}</span>
            <span>${safe(payload.labels?.jersey || "Jersey not set")}</span>
            <span>${safe(payload.labels?.trainingDuration || "Training duration not available")}</span>
          </div>
        </div>
        ${renderActions(payload)}
      </header>

      <main class="player-v2-grid">
        <section class="player-v2-panel player-v2-fee">
          <div class="player-v2-section-head">
            <div>
              <span>Fee health</span>
              <h3>${safe(payload.labels?.paidThrough || "-")}</h3>
            </div>
            <strong>${money(payload.totalPaid || kid.amountPaid)}</strong>
          </div>
          <div class="player-v2-meter" style="--meter:${feePaidPercent}%">
            <span></span>
          </div>
          <div class="player-v2-stat-row">
            <div><span>Total paid</span><strong>${money(payload.totalPaid || 0)}</strong></div>
            <div><span>Months paid</span><strong>${Number(payload.totalMonths || 0)}</strong></div>
            <div><span>Expected tracked</span><strong>${money(expectedTotal)}</strong></div>
          </div>
          ${pending ? `
            <div class="player-v2-alert">
              <strong>Payment pending verification</strong>
              <span>${safe(pending.planTitle)} · ${money(pending.amount)} · ${formatDate(pending.cycleDate)} to ${formatDate(pending.toDate)}</span>
            </div>
          ` : ""}
        </section>

        <section class="player-v2-panel">
          <div class="player-v2-section-head">
            <div>
              <span>Attendance</span>
              <h3>${Number(payload.attendanceSummary?.last30 || 0)} recent days</h3>
            </div>
            <strong>${attendancePercent}%</strong>
          </div>
          <div class="player-v2-attendance-bars">${buildAttendanceBars(payload.attendanceSummary?.recent || [])}</div>
          <div class="player-v2-stat-row">
            <div><span>Last 90 days</span><strong>${Number(payload.attendanceSummary?.total || 0)}</strong></div>
            <div><span>Today</span><strong>${payload.attendanceSummary?.recent?.includes(new Date().toISOString().slice(0, 10)) ? "Present" : "Not marked"}</strong></div>
          </div>
        </section>

        <section class="player-v2-panel">
          <div class="player-v2-section-head">
            <div>
              <span>Player info</span>
              <h3>${safe(kid.age)} years</h3>
            </div>
          </div>
          <dl class="player-v2-facts">
            <div><dt>Guardian</dt><dd>${safe(kid.fatherGuardianName || "Not saved")}</dd></div>
            <div><dt>Phone</dt><dd>${kid.parentContactNo ? `<a href="tel:${safe(kid.parentContactNo)}">${safe(kid.parentContactNo)}</a>` : "Not saved"}</dd></div>
            <div><dt>School</dt><dd>${safe([kid.schoolCollege, kid.grade ? `Grade ${kid.grade}` : ""].filter(Boolean).join(" · ") || "Not saved")}</dd></div>
            <div><dt>Address</dt><dd>${safe(kid.address || "Not saved")}</dd></div>
          </dl>
        </section>

        <section class="player-v2-panel">
          <div class="player-v2-section-head">
            <div>
              <span>Kit and profile</span>
              <h3>${safe(kid.jerseySize || "Size TBD")}</h3>
            </div>
            <strong>${Number(kid.jerseyPairs || 0)} pair${Number(kid.jerseyPairs || 0) === 1 ? "" : "s"}</strong>
          </div>
          <div class="player-v2-development">
            <div><span>Skill notes</span><strong>Not tracked yet</strong></div>
            <div><span>Coach assessment</span><strong>Not tracked yet</strong></div>
            <div><span>Medical or waiver</span><strong>Not tracked yet</strong></div>
          </div>
        </section>

        <section class="player-v2-panel player-v2-wide">
          <div class="player-v2-section-head">
            <div>
              <span>Recent activity</span>
              <h3>Timeline</h3>
            </div>
          </div>
          ${
            payload.timeline?.length
              ? `<ol class="player-v2-timeline">${compactTimeline(payload.timeline)}</ol>`
              : `<p class="player-v2-empty">No timeline records yet.</p>`
          }
        </section>
      </main>
    `;

    shell.addEventListener("click", (event) => {
      const closeButton = event.target.closest("[data-player-v2-close]");
      if (closeButton) {
        close();
        return;
      }
      const actionButtonEl = event.target.closest("[data-player-v2-action]");
      if (actionButtonEl) {
        runAction(payload, actionButtonEl.dataset.playerV2Action);
      }
    });

    document.body.appendChild(shell);
    document.body.classList.add("player-v2-open");
    return true;
  };

  window.GenAlphaPlayerProfileV2 = { open, close };

  if (new URLSearchParams(window.location.search).get("playerProfileV2Mock") === "1") {
    window.addEventListener("DOMContentLoaded", () => {
      open({
        kid: {
          id: "mock-player",
          name: "Sample Player",
          age: 12,
          timeSlot: "6 PM",
          joinDate: new Date().toISOString().slice(0, 10),
          fatherGuardianName: "Parent name",
          parentContactNo: "9000000000",
          schoolCollege: "School",
          grade: "7",
          address: "Hyderabad",
          jerseySize: "32",
          jerseyPairs: 2,
          amountPaid: 4750,
          totalFeeAmount: 4750,
          discontinued: false,
        },
        labels: {
          studentType: "New",
          renewalStatus: "Fees pending",
          trainingDuration: "First month",
          paidThrough: "Due now",
          feeStatus: "Reminder sent",
          jersey: "Jersey 32 · 2 pairs",
        },
        timeline: [
          { title: "WhatsApp reminder prepared", event_date: new Date().toISOString().slice(0, 10), changed_by: "System" },
          { title: "Reminder delivered", event_date: new Date().toISOString().slice(0, 10), changed_by: "WhatsApp" },
        ],
        paymentRows: [],
        attendanceSummary: { total: 18, last30: 8, recent: [] },
        totalPaid: 4750,
        totalMonths: 1,
        isManagerLoggedIn: true,
        isEditMode: true,
        isActive: true,
        isFeesPending: true,
        isRenewalPending: false,
        actions: { run: () => {} },
      });
    }, { once: true });
  }
})();
