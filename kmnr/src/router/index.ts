import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage/HomePage.vue';
import PlaylistPage from '../views/PlaylistPage/PlaylistPage.vue';
import LogPage from '../views/LogPage/LogPage.vue';
import Albums from '../views/Albums/Albums.vue';
import AlbumDetail from '../views/Albums/AlbumDetail/Albumdeets.vue';
import ArtistPage from '../views/Artists/ArtistPage.vue';
import ArtistDetail from '../views/Artists/ArtistDetail/Artistdeets.vue';
import Charts from '../views/Charts/Charts.vue';


Vue.use(VueRouter)

const DEFAULT_TITLE = 'KMNR'

const routes = [
  {
    path: '/',
    name: 'KMNR',
    component: HomePage
  },
  {
    path: '/playlists',
    name: 'Playlist',
    component: PlaylistPage
  },
  {
    path: '/log',
    name: 'Playlists',
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
    path: "/artist-detail/:albumParam",  // PASSING ALBUM OBJECT AS PARAMETER
    name: 'ArtistDetail',
    component: ArtistDetail,
    props: true,
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Charts
  },
  {
    path: '/artists',
    name: 'Artists',
    component: ArtistPage
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

router.afterEach((to, from) => {
  document.title = to.name || DEFAULT_TITLE
})


export default router
