import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
// 两个产品页共用同一套营销版式（hero / 能力块 / 对比表 / 场景卡 / CTA），
// 复用 product 的样式模块，避免复制近千行等价 CSS。
import shared from './product.module.css';
import styles from './analytics.module.css';
import {
  BookOpen,
  CheckCircle,
  Cpu,
  Lightbulb,
  Lock,
  MessageSquare,
  Settings,
  Shield,
  Target,
} from '../components/Icons';
import {useScrollAnimation} from '../hooks/useScrollAnimation';
import {useLocaleContent} from '../i18n/useLocaleContent';
import {analyticsContent} from '../content/analytics';

const CAPABILITY_ICONS = [BookOpen, Settings, Cpu, MessageSquare, Target, Shield];
const SCENARIO_ICONS = [MessageSquare, Cpu, BookOpen, Settings];

const capitalize = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

export default function Analytics(): ReactNode {
  const content = useLocaleContent(analyticsContent);

  const [problemRef, problemVisible] = useScrollAnimation();
  const [pipelineRef, pipelineVisible] = useScrollAnimation();
  const [capRef, capVisible] = useScrollAnimation();
  const [matrixRef, matrixVisible] = useScrollAnimation();
  const [compRef, compVisible] = useScrollAnimation();
  const [galleryRef, galleryVisible] = useScrollAnimation();
  const [accuracyRef, accuracyVisible] = useScrollAnimation();
  const [editionRef, editionVisible] = useScrollAnimation();
  const [scenRef, scenVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <Layout title={content.meta.title} description={content.meta.description}>
      <section className={shared.hero}>
        <div className={shared.heroGrid} />
        <div className="container">
          <div className={shared.heroInner}>
            <div className={shared.heroBadge}>{content.hero.badge}</div>
            <h1 className={shared.heroTitle}>
              {content.hero.titleLead}
              <br />
              <span className={shared.gradientText}>{content.hero.titleAccent}</span>
            </h1>
            <p className={shared.heroSubtitle}>
              {content.hero.subtitle.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < content.hero.subtitle.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className={shared.heroHighlights}>
              {content.hero.highlights.map((highlight) => (
                <div key={highlight} className={shared.heroHighlight}>
                  <CheckCircle size={18} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link className={shared.primaryButton} to="/contact">
                {content.hero.primaryCta}
              </Link>
              <Link className={shared.secondaryButton} to="/analytics/docs/intro">
                {content.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.problem}>
        <div className="container">
          <div
            ref={problemRef}
            className={`${shared.sectionHeader} ${problemVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.problem.title}</h2>
            <p className={shared.sectionSubtitle}>{content.problem.subtitle}</p>
          </div>
          <p className={styles.problemLead}>{content.problem.lead}</p>
          <div className={styles.painGrid}>
            {content.problem.pains.map((pain) => (
              <article key={pain.title} className={styles.painCard}>
                <h3>{pain.title}</h3>
                <p>{pain.desc}</p>
              </article>
            ))}
          </div>
          <blockquote className={styles.problemQuote}>
            <Lightbulb size={20} />
            <span>{content.problem.quote}</span>
          </blockquote>
        </div>
      </section>

      <section className={styles.pipeline}>
        <div className="container">
          <div
            ref={pipelineRef}
            className={`${shared.sectionHeader} ${pipelineVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.pipeline.title}</h2>
            <p className={shared.sectionSubtitle}>{content.pipeline.subtitle}</p>
          </div>
          <ol className={styles.pipelineFlow}>
            {content.pipeline.stages.map((stage, index) => (
              <li key={stage.name} className={styles.pipelineStage}>
                <span className={styles.pipelineIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <b>{stage.name}</b>
                <small>{stage.role}</small>
                <p>{stage.detail}</p>
              </li>
            ))}
          </ol>
          <p className={styles.pipelineFootnote}>
            <Lock size={16} />
            <span>{content.pipeline.footnote}</span>
          </p>
        </div>
      </section>

      <section className={shared.capabilities}>
        <div className="container">
          <div
            ref={capRef}
            className={`${shared.sectionHeader} ${capVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.capabilities.title}</h2>
            <p className={shared.sectionSubtitle}>{content.capabilities.subtitle}</p>
          </div>

          {content.capabilities.items.map((capability, index) => {
            const Icon = CAPABILITY_ICONS[index % CAPABILITY_ICONS.length];

            return (
              <div
                id={capability.id}
                key={capability.id}
                className={`${shared.capabilitySection} ${shared[`cap${capitalize(capability.color)}`]}`}
              >
                <div className={shared.capabilityHeader}>
                  <span className={shared.capabilityNumber}>{capability.number}</span>
                  <div className={shared.capabilityTitleGroup}>
                    <h3 className={shared.capabilityTitle}>{capability.title}</h3>
                    <p className={shared.capabilitySubtitle}>{capability.subtitle}</p>
                  </div>
                  <span className={shared.capabilityIcon}>
                    <Icon size={36} />
                  </span>
                </div>
                <p className={shared.capabilityDescription}>{capability.description}</p>
                <div className={shared.capabilityFeatures}>
                  {capability.features.map((feature) => (
                    <div key={feature.title} className={shared.capabilityFeature}>
                      <div className={shared.featureCheck}>
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <strong>{feature.title}</strong>
                        <span>{feature.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={shared.capabilityValue}>
                  <Lightbulb size={18} />
                  <span className={shared.valueText}>{capability.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container">
          <div
            ref={galleryRef}
            className={`${shared.sectionHeader} ${galleryVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.gallery.title}</h2>
            <p className={shared.sectionSubtitle}>{content.gallery.subtitle}</p>
          </div>
          <div className={styles.galleryGrid}>
            {content.gallery.shots.map((shot) => (
              <figure key={shot.src} className={styles.galleryItem}>
                <img src={shot.src} alt={shot.alt} loading="lazy" />
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={shared.techSpecs}>
        <div className="container">
          <div
            ref={matrixRef}
            className={`${shared.sectionHeader} ${matrixVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.matrix.title}</h2>
            <p className={shared.sectionSubtitle}>{content.matrix.subtitle}</p>
          </div>
          <div className={shared.specsGrid}>
            {content.matrix.groups.map((group) => (
              <div key={group.category} className={shared.specCard}>
                <h4 className={shared.specCategory}>{group.category}</h4>
                <div className={shared.specItems}>
                  {group.items.map((item) => (
                    <span key={item} className={shared.specItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={shared.comparison}>
        <div className={shared.comparisonContainer}>
          <div
            ref={compRef}
            className={`${shared.sectionHeader} ${compVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.comparison.title}</h2>
            <p className={shared.sectionSubtitle}>{content.comparison.subtitle}</p>
          </div>
          <div className={shared.comparisonTable}>
            <table>
              <thead>
                <tr>
                  {content.comparison.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.comparison.rows.map((row) => (
                  <tr key={row.dimension}>
                    <td className={shared.dimensionCol}>{row.dimension}</td>
                    <td className={shared.knowflowCol}>{row.knowflow}</td>
                    <td className={shared.othersCol}>{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.accuracy}>
        <div className="container">
          <div
            ref={accuracyRef}
            className={`${shared.sectionHeader} ${accuracyVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.accuracy.title}</h2>
            <p className={shared.sectionSubtitle}>{content.accuracy.subtitle}</p>
          </div>
          <div className={styles.dataTableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {content.accuracy.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.accuracy.rows.map((row, index) => (
                  <tr
                    key={row[0]}
                    className={
                      index === content.accuracy.rows.length - 1
                        ? styles.totalRow
                        : undefined
                    }
                  >
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.accuracyNote}>{content.accuracy.note}</p>
        </div>
      </section>

      <section className={styles.editions}>
        <div className="container">
          <div
            ref={editionRef}
            className={`${shared.sectionHeader} ${editionVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.editions.title}</h2>
            <p className={shared.sectionSubtitle}>{content.editions.subtitle}</p>
          </div>
          <div className={styles.dataTableWrap}>
            <table className={styles.editionTable}>
              <thead>
                <tr>
                  {content.editions.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.editions.rows.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className={styles.markCell}>
                      <span className={row.oss ? styles.yes : styles.no}>
                        {row.oss ? '✓' : '—'}
                      </span>
                    </td>
                    <td className={styles.markCell}>
                      <span className={row.pro ? styles.yes : styles.no}>
                        {row.pro ? '✓' : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={shared.scenarios}>
        <div className="container">
          <div
            ref={scenRef}
            className={`${shared.sectionHeader} ${scenVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={shared.sectionTitle}>{content.scenarios.title}</h2>
            <p className={shared.sectionSubtitle}>{content.scenarios.subtitle}</p>
          </div>
          <div className={shared.scenarioGrid}>
            {content.scenarios.items.map((scenario, index) => {
              const Icon = SCENARIO_ICONS[index % SCENARIO_ICONS.length];

              return (
                <div
                  key={scenario.title}
                  className={`${shared.scenarioCard} ${shared[`scenario${capitalize(scenario.color)}`]}`}
                >
                  <div className={shared.scenarioTopBar} />
                  <div className={shared.scenarioIcon}>
                    <Icon size={28} />
                  </div>
                  <h3>{scenario.title}</h3>
                  <p>{scenario.description}</p>
                  <div className={shared.scenarioHighlights}>
                    {scenario.highlights.map((highlight) => (
                      <span key={highlight} className={shared.scenarioTag}>
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

      <section className={shared.cta}>
        <div className="container">
          <div
            ref={ctaRef}
            className={`${shared.ctaInner} ${ctaVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2>{content.cta.title}</h2>
            <p>{content.cta.subtitle}</p>
            <div className={shared.ctaButtons}>
              <Link to="/contact" className={shared.primaryButton}>
                {content.cta.primary}
              </Link>
              <Link to="/analytics/docs/intro" className={shared.secondaryButton}>
                {content.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
