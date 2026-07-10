<?php
/**
 * Plugin Name: Headless CMS Configuration
 * Description: Registers custom post types, headless redirects, and Next.js revalidation webhooks.
 * Version: 1.0.0
 * Author: Site Admin
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom post types with WPGraphQL support.
 */
function headless_register_post_types(): void {
    $cpts = [
        'faq' => [
            'label' => 'FAQs',
            'singular' => 'FAQ',
            'graphql_single' => 'faq',
            'graphql_plural' => 'faqs',
            'supports' => ['title', 'editor', 'page-attributes'],
            'menu_icon' => 'dashicons-editor-help',
        ],
        'announcement' => [
            'label' => 'Announcements',
            'singular' => 'Announcement',
            'graphql_single' => 'announcement',
            'graphql_plural' => 'announcements',
            'supports' => ['title', 'editor', 'thumbnail'],
            'menu_icon' => 'dashicons-megaphone',
        ],
        'changelog' => [
            'label' => 'Changelog',
            'singular' => 'Changelog Entry',
            'graphql_single' => 'changelog',
            'graphql_plural' => 'changelogs',
            'supports' => ['title', 'editor'],
            'menu_icon' => 'dashicons-list-view',
        ],
        'app_version' => [
            'label' => 'App Versions',
            'singular' => 'App Version',
            'graphql_single' => 'appVersion',
            'graphql_plural' => 'appVersions',
            'supports' => ['title'],
            'menu_icon' => 'dashicons-smartphone',
        ],
        'download_file' => [
            'label' => 'Download Files',
            'singular' => 'Download File',
            'graphql_single' => 'downloadFile',
            'graphql_plural' => 'downloadFiles',
            'supports' => ['title'],
            'menu_icon' => 'dashicons-download',
        ],
    ];

    foreach ($cpts as $slug => $config) {
        register_post_type($slug, [
            'labels' => [
                'name' => $config['label'],
                'singular_name' => $config['singular'],
            ],
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => $config['graphql_single'],
            'graphql_plural_name' => $config['graphql_plural'],
            'supports' => $config['supports'],
            'menu_icon' => $config['menu_icon'],
            'has_archive' => false,
            'rewrite' => false,
            'publicly_queryable' => false,
        ]);
    }
}
add_action('init', 'headless_register_post_types');

/**
 * Redirect public WordPress frontend to Next.js (keep admin + GraphQL).
 */
function headless_redirect_frontend(): void {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron()) {
        return;
    }

    $request_uri = $_SERVER['REQUEST_URI'] ?? '';

    if (
        str_contains($request_uri, '/wp-json') ||
        str_contains($request_uri, '/graphql') ||
        str_contains($request_uri, '/wp-login') ||
        str_contains($request_uri, '/wp-admin')
    ) {
        return;
    }

    $frontend_url = defined('HEADLESS_FRONTEND_URL')
        ? HEADLESS_FRONTEND_URL
        : getenv('HEADLESS_FRONTEND_URL');

    if ($frontend_url) {
        wp_redirect($frontend_url, 302);
        exit;
    }
}
add_action('template_redirect', 'headless_redirect_frontend');

/**
 * Trigger Next.js on-demand revalidation after content changes.
 */
function headless_trigger_revalidation(string $post_type = ''): void {
    $frontend_url = defined('HEADLESS_FRONTEND_URL')
        ? HEADLESS_FRONTEND_URL
        : getenv('HEADLESS_FRONTEND_URL');
    $secret = defined('HEADLESS_REVALIDATION_SECRET')
        ? HEADLESS_REVALIDATION_SECRET
        : getenv('HEADLESS_REVALIDATION_SECRET');

    if (!$frontend_url || !$secret) {
        return;
    }

    $tags = ['site-settings', 'posts', 'faqs'];
    $paths = ['/', '/blog', '/sitemap.xml', '/feed.xml'];

    if ($post_type === 'post') {
        $tags[] = 'posts';
    }

    if ($post_type === 'faq') {
        $tags[] = 'faqs';
    }

    wp_remote_post(
        rtrim($frontend_url, '/') . '/api/revalidate?secret=' . rawurlencode($secret),
        [
            'timeout' => 10,
            'headers' => ['Content-Type' => 'application/json'],
            'body' => wp_json_encode([
                'paths' => $paths,
                'tags' => array_unique($tags),
            ]),
        ]
    );
}

function headless_on_save_post(int $post_id, WP_Post $post): void {
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
        return;
    }
    headless_trigger_revalidation($post->post_type);
}
add_action('save_post', 'headless_on_save_post', 10, 2);

function headless_on_acf_save(): void {
    headless_trigger_revalidation('acf_options');
}
add_action('acf/save_post', 'headless_on_acf_save');
