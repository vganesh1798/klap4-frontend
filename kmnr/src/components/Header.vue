<template>
    <div id="Header">
      <nav :class="{
                'nav-top': !scrolledTop,
                'preload-nav': preload,
                'nav-full': scrolledTop,
                'nav': true
            }">

            <router-link to="/"><img :src="logoSource" :class="{
                'logo-top': !scrolledTop,
                'logo-full': scrolledTop,
                'preload': preload
            }" class="logo"></router-link>

            <div id="search-bar" :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }">
              <input id="search" placeholder="Search" type="search">
              <!--<label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons" v-if="searching">close</i>-->
            </div>


            <div id="login" :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" @click="openLogin()">
                Log In
            </div>

           <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/charts">Charts</router-link>

            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/artists">Artists</router-link>

            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/albums">Albums</router-link>

            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/log">Playlists</router-link>

            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/stream">Stream</router-link>

            <a :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" href="http://www.cleveland.kmnr.org">ARSE</a>
        </nav>
        <login v-if="loginOpen" @closeLogin="closeLogin"></login>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue, Watch } from 'vue-property-decorator';
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
        }

        created() {
            this.$on('close-log-in', () => {
                this.closeLogin();
            })
        }

        beforeDestroy() {
            window.removeEventListener('scroll', this.navScroll)
        }

        updated() {
            this.preload = false
            if (document.getElementsByClassName('nav-top').length > 0) {
                (document.getElementsByClassName('nav-top') as HTMLCollectionOf<HTMLElement>)[0].style.animation = 'fadeOut ease-in .5s'
            }
            if (document.getElementsByClassName('nav-full').length > 0) {
                (document.getElementsByClassName('nav-full') as HTMLCollectionOf<HTMLElement>)[0].style.animation = 'fadeIn ease-in .5s'
            }
        }

        navScroll() {
            this.scrolledTop = (!this.homepage || (this.homepage && (scrollY > 0)))
            
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
                return this.loginOpen;
            }
}
</script>

<style lang="scss">
    $blue:  rgba(17, 2, 65, .25);

    #Header .nav-top {
        color: white;
        min-height: 0px;
        height: 0px;
        background-color: rgba(255,255,255,0);
        animation: fadeOut ease-in .5s;
    }

    .nav {
        position: fixed;
        font-family: Arvo;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    #Header .preload {
        animation: fade ease-in 1s !important;
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

            &:actived {
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

            &:actived {
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
</style>
