import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage/HomePage.vue';
import PlaylistPage from '../views/PlaylistPage/PlaylistPage.vue';
import LogPage from '../views/LogPage/LogPage.vue';
import Albums from '../views/Albums/Albums.vue';
import Charts from '../views/Charts/Charts.vue';
import NewAlbums from '../views/NewAlbums/NewAlbums.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/playlists',
    name: 'Playlist',
    component: PlaylistPage
  },
  {
    path: '/log',
    name: 'Log',
    component: LogPage
  },
  {
    path: '/albums',
    name: 'Album',
    component: Albums
  },
  {
    path: '/all-charts',
    name: 'Charts',
    component: Charts
  },
  {
    path: '/new-charts',
    name: 'NewAlbums',
    component: NewAlbums
  },
  {
    path: '*',
    name: 'Error',
    component: HomePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
