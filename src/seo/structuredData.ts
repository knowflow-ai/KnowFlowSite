/**
 * 站点级 schema.org 结构化数据。
 *
 * 注入到每个页面的 `<head>`，帮助搜索引擎理解 KnowFlow 的组织信息
 * 与两条产品线（企业知识库、智能问数）各自的能力边界。
 */

const SITE_URL = 'https://www.knowflowchat.cn';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KnowFlow',
  url: SITE_URL,
  logo: `${SITE_URL}/img/k-icon-3.svg`,
  description:
    '面向企业的私有化 AI 数据基础设施，提供企业级知识库与智能问数两条产品线',
  sameAs: [
    'https://github.com/weizxfree/KnowFlow',
    'https://github.com/knowflow-ai/analytics',
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KnowFlow',
  url: SITE_URL,
  inLanguage: 'zh-Hans',
  publisher: {'@type': 'Organization', name: 'KnowFlow'},
};

const knowledgeBase = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KnowFlow 企业知识库',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Linux',
  url: `${SITE_URL}/product`,
  description:
    '以文档结构理解为核心，构建准确、可靠、可落地的私有化企业级知识库。支持深度文档解析、多模态知识库、目录级 RBAC 权限管理与私有化部署。',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
    description: '提供 14 天免费试用',
  },
  featureList: [
    '深度文档结构解析',
    '多模态知识库（图片、表格、视频）',
    '更智能的分块方法（Smart/Title/Regex/Parent-Child/Page/ColPali）',
    '目录级 RBAC 权限管理体系',
    'Deep Agent 深度阅读与成果交付',
    '私有化离线部署',
    '知识库导入导出与备份恢复',
    'RESTful API 集成',
  ],
};

const analytics = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KnowFlow 智能问数',
  alternateName: 'KnowFlow Analytics',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Linux',
  url: `${SITE_URL}/analytics`,
  description:
    '面向 AI Agent 与数据应用的语义层和受治理查询引擎。LLM 只生成业务名 S2SQL，物理 SQL 由确定性编译器生成，保证口径一致、可审计、不出现静默错答。',
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
    description: '开源版免费，商业版提供问数助手、报表与多用户数据权限',
  },
  featureList: [
    '受治理语义目录（指标、维度、术语、维度值、关系）',
    'AI 辅助建模与人工逐项审核',
    'S2SQL 确定性编译与冻结 Join 路径',
    '只读 AST 白名单与执行边界',
    '不可变 Release 与版本回滚',
    '词汇缺口收件箱与业务词典回流',
    '固定阶段查询诊断与脱敏导出',
    'PostgreSQL / MySQL / Excel 多数据源',
  ],
};

export const structuredData: readonly Record<string, unknown>[] = [
  organization,
  website,
  knowledgeBase,
  analytics,
];
