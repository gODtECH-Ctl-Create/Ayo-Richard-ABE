/* Accessible contact form delivery through FormSubmit. */
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

    const show = (message, state = "info") => {
      status.textContent = message;
      status.dataset.state = state;
    };

    form.addEventListener("invalid", () => {
      show("Please complete the required fields before sending.");
    }, true);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        show("Please complete the required fields before sending.");
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const originalLabel = label.textContent || "Send Message";
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 20000);

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      label.textContent = "Sending...";
      show("Sending your message...", "pending");

      try {
        const response = await fetch("https://formsubmit.co/ajax/ayoabe24@gmail.com", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(Object.fromEntries(formData.entries())),
          signal: controller.signal
        });

        const responseText = await response.text();
        let result = null;

        try {
          result = responseText ? JSON.parse(responseText) : null;
        } catch {
          throw new Error("The email service returned an unreadable response.");
        }

        const succeeded = result?.success === true ||
          String(result?.success).toLowerCase() === "true";

        if (!response.ok || !succeeded) {
          throw new Error(typeof result?.message === "string"
            ? result.message
            : "The email service did not accept the message.");
        }

        form.reset();
        show("Message sent. Thank you for reaching out.", "success");
      } catch (error) {
        console.error("Portfolio contact form submission failed:", error);

        const message = error instanceof Error ? error.message : "";
        if (error?.name === "AbortError") {
          show("No response yet. Please try again or email me directly.", "error");
        } else if (/activat|confirm/i.test(message)) {
          show("Email setup needs activation. Please email me directly for now.", "error");
        } else {
          show("Message not sent. Please email me directly or try again.", "error");
        }
      } finally {
        window.clearTimeout(timeout);
        button.disabled = false;
        button.removeAttribute("aria-busy");
        label.textContent = originalLabel;
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
