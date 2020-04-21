<template>
    <div class="my_container">
        <img :src="this.imgPath">
        
        <h6 class="title_header">{{ this.id }}</h6>
        <p class="artist_header">{{ this.val1 }}</p>
        <p class="category_header">{{ this.val2 }}</p>
        
        <router-link :to="{name:this.newRoute, params:{albumParam:this.id} }"><p class="details">Details</p></router-link> 
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class my_card extends Vue {
  constructor() {
    super()
  }
  @Prop({default: "http://cdn.onlinewebfonts.com/svg/img_264570.png", type: String}) imgPath!: string
  @Prop(String) id!: string
  @Prop(String) val1!: string
  @Prop(String) val2!: string
  @Prop(Object) item!: object
  @Prop(String) newRoute!: string
}
</script>

<style lang="scss" scoped>
.my_container {
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
