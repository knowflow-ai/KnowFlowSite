import React, {useState} from 'react';
import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './contact.module.css';
import {sendToWeChatWork} from '../utils/webhook';
import {Smartphone} from '../components/Icons';
import {useScrollAnimation} from '../hooks/useScrollAnimation';
import {useLocaleContent} from '../i18n/useLocaleContent';
import {contactContent} from '../content/contact';

const INITIAL_FORM_DATA = {
  name: '',
  company: '',
  position: '',
  email: '',
  phone: '',
  need: '演示',
  message: '',
};

type SubmitStatus = 'idle' | 'success' | 'error';

export default function Contact(): ReactNode {
  const content = useLocaleContent(contactContent);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [consented, setConsented] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [formError, setFormError] = useState('');

  const [formRef, formVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const {name, value} = event.target;

    setFormData((previous) => ({...previous, [name]: value}));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.phone.trim()) {
      setFormError(content.form.errors.wechatRequired);
      return;
    }

    if (!consented) {
      setFormError(content.form.errors.consentRequired);
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const success = await sendToWeChatWork(formData);

      if (!success) {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
        return;
      }

      setSubmitStatus('success');
      setTimeout(() => {
        setFormData(INITIAL_FORM_DATA);
        setConsented(false);
        setSubmitStatus('idle');
      }, 3000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title={content.meta.title} description={content.meta.description}>
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>{content.hero.title}</h1>
            <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div
            ref={formRef}
            className={`${styles.contactGrid} ${formVisible ? 'visible' : ''}`}
            data-animate=""
          >
            <div id="form" className={styles.formContainer}>
              <h2>{content.form.title}</h2>
              <p className={styles.formDesc}>{content.form.description}</p>

              {submitStatus === 'success' ? (
                <div className={styles.successMessage}>
                  <span className={styles.successIcon}>&#10003;</span>
                  <h3>{content.form.success.title}</h3>
                  <p>{content.form.success.description}</p>
                </div>
              ) : submitStatus === 'error' ? (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>&#10007;</span>
                  <h3>{content.form.failure.title}</h3>
                  <p>{content.form.failure.description}</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">{content.form.fields.name.label}</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={content.form.fields.name.placeholder}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="company">
                        {content.form.fields.company.label}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder={content.form.fields.company.placeholder}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">{content.form.fields.wechat.label}</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={content.form.fields.wechat.placeholder}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">{content.form.fields.email.label}</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={content.form.fields.email.placeholder}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="position">
                        {content.form.fields.position.label}
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder={content.form.fields.position.placeholder}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="need">{content.form.fields.need.label}</label>
                      <select
                        id="need"
                        name="need"
                        value={formData.need}
                        onChange={handleChange}
                        required
                      >
                        {content.form.needOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">{content.form.fields.message.label}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder={content.form.fields.message.placeholder}
                    />
                  </div>

                  <div className={styles.consent}>
                    <label className={styles.consentLabel} htmlFor="consent">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={consented}
                        onChange={(event) => setConsented(event.target.checked)}
                        required
                      />
                      <span>
                        {content.form.consent.before}
                        <Link to="/privacy">{content.form.consent.privacy}</Link>
                        {content.form.consent.between}
                        <Link to="/terms">{content.form.consent.terms}</Link>
                        {content.form.consent.after}
                      </span>
                    </label>
                    <p className={styles.consentDetail}>
                      {content.form.consent.detail}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? content.form.submitting : content.form.submit}
                  </button>

                  {formError && <p className={styles.formError}>{formError}</p>}
                </form>
              )}
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.infoCard}>
                <h3>{content.info.directTitle}</h3>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <Smartphone size={20} />
                  </span>
                  <div>
                    <p className={styles.infoLabel}>{content.info.wechatLabel}</p>
                    <p className={styles.infoValue}>{content.info.wechatId}</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>{content.info.faqTitle}</h3>
                <ul className={styles.faqList}>
                  {content.info.faq.map((item) => (
                    <li key={item.question}>
                      <strong>{item.question}</strong>
                      <p>{item.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.infoCard}>
                <h3>{content.info.responseTitle}</h3>
                <p className={styles.responseTime}>{content.info.responseBody}</p>
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
            <div className={styles.ctaButtons}>
              <Link to="/docs/intro" className={styles.secondaryButton}>
                {content.cta.docs}
              </Link>
              <a href="#form" className={styles.primaryButton}>
                {content.cta.contact}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
