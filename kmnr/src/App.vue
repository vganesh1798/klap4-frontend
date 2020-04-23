<template>
  <div class="full-view">
    <HeaderMobile />
    <div class="content" :class="{'open':showNav}">
        <div id="navigation-icon" v-if="mobileView"
          @click="showNav = !showNav">
          <i class="fas fa-bars"></i>
        </div>
            <Header v-if="!mobileView"/>
    <router-view />
    <StreamingFooter class="streamer" :queue="queue" index="0"/>
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
    mobileView = true
    showNav = false

    queue = [
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
    ]

    handleView() {
      this.mobileView = window.innerWidth <= 1420;
    }

   created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
    }
};
</script>

<style lang="scss">
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
  height: 100%;
  width: 100%;
}

body {
  height: 100%;
  width: 100%;
}
</style>
