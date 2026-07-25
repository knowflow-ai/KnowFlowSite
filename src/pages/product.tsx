import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import styles from './product.module.css';
import {
  FileText,
  Image,
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
    id: 'wiki',
    number: '03',
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
    number: '04',
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
    number: '05',
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
    number: '06',
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
  const [specRef, specVisible] = useScrollAnimation();
  const [compRef, compVisible] = useScrollAnimation();
  const [scenRef, scenVisible] = useScrollAnimation();
  const [ctaRef, ctaVisible] = useScrollAnimation();

  return (
    <Layout
      title="产品能力 - KnowFlow 企业知识库与知识运营平台"
      description="了解 KnowFlow 的文档结构化 RAG、SAG 多跳检索、ColPali 视觉融合、LLM Wiki 知识图谱、企业知识运营闭环、知识库树与目录级 RBAC。"
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
              一套平台连接传统 RAG、SAG、视觉检索与 LLM Wiki，<br />
              再用组织、知识库树和目录级 RBAC 管理知识，用真实问答持续驱动优化
            </p>
            <div className={styles.heroHighlights}>
              <div className={styles.heroHighlight}><Target size={18} /><span>结构化 RAG</span></div>
              <div className={styles.heroHighlight}><CheckCircle size={18} /><span>知识图谱</span></div>
              <div className={styles.heroHighlight}><Rocket size={18} /><span>运营闭环</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className="container">
          <div ref={capRef} className={`${styles.sectionHeader} ${capVisible ? 'visible' : ''}`} data-animate="">
            <h2 className={styles.sectionTitle}>六大产品能力</h2>
            <p className={styles.sectionSubtitle}>从知识进入系统、被检索和连接，到被治理和持续优化</p>
          </div>

          {coreCapabilities.map((capability) => (
            <div key={capability.id} className={`${styles.capabilitySection} ${styles[`cap${capability.color.charAt(0).toUpperCase() + capability.color.slice(1)}`]}`}>
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
