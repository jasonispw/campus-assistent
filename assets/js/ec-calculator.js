(function () {
  "use strict";

  const EC_PER_JAAR = 60;
  const UREN_PER_EC = 28;
  const DOORSTROOMNORM = 40;

  function toonStoring(widget) {
    const body = widget.querySelector(".widget__body");
    if (!body) return;

    body.innerHTML =
      '<div class="verdict is-fout"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-alert"></use></svg> ' +
      "De calculator is niet beschikbaar. Ververs de pagina en probeer het opnieuw.</div>";
  }

  function getal(tekst) {
    return Number(String(tekst).trim().replace(",", "."));
  }

  function toon(waarde) {
    return Math.round(waarde * 10) / 10;
  }

  function nl(waarde) {
    return toon(waarde).toLocaleString("nl-NL");
  }

  function lees(velden) {
    let totaal = 0;
    let fouten = 0;
    let afgekapt = false;

    velden.forEach(function (veld) {
      const ruw = veld.value.trim();
      veld.classList.remove("is-fout");
      veld.removeAttribute("aria-invalid");

      if (ruw === "") return;

      const waarde = getal(ruw);

      if (!isFinite(waarde) || waarde < 0 || waarde > EC_PER_JAAR) {
        veld.classList.add("is-fout");
        veld.setAttribute("aria-invalid", "true");
        fouten++;
        return;
      }

      totaal += waarde;
    });

    if (totaal > EC_PER_JAAR) {
      totaal = EC_PER_JAAR;
      afgekapt = true;
    }

    return { totaal: toon(totaal), fouten: fouten, afgekapt: afgekapt };
  }

  function toonOngeldig(oordeel, fouten) {
    oordeel.className = "verdict is-fout";
    oordeel.innerHTML =
      '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-alert"></use></svg> ' +
      (fouten === 1 ? "Eén periode bevat een ongeldige waarde. " : fouten + " periodes bevatten een ongeldige waarde. ") +
      "Vul per periode een getal in tussen 0 en " + EC_PER_JAAR + " EC.";
  }

  function toonOordeel(oordeel, stand) {
    const staart = stand.afgekapt
      ? ' <span class="verdict__noot">Meer dan ' + EC_PER_JAAR +
        " EC per jaar is niet mogelijk. De berekening gebruikt daarom " + EC_PER_JAAR + " EC.</span>"
      : "";

    if (stand.totaal >= DOORSTROOMNORM) {
      const rest = toon(EC_PER_JAAR - stand.totaal);
      oordeel.className = "verdict is-ok";
      oordeel.innerHTML = rest > 0
        ? "Je hebt het <strong>EC-deel van de doorstroomnorm</strong> gehaald. Nog " + nl(rest) +
          " EC te gaan voor de volledige propedeuse. Voor ICT 2026-2027 moet je daarnaast " +
          "taalniveau 3F aantonen." + staart
        : "Je hebt de volledige propedeuse van " + EC_PER_JAAR + " EC. Voor de doorstroomnorm " +
          "moet je daarnaast taalniveau 3F aantonen." + staart;
      return;
    }

    const tekort = toon(DOORSTROOMNORM - stand.totaal);
    oordeel.className = "verdict";
    oordeel.innerHTML =
      "Je hebt nog <strong>" + nl(tekort) + " EC</strong> nodig voor het EC-deel van de " +
      "doorstroomnorm van " + DOORSTROOMNORM + " EC. Dat is ongeveer " +
      nl(tekort * UREN_PER_EC) + " uur studie. Daarnaast moet je taalniveau 3F aantonen. " +
      "Bespreek je voortgang op tijd met je studiebegeleider." + staart;
  }

  function init() {
    const widget = document.querySelector("[data-ec-calculator]");
    if (!widget) return;

    const velden = Array.prototype.slice.call(widget.querySelectorAll("[data-ec-periode]"));
    const vulling = widget.querySelector("[data-ec-fill]");
    const totaalEl = widget.querySelector("[data-ec-totaal]");
    const urenEl = widget.querySelector("[data-ec-uren]");
    const oordeel = widget.querySelector("[data-ec-oordeel]");
    const marker = widget.querySelector("[data-ec-marker]");

    if (!velden.length || !vulling || !totaalEl || !urenEl || !oordeel) return;

    if (marker) marker.style.left = (DOORSTROOMNORM / EC_PER_JAAR * 100) + "%";

    function bereken() {
      const stand = lees(velden);

      if (stand.fouten) {
        vulling.style.width = "0%";
        totaalEl.textContent = "0";
        urenEl.textContent = "0";
        vulling.parentNode.setAttribute("aria-valuenow", "0");
        toonOngeldig(oordeel, stand.fouten);
        return;
      }

      vulling.style.width = (stand.totaal / EC_PER_JAAR * 100) + "%";
      vulling.parentNode.setAttribute("aria-valuenow", String(stand.totaal));
      totaalEl.textContent = nl(stand.totaal);
      urenEl.textContent = nl(stand.totaal * UREN_PER_EC);
      toonOordeel(oordeel, stand);
    }

    velden.forEach(function (veld) {
      veld.addEventListener("input", bereken);
      veld.addEventListener("blur", function () {
        const ruw = veld.value.trim();
        const waarde = getal(ruw);
        if (ruw.indexOf(",") !== -1 && isFinite(waarde)) {
          veld.value = nl(waarde);
          bereken();
        }
      });
    });

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
