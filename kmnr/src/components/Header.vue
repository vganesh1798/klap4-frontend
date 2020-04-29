<template>
    <div id="Header">
      <nav :class="{
                'nav-top': !scrolledTop && !preload && !preloadFull,
                'nav-full': scrolledTop && !preload && !preloadFull,
                'preload-navbar': preload,
                'preload-navbar-full': preloadFull,
                'nav': true
            }">
            <router-link to="/"><img :src="logoSource" :class="{
                'logo-top': !scrolledTop && !preload && !preloadFull,
                'logo-full': scrolledTop && !preload && !preloadFull,
                'preload-logo': preload,
                'preload-logo-full': preloadFull
            }" class="logo"></router-link>
            <div id="search-bar" :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }">
              <input v-model="searchquery" id="search" placeholder="Quickjump" type="search" @keyup.enter="search()">
              <!--<label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons" v-if="searching">close</i>-->
            </div>



            

            <div id="login" :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" v-if="!userAuth" @click="openLogin()">
                Log In
            </div>

            <div id="logout" :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" v-else @click="logOut()">
                Log Out
            </div>

           <router-link :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" to="/charts">Charts</router-link>

<!--
            <router-link :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" to="/artists">Artists</router-link>

            <router-link :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" to="/albums">Albums</router-link>
-->
            <router-link :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" to="/search">Search</router-link>
            
            <router-link :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" to="/log">Playlists</router-link>
            <router-link :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" to="/programming">KELP</router-link>

            <a :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }" href="http://www.cleveland.kmnr.org">Cleveland</a>
            <a v-if="isAdmin" :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" href="localhost:5000/admin">Admin</a>
            <div v-if="userAuth" :class="{
                'items-top': !scrolledTop && !preload && !preloadFull,
                'items-full': scrolledTop && !preload && !preloadFull,
                'preload': preload,
				'preload-full': preloadFull
            }"><md-chip>Logged in as {{curUser}}</md-chip></div>
            
            
        </nav>
        <login v-if="loginOpen || ((route === '/programming' || route === '/log') && curUser === '')" @closeLogin="closeLogin" @loggedIn="loggedIn"></login>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
    import router from '../router/index';

    import login from './Login.vue';

    @Component({
    components: { login }
})
    export default class Header extends Vue {
        searching = false
        homepage = true
        scrolledTop = false
        preload = true
        loginOpen = false
        on = false
        logoSource = './radio.png'
        userAuth = false
        searchquery = "";
        firstLoad = true
        preloadFull = false

        user = this.$store.state.currentUserInfo['full_name']

        get curUser() {
            return this.$store.state.currentUserInfo['full_name']
        }
        get route() {
            return this.$route.path
        }
        
        @Watch('route')
        disablePreload() {
            this.preloadFull = false
            this.preload = false
        }

        created() {
            let onHomePage = this.route === '/' || this.route === '/home'
            this.preload = onHomePage
            this.preloadFull = !onHomePage
        }

        get isAdmin() {
            return this.$store.state.currentUserInfo['role']
        }

        beforeMount() {
            window.addEventListener('scroll', this.navScroll)
            this.homepage = router.currentRoute.path === '/home' || router.currentRoute.path === '/' ? true : false
            let images = require.context('../assets/', false, /\.png$/)

            if (!this.homepage) {
                this.scrolledTop = true
                this.logoSource = images('./logo.png')
            } else {
                this.logoSource = images('./radio.png')
            }

            if (this.$cookies.isKey('csrf_access_token')) {
                this.$store.dispatch('getCurrUser')
                this.userAuth = true
            }
        }

        mounted() {
            (document.getElementsByClassName('nav') as HTMLCollectionOf<HTMLElement>)[0].style.animation = "none";
            let images = require.context('../assets/', false, /\.png$/)
            router.afterEach(to => {
                if (to.path !== '/' && to.path !== '/home') {
                    this.homepage = false
                    this.scrolledTop = true
                    this.logoSource = images('./logo.png')
                } else {
                    this.homepage = true
                    this.scrolledTop = (scrollY > 0)
                    this.logoSource = images('./radio.png')
                }
            })

            if (this.$cookies.isKey('csrf_access_token')) {
                this.$store.dispatch('getCurrUser')
                this.userAuth = true
            }
        }

        loggedIn() {
            this.closeLogin()
            this.userAuth = true
        }

        logOut() {
            this.$store.dispatch('logout').then(res => this.userAuth = false)
        }

        beforeDestroy() {
            window.removeEventListener('scroll', this.navScroll)
        }

        updated() {
            if (document.getElementsByClassName('nav-top').length > 0) {
                (document.getElementsByClassName('nav-top') as HTMLCollectionOf<HTMLElement>)[0].style.animation = 'fadeOut ease-in .5s'
            }
            if (document.getElementsByClassName('nav-full').length > 0) {
                (document.getElementsByClassName('nav-full') as HTMLCollectionOf<HTMLElement>)[0].style.animation = 'fadeIn ease-in .5s'
            }
        }

        navScroll() {
            this.scrolledTop = (!this.homepage || (this.homepage && (scrollY > 0)))
            if (this.scrolledTop) {
                this.preload = false
                this.preloadFull = false
            }
            let images = require.context('../assets/', false, /\.png$/)

            if (!this.scrolledTop) {
                this.logoSource = images('./radio.png')
            } else {
                this.logoSource = images('./logo.png')
            }
        }

        openLogin() {
            this.loginOpen = true;
            return this.loginOpen;
        }

        @Watch('closeLogin')
        closeLogin() {
            this.on = true;
            this.loginOpen = false;

            if ((this.$route.path === '/programming' || this.$route.path === '/log') && this.$store.state.currentUser === '') {
                this.$router.push('/')
            }

            return this.loginOpen;
        }

        search() {
           console.log("searching", this.searchquery);
           const searchParam = {
                id: this.searchquery
            }
            this.$store.dispatch('quicksearch', searchParam).then(res => {
                if(res.type == "artist") { 
                    this.$router.push({ name: 'ArtistDetail', params: { albumParam: this.searchquery } }).catch(() => {})
                }
                else if(res.type == "album") { 
                    this.$router.push({ name: 'AlbumDetail', params: { albumParam: this.searchquery } }).catch(() => {})
                }
                else if(res.response.status == 404) {
                    this.$router.push({ name: 'Search', query: {name: this.searchquery}}).catch(() => {})
                }
        });
        }
}
</script>

