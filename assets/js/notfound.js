(function () {
  "use strict";

  function toonGezochtAdres() {
    const melding = document.querySelector("[data-404-url]");
    if (!melding) return;

    const pad = location.pathname + location.search;
    if (!pad || pad.indexOf("404.html") !== -1) return;

    melding.textContent = "Gezocht adres: " + pad;
  }

  function zoektermUitAdres() {
    return location.pathname
      .split("/").pop()
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[-_]+/g, " ")
      .trim();
  }

  function zoekAlvast() {
    const form = document.querySelector("[data-assist-form]");
    const input = form && form.querySelector("input");
    if (!input || input.disabled) return;

    const zoekterm = zoektermUitAdres();
    if (!zoekterm || zoekterm === "404") return;

    input.value = zoekterm;
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    toonGezochtAdres();
    zoekAlvast();
  });
})();
