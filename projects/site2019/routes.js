const path = require('path');
const team = require('./src/assets/data/members.json');
const speakers = require('./src/assets/data/speakers.json');
// const forms = require('./src/assets/data/forms.json');
const posts = require('./src/assets/data/posts.json');
const sessions = require('./src/assets/data/sessions.json');

const teamRouteList = [...team.members.map(x => '/team/' + x.id), ...team.organizers.map(x => '/team/' + x.id)];
const speakerRouteList = speakers.map(x => '/speakers/' + x.id);
// const formRouteList = Object.keys(forms).map(x => '/form/' + x);
const postRouteList = Object.keys(posts).map(x => '/post/' + x);
const sessionRouteList = sessions.map(x => '/sessions/' + x.id);

const routes = {
    all: [
        '/',
        '/home',
        '/coc',
        '/posts',
        ...postRouteList,
        '/speakers',
        ...speakerRouteList,
        '/sessions',
        ...sessionRouteList,
        '/schedule',
        // ...formRouteList,
        '/team',
        ...teamRouteList,
        '/food',
    ],
    routePriority100: ['/'],
    routePriority80: ['/schedule', '/speakers', '/sessions', '/team', '/coc']
}

module.exports = routes;