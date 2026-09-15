import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import publications from '@site/src/data/publications.json';
import styles from './index.module.css';

const PROFILES = [
  {label: 'University of Bologna', href: 'https://www.unibo.it/sitoweb/samuele.burattini/en'},
  {label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=oxPJZLsAAAAJ'},
  {label: 'ORCID', href: 'https://orcid.org/0009-0009-4853-7783'},
  {label: 'DBLP', href: 'https://dblp.org/pid/347/7578.html'},
  {label: 'GitHub', href: 'https://github.com/samubura'},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuele-burattini/'},
  {label: 'Email', href: 'mailto:samuele.burattini@unibo.it'},
];

const THEMES = [
  {
    title: 'Digital Twin Ecosystems',
    body: 'Hypermedia and Linked Data as the interoperability layer between digital twins: self-describing twins that agents can discover and compose at runtime, across the edge-cloud continuum.',
  },
  {
    title: 'Engineering Multi-Agent Systems',
    body: 'BDI agent programming languages and frameworks — concurrency models, explainability, anticipatory reasoning, and the knowledge-level framing of the Agents & Artifacts model.',
  },
  {
    title: 'Web of Things & Hypermedia MAS',
    body: 'Agents that use the Web as their environment: affordance discovery, domain-expert configuration of industrial hypermedia MAS, and agent embodiment in hypermedia spaces.',
  },
];

const NOW = [
  ['Digital Twin Ecosystems in the Edge-Cloud Continuum', 'Research fellowship at DISI, University of Bologna'],
  ['Urban Digital Twin of Bologna', 'Fairness-aware models for its socio-demographic extension, at the Alma Human AI Research Center'],
  ['Industry 4.0', 'Taught in the M.Sc. in Digital Transformation Management'],
];

function Recent() {
  const recent = publications.filter((p) => !p.inPress).slice(0, 4);
  return (
    <ul className={styles.recent}>
      {recent.map((p) => (
        <li key={p.title}>
          <span className={styles.recentTitle}>
            {p.doi ? <a href={`https://doi.org/${p.doi}`}>{p.title}</a> : p.title}
          </span>
          <span className={styles.recentMeta}>
            {p.venue}
            {p.year ? ` · ${p.year}` : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="PostDoc researcher at the University of Bologna working on Digital Twins, Multi-Agent Systems and the Web of Things.">
      <main className={styles.main}>
        <header className={styles.hero}>
          <img
            className={styles.photo}
            src={useBaseUrl('/img/propic.png')}
            alt="Samuele Burattini"
          />
          <div>
            <h1 className={styles.name}>Samuele Burattini</h1>
            <p className={styles.role}>
              PostDoc Researcher &amp; Adjunct Professor · Department of Computer Science and
              Engineering, University of Bologna
            </p>
            <p className={styles.lede}>
              I work on <strong>Digital Twins</strong>, <strong>Multi-Agent Systems</strong> and the{' '}
              <strong>Web of Things</strong> — designing the abstractions and the tooling that let
              autonomous agents and digital twins discover, understand and act on each other across
              pervasive cyber-physical environments.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/cv">
                Curriculum Vitae
              </Link>
              <Link className="button button--secondary button--outline" to="/publications">
                Publications
              </Link>
            </div>
            <ul className={styles.profiles}>
              {PROFILES.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section className={styles.section}>
          <h2>What I work on</h2>
          <div className={styles.cards}>
            {THEMES.map((t) => (
              <div className={styles.card} key={t.title}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <p>
            <Link to="/research">More about the research →</Link>
          </p>
        </section>

        <section className={styles.section}>
          <h2>Currently</h2>
          <ul className={styles.now}>
            {NOW.map(([what, where]) => (
              <li key={what}>
                <strong>{what}</strong>
                <span>{where}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Recent publications</h2>
          <Recent />
          <p>
            <Link to="/publications">All {publications.length} publications →</Link>
          </p>
        </section>
      </main>
    </Layout>
  );
}
