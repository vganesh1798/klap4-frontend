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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import Header from './components/Header.vue';
import HeaderMobile from './components/HeaderMobile.vue';

@Component({
  components: {
    Header,
    HeaderMobile
  }
})
export default class App extends Vue {
      mobileView = true
      showNav = false
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
  .full-view {
    height: 100%;
  }
  @import url("https://use.fontawesome.com/releases/v5.9.0/css/all.css");
* {
  font-size: 1rem;
}
// body {
//   width: 100%;
//   height: 100vh;
//   margin: 0;
//   padding: 0;
//   font-family: "Segoe UI", Tahoma;
//   background-color: #7ca971;
// }
// #app {
//   position: relative;
//   width: calc(100% - 20px);
//   height: calc(100vh - 20px);
//   padding: 10px;
//   color: #333;
//   overflow: hidden;
// }
// .top-bar {
//   display: flex;
//   width: 100%;
// }
#navigation-icon {
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  i {
    font-size: 2rem;
    color: white;
  }
}
.content {
  position: absolute;
  top: 0.1px;
  width: 100%;
  height: 100%;
  background-color: rgb(17, 2, 65);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  transition: 1s transform cubic-bezier(0,.12,.14,1);
}
.open {
  transform: translateX(300px);
}
</style>
