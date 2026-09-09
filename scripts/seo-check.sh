#!/bin/bash

# 线上 SEO 体检：逐条核对搜索引擎会看到的状态码。
#
# Google Search Console 只告诉你「有 17 个软 404、1 个 403」，不告诉你是哪些 URL。
# 这个脚本把线上站点跑一遍，直接列出：
#   - sitemap 里应当返回 200 却没有的地址
#   - 迁移前的旧地址是否真的 301 到了新地址
#   - 已下线地址是否返回 404/410（而不是 200 的软 404）
#
# 用法:
#   bash scripts/seo-check.sh              # 检查线上站点
#   bash scripts/seo-check.sh http://localhost:3000

set -uo pipefail

SITE="${1:-https://www.knowflowchat.cn}"
SITEMAP_FILE="build/sitemap.xml"
UA="Mozilla/5.0 (compatible; KnowFlowSEOCheck/1.0)"

pass=0
fail=0

red()   { printf '\033[31m%s\033[0m' "$1"; }
green() { printf '\033[32m%s\033[0m' "$1"; }
dim()   { printf '\033[2m%s\033[0m' "$1"; }

# 返回 "<状态码> <Location 头>"
probe() {
    curl -sS -o /dev/null -A "$UA" \
        -w '%{http_code} %{redirect_url}' \
        --max-time 20 "$1" 2>/dev/null || echo "000 "
}

# expect_status <url> <期望状态码(可用 | 分隔多个)> [期望跳转目标]
expect_status() {
    local url="$1" want="$2" want_location="${3:-}"
    local result code location

    result="$(probe "$url")"
    code="${result%% *}"
    location="${result#* }"

    if [[ "|$want|" != *"|$code|"* ]]; then
        fail=$((fail + 1))
        printf '  %s %s\n' "$(red "✗ $code")" "$url"
        printf '       期望 %s\n' "$want"
        return
    fi

    if [[ -n "$want_location" && "$location" != *"$want_location"* ]]; then
        fail=$((fail + 1))
        printf '  %s %s\n' "$(red "✗ $code")" "$url"
        printf '       跳到了 %s，期望包含 %s\n' "${location:-<空>}" "$want_location"
        return
    fi

    pass=$((pass + 1))
    printf '  %s %s\n' "$(green "✓ $code")" "$(dim "$url")"
}

echo "站点: $SITE"
echo

# ---------------------------------------------------------------------------
echo "▸ 迁移前的博客地址应当 301 到 /blog"
# ---------------------------------------------------------------------------
LEGACY_SLUGS=(
    knowflow-year-review
    knoweval-rag-evaluation
    knowflow-v2.1.6-image-search
    knowflow-v2.1.8-paddleocr-vl
    knowflow-v2.1.9-import-export
    knowflow-v2.3.0-release
    knowflow-v2.3.4-deepread
)

expect_status "$SITE/docs/博客" "200|301|302" ""
for slug in "${LEGACY_SLUGS[@]}"; do
    expect_status "$SITE/docs/博客/$slug" "200|301|302" ""
done
echo

# ---------------------------------------------------------------------------
echo "▸ 已下线页面应当 404 / 410（返回 200 会被判成软 404）"
# ---------------------------------------------------------------------------
for path in /markdown-page /logo-export /sensors-cwm-product-cluster; do
    expect_status "$SITE$path" "404|410" ""
done
echo

# ---------------------------------------------------------------------------
echo "▸ 关键入口"
# ---------------------------------------------------------------------------
for path in / /product /analytics /about /contact /privacy /terms /blog \
            /docs/intro /analytics/docs/intro /robots.txt /sitemap.xml; do
    expect_status "$SITE$path" "200" ""
done
echo

# ---------------------------------------------------------------------------
echo "▸ sitemap 中的全部地址"
# ---------------------------------------------------------------------------
if [[ ! -f "$SITEMAP_FILE" ]]; then
    echo "  跳过：找不到 $SITEMAP_FILE，请先运行 npm run build"
else
    while IFS= read -r url; do
        [[ -z "$url" ]] && continue
        # 用参数里的站点地址替换 sitemap 中写死的生产域名，便于本地自测
        expect_status "${url/https:\/\/www.knowflowchat.cn/$SITE}" "200" ""
    done < <(grep -o '<loc>[^<]*</loc>' "$SITEMAP_FILE" | sed -e 's|<loc>||' -e 's|</loc>||')
fi

echo
echo "──────────────────────────────"
printf '通过 %s 项，失败 %s 项\n' "$(green "$pass")" "$([[ $fail -gt 0 ]] && red "$fail" || echo 0)"

if [[ $fail -gt 0 ]]; then
    echo
    echo "失败项即 Google Search Console 里「软 404 / 403 / 重定向」的来源，请逐条处理。"
    exit 1
fi
