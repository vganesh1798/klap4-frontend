<template>
    <div class="album-search">
            <defaultButton class="prev" @click.native="previousAlbums()">
                <i class="material-icons" style="font-size: 5vw;">navigate_before</i>
            </defaultButton>

            <div class="d-flex justify-content-start flex-wrap albums" id="albums_container">
                <albumCard v-for="album in albumsPaginated" :key="album.name" :id="album.id" :item="album" :val1="album.name"
                    :val2="album.genre_abbr" newRoute="AlbumDetail">
                </albumCard>
                
                <div v-if="loading" class="preloader-wrapper active center">
                  <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                      <div class="circle"></div>
                    </div><div class="gap-patch">
                      <div class="circle"></div>
                    </div><div class="circle-clipper right">
                      <div class="circle"></div>
                    </div>
                  </div>
                </div>

                <div class="no-results" v-if="!loading && albumsPaginated.length === 0">
                  Sorry, but no Albums were found for your search.
                </div>
            </div>
            <defaultButton class="next" @click.native="nextAlbums()">
                <i class="material-icons" style="font-size: 5vw;">navigate_next</i>
            </defaultButton>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import defaultButton from "./Button.vue";
import albumCard from "./Card.vue";

import { AlbumSearch } from "../Models/Album";
import { ArtistSearch } from '../Models/Artist';

  @Component({
    components: { defaultButton, albumCard }
  })
  export default class Albums extends Vue {
    constructor() {
      super()
    }

    @Prop({type: Object}) searchQuery?

    albums = []
    range = 0
    albumSearch = ""
    cancelSearchVisibility = "hidden"
    previousBtnVisibility = "visible"
    nextBtnVisibility = "visible"

    route = "AlbumDetail"

    loading = false

    get albumsPaginated() {
      return this.albums.slice(this.range, this.range + 7);
    }

    getAlbums() {
      this.loading = true
      
      if (this.searchQuery) {
        this.SearchByAlbum()
      } else {
        this.$store.dispatch('getAllAlbums')
          .then(res => this.albums = this.$store.state.albums)
          .finally(() => this.loading = false)
      }
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
      if (this.range > 0) {
        this.range -= 7;
      }
    }

    SearchByAlbum() {
      this.$store.dispatch('getQueriedAlbums', this.searchQuery)
        .then(res => {
          this.albums = this.$store.state.albums
        })
        .finally(() => this.loading = false)

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
  .album-search {
    padding-bottom: 3%;
  }

  #albums_container {
    width: 80%;
    display: inline-block;
    text-align: center;
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
    display: inline-block;
  }

  .prev {
    position: relative;
    display: inline-block;
  }

  .no-results {
    padding-top: 4%;
  }
</style>