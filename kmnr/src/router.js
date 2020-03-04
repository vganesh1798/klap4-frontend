import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './views/Home/HomePage.vue';
import Charts from './views/Charts/Charts.vue'

Vue.use(Router);

// Setting mode to history so we can do proper navigation
export default new Router({
    mode: 'history',
    // All paths, including an error handler path, title is what will display at the top
    routes: [
        {
            path: '/',
            component: HomePage,
            meta: {title: 'Home'}
        },
        {
            path: '/home',
            component: HomePage,
            meta: {title: 'Home'}
        },
        {
            path: '/login',
            component: HomePage,
            meta: {title: 'Log In'}
        },
        {
            path: '/about',
            component: HomePage,
            meta: {title: 'About'}
        },
        {
            path: '/charts',
            component: Charts,
            meta: {title: 'Charts'}
        },
        {
            path: '/playlists',
            component: HomePage,
            meta: {title: 'Playlists'}
        },
        {
            path: '/blog',
            component: HomePage,
            meta: {title: 'Blog'}
        },
        {
            path: '/schedule',
            component: HomePage,
            meta: {title: 'Schedule'}
        },
        {
            path: '/djs',
            component: HomePage,
            meta: {title: 'DJs'}
        },
        {
            path: '/about',
            component: HomePage,
            meta: {title: 'About'}
        },
        {
            path: '/news',
            component: HomePage,
            meta: {title: 'News'}
        },
        {
            path: '*',
            component: HomePage,
            meta: {title: 'Page Not Found'}
        }
    ]
});
