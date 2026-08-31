(function () {
  "use strict";

  function initNav() {
    var knop = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav]");
    if (!knop || !menu) return;

    knop.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      knop.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        knop.setAttribute("aria-expanded", "false");
        knop.focus();
      }
    });
  }

  function initActieveLink() {
    var pagina = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-nav] a").forEach(function (link) {
      var doel = link.getAttribute("href").split("/").pop();
      if (doel === pagina) link.setAttribute("aria-current", "page");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      initNav();
      initActieveLink();
    } catch (fout) {
      var menu = document.querySelector("[data-nav]");
      if (menu) menu.classList.add("is-open");
    }
  });
})();
