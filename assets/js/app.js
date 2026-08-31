(function () {
  "use strict";

  function initNav() {
    const knop = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav]");
    if (!knop || !menu) return;

    knop.addEventListener("click", function () {
      const open = menu.classList.toggle("is-open");
      knop.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!menu.classList.contains("is-open")) return;

      menu.classList.remove("is-open");
      knop.setAttribute("aria-expanded", "false");
      knop.focus();
    });
  }

  function initActieveLink() {
    const pagina = location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("[data-nav] a").forEach(function (link) {
      const doel = link.getAttribute("href").split("/").pop();
      if (doel === pagina) link.setAttribute("aria-current", "page");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      initNav();
      initActieveLink();
    } catch (fout) {
      // Zonder werkende toggle blijft het menu anders onbereikbaar op mobiel.
      const menu = document.querySelector("[data-nav]");
      if (menu) menu.classList.add("is-open");
    }
  });
})();
