const puppeteer = require('puppeteer');
const express = require('express');
const { join, dirname } = require('path');
const { writeFileSync, mkdirSync, existsSync } = require('fs');
const promiseLimit = require('promise-limit')

class Server {
    constructor(options) {
        this.options = options;
    }

    start() {
        const app = new express();
        app.get('*', express.static(join(this.options.staticDir), { dotfiles: 'allow' }));
        app.get('*', (_, res) => res.sendFile(join(this.options.staticDir, 'index.html')));

        this.instance = app.listen(0);
        this.port = this.instance.address().port;
    }

    destroy() {
        this.instance && this.instance.close();
    }
}

function waitForRender(options) {
    options = options || {}

    return new Promise((resolve, reject) => {
        // Render when an event fires on the document.
        if (options.renderAfterDocumentEvent) {
            if (window['__PRERENDER_STATUS'] && window['__PRERENDER_STATUS'].__DOCUMENT_EVENT_RESOLVED) resolve()
            document.addEventListener(options.renderAfterDocumentEvent, () => resolve())

            // Render after a certain number of milliseconds.
        } else if (options.renderAfterTime) {
            setTimeout(() => resolve(), options.renderAfterTime)

            // Default: Render immediately after page content loads.
        } else {
            resolve()
        }
    })
}

function writeContent({ outputDir, route, html }) {
    // Defining the html file name that will be created
    const file = join(outputDir, route, 'index.html');

    // Test if the directory exist, if not create the directory
    const dir = dirname(file);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    // Write the rendered html file
    writeFileSync(file, html);
}

async function handleRequestInterception(options, page, baseURL) {
    await page.setRequestInterception(true)

    page.on('request', req => {
        // Skip third party requests if needed.
        if (options.skipThirdPartyRequests) {
            if (!req.url().startsWith(baseURL)) {
                req.abort()
                return
            }
        }

        req.continue()
    })
}

async function prerenderer({ routes, staticDir, renderAfterDocumentEvent, skipThirdPartyRequests = false, maxConcurrentRoutes = 0 }) {
    console.log('[prerendering] prerendering started');
    // start server
    const server = new Server({ staticDir });
    server.start();

    const baseURL = `http://localhost:${server.port}`;
    console.log(`[prerendering] server launched: ${baseURL}!`);

    const browser = await puppeteer.launch();

    const limiter = promiseLimit(maxConcurrentRoutes);

    return Promise.all(
        routes.map(route => {
            return limiter(async () => {
                const page = await browser.newPage();

                await handleRequestInterception({ skipThirdPartyRequests }, page, baseURL);

                // Hack just in-case the document event fires before our main listener is added.
                if (renderAfterDocumentEvent) {
                    page.evaluateOnNewDocument(function (options) {
                        window['__PRERENDER_STATUS'] = {}
                        document.addEventListener(options.renderAfterDocumentEvent, () => {
                            window['__PRERENDER_STATUS'].__DOCUMENT_EVENT_RESOLVED = true
                        })
                    }, { renderAfterDocumentEvent })
                }

                await page.goto(baseURL + route, { waituntil: 'networkidle0' });
                console.log(`[prerendering] rendering route ${route}`);
                // Once this completes, it's safe to capture the page contents.
                await page.evaluate(waitForRender, { renderAfterDocumentEvent });
                const html = await page.content();
                writeContent({ outputDir: staticDir, route, html });
                console.log(`[prerendering] completed route ${route}`)
                await page.close();
                return;
            })
        })
    ).then(() => {
        browser.close();
        server.destroy();
        console.log('[prerendering] prerendering completed');
    });
}

module.exports = prerenderer;
