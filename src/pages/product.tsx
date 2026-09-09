import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './product.module.css';
import {
  FileText,
  Settings,
  Shield,
  Lightbulb,
  Building,
  BookOpen,
  MessageSquare,
  Cpu,
  Target,
  CheckCircle,
  Rocket,
} from '../components/Icons';
import {useScrollAnimation} from '../hooks/useScrollAnimation';
import {useLocaleContent} from '../i18n/useLocaleContent';
import {productContent} from '../content/product';
import {featureCatalogContent} from '../content/product/featureCatalog';

const CAPABILITY_ICONS = [
  FileText,
  Target,
  MessageSquare,
  BookOpen,
  Settings,
  Building,
  Shield,
];
const HERO_HIGHLIGHT_ICONS = [Target, MessageSquare, CheckCircle, Rocket];
const SCENARIO_ICONS = [FileText, Cpu, BookOpen, Building];

const capitalize = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

/**
 * 功能明细表里的文档链接。
 *
 * 同页锚点用原生 <a>：走 <Link> 会被 Docusaurus 的断链检查当成跨页锚点，
 * 而它只认识 Markdown 标题生成的锚点，认不出 JSX 里手写的 section id。
 */
function CatalogLink({
  href,
  label,
  ariaLabel,
}: {
  href: string;
  label: string;
  ariaLabel: string;
}): ReactNode {
  if (href.startsWith('#')) {
    return (
      <a href={href} aria-label={ariaLabel}>
        {label}
      </a>
    );
  }

  return (
    <Link to={href} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}

export default function Product(): ReactNode {
  const content = useLocaleContent(productContent);
  const catalog = useLocaleContent(featureCatalogContent);

  const [capRef, capVisible] = useScrollAnimation();
  const [catalogRef, catalogVisible] = useScrollAnimation();
  const [specRef, specVisible] = useScrollAnimation();
  const [compRef, compVisible] = useScrollAnimation();
  const [scenRef, scenVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <Layout title={content.meta.title} description={content.meta.description}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroBadge}>{content.hero.badge}</div>
            <h1 className={styles.heroTitle}>
              {content.hero.titleLead}
              <br />
              {content.hero.titleMiddle}
              <span className={styles.gradientText}>{content.hero.titleAccent}</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {content.hero.subtitle.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < content.hero.subtitle.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className={styles.heroHighlights}>
              {content.hero.highlights.map((highlight, index) => {
                const Icon = HERO_HIGHLIGHT_ICONS[index % HERO_HIGHLIGHT_ICONS.length];

                return (
                  <div key={highlight} className={styles.heroHighlight}>
                    <Icon size={18} />
                    <span>{highlight}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureCatalog} id="all-features">
        <div className={styles.catalogContainer}>
          <div
            ref={catalogRef}
            className={`${styles.sectionHeader} ${catalogVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{catalog.title}</h2>
            <p className={styles.sectionSubtitle}>{catalog.subtitle}</p>
          </div>
          <div className={styles.featureTableWrap}>
            <table className={styles.featureTable} aria-label={catalog.title}>
              <thead>
                <tr>
                  {catalog.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              {catalog.groups.map((group) => (
                <tbody key={group.category}>
                  {group.items.map((item, index) => (
                    <tr key={item.name}>
                      {index === 0 && (
                        <td
                          className={styles.catalogCategory}
                          rowSpan={group.items.length}
                        >
                          <span>{group.category}</span>
                          <small>
                            {group.items.length}
                            {catalog.countSuffix}
                          </small>
                        </td>
                      )}
                      <td className={styles.catalogModule}>{item.name}</td>
                      <td className={styles.catalogDescription}>{item.description}</td>
                      <td className={styles.catalogDoc}>
                        <CatalogLink
                          href={item.href}
                          label={catalog.docLink}
                          ariaLabel={catalog.docLinkAria.replace('{name}', item.name)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className={styles.catalogNote}>{catalog.note}</p>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className="container">
          <div
            ref={capRef}
            className={`${styles.sectionHeader} ${capVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.capabilities.title}</h2>
            <p className={styles.sectionSubtitle}>{content.capabilities.subtitle}</p>
          </div>

          {content.capabilities.items.map((capability, index) => {
            const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];

            return (
              <div
                id={capability.id}
                key={capability.id}
                className={`${styles.capabilitySection} ${styles[`cap${capitalize(capability.color)}`]}`}
              >
                <div className={styles.capabilityHeader}>
                  <span className={styles.capabilityNumber}>{capability.number}</span>
                  <div className={styles.capabilityTitleGroup}>
                    <h3 className={styles.capabilityTitle}>{capability.title}</h3>
                    <p className={styles.capabilitySubtitle}>{capability.subtitle}</p>
                  </div>
                  <span className={styles.capabilityIcon}>
                    <Icon size={36} />
                  </span>
                </div>
                <p className={styles.capabilityDescription}>{capability.description}</p>
                <div className={styles.capabilityFeatures}>
                  {capability.features.map((feature) => (
                    <div key={feature.title} className={styles.capabilityFeature}>
                      <div className={styles.featureCheck}>
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <strong>{feature.title}</strong>
                        <span>{feature.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.capabilityValue}>
                  <Lightbulb size={18} />
                  <span className={styles.valueText}>{capability.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.techSpecs}>
        <div className="container">
          <div
            ref={specRef}
            className={`${styles.sectionHeader} ${specVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.techSpecs.title}</h2>
            <p className={styles.sectionSubtitle}>{content.techSpecs.subtitle}</p>
          </div>
          <div className={styles.specsGrid}>
            {content.techSpecs.groups.map((spec) => (
              <div key={spec.category} className={styles.specCard}>
                <h4 className={styles.specCategory}>{spec.category}</h4>
                <div className={styles.specItems}>
                  {spec.items.map((item) => (
                    <span key={item} className={styles.specItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className={styles.comparisonContainer}>
          <div
            ref={compRef}
            className={`${styles.sectionHeader} ${compVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.comparison.title}</h2>
            <p className={styles.sectionSubtitle}>{content.comparison.subtitle}</p>
          </div>
          <div className={styles.comparisonTable}>
            <table>
              <thead>
                <tr>
                  {content.comparison.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.comparison.rows.map((item) => (
                  <tr key={item.dimension}>
                    <td className={styles.dimensionCol}>{item.dimension}</td>
                    <td className={styles.knowflowCol}>{item.knowflow}</td>
                    <td className={styles.othersCol}>{item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.scenarios}>
        <div className="container">
          <div
            ref={scenRef}
            className={`${styles.sectionHeader} ${scenVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.scenarios.title}</h2>
            <p className={styles.sectionSubtitle}>{content.scenarios.subtitle}</p>
          </div>
          <div className={styles.scenarioGrid}>
            {content.scenarios.items.map((scenario, index) => {
              const Icon = SCENARIO_ICONS[index % SCENARIO_ICONS.length];

              return (
                <div
                  key={scenario.title}
                  className={`${styles.scenarioCard} ${styles[`scenario${capitalize(scenario.color)}`]}`}
                >
                  <div className={styles.scenarioTopBar} />
                  <div className={styles.scenarioIcon}>
                    <Icon size={28} />
                  </div>
                  <h3>{scenario.title}</h3>
                  <p>{scenario.description}</p>
                  <div className={styles.scenarioHighlights}>
                    {scenario.highlights.map((highlight) => (
                      <span key={highlight} className={styles.scenarioTag}>
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div
            ref={ctaRef}
            className={`${styles.ctaInner} ${ctaVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2>{content.cta.title}</h2>
            <p>{content.cta.subtitle}</p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.primaryButton}>
                {content.cta.primary}
              </Link>
              <Link to="/docs/intro" className={styles.secondaryButton}>
                {content.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
