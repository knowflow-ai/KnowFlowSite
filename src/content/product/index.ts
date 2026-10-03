import type {LocalizedContent} from '../../i18n/useLocaleContent';

/** 企业知识库产品页文案（功能明细表见同目录的 featureCatalog.ts）。 */

export type ProductContent = {
  readonly meta: {readonly title: string; readonly description: string};
  readonly hero: {
    readonly badge: string;
    readonly titleLead: string;
    readonly titleMiddle: string;
    readonly titleAccent: string;
    readonly subtitle: readonly string[];
    readonly highlights: readonly string[];
  };
  readonly capabilities: {
    readonly title: string;
    readonly subtitle: string;
    readonly items: readonly {
      readonly id: string;
      readonly number: string;
      readonly title: string;
      readonly subtitle: string;
      readonly description: string;
      readonly features: readonly {
        readonly title: string;
        readonly desc: string;
      }[];
      readonly value: string;
      readonly color: 'blue' | 'purple' | 'green' | 'orange';
    }[];
  };
  readonly techSpecs: {
    readonly title: string;
    readonly subtitle: string;
    readonly groups: readonly {
      readonly category: string;
      readonly items: readonly string[];
    }[];
  };
  readonly comparison: {
    readonly title: string;
    readonly subtitle: string;
    readonly columns: readonly [string, string, string];
    readonly rows: readonly {
      readonly dimension: string;
      readonly knowflow: string;
      readonly others: string;
    }[];
  };
  readonly scenarios: {
    readonly title: string;
    readonly subtitle: string;
    readonly items: readonly {
      readonly title: string;
      readonly description: string;
      readonly highlights: readonly string[];
      readonly color: 'blue' | 'purple' | 'green' | 'orange';
    }[];
  };
  readonly cta: {
    readonly title: string;
    readonly subtitle: string;
    readonly primary: string;
    readonly secondary: string;
  };
};

