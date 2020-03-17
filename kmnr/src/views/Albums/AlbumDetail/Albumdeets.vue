<template>
    <div id="Albums-page">
      <img class="back" src="../../../assets/new.jpg" />
      <h1>
          <span class="albums-heading-main">Album Information</span>
          <div class="container .card-expansion">
      <md-card>
      <md-card-media>
        <img  class = "album-image" :src="album['im:image'][2].label" >
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{album['im:name'].label}}</div>
        <div class="md-subhead">{{album['im:artist'].label}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Action</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button>Learn more</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            {{album['im:releaseDate'].attributes.label}}
            {{ album.category.attributes.label }}
            {{ album['im:itemCount'].label }}
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
            <!-- <div class="row justify-content-between " >
                <div class="col-3 offset-2">
                    
                </div>
            </div> -->
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
  /* border-radius: 50%; */
  padding: 2px;
  width: 100%;
}
.card-expansion {
    height: 480px;
  }

  .md-card {
    width: 220px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-title{
    font-family: 'Montserrat';
  }
</style>