<template>
    <div> 
    <img class="back" src="../../../../public/back.jpg" />
    <h1 class = "albums-heading">
          <span class="album-heading-main">Explore Albums</span>
          
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
  max-width: 155px;
  max-height: inherit;
  padding: 0;
  margin: 5px 20px;
  display: inline-block
}
</style>