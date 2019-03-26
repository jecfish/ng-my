const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const team = require('./src/assets/data/members.json');
const speakers = require('./src/assets/data/speakers.json');
const forms = require('./src/assets/data/forms.json');
const posts = require('./src/assets/data/posts.json');
const sessions = require('./src/assets/data/sessions.json');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const teamRouteList = team.map(x => '/team/' + x.id);
const speakerRouteList = speakers.map(x => '/speakers/' + x.id);
const formRouteList = Object.keys(forms).map(x => '/form/' + x);
const postRouteList = Object.keys(posts).map(x => '/post/' + x);
const sessionRouteList = sessions.map(x => '/sessions/' + x.id);

// ... add in your webpack plugins
module.exports = {
    plugins: [
        new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, '../../dist/site2019'),
            renderAfterDocumentEvent: 'prerender-ready',
            maxConcurrentRoutes: 2,
            skipThirdPartyRequests: true,
            // addtional puppeteer options
            dumpio: true,
            args: ['--disable-setuid-sandbox', '--no-sandbox'],
            // Required - Routes to render.
            routes: [
                '/', 
                '/coc',
                // posts
                ...postRouteList,
                '/speakers',
                ...speakerRouteList,
                '/sessions',
                ...sessionRouteList,
                '/schedule',
                // forms
                ...formRouteList,
                // team members
                '/team',
                ...teamRouteList,
            ],
        })
    ]
}
