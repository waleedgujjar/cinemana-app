# WordPress Headless CMS Setup

This guide configures WordPress at `https://cms.example.com` as the headless backend for the Next.js frontend.

## Requirements

- WordPress 6.4+
- PHP 8.1+
- MySQL 8.0+ or MariaDB 10.6+
- SSL certificate (HTTPS required)

## Step 1 — Install WordPress

1. Create subdomain `cms.example.com` in Hostinger hPanel.
2. Install WordPress via Hostinger one-click installer or manually.
3. Complete the installation wizard and log in to `/wp-admin`.

## Step 2 — Install Required Plugins

| Plugin | Slug | Purpose |
|--------|------|---------|
| WPGraphQL | `wp-graphql` | GraphQL API |
| Advanced Custom Fields | `advanced-custom-fields` | Structured content |
| WPGraphQL for ACF | `wpgraphql-acf` | Expose ACF in GraphQL |
| Rank Math SEO | `seo-by-rank-math` | SEO metadata |
| Add WPGraphQL SEO | `add-wpgraphql-seo` | Expose Rank Math SEO in GraphQL |
| LiteSpeed Cache | `litespeed-cache` | WP performance |
| Wordfence Security | `wordfence` | Security hardening |

### WPGraphQL settings

- **GraphQL Endpoint:** `https://cms.example.com/graphql`
- Disable public introspection in production
- Enable "Restrict Endpoint to Authenticated Users" only if using preview tokens

### Rank Math

Configure global SEO under **Rank Math → General Settings**. Per-post SEO is available in the post editor sidebar.

## Step 3 — Install MU-Plugin

Copy the bundled headless configuration:

```
wordpress/mu-plugins/headless-config.php → wp-content/mu-plugins/headless-config.php
```

Add to `wp-config.php`:

```php
define('HEADLESS_FRONTEND_URL', 'https://example.com');
define('HEADLESS_REVALIDATION_SECRET', 'your-revalidation-secret');
```

This plugin:

- Registers CPTs: `faq`, `announcement`, `changelog`, `app_version`, `download_file`
- Redirects public WP frontend to Next.js
- Triggers on-demand revalidation on content save

## Step 4 — ACF Options Page

Create an ACF Options Page:

- **Page Title:** Site Settings
- **Menu Slug:** `site-settings`
- **Show in GraphQL:** Yes
- **GraphQL Field Name:** `siteSettingsFields`

### Field Groups

#### `site_meta` (Group)

| Field | Name | Type |
|-------|------|------|
| Site Name | `name` | Text |
| Short Name | `shortName` | Text |
| Version | `version` | Text |
| Description | `description` | Textarea |
| Locale | `locale` | Text (default: `id_ID`) |
| Main Keyword | `mainKeyword` | Text |
| Download File Name | `downloadFileName` | Text |
| Download File URL | `downloadFileUrl` | URL or File |

#### `hero` (Group)

| Field | Name | Type |
|-------|------|------|
| Kicker | `kicker` | Text |
| Headline | `headline` | Text |
| Subhead | `subhead` | Textarea |
| CTA Primary | `ctaPrimary` | Text |
| CTA Secondary | `ctaSecondary` | Text |
| Background Image | `backgroundImage` | Image |
| Stats | `stats` | Repeater: `value`, `label` |
| Trust | `trust` | Repeater: `label` |

#### `download_guide` (Group)

| Field | Name | Type |
|-------|------|------|
| Section ID | `sectionId` | Text (default: `unduh`) |
| Kicker | `kicker` | Text |
| Title | `title` | Text |
| Description | `description` | Textarea |
| Promo Image | `promoImage` | Image |
| Steps | `steps` | Repeater: `number`, `icon`, `title`, `description` |

**Icon select values:** `Smartphone`, `Download`, `Sparkles`, `Film`, `Radio`, `MonitorSmartphone`, `Zap`, `Shield`, `Heart`

#### `about` (Group)

