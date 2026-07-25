import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

const capabilityGroups = [
  {
    number: '01',
    title: '文档结构化 RAG',
    description: '不是把文档压成一串纯文本，而是保留标题层级、父子关系、表格、公式、图片和版面结构，让检索建立在文档原有语义上。',
    points: ['MinerU、PaddleOCR 复杂文档解析', 'Smart、Title、Regex、Parent-Child 分块', '引用可追溯到原文位置与上下文'],
  },
  {
    number: '02',
    title: '多路径检索与推理',
    description: '用传统混合检索覆盖稳定、高频的企业问答，用 SAG 处理跨文档、多步骤问题，再以视觉检索补充图表和版式信息。',
    points: ['关键词与向量混合检索', 'SAG 多跳检索与失败回退', 'ColPali 文本、视觉双路 RRF 融合'],
  },
  {
    number: '03',
    title: 'LLM Wiki 知识图谱',
    description: '将知识库自动组织为可搜索、可浏览、可关联的 Wiki，把散落在文档里的实体、概念和关系变成企业知识网络。',
    points: ['LLM 自动生成结构化 Wiki', '全文搜索与跨页面关联', '关系图谱可视化与来源追溯'],
  },
  {
    number: '04',
    title: '企业知识运营闭环',
    description: '从问答使用情况中发现知识缺口，通过明细下钻和 AI 诊断形成优化任务，再持续观察回答质量是否真正改善。',
    points: ['问答指标、趋势与热门内容', '知识缺口聚合与 AI 辅助诊断', '优化任务、批量处理与运营报表'],
  },
  {
    number: '05',
    title: '组织与知识目录治理',
    description: '建立与企业一致的组织和成员体系，再用树状目录管理大量知识库，让知识归属、维护责任和业务边界清晰可见。',
    points: ['多层级企业组织与成员管理', '知识库文件夹树与移动归档', '目录级导入、导出和统一维护'],
  },
  {
    number: '06',
    title: '目录级纯 RBAC',
    description: '将任意知识目录或知识库授权给指定用户、组织或协作组，权限沿目录树和组织关系生效，适配复杂企业协作。',
    points: ['用户、组织、协作组三类授权主体', '查看、编辑、管理三级权限', '目录向下继承，多来源权限取最高值'],
  },
];

const closedLoopLayers = [
  {
    label: '01',
    title: 'Structure',
    subtitle: '结构化知识',
    answer: '保留文档语义',
  },
  {
    label: '02',
    title: 'Retrieve',
    subtitle: '多路径检索',
    answer: '找到正确证据',
  },
  {
    label: '03',
    title: 'Connect',
    subtitle: '知识图谱',
    answer: '建立知识关系',
  },
  {
    label: '04',
    title: 'Operate',
    subtitle: '持续运营',
    answer: '发现并修复缺口',
  },
];

const scenarioCards = [
  {
    title: '制度、合同与技术文档',
    description: '保留章节、条款、表格和上下文关系，通过结构化分块与传统混合检索提供稳定、可追溯的问答。',
  },
  {
    title: '复杂问题研究与分析',
    description: '通过 SAG 跨文档检索和多步推理处理需要组合多个事实、追踪关系或验证证据的复杂问题。',
  },
  {
    title: '企业百科与知识网络',
    description: '使用 LLM Wiki 将实体、概念、文档和引用组织为可搜索、可浏览的企业知识图谱。',
  },
  {
    title: '集团与多部门知识治理',
    description: '按组织和目录规划知识边界，通过目录级 RBAC 把正确的知识交给正确的成员和业务团队。',
  },
];

const integrationRows = [
  {
    title: '组织建模',
    description: '建立多层级组织、成员和跨部门协作组，让系统权限结构与企业实际管理关系一致。',
  },
  {
    title: '知识库树',
    description: '用可嵌套的文件夹树组织知识库，支持移动、归档、导入导出和目录级统一管理。',
  },
  {
    title: '精细授权',
    description: '对任意目录或知识库授予用户、组织、协作组查看、编辑或管理权限，并沿目录向下继承。',
  },
  {
    title: '权限即运营边界',
    description: '知识检索、运营概览、明细下钻和报表导出使用同一 RBAC 范围，避免统计和业务访问越权。',
  },
];

const processSteps = [
  {step: '01', title: '结构化', description: '解析文档版面和层级，按语义、标题、父子关系或页面组织可追溯知识。'},
  {step: '02', title: '检索推理', description: '由传统混合检索覆盖常规问题，SAG 处理复杂多跳问题，视觉路补充图表证据。'},
  {step: '03', title: '连接知识', description: '用 LLM Wiki 提炼实体、概念和关系，把文档集合转成可探索的知识网络。'},
  {step: '04', title: '运营优化', description: '从真实问答发现缺口，完成诊断、修复、任务闭环，并持续衡量优化效果。'},
];

