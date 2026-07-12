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

echo "==> Install dependencies"
npm ci

if [ ! -f .env.production ]; then
  echo "ERROR: .env.production missing. Copy from .env.example and set secrets:"
  echo "  cp .env.example .env.production"
  echo "  openssl rand -base64 32   # for REVALIDATION_SECRET"
  echo "  openssl rand -base64 32   # for WORDPRESS_PREVIEW_SECRET"
  exit 1
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

echo "==> Done. Ensure DNS A record for sakuraschoolsimulator.net points to this VPS IP."
echo "    Then issue Let's Encrypt SSL in CloudPanel for sakuraschoolsimulator.net"
