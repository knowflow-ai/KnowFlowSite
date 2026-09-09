import type {LocalizedContent} from '../i18n/useLocaleContent';

/**
 * 智能问数产品页文案。
 *
 * 组件只负责排版，全部文字集中在这里，按语言分组。
 */

export type AnalyticsContent = {
  readonly meta: {readonly title: string; readonly description: string};
  readonly hero: {
    readonly badge: string;
    readonly titleLead: string;
    readonly titleAccent: string;
    readonly subtitle: readonly string[];
    readonly highlights: readonly string[];
    readonly primaryCta: string;
    readonly secondaryCta: string;
  };
  readonly problem: {
    readonly title: string;
    readonly subtitle: string;
    readonly lead: string;
    readonly pains: readonly {readonly title: string; readonly desc: string}[];
    readonly quote: string;
  };
  readonly pipeline: {
    readonly title: string;
    readonly subtitle: string;
    readonly stages: readonly {
      readonly name: string;
      readonly role: string;
      readonly detail: string;
    }[];
    readonly footnote: string;
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
  readonly matrix: {
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
  readonly gallery: {
    readonly title: string;
    readonly subtitle: string;
    readonly shots: readonly {
      readonly src: string;
      readonly caption: string;
      readonly alt: string;
    }[];
  };
  readonly accuracy: {
    readonly title: string;
    readonly subtitle: string;
    readonly columns: readonly [string, string, string, string];
    readonly rows: readonly [string, string, string, string][];
    readonly note: string;
  };
  readonly editions: {
    readonly title: string;
    readonly subtitle: string;
    readonly columns: readonly [string, string, string];
    readonly rows: readonly {
      readonly feature: string;
      readonly oss: boolean;
      readonly pro: boolean;
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

const zhHans: AnalyticsContent = {
  meta: {
    title: '智能问数 - KnowFlow 企业语义层与受治理问数引擎',
    description:
      'KnowFlow 智能问数用可版本化的语义层替代 Prompt 拼装：LLM 只生成业务名 S2SQL，物理 SQL 由确定性编译器生成，保证口径一致、可审计、不出现静默错答。支持 PostgreSQL、MySQL 与 Excel，可私有化部署。',
  },
  hero: {
    badge: 'SEMANTIC LAYER FOR AI',
    titleLead: '业务语义不该困在',
    titleAccent: 'Prompt 里',
    subtitle: [
      '把指标、维度、业务术语和 Join 口径沉淀成可审核、可版本化的语义模型，',
      '让业务同事用中文提问，让 Agent、报表和 API 共用同一套口径',
    ],
    highlights: ['受治理语义层', 'S2SQL 确定性编译', '只读执行边界', '零静默错答'],
    primaryCta: '申请问数演示',
    secondaryCta: '查看问数文档',
  },
  problem: {
    title: '让模型写出一条能跑的 SQL 早就不难了',
    subtitle: '难的是它每次都指向同一个业务口径',
    lead:
      '典型做法是把表结构、字段注释和几条 SQL 样例拼进 Prompt，让模型直接生成物理 SQL。它适合快速验证，却会在业务扩大后失控。',
    pains: [
      {
        title: '口径散落各处',
        desc: '同一个「销售额」，可能写在三个 Agent 的三份 Prompt 里，很快产生口径漂移。',
      },
      {
        title: 'Join 路径每次重猜',
        desc: '同一张订单表，在不同问题里可能被模型选出不同的 Join 路径，金额悄悄翻倍。',
      },
      {
        title: 'Schema 一改就漂移',
        desc: '一个新字段进入 Schema，就可能无意间改变线上查询的范围与结果。',
      },
      {
        title: '修复无法迁移',
        desc: '补一条 Few-shot 通常只修复相近问法，换个表达或换个模型，问题又会回来。',
      },
    ],
    quote:
      '最危险的不是答不出来。拒答和澄清对用户可见，而一个看起来正常的错误数字不可见。',
  },
  pipeline: {
    title: 'LLM 理解意图，编译器负责正确执行',
    subtitle: '完整查询依次经过五个阶段，任何一步无法证明安全就不进数据库',
    stages: [
      {
        name: 'Mapper',
        role: '说法映射',
        detail: '把自然语言映射到已发布的业务名，依赖业务词典与语义索引',
      },
      {
        name: 'Parser',
        role: '生成 S2SQL',
        detail: '只输出业务名，不出现任何物理表名、列名和 Join 语句',
      },
      {
        name: 'Corrector',
        role: '治理校验',
        detail: '校验成员、过滤值、聚合口径与人工确认义务是否全部落实',
      },
      {
        name: 'Translator',
        role: '确定性编译',
        detail: '绑定冻结的安全 Join 路径，编译出参数化物理 SQL',
      },
      {
        name: 'Guard',
        role: '执行边界',
        detail: '只读 AST 白名单、结果行数上限与执行超时，只读事务访问数据库',
      },
    ],
    footnote:
      '模型提议、编译器裁定——校验比选择容易。更换 Chat 模型不会顺带改变业务口径。',
  },
  capabilities: {
    title: '六大核心能力',
    subtitle: '从语义建模、发布治理，到问数、诊断与反馈回流的完整闭环',
    items: [
      {
        id: 'catalog',
        number: '01',
        title: '统一语义目录',
        subtitle: '业务定义是模型数据，不是 Prompt 附件',
        description:
          '目录包含 Model、Relation、Metric、Dimension、Term 和 DimensionValue。业务名称、别名、指标公式、默认聚合、可加性、时间轴和真实维度值全部作为受治理资源维护。',
        features: [
          {title: '原子与派生指标', desc: '公式、默认聚合、展示格式与半可加约束逐项定义'},
          {title: '指标时间轴', desc: '明确每个指标按哪个时间字段做同比、环比与时间过滤'},
          {title: '业务词典', desc: '「营收」「流水」「GMV」映射到同一个受治理指标'},
          {title: '真实值字典', desc: '低基数维度采样真实取值，让「华东区」被正确识别'},
        ],
        value: '同一份 Release 服务问数页、Agent、结构化 API 与回归评测，口径始终一致',
        color: 'blue',
      },
      {
        id: 'ai-modeling',
        number: '02',
        title: 'AI 建模，人工掌握发布',
        subtitle: 'AI 提高效率，但产出始终是可逐项审核的草案',
        description:
          'AI 可以生成实体命名、字段角色、指标与维度草案和别名建议。所有建议先进入 Candidate Revision，覆盖人工内容的建议默认不选中，必须经过审核才会生效。',
        features: [
          {title: '实体与字段命名', desc: '把 t_ord_mst 这类物理表名映射成可读的业务实体'},
          {title: '关系画布', desc: '在画布上人工确认实体关系与 Join 基数，避免聚合扇出'},
          {title: '结构校验', desc: '检查指标引用、维度绑定、路径合法性与时间轴可用性'},
          {title: '真实数据质量报告', desc: '用只读查询验证主标识唯一性、基数、扇出与可达性'},
        ],
        value: '结构校验通过不代表模型对，只有真实数据能暴露基数与扇出问题',
        color: 'purple',
      },
      {
        id: 'compile',
        number: '03',
        title: 'S2SQL 确定性编译',
        subtitle: 'LLM 不生成最终 SQL，编译器才决定怎么查',
        description:
          '作用域不在提问时由路由器挑选，而是生成后确定性反推：模型写出业务名 S2SQL，编译器逐个真实作用域尝试翻译——恰好一个成功即绑定，零个说明跨了事实根，多个则按粒度收敛取最粗。',
        features: [
          {title: '冻结 Join 路径', desc: '发布时冻结从事实根出发的安全路径，线上不临时推断'},
          {title: '参数化 SQL', desc: '物理 SQL 全部参数化，不做字符串拼接'},
          {title: '高级查询形态', desc: '集合运算、同比环比、滚动比率、组内占比、每组取前 N'},
          {title: 'Fail closed', desc: '成员、路径或版本无法证明安全时拒绝执行，而非继续查库'},
        ],
        value: '把规则交给确定性编译器后，换模型不改口径，Agent 也不需要知道物理表名',
        color: 'green',
      },
      {
        id: 'ask',
        number: '04',
        title: '面向业务用户的问数体验',
        subtitle: '回答里写清系统怎么理解的，而不是默默替用户决定',
        description:
          '业务同事直接用中文提问，系统按阶段流式推送进度，回答卡上以「理解 chip」显示补上的理解，下面可以继续追问和下钻。',
        features: [
          {title: '系统理解说明', desc: '把「销售」认成销售金额这类推断显式说出来'},
          {title: '默认时间窗可见可撤', desc: '补上的时间范围在回答上可见，可一键改回不限时间'},
          {title: '确定性下钻', desc: '在文本 S2SQL 上换过滤值、维度、指标或时间窗，形状不支持则明确拒绝'},
          {title: '报表沉淀', desc: '满意的回答钉成卡片按项目归档，可刷新重跑并导出 Excel'},
        ],
        value: '业务人员需要确认的永远是业务含义，不是内部执行计划',
        color: 'blue',
      },
      {
        id: 'diagnostics',
        number: '05',
        title: '固定阶段诊断与可观测性',
        subtitle: '让问数系统能像普通软件一样测试和定位',
        description:
          '每次查询都有固定阶段的时间线，可以定位问题发生在映射、解析、校正、翻译还是执行，并导出脱敏 Markdown 报告。',
        features: [
          {title: '阶段时间线', desc: '每个阶段的真实耗时一目了然，排障从猜测变成定位'},
          {title: '模型调用明细', desc: '每次模型与向量调用的用途、尝试次数、耗时与 prompt 规模'},
          {title: '脱敏导出', desc: '自动脱敏密码、API key、连接串凭据与确认 token'},
          {title: 'Golden Suite', desc: '用真实问题建立回归集，发布前验证本次改动是否让老问题退化'},
        ],
        value: '同样一句「答不出来」，在 Mapper 失败要补词典，在 Translator 失败要改模型',
        color: 'orange',
      },
      {
        id: 'feedback',
        number: '06',
        title: '词汇缺口回流闭环',
        subtitle: '问不出来的说法不会就这么算了',
        description:
          '拒答、澄清、模型自己猜的成员、不认识的取值，以及用户的点赞点踩，都进同一个收件箱，按说法聚合后回流到建模端。',
        features: [
          {title: '六类信号收敛', desc: '拒答、澄清、模型猜测、取值不认识、点赞、点踩'},
          {title: '按说法聚合', desc: '按真实短语聚合并统计频次，优先修高频问题'},
          {title: '一键补词典', desc: '直接把缺口补进业务词典，发布后对所有入口生效'},
          {title: '不可变版本绑定', desc: '失败记录与质量报告绑定同一 Revision / Release'},
        ],
        value: '词典是可审核、可发布、对所有人生效的语义资源；一条记忆不是',
        color: 'purple',
      },
    ],
  },
  matrix: {
    title: '能力矩阵',
    subtitle: '覆盖数据源、建模、编译、治理、诊断与私有化部署',
    groups: [
      {category: '数据源', items: ['PostgreSQL', 'MySQL', 'Excel 上传', '多数据源', '按项目绑定']},
      {category: '数据建模', items: ['Schema 快照', '漂移检测', '关系画布', '基数确认', 'SQL Model']},
      {category: 'AI 建模', items: ['实体命名', '角色分类', '指标草案', '别名建议', '值字典建议']},
      {category: '查询编译', items: ['S2SQL', '冻结路径', '参数化 SQL', '只读 Guard', '粒度收敛']},
      {category: '高级查询', items: ['Set operations', '同比 / 环比', '滚动比率', '组内占比', '每组 Top-N']},
      {category: '版本治理', items: ['Revision', 'ETag', '不可变 Release', '语义索引绑定', '版本回滚']},
      {category: '质量保障', items: ['双模式 Playground', 'Golden Suite', '数据质量报告', '阶段诊断', '脱敏导出']},
      {category: '部署形态', items: ['Docker Compose', '独立 Web UI', 'OpenAI 兼容端点', '内网自托管模型', '离线部署']},
    ],
  },
  comparison: {
    title: '语义层，而不是更长的 Prompt',
    subtitle: '同样一句自然语言提问，两种做法在关键环节上的差别',
    columns: ['关注点', 'KnowFlow 智能问数', '直接 Text-to-SQL'],
    rows: [
      {
        dimension: '业务定义',
        knowflow: '指标、维度、术语和值字典进入版本化 Catalog',
        others: '写在 Prompt、文档片段或 Few-shot 中',
      },
      {
        dimension: 'Join 与粒度',
        knowflow: '人工确认关系基数，发布时冻结安全路径和事实根',
        others: '模型根据 Schema 临时推断',
      },
      {
        dimension: 'SQL 生成',
        knowflow: 'LLM 输出业务名 S2SQL，编译器生成参数化物理 SQL',
        others: 'LLM 直接输出物理 SQL',
      },
      {
        dimension: '歧义处理',
        knowflow: '展示业务候选并要求确认，选择必须真的被用上',
        others: '改 Prompt、增加样例或静默选一个',
      },
      {
        dimension: '复用范围',
        knowflow: '同一 Release 服务 Agent、UI、API、评测与数据应用',
        others: '通常绑定某个 Agent 或问数入口',
      },
      {
        dimension: '变更控制',
        knowflow: 'Candidate Revision 审核、校验、发布、回滚',
        others: 'Prompt 修改后整体行为可能漂移',
      },
      {
        dimension: '失败策略',
        knowflow: '成员、路径、聚合或版本无法证明时 fail closed',
        others: 'SQL 语法合法就可能执行',
      },
    ],
  },
  gallery: {
    title: '产品界面',
    subtitle: '从数据源接入、语义建模，到问数与一键诊断',
    shots: [
      {
        src: '/img/analytics/product-data-source.png',
        caption: '选择需要进入语义模型的业务数据表',
        alt: 'KnowFlow 智能问数数据源页面：勾选进入语义层的业务表',
      },
      {
        src: '/img/analytics/product-semantic-model.png',
        caption: '在关系画布中确认实体、Join 路径与关系基数',
        alt: 'KnowFlow 智能问数关系画布：确认实体关系与 Join 基数',
      },
      {
        src: '/img/analytics/product-business-dictionary.png',
        caption: '维护业务术语与维度值字典',
        alt: 'KnowFlow 智能问数业务词典页面：术语与维度值映射',
      },
      {
        src: '/img/analytics/commercial-ask-assistant.png',
        caption: '问数助手：理解 chip、图表、数据表与下钻',
        alt: 'KnowFlow 智能问数问数助手：中文提问与图表结果',
      },
      {
        src: '/img/analytics/product-query-diagnostics.png',
        caption: '一键诊断展示完整查询阶段并支持脱敏导出',
        alt: 'KnowFlow 智能问数一键诊断：查询阶段时间线',
      },
      {
        src: '/img/analytics/commercial-reports.png',
        caption: '把回答钉成卡片，按项目归档成可刷新的报表',
        alt: 'KnowFlow 智能问数报表页面：钉住的问数结果卡片',
      },
    ],
  },
  accuracy: {
    title: '准确性，不只是「有多少题返回了结果」',
    subtitle:
      '走与浏览器相同的鉴权 API，从原始数据库导入、建模、发布到隐藏问题试问，逐行比对参考 SQL 结果',
    columns: ['数据集', '正确题数', '准确率', '静默错答'],
    rows: [
      ['电商集', '12 / 12', '100%', '0'],
      ['城市与图书馆集', '11 / 12', '91.7%', '0'],
      ['音乐 Holdout 集', '9 / 12', '75%', '0'],
      ['合计', '32 / 36', '88.9%', '0'],
    ],
    note:
      '这是特定数据集上的对照实验，不是通用 Text-to-SQL 基准结论。我们公开它，是为了说明评测走的是用户实际经历的完整链路，而不是绕过建模与发布流程直接向组件灌入整理好的语义数据。',
  },
  editions: {
    title: '开源版与商业版',
    subtitle: '两者共用同一份语义模型与同一个查询引擎',
    columns: ['能力', '开源版', '商业版'],
    rows: [
      {feature: '建模工作台（数据源、语义建模、问数验证、问数反馈）', oss: true, pro: true},
      {feature: 'AI 一键建模、别名与值字典建议', oss: true, pro: true},
      {feature: '发布、版本回滚、发布前质量报告', oss: true, pro: true},
      {feature: 'S2SQL 编译、治理关卡、只读 Guard、查询 API', oss: true, pro: true},
      {feature: 'PostgreSQL / MySQL / 上传表格，多数据源', oss: true, pro: true},
      {feature: '词汇缺口收件箱、Golden Suite、诊断导出', oss: true, pro: true},
      {feature: '问数助手：对话式提问、多轮追问、下钻、结果解读', oss: false, pro: true},
      {feature: '报表：钉成卡片、按项目归档、刷新重跑、导出 Excel', oss: false, pro: true},
      {feature: '项目授权与数据范围：多用户 RBAC、行级与列级权限', oss: false, pro: true},
      {feature: '与知识库、Agent、企业账号体系打通', oss: false, pro: true},
      {feature: '企业账号、LDAP / OIDC、企业微信登录', oss: false, pro: true},
    ],
  },
  scenarios: {
    title: '典型应用场景',
    subtitle: '从业务自助分析，到 Agent 与嵌入式数据应用',
    items: [
      {
        title: '业务自助问数',
        description:
          '业务同事不写 SQL、不等排期，直接用中文问经营数据，回答带系统理解说明并可继续下钻。',
        highlights: ['中文提问', '理解可见', '确定性下钻'],
        color: 'blue',
      },
      {
        title: 'AI Agent 数据工具',
        description:
          'Agent 通过资源 API 获取业务定义并发起受治理查询，不需要自己拼物理表、列和 Join。',
        highlights: ['资源 API', '受治理查询', '口径一致'],
        color: 'purple',
      },
      {
        title: '经营报表与日常复盘',
        description:
          '把稳定的问数结果钉成报表卡片，按项目归档，随时刷新取最新数字并整页导出 Excel。',
        highlights: ['报表卡片', '刷新重跑', 'Excel 导出'],
        color: 'green',
      },
      {
        title: '嵌入式数据应用',
        description:
          '业务系统把智能问数作为独立查询后端，复用同一套指标定义与权限边界，不重复建模。',
        highlights: ['结构化查询', '统一口径', '权限边界'],
        color: 'orange',
      },
    ],
  },
  cta: {
    title: '用你自己的业务库验证问数效果',
    subtitle: '带上真实的表结构、业务口径和典型问题，一起跑一轮完整的建模到问数链路',
    primary: '申请问数演示',
    secondary: '查看问数文档',
  },
};

const en: AnalyticsContent = {
  meta: {
    title: 'Analytics - Governed semantic layer and query engine',
    description:
      'KnowFlow Analytics replaces prompt stuffing with a versioned semantic layer. The LLM only writes business-name S2SQL; physical SQL is compiled deterministically, so metrics stay consistent, auditable, and free of silent wrong answers. Supports PostgreSQL, MySQL and Excel, deployable on-premise.',
  },
  hero: {
    badge: 'SEMANTIC LAYER FOR AI',
    titleLead: 'Business semantics do not belong',
    titleAccent: 'inside a prompt',
    subtitle: [
      'Metrics, dimensions, business terms and join semantics become a reviewable, versioned model —',
      'so business users can ask in plain language while agents, reports and APIs share one definition',
    ],
    highlights: [
      'Governed semantic layer',
      'Deterministic S2SQL compilation',
      'Read-only execution guard',
      'Zero silent wrong answers',
    ],
    primaryCta: 'Request a demo',
    secondaryCta: 'Read the docs',
  },
  problem: {
    title: 'Getting a model to write runnable SQL stopped being hard',
    subtitle: 'Getting it to mean the same thing every time is the hard part',
    lead:
      'The usual approach stuffs schema, column comments and a few SQL examples into a prompt and lets the model emit physical SQL. It validates quickly, then drifts as the business grows.',
    pains: [
      {
        title: 'Definitions scattered everywhere',
        desc: 'One "revenue" can live in three prompts across three agents, and they drift apart fast.',
      },
      {
        title: 'Join paths re-guessed each time',
        desc: 'The same orders table can be joined differently per question, quietly doubling amounts.',
      },
      {
        title: 'Schema changes shift results',
        desc: 'A single new column can silently change what a production query covers.',
      },
      {
        title: 'Fixes do not transfer',
        desc: 'A new few-shot example usually fixes one phrasing. Reword it, or swap models, and it returns.',
      },
    ],
    quote:
      'The dangerous failure is not "no answer". Refusals and clarifications are visible to the user; a plausible-looking wrong number is not.',
  },
  pipeline: {
    title: 'The LLM reads intent; the compiler decides execution',
    subtitle:
      'Every query passes five stages. If any step cannot prove safety, it never reaches the database.',
    stages: [
      {
        name: 'Mapper',
        role: 'Phrase mapping',
        detail: 'Maps natural language onto published business names via the dictionary and semantic index',
      },
      {
        name: 'Parser',
        role: 'S2SQL generation',
        detail: 'Emits business names only — no physical tables, columns or join clauses',
      },
      {
        name: 'Corrector',
        role: 'Governance checks',
        detail: 'Verifies members, filter values, aggregation and that every confirmation was honoured',
      },
      {
        name: 'Translator',
        role: 'Deterministic compile',
        detail: 'Binds frozen safe join paths and compiles parameterised physical SQL',
      },
      {
        name: 'Guard',
        role: 'Execution boundary',
        detail: 'Read-only AST allowlist, row cap and timeout, executed in a read-only transaction',
      },
    ],
    footnote:
      'The model proposes, the compiler decides — verifying is easier than choosing. Swapping the chat model never changes a metric definition.',
  },
  capabilities: {
    title: 'Six core capabilities',
    subtitle:
      'From semantic modelling and release governance to querying, diagnostics and feedback loops',
    items: [
      {
        id: 'catalog',
        number: '01',
        title: 'One governed semantic catalog',
        subtitle: 'Business definitions are model data, not prompt attachments',
        description:
          'The catalog holds Model, Relation, Metric, Dimension, Term and DimensionValue. Names, aliases, formulas, default aggregations, additivity, time axes and real dimension values are all governed resources.',
        features: [
          {title: 'Atomic and derived metrics', desc: 'Formula, default aggregation, display format and semi-additive constraints'},
          {title: 'Metric time axis', desc: 'Each metric declares the time column used for filters and period comparisons'},
          {title: 'Business dictionary', desc: '"Revenue", "turnover" and "GMV" resolve to the same governed metric'},
          {title: 'Real value dictionary', desc: 'Sampled low-cardinality values so "East China" is recognised correctly'},
        ],
        value: 'One release serves the ask page, agents, structured APIs and regression suites alike',
        color: 'blue',
      },
      {
        id: 'ai-modeling',
        number: '02',
        title: 'AI drafts, humans publish',
        subtitle: 'AI speeds modelling up, but output is always a reviewable draft',
        description:
          'AI proposes entity names, field roles, metric and dimension drafts and aliases. Every suggestion lands in a Candidate Revision; anything overwriting human work is unchecked by default.',
        features: [
          {title: 'Entity and field naming', desc: 'Turns physical names like t_ord_mst into readable business entities'},
          {title: 'Relationship canvas', desc: 'Humans confirm relationships and join cardinality to prevent fan-out'},
          {title: 'Structural validation', desc: 'Checks metric references, dimension bindings, path validity and time axes'},
          {title: 'Real-data quality report', desc: 'Read-only queries verify key uniqueness, cardinality, fan-out and reachability'},
        ],
        value: 'Passing structural validation does not mean the model is right — only real data exposes fan-out',
        color: 'purple',
      },
      {
        id: 'compile',
        number: '03',
        title: 'Deterministic S2SQL compilation',
        subtitle: 'The LLM never writes the final SQL',
        description:
          'Scope is not picked by a router up front. The model writes business-name S2SQL and the compiler tries each real scope: exactly one success binds it, zero means the question crossed fact roots, several converge to the coarsest grain.',
        features: [
          {title: 'Frozen join paths', desc: 'Safe paths from each fact root are frozen at publish time, never inferred live'},
          {title: 'Parameterised SQL', desc: 'Physical SQL is always parameterised — never string concatenation'},
          {title: 'Advanced query shapes', desc: 'Set operations, period comparisons, rolling ratios, share-of-group, top-N per group'},
          {title: 'Fail closed', desc: 'If members, paths or versions cannot be proven safe, the query is refused'},
        ],
        value: 'With rules in a deterministic compiler, agents never need to know a physical table name',
        color: 'green',
      },
      {
        id: 'ask',
        number: '04',
        title: 'An answer surface built for business users',
        subtitle: 'The system states how it read your question instead of deciding silently',
        description:
          'Colleagues ask in plain language, stages stream as they complete, and the answer card shows the assumptions the system filled in. Follow-up questions and drill-downs continue from there.',
        features: [
          {title: 'Interpretation chips', desc: 'Inferences like reading "sales" as sales amount are stated explicitly'},
          {title: 'Visible, revocable time window', desc: 'A default window is shown on the answer and can be cleared in one click'},
          {title: 'Deterministic drill-down', desc: 'Edits filters, dimensions, metrics or windows — or refuses rather than degrading silently'},
          {title: 'Pin to reports', desc: 'Good answers become cards, archived per project, refreshable and exportable to Excel'},
        ],
        value: 'What a business user confirms should always be meaning, never an internal execution plan',
        color: 'blue',
      },
      {
        id: 'diagnostics',
        number: '05',
        title: 'Fixed-stage diagnostics',
        subtitle: 'An ask-your-data system you can test and debug like normal software',
        description:
          'Every query produces a fixed-stage timeline showing whether the failure happened in mapping, parsing, correction, translation or execution, exportable as redacted Markdown.',
        features: [
          {title: 'Stage timeline', desc: 'Real timings per stage turn triage from guesswork into location'},
          {title: 'Model call details', desc: 'Purpose, attempts, latency and prompt size for every model and vector call'},
          {title: 'Redacted export', desc: 'Passwords, API keys, connection credentials and tokens are stripped automatically'},
          {title: 'Golden Suite', desc: 'Build regression sets from real questions to catch regressions before publishing'},
        ],
        value: 'The same "it cannot answer" means add dictionary entries in Mapper, or fix the model in Translator',
        color: 'orange',
      },
      {
        id: 'feedback',
        number: '06',
        title: 'Vocabulary gaps flow back into the model',
        subtitle: 'Phrases the system could not catch are not simply lost',
        description:
          'Refusals, clarifications, model guesses, unknown values and thumbs up or down all land in one inbox, aggregated by phrase and fed back into modelling.',
        features: [
          {title: 'Six signal types', desc: 'Refusal, clarification, model guess, unknown value, upvote, downvote'},
          {title: 'Aggregated by phrase', desc: 'Grouped by the actual wording and counted, so frequent gaps get fixed first'},
          {title: 'One-click dictionary entry', desc: 'Publish the fix once and it applies to every entry point'},
          {title: 'Version-bound records', desc: 'Failures and quality reports bind to the same revision and release'},
        ],
        value: 'A dictionary entry is reviewable, publishable and applies to everyone; a memory is none of those',
        color: 'purple',
      },
    ],
  },
  matrix: {
    title: 'Capability matrix',
    subtitle: 'Data sources, modelling, compilation, governance, diagnostics and self-hosting',
    groups: [
      {category: 'Data sources', items: ['PostgreSQL', 'MySQL', 'Excel upload', 'Multi-source', 'Per-project binding']},
      {category: 'Modelling', items: ['Schema snapshot', 'Drift detection', 'Relationship canvas', 'Cardinality review', 'SQL Model']},
      {category: 'AI assistance', items: ['Entity naming', 'Role classification', 'Metric drafts', 'Alias suggestions', 'Value dictionary']},
      {category: 'Compilation', items: ['S2SQL', 'Frozen paths', 'Parameterised SQL', 'Read-only guard', 'Grain convergence']},
      {category: 'Advanced queries', items: ['Set operations', 'Period comparison', 'Rolling ratios', 'Share of group', 'Top-N per group']},
      {category: 'Version control', items: ['Revision', 'ETag', 'Immutable release', 'Semantic index binding', 'Rollback']},
      {category: 'Quality', items: ['Dual playgrounds', 'Golden Suite', 'Data quality report', 'Stage diagnostics', 'Redacted export']},
      {category: 'Deployment', items: ['Docker Compose', 'Standalone web UI', 'OpenAI-compatible endpoints', 'Self-hosted models', 'Offline install']},
    ],
  },
  comparison: {
    title: 'A semantic layer, not a longer prompt',
    subtitle: 'Where the two approaches diverge on the same natural-language question',
    columns: ['Concern', 'KnowFlow Analytics', 'Direct Text-to-SQL'],
    rows: [
      {
        dimension: 'Business definitions',
        knowflow: 'Metrics, dimensions, terms and value dictionaries live in a versioned catalog',
        others: 'Written into prompts, doc snippets or few-shot examples',
      },
      {
        dimension: 'Joins and grain',
        knowflow: 'Cardinality confirmed by humans; safe paths and fact roots frozen at publish',
        others: 'Inferred by the model from schema, per question',
      },
      {
        dimension: 'SQL generation',
        knowflow: 'LLM emits business-name S2SQL; the compiler produces parameterised SQL',
        others: 'The LLM emits physical SQL directly',
      },
      {
        dimension: 'Ambiguity',
        knowflow: 'Business candidates are shown for confirmation, and the choice must be used',
        others: 'Edit the prompt, add examples, or silently pick one',
      },
      {
        dimension: 'Reuse',
        knowflow: 'One release serves agents, UI, APIs, evaluation and data apps',
        others: 'Usually bound to a single agent or entry point',
      },
      {
        dimension: 'Change control',
        knowflow: 'Candidate revision, review, validation, publish, rollback',
        others: 'Editing a prompt can shift behaviour everywhere',
      },
      {
        dimension: 'Failure policy',
        knowflow: 'Fails closed when members, paths, aggregation or version cannot be proven',
        others: 'Syntactically valid SQL may simply run',
      },
    ],
  },
  gallery: {
    title: 'Product screens',
    subtitle: 'From connecting a source and modelling semantics to asking and diagnosing',
    shots: [
      {
        src: '/img/analytics/product-data-source.png',
        caption: 'Select the business tables that enter the semantic model',
        alt: 'KnowFlow Analytics data source page: selecting tables for the semantic layer',
      },
      {
        src: '/img/analytics/product-semantic-model.png',
        caption: 'Confirm entities, join paths and cardinality on the relationship canvas',
        alt: 'KnowFlow Analytics relationship canvas: confirming entities and join cardinality',
      },
      {
        src: '/img/analytics/product-business-dictionary.png',
        caption: 'Maintain business terms and the dimension value dictionary',
        alt: 'KnowFlow Analytics business dictionary: term and dimension value mapping',
      },
      {
        src: '/img/analytics/commercial-ask-assistant.png',
        caption: 'The ask assistant: interpretation chips, charts, tables and drill-down',
        alt: 'KnowFlow Analytics ask assistant: natural language question with chart result',
      },
      {
        src: '/img/analytics/product-query-diagnostics.png',
        caption: 'One-click diagnostics with the full stage timeline and redacted export',
        alt: 'KnowFlow Analytics diagnostics: query stage timeline',
      },
      {
        src: '/img/analytics/commercial-reports.png',
        caption: 'Pin answers as cards and archive them into refreshable reports',
        alt: 'KnowFlow Analytics reports page: pinned query result cards',
      },
    ],
  },
  accuracy: {
    title: 'Accuracy is more than "how many returned a result"',
    subtitle:
      'Runs the same authenticated API a browser uses: import, model, publish, load held-out questions, ask, then compare row by row against reference SQL',
    columns: ['Dataset', 'Correct', 'Accuracy', 'Silent wrong answers'],
    rows: [
      ['E-commerce', '12 / 12', '100%', '0'],
      ['Cities & libraries', '11 / 12', '91.7%', '0'],
      ['Music (holdout)', '9 / 12', '75%', '0'],
      ['Total', '32 / 36', '88.9%', '0'],
    ],
    note:
      'This is a controlled experiment on specific datasets, not a general Text-to-SQL benchmark result. We publish it to show the evaluation runs the full path a user actually experiences, rather than feeding curated semantics straight into components.',
  },
  editions: {
    title: 'Open source and commercial',
    subtitle: 'Both run the same semantic model on the same query engine',
    columns: ['Capability', 'Open source', 'Commercial'],
    rows: [
      {feature: 'Modelling workbench (sources, modelling, validation, feedback)', oss: true, pro: true},
      {feature: 'AI-assisted modelling, alias and value dictionary suggestions', oss: true, pro: true},
      {feature: 'Publishing, rollback and pre-publish quality reports', oss: true, pro: true},
      {feature: 'S2SQL compilation, governance gates, read-only guard, query API', oss: true, pro: true},
      {feature: 'PostgreSQL / MySQL / uploaded tables, multiple sources', oss: true, pro: true},
      {feature: 'Vocabulary gap inbox, Golden Suite, diagnostics export', oss: true, pro: true},
      {feature: 'Ask assistant: conversational questions, follow-ups, drill-down', oss: false, pro: true},
      {feature: 'Reports: pinned cards, per-project archive, refresh, Excel export', oss: false, pro: true},
      {feature: 'Project authorisation and data scope: multi-user RBAC, row/column rules', oss: false, pro: true},
      {feature: 'Integration with the knowledge base, agents and enterprise accounts', oss: false, pro: true},
      {feature: 'Enterprise accounts, LDAP / OIDC, WeCom sign-in', oss: false, pro: true},
    ],
  },
  scenarios: {
    title: 'Where teams use it',
    subtitle: 'From business self-service to agents and embedded data apps',
    items: [
      {
        title: 'Business self-service',
        description:
          'Colleagues ask about operating data in plain language without writing SQL or waiting on a queue, and can drill down from the answer.',
        highlights: ['Plain language', 'Visible reasoning', 'Deterministic drill-down'],
        color: 'blue',
      },
      {
        title: 'Data tooling for AI agents',
        description:
          'Agents fetch business definitions through the resource API and issue governed queries without assembling tables, columns or joins.',
        highlights: ['Resource API', 'Governed queries', 'Consistent metrics'],
        color: 'purple',
      },
      {
        title: 'Operating reports and reviews',
        description:
          'Stable answers become report cards archived per project, refreshed on demand and exported to Excel as a full page.',
        highlights: ['Report cards', 'Refresh on demand', 'Excel export'],
        color: 'green',
      },
      {
        title: 'Embedded data applications',
        description:
          'Product teams use Analytics as a standalone query backend, reusing one set of metric definitions and permission boundaries.',
        highlights: ['Structured queries', 'One definition', 'Permission boundary'],
        color: 'orange',
      },
    ],
  },
  cta: {
    title: 'Validate it against your own database',
    subtitle:
      'Bring your real schema, your metric definitions and your typical questions, and run one full modelling-to-answer cycle with us',
    primary: 'Request a demo',
    secondary: 'Read the docs',
  },
};

export const analyticsContent: LocalizedContent<AnalyticsContent> = {
  'zh-Hans': zhHans,
  en,
};
