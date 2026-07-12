#!/usr/bin/env bash
# Run on VPS as root or sakuraschoolsimulator:
#   bash scripts/deploy-vps.sh
set -euo pipefail

PROJECT_DIR="/home/sakuraschoolsimulator/htdocs/sakuraschoolsimulator.net"
cd "$PROJECT_DIR"

echo "==> Node version"
node -v
npm -v

echo "==> Pull latest code"
git pull origin master

echo "==> Sync stable APK filename"
STABLE_APK="public/downloads/sakura-school-simulator.apk"
if [ -f "$STABLE_APK" ]; then
  echo "    Using existing $STABLE_APK"
elif ls public/downloads/SAKURA_*.apk >/dev/null 2>&1; then
  SRC="$(ls -t public/downloads/SAKURA_*.apk | head -1)"
  cp "$SRC" "$STABLE_APK"
  echo "    Copied $SRC -> $STABLE_APK"
else
  echo "WARNING: No APK found in public/downloads/. Upload before going live."
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

echo "==> Verify WordPress environment"
grep -E '^(NEXT_PUBLIC_SITE_URL|NEXT_PUBLIC_WORDPRESS_URL|WORDPRESS_GRAPHQL_URL|NODE_ENV|PORT)=' .env.production || true
if ! grep -q '^WORDPRESS_GRAPHQL_URL=https://' .env.production; then
  echo "ERROR: WORDPRESS_GRAPHQL_URL must be set in .env.production"
  exit 1
fi

echo "==> Test GraphQL connectivity"
curl -sf -X POST "$(grep '^WORDPRESS_GRAPHQL_URL=' .env.production | cut -d= -f2-)" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first:1) { nodes { slug title } } }"}' | head -c 200
echo ""

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

echo "==> Done. Ensure DNS A record for sakuraschoolsimulator.net points to this VPS IP."
echo "    Then issue Let's Encrypt SSL in CloudPanel for sakuraschoolsimulator.net"