<style lang="scss">
    $blue:  rgba(17, 2, 65, .25);
    #logout {
        cursor: pointer;
    }

    #Header .nav-top {
        color: white;
        min-height: 0px;
        height: 0px;
        background-color: rgba(255,255,255,0);
        animation: fadeOut ease-in .5s;
    }

    .preload-navbar {
        color: white;
        min-height: 0px;
        height: 0px;
        background-color: rgba(255,255,255,0);
    }

    .preload-navbar-full {
        background-color: $blue;
        z-index: 1;
    }

    .nav {
        position: fixed;
        font-family: Arvo;
    }

    #login {
        cursor: pointer;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    #Header .nav-full {
        background-color: $blue;
        z-index: 1;
        animation-name: fadeIn;
        animation-duration: .5s
    }

    #Header .logo {
        float: left;
        cursor: pointer;
    }

    #Header .preload-logo {
        width: 300px;
        margin-left: 1.5em;
        margin-top: 0.6em;
    }

    #Header .preload-logo-full {
        width: 75px;
        object-fit: scale-down;
    }    

    #Header .logo-top {
        width: 300px;
        margin-left: 1.5em;
        margin-top: 0.6em;
        animation-name: scaleUp;
        animation-duration: .5s;
    }

    #Header .logo-full {
        width: 75px;
        object-fit: scale-down;
        animation-name: scaleDown;
        animation-duration: .5s;
    }

    #Header .preload {
        margin-top: 1.4em;
        float: right;
        margin-right: 35px;
        outline: none;
        font-size: 24px;
        color: black;
        text-decoration: none;

        &:hover {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
        }
        &:focus {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
        }

        &:active {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
        }
    }

    #Header .preload-full {
        float: right;
        margin-right: 35px;
        outline: none;
        font-size: 18px;
        color: white;

        text-decoration: none;
            &:hover {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }
            &:focus {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }

            &:active {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
        }
    }

    #Header .items-top{
        margin-top: 1.4em;
        float: right;
        margin-right: 35px;
        outline: none;
        font-size: 24px;
        animation-name: floatDown;
        animation-duration: .5s;
        color: black;

        text-decoration: none;
            &:hover {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }
            &:focus {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }

            &:active {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }
    }

    #Header .items-full {
        float: right;
        margin-right: 35px;
        outline: none;
        font-size: 18px;
        animation-name: floatUp;
        animation-duration: .5s;
        color: white;

        text-decoration: none;
            &:hover {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }
            &:focus {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }

            &:active {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
        }
    }


    @keyframes fadeIn {
        0% {
            height: 0%;
            min-height: 0px;
        }
    }

    @keyframes fadeOut {
        0% {
            height: 6.5%;
            background-color: $blue;
        }
        100% {
            height: 0px;
            background-color: $blue;
        }
    }

    @keyframes floatUp {
        0% {
            margin-top: 1.4em;
            font-size: 24px;
        }
    }

    @keyframes floatDown {
        0% {
            margin-top: 0;
            font-size: 18px;
        }
    }

    @keyframes scaleDown {
        0% {
            width: 300px;
            margin-top: 0.6em;
            margin-left: 1.5em;
        }
    }

    @keyframes scaleUp {
        0% {
            width: 75px;
        }
    }

    #search-bar .search {
      color: black !important;
      border-bottom-color: black;
      font-family: Arvo;
      font-size: 24px;
      border-bottom-width: 2px;
      width: 200px
    }

    #search-bar .search:focus {
      border-bottom-color: black;
      border-bottom-width: 2px;
    }


    #search-bar ::placeholder {
      color: #595959 !important;
    }

    .material-icons {
        display: inline !important;
        color: black !important;
    }

    .preload, .preload-navbar, .preload-logo, .preload-full, .preload-logo-full, .preload-navbar-full {
        animation: fade ease-in 1s !important;
    }
</style>