const zhHans: ProductContent = {
  meta: {
    title: '产品能力 - KnowFlow 企业知识库与知识运营平台',
    description:
      '了解 KnowFlow 的文档结构化 RAG、Deep Agent、SAG 多跳检索、ColPali 视觉融合、LLM Wiki、知识运营、企业权限治理与私有化部署能力。',
  },
  hero: {
    badge: 'PRODUCT PLATFORM',
    titleLead: '从文档结构化理解',
    titleMiddle: '到',
    titleAccent: '企业知识运营闭环',
    subtitle: [
      '一套平台连接文档解析、RAG 检索、Deep Agent 与 LLM Wiki，',
      '让知识既能准确回答，也能交付台账和报告，并在权限边界内持续运营',
    ],
    highlights: ['结构化 RAG', '知识执行', '知识图谱', '运营闭环'],
  },
  capabilities: {
    title: '七大产品能力',
    subtitle: '从知识进入系统、被检索和连接，到被治理和持续优化',
    items: [
      {
        id: 'document-structure',
        number: '01',
        title: '以文档结构为核心的传统 RAG',
        subtitle: '不是先切碎文本，而是先理解文档',
        description:
          'KnowFlow 保留标题层级、段落关系、表格、公式、图片和版面位置，再按不同文档结构选择合适的知识单元，为稳定检索提供可追溯基础。',
        features: [
          {title: '复杂文档解析', desc: 'MinerU 3.x、PaddleOCR 处理 PDF、扫描件、表格和公式'},
          {title: '结构化分块', desc: 'Smart、Title、Regex、Parent-Child、Page 多种策略'},
          {title: '父子上下文', desc: '用子块精准命中，用父块补充完整语义'},
          {title: '原文追溯', desc: '分块、引用和图片可回到文档原始位置'},
        ],
        value: '检索质量的上限，首先由知识进入系统时是否保留结构决定',
        color: 'blue',
      },
      {
        id: 'retrieval',
        number: '02',
        title: '传统 RAG、SAG 与视觉检索协同',
        subtitle: '让不同复杂度的问题走合适的检索路径',
        description:
          '常规问题使用成熟的关键词与向量混合检索；复杂问题由 SAG 做跨文档、多步骤检索；图表和版式内容由 ColPali 视觉路补充。',
        features: [
          {title: '传统混合检索', desc: '融合词法、向量、权重和可选 Rerank，覆盖高频问答'},
          {title: 'SAG 多跳检索', desc: '面向跨文档事实组合和复杂关系问题逐步查证'},
          {title: '失败自动回退', desc: 'SAG 无结果或异常时自动回到标准检索链路'},
          {title: 'ColPali 视觉融合', desc: '文本与视觉文档分路召回，再通过 RRF 合并排名'},
        ],
        value: '不是所有问题都需要最重的推理，但复杂问题必须有更深的路径',
        color: 'purple',
      },
      {
        id: 'deep-agent',
        number: '03',
        title: 'Deep Agent 企业知识执行',
        subtitle: '不止回答问题，还能交付台账和正式稿件',
        description:
          'Deep Agent 在用户已授权的知识范围内完成多步阅读、字段抽取和材料写作，把企业文档转成可核验、可下载、可继续编辑的工作成果。',
        features: [
          {title: '深度阅读', desc: '浏览目录、检索正文并跨章节核对，回答保留原文引用'},
          {title: '结构化抽取', desc: '按字段批量处理多份文档，可交付 Excel 台账'},
          {title: '报告生成', desc: '依据指定材料流式撰写报告、文章、方案和讲稿'},
          {title: '精确任务范围', desc: '通过回答方式与 @文档 控制当前轮次，不扩大授权边界'},
        ],
        value: '企业知识的价值不只在于被找到，更在于变成可以继续使用的工作成果',
        color: 'green',
      },
      {
        id: 'wiki',
        number: '04',
        title: 'LLM Wiki 企业知识图谱',
        subtitle: '从文档集合升级为可探索的知识网络',
        description:
          'LLM Wiki 自动从知识库生成结构化百科，将实体、概念、页面、关系和来源组织起来，让用户既能问，也能搜、能看、能沿关系探索。',
        features: [
          {title: '自动生成 Wiki', desc: '从知识库提炼主题、实体、概念和结构化页面'},
          {title: '全文搜索', desc: '直接查找企业实体、产品、项目和专业概念'},
          {title: '跨页面关联', desc: '用可读链接连接相关页面和上下游知识'},
          {title: '关系图谱', desc: '可视化实体之间的关系，并保留来源引用'},
        ],
        value: '问答解决一个问题，知识图谱帮助人建立完整认知',
        color: 'green',
      },
      {
        id: 'operations',
        number: '05',
        title: '企业知识运营闭环',
        subtitle: '从「知识已经入库」走向「知识持续变好」',
        description:
          '把真实问答、检索命中和用户反馈转成可观察的运营指标与知识缺口，再通过 AI 诊断、优化任务和报表复盘持续改善知识质量。',
        features: [
          {title: '运营概览', desc: '查看问答量、活跃用户、有效率、反馈和使用趋势'},
          {title: '知识缺口', desc: '聚合未命中、低质量和反复出现的相近问题'},
          {title: 'AI 辅助诊断', desc: '结合问答反馈与检索证据生成可执行优化建议'},
          {title: '任务与报表', desc: '批量处理优化任务，导出运营明细和阶段报表'},
        ],
        value: '知识库不是上线即完成，而是需要基于真实使用持续运营',
        color: 'orange',
      },
      {
        id: 'organization',
        number: '06',
        title: '企业组织与知识库树',
        subtitle: '让知识结构与企业管理结构保持一致',
        description:
          '建立多层级组织、成员和协作组，再通过树状目录组织大量知识库，明确知识归属、业务边界和维护责任。',
        features: [
          {title: '多层级组织', desc: '按集团、部门和团队建立真实组织关系'},
          {title: '成员与协作组', desc: '兼容纵向组织和跨部门项目协作'},
          {title: '知识库目录树', desc: '用多级文件夹分类、移动和归档知识库'},
          {title: '统一维护', desc: '支持目录规划、知识库导入导出和批量治理'},
        ],
        value: '知识规模扩大后，清晰的归属和目录比更多搜索框更重要',
        color: 'blue',
      },
      {
        id: 'rbac',
        number: '07',
        title: '目录级纯 RBAC 权限治理',
        subtitle: '把正确的知识交给正确的人',
        description:
          '超级管理员搭好顶层目录并指定目录管理员，目录管理员在自己的目录里建知识库、继续授权。任意目录或知识库都可以授权给用户、组织或协作组，权限沿目录向下继承，多来源授权取最高权限，并贯穿检索、管理与运营数据。',
        features: [
          {title: '任意主体授权', desc: '支持用户、组织、协作组三类授权主体'},
          {title: '分级管理', desc: '超级管理员建顶层目录，目录管理员在目录内自建知识库与授权'},
          {title: '三级权限', desc: '分别授予只读、编辑和管理能力'},
          {title: '目录继承', desc: '上级目录授权自动作用于子目录和知识库'},
          {title: '统一权限边界', desc: '知识列表、检索、运营明细和导出使用同一 RBAC 范围'},
          {title: '三方协同接入', desc: '支持企业微信、钉钉、飞书等企业工作入口'},
        ],
        value: '权限不是外围配置，而是企业知识被管理和使用的基础边界',
        color: 'purple',
      },
    ],
  },
  techSpecs: {
    title: '能力矩阵',
    subtitle: '覆盖解析、检索、知识网络、运营、治理与私有化基础设施',
    groups: [
      {category: '文档处理', items: ['MinerU 3.x', 'PaddleOCR', 'Smart', 'Title', 'Regex', 'Parent-Child', 'Page']},
      {category: '检索引擎', items: ['混合检索', 'Rerank', 'SAG', 'ColPali', 'RRF', 'DeepRead']},
      {category: '知识网络', items: ['LLM Wiki', '全文搜索', '跨页面链接', '关系图谱', '来源引用']},
      {category: '知识运营', items: ['运营概览', '知识缺口', 'AI 诊断', '任务队列', 'XLSX / CSV']},
      {category: '治理能力', items: ['组织架构', '协作组', '知识库树', '目录继承', '纯 RBAC']},
      {category: '业务接入', items: ['企业微信', '钉钉', '飞书', 'Dify', 'RESTful API', 'SDK']},
      {category: '基础设施', items: ['PostgreSQL', 'Milvus', 'RustFS / MinIO', 'Docker Compose', 'Kubernetes']},
    ],
  },
  comparison: {
    title: '不只是另一个 RAG 问答工具',
    subtitle: 'KnowFlow 与传统文档问答方案的差异',
    columns: ['对比维度', 'KnowFlow', '传统方案'],
    rows: [
      {dimension: '知识单元', knowflow: '保留标题、父子层级、表格、图片和版面结构', others: '固定长度切分，结构与上下文容易丢失'},
      {dimension: '检索路径', knowflow: '传统混合检索、SAG 多跳检索、ColPali 视觉检索协同', others: '所有问题共用一条向量检索链路'},
      {dimension: '知识形态', knowflow: '问答之外生成可搜索、可浏览的 LLM Wiki 知识图谱', others: '知识停留在文档列表和聊天窗口'},
      {dimension: '持续运营', knowflow: '指标、知识缺口、AI 诊断、优化任务和报表形成闭环', others: '上线后缺少质量反馈和改进抓手'},
      {dimension: '知识组织', knowflow: '企业组织与知识库树共同管理归属和业务边界', others: '知识库平铺，规模扩大后难以维护'},
      {dimension: '权限治理', knowflow: '目录或知识库可授权给用户、组织、协作组并向下继承', others: '通常只支持单库或简单成员权限'},
      {dimension: '部署与数据', knowflow: '支持私有化和离线部署，数据与模型由企业控制', others: '依赖外部云服务，数据边界受平台限制'},
    ],
  },
  scenarios: {
    title: '典型应用场景',
    subtitle: '从精准问答到复杂研究，再到集团级知识治理',
    items: [
      {
        title: '制度、合同与技术资料',
        description: '保留章节、条款、表格与上下文，用结构化 RAG 提供稳定、准确、可回溯的知识问答。',
        highlights: ['结构化解析', '父子分块', '原文引用'],
        color: 'blue',
      },
      {
        title: '复杂研究与多跳问答',
        description: '使用 SAG 跨文档检索和逐步查证，处理需要组合多个事实或追踪复杂关系的问题。',
        highlights: ['SAG', '多步检索', '自动回退'],
        color: 'purple',
      },
      {
        title: '企业百科与知识网络',
        description: '用 LLM Wiki 自动沉淀企业实体、概念与关系，形成可搜索、可浏览、可探索的知识图谱。',
        highlights: ['LLM Wiki', '全文搜索', '关系图谱'],
        color: 'green',
      },
      {
        title: '集团与多部门知识治理',
        description: '用组织、知识库树和目录级 RBAC 管理复杂知识边界，并通过运营闭环持续改善知识质量。',
        highlights: ['组织架构', '目录授权', '知识运营'],
        color: 'orange',
      },
    ],
  },
  cta: {
    title: '用真实企业知识体系验证 KnowFlow',
    subtitle: '带上文档、典型问题、组织结构和权限规则，一起评估完整知识闭环',
    primary: '申请演示',
    secondary: '查看文档',
  },
};

