// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require('remark-math');
const katex = require('rehype-katex');

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */

module.exports = async function () {

  return {
   title: 'Circuit protocol documentation',
   tagline: 'A Guide to the CircuitDAO Protocol',
   favicon: 'img/favicon.ico',

   // Set the production url of your site here
   url: 'https://docs.circuitdao.com',

   // Set the /<baseUrl>/ pathname under which your site is served
   // For GitHub pages deployment, it is often '/<projectName>/'
   baseUrl: '/',

   // GitHub pages deployment config.
   // If you aren't using GitHub pages, you don't need these.
   organizationName: 'CircuitDAO', // Usually your GitHub org/user name.
   projectName: 'docs', // Usually your repo name.
   onBrokenLinks: 'warn',
   onBrokenMarkdownLinks: 'warn',

   // Even if you don't use internalization, you can use this field to set useful
   // metadata like html lang. For example, if your site is Chinese, you may want
   // to replace "en" with "zh-Hans".
   i18n: {
     defaultLocale: 'en',
     locales: ['en'],
   },
   presets: [
     [
       '@docusaurus/preset-classic',
       {
         docs: {
           routeBasePath: '/',
           sidebarPath: require.resolve('./sidebars.js'),
           path: 'docs',
           remarkPlugins: [math],
           rehypePlugins: [katex],
         },
         theme: {
           customCss: require.resolve('./src/css/custom.css'),
         },
       },
     ],
   ],
   stylesheets: [
     {
       href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
       type: 'text/css',
       integrity:
         'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
       crossorigin: 'anonymous',
     },
   ],
   themeConfig:
     /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
     ({
       // Replace with your project's social card
       image: 'img/docusaurus-social-card.jpg',
       navbar: {
         title: 'Circuit - Documentation',
         logo: {
           alt: 'CircuitDAO Logo',
           src: 'img/logo.svg',
         },
         items: [
           {
             href: 'https://app.circuitdao.com',
             label: 'Go to app',
             position: 'right',
           },
           {
             href: 'https://github.com/circuitdao',
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
                     label: 'Getting started',
                     to: '/getting-started',
                 },
                 {
                     label: 'User guide',
                     to: '/category/user-guide',
                 },
                 {
                     label: 'FAQ',
                     to: '/faq',
                 },
             ],
           },
           {
             title: 'Community',
             items: [
               {
                 label: 'Twitter',
                 href: 'https://twitter.com/Circuit_DAO',
               },
               {
                 label: 'Discord',
                 href: 'https://discord.gg/4ke8bAhG',
               },
               {
                 label: 'Medium',
                 href: 'https://medium.com/@circuitdao',
               },
             ],
           },
           {
             title: 'More',
             items: [
                 {
                     label: 'App',
                     href: 'https://app.circuitdao.com',
                 },
                 {
                     label: 'GitHub',
                     href: 'https://github.com/circuitdao',
                 },
             ],
           },
         ],
         copyright: `Copyright © ${new Date().getFullYear()} Voltage Technologies Ltd`,
       },
       prism: {
         theme: lightCodeTheme,
         darkTheme: darkCodeTheme,
       },
     }),
  };

};
