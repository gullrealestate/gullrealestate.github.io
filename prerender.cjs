const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const fs = require('fs');

async function prerender() {
    const app = express();
    const port = 3000;
    const distPath = path.join(__dirname, 'dist');

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
        const page = await browser.newPage();

        try {
            console.log('Navigating to http://localhost:3000...');
            await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });

            // Wait for the app to render content
            console.log('Waiting for content to render...');
            await page.waitForSelector('#root > div', { timeout: 10000 });

            // Wait a bit more for the typewriter effect
            await new Promise(r => setTimeout(r, 2000));

            const content = await page.content();

            const indexPath = path.join(distPath, 'index.html');
            fs.writeFileSync(indexPath, content);
            console.log('Successfully pre-rendered index.html');

        } catch (err) {
            console.error('Error during pre-rendering:', err);
        } finally {
            await browser.close();
            server.close();
        }
    });
}

prerender();
