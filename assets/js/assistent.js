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

  function veilig(tekst) {
    const houder = document.createElement("div");
    houder.textContent = tekst == null ? "" : String(tekst);
    return houder.innerHTML;
  }

  function icoon(naam, klasse) {
    return '<svg class="' + (klasse || "icon") + '" aria-hidden="true" focusable="false"><use href="#' + naam + '"></use></svg>';
  }

  function kort(titel) {
    const deel = titel.split(":")[0].trim();
    return deel.length > 34 ? deel.slice(0, 33).trim() + "…" : deel;
  }

  const STARTCHIPS = [
    { label: "Waar vind ik mijn rooster?" },
    { label: "Waar staan mijn cijfers?" },
    { label: "Hoeveel punten moet ik halen?", vraag: "Hoeveel studiepunten moet ik het eerste jaar halen?" },
    { label: "Ik kan niet inloggen" },
    { label: "Ik loop vast", vraag: "Ik loop vast in mijn studie, met wie kan ik praten?" }
  ];

  const OPENING =
    "<p><strong>Hoi! Ik ben de assistent van HANDIG_.</strong></p>" +
    "<p>Stel je vraag in gewone taal. Ik zoek in de informatie over systemen, studiepunten, de campus " +
    "en ondersteuning, en zet de bron erbij.</p>" +
    '<p class="bericht__uitleg u-mb0">Waar loop je tegenaan?</p>';

  function geenAntwoordHtml() {
    return "<p><strong>Hier vind ik niets over.</strong> Stel je vraag met andere woorden, of gebruik " +
      "een van deze contactroutes:</p>" +
      "<ul>" +
      "<li>Je studiebegeleider, je eerste aanspreekpunt bij de opleiding.</li>" +
      '<li><a href="https://www1.han.nl/insite/" target="_blank" rel="noopener">HAN Insite</a> ' +
      "voor opleidingsinformatie, regelingen en voorzieningen.</li>" +
      '<li><a href="https://www.han.nl/contact/" target="_blank" rel="noopener">han.nl/contact</a> ' +
      "voor vragen aan de HAN zelf.</li>" +
      "</ul>";
  }

  function storingHtml() {
    return "<p><strong>De assistent is niet beschikbaar.</strong></p>" +
      "<p>De informatie kon niet worden geladen. Ververs de pagina of open een onderwerp via het menu.</p>" +
      '<p class="u-mb0"><a class="btn btn--outline btn--sm" href="systemen.html">Bekijk alle onderwerpen ' +
      icoon("i-arrow-right") + "</a></p>";
  }

  function verwant(item, aantal) {
    if (aantal < 1) return [];

    const zelfde = INDEX.map(rij => rij.item).filter(kandidaat => kandidaat.categorie === item.categorie);
    const start = zelfde.indexOf(item);
    const lijst = [];

    for (let i = 1; i < zelfde.length && lijst.length < aantal; i++) {
      lijst.push(zelfde[(start + i) % zelfde.length]);
    }

    return lijst;
  }

  function onderwerpchips(getoond, anders) {
    const extra = verwant(getoond, 3 - anders.length)
      .filter(item => item !== getoond && anders.indexOf(item) === -1);

    return anders.concat(extra).map(item => ({ label: kort(item.titel), id: item.id }));
  }

  let wortel = null;
  let paneel = null;
  let draad = null;
  let chips = null;
  let invoer = null;
  let verstuur = null;
  let knop = null;
  let status = null;
  let tip = null;

  let geopend = false;
  let begonnen = false;
  let bezig = null;
  let tipTimer = null;

  function bouw() {
    wortel = document.createElement("div");
    wortel.className = "chat";

    wortel.innerHTML =
      '<div class="chat__paneel" id="assistent-paneel" role="dialog" aria-label="Assistent van HANDIG_" hidden>' +
        '<div class="chat__kop">' +
          icoon("i-message", "icon icon--lg") +
          '<span class="chat__titel">' +
            "<strong>HANDIG_</strong>" +
            '<span class="chat__status" data-assist-status>beschikbaar</span>' +
          "</span>" +
          '<button type="button" class="chat__sluit" data-assist-sluit>' + icoon("i-close") +
            '<span class="visually-hidden">Assistent sluiten</span></button>' +
        "</div>" +
        '<div class="chat__draad" data-assist-draad role="log" aria-live="polite" aria-label="Gesprek"></div>' +
        '<div class="chat__chips" data-assist-chips></div>' +
        '<form class="chat__form" data-assist-form autocomplete="off">' +
          '<label class="visually-hidden" for="assist-vraag">Jouw vraag</label>' +
          '<input id="assist-vraag" type="text" enterkeyhint="send" placeholder="Typ je vraag...">' +
          '<button class="btn btn--primary" type="submit">' + icoon("i-arrow-right") +
            '<span class="visually-hidden">Vraag versturen</span></button>' +
        "</form>" +
        '<p class="chat__voet">Antwoorden komen uit de informatie op deze site. Je vraag blijft in je ' +
          'browser. <a href="privacy.html">Privacy</a></p>' +
      "</div>" +
      '<button type="button" class="chat__knop" data-assist-knop aria-expanded="false" ' +
        'aria-controls="assistent-paneel" aria-label="Stel een vraag aan de assistent">' +
        icoon("i-message", "icon icon-message") + icoon("i-close", "icon icon-close") +
        '<span class="chat__knop-tekst">Stel een vraag</span>' +
      "</button>";

    paneel = wortel.querySelector(".chat__paneel");
    draad = wortel.querySelector("[data-assist-draad]");
    chips = wortel.querySelector("[data-assist-chips]");
    status = wortel.querySelector("[data-assist-status]");
    knop = wortel.querySelector("[data-assist-knop]");

    const form = wortel.querySelector("[data-assist-form]");
    invoer = form.querySelector("input");
    verstuur = form.querySelector("button");

    knop.addEventListener("click", function () {
      if (geopend) sluitChat();
      else openChat();
    });

    wortel.querySelector("[data-assist-sluit]").addEventListener("click", sluitChat);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      stel(invoer.value);
    });

    invoer.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;

      e.preventDefault();
      stel(invoer.value);
    });

    document.body.appendChild(wortel);
  }

  function naarBeneden() {
    draad.scrollTop = draad.scrollHeight;
  }

  function naarBericht(bericht) {
    if (bericht.offsetHeight <= draad.clientHeight - 16) {
      naarBeneden();
      return;
    }

    draad.scrollTop += bericht.getBoundingClientRect().top - draad.getBoundingClientRect().top - 8;
  }

  function zetStatus(tekst) {
    status.textContent = tekst;
  }

  function voegBericht(rol, html) {
    const bericht = document.createElement("div");
    bericht.className = "bericht bericht--" + rol;
    bericht.innerHTML = html;

    draad.appendChild(bericht);
    naarBeneden();
    return bericht;
  }

  function zetChips(lijst) {
    chips.innerHTML = "";

    lijst.forEach(function (optie) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = optie.label;

      chip.addEventListener("click", function () {
        if (optie.id) kies(optie.id, optie.label);
        else stel(optie.vraag || optie.label);
      });

      chips.appendChild(chip);
    });
  }

  function denk(klaar) {
    clearTimeout(bezig);
    zetStatus("zoekt...");

    const punten = document.createElement("div");
    punten.className = "chat__typt";
    punten.setAttribute("aria-hidden", "true");
    punten.innerHTML = "<span></span><span></span><span></span>";

    draad.appendChild(punten);
    naarBeneden();

    bezig = setTimeout(function () {
      punten.remove();
      klaar();
    }, 420);
  }

  function toonAntwoord(item, anders) {
    const bericht = voegBericht("bot", antwoordHtml(item));
    zetStatus("beschikbaar");

    zetChips(isAcuutItem(item) ? [] : onderwerpchips(item, anders || []));
    naarBericht(bericht);
  }

  function stel(vraag) {
    const schoon = (vraag || "").trim();
    if (!schoon || !INDEX.length) return;

    voegBericht("jij", "<p>" + veilig(schoon) + "</p>");
    invoer.value = "";
    zetChips([]);

    denk(function () {
      let treffers;

      try {
        treffers = zoek(schoon);
      } catch (fout) {
        voegBericht("bot", storingHtml());
        zetStatus("niet beschikbaar");
        return;
      }

      if (!treffers.length) {
        const bericht = voegBericht("bot", geenAntwoordHtml());
        zetChips(STARTCHIPS);
        zetStatus("geen antwoord");
        naarBericht(bericht);
        return;
      }

      toonAntwoord(treffers[0].item, treffers.slice(1).map(treffer => treffer.item));
    });
  }

  function kies(id, label) {
    const rij = INDEX.filter(regel => regel.item.id === id)[0];
    if (!rij) return;

    voegBericht("jij", "<p>" + veilig(label) + "</p>");
    zetChips([]);

    denk(function () {
      toonAntwoord(rij.item, []);
    });
  }

  function begin() {
    begonnen = true;

    if (!INDEX.length) {
      voegBericht("bot", storingHtml());
      zetStatus("niet beschikbaar");
      invoer.disabled = true;
      verstuur.disabled = true;
      return;
    }

    const bericht = voegBericht("bot", OPENING);
    zetChips(STARTCHIPS);
    naarBericht(bericht);
  }

  function opToets(e) {
    if (e.key !== "Escape" || !geopend) return;

    sluitChat();
    knop.focus();
  }

  function smal() {
    return window.matchMedia("(max-width: 560px)").matches;
  }

  function openChat() {
    verbergTip();
    if (geopend) return;

    geopend = true;
    paneel.hidden = false;
    wortel.classList.add("chat--open");
    knop.classList.add("is-open");
    knop.setAttribute("aria-expanded", "true");
    knop.setAttribute("aria-label", "Assistent sluiten");

    if (smal()) document.body.classList.add("geen-scroll");
    document.addEventListener("keydown", opToets);

    if (!begonnen) begin();

    naarBeneden();
    if (!invoer.disabled) invoer.focus();
  }

  function sluitChat() {
    if (!geopend) return;

    geopend = false;
    paneel.hidden = true;
    wortel.classList.remove("chat--open");
    knop.classList.remove("is-open");
    knop.setAttribute("aria-expanded", "false");
    knop.setAttribute("aria-label", "Stel een vraag aan de assistent");

    document.body.classList.remove("geen-scroll");
    document.removeEventListener("keydown", opToets);
  }

  function verbergTip() {
    clearTimeout(tipTimer);
    tipTimer = null;

    if (!tip) return;

    tip.remove();
    tip = null;
  }

  function toonTip() {
    if (geopend || tip) return;

    if (document.querySelector(".onboarding")) {
      tipTimer = setTimeout(toonTip, 4000);
      return;
    }

    tip = document.createElement("div");
    tip.className = "chat__tip";
    tip.innerHTML =
      '<button type="button" class="chat__tip-tekst">Hoi! Waar loop je tegenaan? Stel je vraag.</button>' +
      '<button type="button" class="chat__tip-sluit">' + icoon("i-close") +
      '<span class="visually-hidden">Tip sluiten</span></button>';

    tip.querySelector(".chat__tip-tekst").addEventListener("click", function () {
      openChat();
    });

    tip.querySelector(".chat__tip-sluit").addEventListener("click", verbergTip);

    wortel.insertBefore(tip, wortel.firstChild);
  }

  function bindPagina() {
    document.querySelectorAll("[data-assist-open]").forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        openChat();
      });
    });

    document.querySelectorAll("[data-assist-chip]").forEach(function (element) {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        openChat();
        stel(element.dataset.assistChip);
      });
    });
  }

  function init() {
    bouw();
    bindPagina();

    window.HANDIG = window.HANDIG || {};
    window.HANDIG.assistent = {
      open: openChat,
      sluit: sluitChat,
      vraag: function (tekst) {
        openChat();
        stel(tekst);
      }
    };

    if (document.querySelector("[data-assist-tip]")) tipTimer = setTimeout(toonTip, 9000);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
