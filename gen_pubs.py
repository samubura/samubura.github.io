#!/usr/bin/env python3
"""Generate src/data/publications.json from the CV's BibTeX file.

    ./gen_pubs.py [path/to/own-bib.bib]

The CV bibliography is the single source of truth: the Publications page imports
this JSON, so the website can never drift from the CV.
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
BIB = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "cv/own-bib.bib"
OUT = HERE / "src/data/publications.json"
ME = "Samuele Burattini"

ACCENTS = {r"\'e": "é", r"\'E": "É", r"\'a": "á", r"\'i": "í", r"\'o": "ó", r"\'u": "ú",
           r"\'\i": "í", r'\"a': "ä", r'\"o': "ö", r'\"u': "ü", r'\"A': "Ä", r'\"O': "Ö",
           r"\`a": "à", r"\`e": "è", r"\~a": "ã", r"\~o": "õ", r"\c c": "ç", r"\^e": "ê"}


def detex(s):
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\\(['`\"^~])\{(\w)\}", r"\\\1\2", s)   # \"{u} -> \"u
    s = re.sub(r"\\c\{(\w)\}", r"\\c \1", s)            # \c{c} -> \c c
    for k, v in ACCENTS.items():
        s = s.replace("{" + k + "}", v).replace(k + "{}", v).replace(k, v)
    s = s.replace("---", "\u2014").replace("--", "\u2013")
    return s.replace("\\&", "&").replace("\\_", "_").replace("{", "").replace("}", "").strip()


def author_list(raw):
    names = []
    for a in detex(raw).split(" and "):
        a = a.strip()
        if a == "others":
            names.append("et al.")
        elif "," in a:
            last, first = a.split(",", 1)
            names.append(f"{first.strip()} {last.strip()}")
        else:
            names.append(a)
    return names


def field(entry, *keys):
    for k in keys:
        m = re.search(r"\n\s*" + k + r"\s*=\s*\{(.*?)\}\s*,?\s*\n", entry, re.S)
        if m:
            return m.group(1)
    return ""


def parse(text):
    pubs = []
    for chunk in re.split(r"\n(?=@)", text):
        m = re.match(r"@(\w+)\s*\{", chunk)
        if not m:
            continue
        kind = m.group(1).lower()
        title = detex(field(chunk, "title"))
        if not title:
            continue
        year = detex(field(chunk, "year"))
        pubs.append({
            "title": title,
            "year": re.sub(r"\D", "", year),
            "venue": detex(field(chunk, "journal", "booktitle", "series")),
            "doi": detex(field(chunk, "doi")).replace("\\", ""),
            "authors": author_list(field(chunk, "author")),
            "type": "journal" if kind == "article" else "conference",
            "inPress": kind == "unpublished" or "submitted" in year.lower(),
        })
    pubs.sort(key=lambda p: (p["year"] or "0000", p["title"]), reverse=True)
    return pubs


def main():
    pubs = parse(BIB.read_text(encoding="utf-8"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(pubs, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"{len(pubs)} publications written to {OUT}")


if __name__ == "__main__":
    main()
