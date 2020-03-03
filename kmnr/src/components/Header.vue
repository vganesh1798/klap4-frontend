<template>
    <div id="Header">
        <nav>
            <router-link to="/"><img src="../../src/assets/radio.png" class="logo"></router-link>
            <router-link to="/login" class="items">Log In</router-link>
            <router-link to="/about" class="items">About</router-link>
            <router-link to="/charts" class="items">Charts</router-link>
            <router-link to="/playlists" class="items">Playlists</router-link>
            <router-link to="/albums" class="items">Albums</router-link>
            <router-link to="/blog" class="items">Blog</router-link>
            <router-link to="/schedule" class="items">Schedule</router-link>
            <router-link to="/djs" class="items">DJs</router-link>
            <router-link to="/news" class="items">News</router-link>

        </nav>
    </div>
</template>

<script lang='ts'>
    import Vue from 'vue';

    export default Vue.extend({
        name: "Header"
    });
</script>

<style lang="scss">
    #Header nav {
        width: 95%;
        color: white;
        min-height: 50px;
        font-family: Arvo;
    }

    #Header .logo {
        margin-left: 1.5em;
        margin-top: 0.6em;
        float: left;
        animation: fade ease 5s;
        height: 200px;
        cursor: pointer;

    }

    @keyframes fade {
        0% {
            opacity: 0;
            }
        100% {
            opacity: 1;
             } }

    #Header .items{
        margin-top: 1.4em;
        float: right;
        margin-left: 35px;
        outline: none;
        font-size: 24px;
        animation: fade ease 4s;
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
</style>
