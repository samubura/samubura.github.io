import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import publications from '@site/src/data/publications.json';
import ProfileLinks from '@site/src/components/ProfileLinks';
import styles from './index.module.css';


const THEMES = [
  {
    title: 'Digital Twins',
    body: 'Engineering digital twins of physical assets, processes and environments: modular and interoperable architectures that applications and agents can build on.',
  },
  {
    title: 'Multi-Agent Systems',
    body: 'Languages, frameworks and tools for programming autonomous agents and the systems they form, with an eye on making them explainable.',
  },
  {
    title: 'Semantic Web of Things',
    body: 'Web of Things and knowledge graphs to describe devices, services and environments so that both software agents and people can understand them.',
  },
];

const NOW = [
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
      description="PostDoc researcher at the University of Bologna working on software engineering for cyber-physical and autonomous systems.">
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
              I work on the <strong>software engineering of cyber-physical and autonomous
              systems</strong> — the abstractions, languages and tools to build systems where software
              agents, digital twins and physical devices work together.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/cv">
                Curriculum Vitae
              </Link>
              <Link className="button button--secondary button--outline" to="/publications">
                Publications
              </Link>
            </div>
            <ProfileLinks />
          </div>
        </header>

        <section className={styles.section}>
          <h2>What I work on</h2>
          <div className="cards">
            {THEMES.map((t) => (
              <div className="card" key={t.title}>
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
