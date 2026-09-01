(function () {
  "use strict";

  const GEBOUWEN = {
    R26: { naam: "Ruitenberglaan 26", adres: "Ruitenberglaan 26, 6826 CC Arnhem" },
    R27: { naam: "Ruitenberglaan 27", adres: "Ruitenberglaan 27, 6826 CC Arnhem" },
    R29: { naam: "Ruitenberglaan 29", adres: "Ruitenberglaan 29, 6826 CC Arnhem" },
    R31: { naam: "Ruitenberglaan 31", adres: "Ruitenberglaan 31, 6826 CC Arnhem" },
    PM3: { naam: "Prof. Molkenboerstraat 3", adres: "Prof. Molkenboerstraat 3, 6524 RN Nijmegen" }
  };

  function verdiepingNaam(nummer) {
    const namen = {
      0: "begane grond",
      1: "eerste verdieping",
      2: "tweede verdieping",
      3: "derde verdieping",
      4: "vierde verdieping",
      5: "vijfde verdieping",
      6: "zesde verdieping"
    };
    return namen[nummer] || "verdieping " + nummer;
  }

  function leesCode(waarde) {
    const schoon = waarde.toUpperCase().trim().replace(/\\/g, "/").replace(/\s+/g, "");
    const resultaat = schoon.match(/^(R26|R27|R29|R31|PM3)[\/-]?([A-Z])(\d)\.?([0-9]{1,3})$/);
    if (!resultaat) return null;

    return {
      gebouw: resultaat[1],
      vleugel: resultaat[2],
      verdieping: Number(resultaat[3]),
      nummer: resultaat[4].padStart(2, "0")
    };
  }

  function veiligeTekst(tekst) {
    return String(tekst)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toonRoute(code, resultaat) {
    const gebouw = GEBOUWEN[code.gebouw];
    const lokaal = code.vleugel + code.verdieping + "." + code.nummer;
    const volledig = code.gebouw + "/" + lokaal;
    const verdieping = verdiepingNaam(code.verdieping);
    const omhoog = code.verdieping === 0
      ? "Blijf op de begane grond. Je hoeft geen trap of lift te nemen."
      : "Zoek de trap of lift en ga naar de " + verdieping + ".";

    resultaat.innerHTML =
      '<div class="answer">' +
        '<p class="answer__cat">Jouw route</p>' +
        '<h2 tabindex="-1">Zo kom je bij ' + veiligeTekst(volledig) + '</h2>' +
      '</div>' +
      '<ul class="roomfinder__summary" aria-label="Uitleg van de lokaalcode">' +
        '<li><small>Gebouw</small><strong>' + veiligeTekst(code.gebouw) + '</strong></li>' +
        '<li><small>Vleugel</small><strong>' + veiligeTekst(code.vleugel) + '</strong></li>' +
        '<li><small>Verdieping</small><strong>' + veiligeTekst(String(code.verdieping)) + '</strong></li>' +
        '<li><small>Deur</small><strong>' + veiligeTekst(lokaal) + '</strong></li>' +
      '</ul>' +
      '<ol class="steps">' +
        '<li><strong>Ga naar ' + veiligeTekst(gebouw.naam) + '</strong><p>Het volledige adres is ' + veiligeTekst(gebouw.adres) + '.</p></li>' +
        '<li><strong>Ga het gebouw naar binnen</strong><p>Kijk buiten eerst goed of het nummer ' + veiligeTekst(code.gebouw.replace(/\D/g, "")) + ' op het gebouw staat.</p></li>' +
        '<li><strong>Zoek de letter ' + veiligeTekst(code.vleugel) + '</strong><p>Volg binnen de bordjes en pijlen naar vleugel ' + veiligeTekst(code.vleugel) + '.</p></li>' +
        '<li><strong>Ga naar de ' + veiligeTekst(verdieping) + '</strong><p>' + veiligeTekst(omhoog) + '</p></li>' +
        '<li><strong>Zoek deur ' + veiligeTekst(lokaal) + '</strong><p>Kijk naar de bordjes naast de deuren. Loop door totdat je ' + veiligeTekst(lokaal) + ' ziet.</p></li>' +
      '</ol>' +
      '<div class="roomfinder__question">' +
        '<p><strong>Verdwaald?</strong> Laat bij de receptie deze zin zien:<br>“Waar is lokaal ' + veiligeTekst(lokaal) + '?”</p>' +
      '</div>' +
      '<div class="callout u-mt24"><p><strong>Goed om te weten:</strong> dit legt de lokaalcode uit. Zonder actuele verdiepingsplattegrond kan HANDIG_ niet betrouwbaar zeggen welke gang of deur je precies moet nemen.</p></div>';

    const kop = resultaat.querySelector("h2");
    if (kop) kop.focus();
  }

  function init() {
    const formulier = document.querySelector("[data-roomfinder-form]");
    const invoer = document.querySelector("[data-roomfinder-input]");
    const resultaat = document.querySelector("[data-roomfinder-result]");
    if (!formulier || !invoer || !resultaat) return;

    function zoek(waarde) {
      const code = leesCode(waarde);
      invoer.setAttribute("aria-invalid", String(!code));

      if (!code) {
        resultaat.innerHTML = '<p class="roomfinder__error" role="alert"><strong>Die code herken ik niet.</strong><br>Vul eerst het gebouw in, dan een schuine streep en daarna het lokaal. Bijvoorbeeld: <strong>R26/B2.40</strong>.</p>';
        invoer.focus();
        return;
      }

      toonRoute(code, resultaat);
    }

    formulier.addEventListener("submit", function (event) {
      event.preventDefault();
      zoek(invoer.value);
    });

    document.querySelectorAll("[data-room-example]").forEach(function (knop) {
      knop.addEventListener("click", function () {
        invoer.value = knop.getAttribute("data-room-example") || "";
        zoek(invoer.value);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
