import type {LocalizedContent} from '../../i18n/useLocaleContent';

/**
 * 产品页「所有功能明细」表格数据。
 *
 * 条目多且更新频繁，单独成文件，避免和产品页其余文案挤在一起。
 */

export type FeatureCatalogItem = {
  readonly name: string;
  readonly description: string;
  readonly href: string;
};

export type FeatureCatalogGroup = {
  readonly category: string;
  readonly items: readonly FeatureCatalogItem[];
};

export type FeatureCatalogContent = {
  readonly title: string;
  readonly subtitle: string;
  readonly columns: readonly [string, string, string, string];
  readonly countSuffix: string;
  readonly docLink: string;
  readonly docLinkAria: string;
  readonly note: string;
  readonly groups: readonly FeatureCatalogGroup[];
};

const zhHans: FeatureCatalogContent = {
  title: '所有功能明细',
  subtitle: '按业务环节汇总当前产品能力，具体配置和使用方式可继续查看对应文档',
  columns: ['功能分类', '功能模块', '功能说明', '使用文档'],
  countSuffix: ' 项',
  docLink: '查看文档',
  docLinkAria: '查看{name}文档',
  note: '部分能力需要独立服务、特定模型或可选部署组件，实际可用范围以对应文档和部署配置为准。',
  groups: [
    {
      category: '文档解析与分块',
      items: [
        {name: '多格式文档处理', description: '支持 PDF、Word、Excel、PPT、Markdown、图片和视频等企业常见资料，解析任务异步执行。', href: '/docs/intro'},
        {name: 'MinerU / PaddleOCR', description: '解析扫描件、复杂版式、表格、公式和图片，保留标题、页码与原文坐标。', href: '/docs/intro'},
        {name: 'MinerU-Popo 结构增强', description: '可选增强标题层级、章节关系、跨页表格和图片上下文，失败时自动回退到原始 MinerU 结果。', href: '/docs/product-usage/document-parsing/mineru-popo'},
        {name: '五种分块策略', description: '提供 Smart、Title、Regex、Parent-Child 和 Page 分块，按文档结构与检索目标选择。', href: '/docs/product-usage/chunking-strategies'},
        {name: '父子分块', description: '以小块完成精准命中，再返回更完整的父级上下文，并支持父子关系维护。', href: '/docs/product-usage/chunking-strategies/parent-child'},
        {name: '复杂表格处理', description: '保留超长表格、合并单元格、重复表头、上下文行和跨页连续关系。', href: '/docs/发布记录'},
        {name: '图片与视频理解', description: '提取文档图片、图注和上下文；视频支持 ASR、关键帧、VLM 描述、时间戳引用与检索。', href: '/docs/发布记录'},
        {name: '解析预览与重跑', description: '在线查看分块和原文位置，调整解析或分块配置后可重新执行处理任务。', href: '/docs/product-usage/chunking-strategies'},
      ],
    },
    {
      category: '检索与知识问答',
      items: [
        {name: '关键词与向量混合检索', description: '组合词法召回、向量召回、权重信号和可选 Rerank，覆盖常规企业问答。', href: '#retrieval'},
        {name: '同义词与元数据过滤', description: '通过知识库词典扩展业务术语，并按文档元数据、知识库或指定文档收敛检索范围。', href: '/docs/发布记录'},
        {name: '检索测试与调试', description: '查看粗排、精排、关键词、相似度及不同检索路径的命中信息，便于定位效果问题。', href: '/docs/发布记录'},
        {name: 'DeepRead 深度阅读', description: '围绕文档目录、相关正文与完整章节多步阅读，生成带原文引用的回答。', href: '/docs/product-usage/deep-agent/skills'},
        {name: 'ColPali 视觉融合检索', description: '基于 Milvus 原生多向量检索，与文本检索并行召回后以 RRF 合并排名，适合图表、PPT、扫描件和版式内容。', href: '/docs/product-usage/retrieval-enhancement/colpali'},
        {name: 'SAG 多跳检索', description: '基于 Milvus 的多跳检索引擎，结果与原生检索融合，适合跨文档事实组合和关系推理；检索策略在助手设置中选择。', href: '/docs/product-usage/retrieval-enhancement/sag'},
        {name: 'RAPTOR / GraphRAG', description: '通过摘要树和知识图谱补充全局主题、实体关系与长文档层级信息。', href: '/docs/发布记录'},
        {name: '可追溯引用', description: '回答引用可回到原文页码、坐标和图片位置，支持 PDF 预览与高亮核验。', href: '/docs/intro'},
        {name: '联网搜索补充', description: '可配置博查联网搜索，在企业知识不足时补充公开网络材料。', href: '/docs/发布记录'},
      ],
    },
    {
      category: 'Deep Agent 与成果交付',
      items: [
        {name: '办公文档交付', description: '内置 Word、PowerPoint、Excel 三个办公文档技能，在隔离沙箱中生成文件，对话内以卡片展示并可就地预览。', href: '/docs/product-usage/deep-agent/office-agent'},
        {name: 'Agent 隔离沙箱', description: '每个会话一个断网的隔离工作区，上传的附件自动放入供 Agent 读取，删除会话时一并清理。', href: '/docs/product-usage/deep-agent/office-agent#隔离沙箱'},
        {name: '技能目录', description: '管理员上传技能包并在独立环境中安装，技能可声明环境变量与版本，用户在聊天框用 @ 点名本轮使用。', href: '/docs/product-usage/deep-agent/office-agent#技能目录'},
        {name: '长期记忆', description: '管理员开启后，助手跨会话记住用户偏好与事实；推断出的记忆先由用户确认，支持语义召回，可在记忆页编辑和清空。', href: '/docs/product-usage/deep-agent/office-agent#长期记忆'},
        {name: '运行中插话', description: 'Agent 执行中可以继续输入，补充到当前轮、排队到下一轮或在完成后自动发送。', href: '/docs/product-usage/deep-agent/office-agent#运行中插话'},
        {name: '思考开关', description: '在助手设置中统一控制普通问答、Agent、写作和视觉模型是否让模型思考，兼顾速度与推理深度。', href: '/docs/product-usage/deep-agent/office-agent#思考开关'},
        {name: '@ 就地点名', description: '能力、技能与文档统一在聊天框用 @ 点名，只对本轮生效，不改写会话全局配置。', href: '/docs/product-usage/deep-agent/skills'},
        {name: '@文档精确选材', description: '从已授权知识库中点名本轮材料，普通问答与专业能力使用同一范围边界。', href: '/docs/product-usage/deep-agent/skills'},
        {name: '跨章节深度阅读', description: '浏览文档结构、检索正文并按节点读取上下文，适合制度解释、技术核对和跨文档比较。', href: '/docs/product-usage/deep-agent/skills#深度阅读'},
        {name: '编号条款分析', description: '对中文“第 X 条”执行完整计数、最大编号、连续性、缺号和重复编号检查。', href: '/docs/product-usage/deep-agent/skills#编号条款分析'},
        {name: '结构化数据抽取', description: '按用户字段从一份或多份完整文档提取记录，区分可靠值、缺失值和歧义值。', href: '/docs/product-usage/deep-agent/skills#结构化抽取'},
        {name: '表格与 Excel 交付', description: '把已经核验的二维记录生成可下载台账，保留每条记录的文档身份和来源。', href: '/docs/product-usage/deep-agent/skills#结构化抽取'},
        {name: '人工补充与任务恢复', description: '关键口径无法确定时暂停任务，收到用户补充后从当前阶段继续，不重复已完成工作。', href: '/docs/product-usage/deep-agent/skills#人工补充与任务恢复'},
        {name: '报告与文章生成', description: '依据指定材料生成报告、方案、讲稿或文章，支持章节化流式写作、图片引用、稿件在线修改保存和 Markdown 下载。', href: '/docs/product-usage/deep-agent/skills#报告生成'},
      ],
    },
    {
      category: 'LLM Wiki 知识网络',
      items: [
        {name: '知识库自动成 Wiki', description: '从知识库材料生成实体页、概念页和摘要页，把文档集合组织为可浏览的知识网络。', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: '全文搜索', description: '按关键词检索 Wiki 页面、企业实体和专业概念，不必从聊天入口逐个提问。', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: '跨页面链接', description: '自动建立相关页面之间的可读链接，支持沿概念与上下游关系继续探索。', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: '关系图谱', description: '以图形展示实体与页面关系，并保留关联材料与来源引用。', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: '增量维护与健康检查', description: '文档新增、删除或更新后维护相关页面，支持生成状态、异常检查与恢复。', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
      ],
    },
    {
      category: '知识管理与运营',
      items: [
        {name: '知识库目录树', description: '使用多级文件夹管理大量知识库，支持创建、移动、重命名和按目录浏览。', href: '/docs/product-usage/kb-tree'},
        {name: '知识库导入导出', description: '支持知识库跨环境迁移、离线交付和批量治理，减少重复解析与重建成本。', href: '/docs/product-usage/kb-tree/knowledge-operations'},
        {name: '统一文件管理', description: '集中查看、上传、下载、移动和管理文件，并按权限控制可见与可操作范围。', href: '/docs/product-usage/system-management/file-management'},
        {name: '运营数据概览', description: '按知识库、问答、检索命中、用户和时间查看使用情况，并按当前权限过滤数据。', href: '/docs/发布记录'},
        {name: '知识缺口与反馈', description: '聚合未命中、低质量回答和用户反馈，把真实使用问题转成待优化事项。', href: '/docs/发布记录'},
        {name: 'AI 辅助诊断', description: '结合问答反馈与检索证据分析原因，支持单条和批量诊断并形成优化建议。', href: '/docs/发布记录'},
        {name: '任务与运营报表', description: '跟踪后台任务状态，按当前筛选范围导出运营明细与阶段报表。', href: '/docs/发布记录'},
        {name: '用户模型配置', description: '管理员按用户配置默认模型与可用范围，统一校验授权并同步模型凭据。', href: '/docs/product-usage/system-management/user-config'},
      ],
    },
    {
      category: '组织、权限与身份',
      items: [
        {name: '用户与多级组织', description: '维护用户、集团、部门和下级组织，支持主组织、组织成员与组织管理员。', href: '/docs/product-usage/system-management/org-management'},
        {name: '协作组', description: '为跨部门项目建立横向协作主体，独立维护成员并参与知识库授权。', href: '/docs/product-usage/system-management/group-management'},
        {name: '纯 RBAC 授权', description: '面向用户、组织和协作组授予查看、编辑或管理权限，不以租户字段替代资源授权。', href: '/docs/product-usage/rbac-permission'},
        {name: '目录权限继承', description: '上级文件夹授权向下作用于子目录和知识库，多来源授权按最高有效权限合并。', href: '/docs/product-usage/rbac-permission'},
        {name: '组织管理员边界', description: '组织管理员只管理授权组织与资源子树，列表、检索、运营和导出使用同一权限范围。', href: '/docs/product-usage/rbac-permission'},
        {name: '企业微信登录与组织同步', description: '支持浏览器扫码和企业微信工作台登录，首次登录可完成账号映射与组织同步。', href: '/docs/product-usage/third-party-access/wecom-sso-login'},
        {name: '外部 OAuth2 / OIDC', description: '支持对接企业身份源与 Keycloak OIDC，完成授权码交换、会话与账号信息映射。', href: '/docs/发布记录'},
        {name: '分享访问控制', description: '分享对话可要求登录，并按访问者本人的 RBAC 权限限制可用知识范围。', href: '/docs/发布记录'},
      ],
    },
    {
      category: '业务接入与开放能力',
      items: [
        {name: '企业微信智能机器人', description: '把知识问答接入企业微信会话，支持企业内部工作入口和图文回复。', href: '/docs/product-usage/third-party-access/wecom-access'},
        {name: '钉钉机器人', description: '配置钉钉应用、机器人权限和回调，在钉钉内使用 KnowFlow 问答。', href: '/docs/product-usage/third-party-access/dingding-access'},
        {name: '飞书机器人', description: '通过飞书应用与机器人权限配置，把知识库能力接入飞书会话。', href: '/docs/product-usage/third-party-access/feishu-access'},
        {name: 'Dify 接入', description: '支持外部知识库 API、插件与工作流方式接入，并返回可追溯引用。', href: '/docs/product-usage/third-party-access/dfy'},
        {name: 'MaxKB 接入', description: '通过 API 工具和高级编排把 KnowFlow 检索能力接入 MaxKB 工作流。', href: '/docs/product-usage/third-party-access/maxkb-access'},
        {name: 'REST API 与 SDK', description: '通过标准接口和 SDK 对接内部系统、自动化流程及自建 Agent 应用。', href: '/docs/API接口/complete-api-reference'},
        {name: '在线 API 文档', description: '部署后访问 /api/docs（Swagger UI）或 /api/redoc，文档从代码自动生成，可用 API Key 直接调试；对话接口支持 delta 增量流式返回。', href: '/docs/发布记录'},
        {name: 'MCP 接入', description: '通过 MCP 列出知识库与对话助手，并提供 WorkBuddy（腾讯）连接器接入包。', href: '/docs/发布记录'},
        {name: '分享与嵌入对话', description: '提供独立分享页面、全屏嵌入和网页挂件预览，便于接入现有门户。', href: '/docs/发布记录'},
      ],
    },
    {
      category: '私有化部署与基础设施',
      items: [
        {name: 'Docker Compose 部署', description: '提供完整容器编排与环境变量配置，支持基础服务和可选能力按需启用。', href: '/docs/installationDocker'},
        {name: 'Kubernetes / Helm', description: '支持分布式任务执行、多副本与服务拆分，适配企业集群和高可用部署。', href: '/docs/installationDocker'},
        {name: '多种元数据数据库', description: '支持 PostgreSQL 与 MySQL，并提供 MySQL 到 PostgreSQL 的迁移工具。', href: '/docs/发布记录'},
        {name: '多种文档引擎', description: '支持 Milvus、Elasticsearch 和 Infinity，按数据规模、检索方式与运维条件选择。', href: '/docs/intro'},
        {name: '对象存储选择', description: '支持 MinIO 与 RustFS，满足私有化文件、解析产物和图片资源存储。', href: '/docs/发布记录'},
        {name: '离线环境', description: '支持离线镜像、模型和知识库交付，数据与模型可以完全留在企业网络内。', href: '/docs/installationDocker'},
        {name: '可选增强服务', description: 'SAG、ColPali、MinerU-Popo 等能力独立部署，基础环境无需承担全部 GPU 与服务开销。', href: '/docs/installationDocker'},
        {name: '运行诊断', description: '提供服务健康检查、任务队列和实际运行引擎信息，便于管理员定位部署问题。', href: '/docs/发布记录'},
      ],
    },
  ],
};

const en: FeatureCatalogContent = {
  title: 'Full feature list',
  subtitle:
    'Current capabilities grouped by workflow stage. Follow the linked docs for configuration detail.',
  columns: ['Category', 'Feature', 'What it does', 'Docs'],
  countSuffix: ' features',
  docLink: 'Read docs',
  docLinkAria: 'Read the docs for {name}',
  note: 'Some capabilities require a separate service, a specific model or an optional deployment component. Actual availability depends on the linked docs and your deployment configuration.',
  groups: [
    {
      category: 'Parsing and chunking',
      items: [
        {name: 'Multi-format ingestion', description: 'Handles PDF, Word, Excel, PPT, Markdown, images and video, with parsing running asynchronously.', href: '/docs/intro'},
        {name: 'MinerU / PaddleOCR', description: 'Parses scans, complex layouts, tables, formulas and images while keeping headings, page numbers and coordinates.', href: '/docs/intro'},
        {name: 'MinerU-Popo enhancement', description: 'Optionally strengthens heading hierarchy, section relations, cross-page tables and image context, falling back to plain MinerU on failure.', href: '/docs/product-usage/document-parsing/mineru-popo'},
        {name: 'Five chunking strategies', description: 'Smart, Title, Regex, Parent-Child and Page chunking, chosen by document structure and retrieval goal.', href: '/docs/product-usage/chunking-strategies'},
        {name: 'Parent-child chunking', description: 'Match precisely on small chunks, then return the fuller parent context, with the relationship maintained over time.', href: '/docs/product-usage/chunking-strategies/parent-child'},
        {name: 'Complex table handling', description: 'Preserves very long tables, merged cells, repeated headers, context rows and cross-page continuity.', href: '/docs/发布记录'},
        {name: 'Image and video understanding', description: 'Extracts images, captions and context; video supports ASR, keyframes, VLM descriptions, timestamped citations and retrieval.', href: '/docs/发布记录'},
        {name: 'Preview and re-run', description: 'Inspect chunks and their source position online, then re-run processing after adjusting parsing or chunking settings.', href: '/docs/product-usage/chunking-strategies'},
      ],
    },
    {
      category: 'Retrieval and Q&A',
      items: [
        {name: 'Hybrid keyword and vector retrieval', description: 'Combines lexical recall, vector recall, weighting signals and optional reranking for everyday questions.', href: '#retrieval'},
        {name: 'Synonyms and metadata filters', description: 'Extend business terms via a knowledge base dictionary, and narrow retrieval by metadata, knowledge base or a named document.', href: '/docs/发布记录'},
        {name: 'Retrieval testing and debugging', description: 'Inspect coarse ranking, reranking, keywords, similarity scores and which path produced each hit.', href: '/docs/发布记录'},
        {name: 'DeepRead close reading', description: 'Reads across the table of contents, relevant body text and full sections in several steps, producing cited answers.', href: '/docs/product-usage/deep-agent/skills'},
        {name: 'ColPali visual fusion', description: 'Native Milvus multi-vector retrieval runs alongside text retrieval and is merged with RRF — ideal for charts, decks, scans and layout-heavy content.', href: '/docs/product-usage/retrieval-enhancement/colpali'},
        {name: 'SAG multi-hop retrieval', description: 'A Milvus-based multi-hop engine whose results are fused with native retrieval, for cross-document facts and relationships; the strategy is chosen per assistant.', href: '/docs/product-usage/retrieval-enhancement/sag'},
        {name: 'RAPTOR / GraphRAG', description: 'Adds global themes, entity relations and long-document hierarchy through summary trees and knowledge graphs.', href: '/docs/发布记录'},
        {name: 'Traceable citations', description: 'Citations return to the page, coordinates and image position, with PDF preview and highlighting for verification.', href: '/docs/intro'},
        {name: 'Web search fallback', description: 'Optional Bocha web search supplements answers with public material when internal knowledge falls short.', href: '/docs/发布记录'},
      ],
    },
    {
      category: 'Deep Agent and deliverables',
      items: [
        {name: 'Office file delivery', description: 'Built-in Word, PowerPoint and Excel skills generate files in an isolated sandbox; they appear as cards in the chat and preview in place.', href: '/docs/product-usage/deep-agent/office-agent'},
        {name: 'Isolated agent sandbox', description: 'Each session gets an offline, isolated workspace; uploaded attachments are placed in it and cleaned up when the session is deleted.', href: '/docs/product-usage/deep-agent/office-agent#隔离沙箱'},
        {name: 'Skill catalogue', description: 'Admins upload skill packages that install in a separate environment; skills declare versions and environment variables, and users @-mention them per turn.', href: '/docs/product-usage/deep-agent/office-agent#技能目录'},
        {name: 'Long-term memory', description: 'Once enabled by an admin, remembers user preferences and facts across sessions; inferred memories wait for confirmation, and users can edit or clear them.', href: '/docs/product-usage/deep-agent/office-agent#长期记忆'},
        {name: 'Steering while running', description: 'Keep typing while the agent works: add to the current turn, queue for the next one, or send automatically when it finishes.', href: '/docs/product-usage/deep-agent/office-agent#运行中插话'},
        {name: 'Thinking switch', description: 'One assistant-level switch decides whether Q&A, agent, writing and vision models think before answering.', href: '/docs/product-usage/deep-agent/office-agent#思考开关'},
        {name: 'In-place @ mentions', description: 'Capabilities, skills and documents are all @-mentioned in the chat box and apply to the current turn only.', href: '/docs/product-usage/deep-agent/skills'},
        {name: '@document scoping', description: 'Name the exact material for this turn from authorised knowledge bases; plain Q&A and advanced skills share the same boundary.', href: '/docs/product-usage/deep-agent/skills'},
        {name: 'Cross-section close reading', description: 'Browses document structure, retrieves body text and reads context per node — for policy interpretation, technical verification and comparison.', href: '/docs/product-usage/deep-agent/skills#深度阅读'},
        {name: 'Numbered clause analysis', description: 'Counts clauses, finds the highest number, and checks continuity, gaps and duplicates for Chinese numbered articles.', href: '/docs/product-usage/deep-agent/skills#编号条款分析'},
        {name: 'Structured data extraction', description: 'Extracts records for your fields across one or many complete documents, separating reliable, missing and ambiguous values.', href: '/docs/product-usage/deep-agent/skills#结构化抽取'},
        {name: 'Table and Excel delivery', description: 'Turns verified tabular records into a downloadable register, keeping each record’s document identity and source.', href: '/docs/product-usage/deep-agent/skills#结构化抽取'},
        {name: 'Human input and task resume', description: 'Pauses when a key definition cannot be settled, then resumes from the current stage once you answer, without redoing finished work.', href: '/docs/product-usage/deep-agent/skills#人工补充与任务恢复'},
        {name: 'Report and article writing', description: 'Writes reports, proposals, scripts or articles from named material, with section-by-section streaming, image citations, in-place editing and Markdown export.', href: '/docs/product-usage/deep-agent/skills#报告生成'},
      ],
    },
    {
      category: 'LLM Wiki knowledge network',
      items: [
        {name: 'Auto-generated wiki', description: 'Builds entity, concept and summary pages from knowledge base material, turning a document pile into a browsable network.', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: 'Full-text search', description: 'Search wiki pages, business entities and domain concepts by keyword instead of asking one question at a time.', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: 'Cross-page links', description: 'Creates readable links between related pages so readers can follow concepts and dependencies.', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: 'Relationship graph', description: 'Visualises how entities and pages relate, keeping the underlying material and citations.', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
        {name: 'Incremental upkeep and health checks', description: 'Maintains affected pages as documents are added, removed or updated, with generation status, checks and recovery.', href: '/docs/product-usage/retrieval-enhancement/llm-wiki'},
      ],
    },
    {
      category: 'Knowledge management and operations',
      items: [
        {name: 'Knowledge directory tree', description: 'Manage many knowledge bases in nested folders — create, move, rename and browse by directory.', href: '/docs/product-usage/kb-tree'},
        {name: 'Import and export', description: 'Migrate knowledge bases between environments, deliver offline and govern in bulk, avoiding repeated parsing.', href: '/docs/product-usage/kb-tree/knowledge-operations'},
        {name: 'Unified file management', description: 'View, upload, download, move and manage files centrally, with visibility and actions bounded by permissions.', href: '/docs/product-usage/system-management/file-management'},
        {name: 'Operations overview', description: 'See usage by knowledge base, question, retrieval hit, user and time — filtered by the current user’s permissions.', href: '/docs/发布记录'},
        {name: 'Knowledge gaps and feedback', description: 'Aggregates misses, low-quality answers and user feedback into a concrete improvement backlog.', href: '/docs/发布记录'},
        {name: 'AI-assisted diagnosis', description: 'Analyses causes from answer feedback and retrieval evidence, one at a time or in bulk, and proposes fixes.', href: '/docs/发布记录'},
        {name: 'Tasks and operational reports', description: 'Track background task status and export operational detail and periodic reports for the current filter scope.', href: '/docs/发布记录'},
        {name: 'Per-user model configuration', description: 'Administrators set default models and permitted scope per user, validating authorisation and syncing credentials.', href: '/docs/product-usage/system-management/user-config'},
      ],
    },
    {
      category: 'Organisation, permissions and identity',
      items: [
        {name: 'Users and nested organisations', description: 'Maintain users, groups, departments and sub-organisations, with primary organisation, members and org admins.', href: '/docs/product-usage/system-management/org-management'},
        {name: 'Collaboration groups', description: 'Create horizontal groups for cross-department projects, with their own members and knowledge base grants.', href: '/docs/product-usage/system-management/group-management'},
        {name: 'Pure RBAC authorisation', description: 'Grant view, edit or manage rights to users, organisations and collaboration groups — no tenant field standing in for real authorisation.', href: '/docs/product-usage/rbac-permission'},
        {name: 'Directory inheritance', description: 'Grants on a parent folder flow down to sub-folders and knowledge bases, with the highest effective permission winning.', href: '/docs/product-usage/rbac-permission'},
        {name: 'Org admin boundaries', description: 'Org admins manage only their authorised subtree — lists, retrieval, operations and exports all share that scope.', href: '/docs/product-usage/rbac-permission'},
        {name: 'WeCom sign-in and org sync', description: 'Browser QR and WeCom workbench sign-in, with account mapping and organisation sync on first login.', href: '/docs/product-usage/third-party-access/wecom-sso-login'},
        {name: 'External OAuth2 / OIDC', description: 'Integrates with enterprise identity providers and Keycloak OIDC, handling code exchange, sessions and profile mapping.', href: '/docs/发布记录'},
        {name: 'Shared conversation access control', description: 'Shared conversations can require sign-in and limit knowledge to the visitor’s own RBAC scope.', href: '/docs/发布记录'},
      ],
    },
    {
      category: 'Integrations and open APIs',
      items: [
        {name: 'WeCom bot', description: 'Brings knowledge Q&A into WeCom conversations, including internal work entry points and rich replies.', href: '/docs/product-usage/third-party-access/wecom-access'},
        {name: 'DingTalk bot', description: 'Configure the DingTalk app, bot permissions and callbacks to use KnowFlow inside DingTalk.', href: '/docs/product-usage/third-party-access/dingding-access'},
        {name: 'Feishu bot', description: 'Connect knowledge base capability to Feishu conversations through app and bot permission configuration.', href: '/docs/product-usage/third-party-access/feishu-access'},
        {name: 'Dify integration', description: 'Connect via external knowledge base API, plugin or workflow, returning traceable citations.', href: '/docs/product-usage/third-party-access/dfy'},
        {name: 'MaxKB integration', description: 'Bring KnowFlow retrieval into MaxKB workflows through API tools and advanced orchestration.', href: '/docs/product-usage/third-party-access/maxkb-access'},
        {name: 'REST API and SDK', description: 'Integrate internal systems, automation and your own agents through standard interfaces and SDKs.', href: '/docs/API接口/complete-api-reference'},
        {name: 'Live API reference', description: 'Swagger UI at /api/docs and Redoc at /api/redoc are generated from code and testable with an API key; chat streams can return deltas only.', href: '/docs/发布记录'},
        {name: 'MCP access', description: 'List knowledge bases and assistants over MCP, with a ready-made connector for WorkBuddy (Tencent).', href: '/docs/发布记录'},
        {name: 'Sharing and embedding', description: 'Standalone share pages, full-screen embedding and web widget previews for existing portals.', href: '/docs/发布记录'},
      ],
    },
    {
      category: 'Self-hosting and infrastructure',
      items: [
        {name: 'Docker Compose', description: 'Complete container orchestration and environment configuration, with core services and optional capabilities enabled as needed.', href: '/docs/installationDocker'},
        {name: 'Kubernetes / Helm', description: 'Distributed task execution, replicas and service separation for enterprise clusters and high availability.', href: '/docs/installationDocker'},
        {name: 'Metadata database options', description: 'Supports PostgreSQL and MySQL, with a migration tool from MySQL to PostgreSQL.', href: '/docs/发布记录'},
        {name: 'Document engine options', description: 'Supports Milvus, Elasticsearch and Infinity — choose by data size, retrieval style and operational constraints.', href: '/docs/intro'},
        {name: 'Object storage options', description: 'Supports MinIO and RustFS for self-hosted files, parsing artefacts and image assets.', href: '/docs/发布记录'},
        {name: 'Offline environments', description: 'Offline images, models and knowledge base delivery keep data and models entirely inside your network.', href: '/docs/installationDocker'},
        {name: 'Optional services', description: 'SAG, ColPali and MinerU-Popo deploy separately, so the base environment does not carry every GPU and service cost.', href: '/docs/installationDocker'},
        {name: 'Runtime diagnostics', description: 'Health checks, task queues and the actual running engine are exposed so administrators can locate deployment issues.', href: '/docs/发布记录'},
      ],
    },
  ],
};

export const featureCatalogContent: LocalizedContent<FeatureCatalogContent> = {
  'zh-Hans': zhHans,
  en,
};
