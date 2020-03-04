import Vue from 'vue';
import Router from 'vue-router';

import HomePage from './views/Home/HomePage';

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
            path: '/new-charts',
            component: HomePage,
            meta: {title: 'New Charts'}
        },
        {
            path: '/all-charts',
            component: HomePage,
            meta: {title: 'All Charts'}
        },
        {
            path: '/albums',
            component: HomePage,
            meta: {title: 'Albums'}
        },
        {
            path: '/artists',
            component: HomePage,
            meta: {title: 'Artists'}
        },
        {
            path: '/log',
            component: HomePage,
            meta: {title: 'Log'}
        },
        {
            path: '/stream',
            component: HomePage,
            meta: {title: 'Stream'}
        },
        {
            path: '/search',
            component: HomePage,
            meta: {title: 'Search'}
        },
        {
            path: '*',
            component: HomePage,
            meta: {title: 'Page Not Found'}
        }
    ]
});
