<template>
    <div id="Header">
    <nav>

        <router-link to="/"><img src="../../src/assets/radio.png" class="logo"></router-link>

        <router-link to="/About" class="items">About</router-link>
        <router-link to="/Charts" class="items">Charts</router-link>
        <router-link to="/Playlists" class="items">Playlists</router-link>
        <router-link to="/Blog" class="items">Blog</router-link>
        <router-link to="/Schedule" class="items">Schedule</router-link>
        <router-link to="/Djs" class="items">DJs</router-link>
        <router-link to="/News" class="items">News</router-link>


    </nav>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
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
        height: 200px;

    }

    #Header .items{
        margin-top: 1.4em;
        float: right;
        margin-left: 35px;
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

            &:actived {
            outline: none;
            color: #ff4d5a;
            text-decoration: none;
            }
    }
</style>
