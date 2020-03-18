<template>
    <div id="Header">
      <nav :class="{
                'nav-top': !scrolledTop,
                'preload-nav': preload,
                'nav-full': scrolledTop,
                'nav': true
            }">

            <router-link to="/"><img src="../../src/assets/radio.png" :class="{
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


            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/login">Log In</router-link>

            <div id="dropdown" :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }">Charts<i class="material-icons">arrow_drop_down</i>
                <div id="dropdown-list">
                    <router-link :class="{
                        'items-top': !scrolledTop,
                        'items-full': scrolledTop,
                        'preload': preload
                    }" to="/new-charts" class="dropdown-item">New Charts</router-link>
                    <router-link :class="{
                        'items-top': !scrolledTop,
                        'items-full': scrolledTop,
                        'preload': preload
                    }" to="/all-charts" class="dropdown-item">All Charts</router-link>
                </div>
            </div>

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
            }" to="/playlists">Playlists</router-link>

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
    </div>
</template>

<script lang='ts'>
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import router from '../router/index'

    @Component
    export default class Header extends Vue {
        searching = false
        homepage = true
        scrolledTop = false
        preload = true

        beforeMount() {
            window.addEventListener('scroll', this.navScroll)
            this.homepage = router.currentRoute.path === '/home' || router.currentRoute.path === '/' ? true : false
            if (!this.homepage) {
                this.scrolledTop = true
            }
        }

        mounted() {
            (document.getElementsByClassName('nav') as HTMLCollectionOf<HTMLElement>)[0].style.animation = "none";
            router.afterEach(to => {
                if (to.path !== '/' && to.path !== '/home') {
                    this.homepage = false
                    this.scrolledTop = true
                } else {
                    this.homepage = true
                    this.scrolledTop = (scrollY > 0)
                }
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
        }
    }
</script>

<style lang="scss">
    $purple: rgb(209, 189, 189);

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
        background-color: $purple;
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


    @keyframes fadeIn {
        0% {
            height: 0%;
            min-height: 0px;
        }
    }

    @keyframes fadeOut {
        0% {
            height: 6.5%;
            background-color: $purple;
        }
        100% {
            height: 0px;
            background-color: $purple;
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

    #dropdown {
        overflow: hidden;

        .material-icons {
            vertical-align: middle;
        }

        #dropdown-list {
            display: none;
            overflow: hidden;
            position: absolute;
            background-color: rgba(100, 100, 100, .25);
            min-width: 1em;
            z-index: 1;

            .dropdown-item {
                float: none;
                color: black;
                padding: .25em .35em;
                display: block;
                text-align: left;
                font-family: inherit;
                margin: 0;
                font-size: 20px;
                animation: fade .3s !important;
            }
        }

        &:hover #dropdown-list {
            display: block;
            animation: fade .3s !important;
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
