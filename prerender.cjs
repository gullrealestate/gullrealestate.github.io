const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

async function prerender() {
    const app = express();
    const port = 3000;
    const distPath = path.join(__dirname, 'dist');
    const routes = [
        '/en',
        '/en/contact',
        '/en/contact/requirements',
        '/ur',
        '/ur/contact',
        '/ur/contact/requirements'
    ];

    app.use(express.static(distPath));
    app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });

    const server = app.listen(port, async () => {
        console.log(`Server started on http://localhost:${port}`);

        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        try {
            for (const route of routes) {
                const page = await browser.newPage();
                console.log(`Navigating to http://localhost:${port}${route}...`);
                await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });

                // Wait for the app to render content
                console.log(`Waiting for content to render for ${route}...`);
                await page.waitForSelector('#root div', { timeout: 10000 });

                // Wait a bit more for the typewriter effect or animations
                await new Promise(r => setTimeout(r, 2000));

                const content = await page.content();

                const outputDir = path.join(distPath, route);
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                const outputPath = path.join(outputDir, 'index.html');
                fs.writeFileSync(outputPath, content);
                console.log(`Successfully pre-rendered ${outputPath}`);
                await page.close();
            }
        } catch (err) {
            console.error('Error during pre-rendering:', err);
        } finally {
            await browser.close();
            server.close();
        }
    });
}

prerender();
