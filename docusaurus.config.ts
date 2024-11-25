import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Blog',
  tagline: 'Ayyaz Akhtar',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://blog.ayyazakhtar.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'aakhtar', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: 'UUCZ91D4DG',
      apiKey: '936233e743f3812bf479800dd5e6a249',
      indexName: 'ayyazakhtar',
      contextualSearch: true,
      externalUrlRegex: 'blog\\.ayyazakhtar\\.com',
      searchParameters: {},
      searchPagePath: 'search',
      insights: false,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },

    // Replace with your project's social card
    image: 'img/bike.gif',
    navbar: {
      title: 'My Blog',
      logo: {
        alt: 'My Blog Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://github.com/aakhtar3/blog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Website',
              href: 'https://ayyazakhtar.com',
            },
            {
              label: 'Github',
              href: 'https://github.com/aakhtar3',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/in/ayyaz-a-88844749',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
