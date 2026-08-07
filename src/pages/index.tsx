import {useRef, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  BookOpen,
  Building,
  CheckCircle,
  Cpu,
  FileText,
  Lock,
  MessageSquare,
  Shield,
  Target,
  Users,
} from '../components/Icons';
import {usePretextLayout} from '../hooks/usePretextLayout';
import styles from './index.module.css';

const foundations = [
  {
    icon: BookOpen,
    title: '读得懂',
    description: '保留标题、表格、图片和版面结构，让检索建立在文档原始语义上。',
  },
  {
    icon: Shield,
    title: '管得住',
    description: '目录级 RBAC 贯穿知识库问答、Deep Agent 与知识运营，不让权限停在管理后台。',
  },
  {
    icon: Lock,
    title: '不出域',
    description: '支持私有化与离线部署，数据、模型和系统组件由企业自主控制。',
  },
];

const structureSteps = [
  {label: '多源文档', items: ['PDF / Word', 'Excel / PPT', '图片 / OCR', '扫描件']},
  {label: '结构解析引擎', items: ['版面识别', '段落层级', '表格与公式', '坐标定位']},
  {label: '结构化表示', items: ['标题树', '父子关系', '页面与坐标', '语义块']},
  {label: '可信索引', items: ['目录索引', '向量索引', '全文索引', '关系索引']},
];

const rbacSteps = [
  {
    number: '01',
    title: '企业组织与授权主体',
    items: ['用户', '多层级组织', '跨部门协作组'],
  },
  {
    number: '02',
    title: '知识库目录树',
    items: ['集团与部门目录', '业务知识库', '项目与专题空间'],
  },
  {
    number: '03',
    title: '目录权限继承',
    items: ['查看 / 编辑 / 管理', '从父目录向下继承', '多来源权限取最高值'],
  },
  {
    number: '04',
    title: '统一权限应用范围',
    items: ['检索与问答', 'Deep Agent', '运营数据与导出'],
  },
];

const deploymentLayers = [
  {label: '应用层', items: ['企业门户', 'Web / API', 'OA / ERP / PLM', '企业协同工具']},
  {label: '应用服务层', items: ['检索服务', 'Deep Agent', '文档解析', '权限与审计']},
  {label: '智能与引擎层', items: ['结构检索', '语义检索', '视觉检索', '模型服务']},
  {label: '基础设施层', items: ['CPU / GPU', '对象与块存储', '内网网络', '备份与容灾']},
];

const retrievalPaths = [
  {title: '结构检索', meta: '目录 / 标题 / 层级', detail: '先按文档结构缩小范围'},
  {title: '语义检索', meta: '向量 / 关键词', detail: '覆盖稳定、高频的问答'},
  {title: '视觉检索', meta: '页面 / 图表 / 版面', detail: '补充图表和视觉证据'},
];

const scenarios = [
  {title: '财务分析', description: '跨报告提取指标、核验口径，形成带来源的分析底稿。'},
  {title: '法务合规', description: '在授权合同与制度范围内定位条款、比对差异。'},
  {title: '人力资源', description: '让制度问答严格跟随员工组织、角色与目录权限。'},
  {title: '研发工程', description: '贯通规范、设计资料与项目文档，保留技术证据链。'},
  {title: '供应链管理', description: '聚合供应商、质量与交付材料，支持复杂问题研究。'},
];

const pocChecks = [
  '复杂文档能否正确解析',
  '关键问题能否找到完整证据',
  '权限边界能否贯穿应用',
  '部署条件能否适配企业环境',
];

function Arrow(): ReactNode {
  return <span className={styles.flowArrow} aria-hidden="true">→</span>;
}

