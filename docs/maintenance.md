# Maintenance Guide

## Regular Tasks

### Weekly

- [ ] Check WordPress plugin updates (WPGraphQL, ACF, Rank Math, Wordfence)
- [ ] Review Wordfence security alerts
- [ ] Verify `/api/revalidate` webhook is firing on publish
- [ ] Spot-check blog posts render correctly on frontend

### Monthly

- [ ] Full WordPress backup (database + uploads)
- [ ] Review LiteSpeed Cache settings
- [ ] Check SSL certificate expiry (AutoSSL renews automatically on Hostinger)
- [ ] Run Lighthouse audit on homepage and a blog post
- [ ] Review `npm audit` and update dependencies

### Quarterly

- [ ] Update Node.js LTS on Hostinger
- [ ] Review and rotate `REVALIDATION_SECRET` and `WORDPRESS_PREVIEW_SECRET`
- [ ] Audit WordPress user accounts — remove unused admins
- [ ] Test disaster recovery (restore from backup)

## Backups

### WordPress

Use Hostinger backup tool or a plugin like UpdraftPlus:

- Database: daily
- `wp-content/uploads/`: daily
- `wp-content/mu-plugins/`: on change

### Next.js

- Source code: Git repository (primary backup)
- Environment variables: store securely in Hostinger panel + password manager
- No database on frontend — all content lives in WordPress

## Cache Management

### Clear Next.js ISR cache

Trigger full revalidation:

```bash
curl -X POST "https://example.com/api/revalidate?secret=<REVALIDATION_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/", "/blog"], "tags": ["site-settings", "posts", "faqs"]}'
```

### Clear WordPress cache

LiteSpeed Cache → **Toolbox → Purge All**

### Clear browser cache

Users may need hard refresh after major design changes.

## Monitoring

| Check | Tool | Frequency |
|-------|------|-----------|
| Site uptime | Hostinger uptime monitor / UptimeRobot | Continuous |
| SSL expiry | SSL Labs / hPanel | Monthly |
| GraphQL health | `curl -X POST cms.example.com/graphql -d '{"query":"{generalSettings{title}}"}'` | Weekly |
| Build status | CI or manual `npm run build` | On deploy |
| Core Web Vitals | Google Search Console | Monthly |

## Common Issues

### Content not updating on frontend

1. Check WordPress webhook fired (enable WP debug log)
2. Verify `REVALIDATION_SECRET` matches on both sides
3. Manually trigger revalidation (see above)
4. Wait for ISR interval (`WORDPRESS_REVALIDATE_SECONDS`, default 3600s)

### GraphQL errors in build

1. Confirm `WORDPRESS_GRAPHQL_URL` is reachable from build server
2. Test query in GraphiQL
3. Check ACF "Show in GraphQL" is enabled
4. Site falls back to `site-config.ts` if WP is unreachable

### Images not displaying

1. Verify image URL hostname is in `next.config.ts` `remotePatterns`
2. Confirm media uploaded to WordPress (not broken links)
3. Check HTTPS on media URLs

### Blog post 404

1. Confirm post is **Published** (not Draft)
2. Run new build or wait for ISR
3. Check slug matches URL (`/blog/[slug]`)

## Security Maintenance

- Keep Wordfence rules updated
- Review failed login attempts weekly
- Disable unused WordPress users
- Never commit `.env.local` to Git
- Rotate secrets annually

## Dependency Updates

```bash
# Check outdated packages
npm outdated

# Update Next.js (test thoroughly)
npm install next@latest eslint-config-next@latest

# Rebuild and test
npm run build
npm run start
```

## Scaling Considerations

- **More traffic:** Upgrade Hostinger plan; consider CDN for static assets
- **More posts:** Pagination handles large archives; sitemap fetches all slugs at build/ISR
- **Multiple editors:** WordPress handles concurrent editing; ISR prevents rebuild storms via webhooks

## Support Contacts

| Component | Resource |
|-----------|----------|
| WPGraphQL | [github.com/wp-graphql/wp-graphql](https://github.com/wp-graphql/wp-graphql) |
| ACF | [advancedcustomfields.com/resources](https://www.advancedcustomfields.com/resources/) |
| Rank Math | [rankmath.com/kb](https://rankmath.com/kb/) |
| Next.js | [nextjs.org/docs](https://nextjs.org/docs) |
| Hostinger | hPanel live chat / knowledge base |
