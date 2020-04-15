<template>
    <div>
        <div class="playlist">
            <h1 id="playlist-header">Playlist</h1>
            <div id="song-list">
                <div id="song-box" v-for="(song, index) in queue" :key="index" @click="updateSong(index)">{{ song.title }}</div>
            </div>
        </div>
        <StreamingFooter :playlist="queue" :newIndex="index" />
    </div>
</template>

<script lang="ts">
    import StreamingFooter from '../../components/StreamingFooter.vue'
   
    export default {
        name: "stream-page",
        components: {
            StreamingFooter,
        },
        data() {
            return {
                queue: [
                    {
                        title: "Bitches Ain't Shit",
                        file: "./bitches_aint_shit.mp3",
                        song: null
                    },
                    {
                        title: "On and On",
                        file: "./on_on.mp3",
                        song: null
                    }
                ],
                index: -1
            }
        },
        methods: {
            updateSong(index) {
                this.index = index
            }
        },
    };
</script>

<style type="scss" scoped> 
.playlist {
    position: absolute;
    top: 15%;
    left: 25%;
    width: 50%;
    height: 50%;
}
#song-list {
    overflow-y: scroll;
    width: 100%;
    height: 100%
}
#song-box {
    padding: 5px;
}
#song-box:hover {
    cursor: pointer;
    background-color:darkgray;
}
</style>