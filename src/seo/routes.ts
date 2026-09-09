/**
 * 站点 SEO 的路由清单：哪些页面不进索引、哪些旧地址需要跳转。
 *
 * 集中放在这里，是为了让 `docusaurus.config.ts` 只描述「站点长什么样」，
 * 而把「搜索引擎该怎么看这个站」的规则收敛成一份可审阅的数据。
 */

/** 迁移前的文档版博客文章（`/docs/博客/*`）与迁移后的博客 slug 一一对应。 */
const MIGRATED_BLOG_SLUGS: readonly string[] = [
  'knowflow-year-review',
  'knoweval-rag-evaluation',
  'knowflow-v2.1.6-image-search',
  'knowflow-v2.1.8-paddleocr-vl',
  'knowflow-v2.1.9-import-export',
  'knowflow-v2.3.0-release',
  'knowflow-v2.3.4-deepread',
];

/**
 * 旧地址 → 新地址。
 *
 * 博客此前挂在文档目录下（`/docs/博客/...`），不利于 SEO 也不符合读者预期，
 * 已迁到独立的 `/blog`。这些地址已被 Google 与百度收录，必须保留跳转。
 */
export const BLOG_REDIRECTS: readonly {from: string; to: string}[] = [
  {from: '/docs/博客', to: '/blog'},
  ...MIGRATED_BLOG_SLUGS.map((slug) => ({
    from: `/docs/博客/${slug}`,
    to: `/blog/${slug}`,
  })),
];

/**
 * 所有语言都不进索引的路由（相对构建产物根目录的文件路径）。
 *
 * 标签页与作者页是「同一批文章的不同排列」，对搜索引擎是薄内容，
 * 此前被 Google 判为软 404。保留页面供站内导航，但明确 noindex。
 */
export const NOINDEX_ROUTES: readonly string[] = [
  'blog/tags.html',
  'blog/tags/**',
  'blog/authors.html',
  'blog/authors/**',
  'blog/page/**',
];

/**
 * 按语言额外 noindex 的路由。
 *
 * 英文站目前只翻译了首页、产品页、关于与联系等核心页面；
 * 文档与博客仍是中文原文，与中文站构成重复内容，先排除出索引，
 * 待逐步翻译完成后再从这里移除对应条目。
 */
export const LOCALE_NOINDEX_ROUTES: Readonly<Record<string, readonly string[]>> =
  {
    en: [
      'docs.html',
      'docs/**',
      'analytics/docs.html',
      'analytics/docs/**',
      'blog.html',
      'blog/**',
    ],
  };

/** 不写入 sitemap 的路由（与 noindex 清单保持一致，避免自相矛盾的信号）。 */
export const SITEMAP_IGNORE_PATTERNS: readonly string[] = [
  '/blog/tags',
  '/blog/tags/**',
  '/blog/authors',
  '/blog/authors/**',
  '/blog/page/**',
  '/en/docs/**',
  '/en/analytics/docs/**',
  '/en/blog',
  '/en/blog/**',
];
