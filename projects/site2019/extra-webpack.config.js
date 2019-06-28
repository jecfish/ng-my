const path = require('path');
const CreateFileWebpack = require('create-file-webpack');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const team = require('./src/assets/data/members.json');
const speakers = require('./src/assets/data/speakers.json');
const forms = require('./src/assets/data/forms.json');
const posts = require('./src/assets/data/posts.json');
const sessions = require('./src/assets/data/sessions.json');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const teamRouteList = [...team.members.map(x => '/team/' + x.id), ...team.organizers.map(x => '/team/' + x.id)];
const speakerRouteList = speakers.map(x => '/speakers/' + x.id);
const formRouteList = Object.keys(forms).map(x => '/form/' + x);
const postRouteList = Object.keys(posts).map(x => '/post/' + x);
const sessionRouteList = sessions.map(x => '/sessions/' + x.id);

const outputDir = path.join(__dirname, '../../dist/site2019');
const prodBaseUrl = 'https://2019.ng-my.org';

const routes = [
  '/',
  '/home',
  '/coc',
  // posts
  '/posts',
  ...postRouteList,
  '/speakers',
  ...speakerRouteList,
  '/sessions',
  ...sessionRouteList,
  '/agenda',
  '/schedule',
  // forms
  ...formRouteList,
  // team members
  '/team',
  ...teamRouteList,
  '/food',
];

const routePriority100 = ['/'];
const routePriority80 = ['/schedule', '/speakers', '/sessions', '/team', '/coc'];

const generateSitemap = function (paths) {
  const prefix = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const postfix = `</urlset>`;

  const getUrl = (base, path) => {
    const priority = routePriority100.includes(path) ? '1.00' : routePriority80.includes(path) ? '0.80': '0.50';

    return `<url>
      <loc>${base}${path}</loc>
      <priority>${priority}</priority>
    </url>`;
  };

  const content = paths.map(x => getUrl(prodBaseUrl, x)).join('');

  return prefix + content + postfix;
}

// ... add in your webpack plugins
module.exports = {
  plugins: [
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: outputDir,
      renderAfterDocumentEvent: 'prerender-ready',
      skipThirdPartyRequests: true,
      // addtional puppeteer options
      // dumpio: true,
      args: ['--disable-setuid-sandbox', '--no-sandbox'],
      renderer: new Renderer({
        timeout: 0,
        maxConcurrentRoutes: 1,
        navigationParams: {
          timeout: 0
        }
      }),
      postProcess(renderedRoute) {
        renderedRoute.route = renderedRoute.originalRoute;
        renderedRoute.html = renderedRoute.html.split(/>[\s]+</gmi).join('><');
        if (renderedRoute.route.endsWith('.html')) {
          renderedRoute.outputPath = path.join(__dirname, '../../dist/site2019', renderedRoute.route)
        }

        return renderedRoute;
      },
      // Required - Routes to render.
      routes
    }),
    new CreateFileWebpack({
      path: outputDir,
      // file name
      fileName: 'sitemap.xml',
      // content of the file
      content: generateSitemap(routes)
    })
  ]
}
