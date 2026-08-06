---
sidebar_position: 1
description: MinerU-Popo 独立部署与 KnowFlow v2.4.9 对接指南，包含 GPU 要求、Docker Compose 配置、安全设置、验证与故障排查。
---

# MinerU-Popo 部署与配置

MinerU-Popo 是 KnowFlow v2.4.9 提供的可选文档结构增强服务。它接收 MinerU 生成的 PDF 与 `middle.json`，补充标题层级、章节关系、表格连续性和图片上下文，再把增强结果交回 KnowFlow，形成 Document Structure V2。

它不替代 MinerU，也不负责最终分块和向量入库。服务未启用、调用超时或返回结果不合法时，KnowFlow 会自动使用原始 MinerU 结果继续处理。

## 部署结构

独立交付目录位于 KnowFlowPro 源码的 `docker/mineru-popo/`：

```text
docker/mineru-popo/
├── README.md
├── docker-compose.yml
├── .env.example
└── overrides/
    └── api.py
```

Compose 会启动两个容器：

```text
KnowFlow
  └─ MinerU-Popo API：宿主机 8002 → 容器 8001
       └─ vLLM：仅 Compose 内部网络 8000
```

vLLM 不映射到宿主机，外部只需访问带令牌校验的 Popo API。

## 环境要求

- Linux x86_64，推荐 Ubuntu 22.04 或更高版本；
- NVIDIA GPU，推荐 24 GiB 或以上显存，Compute Capability 不低于 7.0；
- NVIDIA Driver 不低于 575.57.08，推荐 580 或更高版本；
- Docker Engine 24 或更高版本、Docker Compose V2；
- NVIDIA Container Toolkit；
- Docker 数据盘至少 80 GB 可用空间，推荐预留 100 GB。

镜像内置 CUDA Runtime 12.9.1，宿主机不需要另装 CUDA Toolkit 或 cuDNN。当前镜像本地展开约 63 GB，首次拉取和启动需要预留足够时间。

部署前先检查 GPU 容器是否正常：

```bash
nvidia-smi
docker version
docker compose version
docker info | grep -i nvidia
docker run --rm --gpus all nvidia/cuda:12.9.1-base-ubuntu22.04 nvidia-smi
```

## 在线部署

进入交付目录并创建本地配置：

```bash
cd docker/mineru-popo
cp .env.example .env
```

编辑 `.env`。至少替换下面两个值，不要把真实凭据提交到 Git：

```env
POPO_API_KEY=<生成一个随机的内部 API Key>
MINERU_POPO_SERVICE_TOKEN=<生成一个随机的服务令牌>
```

两个变量用途不同：`POPO_API_KEY` 用于 Popo API 调用内部 vLLM；`MINERU_POPO_SERVICE_TOKEN` 用于 KnowFlow 调用 Popo API。跨主机部署时，KnowFlow 侧必须配置同一个服务令牌。

拉取并启动：

```bash
docker compose --env-file .env pull
docker compose --env-file .env up -d
```

首次启动需要把模型加载到显存。只有 vLLM 健康检查通过后，Popo API 才会启动。查看状态和日志：

```bash
docker compose --env-file .env ps
docker compose --env-file .env logs -f mineru-popo-vllm
docker compose --env-file .env logs -f mineru-popo-api
```

## KnowFlow 对接配置

编辑 KnowFlow 部署目录中的 `docker/.env`：

```env
MINERU_POPO_ENABLED=true
MINERU_POPO_API_URL=http://<MinerU-Popo 主机地址>:8002
MINERU_POPO_SERVICE_TOKEN=<与 MinerU-Popo .env 相同的服务令牌>
MINERU_POPO_CONNECT_TIMEOUT_SECONDS=10
MINERU_POPO_READ_TIMEOUT_SECONDS=1800
```

然后重新创建 `knowflow-backend`，让环境变量进入容器：

```bash
cd docker
docker compose up -d --force-recreate knowflow-backend
```

如果 KnowFlow 与 MinerU-Popo 在同一台主机但不在同一个 Compose 网络，不要在容器内使用 `127.0.0.1:8002`。`127.0.0.1` 指向 `knowflow-backend` 容器自身，应改用宿主机可达地址或把两个服务接入同一 Docker 网络。

:::warning 令牌必须一致
`MINERU_POPO_SERVICE_TOKEN` 在 MinerU-Popo 和 KnowFlow 两侧必须完全一致。不要直接沿用示例默认值对公网提供服务。
:::

## 推理参数

默认参数面向单张 24 GB 显卡：

