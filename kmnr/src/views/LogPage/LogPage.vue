<template>
    <div class="full-page container">
        <h1>Playlist for {{ currentShow }}</h1>
        <div class="form">
            <form>
                <label for="song">Song</label>
                <input type="text" id="song" />

                <label for="artist">Artist</label>
                <input type="text" id="artist" />

                <label for="album">Album</label>
                <input type="text" id="album" />

                <button type="submit">Add to log!</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./LogPage.ts" />
