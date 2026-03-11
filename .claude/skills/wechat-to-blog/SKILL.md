---
name: wechat-to-blog
description: 将微信公众号文章转换为 Docusaurus 博客文章。输入公众号文章 URL，自动抓取内容、下载图片、生成博客 Markdown 文件。
user-invocable: true
arguments: url
---

# 微信公众号文章转 Docusaurus 博客

将微信公众号文章 URL 转换为项目 `blog/` 目录下的 Docusaurus 博客文章。

## 输入

- `$ARGUMENTS` — 微信公众号文章 URL（如 `https://mp.weixin.qq.com/s/xxx`）

## 工作流程

### 步骤 1：抓取文章内容

使用 curl 抓取公众号页面 HTML（需带浏览器 User-Agent）：

```bash
curl -s -L -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "$URL" > /tmp/wechat_article.html
```

如果抓取失败或内容为空，提示用户手动复制粘贴文章内容。

### 步骤 2：解析文章

使用 Python 脚本从 HTML 中提取：

1. **标题** — 从 `og:title` meta 标签获取
2. **描述** — 从 `meta[name=description]` 获取
3. **正文** — 从 `id="js_content"` 的 div 中提取，转换为 Markdown 格式
4. **图片** — 提取所有 `data-src` 属性的图片 URL

Python 解析脚本模板：

```python
import re, html

with open('/tmp/wechat_article.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 提取标题
title_match = re.search(r'og:title"\s+content="([^"]+)"', content)
title = html.unescape(title_match.group(1)) if title_match else "Unknown"

# 提取描述
desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', content)
desc = html.unescape(desc_match.group(1)) if desc_match else ""

# 提取正文 (id="js_content")
content_match = re.search(r'id="js_content"[^>]*>(.*?)(?:</div>\s*</div>\s*</div>\s*<div|$)', content, re.DOTALL)
if content_match:
    article = content_match.group(1)
    # 提取图片
    imgs = re.findall(r'data-src="([^"]+)"', article)
    # HTML -> Markdown 转换
    article = re.sub(r'<h1[^>]*>(.*?)</h1>', r'\n# \1\n', article)
    article = re.sub(r'<h2[^>]*>(.*?)</h2>', r'\n## \1\n', article)
    article = re.sub(r'<h3[^>]*>(.*?)</h3>', r'\n### \1\n', article)
    article = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', article)
    article = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', article)
    article = re.sub(r'<br\s*/?>', '\n', article)
    article = re.sub(r'<li[^>]*>(.*?)</li>', r'- \1', article, flags=re.DOTALL)
    article = re.sub(r'<p[^>]*>', '\n', article)
    article = re.sub(r'</p>', '\n', article)
    article = re.sub(r'<section[^>]*>', '\n', article)
    article = re.sub(r'</section>', '\n', article)
    article = re.sub(r'<[^>]+>', '', article)
    article = html.unescape(article)
    article = re.sub(r'\n\s*\n\s*\n+', '\n\n', article)
    article = re.sub(r'[ \t]+', ' ', article)
    article = article.strip()
```

### 步骤 3：下载图片

为文章创建图片目录，使用 curl 下载（需带 Referer 头绕过防盗链）：

```bash
mkdir -p static/img/blog/<slug>/
curl -s -o "static/img/blog/<slug>/<name>.png" "<img_url>" -H "Referer: https://mp.weixin.qq.com/"
```

图片命名规则：根据文章上下文给每张图片起有意义的英文名称。

### 步骤 4：生成博客文件

文件命名格式：`docs/博客/<slug>.md`（注意：文章放在 `docs/博客/` 目录下，不是 `blog/` 目录）

前置元数据（frontmatter）格式：

```yaml
---
description: <文章描述/摘要，一句话概括>
---
```

注意：docs 下的文章不使用 `slug`、`title`、`authors`、`tags` 等 blog 专用字段，只需要 `description`。标题通过正文中的 `# 标题` 来设置。

正文格式要求：

1. 第一行使用 `# 文章标题` 作为页面标题
2. 保留文章的完整内容和结构
3. 正确使用 Markdown 标题层级（##、###）
4. 图片使用本地路径：`![描述](/img/blog/<slug>/<name>.png)`
5. 保留加粗、斜体、列表、表格、代码块等格式
6. 去除公众号特有的样式和尾部广告/引导关注内容
7. 文末保留官网链接等有价值的信息

### 步骤 4.5：更新博客索引

在 `docs/博客/index.md` 的文章列表表格最前面插入新文章条目：

```markdown
| YYYY-MM | [文章标题](./slug.md) | 一句话简介 |
```

### 步骤 5：验证

运行 `npm run build` 确认构建无错误。

## 注意事项

- 如果 curl 抓取失败（微信反爬），提示用户手动复制文章内容粘贴
- 如果图片下载失败（防盗链），记录失败的 URL 告知用户手动下载
- 参考 `blog/authors.yml` 确认使用正确的作者 ID
- 参考已有博客文章的格式风格保持一致
- 不要修改或美化原文内容，保持原文的风格和表达
