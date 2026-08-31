(function () {
  "use strict";

  function normaliseer(tekst) {
    return (tekst || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  var STOPWOORDEN = new Set(("de het een en of van voor met op in is zijn ik mijn me je jouw " +
    "wat waar hoe wanneer wie waarom moet moeten kan kun kunnen heb hebben heeft doe doen " +
    "naar bij dat die dit deze er te als om ook nog wel niet maar dan aan uit over al").split(" "));

  var SYNONIEMEN = {
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
    "verenigingen": "studievereniging", "borrel": "studievereniging activiteiten",
    "kamerzoeken": "kamer wonen", "huisvesting": "wonen kamer",
    "toets": "tentamen toets", "toetsen": "tentamen toets", "examen": "tentamen",
    "leeromgeving": "brightspace", "schoolwerk": "brightspace",
    "lever": "inleveren opdracht", "leveren": "inleveren opdracht", "verslag": "inleveren opdracht",
    "zelfstandig": "zelfstudieplek", "plek": "zelfstudieplek", "plekken": "zelfstudieplek",
    "eerstejaar": "eerste jaar propedeuse", "jaar1": "eerste jaar propedeuse"
  };

  function tokens(tekst) {
    var basis = normaliseer(tekst).split(" ").filter(Boolean);
    var uitgebreid = [];
    basis.forEach(function (woord) {
      uitgebreid.push(woord);
      if (SYNONIEMEN[woord]) uitgebreid = uitgebreid.concat(SYNONIEMEN[woord].split(" "));
    });
    return uitgebreid.filter(function (w) { return !STOPWOORDEN.has(w) && w.length > 1; });
  }

  function plattetekst(item) {
    var tijdelijk = document.createElement("div");
    tijdelijk.innerHTML = item.body;
    return normaliseer(item.titel + " " + item.categorie + " " +
      item.trefwoorden.join(" ") + " " + (tijdelijk.textContent || ""));
  }

  var INDEX = [];
  try {
    if (typeof KB === "undefined" || !Array.isArray(KB)) throw new Error("kennisbank niet geladen");
    INDEX = KB.reduce(function (lijst, item) {
      if (!item || !item.titel || !Array.isArray(item.trefwoorden)) return lijst;
      lijst.push({
        item: item,
        titel: normaliseer(item.titel),
        trefwoorden: item.trefwoorden.map(normaliseer),
        tekst: plattetekst(item)
      });
      return lijst;
    }, []);
  } catch (fout) {
    INDEX = [];
  }

  function zoek(vraag) {
    var genormaliseerd = normaliseer(vraag);
    if (genormaliseerd.length < 2) return [];
    var vraagtokens = tokens(vraag);

    var treffers = INDEX.map(function (rij) {
      var score = 0;

      rij.trefwoorden.forEach(function (trefwoord) {
        if (trefwoord && genormaliseerd.indexOf(trefwoord) !== -1) {
          score += 8 + trefwoord.split(" ").length * 2;
        }
      });

      vraagtokens.forEach(function (woord) {
        if (rij.trefwoorden.some(function (t) { return t.split(" ").indexOf(woord) !== -1; })) score += 5;
        if (rij.titel.indexOf(woord) !== -1) score += 3;
        if (rij.tekst.indexOf(woord) !== -1) score += 1;
        if (woord.length >= 4 && rij.tekst.indexOf(" " + woord) !== -1) score += 1;
      });

      return { item: rij.item, score: score };
    });

    return treffers
      .filter(function (t) { return t.score > 3; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 3);
  }

  function antwoordHtml(item) {
    var meer = item.bron && item.bron.url
      ? '<p class="bron"><a href="' + item.bron.url + '" target="_blank" rel="noopener">' +
        item.bron.label + ' <svg class="icon"><use href="#i-arrow-right"></use></svg></a></p>'
      : "";

    return '<article class="answer">' +
      '<p class="answer__cat">' + item.categorie + '</p>' +
      '<h3>' + item.titel + '</h3>' +
      item.body +
      meer +
      '</article>';
  }

  function geenAntwoordHtml(vraag) {
    return '<div class="assist__empty">' +
      '<h3><svg class="icon icon--pink"><use href="#i-info"></use></svg> Daar heb ik geen antwoord op</h3>' +
      '<p>Over <code>' + normaliseer(vraag) + '</code> staat niets in de assistent. ' +
      'Probeer andere woorden, of ga rechtstreeks naar:</p>' +
      '<ul>' +
      '<li>Je studiebegeleider, je eerste aanspreekpunt bij de opleiding.</li>' +
      '<li><a href="https://www1.han.nl/insite/" target="_blank" rel="noopener">HAN Insite</a> ' +
      'voor opleidingsinformatie, regelingen en voorzieningen.</li>' +
      '<li><a href="https://www.han.nl/contact/" target="_blank" rel="noopener">han.nl/contact</a> ' +
      'voor vragen aan de HAN zelf.</li>' +
      '</ul></div>';
  }

  var SPINNER =
    '<div class="laden" role="status">' +
    '<svg class="spinner" aria-hidden="true"><use href="#i-spinner"></use></svg>' +
    '<span>Zoeken in de assistent...</span></div>';

  function storingHtml() {
    return '<div class="assist__empty">' +
      '<h3><svg class="icon icon--pink"><use href="#i-alert"></use></svg> De assistent is even niet beschikbaar</h3>' +
      '<p>Er ging iets mis bij het laden. Ververs de pagina, of gebruik het menu bovenaan om ' +
      'rechtstreeks naar een onderwerp te gaan.</p>' +
      '<p><a class="btn btn--outline btn--sm" href="systemen.html">Bekijk alle onderwerpen ' +
      '<svg class="icon"><use href="#i-arrow-right"></use></svg></a></p></div>';
  }

  function init() {
    var form = document.querySelector("[data-assist-form]");
    if (!form) return;

    var input = form.querySelector("input");
    var resultaten = document.querySelector("[data-assist-results]");
    var teller = document.querySelector("[data-assist-count]");
    var knop = form.querySelector("button");
    var bezig;

    if (!input || !resultaten) return;

    if (!INDEX.length) {
      resultaten.innerHTML = storingHtml();
      if (teller) teller.textContent = "niet beschikbaar";
      input.disabled = true;
      if (knop) knop.disabled = true;
      return;
    }

    function toon(vraag) {
      clearTimeout(bezig);
      resultaten.setAttribute("aria-busy", "true");
      resultaten.innerHTML = SPINNER;
      if (teller) teller.textContent = "zoeken...";

      bezig = setTimeout(function () {
        var treffers;
        try {
          treffers = zoek(vraag);
        } catch (fout) {
          resultaten.innerHTML = storingHtml();
          if (teller) teller.textContent = "niet beschikbaar";
          resultaten.setAttribute("aria-busy", "false");
          return;
        }
        resultaten.innerHTML = treffers.length
          ? treffers.map(function (t) { return antwoordHtml(t.item); }).join("")
          : geenAntwoordHtml(vraag);
        if (teller) {
          teller.textContent = treffers.length
            ? treffers.length + (treffers.length === 1 ? " antwoord" : " antwoorden")
            : "geen antwoord";
        }
        resultaten.setAttribute("aria-busy", "false");
      }, 300);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      toon(input.value);
    });

    var wachten;
    input.addEventListener("input", function () {
      clearTimeout(wachten);
      var waarde = input.value;
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

    var totaal = document.querySelector("[data-kb-total]");
    if (totaal) totaal.textContent = KB.length;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
