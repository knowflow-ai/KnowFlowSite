---
sidebar_position: 6
title: 部署与运维
description: KnowFlow 智能问数的 Docker Compose 部署参数、环境变量、数据卷、日常运维命令与从源码开发的步骤。
keywords: [问数部署, Docker Compose, 环境变量配置, 私有化部署运维]
---

# 部署与运维

## Compose 参数

| 变量 | 默认值 | 作用 |
|---|---|---|
| `KNOWFLOW_ANALYTICS_IMAGE` | `knowflowai/analytics:v0.0.3` | 要运行的 Analytics 镜像 |
| `KNOWFLOW_OSS_BIND_ADDRESS` | `127.0.0.1` | 宿主机监听地址 |
| `KNOWFLOW_OSS_PORT` | `9395` | 宿主机端口 |
| `CATALOG_DB_PASSWORD` | `analytics` | 内置 catalog PostgreSQL 密码，必须 URL-safe |
| `KNOWFLOW_OSS_ACCESS_PASSWORD` | 空 | 独立版共享访问口令 |

### 更多运行参数

| 变量 | 默认值 | 说明 |
|---|---|---|
| `KNOWFLOW_OSS_CATALOG_DATABASE_URL` | 必填 | 服务自己的 catalog 库 |
| `KNOWFLOW_OSS_DATA_DIR` | `./data` | 独立版设置目录 |
| `KNOWFLOW_OSS_ALLOW_DEBUG_SQL` | `true` | 是否允许授权诊断返回物理 SQL |

## 本地部署

```bash
docker compose -f docker-compose.oss.yml up -d
```

默认只监听 `127.0.0.1`，仅本机可访问。

## 远程部署

远程部署时把监听地址设为 `0.0.0.0`，**同时**配置访问口令、HTTPS 反向代理和防火墙：

```bash
KNOWFLOW_OSS_BIND_ADDRESS=0.0.0.0 \
KNOWFLOW_OSS_ACCESS_PASSWORD='replace-me' \
docker compose -f docker-compose.oss.yml up -d
```

:::warning
`KNOWFLOW_OSS_ACCESS_PASSWORD` 是**单用户共享口令**，不是多用户认证或 RBAC。需要按人分配数据范围请使用[商业版](./open-source-vs-commercial.md)。
:::

## 日常命令

```bash
# 查看日志
docker compose -f docker-compose.oss.yml logs -f analytics

# 重启
docker compose -f docker-compose.oss.yml restart analytics

# 停止（保留数据）
docker compose -f docker-compose.oss.yml down
```

## 数据卷

| Volume | 内容 |
|---|---|
| `catalog-data` | 语义资源、Revision 和 Release |
| `analytics-data` | 独立版设置 |

**它们不复制业务库数据。** 业务数据始终留在你自己的数据库中。

## 连接宿主机数据库

容器访问宿主机 PostgreSQL 时使用 `host.docker.internal`：

```text
postgresql://user:password@host.docker.internal:5432/your_database
```

## catalog 库自动创建

从 `v0.0.3` 起，目录库不存在时服务会自己建出来（与上传库 `analytics_uploads` 同一套做法）。

- 建不出来时给出明确的 `CATALOG_DATABASE_UNAVAILABLE`，**不静默回落到别的库**
- 已存在的库**原样保留，绝不重建**

## 从源码开发

需要 Python 3.12+、Node 18+、[uv](https://docs.astral.sh/uv/) 和 PostgreSQL。

```bash
uv sync --python 3.12 --all-extras
(cd web && npm install)

createdb analytics_catalog
cp .env.oss.example .env
# 编辑 KNOWFLOW_OSS_CATALOG_DATABASE_URL
set -a; source .env; set +a

# 终端 1
uv run knowflow-analytics-oss

# 终端 2
cd web && npm run dev
```

自己构建镜像：

```bash
docker build -t knowflowai/analytics:local .
KNOWFLOW_ANALYTICS_IMAGE=knowflowai/analytics:local \
docker compose -f docker-compose.oss.yml up -d
```

测试：

```bash
uv run pytest
uv run ruff check src tests
(cd web && npx vitest run)
```

## 代码结构

```text
src/knowflow_analytics/
├── api.py             # 项目、Revision、Catalog、发布和查询 API
├── application.py     # 用例编排与产品不变量
├── catalog/           # PostgreSQL 持久化与 Release
├── modeling/          # 内省、AI 建模、质量报告和 Scope 编译
├── query/             # Mapper、Parser、Corrector、澄清与诊断
├── semantic/          # 语义索引与 S2SQL Translator
├── execution/         # SQL Guard 与只读执行
├── gateways/          # Chat、Embedding、Knowledge 网关
└── oss/               # 独立版配置、鉴权和静态托管
```

:::info 贡献须知
改查询管道前，先阅读 `tests/unit/test_query_stage_pipeline.py`、`tests/unit/test_textual_s2sql_pipeline.py` 和相关设计文档。

**自然语言与结构化查询是两条独立合同，不能为了实现方便合并。**

不要在运行时代码中加入面向某个数据集、业务名或基准题措辞的修复分支。
:::
