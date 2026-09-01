import io
import json
import math
import os
import urllib.parse
import urllib.request

MAP = os.path.dirname(os.path.abspath(__file__))
DOEL = os.path.join(MAP, "assets", "js", "plattegrond-geo.js")

LOCATIESERVER = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free"
BAG = "https://service.pdok.nl/lv/bag/wfs/v2_0"
OVERPASS = [
    "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
    "https://overpass-api.de/api/interpreter",
    "https://overpass.private.coffee/api/interpreter",
]

ARNHEM = [
    ("r26", "Ruitenberglaan 26 Arnhem"),
    ("r27", "Ruitenberglaan 27 Arnhem"),
    ("r29", "Ruitenberglaan 29 Arnhem"),
    ("r31", "Ruitenberglaan 31 Arnhem"),
]

NIJMEGEN = [
    ("k33", "Kapittelweg 33 Nijmegen"),
    ("k35", "Kapittelweg 35 Nijmegen"),
    ("lvs2", "Laan van Scheut 2 Nijmegen"),
    ("lvs10", "Laan van Scheut 10 Nijmegen"),
    ("bhh", "Verlengde Groenestraat 75 Nijmegen"),
    ("gymnasion", "Heyendaalseweg 141 Nijmegen"),
    ("albertinum", "Heyendaalseweg 121 Nijmegen"),
    ("pm3", "Professor Molkenboerstraat 3 Nijmegen"),
    ("pvl25", "Philips van Leydenlaan 25 Nijmegen"),
    ("gw1", "Groenewoudseweg 1 Nijmegen"),
]

WEGSOORT = {
    "primary": "hoofd", "secondary": "hoofd", "tertiary": "hoofd",
    "residential": "straat", "unclassified": "straat", "living_street": "straat",
    "service": "dienst",
}

STRAAL = 6378137.0


def haal(url, tijd=120):
    verzoek = urllib.request.Request(url, headers={"User-Agent": "handig-plattegrond/1.0"})
    return json.load(urllib.request.urlopen(verzoek, timeout=tijd))


def mercator(lengte, breedte):
    x = math.radians(lengte) * STRAAL
    y = math.log(math.tan(math.pi / 4 + math.radians(breedte) / 2)) * STRAAL
    return x, y


def zoek_adres(vraag):
    url = LOCATIESERVER + "?" + urllib.parse.urlencode({"q": vraag, "fq": "type:adres", "rows": 1})
    doc = haal(url, 40)["response"]["docs"][0]
    punt = doc["centroide_ll"].replace("POINT(", "").replace(")", "").split()
    return doc["weergavenaam"], float(punt[0]), float(punt[1])


def zoek_panden(lengte, breedte, marge=0.0025):
    url = (BAG + "?service=WFS&version=2.0.0&request=GetFeature&typeName=bag:pand"
           "&outputFormat=application/json&srsName=EPSG:4326&count=3000"
           "&bbox=%f,%f,%f,%f,urn:ogc:def:crs:EPSG::4326"
           % (breedte - marge, lengte - marge, breedte + marge, lengte + marge))
    return haal(url)["features"]


def ligt_in(x, y, ring):
    binnen = False
    aantal = len(ring)
    for i in range(aantal):
        x1, y1 = ring[i][:2]
        x2, y2 = ring[(i + 1) % aantal][:2]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            binnen = not binnen
    return binnen


def vlakken(kenmerk):
    vorm = kenmerk["geometry"]
    if vorm["type"] == "Polygon":
        return [vorm["coordinates"]]
    return vorm["coordinates"]


def oppervlak(ring):
    basis = math.radians(sum(punt[1] for punt in ring) / len(ring))
    punten = [(math.radians(x) * math.cos(basis) * 6371000, math.radians(y) * 6371000)
              for x, y in [(p[0], p[1]) for p in ring]]
    som = 0
    for i in range(len(punten)):
        x1, y1 = punten[i]
        x2, y2 = punten[(i + 1) % len(punten)]
        som += x1 * y2 - x2 * y1
    return abs(som) / 2


