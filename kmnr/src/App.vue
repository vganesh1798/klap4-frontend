<template>
  <div class="full-view" >
    <HeaderMobile/>
    <div class="content" :class="{'open':opened}" >
        <div v-on:click="toggle()" id="navigation-icon" v-if="mobileView">
          <i  class="fas fa-bars"></i>
        </div>
            <Header v-if="!mobileView"/>
    <router-view></router-view>
    <div :class="{'stream-open': stream, 'stream-closed': !stream}">
      <a @click="openMusic" v-if="!stream"><i class="material-icons-round">music_note</i></a>
      <a @click="closeMusic" v-if="stream"><i class="material-icons-round">music_off</i></a>
    </div>
    <StreamingFooter :open="stream" class="streamer" :playlist="queue" index="0"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import Header from './components/Header.vue';
import HeaderMobile from './components/HeaderMobile.vue';
import StreamingFooter from './components/StreamingFooter.vue';

@Component({
  components: {
    Header,
    HeaderMobile,
    StreamingFooter
  }
})
export default class App extends Vue {
    mobileView = false
    showNav = false
    opened = false

    stream = false

    openMusic() {this.stream = true}
    closeMusic() {this.stream = false}

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

    index: number = -1

    updateSong(index) {
        this.index = index
    }
    handleView() {
      if(window.innerWidth <= 1420){
        this.mobileView = true 
      }
      else{
        this.mobileView = false
        this.hide()
      }
    }

    
    toggle () {
      if (this.opened) {
          return this.hide()
      }
      return this.show()
    }
    show () {
            this.opened = true;
        }
    hide () {
            this.opened = false;
      }
    created() {
      this.handleView();
      window.addEventListener('resize', this.handleView);
    }
};
</script>

<style lang="scss">
  .stream-open, .stream-closed {
    margin-left: 92%;
    cursor: pointer;
    position: fixed;
    font-size: 100px;

    .material-icons-round {
      font-size: 4em;
      color: grey;
    }
  }

  .stream-open {
    bottom: 1.25em;
    transition: all .3s cubic-bezier(.09, .56, .33, 1.18);
  }

  .stream-closed {
    bottom: .2em;
    transition: all .5s cubic-bezier(1,.06,.45,1.4);
  }

  .streamer {
    position: fixed;
    z-index: 999999999;
  }

  .full-view {
    height: 100%;
  }
  @import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");
* {
  font-size: 1rem;
}
#navigation-icon {
  position: fixed;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  i {
    font-size: 2rem;
    color: black;
  }
}
.content {
  position: absolute;
  top: 0.1px;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: 1s transform cubic-bezier(0,.12,.14,1);
}
.open {
  transform: translateX(300px);
}

html {
  top: 0px;
  height: 100%;
  width: 100%;
}

body {
  height: 100%;
  width: 100%;
}
</style>
