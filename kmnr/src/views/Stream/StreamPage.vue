<template>
    <div class="streaming" >
        <div class="playlist">
            <h1 id="playlist-header">Playlist</h1>
            
            <draggable v-model="queue" ghost-class="ghost" @end="onEnd">
                <transition-group type="transition" name="flip-list">
                    <div class='sortable' v-for="(song, index) in queue" :key="index" @click="updateSong(index)">{{ song.title }}</div>
            </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    import StreamingFooter from '../../components/StreamingFooter.vue'
    import draggable from 'vuedraggable'
    @Component({
        components: {
            StreamingFooter,
            draggable
        }
    })
    export default class StreamPage extends Vue {
        queue = [
      {
        title: "Sicko Mode",
        file: "./Travis_Scott_-_Sicko_Mode_Ft_Drake.mp3",
        song: null
      },
      {
        title: "Bitches Ain't Shit",
        file: "./bitches_aint_shit.mp3",
        song: null
      },
      {
        title: "On and On",
        file: "./on_on.mp3",
        song: null
      },
      {
        title: 'Do You Wanna Get High',
        file: './05 Do You Wanna Get High-.mp3',
        song: null
      },
      {
        title: 'Thank God for Girls',
        file: './03 Thank God for Girls.mp3',
        song: null
      },
      {
        title: 'This is Our Time',
        file: './Miles Malone - This is Our Time (single) - 01 This is Our Time.mp3',
        song: null
      }
    ]
        oldIndex = ''
        newIndex = ''
        index: number = -1

        updateSong(index) {
            this.index = index
        }

        onEnd(evt){
            console.log(evt)
            this.oldIndex = evt.oldIndex
            this.newIndex = evt.newIndexß
        }
    }
</script>

<style type="scss" scoped> 
.streaming{
    background-image: url('../../assets/back9.jpg');
    background-size: cover;
    height: 100%;
}
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

.sortable{
    width: 100%;
    background: white;
    padding: 1em;
    cursor: move;
    margin-bottom: 2px;;
}

.sortable-drag{
    opacity: 0
}

.flip-list-move{
    transition: transform 0.5s;
}

.ghost{
    border-left: 6px solid black;
    box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.17);
    opacity: .7;
}
</style>