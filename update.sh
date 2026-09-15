#!/usr/bin/env bash
# Rebuild the CV PDF from its LaTeX sources and refresh the publications data.
# Run this after editing anything under cv/.
set -e
cd "$(dirname "$0")"
(cd cv && latexmk -pdf -silent cv-llt.tex)
cp cv/cv-llt.pdf static/Samuele_Burattini_CV.pdf
python3 gen_pubs.py
echo "Done. Commit and push to deploy."
