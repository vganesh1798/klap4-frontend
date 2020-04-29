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
    <review :album="album.name" :artist="album.artist" v-if="reviewOpen" @closeReview="closeReview"></review>
    <issue :album="album.name" :artist="album.artist" v-if="issueOpen" @closeIssue="closeIssue"></issue>
    
    <div id="container">
      <div class="row">
        <div class="col s2 offset-s2">
        <div class="card">
          <div class="card-image">
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png">
          </div>
          <div class="card-content">
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
                <th style="width: 16.67%;">Track</th>
                <th style="width: 16.67%">Recommended</th>
                <th style="width: 16.67%;">Name</th>
                <th style="width: 16.67%;">FCC Status</th>
                <th style="width: 16.67%">Last Played</th>
                <th style="width: 16.67%;">Plays</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in tracks" :key="item.number">
                <td>{{ item.number }}</td>
                <td>
                  <i v-if="item.recommended" class="material-icons-round yellow-text text-accent-4">grade</i>
                </td>
                <td>{{ item.song_name }}</td>
                <td>
                  <defaultButton v-if="getFCCStatus(item.fcc_status) == 'clean'">
                    <i class="material-icons-round green-text tooltipped" data-tooltip="Clean">check_circle</i>
                  </defaultButton>
                  <defaultButton v-if="getFCCStatus(item.fcc_status) == 'indecent'">
                    <i class="material-icons-round orange-text text-lighten-2 tooltipped" data-tooltip="Indecent">error</i>
                  </defaultButton>
                  <defaultButton v-if="getFCCStatus(item.fcc_status) == 'obscene'">
                    <i class="material-icons-round red-text tooltipped" data-tooltip="Oscene">error</i>
                  </defaultButton>
                  <defaultButton v-if="getFCCStatus(item.fcc_status) == 'unrated'">
                    <i class="material-icons-round gray tooltipped" data-tooltip="Unrated">help</i>
                  </defaultButton>
                </td>
                <td>{{ item.last_played }}</td>
                <td>{{ item.times_played }}</td>
                <defaultButton @click.native="addToPlaylist(item, album)">
                    <i class="material-icons tooltipped" data-tooltip="Add to active playlist">add</i>
                </defaultButton>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src='./Albumdeets.ts'/>

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