export const MEDIA_FRAGMENT = `
  fragment MediaFields on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export const SEO_FRAGMENT = `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
    }
  }
`;

export const POST_CARD_FRAGMENT = `
  fragment PostCardFields on Post {
    id
    databaseId
    title
    slug
    excerpt
    date
    modified
    featuredImage {
      node {
        ...MediaFields
      }
    }
    author {
      node {
        name
        slug
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
    seo {
      ...SeoFields
    }
  }
  ${MEDIA_FRAGMENT}
  ${SEO_FRAGMENT}
`;

export const POST_DETAIL_FRAGMENT = `
  fragment PostDetailFields on Post {
    ...PostCardFields
    content
  }
  ${POST_CARD_FRAGMENT}
`;

export const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    acfOptionsSiteSettings {
      siteSettingsFields {
        siteMeta {
          name
          shortName
          version
          description
          locale
          mainKeyword
          downloadFileName
          downloadFileUrl
        }
        hero {
          kicker
          headline
          subhead
          ctaPrimary
          ctaSecondary
          backgroundImage {
            node {
              ...MediaFields
            }
          }
          stats {
            value
            label
          }
          trust {
            label
          }
        }
        downloadGuide {
          sectionId
          kicker
          title
          description
          promoImage {
            node {
              ...MediaFields
            }
          }
          steps {
            number
            icon
            title
            description
          }
        }
        about {
          sectionId
          kicker
          title
          subtitle
          paragraphs {
            text
          }
          features {
            text
          }
          stats {
            value
            label
          }
          cta
          promoImage {
            node {
              ...MediaFields
            }
          }
        }
        features {
          sectionId
          kicker
          title
          description
          items {
            icon
            title
            description
          }
        }
        faqSection {
          sectionId
          kicker
          title
          description
        }
        conclusion {
          title
          description
          cta
        }
        navigation {
          navLinks {
            label
            href
          }
          footerLinks {
            label
            href
          }
          footerTagline
        }
      }
    }
  }
  ${MEDIA_FRAGMENT}
`;

export const FAQS_QUERY = `
  query Faqs {
    faqs(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        title
        content
      }
    }
  }
`;

export const POSTS_QUERY = `
  query Posts($first: Int = 10, $after: String, $search: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, search: $search, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...PostCardFields
      }
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostDetailFields
    }
  }
  ${POST_DETAIL_FRAGMENT}
`;

export const POST_SLUGS_QUERY = `
  query PostSlugs($first: Int = 100, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        modified
      }
    }
  }
`;

export const POSTS_BY_CATEGORY_QUERY = `
  query PostsByCategory($slug: [String], $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { categoryName: $slug, status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...PostCardFields
      }
    }
    category(id: $slug, idType: SLUG) {
      name
      slug
      description
      count
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export const POSTS_BY_TAG_QUERY = `
  query PostsByTag($slug: [String], $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { tag: $slug, status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...PostCardFields
      }
    }
    tag(id: $slug, idType: SLUG) {
      name
      slug
      count
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export const RELATED_POSTS_QUERY = `
  query RelatedPosts($categoryIn: [ID], $notIn: [ID], $first: Int = 3) {
    posts(
      first: $first
      where: {
        categoryIn: $categoryIn
        notIn: $notIn
        status: PUBLISH
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ...PostCardFields
      }
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export const ADJACENT_POSTS_QUERY = `
  query AdjacentPosts($date: String!) {
    previous: posts(
      first: 1
      where: { status: PUBLISH, dateQuery: { before: $date }, orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ...PostCardFields
      }
    }
    next: posts(
      first: 1
      where: { status: PUBLISH, dateQuery: { after: $date }, orderby: { field: DATE, order: ASC } }
    ) {
      nodes {
        ...PostCardFields
      }
    }
  }
  ${POST_CARD_FRAGMENT}
`;

export const CATEGORIES_QUERY = `
  query Categories {
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        description
        count
      }
    }
  }
`;

export const TAGS_QUERY = `
  query Tags {
    tags(first: 100, where: { hideEmpty: true }) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

export const SITEMAP_POSTS_QUERY = `
  query SitemapPosts($first: Int = 100, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        modified
      }
    }
    categories(first: 100, where: { hideEmpty: true }) {
      nodes {
        slug
        count
      }
    }
    tags(first: 100, where: { hideEmpty: true }) {
      nodes {
        slug
        count
      }
    }
  }
`;

export const RSS_POSTS_QUERY = `
  query RssPosts($first: Int = 20) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        slug
        excerpt
        date
        modified
        author {
          node {
            name
          }
        }
      }
    }
  }
`;
