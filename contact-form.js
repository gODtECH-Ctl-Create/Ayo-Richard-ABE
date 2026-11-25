/* Same-page contact form delivery through FormSubmit. */
(() => {
  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  const status = document.getElementById("contact-form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton?.querySelector(".contact-submit-label");

  if (!status || !submitButton || !submitLabel) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const honeypot = String(formData.get("_honey") || "").trim();

    // Silently ignore basic automated submissions that fill the hidden field.
    if (honeypot) return;

    const payload = Object.fromEntries(formData.entries());
    const originalLabel = submitLabel.textContent || "Send Message";

    submitButton.disabled = true;
    submitLabel.textContent = "Sending...";
    status.textContent = "Sending your message securely...";
    status.dataset.state = "pending";

    try {
      const response = await fetch("https://formsubmit.co/ajax/ayoabe24@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      // FormSubmit returns the success value as a string in its AJAX response.
      // Compare explicitly so the string "false" is never treated as success.
      if (!response.ok || String(result?.success).toLowerCase() !== "true") {
        throw new Error(
          result?.message ||
          "The message could not be sent. Please use the email or call links instead."
        );
      }

      form.reset();
      status.textContent = "Message sent successfully. Thank you for reaching out. I'll get back to you by email.";
      status.dataset.state = "success";
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      const activationRequired = /activat/i.test(message);
      status.textContent = activationRequired
        ? "The contact form needs a one-time email activation. Please use the direct email link below for now."
        : "Your message wasn't sent. Please email ayoabe24@gmail.com or call +234 814 047 9738 directly.";
      status.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
      submitLabel.textContent = originalLabel;
    }
  });
})();
