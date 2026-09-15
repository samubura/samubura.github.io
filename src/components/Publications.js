import React from 'react';
import publications from '@site/src/data/publications.json';
import styles from './Publications.module.css';

const ME = 'Samuele Burattini';

function byYear(pubs) {
  const groups = new Map();
  for (const p of pubs) {
    const key = p.year || 'In preparation';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p);
  }
  return [...groups.entries()];
}

function Authors({names}) {
  return (
    <span className={styles.authors}>
      {names.map((n, i) => (
        <React.Fragment key={n + i}>
          {i > 0 && ', '}
          {n === ME ? <strong>{n}</strong> : n}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function Publications({filter}) {
  const pubs = filter ? publications.filter(filter) : publications;
  return (
    <div>
      {byYear(pubs).map(([year, items]) => (
        <section key={year}>
          <h2 className={styles.year}>{year}</h2>
          <ol className={styles.list}>
            {items.map((p) => (
              <li key={p.title}>
                <span className={styles.title}>{p.title}</span>
                <Authors names={p.authors} />
                <span className={styles.venue}>{p.venue}</span>
                <span className={styles.tags}>
                  {p.inPress ? (
                    <span className={styles.press}>In press / submitted</span>
                  ) : (
                    <span className={p.type === 'journal' ? styles.journal : styles.tag}>
                      {p.type === 'journal' ? 'Journal' : 'Conference'}
                    </span>
                  )}
                  {p.doi && (
                    <a className={styles.doi} href={`https://doi.org/${p.doi}`}>
                      DOI
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
