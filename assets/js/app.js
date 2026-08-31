(function () {
  "use strict";

  function initNav() {
    const knop = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav]");
    if (!knop || !menu) return;

    function zet(open) {
      menu.classList.toggle("is-open", open);
      knop.setAttribute("aria-expanded", String(open));
    }

    knop.addEventListener("click", function () {
      zet(!menu.classList.contains("is-open"));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        zet(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!menu.classList.contains("is-open")) return;

      zet(false);
      knop.focus();
    });
  }

  function initActieveLink() {
    const pagina = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("[data-nav] a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href) return;

      if (href.split("/").pop() === pagina) link.setAttribute("aria-current", "page");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      initNav();
      initActieveLink();
    } catch (fout) {
      const menu = document.querySelector("[data-nav]");
      if (menu) menu.classList.add("is-open");
    }
  });
})();
