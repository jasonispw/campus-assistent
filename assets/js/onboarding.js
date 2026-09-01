(function () {
  "use strict";

  const SLEUTEL_PROFIEL = "handig-profiel";
  const SLEUTEL_TAKEN = "handig-checklist";

  const LOCATIES = {
    arnhem: { naam: "Arnhem", adres: "Ruitenberglaan 26, 6826 CC", extra: "B- en C-vleugel" },
    nijmegen: { naam: "Nijmegen", adres: "Prof. Molkenboerstraat 3, 6524 RN", extra: "" }
  };

  const PROFIELEN = {
    software: "Software &amp; Robotics",
    data: "Data &amp; AI",
    infra: "Infra &amp; Cybersecurity"
  };

  const KLASSEN = {
    "1": ["ICT-1A", "ICT-1B", "ICT-1C", "ICT-1D"],
    "2": ["ICT-2A", "ICT-2B", "ICT-2C", "ICT-2D"],
    "3": ["ICT-3A", "ICT-3B", "ICT-3C", "ICT-3D"],
    "4": ["ICT-4A", "ICT-4B", "ICT-4C", "ICT-4D"]
  };

  const TAKEN = [
    { id: "account", tekst: "HANaccount activeren", uitleg: "Je inloggegevens krijg je per e-mail zodra je inschrijving rond is.", icoon: "i-key" },
    { id: "mfa", tekst: "Microsoft Authenticator installeren", uitleg: "Nodig voor multifactor-authenticatie op alle HAN-systemen.", icoon: "i-key" },
    { id: "wifi", tekst: "Eduroam-wifi instellen", uitleg: "Via de geteduroam-app, met je HANaccount.", icoon: "i-wifi" },
    { id: "brightspace", tekst: "Brightspace openen", uitleg: "leren.han.nl: leermateriaal en berichten van docenten.", icoon: "i-book", link: "https://leren.han.nl" },
    { id: "osiris", tekst: "Osiris openen of de app installeren", uitleg: "Je cijfers en het intekenen voor toetsen.", icoon: "i-certificate", link: "https://han.osiris-student.nl/#/login" },
    { id: "rooster", tekst: "Je rooster bekijken in MyX", uitleg: "myx-han.xedule.nl, inloggen met je HANaccount.", icoon: "i-calendar", link: "https://myx-han.xedule.nl/" },
    { id: "mail", tekst: "HAN-mail checken in Outlook", uitleg: "Belangrijke berichten over je inschrijving komen hier binnen.", icoon: "i-mail", link: "https://office365.han.nl" },
    { id: "slb", tekst: "Uitzoeken wie je studiebegeleider is", uitleg: "Je eerste aanspreekpunt bij de opleiding.", icoon: "i-user", link: "hulp.html" }
  ];

  const STAPPEN = ["locatie", "opleiding", "jaar", "klas", "checklist"];

  const FOCUSBAAR = "button:not([disabled]), a[href], input, select, [tabindex]:not([tabindex='-1'])";

  function leesProfiel() {
    try {
      const ruw = localStorage.getItem(SLEUTEL_PROFIEL);
      return ruw ? JSON.parse(ruw) : null;
    } catch (fout) {
      return null;
    }
  }

  function bewaarProfiel(profiel) {
    try {
      localStorage.setItem(SLEUTEL_PROFIEL, JSON.stringify(profiel));
      return true;
    } catch (fout) {
      return false;
    }
  }

  function leesTaken() {
    try {
      const ruw = localStorage.getItem(SLEUTEL_TAKEN);
      return ruw ? JSON.parse(ruw) : {};
    } catch (fout) {
      return {};
    }
  }

  function bewaarTaken(taken) {
    try {
      localStorage.setItem(SLEUTEL_TAKEN, JSON.stringify(taken));
      return true;
    } catch (fout) {
      return false;
    }
  }

  function veilig(tekst) {
    const houder = document.createElement("div");
    houder.textContent = tekst == null ? "" : String(tekst);
    return houder.innerHTML;
  }

  function icoon(naam, klasse) {
    return '<svg class="' + (klasse || "icon") + '" aria-hidden="true" focusable="false"><use href="#' + naam + '"></use></svg>';
  }

  function profielTekst(profiel) {
    const delen = [];

    if (profiel.locatie && LOCATIES[profiel.locatie]) delen.push(LOCATIES[profiel.locatie].naam);

    if (profiel.opleiding === "ict-voltijd") delen.push("ICT voltijd");
    else if (profiel.opleiding === "ict-deeltijd") delen.push("ICT deeltijd");
    else if (profiel.opleiding === "anders") delen.push("HAN");

    if (profiel.jaar) delen.push("jaar " + profiel.jaar);
    if (profiel.klas) delen.push(profiel.klas);

    return delen.join(" · ");
  }

  let concept = {};
  let stapIndex = 0;
  let overlay = null;
  let paneel = null;
  let opener = null;
  let autoTimer = null;

  function keuzeknoppen(veld, opties) {
    const knoppen = opties.map(function (optie) {
      const gekozen = concept[veld] === optie.waarde;

      return '<button type="button" class="onboarding__optie' + (gekozen ? " is-gekozen" : "") + '"' +
        ' aria-pressed="' + gekozen + '"' +
        ' data-waarde="' + veld + ":" + optie.waarde + '">' +
        (optie.icoon ? icoon(optie.icoon, "icon icon--lg") : "") +
        "<strong>" + optie.titel + "</strong>" +
        (optie.sub ? "<small>" + optie.sub + "</small>" : "") +
        "</button>";
    }).join("");

    return '<div class="onboarding__opties">' + knoppen + "</div>";
  }

  function stapLocatie() {
    return "<h2>Op welke locatie studeer je?</h2>" +
      "<p>Dan laten we de juiste adressen en routes zien.</p>" +
      keuzeknoppen("locatie", [
        { waarde: "arnhem", titel: "Arnhem", sub: LOCATIES.arnhem.adres, icoon: "i-map-pin" },
        { waarde: "nijmegen", titel: "Nijmegen", sub: LOCATIES.nijmegen.adres, icoon: "i-map-pin" }
      ]);
  }

  function stapOpleiding() {
    return "<h2>Welke opleiding volg je?</h2>" +
      "<p>De assistent is gemaakt voor ICT, maar de systemen en regelingen gelden breder.</p>" +
      keuzeknoppen("opleiding", [
        { waarde: "ict-voltijd", titel: "ICT voltijd", sub: "4 jaar, 240 EC", icoon: "i-laptop" },
        { waarde: "ict-deeltijd", titel: "ICT deeltijd", sub: "naast je werk", icoon: "i-briefcase" },
        { waarde: "anders", titel: "Een andere opleiding", sub: "bij de HAN", icoon: "i-school" }
      ]);
  }

  function profielKeuzeHtml() {
    if (!concept.jaar || concept.jaar === "1") return "";

    const opties = Object.keys(PROFIELEN).map(function (sleutel) {
      const gekozen = concept.profiel === sleutel ? " selected" : "";
      return '<option value="' + sleutel + '"' + gekozen + ">" + PROFIELEN[sleutel] + "</option>";
    }).join("");

    return '<div class="onboarding__extra">' +
      '<label for="ob-profiel">Welk profiel volg je?</label>' +
      '<select id="ob-profiel" data-veld="profiel">' +
      '<option value="">Kies je profiel</option>' + opties +
      "</select></div>";
  }

  function stapJaar() {
    return "<h2>In welk jaar zit je?</h2>" +
      "<p>Voor ICT in 2026-2027 geldt in jaar 1 een doorstroomnorm van 40 EC en taalniveau 3F.</p>" +
      keuzeknoppen("jaar", [
        { waarde: "1", titel: "Jaar 1", sub: "propedeuse" },
        { waarde: "2", titel: "Jaar 2", sub: "" },
        { waarde: "3", titel: "Jaar 3", sub: "" },
        { waarde: "4", titel: "Jaar 4", sub: "" }
      ]) +
      profielKeuzeHtml();
  }

  function stapKlas() {
    const klassen = KLASSEN[concept.jaar] || [];
    if (!klassen.includes(concept.klas)) delete concept.klas;

    const opties = klassen.map(function (klas) {
      const gekozen = concept.klas === klas ? " selected" : "";
      return '<option value="' + klas + '"' + gekozen + ">" + klas + "</option>";
    }).join("");

    return "<h2>In welke klas zit je?</h2>" +
      "<p>Handig om je rooster en je groep snel terug te vinden. Overslaan mag.</p>" +
      '<div class="onboarding__extra">' +
      '<label for="ob-klas">Klas</label>' +
      '<select id="ob-klas" data-veld="klas">' +
      '<option value="">Geen klas / overslaan</option>' + opties +
      "</select>" +
      "</div>" +
      '<p class="onboarding__privacy">' + icoon("i-info") +
      " Je keuze blijft op dit apparaat staan en wordt nergens naartoe gestuurd.</p>";
  }

  function stapChecklist() {
    const taken = leesTaken();
    const klaar = TAKEN.filter(taak => taken[taak.id]).length;

    const eersteVier = TAKEN.slice(0, 4).map(function (taak) {
      return "<li>" + icoon(taak.icoon, "icon icon--pink") + " " + taak.tekst + "</li>";
    }).join("");

    return "<h2>Je startchecklist</h2>" +
      "<p>Acht dingen die je in je eerste week geregeld wilt hebben. " +
      "Je kunt ze straks op de startpagina afvinken.</p>" +
      '<ul class="onboarding__preview">' +
      eersteVier +
      "<li>" + icoon("i-checklist", "icon icon--pink") + " en nog " + (TAKEN.length - 4) + " punten</li>" +
      "</ul>" +
      (klaar ? '<p class="u-small u-muted">Je hebt er al ' + klaar + " afgevinkt.</p>" : "");
  }

  const STAP_RENDERS = {
    locatie: stapLocatie,
    opleiding: stapOpleiding,
    jaar: stapJaar,
    klas: stapKlas,
    checklist: stapChecklist
  };

  function magVerder() {
    const stap = STAPPEN[stapIndex];
    if (stap === "locatie") return !!concept.locatie;
    if (stap === "opleiding") return !!concept.opleiding;
    if (stap === "jaar") return !!concept.jaar;
    return true;
  }

  function voortgangHtml() {
    const punten = STAPPEN.map(function (stap, i) {
      return '<span class="onboarding__punt' + (i <= stapIndex ? " is-actief" : "") + '"></span>';
    }).join("");

    return '<p class="onboarding__stap">Stap ' + (stapIndex + 1) + " van " + STAPPEN.length + "</p>" +
      '<div class="onboarding__voortgang" aria-hidden="true">' + punten + "</div>";
  }

  function actiesHtml() {
    const laatste = stapIndex === STAPPEN.length - 1;
    const terug = stapIndex > 0
      ? '<button type="button" class="btn btn--outline" data-terug>Terug</button>'
      : "";

    return '<div class="onboarding__acties">' + terug +
      '<button type="button" class="btn btn--primary" data-verder' + (magVerder() ? "" : " disabled") + ">" +
      (laatste ? "Aan de slag" : "Verder") + icoon("i-arrow-right") +
      "</button></div>";
  }

  function bindKeuzes() {
    paneel.querySelectorAll("[data-waarde]").forEach(function (knop) {
      knop.addEventListener("click", function () {
        const deel = knop.dataset.waarde.split(":");
        concept[deel[0]] = deel[1];
        if (deel[0] === "jaar") {
          if (deel[1] === "1") delete concept.profiel;
          if (!KLASSEN[deel[1]].includes(concept.klas)) delete concept.klas;
        }
        teken(deel[0] + ":" + deel[1]);
      });
    });

    const profielVeld = paneel.querySelector("[data-veld=profiel]");
    if (profielVeld) {
      profielVeld.addEventListener("change", function () {
        concept.profiel = profielVeld.value;
      });
    }

    const klasVeld = paneel.querySelector("[data-veld=klas]");
    if (klasVeld) {
      klasVeld.addEventListener("change", function () {
        if (klasVeld.value) concept.klas = klasVeld.value;
        else delete concept.klas;
      });
    }
  }

  function meldOpslagfout() {
    const melding = paneel.querySelector("[data-opslagfout]");
    if (melding) melding.hidden = false;
  }

  function bindNavigatie() {
    paneel.querySelector("[data-sluit]").addEventListener("click", function () {
      onthoudUitstel();
      sluit();
    });

    const terug = paneel.querySelector("[data-terug]");
    if (terug) {
      terug.addEventListener("click", function () {
        stapIndex--;
        teken();
      });
    }

    paneel.querySelector("[data-verder]").addEventListener("click", function () {
      if (!magVerder()) return;

      if (stapIndex < STAPPEN.length - 1) {
        stapIndex++;
        teken();
        return;
      }

      concept.ingesteld = true;
      delete concept.uitgesteld;

      if (!bewaarProfiel(concept)) {
        meldOpslagfout();
        return;
      }

      sluit();
      toonProfielchip();
      toonChecklist();
    });
  }

  function teken(behoudKeuze) {
    paneel.innerHTML =
      '<button type="button" class="onboarding__sluit" data-sluit aria-label="Sluiten">' + icoon("i-close") + "</button>" +
      voortgangHtml() +
      '<div class="onboarding__inhoud">' + STAP_RENDERS[STAPPEN[stapIndex]]() + "</div>" +
      '<p class="onboarding__opslagfout" data-opslagfout hidden>' + icoon("i-alert") +
      " Je browser wil niets opslaan, bijvoorbeeld in een privévenster. Je instellingen blijven " +
      "daardoor niet bewaard.</p>" +
      actiesHtml();

    bindKeuzes();
    bindNavigatie();

    if (behoudKeuze) {
      const gekozen = paneel.querySelector('[data-waarde="' + behoudKeuze + '"]');
      if (gekozen) {
        gekozen.focus();
        return;
      }
    }

    const kop = paneel.querySelector("h2");
    if (kop) {
      kop.setAttribute("tabindex", "-1");
      kop.focus();
    }
  }

  function opToets(e) {
    if (e.key === "Escape") {
      onthoudUitstel();
      sluit();
      return;
    }

    if (e.key !== "Tab" || !paneel) return;

    const velden = Array.prototype.slice.call(paneel.querySelectorAll(FOCUSBAAR))
      .filter(el => el.offsetParent !== null);
    if (!velden.length) return;

    const eerste = velden[0];
    const laatste = velden[velden.length - 1];

    if (!e.shiftKey && document.activeElement === laatste) {
      e.preventDefault();
      eerste.focus();
      return;
    }

    if (e.shiftKey && (document.activeElement === eerste || !paneel.contains(document.activeElement))) {
      e.preventDefault();
      laatste.focus();
    }
  }

  function onthoudUitstel() {
    const profiel = leesProfiel() || {};
    if (profiel.ingesteld) return;

    profiel.uitgesteld = true;
    bewaarProfiel(profiel);
  }

  function sluit() {
    if (!overlay) return;

    document.removeEventListener("keydown", opToets);
    overlay.remove();
    overlay = null;
    paneel = null;
    document.body.classList.remove("geen-scroll");

    if (opener && document.contains(opener)) opener.focus();
    opener = null;
  }

  function open(vanuit) {
    clearTimeout(autoTimer);
    autoTimer = null;
    sluit();

    opener = vanuit || null;
    concept = leesProfiel() || {};
    delete concept.uitgesteld;
    stapIndex = 0;

    overlay = document.createElement("div");
    overlay.className = "onboarding";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "HANDIG_ instellen");
    overlay.addEventListener("mousedown", function (e) {
      if (e.target === overlay) {
        onthoudUitstel();
        sluit();
      }
    });

    paneel = document.createElement("div");
    paneel.className = "onboarding__paneel";
    overlay.appendChild(paneel);

    document.body.appendChild(overlay);
    document.body.classList.add("geen-scroll");
    document.addEventListener("keydown", opToets);

    teken();
  }

  function toonProfielchip() {
    const houder = document.querySelector("[data-profiel]");
    if (!houder) return;

    const profiel = leesProfiel();

    if (profiel && profiel.ingesteld) {
      houder.innerHTML = '<button type="button" class="profielchip" data-onboarding-chip>' +
        icoon("i-user") + "<span>" + veilig(profielTekst(profiel)) + "</span></button>";
    } else {
      houder.innerHTML = '<button type="button" class="profielchip profielchip--leeg" data-onboarding-chip>' +
        icoon("i-user") + "Stel HANDIG_ in</button>";
    }

    const knop = houder.querySelector("[data-onboarding-chip]");
    knop.addEventListener("click", function () {
      open(knop);
    });
  }

  function checklistKopTekst(profiel) {
    if (!profiel || !profiel.ingesteld) {
      return "Stel HANDIG_ in, dan zetten we de juiste locatie en klas erbij.";
    }

    const locatie = LOCATIES[profiel.locatie];
    if (!locatie) return "Je zit in " + veilig(profielTekst(profiel)) + ".";

    return "Je zit in " + veilig(profielTekst(profiel)) +
      ". Lessen zijn op " + veilig(locatie.adres) +
      (locatie.extra ? " (" + veilig(locatie.extra) + ")" : "") + ".";
  }

  function taakHtml(taak, af) {
    const link = taak.link
      ? '<a class="taak__link" href="' + taak.link + '"' +
        (taak.link.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") +
        ">Openen" + icoon("i-arrow-right") + "</a>"
      : "";

    return '<li class="taak' + (af ? " is-af" : "") + '">' +
      '<label><input type="checkbox" data-taak="' + taak.id + '"' + (af ? " checked" : "") + ">" +
      '<span class="taak__vink">' + icoon("i-check") + "</span>" +
      '<span class="taak__tekst"><strong>' + taak.tekst + "</strong>" +
      "<small>" + taak.uitleg + "</small></span></label>" +
      link +
      "</li>";
  }

  function toonChecklist() {
    const houder = document.querySelector("[data-checklist]");
    if (!houder) return;

    const lijst = houder.querySelector("[data-checklist-lijst]");
    if (!lijst) return;

    const kop = houder.querySelector("[data-checklist-kop]");
    const balk = houder.querySelector("[data-checklist-balk]");
    const stand = houder.querySelector("[data-checklist-stand]");
    const waarschuwing = houder.querySelector("[data-checklist-opslagfout]");
    const taken = leesTaken();

    if (kop) kop.innerHTML = checklistKopTekst(leesProfiel());

    lijst.innerHTML = TAKEN.map(taak => taakHtml(taak, !!taken[taak.id])).join("");

    function werkVoortgangBij() {
      const af = TAKEN.filter(taak => taken[taak.id]).length;

      if (balk) {
        balk.style.width = (af / TAKEN.length * 100) + "%";
        balk.parentNode.setAttribute("aria-valuenow", String(af));
      }
      if (stand) {
        stand.textContent = af === TAKEN.length
          ? "Alles geregeld. Je bent er klaar voor."
          : af + " van de " + TAKEN.length + " gedaan";
      }
    }

    lijst.querySelectorAll("[data-taak]").forEach(function (vakje) {
      vakje.addEventListener("change", function () {
        taken[vakje.dataset.taak] = vakje.checked;

        if (!bewaarTaken(taken) && waarschuwing) waarschuwing.hidden = false;

        vakje.closest(".taak").classList.toggle("is-af", vakje.checked);
        werkVoortgangBij();
      });
    });

    werkVoortgangBij();
  }

  function bindWissen() {
    document.querySelectorAll("[data-privacy-wis]").forEach(function (knop) {
      knop.addEventListener("click", function () {
        const status = document.querySelector("[data-privacy-wis-status]");

        if (knop.dataset.bevestigen !== "true") {
          knop.dataset.bevestigen = "true";
          knop.innerHTML = icoon("i-alert") + "Bevestig wissen";
          if (status) {
            status.classList.add("is-waarschuwing");
            status.textContent = "Klik nog een keer om je profiel en checklist definitief van dit apparaat te wissen.";
          }
          knop.focus();
          return;
        }

        try {
          localStorage.removeItem(SLEUTEL_PROFIEL);
          localStorage.removeItem(SLEUTEL_TAKEN);
        } catch (fout) {
          if (status) status.textContent = "Wissen lukte niet. Verwijder de sitegegevens via je browserinstellingen.";
          return;
        }

        sluit();
        toonProfielchip();
        toonChecklist();
        delete knop.dataset.bevestigen;
        knop.innerHTML = icoon("i-close") + "Mijn gegevens wissen";

        if (status) {
          status.classList.remove("is-waarschuwing");
          status.textContent = "Je HANDIG_-instellingen en checklist zijn gewist.";
          status.setAttribute("tabindex", "-1");
          status.focus();
        }
      });
    });
  }

  function init() {
    toonProfielchip();
    toonChecklist();
    bindWissen();

    document.querySelectorAll("[data-onboarding-open]").forEach(function (knop) {
      knop.addEventListener("click", function (e) {
        e.preventDefault();
        open(knop);
      });
    });

    const profiel = leesProfiel();
    const nieuw = !profiel || (!profiel.ingesteld && !profiel.uitgesteld);

    if (nieuw && document.querySelector("[data-onboarding-auto]")) autoTimer = setTimeout(open, 700);
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      init();
    } catch (fout) {
      const houder = document.querySelector("[data-profiel]");
      if (houder) houder.innerHTML = "";
    }
  });
})();
