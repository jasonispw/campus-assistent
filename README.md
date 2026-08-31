# HANDIG_

Campus-assistent voor eerstejaarsstudenten ICT, gemaakt voor de hackathonweek.
Huisstijl, kleuren en vormentaal zijn overgenomen van [han.nl](https://www.han.nl/).

Dit is geen officieel HAN-product.

## Starten

Geen installatie, geen build-stap. Twee opties:

1. Dubbelklik op `index.html`.
2. Of via een lokale server, netter voor demo's:

```bash
python -m http.server 5173
```

Daarna: <http://localhost:5173>

## Stack

Dezelfde stack als han.nl zelf: statische HTML, één CSS-bestand, vanilla JavaScript.
Geen framework, geen npm, geen dependencies.

Waarom: het draait overal, ook zonder wifi tijdens de presentatie. Iedereen in het team kan
eraan werken zonder eerst een framework te leren. En het past bij hoe han.nl gebouwd is.

```
index.html            assistent, startchecklist en de tegels naar de onderwerpen
systemen.html         alle HAN-systemen
studiepunten.html     EC, BSA, propedeuse en de EC-calculator
campus.html           locaties, plattegrond en looproute
hulp.html             hulplijnen en de hulpwijzer
meedoen.html          studievereniging, Buro302, wonen
prototype.html        over deze site: status, bronnen, techniek
404.html              pagina niet gevonden

server.py             lokale server die 404.html serveert bij een onbekend adres
```

Elke pagina heeft dezelfde opbouw: eerst de skip-link, dan `<header>`, `<main>` met de secties,
`<footer>`, en helemaal onderaan de icon-sprite met de scripts. Je ziet dus meteen de structuur
van de pagina als je hem opent.

### CSS

Drie bestanden, van breed naar specifiek. Elke pagina laadt ze alle drie, in deze volgorde:

```
assets/css/base.css        kleuren, spacing, typografie, reset en een paar utility-klassen
assets/css/layout.css      container, secties, grid, header, navigatie, hero en footer
assets/css/components.css  knoppen, kaarten, tegels, assistent, widgets, wizard, checklist
```

Namen volgen BEM: `.card`, `.card__icon`, `.card__foot`, `.tile--campus`. Losse waarden die
vaker terugkomen staan als custom property in `base.css` (`--space-md`, `--han-pink`).

### JavaScript

Eén bestand per verantwoordelijkheid. Pagina's laden alleen wat ze nodig hebben:

```
assets/js/kb.js            de kennisbank, hier staat alle inhoud
assets/js/assistent.js     zoekalgoritme en het tonen van antwoorden
assets/js/ec-calculator.js de EC-calculator op studiepunten.html
assets/js/hulpwijzer.js    de beslisboom op hulp.html
assets/js/onboarding.js    instelvenster, profielchip en startchecklist
assets/js/app.js           menu en actieve navigatie
assets/js/notfound.js      zoekt op de 404-pagina alvast met het foute adres
```

Comments staan er alleen waar iets niet vanzelf spreekt, bijvoorbeeld waarom de sprite inline
staat of waarom de spinner een vertraging heeft. De rest legt deze README uit.

## Icons

Alle icons komen van [Iconify](https://iconify.design/), set **Tabler** (MIT-licentie), plus één
animatie-icoon uit **svg-spinners** voor de laadindicator. Er zijn geen icons met CSS of JavaScript
nagebouwd.

De 44 icons staan als losse SVG in `assets/icons/` en zijn samengevoegd tot een sprite die
onderaan elke pagina staat, vlak voor de scripts. Gebruiken doe je zo:

```html
<svg class="icon"><use href="#i-calendar"></use></svg>
```

Varianten: `icon--lg` voor 2,25rem, `icon--pink` voor de HAN-kleur, `tile__icon` en `tile__arrow`
voor de tegels. De kleur volgt `currentColor`, dus een icoon neemt de tekstkleur over.

De sprite staat inline in de HTML en niet in een los bestand, zodat de icons ook werken als je
`index.html` gewoon dubbelklikt zonder server. Een los `sprite.svg` met
`<use href="sprite.svg#i-x">` zou de herhaling uit de acht pagina's halen, maar werkt niet
vanaf `file://`. Daarom staat hij onderaan de pagina in plaats van bovenaan: de structuur van
de pagina komt zo eerst.

`assets/icons/sprite.html` is de bron. Wijzig je die, kopieer het blok dan naar alle pagina's.

### Een icoon toevoegen

1. Zoek het icoon op [icon-sets.iconify.design](https://icon-sets.iconify.design/tabler/).
2. Download het: `https://api.iconify.design/tabler/NAAM.svg` en zet het in `assets/icons/`.
3. Voeg een `<symbol id="i-NAAM" viewBox="0 0 24 24">` toe aan `assets/icons/sprite.html` en
   kopieer het sprite-blok naar alle pagina's.

## Wat werkt, wat is schets

| Onderdeel | Status |
|---|---|
| Assistent, vraag naar antwoord met bronlink | werkend |
| Kennisbank met bron en status per item | werkend |
| EC-calculator met BSA-norm en studie-uren | werkend |
| Hulpwijzer, beslisboom naar de juiste hulplijn | werkend |
| Instellen: locatie, opleiding, jaar en klas | werkend |
| Startchecklist die je kunt afvinken | werkend |
| Systeemoverzicht met echte links | werkende data |
| 404-pagina met zoekfunctie | werkend |
| Rooster in de app | schermschets |
| Plattegrond met looproute | schermschets |
| Push-meldingen | schermschets |
| Inloggen met HANaccount | bewust niet gebouwd |

Op `prototype.html` staat dit overzicht ook voor bezoekers, inclusief de bronnen.

## Foutafhandeling

Ingebouwd, zodat er tijdens de demo niets stil op zwart gaat:

- **Kennisbank niet geladen**: de assistent meldt dat hij niet beschikbaar is en zet het zoekveld uit,
  in plaats van een dood invoerveld te tonen.
- **Kapot item in `kb.js`**: dat ene item wordt overgeslagen, de rest blijft werken.
- **Fout tijdens het zoeken**: nette storingsmelding met een doorverwijzing naar het menu.
- **Ongeldige invoer in de calculator**: het veld kleurt rood met uitleg, er verschijnt geen NaN.
- **Onbekende stap in de hulpwijzer**: valt terug op de eerste vraag.
- **Widget crasht**: alleen die widget toont een melding, de andere blijft werken.
- **Onbekende URL**: `404.html` vult de zoekterm alvast in op basis van het adres.

De 404-pagina werkt automatisch bij hosting die dat ondersteunt, zoals GitHub Pages of Netlify.
Bij `python -m http.server` moet je hem zelf openen: <http://localhost:5173/404.html>.

## Inhoud toevoegen

Alle inhoud staat in `assets/js/kb.js`. Je hoeft geen JavaScript te kennen: kopieer een blok
en vul het in.

```js
{
  id: "kort-id",
  titel: "De vraag of het onderwerp",
  categorie: "Systemen",
  status: "check",
  trefwoorden: ["woorden", "die een student zou typen", "ook verkeerd gespeld"],
  body: `<p>De uitleg in gewone taal.</p>`,
  bron: { label: "Online services op han.nl", url: "https://www.han.nl/..." }
}
```

`categorie` is een van: Systemen, Studiepunten, Campus, Hulp, Meedoen.

`status` is voor het team en staat niet op de site:

- `check`: we hebben het opgezocht op een HAN-bron en de link staat in `bron`.
- `todo`: nog navragen bij een docent. Schrijf dan alleen op wat je zeker weet.

**Verzin niets, en laat AI niets verzinnen.** Zoek het op bij de HAN en zet de bron erbij.
Klopt de BSA-norm niet in onze app, dan kost dat iemand een jaar.

### Nog navragen bij een docent

- **iSAS**: waar is het precies voor, wat is de officiële link?
- **ANS**: hoe werkt digitaal toetsen bij ons?
- **Studievereniging Xtend**: is dit onze vereniging, wat kost het, welke activiteiten?
- **Buro302**: hoe doe je mee, levert het studiepunten op?
- **Huisvesting**: is er een officiële HAN-pagina over kamers zoeken?
- **Werkplekken**: waar zitten ze, wanneer zijn ze open?
- **Plattegronden**: Ruitenberglaan 26 B- en C-vleugel, en de betekenis van de lokaalcodes.

Zet `status` op `check` en vul `bron` in zodra je het antwoord hebt.

## Bronnen

- [Online services op han.nl](https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/): systemen, HANaccount, eduroam
- [ICT voltijd op han.nl](https://www.han.nl/opleidingen/hbo/ict/voltijd/dit-is-je-studie/): EC, BSA, propedeuse, profielen
- [Praktische info ICT op han.nl](https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/): adressen
- [Succesvol studeren op han.nl](https://www.han.nl/studeren/succesvol-studeren/): hulplijnen
- [HAN Insite](https://www1.han.nl/insite/): studentenportaal en OS/OER

## Werkverdeling

| Rol | Wat je doet in dit project |
|---|---|
| Domeinverkenner en factchecker | De open punten hierboven uitzoeken en `kb.js` vullen. Dit is het meeste werk. |
| Technisch ontwikkelaar | `assistent.js`, `ec-calculator.js` en `hulpwijzer.js`: zoekresultaten testen met echte vragen, trefwoorden bijstellen. |
| UI-ontwerper | De schermschetsen in `systemen.html`, `studiepunten.html` en `campus.html` uitwerken. |
| Scenarioschrijver | Het scenario "Maandag, week 3" op de homepage aanscherpen, dat draagt de presentatie. |
| Projectmanager | `prototype.html` bijhouden en de demo voorbereiden. |

## Wat er wordt opgeslagen

Het instelvenster bewaart je locatie, opleiding, jaar en klas onder de sleutel `handig-profiel`
in de localStorage van je browser, en de startchecklist onder `handig-checklist`. Er is geen server
en geen account: die gegevens blijven op je eigen apparaat en gaan nergens naartoe. Het klasveld
vraagt daarom ook expliciet om geen studentnummer in te vullen.

Wissen doe je door de site-gegevens van localhost te verwijderen in je browser.

## Spelregels AI

Bij het maken hiervan zijn geen inloggegevens gebruikt of gedeeld, is er geen data uit
HAN-systemen gehaald en staan er geen echte persoonsgegevens in. Alle voorbeelden gebruiken
een verzonnen student ("Sam"). Alle studie-informatie is opgezocht op han.nl en Insite.

Het beeldmateriaal in `assets/img/` is sfeerbeeld dat door AI is gemaakt. Het stelt geen
bestaand HAN-gebouw voor en er staat geen echt persoon op. Zie `ASSETS.md` voor welke beelden
het team zelf moet fotograferen.
