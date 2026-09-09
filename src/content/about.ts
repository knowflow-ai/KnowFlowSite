import type {LocalizedContent} from '../i18n/useLocaleContent';

/** 「关于我们」页面文案。组件只负责排版，文字集中在这里按语言分组。 */

export type AboutContent = {
  readonly meta: {readonly title: string; readonly description: string};
  readonly hero: {
    readonly titleLead: string;
    readonly titleAccent: string;
    readonly subtitle: string;
  };
  readonly stats: readonly {readonly number: string; readonly label: string}[];
  readonly mission: {
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly caption: string;
  };
  readonly values: {
    readonly title: string;
    readonly items: readonly {
      readonly title: string;
      readonly description: string;
      readonly color: 'blue' | 'purple' | 'green' | 'orange';
    }[];
  };
  readonly team: {
    readonly title: string;
    readonly items: readonly {
      readonly name: string;
      readonly description: string;
    }[];
  };
  readonly partners: {
    readonly title: string;
    readonly description: string;
    readonly logos: readonly string[];
  };
  readonly contact: {
    readonly title: string;
    readonly wechatLabel: string;
    readonly wechatId: string;
  };
  readonly cta: {
    readonly title: string;
    readonly subtitle: string;
    readonly button: string;
  };
};

const zhHans: AboutContent = {
  meta: {
    title: '关于 KnowFlow - 企业级知识库与智能问数团队',
    description:
      'KnowFlow 团队打造私有化企业知识库与智能问数产品，基于 RAGFlow 深度定制，服务 30+ 企业客户，让企业的文档与数据都可问、可信、可控。',
  },
  hero: {
    titleLead: '关于 ',
    titleAccent: 'KnowFlow',
    subtitle:
      '让企业的非结构化文档与结构化数据都能被准确提问、可信作答、严格管控',
  },
  stats: [
    {number: '30+', label: '企业客户'},
    {number: '1M+', label: '文档处理量'},
    {number: '99.9%', label: '服务可用性'},
    {number: '24/7', label: '技术支持'},
  ],
  mission: {
    title: '我们的使命',
    paragraphs: [
      'KnowFlow 致力于为企业提供安全、高效、可验证的 AI 数据基础设施。我们相信，只有当知识的来源、边界和口径都可以被检查，AI 给出的结论才值得被业务采纳。',
      '我们做两件事：让非结构化文档在保留结构的前提下被准确检索和交付；让结构化数据在受治理的语义层之上被自然语言提问。两条产品线共用同一套权限体系与私有化部署方式。',
    ],
    caption: '让知识与数据都可被验证',
  },
  values: {
    title: '核心价值观',
    items: [
      {
        title: '技术创新',
        description:
          '持续探索文档理解、检索增强与语义层的前沿技术，把研究成果变成可落地的产品能力',
        color: 'blue',
      },
      {
        title: '客户至上',
        description:
          '用客户的真实文档、真实数据库和真实问题做验证，而不是拿通用演示数据下结论',
        color: 'purple',
      },
      {
        title: '安全可靠',
        description:
          '数据不出域、权限贯穿全链路、失败时宁可拒答也不给出看起来正常的错误答案',
        color: 'green',
      },
      {
        title: '开放共赢',
        description:
          '拥抱开源生态，开放语义层与查询引擎，与合作伙伴共同推动行业标准形成',
        color: 'orange',
      },
    ],
  },
  team: {
    title: '我们的团队',
    items: [
      {
        name: '技术团队',
        description:
          '来自知名互联网公司的技术专家，在 AI、NLP、文档理解与分布式系统等领域有深厚积累',
      },
      {
        name: '产品团队',
        description: '深耕企业服务多年，对企业知识管理与数据分析的痛点有深刻理解',
      },
      {
        name: '服务团队',
        description: '专业的售前售后团队，为客户提供全生命周期的支持服务',
      },
    ],
  },
  partners: {
    title: '生态与依赖',
    description:
      '我们站在优秀开源项目的肩膀上，也把自己的成果回馈给社区',
    logos: ['RAGFlow', 'MinerU', 'PaddleOCR', 'Milvus', 'PostgreSQL'],
  },
  contact: {
    title: '联系我们',
    wechatLabel: '微信咨询',
    wechatId: 'skycode007',
  },
  cta: {
    title: '与我们一起构建可信的企业 AI 数据基础设施',
    subtitle: '无论你是想了解产品，还是寻求合作，我们都期待与你交流',
    button: '立即联系我们',
  },
};

