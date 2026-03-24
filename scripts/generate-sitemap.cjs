const fs = require('fs');
const path = require('path');

const baseUrl = 'https://gullrealestate.github.io';
const routes = [
    '/',
    '/contact',
    '/contactCEO',
    '/contactAgentA',
    '/contactAgentB'
];

function generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
        return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    }).join('\n')}
</urlset>`;

    const outputPath = path.join(__dirname, '..', 'dist', 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Sitemap created at: ${outputPath}`);
}

generateSitemap();
