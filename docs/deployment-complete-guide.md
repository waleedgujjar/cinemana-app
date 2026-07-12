# Complete Deployment Guide — Sakura School Simulator

Beginner-friendly guide to deploy this project when your **domain** and **hosting** are in **two separate Hostinger accounts**.

> **Your domain (example):** `sakuraschoolsimulator.net`  
> **Recommended architecture for Unlimited Shared Hosting:**

| Service | Where it runs | Account |
|---------|---------------|---------|
| Public website (Next.js) | **Vercel** (free) | Vercel account |
| WordPress CMS | **Hostinger hosting** | Hosting account |
| MySQL database | **Hostinger** (auto-created with WordPress) | Hosting account |
| Domain DNS | **Hostinger domain account** | Domain account |

---

## Part 0 — Understand your project (no confusion)

This project has **two parts**:

```
┌─────────────────────────────────────────────────────────┐
│  NEXT.JS FRONTEND (this codebase)                       │
│  - Landing page, blog, SEO, API routes                  │
│  - Needs Node.js → Vercel OR Hostinger Business plan    │
│  - NO MySQL database needed for Next.js                 │
└─────────────────────────────────────────────────────────┘
                          ↕ WPGraphQL (HTTPS)
┌─────────────────────────────────────────────────────────┐
│  WORDPRESS CMS (separate install on hosting)            │
│  - Admin panel for content, blog posts, FAQs            │
│  - Needs PHP + MySQL → Hostinger Shared Hosting ✓       │
│  - URL: cms.sakuraschoolsimulator.net                   │
└─────────────────────────────────────────────────────────┘
```

**You do NOT upload the entire Next.js project to WordPress hosting** on a shared plan.  
**You DO** install WordPress on Hostinger and connect it to Vercel via GraphQL.

---

## Part 1 — Connect domain (Account A) to hosting (Account B)

You have two Hostinger accounts:

- **Account A:** Domain (`sakuraschoolsimulator.net`)
- **Account B:** Web Hosting (Unlimited / Shared)

### Method 1 — Point nameservers (easiest, recommended)

Use the **hosting account’s nameservers** so Hostinger hosting manages all DNS.

**On Account B (Hosting):**

1. Log in to hPanel (hosting account).
2. Go to **Websites** → select your site → **DNS / Nameservers** (or **Plan details**).
3. Copy the nameservers, e.g.:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   (Yours may differ — use exactly what hPanel shows.)

**On Account A (Domain):**

1. Log in to hPanel (domain account).
2. Go to **Domains** → `sakuraschoolsimulator.net` → **DNS / Nameservers**.
3. Choose **Change nameservers** (or “Use Hostinger nameservers”).
4. Paste nameservers from Account B.
5. Save. Propagation can take **15 minutes to 48 hours**.

After propagation, DNS for `sakuraschoolsimulator.net` is controlled from the **hosting account**.

### Method 2 — Keep nameservers on domain account (advanced)

If you want DNS to stay on the domain account:

1. On **Account B (Hosting)**, find your server **IP address** (hPanel → Websites → plan details).
2. On **Account A (Domain)**, edit **DNS Zone**:
   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | `@` | `YOUR_HOSTING_IP` | 14400 |
   | A | `cms` | `YOUR_HOSTING_IP` | 14400 |
   | CNAME | `www` | `sakuraschoolsimulator.net` | 14400 |

For **Vercel frontend** (recommended), you will later change `@` and `www` to point to Vercel (see Part 5). Only `cms` stays on Hostinger IP.

### Verify DNS propagation

