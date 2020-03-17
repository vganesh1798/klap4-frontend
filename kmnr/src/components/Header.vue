<template>
    <div id="Header">
        <nav :class="{
                'nav-top': !scrolledTop,
                'nav-full': scrolledTop,
                'nav': true
            }">
            <router-link to="/"><img src="../../src/assets/radio.png" :class="{
                'logo-top': !scrolledTop,
                'logo-full': scrolledTop,
                'preload': preload
            }" class="logo"></router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/login">Log In</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/about">About</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/charts">Charts</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/playlists">Playlists</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/blog">Blog</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/schedule">Schedule</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/djs">DJs</router-link>
            <router-link :class="{
                'items-top': !scrolledTop,
                'items-full': scrolledTop,
                'preload': preload
            }" to="/news">News</router-link>
        </nav>
    </div>
</template>

<script lang='ts'>
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Header extends Vue {
        scrolledTop = false
        preload = true

        beforeMount() {
            window.addEventListener('scroll', this.navScroll)
        }

        beforeDestroy() {
            window.removeEventListener('scroll', this.navScroll)
        }

        updated() {
            this.preload = false
        }

        navScroll() {
            this.scrolledTop = window.scrollY > 10
        }
    }
</script>

<style lang="scss">
    #Header .nav-top {
        color: white;
        min-height: 0px;
        height: 0px;
        background-color: rgba(255,255,255,0);
    }

    .nav {
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
        position: fixed;
        background-color: rgb(255,255,255);
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
</style>
