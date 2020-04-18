<template>  
   <div class="artist_container">
          <img src="../../assets/new.jpg">
           
          <p class="artist_header">{{ artist.id }}</p>
          <p class="category_header">{{ artist.name }}</p>
          <router-link :to="{name:'ArtistsDetail',params:{artistParam:artist} }"><p class="details">Details</p></router-link>    
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Display extends Vue {
  constructor() {
    super()
  }

  @Prop(String) idArtists!: string
  @Prop(Object) artist!: object
}
</script>

<style scoped>
.artist_container {
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
.details{
  color: black;
}
</style>
