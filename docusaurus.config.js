module.exports = {
  title: 'Todo List',
  tagline: 'Official documentation',
  url: 'https://ajacquierbret.github.io',
  baseUrl: '/build/',
  favicon: 'favicon.ico',
  onBrokenLinks: 'throw',
  organizationName: 'ajacquierbret',
  projectName: 'todo-list-docs',
  themeConfig: {
    navbar: {
      title: 'TODO LIST',
      logo: {
        alt: 'TODO LIST',
        src: '/img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/ajacquierbret/todo-list-app',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'How to use',
              to: 'docs/',
            },
            {
              label: 'Technical Documentation',
              to: 'docs/tech-doc',
            },
            {
              label: 'Performance Audit',
              to: 'docs/audit',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ajacquierbret/todo-list-app',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TODO LIST, Adrien JACQUIER BRET. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
