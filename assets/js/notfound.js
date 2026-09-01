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
    const assistent = window.HANDIG && window.HANDIG.assistent;
    if (!assistent) return;

    const zoekterm = zoektermUitAdres();
    if (!zoekterm || zoekterm === "404") return;

    assistent.vraag(zoekterm);
  }

  document.addEventListener("DOMContentLoaded", function () {
    toonGezochtAdres();
    zoekAlvast();
  });
})();
