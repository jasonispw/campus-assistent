(function () {
  "use strict";

  var SLEUTEL = "handig-profiel";
  var SLEUTEL_TAKEN = "handig-checklist";

  var LOCATIES = {
    arnhem: { naam: "Arnhem", adres: "Ruitenberglaan 26, 6826 CC", extra: "B- en C-vleugel" },
    nijmegen: { naam: "Nijmegen", adres: "Prof. Molkenboerstraat 3, 6524 RN", extra: "" }
  };

  var PROFIELEN = {
    "software": "Software &amp; Robotics",
    "data": "Data &amp; AI",
    "infra": "Infra &amp; Cybersecurity"
  };

  var TAKEN = [
    { id: "account", tekst: "HANaccount activeren", uitleg: "Je inloggegevens krijg je per e-mail zodra je inschrijving rond is.", icoon: "i-key" },
    { id: "mfa", tekst: "Microsoft Authenticator installeren", uitleg: "Nodig voor multifactor-authenticatie op alle HAN-systemen.", icoon: "i-key" },
    { id: "wifi", tekst: "Eduroam-wifi instellen", uitleg: "Via de geteduroam-app, met je HANaccount.", icoon: "i-wifi" },
    { id: "brightspace", tekst: "Brightspace openen", uitleg: "leren.han.nl: leermateriaal en berichten van docenten.", icoon: "i-book", link: "https://leren.han.nl" },
    { id: "osiris", tekst: "Osiris openen of de app installeren", uitleg: "Je cijfers en het intekenen voor toetsen.", icoon: "i-certificate", link: "https://han.osiris-student.nl/#/login" },
    { id: "rooster", tekst: "Je rooster bekijken in MyX", uitleg: "myx-han.xedule.nl, inloggen met je HANaccount.", icoon: "i-calendar", link: "https://myx-han.xedule.nl/" },
    { id: "mail", tekst: "HAN-mail checken in Outlook", uitleg: "Belangrijke berichten over je inschrijving komen hier binnen.", icoon: "i-mail", link: "https://office365.han.nl" },
    { id: "slb", tekst: "Uitzoeken wie je studiebegeleider is", uitleg: "Je eerste aanspreekpunt bij de opleiding.", icoon: "i-user", link: "hulp.html" }
  ];

  function leesProfiel() {
    try {
      var ruw = localStorage.getItem(SLEUTEL);
      return ruw ? JSON.parse(ruw) : null;
    } catch (fout) {
      return null;
    }
  }

  function bewaarProfiel(profiel) {
    try {
      localStorage.setItem(SLEUTEL, JSON.stringify(profiel));
    } catch (fout) {
      return false;
    }
    return true;
  }

  function leesTaken() {
    try {
      var ruw = localStorage.getItem(SLEUTEL_TAKEN);
      return ruw ? JSON.parse(ruw) : {};
    } catch (fout) {
      return {};
    }
  }

  function bewaarTaken(taken) {
    try {
      localStorage.setItem(SLEUTEL_TAKEN, JSON.stringify(taken));
    } catch (fout) {
      return false;
    }
    return true;
  }

  function veilig(tekst) {
    var d = document.createElement("div");
    d.textContent = tekst == null ? "" : String(tekst);
    return d.innerHTML;
  }

  function icoon(naam, klasse) {
    return '<svg class="' + (klasse || "icon") + '"><use href="#' + naam + '"></use></svg>';
  }

  var STAPPEN = ["locatie", "opleiding", "jaar", "klas", "checklist"];

  function Wizard() {
    var concept = leesProfiel() || {};
    var index = 0;
    var overlay, paneel;

    function sluit() {
      if (!overlay) return;
      document.removeEventListener("keydown", opToets);
      overlay.remove();
      overlay = null;
      document.body.classList.remove("geen-scroll");
    }

    function opToets(e) {
      if (e.key === "Escape") sluit();
    }

    function voortgang() {
      return '<div class="ob__voortgang" aria-hidden="true">' +
        STAPPEN.map(function (s, i) {
          return '<span class="ob__punt' + (i <= index ? " is-actief" : "") + '"></span>';
        }).join("") + "</div>";
    }

    function keuzeknoppen(veld, opties) {
      return '<div class="ob__opties">' + opties.map(function (o) {
        var gekozen = concept[veld] === o.waarde ? " is-gekozen" : "";
        return '<button type="button" class="ob__optie' + gekozen + '" data-veld="' + veld +
          '" data-waarde="' + veld + ":" + o.waarde + '">' +
          (o.icoon ? icoon(o.icoon, "icon icon--lg") : "") +
          "<strong>" + o.titel + "</strong>" +
          (o.sub ? "<small>" + o.sub + "</small>" : "") +
          "</button>";
      }).join("") + "</div>";
    }

    function stapInhoud() {
      var stap = STAPPEN[index];

      if (stap === "locatie") {
        return "<h2>Op welke locatie studeer je?</h2>" +
          "<p>Dan laten we de juiste adressen en routes zien.</p>" +
          keuzeknoppen("locatie", [
            { waarde: "arnhem", titel: "Arnhem", sub: LOCATIES.arnhem.adres, icoon: "i-map-pin" },
            { waarde: "nijmegen", titel: "Nijmegen", sub: LOCATIES.nijmegen.adres, icoon: "i-map-pin" }
          ]);
      }

      if (stap === "opleiding") {
        return "<h2>Welke opleiding volg je?</h2>" +
          "<p>De assistent is gemaakt voor ICT, maar de systemen en regelingen gelden breder.</p>" +
          keuzeknoppen("opleiding", [
            { waarde: "ict-voltijd", titel: "ICT voltijd", sub: "4 jaar, 240 EC", icoon: "i-laptop" },
            { waarde: "ict-deeltijd", titel: "ICT deeltijd", sub: "naast je werk", icoon: "i-briefcase" },
            { waarde: "anders", titel: "Een andere opleiding", sub: "bij de HAN", icoon: "i-school" }
          ]);
      }

      if (stap === "jaar") {
        var profielKeuze = "";
        if (concept.jaar && concept.jaar !== "1") {
          profielKeuze = '<div class="ob__extra">' +
            '<label for="ob-profiel">Welk profiel volg je?</label>' +
            '<select id="ob-profiel" data-veld="profiel">' +
            '<option value="">Kies je profiel</option>' +
            Object.keys(PROFIELEN).map(function (k) {
              return '<option value="' + k + '"' +
                (concept.profiel === k ? " selected" : "") + ">" + PROFIELEN[k] + "</option>";
            }).join("") +
            "</select></div>";
        }
        return "<h2>In welk jaar zit je?</h2>" +
          "<p>Zit je in jaar 1, dan is de BSA-norm van 30 EC voor jou het belangrijkst.</p>" +
          keuzeknoppen("jaar", [
            { waarde: "1", titel: "Jaar 1", sub: "propedeuse" },
            { waarde: "2", titel: "Jaar 2", sub: "" },
            { waarde: "3", titel: "Jaar 3", sub: "" },
            { waarde: "4", titel: "Jaar 4", sub: "" }
          ]) + profielKeuze;
      }

      if (stap === "klas") {
        return "<h2>In welke klas zit je?</h2>" +
          "<p>Handig om je rooster en je groep snel terug te vinden. Overslaan mag.</p>" +
          '<div class="ob__extra">' +
          '<label for="ob-klas">Klas</label>' +
          '<input id="ob-klas" type="text" maxlength="20" placeholder="bijvoorbeeld ICT-1A" ' +
          'value="' + veilig(concept.klas || "") + '" data-veld="klas">' +
          "</div>" +
          '<p class="ob__privacy">' + icoon("i-info") +
          " Wat je hier invult blijft op dit apparaat staan en wordt nergens naartoe gestuurd. " +
          "Vul geen studentnummer of andere persoonsgegevens in.</p>";
      }

      var taken = leesTaken();
      var klaar = TAKEN.filter(function (t) { return taken[t.id]; }).length;
      return "<h2>Je startchecklist</h2>" +
        "<p>Acht dingen die je in je eerste week geregeld wilt hebben. Je kunt ze straks op de " +
        "startpagina afvinken.</p>" +
        '<ul class="ob__preview">' +
        TAKEN.slice(0, 4).map(function (t) {
          return "<li>" + icoon(t.icoon, "icon icon--pink") + " " + t.tekst + "</li>";
        }).join("") +
        "<li>" + icoon("i-checklist", "icon icon--pink") + " en nog " + (TAKEN.length - 4) + " punten</li>" +
        "</ul>" +
        (klaar ? '<p class="u-small u-muted">Je hebt er al ' + klaar + " afgevinkt.</p>" : "");
    }

    function magVerder() {
      var stap = STAPPEN[index];
      if (stap === "locatie") return !!concept.locatie;
      if (stap === "opleiding") return !!concept.opleiding;
      if (stap === "jaar") return !!concept.jaar;
      return true;
    }

    function teken() {
      paneel.innerHTML =
        '<button type="button" class="ob__sluit" data-sluit aria-label="Sluiten">' + icoon("i-close") + "</button>" +
        voortgang() +
        '<div class="ob__inhoud">' + stapInhoud() + "</div>" +
        '<div class="ob__acties">' +
        (index > 0 ? '<button type="button" class="btn btn--outline" data-terug>Terug</button>' : "") +
        '<button type="button" class="btn btn--primary" data-verder' + (magVerder() ? "" : " disabled") + ">" +
        (index === STAPPEN.length - 1 ? "Aan de slag" : "Verder") +
        icoon("i-arrow-right") + "</button>" +
        "</div>";

      paneel.querySelectorAll("[data-waarde]").forEach(function (knop) {
        knop.addEventListener("click", function () {
          var deel = knop.dataset.waarde.split(":");
          concept[deel[0]] = deel[1];
          if (deel[0] === "jaar" && deel[1] === "1") delete concept.profiel;
          teken();
        });
      });

      var profielVeld = paneel.querySelector("[data-veld=profiel]");
      if (profielVeld) {
        profielVeld.addEventListener("change", function () { concept.profiel = profielVeld.value; });
      }

      var klasVeld = paneel.querySelector("[data-veld=klas]");
      if (klasVeld) {
        klasVeld.addEventListener("input", function () { concept.klas = klasVeld.value.trim(); });
        klasVeld.focus();
      }

      paneel.querySelector("[data-sluit]").addEventListener("click", sluit);

      var terug = paneel.querySelector("[data-terug]");
      if (terug) terug.addEventListener("click", function () { index--; teken(); });

      paneel.querySelector("[data-verder]").addEventListener("click", function () {
        if (!magVerder()) return;
        if (index === STAPPEN.length - 1) {
          concept.ingesteld = true;
          bewaarProfiel(concept);
          sluit();
          toonProfiel();
          toonChecklist();
          return;
        }
        index++;
        teken();
      });
    }

    this.open = function (startIndex) {
      index = startIndex || 0;
      concept = leesProfiel() || {};
      overlay = document.createElement("div");
      overlay.className = "ob";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-label", "HANDIG_ instellen");
      paneel = document.createElement("div");
      paneel.className = "ob__paneel";
      overlay.appendChild(paneel);
      overlay.addEventListener("click", function (e) { if (e.target === overlay) sluit(); });
      document.body.appendChild(overlay);
      document.body.classList.add("geen-scroll");
      document.addEventListener("keydown", opToets);
      teken();
    };
  }

  var wizard = new Wizard();

  function profielTekst(profiel) {
    var delen = [];
    if (profiel.locatie && LOCATIES[profiel.locatie]) delen.push(LOCATIES[profiel.locatie].naam);
    if (profiel.opleiding === "ict-voltijd") delen.push("ICT voltijd");
    else if (profiel.opleiding === "ict-deeltijd") delen.push("ICT deeltijd");
    else if (profiel.opleiding === "anders") delen.push("HAN");
    if (profiel.jaar) delen.push("jaar " + profiel.jaar);
    if (profiel.klas) delen.push(profiel.klas);
    return delen.join(" · ");
  }

  function toonProfiel() {
    var houder = document.querySelector("[data-profiel]");
    if (!houder) return;
    var profiel = leesProfiel();

    if (!profiel || !profiel.ingesteld) {
      houder.innerHTML = '<button type="button" class="profielchip profielchip--leeg" data-ob-start>' +
        icoon("i-user") + "Stel HANDIG_ in</button>";
    } else {
      houder.innerHTML = '<button type="button" class="profielchip" data-ob-start>' +
        icoon("i-user") + "<span>" + veilig(profielTekst(profiel)) + "</span></button>";
    }
    houder.querySelector("[data-ob-start]").addEventListener("click", function () { wizard.open(0); });
  }

  function toonChecklist() {
    var houder = document.querySelector("[data-checklist]");
    if (!houder) return;

    var profiel = leesProfiel();
    var taken = leesTaken();

    var kop = houder.querySelector("[data-checklist-kop]");
    var lijst = houder.querySelector("[data-checklist-lijst]");
    var balk = houder.querySelector("[data-checklist-balk]");
    var stand = houder.querySelector("[data-checklist-stand]");
    if (!lijst) return;

    if (kop) {
      if (profiel && profiel.ingesteld) {
        var loc = LOCATIES[profiel.locatie];
        kop.innerHTML = "Je zit in " + veilig(profielTekst(profiel)) +
          (loc ? ". Lessen zijn op " + veilig(loc.adres) +
            (loc.extra ? " (" + veilig(loc.extra) + ")" : "") + "." : ".");
      } else {
        kop.textContent = "Stel HANDIG_ in, dan zetten we de juiste locatie en klas erbij.";
      }
    }

    lijst.innerHTML = TAKEN.map(function (t) {
      var af = !!taken[t.id];
      return '<li class="taak' + (af ? " is-af" : "") + '">' +
        '<label><input type="checkbox" data-taak="' + t.id + '"' + (af ? " checked" : "") + ">" +
        '<span class="taak__vink">' + icoon("i-check") + "</span>" +
        '<span class="taak__tekst"><strong>' + t.tekst + "</strong>" +
        "<small>" + t.uitleg + "</small></span></label>" +
        (t.link ? '<a class="taak__link" href="' + t.link + '"' +
          (t.link.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") +
          ">Openen" + icoon("i-arrow-right") + "</a>" : "") +
        "</li>";
    }).join("");

    function werkBij() {
      var af = TAKEN.filter(function (t) { return taken[t.id]; }).length;
      if (balk) balk.style.width = (af / TAKEN.length * 100) + "%";
      if (stand) {
        stand.textContent = af === TAKEN.length
          ? "Alles geregeld. Je bent er klaar voor."
          : af + " van de " + TAKEN.length + " gedaan";
      }
    }

    lijst.querySelectorAll("[data-taak]").forEach(function (vak) {
      vak.addEventListener("change", function () {
        taken[vak.dataset.taak] = vak.checked;
        bewaarTaken(taken);
        vak.closest(".taak").classList.toggle("is-af", vak.checked);
        werkBij();
      });
    });

    werkBij();
  }

  function init() {
    try {
      toonProfiel();
      toonChecklist();

      document.querySelectorAll("[data-ob-open]").forEach(function (knop) {
        knop.addEventListener("click", function (e) {
          e.preventDefault();
          wizard.open(0);
        });
      });

      var profiel = leesProfiel();
      if ((!profiel || !profiel.ingesteld) && document.querySelector("[data-ob-auto]")) {
        setTimeout(function () { wizard.open(0); }, 700);
      }
    } catch (fout) {
      var houder = document.querySelector("[data-profiel]");
      if (houder) houder.innerHTML = "";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
