const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const team = require('./src/assets/data/members.json');
const forms = require('./src/assets/data/forms.json');
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const teamRouteList = team.map(x => '/team/' + x.id);
const formRouteList = Object.keys(forms).map(x => '/form/' + x);

// ... add in your webpack plugins
module.exports = {
    plugins: [
        new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, '../../dist/site2019'),
            // Required - Routes to render.
            routes: [
                '/', 
                '/coc', 
                // forms
                ...formRouteList,
                // team members
                ...teamRouteList,
            ],
        })
    ]
}