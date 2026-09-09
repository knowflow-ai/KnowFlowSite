import {Fragment, useRef, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  BookOpen,
  Building,
  CheckCircle,
  Cpu,
  FileText,
  Lock,
  MessageSquare,
  Shield,
  Target,
  Users,
} from '../components/Icons';
import {usePretextLayout} from '../hooks/usePretextLayout';
import {useLocaleContent} from '../i18n/useLocaleContent';
import {homeContent} from '../content/home';
import styles from './index.module.css';

const FOUNDATION_ICONS = [BookOpen, Shield, Lock];
const HERO_POINT_ICONS = [BookOpen, Target, FileText];
const SCENARIO_ICONS = [Building, Shield, Users, Cpu, FileText];
const AGENT_ICONS = [MessageSquare, Target, Cpu, FileText];

function Arrow(): ReactNode {
  return (
    <span className={styles.flowArrow} aria-hidden="true">
      →
    </span>
  );
}

/** 把内容里的换行标记渲染成 <br />，避免在文案中混入 JSX。 */
function MultiLine({text}: {text: string}): ReactNode {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {line}
          {index < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

export default function Home(): ReactNode {
  const content = useLocaleContent(homeContent);
  const pageRef = useRef<HTMLElement>(null);
  usePretextLayout(pageRef);

  return (
    <Layout title={content.meta.title} description={content.meta.description}>
      <main className={styles.page} ref={pageRef}>
        <header className={styles.hero}>
          <div className={styles.blueprintGrid} aria-hidden="true" />
          <div className={`container ${styles.homeContainer} ${styles.heroLayout}`}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
              <h1 data-pretext>{content.hero.title}</h1>
              <p className={styles.heroLead} data-pretext>
                {content.hero.lead}
              </p>
              <ul className={styles.heroPoints}>
                {content.hero.points.map((point, index) => {
                  const Icon = HERO_POINT_ICONS[index % HERO_POINT_ICONS.length];

                  return (
                    <li key={point.title}>
                      <Icon size={20} />
                      <span>
                        <b>{point.title}</b>
                        {point.body}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} to="/contact">
                  {content.hero.primaryCta}
                </Link>
                <Link className={styles.secondaryButton} to="/product">
                  {content.hero.secondaryCta}
                </Link>
              </div>
            </div>

            <div className={styles.heroSystem}>
              <span className={styles.boundaryLabel}>
                {content.hero.diagram.boundaryLabel}
              </span>
              <span className={styles.intranetLabel}>
                <Lock size={14} /> {content.hero.diagram.intranetLabel}
              </span>
              <div className={styles.heroSystemFlow}>
                <div className={styles.systemColumn}>
                  <small>
                    <MultiLine text={content.hero.diagram.orgLabel} />
                  </small>
                  <div className={styles.folderTree}>
                    {content.hero.diagram.folderTree.map((node) => (
                      <span
                        key={node.text}
                        className={node.active ? styles.activeFolder : undefined}
                      >
                        {node.text}
                      </span>
                    ))}
                  </div>
                </div>
                <Arrow />
                <div className={styles.retrievalMini}>
                  <small>{content.hero.diagram.retrievalLabel}</small>
                  {content.hero.diagram.retrievalPaths.map((path) => (
                    <span key={path}>{path}</span>
                  ))}
                </div>
                <Arrow />
                <div className={styles.agentMini}>
                  <small>{content.hero.diagram.agentLabel}</small>
                  <b>{content.hero.diagram.agentHeadline}</b>
                  <p>{content.hero.diagram.agentEvidence}</p>
                  <i>{content.hero.diagram.agentScope}</i>
                </div>
                <Arrow />
                <div className={styles.deliveryMini}>
                  <small>{content.hero.diagram.deliveryLabel}</small>
                  {content.hero.diagram.deliveryItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.foundationStrip} aria-labelledby="foundations-title">
          <div className={`container ${styles.homeContainer}`}>
            <h2 id="foundations-title" data-pretext>
              {content.foundations.title}
            </h2>
            <div className={styles.foundationGrid}>
              {content.foundations.items.map((item, index) => {
                const Icon = FOUNDATION_ICONS[index % FOUNDATION_ICONS.length];

                return (
                  <article key={item.title}>
                    <Icon size={25} />
                    <div>
                      <h3>{item.title}</h3>
                      <p data-pretext>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.productLines} aria-labelledby="product-lines-title">
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>{content.productLines.kicker}</span>
              <h2 id="product-lines-title" data-pretext>
                {content.productLines.title}
              </h2>
              <p data-pretext>{content.productLines.lead}</p>
            </div>
            <div className={styles.productLineGrid}>
              {content.productLines.items.map((line, index) => (
                <article key={line.title} className={styles.productLineCard}>
                  <span className={styles.productLineEyebrow}>{line.eyebrow}</span>
                  <h3>
                    {index === 0 ? <FileText size={22} /> : <Cpu size={22} />}
                    {line.title}
                  </h3>
                  <p data-pretext>{line.description}</p>
                  <ul>
                    {line.bullets.map((bullet) => (
                      <li key={bullet}>
                        <CheckCircle size={16} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link className={styles.productLineLink} to={line.href}>
                    {line.cta} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div
            className={`container ${styles.homeContainer} ${styles.sectionIntroGrid}`}
          >
            <div className={styles.sectionNumber}>01</div>
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>{content.structure.kicker}</span>
              <h2 data-pretext>{content.structure.title}</h2>
              <p data-pretext>{content.structure.lead}</p>
            </div>
          </div>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.structureFlow}>
              {content.structure.steps.map((step, index) => (
                <div className={styles.structureNodeWrap} key={step.label}>
                  <article className={styles.structureNode}>
                    <small>{step.label}</small>
                    {step.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </article>
                  {index < content.structure.steps.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.rbacSection}`}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>{content.rbac.kicker}</span>
                <h2 data-pretext>{content.rbac.title}</h2>
              </div>
              <p data-pretext>{content.rbac.lead}</p>
            </div>
            <div className={styles.rbacFlow}>
              {content.rbac.steps.map((step, index) => (
                <div className={styles.rbacNodeWrap} key={step.number}>
                  <article className={styles.rbacNode}>
                    <span className={styles.nodeNumber}>{step.number}</span>
                    <h3>{step.title}</h3>
                    <ul>
                      {step.items.map((item) => (
                        <li key={item}>
                          <CheckCircle size={16} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                  {index < content.rbac.steps.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
            <div className={styles.rbacFootnote}>
              <Lock size={18} />
              <span>
                <b>{content.rbac.footnoteStrong}</b> {content.rbac.footnote}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.deploySection}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.deployHeading}>
              <div>
                <span className={styles.kicker}>{content.deployment.kicker}</span>
                <h2 data-pretext>{content.deployment.title}</h2>
              </div>
              <p data-pretext>{content.deployment.lead}</p>
            </div>
            <div className={styles.deployArchitecture}>
              <div className={styles.deployLayers}>
                {content.deployment.layers.map((layer) => (
                  <div className={styles.deployLayer} key={layer.label}>
                    <strong>{layer.label}</strong>
                    <div>
                      {layer.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Arrow />
              <div className={styles.localStack}>
                <small>{content.deployment.localStack.label}</small>
                {content.deployment.localStack.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <Arrow />
              <div className={styles.optionalStack}>
                <small>{content.deployment.optionalStack.label}</small>
                {content.deployment.optionalStack.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className={styles.complianceRow}>
              {content.deployment.compliance.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div
            className={`container ${styles.homeContainer} ${styles.retrievalLayout}`}
          >
            <div className={styles.retrievalCopy}>
              <span className={styles.kicker}>{content.retrieval.kicker}</span>
              <h2 data-pretext>{content.retrieval.title}</h2>
              <p data-pretext>{content.retrieval.lead}</p>
              <ul>
                {content.retrieval.benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckCircle size={18} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.retrievalCompare}>
              <div className={styles.ordinaryRag}>
                <small>{content.retrieval.ordinaryLabel}</small>
                {content.retrieval.ordinarySteps.map((step) => (
                  <Fragment key={step}>
                    <span>{step}</span>
                    <Arrow />
                  </Fragment>
                ))}
                <b>{content.retrieval.ordinaryResult}</b>
              </div>
              <div className={styles.knowflowRag}>
                <small>{content.retrieval.knowflowLabel}</small>
                <div className={styles.pathGrid}>
                  {content.retrieval.paths.map((path) => (
                    <article key={path.title}>
                      <b>{path.title}</b>
                      <span>{path.meta}</span>
                      <p>{path.detail}</p>
                    </article>
                  ))}
                </div>
                <div className={styles.fusionLine}>{content.retrieval.fusionLine}</div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.qaSection}`}>
          <div className={`container ${styles.homeContainer} ${styles.qaLayout}`}>
            <div className={styles.qaCopy}>
              <span className={styles.kicker}>{content.qa.kicker}</span>
              <h2 data-pretext>{content.qa.title}</h2>
              <p data-pretext>{content.qa.lead}</p>
              <div className={styles.qaCapabilities}>
                {content.qa.capabilities.map((capability) => (
                  <span key={capability}>
                    <CheckCircle size={17} />
                    {capability}
                  </span>
                ))}
              </div>
              <p className={styles.qaChannels}>{content.qa.channels}</p>
            </div>
            <div className={styles.qaWorkspace}>
              <div className={styles.qaToolbar}>
                <span>
                  <MessageSquare size={16} /> {content.qa.assistantLabel}
                </span>
                <span className={styles.qaScope}>
                  <Lock size={13} /> {content.qa.scopeLabel}
                </span>
              </div>
              <div className={styles.userQuestion}>{content.qa.question}</div>
              <div className={styles.answerBlock}>
                <div className={styles.answerAvatar}>K</div>
                <div>
                  <b>{content.qa.answerLead}</b>
                  <ol>
                    {content.qa.answerSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p>{content.qa.answerNote}</p>
                </div>
              </div>
              <div className={styles.citationGrid}>
                {content.qa.citations.map((citation) => (
                  <article key={citation.badge}>
                    <span>{citation.badge}</span>
                    <b>{citation.title}</b>
                    <small>{citation.locator}</small>
                  </article>
                ))}
              </div>
              <div className={styles.followUp}>
                {content.qa.followUp} <span>→</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.agentSection}`}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>{content.agent.kicker}</span>
                <h2 data-pretext>{content.agent.title}</h2>
              </div>
              <p data-pretext>{content.agent.lead}</p>
            </div>
            <div className={styles.agentFlow}>
              {content.agent.steps.map((step, index) => {
                const Icon = AGENT_ICONS[index % AGENT_ICONS.length];

                return (
                  <Fragment key={step.label}>
                    <article>
                      <Icon size={22} />
                      <small>{step.label}</small>
                      <b>{step.headline}</b>
                      <span>{step.detail}</span>
                    </article>
                    {index < content.agent.steps.length - 1 && <Arrow />}
                  </Fragment>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.scenarioSection}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.scenarioIntro}>
              <span className={styles.kicker}>{content.scenarios.kicker}</span>
              <h2 data-pretext>{content.scenarios.title}</h2>
            </div>
            <div className={styles.scenarioGrid}>
              {content.scenarios.items.map((scenario, index) => {
                const Icon = SCENARIO_ICONS[index % SCENARIO_ICONS.length];

                return (
                  <article key={scenario.title}>
                    <Icon size={22} />
                    <h3>{scenario.title}</h3>
                    <p data-pretext>{scenario.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.pocSection}>
          <div className={`container ${styles.homeContainer} ${styles.pocGrid}`}>
            <div>
              <span className={styles.kicker}>{content.poc.kicker}</span>
              <h2 data-pretext>{content.poc.title}</h2>
              <p data-pretext>{content.poc.lead}</p>
            </div>
            <ul>
              {content.poc.checks.map((check) => (
                <li key={check}>
                  <CheckCircle size={18} />
                  {check}
                </li>
              ))}
            </ul>
            <div className={styles.pocActions}>
              <Link className={styles.primaryButton} to="/contact">
                {content.poc.primaryCta}
              </Link>
              <Link className={styles.secondaryButton} to="/docs/intro">
                {content.poc.secondaryCta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
