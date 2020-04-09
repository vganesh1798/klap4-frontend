<template>
  <div>
    <Header />
    <router-view />
    <StreamingFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Header from './components/Header.vue';
import StreamingFooter from './components/StreamingFooter.vue'

export default Vue.extend({
  name: 'App',
  components: {
      Header,
      StreamingFooter
  }
});
</script>

<style>

</style>
