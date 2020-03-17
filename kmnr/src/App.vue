<template>
  <div class="full-view">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

import Header from './components/Header.vue';

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {
  
};
</script>

<style lang="scss">
  .full-view {
    height: 100%;
  }
</style>
