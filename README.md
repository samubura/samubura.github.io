# samubura.github.io

Personal academic website — a single static `index.html`, no build step, no dependencies.

The `cv/` folder holds the LaTeX sources of my academic CV, and is the **single source of truth**:
the publication list on the website is generated from `cv/own-bib.bib`, so the two can't drift apart.

```sh
./update.sh      # rebuild the CV PDF + regenerate the publications section of index.html
./gen_pubs.py    # just the publications (no LaTeX needed)
```

`gen_pubs.py` rewrites whatever sits between the `<!--PUBS-->` and `<!--/PUBS-->` markers in
`index.html`. Everything else on the page is edited by hand.