const en: ProductContent = {
  meta: {
    title: 'Product - KnowFlow enterprise knowledge base platform',
    description:
      'Explore KnowFlow: structure-aware RAG, Deep Agent, SAG multi-hop retrieval, ColPali visual fusion, LLM Wiki, knowledge operations, enterprise permission governance and on-premise deployment.',
  },
  hero: {
    badge: 'PRODUCT PLATFORM',
    titleLead: 'From structure-aware understanding',
    titleMiddle: 'to a',
    titleAccent: 'closed knowledge operations loop',
    subtitle: [
      'One platform connecting document parsing, RAG retrieval, Deep Agent and LLM Wiki —',
      'so knowledge answers accurately, delivers registers and reports, and keeps improving inside its permission boundary',
    ],
    highlights: [
      'Structure-aware RAG',
      'Knowledge execution',
      'Knowledge graph',
      'Operations loop',
    ],
  },
  capabilities: {
    title: 'Seven core capabilities',
    subtitle:
      'From knowledge entering the system, through retrieval and linking, to governance and continuous improvement',
    items: [
      {
        id: 'document-structure',
        number: '01',
        title: 'RAG built on document structure',
        subtitle: 'Understand the document before chopping up the text',
        description:
          'KnowFlow keeps heading hierarchy, paragraph relations, tables, formulas, images and layout position, then picks the right knowledge unit per document structure — a traceable base for stable retrieval.',
        features: [
          {title: 'Complex document parsing', desc: 'MinerU 3.x and PaddleOCR handle PDFs, scans, tables and formulas'},
          {title: 'Structure-aware chunking', desc: 'Smart, Title, Regex, Parent-Child and Page strategies'},
          {title: 'Parent-child context', desc: 'Match on child chunks, answer with the fuller parent semantics'},
          {title: 'Source traceability', desc: 'Chunks, citations and images link back to their original position'},
        ],
        value:
          'The ceiling on retrieval quality is set the moment knowledge enters the system — by whether structure survived',
        color: 'blue',
      },
      {
        id: 'retrieval',
        number: '02',
        title: 'Hybrid, SAG and visual retrieval working together',
        subtitle: 'Route each question down a path that matches its difficulty',
        description:
          'Everyday questions use mature keyword-plus-vector hybrid retrieval; complex ones go through SAG for cross-document, multi-step search; charts and layout-heavy content are covered by the ColPali visual path.',
        features: [
          {title: 'Hybrid retrieval', desc: 'Lexical, vector, weighting and optional reranking for high-frequency Q&A'},
          {title: 'SAG multi-hop', desc: 'Step-by-step verification for combined facts and complex relationships'},
          {title: 'Automatic fallback', desc: 'Returns to standard retrieval when SAG finds nothing or errors'},
          {title: 'ColPali fusion', desc: 'Text and visual documents recalled separately, merged by RRF'},
        ],
        value:
          'Not every question needs the heaviest reasoning, but complex ones must have a deeper path available',
        color: 'purple',
      },
      {
        id: 'deep-agent',
        number: '03',
        title: 'Deep Agent for knowledge execution',
        subtitle: 'Not just answers — registers and finished documents',
        description:
          'Deep Agent performs multi-step reading, field extraction and writing inside the user’s authorised scope, turning enterprise documents into verifiable, downloadable and editable work output.',
        features: [
          {title: 'Close reading', desc: 'Browses the table of contents, retrieves body text and cross-checks sections with citations'},
          {title: 'Structured extraction', desc: 'Processes many documents field by field and delivers an Excel register'},
          {title: 'Report generation', desc: 'Streams reports, articles, proposals and scripts from named material'},
          {title: 'Precise task scope', desc: 'Answer mode and @document control the current turn without widening authorisation'},
        ],
        value:
          'The value of enterprise knowledge is not only being found, but becoming work you can carry forward',
        color: 'green',
      },
      {
        id: 'wiki',
        number: '04',
        title: 'LLM Wiki enterprise knowledge graph',
        subtitle: 'From a pile of documents to an explorable network',
        description:
          'LLM Wiki generates a structured encyclopedia from the knowledge base, organising entities, concepts, pages, relations and sources so people can ask, search, browse and follow relationships.',
        features: [
          {title: 'Auto-generated wiki', desc: 'Distils topics, entities, concepts and structured pages from the knowledge base'},
          {title: 'Full-text search', desc: 'Find entities, products, projects and domain concepts directly'},
          {title: 'Cross-page links', desc: 'Readable links connect related pages and upstream or downstream knowledge'},
          {title: 'Relationship graph', desc: 'Visualises how entities relate while keeping source citations'},
        ],
        value:
          'Q&A answers one question; a knowledge graph helps people build a complete picture',
        color: 'green',
      },
      {
        id: 'operations',
        number: '05',
        title: 'A closed knowledge operations loop',
        subtitle: 'From "the documents are loaded" to "the knowledge keeps improving"',
        description:
          'Real questions, retrieval hits and user feedback become observable metrics and knowledge gaps, then AI diagnosis, improvement tasks and reports drive quality up over time.',
        features: [
          {title: 'Operations overview', desc: 'Question volume, active users, effectiveness, feedback and usage trends'},
          {title: 'Knowledge gaps', desc: 'Aggregates misses, low-quality answers and recurring similar questions'},
          {title: 'AI-assisted diagnosis', desc: 'Combines answer feedback and retrieval evidence into actionable fixes'},
          {title: 'Tasks and reports', desc: 'Process improvement tasks in bulk and export operational detail'},
        ],
        value:
          'A knowledge base is not finished at launch — it needs operating against real usage',
        color: 'orange',
      },
      {
        id: 'organization',
        number: '06',
        title: 'Organisations and the knowledge directory tree',
        subtitle: 'Keep knowledge structure aligned with how the company is run',
        description:
          'Build multi-level organisations, members and collaboration groups, then organise many knowledge bases in a directory tree with clear ownership, business boundaries and maintenance responsibility.',
        features: [
          {title: 'Multi-level organisations', desc: 'Model real group, department and team relationships'},
          {title: 'Members and groups', desc: 'Supports both vertical organisations and cross-department projects'},
          {title: 'Directory tree', desc: 'Classify, move and archive knowledge bases in nested folders'},
          {title: 'Unified upkeep', desc: 'Directory planning, import/export and bulk governance'},
        ],
        value:
          'Once knowledge scales, clear ownership and structure matter more than another search box',
        color: 'blue',
      },
      {
        id: 'rbac',
        number: '07',
        title: 'Directory-level pure RBAC',
        subtitle: 'The right knowledge reaches the right people',
        description:
          'The super admin lays out top-level folders and assigns folder managers, who then create knowledge bases and grant access within their own folders. Any directory or knowledge base can be granted to users, organisations or collaboration groups; permissions inherit downward, the highest grant wins, and the same boundary applies to retrieval, management and operational data.',
        features: [
          {title: 'Any grantee', desc: 'Users, organisations and collaboration groups'},
          {title: 'Delegated management', desc: 'Super admin creates top-level folders; folder managers build and grant within them'},
          {title: 'Three permission levels', desc: 'Read-only, edit and manage granted separately'},
          {title: 'Directory inheritance', desc: 'Parent grants apply automatically to sub-folders and knowledge bases'},
          {title: 'One boundary', desc: 'Lists, retrieval, operational detail and exports share the same RBAC scope'},
          {title: 'Integrated entry points', desc: 'WeCom, DingTalk, Feishu and other workplace channels'},
        ],
        value:
          'Permissions are not peripheral configuration — they are the boundary enterprise knowledge lives inside',
        color: 'purple',
      },
    ],
  },
  techSpecs: {
    title: 'Capability matrix',
    subtitle:
      'Parsing, retrieval, knowledge network, operations, governance and self-hosted infrastructure',
    groups: [
      {category: 'Document processing', items: ['MinerU 3.x', 'PaddleOCR', 'Smart', 'Title', 'Regex', 'Parent-Child', 'Page']},
      {category: 'Retrieval engine', items: ['Hybrid retrieval', 'Rerank', 'SAG', 'ColPali', 'RRF', 'DeepRead']},
      {category: 'Knowledge network', items: ['LLM Wiki', 'Full-text search', 'Cross-page links', 'Relation graph', 'Citations']},
      {category: 'Knowledge operations', items: ['Overview', 'Knowledge gaps', 'AI diagnosis', 'Task queue', 'XLSX / CSV']},
      {category: 'Governance', items: ['Organisations', 'Collaboration groups', 'Directory tree', 'Inheritance', 'Pure RBAC']},
      {category: 'Integrations', items: ['WeCom', 'DingTalk', 'Feishu', 'Dify', 'RESTful API', 'SDK']},
      {category: 'Infrastructure', items: ['PostgreSQL', 'Milvus', 'RustFS / MinIO', 'Docker Compose', 'Kubernetes']},
    ],
  },
  comparison: {
    title: 'Not just another RAG chatbot',
    subtitle: 'How KnowFlow differs from conventional document Q&A',
    columns: ['Dimension', 'KnowFlow', 'Conventional approach'],
    rows: [
      {dimension: 'Knowledge unit', knowflow: 'Keeps headings, parent-child hierarchy, tables, images and layout', others: 'Fixed-length splitting that loses structure and context'},
      {dimension: 'Retrieval paths', knowflow: 'Hybrid retrieval, SAG multi-hop and ColPali visual retrieval working together', others: 'Every question shares one vector search path'},
      {dimension: 'Knowledge form', knowflow: 'Beyond Q&A, a searchable and browsable LLM Wiki knowledge graph', others: 'Knowledge stays in a file list and a chat window'},
      {dimension: 'Ongoing operations', knowflow: 'Metrics, knowledge gaps, AI diagnosis, improvement tasks and reports form a loop', others: 'No quality feedback or improvement handle after launch'},
      {dimension: 'Knowledge organisation', knowflow: 'Organisations and a directory tree manage ownership and business boundaries', others: 'Flat knowledge bases that get unmanageable at scale'},
      {dimension: 'Permission governance', knowflow: 'Directories or knowledge bases granted to users, organisations and groups, with inheritance', others: 'Usually single-base or simple member permissions'},
      {dimension: 'Deployment and data', knowflow: 'On-premise and offline deployment, with data and models under your control', others: 'Depends on external cloud services with platform-defined boundaries'},
    ],
  },
  scenarios: {
    title: 'Where it fits',
    subtitle: 'From precise Q&A to complex research and group-wide governance',
    items: [
      {
        title: 'Policies, contracts and technical material',
        description:
          'Sections, clauses, tables and context are preserved, so structure-aware RAG gives stable, accurate, traceable answers.',
        highlights: ['Structure parsing', 'Parent-child chunking', 'Source citations'],
        color: 'blue',
      },
      {
        title: 'Complex research and multi-hop questions',
        description:
          'SAG performs cross-document retrieval and step-by-step verification for questions that combine facts or trace relationships.',
        highlights: ['SAG', 'Multi-step retrieval', 'Automatic fallback'],
        color: 'purple',
      },
      {
        title: 'Company encyclopedia and knowledge network',
        description:
          'LLM Wiki captures entities, concepts and relationships into a searchable, browsable and explorable knowledge graph.',
        highlights: ['LLM Wiki', 'Full-text search', 'Relation graph'],
        color: 'green',
      },
      {
        title: 'Group-wide, multi-department governance',
        description:
          'Organisations, the directory tree and directory-level RBAC manage complex boundaries while the operations loop keeps quality improving.',
        highlights: ['Organisations', 'Directory grants', 'Knowledge operations'],
        color: 'orange',
      },
    ],
  },
  cta: {
    title: 'Validate KnowFlow against your real knowledge estate',
    subtitle:
      'Bring your documents, typical questions, organisation structure and permission rules, and evaluate the full loop with us',
    primary: 'Request a demo',
    secondary: 'Read the docs',
  },
};

export const productContent: LocalizedContent<ProductContent> = {
  'zh-Hans': zhHans,
  en,
};
