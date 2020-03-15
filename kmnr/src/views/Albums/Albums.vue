<template>
  <div id="Albums-page">
      <img class="back" src="../../../public/back.jpg" />
      <h1 class = "albums-heading">
          <span class="albums-heading-main">Explore Albums</span>
          <div class="container">
            <div class="row justify-content-center" id="search_bar">
                <div class="col-6">
                    <input v-model="albumSearch" type="text" class="form-control" placeholder="Search by album name">             
                </div>
                <div class="col-1">
                    <button class="btn btn-light">Go</button>          
                </div>
            </div>
        </div>
        </h1>
  </div>
 
</template>

<script>
"./Albums.ts"
export default {

}
</script>
<style scoped>
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
#search_bar {
  margin-bottom: 30px;
}
</style>