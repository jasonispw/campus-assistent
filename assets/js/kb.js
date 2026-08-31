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
  stoppen: { label: "Stoppen of switchen op han.nl", url: "https://www.han.nl/studeren/voltijd/switchen-van-studie/" },
  rechten: { label: "Rechten en plichten op han.nl", url: "https://www.han.nl/studeren/succesvol-studeren/rechten-plichten/" },
  contact: { label: "Contact met de HAN", url: "https://www.han.nl/contact/" },
  xtend: { label: "svxtend.nl", url: "https://svxtend.nl/" }
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
      Belangrijke berichten over je inschrijving komen op je HAN-mail, dus check die echt.</p>
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
      Installeer die dus meteen op je telefoon.</p>`,
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
    id: "isas-ans",
    titel: "iSAS en ANS",
    categorie: "Systemen",
    status: "todo",
    trefwoorden: ["isas", "ans", "digitaal toetsen", "toetsprogramma", "academie"],
    body: `
      <p><strong>ANS</strong> gebruik je voor digitaal toetsen. <strong>iSAS</strong> is een systeem van
      onze eigen academie.</p>
      <p>Je docent of studiebegeleider laat weten wanneer je welk systeem nodig hebt en hoe je inlogt.
      De actuele links staan op Insite bij je eigen opleiding.</p>`,
    bron: BRON.insite
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
      <p>Bereken met de <a href="studiepunten.html#calculator">EC-calculator</a> hoe je ervoor staat.</p>
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
    status: "todo",
    trefwoorden: ["herkansing", "herkansen", "hertentamen", "herexamen", "gezakt", "onvoldoende",
      "toets niet gehaald", "opnieuw doen", "nog een kans", "inhaaltoets"],
    body: `
      <p>Haal je een toets niet, dan kun je herkansen. Hoeveel kansen je per toets hebt, wanneer de
      herkansing valt en tot wanneer je je kunt intekenen, staat in het <strong>OS/OER</strong> van jouw
      opleiding en jouw studiejaar.</p>
      <p>Intekenen voor een herkansing doe je in
      <a href="https://han.osiris-student.nl/#/login" target="_blank" rel="noopener">Osiris</a>. Let op de
      sluitingsdatum: te laat intekenen betekent meestal een periode wachten.</p>
      <p>Twijfel je of loopt het op meerdere vakken vast, ga dan naar je studiebegeleider.</p>`,
    bron: BRON.oer2026
  },
  {
    id: "vrijstelling",
    titel: "Vrijstelling, uitzonderingen en de examencommissie",
    categorie: "Studiepunten",
    status: "todo",
    trefwoorden: ["vrijstelling", "examencommissie", "uitzondering", "bezwaar", "eerder gehaald",
      "vorige opleiding", "diploma meenemen", "extra kans aanvragen", "verzoek indienen"],
    body: `
      <p>De <strong>examencommissie</strong> van je opleiding gaat over vrijstellingen, uitzonderingen op
      de toetsregels en verzoeken om een extra kans. Zij beslissen, niet je docent en niet je
      studiebegeleider.</p>
      <p>Heb je elders al vakken gehaald, of speelt er iets waardoor een regel voor jou onredelijk
      uitpakt? Dien dan een verzoek in. Hoe dat gaat en welke termijnen gelden, staat in het OS/OER
      en op Insite bij je eigen opleiding.</p>
      <p>Je studiebegeleider helpt je het verzoek op te stellen.</p>`,
    bron: BRON.oer2026
  },
  {
    id: "jaarrooster",
    titel: "Vakanties en lesvrije weken",
    categorie: "Studiepunten",
    status: "todo",
    trefwoorden: ["vakantie", "vakanties", "lesvrij", "lesvrije week", "vrije dagen", "kerstvakantie",
      "zomervakantie", "jaarrooster", "wanneer vrij", "feestdagen", "toetsweek", "periodes"],
    body: `
      <p>Het studiejaar is verdeeld in vier periodes. De vakanties en lesvrije weken staan in het
      openbare <strong>jaarrooster 2026-2027</strong> van de HAN. Data van tentamens en herkansingen
      vind je bij je eigen opleiding op Insite.</p>
      <p>Je eigen lesdagen binnen die weken staan in
      <a href="https://myx-han.xedule.nl/" target="_blank" rel="noopener">MyX</a>. Lesvrij is trouwens niet
      hetzelfde als vrij: in die weken vallen vaak toetsen of projectwerk.</p>`,
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
      of een ouderejaars wijst je de vaste plekken zo aan.</p>`,
    bron: BRON.praktisch
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
      aanspreekpunt binnen de HAN. Loop je ergens tegenaan of twijfel je? Begin hier.</p>
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
      somberheid en angstgevoelens. Je hoeft geen groot probleem te hebben om je te melden.</p>
      <p><a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentenpsychologen/" target="_blank" rel="noopener">Studentenpsychologen op Insite</a></p>`,
    bron: BRON.succesvol
  },
  {
    id: "acute-hulp",
    titel: "Als het nu niet goed met je gaat",
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
      <p>Gaat het om iemand anders om wie je je zorgen maakt, dan kun je op dezelfde plekken terecht.</p>`,
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
      <p>Heb je vragen over studiefinanciering, collegegeld of beurzen, of kom je door bijzondere
      omstandigheden in de financiële problemen? Dan ga je naar een studentendecaan.</p>
      <p><a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" target="_blank" rel="noopener">Studentendecanen op Insite</a></p>`,
    bron: BRON.succesvol
  },
  {
    id: "ziekmelden",
    titel: "Ziek zijn en je afmelden",
    categorie: "Hulp",
    status: "todo",
    trefwoorden: ["ziek", "ziekmelden", "ziek melden", "afmelden", "griep", "corona", "niet naar les",
      "gemist", "les gemist", "toets gemist", "langdurig ziek", "blessure"],
    body: `
      <p>Ben je een dag ziek, dan meld je dat bij je docent of je studiebegeleider. Hoe je dat precies
      doet, verschilt per opleiding: je studiebegeleider vertelt je in week 1 welke route jouw klas
      gebruikt.</p>
      <p>Mis je een <strong>toets</strong>, meld dat dan meteen, want daar gelden termijnen voor. Die staan
      in het OS/OER.</p>
      <p>Ben je <strong>langer of vaker ziek</strong>, of speelt er meer? Meld het dan ook bij je
      studiebegeleider en schakel de studentendecaan in. Ziekte kan meewegen in je studieadvies, maar
      alleen als het bekend is.</p>`,
    bron: BRON.succesvol
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
    status: "todo",
    trefwoorden: ["klacht", "klachten", "vertrouwenspersoon", "ongewenst gedrag", "pesten", "discriminatie",
      "intimidatie", "onveilig", "melden", "conflict met docent", "oneerlijk behandeld"],
    body: `
      <p>Overkomt je iets waar je je niet prettig bij voelt, of loop je vast in een conflict? Dan hoef je
      dat niet zelf op te lossen.</p>
      <p>Begin bij je <strong>studiebegeleider</strong> als het over je opleiding gaat. Gaat het over
      ongewenst gedrag of over een situatie die je niet met je opleiding wilt bespreken, dan is er een
      <strong>vertrouwenspersoon</strong>. Die luistert eerst en doet niets zonder jouw instemming.</p>
      <p>De actuele contactgegevens en de klachtenregeling staan op Insite.</p>`,
    bron: BRON.hulpInsite
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
      <p>Kom je er financieel niet uit, dan denkt een
      <a href="https://www1.han.nl/insite/studenten/hulp-ondersteuning-training/studentbegeleiding-en-student-support-center/studentendecanen/" target="_blank" rel="noopener">studentendecaan</a>
      met je mee.</p>`,
    bron: BRON.duo
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
    bron: BRON.xtend
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
    bron: BRON.insite
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
    bron: BRON.decanen
  }
];

const KB_ACUTE_ID = "acute-hulp";
