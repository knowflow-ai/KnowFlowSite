import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {
  BLOG_REDIRECTS,
  LOCALE_NOINDEX_ROUTES,
  NOINDEX_ROUTES,
  SITEMAP_IGNORE_PATTERNS,
} from './src/seo/routes';
import {structuredData} from './src/seo/structuredData';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const SITE_URL = 'https://www.knowflowchat.cn';

const config: Config = {
  title: 'KnowFlow',
  tagline: '准确、可靠、可落地的私有化企业级知识库与智能问数',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: SITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain deployment, use root path
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'weizxfree', // Usually your GitHub org/user name.
  projectName: 'KnowFlowSite', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {label: '简体中文', htmlLang: 'zh-Hans'},
      en: {label: 'English', htmlLang: 'en'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/weizxfree/KnowFlow/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'KnowFlow 博客',
          blogDescription:
            'KnowFlow 官方博客：企业级知识库与智能问数的版本发布、文档解析实践、RAG 工程化经验与私有化落地案例。',
          blogSidebarTitle: '最新文章',
          blogSidebarCount: 10,
          postsPerPage: 10,
          // 归档页对搜索引擎是薄内容，直接不生成
          archiveBasePath: null,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'KnowFlow 博客',
            description:
              'KnowFlow 企业级知识库与智能问数的产品更新与技术实践',
            copyright: `Copyright © ${new Date().getFullYear()} KnowFlow Project`,
          },
          editUrl: 'https://github.com/weizxfree/KnowFlow/tree/main/blog/',
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'throw',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
          ignorePatterns: [...SITEMAP_IGNORE_PATTERNS],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'analytics',
        path: 'analytics-docs',
        routeBasePath: 'analytics/docs',
        sidebarPath: './sidebars-analytics.ts',
        editUrl:
          'https://github.com/knowflow-ai/analytics/tree/main/docs/',
      },
    ],
    [
      './plugins/seo',
      {
        noindexRoutes: [...NOINDEX_ROUTES],
        localeNoindexRoutes: LOCALE_NOINDEX_ROUTES,
        redirects: [...BLOG_REDIRECTS],
      },
    ],
  ],

  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'text/javascript'},
      innerHTML:
        "(function(){var bp=document.createElement('script');var curProtocol=window.location.protocol.split(':')[0];if (curProtocol === 'https'){bp.src='https://zz.bdstatic.com/linksubmit/push.js'}else{bp.src='http://push.zhanzhang.baidu.com/push.js'}var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bp,s);})();",
    },
    ...structuredData.map((data) => ({
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify(data),
    })),
  ],

  themeConfig: {
    metadata: [
      {
        name: 'description',
        content:
          'KnowFlow 提供两条产品线：企业级知识库以文档结构理解为核心，让非结构化文档可问可信可追溯；智能问数以受治理语义层替代 Prompt 拼装，让业务人员用中文问数据。均支持私有化部署。',
      },
      {
        name: 'keywords',
        content:
          'KnowFlow, 企业知识库, 私有化知识库, RAG 系统, 文档结构理解, 多模态知识库, 知识库分块, RAGFlow, 智能问数, 企业问数, 语义层, Text-to-SQL, 企业 AI, 智能问答',
      },
      {name: 'baidu-site-verification', content: 'codeva-U93CBs1T3a'},
    ],
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'KnowFlow',
      logo: {
        alt: 'KnowFlow Logo',
        src: 'img/k-icon-3.svg',
      },
      items: [
        {
          to: '/',
          label: '首页',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: '产品',
          position: 'left',
          items: [
            {to: '/product', label: '企业知识库'},
            {to: '/analytics', label: '智能问数'},
          ],
        },
        {
          type: 'dropdown',
          label: '文档',
          position: 'left',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              label: '企业知识库文档',
            },
            {
              type: 'docSidebar',
              sidebarId: 'analyticsSidebar',
              docsPluginId: 'analytics',
              label: '智能问数文档',
            },
          ],
        },
        {
          to: '/blog',
          label: '博客',
          position: 'left',
        },
        {
          to: '/about',
          label: '关于我们',
          position: 'left',
        },
        {
          to: '/contact',
          label: '联系我们',
          position: 'right',
          className: 'navbar__item--cta',
        },
        {
          href: 'https://github.com/weizxfree/KnowFlow',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '产品',
          items: [
            {label: '企业知识库', to: '/product'},
            {label: '智能问数', to: '/analytics'},
            {label: '申请 POC 验证', to: '/contact'},
          ],
        },
        {
          title: '文档',
          items: [
            {label: '知识库快速开始', to: '/docs/intro'},
            {label: '知识库安装指南', to: '/docs/installationDocker'},
            {label: '智能问数介绍', to: '/analytics/docs/intro'},
            {label: '智能问数快速开始', to: '/analytics/docs/quick-start'},
          ],
        },
        {
          title: '资源',
          items: [
            {label: '博客', to: '/blog'},
            {label: '更新日志', to: '/docs/发布记录'},
            {
              label: 'GitHub',
              href: 'https://github.com/weizxfree/KnowFlow',
            },
            {
              label: 'RAGFlow 官方',
              href: 'https://github.com/infiniflow/ragflow',
            },
          ],
        },
        {
          title: '关于',
          items: [
            {label: '关于我们', to: '/about'},
            {label: '联系我们', to: '/contact'},
            {label: '隐私政策', to: '/privacy'},
            {label: '服务条款', to: '/terms'},
          ],
        },
      ],
      copyright:
        'Copyright © 2026 合肥知识库流动人工智能应用软件有限责任公司 · 公众号：KnowFlow 企业知识库 <br /> <img src="/img/icp-icon.png" alt="公安备案图标" width="18" height="20" style="vertical-align:middle;margin:0 4px;" /> <a href="https://beian.mps.gov.cn/#/query/webSearch?code=34019202002648" rel="noreferrer" target="_blank">皖公网安备34019202002648号</a> <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">皖ICP备2025099328号</a>',
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
