(() => {
  const init = () => {
    const form = document.getElementById("portfolio-contact-form");
    if (!form || form.dataset.contactReady) return;
    const status = document.getElementById("contact-form-status");
    const button = form.querySelector('button[type="submit"]');
    const label = button?.querySelector(".contact-submit-label");
    if (!status || !button || !label) {
      console.error("Contact form is missing a required element.");
      return;
    }
    form.dataset.contactReady = "true";
    const show = (message, state = "error") => {
      status.textContent = message;
      status.dataset.state = state;
    };
    form.addEventListener("invalid", () => show("Please complete all required fields and check your email address."), true);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        show("Please complete all required fields and check your email address.");
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      if (String(data.get("_honey") || "").trim()) {
        show("Submission blocked. Refresh the page and try again.");
        return;
      }
      const original = label.textContent || "Send Message";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      label.textContent = "Sending...";
      show("Sending your message securely. Please wait...", "pending");
      try {
        const response = await fetch("https://formsubmit.co/ajax/ayoabe24@gmail.com", {
          method: "POST", mode: "cors",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(Object.fromEntries(data.entries())), signal: controller.signal
        });
        const raw = await response.text();
        let result = null;
        try { result = raw ? JSON.parse(raw) : null; } catch {}
        const ok = result?.success === true || String(result?.success).toLowerCase() === "true";
        if (!response.ok || !ok) throw new Error(result?.message || "The email service rejected the message.");
        form.reset();
        show("Message sent successfully. I'll get back to you by email.", "success");
      } catch (error) {
        console.error("Portfolio contact form error:", error);
        const message = error instanceof Error ? error.message : "";
        if (error?.name === "AbortError") show("The email service timed out. Please try again or use the Email me link.");
        else if (/activat|confirm/i.test(message)) show("One-time activation is required. Check ayoabe24@gmail.com for FormSubmit's activation email.");
        else show("Your message was not confirmed as sent. Please use the Email me link or try again.");
      } finally {
        clearTimeout(timeout);
        button.disabled = false;
        button.removeAttribute("aria-busy");
        label.textContent = original;
      }
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
