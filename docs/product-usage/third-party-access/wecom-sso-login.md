---
sidebar_position: 2
description: 配置 KnowFlow 企业微信网页登录与工作台登录，包括自建应用、可信域名、回调地址、系统参数、组织同步和常见问题。
---

# 企业微信网页登录与工作台登录

KnowFlow 支持使用同一个企业微信自建应用完成两种登录：

- **浏览器网页登录**：用户在 KnowFlow 登录页选择“企业微信”，扫码后进入系统。
- **企业微信工作台登录**：用户从企业微信工作台打开应用，通过网页授权直接进入系统，无需再次扫码。

两种方式共用企业微信身份、KnowFlow 用户账号、组织同步配置和 OAuth 回调地址。

:::info 与企业微信机器人的区别
本文介绍的是**身份登录与工作台入口**，使用 `CorpID`、`AgentID` 和应用 `Secret`。

如果您希望员工直接在企业微信会话中向知识库提问，请参阅
[企业微信智能机器人接入](./wecom-access.md)。机器人接入使用的是 `Bot ID` 和机器人 `Secret`，两套配置不能混用。
:::

## 一、配置前准备

开始前，请确认：

- KnowFlow 已完成部署，并可通过固定的 HTTPS 域名访问，例如 `https://kb.example.com`。
- 您拥有企业微信管理员权限，可以创建和配置自建应用。
- KnowFlow 服务端具有固定或可确认的公网出口 IP，用于调用企业微信接口。
- 已确定应用可见范围。只有可见范围内的成员可以从工作台访问应用。

本文统一使用以下示例地址，请替换为您的实际域名：

| 用途 | 示例 |
|---|---|
| KnowFlow 访问地址 | `https://kb.example.com` |
| 浏览器登录入口 | `https://kb.example.com/v1/user/login/wecom` |
| 工作台应用主页 | `https://kb.example.com/v1/user/login/wecom?mode=oauth2` |
| 企业微信回调地址 | `https://kb.example.com/v1/user/oauth/callback/wecom` |
| 企业微信后台填写的域名 | `kb.example.com` |

:::warning 保持域名一致
用户访问域名、应用主页域名、回调地址域名，以及企业微信后台配置的回调域和可信域名必须一致。
生产配置中不要使用 `localhost`、容器名、内网 IP 或内部服务端口。
:::

## 二、创建企业微信自建应用

### 1. 创建应用

