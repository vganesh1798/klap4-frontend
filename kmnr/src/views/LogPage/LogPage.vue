<template>
    <div class="full-page container">
        <h1>Playlist for {{ currentShow }}</h1>
        <div class="form">
            <form>
                <label for="song">Song</label>
                <input v-model="song" required type="text" id="song" />

                <label for="artist">Artist</label>
                <input v-model="artist" required type="text" id="artist" />

                <label for="album">Album</label>
                <input v-model="album" required type="text" id="album" />

                <button type="button" v-on:click="addSong">Add to log!</button>
                <br/>

                <button type="submit">Post playlist!</button>
                <button type="submit">Save playlist for later</button>
            </form>
        </div>
        <ol>
            <li v-for="entry in entries" :key="entry.num">
                {{ entry.song }} {{ entry.artist }} {{ entry.album }}
            </li>
        </ol> 
        <button type="button" v-on:click="removeSong">X</button>     
    </div>
</template>

<script lang="ts" src="./LogPage.ts" />
