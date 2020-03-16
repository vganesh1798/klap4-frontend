<template>  
   <div class="album_container">

          <img :src="album['im:image'][2].label">
           
          <h6 class="title_header">{{album['im:name'].label}}</h6>
          <p class="artist_header">{{album['im:artist'].label}}</p>
          <p class="category_header">{{ album.category.attributes.label }}</p>
          <router-link :to="{name:'Albumdeets',params:{albumParam:album} }">Details</router-link> 
            
</div>
</template>

<script>
export default {
  props: {
    idAlbum: {
      type: String,
      required: true
    },
    album:{
      type:Object,
      required:true
    }
  },
  data(){
    return{

    }
  }
};
</script>

<style scoped>
.album_container {
  max-width: 155px;
  max-height: inherit;
  padding: 0;
  margin: 5px 20px;
  display: inline-block
}

img {
  padding: 0 0 5px 0;
  margin: 0;
  border-radius: 10px;
}

.title_header {
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}
.category_header {
  font-size: 12px;
  font-style: italic;
  margin: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}
.artist_header {
  margin: 0;
  text-align: left;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}

a {
  font-size: 14px;
}
</style>
