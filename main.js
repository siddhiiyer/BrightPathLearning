/**
 * BrightPath Learning — Shared site interactions
 */

(function () {
  "use strict";

  initMobileNav();
  initCourseFilters();
  initContactForm();
  setActiveNavLink();

  /**
   * Toggle mobile navigation menu open/closed.
   */
  function initMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      toggle.classList.toggle("active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /**
   * Highlight the current page link in the navigation bar.
   */
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  /**
   * Filter course cards by category on the courses page.
   */
  function initCourseFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseCards = document.querySelectorAll(".course-card[data-category]");

    if (!filterButtons.length || !courseCards.length) return;

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const category = button.dataset.filter;

        filterButtons.forEach(function (btn) {
          btn.classList.toggle("active", btn === button);
        });

        courseCards.forEach(function (card) {
          const matches = category === "all" || card.dataset.category === category;
          card.classList.toggle("hidden", !matches);
        });
      });
    });
  }

  /**
   * Validate and handle the contact form submission (client-side demo).
   */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const successMessage = document.getElementById("form-success");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;
      const fields = [
        { id: "name", validator: validateRequired },
        { id: "email", validator: validateEmail },
        { id: "message", validator: validateRequired },
      ];

      fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const group = input.closest(".form-group");
        const errorEl = group.querySelector(".form-error");
        const fieldValid = field.validator(input.value.trim());

        group.classList.toggle("invalid", !fieldValid);
        if (!fieldValid) {
          isValid = false;
        } else {
          errorEl.textContent = "";
        }
      });

      if (!isValid) return;

      if (successMessage) {
        successMessage.classList.add("visible");
        form.reset();
        setTimeout(function () {
          successMessage.classList.remove("visible");
        }, 5000);
      }
    });

    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        const group = input.closest(".form-group");
        group.classList.remove("invalid");
      });
    });
  }

  function validateRequired(value) {
    return value.length >= 2;
  }

  function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  }
})();
