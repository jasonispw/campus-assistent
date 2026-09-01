# HANDIG_

![Last commit](https://img.shields.io/github/last-commit/jasonispw/campus-assistent?label=last%20commit&color=success)
![Commit activity](https://img.shields.io/github/commit-activity/w/jasonispw/campus-assistent?label=commit%20activity)
![Contributors](https://img.shields.io/github/contributors/jasonispw/campus-assistent?label=contributors&color=success)
![Code size](https://img.shields.io/github/languages/code-size/jasonispw/campus-assistent?label=code%20size)

Eén startpunt voor eerstejaarsstudenten ICT van de HAN: rooster, resultaten, lesmateriaal en
campusinformatie op één plek, met een assistent die in gewone taal antwoord geeft.

Geen officieel HAN-product, wel gebouwd in dezelfde huisstijl als [han.nl](https://www.han.nl/).

<https://jasonispw.github.io/campus-assistent/>

## Inhoud

- [Wat het doet](#wat-het-doet)
- [Starten](#starten)
- [Publiceren](#publiceren)
- [Stack en structuur](#stack-en-structuur)
- [Hoe het zoeken werkt](#hoe-het-zoeken-werkt)
- [Hoe de campuskaart werkt](#hoe-de-campuskaart-werkt)
- [Icons](#icons)
- [Foutafhandeling](#foutafhandeling)
- [Rekenen met EC](#rekenen-met-ec)
- [Inhoud toevoegen](#inhoud-toevoegen)
- [Bronnen](#bronnen)
- [Acute hulp](#acute-hulp)
- [Wat er wordt opgeslagen](#wat-er-wordt-opgeslagen)
- [Herkomst van de inhoud](#herkomst-van-de-inhoud)
- [Controle voor een nieuwe versie](#controle-voor-een-nieuwe-versie)

## Wat het doet

Een eerstejaars student van de HAN krijgt in de eerste weken tientallen systemen, regels en adressen
over zich heen. HANDIG_ bundelt dat op zeven pagina's:

- **Assistent**: typ een vraag in gewone taal, krijg een antwoord uit de kennisbank, met bron.
- **Systemen**: alle HAN-systemen op een rij, van MyX tot eduroam.
- **Studiepunten**: EC, studieadvies, doorstroomnorm, propedeuse en een EC-calculator.
- **Campus**: gebouwen, vleugels, liften en aangepaste toiletten in Arnhem en Nijmegen.
- **Lokaalzoeker**: plak een lokaalcode zoals `R26/B2.40`, krijg een uitleg per onderdeel.
- **Hulp**: hulplijnen en een beslisboom die naar de juiste hulp doorverwijst.
- **Meedoen**: studievereniging, praktijkopdrachten en wonen.

Een instelvenster onthoudt locatie, opleiding, jaar en klas, en past de startchecklist en tips daarop
aan. Alles lokaal in de browser, zonder account.

## Starten

Geen installatie, geen build-stap, geen scripts. Dubbelklik op `index.html`, of serveer de map als je
de 404-afhandeling wilt nalopen zoals de hosting die doet:

```bash
python -m http.server 5173
```

Daarna: <http://localhost:5173>

## Publiceren

De site is ingericht voor GitHub Pages onder <https://jasonispw.github.io/campus-assistent/>. Alle
paden in de HTML zijn relatief, dus de site werkt zowel vanaf `file://` als vanuit een submap.

`robots.txt` staat in de repository-root en is daardoor bereikbaar op
`/campus-assistent/robots.txt`. Zoekmachines lezen alleen `robots.txt` op de root van het domein, dus
op een project-site van GitHub Pages heeft dit bestand geen effect op crawlen. Dat is geen probleem,
want de site geeft alles vrij; dien de sitemap rechtstreeks in bij Google Search Console. Verhuist de
site naar een eigen domein, dan werkt `robots.txt` wel zoals bedoeld.

`canonical`, `og:url` en `og:image` staan als volledige GitHub Pages-URL in de `<head>`, omdat
linkvoorbeelden in bijvoorbeeld WhatsApp en Teams geen relatief pad kunnen gebruiken. Pas deze
metadata aan als de site verhuist. De 404-pagina zet vóór het laden van assets een basispad voor
GitHub Pages, waardoor ook onbekende adressen met meerdere padsegmenten correct worden getoond.

## Stack en structuur

Dezelfde stack als han.nl zelf: statische HTML, CSS en vanilla JavaScript. Geen framework, geen npm,
geen dependencies en geen backend. Dat draait overal, blijft eenvoudig te beheren, en heeft geen
afhankelijkheden die apart gebouwd of bijgewerkt moeten worden.

```
index.html            hero, startchecklist en de tegels naar de onderwerpen
systemen.html         alle HAN-systemen
studiepunten.html     EC, studieadvies, doorstroomnorm, propedeuse en de EC-calculator
campus.html           de Lokaalzoeker en de voorzieningen op de campus
hulp.html             hulplijnen en de hulpwijzer
meedoen.html          studievereniging, praktijkopdrachten, wonen
over.html             verantwoording, bronnen en colofon
plattegrond.html      interactieve campuskaart
privacy.html          wat er lokaal wordt opgeslagen en hoe je het wist
404.html              pagina niet gevonden

sitemap.xml           de negen publieke pagina's, zonder 404 en assets
robots.txt            geeft alles vrij en wijst naar de sitemap
llms.txt              korte beschrijving en de belangrijkste links, voor taalmodellen
.nojekyll             zet Jekyll-verwerking op GitHub Pages uit
```

Elke pagina heeft dezelfde opbouw: eerst de skip-link, dan `<header>`, `<main>` met de secties,
`<footer>`, en helemaal onderaan de icon-sprite met de scripts.

### CSS

Drie bestanden, van breed naar specifiek. Elke pagina laadt ze alle drie, in deze volgorde:

```
assets/css/base.css        kleuren, spacing, typografie, reset en een paar utility-klassen
assets/css/layout.css      container, secties, grid, header, navigatie, hero en footer
assets/css/components.css  knoppen, kaarten, tegels, chatvenster, widgets, wizard, checklist
```

Namen volgen BEM: `.card`, `.card__icon`, `.card__foot`, `.tile--campus`. Losse waarden die vaker
terugkomen staan als custom property in `base.css` (`--space-md`, `--han-pink`).

### JavaScript

Eén bestand per verantwoordelijkheid. Pagina's laden alleen wat ze nodig hebben:

```
assets/js/kb.js               de kennisbank, hier staat alle inhoud
assets/js/assistent.js        het chatvenster, het zoekalgoritme en het tonen van antwoorden
assets/js/ec-calculator.js    de EC-calculator op studiepunten.html
assets/js/hulpwijzer.js       de beslisboom op hulp.html
assets/js/lokaalzoeker.js     de Lokaalzoeker op campus.html: van lokaalcode naar gebouw, vleugel, verdieping en deur
assets/js/plattegrond.js      tekent de campuskaart, de vleugelkaart en de vleugelwijzer
assets/js/plattegrond-geo.js  coördinaten en contouren achter de campuskaart, uit het gebouwenregister
assets/js/onboarding.js       instelvenster, profielchip en startchecklist
assets/js/app.js              menu en actieve navigatie
assets/js/notfound.js         zoekt op de 404-pagina alvast met het foute adres
```

De code staat zonder comments. Wat uitleg nodig heeft, staat in de secties hieronder.

## Hoe het zoeken werkt

`assistent.js` normaliseert je vraag (kleine letters, accenten en leestekens eruit) en vergelijkt
daarna op hele woorden. Dat laatste is belangrijk: bij een deelwoordvergelijking vindt het trefwoord
`ec` ook "rechten" en `ans` ook "kans", en dan krijg je met volle overtuiging het verkeerde antwoord.
Elke vergelijking zet daarom spaties om het woord heen.

Bovenop de trefwoorden liggen drie lijsten. `SYNONIEMEN` vertaalt wat studenten typen naar wat er in
de kennisbank staat ("cijfer" wordt "resultaten"). `SPLITSBAAR` plakt Nederlandse scheidbare
werkwoorden weer aan elkaar, zodat "hoe schrijf ik me uit" het trefwoord "uitschrijven" vindt.
`CRISIS` bevat zinnen waarbij het antwoord over acute hulp altijd bovenaan komt, ongeacht de score.

Nieuwe trefwoorden altijd testen tegen vragen die al werkten: een te algemeen woord duikt overal op.

## Hoe de assistent werkt

De assistent is een chatvenster dat op elke pagina rechtsonder staat. `assistent.js` bouwt het venster
zelf op en zet het onderaan de `<body>`; geen enkele pagina heeft er markup voor nodig. Alleen `kb.js`
en `assistent.js` moeten geladen zijn.

Een gesprek loopt zo: het venster begint met een groet en een paar voorbeeldvragen, je vraag komt als
zwarte bel rechts te staan, en na de typindicator volgt het antwoord uit de kennisbank met de bron
erbij. Van de drie beste treffers toont de assistent er één, de andere twee komen als knop onder het
antwoord te staan, aangevuld met onderwerpen uit dezelfde categorie. Zo blijft een antwoord één
antwoord in plaats van een lijst waaruit je zelf moet kiezen. Bij een vraag uit `CRISIS` verschijnt
alleen het antwoord over acute hulp, zonder vervolgknoppen.

Het gesprek leeft in het geheugen van de pagina. Er gaat niets naar een server en er wordt niets
opgeslagen, dus bij het openen van een andere pagina begint de assistent opnieuw.

Andere scripts en pagina's sturen de assistent aan met data-attributen en een kleine API:

```
data-assist-open   knop of link die het venster opent
data-assist-chip   knop die het venster opent en meteen die vraag stelt
data-assist-tip    pagina waar na negen seconden de tekstballon bij de knop verschijnt
```

```js
window.HANDIG.assistent.open();
window.HANDIG.assistent.sluit();
window.HANDIG.assistent.vraag("waar vind ik mijn rooster");
```

Een link met `data-assist-open` houdt zijn `href` naar `index.html`. Werkt het script niet, dan volgt
de browser die link in plaats van een knop te tonen die niets doet.

## Hoe de campuskaart werkt

`plattegrond.js` tekent twee kaarten in SVG: de campuskaart met de gebouwomtrekken uit
`plattegrond-geo.js`, en de vleugelkaart van Ruitenberglaan 26 met de zes vleugels A tot en met F.
Een klik op een gebouw of vleugel toont het detailpaneel met adres, liften, toiletten en de bron. De
omtrekken zelf komen uit het officiële gebouwenregister van Nederland en staan als data in
`plattegrond-geo.js`, gescheiden van de tekenlogica.

## Icons

Alle icons komen van [Iconify](https://iconify.design/), set Tabler (MIT-licentie), plus één
animatie-icoon uit svg-spinners en `i-message` voor de assistentknop, dat in dezelfde stijl is
getekend. De 45 SVG-symbolen staan als sprite inline in elke pagina, vlak voor de scripts. Een los
`sprite.svg` met `<use href="sprite.svg#i-x">` zou de herhaling weghalen, maar werkt niet vanaf
`file://`.

`assets/icons/sprite.html` is de bron. Gebruiken doe je zo:

```html
<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-calendar"></use></svg>
```

Varianten: `icon--lg` voor 2,25rem, `icon--pink` voor de HAN-kleur, `tile__icon` en `tile__arrow`
voor de tegels. De kleur volgt `currentColor`, dus een icoon neemt de tekstkleur over. Decoratieve
icons krijgen altijd `aria-hidden="true" focusable="false"`, anders leest een schermlezer ze voor als
naamloze afbeelding.

Een icoon toevoegen:

1. Zoek het icoon op [icon-sets.iconify.design](https://icon-sets.iconify.design/tabler/).
2. Download het: `https://api.iconify.design/tabler/NAAM.svg` en zet het in `assets/icons/`.
3. Voeg een `<symbol id="i-NAAM" viewBox="0 0 24 24">` toe aan `assets/icons/sprite.html`.
4. Neem dat symbool op in het sprite-blok onderaan elke pagina die het icoon gebruikt.

Het sprite-blok is in alle pagina's identiek. Werk het overal bij, anders mist één pagina het icoon.

## Foutafhandeling

Ingebouwd, zodat een fout in één onderdeel de rest van de site niet onbruikbaar maakt. Is de
kennisbank niet geladen, dan meldt de assistent dat hij niet beschikbaar is en zet hij het zoekveld
uit, in plaats van een dood invoerveld te tonen. Bevat `kb.js` een kapot item, dan wordt alleen dat
item overgeslagen en blijft de rest werken. Gaat er tijdens het zoeken iets mis, dan verschijnt een
nette storingsmelding met een doorverwijzing naar het menu.

Bij ongeldige invoer in de EC-calculator kleurt het veld rood met uitleg, en gaan de meter, het
totaal en de urenschatting op nul in plaats van de vorige uitkomst te laten staan. Een onbekende stap
in de hulpwijzer valt terug op de eerste vraag. Weigert localStorage te schrijven, bijvoorbeeld in
een privévenster of bij volle opslag, dan krijgt de gebruiker dat te zien in plaats van dat zijn
vinkjes stilletjes verdwijnen. Crasht een widget, dan toont alleen die widget een melding en blijft
de rest van de pagina werken. Bij een onbekende URL opent `404.html` de assistent met de zoekterm
uit het adres.

## Rekenen met EC

De calculator accepteert zowel de komma als de punt, want een Nederlandse student typt 12,5. Een
`<input type="number">` gooit een komma weg zonder melding, dus de velden zijn `type="text"` met
`inputmode="decimal"`: op mobiel krijg je nog steeds een cijfertoetsenbord.

Alles wordt op één decimaal afgerond vlak voor het tonen. Zonder die afronding levert 7,1 + 7,1 + 7,1
de uitkomst `21.299999999999997` op, en dat leest als een kapotte rekenmachine.

Boven 60 EC per jaar kapt de calculator af, met een regel erbij die dat zegt.

## Inhoud toevoegen

Alle inhoud staat in `assets/js/kb.js`. Je hoeft geen JavaScript te kennen: kopieer een blok en vul
het in.

```js
{
  id: "kort-id",
  titel: "De vraag of het onderwerp",
  categorie: "Systemen",
  status: "check",
  trefwoorden: ["woorden", "die een student zou typen", "ook verkeerd gespeld"],
  body: `<p>De uitleg in gewone taal.</p>`,
  bron: BRON.services
}
```

`categorie` is een van: Systemen, Studiepunten, Campus, Hulp, Meedoen.

`bron` wijst naar een sleutel uit de `BRON`-tabel bovenaan het bestand. Staat de bron die je nodig
hebt er nog niet in, voeg hem daar toe in plaats van de URL ter plekke uit te schrijven: dan hoef je
een verhuisde pagina maar op één plek bij te werken.

`status` is voor het team en staat niet op de site. `check` betekent dat we het hebben opgezocht op
een HAN-bron en de link in `bron` staat. `todo` betekent dat de openbare bron nog ontbreekt: houd de
tekst dan algemeen en laat een detail eerst door de opleiding bevestigen.

Verzin niets, en laat AI niets verzinnen. Zoek het op bij de HAN en zet de bron erbij. Klopt de
doorstroomnorm niet in onze app, dan kan dat iemand studievertraging kosten.

Controleer bij ieder nieuw studiejaar minimaal het OS/OER, de doorstroomnorm, het jaarrooster en de
contactroutes. Nieuwe items met `status: "todo"` blijven bewust algemeen totdat een actuele, openbare
bron of de opleiding de details heeft bevestigd. Verander zulke tekst niet in een specifieke termijn,
ruimte of contactpersoon zonder ook de bron bij te werken.

## Bronnen

- [Online services op han.nl](https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/): systemen, HANaccount, eduroam
- [OS/OER ICT voltijd 2026-2027](https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/bacheloropleiding-ict-voltijd.pdf): persoonlijk studieadvies, doorstroomnorm, EC en propedeuse
- [Praktische info ICT op han.nl](https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/): adressen, iSAS, ziekmelden, Xtend en wonen
- [Jaarrooster 2026-2027](https://www.han.nl/studeren/jaarrooster/): periodes, vakanties en lesvrije weken
- [Studiefaciliteiten](https://www.han.nl/studeren/onderwijs/studiefaciliteiten/): HANcard, printen en CampusStore
- [Diensten van de HAN Bibliotheken](https://www.han.nl/over-de-han/organisatie/bedrijfsonderdelen/bibliotheek/diensten/): studentwerkplekken
- [Digitale toetsing](https://www.han.nl/onderwijsondersteuning/leren-werken-met-ict/toetsing/): Ans
- [Goed bestuur](https://www.han.nl/over-de-han/organisatie/bestuur/goed-bestuur/): vertrouwenspersonen en klachten
- [ICT voltijd](https://www.han.nl/opleidingen/hbo/ict/voltijd/): praktijkopdrachten en echte opdrachtgevers
- [Praktische info CMD](https://www.han.nl/opleidingen/hbo/communication-multimedia-design/voltijd/praktische-info/): B302 als praktijkwerk voor CMD-studenten
- [Stoppen of switchen](https://www.han.nl/studeren/voltijd/switchen-van-studie/): uitschrijven, collegegeld en DUO
- [Rechten en plichten](https://www.han.nl/studeren/succesvol-studeren/rechten-plichten/): studentenstatuut, OS/OER en klachten
- [Succesvol studeren op han.nl](https://www.han.nl/studeren/succesvol-studeren/): hulplijnen
- [HAN Insite](https://www1.han.nl/insite/): studentenportaal, OS/OER, jaarrooster
- [duo.nl](https://duo.nl/): studiefinanciering en studentenreisproduct
- [Locaties van de HAN](https://www.han.nl/contact/locaties/): adressen en voorzieningen per campus
- [113 Zelfmoordpreventie](https://www.113.nl/): acute hulp, dag en nacht

## Acute hulp

De site nodigt met trefwoorden als "somber", "eenzaam" en "paniek" uit tot zware vragen. Daarom krijgt
een acute zoekvraag altijd het acute antwoord bovenaan. Bij het antwoord over de studentenpsycholoog
staat daarnaast de route voor als het niet kan wachten: huisarts of huisartsenpost, 113
Zelfmoordpreventie (113 of 0800 0113, dag en nacht), en 112 bij direct gevaar. De hulpwijzer vraagt
expliciet of hulp kan wachten en toont dezelfde route bij het antwoord "nee".

Die regel staat in `assistent.js` als `ACUTE_REGEL` en in `hulpwijzer.js` als de knoop `acuut`. Haal
hem er niet uit. Een assistent die alleen "maak een afspraak" zegt, is het verkeerde antwoord voor
iemand die om elf uur 's avonds typt dat het niet meer gaat.

## Wat er wordt opgeslagen

Het instelvenster bewaart je locatie, opleiding, jaar en klas onder de sleutel `handig-profiel` in de
localStorage van je browser, en de startchecklist onder `handig-checklist`. Er is geen server en geen
account: die gegevens blijven op je eigen apparaat en gaan nergens naartoe. Het klasveld is een vaste
keuzelijst, zodat er geen persoonsgegevens kunnen worden ingevuld.

Sluit je het instelvenster zonder het af te maken, dan komt het niet elk bezoek terug: dat wordt
onthouden als `uitgesteld`.

Dit staat ook voor bezoekers uitgeschreven op `privacy.html`.

## Herkomst van de inhoud

Bij het maken hiervan zijn geen inloggegevens gebruikt of gedeeld, is er geen data uit HAN-systemen
gehaald en staan er geen echte persoonsgegevens in. Opleidingsinformatie is gecontroleerd via
officiële HAN-bronnen. Voor onderwerpen buiten de HAN gebruiken we de verantwoordelijke officiële
bron.

De website gebruikt foto's van officiële HAN-pagina's. De foto's zijn lokaal opgeslagen en per
bestand gekoppeld aan hun bronpagina. Het auteursrecht blijft bij de HAN en de oorspronkelijke
rechthebbenden. Controleer vóór publicatie of toestemming en naamsvermelding nodig zijn. Details
staan in `ASSETS.md` en op `over.html`.

## Controle voor een nieuwe versie

1. Controleer de actuele studiejaargegevens tegen het OS/OER.
2. Controleer dat alle pagina's dezelfde, geldige iconsprite bevatten.
3. Controleer alle JavaScript-bestanden in PowerShell met
   `Get-ChildItem assets/js/*.js | ForEach-Object { node --check $_.FullName }`.
4. Loop de assistent, EC-calculator, hulpwijzer, campuskaart, lokaalzoeker, onboarding,
   privacy-wisknop en een diepe 404-URL in de browser na op desktop en mobiel.
5. Controleer externe links en metadata voordat de site opnieuw wordt gepubliceerd.
