<template>
    <div class="album-search">
        <div class="col s1">
            <defaultButton class="prev" @click.native="previousAlbums()">
                <i class="material-icons" style="font-size: 5vw;">navigate_before</i>
            </defaultButton>
        </div>
        <div class="col s10">
            <div class="d-flex justify-content-start flex-wrap albums" id="albums_container">
                <albumCard v-for="album in albumsPaginated" :key="album.id" :id="album.id" :item="album" :val1="album.name"
                    :val2="album.genre_abbr" newRoute="AlbumDetail">
                </albumCard>
            </div>
        </div>
        <div class="col s1">
            <defaultButton class="next" @click.native="nextAlbums()">
                <i class="material-icons" style="font-size: 5vw;">navigate_next</i>
            </defaultButton>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import defaultButton from "./Button.vue";
import albumCard from "./Card.vue";

import {AlbumSearch} from "../Models/Album";

  @Component({
    components: { defaultButton, albumCard }
  })
  export default class Albums extends Vue {
    constructor() {
      super()
    }

    albums = []
    range = 0
    albumSearch = ""
    cancelSearchVisibility = "hidden"
    previousBtnVisibility = "visible"
    nextBtnVisibility = "visible"

    route = "AlbumDetail"
    artistid = "AL1B"

    get albumsPaginated() {
        console.log(this.albums.slice(this.range, this.range + 7))
      return this.albums.slice(this.range, this.range + 7);
    }

    getAlbums() {
      this.$store.dispatch('getAllAlbums')
        .then(res => this.albums = this.$store.state.albums)
    }

    hidePreviousBtn() {
      this.previousBtnVisibility = "hidden";
    }

    showPreviousBtn() {
      this.previousBtnVisibility = "visible";
    }

    hideNextBtn() {
      this.nextBtnVisibility = "hidden";
    }

    showNextBtn() {
      this.nextBtnVisibility = "visible";
    }

    nextAlbums() {
      if (this.albums.length - this.range > 7) {
        this.range += 7;
      }
    }

    previousAlbums() {
      if (this.range > 7) {
        this.range -= 7;
      }
    }

    SearchByAlbumName() {
      const searchParam: AlbumSearch = {
        genre_abbr: '',
        artist: '',
        album: this.albumSearch.toLowerCase(),
        label: '',
        format: '',
        promoter: '',
        new_tag: false
      }

      this.$store.dispatch('getQueriedAlbums', searchParam)
        .then(res => {
          this.albums = this.$store.state.albums
        })

      this.cancelSearchVisibility = "visible";
    }

    CancelSearch() {
      this.getAlbums();
      this.albumSearch = "";
      this.cancelSearchVisibility = "hidden";
    }

    created() {
      this.getAlbums();
    }
  };
</script>

<style lang="scss" scoped>
    #albums_container {
        width: 200%;
    }

    .container_pagination {
        padding-top: 10px;
        text-align: center;
    }

    .container_pagination .nav ul li a {
        border: none;
        background: transparent;
    }

    .nav {
        position: relative !important;
    }

    .page-link {
        color: black;
    }

    #submit {
        padding-top: 1%;
    }

    .btn {
        float: right;
    }

    .form-control {
        margin: 0;
    }

    h1 {
        margin: 0;
    }

    .next {
        position: relative;
        padding-left: 2vw;
        padding-top: 50%;
    }

    .prev {
        position: relative;
        padding-top: 50%;
    }
</style>