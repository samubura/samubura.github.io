import React from 'react';
import publications from '@site/src/data/publications.json';

/**
 * Cite one of my own papers by (part of) its title. The link and the year come
 * from cv/own-bib.bib, so a citation can never point at the wrong DOI.
 *
 *   <Cite title="HWoDT Framework" /> renders the paper's title, linked to its DOI.
 *   <Cite title="HWoDT Framework">the toolchain</Cite> uses your own link text.
 *
 * Throws at build time if the title matches no publication, so a typo fails the
 * build instead of shipping a dead reference.
 */
export default function Cite({title, children, year = false}) {
  const needle = title.toLowerCase();
  const matches = publications.filter((p) => p.title.toLowerCase().includes(needle));

  if (matches.length === 0) {
    throw new Error(`<Cite>: no publication matching "${title}"`);
  }
  if (matches.length > 1) {
    throw new Error(
      `<Cite>: "${title}" matches ${matches.length} publications: ` +
        matches.map((p) => p.title).join(' | '),
    );
  }

  const pub = matches[0];
  const label = children || pub.title;
  const suffix = year && pub.year ? ` (${pub.year})` : '';

  return pub.doi ? (
    <>
      <a href={`https://doi.org/${pub.doi}`}>{label}</a>
      {suffix}
    </>
  ) : (
    <>
      {label}
      {suffix}
    </>
  );
}
