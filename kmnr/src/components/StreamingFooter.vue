<template>
    <div>
        <div class="stream-container"></div>

        <!-- <div id="timer">0:00</div>
        <div id="duration">0:00</div> -->

        <div class="controlsOuter center">
            <div id="playlistBtn"><a @click="next()"><i class="material-icons-round">queue_music</i></a></div>
            <div id="prevBtn"><a @click="next()"><i class="material-icons-round">skip_previous</i></a></div>
            <div id="playBtn" class="" v-show="!playing"><a @click="play(curIndex)"><i class="material-icons-round">play_circle_filled</i></a></div>
            <div id="pauseBtn" class="" v-show="playing" @click="pause()"><a @click="pause()"><i class="material-icons-round">pause_circle_filled</i></a></div>
            <div id="nextBtn"><a @click="next()"><i class="material-icons-round">skip_next</i></a></div>
            <div id="volumeBtn"><a @click="next()"><i class="material-icons-round">volume_up</i></a></div>
        </div>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
  import { Howl } from 'howler'

  @Component
  export default class StreamingFooter extends Vue {
      @Prop({type: Array}) playlist?
      @Prop({type: Number, default: 0}) newIndex

      playing: boolean = false
      curIndex: number = 0

      play(index) {
          this.curIndex = index
          if (this.playlist[this.curIndex].song) {
              this.playlist[this.curIndex].song.play()
          }
          else {
              this.playlist[this.curIndex].song = new Howl({
                  src: [this.playlist[this.curIndex].file],
                  onend: () => {
                      console.log("here")
                      // BUG: next line is not called when song stops playing
                      this.playing = false
                  },
                  html5: true,
                  buffer: true
              })
              this.playlist[this.curIndex].song.play()
          }
          this.playing = true
      }

      pause() {
          this.playlist[this.curIndex].song.stop()
          this.playing = false
      }
      
      @Watch('newIndex')
      newIndexFun(newVal) {
          if (this.playlist[this.curIndex].song && this.playlist[this.curIndex].song.playing) {
              this.playlist[this.curIndex].song.stop()
          }
          this.play(newVal)
      }
  }
</script>

<style lang="scss" scoped>
.stream-container{
    position: absolute;
    bottom: 0%;
    background-color: black;
    width: 100%;
    height: 15%;
}
#timer {
  position: absolute;
  bottom: 10%;
  text-align: left;
  font-size: 26px;
  font-weight: 300;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
}
#duration {
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: right;
  font-size: 26px;
  font-weight: 300;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.33);
}
.controlsOuter {
  position: absolute;
  width: 100%;
  height: 70px;
  bottom: 3%;
}


#playBtn, #pauseBtn, #nextBtn, #prevBtn {
  display: inline-block;
  cursor: pointer;
  opacity: 0.9;
  -webkit-filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.33));
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.33));

  width: 5em;
  
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  a { text-decoration: none; }

  &:hover {
    opacity: 1;
  }

  .material-icons-round {
    font-size: 5rem;
    color: grey !important;
  }
}

#playlistBtn, #volumeBtn {
  display: inline-block;
  cursor: pointer;
  opacity: 0.9;
  -webkit-filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.33));
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.33));

  width: 5em;
  margin-top: 1em;

  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  a { text-decoration: none; }

  &:hover {
    opacity: 1;
  }

  .material-icons-round {
    font-size: 3rem;
    color: grey !important
  }
}

#volumeBtn {
  float: right;
}

#playlistBtn {
  float: left;
}

</style>