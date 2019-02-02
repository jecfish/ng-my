const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;


// ... add in your webpack plugins
module.exports = {
    plugins: [
        new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, '../../dist/site2019'),
            // Required - Routes to render.
            routes: [
                '/', '/coc', 
                '/form/call-for-presenters',
                '/form/speaker-nomination',
                '/form/call-for-sponsors',
                '/form/sponsor-intro'
            ],
        })
    ]
}