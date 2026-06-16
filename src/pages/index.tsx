import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const capabilityGroups = [
  {
    number: '01',
    title: '文档解析增强',
    description: '集成 MinerU 3.x、PaddleOCR 等现代解析引擎，提升复杂 PDF、扫描件、表格、公式等内容的解析准确率。',
    points: ['复杂 PDF 与扫描件解析', '表格、公式、版面结构还原', '适配合同、工程资料、技术文档'],
  },
  {
    number: '02',
    title: '更智能的分块方法',
    description: '提供 Smart、Title、Regex、Parent-Child、Page、ColPali 等分块方法，让不同类型文档都能选择合适的知识组织方式。',
    points: ['Smart、Title、Regex、Parent-Child', 'Page 按页分块适合版面强相关文档', 'ColPali 基于视觉模型处理图文页面'],
  },
  {
    number: '03',
    title: '原生多模态能力',
    description: '支持视频解析、图片语义描述、多模态向量检索和图文混合知识问答，让非文本知识也能进入检索体系。',
    points: ['关键帧提取、ASR、VLM', '图片自动语义描述，以文搜图', '图文混合知识问答'],
  },
  {
    number: '04',
    title: '检索质量优化',
    description: '面向中文企业知识库调优专业术语检索、粗召回和精排链路，提升答案命中率和可用性。',
    points: ['中文专业术语优化', '粗召回 + 精排两层排序', '企业场景检索权重调优'],
  },
  {
    number: '05',
    title: '企业级与开源合规',
    description: '底层优先采用 PostgreSQL、Milvus、RustFS 等开源协议友好的组件，降低私有化和二次开发授权风险。',
    points: ['协议友好的基础组件', '完全私有化部署', '数据保留在客户本地环境'],
  },
  {
    number: '06',
    title: '企业级工程化能力',
    description: '围绕权限、备份、嵌入和业务系统集成补齐生产环境所需能力，让知识库真正进入企业流程。',
    points: ['RBAC 多级权限管理', '知识库导入导出、备份恢复', 'Dify、企业微信、飞书、钉钉集成'],
  },
];

const k4Layers = [
  {
    label: 'K1',
    title: 'Knowledge Planning',
    subtitle: '知识库规划',
    answer: '知识在哪里',
  },
  {
    label: 'K2',
    title: 'Structure Planning',
    subtitle: '文件目录规划',
    answer: '知识怎么组织',
  },
  {
    label: 'K3',
    title: 'Governance',
    subtitle: '知识治理',
    answer: '企业怎么说',
  },
  {
    label: 'K4',
    title: 'Metadata',
    subtitle: '元数据治理',
    answer: 'AI 怎么理解',
  },
];

const scenarioCards = [
  {
    title: '合同与制度知识库',
    description: '面向合同、制度、规范和审计材料，保留版面、条款、表格和上下文关系，提升检索可解释性。',
  },
  {
    title: '工程与技术文档问答',
    description: '处理工程资料、产品手册、技术方案和故障记录，支持标题层级、父子分块和专业术语检索。',
  },
  {
    title: '多模态资料检索',
    description: '将图片、PPT、视频关键帧和语音转写统一纳入知识库，支持图文混合问答和以文搜图。',
  },
  {
    title: 'Agent 与业务系统知识底座',
    description: '通过 API、网页嵌入和平台集成，为客服、办公协同、内部 Agent 提供可信知识上下文。',
  },
];

const integrationRows = [
  {
    title: '权限与组织',
    description: 'RBAC 覆盖用户、团队、知识库等资源，适配企业多组织、多角色协作。',
  },
  {
    title: '数据与运维',
    description: '支持知识库导入导出、备份恢复和完全私有化部署，方便长期运营。',
  },
  {
    title: '业务入口',
    description: '支持网站嵌入，并可接入 Dify、企业微信、飞书、钉钉等业务平台。',
  },
  {
    title: '合规底座',
    description: '优先采用 PostgreSQL、Milvus、RustFS 等组件，降低企业授权和供应链风险。',
  },
];

const processSteps = [
  {step: '01', title: '解析', description: '从 PDF、扫描件、表格、图片、视频中提取可治理的知识结构。'},
  {step: '02', title: '分块', description: '按语义、标题、正则、父子结构、页面或视觉模型生成适合检索的知识片段。'},
  {step: '03', title: '治理', description: '通过目录规划、权限控制、元数据和人工维护提升知识质量。'},
  {step: '04', title: '应用', description: '面向问答、搜索、Agent 和业务系统输出可追溯知识服务。'},
];

