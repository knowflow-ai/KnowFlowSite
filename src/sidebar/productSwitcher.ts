/**
 * 文档区「产品切换器」。
 *
 * 以 sidebar `type: 'html'` 的形式注入到每个产品文档侧边栏顶部，
 * 桌面端与移动端共用同一份标记，无需 swizzle 主题组件。
 *
 * 站点是多语言构建，Docusaurus 在构建每个 locale 时会设置
 * `DOCUSAURUS_CURRENT_LOCALE`，据此拼出带语言前缀的链接。
 */

export type ProductKey = 'knowledge-base' | 'analytics';

type ProductEntry = {
  readonly key: ProductKey;
  readonly path: string;
  readonly label: Record<string, string>;
  readonly hint: Record<string, string>;
};

const DEFAULT_LOCALE = 'zh-Hans';

const PRODUCTS: readonly ProductEntry[] = [
  {
    key: 'knowledge-base',
    path: '/docs/intro',
    label: {'zh-Hans': '企业知识库', en: 'Knowledge Base'},
    hint: {'zh-Hans': '非结构化文档', en: 'Documents'},
  },
  {
    key: 'analytics',
    path: '/analytics/docs/intro',
    label: {'zh-Hans': '智能问数', en: 'Analytics'},
    hint: {'zh-Hans': '结构化数据', en: 'Databases'},
  },
];

const GROUP_LABEL: Record<string, string> = {
  'zh-Hans': '产品文档',
  en: 'Product docs',
};

/** 本切换器认识的语言，以标签字典为准（新增语言时会因缺少标签而被挡住）。 */
const KNOWN_LOCALES = Object.keys(GROUP_LABEL);

/**
 * 取当前构建的语言。
 *
 * `docusaurus build` 会为每个 locale 设好这个变量，但 `docusaurus start`
 * 执行的是 `process.env.DOCUSAURUS_CURRENT_LOCALE = cliOptions.locale`——
 * 不带 `--locale` 时 `cliOptions.locale` 是 undefined，而 Node 给 process.env
 * 赋值会强制转成字符串，于是变量的值是字面量 "undefined"。
 * 直接拿它拼前缀会得到 /undefined/docs/intro，两个按钮都点不开。
 * 所以这里只接受确实认识的语言，其余一律回落到默认语言。
 */
const currentLocale = (): string => {
  const locale = process.env.DOCUSAURUS_CURRENT_LOCALE;

  return locale && KNOWN_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
};

const localePrefix = (locale: string): string =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`;

const pick = (dict: Record<string, string>, locale: string): string =>
  dict[locale] ?? dict[DEFAULT_LOCALE];

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const renderItem = (
  product: ProductEntry,
  active: ProductKey,
  locale: string,
): string => {
  const isActive = product.key === active;
  const classNames = isActive
    ? 'productSwitcher__item productSwitcher__item--active'
    : 'productSwitcher__item';

  return [
    `<a class="${classNames}"`,
    ` href="${escapeHtml(`${localePrefix(locale)}${product.path}`)}"`,
    isActive ? ' aria-current="page"' : '',
    '>',
    `<span class="productSwitcher__name">${escapeHtml(pick(product.label, locale))}</span>`,
    `<span class="productSwitcher__hint">${escapeHtml(pick(product.hint, locale))}</span>`,
    '</a>',
  ].join('');
};

/**
 * 生成侧边栏顶部的产品切换项。
 *
 * @param active 当前所处的产品，用于高亮
 */
export const productSwitcherItem = (active: ProductKey) => {
  const locale = currentLocale();
  const items = PRODUCTS.map((product) =>
    renderItem(product, active, locale),
  ).join('');

  return {
    type: 'html' as const,
    defaultStyle: false,
    value: [
      '<div class="productSwitcher">',
      `<span class="productSwitcher__label">${escapeHtml(pick(GROUP_LABEL, locale))}</span>`,
      `<div class="productSwitcher__group" role="group" aria-label="${escapeHtml(pick(GROUP_LABEL, locale))}">`,
      items,
      '</div>',
      '</div>',
    ].join(''),
  };
};
