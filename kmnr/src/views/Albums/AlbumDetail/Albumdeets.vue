<template>
    <div> 
    <img class="back" src="../../../../public/back.jpg" />
    <h1 class = "albums-heading">
          <span class="album-heading-main">{{album['im:name'].label}}</span>
          
    <div class="row justify-content-center main_container">
          <div class="album-image">
            <img :src="album['im:image'][2].label">
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

.main_container {
    position: absolute;
    top: 30%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
}
.album-heading-main{
  display: block;
    font-size: 60px;
    font-weight: 100;
    padding-top: 3%;
    padding-left: 30%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Covered By Your Grace';
}
</style>