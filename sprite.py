import io
import os
import re
import sys

MAP = os.path.dirname(os.path.abspath(__file__))
BRON = os.path.join(MAP, "assets", "icons", "sprite.html")
START = '<svg class="sprite"'
EIND = "</defs></svg>"

PAGINAS = [
    "index.html", "systemen.html", "studiepunten.html", "campus.html",
    "lokaalzoeker.html", "hulp.html", "meedoen.html", "over.html", "privacy.html", "404.html",
]


def lees(pad):
    with io.open(pad, encoding="utf-8") as bestand:
        return bestand.read()


def schrijf(pad, inhoud):
    with io.open(pad, "w", encoding="utf-8") as bestand:
        bestand.write(inhoud)


def gebruikte_iconen():
    gebruikt = set()
    for naam in PAGINAS:
        pad = os.path.join(MAP, naam)
        if os.path.exists(pad):
            gebruikt.update(re.findall(r'href="#(i-[a-z0-9-]+)"', lees(pad)))
    for naam in os.listdir(os.path.join(MAP, "assets", "js")):
        if naam.endswith(".js"):
            tekst = lees(os.path.join(MAP, "assets", "js", naam))
            gebruikt.update(re.findall(r'#(i-[a-z0-9-]+)', tekst))
            gebruikt.update(re.findall(r'"(i-[a-z0-9-]+)"', tekst))
    return gebruikt


def main():
    sprite = lees(BRON).strip()
    aanwezig = set(re.findall(r'<symbol id="(i-[a-z0-9-]+)"', sprite))
    gebruikt = gebruikte_iconen()

    ontbreekt = sorted(gebruikt - aanwezig)
    ongebruikt = sorted(aanwezig - gebruikt)

    for naam in ontbreekt:
        print("ontbreekt in de sprite: %s" % naam)
    for naam in ongebruikt:
        print("ongebruikt in de sprite: %s" % naam)

    aangepast = 0
    for naam in PAGINAS:
        pad = os.path.join(MAP, naam)
        if not os.path.exists(pad):
            print("bestaat niet: %s" % naam)
            continue

        inhoud = lees(pad)
        i = inhoud.find(START)
        j = inhoud.find(EIND)
        if i == -1 or j == -1:
            print("geen sprite gevonden in %s" % naam)
            continue

        nieuw = inhoud[:i] + sprite + inhoud[j + len(EIND):]
        if nieuw != inhoud:
            schrijf(pad, nieuw)
            aangepast += 1

    print("%d symbolen, %d pagina's bijgewerkt" % (len(aanwezig), aangepast))
    return 1 if ontbreekt else 0


if __name__ == "__main__":
    sys.exit(main())
