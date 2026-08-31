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


  /* Opslag. Alles blijft op het apparaat van de student staan, er is geen server. */

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
    return '<svg class="' + (klasse || "icon") + '"><use href="#' + naam + '"></use></svg>';
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


  /* De wizard: vijf stappen, elk met een eigen renderfunctie. */

  let concept = {};
  let stapIndex = 0;
  let overlay = null;
  let paneel = null;

  function keuzeknoppen(veld, opties) {
    const knoppen = opties.map(function (optie) {
      const gekozen = concept[veld] === optie.waarde ? " is-gekozen" : "";

      return '<button type="button" class="onboarding__optie' + gekozen + '"' +
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
    // Eerstejaars kiezen nog geen profiel, die vraag verschijnt pas vanaf jaar 2.
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
      "<p>Zit je in jaar 1, dan is de BSA-norm van 30 EC voor jou het belangrijkst.</p>" +
      keuzeknoppen("jaar", [
        { waarde: "1", titel: "Jaar 1", sub: "propedeuse" },
        { waarde: "2", titel: "Jaar 2", sub: "" },
        { waarde: "3", titel: "Jaar 3", sub: "" },
        { waarde: "4", titel: "Jaar 4", sub: "" }
      ]) +
      profielKeuzeHtml();
  }

  function stapKlas() {
    return "<h2>In welke klas zit je?</h2>" +
      "<p>Handig om je rooster en je groep snel terug te vinden. Overslaan mag.</p>" +
      '<div class="onboarding__extra">' +
      '<label for="ob-klas">Klas</label>' +
      '<input id="ob-klas" type="text" maxlength="20" placeholder="bijvoorbeeld ICT-1A"' +
      ' value="' + veilig(concept.klas || "") + '" data-veld="klas">' +
      "</div>" +
      '<p class="onboarding__privacy">' + icoon("i-info") +
      " Wat je hier invult blijft op dit apparaat staan en wordt nergens naartoe gestuurd. " +
      "Vul geen studentnummer of andere persoonsgegevens in.</p>";
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

    return '<div class="onboarding__voortgang" aria-hidden="true">' + punten + "</div>";
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
        const [veld, waarde] = knop.dataset.waarde.split(":");
        concept[veld] = waarde;
        if (veld === "jaar" && waarde === "1") delete concept.profiel;
        teken();
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
      klasVeld.addEventListener("input", function () {
        concept.klas = klasVeld.value.trim();
      });
      klasVeld.focus();
    }
  }

  function bindNavigatie() {
    paneel.querySelector("[data-sluit]").addEventListener("click", sluit);

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
      bewaarProfiel(concept);
      sluit();
      toonProfielchip();
      toonChecklist();
    });
  }

  function teken() {
    paneel.innerHTML =
      '<button type="button" class="onboarding__sluit" data-sluit aria-label="Sluiten">' + icoon("i-close") + "</button>" +
      voortgangHtml() +
      '<div class="onboarding__inhoud">' + STAP_RENDERS[STAPPEN[stapIndex]]() + "</div>" +
      actiesHtml();

    bindKeuzes();
    bindNavigatie();
  }

  function opToets(e) {
    if (e.key === "Escape") sluit();
  }

  function sluit() {
    if (!overlay) return;

    document.removeEventListener("keydown", opToets);
    overlay.remove();
    overlay = null;
    document.body.classList.remove("geen-scroll");
  }

  function open() {
    concept = leesProfiel() || {};
    stapIndex = 0;

    overlay = document.createElement("div");
    overlay.className = "onboarding";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "HANDIG_ instellen");
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) sluit();
    });

    paneel = document.createElement("div");
    paneel.className = "onboarding__paneel";
    overlay.appendChild(paneel);

    document.body.appendChild(overlay);
    document.body.classList.add("geen-scroll");
    document.addEventListener("keydown", opToets);

    teken();
  }


  /* De chip in de header en de checklist op de startpagina. */

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

    houder.querySelector("[data-onboarding-chip]").addEventListener("click", open);
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
    const taken = leesTaken();

    if (kop) kop.innerHTML = checklistKopTekst(leesProfiel());

    lijst.innerHTML = TAKEN.map(taak => taakHtml(taak, !!taken[taak.id])).join("");

    function werkVoortgangBij() {
      const af = TAKEN.filter(taak => taken[taak.id]).length;

      if (balk) balk.style.width = (af / TAKEN.length * 100) + "%";
      if (stand) {
        stand.textContent = af === TAKEN.length
          ? "Alles geregeld. Je bent er klaar voor."
          : af + " van de " + TAKEN.length + " gedaan";
      }
    }

    lijst.querySelectorAll("[data-taak]").forEach(function (vakje) {
      vakje.addEventListener("change", function () {
        taken[vakje.dataset.taak] = vakje.checked;
        bewaarTaken(taken);
        vakje.closest(".taak").classList.toggle("is-af", vakje.checked);
        werkVoortgangBij();
      });
    });

    werkVoortgangBij();
  }


  function init() {
    toonProfielchip();
    toonChecklist();

    document.querySelectorAll("[data-onboarding-open]").forEach(function (knop) {
      knop.addEventListener("click", function (e) {
        e.preventDefault();
        open();
      });
    });

    const profiel = leesProfiel();
    if ((!profiel || !profiel.ingesteld) && document.querySelector("[data-onboarding-auto]")) {
      setTimeout(open, 700);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      init();
    } catch (fout) {
      // Zonder profiel werkt de rest van de site gewoon, laat dan geen halve chip staan.
      const houder = document.querySelector("[data-profiel]");
      if (houder) houder.innerHTML = "";
    }
  });
})();
