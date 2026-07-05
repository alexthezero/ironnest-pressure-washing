const BUSINESS_EMAIL = "quotes@ironnestpressurewashing.com";
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const year = document.getElementById("year");
const quoteForm = document.getElementById("quoteForm");
const toast = document.getElementById("toast");
const formStatus = document.getElementById("formStatus");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function markInvalid(field, isInvalid) {
  field.classList.toggle("invalid", isInvalid);
  field.setAttribute("aria-invalid", isInvalid ? "true" : "false");
}

function validateQuoteForm() {
  const requiredFields = ["name", "phone", "address", "service"];
  let firstInvalid = null;

  requiredFields.forEach((fieldName) => {
    const field = quoteForm.elements[fieldName];
    const isInvalid = !String(field.value || "").trim();
    markInvalid(field, isInvalid);
    if (isInvalid && !firstInvalid) firstInvalid = field;
  });

  const email = quoteForm.elements.email;
  const emailValue = String(email.value || "").trim();
  const emailInvalid = emailValue.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  markInvalid(email, emailInvalid);
  if (emailInvalid && !firstInvalid) firstInvalid = email;

  if (firstInvalid) {
    formStatus.textContent = "Please complete the highlighted fields.";
    firstInvalid.focus();
    return false;
  }

  formStatus.textContent = "";
  return true;
}

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateQuoteForm()) return;

  const data = new FormData(quoteForm);
  const subject = encodeURIComponent("New IronNest Pressure Washing Quote Request");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\n` +
    `Mobile phone: ${data.get("phone")}\n` +
    `Email: ${data.get("email") || "Not provided"}\n` +
    `Service address or ZIP: ${data.get("address")}\n` +
    `Service needed: ${data.get("service")}\n\n` +
    `Project details:\n${data.get("details") || "No extra details provided."}`
  );

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});
