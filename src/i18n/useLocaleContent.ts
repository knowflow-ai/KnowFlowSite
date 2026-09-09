import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

/**
 * 页面文案的多语言字典：按 locale 键存放同一份结构的内容。
 *
 * 站点的营销页面文案密集、结构固定，把文案抽成数据比在 JSX 里逐条包
 * `<Translate>` 更好维护——组件只有一份，新增语言只是多加一个键。
 */
export type LocalizedContent<T> = Readonly<Record<string, T>>;

/**
 * 取出当前语言的页面文案，缺失时回退到默认语言。
 */
export function useLocaleContent<T>(content: LocalizedContent<T>): T {
  const {i18n} = useDocusaurusContext();

  return content[i18n.currentLocale] ?? content[i18n.defaultLocale];
}
