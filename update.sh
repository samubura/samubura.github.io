#!/usr/bin/env bash
# Rebuild everything from the CV sources: PDF + the publications list on the site.
set -e
cd "$(dirname "$0")"
(cd cv && latexmk -pdf -silent cv-llt.tex)
cp cv/cv-llt.pdf Samuele_Burattini_CV.pdf
python3 gen_pubs.py