const en: AboutContent = {
  meta: {
    title: 'About KnowFlow - Enterprise knowledge base and analytics team',
    description:
      'The KnowFlow team builds self-hosted enterprise knowledge base and analytics products on top of RAGFlow, serving 30+ enterprise customers so that both documents and databases stay askable, trustworthy and governed.',
  },
  hero: {
    titleLead: 'About ',
    titleAccent: 'KnowFlow',
    subtitle:
      'So that both unstructured documents and structured data can be asked accurately, answered credibly and governed strictly',
  },
  stats: [
    {number: '30+', label: 'Enterprise customers'},
    {number: '1M+', label: 'Documents processed'},
    {number: '99.9%', label: 'Service availability'},
    {number: '24/7', label: 'Technical support'},
  ],
  mission: {
    title: 'Our mission',
    paragraphs: [
      'KnowFlow builds secure, efficient and verifiable AI data infrastructure for enterprises. We believe a conclusion is only worth acting on when its source, boundary and definition can all be inspected.',
      'We do two things: make unstructured documents retrievable and deliverable without losing their structure, and make structured data answerable in plain language on top of a governed semantic layer. Both product lines share one permission model and one self-hosted deployment story.',
    ],
    caption: 'Knowledge and data you can verify',
  },
  values: {
    title: 'What we value',
    items: [
      {
        title: 'Technical depth',
        description:
          'We keep pushing on document understanding, retrieval augmentation and semantic layers, and turn the research into shippable product capability',
        color: 'blue',
      },
      {
        title: 'Customer first',
        description:
          'We validate with your real documents, your real database and your real questions — never with generic demo data',
        color: 'purple',
      },
      {
        title: 'Safe by default',
        description:
          'Data stays in your environment, permissions run through the whole pipeline, and we would rather refuse than return a plausible-looking wrong answer',
        color: 'green',
      },
      {
        title: 'Open ecosystem',
        description:
          'We build on open source, open our semantic layer and query engine, and work with partners to move the standards forward',
        color: 'orange',
      },
    ],
  },
  team: {
    title: 'Our team',
    items: [
      {
        name: 'Engineering',
        description:
          'Engineers from well-known internet companies with deep experience in AI, NLP, document understanding and distributed systems',
      },
      {
        name: 'Product',
        description:
          'Years in enterprise software, with a first-hand understanding of knowledge management and analytics pain points',
      },
      {
        name: 'Customer success',
        description:
          'A dedicated pre-sales and support team covering the full customer lifecycle',
      },
    ],
  },
  partners: {
    title: 'Ecosystem and dependencies',
    description:
      'We stand on the shoulders of excellent open-source projects, and give our own work back to the community',
    logos: ['RAGFlow', 'MinerU', 'PaddleOCR', 'Milvus', 'PostgreSQL'],
  },
  contact: {
    title: 'Get in touch',
    wechatLabel: 'WeChat',
    wechatId: 'skycode007',
  },
  cta: {
    title: "Let's build trustworthy enterprise AI data infrastructure together",
    subtitle:
      'Whether you want to evaluate the product or explore a partnership, we would like to hear from you',
    button: 'Contact us',
  },
};

export const aboutContent: LocalizedContent<AboutContent> = {
  'zh-Hans': zhHans,
  en,
};