export default function Home(): ReactNode {
  const productPreview = useBaseUrl('/img/home-chat.png');

  return (
    <Layout
      title="KnowFlow - 企业知识库与知识运营平台"
      description="KnowFlow 以文档结构化 RAG 为基础，融合 SAG 多跳检索、LLM Wiki 知识图谱、企业知识运营闭环、知识库树和目录级 RBAC 权限治理。"
    >
      <header className={styles.hero}>
        <div className={`container ${styles.homeContainer} ${styles.heroGrid}`}>
          <div>
            <span className={styles.eyebrow}>企业知识库与知识运营平台</span>
            <h1 className={styles.heroTitle}>从文档结构，到企业知识闭环</h1>
            <p className={styles.heroLead}>
              KnowFlow 以文档结构化 RAG 为底座，融合 SAG 多跳检索与 LLM Wiki 知识图谱，并通过知识运营、组织管理、知识库树和目录级 RBAC，让企业知识真正可用、可管、可持续优化。
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="/contact">预约产品演示</a>
              <a className={styles.secondaryButton} href="/docs/intro">查看产品文档</a>
            </div>
            <div className={styles.heroBadges}>
              <span>Structure-aware RAG</span>
              <span>SAG</span>
              <span>LLM Wiki</span>
              <span>Directory RBAC</span>
            </div>
          </div>
          <div className={styles.productFrame}>
            <div className={styles.frameBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span>KnowFlow 企业知识工作台</span>
            </div>
            <img src={productPreview} alt="KnowFlow 企业知识库产品界面" />
          </div>
        </div>
      </header>

      <section className={styles.trust}>
        <div className={`container ${styles.homeContainer}`}>
          <div className={styles.trustGrid}>
            <div className={`${styles.trustItem} ${styles.trustLabel}`}>一套系统，完成知识建设、应用与运营</div>
            <div className={styles.trustItem}>
              <strong>3 类引擎</strong>
              <span>传统 RAG、SAG、ColPali 协同检索</span>
            </div>
            <div className={styles.trustItem}>
              <strong>知识图谱</strong>
              <span>LLM Wiki 自动连接实体、概念与来源</span>
            </div>
            <div className={styles.trustItem}>
              <strong>纯 RBAC</strong>
              <span>目录、知识库、组织与成员精细授权</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whiteSection}>
        <div className={`container ${styles.homeContainer}`}>
          <div className={styles.sectionHead}>
            <div className={styles.kicker}>CORE ADVANTAGES</div>
            <h2>不止回答问题，而是建立企业知识系统</h2>
            <p>
              从保留文档结构，到多路径检索、知识图谱、运营闭环和组织权限治理，KnowFlow 把企业知识从“导入一批文件”推进到可持续运营。
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
        <div className={`container ${styles.homeContainer} ${styles.k4Section}`}>
          <div className={styles.k4Intro}>
            <div className={styles.kicker}>KNOWLEDGE LOOP</div>
            <h2>从知识建设到持续优化的完整闭环</h2>
            <p>
              企业知识库不能停在“文档已经入库”。KnowFlow 让知识先被准确解析和检索，再形成可浏览的知识网络，最后从真实问答中发现缺口并持续优化。
            </p>
            <div className={styles.k4Formula}>Structure → Retrieve → Connect → Operate</div>
            <span className={styles.k4Note}>每一步都保留来源、权限和可追溯证据</span>
          </div>
          <div className={styles.k4Flow}>
            {closedLoopLayers.map((layer) => (
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
        <div className={`container ${styles.homeContainer}`}>
          <div className={`${styles.sectionHead} ${styles.center}`}>
            <div className={styles.kicker}>SCENARIOS</div>
            <h2>覆盖从知识问答到集团级知识治理</h2>
            <p>同一套知识底座既服务日常问答，也支撑复杂研究、企业百科和多组织权限治理。</p>
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
        <div className={`container ${styles.homeContainer} ${styles.enterprise}`}>
          <div className={styles.enterpriseCard}>
            <h2>按真实企业关系管理知识</h2>
            <p>
              先建立组织、成员和协作组，再用知识库树规划目录。任何目录或知识库都可以精确授权，权限随目录继承，并贯穿检索、管理和知识运营。
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
        <div className={`container ${styles.homeContainer}`}>
          <div className={styles.sectionHead}>
            <div className={styles.kicker}>WORKFLOW</div>
            <h2>让知识越用越完整，而不是越积越乱</h2>
            <p>从结构化解析开始，经由检索和知识连接进入业务，再用真实使用数据驱动下一轮知识优化。</p>
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
        <div className={`container ${styles.homeContainer} ${styles.ctaBox}`}>
          <div>
            <h2>用真实知识体系评估 KnowFlow</h2>
            <p>带上企业文档、组织权限和典型问题，一起验证结构化解析、检索效果、知识图谱和运营闭环。</p>
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
