
const prerenderer = require('prerender-xs');
const path = require('path');

const routes = require('./routes');

const outputDir = path.join(__dirname, '../../dist/site2019');

const options = {
    routes: routes.all,
    staticDir: outputDir,
    renderOptions: {
        maxConcurrentRoutes: 6,
        renderAfterDocumentEvent: 'prerender-ready',
        skipThirdPartyRequests: true,
    }
}

module.exports = async (_, indexHtml) => {
    const data = await prerenderer.render({ ...options, indexHtml });
    return data.find(x => x.route === '/').html;
}