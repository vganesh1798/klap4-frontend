<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Header from './components/Header.vue';

export default Vue.extend({
  name: 'App',
  components: {
      Header
  }
});
</script>

<style>

</style>
