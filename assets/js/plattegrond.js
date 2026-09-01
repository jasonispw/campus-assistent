(function () {
  "use strict";

  const GEO = window.HANDIG_GEO;
  let toonGebouw = null;
  const SLEUTEL_PROFIEL = "handig-profiel";
  const NS = "http://www.w3.org/2000/svg";

  const BRON = {
    locaties: { label: "Locaties van de HAN", url: "https://www.han.nl/contact/locaties/" },
    voorzieningenArnhem: { label: "Voorzieningen campus Arnhem", url: "https://www.han.nl/contact/locaties/Voorzieningen-campus-Arnhem-november-2024.pdf" },
    voorzieningenNijmegen: { label: "Voorzieningen campus Nijmegen", url: "https://www.han.nl/contact/locaties/Voorzieningen-Campus-Nijmegen-november-2024.pdf" },
    faciliteiten: { label: "Studiefaciliteiten op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/" },
    bibliotheek: { label: "Contact HAN Bibliotheek", url: "https://www.han.nl/over-de-han/organisatie/bedrijfsonderdelen/bibliotheek/contact/" },
    parkeren: { label: "Parkeren op han.nl", url: "https://www.han.nl/contact/locaties/parkeren/" },
    ict: { label: "Praktische info ICT op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/" },
    renovatie: { label: "Renovatie Ruitenberglaan 26", url: "https://www.han.nl/nieuws/2025/07/renovatie-ruitenberglaan-26/" },
    programma: { label: "Programmaboekje open dag Arnhem", url: "https://www.han.nl/studeren/faq/230222-Arnhem-Klikbaar-programmaboekje-mobiel.pdf" }
  };

  const CAMPUSSEN = {
    arnhem: { naam: "Arnhem", omschrijving: "De gebouwen aan de Ruitenberglaan liggen naast elkaar, op tien minuten lopen van station Arnhem Presikhaaf." },
    nijmegen: { naam: "Nijmegen", omschrijving: "De HAN-gebouwen liggen verspreid over campus Heyendaal, tussen station Nijmegen Heyendaal en de Sint Annastraat." }
  };

  const GEBOUWEN = [
    {
      id: "r26",
      campus: "arnhem",
      code: "R26",
      naam: "Ruitenberglaan 26",
      adres: "Ruitenberglaan 26, 6826 CC Arnhem",
      telefoon: "(026) 369 19 11",
      vleugels: ["A", "B", "C", "D", "E", "F"],
      hier: [
        "Built Environment, Engineering en Automotive",
        "ICT heeft les in de B- en C-vleugel",
        "Grafisch Productie Centrum, bij de receptie aan het einde van de gang links"
      ],
      feiten: [
        { icoon: "i-elevator", tekst: "Op de begane grond gaat een aangepaste lift van A.0 naar B.0. Het B-gebouw heeft 2 liften en het C-, D-, E- en F-gebouw hebben er elk 1, naar alle verdiepingen." },
        { icoon: "i-wheelchair", tekst: "Aangepaste toiletten bij A0.206, C0.80, D1.80, F.3.74, F2.67, F1.42, F0.2.05 en B2.122. De E-vleugel heeft geen aangepast toilet." },
        { icoon: "i-door-enter", tekst: "Alle ruimtes zijn bereikbaar, behalve vergaderruimte A1.01." },
        { icoon: "i-parking", tekst: "2 parkeerplaatsen voor personen met een beperking naast de hoofdingang, en een laadpunt voor elektrische auto's." }
      ],
      bronnen: [BRON.locaties, BRON.ict, BRON.voorzieningenArnhem, BRON.faciliteiten],
      vleugelkaart: true
    },
    {
      id: "r27",
      campus: "arnhem",
      code: "R27",
      naam: "Ruitenberglaan 27",
      adres: "Ruitenberglaan 27, 6826 CC Arnhem",
      telefoon: "(026) 369 19 12",
      vleugels: ["G"],
      hier: ["Pabo en Master Contextuele Vakdidactiek", "Bibliotheek Meet &amp; Read op de 1e verdieping"],
      feiten: [
        { icoon: "i-elevator", tekst: "Er is een lift op de begane grond, naast de receptie." },
        { icoon: "i-wheelchair", tekst: "Op de 1e etage, bij de kantine, is een aangepast toilet bij de heren." },
        { icoon: "i-door-enter", tekst: "Bij de ingang ligt een rolstoelhellingbaan. De toegangsdeur op de begane grond bedien je met de rode knop. Alle lokalen zijn bereikbaar." },
        { icoon: "i-parking", tekst: "1 parkeerplaats voor een persoon met een beperking, aan de achterzijde van het gebouw." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenArnhem, BRON.bibliotheek]
    },
    {
      id: "r29",
      campus: "arnhem",
      code: "R29",
      naam: "Ruitenberglaan 29",
      adres: "Ruitenberglaan 29, 6826 CC Arnhem",
      telefoon: "(026) 369 19 13",
      vleugels: ["H"],
      hier: ["Automotive"],
      feiten: [
        { icoon: "i-elevator", tekst: "De liften staan in de centrale hal." },
        { icoon: "i-wheelchair", tekst: "Op elke verdieping is een aangepast toilet." },
        { icoon: "i-door-enter", tekst: "Het gebouw is van beide kanten met een rolstoel te bereiken." },
        { icoon: "i-parking", tekst: "2 parkeerplaatsen voor personen met een beperking aan de achterkant van het gebouw." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenArnhem]
    },
    {
      id: "r31",
      campus: "arnhem",
      code: "R31",
      naam: "Ruitenberglaan 31",
      adres: "Ruitenberglaan 31, 6826 CC Arnhem",
      telefoon: "(026) 369 11 11",
      vleugels: ["A", "B", "C", "D"],
      hier: [
        "ASK HAN in de centrale hal, ruimte A0.02",
        "CampusStore en Copycorner in B0.05",
        "Bibliotheek op de 1e verdieping"
      ],
      feiten: [
        { icoon: "i-elevator", tekst: "De liften staan in de centrale hal." },
        { icoon: "i-wheelchair", tekst: "Op alle verdiepingen zijn aangepaste toiletten in de B-gang." },
        { icoon: "i-door-enter", tekst: "Alle ruimtes zijn bereikbaar." },
        { icoon: "i-parking", tekst: "7 parkeerplaatsen voor personen met een beperking achter het gebouw, en een laadpunt voor elektrische auto's." }
      ],
      bronnen: [BRON.locaties, BRON.faciliteiten, BRON.bibliotheek, BRON.voorzieningenArnhem]
    },
    {
      id: "k33",
      campus: "nijmegen",
      code: "K33",
      naam: "Kapittelweg 33",
      adres: "Kapittelweg 33, 6525 EN Nijmegen",
      telefoon: "(024) 353 15 00",
      vleugels: ["A", "B", "C", "D"],
      hier: [
        "ASK HAN in de centrale hal, ruimte D0.41",
        "CampusStore, Copycorner en Grafisch Productie Centrum in D0.40",
        "Bibliotheek op de 1e en 2e verdieping"
      ],
      feiten: [
        { icoon: "i-elevator", tekst: "Naast de rode deur gaat de lift naar de A-vleugel en naar Kapittelweg 35. Er is ook een lift naar het podium van A0.05." },
        { icoon: "i-wheelchair", tekst: "Aangepaste toiletten bij D0.64, D3.52 en D5.28 in de D-vleugel, bij B0.42B en bij C0.97. Het toilet bij D1.36 is door de verbouwing tijdelijk niet bereikbaar." },
        { icoon: "i-parking", tekst: "3 parkeerplaatsen voor personen met een beperking naast de rode deur. De 5 plaatsen bij de hoofdingang zijn door de verbouwing tijdelijk niet bereikbaar." }
      ],
      bronnen: [BRON.locaties, BRON.faciliteiten, BRON.bibliotheek, BRON.voorzieningenNijmegen]
    },
    {
      id: "k35",
      campus: "nijmegen",
      code: "K35",
      naam: "Kapittelweg 35",
      adres: "Kapittelweg 35, 6525 EN Nijmegen",
      telefoon: "(024) 353 15 01",
      vleugels: ["E"],
      hier: ["Bibliotheek Meet &amp; Read"],
      feiten: [
        { icoon: "i-elevator", tekst: "Links bij de ingang gaan de liften naar alle verdiepingen. Vanaf de 1e etage kom je met de lift in Kapittelweg 33." },
        { icoon: "i-wheelchair", tekst: "Aangepaste toiletten bij E-1.137, E-1.120, E0.137, E1.137, E1.154, E2.137, E3.137 en E4.137. Alle lokalen zijn rolstoeltoegankelijk." },
        { icoon: "i-parking", tekst: "In de parkeergarage op -2 liggen 4 plaatsen voor personen met een beperking bij de lift, en er is een laadpunt." }
      ],
      bronnen: [BRON.locaties, BRON.bibliotheek, BRON.voorzieningenNijmegen, BRON.parkeren]
    },
    {
      id: "lvs2",
      campus: "nijmegen",
      code: "LvS 2",
      naam: "Laan van Scheut 2",
      adres: "Laan van Scheut 2, 6525 EM Nijmegen",
      telefoon: "",
      vleugels: ["G"],
      hier: [],
      feiten: [
        { icoon: "i-elevator", tekst: "Er is een lift aanwezig." },
        { icoon: "i-wheelchair", tekst: "Er is 1 aangepast toilet bij G0.59. Alle ruimtes zijn rolstoeltoegankelijk." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenNijmegen]
    },
    {
      id: "lvs10",
      campus: "nijmegen",
      code: "LvS 10",
      naam: "Laan van Scheut 10",
      adres: "Laan van Scheut 10, 6525 EM Nijmegen",
      telefoon: "(024) 353 15 02",
      vleugels: ["F"],
      hier: [],
      feiten: [
        { icoon: "i-elevator", tekst: "Op elke verdieping is een lift." },
        { icoon: "i-wheelchair", tekst: "Aangepaste toiletten bij F0.268, F1.258 en F2.258. Bij de receptie kun je een conci&euml;rge laten bellen die je met de lift naar de juiste etage brengt." },
        { icoon: "i-parking", tekst: "3 plaatsen voor personen met een beperking aan de achterzijde en 2 bij de hoofdingang van het Bisschop Hamerhuis. De parkeergarage is goed bereikbaar en er is een laadpunt." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenNijmegen, BRON.parkeren]
    },
    {
      id: "bhh",
      campus: "nijmegen",
      code: "BHH",
      naam: "Bisschop Hamerhuis",
      adres: "Verlengde Groenestraat 75, 6525 EJ Nijmegen",
      telefoon: "(024) 353 15 04",
      vleugels: ["H"],
      hier: [],
      feiten: [
        { icoon: "i-elevator", tekst: "Op elke verdieping is een lift." },
        { icoon: "i-wheelchair", tekst: "Op de begane grond is een aangepast toilet bij H.064." },
        { icoon: "i-door-enter", tekst: "De hoofdingang en de zijingang hebben allebei een deur met drukknop en een rolstoelbaan." },
        { icoon: "i-parking", tekst: "2 parkeerplaatsen voor personen met een beperking bij de hoofdingang." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenNijmegen]
    },
    {
      id: "gymnasion",
      campus: "nijmegen",
      code: "Gymnasion",
      naam: "Gymnasion",
      adres: "Heyendaalseweg 141, 6525 AJ Nijmegen",
      telefoon: "(024) 353 15 07",
      vleugels: ["A", "Z"],
      hier: ["Sportvoorzieningen"],
      feiten: [
        { icoon: "i-elevator", tekst: "Met de lift naast ruimte Z-1.481 bereik je alle etages. Voor collegezaal Z01.555 is een plateau aanwezig." },
        { icoon: "i-wheelchair", tekst: "Het aangepaste toilet zit op A-1.582." },
        { icoon: "i-parking", tekst: "4 parkeerplaatsen voor personen met een beperking in de parkeergarage. Het Gymnasion is te bereiken via de parkeergarage op -1." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenNijmegen]
    },
    {
      id: "albertinum",
      campus: "nijmegen",
      code: "Albertinum",
      naam: "Albertinum",
      adres: "Heyendaalseweg 121, 6525 AJ Nijmegen",
      telefoon: "",
      vleugels: ["K"],
      hier: [],
      feiten: [
        { icoon: "i-elevator", tekst: "Er is een lift naar de collegezaal, geschikt voor een rolstoel van normaal formaat." },
        { icoon: "i-wheelchair", tekst: "Er is een aangepast toilet op K0.13." },
        { icoon: "i-door-enter", tekst: "Je komt binnen bij de kapel of via de hoofdingang van Wibeco, waar een trappenbordes met rolstoelbaan ligt." },
        { icoon: "i-parking", tekst: "Er zijn geen speciale parkeerplaatsen." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenNijmegen]
    },
    {
      id: "pm3",
      campus: "nijmegen",
      code: "PM 3",
      naam: "Professor Molkenboerstraat 3",
      adres: "Prof. Molkenboerstraat 3, 6524 RN Nijmegen",
      telefoon: "(024) 353 15 05",
      vleugels: ["M"],
      hier: ["ICT in Nijmegen"],
      feiten: [
        { icoon: "i-elevator", tekst: "Er is een lift op de begane grond bij M0.57." },
        { icoon: "i-wheelchair", tekst: "Aangepaste toiletten op de begane grond bij M0.73." },
        { icoon: "i-door-enter", tekst: "De hoofdingang aan de Professor Molkenboerstraat heeft een verhoogde drempel. Alle ruimtes zijn te bereiken, de aula via een schuine baan." },
        { icoon: "i-parking", tekst: "1 parkeerplaats voor een persoon met een beperking achter het gebouw, bereikbaar via de Heijendaalseweg." }
      ],
      bronnen: [BRON.locaties, BRON.ict, BRON.voorzieningenNijmegen]
    },
    {
      id: "pvl25",
      campus: "nijmegen",
      code: "PvL 25",
      naam: "Philips van Leydenlaan 25",
      adres: "Philips van Leydenlaan 25, 6525 EX Nijmegen",
      telefoon: "(024) 361 63 65",
      vleugels: ["M362"],
      hier: ["Mondzorgkunde"],
      feiten: [
        { icoon: "i-elevator", tekst: "Aan de voor- en achterzijde gaan liften naar de verdiepingen -1 tot en met 6. Voor het middenkerngebouw is er een lift van -1 tot en met 2." },
        { icoon: "i-wheelchair", tekst: "Aangepaste toiletten bij M362-1038D en M362.00.072 aan de achterzijde, en bij M362.01.118, M362.02.218, M362.03.318, M362.04.418, M362.05.518 en M362.06.618 aan de voorzijde." },
        { icoon: "i-parking", tekst: "4 parkeerplaatsen voor personen met een beperking bij de ingang van het gebouw." }
      ],
      bronnen: [BRON.locaties, BRON.voorzieningenNijmegen]
    },
    {
      id: "gw1",
      campus: "nijmegen",
      code: "GW 1",
      naam: "Groenewoudseweg 1",
      adres: "Groenewoudseweg 1, 6524 TM Nijmegen",
      telefoon: "",
      vleugels: ["P"],
      hier: [],
      feiten: [
        { icoon: "i-elevator", tekst: "Er is 1 lift bij P0.15, 1 in de centrale hal naar beneden en de 1e etage, en 1 in het eerste bijgebouw tegenover P0.33." },
        { icoon: "i-wheelchair", tekst: "In de centrale hal is 1 aangepast toilet naast de receptie en 1 tegenover subruimte P.35." },
        { icoon: "i-parking", tekst: "2 parkeerplaatsen voor personen met een beperking aan de voorzijde en 2 aan de achterkant." }
      ],
      bronnen: [BRON.voorzieningenNijmegen]
    }
  ];

  const R26_VLEUGELS = [
    {
      letter: "A",
      naam: "A-vleugel",
      x: 300, y: 375,
      gebied: "M97 324L257 324L305 295L413 295L470 380L512 494L257 513L97 456Z",
      regels: [
        "De centrale hal, met de receptie en de hoofdingang.",
        "Aangepast toilet bij A0.206.",
        "Op de begane grond gaat een aangepaste lift van A.0 naar B.0.",
        "Vergaderruimte A1.01 is niet bereikbaar voor rolstoelgebruikers."
      ]
    },
    {
      letter: "B",
      naam: "B-vleugel",
      x: 400, y: 110,
      gebied: "M257 3L606 3L588 191L413 210L408 305L300 305L290 191Z",
      regels: [
        "ICT heeft hier les, samen met de C-vleugel.",
        "Het B-gebouw heeft 2 liften.",
        "Aangepast toilet bij B2.122.",
        "Ingang B ligt aan de noordkant van deze vleugel."
      ]
    },
    {
      letter: "C",
      naam: "C-vleugel",
      x: 580, y: 470,
      gebied: "M451 390L752 371L766 522L517 560Z",
      regels: [
        "ICT heeft hier les, samen met de B-vleugel.",
        "1 lift naar alle verdiepingen.",
        "Aangepast toilet bij C0.80."
      ]
    },
    {
      letter: "D",
      naam: "D-vleugel",
      x: 540, y: 600,
      gebied: "M456 531L550 512L682 739L512 777Z",
      regels: [
        "1 lift naar alle verdiepingen.",
        "Aangepast toilet bij D1.80."
      ]
    },
    {
      letter: "E",
      naam: "E-vleugel",
      x: 250, y: 620,
      gebied: "M97 456L257 513L474 551L493 607L305 739L135 683Z",
      regels: [
        "1 lift naar alle verdiepingen.",
        "Deze vleugel heeft geen aangepast toilet.",
        "Ingang Zuid ligt aan deze kant van het gebouw."
      ]
    },
    {
      letter: "F",
      naam: "F-vleugel",
      x: 124, y: 140,
      gebied: "M4 3L248 3L253 333L135 333L4 277Z",
      regels: [
        "1 lift naar alle verdiepingen.",
        "Aangepaste toiletten bij F.3.74, F2.67, F1.42 en F0.2.05.",
        "Op de 1e verdieping ligt een studielandschap.",
        "Ingang F ligt bij de overgang naar de gang richting de centrale hal."
      ]
    }
  ];

  const R26_INGANGEN = [
    { naam: "Hoofdingang", x: 324, y: 330, uitleg: "Bij de centrale hal in de A-vleugel." },
    { naam: "Ingang B", x: 455, y: 33, uitleg: "Aan de noordkant, bij de B-vleugel." },
    { naam: "Ingang F", x: 213, y: 202, uitleg: "Bij de F-vleugel." },
    { naam: "Ingang Zuid", x: 261, y: 666, uitleg: "Aan de zuidkant, bij de E-vleugel." }
  ];

  const OVERIG = [
    { naam: "Papendallaan 51", plaats: "6816 VD Arnhem", extra: "Sport en Bewegen, op Papendal" },
    { naam: "HAN@Connectr", plaats: "Westervoortsedijk 73 KB-5, 6827 AV Arnhem", extra: "Engineering en Automotive" }
  ];

  function veilig(tekst) {
    return String(tekst).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function el(naam, klasse) {
    const knoop = document.createElementNS(NS, naam);
    if (klasse) knoop.setAttribute("class", klasse);
    return knoop;
  }

  function pad(d, klasse) {
    const knoop = el("path", klasse);
    knoop.setAttribute("d", d);
    return knoop;
  }

  function vindGebouw(id) {
    for (let i = 0; i < GEBOUWEN.length; i++) {
      if (GEBOUWEN[i].id === id) return GEBOUWEN[i];
    }
    return null;
  }

  function icoon(naam) {
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#' + naam + '"></use></svg>';
  }

  function bronregel(bronnen) {
    const delen = bronnen.map(function (bron) {
      return '<a href="' + bron.url + '" target="_blank" rel="noopener">' + veilig(bron.label) + "</a>";
    });
    return '<p class="bron u-small">' + delen.join(", ") + "</p>";
  }

  function paneelHtml(gebouw) {
    let html = '<p class="paneel__code">' + veilig(gebouw.code) + "</p>";
    html += "<h3>" + veilig(gebouw.naam) + "</h3>";
    html += '<p class="u-muted">' + veilig(gebouw.adres) + "</p>";

    if (gebouw.telefoon) {
      html += '<p class="paneel__tel">' + icoon("i-phone") + " " + veilig(gebouw.telefoon) + "</p>";
    }

    if (gebouw.vleugels.length) {
      html += '<p class="paneel__label">Vleugels</p><p class="vleugelrij">';
      html += gebouw.vleugels.map(function (letter) {
        return '<span class="vleugelmerk">' + veilig(letter) + "</span>";
      }).join("");
      html += "</p>";
    }

    if (gebouw.hier.length) {
      html += '<p class="paneel__label">Hier vind je</p><ul class="paneel__lijst">';
      html += gebouw.hier.map(function (regel) { return "<li>" + regel + "</li>"; }).join("");
      html += "</ul>";
    }

    if (gebouw.feiten.length) {
      html += '<ul class="feiten">';
      html += gebouw.feiten.map(function (feit) {
        return '<li class="feit">' + icoon(feit.icoon) + "<span>" + feit.tekst + "</span></li>";
      }).join("");
      html += "</ul>";
    }

    if (gebouw.vleugelkaart) {
      html += '<p class="u-mb0"><a class="btn btn--outline btn--sm" href="#vleugels">' +
        "Bekijk de vleugels " + icoon("i-arrow-right") + "</a></p>";
    }

    html += bronregel(gebouw.bronnen);
    return html;
  }

  function schaalbalk(kaart, meters) {
    const eenheden = meters / kaart.m;
    const groep = el("g", "kaart__schaal");
    const y = kaart.h - 26;
    groep.appendChild(pad("M24 " + y + "h" + Math.round(eenheden), "kaart__schaallijn"));
    groep.appendChild(pad("M24 " + (y - 6) + "v12M" + (24 + Math.round(eenheden)) + " " + (y - 6) + "v12", "kaart__schaallijn"));
    const tekst = el("text", "kaart__schaaltekst");
    tekst.setAttribute("x", 24);
    tekst.setAttribute("y", y - 12);
    tekst.textContent = meters + " m";
    groep.appendChild(tekst);
    return groep;
  }

  function noorden(kaart) {
    const groep = el("g", "kaart__noorden");
    groep.appendChild(pad("M" + (kaart.w - 44) + " 66l14-38l14 38l-14-12Z", "kaart__pijl"));
    const tekst = el("text", "kaart__noordletter");
    tekst.setAttribute("x", kaart.w - 30);
    tekst.setAttribute("y", 88);
    tekst.textContent = "N";
    groep.appendChild(tekst);
    return groep;
  }

  function tekenCampus(campus, kies) {
    const kaart = GEO[campus];
    const svg = el("svg", "kaart__svg");
    svg.setAttribute("viewBox", "0 0 " + kaart.w + " " + kaart.h);
    svg.setAttribute("role", "group");
    svg.setAttribute("aria-label", "Plattegrond van campus " + CAMPUSSEN[campus].naam);

    const omgeving = el("g", "kaart__omgeving");
    kaart.omgeving.forEach(function (d) { omgeving.appendChild(pad(d)); });
    svg.appendChild(omgeving);

    const wegen = el("g", "kaart__wegen");
    kaart.wegen.forEach(function (weg) {
      wegen.appendChild(pad(weg.d, "weg weg--" + weg.s));
    });
    svg.appendChild(wegen);

    const gebouwen = el("g", "kaart__gebouwen");
    kaart.gebouwen.forEach(function (vorm) {
      const info = vindGebouw(vorm.id);
      if (!info) return;

      const groep = el("g", "gebouw");
      groep.setAttribute("tabindex", "0");
      groep.setAttribute("role", "button");
      groep.setAttribute("data-gebouw", vorm.id);
      groep.setAttribute("aria-label", info.naam + ", " + info.adres);

      const vlak = pad(vorm.d, "gebouw__vlak");
      vlak.setAttribute("fill-rule", "evenodd");
      groep.appendChild(vlak);

      const breedte = info.code.length * 11 + 18;
      const merk = el("rect", "gebouw__merk");
      merk.setAttribute("x", vorm.x - breedte / 2);
      merk.setAttribute("y", vorm.y - 14);
      merk.setAttribute("width", breedte);
      merk.setAttribute("height", 28);
      groep.appendChild(merk);

      const tekst = el("text", "gebouw__tekst");
      tekst.setAttribute("x", vorm.x);
      tekst.setAttribute("y", vorm.y + 6);
      tekst.textContent = info.code;
      groep.appendChild(tekst);

      groep.addEventListener("click", function () { kies(vorm.id); });
      groep.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        kies(vorm.id);
      });

      gebouwen.appendChild(groep);
    });
    svg.appendChild(gebouwen);

    svg.appendChild(schaalbalk(kaart, campus === "arnhem" ? 100 : 200));
    svg.appendChild(noorden(kaart));
    return svg;
  }

  function initCampuskaart() {
    const wortel = document.querySelector("[data-kaart]");
    if (!wortel || !GEO) return;

    const vlak = wortel.querySelector("[data-kaart-vlak]");
    const paneel = wortel.querySelector("[data-kaart-paneel]");
    const tabs = Array.prototype.slice.call(wortel.querySelectorAll("[data-campus]"));
    let huidig = "arnhem";
    let gekozen = "";

    function markeer() {
      vlak.querySelectorAll("[data-gebouw]").forEach(function (groep) {
        groep.classList.toggle("is-actief", groep.getAttribute("data-gebouw") === gekozen);
      });
    }

    function kies(id) {
      const gebouw = vindGebouw(id);
      if (!gebouw) return;
      gekozen = id;
      paneel.innerHTML = paneelHtml(gebouw);
      paneel.scrollTop = 0;
      markeer();
    }

    function toon(campus) {
      huidig = campus;
      tabs.forEach(function (tab) {
        const actief = tab.getAttribute("data-campus") === campus;
        tab.setAttribute("aria-selected", String(actief));
        tab.classList.toggle("is-actief", actief);
      });
      vlak.innerHTML = "";
      vlak.appendChild(tekenCampus(campus, kies));
      const eerste = GEO[campus].gebouwen[0];
      kies(eerste ? eerste.id : "");
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { toon(tab.getAttribute("data-campus")); });
    });

    toonGebouw = function (id) {
      const gebouw = vindGebouw(id);
      if (!gebouw) return;
      if (gebouw.campus !== huidig) toon(gebouw.campus);
      kies(id);
    };

    toon(startCampus());
  }

  function startCampus() {
    try {
      const ruw = localStorage.getItem(SLEUTEL_PROFIEL);
      if (!ruw) return "arnhem";
      const profiel = JSON.parse(ruw);
      return profiel && profiel.locatie === "nijmegen" ? "nijmegen" : "arnhem";
    } catch (fout) {
      return "arnhem";
    }
  }

  function initVleugelkaart() {
    const wortel = document.querySelector("[data-vleugelkaart]");
    if (!wortel || !GEO || !GEO.r26) return;

    const vlak = wortel.querySelector("[data-vleugel-vlak]");
    const paneel = wortel.querySelector("[data-vleugel-paneel]");
    const kaart = GEO.r26;

    const svg = el("svg", "vleugelkaart__svg");
    svg.setAttribute("viewBox", "0 0 " + kaart.w + " " + kaart.h);
    svg.setAttribute("role", "group");
    svg.setAttribute("aria-label", "Vleugels van Ruitenberglaan 26");

    const defs = el("defs");
    const knip = el("clipPath");
    knip.setAttribute("id", "r26-omtrek");
    const knipvorm = pad(kaart.d);
    knipvorm.setAttribute("clip-rule", "evenodd");
    knip.appendChild(knipvorm);
    defs.appendChild(knip);
    svg.appendChild(defs);

    const grond = pad(kaart.d, "vleugelkaart__grond");
    grond.setAttribute("fill-rule", "evenodd");
    svg.appendChild(grond);

    const zones = el("g", "vleugelkaart__zones");
    zones.setAttribute("clip-path", "url(#r26-omtrek)");
    svg.appendChild(zones);

    const merken = el("g", "vleugelkaart__merken");
    svg.appendChild(merken);

    function kies(letter) {
      const vleugel = R26_VLEUGELS.filter(function (v) { return v.letter === letter; })[0];
      if (!vleugel) return;

      zones.querySelectorAll("[data-zone]").forEach(function (zone) {
        zone.classList.toggle("is-actief", zone.getAttribute("data-zone") === letter);
      });
      merken.querySelectorAll("[data-vleugel]").forEach(function (merk) {
        merk.classList.toggle("is-actief", merk.getAttribute("data-vleugel") === letter);
      });

      let html = "<h3>" + veilig(vleugel.naam) + "</h3><ul class=\"paneel__lijst\">";
      html += vleugel.regels.map(function (regel) { return "<li>" + veilig(regel) + "</li>"; }).join("");
      html += "</ul>";
      html += bronregel([BRON.voorzieningenArnhem, BRON.ict, BRON.programma]);
      paneel.innerHTML = html;
    }

    R26_VLEUGELS.forEach(function (vleugel) {
      const zone = pad(vleugel.gebied, "zone");
      zone.setAttribute("data-zone", vleugel.letter);
      zones.appendChild(zone);
    });

    R26_INGANGEN.forEach(function (ingang) {
      const groep = el("g", "ingang");
      const stip = el("circle", "ingang__stip");
      stip.setAttribute("cx", ingang.x);
      stip.setAttribute("cy", ingang.y);
      stip.setAttribute("r", 13);
      groep.appendChild(stip);
      const titel = el("title");
      titel.textContent = ingang.naam + ". " + ingang.uitleg;
      groep.appendChild(titel);
      merken.appendChild(groep);
    });

    R26_VLEUGELS.forEach(function (vleugel) {
      const groep = el("g", "vleugelmerk-kaart");
      groep.setAttribute("tabindex", "0");
      groep.setAttribute("role", "button");
      groep.setAttribute("data-vleugel", vleugel.letter);
      groep.setAttribute("aria-label", vleugel.naam);

      const vak = el("rect");
      vak.setAttribute("x", vleugel.x - 19);
      vak.setAttribute("y", vleugel.y - 19);
      vak.setAttribute("width", 38);
      vak.setAttribute("height", 38);
      groep.appendChild(vak);

      const tekst = el("text");
      tekst.setAttribute("x", vleugel.x);
      tekst.setAttribute("y", vleugel.y + 9);
      tekst.textContent = vleugel.letter;
      groep.appendChild(tekst);

      groep.addEventListener("click", function () { kies(vleugel.letter); });
      groep.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        kies(vleugel.letter);
      });

      merken.appendChild(groep);
    });

    vlak.innerHTML = "";
    vlak.appendChild(svg);
    kies("A");
  }

  function zoekVleugel(letter) {
    return GEBOUWEN.filter(function (gebouw) {
      return gebouw.vleugels.indexOf(letter) !== -1;
    });
  }

  function alleLetters() {
    const letters = [];
    GEBOUWEN.forEach(function (gebouw) {
      gebouw.vleugels.forEach(function (letter) {
        if (letters.indexOf(letter) === -1) letters.push(letter);
      });
    });
    return letters.sort();
  }

  function gaNaar(id) {
    if (toonGebouw) toonGebouw(id);
    const kaart = document.getElementById("kaart");
    if (kaart) kaart.scrollIntoView({ block: "start" });
  }

  function initVleugelwijzer() {
    const rij = document.querySelector("[data-vleugelwijzer]");
    const uitslag = document.querySelector("[data-vleugel-uitslag]");
    if (!rij || !uitslag) return;

    function toon(letter) {
      rij.querySelectorAll("[data-letter]").forEach(function (knop) {
        knop.classList.toggle("is-actief", knop.getAttribute("data-letter") === letter);
        knop.setAttribute("aria-pressed", String(knop.getAttribute("data-letter") === letter));
      });

      const gebouwen = zoekVleugel(letter);
      let html = '<p class="paneel__label">Vleugel ' + veilig(letter) + " zit in</p>";
      html += '<div class="uitslag__knoppen">';
      html += gebouwen.map(function (gebouw) {
        return '<button type="button" class="chip chip--gebouw" data-ga-naar="' + gebouw.id + '">' +
          veilig(gebouw.naam) + ' <span class="chip__plaats">' + veilig(CAMPUSSEN[gebouw.campus].naam) + "</span></button>";
      }).join("");
      html += "</div>";

      if (gebouwen.length > 1) {
        html += '<p class="u-small u-muted u-mb0">Deze letter komt in meer dan een gebouw voor. ' +
          "Kijk in je rooster welk adres bij de les staat.</p>";
      } else {
        html += '<p class="u-small u-muted u-mb0">Deze letter komt maar in een gebouw voor.</p>';
      }

      uitslag.innerHTML = html;
      uitslag.querySelectorAll("[data-ga-naar]").forEach(function (knop) {
        knop.addEventListener("click", function () { gaNaar(knop.getAttribute("data-ga-naar")); });
      });
    }

    rij.innerHTML = alleLetters().map(function (letter) {
      return '<button type="button" class="chip" data-letter="' + veilig(letter) + '" aria-pressed="false">' +
        veilig(letter) + "</button>";
    }).join("");

    rij.querySelectorAll("[data-letter]").forEach(function (knop) {
      knop.addEventListener("click", function () { toon(knop.getAttribute("data-letter")); });
    });

    toon("B");
  }

  function initOverig() {
    const lijst = document.querySelector("[data-overig]");
    if (!lijst) return;

    lijst.innerHTML = OVERIG.map(function (plek) {
      return "<li><strong>" + veilig(plek.naam) + "</strong><br>" +
        '<span class="u-muted">' + veilig(plek.plaats) + ". " + veilig(plek.extra) + "</span></li>";
    }).join("");
  }

  function toonStoring() {
    const vlak = document.querySelector("[data-kaart-vlak]");
    if (!vlak) return;
    vlak.innerHTML = '<div class="verdict is-fout">' +
      '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-alert"></use></svg> ' +
      "De kaart is niet beschikbaar. Ververs de pagina en probeer het opnieuw.</div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      initCampuskaart();
      initVleugelkaart();
      initVleugelwijzer();
      initOverig();
    } catch (fout) {
      toonStoring();
    }
  });
})();
