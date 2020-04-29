<template>
  <div class="full-deets">
    <h1>
      <span class="albums-heading-main">Album Information</span>
    </h1>
    <h1>{{this.$store.state.currentPlaylist}}</h1>  
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
    <review :album="album.name" :artist="album.artist" v-if="reviewOpen" @closeReview="closeReview"></review>
    <issue :album="album.name" :artist="album.artist" v-if="issueOpen" @closeIssue="closeIssue"></issue>
    
    <div id="container">
      <div class="row">
        <div class="col s2 offset-s2">
        <div class="card">
          <div class="card-image">
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png">
          </div>
          <div class="card-content" v-if="loaded">
            <span class="card-title">{{album.name}} ({{album.id}})</span>
            <p>by {{album.artist}} ({{album.artist_id}})</p>
            <p v-if="album.label">{{album.label}}</p>
            <p>Added on {{album.date_added}}</p>
            <p>{{ album.genre }}</p>
          </div>
        </div>
        </div>

        <div class="tracks col s4 offset-s1">
          <table class="tracksTable">
            <thead>
              <tr>
                <th style="width: 25%;">Track</th>
                <th style="width: 25%;">Name</th>
                <th style="width: 25%;">FCC Status</th>
                <th style="width: 25%;">Plays</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tracks" :key="item.number">
                <td>{{ item.number }}</td>
                <td>{{ item.song_name }}</td>
                <td>{{ item.fcc_status }}</td>
                <td>{{ item.times_played }}</td>
                <defaultButton @click.native="addToPlaylist(item, album)">
                    <i class="material-icons">add</i>
                </defaultButton>
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
    fcc = 0;

    loaded = false;

    beforeCreate() {
      this.$store.dispatch('displayAlbum', this.$route.params.albumParam).then(res => {
        this.tracks = this.$store.state.singleAlbum.songs
        this.album = this.$store.state.singleAlbum
        console.log(this.album)
      })
      .finally(() => {
        this.loaded = true
      })
    }

    get curPath() {
      return this.$route.path
    }

    @Watch('curPath')
    newPath(newPath, oldPath) {
      this.loaded = false
            this.$store.dispatch('displayAlbum', this.$route.params.albumParam).then(res => {
        this.tracks = this.$store.state.singleAlbum.songs
        this.album = this.$store.state.singleAlbum
        console.log(this.album)
      })
      .finally(() => {
        this.loaded = true
      })
    }

    changeSingleFCC(songNumber) {
      const FCCParams = {
        'id': this.$route.params.albumParam,
        'songNumber': songNumber,
        'fcc': this.fcc
      };
      this.$store.dispatch('changeSingleFCC', FCCParams)
        .then(res => {
          console.log(res.data);
        })
    }

    changeAlbumFCC() {
      const FCCParams = {
        'id': this.$route.params.albumParam,
        'songNumber': null,
        'fcc': this.fcc
      };
      this.$store.dispatch('changeAlbumFCC', FCCParams)
        .then(res => {
          console.log(res.data);
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

    addToPlaylist(item, album) {
      console.log(item)
      const PlaylistParam = {
       dj_id: "test",
       playlistName: this.$store.state.currentPlaylist,
       //try to get it so that you don't need to pass an index to add a song
       //index: 1,
       entry: {song: item.song_name, artist: album.artist, album: album.name }
     }
     this.$store.dispatch('addPlaylistEntry', PlaylistParam).then(res => {
        //this.entries = res.playlist_entries;
        //console.log(res);
        //this.getSongs();
     });
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
    min-height: 100%;
    height: auto;
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