def zoek_pand(kenmerken, lengte, breedte):
    for kenmerk in kenmerken:
        for vlak in vlakken(kenmerk):
            if ligt_in(lengte, breedte, vlak[0]):
                return kenmerk, vlak
    return None, None


def haal_wegen(vensters):
    regels = ["[out:json][timeout:90];", "("]
    soorten = "|".join(sorted(set(WEGSOORT)))
    for zuid, west, noord, oost in vensters:
        regels.append('  way["highway"~"^(%s)$"](%f,%f,%f,%f);' % (soorten, zuid, west, noord, oost))
    regels.append(");")
    regels.append("out geom tags;")
    vraag = "\n".join(regels).encode("utf-8")
    for adres in OVERPASS:
        try:
            verzoek = urllib.request.Request(adres, data=vraag, headers={"User-Agent": "handig-plattegrond/1.0"})
            return json.load(urllib.request.urlopen(verzoek, timeout=180))["elements"]
        except Exception as fout:
            print("  wegen mislukt via %s (%s)" % (adres, fout))
    return []


class Projectie(object):
    def __init__(self, ringen, marge, breedte_svg):
        punten = [mercator(p[0], p[1]) for ring in ringen for p in ring]
        basis = sum(p[1] for ring in ringen for p in ring) / sum(len(r) for r in ringen)
        rek = marge / math.cos(math.radians(basis))
        self.x0 = min(p[0] for p in punten) - rek
        self.x1 = max(p[0] for p in punten) + rek
        self.y0 = min(p[1] for p in punten) - rek
        self.y1 = max(p[1] for p in punten) + rek
        self.schaal = breedte_svg / (self.x1 - self.x0)
        self.breedte = breedte_svg
        self.hoogte = round((self.y1 - self.y0) * self.schaal, 1)
        self.meter = round(math.cos(math.radians(basis)) / self.schaal, 3)

    def punt(self, lengte, breedte):
        x, y = mercator(lengte, breedte)
        return round((x - self.x0) * self.schaal), round((self.y1 - y) * self.schaal)

    def raakt(self, punten):
        for lengte, breedte in punten:
            x, y = mercator(lengte, breedte)
            if self.x0 <= x <= self.x1 and self.y0 <= y <= self.y1:
                return True
        return False

    def pad(self, ring, sluit=True):
        stukken = []
        vorige = None
        for punt in ring:
            x, y = self.punt(punt[0], punt[1])
            if vorige and abs(x - vorige[0]) < 1 and abs(y - vorige[1]) < 1:
                continue
            stukken.append(("M" if vorige is None else "L") + "%g %g" % (x, y))
            vorige = (x, y)
        if len(stukken) < 2:
            return ""
        return "".join(stukken) + ("Z" if sluit else "")

    def vlak(self, vlak):
        return " ".join(p for p in (self.pad(ring) for ring in vlak) if p)

    def zwaartepunt(self, ring):
        punten = [self.punt(p[0], p[1]) for p in ring]
        vlak = som_x = som_y = 0
        for i in range(len(punten)):
            x1, y1 = punten[i]
            x2, y2 = punten[(i + 1) % len(punten)]
            kruis = x1 * y2 - x2 * y1
            vlak += kruis
            som_x += (x1 + x2) * kruis
            som_y += (y1 + y2) * kruis
        if not vlak:
            return punten[0]
        vlak *= 0.5
        return round(som_x / (6 * vlak), 1), round(som_y / (6 * vlak), 1)


def verzamel(locaties):
    gevonden = {}
    for sleutel, vraag in locaties:
        adres, lengte, breedte = zoek_adres(vraag)
        kenmerk, vlak = zoek_pand(zoek_panden(lengte, breedte), lengte, breedte)
        if not kenmerk:
            print("  geen pand voor %s" % vraag)
            continue
        gevonden[sleutel] = {
            "adres": adres,
            "pand": kenmerk["properties"]["identificatie"],
            "bouwjaar": kenmerk["properties"].get("bouwjaar"),
            "vlak": vlak,
            "opp": round(oppervlak(vlak[0])),
        }
        print("  %-12s %s  %s m2" % (sleutel, kenmerk["properties"]["identificatie"], gevonden[sleutel]["opp"]))
    return gevonden


