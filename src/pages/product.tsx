import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import styles from './product.module.css';
import {
  FileText,
  Settings,
  Shield,
  Lightbulb,
  Building,
  BookOpen,
  MessageSquare,
  Cpu,
  Target,
  CheckCircle,
  Rocket,
} from '../components/Icons';
import {useScrollAnimation} from '../hooks/useScrollAnimation';

const coreCapabilities = [
  {
    id: 'document-structure',
    number: '01',
    title: '以文档结构为核心的传统 RAG',
    subtitle: '不是先切碎文本，而是先理解文档',
    description: 'KnowFlow 保留标题层级、段落关系、表格、公式、图片和版面位置，再按不同文档结构选择合适的知识单元，为稳定检索提供可追溯基础。',
    features: [
      {title: '复杂文档解析', desc: 'MinerU 3.x、PaddleOCR 处理 PDF、扫描件、表格和公式'},
      {title: '结构化分块', desc: 'Smart、Title、Regex、Parent-Child、Page 多种策略'},
      {title: '父子上下文', desc: '用子块精准命中，用父块补充完整语义'},
      {title: '原文追溯', desc: '分块、引用和图片可回到文档原始位置'},
    ],
    value: '检索质量的上限，首先由知识进入系统时是否保留结构决定',
    Icon: FileText,
    color: 'blue' as const,
  },
  {
    id: 'retrieval',
    number: '02',
    title: '传统 RAG、SAG 与视觉检索协同',
    subtitle: '让不同复杂度的问题走合适的检索路径',
    description: '常规问题使用成熟的关键词与向量混合检索；复杂问题由 SAG 做跨文档、多步骤检索；图表和版式内容由 ColPali 视觉路补充。',
    features: [
      {title: '传统混合检索', desc: '融合词法、向量、权重和可选 Rerank，覆盖高频问答'},
      {title: 'SAG 多跳检索', desc: '面向跨文档事实组合和复杂关系问题逐步查证'},
      {title: '失败自动回退', desc: 'SAG 无结果或异常时自动回到标准检索链路'},
      {title: 'ColPali 视觉融合', desc: '文本与视觉文档分路召回，再通过 RRF 合并排名'},
    ],
    value: '不是所有问题都需要最重的推理，但复杂问题必须有更深的路径',
    Icon: Target,
    color: 'purple' as const,
  },
  {
    id: 'deep-agent',
    number: '03',
    title: 'Deep Agent 企业知识执行',
    subtitle: '不止回答问题，还能交付台账和正式稿件',
    description: 'Deep Agent 在用户已授权的知识范围内完成多步阅读、字段抽取和材料写作，把企业文档转成可核验、可下载、可继续编辑的工作成果。',
    features: [
      {title: '深度阅读', desc: '浏览目录、检索正文并跨章节核对，回答保留原文引用'},
      {title: '结构化抽取', desc: '按字段批量处理多份文档，可交付 Excel 台账'},
      {title: '报告生成', desc: '依据指定材料流式撰写报告、文章、方案和讲稿'},
      {title: '精确任务范围', desc: '通过回答方式与 @文档 控制当前轮次，不扩大授权边界'},
    ],
    value: '企业知识的价值不只在于被找到，更在于变成可以继续使用的工作成果',
    Icon: MessageSquare,
    color: 'green' as const,
  },
  {
    id: 'wiki',
    number: '04',
    title: 'LLM Wiki 企业知识图谱',
    subtitle: '从文档集合升级为可探索的知识网络',
    description: 'LLM Wiki 自动从知识库生成结构化百科，将实体、概念、页面、关系和来源组织起来，让用户既能问，也能搜、能看、能沿关系探索。',
    features: [
      {title: '自动生成 Wiki', desc: '从知识库提炼主题、实体、概念和结构化页面'},
      {title: '全文搜索', desc: '直接查找企业实体、产品、项目和专业概念'},
      {title: '跨页面关联', desc: '用可读链接连接相关页面和上下游知识'},
      {title: '关系图谱', desc: '可视化实体之间的关系，并保留来源引用'},
    ],
    value: '问答解决一个问题，知识图谱帮助人建立完整认知',
    Icon: BookOpen,
    color: 'green' as const,
  },
  {
    id: 'operations',
    number: '05',
    title: '企业知识运营闭环',
    subtitle: '从“知识已经入库”走向“知识持续变好”',
    description: '把真实问答、检索命中和用户反馈转成可观察的运营指标与知识缺口，再通过 AI 诊断、优化任务和报表复盘持续改善知识质量。',
    features: [
      {title: '运营概览', desc: '查看问答量、活跃用户、有效率、反馈和使用趋势'},
      {title: '知识缺口', desc: '聚合未命中、低质量和反复出现的相近问题'},
      {title: 'AI 辅助诊断', desc: '结合问答反馈与检索证据生成可执行优化建议'},
      {title: '任务与报表', desc: '批量处理优化任务，导出运营明细和阶段报表'},
    ],
    value: '知识库不是上线即完成，而是需要基于真实使用持续运营',
    Icon: Settings,
    color: 'orange' as const,
  },
  {
    id: 'organization',
    number: '06',
    title: '企业组织与知识库树',
    subtitle: '让知识结构与企业管理结构保持一致',
    description: '建立多层级组织、成员和协作组，再通过树状目录组织大量知识库，明确知识归属、业务边界和维护责任。',
    features: [
      {title: '多层级组织', desc: '按集团、部门和团队建立真实组织关系'},
      {title: '成员与协作组', desc: '兼容纵向组织和跨部门项目协作'},
      {title: '知识库目录树', desc: '用多级文件夹分类、移动和归档知识库'},
      {title: '统一维护', desc: '支持目录规划、知识库导入导出和批量治理'},
    ],
    value: '知识规模扩大后，清晰的归属和目录比更多搜索框更重要',
    Icon: Building,
    color: 'blue' as const,
  },
  {
    id: 'rbac',
    number: '07',
    title: '目录级纯 RBAC 权限治理',
    subtitle: '把正确的知识交给正确的人',
    description: '任意知识目录或知识库都可以授权给指定用户、组织或协作组。权限沿目录向下继承，多来源授权取最高权限，并贯穿检索、管理与运营数据。',
    features: [
      {title: '任意主体授权', desc: '支持用户、组织、协作组三类授权主体'},
      {title: '三级权限', desc: '分别授予查看、编辑和管理能力'},
      {title: '目录继承', desc: '上级目录授权自动作用于子目录和知识库'},
      {title: '统一权限边界', desc: '知识列表、检索、运营明细和导出使用同一 RBAC 范围'},
      {title: '三方协同接入', desc: '支持企业微信、钉钉、飞书等企业工作入口'},
    ],
    value: '权限不是外围配置，而是企业知识被管理和使用的基础边界',
    Icon: Shield,
    color: 'purple' as const,
  },
];

