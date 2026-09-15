#!/usr/bin/env python3
"""Regenerate the publications section of index.html from the CV's BibTeX file.

    ./gen_pubs.py [path/to/own-bib.bib]

Rewrites everything between the <!--PUBS--> and <!--/PUBS--> markers in index.html,
so the website never drifts from the CV.
"""
import html
import re
import sys
from pathlib import Path

HERE = Path(__file__).parent
BIB = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "cv/own-bib.bib"
HTML = HERE / "index.html"
ME = "Samuele Burattini"

ACCENTS = {r"\'e": "é", r"\'E": "É", r"\'a": "á", r"\'i": "í", r"\'o": "ó", r"\'u": "ú",
           r"\'\i": "í", r'\"a': "ä", r'\"o': "ö", r'\"u': "ü", r'\"A': "Ä", r'\"O': "Ö",
           r"\`a": "à", r"\`e": "è", r"\~a": "ã", r"\~o": "õ", r"\c c": "ç", r"\^e": "ê"}


def detex(s):
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"\\([\'`\"^~])\{(\w)\}", r"\\\1\2", s)   # \"{u} -> \"u
    s = re.sub(r"\\c\{(\w)\}", r"\\c \1", s)             # \c{c} -> \c c
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
        else:
            names.append(f"{a.split(',')[1].strip()} {a.split(',')[0].strip()}" if "," in a else a)
    return names


def field(entry, *keys):
    for k in keys:
        # match a brace-balanced value: field = { ... },\n
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
        venue = detex(field(chunk, "journal", "booktitle", "series"))
        doi = detex(field(chunk, "doi")).replace("\\", "")
        submitted = "submitted" in year.lower() or kind == "unpublished"
        pubs.append({
            "title": title,
            "year": re.sub(r"\D", "", year) or "",
            "venue": venue,
            "doi": doi,
            "authors": author_list(field(chunk, "author")),
            "journal": kind == "article",
            "submitted": submitted,
        })
    pubs.sort(key=lambda p: (p["year"] or "0000", p["title"]), reverse=True)
    return pubs


def render(pubs):
    out = []
    for year, group in group_by_year(pubs):
        out.append(f'      <h3 class="year">{year}</h3>\n      <ol class="pubs">')
        for p in group:
            authors = ", ".join(
                f"<strong>{html.escape(a)}</strong>" if a == ME else html.escape(a)
                for a in p["authors"])
            if p["submitted"]:
                tags = ['<span class="tag wip">In press / submitted</span>']
            else:
                tags = ['<span class="tag journal">Journal</span>' if p["journal"]
                        else '<span class="tag">Conference</span>']
            link = (f' <a class="doi" href="https://doi.org/{html.escape(p["doi"])}">DOI</a>'
                    if p["doi"] else "")
            out.append(
                f'        <li>\n'
                f'          <span class="ptitle">{html.escape(p["title"])}</span>{link}\n'
                f'          <span class="authors">{authors}</span>\n'
                f'          <span class="venue">{html.escape(p["venue"])}</span>\n'
                f'          <span class="tags">{"".join(tags)}</span>\n'
                f'        </li>')
        out.append("      </ol>")
    return "\n".join(out)


def group_by_year(pubs):
    groups, order = {}, []
    for p in pubs:
        label = p["year"] or "In preparation"
        if label not in groups:
            groups[label] = []
            order.append(label)
        groups[label].append(p)
    return [(y, groups[y]) for y in order]


def main():
    pubs = parse(BIB.read_text(encoding="utf-8"))
    page = HTML.read_text(encoding="utf-8")
    new = re.sub(r"(<!--PUBS-->).*?(<!--/PUBS-->)",
                 lambda m: m.group(1) + "\n" + render(pubs) + "\n      " + m.group(2),
                 page, flags=re.S)
    if new == page and "<!--PUBS-->" not in page:
        sys.exit("index.html is missing the <!--PUBS--> ... <!--/PUBS--> markers")
    HTML.write_text(new, encoding="utf-8")
    print(f"{len(pubs)} publications written to {HTML}")


if __name__ == "__main__":
    main()
