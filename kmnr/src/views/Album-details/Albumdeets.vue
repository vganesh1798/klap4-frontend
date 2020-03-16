<template>
    <div id='album-details'>
    
    <!-- <div class="row justify-content-center main_container">
        <div class="col-10">

    <div class="row">
          
          <div class="col-md-2 offset-1">
              <img :src="album['im:image'][2].label">
          </div>

          <div class="col-md-9 col-sm-12">
              <h3>{{album['im:name'].label}}</h3>
              <div class="row justify-content-between">
                  <div class="col-md-4 col-sm-12">
                       <p class="artist">{{album['im:artist'].label}}</p>
                  </div>
                   <div class="col-md-4 col-sm-12">
                       <p class="release_date">{{album['im:releaseDate'].attributes.label}}</p>
                  </div>
                 
              </div>

              <div class="row justify-content-between">                 
                   <div class="col-md-4 col-sm-12">
                      <p class="category">{{ album.category.attributes.label }}</p>
                      <p class="songsCount">{{ album['im:itemCount'].label }} Songs </p>
                  </div>
              </div>  

              <div class="row justify-content-end">
                 <div class="col-md-2 col-sm-12">
                    <button type="button" class="btn btn-outline-success"> Avaliação Gratuita </button>
                 </div>
                 <div class="col-md-3 col-sm-12">
                    <button type="button" class="btn btn-success"> {{ album['im:price'].label }} </button>
                 </div>
              </div>

                 <div class="row justify-content-center">             
                  <div class="col-md-6">
                       <p class="rights">{{ album.rights.label }}</p>
                  </div>
                 </div> 
          </div>
      </div>
           
        </div>
    </div> -->
    
    Hello
    </div>
</template>

<script>

export default {
  data() {
    return {
      album: {}
    };
  },
  methods: {
  created() {
    this.album = this.$route.params.albumParam;
    console.log(this.album);
  }
}
}
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

.main_container {
  padding-top: 150px;
  background-color: tomato;
}

img {
  border-radius: 100%;
}

h3 {
  text-align: left;
  font-family: "Josefin Sans", sans-serif;
  font-weight: bold;
}

p {
  text-align: left;
  margin: 0;
  padding: 0;
  font-family: "Josefin Sans", sans-serif;
}

.artist {
  font-size: 18px;
  font-family: "Josefin Sans", sans-serif;
  font-weight: bold;
}

.release_date {
  font-size: 14px;
  font-family: "Josefin Sans", sans-serif;
}
.category {
  font-weight: bold;
  font-style: italic;
}

.rights {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 0;
}
</style>