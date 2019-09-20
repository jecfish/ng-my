
// const prerenderer = require('../../prerender');
const { prerenderer } = require('prerender-xs');
const path = require('path');

const routes = require('./routes');

const outputDir = path.join(__dirname, '../../dist/site2019');

const options = {
    routes: routes.all,
    staticDir: outputDir,
    renderAfterDocumentEvent: 'prerender-ready',
    skipThirdPartyRequests: true,
    maxConcurrentRoutes: 5
}

module.exports = async (_, indexHtml) => {
    const data = await prerenderer({ ...options, indexHtml });
    return data.find(x => x.route === '/').html;
}