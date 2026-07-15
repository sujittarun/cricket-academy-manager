(async function () {
  const config = window.GEN_ALPHA_SUPABASE_CONFIG || {};
  const client = window.supabase.createClient(config.url, config.anonKey);
  const $ = (id) => document.getElementById(id);
  let sessionId = "";
  let chatId = "";
  let summaryText = "";

  const { data: { session } } = await client.auth.getSession();
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
    summaryText = result.summary || summaryText;
    if (summaryText) $("summary").textContent = summaryText;
    $("reviewCard").classList.remove("hide");
    $("reviewCard").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("intakeForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = $("extractButton");
    button.disabled = true;
    $("intakeStatus").textContent = "Creating a secure draft…";
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
      $("intakeStatus").textContent = "Draft ready. Nothing has been saved to admissions yet.";
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
      $("reviewStatus").textContent = `Admission ${result.result?.reg_no || ""} created in the review queue.${result.result?.payment_claim_id ? " Payment is pending manager verification." : ""}`;
    } catch (error) {
      $("reviewStatus").textContent = error.message || "Unable to create admission.";
      $("confirmButton").disabled = false;
    }
  });

  $("resetButton").addEventListener("click", () => window.location.reload());
})();
