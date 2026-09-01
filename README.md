# HANDIG_

Campus-assistent voor eerstejaarsstudenten ICT van de HAN.
Huisstijl, kleuren en vormentaal zijn overgenomen van [han.nl](https://www.han.nl/).

Geen officieel HAN-product.

## Starten

Geen installatie, geen build-stap. Twee opties:

1. Dubbelklik op `index.html`.
2. Of via de meegeleverde server voor een volledige lokale controle:

```bash
python server.py 5173
```

Daarna: <http://localhost:5173>

`server.py` serveert `404.html` bij een onbekend adres, net als de hosting doet.

## Publiceren

De site is ingericht voor GitHub Pages onder <https://jasonispw.github.io/campus-assistent/>. Alle
paden in de HTML zijn relatief, dus de site werkt zowel vanaf `file://` als vanuit een submap. Het
adres wordt pas publiek bereikbaar nadat GitHub Pages voor de repository is gepubliceerd.

`canonical`, `og:url` en `og:image` staan als volledige GitHub Pages-URL in de `<head>`, omdat
linkvoorbeelden in bijvoorbeeld WhatsApp en Teams geen relatief pad kunnen gebruiken. Pas deze
metadata aan als de site verhuist. De 404-pagina zet vóór het laden van assets een basispad voor
GitHub Pages, waardoor ook onbekende adressen met meerdere padsegmenten correct worden getoond.

## Stack

Dezelfde stack als han.nl zelf: statische HTML, CSS en vanilla JavaScript.
Geen framework, geen npm, geen dependencies en geen backend.

Waarom: het draait overal, blijft eenvoudig te beheren en heeft geen afhankelijkheden die apart
gebouwd of bijgewerkt moeten worden. De aanpak sluit bovendien aan op de statische basis van han.nl.

```
index.html            assistent, startchecklist en de tegels naar de onderwerpen
systemen.html         alle HAN-systemen
studiepunten.html     EC, studieadvies, doorstroomnorm, propedeuse en de EC-calculator
campus.html           locaties en je lokaal vinden
hulp.html             hulplijnen en de hulpwijzer
meedoen.html          studievereniging, Buro302, wonen
over.html             verantwoording, bronnen en colofon
privacy.html          wat er lokaal wordt opgeslagen en hoe je het wist
404.html              pagina niet gevonden

server.py             lokale server die 404.html serveert bij een onbekend adres
sprite.py             zet de icon-sprite in alle pagina's en meldt dode iconen
```

Elke pagina heeft dezelfde opbouw: eerst de skip-link, dan `<header>`, `<main>` met de secties,
`<footer>`, en helemaal onderaan de icon-sprite met de scripts.

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

De code staat zonder comments. Wat uitleg nodig heeft, staat hieronder.

#### Hoe het zoeken werkt

`assistent.js` normaliseert je vraag (kleine letters, accenten en leestekens eruit) en vergelijkt
daarna op **hele woorden**. Dat laatste is belangrijk: bij een deelwoordvergelijking vindt het
trefwoord `ec` ook "rechten" en `ans` ook "kans", en dan krijg je met volle overtuiging het verkeerde
antwoord. Elke vergelijking zet daarom spaties om het woord heen.

Bovenop de trefwoorden liggen drie lijsten:

- `SYNONIEMEN` vertaalt wat studenten typen naar wat er in de kennisbank staat ("cijfer" wordt "resultaten").
- `SPLITSBAAR` plakt Nederlandse scheidbare werkwoorden weer aan elkaar, zodat "hoe schrijf ik me uit"
  het trefwoord "uitschrijven" vindt.
- `CRISIS` bevat zinnen waarbij het antwoord over acute hulp altijd bovenaan komt, ongeacht de score.

Nieuwe trefwoorden altijd testen tegen vragen die al werkten: een te algemeen woord duikt overal op.

#### Waarom de sprite onderaan de pagina staat

De 38 icons staan als sprite inline in elke pagina, vlak voor de scripts. Een los `sprite.svg` met
`<use href="sprite.svg#i-x">` zou de herhaling weghalen, maar werkt niet vanaf `file://`. Onderaan in
plaats van bovenaan, zodat de structuur van de pagina eerst komt.

## Icons

Alle icons komen van [Iconify](https://iconify.design/), set **Tabler** (MIT-licentie), plus één
animatie-icoon uit **svg-spinners** voor de laadindicator.

`assets/icons/sprite.html` is de bron. Gebruiken doe je zo:

```html
<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-calendar"></use></svg>
```

Varianten: `icon--lg` voor 2,25rem, `icon--pink` voor de HAN-kleur, `tile__icon` en `tile__arrow`
voor de tegels. De kleur volgt `currentColor`, dus een icoon neemt de tekstkleur over.
Decoratieve icons krijgen altijd `aria-hidden="true" focusable="false"`, anders leest een schermlezer
ze voor als naamloze afbeelding.

### Een icoon toevoegen

1. Zoek het icoon op [icon-sets.iconify.design](https://icon-sets.iconify.design/tabler/).
2. Download het: `https://api.iconify.design/tabler/NAAM.svg` en zet het in `assets/icons/`.
3. Voeg een `<symbol id="i-NAAM" viewBox="0 0 24 24">` toe aan `assets/icons/sprite.html`.
4. Draai `python sprite.py`.

Dat script zet de sprite in alle pagina's en meldt welke icons je gebruikt maar niet hebt toegevoegd,
en welke je hebt toegevoegd maar nergens gebruikt. Kopieer het blok dus niet met de hand.

## Foutafhandeling

Ingebouwd, zodat een fout in één onderdeel de rest van de site niet onbruikbaar maakt:

- **Kennisbank niet geladen**: de assistent meldt dat hij niet beschikbaar is en zet het zoekveld uit,
  in plaats van een dood invoerveld te tonen.
- **Kapot item in `kb.js`**: dat ene item wordt overgeslagen, de rest blijft werken.
- **Fout tijdens het zoeken**: nette storingsmelding met een doorverwijzing naar het menu.
- **Ongeldige invoer in de calculator**: het veld kleurt rood met uitleg, en de meter, het totaal en
  de urenschatting gaan op nul in plaats van de vorige uitkomst te laten staan.
- **Onbekende stap in de hulpwijzer**: valt terug op de eerste vraag.
- **localStorage weigert te schrijven** (privévenster, volle opslag): de gebruiker krijgt het te zien
  in plaats van dat zijn vinkjes stilletjes verdwijnen.
- **Widget crasht**: alleen die widget toont een melding, de andere blijft werken.
- **Onbekende URL**: `404.html` vult de zoekterm alvast in op basis van het adres.

## Rekenen met EC

De calculator accepteert **zowel de komma als de punt**, want een Nederlandse student typt 12,5.
Een `<input type="number">` gooit een komma weg zonder melding, dus de velden zijn `type="text"` met
`inputmode="decimal"`: op mobiel krijg je nog steeds een cijfertoetsenbord.

Alles wordt op één decimaal afgerond vlak voor het tonen. Zonder die afronding levert 7,1 + 7,1 + 7,1
de uitkomst `21.299999999999997` op, en dat leest als een kapotte rekenmachine.

Boven 60 EC per jaar kapt de calculator af, met een regel erbij die dat zegt.

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
  bron: BRON.services
}
```

`categorie` is een van: Systemen, Studiepunten, Campus, Hulp, Meedoen.

`bron` wijst naar een sleutel uit de `BRON`-tabel bovenaan het bestand. Staat de bron die je nodig
hebt er nog niet in, voeg hem daar toe in plaats van de URL ter plekke uit te schrijven: dan hoef je
een verhuisde pagina maar op één plek bij te werken.

`status` is voor het team en staat niet op de site:

- `check`: we hebben het opgezocht op een HAN-bron en de link staat in `bron`.
- `todo`: de tekst klopt met wat we zeker weten, maar de specifieke details moeten nog langs een
  docent. Schrijf dan alleen op wat zeker is en verwijs naar wie het wel weet.

**Verzin niets, en laat AI niets verzinnen.** Zoek het op bij de HAN en zet de bron erbij.
Klopt de doorstroomnorm niet in onze app, dan kan dat iemand studievertraging kosten.

### Inhoud onderhouden

Controleer bij ieder nieuw studiejaar minimaal het OS/OER, de doorstroomnorm, het jaarrooster en de
contactroutes. Items met `status: "todo"` blijven bewust algemeen totdat een actuele, openbare bron of
de opleiding de details heeft bevestigd. Verander zulke tekst niet in een specifieke termijn, ruimte
of contactpersoon zonder ook de bron bij te werken.

## Bronnen

- [Online services op han.nl](https://www.han.nl/studeren/onderwijs/studiefaciliteiten/online-services/): systemen, HANaccount, eduroam
- [OS/OER ICT voltijd 2026-2027](https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/bacheloropleiding-ict-voltijd.pdf): persoonlijk studieadvies, doorstroomnorm, EC en propedeuse
- [Praktische info ICT op han.nl](https://www.han.nl/opleidingen/hbo/ict/voltijd/praktische-info/): adressen
- [Jaarrooster 2026-2027](https://www.han.nl/studeren/jaarrooster/): periodes, vakanties en lesvrije weken
- [Studiefaciliteiten](https://www.han.nl/studeren/onderwijs/studiefaciliteiten/): HANcard, printen en CampusStore
- [Stoppen of switchen](https://www.han.nl/studeren/voltijd/switchen-van-studie/): uitschrijven, collegegeld en DUO
- [Rechten en plichten](https://www.han.nl/studeren/succesvol-studeren/rechten-plichten/): studentenstatuut, OS/OER en klachten
- [Succesvol studeren op han.nl](https://www.han.nl/studeren/succesvol-studeren/): hulplijnen
- [HAN Insite](https://www1.han.nl/insite/): studentenportaal, OS/OER, jaarrooster
- [duo.nl](https://duo.nl/): studiefinanciering en studentenreisproduct
- [113 Zelfmoordpreventie](https://www.113.nl/): acute hulp, dag en nacht

## Acute hulp

De site nodigt met trefwoorden als "somber", "eenzaam" en "paniek" uit tot zware vragen. Daarom krijgt
een acute zoekvraag altijd het acute antwoord bovenaan. Bij het antwoord over de studentenpsycholoog
staat daarnaast de route voor als het niet kan wachten: huisarts of huisartsenpost, 113
Zelfmoordpreventie (113 of 0800 0113, dag en nacht), en 112 bij direct gevaar. De hulpwijzer vraagt
expliciet of hulp kan wachten en toont dezelfde route bij het antwoord "nee".

Die regel staat in `assistent.js` als `ACUTE_REGEL` en in `hulpwijzer.js` als de knoop `acuut`.
Haal hem er niet uit. Een assistent die alleen "maak een afspraak" zegt, is het verkeerde antwoord
voor iemand die om elf uur 's avonds typt dat het niet meer gaat.

## Wat er wordt opgeslagen

Het instelvenster bewaart je locatie, opleiding, jaar en klas onder de sleutel `handig-profiel`
in de localStorage van je browser, en de startchecklist onder `handig-checklist`. Er is geen server
en geen account: die gegevens blijven op je eigen apparaat en gaan nergens naartoe. Het klasveld
is een vaste keuzelijst, zodat er geen persoonsgegevens kunnen worden ingevuld.

Sluit je het instelvenster zonder het af te maken, dan komt het niet elk bezoek terug: dat wordt
onthouden als `uitgesteld`.

Dit staat ook voor bezoekers uitgeschreven op `privacy.html`.

## Herkomst van de inhoud

Bij het maken hiervan zijn geen inloggegevens gebruikt of gedeeld, is er geen data uit
HAN-systemen gehaald en staan er geen echte persoonsgegevens in. Alle studie-informatie is
opgezocht op han.nl en Insite.

Het beeldmateriaal in `assets/img/` is sfeerbeeld dat door AI is gemaakt. Het stelt geen
bestaand HAN-gebouw voor en er staat geen echt persoon op. Details en bronvermelding staan in
`ASSETS.md` en op `over.html`.

## Controle voor een nieuwe versie

1. Controleer de actuele studiejaargegevens tegen het OS/OER.
2. Draai `python sprite.py` en controleer dat alle pagina's dezelfde, geldige iconsprite bevatten.
3. Controleer alle JavaScript-bestanden in PowerShell met
   `Get-ChildItem assets/js/*.js | ForEach-Object { node --check $_.FullName }`.
4. Loop de assistent, EC-calculator, hulpwijzer, onboarding, privacy-wisknop en een diepe 404-URL in
   de browser na op desktop en mobiel.
5. Controleer externe links en metadata voordat de site opnieuw wordt gepubliceerd.
