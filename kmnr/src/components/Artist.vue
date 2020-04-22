<template>
    <div class="row">
        <div class="col s1">
            <defaultButton class="prev" @click.native="previousArtists()">
                <i class="material-icons" style="font-size: 5vw;">navigate_before</i>
            </defaultButton>
        </div>
        <div class="col s10">
            <div class="d-flex justify-content-start flex-wrap artists" id="artists_container">
                <artistCard v-for="artist in artistsPaginated" :key="artist.id" :id="artist.id" :item="artist"
                    :val1="artist.name" :val2="artist.genre_abbr" newRoute="ArtistDetail">
                </artistCard>
            </div>
        </div>
        <div class="col s1">
            <defaultButton class="next" @click.native="nextArtists()">
                <i class="material-icons" style="font-size: 5vw;">navigate_next</i>
            </defaultButton>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import defaultButton from "./Button.vue";
import artistCard from "./Card.vue";

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
        this.$store.dispatch('getAllArtists').then(res => {
            this.artists = res;
            console.log(this.artists);
        });
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

    SearchByArtistName() {
        let searchSlug = {
            'genre': this.genreSearch,
            'name': this.artistSearch
        };
        
        this.$store.dispatch('getQueryArtists', searchSlug ).then(res => {
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
        padding-top: 50%;
        padding-left: 2vw;
    }

    .prev {
    position: relative;
    padding-top: 50%;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a{
        color: #42b983
    }
    #flex-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        margin-left: 10%;
    }
    .card-expansion {
    height: 480px;
    }

    .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    }
    .flex-child{
    margin-left: 10%;
    }

    h1 {
    height: 15rem !important;
    margin-top: 0px;
    }

    #flex-container {
    margin-left: 0px;
    }
</style>