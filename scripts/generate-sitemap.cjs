const fs = require('fs');
const path = require('path');

const baseUrl = 'https://gullrealestate.github.io';
const routes = [
    '/en',
    '/ur',
    '/en/contact',
    '/ur/contact',
    '/en/contact/requirements',
    '/ur/contact/requirements'
];

function generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes.map(route => {
        const lang = route.startsWith('/en') ? 'en' : 'ur';
        const otherLang = lang === 'en' ? 'ur' : 'en';
        const page = route.substring(3) || '';

        return `  <url>
    <loc>${baseUrl}${route}</loc>
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${route}"/>
    <xhtml:link rel="alternate" hreflang="${otherLang}" href="${baseUrl}/${otherLang}${page}"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.includes('contact') ? '0.8' : '1.0'}</priority>
  </url>`;
    }).join('\n')}
</urlset>`;

    const outputPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Sitemap created at: ${outputPath}`);
}

generateSitemap();
