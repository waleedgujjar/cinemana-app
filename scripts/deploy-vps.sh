#!/usr/bin/env bash
# Run on VPS as root or sakuraschoolsimulator:
#   bash scripts/deploy-vps.sh
set -euo pipefail

PROJECT_DIR="/home/sakuraschoolsimulator/htdocs/sakuraschoolsimulator.net"
APK_FILE="public/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk"

cd "$PROJECT_DIR"

echo "==> Node version"
node -v
npm -v

echo "==> Ensure logs directory exists"
mkdir -p logs

echo "==> Pull latest code"
GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo master)"
git pull origin "$GIT_BRANCH"

echo "==> Verify APK file exists"
if [ -f "$APK_FILE" ]; then
  APK_SIZE="$(du -h "$APK_FILE" | cut -f1)"
  echo "    Found $APK_FILE ($APK_SIZE)"
else
  echo "ERROR: APK not found at $APK_FILE"
  echo "       Upload the real APK to public/downloads/ before deploying."
  exit 1
fi

echo "==> Install dependencies"
npm ci

if [ ! -f .env.production ]; then
  echo "ERROR: .env.production missing. Copy from .env.example and set secrets:"
  echo "  cp .env.example .env.production"
  echo "  openssl rand -base64 32   # for REVALIDATION_SECRET"
  echo "  openssl rand -base64 32   # for WORDPRESS_PREVIEW_SECRET"
  exit 1
fi

echo "==> Verify required environment variables"
for VAR in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_WORDPRESS_URL WORDPRESS_GRAPHQL_URL REVALIDATION_SECRET NODE_ENV PORT; do
  if ! grep -q "^${VAR}=." .env.production; then
    echo "ERROR: ${VAR} must be set and non-empty in .env.production"
    exit 1
  fi
done

grep -E '^(NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_WORDPRESS_URL|WORDPRESS_GRAPHQL_URL|NODE_ENV|PORT)=' .env.production || true

echo "==> Test GraphQL connectivity (full post query with seo)"
GRAPHQL_URL="$(grep '^WORDPRESS_GRAPHQL_URL=' .env.production | cut -d= -f2-)"
GRAPHQL_RESPONSE="$(curl -sf -X POST "$GRAPHQL_URL" \
  -H "Content-Type: application/json" \
  -d '{"query":"query DeployHealth { posts(first:1, where:{status:PUBLISH}) { nodes { slug title seo { title } } } }"}' || true)"

if [ -z "$GRAPHQL_RESPONSE" ]; then
  echo "ERROR: GraphQL endpoint unreachable at $GRAPHQL_URL"
  echo "       Fix CMS SSL (Let's Encrypt) and verify WPGraphQL is active."
  exit 1
fi

echo "$GRAPHQL_RESPONSE" | head -c 300
echo ""

if echo "$GRAPHQL_RESPONSE" | grep -q '"errors"'; then
  if echo "$GRAPHQL_RESPONSE" | grep -qi 'seo'; then
    echo "WARNING: SEO fields unavailable — install add-wpgraphql-seo + Rank Math."
    echo "         App will fall back to base queries without SEO metadata."
  else
    echo "ERROR: GraphQL returned errors. Fix WordPress before deploying."
    exit 1
  fi
fi

echo "==> Build production app"
export NODE_ENV=production
npm run build

echo "==> Start / reload PM2"
if pm2 describe sakuraschoolsimulator >/dev/null 2>&1; then
  pm2 reload ecosystem.config.js
else
  pm2 start ecosystem.config.js
fi
pm2 save

echo "==> Local health check"
curl -sI http://127.0.0.1:3000 | head -5
curl -s http://127.0.0.1:3000/sitemap.xml | head -3
curl -sI "http://127.0.0.1:3000/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk" | head -3

echo "==> Done. Verify live:"
echo "    https://sakuraschoolsimulator.net/blog"
echo "    https://sakuraschoolsimulator.net/downloads/SAKURA_School_Simulator_1.048.03_3f0a690d_techylist.com.apk"
