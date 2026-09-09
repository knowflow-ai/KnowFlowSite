import type {LocalizedContent} from '../i18n/useLocaleContent';

/** 「联系我们」页面文案，含表单字段标签、校验提示与隐私授权说明。 */

export type ContactContent = {
  readonly meta: {readonly title: string; readonly description: string};
  readonly hero: {readonly title: string; readonly subtitle: string};
  readonly form: {
    readonly title: string;
    readonly description: string;
    readonly fields: {
      readonly name: {readonly label: string; readonly placeholder: string};
      readonly company: {readonly label: string; readonly placeholder: string};
      readonly wechat: {readonly label: string; readonly placeholder: string};
      readonly email: {readonly label: string; readonly placeholder: string};
      readonly position: {readonly label: string; readonly placeholder: string};
      readonly need: {readonly label: string};
      readonly message: {readonly label: string; readonly placeholder: string};
    };
    readonly needOptions: readonly {
      readonly value: string;
      readonly label: string;
    }[];
    readonly consent: {
      readonly before: string;
      readonly privacy: string;
      readonly between: string;
      readonly terms: string;
      readonly after: string;
      readonly detail: string;
    };
    readonly submit: string;
    readonly submitting: string;
    readonly errors: {
      readonly wechatRequired: string;
      readonly consentRequired: string;
    };
    readonly success: {readonly title: string; readonly description: string};
    readonly failure: {readonly title: string; readonly description: string};
  };
  readonly info: {
    readonly directTitle: string;
    readonly wechatLabel: string;
    readonly wechatId: string;
    readonly faqTitle: string;
    readonly faq: readonly {
      readonly question: string;
      readonly answer: string;
    }[];
    readonly responseTitle: string;
    readonly responseBody: string;
  };
  readonly cta: {
    readonly title: string;
    readonly subtitle: string;
    readonly docs: string;
    readonly contact: string;
  };
};

const zhHans: ContactContent = {
  meta: {
    title: '联系我们 - 获取 KnowFlow 知识库与智能问数演示',
    description:
      '联系 KnowFlow 团队获取私有化企业知识库与智能问数的产品演示、技术咨询与定制方案，支持 14 天免费试用与 7x24 小时技术支持。',
  },
  hero: {
    title: '联系我们',
    subtitle: '无论你需要产品演示、技术咨询还是定制方案，我们都期待与你交流',
  },
  form: {
    title: '获取专属方案',
    description: '请填写以下信息，我们的专家团队将在 24 小时内与你联系',
    fields: {
      name: {label: '姓名 *', placeholder: '请输入你的姓名'},
      company: {label: '公司名称 *', placeholder: '请输入公司名称'},
      wechat: {label: '微信 *', placeholder: '请输入微信号'},
      email: {label: '邮箱', placeholder: '选填，example@company.com'},
      position: {label: '职位', placeholder: '请输入你的职位'},
      need: {label: '需求类型 *'},
      message: {
        label: '需求描述',
        placeholder: '请描述你的具体需求，比如企业规模、使用场景、预期目标等',
      },
    },
    needOptions: [
      {value: '演示', label: '产品演示'},
      {value: '报价', label: '获取报价'},
      {value: '技术咨询', label: '技术咨询'},
      {value: '合作', label: '商务合作'},
      {value: '其他', label: '其他需求'},
    ],
    consent: {
      before: '我已阅读并同意 ',
      privacy: '隐私政策',
      between: ' 与 ',
      terms: '服务条款',
      after: '，同意 KnowFlow 使用上述信息与我联系。',
      detail:
        '提交的信息会通过企业微信推送到我们的内部工作群，仅用于回应本次咨询，不会出售或提供给无关第三方。',
    },
    submit: '提交咨询',
    submitting: '提交中...',
    errors: {
      wechatRequired: '请填写微信，方便我们与你联系。',
      consentRequired: '请先阅读并勾选同意隐私政策与服务条款。',
    },
    success: {title: '提交成功！', description: '感谢你的咨询，我们会尽快与你联系。'},
    failure: {
      title: '提交失败！',
      description: '提交出现问题，请稍后重试或直接通过微信联系我们。',
    },
  },
  info: {
    directTitle: '直接联系',
    wechatLabel: '微信咨询',
    wechatId: 'skycode007',
    faqTitle: '常见问题',
    faq: [
      {
        question: '支持哪些部署方式？',
        answer: '支持私有化部署、Docker Compose、Kubernetes 等多种方式，也支持完全离线环境',
      },
      {
        question: '知识库和智能问数可以一起用吗？',
        answer: '可以。两条产品线共用企业账号体系与权限模型，可在同一套环境中同时启用',
      },
      {
        question: '是否提供试用？',
        answer: '提供 14 天免费试用，可申请演示账号体验全部功能',
      },
      {
        question: '如何获取技术支持？',
        answer: '企业版客户享受 7x24 小时技术支持服务',
      },
    ],
    responseTitle: '响应时间',
    responseBody:
      '我们承诺在工作日 24 小时内回复你的咨询，紧急问题可通过微信直接联系我们。',
  },
  cta: {
    title: '准备好开始了吗？',
    subtitle: '查看文档了解更多产品细节，或直接联系我们获取定制方案',
    docs: '查看文档',
    contact: '立即咨询',
  },
};

