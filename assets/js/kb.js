const KB = [

  {
    id: "brightspace",
    titel: "Brightspace: leermateriaal en berichten van docenten",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["brightspace", "leeromgeving", "leren", "lesmateriaal", "leermateriaal",
      "opdrachten", "opdracht", "inleveren", "inlever", "verslag", "huiswerk", "deadline",
      "cursus", "modules", "elo", "docent bericht"],
    body: `
      <p>Brightspace is de online leeromgeving van de HAN. Je vindt er de leermaterialen
      en berichten van docenten, en je levert er opdrachten in.</p>
      <p><strong>Inloggen:</strong> <a href="https://leren.han.nl" target="_blank" rel="noopener">leren.han.nl</a>
      met je HANaccount.</p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "osiris",
    titel: "Osiris: cijfers, inschrijven voor toetsen en onderwijs",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["osiris", "cijfers", "resultaten", "studieresultaten", "inschrijven", "intekenen",
      "tentamen", "toets", "studievoortgang", "punten bekijken", "afspraak studieloopbaan"],
    body: `
      <p>In Osiris check je je studieresultaten en je rooster, en schrijf je je in voor tentamens.
      Ook je studievoortgang staat hier.</p>
      <p><strong>Inloggen:</strong> <a href="https://han.osiris-student.nl/#/login" target="_blank" rel="noopener">han.osiris-student.nl</a>
      of via <a href="https://osiris.han.nl/" target="_blank" rel="noopener">osiris.han.nl</a>.
      Er is ook een Osiris-app voor Android en iOS.</p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "myx",
    titel: "MyX (My Xedule): je rooster",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["myx", "xedule", "rooster", "lesrooster", "wanneer les", "uitval", "roosterwijziging",
      "welk lokaal", "hoe laat begint"],
    body: `
      <p>Je rooster staat in MyX (My Xedule). Je logt in met je HANaccount.</p>
      <p><strong>Inloggen:</strong> <a href="https://myx-han.xedule.nl/" target="_blank" rel="noopener">myx-han.xedule.nl</a></p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "office365",
    titel: "Teams en Outlook: communicatie en HAN-mail",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["teams", "outlook", "mail", "e-mail", "email", "han-mail", "office", "office365",
      "microsoft", "word", "excel", "vergaderen", "chat docent"],
    body: `
      <p>Als HAN-student krijg je Office 365. Daar horen je HAN-mailbox (Outlook) en Teams bij.
      Belangrijke berichten over je inschrijving komen op je HAN-mail, dus check die echt.</p>
      <p><strong>Inloggen:</strong> <a href="https://office365.han.nl" target="_blank" rel="noopener">office365.han.nl</a>.
      Office kun je gratis downloaden via microsoft365.com.</p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "hanaccount",
    titel: "HANaccount en Microsoft Authenticator",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["hanaccount", "account", "inloggen", "wachtwoord", "mfa", "authenticator",
      "tweestapsverificatie", "kan niet inloggen", "login"],
    body: `
      <p>Je HANaccount is de sleutel tot alle digitale voorzieningen van de HAN. Het wordt automatisch
      aangemaakt zodra je inschrijving rond is; je inloggegevens krijg je per e-mail.</p>
      <p>Je hebt de <strong>Microsoft Authenticator-app</strong> nodig voor multifactor-authenticatie (MFA).
      Installeer die dus meteen op je telefoon.</p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "wifi",
    titel: "Wifi op de campus: eduroam",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["wifi", "eduroam", "internet", "netwerk", "draadloos", "verbinding"],
    body: `
      <p>Op de campus gebruik je het draadloze netwerk <strong>eduroam</strong>. Je stelt het in met de
      geteduroam-app en logt in met je HANaccount. Eduroam werkt ook op andere hogescholen en universiteiten.</p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "insite",
    titel: "HAN Insite: het studentenportaal",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["insite", "portaal", "regelingen", "oer", "opleidingsstatuut", "rechten en plichten",
      "waar vind ik informatie", "studentenportaal"],
    body: `
      <p>Insite is het centrale portaal met opleidingsinformatie, begeleiding en voorzieningen.
      Ook het OS/OER (Opleidingsstatuut en Onderwijs- en Examenregeling) vind je hier onder
      <em>Jouw opleiding &rsaquo; Rechten en plichten</em>.</p>
      <p><strong>Link:</strong> <a href="https://www1.han.nl/insite/" target="_blank" rel="noopener">www1.han.nl/insite</a></p>`,
    bron: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" }
  },
  {
    id: "isas-ans",
    titel: "iSAS en ANS",
    categorie: "Systemen",
    status: "todo",
    trefwoorden: ["isas", "ans", "digitaal toetsen", "toetsprogramma", "academie", "isas.han.nl"],
    body: `
      <p><strong>ANS</strong> gebruik je voor digitaal toetsen. <strong>iSAS</strong> is een systeem van
      onze eigen academie, te vinden via <code>isas.han.nl</code>.</p>
      <p>Je docent of studiebegeleider laat weten wanneer je welk systeem nodig hebt en hoe je inlogt.</p>`,
    bron: { label: "", url: "" }
  },

  {
    id: "ec",
    titel: "Studiepunten (EC): hoeveel en hoe zwaar?",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["studiepunten", "ec", "ects", "punten", "hoeveel uur", "studielast", "28 uur",
      "60 punten", "240", "hoeveel punten per jaar"],
    body: `
      <p>Per studiejaar kun je <strong>60 studiepunten (EC)</strong> halen. De hele bacheloropleiding ICT
      is <strong>240 EC</strong> in 4 jaar.</p>
      <p><strong>1 EC staat voor 28 uur</strong> studie: lessen en zelfstudie bij elkaar.
      60 EC keer 28 uur is 1680 uur per jaar, ongeveer 40 uur per week.</p>`,
    bron: { label: "ICT voltijd op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/dit-is-je-studie/" }
  },
  {
    id: "bsa",
    titel: "Bindend studieadvies (BSA): minimaal 30 EC in jaar 1",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["bsa", "bindend studieadvies", "studieadvies", "hoeveel punten moet ik halen",
      "eerste jaar", "negatief advies", "stoppen", "doorgaan naar jaar 2", "norm", "30 ec"],
    body: `
      <p>Om een <strong>positief studieadvies</strong> te krijgen en door te gaan naar jaar 2, moet je in het
      eerste jaar <strong>minimaal 30 EC</strong> halen. Dat is de helft van de 60 EC die je in een jaar
      kunt halen.</p>
      <p>Bereken met de <a href="studiepunten.html#calculator">EC-calculator</a> hoe je ervoor staat.</p>
      <p class="u-muted u-small">De exacte regels, uitzonderingen en persoonlijke omstandigheden staan
      in het OS/OER van jouw opleiding, te vinden op Insite onder Jouw opleiding, Rechten en plichten.
      Dat document is leidend.</p>`,
    bron: { label: "ICT voltijd op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/dit-is-je-studie/" }
  },
  {
    id: "propedeuse",
    titel: "Het eerste jaar (propedeuse) en de 3 profielen",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["propedeuse", "eerste jaar", "profiel", "afstudeerrichting", "specialisatie",
      "software", "robotics", "data", "ai", "infra", "cybersecurity", "kiezen"],
    body: `
      <p>Het eerste jaar is breed: je maakt kennis met alle kanten van ICT, verdeeld over vier periodes.
      Je start met <em>ICT in jouw omgeving</em>, daarna ICT in organisaties, dan proef je aan twee richtingen,
      en je sluit af met een groepsproject.</p>
      <p>Aan het eind van jaar 1 kies je een van de drie profielen:</p>
      <ul>
        <li><strong>Software &amp; Robotics</strong>: complexe applicaties en embedded software</li>
        <li><strong>Data &amp; AI</strong>: dataplatforms en artificial intelligence</li>
        <li><strong>Infra &amp; Cybersecurity</strong>: IT-infrastructuur en beveiliging</li>
      </ul>`,
    bron: { label: "ICT voltijd op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/dit-is-je-studie/" }
  },

  {
    id: "locatie",
    titel: "Waar zit de opleiding ICT?",
    categorie: "Campus",
    status: "check",
    trefwoorden: ["locatie", "adres", "campus", "arnhem", "nijmegen", "ruitenberglaan", "molkenboerstraat",
      "waar moet ik zijn", "gebouw", "vleugel", "hoe kom ik er"],
    body: `
      <p>De opleiding ICT heeft twee locaties:</p>
      <ul>
        <li><strong>Arnhem</strong>: Ruitenberglaan 26, 6826 CC. De opleiding zit in de B- en C-vleugel.</li>
        <li><strong>Nijmegen</strong>: Prof. Molkenboerstraat 3, 6524 RN</li>
      </ul>
      <p>In welk lokaal je moet zijn, staat in je rooster in
      <a href="https://myx-han.xedule.nl/" target="_blank" rel="noopener">MyX</a>.</p>`,
    bron: { label: "Praktische info ICT op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/" }
  },
  {
    id: "zelfstudieplek",
    titel: "Werken tussen je lessen door",
    categorie: "Campus",
    status: "todo",
    trefwoorden: ["zelfstudieplek", "studieplek", "stilteplek", "zelfstandig werken", "leren op school",
      "werkplek", "vrije plek", "rustige plek", "bibliotheek", "mediatheek", "waar kan ik werken",
      "tussenuur", "kantine"],
    body: `
      <p>Op de campus zijn open werkplekken en zitplekken in de kantine waar je tussen lessen door
      kunt werken.</p>
      <p>Welke ruimtes vrij toegankelijk zijn, verschilt per gebouw en per moment. Je studiebegeleider
      of een ouderejaars kan je snel de vaste plekken laten zien.</p>`,
    bron: { label: "", url: "" }
  },

  {
    id: "slc",
    titel: "Je studiebegeleider: het eerste aanspreekpunt",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["studiebegeleider", "slb", "slc", "studieloopbaancoach", "mentor", "begeleider",
      "studieadviseur", "loop vast", "hulp bij studie", "met wie praten", "aanspreekpunt",
      "wil stoppen", "twijfel over mijn studie", "motivatie"],
    body: `
      <p>Je studiebegeleider is je persoonlijke begeleider (mentor) tijdens je studie en je eerste
      aanspreekpunt binnen de HAN. Loop je ergens tegenaan of twijfel je? Begin hier.</p>
      <p>Wie jouw studiebegeleider is, hoor je aan het begin van je studie.</p>`,
    bron: { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }
  },
  {
    id: "psycholoog",
    titel: "Studentenpsycholoog",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["psycholoog", "faalangst", "uitstelgedrag", "somber", "angst", "rouw", "stress",
      "niet lekker in mijn vel", "mentaal", "burn-out", "hulp mentaal",
      "voel me niet", "voel me rot", "eenzaam", "heimwee", "depressief", "paniek",
      "piekeren", "piekeer", "slecht slapen", "slaap slecht"],
    body: `
      <p>De studentenpsychologen helpen bij bijvoorbeeld faalangst, uitstelgedrag, rouwverwerking,
      somberheid en angstgevoelens. Je hoeft geen groot probleem te hebben om je te melden.</p>
      <p><a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentenpsychologen/" target="_blank" rel="noopener">Studentenpsychologen op Insite</a></p>`,
    bron: { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }
  },
  {
    id: "decaan",
    titel: "Studentendecaan: geld, inschrijving en bijzondere omstandigheden",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["decaan", "studentendecaan", "geld", "financieel", "collegegeld", "studiefinanciering",
      "beurs", "inschrijving", "uitschrijven", "bijzondere omstandigheden", "regelingen",
      "wil stoppen", "stoppen met mijn studie"],
    body: `
      <p>Heb je vragen over studiefinanciering, collegegeld of beurzen, of kom je door bijzondere
      omstandigheden in de financiële problemen? Dan ga je naar een studentendecaan.</p>
      <p><a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" target="_blank" rel="noopener">Studentendecanen op Insite</a></p>`,
    bron: { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }
  },
  {
    id: "ssc",
    titel: "Student Support Centrum",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["student support", "support centrum", "training", "coach", "studievaardigheden",
      "workshops", "ondersteuning", "functiebeperking", "dyslexie"],
    body: `
      <p>Het Student Support Centrum is een team van trainers, coaches, psychologen en decanen.
      Ze bieden trainingen in persoonlijke ontwikkeling, studievaardigheden en taalvaardigheid,
      en begeleiding bij bijzondere omstandigheden.</p>
      <p><a href="https://www1.han.nl/insite/studenten/panelnav.xml/hulp-ondersteuning-training/" target="_blank" rel="noopener">Hulp, ondersteuning en training op Insite</a></p>`,
    bron: { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" }
  },

  {
    id: "xtend",
    titel: "Studievereniging Xtend",
    categorie: "Meedoen",
    status: "todo",
    trefwoorden: ["studievereniging", "xtend", "vereniging", "borrel", "activiteiten", "lid worden",
      "mensen leren kennen"],
    body: `
      <p>Xtend is de studievereniging voor studenten van de academie IT &amp; Mediadesign. Via een
      studievereniging leer je snel mensen kennen buiten je eigen klas.</p>
      <p>Meer weten over activiteiten en lid worden? Kijk op
      <a href="https://svxtend.nl/" target="_blank" rel="noopener">svxtend.nl</a>.</p>`,
    bron: { label: "svxtend.nl", url: "https://svxtend.nl/" }
  },
  {
    id: "buro302",
    titel: "Buro302: werken aan echte opdrachten",
    categorie: "Meedoen",
    status: "todo",
    trefwoorden: ["buro302", "b302", "bureau", "opdrachten", "ervaring opdoen", "multimedia", "design"],
    body: `
      <p>Buro302 is een bureau dat volledig door studenten wordt gerund. Ze maken multimediaprojecten
      voor echte opdrachtgevers, op het snijvlak van communicatie, multimedia, design en IT.</p>
      <p>Wil je naast je lessen aan echt werk ruiken? Vraag je studiebegeleider hoe je meedoet.</p>`,
    bron: { label: "", url: "" }
  },

  {
    id: "wonen",
    titel: "Op kamers in Arnhem of Nijmegen",
    categorie: "Meedoen",
    status: "todo",
    trefwoorden: ["kamer", "wonen", "huisvesting", "op kamers", "studentenwoning", "huren", "verhuizen"],
    body: `
      <p>Een kamer in Arnhem of Nijmegen vind je via studentenhuisvesters en particuliere verhuur.
      Begin op tijd met zoeken: rond de start van het studiejaar is de drukte het grootst.</p>
      <p>Kom je er financieel niet uit, dan kun je terecht bij een
      <a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" target="_blank" rel="noopener">studentendecaan</a>.</p>`,
    bron: { label: "", url: "" }
  }
];

const KB_CATEGORIEEN = ["Systemen", "Studiepunten", "Campus", "Hulp", "Meedoen"];
