import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './about.module.css';
import {Rocket, Users, Lock, Star, Smartphone, Target} from '../components/Icons';
import {useScrollAnimation} from '../hooks/useScrollAnimation';
import {useLocaleContent} from '../i18n/useLocaleContent';
import {aboutContent} from '../content/about';

const VALUE_ICONS = [Rocket, Users, Lock, Star];

const capitalize = (value: string): string =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

export default function About(): ReactNode {
  const content = useLocaleContent(aboutContent);

  const [statsRef, statsVisible] = useScrollAnimation();
  const [missionRef, missionVisible] = useScrollAnimation();
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [teamRef, teamVisible] = useScrollAnimation();
  const [partnersRef, partnersVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <Layout title={content.meta.title} description={content.meta.description}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              {content.hero.titleLead}
              <span className={styles.gradientText}>{content.hero.titleAccent}</span>
            </h1>
            <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section
        ref={statsRef}
        className={`${styles.stats} ${statsVisible ? 'visible' : ''}`}
        data-animate=""
      >
        <div className="container">
          <div className={styles.statsGrid}>
            {content.stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mission}>
        <div className="container">
          <div
            ref={missionRef}
            className={`${styles.missionContent} ${missionVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <div className={styles.missionText}>
              <h2>{content.mission.title}</h2>
              {content.mission.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.missionImage}>
              <div className={styles.imagePlaceholder}>
                <Target size={48} />
                <p>{content.mission.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <div
            ref={valuesRef}
            className={`${styles.valuesInner} ${valuesVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.values.title}</h2>
            <div className={styles.valuesGrid}>
              {content.values.items.map((value, index) => {
                const Icon = VALUE_ICONS[index % VALUE_ICONS.length];

                return (
                  <div
                    key={value.title}
                    className={`${styles.valueCard} ${styles[`value${capitalize(value.color)}`]}`}
                  >
                    <div className={styles.valueIcon}>
                      <Icon size={28} />
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <div className="container">
          <div
            ref={teamRef}
            className={`${styles.teamInner} ${teamVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.team.title}</h2>
            <div className={styles.teamGrid}>
              {content.team.items.map((group) => (
                <div key={group.name} className={styles.teamCard}>
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners}>
        <div className="container">
          <div
            ref={partnersRef}
            className={`${styles.partnersInner} ${partnersVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.partners.title}</h2>
            <p className={styles.partnersDesc}>{content.partners.description}</p>
            <div className={styles.partnerLogos}>
              {content.partners.logos.map((logo) => (
                <div key={logo} className={styles.partnerLogo}>
                  <span>{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className="container">
          <div
            ref={contactRef}
            className={`${styles.contactInner} ${contactVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <h2 className={styles.sectionTitle}>{content.contact.title}</h2>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>
                  <Smartphone size={24} />
                </div>
                <h3>{content.contact.wechatLabel}</h3>
                <p>{content.contact.wechatId}</p>
              </div>
            </div>
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
            <Link to="/contact" className={styles.ctaButton}>
              {content.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
