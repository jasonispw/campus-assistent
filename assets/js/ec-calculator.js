(function () {
  "use strict";

  const EC_PER_JAAR = 60;
  const UREN_PER_EC = 28;
  const BSA_NORM = 30;

  function toonStoring(widget) {
    const body = widget.querySelector(".widget__body");
    if (!body) return;

    body.innerHTML =
      '<div class="verdict is-fout"><svg class="icon"><use href="#i-alert"></use></svg> ' +
      "De calculator doet het even niet. Ververs de pagina om het opnieuw te proberen.</div>";
  }

  function telPeriodes(velden) {
    let totaal = 0;

    for (const veld of velden) {
      const ruw = veld.value.trim();
      const waarde = parseFloat(ruw);
      veld.classList.remove("is-fout");

      if (ruw === "") continue;

      if (isNaN(waarde) || waarde < 0 || waarde > EC_PER_JAAR) {
        veld.classList.add("is-fout");
        return null;
      }

      totaal += waarde;
    }

    return Math.min(totaal, EC_PER_JAAR);
  }

  function toonOngeldig(oordeel) {
    oordeel.className = "verdict is-fout";
    oordeel.innerHTML =
      '<svg class="icon"><use href="#i-alert"></use></svg> ' +
      "Vul per periode een getal in tussen 0 en " + EC_PER_JAAR + " EC.";
  }

  function toonOordeel(oordeel, totaal) {
    if (totaal >= BSA_NORM) {
      oordeel.className = "verdict is-ok";
      oordeel.innerHTML =
        "Je zit op of boven de BSA-norm van " + BSA_NORM + " EC. " +
        "Nog " + (EC_PER_JAAR - totaal) + " EC te gaan voor een volledig jaar.";
      return;
    }

    const tekort = BSA_NORM - totaal;
    oordeel.className = "verdict";
    oordeel.innerHTML =
      "Je hebt nog <strong>" + tekort + " EC</strong> nodig voor de BSA-norm van " + BSA_NORM + " EC. " +
      "Dat is ongeveer " + (tekort * UREN_PER_EC).toLocaleString("nl-NL") + " uur studie. " +
      "Praat op tijd met je studiebegeleider.";
  }

  function init() {
    const widget = document.querySelector("[data-ec-calculator]");
    if (!widget) return;

    const velden = widget.querySelectorAll("input[type=number]");
    const vulling = widget.querySelector("[data-ec-fill]");
    const totaalEl = widget.querySelector("[data-ec-totaal]");
    const urenEl = widget.querySelector("[data-ec-uren]");
    const oordeel = widget.querySelector("[data-ec-oordeel]");
    const marker = widget.querySelector("[data-ec-marker]");

    if (!velden.length || !vulling || !totaalEl || !urenEl || !oordeel) return;

    if (marker) marker.style.left = (BSA_NORM / EC_PER_JAAR * 100) + "%";

    function bereken() {
      const totaal = telPeriodes(velden);

      if (totaal === null) {
        toonOngeldig(oordeel);
        return;
      }

      vulling.style.width = (totaal / EC_PER_JAAR * 100) + "%";
      totaalEl.textContent = totaal;
      urenEl.textContent = (totaal * UREN_PER_EC).toLocaleString("nl-NL");
      toonOordeel(oordeel, totaal);
    }

    velden.forEach(veld => veld.addEventListener("input", bereken));
    bereken();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const widget = document.querySelector("[data-ec-calculator]");
    if (!widget) return;

    try {
      init();
    } catch (fout) {
      toonStoring(widget);
    }
  });
})();
