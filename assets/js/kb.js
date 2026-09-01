const BRON = {
  services: { label: "Online services op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/" },
  studie: { label: "ICT voltijd op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/dit-is-je-studie/" },
  praktisch: { label: "Praktische info ICT op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/" },
  succesvol: { label: "Succesvol studeren op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/" },
  insite: { label: "HAN Insite", url: "https://www1.han.nl/insite/" },
  hulpInsite: { label: "Hulp, ondersteuning en training op Insite", url: "https://www1.han.nl/insite/studenten/panelnav.xml/hulp-ondersteuning-training/" },
  decanen: { label: "Studentendecanen op Insite", url: "https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" },
  duo: { label: "duo.nl", url: "https://duo.nl/" },
  hulplijn113: { label: "113 Zelfmoordpreventie", url: "https://www.113.nl/" },
  oer2026: { label: "OS/OER ICT voltijd 2026-2027", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/bacheloropleiding-ict-voltijd.pdf" },
  jaarrooster: { label: "Jaarrooster 2026-2027 op han.nl", url: "https://www.han.nl/studeren/jaarrooster/" },
  faciliteiten: { label: "Studiefaciliteiten op han.nl", url: "https://www.han.nl/studeren/onderwijs/studiefaciliteiten/" },
  werkplekken: { label: "Studentwerkplekken bij de HAN", url: "https://www.han.nl/over-de-han/organisatie/bedrijfsonderdelen/bibliotheek/diensten/" },
  ans: { label: "Digitaal toetsen met Ans op han.nl", url: "https://www.han.nl/onderwijsondersteuning/leren-werken-met-ict/toetsing/" },
  vertrouwenspersonen: { label: "Vertrouwenspersonen bij de HAN", url: "https://www.han.nl/over-de-han/organisatie/bestuur/goed-bestuur/" },
  ictOverzicht: { label: "ICT voltijd op han.nl", url: "https://www.han.nl/opleidingen/hbo/ict/voltijd/" },
  cmdPraktisch: { label: "Praktische info CMD op han.nl", url: "https://www.han.nl/opleidingen/hbo/communication-multimedia-design/voltijd/praktische-info/" },
  stoppen: { label: "Stoppen of switchen op han.nl", url: "https://www.han.nl/studeren/voltijd/switchen-van-studie/" },
  rechten: { label: "Rechten en plichten op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/rechten-plichten/" },
  contact: { label: "Contact met de HAN", url: "https://www.han.nl/contact/" }
};

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
    bron: BRON.services
  },
  {
    id: "osiris",
    titel: "Osiris: studieresultaten en inschrijvingen",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["osiris", "cijfers", "resultaten", "studieresultaten", "inschrijven", "intekenen",
      "tentamen", "toets", "studievoortgang", "punten bekijken", "afspraak studieloopbaan"],
    body: `
      <p>In Osiris bekijk je je studieresultaten en rooster en schrijf je je in voor tentamens.
      Ook je studievoortgang staat hier.</p>
      <p><strong>Inloggen:</strong> <a href="https://han.osiris-student.nl/#/login" target="_blank" rel="noopener">han.osiris-student.nl</a>
      of via <a href="https://osiris.han.nl/" target="_blank" rel="noopener">osiris.han.nl</a>.
      Er is ook een Osiris-app voor Android en iOS.</p>`,
    bron: BRON.services
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
    bron: BRON.services
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
      Belangrijke berichten over je inschrijving ontvang je via je HAN-mail. Controleer deze regelmatig.</p>
      <p><strong>Inloggen:</strong> <a href="https://office365.han.nl" target="_blank" rel="noopener">office365.han.nl</a>.
      Office kun je gratis downloaden via microsoft365.com.</p>`,
    bron: BRON.services
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
      Installeer de app voordat je de HAN-systemen gebruikt.</p>`,
    bron: BRON.services
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
    bron: BRON.services
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
    bron: BRON.services
  },
  {
    id: "rechten-plichten",
    titel: "Je rechten en plichten als HAN-student",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["rechten", "plichten", "studentenstatuut", "studentenrechten", "recht op onderwijs",
      "klacht", "bezwaar", "beroep", "rechtsbescherming", "medezeggenschap", "privacy"],
    body: `
      <p>Je belangrijkste rechten en plichten staan in het <strong>Studentenstatuut</strong>. Daaronder
      vallen je recht op onderwijs en tentamens, studiebegeleiding, ondersteuning bij bijzondere
      omstandigheden, de HAN Bibliotheken, de HANcard en de ICT-voorzieningen.</p>
      <p>Opleidingsregels over onderwijs, toetsen, vrijstellingen en studieadvies staan in het
      <strong>OS/OER van jouw opleiding en studiejaar</strong>. Voor een klacht, bezwaar of beroep is
      Bureau Klachten en Geschillen het centrale loket.</p>`,
    bron: BRON.rechten
  },
  {
    id: "hancard-printen",
    titel: "HANcard, studentenpas en printen",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["hancard", "han-card", "studentenpas", "studentenkaart", "collegekaart", "pasfoto",
      "pas kwijt", "printen", "printer", "scannen", "kopiëren", "kopieren", "copycorner",
      "boeken lenen", "bibliotheek"],
    body: `
      <p>Je <strong>HANcard</strong> is je studentenpas. Je gebruikt hem onder andere om te printen en
      om boeken te lenen bij de studiecentra. De pas wordt automatisch toegestuurd nadat je in
      <em>Mijn Aanmelding</em> een pasfoto hebt geüpload.</p>
      <p>Printers staan op verschillende plekken in de HAN-gebouwen. Voor uitgebreider drukwerk kun je
      terecht bij de Copycorner in de CampusStore: in Arnhem op Ruitenberglaan 31, ruimte B0.05, en in
      Nijmegen op Kapittelweg 33, ruimte D0.40.</p>`,
    bron: BRON.faciliteiten
  },
  {
    id: "isas",
    titel: "iSAS: toetsrooster, deadlines en stage-info",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["isas", "toetsrooster", "inleverdeadlines", "inleverdeadline", "stage-info", "afstudeerinfo", "academie"],
    body: `
      <p><strong>iSAS</strong> is de academiesite van ICT. Je vindt er onder meer het toetsrooster,
      inleverdeadlines en informatie over stage en afstuderen.</p>
      <p><strong>Inloggen:</strong> <a href="https://isas.han.nl/" target="_blank" rel="noopener">isas.han.nl</a>
      met je HANaccount.</p>`,
    bron: BRON.praktisch
  },
  {
    id: "ans",
    titel: "Ans: digitale kennis- en oefentoetsen",
    categorie: "Systemen",
    status: "check",
    trefwoorden: ["ans", "digitaal toetsen", "toetsprogramma", "kennistoets", "oefentoets"],
    body: `
      <p>De HAN gebruikt <strong>Ans</strong> voor digitale kennistoetsen met open en gesloten vragen.
      Ans wordt ook gebruikt voor oefentoetsen met feedback.</p>
      <p>Je docent laat weten wanneer je een toets in Ans maakt en via welke route je hem opent.</p>`,
    bron: BRON.ans
  },

  {
    id: "ec",
    titel: "Studiepunten (EC) en studielast",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["studiepunten", "ec", "ects", "punten", "hoeveel uur", "studielast", "28 uur",
      "60 punten", "240", "hoeveel punten per jaar"],
    body: `
      <p>Per studiejaar kun je <strong>60 studiepunten (EC)</strong> halen. De hele bacheloropleiding ICT
      is <strong>240 EC</strong> in 4 jaar.</p>
      <p><strong>1 EC staat voor 28 uur</strong> studie: lessen en zelfstudie bij elkaar.
      60 EC keer 28 uur is 1680 uur per jaar, ongeveer 40 uur per week.</p>`,
    bron: BRON.studie
  },
  {
    id: "studieadvies",
    titel: "Persoonlijk studieadvies en doorstroomnorm: 40 EC plus taalniveau 3F",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["bsa", "bindend studieadvies", "psa", "persoonlijk studieadvies", "studieadvies",
      "doorstroomnorm", "hoeveel punten moet ik halen", "eerste jaar", "negatief advies", "stoppen",
      "doorgaan naar jaar 2", "norm", "40 ec", "taalniveau", "3f", "hogeschooltaal"],
    body: `
      <p>ICT werkt in studiejaar 2026-2027 met een <strong>persoonlijk studieadvies</strong>. Het advies om
      wel of niet door te gaan is niet bindend en kijkt breder dan alleen studiepunten.</p>
      <p>Om met het onderwijs en de toetsen van jaar 2 te starten geldt wel een
      <strong>doorstroomnorm: minimaal 40 EC uit jaar 1 én aangetoond taalniveau 3F</strong>. Haal je de
      norm nog niet, dan blijf je ingeschreven, maar kun je nog niet aan al het tweedejaarsonderwijs
      beginnen. De examencommissie kan op gemotiveerd verzoek een uitzondering beoordelen.</p>
      <p>Gebruik de <a href="studiepunten.html#calculator">EC-calculator</a> om je behaalde EC met de norm te vergelijken.</p>
      <p class="u-muted u-small">Dit geldt voor ICT voltijd in 2026-2027. Het OS/OER van jouw opleiding
      en studiejaar is altijd leidend.</p>`,
    bron: BRON.oer2026
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
    bron: BRON.studie
  },
  {
    id: "herkansing",
    titel: "Herkansen: een toets opnieuw doen",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["herkansing", "herkansen", "hertentamen", "herexamen", "gezakt", "onvoldoende",
      "toets niet gehaald", "opnieuw doen", "nog een kans", "inhaaltoets"],
    body: `
      <p>Een (deel)tentamen wordt normaal minimaal twee keer per studiejaar aangeboden. Voor ICT
      voltijd geldt in 2026-2027 een maximum van <strong>drie deelnames per studiejaar</strong>. De
      cursusbeschrijving vermeldt hoeveel momenten jouw toets heeft en in welke periodes.</p>
      <p>Intekenen doe je in <a href="https://han.osiris-student.nl/#/login" target="_blank" rel="noopener">Osiris</a>.
      De gewone intekenperiode sluit 10 werkdagen voor de tentamendatum. Zonder intekening mag je niet
      deelnemen; alleen voor toetsen in je eerste maand word je door de opleiding ingetekend.</p>`,
    bron: BRON.oer2026
  },
  {
    id: "vrijstelling",
    titel: "Vrijstelling, uitzonderingen en de examencommissie",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["vrijstelling", "examencommissie", "uitzondering", "bezwaar", "eerder gehaald",
      "vorige opleiding", "diploma meenemen", "extra kans aanvragen", "verzoek indienen"],
    body: `
      <p>De <strong>examencommissie</strong> beslist over vrijstellingen en verzoeken om een extra
      tentamengelegenheid. Voor een vrijstelling moet je aantonen dat je de leeruitkomsten al beheerst.</p>
      <p>Dat kan met een eerder behaald tentamen in het hoger onderwijs, een officiële EVC-rapportage
      of ander bewijs van de vereiste kennis en vaardigheden. De aanvraagregels staan in het
      Reglement examencommissie, onderdeel van het OS/OER.</p>`,
    bron: BRON.oer2026
  },
  {
    id: "jaarrooster",
    titel: "Vakanties en lesvrije weken",
    categorie: "Studiepunten",
    status: "check",
    trefwoorden: ["vakantie", "vakanties", "lesvrij", "lesvrije week", "vrije dagen", "kerstvakantie",
      "zomervakantie", "jaarrooster", "wanneer vrij", "feestdagen", "toetsweek", "periodes"],
    body: `
      <p>Het studiejaar is verdeeld in vier periodes. Vakanties, feestdagen en HAN-brede lesvrije dagen
      staan in het openbare <strong>jaarrooster 2026-2027</strong>.</p>
      <p>Voor jouw eigen lesdagen is <a href="https://myx-han.xedule.nl/" target="_blank" rel="noopener">MyX</a>
      leidend. Toetsmomenten, herkansingen en deadlines vind je in iSAS en de cursusbeschrijving.</p>`,
    bron: BRON.jaarrooster
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
    bron: BRON.praktisch
  },
  {
    id: "zelfstudieplek",
    titel: "Studieplekken tussen de lessen",
    categorie: "Campus",
    status: "check",
    trefwoorden: ["zelfstudieplek", "studieplek", "stilteplek", "zelfstandig werken", "leren op school",
      "werkplek", "vrije plek", "rustige plek", "bibliotheek", "mediatheek", "waar kan ik werken",
      "waar kan ik studeren", "rustig studeren", "studeren op campus", "tussenuur", "kantine"],
    body: `
      <p>Alle HAN-studenten kunnen gebruikmaken van de studentwerkplekken van de HAN Bibliotheken.
      Er zijn werkplekken met pc, stilteruimtes, samenwerkplekken en voorzieningen voor je laptop.</p>
      <p>Open de HAN-pagina hieronder voor de actuele locaties en informatie op Insite.</p>`,
    bron: BRON.werkplekken
  },
  {
    id: "secretariaat-contact",
    titel: "Secretariaat of contact met je opleiding",
    categorie: "Campus",
    status: "check",
    trefwoorden: ["secretariaat", "secretaris", "opleidingsbureau", "servicepunt", "balie",
      "contact opleiding", "telefoonnummer opleiding", "mailadres opleiding", "ask han"],
    body: `
      <p>De actuele contactgegevens van het secretariaat of opleidingsbureau staan op Insite bij je
      eigen opleiding. HANDIG_ toont geen kamernummer of persoonlijk adres, omdat die gegevens kunnen
      wisselen.</p>
      <p>Voor een algemene vraag over je inschrijving, account of studie kun je ook terecht bij
      <a href="https://www.han.nl/contact/" target="_blank" rel="noopener">ASK HAN</a>. Voor een vraag
      over je klas of onderwijsroute begin je bij je studiebegeleider.</p>`,
    bron: BRON.contact
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
      aanspreekpunt binnen de HAN. Neem bij studievragen of twijfel eerst met deze begeleider contact op.</p>
      <p>Wie jouw studiebegeleider is, hoor je aan het begin van je studie.</p>`,
    bron: BRON.succesvol
  },
  {
    id: "psycholoog",
    titel: "Studentenpsycholoog",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["psycholoog", "faalangst", "uitstelgedrag", "somber", "angst", "rouw", "stress",
      "niet lekker in mijn vel", "mentaal", "burn-out", "hulp mentaal",
      "voel me niet", "voel me rot", "eenzaam", "heimwee", "depressief", "paniek",
      "piekeren", "piekeer", "slecht slapen", "slaap slecht", "geen zin meer", "geen energie",
      "opgebrand", "overspannen"],
    body: `
      <p>De studentenpsychologen helpen bij bijvoorbeeld faalangst, uitstelgedrag, rouwverwerking,
      somberheid en angstgevoelens. Je kunt ook contact opnemen wanneer klachten nog beperkt zijn.</p>
      <p><a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentenpsychologen/" target="_blank" rel="noopener">Studentenpsychologen op Insite</a></p>`,
    bron: BRON.succesvol
  },
  {
    id: "acute-hulp",
    titel: "Directe hulp bij acute psychische klachten",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["acuut", "spoed", "crisis", "nu hulp", "wil niet meer leven", "wil er niet meer zijn",
      "einde aan mijn leven", "zelfmoord", "suicide", "zelfdoding", "wanhopig", "huisarts",
      "huisartsenpost", "113", "vannacht", "het gaat echt niet"],
    body: `
      <p>De begeleiding van de HAN werkt met afspraken en wachttijd. Kan het niet wachten, gebruik dan
      deze routes, ook buiten kantooruren.</p>
      <ul>
        <li><strong>Je huisarts</strong>, of buiten kantooruren de <strong>huisartsenpost</strong> in je
        woonplaats. Zij zijn er ook voor psychische klachten.</li>
        <li><strong>113 Zelfmoordpreventie</strong>, dag en nacht bereikbaar: bel
        <a href="tel:113"><strong>113</strong></a> of
        <a href="tel:08000113"><strong>0800 0113</strong></a> (gratis), of chat via
        <a href="https://www.113.nl/" target="_blank" rel="noopener">113.nl</a>.</li>
        <li>Bij direct gevaar: <a href="tel:112"><strong>112</strong></a>.</li>
      </ul>
      <p>Je kunt deze contactroutes ook gebruiken wanneer je je zorgen maakt om iemand anders.</p>`,
    bron: BRON.hulplijn113
  },
  {
    id: "uitschrijven",
    titel: "Stoppen of uitschrijven: regel Studielink én DUO",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["uitschrijven", "uitschrijving", "schrijf uit", "stoppen met studie", "studie stoppen",
      "niet herinschrijven", "switchen", "andere opleiding", "studielink", "collegegeld terug",
      "studiefinanciering stopzetten", "reisproduct stopzetten"],
    body: `
      <p>Wil je stoppen, bespreek je keuze dan eerst met je studiebegeleider. Uitschrijven zelf doe je in
      <strong>Studielink</strong> via de optie <em>Uitschrijving</em>. Tijdens het studiejaar gaat je
      uitschrijving op zijn vroegst in op de eerste dag van de volgende maand; terugwerkende kracht kan
      niet. Stop je per 31 augustus, kies dan <em>niet herinschrijven</em>.</p>
      <p>Studielink geeft je uitschrijving <strong>niet automatisch door aan DUO</strong>. Zet daarom zelf
      je studiefinanciering en studentenreisproduct op tijd stop. Controleer ook wat er met je collegegeld
      gebeurt.</p>`,
    bron: BRON.stoppen
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
      <p>Een studentendecaan adviseert over studiefinanciering, collegegeld, beurzen en financiële
      problemen door bijzondere omstandigheden.</p>
      <p><a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" target="_blank" rel="noopener">Studentendecanen op Insite</a></p>`,
    bron: BRON.succesvol
  },
  {
    id: "ziekmelden",
    titel: "Ziek zijn en je afmelden",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["ziek", "ziekmelden", "ziek melden", "afmelden", "griep", "corona", "niet naar les",
      "gemist", "les gemist", "toets gemist", "langdurig ziek", "blessure"],
    body: `
      <p>De opleiding legt in de eerste week uit via welke route je je ziek meldt. Gebruik daarna altijd
      de actuele instructie van ICT op Insite; een ziekmelding is niet hetzelfde als afmelden voor een toets.</p>
      <p>Belemmeren ziekte of andere persoonlijke omstandigheden je studie, meld dit dan tijdig
      bij je <strong>studentbegeleider</strong>. Die kan bekijken welke ondersteuning nodig is. Voor een
      gemiste toets gelden de inteken- en uitzonderingsregels uit het OS/OER.</p>`,
    bron: BRON.oer2026
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
    bron: BRON.succesvol
  },
  {
    id: "vertrouwenspersoon",
    titel: "Klachten en ongewenst gedrag",
    categorie: "Hulp",
    status: "check",
    trefwoorden: ["klacht", "klachten", "vertrouwenspersoon", "ongewenst gedrag", "pesten", "discriminatie",
      "intimidatie", "onveilig", "melden", "conflict met docent", "oneerlijk behandeld"],
    body: `
      <p>Bij ongewenst gedrag kun je terecht bij een <strong>vertrouwenspersoon van de HAN</strong>. Die
      biedt een luisterend oor, behandelt je melding strikt vertrouwelijk en je mag zelf kiezen met wie
      je praat.</p>
      <p>Wil je formeel melden of een klacht indienen, gebruik dan de klachtenregeling of Bureau Klachten
      en Geschillen. De actuele route staat op de HAN-pagina hieronder.</p>`,
    bron: BRON.vertrouwenspersonen
  },

  {
    id: "studiefinanciering",
    titel: "Studiefinanciering en je studentenreisproduct",
    categorie: "Meedoen",
    status: "check",
    trefwoorden: ["studiefinanciering", "duo", "ov", "reisproduct", "studentenreisproduct", "ov-kaart",
      "reizen", "lening", "aanvullende beurs", "collegegeldkrediet", "stufi", "boete ov"],
    body: `
      <p>Studiefinanciering, je lening, de aanvullende beurs en het <strong>studentenreisproduct</strong>
      regel je bij <strong>DUO</strong>, niet bij de HAN. Dat doe je zelf op
      <a href="https://duo.nl/" target="_blank" rel="noopener">duo.nl</a> met je DigiD.</p>
      <p>Denk aan het <strong>stopzetten</strong> van je reisproduct als je stopt met studeren: dat loopt
      niet vanzelf af en er staat een boete op doorreizen zonder recht.</p>
      <p>Een <a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" target="_blank" rel="noopener">studentendecaan</a>
      kan adviseren bij financiële problemen.</p>`,
    bron: BRON.duo
  },
  {
    id: "xtend",
    titel: "Studievereniging Xtend",
    categorie: "Meedoen",
    status: "check",
    trefwoorden: ["studievereniging", "xtend", "vereniging", "borrel", "activiteiten", "lid worden",
      "mensen leren kennen"],
    body: `
      <p>Xtend is de studievereniging voor studenten van de Academie IT en Mediadesign. De vereniging
      organiseert activiteiten om medestudenten te ontmoeten en je netwerk uit te breiden.</p>
      <p>Het actuele programma en informatie over lid worden staan op
      <a href="https://svxtend.nl/" target="_blank" rel="noopener">svxtend.nl</a>.</p>`,
    bron: BRON.praktisch
  },
  {
    id: "praktijkopdrachten",
    titel: "Praktijkopdrachten voor echte opdrachtgevers",
    categorie: "Meedoen",
    status: "check",
    trefwoorden: ["opdrachten", "ervaring opdoen", "praktijkopdrachten", "opdrachtgevers", "praktijkervaring"],
    body: `
      <p>Binnen ICT werk je via projecten en praktijkopdrachten aan echte vraagstukken. Waar mogelijk
      komen projecten van externe opdrachtgevers, zodat je samenwerken en toepassen in de praktijk oefent.</p>
      <p>De precieze opdracht en deelnamevoorwaarden staan bij de cursus in Brightspace en iSAS.</p>`,
    bron: BRON.ictOverzicht
  },
  {
    id: "b302",
    titel: "B302: betaald praktijkwerk voor CMD-studenten",
    categorie: "Meedoen",
    status: "check",
    trefwoorden: ["buro302", "b302", "buro 302", "bureau 302", "grafisch bureau", "multimediaprojecten"],
    body: `
      <p>De HAN beschrijft <strong>B302</strong> als een visueel en grafisch bureau waar
      <strong>CMD-studenten</strong> betaald werken aan multimediaprojecten voor echte opdrachtgevers.</p>
      <p>De HAN vermeldt B302 niet als deelnameoptie voor ICT-studenten. Informeer bij je
      studiebegeleider of er voor ICT-studenten een actuele route bestaat.</p>`,
    bron: BRON.cmdPraktisch
  },
  {
    id: "wonen",
    titel: "Op kamers in Arnhem of Nijmegen",
    categorie: "Meedoen",
    status: "check",
    trefwoorden: ["kamer", "wonen", "huisvesting", "op kamers", "studentenwoning", "huren", "verhuizen"],
    body: `
      <p>De HAN adviseert om woonruimte te zoeken via een woningcorporatie, kamerbemiddelaar, je eigen
      netwerk, sociale media of een huisvestingsapp.</p>
      <p>Op de praktische ICT-pagina staan aparte links voor kamers in Arnhem en Nijmegen.</p>`,
    bron: BRON.praktisch
  }
];

const KB_ACUTE_ID = "acute-hulp";
