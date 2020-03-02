<template>
  <div>
    <Header />
<!--    <Albums />-->
    <router-view />

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Header from './components/Header.vue';
export default Vue.extend({
  name: 'App',
  components: {
      Header,
  }
});
</script>

<style scoped>

</style>