def bouw_campus(gevonden, buren, marge, breedte_svg, min_opp, wegen, wegsoorten):
    ringen = [item["vlak"][0] for item in gevonden.values()]
    projectie = Projectie(ringen, marge, breedte_svg)

    eigen = set(item["pand"] for item in gevonden.values())
    gezien = set()
    omgeving = []
    for kenmerk in buren:
        code = kenmerk["properties"]["identificatie"]
        if code in eigen or code in gezien:
            continue
        gezien.add(code)
        for vlak in vlakken(kenmerk):
            if oppervlak(vlak[0]) < min_opp:
                continue
            if not projectie.raakt([(p[0], p[1]) for p in vlak[0]]):
                continue
            pad = projectie.vlak(vlak)
            if pad:
                omgeving.append(pad)

    lijnen = []
    for element in wegen:
        soort = WEGSOORT.get(element["tags"].get("highway"))
        if soort not in wegsoorten:
            continue
        punten = [(p["lon"], p["lat"]) for p in element.get("geometry", [])]
        if len(punten) < 2 or not projectie.raakt(punten):
            continue
        pad = projectie.pad(punten, sluit=False)
        if pad:
            lijnen.append({"d": pad, "s": soort})

    gebouwen = []
    for sleutel, item in gevonden.items():
        x, y = projectie.zwaartepunt(item["vlak"][0])
        gebouwen.append({
            "id": sleutel,
            "d": projectie.vlak(item["vlak"]),
            "x": x,
            "y": y,
            "pand": item["pand"],
            "bouwjaar": item["bouwjaar"],
            "opp": item["opp"],
        })
    return {"w": projectie.breedte, "h": projectie.hoogte, "m": projectie.meter,
            "omgeving": omgeving, "wegen": lijnen, "gebouwen": gebouwen}


def bouw_gebouw(vlak, breedte_svg):
    projectie = Projectie([vlak[0]], 8, breedte_svg)
    return {"w": projectie.breedte, "h": projectie.hoogte, "m": projectie.meter,
            "d": projectie.vlak(vlak)}


def venster(gevonden, marge=0.002):
    punten = [(p[0], p[1]) for item in gevonden.values() for p in item["vlak"][0]]
    return (min(p[1] for p in punten) - marge, min(p[0] for p in punten) - marge,
            max(p[1] for p in punten) + marge, max(p[0] for p in punten) + marge)


def main():
    print("Arnhem")
    arnhem = verzamel(ARNHEM)
    print("Nijmegen")
    nijmegen = verzamel(NIJMEGEN)

    print("Wegen ophalen")
    wegen = haal_wegen([venster(arnhem), venster(nijmegen)])
    print("  %d wegen" % len(wegen))

    print("Omgeving ophalen")
    buren_arnhem = []
    for item in arnhem.values():
        buren_arnhem += zoek_panden(item["vlak"][0][0][0], item["vlak"][0][0][1], 0.003)
    kaart_arnhem = bouw_campus(arnhem, buren_arnhem, 70, 1000, 90, wegen,
                               ("hoofd", "straat", "dienst"))

    buren_nijmegen = []
    for item in nijmegen.values():
        buren_nijmegen += zoek_panden(item["vlak"][0][0][0], item["vlak"][0][0][1], 0.003)
    kaart_nijmegen = bouw_campus(nijmegen, buren_nijmegen, 60, 1000, 350, wegen,
                                 ("hoofd", "straat"))

    data = {
        "arnhem": kaart_arnhem,
        "nijmegen": kaart_nijmegen,
        "r26": bouw_gebouw(arnhem["r26"]["vlak"], 760),
    }

    regels = json.dumps(data, separators=(",", ":"), ensure_ascii=False)
    with io.open(DOEL, "w", encoding="utf-8") as bestand:
        bestand.write("window.HANDIG_GEO = %s;\n" % regels)
    print("Geschreven: %s (%d KB)" % (DOEL, len(regels) // 1024))


if __name__ == "__main__":
    main()
