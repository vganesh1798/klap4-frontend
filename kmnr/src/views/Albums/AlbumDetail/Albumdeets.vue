<template>
  <div class="full-deets" v-if="loaded">
    <h1>
      <span class="albums-heading-main">Album Information</span>
    </h1>
    <div class="header-container">
      <div class="row">
        <div class="col s1 offset-s10">
          <defaultButton class="colored headerbtn" @click.native="openReview()">Write a review</defaultButton>
        </div>
      </div>
      <div class="row buttons">
        <div class="col s1 offset-s10">
          <defaultButton class="colored headerbtn" @click.native="openIssue()">Report an issue</defaultButton>
        </div>
      </div>
    </div>
    <review v-if="reviewOpen" @closeReview="closeReview"></review>
    <issue v-if="issueOpen" @closeIssue="closeIssue"></issue>
    
    <div id="flex-container">
      <div class=" animated fadeInUp ease-out-circ d-1 a-2 flex-child">
        <md-card>
          <md-card-media>
            <img class="album-image" :src="null">
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{album['album'].name}}</div>
            <div class="md-subhead">{{album.artist.name}}</div>
          </md-card-header>
          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>
              <div>
                <md-button>Rate</md-button>
              </div>

              <md-card-expand-trigger>
                <md-button>Details</md-button>
              </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
              <md-card-content>
                Release Date: {{album.album.date_added}} <br />
                Category: {{ album.album.genre_abbr }} <br />
                Tracks: {{ album.songs.length }}
              </md-card-content>
            </md-card-expand-content>
          </md-card-expand>
        </md-card>
      </div>

      <div class=" animated fadeInUp ease-out-circ d-1 a-2 flex-child"> 
        <md-table class="table" v-model="tracks" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Tracks</h1>
              </md-table-toolbar>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Track" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Runtime" md-sort-by="title">{{ item.run }}</md-table-cell>
                <md-table-cell md-label="Plays" md-sort-by="title">{{ item.plays }}</md-table-cell>
              </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch,
    Prop
  } from 'vue-property-decorator';

  import defaultButton from "../../../components/Button.vue";
  import review from "../../../components/Review.vue";
  import issue from "../../../components/Issue.vue";

  @Component({
    components: { defaultButton,
                  review,
                  issue }
  })
  export default class Albumdeeets extends Vue {
    album = {}
    tracks = []
    issueOpen = false;
    reviewOpen = false;

    loaded = false;

    beforeCreate() {
      this.$store.dispatch('displayAlbum', this.$route.params.albumParam).then(res => {
        this.tracks = this.$store.state.singleAlbum.songs
        this.album = this.$store.state.singleAlbum
      })
      .finally(() => {
        this.loaded = true
      })
    }

    openReview() {
      this.reviewOpen = true;
      return this.reviewOpen;
    }

    @Watch('closeReview')
      closeReview() {
        this.reviewOpen = false;
        return this.reviewOpen;
      }

    openIssue() {
      this.issueOpen = true;
      return this.issueOpen;
    }

    @Watch('closeIssue')
      closeIssue() {
        this.issueOpen = false;
        return this.issueOpen;
      }
  }
</script>


<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");


  .full-deets {
    background-image: url('../../../assets/back6.jpg');
    background-size: 100% auto;
    background-repeat: repeat;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .main {
    margin: 0 auto;
  }

  .header-container {
    padding: 0%;
  }

  .table {
    position: absolute;
    width: 30% !important;
    margin-left: 5% !important;
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
    background-color: black;
  }

  .headerbtn {
    padding: 5% !important;
    width: 8vw;
  }

  .buttons {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }

  .md-card {
    width: 220px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-title {
    font-family: 'Montserrat';
  }

  #flex-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 10%;
    padding-top: 5%;
  }

  .flex-child {
    margin-left: 10%;
  }

  .md-card {
    opacity: 90%
  }

  .md-table {
    width: 100%;
    opacity: 90%;
  }

  #first {
    color: black;
  }

  #review {
    color: black;
  }

  #last {
    color: black;
  }

  .row {
    margin-right: 0px;
    margin-left: 10%;
  }

  h1 {
    margin: 0px;
  }

  .full-deets {
    padding-top: 4%;
  }
</style>