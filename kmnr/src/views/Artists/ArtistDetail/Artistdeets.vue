<template>
  <div class="full-deets">
    <h1>
      <span class="artists-heading-main">Artist Information</span>
    </h1>
    <div id="container">
      <div class="row">
        <div class="col s2 offset-s2">
        <div class="card">
          <div class="card-image">
            <img src="http://cdn.onlinewebfonts.com/svg/img_264570.png">
          </div>
          <div class="card-content">
            <span class="card-title"><em>{{artist.id}}</em><br/>{{artist.name}}</span>
            <p>Genre: {{artist.genre}}</p>
          </div>
        </div>
        </div>

        <div class="albums col s4 offset-s1">
          <table class="albumsTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Format</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in albums" :key="item.id">
                <td>{{ item.id }}</td>
                <td><router-link :to="{name:'AlbumDetail', params:{albumParam:item.id} }" class="albumLink">{{item.album_name}}</router-link></td>
                <td><img :src="formatImage(item.album_format)" v-bind:alt="item.album_format"></td>
                <td>
                  <i v-if="item.missing" class="material-icons-round lime-text text-darken-4 tooltipped" data-tooltip="Missing">warning</i>
                  <i v-if="item.has_reviews" class="material-icons-round green-text text-accent-4 tooltipped" data-tooltip="Has review">rate_review</i>
                  <i v-if="item.has_problems" class="material-icons-round tooltipped" data-tooltip="Has problems">report</i>
                  <i v-if="item.new_album" class="material-icons-round light-blue-text text-accent-4 tooltipped" data-tooltip="New album!">fiber_new</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src='./Artistdeets.ts' />


<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Josefin+Sans");

  #container {
    padding-top: 3%;
  }

  .albums {
    max-height: 53vh;
    min-width: 250px;
    overflow: auto;
  }

  .artists-heading-main {
    padding-top: 5%;
    padding-bottom: 10%;
    display: block;
    font-size: 3.75vw;
    text-align:center;
    padding-bottom: 0%;
    margin-bottom: 0%;
    color: rgb(70, 68, 68);
    font-family: 'Covered By Your Grace';
  }

  .card {
    margin-left: -10vw !important;
    margin-top: -10vh !important;
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

  .full-deets {
    background: #1fa2ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(160deg, #1fa2ff, #12d8fa, #a6ffcb); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(160deg, #1fa2ff, #12d8fa, #a6ffcb); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    background-size: cover;
    min-height: 100%;
    height: auto;
    padding-top: 4%;
  }

  .albumLink {
    color: #1976d2 !important;
  }
</style>