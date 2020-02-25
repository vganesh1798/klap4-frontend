<template>
  <div>
    <Header />
  <HomePage />
  </div>
</template>

<script>
import HomePage from "./components/HomePage";
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
      HomePage,
      Header
  }
}
</script>

<style>

</style>
