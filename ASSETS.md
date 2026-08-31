# Beeldassets voor HANDIG_

Alle bestandsnamen en formaten hieronder zijn in de CSS ingebouwd. De bestanden staan in
`assets/img/` en zijn allemaal aanwezig: acht hero-achtergronden, vijf tegels en het deelbare
beeld. Ontbreekt er een, dan valt die plek terug op de donkere gradient en blijft de site werken.

## Status

De huidige beelden zijn door AI gemaakt sfeerbeeld. Ze stellen geen bestaand HAN-gebouw voor en
er staat geen echt persoon op. Dat is verantwoord in `prototype.html` en in de README.

Twee dingen staan nog open:

- **`hero-campus.jpg` vervangen heeft voorrang.** Daar staat nu een compleet gebouw van
  buiten op. Op de campuspagina leest dat als "dit is de Ruitenberglaan", terwijl het gebouw
  verzonnen is. Vervang het door een eigen foto, of door een beeld dat niets specifieks claimt
  (een trappenhuis, een gevel van binnenuit).
- **De favicons in grotere maten ontbreken nog**, zie punt 4 hieronder.

## Lees dit eerst: wat je wel en niet mag laten genereren

De opdracht eist dat alle informatie in het prototype echt en opgezocht is. Dat geldt ook voor beeld.

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

De tegelrij op de homepage telt acht tegels. Drie daarvan lenen voorlopig een hero-beeld, omdat
er nog geen eigen bijsnede is. Zodra die er zijn, pakt de CSS ze vanzelf op:

| Bestandsnaam | Onderwerp | Nu tijdelijk |
|---|---|---|
| `tile-start.jpg` | Notitieblok met een afgevinkt lijstje, donker licht. | `hero-home.jpg` |
| `tile-rekenen.jpg` | Rekenmachine en een agenda, roze accent. | `hero-studiepunten.jpg` |
| `tile-over.jpg` | Whiteboard met schetsen, onscherp. | `hero-over.jpg` |

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

De 44 icons komen van [Iconify](https://iconify.design/), set Tabler, MIT-licentie. Ze staan in
`assets/icons/` en zitten als sprite in elke pagina. Daar hoeft niets meer voor gemaakt te worden.
Zie de README voor hoe je er eentje toevoegt.