Use [https://dnschecker.org](https://dnschecker.org) and check `sakuraschoolsimulator.net` and `cms.sakuraschoolsimulator.net`.

---

## Part 2 — Add domain to hosting account (Account B)

Even if the domain was bought elsewhere, attach it to hosting:

1. **Account B hPanel** → **Websites** → **Add Website**.
2. Choose **Add existing domain** → enter `sakuraschoolsimulator.net`.
3. Hostinger will guide you to update nameservers (Part 1) if not done yet.

Create CMS subdomain:

1. **Domains → Subdomains** → Create `cms`.
2. Result: `cms.sakuraschoolsimulator.net` with its own folder (e.g. `public_html/cms`).

---

## Part 3 — Database setup (WordPress MySQL only)

**Next.js does not use a database.** Only WordPress needs MySQL.

### Automatic (recommended for beginners)

When you install WordPress via Hostinger Auto Installer, Hostinger **creates the database automatically**. You do not need to create tables manually.

1. **Account B hPanel** → **Websites** → `cms.sakuraschoolsimulator.net` (or subdomain site).
2. **Auto Installer** → **WordPress** → Install.
3. Set:
   - **Domain:** `cms.sakuraschoolsimulator.net`
   - **Admin username / password** (save these securely)
   - **Site title:** Sakura School Simulator CMS
4. Complete install. Hostinger creates:
   - MySQL database (e.g. `u123456789_wp123`)
   - Database user with password
   - WordPress files in subdomain folder

### Manual database (optional)

Only if installing WordPress manually:

1. hPanel → **Databases → MySQL Databases**.
2. Create database: `sakura_cms`
3. Create user + strong password; assign **All privileges** to database.
4. Use these credentials during WordPress install.

### Save database credentials

Store in a password manager:

```
Database host: localhost (usually)
Database name: u123456789_wp123
Database user: u123456789_wpuser
Database password: ********
```

These live in WordPress `wp-config.php` — you rarely need them again unless migrating.

---

## Part 4 — WordPress CMS configuration

Follow [`wordpress-setup.md`](./wordpress-setup.md) in detail. Summary:

### 4.1 Install plugins

In `https://cms.sakuraschoolsimulator.net/wp-admin`:

| Plugin | Purpose |
|--------|---------|
| WPGraphQL | GraphQL API for Next.js |
| Advanced Custom Fields | Landing page content fields |
| WPGraphQL for ACF | Expose ACF in GraphQL |
| Rank Math SEO | SEO metadata |
| Add WPGraphQL SEO | SEO in GraphQL |
| LiteSpeed Cache | Speed |
| Wordfence | Security |

### 4.2 Upload MU-plugin

**File Manager** or FTP:

```
From your project:
  wordpress/mu-plugins/headless-config.php

To server:
  public_html/cms/wp-content/mu-plugins/headless-config.php
```

Create `mu-plugins` folder if missing.

### 4.3 Edit `wp-config.php`

Add **above** `/* That's all, stop editing! */`:

```php
define('HEADLESS_FRONTEND_URL', 'https://sakuraschoolsimulator.net');
define('HEADLESS_REVALIDATION_SECRET', 'PASTE_SAME_SECRET_AS_VERCEL');
```

Generate a strong secret (save it — used in Vercel too):

```
Example: Kp9mX2vL8nQ4rT7wY1zA6bC3dE5fG0hJ
```

### 4.4 Seed content

1. Create ACF **Site Settings** options page (see wordpress-setup.md).
2. Copy text from `src/lib/site-config.ts` into WordPress fields.
3. Upload images/APK to **Media Library**.
4. Create **FAQ** posts and **Blog** posts.
5. Test GraphQL: `https://cms.sakuraschoolsimulator.net/graphql`

### 4.5 Enable SSL on CMS

**Account B hPanel** → **Security → SSL** → Enable for `cms.sakuraschoolsimulator.net`.

---

## Part 5 — Deploy Next.js frontend (Vercel — recommended)

Your **Unlimited Shared Hosting cannot run** `npm run start`. Use **Vercel** for the Next.js app (free tier works).

### 5.1 Push code to GitHub

```bash
cd "Game website"
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 5.2 Create Vercel project

1. Go to [vercel.com](https://vercel.com) → **Add New Project**.
2. Import your GitHub repository.
3. Framework: **Next.js** (auto-detected).
4. Build command: `npm run build`
5. Output: default (do not use static export).

### 5.3 Environment variables (Vercel dashboard)

**Settings → Environment Variables** — add for **Production** and **Preview**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://sakuraschoolsimulator.net` |
| `WORDPRESS_GRAPHQL_URL` | `https://cms.sakuraschoolsimulator.net/graphql` |
| `REVALIDATION_SECRET` | Same as `HEADLESS_REVALIDATION_SECRET` in wp-config.php |
| `WORDPRESS_PREVIEW_SECRET` | Another strong random string |
| `WORDPRESS_REVALIDATE_SECONDS` | `3600` |

Click **Deploy**.

> **Important:** After adding/changing env vars, click **Redeploy** so WordPress images work (`next.config.ts` reads `WORDPRESS_GRAPHQL_URL` at build time).

### 5.4 Connect domain to Vercel

**Vercel → Project → Settings → Domains**

Add:
- `sakuraschoolsimulator.net`
- `www.sakuraschoolsimulator.net`

Vercel shows DNS records. Update DNS (domain or hosting account — wherever DNS is managed after Part 1):

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` (use IP Vercel shows) |
| CNAME | `www` | `cname.vercel-dns.com` |

**Keep `cms` subdomain** pointing to **Hostinger hosting IP** (not Vercel).

Final DNS layout:

```
sakuraschoolsimulator.net      → Vercel (Next.js)
www.sakuraschoolsimulator.net  → Vercel
cms.sakuraschoolsimulator.net  → Hostinger (WordPress)
```

### 5.5 Vercel SSL

Vercel issues SSL automatically once DNS is correct. No extra steps.

---

## Part 6 — Alternative: Host everything on Hostinger (upgrade required)

If you refuse Vercel and want Next.js on Hostinger:

1. **Upgrade** hosting to **Business Web Hosting** (includes Node.js Web App).
2. hPanel → **Add Website → Node.js Web App**.
3. Connect GitHub repo.
4. Node 20, Build: `npm ci && npm run build`, Start: `npm run start`.
5. Set same environment variables in Hostinger Node panel (not Vercel).
6. Point `@` and `www` DNS A record to hosting (not Vercel IP).

WordPress stays on `cms` subdomain on the same or another hosting plan.

---

## Part 7 — Point domain to live application

### If using Vercel (recommended)

| Step | Action |
|------|--------|
| 1 | Deploy succeeds on Vercel |
| 2 | Add custom domain in Vercel |
| 3 | Update DNS A + CNAME for `@` and `www` |
| 4 | Wait for DNS propagation |
| 5 | Vercel shows **Valid Configuration** |
| 6 | Visit `https://sakuraschoolsimulator.net` |

### If using Hostinger Node.js

| Step | Action |
|------|--------|
| 1 | Node app status: **Running** |
| 2 | Assign `sakuraschoolsimulator.net` to Node app in hPanel |
| 3 | DNS `@` → hosting server IP |
| 4 | Enable SSL in hPanel |

### Test these URLs after go-live

| URL | Expected |
|-----|----------|
| `https://sakuraschoolsimulator.net` | Landing page |
| `https://sakuraschoolsimulator.net/blog` | Blog listing |
| `https://sakuraschoolsimulator.net/sitemap.xml` | XML sitemap |
| `https://cms.sakuraschoolsimulator.net/graphql` | GraphQL endpoint |
| `https://cms.sakuraschoolsimulator.net/wp-admin` | WordPress admin |

---

## Part 8 — SSL (HTTPS) for everything

| Service | How to enable SSL |
|---------|-------------------|
| Vercel frontend | Automatic after DNS validates |
| WordPress CMS | hPanel → Security → SSL → Enable for `cms.*` |
| Force HTTPS | WordPress: Settings → General → URLs must be `https://` |

**Mixed content fix:** Ensure all WordPress media URLs use `https://`. In `wp-config.php` optionally add:

```php
define('FORCE_SSL_ADMIN', true);
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
```

---

## Part 9 — Go live with minimal downtime

### Recommended zero-downtime order

```
Phase 1 — Build CMS (no public impact)
  ├── Install WordPress on cms subdomain
  ├── Plugins + MU-plugin + content
  └── Test GraphQL works

Phase 2 — Deploy frontend to Vercel (temporary URL)
  ├── Set env vars
  ├── Deploy → test on xxx.vercel.app
  └── Verify pages load (fallback content OK)

Phase 3 — Connect WordPress to frontend
  ├── Confirm WORDPRESS_GRAPHQL_URL in Vercel
  ├── Redeploy Vercel
  └── Test content from WordPress appears

Phase 4 — Switch DNS (only downtime: DNS propagation)
  ├── Lower TTL to 300 (5 min) one day before (optional)
  ├── Point @ and www to Vercel
  ├── Keep cms on Hostinger
  └── Wait 15 min – 48 hrs

Phase 5 — Verify & enable webhooks
  ├── Test revalidation curl command
  ├── Publish test WP post → frontend updates
  └── Enable SSL on both sides
```

### If replacing an existing live site

1. Build and test new site on Vercel **before** changing DNS.
2. Take backup of old site in Hostinger.
3. Change DNS during low-traffic hours.
4. Old site stays up until DNS propagates; some users see old, some see new briefly.

### Test revalidation after go-live

```bash
curl -X POST "https://sakuraschoolsimulator.net/api/revalidate?secret=YOUR_REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d "{\"paths\": [\"/\", \"/blog\"], \"tags\": [\"posts\", \"site-settings\"]}"
```

Expected: `"revalidated": true`

---

## Part 10 — Environment variables reference (full)

### Vercel / Hostinger Node (Next.js)

```env
# Public — your live domain
NEXT_PUBLIC_SITE_URL=https://sakuraschoolsimulator.net

# WordPress GraphQL — must be HTTPS, reachable at build time
WORDPRESS_GRAPHQL_URL=https://cms.sakuraschoolsimulator.net/graphql

# Must match HEADLESS_REVALIDATION_SECRET in wp-config.php
REVALIDATION_SECRET=your-strong-secret

# For draft preview: /api/preview?secret=...
WORDPRESS_PREVIEW_SECRET=another-strong-secret

# Cache refresh interval (seconds)
WORDPRESS_REVALIDATE_SECONDS=3600

# Optional — WordPress Application Password (base64 user:pass)
WORDPRESS_AUTH_TOKEN=
```

### WordPress `wp-config.php`

```php
define('HEADLESS_FRONTEND_URL', 'https://sakuraschoolsimulator.net');
define('HEADLESS_REVALIDATION_SECRET', 'same-as-REVALIDATION_SECRET');
```

### What you do NOT need

- No MySQL env vars for Next.js
- No `DATABASE_URL` for Vercel
- No `.env` committed to Git (use dashboard only)

---

## Part 11 — Project files: what goes where

| Location | What to upload / deploy |
|----------|-------------------------|
| **Vercel (Git deploy)** | Entire repo — auto build from GitHub |
| **WordPress hosting** | Only `wordpress/mu-plugins/headless-config.php` |
| **WordPress Media** | Images, APK via WP admin upload |
| **Do NOT upload** | `node_modules`, `.next`, `.env.local` to WordPress |

### Build commands (reference)

```bash
npm install          # Install dependencies
npm run build        # Production build (Vercel runs this)
npm run start        # Production server (Vercel/Node hosting runs this)
npm run dev          # Local development only
```

---

## Part 12 — Troubleshooting

| Problem | Solution |
|---------|----------|
| Domain not connecting to hosting | Verify nameservers or A record; wait for DNS propagation |
| `cms` subdomain not working | Check subdomain created on hosting account; DNS A record for `cms` |
| WordPress install fails | Confirm database created; check PHP version ≥ 8.1 |
| Next.js won't run on shared hosting | Expected — use Vercel or upgrade to Business |
| GraphQL returns error | Install WPGraphQL; check `https://cms.../graphql` |
| Images broken on frontend | Set `WORDPRESS_GRAPHQL_URL` on Vercel → **Redeploy** |
| Content not updating | Match `REVALIDATION_SECRET`; test `/api/revalidate` |
| SSL not working | Enable AutoSSL in hPanel; wait 15–60 minutes |
| Two accounts confusion | DNS can be managed from hosting account after nameserver change |

---

## Part 13 — Final checklist

### Domain account (A)
- [ ] Nameservers pointed to hosting OR A records configured
- [ ] Domain shows as connected in hosting account

### Hosting account (B)
- [ ] `cms.sakuraschoolsimulator.net` subdomain created
- [ ] WordPress installed with SSL
- [ ] Plugins + MU-plugin installed
- [ ] `wp-config.php` constants set
- [ ] Content seeded in WordPress
- [ ] GraphQL endpoint tested

### Vercel (frontend)
- [ ] GitHub repo connected
- [ ] All env vars set
- [ ] Deploy successful
- [ ] Custom domain added
- [ ] DNS `@` and `www` → Vercel
- [ ] `cms` DNS → Hostinger (unchanged)
- [ ] Revalidation webhook tested

### Go live
- [ ] `https://sakuraschoolsimulator.net` loads
- [ ] Blog and sitemap work
- [ ] HTTPS on main domain and cms
- [ ] Publish WP post → frontend updates

---

## Quick reference diagram

```
DOMAIN ACCOUNT (Hostinger A)
  sakuraschoolsimulator.net
         │
         │ nameservers OR DNS records
         ▼
┌────────────────────────────────────────────────────┐
│  DNS                                                │
│  @ / www  ──────►  Vercel (Next.js frontend)       │
│  cms      ──────►  Hostinger (WordPress + MySQL)   │
└────────────────────────────────────────────────────┘

HOSTING ACCOUNT (Hostinger B)
  cms.sakuraschoolsimulator.net
    ├── WordPress + MySQL
    ├── WPGraphQL → feeds content to Vercel
    └── Webhook → Vercel /api/revalidate

VERCEL
  sakuraschoolsimulator.net
    ├── Next.js app (this codebase)
    ├── Env vars → WORDPRESS_GRAPHQL_URL
    └── Auto SSL + CDN
```

---

## Related documentation

- [wordpress-setup.md](./wordpress-setup.md) — Plugins, ACF, content model
- [deployment-vercel.md](./deployment-vercel.md) — Vercel-specific details
- [deployment-hostinger.md](./deployment-hostinger.md) — Hostinger Node.js (if upgraded)
- [development.md](./development.md) — Local development
- [maintenance.md](./maintenance.md) — Ongoing maintenance
