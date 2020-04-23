<template>
    <div class="artist-search">
      <defaultButton class="prev" @click.native="previousArtists()">
          <i class="material-icons" style="font-size: 5vw;">navigate_before</i>
      </defaultButton>
      <div class="d-flex justify-content-start flex-wrap artists" id="artists_container">
          <artistCard v-for="artist in artistsPaginated" :key="artist.id" :id="artist.id" :item="artist"
              :val1="artist.name" :val2="artist.genre_abbr" newRoute="ArtistDetail">
          </artistCard>
          <div class="no-results" v-if="artistsPaginated.length === 0">
            Sorry, but no Artists were found for your search.
          </div>
      </div>
      <defaultButton class="next" @click.native="nextArtists()">
          <i class="material-icons" style="font-size: 5vw;">navigate_next</i>
      </defaultButton>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import defaultButton from "./Button.vue";
import artistCard from "./Card.vue";
import { ArtistSearch } from '../Models/Artist';

  @Component({
    components: {
        defaultButton,
        artistCard
    }
  })
  export default class Artist extends Vue {
    constructor() {
      super()
    }

    @Prop({type: Object}) searchQuery?

    artists = []
    range = 0
    genreSearch = ""
    artistSearch = ""
    cancelSearchVisibility = "hidden"
    previousBtnVisibility = "visible"
    nextBtnVisibility = "visible"

    get artistsPaginated() {
      return this.artists.slice(this.range, this.range + 7);
    }

    getArtists() {
      if (this.searchQuery) {
        this.SearchByArtist()
      } else {
        this.$store.dispatch('getAllArtists').then(res => {
            this.artists = res;
        });
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

    nextArtists() {
      if (this.artists.length - this.range > 7) {
        this.range += 7;
      }
    }

    previousArtists() {
      if (this.range > 0) {
        this.range -= 7;
      }
    }

    SearchByArtist() {    
        this.$store.dispatch('getQueryArtists', this.searchQuery).then(res => {
            this.artists = res;
            console.log(this.artists);
        });

      this.cancelSearchVisibility = "visible";
    }

    CancelSearch() {
      this.getArtists();
      this.genreSearch = "";
      this.artistSearch = "";
      this.cancelSearchVisibility = "hidden";
    }

    created() {
      this.getArtists();
    }
  }; 
</script>

<style lang="scss" scoped>
  .artists {
    padding-bottom: 3%;
  }

  #artists_container {
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