```env
MINERU_POPO_IMAGE=zxwei/mineru-popo:v0.0.1
MINERU_POPO_API_BIND_HOST=0.0.0.0
MINERU_POPO_API_PORT=8002
POPO_GPU_DEVICE=0
POPO_GPU_MEMORY_UTILIZATION=0.90
POPO_MAX_NUM_SEQS=1
POPO_MAX_MODEL_LEN=65536
POPO_MAX_NEW_TOKENS=8192
POPO_API_TIMEOUT_SECONDS=1800
```

| 参数 | 作用 | 调整建议 |
| --- | --- | --- |
| `POPO_GPU_DEVICE` | 指定使用哪张 GPU | 多卡服务器按实际编号设置 |
| `POPO_GPU_MEMORY_UTILIZATION` | vLLM 可使用的显存比例 | 显存与其他任务共享时适当降低 |
| `POPO_MAX_NUM_SEQS` | 并发推理序列数 | 24 GB 显卡保持为 `1` 更稳妥 |
| `POPO_MAX_MODEL_LEN` | 最大上下文长度 | 24 GB 显卡建议不超过 `65536` |
| `POPO_MAX_NEW_TOKENS` | 单次最大生成长度 | 文档结构较复杂时保留默认值 |
| `MINERU_POPO_READ_TIMEOUT_SECONDS` | KnowFlow 等待增强结果的时间 | 大 PDF 可按实际耗时调高 |

模型原始配置支持更长上下文，但在 24 GB 显卡上直接提高 `POPO_MAX_MODEL_LEN` 可能导致 KV Cache 不足，甚至无法启动。不要只根据模型标称上限修改该值。

## 验证服务

先在 MinerU-Popo 主机上检查健康状态：

```bash
curl http://127.0.0.1:8002/health
curl http://127.0.0.1:8002/ready
```

预期分别返回：

```json
{"status":"ok"}
```

```json
{"status":"ready"}
```

随后在 KnowFlow 上传一份标题层级清楚、包含跨页表格或图片说明的 PDF，并选择 MinerU 解析。检查 `knowflow-backend` 日志，确认出现 MinerU-Popo 增强调用且没有回退警告；解析完成后再查看目录层级、分块边界和图片上下文。

## 离线部署

在联网环境准备镜像包：

```bash
cd docker/mineru-popo
mkdir -p images
docker pull zxwei/mineru-popo:v0.0.1
docker save zxwei/mineru-popo:v0.0.1 \
  | gzip > images/mineru-popo-v0.0.1.tar.gz
```

将整个 `docker/mineru-popo/` 目录交付到离线环境，然后执行：

```bash
gzip -dc images/mineru-popo-v0.0.1.tar.gz | docker load
cp .env.example .env
# 编辑 .env，替换所有凭据占位值
docker compose --env-file .env up -d --pull never
```

模型权重的分发与使用仍需遵守 MinerU-Popo 模型许可证。

## 安全建议

1. 优先部署在内网，不直接暴露到互联网。
2. 修改两个默认凭据，并确保 `.env` 不进入代码仓库或交付文档。
3. 使用防火墙只放行 KnowFlow 主机到 Popo API 端口的访问。
4. 跨公网或跨安全域访问时，通过 VPN 或 TLS 反向代理传输。
5. 不要映射 vLLM 的 8000 端口；该端口只供 Popo API 使用。
6. 固定镜像版本，不在生产环境使用 `latest`。

## 常见问题

### vLLM 一直无法通过健康检查

先查看 `mineru-popo-vllm` 日志。常见原因包括驱动版本过低、GPU 未正确挂载、显存被其他进程占用，以及 `POPO_MAX_MODEL_LEN` 设置过高。

### 出现 `CUDA error 804`

该错误通常表示宿主机驱动不满足镜像 CUDA Runtime 的兼容要求。升级 NVIDIA Driver 至 580 或更高版本，并在重启服务器后重新验证 GPU 容器。

### 健康检查正常，但 KnowFlow 没有调用

检查 `MINERU_POPO_ENABLED` 是否为 `true`、API URL 是否能从 `knowflow-backend` 容器内访问，以及两侧服务令牌是否一致。修改 `docker/.env` 后必须重新创建容器，只重启旧容器不会注入新的环境变量。

### Popo 失败会让文档解析失败吗？

正常情况下不会。KnowFlow 会回退到原始 MinerU `middle.json`。但回退后的文档不会获得 Popo 提供的结构增强，建议通过日志查明原因后重新解析相关文档。

### 如何升级？

先备份 `.env`，明确修改 `MINERU_POPO_IMAGE` 和 `POPO_MODEL_REVISION`，再执行：

```bash
docker compose --env-file .env pull
docker compose --env-file .env up -d
```

升级后重新执行健康检查，并用代表性 PDF 验证结构结果。固定版本交付不要使用 `latest`。
