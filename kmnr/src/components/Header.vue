<template>
    <div id="Header">
        <nav>
            <router-link to="/"><img src="../../src/assets/radio.png" class="logo"></router-link>
            <router-link to="/login" class="items">Log In</router-link>
            <div id="dropdown" class="items">Charts<i class="material-icons">arrow_drop_down</i>
                <div id="dropdown-list">
                    <router-link to="/new-charts" class="dropdown-item">New Charts</router-link>
                    <router-link to="/all-charts" class="dropdown-item">All Charts</router-link>
                </div>
            </div>
            <router-link to="/artists" class="items">Artists</router-link>
            <router-link to="/albums" class="items">Albums</router-link>
            <router-link to="/log" class="items">Log</router-link>
            <router-link to="/stream" class="items">Stream</router-link>
            <router-link to="/search" class="items">Search</router-link>
            <router-link to="/about" class="items">About</router-link>
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
        height: 300px;
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

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    #Header .items{
        margin-top: 1.4em;
        float: right;
        margin-left: 35px;
        outline: none;
        font-size: 24px;
        animation: fade ease 4s;
        color: black;
        cursor: pointer;

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

            animation: fadeOut .3s;

            .dropdown-item {
                float: none;
                color: black;
                padding: .25em .35em;
                display: block;
                text-align: left;
                font-family: inherit;
                margin: 0;
                font-size: 20px;
            }
        }

        &:hover #dropdown-list {
            display: block;
            animation: fade .3s;
        }
    }
</style>
