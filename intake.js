(async function () {
  const config = window.GEN_ALPHA_SUPABASE_CONFIG || {};
  const client = window.supabase.createClient(config.url, config.anonKey);
  const $ = (id) => document.getElementById(id);
  let sessionId = "";
  let chatId = "";
  let summaryText = "";
  let intakeType = "unknown";

  const { data: { session } } = await client.auth.getSession();
  if (window.GEN_ALPHA_FEATURES?.aiIntakeEnabled !== true) {
    $("intakeUnavailable").classList.remove("hide");
    return;
  }
  $(session ? "intakeApp" : "loginRequired").classList.remove("hide");
  if (!session) return;

  async function token() {
    const { data } = await client.auth.getSession();
    if (!data.session) throw new Error("Manager session expired. Please log in again.");
    return data.session.access_token;
  }

  async function callIntake(payload) {
    const response = await fetch(`${config.url}/functions/v1/admission-intake`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await token()}`,
        apikey: config.anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const body = await response.json();
    if (!response.ok || body.success === false) throw new Error(body.error || "Admission intake failed.");
    return body;
  }

  const formatWhen = (value) => value
    ? new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
    : "";

  function messageText(message) {
    if (message.text_body) return message.text_body;
    if (message.media_filename) return `Attachment: ${message.media_filename}`;
    return message.message_type === "image" ? "Image received" : `${message.message_type || "Message"} received`;
  }

  function renderHistory(sessions, messages, interpretations) {
    const host = $("recentSessions");
    host.replaceChildren();
    const interpretationByMessage = new Map(
      interpretations.map((item) => [item.provider_message_id, item])
    );
    sessions.forEach((item, index) => {
      const details = document.createElement("details");
      details.className = "intake-session";
      if (index === 0) details.open = true;

      const summary = document.createElement("summary");
      const title = document.createElement("span");
      title.className = "intake-session-title";
      const strong = document.createElement("strong");
      strong.textContent = `${item.display_id || "AgentAlpha"} · ${item.intake_type || "Understanding intent"}`;
      const subtitle = document.createElement("span");
      subtitle.textContent = `${item.source_sender_name || item.source_sender_id || "WhatsApp staff"} · ${formatWhen(item.last_message_at)}`;
      title.append(strong, subtitle);
      const status = document.createElement("span");
      status.className = "intake-status-pill";
      status.textContent = String(item.status || "unknown").replaceAll("_", " ");
      summary.append(title, status);
      details.append(summary);

      const list = document.createElement("div");
      list.className = "intake-message-list";
      const sessionMessages = messages
        .filter((message) => message.session_id === item.id)
        .sort((a, b) => new Date(a.message_timestamp) - new Date(b.message_timestamp));
      sessionMessages.forEach((message) => {
        const card = document.createElement("article");
        card.className = "intake-message";
        const head = document.createElement("div");
        head.className = "intake-message-head";
        const kind = document.createElement("strong");
        kind.textContent = `${message.message_type || "message"} · ${message.processing_status || "received"}`;
        const when = document.createElement("span");
        when.textContent = formatWhen(message.message_timestamp);
        head.append(kind, when);
        const body = document.createElement("p");
        body.textContent = messageText(message);
        card.append(head, body);
        const understood = interpretationByMessage.get(message.provider_message_id);
        if (understood) {
          const note = document.createElement("div");
          note.className = "intake-interpretation";
          note.textContent = `Understood as ${understood.final_intent || "unknown"}${understood.mentioned_plan ? ` · ${understood.mentioned_plan}` : ""}${understood.reason ? ` · ${understood.reason}` : ""}`;
          card.append(note);
        }
        list.append(card);
      });
      if (!sessionMessages.length) {
        const empty = document.createElement("p");
        empty.className = "muted";
        empty.textContent = "No message records found for this session.";
        list.append(empty);
      }
      const meta = document.createElement("p");
      meta.className = "intake-session-meta";
      meta.textContent = [
        item.missing_fields?.length ? `Missing: ${item.missing_fields.join(", ")}` : "",
        item.error_message ? `Error: ${item.error_message}` : "",
      ].filter(Boolean).join(" · ") || "No recorded processing error.";
      list.append(meta);
      details.append(list);
      host.append(details);
    });
  }

  async function loadRecentHistory() {
    const button = $("refreshHistory");
    button.disabled = true;
    $("historyStatus").textContent = "Loading recent WhatsApp conversations…";
    try {
      const { data: sessions, error: sessionError } = await client
        .from("admission_intake_sessions")
        .select("id,display_id,intake_type,status,source_sender_id,source_sender_name,last_message_at,missing_fields,error_message")
        .in("channel", ["whatsapp", "whatsapp_group"])
        .order("last_message_at", { ascending: false })
        .limit(8);
      if (sessionError) throw sessionError;
      const ids = (sessions || []).map((item) => item.id);
      if (!ids.length) {
        renderHistory([], [], []);
        $("historyStatus").textContent = "No recent WhatsApp AgentAlpha conversations found.";
        return;
      }
      const [{ data: messages, error: messageError }, { data: interpretations, error: interpretationError }] = await Promise.all([
        client
          .from("admission_intake_messages")
          .select("session_id,provider_message_id,message_type,text_body,media_filename,processing_status,message_timestamp")
          .in("session_id", ids)
          .order("message_timestamp", { ascending: true }),
        client
          .from("admission_intake_reply_interpretations")
          .select("session_id,provider_message_id,final_intent,mentioned_plan,reason,created_at")
          .in("session_id", ids)
          .order("created_at", { ascending: true }),
      ]);
      if (messageError) throw messageError;
      if (interpretationError) throw interpretationError;
      renderHistory(sessions || [], messages || [], interpretations || []);
      $("historyStatus").textContent = `${sessions.length} recent conversation${sessions.length === 1 ? "" : "s"}. Newest is open.`;
    } catch (error) {
      $("historyStatus").textContent = error.message || "Unable to load AgentAlpha history.";
    } finally {
      button.disabled = false;
    }
  }

  $("refreshHistory").addEventListener("click", loadRecentHistory);
  await loadRecentHistory();

  async function ingestText(text, processNow = false) {
    return await callIntake({
      action: "ingest",
      channel: "web",
      process_now: processNow,
      message: {
        provider_message_id: crypto.randomUUID(),
        source_chat_id: chatId,
        source_sender_id: session.user.id,
        source_sender_name: session.user.email || "Manager",
        message_type: "text",
        text_body: text,
        message_timestamp: new Date().toISOString(),
      },
    });
  }

  function render(result) {
    intakeType = result.intakeType || intakeType;
    summaryText = result.summary || summaryText;
    if (summaryText) $("summary").textContent = summaryText;
    $("reviewTitle").textContent = intakeType === "renewal" ? "Review extracted renewal" : "Review extracted admission";
    $("confirmButton").textContent = intakeType === "renewal"
      ? "Confirm and record renewal"
      : "Confirm and create pending admission";
    $("reviewCard").classList.remove("hide");
    $("reviewCard").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("intakeForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = $("extractButton");
    button.disabled = true;
    $("intakeStatus").textContent = "Creating a secure conversation draft…";
    try {
      chatId = `web-${crypto.randomUUID()}`;
      const first = await ingestText($("transcript").value.trim(), false);
      sessionId = first.sessionId;
      const files = [...$("intakeFiles").files];
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        $("intakeStatus").textContent = `Uploading file ${index + 1} of ${files.length}…`;
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
        const path = `${sessionId}/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await client.storage.from("admission-intake").upload(path, file, { contentType: file.type, upsert: false });
        if (uploadError) throw uploadError;
        await callIntake({
          action: "ingest",
          channel: "web",
          message: {
            provider_message_id: crypto.randomUUID(),
            source_chat_id: chatId,
            source_sender_id: session.user.id,
            source_sender_name: session.user.email || "Manager",
            message_type: file.type === "application/pdf" ? "document" : "image",
            media_mime_type: file.type,
            media_filename: file.name,
            storage_bucket: "admission-intake",
            storage_path: path,
            message_timestamp: new Date(Date.now() + index + 1).toISOString(),
          },
        });
      }
      $("intakeStatus").textContent = "Reading the conversation and attachments…";
      const result = await callIntake({ action: "process_session", session_id: sessionId });
      render(result.reprocessed || result);
      $("intakeStatus").textContent = "Draft ready. Nothing has been saved to admissions, players, or payments yet.";
    } catch (error) {
      $("intakeStatus").textContent = error.message || "Unable to extract admission.";
    } finally {
      button.disabled = false;
    }
  });

  $("correctButton").addEventListener("click", async () => {
    const correction = $("correction").value.trim();
    if (!correction || !sessionId) return;
    $("correctButton").disabled = true;
    $("reviewStatus").textContent = "Applying correction and rebuilding the draft…";
    try {
      const result = await ingestText(correction, false);
      render(result.reprocessed || result);
      $("correction").value = "";
      $("reviewStatus").textContent = "Correction applied. Please verify the updated summary.";
    } catch (error) {
      $("reviewStatus").textContent = error.message || "Unable to apply correction.";
    } finally {
      $("correctButton").disabled = false;
    }
  });

  $("confirmButton").addEventListener("click", async () => {
    if (!sessionId) return;
    $("confirmButton").disabled = true;
    $("reviewStatus").textContent = "Creating the pending admission…";
    try {
      const result = await callIntake({
        action: "confirm",
        session_id: sessionId,
        confirmation_message_id: "web",
        confirmed_by: session.user.email || "Manager web intake",
      });
      if (result.intakeType === "renewal") {
        $("reviewStatus").textContent = `${result.result?.student_name || "Player"} renewed from ${result.result?.cycle_start_date || ""} to ${result.result?.renewal_to_date || ""}. Payment and finance ledger updated.`;
      } else {
        $("reviewStatus").textContent = `Admission ${result.result?.reg_no || ""} created in the review queue.${result.result?.payment_claim_id ? " Payment is pending manager verification." : ""}`;
      }
    } catch (error) {
      $("reviewStatus").textContent = error.message || "Unable to confirm this intake.";
      $("confirmButton").disabled = false;
    }
  });

  $("resetButton").addEventListener("click", () => window.location.reload());
})();
