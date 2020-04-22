<template>
    <div class="search-page row">
        <span class="heading-charts-main">Search</span>

        <form @submit.prevent class="search-area col s12 offset-s4">
            <div class="row">
                <div class="input-field col s4">
                    <input id="icon_prefix" @keyup="search" v-model="searchInput" type="text" class="search-input"/>
                    <label for="icon_prefix" class="text-black">Search Artists or Albums</label>
                    <a class="search-icon" @click="search(null, true)"><i class="material-icons prefix">search</i></a>

                </div>
            </div>
            <div class="row">
                <ul class="collapsible">
                    <li>
                        <div class="collapsible-header transparent no-border"><i class="material-icons">keyboard_arrow_down</i>Advanced Search</div>
                        <div class="collapsible-body">
                            <div class="input-field col s2">
                                <input id="icon_prefix" @keyup="search" v-model="genreInput" type="text" class="search-input"/>
                                <label for="icon_prefix" class="text-black">Genre</label>
                            </div>
                            <div class="input-field col s2">
                                <input id="ident" @keyup="search" v-model="artistInput" type="text" class="search-input tooltipped" data-tooltip="Only for Albums"/>
                                <label for="ident" class="text-black">Artist name</label>
                            </div>  
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script lang="ts" src="./Search.ts"></script>

<style lang="scss" src="./Search.scss" scoped></style>