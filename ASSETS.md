# Benodigde beeldassets voor HANDIG_

Alle bestandsnamen en formaten hieronder zijn al in de CSS ingebouwd. Zet de bestanden in
`assets/img/` met exact deze namen, dan verschijnen ze vanzelf. Zolang ze ontbreken valt de site
terug op de donkere gradient en blijft alles werken.

Zolang de map leeg is meldt de console van je browser een paar keer "404 Not Found" voor die
afbeeldingen. Dat is normaal en verdwijnt zodra de bestanden er staan. Voor de bezoeker is er
niets aan de hand.

## Lees dit eerst: wat je wel en niet mag laten genereren

De opdracht eist dat alle informatie in het prototype echt en opgezocht is. Dat geldt ook voor beeld.

**Niet door AI laten maken:** foto's die eruitzien als de echte HAN-campus, de Ruitenberglaan 26 of
de Prof. Molkenboerstraat 3, plattegronden van de B- en C-vleugel, of logo's van de HAN, Xtend,
Buro302, Brightspace, Osiris en MyX. Een AI-gegenereerd gebouw dat "de HAN" moet voorstellen is een
verzonnen afbeelding van een echte plek. Als een docent daar tijdens de presentatie op doorvraagt,
is dat lastig uit te leggen.

Die beelden haal je op door zelf te fotograferen, of je vraagt ze op bij de opleiding.

**Wel prima door AI:** sfeerbeeld dat niets specifieks claimt. Abstracte texturen, close-ups van
techniek, handen op een toetsenbord, kabels, schermen, licht. Geen herkenbare gebouwen, geen
gezichten, geen logo's, geen tekst in beeld.

---

## Stijl voor alle afbeeldingen

Geef dit mee aan het beeldmodel, zodat alles bij elkaar past:

> Donkere, contrastrijke foto. Bijna monochroom donkergrijs tot zwart, met één accent in
> magenta-roze (#E50056) uit een lamp, scherm of reflectie. Zachte cinematografische belichting,
> ondiepe scherptediepte. Geen tekst, geen letters, geen logo's, geen herkenbare gezichten,
> geen watermerk. Realistische fotografie, geen illustratie, geen 3D-render.

De linkerhelft van elke hero wordt bedekt met een donkere laag en witte tekst. Houd links dus rustig
en zet het onderwerp rechts in beeld.

---

## 1. Hero-achtergronden (8 stuks)

**Formaat:** 2400 x 1200 px, JPG, liggend 2:1. Onderwerp rechts, links rustig.

| Bestandsnaam | Onderwerp |
|---|---|
| `hero-home.jpg` | Bureau van bovenaf in halfduister: laptop met code, notitieblok, telefoon met agenda-app. Roze schermgloed. |
| `hero-systemen.jpg` | Meerdere schermen naast elkaar in het donker, elk met een ander interface-raster. Abstract, geen leesbare tekst. |
| `hero-studiepunten.jpg` | Close-up van een agenda of planner met markeringen, potlood, in warm-donker licht met roze accent. |
| `hero-campus.jpg` | Abstracte moderne architectuur: betonnen trap, glazen gevel van binnenuit, strakke lijnen. Geen herkenbaar gebouw. |
| `hero-hulp.jpg` | Twee mensen in gesprek aan een tafel, van veraf en tegenlicht, silhouetten, gezichten niet herkenbaar. |
| `hero-meedoen.jpg` | Groep mensen van achteren gezien in een ruimte met roze accentverlichting. Geen gezichten. |
| `hero-over.jpg` | Werkplek met post-its en schetsen op een whiteboard, onscherp, geen leesbare tekst. |
| `hero-404.jpg` | Lege donkere gang met één roze lamp aan het eind. Verlaten sfeer. |

## 2. Tegels op de homepage (5 stuks)

**Formaat:** 900 x 675 px, JPG, liggend 4:3. Wordt donker overlayd met een titel eroverheen, dus
mag rustig en eenvoudig zijn.

| Bestandsnaam | Onderwerp |
|---|---|
| `tile-systemen.jpg` | Laptopscherm met een inlogveld, onscherp, roze cursor-gloed. |
| `tile-studiepunten.jpg` | Stapel boeken en een rekenmachine in donker licht. |
| `tile-campus.jpg` | Betonnen trappenhuis met roze licht van boven. |
| `tile-hulp.jpg` | Twee stoelen tegenover elkaar bij een raam, tegenlicht, leeg. |
| `tile-meedoen.jpg` | Tafel met kopjes en laptops na een bijeenkomst, niemand in beeld. |

## 3. Deelbaar beeld voor social media (1 stuk)

**Bestandsnaam:** `og-image.jpg`
**Formaat:** 1200 x 630 px, JPG.

Donkere achtergrond in HAN-stijl met veel lege ruimte. Wij zetten er zelf geen tekst op, dus laat
het beeldmodel ook geen tekst genereren. Denk aan hetzelfde bureau-onderwerp als `hero-home.jpg`,
maar rustiger en meer uitgezoomd.

## 4. Favicon in grotere maten (2 stuks)

Het huidige `assets/favicon.png` is 32 x 32. Dat is te klein voor tabbladen op schermen met hoge
resolutie en voor een snelkoppeling op je telefoon. Nodig:

| Bestandsnaam | Formaat |
|---|---|
| `favicon-192.png` | 192 x 192 px, PNG, transparante of zwarte achtergrond |
| `favicon-512.png` | 512 x 512 px, PNG, transparante of zwarte achtergrond |

Dit is het HAN-logo en dus **geen AI-werk**: laat het bestaande logo opschalen vanuit het origineel,
of vraag een scherpe versie op. Een AI-nabootsing van een bestaand logo wordt wazig en klopt niet.

---

## Zelf fotograferen op school

Deze vervangen straks de gegenereerde versies en maken het prototype veel geloofwaardiger:

1. **De ingang van Ruitenberglaan 26** (vervangt `hero-campus.jpg`)
2. **Een gang in de B- of C-vleugel** met zichtbare lokaalnummering (vervangt `tile-campus.jpg`)
3. **Een werkplek of stilteplek** waar je echt mag zitten (vervangt `tile-hulp.jpg`)
4. **De kantine** (los beeld, voor de campuspagina)
5. **De officiële plattegronden** van de B- en C-vleugel, op te vragen bij de opleiding of de
   servicebalie. Nu staat er een schematische tekening zonder echte lokaalnummers.

Let bij foto's op school op: vraag toestemming als er mensen herkenbaar in beeld staan, of
fotografeer zo dat niemand herkenbaar is. Dat is ook meteen de AVG-regel waar je later in de
opleiding mee te maken krijgt.

---

## Icons: al geregeld

De 41 icons komen van [Iconify](https://iconify.design/), set Tabler, MIT-licentie. Ze staan in
`assets/icons/` en zitten als sprite in elke pagina. Daar hoeft niets meer voor gemaakt te worden.
Zie de README voor hoe je er eentje toevoegt.
