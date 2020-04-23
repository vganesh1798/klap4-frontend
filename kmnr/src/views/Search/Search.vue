<template>
    <div class="search-page row">
        <span class="heading-charts-main">Search</span>

        <form @submit.prevent class="search-area col s12 offset-s1">
            <div class="row">
                <div class="input-field col s4">
                    <input id="icon_prefix" @keyup="search" v-model="searchInput" type="text" class="search-input"/>
                    <label for="icon_prefix" class="text-black">Search Artists or Albums</label>
                </div>
                <div class="search-close col">
                    <div class="search-icon" :class="{'centered': !(albumLoaded || artistLoaded)}">
                        <a @click="search(null, true)"><i class="material-icons prefix" >search</i></a>
                    </div>
                    <transition name="fade">
                        <div v-if="albumLoaded || artistLoaded" class="close-icon">
                            <a @click="clearSearch()"><i class="material-icons prefix" >close</i></a>
                        </div>
                    </transition>
                </div>
                <div class="input-field col s2 offset-s1">
                    <input id="icon_prefix" @keyup="search" v-model="genreInput" type="text" class="search-input"/>
                    <label for="icon_prefix" class="text-black">Genre</label>
                </div>
                <div class="input-field col s2">
                    <input id="ident" @keyup="search" v-model="artistInput" type="text" class="search-input tooltipped" data-tooltip="Only for Albums"/>
                    <label for="ident" class="text-black">Artist name</label>
                </div>  
            </div>
        </form>
        <div class="row">
            <span id="album-id" class="col s8 offset-s2">Albums</span>
        </div>
        <div class="row center">
            <Albums :key="albumKey" :searchQuery="albumLoaded ? albumSearchParam : null" class="col s10 offset-s1"/>
        </div>
        <div class="row">
            <span id="artist-id" class="col s8 offset-s2">Artists</span>
        </div>
        <div class="row center">
            <ArtistPage :key="artistKey" :searchQuery="artistLoaded ? artistSearchParam : null" class="col s10 offset-s1" />
        </div>
    </div>
</template>

<script lang="ts" src="./Search.ts"></script>

<style lang="scss" src="./Search.scss" scoped></style>