const comparisons = [
  {dimension: '知识单元', knowflow: '保留标题、父子层级、表格、图片和版面结构', others: '固定长度切分，结构与上下文容易丢失'},
  {dimension: '检索路径', knowflow: '传统混合检索、SAG 多跳检索、ColPali 视觉检索协同', others: '所有问题共用一条向量检索链路'},
  {dimension: '知识形态', knowflow: '问答之外生成可搜索、可浏览的 LLM Wiki 知识图谱', others: '知识停留在文档列表和聊天窗口'},
  {dimension: '持续运营', knowflow: '指标、知识缺口、AI 诊断、优化任务和报表形成闭环', others: '上线后缺少质量反馈和改进抓手'},
  {dimension: '知识组织', knowflow: '企业组织与知识库树共同管理归属和业务边界', others: '知识库平铺，规模扩大后难以维护'},
  {dimension: '权限治理', knowflow: '目录或知识库可授权给用户、组织、协作组并向下继承', others: '通常只支持单库或简单成员权限'},
  {dimension: '部署与数据', knowflow: '支持私有化和离线部署，数据与模型由企业控制', others: '依赖外部云服务，数据边界受平台限制'},
];

const techSpecs = [
  {category: '文档处理', items: ['MinerU 3.x', 'PaddleOCR', 'Smart', 'Title', 'Regex', 'Parent-Child', 'Page']},
  {category: '检索引擎', items: ['混合检索', 'Rerank', 'SAG', 'ColPali', 'RRF', 'DeepRead']},
  {category: '知识网络', items: ['LLM Wiki', '全文搜索', '跨页面链接', '关系图谱', '来源引用']},
  {category: '知识运营', items: ['运营概览', '知识缺口', 'AI 诊断', '任务队列', 'XLSX / CSV']},
  {category: '治理能力', items: ['组织架构', '协作组', '知识库树', '目录继承', '纯 RBAC']},
  {category: '业务接入', items: ['企业微信', '钉钉', '飞书', 'Dify', 'RESTful API', 'SDK']},
  {category: '基础设施', items: ['PostgreSQL', 'Milvus', 'RustFS / MinIO', 'Docker Compose', 'Kubernetes']},
];

