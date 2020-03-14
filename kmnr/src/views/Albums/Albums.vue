<template>
  <div id="Albums-page">
      <img class="back" src="../../../public/back.jpg" />
      <h1 class = "albums-heading">
          <span class="albums-heading-main">Explore Albums</span>
           </h1>
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
.albums-heading-main {
    display: block;
    font-size: 100px;
    font-weight: 100;
    padding-top: 3%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Covered By Your Grace';
}

</style>