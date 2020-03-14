<template>
  <div >
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from "./components/Header.vue";

export default Vue.extend({
  name: 'App',
  components:
          {
            Header
          }

});
</script>

<style scoped>
  body{
    background-color:#fcfcfc;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin:30px 0 0 0;
  }
</style>
