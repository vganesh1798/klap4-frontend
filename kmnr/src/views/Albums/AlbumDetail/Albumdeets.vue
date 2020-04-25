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
    
    <div id="container">
      <div class="row">
        <div class="col s2 offset-s2">
        <div class="card">
          <div class="card-image">
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png">
          </div>
          <div class="card-content">
            <span class="card-title">{{album['album'].name}}</span>
            <p>{{album.artist.name}}</p>
            <p>{{album.album.date_added}}</p>
            <p>{{ album.album.genre_abbr }}</p>
          </div>
        </div>
        </div>

        <div class="tracks col s4 offset-s1">
          <table class="tracksTable">
            <thead>
              <tr>
                <th style="width: 25%;">Track</th>
                <th style="width: 25%;">Name</th>
                <th style="width: 25%;">Runtime</th>
                <th style="width: 25%;">Plays</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tracks" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.run }}</td>
                <td>{{ item.plays }}</td>
              </tr>
            </tbody>
          </table>
        </div>
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


<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");


  .full-deets {
    background-image: url('../../../assets/back6.jpg');
    background-size: 100% auto;
    background-repeat: repeat;
    width: 100%;
    height: 100%;
    padding-top: 4%;
    position: absolute;
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

  .tracks {
    max-height: 53vh;
    min-width: 25vw;
    overflow: auto;
  }

  .headerbtn {
    padding: 5% !important;
    width: 8vw;
  }

  .buttons {
    padding: 0 0 0 0;
    margin: 0 0 0 0;
  }

  .card {
    width: 250px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    background-color: rgba(100,100,100,.3);
    padding: 4%;
  }

  .row {
    margin-right: 0px;
    margin-left: 10%;
  }

  h1 {
    margin: 0px;
  }
</style>