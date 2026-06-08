---
sidebar_position: 2
description: KnowFlow 安装部署指南，包括 Docker Compose 部署、MinerU 和 DOTS 解析引擎配置、GPU 加速设置及故障排除。
---

# Docker 安装指南

本指南将帮助您完成 KnowFlow docker 部署的完整部署过程，包括环境准备、服务配置和系统启动。 请按照步骤操作，确保每一步都成功完成。

---

## 部署步骤概览

- 环境要求
- 部署架构
- 开始部署
- 第一步：部署 PDF 解析服务
- 第二步：部署 KnowFlow 主服务
- 第三步：配置解析服务连接
- 第四步：验证部署

---

## 💻 环境要求

### 硬件配置

| 组件 | 最低要求 | 推荐配置 | 说明 |
|------|---------|---------|------|
| **CPU** | ≥ 4 cores (x86) | ≥ 8 cores | 影响并发处理能力 |
| **内存** | ≥ 16 GB RAM | ≥ 32 GB | 大文档处理需要更多内存 |
| **存储** | ≥ 50 GB | ≥ 100 GB | 包含系统、数据和日志 |
| **GPU** | 可选 | NVIDIA RTX 4090 24GB+ | 主要用于 MinerU / PaddleOCR 文档解析，显著提升 OCR 与版面分析性能 |

### 软件依赖

| 软件 | 版本要求 | 用途 | 必需性 |
|------|---------|------|--------|
| **Docker** | ≥ 24.0.0 | 容器运行时 | ✅ 必需 |
| **Docker Compose** | ≥ v2.26.1 | 多容器编排 | ✅ 必需 |
| **nvidia-container-toolkit** | 最新版本 | GPU 加速 | 🔶 可选 |

:::tip GPU 加速配置
如需使用 GPU 加速，请确保已正确安装 `nvidia-container-toolkit`。
:::

---

## 部署架构

```
┌─────────────────────────────────────────────────────────────┐
│                     KnowFlow 主服务                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ RAGFlow      │  │ KnowFlow     │  │ Gotenberg    │       │
│  │ (端口 9380)   │  │ Backend      │  │ (PDF转换)    │       │
│  │              │  │ (端口 5000)  │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ MySQL        │  │ Milvus       │  │ MinIO        │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   PDF 解析服务（二选一）                      │
│  ┌────────────────────┐    ┌────────────────────┐           │
│  │ MinerU             │ 或 │ PaddleOCR          │           │
│  │   (高精度，学术论文) │    │   (快速，通用文档)   │           │
│  │  端口 8000          │    │  端口 8080         │           │
│  └────────────────────┘    └────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   可选服务                                   │
│  ┌────────────────────┐                                     │
│  │ Whisper ASR        │ ← 视频解析需要                        │
│  │  (语音识别)         │                                     │
│  └────────────────────┘                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 开始部署

### 第一步：获取部署文件
由 knowflow 团队提供部署文件，包含 Docker Compose 配置和环境变量配置。

### 第二步：部署 PDF 解析服务

PDF 解析服务用于将 PDF 文档转换为结构化文本，是智能分块的基础。提供两种选择：

| 特性 | MinerU | PaddleOCR |
|------|--------|-----------|
| 精度 | 高（行级坐标） | 中（块级坐标） |
| 速度 | 较慢 | 较快 |
| 公式识别 | ✅ 支持 | ✅ 支持 |
| 显存需求 | pipline: 2GB+  vlm: 24GB+ | 12GB+ |

#### 方案一：部署 MinerU（推荐）

MinerU 是高精度 PDF OCR 解析服务，支持公式识别和精确的版面分析。

```bash
# 1. 进入 MinerU 目录
cd docker/mineru

# 2. 启动基础服务（必需，Pipeline 模式，8000 端口）
docker compose --profile api up -d

# 3. 如需 VLM 能力，再额外启动 vlm 服务（可选，30000 端口，需 24GB+ 显存 GPU）
docker compose --profile openai-server up -d

# 4. 验证服务（等待约 2 分钟启动完成）
curl http://主机ip:8000/health
```

**GPU 配置**（编辑 `docker-compose.yml`）：

```yaml
deploy:
  resources:
    reservations:
      devices:
        - driver: nvidia
          device_ids: ["0"]        # 单卡
          # device_ids: ["0", "1"]  # 多卡
          capabilities: [gpu]
```

**显存不足时的优化**：

```yaml
command:
  # 降低 GPU 显存使用率
  --gpu-memory-utilization 0.5  # 默认 0.9，可降低到 0.4
```

#### 方案二：部署 PaddleOCR

PaddleOCR 是百度开源的 OCR 服务，速度快，适合通用文档。

```bash
# 1. 进入 PaddleOCR 目录
cd docker/paddleocr

