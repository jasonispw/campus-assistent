(function () {
  "use strict";

  function toonGezochtAdres() {
    const melding = document.querySelector("[data-404-url]");
    if (!melding) return;

    const pad = location.pathname + location.search;
    if (!pad || pad === "/404.html") return;

    melding.textContent = "Gezocht adres: " + pad;
  }

  // Van /rooster-week-3 maken we "rooster week 3", zodat de assistent meteen iets kan zoeken.
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
    if (!input) return;

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
