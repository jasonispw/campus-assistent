(function () {
  "use strict";

  const BOOM = {
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
      links: [
        { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }
      ]
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
      links: [
        { label: "Studentendecanen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" }
      ]
    },

    ict: {
      titel: "Check eerst je HANaccount",
      tekst: "Bijna alle systemen (Brightspace, Osiris, MyX, Teams) werken met je HANaccount plus de " +
        "Microsoft Authenticator-app. Werkt inloggen niet, dan zit het probleem meestal daar. " +
        "Lukt het daarna nog niet, ga dan naar de ICT-helpdesk van de HAN.",
      links: [
        { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
      ]
    }
  };

  function toonStoring(widget) {
    const body = widget.querySelector(".widget__body");
    if (!body) return;

    body.innerHTML =
      '<div class="verdict is-fout"><svg class="icon"><use href="#i-alert"></use></svg> ' +
      "De hulpwijzer doet het even niet. Ververs de pagina om het opnieuw te proberen.</div>";
  }

  function kruimelsHtml(pad) {
    if (!pad.length) return "";
    return '<p class="wizard__crumbs">' + pad.join(" &rsaquo; ") + "</p>";
  }

  function vraagHtml(knoop) {
    const knoppen = knoop.opties.map(function (optie, i) {
      return '<button type="button" data-naar="' + optie.naar + '" data-index="' + i + '">' +
        optie.tekst + "</button>";
    }).join("");

    return '<p class="wizard__question">' + knoop.vraag + "</p>" +
      '<div class="wizard__options">' + knoppen + "</div>";
  }

  function resultaatHtml(knoop) {
    const links = knoop.links.map(function (link) {
      return '<li><a href="' + link.url + '" target="_blank" rel="noopener">' + link.label + "</a></li>";
    }).join("");

    return '<div class="wizard__result">' +
      "<h3>" + knoop.titel + "</h3>" +
      "<p>" + knoop.tekst + "</p>" +
      "<ul>" + links + "</ul>" +
      '<button type="button" class="btn btn--outline btn--sm" data-opnieuw>Opnieuw beginnen</button>' +
      "</div>";
  }

  function init() {
    const widget = document.querySelector("[data-hulpwijzer]");
    if (!widget) return;

    const body = widget.querySelector("[data-hulpwijzer-body]");
    if (!body) return;

    let pad = [];

    function teken(knoopNaam) {
      let knoop = BOOM[knoopNaam];

      if (!knoop) {
        pad = [];
        knoop = BOOM.start;
      }

      if (knoop.vraag) {
        body.innerHTML = kruimelsHtml(pad) + vraagHtml(knoop);

        body.querySelectorAll("button[data-naar]").forEach(function (knop) {
          knop.addEventListener("click", function () {
            pad.push(knoop.opties[knop.dataset.index].tekst);
            teken(knop.dataset.naar);
          });
        });

        return;
      }

      body.innerHTML = kruimelsHtml(pad) + resultaatHtml(knoop);

      body.querySelector("[data-opnieuw]").addEventListener("click", function () {
        pad = [];
        teken("start");
      });
    }

    teken("start");
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
