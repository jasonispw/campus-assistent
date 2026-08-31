(function () {
  "use strict";

  const STOPWOORDEN = new Set((
    "de het een en of van voor met op in is zijn ik mijn me je jouw " +
    "wat waar hoe wanneer wie waarom moet moeten kan kun kunnen heb hebben heeft doe doen " +
    "naar bij dat die dit deze er te als om ook nog wel niet maar dan aan uit over al " +
    "ben was word worden mij we wij jij zich"
  ).split(" "));

  // Woorden die studenten typen, vertaald naar de termen die in de kennisbank staan.
  const SYNONIEMEN = {
    "cijfer": "cijfers resultaten", "cijfers": "resultaten",
    "punt": "studiepunten ec", "punten": "studiepunten ec", "ects": "ec studiepunten",
    "mail": "e-mail outlook", "email": "e-mail outlook", "mailbox": "outlook",
    "les": "rooster", "lessen": "rooster", "college": "rooster", "vak": "rooster",
    "lokaal": "rooster locatie", "klas": "rooster locatie",
    "ziek": "bijzondere omstandigheden decaan", "ziekte": "bijzondere omstandigheden decaan",
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
    "eerstejaar": "eerste jaar propedeuse", "jaar1": "eerste jaar propedeuse"
  };


  function normaliseer(tekst) {
    return (tekst || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokens(tekst) {
    const uitgebreid = [];

    normaliseer(tekst).split(" ").filter(Boolean).forEach(function (woord) {
      uitgebreid.push(woord);
      if (SYNONIEMEN[woord]) uitgebreid.push(...SYNONIEMEN[woord].split(" "));
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
      // Eén kapot item mag de rest van de kennisbank niet meeslepen.
      if (!item || !item.titel || !Array.isArray(item.trefwoorden)) return lijst;

      lijst.push({
        item: item,
        titel: normaliseer(item.titel),
        trefwoorden: item.trefwoorden.map(normaliseer),
        tekst: plattetekst(item)
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


  function scoor(rij, vraag, vraagtokens) {
    let score = 0;

    rij.trefwoorden.forEach(function (trefwoord) {
      if (!trefwoord || vraag.indexOf(trefwoord) === -1) return;
      score += 8 + trefwoord.split(" ").length * 2;
    });

    vraagtokens.forEach(function (woord) {
      if (rij.trefwoorden.some(t => t.split(" ").indexOf(woord) !== -1)) score += 5;
      if (rij.titel.indexOf(woord) !== -1) score += 3;
      if (rij.tekst.indexOf(woord) !== -1) score += 1;
      if (woord.length >= 4 && rij.tekst.indexOf(" " + woord) !== -1) score += 1;
    });

    return score;
  }

  function zoek(vraag) {
    const genormaliseerd = normaliseer(vraag);
    if (genormaliseerd.length < 2) return [];

    const vraagtokens = tokens(vraag);

    return INDEX
      .map(rij => ({ item: rij.item, score: scoor(rij, genormaliseerd, vraagtokens) }))
      .filter(treffer => treffer.score > 3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }


  function antwoordHtml(item) {
    const bron = item.bron && item.bron.url
      ? '<p class="bron"><a href="' + item.bron.url + '" target="_blank" rel="noopener">' +
        item.bron.label + ' <svg class="icon"><use href="#i-arrow-right"></use></svg></a></p>'
      : "";

    return '<article class="answer">' +
      '<p class="answer__cat">' + item.categorie + "</p>" +
      "<h3>" + item.titel + "</h3>" +
      item.body +
      bron +
      "</article>";
  }

  function geenAntwoordHtml(vraag) {
    return '<div class="assist__empty">' +
      '<h3><svg class="icon icon--pink"><use href="#i-info"></use></svg> Daar heb ik geen antwoord op</h3>' +
      "<p>Over <code>" + normaliseer(vraag) + "</code> staat niets in de assistent. " +
      "Probeer andere woorden, of ga rechtstreeks naar:</p>" +
      "<ul>" +
      "<li>Je studiebegeleider, je eerste aanspreekpunt bij de opleiding.</li>" +
      '<li><a href="https://www1.han.nl/insite/" target="_blank" rel="noopener">HAN Insite</a> ' +
      "voor opleidingsinformatie, regelingen en voorzieningen.</li>" +
      '<li><a href="https://www.han.nl/contact/" target="_blank" rel="noopener">han.nl/contact</a> ' +
      "voor vragen aan de HAN zelf.</li>" +
      "</ul></div>";
  }

  function storingHtml() {
    return '<div class="assist__empty">' +
      '<h3><svg class="icon icon--pink"><use href="#i-alert"></use></svg> De assistent is even niet beschikbaar</h3>' +
      "<p>Er ging iets mis bij het laden. Ververs de pagina, of gebruik het menu bovenaan om " +
      "rechtstreeks naar een onderwerp te gaan.</p>" +
      '<p><a class="btn btn--outline btn--sm" href="systemen.html">Bekijk alle onderwerpen ' +
      '<svg class="icon"><use href="#i-arrow-right"></use></svg></a></p></div>';
  }

  const SPINNER =
    '<div class="laden" role="status">' +
    '<svg class="spinner" aria-hidden="true"><use href="#i-spinner"></use></svg>' +
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

    function toon(vraag) {
      clearTimeout(bezig);
      resultaten.setAttribute("aria-busy", "true");
      resultaten.innerHTML = SPINNER;
      if (teller) teller.textContent = "zoeken...";

      // Even wachten, anders flitst de spinner voorbij en lijkt er niets te gebeuren.
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
      toon(input.value);
    });

    let wachten;
    input.addEventListener("input", function () {
      clearTimeout(wachten);
      const waarde = input.value;
      wachten = setTimeout(function () {
        if (waarde.trim().length >= 3) toon(waarde);
      }, 180);
    });

    document.querySelectorAll("[data-assist-chip]").forEach(function (chip) {
      chip.addEventListener("click", function () {
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

    const totaal = document.querySelector("[data-kb-total]");
    if (totaal) totaal.textContent = KB.length;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