登录[企业微信管理后台](https://work.weixin.qq.com/wework_admin/frame)，进入“应用管理”，创建一个自建应用。

建议使用容易识别的名称，例如“KnowFlow 企业知识库”，并上传企业自己的应用图标。

### 2. 记录应用参数

后续配置需要以下三个参数：

| 参数 | 获取位置 | 示例 |
|---|---|---|
| `CorpID` | “我的企业”中的企业 ID | `wwxxxxxxxxxxxxxxxx` |
| `AgentID` | 自建应用详情页 | `1000002` |
| `Secret` | 自建应用详情页 | `replace-with-your-app-secret` |

`Secret` 属于敏感凭据，不要提交到代码仓库，也不要出现在截图、工单或公开文档中。

### 3. 设置应用可见范围

在自建应用详情页配置可见范围，可以选择整个企业，也可以只开放给指定部门和成员。

建议先选择少量测试成员完成验证，再逐步扩大可见范围。

## 三、配置浏览器网页登录

在企业微信管理后台找到“企业微信授权登录”相关设置，配置 Web 登录授权回调域：

```text
kb.example.com
```

这里只填写**域名**，不要填写 `https://`、端口、路径或通配符。

配置完成后，用户可以在普通桌面浏览器中打开 KnowFlow 登录页，选择“企业微信”并扫码登录。也可以直接访问：

```text
https://kb.example.com/v1/user/login/wecom
```

KnowFlow 会根据访问环境自动选择登录方式；如需明确使用扫码登录，可在排查问题时访问：

```text
https://kb.example.com/v1/user/login/wecom?mode=qr
```

## 四、配置企业微信工作台登录

企业微信后台的菜单名称可能随版本调整，网页授权规则请同时参考
[企业微信官方文档](https://developer.work.weixin.qq.com/document/path/90664)。

### 1. 配置网页授权可信域名

在自建应用的“网页授权及 JS-SDK”设置中，将可信域名配置为：

```text
kb.example.com
```

同样只填写域名，不包含协议和路径。

### 2. 完成可信域名校验

企业微信可能要求下载一个类似下面名称的校验文件：

```text
WW_verify_xxxxxxxxxxxxxxxx.txt
```

请将原文件放到 KnowFlow 公网域名的根路径，确保企业微信服务器能够直接访问：

```text
https://kb.example.com/WW_verify_xxxxxxxxxxxxxxxx.txt
```

该地址必须满足：

- 返回 HTTP 200；
- 返回内容与企业微信下载的原文件完全一致；
- 不跳转到登录页；
- 不返回 KnowFlow 前端 HTML；
- 不经过身份认证；
- 建议响应类型为 `text/plain`。

如果站点根路径全部反向代理到 KnowFlow，可以在 Nginx 中为实际校验文件增加精确匹配：

```nginx
location = /WW_verify_xxxxxxxxxxxxxxxx.txt {
    default_type text/plain;
    alias /opt/knowflow/WW_verify_xxxxxxxxxxxxxxxx.txt;
}
```

上传后先自行检查：

```bash
curl -i https://kb.example.com/WW_verify_xxxxxxxxxxxxxxxx.txt
```

确认响应正确后，再回到企业微信管理后台保存可信域名。

### 3. 配置应用主页

将自建应用的应用主页设置为：

```text
https://kb.example.com/v1/user/login/wecom?mode=oauth2
```

`mode=oauth2` 会明确使用企业微信客户端内网页授权，避免工作台入口错误地显示扫码页面。

### 4. 配置企业可信 IP

将 **KnowFlow 后端调用企业微信接口时使用的公网出口 IP** 加入企业微信的可信 IP。

这里应填写服务端出口 IP，不是：

- 员工手机或电脑的 IP；
- KnowFlow 域名解析得到的任意 IP；
- Docker 容器内网 IP；
- 访问用户的客户端 IP。

如果服务器通过 NAT、代理或网关访问公网，请以最终出口 IP 为准。

## 五、配置 KnowFlow

### 1. 配置企业微信登录渠道

Docker 部署请编辑：

```text
docker/service_conf.yaml.template
```

源码部署请编辑实际生效的：

```text
conf/service_conf.yaml
```

在顶层 `oauth` 节点下添加企业微信配置：

```yaml
oauth:
  wecom:
    type: "wecom"
    icon: "wecom"
    display_name: "企业微信"
    corp_id: "wwxxxxxxxxxxxxxxxx"
    agent_id: "1000002"
    secret: "replace-with-your-app-secret"
    redirect_uri: "https://kb.example.com/v1/user/oauth/callback/wecom"
    inherit_superuser_models: true
```

参数说明：

| 参数 | 是否必填 | 说明 |
|---|---|---|
| `type` | 是 | 固定为 `wecom` |
| `icon` | 否 | 登录页显示的图标，建议使用 `wecom` |
| `display_name` | 否 | 登录页按钮名称 |
| `corp_id` | 是 | 企业微信 CorpID |
| `agent_id` | 是 | 自建应用 AgentID |
| `secret` | 是 | 自建应用 Secret |
| `redirect_uri` | 是 | 完整 HTTPS 回调地址，必须与可信域名一致 |
| `inherit_superuser_models` | 否 | 新用户首次注册时是否继承超级管理员的模型配置 |

:::caution 模型配置继承
`inherit_superuser_models: true` 可以让首次通过企业微信注册的用户立即使用超级管理员已经配置的模型。
该过程会复制模型配置，其中可能包含模型服务凭据，因此只应在企业微信应用可见范围严格受控时开启。

继承只发生在用户**首次注册**时。之后超级管理员新增或修改模型，不会自动同步给已经创建的用户。
如不希望复制模型配置，请设置为 `false`，再由管理员为用户单独配置模型。
:::

### 2. 配置跨站登录 Cookie

企业微信授权页面与 KnowFlow 不属于同一站点。HTTPS 部署需要在 RAGFlow 主服务环境变量中设置：

```dotenv
OAUTH_COOKIE_CROSS_SITE=true
```

Docker Compose 部署可将其加入 `docker/.env`。该配置会让 OAuth 登录会话 Cookie 使用跨站回调所需的安全属性。

:::warning HTTPS 是前提
跨站 Cookie 同时要求安全连接。生产环境必须使用 HTTPS，否则可能出现 `invalid_state` 或登录回调失败。
:::

### 3. 重启主服务

修改配置后，重启 RAGFlow 主服务使配置生效。

Docker Compose CPU 部署示例：

```bash
cd docker
docker compose restart ragflow-cpu
```

GPU 部署请将服务名替换为 `ragflow-gpu`。如果您的交付包使用了不同的服务名，请以实际 Compose 文件为准。

## 六、验证配置

### 1. 检查登录渠道

访问：

```bash
curl https://kb.example.com/v1/user/login/channels
```

返回结果中应包含 `wecom` 渠道。若未出现，通常表示配置文件未生效或主服务尚未重启。

### 2. 验证浏览器扫码登录

1. 在普通桌面浏览器打开 KnowFlow 登录页。
2. 点击“企业微信”。
3. 使用应用可见范围内的企业微信账号扫码。
4. 确认成功进入 KnowFlow。

### 3. 验证工作台登录

1. 在企业微信客户端打开“工作台”。
2. 找到刚创建的自建应用。
3. 打开应用。
4. 确认无需再次扫码即可进入 KnowFlow。

## 七、首次登录后的系统行为

### 用户创建

成员第一次成功登录时，KnowFlow 会自动创建对应用户。后续登录会继续使用同一个企业微信身份，不会重复创建账号。

### 组织同步

登录成功后，KnowFlow 会在后台同步该应用可见范围内的企业微信部门树，并更新当前用户所属部门。

不同成员登录时会更新同一棵组织树，不会为每个用户创建一套独立组织。组织同步依赖企业微信通讯录或组织架构权限；权限不足时，系统中可能只显示根部门或不完整的部门数据。

### 模型可用性

如果启用了 `inherit_superuser_models`，新用户会在首次注册时获得超级管理员模型配置的快照。若用户是在开启该配置前创建的，需要由管理员补充模型配置，或在确认无业务数据后删除测试账号并重新完成首次登录。

## 八、常见问题

| 现象 | 常见原因 | 处理方式 |
|---|---|---|
| 登录页没有“企业微信” | OAuth 配置未加载，或服务未重启 | 检查 `oauth.wecom` 缩进和参数，重启主服务，再检查 `/v1/user/login/channels` |
| 提示 `redirect_uri 参数错误` 或错误码 `50001` | 可信域名未配置，或域名不一致 | 核对最终访问域名、可信域名和 `redirect_uri` |
| 回调后提示 `invalid_state` | 登录前后使用了不同域名，或跨站 Cookie 未开启 | 全程使用同一 HTTPS 域名，并设置 `OAUTH_COOKIE_CROSS_SITE=true` |
| 错误码 `60020`，提示 IP 不允许访问 | 服务端出口 IP 未加入可信 IP | 查询实际公网出口 IP，并加入企业微信可信 IP |
| 工作台中仍显示扫码页 | 应用主页未使用网页授权入口，或代理改写了 User-Agent | 将应用主页改为带 `?mode=oauth2` 的地址，并检查代理配置 |
| 可信域名校验失败 | 校验文件返回了前端 HTML、重定向或 404 | 为真实文件名配置根路径精确匹配，确认公网请求返回原始文本 |
| 登录成功但没有可用模型 | 模型继承被关闭，用户已在此前创建，或超级管理员未配置模型 | 检查 `inherit_superuser_models`，确认超级管理员模型可用；注意继承仅发生在首次注册 |
| 组织树只有根部门或数据不完整 | 自建应用缺少通讯录或组织架构权限 | 在企业微信后台补充所需权限，并由成员重新登录触发同步 |

## 九、上线前安全检查

- 使用正式 HTTPS 域名，并确保证书有效。
- 限制自建应用可见范围，不向无关成员开放。
- 不在代码仓库、截图或工单中暴露应用 Secret。
- 使用固定的服务端公网出口 IP，并仅将该地址加入可信 IP。
- 确认可信域名校验文件不包含任何 Secret。
- 如开启模型继承，确认企业微信身份源和应用可见范围均可信。
- 先使用测试部门验证登录、组织同步和模型权限，再逐步扩大范围。
