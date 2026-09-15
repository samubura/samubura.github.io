import React from 'react';
import styles from './ProfileLinks.module.css';

// Inline SVG so the page carries no external icon dependency.
// Brand marks for GitHub, LinkedIn, Google Scholar and ORCID; generic glyphs
// for the ones without a widely-recognised mark.
const ICONS = {
  scholar:
    'M5.242 13.769 0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5s-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
  orcid:
    'M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.516.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.026-5.325 5.026h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.588-1.444 3.588-3.722 0-2.086-1.303-3.722-3.588-3.722h-2.297z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.5 9.5h5V21h-5zM9.5 9.5h4.8v1.6h.1a5.3 5.3 0 0 1 4.7-2.5c5 0 5.9 3.2 5.9 7.4V21h-5v-4.6c0-1.1 0-2.5-1.6-2.5s-1.8 1.2-1.8 2.4V21h-5z',
  github:
    'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3',
  university:
    'M12 3 1 8.5l11 5.5 9-4.5V16h2V8.5L12 3zM5 12.9V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-4.1l-7 3.5-7-3.5z',
  book:
    'M4 3h6a3 3 0 0 1 2 .8A3 3 0 0 1 14 3h6a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-6a1 1 0 0 0-1 1h-2a1 1 0 0 0-1-1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v13h5a3 3 0 0 1 1 .2V6.8A1 1 0 0 0 10 5H5zm14 0h-5a1 1 0 0 0-1 1.8v11.4a3 3 0 0 1 1-.2h5V5z',
  mail:
    'M2 5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5zm2.4 1L12 11.8 19.6 6H4.4zM20 7.6l-7.4 5.6a1 1 0 0 1-1.2 0L4 7.6V18h16V7.6z',
};

const LINKS = [
  {
    label: 'University of Bologna',
    href: 'https://www.unibo.it/sitoweb/samuele.burattini/en',
    icon: 'university',
    color: '#a2112a',
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=oxPJZLsAAAAJ',
    icon: 'scholar',
    color: '#4285f4',
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org/0009-0009-4853-7783',
    icon: 'orcid',
    color: '#a6ce39',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/samuele-burattini/',
    icon: 'linkedin',
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/samubura',
    icon: 'github',
    color: '#24292f',
  },
  {
    label: 'DBLP',
    href: 'https://dblp.org/pid/347/7578.html',
    icon: 'book',
    color: '#004f9f',
  },
  {
    label: 'Email',
    href: 'mailto:samuele.burattini@unibo.it',
    icon: 'mail',
    color: '#0f7a70',
  },
];

export default function ProfileLinks() {
  return (
    <ul className={styles.links}>
      {LINKS.map((l) => (
        <li key={l.label}>
          <a href={l.href} style={{'--brand': l.color}} className={styles.link}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={ICONS[l.icon]} />
            </svg>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
