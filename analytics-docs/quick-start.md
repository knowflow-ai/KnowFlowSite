---
sidebar_position: 2
title: 快速开始
description: 用 Docker Compose 在 5 分钟内部署 KnowFlow 智能问数，连接业务数据库、配置模型端点并完成第一次自然语言问数。
keywords: [智能问数部署, KnowFlow Analytics Docker, 语义层快速开始, 问数快速上手]
---

# 快速开始

用 Docker Compose 把智能问数跑起来，连上一个业务库，完成第一次自然语言提问。

## 环境要求

| 项目 | 要求 |
|---|---|
| Docker | 已安装 Docker 与 Docker Compose |
| 模型端点 | 可访问的 OpenAI-compatible **Chat** 与 **Embedding** 模型 |
| 业务数据库 | PostgreSQL 或 MySQL（也可以先只用 Excel 上传） |
| 架构 | `linux/amd64` 与 `linux/arm64` 均支持 |

Compose 会同时启动 Analytics 服务和它自己的 catalog PostgreSQL。**业务数据始终留在你自己的数据库里**，系统只维护治理后的目录、版本和查询规则。

## 一、启动服务

```bash
git clone https://github.com/knowflow-ai/analytics.git
cd analytics
docker compose -f docker-compose.oss.yml up -d
```

打开 [http://localhost:9395](http://localhost:9395)，按页面提示完成初始化。

默认镜像为 `knowflowai/analytics:v0.0.3`。

## 二、配置模型端点

进入「设置」页面，填写两个 OpenAI-compatible 端点：

- **Chat 模型**：负责理解用户意图、生成业务名 S2SQL
- **Embedding 模型**：负责语义索引与业务说法召回

:::tip
Chat 模型不直接生成物理 SQL，因此更换模型不会改变业务口径。你可以先用较小的模型验证链路，再按准确性需求升级。
:::

## 三、添加数据源

在「数据库连接」中添加要分析的业务库，支持同时添加多个：

```text
postgresql://user:password@host:5432/your_database
mysql://user:password@host:3306/your_database
```

容器连接**宿主机**数据库时使用 `host.docker.internal`：

```text
postgresql://user:password@host.docker.internal:5432/your_database
```

也可以不连数据库，直接在「上传表格」中上传 Excel，系统会把它落库成一个数据源，走与数据库表完全相同的建模与问数链路。

:::warning 使用只读账号
生产环境请使用专用**只读**数据库账号。系统本身有只读 Guard，但数据库侧的最小权限仍是必要的一层。

数据源不能是服务自己的 catalog 库，否则内部表会被当成业务表建模。
:::

## 四、完成建模并发布

```text
连接数据源
  → 导入表并确认实体关系
  → AI 生成建模草案
  → 审核指标、维度、术语和值字典
  → 运行结构校验与真实数据质量报告
  → 用两个 Playground 试问
  → 发布不可变 Release
  → Agent、UI 或 API 开始查询
```

建模工作台分四页：**数据源**、**语义建模**、**问数验证**、**问数反馈**。详细步骤见[语义建模](./semantic-model/index.md)。

## 五、第一次提问

发布 Release 之后，在「问数验证」里用自然语言试问，逐题核对结果是否正确：

![通过自然语言试问验证语义映射与查询结果](/img/analytics/product-natural-language-query.png)

商业版把同一个引擎接到面向业务用户的[问数助手](./ask/index.md)上，业务同事可以直接对话式提问、追问和下钻。

## 常用命令

```bash
# 查看日志
docker compose -f docker-compose.oss.yml logs -f analytics

# 重启服务
docker compose -f docker-compose.oss.yml restart analytics

# 停止服务（保留数据）
docker compose -f docker-compose.oss.yml down
```

状态存放在两个 volume：`catalog-data` 保存语义资源、Revision 和 Release，`analytics-data` 保存独立版设置。它们不复制业务库数据。

更多参数见[部署与运维](./deployment.md)。

## 下一步

- [数据源接入](./semantic-model/data-source.md)
- [AI 建模与人工审核](./semantic-model/ai-modeling.md)
- [发布、版本与回滚](./semantic-model/publish.md)
