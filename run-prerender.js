const prerenderer = require('./prerender');
const path = require('path');

const routes = require('./projects/site2019/routes');

const outputDir = path.join(__dirname, './dist/site2019');

const options = {
    routes: routes.all,
    staticDir: outputDir,
    renderAfterDocumentEvent: 'prerender-ready',
    skipThirdPartyRequests: true,
    maxConcurrentRoutes: 4
}

prerenderer(options);
