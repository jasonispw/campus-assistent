(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var melding = document.querySelector("[data-404-url]");
    if (melding) {
      var pad = location.pathname + location.search;
      if (pad && pad !== "/404.html") {
        melding.textContent = "Gezocht adres: " + pad;
      }
    }

    var input = document.querySelector("[data-assist-form] input");
    if (!input) return;

    var gok = location.pathname
      .split("/").pop()
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[-_]+/g, " ")
      .trim();

    if (gok && gok !== "404") {
      input.value = gok;
      var form = document.querySelector("[data-assist-form]");
      if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  });
})();
