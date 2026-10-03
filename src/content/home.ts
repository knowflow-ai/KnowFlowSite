import type {LocalizedContent} from '../i18n/useLocaleContent';

/** 首页文案。组件只负责排版，全部文字集中在这里按语言分组。 */

type Labelled = {readonly label: string; readonly items: readonly string[]};

export type HomeContent = {
  readonly meta: {readonly title: string; readonly description: string};
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly lead: string;
    readonly points: readonly {readonly title: string; readonly body: string}[];
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly diagram: {
      readonly boundaryLabel: string;
      readonly intranetLabel: string;
      readonly orgLabel: string;
      readonly folderTree: readonly {
        readonly text: string;
        readonly active: boolean;
      }[];
      readonly retrievalLabel: string;
      readonly retrievalPaths: readonly string[];
      readonly agentLabel: string;
      readonly agentHeadline: string;
      readonly agentEvidence: string;
      readonly agentScope: string;
      readonly deliveryLabel: string;
      readonly deliveryItems: readonly string[];
    };
  };
  readonly foundations: {
    readonly title: string;
    readonly items: readonly {
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly productLines: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly items: readonly {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly bullets: readonly string[];
      readonly href: string;
      readonly cta: string;
    }[];
  };
  readonly structure: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly steps: readonly Labelled[];
  };
  readonly rbac: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly steps: readonly {
      readonly number: string;
      readonly title: string;
      readonly items: readonly string[];
    }[];
    readonly footnoteStrong: string;
    readonly footnote: string;
  };
  readonly deployment: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly layers: readonly Labelled[];
    readonly localStack: Labelled;
    readonly optionalStack: Labelled;
    readonly compliance: readonly string[];
  };
  readonly retrieval: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly benefits: readonly string[];
    readonly ordinaryLabel: string;
    readonly ordinarySteps: readonly string[];
    readonly ordinaryResult: string;
    readonly knowflowLabel: string;
    readonly paths: readonly {
      readonly title: string;
      readonly meta: string;
      readonly detail: string;
    }[];
    readonly fusionLine: string;
  };
  readonly qa: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly capabilities: readonly string[];
    readonly channels: string;
    readonly assistantLabel: string;
    readonly scopeLabel: string;
    readonly question: string;
    readonly answerLead: string;
    readonly answerSteps: readonly string[];
    readonly answerNote: string;
    readonly citations: readonly {
      readonly badge: string;
      readonly title: string;
      readonly locator: string;
    }[];
    readonly followUp: string;
  };
  readonly agent: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly steps: readonly {
      readonly label: string;
      readonly headline: string;
      readonly detail: string;
    }[];
  };
  readonly scenarios: {
    readonly kicker: string;
    readonly title: string;
    readonly items: readonly {
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly poc: {
    readonly kicker: string;
    readonly title: string;
    readonly lead: string;
    readonly checks: readonly string[];
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
};

const zhHans: HomeContent = {
  meta: {
    title: '每个答案，都经得起推敲 | 私有化企业知识库与智能问数',
    description:
      'KnowFlow 以复杂文档结构化解析、多路径检索、目录级 RBAC 和私有化部署，帮助企业构建可信、可控、可追溯的知识系统；智能问数在受治理语义层之上，让业务人员用中文直接问数据。',
  },
  hero: {
    eyebrow: 'KnowFlow · 可信的企业知识与数据系统',
    title: '每个答案，\n都经得起推敲',
    lead: '复杂文档先读懂，再作答。从文档解析、知识库问答、Deep Agent 到追溯交付，全链路遵循目录级 RBAC；支持私有化与离线部署，让知识可用、权限可控、数据不出域。',
    points: [
      {
        title: '结构优先，回答回到原文',
        body: '保留标题层级、表格和版面，答案可定位到页码与原文片段。',
      },
      {
        title: '知识增强，串起跨文档关系',
        body: 'SAG 处理多跳问题，LLM Wiki 连接实体、概念与来源。',
      },
      {
        title: '文档执行，直接产出业务成果',
        body: 'Deep Agent 深读、抽取并生成报告或表格，每项结论保留引用。',
      },
    ],
    primaryCta: '申请 POC 验证',
    secondaryCta: '查看产品能力',
    diagram: {
      boundaryLabel: '当前用户可访问范围',
      intranetLabel: '企业内网',
      orgLabel: '企业组织\n目录权限',
      folderTree: [
        {text: '▾ 集团总部', active: false},
        {text: '　▾ 研发中心', active: false},
        {text: '　　▰ 产品部', active: true},
        {text: '　　▱ 项目 A', active: false},
        {text: '　▱ 合规与风控', active: false},
        {text: '　▱ 财务中心', active: false},
      ],
      retrievalLabel: '多路径检索',
      retrievalPaths: ['结构检索', '语义检索', '视觉检索'],
      agentLabel: '知识库问答 / Deep Agent',
      agentHeadline: '直接回答或交付报告',
      agentEvidence: '证据 E1 · E2 · E3',
      agentScope: '仅在授权知识范围内',
      deliveryLabel: '合规交付',
      deliveryItems: ['▤ 结构化数据', '▧ 分析报告', '▣ 业务简报'],
    },
  },
  foundations: {
    title: '企业知识系统的三条底线',
    items: [
      {
        title: '读得懂',
        description: '保留标题、表格、图片和版面结构，让检索建立在文档原始语义上。',
      },
      {
        title: '管得住',
        description:
          '目录级 RBAC 贯穿知识库问答、Deep Agent 与知识运营，不让权限停在管理后台。',
      },
      {
        title: '不出域',
        description: '支持私有化与离线部署，数据、模型和系统组件由企业自主控制。',
      },
    ],
  },
  productLines: {
    kicker: 'TWO PRODUCT LINES',
    title: '文档和数据，是两类问题',
    lead: '企业里既有读不完的文档，也有问不动的数据库。KnowFlow 用两条产品线分别解决，共用同一套账号体系、权限模型与私有化部署方式。',
    items: [
      {
        eyebrow: '非结构化文档',
        title: '企业知识库',
        description:
          '以文档结构理解为核心，把 PDF、Word、扫描件、图片和视频变成可检索、可追溯、可交付的知识。',
        bullets: [
          '深度文档解析与五种分块策略',
          '结构、语义、视觉多路径检索',
          'Deep Agent 深读、抽取与报告生成',
          '目录级 RBAC 贯穿检索与运营',
        ],
        href: '/product',
        cta: '了解企业知识库',
      },
      {
        eyebrow: '结构化数据',
        title: '智能问数',
        description:
          '把指标、维度、口径沉淀成受治理的语义层，业务同事用中文提问，物理 SQL 由确定性编译器生成。',
        bullets: [
          '受治理语义目录与业务词典',
          'LLM 只写 S2SQL，编译器出物理 SQL',
          '只读 Guard 与 fail closed 执行边界',
          '固定阶段诊断与词汇缺口回流',
        ],
        href: '/analytics',
        cta: '了解智能问数',
      },
    ],
  },
  structure: {
    kicker: 'STRUCTURE-AWARE RAG',
    title: '先读懂文档结构，再谈检索效果',
    lead: '企业材料的含义往往藏在标题层级、表格关系、页面布局和上下文中。KnowFlow 保留这些结构，使每条证据都可定位、可核验。',
    steps: [
      {label: '多源文档', items: ['PDF / Word', 'Excel / PPT', '图片 / OCR', '扫描件']},
      {label: '结构解析引擎', items: ['版面识别', '段落层级', '表格与公式', '坐标定位']},
      {label: '结构化表示', items: ['标题树', '父子关系', '页面与坐标', '语义块']},
      {label: '可信索引', items: ['目录索引', '向量索引', '全文索引', '关系索引']},
    ],
  },
  rbac: {
    kicker: 'DIRECTORY-LEVEL RBAC',
    title: '目录级 RBAC：最小权限访问，保障协作与合规',
    lead: '权限从组织关系进入知识目录，再自动贯穿检索、Agent 和运营数据。采购者看到的不只是「有权限功能」，而是一条完整的治理链路。',
    steps: [
      {
        number: '01',
        title: '企业组织与授权主体',
        items: ['用户', '多层级组织', '跨部门协作组'],
      },
      {
        number: '02',
        title: '目录分级管理',
        items: ['超级管理员建顶层目录', '授予目录管理员', '目录内自建知识库'],
      },
      {
        number: '03',
        title: '目录权限继承',
        items: ['只读 / 编辑 / 管理', '从父目录向下继承', '多来源权限取最高值'],
      },
      {
        number: '04',
        title: '统一权限应用范围',
        items: ['检索与问答', 'Deep Agent', '运营数据与导出'],
      },
    ],
    footnoteStrong: '权限不是独立模块。',
    footnote:
      '同一用户在问答、Deep Agent、知识运营和导出中，始终只接触其可访问目录。',
  },
  deployment: {
    kicker: 'PRIVATE & OFFLINE DEPLOYMENT',
    title: '私有化与离线部署，数据和模型都由企业控制',
    lead: '适配企业内网、隔离网络和既有基础设施。应用、服务、模型、存储与权限边界均可纳入企业自己的安全体系。',
    layers: [
      {label: '应用层', items: ['企业门户', 'Web / API', 'OA / ERP / PLM', '企业协同工具']},
      {
        label: '应用服务层',
        items: ['检索服务', 'Deep Agent', '文档解析', '权限与审计'],
      },
      {
        label: '智能与引擎层',
        items: ['结构检索', '语义检索', '视觉检索', '模型服务'],
      },
      {
        label: '基础设施层',
        items: ['CPU / GPU', '对象与块存储', '内网网络', '备份与容灾'],
      },
    ],
    localStack: {
      label: '本地部署',
      items: ['PostgreSQL', '向量数据库', '对象存储', '备份与容灾'],
    },
    optionalStack: {
      label: '可选增强服务',
      items: ['结构解析', '视觉模型', '大语言模型', 'OCR / 版面分析'],
    },
    compliance: [
      'TLS 传输加密',
      'AES-256 存储加密',
      'RBAC 访问控制',
      '操作审计',
      '备份与容灾',
    ],
  },
  retrieval: {
    kicker: 'MULTI-PATH RETRIEVAL',
    title: '多路径检索互为补充，提升召回与精度',
    lead: '普通 RAG 把问题送入单一路径，复杂文档容易遗漏层级、表格和版面信息。KnowFlow 让不同检索路径协同，再回到原文证据。',
    benefits: [
      '覆盖更全：多路径互补，减少遗漏',
      '逻辑更稳：定位范围后再生成',
      '更可控：路径、证据和结果可追溯',
    ],
    ordinaryLabel: '普通 RAG',
    ordinarySteps: ['用户问题', '向量检索', 'Top K 片段'],
    ordinaryResult: '生成',
    knowflowLabel: 'KnowFlow · 多路径融合',
    paths: [
      {title: '结构检索', meta: '目录 / 标题 / 层级', detail: '先按文档结构缩小范围'},
      {title: '语义检索', meta: '向量 / 关键词', detail: '覆盖稳定、高频的问答'},
      {title: '视觉检索', meta: '页面 / 图表 / 版面', detail: '补充图表和视觉证据'},
    ],
    fusionLine: '结果融合与重排 → 高质量上下文 → 生成与证据输出',
  },
  qa: {
    kicker: 'CORE KNOWLEDGE Q&A',
    title: '知识库问答：让每个员工在权限内，快速得到可核验答案',
    lead: '面向日常、高频问题，员工可以选择知识库或指定文档直接提问。系统结合对话上下文检索，在答案中标注来源，并支持连续追问。',
    capabilities: [
      '选择一个或多个知识库',
      '@文档精确限定本轮材料',
      '引用回到原文页码与片段',
      '多轮会话保持问题上下文',
    ],
    channels:
      '可接入企业微信、钉钉、飞书、Dify 与业务系统，让知识问答进入员工已有工作入口。',
    assistantLabel: '企业知识助手',
    scopeLabel: '已授权：制度库、产品库',
    question: '差旅报销超过 5000 元，需要哪些审批？',
    answerLead: '根据《费用报销管理制度》，需完成三级审批：',
    answerSteps: [
      '直属负责人确认费用真实性；',
      '部门负责人审核预算与业务必要性；',
      '财务负责人完成合规复核。',
    ],
    answerNote: '单笔超过 20,000 元时，还需分管领导审批。',
    citations: [
      {badge: '引用 1', title: '费用报销管理制度', locator: '第 4 章 · 审批权限 · p.12'},
      {badge: '引用 2', title: '财务内控手册', locator: '3.2 大额费用复核 · p.28'},
    ],
    followUp: '继续追问：出差人和审批人是同一人时怎么办？',
  },
  agent: {
    kicker: 'DEEP AGENT',
    title: '交付可审计、可追溯的业务成果',
    lead: 'Deep Agent 在当前用户授权范围内深度阅读材料，完成结构化提取、分析与报告生成，并把结论连回证据。',
    steps: [
      {label: '复杂任务', headline: '跨文档研究问题', detail: '明确目标与交付格式'},
      {label: '检索结果', headline: 'E1 · E2 · E3', detail: '页码、章节、坐标与原文'},
      {label: 'Deep Agent', headline: '阅读 · 分析 · 生成', detail: '不超出授权知识范围'},
      {label: '交付物', headline: 'Word · PPT · Excel', detail: '结论和数据均带证据'},
    ],
  },
  scenarios: {
    kicker: 'REAL WORKFLOWS',
    title: '把复杂知识工作放进真实业务流程',
    items: [
      {title: '财务分析', description: '跨报告提取指标、核验口径，形成带来源的分析底稿。'},
      {title: '法务合规', description: '在授权合同与制度范围内定位条款、比对差异。'},
      {title: '人力资源', description: '让制度问答严格跟随员工组织、角色与目录权限。'},
      {title: '研发工程', description: '贯通规范、设计资料与项目文档，保留技术证据链。'},
      {
        title: '供应链管理',
        description: '聚合供应商、质量与交付材料，支持复杂问题研究。',
      },
    ],
  },
  poc: {
    kicker: 'POC WITH YOUR DATA',
    title: '用企业真实材料验证效果',
    lead: '不靠通用演示数据做判断。带上典型文档、权限关系和业务问题，用一轮 POC 验证产品是否真正适合你的企业。',
    checks: [
      '复杂文档能否正确解析',
      '关键问题能否找到完整证据',
      '权限边界能否贯穿应用',
      '部署条件能否适配企业环境',
    ],
    primaryCta: '现在申请 POC',
    secondaryCta: '先看技术文档',
  },
};

const en: HomeContent = {
  meta: {
    title: 'Every answer holds up to scrutiny | On-premise enterprise knowledge base and analytics',
    description:
      'KnowFlow turns complex documents into verifiable answers through structure-aware parsing, multi-path retrieval, directory-level RBAC and on-premise deployment — and lets business users query databases in plain language on a governed semantic layer.',
  },
  hero: {
    eyebrow: 'KnowFlow · Enterprise knowledge and data, built to be verified',
    title: 'Every answer\nholds up to scrutiny',
    lead: 'Complex documents are understood first, then answered. Parsing, knowledge Q&A, Deep Agent and traceable delivery all run under directory-level RBAC. Deploy on-premise or fully offline so knowledge stays usable, permissions stay enforced and data never leaves your network.',
    points: [
      {
        title: 'Structure first, answers trace back to the source',
        body: 'Heading hierarchy, tables and layout are preserved, so answers point to a page and a passage.',
      },
      {
        title: 'Augmented retrieval across documents',
        body: 'SAG handles multi-hop questions; LLM Wiki connects entities, concepts and sources.',
      },
      {
        title: 'Execution that produces real deliverables',
        body: 'Deep Agent reads deeply, extracts fields and writes reports or spreadsheets — every conclusion keeps its citation.',
      },
    ],
    primaryCta: 'Request a POC',
    secondaryCta: 'Explore capabilities',
    diagram: {
      boundaryLabel: "Current user's accessible scope",
      intranetLabel: 'Corporate network',
      orgLabel: 'Organisation\nDirectory permissions',
      folderTree: [
        {text: '▾ Group HQ', active: false},
        {text: '　▾ R&D centre', active: false},
        {text: '　　▰ Product team', active: true},
        {text: '　　▱ Project A', active: false},
        {text: '　▱ Compliance & risk', active: false},
        {text: '　▱ Finance', active: false},
      ],
      retrievalLabel: 'Multi-path retrieval',
      retrievalPaths: ['Structural', 'Semantic', 'Visual'],
      agentLabel: 'Knowledge Q&A / Deep Agent',
      agentHeadline: 'Answer directly or deliver a report',
      agentEvidence: 'Evidence E1 · E2 · E3',
      agentScope: 'Within authorised knowledge only',
      deliveryLabel: 'Governed delivery',
      deliveryItems: ['▤ Structured data', '▧ Analysis report', '▣ Business brief'],
    },
  },
  foundations: {
    title: 'Three non-negotiables for an enterprise knowledge system',
    items: [
      {
        title: 'It has to read',
        description:
          'Headings, tables, images and layout are preserved so retrieval works on the original meaning of a document.',
      },
      {
        title: 'It has to be governed',
        description:
          'Directory-level RBAC runs through Q&A, Deep Agent and knowledge operations — not just the admin console.',
      },
      {
        title: 'It has to stay in-house',
        description:
          'On-premise and offline deployment keep data, models and components under your control.',
      },
    ],
  },
  productLines: {
    kicker: 'TWO PRODUCT LINES',
    title: 'Documents and databases are different problems',
    lead: 'Every company has documents nobody can finish reading and databases nobody can query. KnowFlow solves both with two product lines that share one account system, one permission model and one deployment story.',
    items: [
      {
        eyebrow: 'Unstructured documents',
        title: 'Knowledge Base',
        description:
          'Structure-aware understanding turns PDFs, Word files, scans, images and video into knowledge you can search, trace and deliver on.',
        bullets: [
          'Deep parsing with five chunking strategies',
          'Structural, semantic and visual retrieval paths',
          'Deep Agent for close reading, extraction and reports',
          'Directory-level RBAC across retrieval and operations',
        ],
        href: '/product',
        cta: 'Explore Knowledge Base',
      },
      {
        eyebrow: 'Structured data',
        title: 'Analytics',
        description:
          'Metrics, dimensions and definitions become a governed semantic layer. Colleagues ask in plain language; a deterministic compiler writes the physical SQL.',
        bullets: [
          'Governed semantic catalog and business dictionary',
          'The LLM writes S2SQL; the compiler writes SQL',
          'Read-only guard with fail-closed execution',
          'Fixed-stage diagnostics and vocabulary feedback loops',
        ],
        href: '/analytics',
        cta: 'Explore Analytics',
      },
    ],
  },
  structure: {
    kicker: 'STRUCTURE-AWARE RAG',
    title: 'Understand the structure first, then talk about retrieval quality',
    lead: 'Meaning in enterprise material lives in heading hierarchy, table relationships, page layout and context. KnowFlow keeps that structure so every piece of evidence can be located and checked.',
    steps: [
      {label: 'Source documents', items: ['PDF / Word', 'Excel / PPT', 'Images / OCR', 'Scans']},
      {
        label: 'Parsing engine',
        items: ['Layout detection', 'Paragraph hierarchy', 'Tables & formulas', 'Coordinates'],
      },
      {
        label: 'Structured representation',
        items: ['Heading tree', 'Parent-child links', 'Pages & coordinates', 'Semantic blocks'],
      },
      {
        label: 'Trustworthy index',
        items: ['Directory index', 'Vector index', 'Full-text index', 'Relation index'],
      },
    ],
  },
  rbac: {
    kicker: 'DIRECTORY-LEVEL RBAC',
    title: 'Least-privilege access that still supports collaboration and compliance',
    lead: 'Permissions flow from your organisation into the knowledge directory, then automatically through retrieval, agents and operational data. What buyers get is a governance chain, not a permissions feature.',
    steps: [
      {
        number: '01',
        title: 'Organisation and grantees',
        items: ['Users', 'Multi-level organisations', 'Cross-team collaboration groups'],
      },
      {
        number: '02',
        title: 'Delegated directories',
        items: ['Super admin creates top-level folders', 'Folder managers are assigned', 'They create knowledge bases inside'],
      },
      {
        number: '03',
        title: 'Inherited directory permissions',
        items: ['Read-only / edit / manage', 'Inherited from parent folders', 'Highest grant wins'],
      },
      {
        number: '04',
        title: 'One boundary everywhere',
        items: ['Retrieval and Q&A', 'Deep Agent', 'Operational data and exports'],
      },
    ],
    footnoteStrong: 'Permissions are not a separate module.',
    footnote:
      'The same user only ever touches their accessible directories — in Q&A, in Deep Agent, in operations and in exports.',
  },
  deployment: {
    kicker: 'PRIVATE & OFFLINE DEPLOYMENT',
    title: 'Self-hosted and offline, with data and models under your control',
    lead: 'Fits corporate networks, air-gapped environments and existing infrastructure. Applications, services, models, storage and permission boundaries all sit inside your own security perimeter.',
    layers: [
      {
        label: 'Application layer',
        items: ['Employee portal', 'Web / API', 'OA / ERP / PLM', 'Collaboration tools'],
      },
      {
        label: 'Service layer',
        items: ['Retrieval service', 'Deep Agent', 'Document parsing', 'Permissions & audit'],
      },
      {
        label: 'Intelligence layer',
        items: ['Structural retrieval', 'Semantic retrieval', 'Visual retrieval', 'Model serving'],
      },
      {
        label: 'Infrastructure layer',
        items: ['CPU / GPU', 'Object & block storage', 'Internal network', 'Backup & DR'],
      },
    ],
    localStack: {
      label: 'On-premise',
      items: ['PostgreSQL', 'Vector database', 'Object storage', 'Backup & DR'],
    },
    optionalStack: {
      label: 'Optional services',
      items: ['Structure parsing', 'Vision models', 'Large language models', 'OCR / layout'],
    },
    compliance: [
      'TLS in transit',
      'AES-256 at rest',
      'RBAC access control',
      'Operation audit log',
      'Backup & disaster recovery',
    ],
  },
  retrieval: {
    kicker: 'MULTI-PATH RETRIEVAL',
    title: 'Complementary retrieval paths lift both recall and precision',
    lead: 'Ordinary RAG pushes every question down one path, so complex documents lose hierarchy, tables and layout. KnowFlow makes the paths work together, then returns to the source evidence.',
    benefits: [
      'Broader coverage: complementary paths reduce misses',
      'Steadier reasoning: narrow the scope before generating',
      'More control: paths, evidence and results are traceable',
    ],
    ordinaryLabel: 'Ordinary RAG',
    ordinarySteps: ['User question', 'Vector search', 'Top-K passages'],
    ordinaryResult: 'Generate',
    knowflowLabel: 'KnowFlow · fused paths',
    paths: [
      {
        title: 'Structural',
        meta: 'Directory / heading / level',
        detail: 'Narrow by document structure first',
      },
      {
        title: 'Semantic',
        meta: 'Vector / keyword',
        detail: 'Covers stable, high-frequency questions',
      },
      {
        title: 'Visual',
        meta: 'Page / chart / layout',
        detail: 'Adds chart and layout evidence',
      },
    ],
    fusionLine: 'Fuse and rerank → high-quality context → answer with evidence',
  },
  qa: {
    kicker: 'CORE KNOWLEDGE Q&A',
    title: 'Every employee gets a verifiable answer, inside their permissions',
    lead: 'For everyday questions, employees pick a knowledge base or a specific document and ask. The system retrieves with conversation context, cites its sources in the answer and supports follow-ups.',
    capabilities: [
      'Pick one or several knowledge bases',
      '@document to scope this turn precisely',
      'Citations return to the page and passage',
      'Multi-turn sessions keep the context',
    ],
    channels:
      'Available through WeCom, DingTalk, Feishu, Dify and internal systems, so answers reach employees where they already work.',
    assistantLabel: 'Enterprise knowledge assistant',
    scopeLabel: 'Authorised: Policies, Products',
    question: 'What approvals are needed for travel expenses above ¥5,000?',
    answerLead:
      'Per the Expense Reimbursement Policy, three levels of approval are required:',
    answerSteps: [
      'The direct manager confirms the expense is genuine;',
      'The department head reviews budget and business need;',
      'The finance lead completes the compliance review.',
    ],
    answerNote: 'Single claims above ¥20,000 also require the responsible executive.',
    citations: [
      {
        badge: 'Citation 1',
        title: 'Expense Reimbursement Policy',
        locator: 'Ch. 4 · Approval authority · p.12',
      },
      {
        badge: 'Citation 2',
        title: 'Finance Internal Control Manual',
        locator: '3.2 Large expense review · p.28',
      },
    ],
    followUp: 'Follow-up: what if the traveller and the approver are the same person?',
  },
  agent: {
    kicker: 'DEEP AGENT',
    title: 'Deliver auditable, traceable business output',
    lead: 'Deep Agent reads deeply within the current user’s authorised scope, performs structured extraction and analysis, writes the report, and links every conclusion back to its evidence.',
    steps: [
      {
        label: 'Complex task',
        headline: 'Cross-document research',
        detail: 'Define the goal and the deliverable format',
      },
      {
        label: 'Retrieved evidence',
        headline: 'E1 · E2 · E3',
        detail: 'Pages, sections, coordinates and source text',
      },
      {
        label: 'Deep Agent',
        headline: 'Read · analyse · generate',
        detail: 'Never beyond the authorised scope',
      },
      {
        label: 'Deliverable',
        headline: 'Word · PPT · Excel',
        detail: 'Conclusions and data both carry evidence',
      },
    ],
  },
  scenarios: {
    kicker: 'REAL WORKFLOWS',
    title: 'Put complex knowledge work inside real business processes',
    items: [
      {
        title: 'Financial analysis',
        description:
          'Pull metrics across reports, verify definitions and produce a sourced working paper.',
      },
      {
        title: 'Legal and compliance',
        description:
          'Locate clauses and compare differences within authorised contracts and policies.',
      },
      {
        title: 'Human resources',
        description:
          'Policy answers follow the employee’s organisation, role and directory permissions.',
      },
      {
        title: 'Engineering',
        description:
          'Connect standards, design material and project documents while keeping the evidence chain.',
      },
      {
        title: 'Supply chain',
        description:
          'Aggregate supplier, quality and delivery material to support complex investigations.',
      },
    ],
  },
  poc: {
    kicker: 'POC WITH YOUR DATA',
    title: 'Validate with your own material',
    lead: 'Do not decide on generic demo data. Bring representative documents, real permission structures and real business questions, and settle it in one POC.',
    checks: [
      'Are complex documents parsed correctly?',
      'Do key questions find complete evidence?',
      'Do permission boundaries hold across the product?',
      'Does deployment fit your environment?',
    ],
    primaryCta: 'Request a POC',
    secondaryCta: 'Read the docs first',
  },
};

export const homeContent: LocalizedContent<HomeContent> = {
  'zh-Hans': zhHans,
  en,
};