const featureCatalog = [
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
      {name: '关键词与向量混合检索', description: '组合词法召回、向量召回、权重信号和可选 Rerank，覆盖常规企业问答。', href: '/product#retrieval'},
      {name: '同义词与元数据过滤', description: '通过知识库词典扩展业务术语，并按文档元数据、知识库或指定文档收敛检索范围。', href: '/docs/发布记录'},
      {name: '检索测试与调试', description: '查看粗排、精排、关键词、相似度及不同检索路径的命中信息，便于定位效果问题。', href: '/docs/发布记录'},
      {name: 'DeepRead 深度阅读', description: '围绕文档目录、相关正文与完整章节多步阅读，生成带原文引用的回答。', href: '/docs/product-usage/deep-agent/skills'},
      {name: 'ColPali 视觉融合检索', description: '视觉文档与普通文档分路召回，以 RRF 合并排名，适合图表、PPT、扫描件和版式内容。', href: '/docs/product-usage/retrieval-enhancement/colpali'},
      {name: 'SAG 多跳检索', description: '面向跨文档事实组合和关系推理逐步查证；无结果或服务异常时回退标准检索。', href: '/docs/product-usage/retrieval-enhancement/sag'},
      {name: 'RAPTOR / GraphRAG', description: '通过摘要树和知识图谱补充全局主题、实体关系与长文档层级信息。', href: '/docs/发布记录'},
      {name: '可追溯引用', description: '回答引用可回到原文页码、坐标和图片位置，支持 PDF 预览与高亮核验。', href: '/docs/intro'},
      {name: '联网搜索补充', description: '可配置博查联网搜索，在企业知识不足时补充公开网络材料。', href: '/docs/发布记录'},
    ],
  },
  {
    category: 'Deep Agent 与成果交付',
    items: [
      {name: '统一回答方式', description: '每轮可选择普通问答、智能处理、深度阅读、结构化抽取或报告生成，不改写会话全局配置。', href: '/docs/product-usage/deep-agent/skills'},
      {name: '@文档精确选材', description: '从已授权知识库中点名本轮材料，普通问答与专业能力使用同一范围边界。', href: '/docs/product-usage/deep-agent/skills'},
      {name: '跨章节深度阅读', description: '浏览文档结构、检索正文并按节点读取上下文，适合制度解释、技术核对和跨文档比较。', href: '/docs/product-usage/deep-agent/skills#深度阅读'},
      {name: '编号条款分析', description: '对中文“第 X 条”执行完整计数、最大编号、连续性、缺号和重复编号检查。', href: '/docs/product-usage/deep-agent/skills#编号条款分析'},
      {name: '结构化数据抽取', description: '按用户字段从一份或多份完整文档提取记录，区分可靠值、缺失值和歧义值。', href: '/docs/product-usage/deep-agent/skills#结构化抽取'},
      {name: '表格与 Excel 交付', description: '把已经核验的二维记录生成可下载台账，保留每条记录的文档身份和来源。', href: '/docs/product-usage/deep-agent/skills#结构化抽取'},
      {name: '人工补充与任务恢复', description: '关键口径无法确定时暂停任务，收到用户补充后从当前阶段继续，不重复已完成工作。', href: '/docs/product-usage/deep-agent/skills#人工补充与任务恢复'},
      {name: '报告与文章生成', description: '依据指定材料生成报告、方案、讲稿或文章，支持章节化流式写作、图片引用和 Markdown 下载。', href: '/docs/product-usage/deep-agent/skills#报告生成'},
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
];

const scenarios = [
  {
    Icon: FileText,
    title: '制度、合同与技术资料',
    description: '保留章节、条款、表格与上下文，用结构化 RAG 提供稳定、准确、可回溯的知识问答。',
    highlights: ['结构化解析', '父子分块', '原文引用'],
    color: 'blue' as const,
  },
  {
    Icon: Cpu,
    title: '复杂研究与多跳问答',
    description: '使用 SAG 跨文档检索和逐步查证，处理需要组合多个事实或追踪复杂关系的问题。',
    highlights: ['SAG', '多步检索', '自动回退'],
    color: 'purple' as const,
  },
  {
    Icon: BookOpen,
    title: '企业百科与知识网络',
    description: '用 LLM Wiki 自动沉淀企业实体、概念与关系，形成可搜索、可浏览、可探索的知识图谱。',
    highlights: ['LLM Wiki', '全文搜索', '关系图谱'],
    color: 'green' as const,
  },
  {
    Icon: Building,
    title: '集团与多部门知识治理',
    description: '用组织、知识库树和目录级 RBAC 管理复杂知识边界，并通过运营闭环持续改善知识质量。',
    highlights: ['组织架构', '目录授权', '知识运营'],
    color: 'orange' as const,
  },
];

export default function Product(): ReactNode {
  const [capRef, capVisible] = useScrollAnimation();
  const [catalogRef, catalogVisible] = useScrollAnimation();
  const [specRef, specVisible] = useScrollAnimation();
  const [compRef, compVisible] = useScrollAnimation();
  const [scenRef, scenVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <Layout
      title="产品能力 - KnowFlow 企业知识库与知识运营平台"
      description="了解 KnowFlow 的文档结构化 RAG、Deep Agent、SAG 多跳检索、ColPali 视觉融合、LLM Wiki、知识运营、企业权限治理与私有化部署能力。"
    >
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroBadge}>PRODUCT PLATFORM</div>
            <h1 className={styles.heroTitle}>
              从文档结构化理解<br />
              到<span className={styles.gradientText}>企业知识运营闭环</span>
            </h1>
            <p className={styles.heroSubtitle}>
              一套平台连接文档解析、RAG 检索、Deep Agent 与 LLM Wiki，<br />
              让知识既能准确回答，也能交付台账和报告，并在权限边界内持续运营
            </p>
            <div className={styles.heroHighlights}>
              <div className={styles.heroHighlight}><Target size={18} /><span>结构化 RAG</span></div>
              <div className={styles.heroHighlight}><MessageSquare size={18} /><span>知识执行</span></div>
              <div className={styles.heroHighlight}><CheckCircle size={18} /><span>知识图谱</span></div>
              <div className={styles.heroHighlight}><Rocket size={18} /><span>运营闭环</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featureCatalog} id="all-features">
        <div className={styles.catalogContainer}>
          <div ref={catalogRef} className={`${styles.sectionHeader} ${catalogVisible ? 'visible' : ''}`} data-animate="">
            <h2 className={styles.sectionTitle}>所有功能明细</h2>
            <p className={styles.sectionSubtitle}>按业务环节汇总当前产品能力，具体配置和使用方式可继续查看对应文档</p>
          </div>
          <div className={styles.featureTableWrap}>
            <table className={styles.featureTable} aria-label="KnowFlow 所有功能明细">
              <thead>
                <tr>
                  <th>功能分类</th>
                  <th>功能模块</th>
                  <th>功能说明</th>
                  <th>使用文档</th>
                </tr>
              </thead>
              {featureCatalog.map((group) => (
                <tbody key={group.category}>
                  {group.items.map((item, index) => (
                    <tr key={item.name}>
                      {index === 0 && (
                        <td className={styles.catalogCategory} rowSpan={group.items.length}>
                          <span>{group.category}</span>
                          <small>{group.items.length} 项</small>
                        </td>
                      )}
                      <td className={styles.catalogModule}>{item.name}</td>
                      <td className={styles.catalogDescription}>{item.description}</td>
                      <td className={styles.catalogDoc}>
                        <a href={item.href} aria-label={`查看${item.name}文档`}>查看文档</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className={styles.catalogNote}>部分能力需要独立服务、特定模型或可选部署组件，实际可用范围以对应文档和部署配置为准。</p>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className="container">
          <div ref={capRef} className={`${styles.sectionHeader} ${capVisible ? 'visible' : ''}`} data-animate="">
            <h2 className={styles.sectionTitle}>七大产品能力</h2>
            <p className={styles.sectionSubtitle}>从知识进入系统、被检索和连接，到被治理和持续优化</p>
          </div>

          {coreCapabilities.map((capability) => (
            <div id={capability.id} key={capability.id} className={`${styles.capabilitySection} ${styles[`cap${capability.color.charAt(0).toUpperCase() + capability.color.slice(1)}`]}`}>
              <div className={styles.capabilityHeader}>
                <span className={styles.capabilityNumber}>{capability.number}</span>
                <div className={styles.capabilityTitleGroup}>
                  <h3 className={styles.capabilityTitle}>{capability.title}</h3>
                  <p className={styles.capabilitySubtitle}>{capability.subtitle}</p>
                </div>
                <span className={styles.capabilityIcon}><capability.Icon size={36} /></span>
              </div>
              <p className={styles.capabilityDescription}>{capability.description}</p>
              <div className={styles.capabilityFeatures}>
                {capability.features.map((feature) => (
                  <div key={feature.title} className={styles.capabilityFeature}>
                    <div className={styles.featureCheck}><CheckCircle size={16} /></div>
                    <div><strong>{feature.title}</strong><span>{feature.desc}</span></div>
                  </div>
                ))}
              </div>
              <div className={styles.capabilityValue}>
                <Lightbulb size={18} />
                <span className={styles.valueText}>{capability.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.techSpecs}>
        <div className="container">
          <div ref={specRef} className={`${styles.sectionHeader} ${specVisible ? 'visible' : ''}`} data-animate="">
            <h2 className={styles.sectionTitle}>能力矩阵</h2>
            <p className={styles.sectionSubtitle}>覆盖解析、检索、知识网络、运营、治理与私有化基础设施</p>
          </div>
          <div className={styles.specsGrid}>
            {techSpecs.map((spec) => (
              <div key={spec.category} className={styles.specCard}>
                <h4 className={styles.specCategory}>{spec.category}</h4>
                <div className={styles.specItems}>
                  {spec.items.map((item) => <span key={item} className={styles.specItem}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.comparison}>
        <div className={styles.comparisonContainer}>
          <div ref={compRef} className={`${styles.sectionHeader} ${compVisible ? 'visible' : ''}`} data-animate="">
            <h2 className={styles.sectionTitle}>不只是另一个 RAG 问答工具</h2>
            <p className={styles.sectionSubtitle}>KnowFlow 与传统文档问答方案的差异</p>
          </div>
          <div className={styles.comparisonTable}>
            <table>
              <thead><tr><th>对比维度</th><th className={styles.highlight}>KnowFlow</th><th>传统方案</th></tr></thead>
              <tbody>
                {comparisons.map((item) => (
                  <tr key={item.dimension}>
                    <td className={styles.dimensionCol}>{item.dimension}</td>
                    <td className={styles.knowflowCol}>{item.knowflow}</td>
                    <td className={styles.othersCol}>{item.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.scenarios}>
        <div className="container">
          <div ref={scenRef} className={`${styles.sectionHeader} ${scenVisible ? 'visible' : ''}`} data-animate="">
            <h2 className={styles.sectionTitle}>典型应用场景</h2>
            <p className={styles.sectionSubtitle}>从精准问答到复杂研究，再到集团级知识治理</p>
          </div>
          <div className={styles.scenarioGrid}>
            {scenarios.map((scenario) => (
              <div key={scenario.title} className={`${styles.scenarioCard} ${styles[`scenario${scenario.color.charAt(0).toUpperCase() + scenario.color.slice(1)}`]}`}>
                <div className={styles.scenarioTopBar} />
                <div className={styles.scenarioIcon}><scenario.Icon size={28} /></div>
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
                <div className={styles.scenarioHighlights}>
                  {scenario.highlights.map((highlight) => <span key={highlight} className={styles.scenarioTag}>{highlight}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <div ref={ctaRef} className={`${styles.ctaInner} ${ctaVisible ? 'visible' : ''}`} data-animate="">
            <h2>用真实企业知识体系验证 KnowFlow</h2>
            <p>带上文档、典型问题、组织结构和权限规则，一起评估完整知识闭环</p>
            <div className={styles.ctaButtons}>
              <a href="/contact" className={styles.primaryButton}>申请演示</a>
              <a href="/docs/intro" className={styles.secondaryButton}>查看文档</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
