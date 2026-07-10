# Hostinger Deployment Guide

Deploy the full stack on **Hostinger**: Next.js frontend on your main domain and WordPress headless CMS on a subdomain.

> **Example domains in this guide:** `thecinemana.org` (frontend) and `cms.thecinemana.org` (WordPress). Replace with your actual domain.

---

## Before you start — check your Hostinger plan

This project is **Next.js** (Node.js). It does **not** run on basic PHP-only shared hosting.

| Hostinger plan | Next.js frontend | WordPress CMS |
|----------------|------------------|---------------|
| **Single / Premium / Business Web** (PHP only) | ❌ Not supported | ✅ Yes |
| **Business / Cloud with Node.js Web App** | ✅ Yes | ✅ Yes (subdomain) |
| **VPS** | ✅ Yes (PM2) | ✅ Yes |

**If you only have PHP shared hosting:** use Hostinger for WordPress (`cms.yourdomain.com`) and keep the frontend on Vercel. See [deployment-vercel.md](./deployment-vercel.md).

**If you have Node.js Web App or VPS:** follow this guide to host everything on Hostinger.

---

## Target architecture

```
thecinemana.org          → Next.js (Node.js, port 3000)
cms.thecinemana.org      → WordPress (headless CMS, WPGraphQL)
```

Visitors only see `thecinemana.org`. WordPress admin is at `cms.thecinemana.org/wp-admin`.

---

## Phase 1 — Domain & DNS (hPanel)

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com).
2. Open **Domains** → select your domain (e.g. `thecinemana.org`).
3. Ensure the domain points to your Hostinger hosting (nameservers should be Hostinger’s if you bought domain + hosting together).

### Create CMS subdomain

1. **Domains → Subdomains → Create subdomain**
2. Subdomain: `cms`
3. Document root: default (e.g. `public_html/cms` or auto-assigned folder)
4. Result: `cms.thecinemana.org`

### DNS records (usually automatic on Hostinger)

| Type | Name | Points to |
|------|------|-----------|
| A | `@` | Your server IP |
| A | `cms` | Same server IP |
| CNAME | `www` | `thecinemana.org` |

### SSL

1. **Security → SSL** for both `thecinemana.org` and `cms.thecinemana.org`
2. Enable **Free SSL (Let’s Encrypt / AutoSSL)**
3. Wait until status is **Active** (can take up to 24 hours)

---

## Phase 2 — WordPress on `cms.yourdomain.com`

Full CMS setup: [wordpress-setup.md](./wordpress-setup.md).

### 2.1 Install WordPress

1. hPanel → **Website → Auto Installer** (or **WordPress**)
2. Choose domain: **`cms.thecinemana.org`** (not the main domain)
3. Complete install; note admin username/password

### 2.2 Install plugins

In `cms.thecinemana.org/wp-admin` → **Plugins → Add New**:

| Plugin | Purpose |
|--------|---------|
| WPGraphQL | GraphQL API |
| Advanced Custom Fields | Landing page fields |
| WPGraphQL for ACF | ACF in GraphQL |
| Rank Math SEO | SEO |
| Add WPGraphQL SEO | SEO in GraphQL |
| LiteSpeed Cache | Performance |
| Wordfence Security | Security |

### 2.3 Upload MU-plugin

Via **File Manager** or FTP:

```
Local:  wordpress/mu-plugins/headless-config.php
Server: public_html/cms/wp-content/mu-plugins/headless-config.php
```

Create the `mu-plugins` folder if it does not exist.

### 2.4 Edit `wp-config.php`

In File Manager, open `public_html/cms/wp-config.php` and add **above** `/* That's all, stop editing! */`:

```php
define('HEADLESS_FRONTEND_URL', 'https://thecinemana.org');
define('HEADLESS_REVALIDATION_SECRET', 'paste-your-secret-here');
```

Use the **same secret** you will set as `REVALIDATION_SECRET` on the Next.js app.

### 2.5 Configure ACF & content

Follow [wordpress-setup.md](./wordpress-setup.md) to:

- Create **Site Settings** options page
- Seed copy from `src/lib/site-config.ts`
- Create FAQ posts and blog posts
- Upload images and APK to Media Library

### 2.6 Test GraphQL

Open in browser or use curl:

```
https://cms.thecinemana.org/graphql
```

In WPGraphQL GraphiQL (if enabled), run:

```graphql
{
  generalSettings { title url }
}
```

---

## Phase 3 — Next.js on `yourdomain.com`

### Option A — Hostinger Node.js Web App (recommended)

1. hPanel → **Websites → Add Website** → **Node.js Web App**
2. Connect **GitHub** repository (or upload project)
3. Settings:

| Field | Value |
|-------|-------|
| Node.js version | **20.x** |
| Root directory | `/` (project root) |
| Build command | `npm ci && npm run build` |
| Start command | `npm run start` |
| Port | `3000` |

4. **Environment variables** (critical — set before first deploy):

```env
NEXT_PUBLIC_SITE_URL=https://thecinemana.org
WORDPRESS_GRAPHQL_URL=https://cms.thecinemana.org/graphql
REVALIDATION_SECRET=paste-your-secret-here
WORDPRESS_PREVIEW_SECRET=another-strong-secret
WORDPRESS_REVALIDATE_SECONDS=3600
```

