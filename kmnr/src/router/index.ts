import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage/HomePage.vue';
import PlaylistPage from '../views/PlaylistPage/PlaylistPage.vue';
import LogPage from '../views/LogPage/LogPage.vue';
import Albums from '../views/Albums/Albums.vue';
import AlbumDetail from '../views/Albums/AlbumDetail/Albumdeets.vue';
import ArtistPage from '../views/Artists/ArtistPage.vue';
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
    path: "/album-detail/:albumParam",  // PASSING ALBUM OBJECT AS PARAMETER
    name: 'AlbumDetail',
    component: AlbumDetail,
    props: true,
  },
  {
    path: "/artists",
    name: 'Artist',
    component: ArtistPage
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