const en: ContactContent = {
  meta: {
    title: 'Contact us - Request a KnowFlow demo',
    description:
      'Talk to the KnowFlow team about a self-hosted enterprise knowledge base or analytics demo, technical consultation and tailored proposals. 14-day free trial and 24/7 support available.',
  },
  hero: {
    title: 'Contact us',
    subtitle:
      'Whether you need a product demo, technical advice or a tailored proposal, we would like to hear from you',
  },
  form: {
    title: 'Request a tailored proposal',
    description:
      'Fill in the form below and our team will get back to you within 24 hours',
    fields: {
      name: {label: 'Name *', placeholder: 'Your name'},
      company: {label: 'Company *', placeholder: 'Your company name'},
      wechat: {label: 'WeChat *', placeholder: 'Your WeChat ID'},
      email: {label: 'Email', placeholder: 'Optional, example@company.com'},
      position: {label: 'Job title', placeholder: 'Your job title'},
      need: {label: 'What do you need? *'},
      message: {
        label: 'Tell us more',
        placeholder:
          'Describe your needs — company size, use case, what you want to achieve',
      },
    },
    needOptions: [
      {value: '演示', label: 'Product demo'},
      {value: '报价', label: 'Pricing'},
      {value: '技术咨询', label: 'Technical consultation'},
      {value: '合作', label: 'Partnership'},
      {value: '其他', label: 'Something else'},
    ],
    consent: {
      before: 'I have read and agree to the ',
      privacy: 'Privacy Policy',
      between: ' and ',
      terms: 'Terms of Service',
      after: ', and consent to KnowFlow using this information to contact me.',
      detail:
        'Your submission is delivered to our internal WeCom workspace and used only to answer this enquiry. We never sell it or pass it to unrelated third parties.',
    },
    submit: 'Send enquiry',
    submitting: 'Sending...',
    errors: {
      wechatRequired: 'Please provide a WeChat ID so we can reach you.',
      consentRequired:
        'Please read and accept the Privacy Policy and Terms of Service first.',
    },
    success: {
      title: 'Thank you!',
      description: 'We have received your enquiry and will be in touch shortly.',
    },
    failure: {
      title: 'Submission failed',
      description:
        'Something went wrong. Please try again later, or reach us directly on WeChat.',
    },
  },
  info: {
    directTitle: 'Reach us directly',
    wechatLabel: 'WeChat',
    wechatId: 'skycode007',
    faqTitle: 'Frequently asked',
    faq: [
      {
        question: 'How can it be deployed?',
        answer:
          'Self-hosted via Docker Compose or Kubernetes, including fully offline environments',
      },
      {
        question: 'Can we run the knowledge base and analytics together?',
        answer:
          'Yes. Both share the same account and permission model and can run in one environment',
      },
      {
        question: 'Is there a trial?',
        answer: 'A 14-day free trial with a demo account covering every feature',
      },
      {
        question: 'What support is included?',
        answer: 'Enterprise customers get 24/7 technical support',
      },
    ],
    responseTitle: 'Response time',
    responseBody:
      'We reply to enquiries within 24 hours on business days. For anything urgent, reach us on WeChat.',
  },
  cta: {
    title: 'Ready to start?',
    subtitle:
      'Read the docs for product detail, or contact us for a tailored proposal',
    docs: 'Read the docs',
    contact: 'Get in touch',
  },
};

export const contactContent: LocalizedContent<ContactContent> = {
  'zh-Hans': zhHans,
  en,
};
