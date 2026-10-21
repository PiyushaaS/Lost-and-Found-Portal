(() => {
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);

  const toast = (message, type = "info") => {
    const region = document.querySelector(".toast-region");
    if (!region) {
      window.alert(message);
      return;
    }
    const node = document.createElement("div");
    node.className = `toast ${type}`;
    node.setAttribute("role", type === "error" ? "alert" : "status");
    node.textContent = message;
    region.append(node);
    window.setTimeout(() => node.remove(), 4200);
  };

  const logout = () => {
    localStorage.clear();
    window.location.assign("/login.html");
  };

  const initNavigation = () => {
    const toggle = document.querySelector("[data-nav-toggle]");
    const links = document.querySelector("[data-nav-links]");
    if (toggle && links) {
      toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    const username = localStorage.getItem("username");
    const label = document.querySelector("[data-user-name]");
    if (label) label.textContent = username || "Guest";

    document.querySelectorAll("[data-auth-only]").forEach((element) => {
      if (localStorage.getItem("token")) element.hidden = false;
    });
    document.querySelectorAll("[data-guest-only]").forEach((element) => {
      if (!localStorage.getItem("token")) element.hidden = false;
    });
    document.querySelectorAll("[data-admin-only]").forEach((element) => {
      if (localStorage.getItem("role") === "ADMIN") element.hidden = false;
    });
    document.querySelectorAll("[data-logout]").forEach((element) => {
      element.addEventListener("click", logout);
    });
  };

  window.Portal = { escapeHtml, toast, logout };
  document.addEventListener("DOMContentLoaded", initNavigation);
})();
