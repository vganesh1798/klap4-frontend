<template>
  <div id="Albums-page">
      <img class="back" src="../../../public/back.jpg" />
      Routing works!
  </div>
</template>

<script>
"./Albums.ts"
export default {

}
</script>
<style>
.back {
    position: fixed;
    z-index: -1;
    /* Allows the background pic to not have any white lines on edge */
    transform: scale(1.3);
    -webkit-filter: scale(1.1);
    -moz-filter: scale(1.1);
    -o-filter: scale(1.1);
    -ms-filter: scale(1.1);
}
</style>