export default function Home(): ReactNode {
  const productPreview = useBaseUrl('/img/home-chat.png');

  return (
    <Layout
      title="KnowFlow - 企业级知识库与 K4 知识治理平台"
      description="KnowFlow 面向私有化、内网和复杂文档场景，提供文档解析增强、智能分块、多模态检索、企业权限治理与 K4 Framework 知识治理方法论。"
    >
      <header className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <span className={styles.eyebrow}>企业级知识库与 K4 知识治理平台</span>
            <h1 className={styles.heroTitle}>让复杂企业知识真正可被 AI 理解</h1>
            <p className={styles.heroLead}>
              KnowFlow 面向私有化、内网和复杂文档场景，围绕文档解析、智能分块、多模态检索、权限治理和业务集成，构建可维护、可追溯、可落地的企业知识库。
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="/contact">预约产品演示</a>
              <a className={styles.secondaryButton} href="/docs/intro">查看产品文档</a>
            </div>
            <div className={styles.heroBadges}>
              <span>MinerU 3.x</span>
              <span>PaddleOCR</span>
              <span>Milvus</span>
              <span>RBAC</span>
            </div>
          </div>
          <div className={styles.productFrame}>
            <div className={styles.frameBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span>KnowFlow 知识库控制台</span>
            </div>
            <img src={productPreview} alt="Corpus2Skill 系统架构示意图" />
          </div>
        </div>
      </header>

      <section className={styles.trust}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={`${styles.trustItem} ${styles.trustLabel}`}>从复杂文档到可信 AI 上下文</div>
            <div className={styles.trustItem}>
              <strong>6 类</strong>
              <span>Smart / Title / Regex / Parent-Child / Page / ColPali</span>
            </div>
            <div className={styles.trustItem}>
              <strong>多模态</strong>
              <span>图片、视频、语音、表格与文本统一检索</span>
            </div>
            <div className={styles.trustItem}>
              <strong>私有化</strong>
              <span>数据可完整保留在客户本地环境</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whiteSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.kicker}>CAPABILITIES</div>
            <h2>围绕企业知识进入 AI 的关键链路建设能力</h2>
            <p>
              KnowFlow 不只提供问答入口，而是从解析、分块、检索、治理、部署和集成六个层面补齐企业级知识库的生产能力。
            </p>
          </div>
          <div className={styles.capabilityGrid}>
            {capabilityGroups.map((item) => (
              <article className={styles.capabilityCard} key={item.title}>
                <small>{item.number}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.k4Section}`}>
          <div className={styles.k4Intro}>
            <div className={styles.kicker}>K4 FRAMEWORK</div>
            <h2>K4 Framework™ 企业知识治理方法论</h2>
            <p>
              K4 Framework™ 是 KnowFlow 提出的企业知识治理方法论，通过知识库规划、结构规划、知识治理与元数据治理四大层级，帮助企业构建真正适用于 AI 检索与 Agent 推理的知识体系。
            </p>
            <div className={styles.k4Formula}>Knowledge → Structure → Governance → Metadata</div>
            <span className={styles.k4Note}>K4 = 四层知识治理体系</span>
          </div>
          <div className={styles.k4Flow}>
            {k4Layers.map((layer) => (
              <article className={styles.k4Card} key={layer.label}>
                <small>{layer.label}</small>
                <h3>{layer.title}</h3>
                <p>{layer.subtitle}</p>
                <b>{layer.answer}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whiteSection}>
        <div className="container">
          <div className={`${styles.sectionHead} ${styles.center}`}>
            <div className={styles.kicker}>SCENARIOS</div>
            <h2>适合高复杂度、高合规要求的企业知识场景</h2>
            <p>从合同制度到工程资料，从多模态资料到 Agent 应用，KnowFlow 重点解决企业知识“难解析、难组织、难治理、难检索”的问题。</p>
          </div>
          <div className={styles.useCases}>
            {scenarioCards.map((item) => (
              <article className={styles.useCase} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.enterprise}`}>
          <div className={styles.enterpriseCard}>
            <h2>按企业生产环境要求设计</h2>
            <p>
              企业知识库不是单点工具，需要同时满足权限、合规、运维、集成和长期维护。KnowFlow 将这些能力作为产品底座，而不是后置插件。
            </p>
          </div>
          <div className={styles.securityList}>
            {integrationRows.map((item) => (
              <div className={styles.securityRow} key={item.title}>
                <b>{item.title}</b>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whiteSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div className={styles.kicker}>WORKFLOW</div>
            <h2>从文档进入系统，到知识进入业务流程</h2>
            <p>KnowFlow 的落地路径围绕“解析、分块、治理、应用”展开，让企业能够持续维护知识质量，而不是一次性导入文档后失控。</p>
          </div>
          <div className={styles.process}>
            {processSteps.map((item) => (
              <article className={styles.processStep} key={item.step}>
                <small>{item.step}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={`container ${styles.ctaBox}`}>
          <div>
            <h2>用真实企业文档评估 KnowFlow</h2>
            <p>带上你的 PDF、扫描件、表格、图片或视频资料，从解析质量、分块策略、检索效果和私有化部署条件开始评估。</p>
          </div>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="/contact">申请演示</a>
            <a className={styles.secondaryButton} href="/docs/intro">查看文档</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
