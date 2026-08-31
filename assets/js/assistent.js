(function () {
  "use strict";

  const STOPWOORDEN = new Set((
    "de het een en of van voor met op in is zijn ik mijn me je jouw " +
    "wat waar hoe wanneer wie waarom moet moeten kan kun kunnen heb hebben heeft doe doen " +
    "naar bij dat die dit deze er te als om ook nog wel niet maar dan aan uit over al " +
    "ben was word worden mij we wij jij zich hoeveel welke welk zo eens even echt"
  ).split(" "));

  const ALGEMENE_WOORDEN = new Set((
    "student studenten studie jaar jaren eerste vraag vragen hulp nodig klein kans plek groep " +
    "informatie regeling regel regels ding dingen probleem problemen"
  ).split(" "));

  const SYNONIEMEN = {
    "cijfer": "cijfers resultaten", "cijfers": "resultaten",
    "punt": "studiepunten ec", "punten": "studiepunten ec", "ects": "ec studiepunten",
    "mail": "e-mail outlook", "email": "e-mail outlook", "mailbox": "outlook",
    "les": "rooster", "lessen": "rooster", "college": "rooster", "vak": "rooster",
    "lokaal": "rooster locatie", "klas": "rooster locatie",
    "geld": "financieel decaan", "collegegeld": "financieel decaan",
    "wachtwoord": "hanaccount inloggen", "inlog": "inloggen hanaccount",
    "vastgelopen": "hulp studiebegeleider", "vastloop": "hulp studiebegeleider",
    "stress": "psycholoog", "faalangst": "psycholoog", "somber": "psycholoog",
    "voel": "psycholoog somber", "voelen": "psycholoog somber", "rot": "psycholoog somber",
    "eenzaam": "psycholoog somber", "heimwee": "psycholoog somber",
    "piekeren": "psycholoog stress", "piekeer": "psycholoog stress",
    "slaap": "psycholoog stress", "slapen": "psycholoog stress",
    "stoppen": "uitschrijven decaan studiebegeleider", "studieadviseur": "studiebegeleider",
    "verenigingen": "studievereniging", "borrel": "studievereniging activiteiten",
    "kamerzoeken": "kamer wonen", "huisvesting": "wonen kamer",
    "toets": "tentamen toets", "toetsen": "tentamen toets", "examen": "tentamen",
    "leeromgeving": "brightspace", "schoolwerk": "brightspace",
    "lever": "inleveren opdracht", "leveren": "inleveren opdracht", "verslag": "inleveren opdracht",
    "zelfstandig": "zelfstudieplek", "plek": "zelfstudieplek", "plekken": "zelfstudieplek",
    "eerstejaar": "eerste jaar propedeuse", "jaar1": "eerste jaar propedeuse",
    "ziek": "ziekmelden bijzondere omstandigheden", "ziekte": "ziekmelden bijzondere omstandigheden",
    "beter": "ziekmelden", "griep": "ziekmelden",
    "gezakt": "herkansing", "onvoldoende": "herkansing", "gehaald": "herkansing",
    "herkans": "herkansing", "hertentamen": "herkansing", "herexamen": "herkansing",
    "vakanties": "vakantie jaarrooster", "vrij": "vakantie jaarrooster",
    "reisproduct": "ov studiefinanciering", "stufi": "studiefinanciering",
    "beurs": "studiefinanciering decaan", "lening": "studiefinanciering",
    "klacht": "klachten vertrouwenspersoon", "pesten": "ongewenst gedrag vertrouwenspersoon",
    "vrijstellingen": "vrijstelling examencommissie",
    "wanhopig": "acuut crisis", "zelfmoord": "acuut crisis", "suicide": "acuut crisis"
  };

  const SPLITSBAAR = {
    "schrijf": { "uit": "uitschrijven", "in": "inschrijven" },
    "schrijven": { "uit": "uitschrijven", "in": "inschrijven" },
    "meld": { "ziek": "ziekmelden", "af": "afmelden" },
    "melden": { "ziek": "ziekmelden", "af": "afmelden" },
    "teken": { "in": "intekenen" },
    "tekenen": { "in": "intekenen" },
    "lever": { "in": "inleveren" },
    "leveren": { "in": "inleveren" },
    "log": { "in": "inloggen" }
  };

  const CRISIS = [
    "wil niet meer leven", "wil er niet meer zijn", "niet meer leven", "einde aan mijn leven",
    "zelfmoord", "zelfdoding", "suicide", "suicidaal", "maak er een eind aan",
    "doe mezelf iets aan", "ik zie het niet meer zitten"
  ];

  function normaliseer(tekst) {
    return (tekst || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function omspatie(tekst) {
    return " " + tekst + " ";
  }

  function tokens(tekst) {
    const woorden = normaliseer(tekst).split(" ").filter(Boolean);
    const uitgebreid = [];

    woorden.forEach(function (woord, i) {
      uitgebreid.push(woord);

      if (SYNONIEMEN[woord]) uitgebreid.push(...SYNONIEMEN[woord].split(" "));

      const paren = SPLITSBAAR[woord];
      if (paren) {
        woorden.slice(i + 1).forEach(function (later) {
          if (paren[later]) uitgebreid.push(paren[later]);
        });
      }
    });

    return uitgebreid.filter(woord => !STOPWOORDEN.has(woord) && woord.length > 1);
  }

  function plattetekst(item) {
    const houder = document.createElement("div");
    houder.innerHTML = item.body;

    return normaliseer(
      item.titel + " " + item.categorie + " " +
      item.trefwoorden.join(" ") + " " + (houder.textContent || "")
    );
  }

  function bouwIndex() {
    if (typeof KB === "undefined" || !Array.isArray(KB)) return [];

    return KB.reduce(function (lijst, item) {
      if (!item || !item.titel || !Array.isArray(item.trefwoorden)) return lijst;

      lijst.push({
        item: item,
        titel: omspatie(normaliseer(item.titel)),
        trefwoorden: item.trefwoorden.map(normaliseer).filter(Boolean),
        tekst: omspatie(plattetekst(item))
      });
      return lijst;
    }, []);
  }

  let INDEX = [];
  try {
    INDEX = bouwIndex();
  } catch (fout) {
    INDEX = [];
  }

  function bevatWoord(hooiberg, naald) {
    return hooiberg.indexOf(" " + naald + " ") !== -1;
  }

  function scoor(rij, vraag, vraagtokens) {
    let score = 0;

    rij.trefwoorden.forEach(function (trefwoord) {
      if (!bevatWoord(vraag, trefwoord)) return;
      score += 40 + trefwoord.split(" ").length * 10;
    });

    vraagtokens.forEach(function (woord) {
      const trefwoordTreffer = rij.trefwoorden.some(function (trefwoord) {
        if (trefwoord.indexOf(" ") === -1) return trefwoord === woord;
        return woord.length >= 5 && !ALGEMENE_WOORDEN.has(woord) &&
          trefwoord.split(" ").indexOf(woord) !== -1;
      });

      if (trefwoordTreffer) score += 5;
      if (bevatWoord(rij.titel, woord)) score += 3;
      if (bevatWoord(rij.tekst, woord)) score += 1;
    });

    return score;
  }

  function isCrisis(vraag) {
    return CRISIS.some(zin => vraag.indexOf(zin) !== -1);
  }

  function acuutItem() {
    if (typeof KB_ACUTE_ID === "undefined") return null;
    const rij = INDEX.filter(r => r.item.id === KB_ACUTE_ID)[0];
    return rij ? rij.item : null;
  }

  function isAcuutItem(item) {
    return typeof KB_ACUTE_ID !== "undefined" && item.id === KB_ACUTE_ID;
  }

  function zoek(vraag) {
    const genormaliseerd = normaliseer(vraag);
    if (genormaliseerd.length < 2) return [];

    const omspatied = omspatie(genormaliseerd);
    const vraagtokens = tokens(vraag);

    const treffers = INDEX
      .map(rij => ({ item: rij.item, score: scoor(rij, omspatied, vraagtokens) }))
      .filter(treffer => treffer.score > 3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (!isCrisis(omspatied)) return treffers;

    const acuut = acuutItem();
    if (!acuut) return treffers;

    return [{ item: acuut, score: 999 }]
      .concat(treffers.filter(t => t.item.id !== acuut.id))
      .slice(0, 3);
  }

  const ACUTE_REGEL =
    '<p class="answer__acuut">Kan het niet wachten? Bel je huisarts of de huisartsenpost, of ' +
    'neem dag en nacht contact op met 113 Zelfmoordpreventie via ' +
    '<a href="tel:113"><strong>113</strong></a>, <a href="tel:08000113"><strong>0800 0113</strong></a> ' +
    'of <a href="https://www.113.nl/" target="_blank" rel="noopener">113.nl</a>.</p>';

  function antwoordHtml(item) {
    const bron = item.bron && item.bron.url
      ? '<p class="bron"><a href="' + item.bron.url + '" target="_blank" rel="noopener">' +
        item.bron.label + ' <svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"></use></svg></a></p>'
      : "";

    const acuut = item.id === "psycholoog" && !isAcuutItem(item) ? ACUTE_REGEL : "";

    return '<article class="answer">' +
      '<p class="answer__cat">' + item.categorie + "</p>" +
      "<h3>" + item.titel + "</h3>" +
      item.body +
      acuut +
      bron +
      "</article>";
  }

  function geenAntwoordHtml(vraag) {
    const term = normaliseer(vraag);
    const over = term ? "Over <code>" + term + "</code> staat" : "Daarover staat";

    return '<div class="assist__empty">' +
      '<h3><svg class="icon icon--pink" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg> Daar heb ik geen antwoord op</h3>' +
      "<p>" + over + " niets in de assistent. " +
      "Probeer andere woorden, of ga rechtstreeks naar:</p>" +
      "<ul>" +
      "<li>Je studiebegeleider, je eerste aanspreekpunt bij de opleiding.</li>" +
      '<li><a href="https://www1.han.nl/insite/" target="_blank" rel="noopener">HAN Insite</a> ' +
      "voor opleidingsinformatie, regelingen en voorzieningen.</li>" +
      '<li><a href="https://www.han.nl/contact/" target="_blank" rel="noopener">han.nl/contact</a> ' +
      "voor vragen aan de HAN zelf.</li>" +
      "</ul></div>";
  }

  function beginHtml() {
    return '<div class="assist__empty">' +
      "<p>Klik op een voorbeeldvraag hierboven, of typ je eigen vraag.</p></div>";
  }

  function storingHtml() {
    return '<div class="assist__empty">' +
      '<h3><svg class="icon icon--pink" aria-hidden="true" focusable="false"><use href="#i-alert"></use></svg> De assistent is even niet beschikbaar</h3>' +
      "<p>Er ging iets mis bij het laden. Ververs de pagina, of gebruik het menu bovenaan om " +
      "rechtstreeks naar een onderwerp te gaan.</p>" +
      '<p><a class="btn btn--outline btn--sm" href="systemen.html">Bekijk alle onderwerpen ' +
      '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-arrow-right"></use></svg></a></p></div>';
  }

  const SPINNER =
    '<div class="laden" role="status">' +
    '<svg class="spinner" aria-hidden="true" focusable="false"><use href="#i-spinner"></use></svg>' +
    "<span>Zoeken in de assistent...</span></div>";

  function toonStoring(resultaten, teller) {
    resultaten.innerHTML = storingHtml();
    resultaten.setAttribute("aria-busy", "false");
    if (teller) teller.textContent = "niet beschikbaar";
  }

  function tellerTekst(aantal) {
    if (!aantal) return "geen antwoord";
    return aantal + (aantal === 1 ? " antwoord" : " antwoorden");
  }

  function bindZoeken(form, input, resultaten, teller) {
    let bezig;
    let wachten;

    function herstel() {
      clearTimeout(bezig);
      resultaten.setAttribute("aria-busy", "false");
      resultaten.innerHTML = beginHtml();
      if (teller) teller.textContent = "klaar voor je vraag";
    }

    function toon(vraag) {
      clearTimeout(bezig);

      if (!normaliseer(vraag)) {
        herstel();
        return;
      }

      resultaten.setAttribute("aria-busy", "true");
      resultaten.innerHTML = SPINNER;
      if (teller) teller.textContent = "zoeken...";

      bezig = setTimeout(function () {
        let treffers;
        try {
          treffers = zoek(vraag);
        } catch (fout) {
          toonStoring(resultaten, teller);
          return;
        }

        resultaten.innerHTML = treffers.length
          ? treffers.map(treffer => antwoordHtml(treffer.item)).join("")
          : geenAntwoordHtml(vraag);
        resultaten.setAttribute("aria-busy", "false");
        if (teller) teller.textContent = tellerTekst(treffers.length);
      }, 300);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearTimeout(wachten);
      toon(input.value);
    });

    input.addEventListener("input", function () {
      clearTimeout(wachten);
      const waarde = input.value;

      wachten = setTimeout(function () {
        if (waarde.trim().length >= 3) toon(waarde);
        else herstel();
      }, 180);
    });

    document.querySelectorAll("[data-assist-chip]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        clearTimeout(wachten);
        input.value = chip.dataset.assistChip;
        toon(input.value);
        input.focus();
      });
    });
  }

  function init() {
    const form = document.querySelector("[data-assist-form]");
    if (!form) return;

    const input = form.querySelector("input");
    const resultaten = document.querySelector("[data-assist-results]");
    const teller = document.querySelector("[data-assist-count]");
    if (!input || !resultaten) return;

    if (!INDEX.length) {
      toonStoring(resultaten, teller);
      input.disabled = true;

      const knop = form.querySelector("button");
      if (knop) knop.disabled = true;
      return;
    }

    bindZoeken(form, input, resultaten, teller);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
