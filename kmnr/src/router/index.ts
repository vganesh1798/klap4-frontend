import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage/HomePage.vue';
import PlaylistPage from '../views/PlaylistPage/PlaylistPage.vue';
import LogPage from '../views/LogPage/LogPage.vue';

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
