(function () {
  "use strict";

  var EC_PER_JAAR = 60;
  var UREN_PER_EC = 28;
  var BSA_NORM = 30;

  function initCalculator() {
    var widget = document.querySelector("[data-ec-calculator]");
    if (!widget) return;

    var invoer = widget.querySelectorAll("input[type=number]");
    var vulling = widget.querySelector("[data-ec-fill]");
    var totaalEl = widget.querySelector("[data-ec-totaal]");
    var urenEl = widget.querySelector("[data-ec-uren]");
    var oordeel = widget.querySelector("[data-ec-oordeel]");
    var marker = widget.querySelector("[data-ec-marker]");

    if (!invoer.length || !vulling || !totaalEl || !urenEl || !oordeel) return;

    if (marker) marker.style.left = (BSA_NORM / EC_PER_JAAR * 100) + "%";

    function bereken() {
      var totaal = 0;
      var ongeldig = false;

      invoer.forEach(function (veld) {
        var ruw = veld.value.trim();
        var waarde = parseFloat(ruw);
        veld.classList.remove("is-fout");

        if (ruw === "") return;
        if (isNaN(waarde) || waarde < 0 || waarde > EC_PER_JAAR) {
          veld.classList.add("is-fout");
          ongeldig = true;
          return;
        }
        totaal += waarde;
      });

      if (ongeldig) {
        oordeel.className = "verdict is-fout";
        oordeel.innerHTML = '<svg class="icon"><use href="#i-alert"></use></svg> Vul per periode een getal in tussen 0 en ' + EC_PER_JAAR + " EC.";
        return;
      }

      totaal = Math.min(totaal, EC_PER_JAAR);

      var percentage = totaal / EC_PER_JAAR * 100;
      vulling.style.width = percentage + "%";
      totaalEl.textContent = totaal;
      urenEl.textContent = (totaal * UREN_PER_EC).toLocaleString("nl-NL");

      var tekort = BSA_NORM - totaal;
      if (totaal >= BSA_NORM) {
        oordeel.className = "verdict is-ok";
        oordeel.innerHTML = "Je zit op of boven de BSA-norm van " + BSA_NORM + " EC. " +
          "Nog " + (EC_PER_JAAR - totaal) + " EC te gaan voor een volledig jaar.";
      } else {
        oordeel.className = "verdict";
        oordeel.innerHTML = "Je hebt nog <strong>" + tekort + " EC</strong> nodig voor de BSA-norm van " +
          BSA_NORM + " EC. Dat is ongeveer " + (tekort * UREN_PER_EC).toLocaleString("nl-NL") +
          " uur studie. Praat op tijd met je studiebegeleider.";
      }
    }

    invoer.forEach(function (veld) { veld.addEventListener("input", bereken); });
    bereken();
  }

  var BOOM = {
    start: {
      vraag: "Waar gaat je vraag over?",
      opties: [
        { tekst: "Mijn studie: planning, vakken, motivatie", naar: "studie" },
        { tekst: "Hoe ik me voel: stress, somberheid, faalangst", naar: "psycholoog" },
        { tekst: "Geld, inschrijving of collegegeld", naar: "decaan" },
        { tekst: "Een systeem doet het niet (inloggen, rooster, Brightspace)", naar: "ict" }
      ]
    },
    studie: {
      vraag: "Speelt er iets bijzonders waardoor je studie in de knel komt?",
      opties: [
        { tekst: "Nee, ik wil gewoon even sparren over mijn studie", naar: "slb" },
        { tekst: "Ja: ziekte, thuissituatie, functiebeperking of iets anders", naar: "bijzonder" }
      ]
    },
    slb: {
      titel: "Ga naar je studiebegeleider",
      tekst: "Je studiebegeleider is je persoonlijke begeleider en het eerste aanspreekpunt binnen de HAN. " +
        "Plan een gesprek in, hoe eerder hoe beter, ook als je nog niet precies weet wat je wilt vragen.",
      links: [{ label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }]
    },
    bijzonder: {
      titel: "Meld bijzondere omstandigheden",
      tekst: "Meld het altijd, ook als je denkt dat het wel meevalt. Bijzondere omstandigheden kunnen meewegen " +
        "in je studieadvies en er zijn regelingen en voorzieningen voor. Begin bij je studiebegeleider en " +
        "schakel de studentendecaan in.",
      links: [
        { label: "Bijzondere omstandigheden op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/bijzondere-omstandigheden/" },
        { label: "Studentendecanen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" }
      ]
    },
    psycholoog: {
      titel: "Studentenpsycholoog of Student Support Centrum",
      tekst: "De studentenpsychologen van de HAN helpen bij faalangst, uitstelgedrag, rouwverwerking, " +
        "somberheid en angstgevoelens. Je hoeft geen groot probleem te hebben om je te melden.",
      links: [
        { label: "Studentenpsychologen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentenpsychologen/" },
        { label: "Hulp, ondersteuning en training", url: "https://www1.han.nl/insite/studenten/panelnav.xml/hulp-ondersteuning-training/" }
      ]
    },
    decaan: {
      titel: "Studentendecaan",
      tekst: "Voor vragen over studiefinanciering, collegegeld en beurzen, of als je door bijzondere " +
        "omstandigheden in de financiële problemen komt.",
      links: [{ label: "Studentendecanen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" }]
    },
    ict: {
      titel: "Check eerst je HANaccount",
      tekst: "Bijna alle systemen (Brightspace, Osiris, MyX, Teams) werken met je HANaccount plus de " +
        "Microsoft Authenticator-app. Werkt inloggen niet, dan zit het probleem meestal daar. " +
        "Lukt het daarna nog niet, ga dan naar de ICT-helpdesk van de HAN.",
      links: [{ label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }]
    }
  };

  function initHulpwijzer() {
    var widget = document.querySelector("[data-hulpwijzer]");
    if (!widget) return;

    var body = widget.querySelector("[data-hulpwijzer-body]");
    if (!body) return;

    var pad = [];

    function teken(knoopNaam) {
      var knoop = BOOM[knoopNaam];

      if (!knoop) {
        pad = [];
        knoop = BOOM.start;
      }

      var kruimels = pad.length
        ? '<p class="wizard__crumbs">' + pad.join(" &rsaquo; ") + "</p>" : "";

      if (knoop.vraag) {
        body.innerHTML = kruimels +
          '<p class="wizard__question">' + knoop.vraag + "</p>" +
          '<div class="wizard__options">' +
          knoop.opties.map(function (optie, i) {
            return '<button type="button" data-naar="' + optie.naar + '" data-index="' + i + '">' +
              optie.tekst + "</button>";
          }).join("") + "</div>";

        body.querySelectorAll("button[data-naar]").forEach(function (knopje) {
          knopje.addEventListener("click", function () {
            pad.push(knoop.opties[knopje.dataset.index].tekst);
            teken(knopje.dataset.naar);
          });
        });
      } else {
        body.innerHTML = kruimels +
          '<div class="wizard__result">' +
          "<h3>" + knoop.titel + "</h3>" +
          "<p>" + knoop.tekst + "</p>" +
          "<ul>" + knoop.links.map(function (l) {
            return '<li><a href="' + l.url + '" target="_blank" rel="noopener">' + l.label + "</a></li>";
          }).join("") + "</ul>" +
          '<button type="button" class="btn btn--outline btn--sm" data-opnieuw>Opnieuw beginnen</button>' +
          "</div>";

        body.querySelector("[data-opnieuw]").addEventListener("click", function () {
          pad = [];
          teken("start");
        });
      }
    }

    teken("start");
  }

  function toonStoring(selector) {
    var widget = document.querySelector(selector);
    if (!widget) return;
    var body = widget.querySelector(".widget__body");
    if (body) {
      body.innerHTML = '<div class="verdict is-fout"><svg class="icon"><use href="#i-alert"></use></svg> Dit onderdeel doet het even niet. ' +
        "Ververs de pagina om het opnieuw te proberen.</div>";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    try { initCalculator(); } catch (fout) { toonStoring("[data-ec-calculator]"); }
    try { initHulpwijzer(); } catch (fout) { toonStoring("[data-hulpwijzer]"); }
  });
})();