export default function Home(): ReactNode {
  const pageRef = useRef<HTMLElement>(null);
  usePretextLayout(pageRef);

  return (
    <Layout
      title="KnowFlow - 可信、可控的企业知识系统"
      description="KnowFlow 以复杂文档结构化解析、多路径检索、目录级 RBAC 和私有化部署，帮助企业构建可信、可控、可追溯的知识系统。"
    >
      <main className={styles.page} ref={pageRef}>
        <header className={styles.hero}>
          <div className={styles.blueprintGrid} aria-hidden="true" />
          <div className={`container ${styles.homeContainer} ${styles.heroLayout}`}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>可信技术型 · 企业知识系统</span>
              <h1 data-pretext>复杂文档，必须先读懂，才能可靠交付</h1>
              <p className={styles.heroLead} data-pretext>
                从文档解析、知识库问答、Deep Agent 到追溯交付，全链路遵循目录级 RBAC；支持私有化与离线部署，让知识可用、权限可控、数据不出域。
              </p>
              <ul className={styles.heroPoints}>
                <li><BookOpen size={20} /><span><b>结构优先，回答回到原文</b>保留标题层级、表格和版面，答案可定位到页码与原文片段。</span></li>
                <li><Target size={20} /><span><b>知识增强，串起跨文档关系</b>SAG 处理多跳问题，LLM Wiki 连接实体、概念与来源。</span></li>
                <li><FileText size={20} /><span><b>文档执行，直接产出业务成果</b>Deep Agent 深读、抽取并生成报告或表格，每项结论保留引用。</span></li>
              </ul>
              <div className={styles.actions}>
                <Link className={styles.primaryButton} to="/contact">申请 POC 验证</Link>
                <Link className={styles.secondaryButton} to="/product">查看产品能力</Link>
              </div>
            </div>

            <div className={styles.heroSystem}>
              <span className={styles.boundaryLabel}>当前用户可访问范围</span>
              <span className={styles.intranetLabel}><Lock size={14} /> 企业内网</span>
              <div className={styles.heroSystemFlow}>
                <div className={styles.systemColumn}>
                  <small>企业组织<br />目录权限</small>
                  <div className={styles.folderTree}>
                    <span>▾ 集团总部</span>
                    <span>　▾ 研发中心</span>
                    <span className={styles.activeFolder}>　　▰ 产品部</span>
                    <span>　　▱ 项目 A</span>
                    <span>　▱ 合规与风控</span>
                    <span>　▱ 财务中心</span>
                  </div>
                </div>
                <Arrow />
                <div className={styles.retrievalMini}>
                  <small>多路径检索</small>
                  <span>结构检索</span>
                  <span>语义检索</span>
                  <span>视觉检索</span>
                </div>
                <Arrow />
                <div className={styles.agentMini}>
                  <small>知识库问答 / Deep Agent</small>
                  <b>直接回答或交付报告</b>
                  <p>证据 E1 · E2 · E3</p>
                  <i>仅在授权知识范围内</i>
                </div>
                <Arrow />
                <div className={styles.deliveryMini}>
                  <small>合规交付</small>
                  <span>▤ 结构化数据</span>
                  <span>▧ 分析报告</span>
                  <span>▣ 业务简报</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.foundationStrip} aria-labelledby="foundations-title">
          <div className={`container ${styles.homeContainer}`}>
            <h2 id="foundations-title" data-pretext>企业知识系统的三条底线</h2>
            <div className={styles.foundationGrid}>
              {foundations.map(({icon: Icon, title, description}) => (
                <article key={title}>
                  <Icon size={25} />
                  <div>
                    <h3>{title}</h3>
                    <p data-pretext>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.homeContainer} ${styles.sectionIntroGrid}`}>
            <div className={styles.sectionNumber}>01</div>
            <div className={styles.sectionIntro}>
              <span className={styles.kicker}>STRUCTURE-AWARE RAG</span>
              <h2 data-pretext>先读懂文档结构，再谈检索效果</h2>
              <p data-pretext>企业材料的含义往往藏在标题层级、表格关系、页面布局和上下文中。KnowFlow 保留这些结构，使每条证据都可定位、可核验。</p>
            </div>
          </div>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.structureFlow}>
              {structureSteps.map((step, index) => (
                <div className={styles.structureNodeWrap} key={step.label}>
                  <article className={styles.structureNode}>
                    <small>{step.label}</small>
                    {step.items.map((item) => <span key={item}>{item}</span>)}
                  </article>
                  {index < structureSteps.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.rbacSection}`}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>DIRECTORY-LEVEL RBAC</span>
                <h2 data-pretext>目录级 RBAC：最小权限访问，保障协作与合规</h2>
              </div>
              <p data-pretext>权限从组织关系进入知识目录，再自动贯穿检索、Agent 和运营数据。采购者看到的不只是“有权限功能”，而是一条完整的治理链路。</p>
            </div>
            <div className={styles.rbacFlow}>
              {rbacSteps.map((step, index) => (
                <div className={styles.rbacNodeWrap} key={step.number}>
                  <article className={styles.rbacNode}>
                    <span className={styles.nodeNumber}>{step.number}</span>
                    <h3>{step.title}</h3>
                    <ul>{step.items.map((item) => <li key={item}><CheckCircle size={16} />{item}</li>)}</ul>
                  </article>
                  {index < rbacSteps.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
            <div className={styles.rbacFootnote}>
              <Lock size={18} />
              <span><b>权限不是独立模块。</b> 同一用户在问答、Deep Agent、知识运营和导出中，始终只接触其可访问目录。</span>
            </div>
          </div>
        </section>

        <section className={styles.deploySection}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.deployHeading}>
              <div>
                <span className={styles.kicker}>PRIVATE & OFFLINE DEPLOYMENT</span>
                <h2 data-pretext>私有化与离线部署，数据和模型都由企业控制</h2>
              </div>
              <p data-pretext>适配企业内网、隔离网络和既有基础设施。应用、服务、模型、存储与权限边界均可纳入企业自己的安全体系。</p>
            </div>
            <div className={styles.deployArchitecture}>
              <div className={styles.deployLayers}>
                {deploymentLayers.map((layer) => (
                  <div className={styles.deployLayer} key={layer.label}>
                    <strong>{layer.label}</strong>
                    <div>{layer.items.map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                ))}
              </div>
              <Arrow />
              <div className={styles.localStack}>
                <small>本地部署</small>
                <span>PostgreSQL</span>
                <span>向量数据库</span>
                <span>对象存储</span>
                <span>备份与容灾</span>
              </div>
              <Arrow />
              <div className={styles.optionalStack}>
                <small>可选增强服务</small>
                <span>结构解析</span>
                <span>视觉模型</span>
                <span>大语言模型</span>
                <span>OCR / 版面分析</span>
              </div>
            </div>
            <div className={styles.complianceRow}>
              <span>TLS 传输加密</span><span>AES-256 存储加密</span><span>RBAC 访问控制</span><span>操作审计</span><span>备份与容灾</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`container ${styles.homeContainer} ${styles.retrievalLayout}`}>
            <div className={styles.retrievalCopy}>
              <span className={styles.kicker}>MULTI-PATH RETRIEVAL</span>
              <h2 data-pretext>多路径检索互为补充，提升召回与精度</h2>
              <p data-pretext>普通 RAG 把问题送入单一路径，复杂文档容易遗漏层级、表格和版面信息。KnowFlow 让不同检索路径协同，再回到原文证据。</p>
              <ul>
                <li><CheckCircle size={18} />覆盖更全：多路径互补，减少遗漏</li>
                <li><CheckCircle size={18} />逻辑更稳：定位范围后再生成</li>
                <li><CheckCircle size={18} />更可控：路径、证据和结果可追溯</li>
              </ul>
            </div>
            <div className={styles.retrievalCompare}>
              <div className={styles.ordinaryRag}>
                <small>普通 RAG</small>
                <span>用户问题</span><Arrow /><span>向量检索</span><Arrow /><span>Top K 片段</span><Arrow /><b>生成</b>
              </div>
              <div className={styles.knowflowRag}>
                <small>KnowFlow · 多路径融合</small>
                <div className={styles.pathGrid}>
                  {retrievalPaths.map((path) => (
                    <article key={path.title}>
                      <b>{path.title}</b><span>{path.meta}</span><p>{path.detail}</p>
                    </article>
                  ))}
                </div>
                <div className={styles.fusionLine}>结果融合与重排 → 高质量上下文 → 生成与证据输出</div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.qaSection}`}>
          <div className={`container ${styles.homeContainer} ${styles.qaLayout}`}>
            <div className={styles.qaCopy}>
              <span className={styles.kicker}>CORE KNOWLEDGE Q&amp;A</span>
              <h2 data-pretext>知识库问答：让每个员工在权限内，快速得到可核验答案</h2>
              <p data-pretext>
                面向日常、高频问题，员工可以选择知识库或指定文档直接提问。系统结合对话上下文检索，在答案中标注来源，并支持连续追问。
              </p>
              <div className={styles.qaCapabilities}>
                <span><CheckCircle size={17} />选择一个或多个知识库</span>
                <span><CheckCircle size={17} />@文档精确限定本轮材料</span>
                <span><CheckCircle size={17} />引用回到原文页码与片段</span>
                <span><CheckCircle size={17} />多轮会话保持问题上下文</span>
              </div>
              <p className={styles.qaChannels}>
                可接入企业微信、钉钉、飞书、Dify 与业务系统，让知识问答进入员工已有工作入口。
              </p>
            </div>
            <div className={styles.qaWorkspace}>
              <div className={styles.qaToolbar}>
                <span><MessageSquare size={16} /> 企业知识助手</span>
                <span className={styles.qaScope}><Lock size={13} /> 已授权：制度库、产品库</span>
              </div>
              <div className={styles.userQuestion}>差旅报销超过 5000 元，需要哪些审批？</div>
              <div className={styles.answerBlock}>
                <div className={styles.answerAvatar}>K</div>
                <div>
                  <b>根据《费用报销管理制度》，需完成三级审批：</b>
                  <ol>
                    <li>直属负责人确认费用真实性；</li>
                    <li>部门负责人审核预算与业务必要性；</li>
                    <li>财务负责人完成合规复核。</li>
                  </ol>
                  <p>单笔超过 20,000 元时，还需分管领导审批。</p>
                </div>
              </div>
              <div className={styles.citationGrid}>
                <article><span>引用 1</span><b>费用报销管理制度</b><small>第 4 章 · 审批权限 · p.12</small></article>
                <article><span>引用 2</span><b>财务内控手册</b><small>3.2 大额费用复核 · p.28</small></article>
              </div>
              <div className={styles.followUp}>继续追问：出差人和审批人是同一人时怎么办？ <span>→</span></div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.agentSection}`}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>DEEP AGENT</span>
                <h2 data-pretext>交付可审计、可追溯的业务成果</h2>
              </div>
              <p data-pretext>Deep Agent 在当前用户授权范围内深度阅读材料，完成结构化提取、分析与报告生成，并把结论连回证据。</p>
            </div>
            <div className={styles.agentFlow}>
              <article><MessageSquare size={22} /><small>复杂任务</small><b>跨文档研究问题</b><span>明确目标与交付格式</span></article>
              <Arrow />
              <article><Target size={22} /><small>检索结果</small><b>E1 · E2 · E3</b><span>页码、章节、坐标与原文</span></article>
              <Arrow />
              <article><Cpu size={22} /><small>Deep Agent</small><b>阅读 · 分析 · 生成</b><span>不超出授权知识范围</span></article>
              <Arrow />
              <article><FileText size={22} /><small>交付物</small><b>Excel · Word · PDF</b><span>结论和数据均带证据</span></article>
            </div>
          </div>
        </section>

        <section className={styles.scenarioSection}>
          <div className={`container ${styles.homeContainer}`}>
            <div className={styles.scenarioIntro}>
              <span className={styles.kicker}>REAL WORKFLOWS</span>
              <h2 data-pretext>把复杂知识工作放进真实业务流程</h2>
            </div>
            <div className={styles.scenarioGrid}>
              {scenarios.map((scenario, index) => (
                <article key={scenario.title}>
                  {index === 0 && <Building size={22} />}
                  {index === 1 && <Shield size={22} />}
                  {index === 2 && <Users size={22} />}
                  {index === 3 && <Cpu size={22} />}
                  {index === 4 && <FileText size={22} />}
                  <h3>{scenario.title}</h3>
                  <p data-pretext>{scenario.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pocSection}>
          <div className={`container ${styles.homeContainer} ${styles.pocGrid}`}>
            <div>
              <span className={styles.kicker}>POC WITH YOUR DATA</span>
              <h2 data-pretext>用企业真实材料验证效果</h2>
              <p data-pretext>不靠通用演示数据做判断。带上典型文档、权限关系和业务问题，用一轮 POC 验证产品是否真正适合你的企业。</p>
            </div>
            <ul>
              {pocChecks.map((item) => <li key={item}><CheckCircle size={18} />{item}</li>)}
            </ul>
            <div className={styles.pocActions}>
              <Link className={styles.primaryButton} to="/contact">现在申请 POC</Link>
              <Link className={styles.secondaryButton} to="/docs/intro">先看技术文档</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
