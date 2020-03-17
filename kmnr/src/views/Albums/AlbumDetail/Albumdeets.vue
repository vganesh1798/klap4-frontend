<template>
    <div id="Albums-page">
      <img class="back" src="../../../../public/back.jpg" />
      <h1>
          <span class="albums-heading-main">Album Information</span>
          <div class="container">
            <div class="row justify-content-between " >
                <div class="col-3 offset-2">
                  <img  class = "album-image" :src="album['im:image'][2].label" >  
                </div>
            </div>
            </div>
      </h1>
  </div>
 
</template>

<script>

export default {
  data() {
    return {
      album: {}
    };
  },
    created() {
    this.album = this.$route.params.albumParam
    console.log(this.album)
    }
  
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans");
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
    font-size: 60px;
    font-weight: 60;
    padding-top: 5%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
}
.album-image {
  border: 7px solid black;
  border-radius: 50%;
  padding: 2px;
  width: 20%;
}
</style>