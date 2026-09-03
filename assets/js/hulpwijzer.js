(function () {
  "use strict";

  const BOOM = {
    start: {
      vraag: "Waar gaat je vraag over?",
      opties: [
        { tekst: "Mijn studie: planning, vakken, motivatie", naar: "studie" },
        { tekst: "Hoe ik me voel: stress, somberheid, faalangst", naar: "gevoel" },
        { tekst: "Geld, inschrijving of collegegeld", naar: "decaan" },
        { tekst: "Iets in mijn leeromgeving werkt niet (inloggen, rooster, Brightspace)", naar: "ict" }
      ]
    },

    studie: {
      vraag: "Speelt er iets bijzonders waardoor je studie in de knel komt?",
      opties: [
        { tekst: "Nee, ik wil mijn studievoortgang bespreken", naar: "slb" },
        { tekst: "Ja: ziekte, thuissituatie, functiebeperking of iets anders", naar: "bijzonder" }
      ]
    },

    gevoel: {
      vraag: "Kan het wachten tot een afspraak?",
      opties: [
        { tekst: "Ja, ik wil er met iemand over praten", naar: "psycholoog" },
        { tekst: "Nee, ik heb nu ondersteuning nodig", naar: "acuut" }
      ]
    },

    slb: {
      titel: "Neem contact op met je studiebegeleider",
      tekst: "Je studiebegeleider is je persoonlijke begeleider en het eerste aanspreekpunt binnen de HAN. " +
        "Plan tijdig een gesprek. Je hoeft de vraag nog niet volledig te hebben uitgewerkt.",
      links: [
        { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }
      ]
    },

    bijzonder: {
      titel: "Meld bijzondere omstandigheden",
      tekst: "Meld bijzondere omstandigheden zo vroeg mogelijk. Deze kunnen meewegen " +
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
        "somberheid en angstgevoelens. Je kunt ook contact opnemen wanneer klachten nog beperkt zijn.",
      links: [
        { label: "Studentenpsychologen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentenpsychologen/" },
        { label: "Hulp, ondersteuning en training", url: "https://www1.han.nl/insite/studenten/panelnav.xml/hulp-ondersteuning-training/" }
      ]
    },

    acuut: {
      titel: "Neem direct contact op",
      dringend: true,
      tekst: "De begeleiding van de HAN werkt met afspraken en wachttijd. Bel je huisarts, of buiten " +
        "kantooruren de huisartsenpost in je woonplaats; die zijn er ook voor psychische klachten. " +
        "113 Zelfmoordpreventie is dag en nacht bereikbaar op " +
        '<a href="tel:113">113</a> of gratis op <a href="tel:08000113">0800 0113</a>. ' +
        'Bij direct gevaar bel je <a href="tel:112">112</a>.',
      links: [
        { label: "113 Zelfmoordpreventie, bellen of chatten", url: "https://www.113.nl/" },
        { label: "Studentenpsychologen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentenpsychologen/" }
      ]
    },

    decaan: {
      titel: "Studentendecaan",
      tekst: "Voor vragen over studiefinanciering, collegegeld en beurzen, of als je door bijzondere " +
        "omstandigheden in de financiële problemen komt. Je studiefinanciering en je reisproduct zelf " +
        "regel je bij DUO.",
      links: [
        { label: "Studentendecanen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" },
        { label: "duo.nl", url: "https://duo.nl/" }
      ]
    },

    ict: {
      titel: "Controleer eerst je HANaccount",
      tekst: "Bijna alle onderdelen van je leeromgeving (Brightspace, Osiris, MyX, Teams) werken met je HANaccount plus de " +
        "Microsoft Authenticator-app. Controleer beide wanneer inloggen niet lukt. " +
        "Neem daarna zo nodig contact op met de ICT-helpdesk van de HAN.",
      links: [
        { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
      ]
    }
  };

  function toonStoring(widget) {
    const body = widget.querySelector(".widget__body");
    if (!body) return;

    body.innerHTML =
      '<div class="verdict is-fout"><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-alert"></use></svg> ' +
      "De hulpwijzer is niet beschikbaar. Ververs de pagina en probeer het opnieuw.</div>";
  }

  function icoon(naam) {
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#' + naam + '"></use></svg>';
  }

  function kruimelsHtml(pad) {
    if (!pad.length) return "";
    return '<p class="wizard__crumbs">' + pad.join(" &rsaquo; ") + "</p>";
  }

  function stuurHtml(pad) {
    if (!pad.length) return "";

    return '<div class="wizard__stuur">' +
      '<button type="button" class="wizard__terug" data-terug>' + icoon("i-arrow-up") + "Vorige vraag</button>" +
      '<button type="button" class="wizard__terug" data-opnieuw>Opnieuw beginnen</button>' +
      "</div>";
  }

  function vraagHtml(knoop, pad) {
    const knoppen = knoop.opties.map(function (optie, i) {
      return '<button type="button" data-naar="' + optie.naar + '" data-index="' + i + '">' +
        optie.tekst + "</button>";
    }).join("");

    return kruimelsHtml(pad) +
      '<p class="wizard__question">' + knoop.vraag + "</p>" +
      '<div class="wizard__options">' + knoppen + "</div>" +
      stuurHtml(pad);
  }

  function resultaatHtml(knoop, pad) {
    const links = knoop.links.map(function (link) {
      return '<li><a href="' + link.url + '" target="_blank" rel="noopener">' + link.label + "</a></li>";
    }).join("");

    return kruimelsHtml(pad) +
      '<div class="wizard__result' + (knoop.dringend ? " wizard__result--dringend" : "") + '">' +
      "<h3>" + knoop.titel + "</h3>" +
      "<p>" + knoop.tekst + "</p>" +
      "<ul>" + links + "</ul>" +
      "</div>" +
      stuurHtml(pad);
  }

  function init() {
    const widget = document.querySelector("[data-hulpwijzer]");
    if (!widget) return;

    const body = widget.querySelector("[data-hulpwijzer-body]");
    if (!body) return;

    body.setAttribute("aria-live", "polite");

    let geschiedenis = [];
    let pad = [];

    function teken(knoopNaam, verplaatsFocus) {
      let knoop = BOOM[knoopNaam];

      if (!knoop) {
        geschiedenis = [];
        pad = [];
        knoop = BOOM.start;
        knoopNaam = "start";
      }

      body.innerHTML = knoop.vraag ? vraagHtml(knoop, pad) : resultaatHtml(knoop, pad);

      body.querySelectorAll("button[data-naar]").forEach(function (knop) {
        knop.addEventListener("click", function () {
          geschiedenis.push(knoopNaam);
          pad.push(knoop.opties[knop.dataset.index].tekst);
          teken(knop.dataset.naar, true);
        });
      });

      const terug = body.querySelector("[data-terug]");
      if (terug) {
        terug.addEventListener("click", function () {
          const vorige = geschiedenis.pop() || "start";
          pad.pop();
          teken(vorige, true);
        });
      }

      const opnieuw = body.querySelector("[data-opnieuw]");
      if (opnieuw) {
        opnieuw.addEventListener("click", function () {
          geschiedenis = [];
          pad = [];
          teken("start", true);
        });
      }

      if (!verplaatsFocus) return;

      const eerste = body.querySelector(".wizard__question, .wizard__result h3");
      if (!eerste) return;

      eerste.setAttribute("tabindex", "-1");
      eerste.focus();
    }

    teken("start", false);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const widget = document.querySelector("[data-hulpwijzer]");
    if (!widget) return;

    try {
      init();
    } catch (fout) {
      toonStoring(widget);
    }
  });
})();
