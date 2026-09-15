// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Samuele Burattini',
  tagline: 'Digital Twins, Multi-Agent Systems and the Web of Things',
  favicon: 'img/favicon.ico',

  url: 'https://samubura.github.io',
  baseUrl: '/',
  organizationName: 'samubura',
  projectName: 'samubura.github.io',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  future: { v4: true, faster: true },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // no documentation site - this is a personal website
        blog: {
          routeBasePath: 'blog',
          blogTitle: 'Notes',
          blogDescription: 'Research notes, talks and news',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          showReadingTime: true,
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: { type: ['rss', 'atom'], title: 'Samuele Burattini' },
        },
        theme: { customCss: './src/css/custom.css' },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/propic.png',
      colorMode: { respectPrefersColorScheme: true },
      navbar: {
        title: 'Samuele Burattini',
        hideOnScroll: false,
        items: [
          { to: '/research', label: 'Research', position: 'left' },
          { to: '/publications', label: 'Publications', position: 'left' },
          { to: '/cv', label: 'CV', position: 'left' },
          { to: '/blog', label: 'Notes', position: 'left' },
          {
            href: 'https://github.com/samubura',
            position: 'right',
            className: 'navbar-icon navbar-github',
            'aria-label': 'GitHub profile',
          },
          {
            href: 'https://scholar.google.com/citations?user=oxPJZLsAAAAJ',
            position: 'right',
            className: 'navbar-icon navbar-scholar',
            'aria-label': 'Google Scholar profile',
          },
          {
            href: 'https://www.linkedin.com/in/samuele-burattini/',
            position: 'right',
            className: 'navbar-icon navbar-linkedin',
            'aria-label': 'LinkedIn profile',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Profiles',
            items: [
              { label: 'University of Bologna', href: 'https://www.unibo.it/sitoweb/samuele.burattini/en' },
              { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=oxPJZLsAAAAJ' },
              { label: 'ORCID', href: 'https://orcid.org/0009-0009-4853-7783' },
              { label: 'DBLP', href: 'https://dblp.org/pid/347/7578.html' },
            ],
          },
          {
            title: 'Elsewhere',
            items: [
              { label: 'GitHub', href: 'https://github.com/samubura' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuele-burattini/' },
              { label: 'Notes (RSS)', href: 'pathname:///blog/rss.xml' },
            ],
          },
          {
            title: 'Contact',
            items: [
              { label: 'samuele.burattini@unibo.it', href: 'mailto:samuele.burattini@unibo.it' },
              { label: 'Download CV (PDF)', href: 'pathname:///Samuele_Burattini_CV.pdf' },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Samuele Burattini · DISI, University of Bologna`,
      },
      prism: { theme: require('prism-react-renderer').themes.github },
    }),
};

module.exports = config;
