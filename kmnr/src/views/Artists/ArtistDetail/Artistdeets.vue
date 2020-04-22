<template>
  <div class="full-deets">
    <h1>
      <span class="artists-heading-main">Artist Information</span>
    </h1>
    <div id="flex-container">
      <div class=" animated fadeInUp ease-out-circ d-1 a-2 flex-child">
        <md-card>
          <md-card-media>
            <img class="artist-image" src="http://cdn.onlinewebfonts.com/svg/img_264570.png">
          </md-card-media>

          <md-card-header>
            <div class="md-title">{{artist.name}}</div>
            <div class="md-subhead">{{artist.name}}</div>
          </md-card-header>
         
          <md-card-expand>
            <md-card-actions md-alignment="space-between">
              <md-card-expand-trigger>
                <md-button>Details</md-button>
              </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
              <md-card-content>
                ID: {{artist.id}} <br />
                Genre: {{artist.genre_abbr}} <br />
                Tracks: this will become list of albums i think
              </md-card-content>
            </md-card-expand-content>
          </md-card-expand>
        </md-card>
      </div>

      <div class="container">
          <div class="row">
            <div class="col s6">
              <md-table class="table" v-model="albums" md-card>
                <md-table-toolbar>
                  <h1 class="md-title">Albums</h1>
              </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{item}">
                  <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                  <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Format" md-sort-by="run">{{ item.format_bitfield }}</md-table-cell>
                  <md-table-cell md-label="Notes" md-sort-by="missing">{{ item.missing }}</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </div>
      </div>
    </div>




  </div>

</template>

<script lang="ts" src='./Artistdeets.ts' />


<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

  .main {

    margin: 0 auto;
  }

  .table {
    position: absolute;
    width: 30% !important;
    margin-left: 5% !important;
  }

  .artists-heading-main {
    display: block;
    font-size: 60px;
    font-weight: 60;
    padding-top: 5%;
    padding-left: 35%;
    padding-bottom: 1%;
    color: Black;
    font-family: 'Montserrat';
  }

  .artist-image {
    border: 7px solid black;
    /* border-radius: 50%; */
    padding: 2px;
    width: 100%;
    background-color: black;
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
    margin-left: 20%;
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
    /* background-image: url('../../assets/back8.jpg');
    background-size: cover;
    height: 100%; */
    padding-top: 4%;
  }
</style>