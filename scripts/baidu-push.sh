#!/bin/bash

# 百度搜索资源平台 - 普通收录主动推送脚本
# 从 build/sitemap.xml 提取 URL 并推送到百度
# 用法: bash scripts/baidu-push.sh [--all]
#   --all  推送全部 URL（含 /blog/tags/ 等聚合页）

set -euo pipefail

SITE="https://www.knowflowchat.cn"
TOKEN="F0eBiU3gThvpfAcy"
API_URL="http://data.zz.baidu.com/urls?site=${SITE}&token=${TOKEN}"
SITEMAP="build/sitemap.xml"
PUSH_ALL=false

# 解析参数
for arg in "$@"; do
    case "$arg" in
        --all) PUSH_ALL=true ;;
        *) echo "未知参数: $arg"; echo "用法: bash scripts/baidu-push.sh [--all]"; exit 1 ;;
    esac
done

# 检查 sitemap 是否存在
if [ ! -f "$SITEMAP" ]; then
    echo "sitemap 不存在: $SITEMAP"
    echo "请先运行 npm run build 生成构建产物"
    exit 1
fi

# 提取所有 <loc> 中的 URL（兼容 macOS 和 Linux）
# 先将 <loc> 拆分到单独行，再用 sed 提取 URL
urls=$(sed 's/<loc>/\n<loc>/g' "$SITEMAP" | sed -n 's/.*<loc>\([^<]*\)<\/loc>.*/\1/p')

if [ -z "$urls" ]; then
    echo "未从 $SITEMAP 中提取到任何 URL"
    exit 1
fi

# 过滤低价值页面
if [ "$PUSH_ALL" = false ]; then
    urls=$(echo "$urls" | grep -v '/blog/tags/')
fi

# 统计数量
total=$(echo "$urls" | wc -l | tr -d ' ')

echo "百度收录推送"
echo "============"
echo "站点: $SITE"
echo "待推送 URL 数量: $total"
if [ "$PUSH_ALL" = false ]; then
    echo "模式: 过滤聚合页（使用 --all 推送全部）"
else
    echo "模式: 推送全部 URL"
fi
echo ""
echo "预览（前 5 条）:"
echo "$urls" | head -5 | sed 's/^/  /'
if [ "$total" -gt 5 ]; then
    echo "  ..."
fi
echo ""

# 调用百度 API
echo "正在推送..."
response=$(echo "$urls" | curl -s \
    -X POST "$API_URL" \
    -H "Content-Type: text/plain" \
    --data-binary @-)

echo "百度 API 响应: $response"
echo ""

# 解析结果
success=$(echo "$response" | grep -o '"success":[0-9]*' | grep -o '[0-9]*' || echo "")
remain=$(echo "$response" | grep -o '"remain":[0-9]*' | grep -o '[0-9]*' || echo "")
not_same_site=$(echo "$response" | grep -o '"not_same_site":\[[^]]*\]' || echo "")
not_valid=$(echo "$response" | grep -o '"not_valid":\[[^]]*\]' || echo "")

if [ -n "$success" ]; then
    echo "推送成功: ${success} 条"
fi
if [ -n "$remain" ]; then
    echo "今日剩余配额: ${remain}"
fi
if [ -n "$not_same_site" ] && [ "$not_same_site" != '"not_same_site":[]' ]; then
    echo "非本站 URL: $not_same_site"
fi
if [ -n "$not_valid" ] && [ "$not_valid" != '"not_valid":[]' ]; then
    echo "无效 URL: $not_valid"
fi

# 检查是否有错误
error_msg=$(echo "$response" | grep -o '"message":"[^"]*"' || echo "")
if [ -n "$error_msg" ]; then
    echo "错误信息: $error_msg"
    exit 1
fi

echo ""
echo "推送完成"