| Field | Name | Type |
|-------|------|------|
| Section ID | `sectionId` | Text (default: `tentang`) |
| Kicker | `kicker` | Text |
| Title | `title` | Text |
| Subtitle | `subtitle` | Textarea |
| Paragraphs | `paragraphs` | Repeater: `text` |
| Features | `features` | Repeater: `text` |
| Stats | `stats` | Repeater: `value`, `label` |
| CTA | `cta` | Text |
| Promo Image | `promoImage` | Image |

#### `features` (Group)

| Field | Name | Type |
|-------|------|------|
| Section ID | `sectionId` | Text (default: `fitur`) |
| Kicker | `kicker` | Text |
| Title | `title` | Text |
| Description | `description` | Textarea |
| Items | `items` | Repeater: `icon`, `title`, `description` |

#### `faq_section` (Group)

| Field | Name | Type |
|-------|------|------|
| Section ID | `sectionId` | Text (default: `faq`) |
| Kicker | `kicker` | Text |
| Title | `title` | Text |
| Description | `description` | Textarea |

#### `conclusion` (Group)

| Field | Name | Type |
|-------|------|------|
| Title | `title` | Text |
| Description | `description` | Textarea |
| CTA | `cta` | Text |

#### `navigation` (Group)

| Field | Name | Type |
|-------|------|------|
| Nav Links | `navLinks` | Repeater: `label`, `href` |
| Footer Links | `footerLinks` | Repeater: `label`, `href` |
| Footer Tagline | `footerTagline` | Text |

Assign all groups to the **Site Settings** options page. Enable **Show in GraphQL** on each group.

## Step 5 — FAQ Custom Post Type

The MU-plugin registers the `faq` CPT. Create FAQ entries:

1. Go to **FAQs → Add New**
2. **Title** = question
3. **Content** = answer
4. Set **Order** (menu order) for display sequence

GraphQL query name: `faqs`

## Step 6 — Blog Posts

Use standard WordPress **Posts**:

- Title, content, excerpt, featured image
- Categories and tags
- Rank Math SEO fields per post
- Author and publish date

## Step 7 — Seed Content

Copy all default text from `src/lib/site-config.ts` into ACF Site Settings fields.

Upload media to WordPress Media Library:

- `hero-sakura-wide.png`
- `download-promo.png`
- `about-promo.png`
- APK file → set `downloadFileUrl`

Create 6 FAQ posts matching `faqCopy.items` in site-config.

## Step 8 — Verify GraphQL

Test in GraphiQL (`https://cms.example.com/graphql`):

```graphql
query Test {
  acfOptionsSiteSettings {
    siteSettingsFields {
      siteMeta {
        name
        version
      }
      hero {
        headline
      }
    }
  }
  faqs(first: 5) {
    nodes {
      title
      content
    }
  }
  posts(first: 3) {
    nodes {
      title
      slug
      seo {
        title
        metaDesc
      }
    }
  }
}
```

## Step 9 — LiteSpeed Cache

- Enable page cache for admin
- Exclude `/graphql` from full-page cache
- Enable browser cache for media uploads

## Step 10 — Security

- Enable Wordfence firewall
- Disable XML-RPC if unused
- Use strong admin passwords
- Keep plugins updated
- Restrict `/wp-admin` by IP if possible

## Optional CPTs

| CPT | GraphQL Plural | Use |
|-----|----------------|-----|
| `announcement` | `announcements` | Site banners |
| `changelog` | `changelogs` | Version history |
| `app_version` | `appVersions` | APK version management |
| `download_file` | `downloadFiles` | Multiple download assets |

Add ACF fields to these CPTs as needed and extend `src/lib/wordpress/queries.ts`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| GraphQL returns null for ACF | Enable "Show in GraphQL" on field groups |
| SEO fields missing | Install `add-wpgraphql-seo` |
| Images not loading in Next.js | Add CMS hostname to `next.config.ts` `remotePatterns` |
| Revalidation not working | Check `HEADLESS_REVALIDATION_SECRET` matches `.env` |
