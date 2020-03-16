<template>
  <div id="full-home">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Header from './components/Header.vue';

export default Vue.extend({
  name: 'App',
  components: {
      Header
  }
});
</script>

<style>
#full-home {
  background-image: url('./assets/back.jpg');
  background-size: cover;
  background-repeat: repeat;
  background-attachment:fixed;
  background-position: center;
  color: white; 
  height: 100%;
}

</style>
