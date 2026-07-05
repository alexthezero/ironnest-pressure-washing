const BUSINESS_EMAIL = "quotes@ironnestpressurewashing.com";
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const year = document.getElementById("year");
const quoteForm = document.getElementById("quoteForm");
const toast = document.getElementById("toast");

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

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const subject = encodeURIComponent("New IronNest Pressure Washing Quote Request");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\n` +
    `Contact: ${data.get("contact")}\n` +
    `Service: ${data.get("service")}\n\n` +
    `Project Details:\n${data.get("details") || "No extra details provided."}`
  );

  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});