# 2. 启动服务（PaddleOCR 8080 端口）
docker compose up -d

# 3. 查看启动日志（VLM 服务启动约需 5 分钟）
docker compose logs -f

# 4. 验证服务
curl http://主机ip:8080/health
```

**注意事项**：
- PaddleOCR 包含 API 服务和 VLM 后端两个容器
- VLM 后端首次启动需要约 5 分钟加载模型
- 建议至少 12GB GPU 显存

### 第三步：部署 KnowFlow 主服务

适合大多数场景，使用传统文本 Embedding：

```bash
cd docker

# 启动服务
docker compose up -d
```

### 第四步：验证部署

```bash
# 检查所有服务状态
docker compose ps

# 检查 RAGFlow 健康状态
curl http://主机ip:9380/health

# 检查 KnowFlow 后端
curl http://主机ip:5000/health

# 访问 Web 界面
打开浏览器访问 http://主机ip:80
```

### 默认端口

| 服务 | 端口 | 说明 |
|------|------|------|
| RAGFlow Web | 80 | Web 界面 |
| RAGFlow API | 9380 | API 服务 |
| KnowFlow Backend | 5000 | 企业功能 API |
| MySQL | 5455 | 数据库 |
| MinIO Console | 9001 | 对象存储控制台 |
| **Milvus** | **19530** | **向量数据库（ColPali）** |
| **ColPali API** | **9100** | **视觉 Embedding（ColPali）** |

注意：其中 80 端口为 RAGFlow Web 界面，需要映射到主机端口并开放网络访问。

恭喜你，服务部署全部完成。

---

## 环境配置

部署完成后，需要在 RAGFlow 中配置解析服务地址和聊天模型。

### 1. 登录系统

访问前端 web 界面 `http://主机ip:80`，使用超级管理员账号登录。

账号：`admin@gmail.com`
密码：`admin`

访问后台管理界面 `http://主机ip:80/admin`，使用超级管理员账号登录。

账号：`admin@gmail.com`
密码：`admin`

后台管理界面主要是操作 RBAC 团队用户权限和知识库管理。

### 2. 进入模型设置

在前端 web 界面，点击右上角头像 → 系统模型设置

### 3. 添加 MinerU（如已部署）

1. 在可选模型中找到 **MinerU**
2. 点击添加，填写配置：
   - **模型名称**：自定义，如 `mineru-local`
   - **API 服务器地址**：`http://你的服务器IP:8000`
   - **后端类型**：`pipeline`（基础版）或 `vlm-http-client`（VLM 版）
3. 点击保存

### 4. 添加 PaddleOCR（如已部署）

1. 在可选模型中找到 **PaddleOCR**
2. 点击添加，填写配置：
   - **模型名称**：自定义，如 `paddleocr-local`
   - **服务地址**：`http://你的服务器IP:8080`
3. 点击保存

### 5. 配置聊天模型

1. 在可选模型中找到自己使用的 LLM 模型选择并配置

恭喜你，环境配置完成。

---

## 基本使用

### 创建知识库

1. 登录后点击「知识库」→「创建知识库」
2. 填写名称和描述
3. 选择分块方法：
   - **Smart**：智能分块，自动识别文档结构
   - **Title**：按标题层级分块
   - **Regex**：按正则表达式分块
   - **Parent-Child**：父子分块，支持精确检索+丰富上下文
4. 选择 PDF 解析器（MinerU 或 PaddleOCR）
5. 点击创建

### 上传文档

1. 进入知识库
2. 点击「上传文件」
3. 支持的格式：PDF、Word、Excel、PPT、Markdown、TXT、图片、视频等
4. 等待解析完成

### 创建对话

1. 点击「对话」→「创建对话」
2. 选择知识库
3. 配置 LLM 模型
4. 开始对话

恭喜你，所有部署配置基本使用都已完成，可以开始体验 KnowFlow 的强大功能了。

---

## 常见问题

### Docker 部署可以使用 PostgreSQL 吗？

可以。默认部署使用 MySQL；如果是新环境，也可以通过 `docker/.env` 中的 `DB_TYPE` 切换为 PostgreSQL。

```env
# 默认值
DB_TYPE=mysql

# 使用 PostgreSQL
DB_TYPE=postgres
POSTGRES_HOST=postgres
POSTGRES_DBNAME=rag_flow
POSTGRES_USER=rag_flow
POSTGRES_PASSWORD=infini_rag_flow
POSTGRES_PORT=5456
POSTGRES_INTERNAL_PORT=5432
```

