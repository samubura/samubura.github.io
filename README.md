# samubura.github.io

My personal academic website — [Docusaurus](https://docusaurus.io), docs and blog disabled.

```sh
npm install
npm start          # dev server on :3000
npm run build      # production build into build/
```

## Single source of truth

`cv/` holds the LaTeX sources of my academic CV. The publication list on the site is
**generated from `cv/own-bib.bib`** by `gen_pubs.py` into `src/data/publications.json`,
which the pages import — so the website and the CV can't disagree.

`gen_pubs.py` runs automatically before `npm start` and `npm run build` (npm `pre*` hooks)
and in CI, so you never have to remember it.

```sh
./update.sh        # rebuild the CV PDF from LaTeX + regenerate publications
```

The PDF served at `/Samuele_Burattini_CV.pdf` is built locally by `update.sh` and committed,
since CI has no TeX Live.

## Where things live

| Path | What |
|---|---|
| `src/pages/index.js` | Homepage |
| `src/pages/research.mdx` | Research page — Markdown; cite own papers with `<Cite title="..." />` |
| `src/pages/cv.mdx` | CV page — plain Markdown, edit freely |
| `src/pages/publications.mdx` | Wraps `src/components/Publications.js` (generated data) |
| `blog/` | Notes — **currently disabled**; see `blog/README.md` to switch it back on |
| `cv/` | LaTeX sources of the CV (source of truth for publications) |
| `static/` | Files served as-is, including the CV PDF |

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`.