5. Assign domain **`thecinemana.org`** to this Node.js app in hPanel.
6. Deploy / **Redeploy**.

> `WORDPRESS_GRAPHQL_URL` must be set at **build time** so WordPress images work (`next.config.ts` `remotePatterns`).

### Option B — Hostinger VPS + PM2

SSH into your VPS:

```bash
# Install Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Clone project
cd /var/www
git clone https://github.com/YOUR_USER/YOUR_REPO.git nextjs-app
cd nextjs-app
npm ci
```

Create `/var/www/nextjs-app/.env.production`:

```env
NEXT_PUBLIC_SITE_URL=https://thecinemana.org
WORDPRESS_GRAPHQL_URL=https://cms.thecinemana.org/graphql
REVALIDATION_SECRET=your-secret
WORDPRESS_PREVIEW_SECRET=your-preview-secret
WORDPRESS_REVALIDATE_SECONDS=3600
```

Build and run:

```bash
npm run build
npm install -g pm2
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup
```

Point your domain to the VPS IP in DNS, then configure nginx reverse proxy (see below).

### Nginx reverse proxy (VPS)

```nginx
server {
    listen 443 ssl http2;
    server_name thecinemana.org www.thecinemana.org;

    ssl_certificate     /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Phase 4 — Moving from Vercel to Hostinger

If the site is currently on Vercel:

1. **Deploy Next.js on Hostinger** (Phase 3) and verify it works on a temporary URL or IP.
2. **Update DNS** for `thecinemana.org` to point to Hostinger (remove Vercel DNS records).
3. Wait for DNS propagation (minutes to 48 hours).
4. Set `HEADLESS_FRONTEND_URL` in WordPress to `https://thecinemana.org`.
5. **Remove or pause** the Vercel project to avoid confusion.
6. Test revalidation webhook (Phase 5).

---

## Phase 5 — Instant content updates

When you save/publish in WordPress, the MU-plugin calls:

```http
POST https://thecinemana.org/api/revalidate?secret=YOUR_REVALIDATION_SECRET
Content-Type: application/json

{
  "paths": ["/", "/blog", "/sitemap.xml", "/feed.xml"],
  "tags": ["site-settings", "posts", "faqs"]
}
```

### Test from your PC

```bash
curl -X POST "https://thecinemana.org/api/revalidate?secret=YOUR_REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d "{\"paths\": [\"/\", \"/blog\"], \"tags\": [\"posts\"]}"
```

Expected: `{"revalidated":true,...}`  
Wrong secret: `401 Invalid secret`

---

## Phase 6 — Go-live checklist

- [ ] SSL active on `thecinemana.org` and `cms.thecinemana.org`
- [ ] WordPress only on **cms** subdomain (not main domain)
- [ ] MU-plugin installed; `wp-config.php` constants set
- [ ] All plugins installed; GraphQL endpoint responds
- [ ] ACF Site Settings filled with your content
- [ ] Node.js app built and running (`npm run start` or Hostinger Node panel shows **Running**)
- [ ] Env vars set on Hostinger (especially `WORDPRESS_GRAPHQL_URL`, `NEXT_PUBLIC_SITE_URL`)
- [ ] `REVALIDATION_SECRET` matches on Next.js and WordPress
- [ ] `https://thecinemana.org` loads landing page
- [ ] `https://thecinemana.org/blog` works
- [ ] `https://thecinemana.org/sitemap.xml` and `/feed.xml` work
- [ ] Publishing a WP post updates the frontend (or within 1 hour via ISR)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **502 Bad Gateway** | Node app not running; check Hostinger Node logs or `pm2 status` |
| **Build fails** | Ensure `WORDPRESS_GRAPHQL_URL` is reachable from Hostinger build server |
| **WordPress images broken** | Set `WORDPRESS_GRAPHQL_URL`, then **rebuild** the Node app |
| **Main domain shows Hostinger default page** | Point domain to Node.js app, not empty `public_html` |
| **cms subdomain shows WP theme** | MU-plugin should redirect to main site; check `headless-config.php` is loaded |
| **Content not updating** | Match revalidation secrets; test `/api/revalidate` with curl |
| **Only PHP hosting available** | Use Vercel for frontend + Hostinger for WordPress only |

---

## Environment variables summary

| Variable | Where to set | Must match |
|----------|--------------|------------|
| `NEXT_PUBLIC_SITE_URL` | Hostinger Node env | `https://thecinemana.org` |
| `WORDPRESS_GRAPHQL_URL` | Hostinger Node env | `https://cms.thecinemana.org/graphql` |
| `REVALIDATION_SECRET` | Hostinger Node env | `HEADLESS_REVALIDATION_SECRET` in `wp-config.php` |
| `HEADLESS_FRONTEND_URL` | WordPress `wp-config.php` | `https://thecinemana.org` |

---

## Related docs

- [wordpress-setup.md](./wordpress-setup.md) — Plugins, ACF fields, GraphQL
- [development.md](./development.md) — Local development
- [maintenance.md](./maintenance.md) — Backups and updates
- [deployment-vercel.md](./deployment-vercel.md) — If frontend stays on Vercel