`DB_TYPE` 可选值为 `mysql` 或 `postgres`。它是元数据数据库类型的主开关，`COMPOSE_PROFILES` 会随 `DB_TYPE` 自动带上对应数据库 profile，通常不需要额外使用 `--profile postgres`。

:::warning 切换提醒
MySQL 和 PostgreSQL 使用不同的数据卷。已有 MySQL 环境切换到 PostgreSQL 不会自动迁移历史数据；生产环境切换前请先备份并规划数据迁移。
:::

### Docker 部署涉及哪些开源协议？

KnowFlow Docker 部署会集成数据库、向量库、缓存、对象存储、文档解析服务和 RAG 引擎等多个组件。推荐生产环境优先使用下表中的组件组合：多数第三方组件采用 Apache 2.0、PostgreSQL License、BSD-3-Clause 等宽松开源协议；MinerU 采用基于 Apache 2.0 并带有附加条件的 MinerU Open Source License；`knowflow-server` 为 KnowFlow 自研组件，按 KnowFlow 项目授权使用。整体上更适合企业内网、私有化和商业场景的安全合规要求。

简单理解这些协议的差异：

- **Apache License 2.0**：宽松开源协议，通常允许免费使用、修改、分发和商用，但需要保留原始 License、版权声明和 NOTICE；同时包含明确的专利授权条款。全文见：https://www.apache.org/licenses/LICENSE-2.0 。
- **MinerU Open Source License**：MinerU 依据 Apache License 2.0 进行许可，并受附加条款约束。一般商业用途无需另行取得商业许可；但如果您及关联方合并口径的 MAU 超过 1 亿，或月总收入超过 2000 万美元，需要先从 MinerU Team 获取单独商业许可。若基于 MinerU 向第三方提供在线服务，还需要在产品界面或公开文档显著位置标明使用了 MinerU。未满足商业许可要求或未履行标识义务时，许可可能自动终止。
- **BSD-3-Clause / PostgreSQL License**：同样属于宽松协议，通常允许商用和二次分发，主要义务是保留版权声明和免责条款。
- **GPL / AGPL**：属于 Copyleft 协议，约束更强。GPL 通常会影响二次分发场景；AGPL 还会进一步覆盖通过网络提供服务的场景，修改后对外提供服务时可能需要公开相应源码。
- **KnowFlow 自有许可 / 授权**：以 KnowFlow 项目或商业授权条款为准，企业采购、私有化交付或二次开发前建议单独确认授权范围。

以上为便于理解的简化说明，不构成法律意见；正式合规审计应以各项目仓库中的 LICENSE、NOTICE 和法律顾问意见为准。

| 组件 | 用途 | License 协议 | GitHub 链接 |
|------|------|--------------|-------------|
| Milvus | 向量数据库 | Apache License 2.0 | [milvus-io/milvus](https://github.com/milvus-io/milvus) |
| PostgreSQL | 元数据数据库 | PostgreSQL License | [postgres/postgres](https://github.com/postgres/postgres) |
| Valkey | 缓存 / Redis 兼容服务 | BSD-3-Clause | [valkey-io/valkey](https://github.com/valkey-io/valkey) |
| RustFS | S3 兼容对象存储 | Apache License 2.0 | [rustfs/rustfs](https://github.com/rustfs/rustfs) |
| MinerU | PDF / Office 文档解析服务 | MinerU Open Source License | [opendatalab/MinerU](https://github.com/opendatalab/MinerU) |
| knowflow-server | KnowFlow 后端服务 | KnowFlow 自有许可 / 授权 | [weizxfree/KnowFlow](https://github.com/weizxfree/KnowFlow) |
| KnowFlowPro / RAGFlow | RAG 引擎与知识库服务 | Apache License 2.0 | [infiniflow/ragflow](https://github.com/infiniflow/ragflow) |

:::tip 合规建议
如需面向客户交付或商用部署，建议优先使用 PostgreSQL、Valkey、RustFS、Milvus 这类宽松协议组件，并保留各组件的 License、NOTICE 和版本信息，便于后续审计。
:::

:::warning 可选组件风险
本项目历史部署配置中也集成了 MySQL、MinIO 等组件。MySQL Community Edition 采用 GPL 协议，MinIO 社区版采用 GNU AGPL v3.0；这些协议在二次分发、修改发布、SaaS/网络服务、专有软件集成等场景下可能带来额外义务或商业合规风险。非必要场景不建议继续使用，推荐分别替换为 PostgreSQL 和 RustFS。
:::

---

## 更多信息

- RAGFlow 官方文档：https://ragflow.io/docs
- MinerU 项目：https://github.com/opendatalab/MinerU
- PaddleOCR 项目：https://github.com/PaddlePaddle/PaddleOCR
