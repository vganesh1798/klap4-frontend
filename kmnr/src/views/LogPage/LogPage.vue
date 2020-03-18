<template>
    <div class="full-page container">
        <div class="row">
            <div class="col offset-s4">
                <h1>Playlist for {{ currentShow }}</h1>
                <div class="form">
                    <form>
                        <div class="row">
                            <div class="col s12">
                                <label for="song">Song</label>
                                <input v-model="song" required type="text" id="song" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <label for="artist">Artist</label>
                                <input v-model="artist" required type="text" id="artist" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <label for="album">Album</label>
                                <input v-model="album" required type="text" id="album" />
                            </div>
                        </div>
                        <button class="btn" style="margin-bottom: 10px;" type="button" v-on:click="addSong">Add to log!</button>
                        <br/>

                        <button class="btn" type="submit" style="margin-right: 10px;">Post playlist!</button>
                        <button class="btn" type="submit">Save playlist for later</button>
                    </form>
                </div>
            </div>
        </div>
        <ol>
            <li v-for="entry in entries" :key="entry.num">
                {{ entry.song }} {{ entry.artist }} {{ entry.album }}
            </li>
        </ol> 
        <button class="btn" type="button" v-on:click="removeSong">X</button>     
    </div>
</template>

<script lang="ts" src="./LogPage.ts" />

<style lang="scss" scoped>
h1 {
    margin-top: 0px;
}

.full-page {
    padding-top: 10%;
}
</style>
